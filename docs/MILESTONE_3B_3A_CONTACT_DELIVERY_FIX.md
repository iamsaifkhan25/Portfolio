# Milestone 3B.3A: Contact form delivery diagnosis and repair

Prepared on 2026-11-12 for review on `main`. No real form submission, activation request, commit, push, deployment, or Netlify setting change was performed. `master` was not modified. The contact repair, 57-test suite, and this report were already pending in the working tree when the final review began. Reviewed and retained that implementation, added four regression cases, and refreshed this report. SHA-256 comparison against the review's 93-file starting snapshot confirms all other files were preserved, including the existing homepage/project work and contact implementation.

Follow-up on the same date: incorporated the owner-supplied production parsing error, added response metadata diagnostics and 23 mocked regression cases, and reran the existing checks. The paragraph above records the initial 3B.3A review; the updated diagnosis, verification table and section 9 record this follow-up. Validation, deadlines, safe API messages, explicit acceptance requirements and browser behavior are retained.

## 1. Diagnosis and evidence

**The immediate production failure is now confirmed by the owner-supplied Netlify log:** the original handler attempted to parse a response beginning with `<!DOCTYPE` as JSON and threw `SyntaxError: Unexpected token '<'`. This establishes an upstream HTML response at the parsing boundary. Its HTTP status, Content-Type, redirect history, and the reason FormSubmit returned HTML remain unknown. Activation, an anti-spam challenge, an intermediary block, or an upstream error cannot be distinguished from that exception alone. No owner confirmation of recipient activation is available. Real submissions remain excluded from automated checks.

The submission path is:

1. The contact page collects name, email, and message and calls `POST /api/contact` with JSON.
2. The Next.js route validates the data and forwards JSON to `https://formsubmit.co/ajax/iamsaifkhan25@gmail.com`.
3. FormSubmit decides whether to accept the submission and handles recipient verification and email processing.
4. Inbox arrival must be checked separately by the owner at `iamsaifkhan25@gmail.com`.

Confirmed issues in the original code:

| Finding | Effect |
| --- | --- |
| Both layers checked only `response.ok`. The backend ignored provider `success`. | An HTTP 200 rejection could produce false success. This defect alone does not explain the reported error banner. |
| Backend always parsed provider JSON without a separate parse failure path. | An empty, HTML, challenge, or malformed response fell into a generic HTTP 500. |
| No provider or browser request deadline. | A stalled request could leave loading active until another network/platform limit intervened. |
| Backend forwarded provider error messages and upstream HTTP statuses. | Visitor responses were inconsistent and could include unnecessary provider details. |
| Validation checked only truthiness. | Whitespace, invalid email addresses, and non-string values could reach the provider. Malformed request JSON became HTTP 500. |
| Server-to-server payload omitted `_url` and had no browser referrer context. | Missing origin metadata is a plausible provider rejection condition; it has not been reproduced for this incident. |

In the original frontend, the error banner meant `/api/contact` returned a non-2xx status or the browser request threw. Possible causes include a provider HTTP rejection, failed JSON parsing, provider/network failure, invalid input, or a deployment/runtime failure. Recipient activation remains another unverified configuration dependency. Do not present any of these possibilities as the confirmed incident cause.

The earlier pending report recorded GET 200 for the production contact page and GET 405 for its POST-only API. Those observations could not be independently refreshed in this review: the shell's read-only GET failed with `TypeError: fetch failed`, and the web tool reported both production URLs inaccessible. Neither failure establishes an outage or its cause. There is no new production reachability result.

No live POST or Netlify account/log inspection was performed. Prior page/route reachability would not establish the deployed source revision, successful server-to-server access, activation, or email delivery. The local repair is not deployed.

## 2. Files changed

| File | Change |
| --- | --- |
| `src/app/api/contact/route.ts` | Provider acceptance checks, safe JSON responses, timeout, safe diagnostics, validated payload and `_url`. |
| `src/app/contact/page.tsx` | Uses the tested submission helper; preserves fields, layout, classes, contact details, required attributes, loading state and live status region. Adds matching field length caps and truthful acceptance text. |
| `src/lib/contact.ts` | Shared validation, limits and safe error text; browser submission and response handling. |
| `tests/contact.test.mjs` | Mock-only tests against actual TypeScript modules and NextResponse. |
| `package.json` | Adds `test:contact`; no dependency changes. |
| `docs/MILESTONE_3B_3A_CONTACT_DELIVERY_FIX.md` | Diagnosis, verification evidence and owner test instructions. |

