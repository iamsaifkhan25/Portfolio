export const contactLimits = { name: 100, email: 254, message: 5000 } as const;

export const contactErrors = {
  INVALID_INPUT: "Please fill out all fields before sending.",
  INVALID_EMAIL: "Please enter a valid email address.",
  INPUT_TOO_LONG: "Please use at most 100 characters for your name, 254 for your email, and 5,000 for your message.",
  PROVIDER_HTTP_ERROR: "The contact form could not accept your message. Please try again or email me directly.",
  PROVIDER_INVALID_RESPONSE: "Your message could not be confirmed. Please email me directly.",
  PROVIDER_TIMEOUT: "The contact form took too long to respond. Your message could not be confirmed. Please email me directly.",
  PROVIDER_UNAVAILABLE: "Your message could not be confirmed. Please check your connection or email me directly.",
} as const;

type ContactErrorCode = keyof typeof contactErrors;
export type ContactInput = { name: string; email: string; message: string; "bot-field"?: string };
type ContactResult = { success: true } | { success: false; error: string };

export function validateContact(input: unknown):
  | { success: true; value: ContactInput }
  | { success: false; code: ContactErrorCode } {
  if (!input || typeof input !== "object" || Array.isArray(input)) {
    return { success: false, code: "INVALID_INPUT" };
  }
  const { name, email, message, "bot-field": botField = "" } = input as Record<string, unknown>;
  if (typeof name !== "string" || typeof email !== "string" || typeof message !== "string" || typeof botField !== "string") {
    return { success: false, code: "INVALID_INPUT" };
  }
  // Enforce limits before trimming so whitespace cannot bypass the raw limits.
  if (name.length > contactLimits.name || email.length > contactLimits.email || message.length > contactLimits.message) {
    return { success: false, code: "INPUT_TOO_LONG" };
  }
  const value = { name: name.trim(), email: email.trim(), message: message.trim(), "bot-field": botField };
  if (!value.name || !value.email || !value.message || /[\r\n\0]/.test(value.name)) {
    return { success: false, code: "INVALID_INPUT" };
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.email) || value.email.includes("\0")) {
    return { success: false, code: "INVALID_EMAIL" };
  }
  return { success: true, value };
}

export async function submitContact(input: ContactInput): Promise<ContactResult> {
  const validated = validateContact(input);
  if (!validated.success) {
    return { success: false, error: contactErrors[validated.code] };
  }
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 20000);
  try {
    const { name, email, message, "bot-field": botField = "" } = validated.value;
    const response = await fetch("/__forms.html", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ "form-name": "portfolio-contact", name, email, message, "bot-field": botField }).toString(),
      signal: controller.signal,
    });
    if (!response.ok) {
      return { success: false, error: contactErrors.PROVIDER_HTTP_ERROR };
    }
    // A redirected authentication/error page cannot establish acceptance.
    if (response.redirected) {
      return { success: false, error: contactErrors.PROVIDER_INVALID_RESPONSE };
    }
    // Netlify acknowledges AJAX requests with HTTP success, not JSON.
    // This does not establish spam classification or email notification delivery.
    return { success: true };
  } catch {
    return {
      success: false,
      error: controller.signal.aborted ? contactErrors.PROVIDER_TIMEOUT : contactErrors.PROVIDER_UNAVAILABLE,
    };
  } finally {
    clearTimeout(timer);
  }
}
