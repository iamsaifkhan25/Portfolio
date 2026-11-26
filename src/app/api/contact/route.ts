import { NextResponse } from "next/server";

// Retired FormSubmit endpoint. No environment setting may reactivate delivery.
// Keep a deterministic response for stale clients until Netlify is verified.
export async function POST() {
  return NextResponse.json(
    { success: false, code: "CONTACT_DISABLED", error: "The contact form is currently disabled. Please email me directly." },
    { status: 410, headers: { "Cache-Control": "no-store" } },
  );
}
