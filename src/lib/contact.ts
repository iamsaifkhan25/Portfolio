export const contactLimits = { name: 100, email: 254, message: 5000 } as const;

export const contactErrors = {
  CONTACT_DISABLED: "The contact form is currently disabled. Please email me directly.",
  INVALID_JSON: "Please reload the page and try again.",
  INVALID_INPUT: "Please fill out all fields before sending.",
  INVALID_EMAIL: "Please enter a valid email address.",
  INPUT_TOO_LONG: "Please use at most 100 characters for your name, 254 for your email, and 5,000 for your message.",
  PROVIDER_REJECTED: "The contact form could not accept your message. Please email me directly.",
  PROVIDER_HTTP_ERROR: "The contact form is temporarily unavailable. Please email me directly.",
  CONTACT_BUSY: "The contact form is busy. Please wait a little or email me directly.",
  PROVIDER_INVALID_RESPONSE: "Your message could not be confirmed. Please email me directly.",
  PROVIDER_TIMEOUT: "The contact form took too long to respond. Your message could not be confirmed. Please email me directly.",
  PROVIDER_UNAVAILABLE: "Your message could not be confirmed. Please check your connection or email me directly.",
} as const;

type ContactErrorCode = keyof typeof contactErrors;
export type ContactInput = { name: string; email: string; message: string };
type ContactResult = { success: true } | { success: false; error: string };

export function validateContact(input: unknown):
  | { success: true; value: ContactInput }
  | { success: false; code: ContactErrorCode } {
  if (!input || typeof input !== "object" || Array.isArray(input)) {
    return { success: false, code: "INVALID_INPUT" };
  }
  const { name, email, message } = input as Record<string, unknown>;
  if (typeof name !== "string" || typeof email !== "string" || typeof message !== "string") {
    return { success: false, code: "INVALID_INPUT" };
  }
  const value = { name: name.trim(), email: email.trim(), message: message.trim() };
  if (!value.name || !value.email || !value.message || /[\r\n]/.test(value.name) || value.name.includes("\0")) {
    return { success: false, code: "INVALID_INPUT" };
  }
  if (value.name.length > contactLimits.name || value.email.length > contactLimits.email || value.message.length > contactLimits.message) {
    return { success: false, code: "INPUT_TOO_LONG" };
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.email) || value.email.includes("\0")) {
    return { success: false, code: "INVALID_EMAIL" };
  }
  return { success: true, value };
}

// Only our own error codes determine visitor-facing text. Never render arbitrary
// response messages from a provider, proxy, or unexpected deployment response.
function safeContactError(data: unknown): string {
  if (data && typeof data === "object" && "code" in data && typeof data.code === "string" && Object.hasOwn(contactErrors, data.code)) {
    return contactErrors[data.code as ContactErrorCode];
  }
  return contactErrors.PROVIDER_INVALID_RESPONSE;
}

export async function submitContact(input: ContactInput): Promise<ContactResult> {
  const validated = validateContact(input);
  if (!validated.success) {
    return { success: false, error: contactErrors[validated.code] };
  }
  const controller = new AbortController();
  // Allow time for the backend's shorter provider deadline and platform overhead.
  const timer = setTimeout(() => controller.abort(), 20000);
  try {
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(validated.value),
      signal: controller.signal,
    });
    let data: unknown;
    try {
      data = await response.json();
    } catch {
      return {
        success: false,
        error: controller.signal.aborted ? contactErrors.PROVIDER_TIMEOUT : contactErrors.PROVIDER_INVALID_RESPONSE,
      };
    }
    if (response.ok && data && typeof data === "object" && !Array.isArray(data) && "success" in data && data.success === true && !("error" in data && data.error)) {
      return { success: true };
    }
    return { success: false, error: safeContactError(data) };
  } catch {
    return {
      success: false,
      error: controller.signal.aborted ? contactErrors.PROVIDER_TIMEOUT : contactErrors.PROVIDER_UNAVAILABLE,
    };
  } finally {
    clearTimeout(timer);
  }
}
