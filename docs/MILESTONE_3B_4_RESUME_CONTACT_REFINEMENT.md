# Milestone 3B.4: Resume and Contact editorial refinement

Prepared on 2026-11-12 for review on `main`.

## Changes

Resume now uses the existing Editorial Glass typography, serif page and section headings, quiet separators, and reverse chronological experience rows. Dates occupy an understated column on desktop and stack above the role on mobile. Role names and employers have clear visual priority. Work highlights and competencies are plain lists. Removed the glowing timeline, icon panels, badge treatments, hover effects, and page entrance animation. Education is presented as readable rows with the existing incomplete-degree disclosure.

All three experience records, responsibilities, dates, highlights, two education records, and seven competencies are retained verbatim. The existing AI-assisted development disclosure and Projects link are retained. The actual PDF and its download destination/name are unchanged.

Contact now presents email, telephone, and location as three definition-list rows. Long values wrap instead of truncating. The default presentation explains that the form is disabled while delivery is verified and provides a prominent `mailto:iamsaifkhan25@gmail.com` action. The email address remains visible and copyable; the telephone destination and New Delhi location are unchanged. Opening a mailto link depends on the visitor's email app configuration; the page explains that it opens an email app.

The preserved form can be explicitly exposed for delivery testing. It uses one restrained glass surface, 16px labels and input text, 48px minimum control heights, more spacing, autocomplete for name/email, explicit required labels, and a vertically resizable message field. It retains validation limits, submission helper, sending/disabled state, input retention on error, and reset on acceptance. The named form references its testing notice and required-field help. Its persistent polite, atomic status region distinguishes provider acceptance from confirmed inbox delivery, and errors include a direct email link. No decorative motion was added.

Styles are scoped to the two new page CSS modules. Both pages reuse existing color, spacing, typography, separator, surface, and control tokens. Global focus outlines and reduced-motion handling remain in place. Mobile layouts use a single column; resume date columns and the two-column competencies list begin at 48rem, and the contact columns begin at 64rem. Grid tracks use `minmax(0, ...)`, and contact values can wrap anywhere. Actions and contact links have 48px minimum heights; contextual inline links retain normal prose geometry.

## Contact fallback configuration

The presentation switch is `NEXT_PUBLIC_CONTACT_FORM_ENABLED`, read directly in `src/app/contact/page.tsx`.

| Value | Presentation |
| --- | --- |
| Unset, `false`, or any value except exact lowercase `true` | Email-first fallback; no form or input controls rendered. |
| Exact `true` | Form rendered with an explicit unverified-delivery/testing notice and direct email link. |

This is a public, non-secret, **build-time presentation setting**. Changing it requires restarting the development server or rebuilding the production app. A setting changed only when starting an already-built app will not change its bundled presentation. No environment file or deployment setting was created or changed in this milestone.

For local testing in a dedicated PowerShell session:

```powershell
$env:NEXT_PUBLIC_CONTACT_FORM_ENABLED = 'true'
npm.cmd run dev
```

Stop the server and use `Remove-Item Env:NEXT_PUBLIC_CONTACT_FORM_ENABLED` (or set it to `false`) before restarting to restore the fallback. For a production-mode local test, set the value before `npm.cmd run build`, then run `npm.cmd run start`.

For future staging delivery tests, the owner can separately authorize this flag in the pre-production build context and rebuild that reviewed revision, following [DEPLOYMENT_WORKFLOW.md](DEPLOYMENT_WORKFLOW.md). Use the owner-controlled submission, Network/log inspection, activation, and inbox-verification procedure in [Milestone 3B.3A](MILESTONE_3B_3A_CONTACT_DELIVERY_FIX.md). Keep production on the default fallback during those tests. The latest staging submission failed, and delivery remains unverified. Do not treat an HTTP 200 or provider acceptance as proof of inbox delivery.

