# Contact default-state fix

Local review candidate on `main`, 2026-11-26. Existing uncommitted work is preserved. No commit, push, deployment, or production branch change is authorized by this fix.

> Follow-up: [Milestone 3D.5](MILESTONE_3D_5_FINAL_STAGING_RELEASE.md) separately authorizes a reviewed checkpoint and staging deployment of this work. Its verification and production gate supersede the release-status statements in this historical local review.

## Current behavior and configuration

The previous conditional, `process.env.NEXT_PUBLIC_CONTACT_FORM_ENABLED === "true"`, hid the form whenever the variable was unset. The page now reads:

```tsx
const flag = process.env.NEXT_PUBLIC_CONTACT_FORM_ENABLED;
const formEnabled = flag === undefined || flag === "true";
```

| Value | Initial panel |
| --- | --- |
| Unset | Form |
| Exact `true` | Form |
| Exact `false` | Direct email alternative |
| Any other explicit value, including empty, uppercase, or surrounding whitespace | Direct email alternative |

No contact-related environment variable is needed for local development. Restart `npm.cmd run dev` after changing a public flag. For production-mode local checks, set the flag before `npm.cmd run build`; changing it only at `npm.cmd run start` does not update the compiled presentation.

Contact Details is the first grid section in every state, so it stays left on desktop and first on mobile. The form, submission-failure fallback, or configuration-disabled email alternative occupies the second section. The existing CSS grid and Editorial Glass styling are preserved.

After a failed submission, only the form panel changes to the email alternative with: "Your message didn't go through. You can try again or email me directly." Email Saif opens the email app. Try again restores the form with the draft intact and never automatically submits. The configuration-disabled alternative does not claim a failed submission or offer a retry.

Only accepted, non-redirected HTTP success clears the fields and announces: "Thanks for reaching out! Your message has been submitted." This does not establish inbox delivery. The existing staging notice remains controlled by the existing delivery-verification setting; it is visible until the owner confirms Netlify storage and notifications. Netlify AJAX, static registration, honeypot, validation, placeholders, and contact destinations remain unchanged. FormSubmit and `/api/contact` remain retired.

## Production release gate

Before any future merge to `master`, record and verify the effective **production build** setting. Explicitly choose `NEXT_PUBLIC_CONTACT_FORM_ENABLED=true` only with owner approval to enable the form, or `false` to retain email-only contact. An unset value must never authorize release. The existing `netlify.toml` still provides a build default of `false`, with only `main` overridden to `true`; this fix does not alter hosted settings or authorize a production release. Keep the staging notice until final acceptance and the legacy API inactive.

Older milestone reports retain their original verification results. Their unset-means-disabled presentation guidance and retired FormSubmit procedures do not apply to this revision.

## Verification

| Check | Result |
| --- | --- |
| Fresh local development, all contact variables unset | PASS: `next dev` on port 3107 returned HTTP 200 for `/contact`, with the named form and all three visible fields, no email-only fallback, Contact Details first, and the staging notice. No environment file was present or created. |
| Fresh development start, flag exact `true` | PASS: HTTP 200; form shown, fallback absent, Contact Details first. |
| Fresh development start, flag exact `false` | PASS: HTTP 200; direct-email alternative shown, no form, no failed-submission claim or retry action, Contact Details first. |
| Render-level configuration matrix | PASS: unset and exact `true` show the form; `false`, `TRUE`, `1`, empty, unknown, and whitespace-padded values disable it. The delivery-verification setting only controls the existing notice. |
| Failed submission and retry | PASS in mocked component interaction tests: validation, HTTP rejection, network failure, redirect, and timeout replace the right form controls; requested failure text/actions appear. Try again restores entered values, clears the failure status, and issues no request. |
| Accepted submission | PASS in mocked component interaction tests: pending values remain intact, duplicate events are blocked, HTTP acceptance resets the fields and shows the exact thank-you text without a delivery claim. |
| Stable columns | PASS in render/state checks: exactly two top-level sections, Contact Details first and unchanged during sending, failure, retry, and acceptance. Existing CSS uses normal single-column stacking, two columns at 64rem, and no order reversal. Actual desktop/mobile visual review remains unverified. |
| Lint and TypeScript | `npm.cmd run lint` and `npx.cmd tsc --noEmit` passed. Both builds also passed TypeScript. |
| Complete test suite | `node --test tests/*.test.mjs`: 68 passed, 0 failed. All submission requests mocked. |
| Enabled production compilation | PASS: flag `true`, `CONTEXT=branch-deploy`, legacy delivery `false`. Generated contact HTML has the form, all five submitted fields, testing notice, details first, and no email-only fallback. |
| Disabled production compilation | PASS: flag `false`, `CONTEXT=production`, legacy delivery `false`. Generated contact HTML has the direct-email alternative with details first and no form. This is the final local build artifact. |
| Diff and preservation | Working/index whitespace checks pass; index remains empty. Netlify transport, API tombstone, static form definition, and Netlify configuration have no diff. The pre-existing CSS edit is preserved without further changes. No other page was edited. |

The three development checks used separate server starts and HTTP-rendered output. The temporary verification server was stopped afterward. Next.js rewrote its generated `AGENTS.md` block during startup; that incidental change was restored to the original clean content.

Browser screenshots are unavailable: browser inventory returned "The browser access host is unavailable", and native Firefox inspection stopped because browser URL policy enforcement is unsupported. Render-level checks and mocked component interactions substitute for browser acceptance; no visual, screen-reader, real storage, notification, or inbox-delivery pass is claimed. The owner must review the local change before any separately authorized release.
