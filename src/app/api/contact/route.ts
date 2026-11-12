import { NextResponse } from "next/server";
import { contactErrors, validateContact } from "@/lib/contact";

type UpstreamDiagnostics = {
  providerStatus: number;
  providerContentType: string | null;
  providerRedirected: boolean;
  providerRedirectBlocked: boolean;
  providerResponseOrigin: string | null;
  providerResponsePathname: string | null;
  providerResponseClassification: "JSON" | "HTML" | "empty" | "unexpected";
};

function responseDiagnostics(response: Response): UpstreamDiagnostics {
  // Keep only the media type, never arbitrary header parameters or other headers.
  const mediaType = response.headers.get("content-type")?.split(";", 1)[0].trim().toLowerCase();
  let origin = null;
  let pathname = null;
  try {
    const url = new URL(response.url);
    if (url.protocol === "https:" || url.protocol === "http:") {
      origin = url.origin;
      // FormSubmit paths can contain recipient addresses or activation tokens.
      // Retain known route names and redact every other segment, even encoded ones.
      const publicSegments = new Set(["ajax", "confirm", "captcha", "challenge", "thanks"]);
      pathname = url.pathname.split("/").map((segment) =>
        !segment || publicSegments.has(segment) ? segment : "[redacted]",
      ).join("/");
    }
  } catch {
    // A synthetic response may have no URL. Do not invent a final URL.
  }
  return {
    providerStatus: response.status,
    providerContentType: mediaType && mediaType.length <= 100 && /^[\w!#$&^.+-]+\/[\w!#$&^.+-]+$/.test(mediaType) ? mediaType : null,
    providerRedirected: response.redirected,
    providerRedirectBlocked: response.status >= 300 && response.status < 400,
    providerResponseOrigin: origin,
    providerResponsePathname: pathname,
    // Also used when a body cannot be read; never log partial bodies or errors.
    providerResponseClassification: "unexpected",
  };
}

function failure(code: keyof typeof contactErrors, status: number, diagnostics?: UpstreamDiagnostics) {
  if (status >= 500 && code !== "CONTACT_DISABLED") {
    // Deliberately omit provider bodies, exceptions, sender details and messages.
    console.warn("[CONTACT_DELIVERY]", { code, ...diagnostics });
  }
  return NextResponse.json(
    { success: false, code, error: contactErrors[code] },
    { status, headers: { "Cache-Control": "no-store" } },
  );
}

export async function POST(request: Request) {
  // The public UI switch is presentation only. Delivery needs a separate,
  // explicit server opt-in; reject before reading a body or contacting anyone.
  if (process.env.CONTACT_DELIVERY_ENABLED !== "true") {
    return failure("CONTACT_DISABLED", 503);
  }

  let input: unknown;
  try {
    input = await request.json();
  } catch {
    return failure("INVALID_JSON", 400);
  }

  const validated = validateContact(input);
  if (!validated.success) {
    return failure(validated.code, 400);
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 15000);
  let diagnostics: UpstreamDiagnostics | undefined;
  try {
    const { name, email, message } = validated.value;
    const response = await fetch("https://formsubmit.co/ajax/iamsaifkhan25@gmail.com", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        name,
        email,
        message,
        _subject: `Portfolio Message from ${name}`,
        // FormSubmit documents this for requests without browser referrer context.
        // Use this deployment's contact URL, excluding query strings and input.
        _url: new URL("/contact", request.url).href,
      }),
      signal: controller.signal,
      // Inspect redirect metadata without following it or forwarding the payload.
      redirect: "manual",
      cache: "no-store",
    });

    diagnostics = responseDiagnostics(response);
    let data: unknown;
    try {
      const body = (await response.text()).trim();
      if (!body) {
        diagnostics.providerResponseClassification = "empty";
      } else if (diagnostics.providerContentType === "text/html" || diagnostics.providerContentType === "application/xhtml+xml" || /^\s*</.test(body)) {
        diagnostics.providerResponseClassification = "HTML";
      } else {
        try {
          data = JSON.parse(body);
          diagnostics.providerResponseClassification = "JSON";
        } catch {
          // Leave malformed JSON and other formats classified as unexpected.
        }
      }
    } catch {
      // Preserve the HTTP error mapping when headers already establish failure.
      if (response.ok) {
        return controller.signal.aborted
          ? failure("PROVIDER_TIMEOUT", 504, diagnostics)
          : failure("PROVIDER_INVALID_RESPONSE", 502, diagnostics);
      }
    }

    if (diagnostics.providerRedirectBlocked || response.redirected) {
      return failure("PROVIDER_UNAVAILABLE", 502, diagnostics);
    }
    if (!response.ok) {
      return response.status === 429
        ? failure("CONTACT_BUSY", 503, diagnostics)
        : failure("PROVIDER_HTTP_ERROR", 502, diagnostics);
    }

    if (diagnostics.providerResponseClassification !== "JSON") {
      return failure("PROVIDER_INVALID_RESPONSE", 502, diagnostics);
    }

    if (!data || typeof data !== "object" || Array.isArray(data) || !("success" in data)) {
      return failure("PROVIDER_INVALID_RESPONSE", 502, diagnostics);
    }

    // Do not use truthiness: the string "false" is truthy. Unknown values fail
    // closed. A message field alone never establishes acceptance.
    const success = typeof data.success === "string" ? data.success.trim().toLowerCase() : data.success;
    if (success === false || success === "false" || ("error" in data && data.error)) {
      return failure("PROVIDER_REJECTED", 502, diagnostics);
    }
    if (success !== true && success !== "true") {
      return failure("PROVIDER_INVALID_RESPONSE", 502, diagnostics);
    }

    console.info("[CONTACT_DELIVERY]", { code: "PROVIDER_ACCEPTED", ...diagnostics });
    // Provider acceptance is not confirmation of recipient activation or delivery.
    return NextResponse.json({ success: true }, { headers: { "Cache-Control": "no-store" } });
  } catch {
    return controller.signal.aborted
      ? failure("PROVIDER_TIMEOUT", 504, diagnostics)
      : failure("PROVIDER_UNAVAILABLE", 502, diagnostics);
  } finally {
    clearTimeout(timer);
  }
}
