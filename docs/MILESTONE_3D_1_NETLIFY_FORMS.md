# Milestone 3D.1: Native Netlify Contact Forms

Implemented locally on 2026-11-26 in `C:\Dev\Portfolio`, on `main`.

**Status: ready for owner code review. Local checks pass with the form enabled and disabled. Netlify registration, hosted interactions, submission storage, and Gmail notification delivery remain unverified. No commit, push, deployment, production release, or real submission was made.**

## Git preparation and preservation

Initial `main` and `origin/main` were `4108337fc36c37f929964ce155db1f8e922707bd`. The only local modification was the uncommitted post-deployment report, `docs/MILESTONE_3C_1_STAGING_ACCEPTANCE.md`; the index was empty.

Fetched `origin` and inspected history and file differences. `origin/master` was production merge `2ee7129`, a direct descendant of `main`, with the same tracked file tree. Ran `git merge --ff-only origin/master` on `main`: this moved `main` to the existing production merge without creating a commit. No stash, reset, branch switch, or conflict resolution was needed. `origin/main` remains at `4108337` until a separately authorized push.

Local `master` remains `0da2e282313a890f4d17c3a2b9fbd0b4a3c0af91`; it was not modified. The staging report retains its exact initial SHA-256, `73904BB15F7275F015B7A5D7A62A4D4AC06A77125470C08251712020C241217A`, including all pre-existing uncommitted evidence.

## Changed files

| File | Change |
| --- | --- |
| `public/__forms.html` | Hidden, static detection definition for the single form `portfolio-contact`, with Netlify detection and honeypot attributes. |
| `src/app/contact/page.tsx` | Reuses the existing contact layout and controls; adds form identity, hidden honeypot, synchronous submission lock, and loading/acceptance announcements. |
| `src/lib/contact.ts` | Replaces the JSON API client with URL-encoded AJAX to `/__forms.html`; retains validation, limits, timeout, and safe errors. |
| `src/app/api/contact/route.ts` | Removes all FormSubmit network delivery and diagnostics; returns an unconditional, uncached HTTP 410 disabled response for stale clients. |
| `tests/contact.test.mjs` | Replaces retired relay scenarios with native-form transport, validation, rendering, state-transition, and disabled-endpoint tests. |
| `docs/MILESTONE_3D_1_NETLIFY_FORMS.md` | Implementation, evidence, rollout instructions, and pending acceptance record. |

The pre-existing staging report remains modified but was not edited by this milestone. No CSS, global design, typography, homepage, project content/assets, resume, dependencies, or lockfile changed.

## Submission behavior

The visible form and static definition have the same five submitted field names: `form-name`, `name`, `email`, `message`, and `bot-field`. The hidden identity is `form-name=portfolio-contact`; `netlify-honeypot="bot-field"` is declared on the static definition. The honeypot control is hidden from visitors and keyboard navigation, and its value is included in the request for Netlify to assess.

The browser validates required fields and email format. The client also rejects blank/invalid input and raw lengths above 100 name characters, 254 email characters, or 5,000 message characters. Native `required`, `type="email"`, and `maxLength` attributes remain. These are client checks; a custom HTTP client can bypass them.

Submission uses `fetch("/__forms.html", { method: "POST", ... })`, `Content-Type: application/x-www-form-urlencoded`, and a `URLSearchParams` body. It does not use JSON, server actions, or `/api/contact`. The synchronous ref blocks repeated events before React renders disabled controls. Sending is announced in the existing live region; input remains present while pending and after validation, HTTP, network, or timeout failures. Only a non-redirected successful HTTP response resets the form and shows acceptance. Acceptance does not prove storage, spam classification, or email delivery.

The direct Gmail address and email-app links remain available in both presentation modes and alongside errors. Existing labels, control styles, responsive CSS, and keyboard semantics are preserved in source. Desktop/mobile appearance and keyboard operation still need browser review.