Consulted the installed Next.js route-handler guide, route API reference, and client-boundary guide during review. `next.config.ts` does not configure a static export. The build retains `/api/contact` as a dynamic server route.

## 3. Response handling

The route accepts only a successful HTTP response containing a JSON object with explicit `success: true` or string `"true"` (case and surrounding whitespace normalized). Boolean/string false, missing/unknown success values, and a nonempty `error` field are failures. `message` alone never establishes acceptance and is never sent to visitors or logged.

| Condition | API status | Response code |
| --- | --- | --- |
| Explicit provider acceptance | 200 | `{ "success": true }` |
| Malformed request JSON | 400 | `INVALID_JSON` |
| Missing, blank or non-string fields; newline/NUL in name | 400 | `INVALID_INPUT` |
| Invalid sender email | 400 | `INVALID_EMAIL` |
| Field exceeds its limit | 400 | `INPUT_TOO_LONG` |
| Provider HTTP 429 | 503 | `CONTACT_BUSY` |
| Other provider HTTP error | 502 | `PROVIDER_HTTP_ERROR` |
| Provider reports failure or an error | 502 | `PROVIDER_REJECTED` |
| Non-JSON/empty/malformed or ambiguous provider response | 502 | `PROVIDER_INVALID_RESPONSE` |
| Provider deadline expires | 504 | `PROVIDER_TIMEOUT` |
| Network failure or unexpected redirect | 502 | `PROVIDER_UNAVAILABLE` |

All handled API errors use `{ success: false, code, error }` with fixed safe wording. Responses include `Cache-Control: no-store`. The provider deadline is 15 seconds, covering fetch and body reading, with timer cleanup. Redirects fail rather than following an unexpected destination. The diagnostic follow-up uses `redirect: "manual"` to observe the initial redirect status while retaining this refusal to follow or forward the payload. No automatic retry occurs.

The browser has a 20-second deadline, also covering body reading. It requires HTTP success plus the backend's boolean `success: true`, rejects contradictory errors, and maps only recognized error codes to approved text. HTML platform errors, malformed JSON, and network failures produce a safe message. Fields clear only on acceptance; all failure paths retain the draft. The accessible `aria-live="polite"`/`role="status"` region and disabled loading controls remain.

The success message is **“Message accepted for sending. Thank you for getting in touch.”** This means the provider explicitly reported acceptance. It does not assert that activation is complete or that Gmail received the message. A timeout/network interruption can happen after processing has begun; check the inbox before repeating an uncertain submission.

Validation is shared by the browser and route: trim fields, require nonempty strings, check basic email syntax, and cap name/email/message at 100/254/5,000 characters. Payload forwarding is restricted to those fields, the subject, and the server-derived contact URL. Client-supplied provider controls are ignored. The receiving address and provider remain unchanged.

## 4. Provider documentation and activation