After successful staging inbox delivery testing, record the tested revision, environment, response, and matching received message. The form can then be enabled for a separately approved release using the same exact `true` setting before its build. This change intentionally retains the conservative testing notice even when enabled; changing that wording to claim verified delivery needs a later reviewed change backed by the delivery evidence. Reverting the flag to `false` and rebuilding restores the fallback without removing the form implementation.

The flag does not disable, secure, or alter `POST /api/contact`. Direct API and mocked regression testing remain possible. The repaired route, shared validation/browser helper, provider, recipient, diagnostics, deadlines, and existing tests are unchanged. No real email submission or activation request was made in this milestone.

## Verification

Consulted the installed Next.js server/client component, CSS, and environment-variable guides before implementation. Applied the React best-practices review to component structure, stable list keys, event handling, scoped styles, native controls, and accessible naming.

| Check | Result |
| --- | --- |
| `npm.cmd run lint` | Passed. |
| `npx.cmd tsc --noEmit` | Passed. |
| `npm.cmd run build` | Passed with the form disabled and with exact `true`; `/contact` and `/resume` prerendered, `/api/contact` remains dynamic. Final local build uses `false`. |
| `npm.cmd run test:contact` | 84 passed, 0 failed. Existing suite unchanged; provider calls mocked. |
| Content preservation | TypeScript AST comparison confirms identical experience, education, and skills initializers against `HEAD`. Isolated React server renders confirm the AI disclosure text is unchanged after whitespace normalization. |
| Configuration and semantics | Isolated server rendering checks confirm unset, `false`, `TRUE`, `1`, and an unknown value hide the form. Exact `true` renders the notice, three required/named fields with matching labels, autocomplete, a polite live region, and one glass surface. Both presentations retain the intended contact destinations. |
| Production rendering | Enabled build HTML contains the form, delivery warning, direct email link, and 100/254/5000 field caps. Disabled build HTML contains the email fallback and no form controls. These are HTML checks, not browser interaction or delivery tests. |
| PDF integrity | SHA-256 remains `AB7027A0987C00E69E80FF5D505AAF4211BBE7E72EAEC677F950C98D1CB7AB3A`. |
| Responsive/accessibility source review | Checked mobile-first stacking, bounded grid tracks, wrap rules, prose measure, 16px inputs, control heights, labels, named sections/form, required help, busy/disabled handling, status text, existing global focus outlines, and absence of added motion. |
| Diff review | `git diff --check` passed. Changes are restricted to the two pages, their two CSS modules, and this report. Existing LF-to-CRLF Git notices are not whitespace errors. |

Homepage layout/writing, project case studies/data/images, capsule expansion and mobile swipe code, PDF, API/helper/tests, global styles, dependencies, branch configuration, and deployment settings remain unchanged. No commit, push, merge, or deployment was performed. Work remains on `main` for owner review.

## Outstanding browser and delivery checks

Browser inventory returned no connected browsers and `The browser access host is unavailable`. No visual, interaction, screen-reader, or mobile browser success is claimed.

- Review both pages at 320, 375, 768, 1024, and 1440px, plus 200% zoom. Check title wrapping, long email and employer text, dates, list spacing, and absence of horizontal scrolling.
- Check keyboard order and visible focus for the PDF, Projects link, mailto/tel links, and enabled form controls. Verify the downloaded PDF opens correctly and the mailto/tel handlers use the intended destinations.
- Check enabled-form native required/email validation, autocomplete, textarea resizing, loading and disabled state, duplicate-submit protection, retained inputs on error, and reset on acceptance. Use mocked responses for UI checks without sending mail.
- Check screen-reader section/form names, required-field help, delivery notice, busy state, and success/error announcements. Check touch targets and mobile input zoom behavior in an actual browser.
- Review reduced motion, shared navigation, opaque surface fallback, and page transitions for visual consistency with Home and Projects.
- Actual FormSubmit/Netlify runtime behavior, provider activation, and inbox delivery require the separate owner-controlled staging procedure above. The fallback remains the default until delivery is verified and enabling the form is approved.