Netlify's built-in filtering and the honeypot are the spam protection for this milestone. No CAPTCHA, key, external service, or dependency was added. See the official [spam-filter guidance](https://docs.netlify.com/manage/forms/spam-filters/).

## Presentation and legacy delivery

| Context | `NEXT_PUBLIC_CONTACT_FORM_ENABLED` | `CONTACT_DELIVERY_ENABLED` |
| --- | --- | --- |
| Production | Explicit `false` until delivery is verified and enabling is owner-approved | Keep unset or `false` |
| Staging `main` | Unset or exact `true` shows the form; Netlify `main` explicitly uses `true` | Keep unset or `false` |

Current configuration semantics (updated by the default-state fix): unset or exact `true` renders the form; exact `false` and every other explicit value disable it. The public switch is compiled into the build, so changing it requires restarting development or rebuilding production. Before releasing to `master`, the owner must verify real delivery and approve enabling, or explicitly configure `NEXT_PUBLIC_CONTACT_FORM_ENABLED=false` in Netlify's production build context. The existing `netlify.toml` build default remains `false`. The historical verification results below describe their original revision; see [the default-state verification](CONTACT_DEFAULT_STATE_FIX.md) for the current checks. No environment file or hosted setting was changed by this fix.

The switch controls presentation, not access to Netlify's form processor. The static definition remains present in both builds so it can be registered before visitors see the form. Hiding the UI does not revoke a previously registered Netlify form.

`CONTACT_DELIVERY_ENABLED` no longer activates anything in this implementation. The retired route cannot parse, forward, or deliver input, even if an old hosted setting is `true`. Tests inject that value into an isolated module context; the actual delivery environment was never enabled.

After registration, storage, and Gmail delivery pass owner verification, remove the obsolete `/api/contact` tombstone in a reviewed cleanup once stale clients are no longer relevant, and remove obsolete hosted `CONTACT_DELIVERY_ENABLED` settings. The old FormSubmit fetch, JSON protocol handling, provider diagnostics, and provider-specific tests have already been removed. Preserve earlier milestone documents as historical evidence. Do not reactivate the old relay during staging or rollback.

## Local verification

| Check | Result |
| --- | --- |
| `npm.cmd run lint` | Passed, exit 0. |
| `npx.cmd tsc --noEmit` | Passed, exit 0, including after the final build. |
| `node --test tests/*.test.mjs` | 56 passed, 0 failed: 51 contact cases and the existing five site/context cases. |
| Enabled production compilation | Passed with `CONTEXT=branch-deploy`, `NEXT_PUBLIC_CONTACT_FORM_ENABLED=true`, `CONTACT_DELIVERY_ENABLED=false`. |
| Disabled production compilation | Passed with `CONTEXT=production`, `NEXT_PUBLIC_CONTACT_FORM_ENABLED=false`, `CONTACT_DELIVERY_ENABLED=false`. |
| Built contact HTML | Enabled artifact contains the named form, identity, and email link; disabled artifact contains no form and retains the email fallback. Static definition remains present. |
| Git whitespace and scope checks | `git diff --check` and `git diff --cached --check` passed; index empty; protected content/design paths unchanged. |
| Browser review | Not performed: computer-use inventory returned `The browser access host is unavailable`. |
| Netlify/Gmail | Not tested; no hosted request, real message, or notification was sent. |

Builds used Next.js 16.4.5/Turbopack. The initial sandboxed build failed downloading the existing Plus Jakarta Sans font; a network-enabled retry passed. No font code or asset was changed. These are standard Next.js builds, not a hosted OpenNext adapter build or Netlify post-processing test.

Tests cover required fields, invalid email, oversized input and boundaries, special characters/Unicode in URL encoding, field parity, honeypot forwarding, rapid duplicate events before rerender, loading/disabled controls, successful HTTP acknowledgements without JSON, HTTP rejection, network errors, timeout, redirects, failed-input retention/retry, acceptance/reset, enabled/disabled presentation, labels/live-region markup, direct email, and the permanently disabled relay. Component event/state cases use a small hook harness against actual TSX; presentation cases use React server rendering. Network responses are mocked. These checks do not establish browser behavior or working delivery.