Reviewed the current [FormSubmit AJAX documentation](https://formsubmit.co/ajax-documentation), its [embedded Fetch example](https://gist.github.com/kesarawimal/53d4308a8234638b88275225c32a11b6), [general documentation](https://formsubmit.co/documentation), [setup instructions](https://formsubmit.co/), and [FAQ](https://formsubmit.co/help).

The Fetch example uses JSON with `Content-Type` and `Accept` headers, then parses JSON. It does **not** publish a complete normative success/error response schema or activation status contract. Boolean/string handling here is defensive and mock-tested; it is not evidence of a particular live response. The owner's controlled test must confirm the actual integration response.

FormSubmit's FAQ recommends `_url` when origin information is absent. This repair derives `/contact` from the current request URL, without query parameters or arbitrary client metadata. This follows the documented metadata mechanism; it does not forge referrer headers or bypass verification. Confirm the deployment's public URL in the delivered email during manual testing. [FormSubmit FAQ](https://formsubmit.co/help)

Activation is **pending owner confirmation**:

1. During the owner-controlled local test below, submit once using a real sender address you control.
2. Open `iamsaifkhan25@gmail.com`, check Inbox, Spam and All Mail for FormSubmit's recipient confirmation email, and verify that it concerns your form before following its activation link.
3. Record owner confirmation and the tested form URL. Resubmit a uniquely identified test after activation to verify acceptance and actual receipt.
4. Repeat verification for the Netlify pre-production form; do not assume local activation proves that form is activated. If the confirmation is missing, verify Gmail receives other mail, check spam, and use FormSubmit support if necessary. Avoid repeated uncontrolled attempts.

FormSubmit requires initial email confirmation; changing the recipient requires activation again. [Setup](https://formsubmit.co/), [FAQ](https://formsubmit.co/help)

Provider restrictions reviewed: spam filtering can affect submissions; `_honey` values can cause silent discard; disabling CAPTCHA can incur limitations; AJAX does not support `_autoresponse`. This repair adds none of those controls and does not disable CAPTCHA. FormSubmit documents 30-day submission retention, so avoid sensitive content. [Documentation](https://formsubmit.co/documentation), [FAQ](https://formsubmit.co/help)

**Server-to-server reliability assessment (follow-up):** FormSubmit documents the AJAX endpoint and a JSON Fetch example. The reviewed documentation does not explicitly guarantee unattended Next.js/Netlify server-to-server submission, explain how such requests satisfy interactive reCAPTCHA, or promise JSON for every rejection/challenge. The FAQ describes reCAPTCHA v2/v3 and spam validation of all submissions. Therefore the JSON request format is documented, while reliable operation of this specific server relay with provider protections enabled is **unverified**. `_url` supplies form metadata; it does not prove activation or satisfy a challenge. A server fetch cannot itself complete an interactive browser challenge. This is an integration limitation inferred from the documented protections, not proof that CAPTCHA caused this incident or that the method is unsupported. Confirm actual behavior through the owner-controlled staging procedure; if it remains blocked, request provider clarification before changing the integration. [AJAX](https://formsubmit.co/ajax-documentation), [Fetch example](https://gist.github.com/kesarawimal/53d4308a8234638b88275225c32a11b6), [FAQ](https://formsubmit.co/help), [CAPTCHA guidance](https://formsubmit.co/documentation)

## 5. Automated verification

| Check | Result |
| --- | --- |
| `npm.cmd run test:contact` | Follow-up: 84 passed, 0 failed (61 existing cases retained and 23 diagnostic cases added). Every submission call mocked; no messages or activation requests sent. |
| `npm.cmd run lint` | Passed. |
| `npx.cmd tsc --noEmit` | Passed. |
| `npm.cmd run build` | Passed; `/contact` prerendered and `/api/contact` dynamic. |
| `git diff --check` | Passed. Git emits existing LF-to-CRLF notices, not whitespace failures. |
| Existing work preservation | Initial 3B.3A review changed only the test suite and this report. Against the follow-up's new 93-file starting snapshot, only the contact route, test suite and this report changed. Shared validation/browser helper, contact UI, dependency manifests and existing homepage/project work remain byte-identical. |
| Contact UI source preservation | TypeScript AST comparison against `HEAD` confirms identical classes, required fields, loading/disabled bindings, status accessibility attributes, contact destinations, and input presentation attributes. Only the mock-test script was added to `package.json`; dependency declarations are unchanged. |
| Local production HTTP | `/contact` returned 200 with the three required fields, live status region, and correct email link. Empty `{}` and malformed request bodies returned safe JSON with HTTP 400, `success: false`, `INVALID_INPUT` / `INVALID_JSON`, and `Cache-Control: no-store`. Validation returns before the provider call; no valid submission was sent. The temporary server was stopped. |
| Production/network review | Shell GET failed and both production URLs were inaccessible through the web tool. Netlify runtime/log access and current live behaviour remain unverified; these tool failures do not establish an outage. |

Tests cover boolean/string acceptance and rejection; HTTP 400/403/429/500/503; contradictory errors; absent or unexpected success values; null/array/scalar bodies; HTML/empty/malformed JSON; network/redirect failure; fetch/body deadlines; malformed and invalid input; field caps and trimming; safe responses/logs; request-derived deployment metadata; ignored provider-control injection; browser response handling; and the browser helper through the real route to a mocked provider. The four review additions verify string acceptance cannot override a provider error, an HTTP error cannot be overridden by a success body, HTTP 204 without acceptance fails safely, and the backend's 15-second timeout reaches the browser helper before its 20-second deadline.

The diagnostic follow-up also verifies HTML rejection with HTTP 200, a misleading JSON header, or a JSON-looking body declared as HTML; all four classifications; HTTP 301/302/303/307/308 without a second request; defensive rejection of an already-followed response; success/error log privacy; missing/non-HTTP response URLs; HTTP error body classification; and safe metadata when body reading fails or times out. Lint, TypeScript, production build and whitespace checks were rerun for this follow-up. The build retains `/api/contact` as a dynamic route.

The suite uses Node's built-in test runner with the installed TypeScript compiler to evaluate production modules in memory, including actual NextResponse. Validated with Node 24.18.0; use a Node version with `node:test` mock timers. Tests exercise the browser helper, not a mounted browser UI or Netlify runtime. Browser interaction, screen-reader announcements and actual email delivery remain manual checks.

## 6. Owner-controlled local test

This procedure intentionally sends real email and must be run by the owner, not automated by the agent.

1. On the reviewed working tree, run `npm.cmd run dev` and open the printed localhost URL at `/contact` (do not use a `file://` page).
2. Open browser developer tools, select Network, enable Preserve log, and filter for `contact`. Keep the local terminal visible.
3. Check that empty required fields and invalid email syntax prevent submission. Fill a real name and a real sender address you control. Use a short nonsensitive message with a unique marker such as `CONTACT-LOCAL-<date-time>`.
4. Submit once. Verify loading disables the form and that the status is announced. Open the `POST /api/contact` entry and inspect its status, Request Payload, and Response. Keep personal payloads private; redact them before sharing diagnostics.
5. HTTP 200 with `{ "success": true }` means explicit provider acceptance only. Check `iamsaifkhan25@gmail.com` for the matching message/activation email and follow the activation procedure above. Confirm the message text, sender/Reply-To behavior, and form URL. Record receipt time and folder.
6. For failure, record the response `code`, timestamp and safe terminal log. Input should remain available. Do not infer activation status from the generic banner or repeatedly submit after a timeout. Use the direct email link if needed.
7. Check error and success announcements with keyboard/screen-reader use and confirm existing contact details and visual layout remain intact.

## 7. Owner-controlled Netlify pre-production test and logs

After review, a separately authorized deployment of `main` is needed before testing this repair on Netlify. Follow [DEPLOYMENT_WORKFLOW.md](DEPLOYMENT_WORKFLOW.md): verify production still uses `master` and verify the separate `main` branch deploy. No setting change or deployment is authorized by this report.

1. Verify the pre-production deploy's branch and reviewed commit. The expected URL is `https://main--saifkhans.netlify.app/`; its configuration and availability were not verified in this task.
2. Repeat the local browser procedure at its `/contact` URL with a different marker, `CONTACT-PREPROD-<date-time>`, and a real controlled sender address. Confirm the request targets that deployment's `/api/contact`.
3. Check the recipient's activation state for this form, then verify an accepted submission actually arrives in Gmail. Record the deploy identifier, timestamp, safe response, and owner receipt confirmation. Production release is a separate approval.
4. To inspect logs, open the Netlify project, go to **Cloud compute > Functions**, select the function serving the Next.js route, and select the `main` deploy using the branch/deploy search. The default list shows production, so check the deploy context explicitly. Filter by test timestamp and `[CONTACT_DELIVERY]`. [Netlify function logs](https://docs.netlify.com/build/functions/logs/)
5. Capture the single `[CONTACT_DELIVERY]` outcome and its safe upstream metadata using the schema below. With HTTP 200 HTML, expect HTTP 502 / `PROVIDER_INVALID_RESPONSE` from our API, an error banner, and the draft retained. Other upstream HTTP errors keep their existing mapping (including 429 to `CONTACT_BUSY`). A redirect response returns `PROVIDER_UNAVAILABLE` without being followed. Acceptance logs still do not prove delivery.
6. If the browser receives HTML, a 404/405 on POST, or an unrelated platform 5xx with no contact log, inspect the matching deploy's build/runtime logs for route packaging, Next.js adapter compatibility, runtime startup or platform limits. These are investigation steps, not confirmed failures. A function may fail before this handler can return its safe JSON.

## 8. Remaining concerns and acceptance items

- Public POST access has no application rate limiter, origin enforcement or interactive bot challenge. Field limits, fixed-recipient forwarding and validation reduce malformed input; they do not stop determined spam. Provider spam filtering remains external and unverified. Consider a separate reviewed abuse-control change if needed.
- Field limits apply after JSON parsing; this repair does not implement a streaming body-size limit. Netlify's actual platform request/runtime limits were not inspected.
- Basic email syntax validation does not prove sender identity or mailbox ownership. Reply behavior still needs the owner's real-address test.
- The email address is already public in contact details. Removed the misleading old backend comment claiming it was hidden from visitors.
- No retry, alternate provider, `_captcha: false`, forged origin headers, verification bypass, delivery webhook or persistence was added. FormSubmit has not been demonstrated unsuitable.
- **Pending:** owner confirmation of activation, local real-address receipt, Netlify pre-production deployment/configuration and real-address receipt, Netlify log review, and manual browser/accessibility review. Actual inbox delivery remains unverified.

Stop at implementation review. Do not commit, push, modify `master`, release to production or change Netlify settings as part of this milestone.

## 9. Follow-up diagnostic schema and staging evidence

Each completed upstream response produces one outcome log, using `console.info` for acceptance or `console.warn` for failure:

| Field | Meaning and privacy boundary |
| --- | --- |
| `code` | Existing fixed outcome code. |
| `providerStatus` | Upstream HTTP status. |
| `providerContentType` | Lowercase media type only; parameters are omitted. Missing/invalid types are `null`. No other headers are recorded. |
| `providerRedirected` | Native `Response.redirected`: whether the returned response followed a redirect. Expected `false` with manual redirect handling. A defensive `true` is rejected. |
| `providerRedirectBlocked` | A 3xx response was received and blocked. This distinguishes an offered redirect from one actually followed. |
| `providerResponseOrigin` | Response URL's HTTP(S) origin, excluding credentials, path, query and fragment. `null` when unavailable. |
| `providerResponsePathname` | Response URL's sanitized pathname. Only known static route names (`ajax`, `confirm`, `captcha`, `challenge`, `thanks`) are retained; all other nonempty segments become `[redacted]` to omit recipient addresses and tokens. No query or fragment is recorded. |
| `providerResponseClassification` | `JSON` for parseable JSON; `HTML` for a nonempty HTML Content-Type or a trimmed body starting with `<`; `empty` for a blank body; otherwise `unexpected`, also used when body reading fails. This is a format classification, not evidence of acceptance or the specific upstream cause. |

The body is consumed once as text and parsed locally. Neither text nor parsed provider messages/errors are logged or returned. A declared HTML response is never accepted, even if its body looks like successful JSON. Valid JSON still needs the existing explicit acceptance checks. No request fields, subject, cookies, tokens, raw HTML, Location header, arbitrary headers, or exception details are logged. On a fetch failure before headers arrive, only the fixed outcome code is available; status, response URL and redirect state are not guessed. Redirect destinations are never requested, so there is no destination/final-chain URL to report for a blocked redirect; the logged URL is the response actually received.

After a separately approved `main` staging deployment, the owner should:

1. Confirm the exact deployed revision and context, then make one nonsensitive, uniquely marked submission using a controlled sender address. Record the timestamp and safe API response/log metadata. Check loading state, error announcement and draft retention if the provider returns HTML.
2. Check recipient activation for that staging form. If activation is required, complete the legitimate confirmation in the owner's mailbox and explicitly choose whether to make one further marked test. Check Inbox and Spam for receipt, the marker, Reply-To behavior and form URL. Provider acceptance alone does not establish delivery.
3. If HTML, 3xx, 403 or 429 persists, preserve only the safe diagnostic fields and ask FormSubmit support to confirm server relay support and the required legitimate activation/anti-spam flow. Do not disable CAPTCHA, fabricate browser headers, replay challenge cookies, automatically retry, or infer a CAPTCHA/activation cause from HTML alone.

No real submissions, activation requests, emails, browser/runtime staging tests, account changes, commits, pushes or deployments were performed in this follow-up. Actual Netlify response metadata, activation state, compatibility with provider protections and inbox delivery remain pending.
