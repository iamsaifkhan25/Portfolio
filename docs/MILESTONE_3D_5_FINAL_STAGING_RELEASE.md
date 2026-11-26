# Milestone 3D.5: Contact form final staging release

Reviewed on 2026-11-26 in `C:\Dev\Portfolio`, on `main`.

## Scope and delivery evidence

The owner authorized a reviewed checkpoint and push only to `origin/main`, followed by exact-commit Netlify branch-deploy verification. No production PR, merge, push, deployment, notification change, spam-filter change, or real automated submission is authorized.

The initial working tree contained Contact page code/styles, contact tests, README, six tracked milestone/workflow records, and the untracked default-state report. All were reviewed and preserved. No unrelated assets, credentials, environment files, generated output, or private source material belong in the checkpoint. Next.js rewrote its generated `AGENTS.md` block during the local server check; that incidental change is excluded and restored.

The owner reports that two test submissions initially classified as spam were manually verified, after which their email notifications arrived. This demonstrates registration, storage, and the notification path. It does not prove automatic verification of a fresh legitimate submission. An authenticated read during this milestone confirmed `portfolio-contact` (ID `6b07ee59ea505484e56e0bfe`), two stored submissions, the expected name/email/message/bot-field fields, and `honeypot=true`. No submission content was read and no message was sent.

The form remains first in the right desktop panel, with Contact Details and social links in the left panel. On mobile, details precede the form. Failure replaces only the form controls with Email Saif and Try again; retry restores the draft without sending. Accepted HTTP responses clear the fields and show exactly: "Thanks for reaching out! Your message has been submitted." Direct email is always available. The staging testing notice remains visible.

## Verification of this candidate

| Check | Result |
| --- | --- |
| Lint | `npm.cmd run lint`: passed. |
| TypeScript | `npx.cmd tsc --noEmit`: passed. Both builds also passed their type checks. |
| All tests | `node --test tests/*.test.mjs`: 68 passed, 0 failed. All submission requests mocked. |
| Default local presentation | Fresh `next dev` at `127.0.0.1:3107`, both public Contact variables unset: HTTP 200, named form, updated name/email placeholders, staging notice, details first, direct email, no disabled fallback. No environment file created. Server stopped after checking. |
| Failure and retry | Mocked component interactions passed for validation, HTTP rejection, network failure, redirected response, and timeout. Failure copy/actions appear, details stay first, draft survives, retry makes no request. Ref/effect focus checks are simulated, not browser focus proof. |
| Acceptance | Mocked pending/duplicate/accepted interaction passes; accepted fields clear and approved thank-you text appears without claiming inbox delivery. |
| Enabled build | Passed with form `true`, notice verification `false`, legacy delivery `false`, `CONTEXT=branch-deploy`. Generated HTML contains the form identity, all submitted fields including honeypot, notice, and details before form. |
| Disabled build | Passed with form `false`, notice verification `false`, legacy delivery `false`, `CONTEXT=production`. This remains the final local build artifact. |
| Preserved integration | `src/lib/contact.ts`, `public/__forms.html`, `src/app/api/contact/route.ts`, and `netlify.toml` remain unchanged. Tests confirm encoded Netlify POST fields and the retired API returns 410 without fetching, even with legacy flag `true`. |
| Browser acceptance | Unverified: browser inventory reports its access host unavailable; native Firefox inspection stopped because browser URL-policy enforcement is unsupported. No desktop/mobile visual, keyboard, screen-reader, or hosted interaction pass is claimed. |

## Production safety gate

Current file configuration is explicit: `[build.environment] NEXT_PUBLIC_CONTACT_FORM_ENABLED="false"`, with `[context.main.environment]` overriding it to `"true"`. The application itself shows the form when the value is unset. Both enabled and disabled production compilations passed; these local checks do not establish the effective hosted production build environment.

Before any future production merge, record the exact candidate, recheck scoped hosted build configuration, and deliberately choose `NEXT_PUBLIC_CONTACT_FORM_ENABLED=true` with owner enablement approval, or `false` to keep email-only contact. An unset value is not an acceptable release decision. These public values are compiled during the build, so runtime-only changes are insufficient. Keep the testing notice until final acceptance. The legacy FormSubmit API remains inactive regardless of its former flag; do not weaken spam filtering or remove the honeypot.

Hosted scoped-variable verification could not complete: the connector offers an all-variable listing rather than a targeted read, and automatic approval review rejected that listing because it could expose unrelated secrets. The safer official CLI read of only `NEXT_PUBLIC_CONTACT_FORM_ENABLED` for the production build scope returned Unauthorized. No hosted settings were changed. This remains a required check before a future production release.

## Staging checkpoint and acceptance

Initial `main` and live remote `main` matched `9165aca869f049ba10e75d9121ee06a8b7b42c04`; fresh fetch showed no divergence. Remote `master` was `2ee71294a80407afd1310cf48deed0ba0b77d13b`; local `master` was `0da2e282313a890f4d17c3a2b9fbd0b4a3c0af91`. Published production deploy was `6af5e5e9fee75cf19ffa3865`, `ready`, `master` / `production`, at that remote production commit.

Working and staged whitespace checks passed. The twelve staged files exactly match the reviewed working contents; the credential-pattern scan found no matches. Only the intended Contact code/styles/test, README, and milestone/workflow documentation are staged.

The connector reports the existing `main` / `branch-deploy` and unchanged published `master` / `production` deploy, but omits configured build branches. The official CLI branch-settings read returned Unauthorized. Today's 3D.2 record contains prior owner confirmation of production `master` and branch deploy `main`; fresh confirmation was requested for this staging push and is pending. Per `AGENTS.md`, the checkpoint uses `[skip netlify]` until the current branch settings are confirmed. This suppresses an automatic deployment, so no new staging deploy is claimed. A later ordinary checkpoint is needed to deploy once that gate clears. No settings are changed to work around it.

The checkpoint SHA, push result, and final production preservation will be reported separately. Any post-checkpoint evidence update stays local.

Owner acceptance must review [the protected staging Contact page](https://main--saifkhans.netlify.app/contact): desktop left/right layout and social links, mobile stacking, updated copy, always-accessible direct email, failure/retry with draft preservation, and thank-you behavior. A fresh legitimate submission's automatic spam classification remains an owner-controlled check. No real submission is sent automatically. Stop here for owner-hosted acceptance; do not create or merge a production PR.