## Owner-controlled staging steps

1. Review this diff and authorize any later checkpoint/push/deploy separately. Verify Netlify production still builds from `master` and `main` is a separate staging branch deploy. Follow [DEPLOYMENT_WORKFLOW.md](DEPLOYMENT_WORKFLOW.md); do not publish this candidate to production.
2. **Owner reported on 2026-11-26: form detection is enabled.** This was supplied in chat, not independently inspected. Confirm Forms > Form detection remains enabled for the intended project. Detection takes effect on a subsequent deploy; it does not register an undeployed local file. See [Netlify Forms setup](https://docs.netlify.com/manage/forms/setup/).
3. Keep the production presentation switch `false`; explicitly set the staging build switch to `true` only when testing is authorized. Leave legacy delivery unset/`false` everywhere. Deploy the reviewed static definition and client to staging, recording branch, commit, deploy ID, and URL. Do not suppress the adapter's forms verification check. This follows the [OpenNext Next.js Forms guide](https://opennext.js.org/netlify/forms).
4. Confirm the staging deploy includes `/__forms.html`, with all matching field names, and Netlify Forms registers **`portfolio-contact`**. Check the hosted build/post-processing logs if it does not. A successful local build or GET of the static file alone is insufficient.
5. Under Forms > Submission notifications, add an email notification for `portfolio-contact` to `iamsaifkhan25@gmail.com`. Verify it saved successfully. Netlify currently permits an active team member or a confirmed outside recipient; outside-recipient confirmation is rolling out gradually. If Gmail is pending, open its confirmation email and confirm before testing. If the account requires a team-member address, resolve that owner-side requirement first. See [Netlify notification requirements](https://docs.netlify.com/manage/forms/notifications/).
6. Review staging `/contact` on desktop and mobile, including keyboard focus, required/email validation, readable labels, hidden honeypot, status announcements, disabled controls while pending, and direct-email links. With offline/network rejection, confirm input remains available and no false success appears.
7. Make **one legitimate, owner-controlled submission** with a real sender email and a meaningful message. Leave the honeypot empty. Inspect that the request is a URL-encoded POST to `/__forms.html` with the five expected fields. Record the HTTP result and UI state; avoid repeated test traffic.
8. Confirm that exact message appears under Netlify Forms > `portfolio-contact`. If absent, check **Spam** and review the detection/field configuration before retrying. Netlify may silently reject filled honeypots; HTTP acceptance alone does not prove a verified submission. See [form troubleshooting](https://docs.netlify.com/manage/forms/troubleshooting-tips/).
9. Confirm its notification arrives in Gmail, including Spam/All Mail if needed, and that the sender email is available for reply. Record storage and email evidence separately. A stored submission without an email requires notification configuration investigation.
10. Record the outcome below and return for owner review. Keep production disabled until a separately reviewed release explicitly authorizes enabling it. If staging fails, keep the direct-email fallback and disable staging presentation on a new staging build; never enable FormSubmit as a workaround.

## Pending staging acceptance record

| Evidence | Status |
| --- | --- |
| Form detection | Enabled per owner; not independently inspected |
| Reviewed staging commit/deploy ID/URL | Pending |
| `portfolio-contact` registration and field names | Pending |
| Notification saved and recipient eligible/confirmed | Pending |
| Desktop/mobile/keyboard/status review | Pending |
| One controlled submission and HTTP/UI result | Pending |
| Matching Netlify verified/spam submission | Pending |
| Matching Gmail notification | Pending |
| Production presentation remains disabled | Required owner setting check; no hosted settings changed here |

Installed Next.js guides read before edits: `public-folder.md`, `environment-variables.md`, the Form component reference, and the Route Handlers guide under `node_modules/next/dist/docs/01-app/`. Official Netlify/OpenNext references above were checked on 2026-11-26.
