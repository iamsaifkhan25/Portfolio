# Milestone 3D.1A: Contact Page Composition Refinement

Implemented locally on `main` on 2026-11-26. Ready for owner review; actual desktop/mobile browser acceptance remains pending.

## Scope and composition

Only `src/app/contact/page.tsx`, its scoped `page.module.css`, and this report were changed during 3D.1A. All existing uncommitted 3D.1 implementation and post-deployment report changes were preserved. No other page, shared component, global stylesheet, dependency, Git ref, or hosted setting was changed. No commit, push, merge, deployment, or real submission was made.

The left column now includes this short first-person introduction:

> I build web tools and interactive projects, and use AI workflows to explore ideas as I go.
>
> If you have a collaboration in mind or a professional opportunity to discuss, I'd like to hear about it.

This follows the existing homepage's web/interactive work and AI-assisted workflow description. It makes no claim about accomplishments, availability, or response times. The existing email address, telephone number, and New Delhi location remain verbatim.

An understated “Elsewhere” navigation adds GitHub and LinkedIn text links using the exact profile URLs already present in `src/components/Footer.tsx`: `https://github.com/iamsaifkhan25` and `https://www.linkedin.com/in/iamsaifkhan25`. No new profile was inferred and no external profile ownership check was performed. Links open normally in the same tab.

Both columns receive the same top separator and heading inset. Desktop column widths change from `2fr / 3fr` to `5fr / 6fr`, giving the introduction/contact column more room while keeping the form slightly wider. The introduction has a 40-character reading measure; social links have their own separator. No new card, icon, glow, or decorative element was added. The existing glass form surface, dark palette, serif headings, body typography, and indigo accents are retained.

Form proportions are tightened through spacing: form gaps change from 24px to 16px, label/control gaps from 12px to 8px, and the surface keeps 24px padding at desktop instead of growing to 32px. The message starts at five rows instead of six, with its minimum height reduced from 10rem to 8rem; vertical resizing remains available. Inputs and labels retain their existing readable size. These changes aim to improve balance; no rendered column-height measurement is claimed.

The exact unverified-delivery warning remains visible, including the direct-email link and “This form is available for delivery testing.” Only its presentation changes: 14px body-color text, generous line height, and a quiet bottom separator. The eventual public copy has not been substituted. The disabled-form fallback is unchanged apart from matching the column's heading inset.

## Form preservation

The submission handler, build-time presentation switch, field names, validation attributes, honeypot, duplicate lock, AJAX helper, timeout, error/success/loading states, input retention, reset behavior, and status announcements remain as implemented in 3D.1. The only form-control geometry edit is the textarea row count and scoped spacing/minimum height.

These files were SHA-256 checked before and after and remain byte-for-byte unchanged during this milestone:

| File | SHA-256 |
| --- | --- |
| `src/lib/contact.ts` | `8D9F74DD1EA101F8A06C3B3A373C426FA5969859BDB3271DC1054E3E7F4FAF4E` |
| `src/app/api/contact/route.ts` | `E28CE9086A4F206CEDCD657621E043CCB148E010CD3D87946AEF625F0D740D56` |
| `public/__forms.html` | `401A1362A3B0A7CE484A9346A6733A4140BC541B2D75AACC0004004C4AF16EED` |
| `tests/contact.test.mjs` | `3A97EC933DD5DB206EEBC3B2D0C107C13F3E6895BCC45B8F3D97DEBB64905BE7` |
| `docs/MILESTONE_3D_1_NETLIFY_FORMS.md` | `45E36B5DFA4F149E807B1959DEEA32B7476772F668D26BF0670317B0FE0A7DAF` |
| `docs/MILESTONE_3C_1_STAGING_ACCEPTANCE.md` | `73904BB15F7275F015B7A5D7A62A4D4AC06A77125470C08251712020C241217A` |

`main` remains at `2ee71294a80407afd1310cf48deed0ba0b77d13b`; local `master` remains at `0da2e282313a890f4d17c3a2b9fbd0b4a3c0af91`. The existing index remains empty.

## Verification

| Check | Result |
| --- | --- |
| `npm.cmd run lint` | Passed. |
| `npx.cmd tsc --noEmit` | Passed, including after both builds. |
| `node --test tests/*.test.mjs` | Existing suite passed: 56 tests, 0 failures; network responses mocked. Tests were not edited. |
| Enabled build | Passed with Next.js 16.4.5/Turbopack, `CONTEXT=branch-deploy`, `NEXT_PUBLIC_CONTACT_FORM_ENABLED=true`, `CONTACT_DELIVERY_ENABLED=false`. |
| Disabled build | Passed with `CONTEXT=production`, `NEXT_PUBLIC_CONTACT_FORM_ENABLED=false`, `CONTACT_DELIVERY_ENABLED=false`; this is the last local build artifact. |
| Enabled built HTML | Introduction, exact social URLs, unchanged testing warning/direct email, named form, five-row message, and live region present. All 21 referenced CSS module classes have local selectors. |
| Disabled built HTML | Introduction, social links, and direct-email fallback present; no rendered form. |
| Diff/preservation | `git diff --check` and cached diff check pass; new report whitespace checked; protected hashes match; other pages and shared styles have no changes. |

Builds used network access for the existing Google Font dependency. No font, environment file, or hosted environment setting changed. Builds and HTML checks do not verify layout, browser interaction, Netlify registration, or Gmail delivery.

Source review found:

- **Desktop/mobile:** one-column DOM order below 64rem (1024px at a 16px root); two columns at and above 64rem. The 48rem header-spacing rule is retained. The layout has no fixed content height or sticky column. Grid children can shrink, contact values wrap, and social links wrap. Mobile form padding stays at 24px.
- **Keyboard:** real links and native controls retain normal tab order; the added social links precede the form in DOM order. The honeypot stays hidden with `tabIndex={-1}`. Existing global `:focus-visible` indigo outlines remain untouched. No positive tab index, CSS reordering, or focus interception was added.
- **Status/accessibility:** label associations, required semantics, email autocomplete/type, `aria-describedby`, `aria-busy`, and the polite atomic `role="status"` region are retained. Loading disables the existing controls. Direct-email alternatives remain available in both modes and on failure. Screen-reader announcements were not heard or certified.
- **Touch targets:** primary controls, submit/email buttons, contact links, and new social links retain or specify a 3rem (48px at a 16px root) minimum height. The email link inside the warning remains an inline text link. Touch operation has not been tested on a device.
- **Reduced motion:** no animation, transform, scroll effect, or transition was added. The existing global reduced-motion override still governs inherited input/button feedback. Actual OS/browser reduced-motion behavior remains untested.

## Browser review still required

Browser inventory returned `The browser access host is unavailable`. The native Firefox fallback was then stopped by computer use because browser URL-policy enforcement is unsupported for that Windows browser. No further browser interaction was attempted, and no screenshot/visual pass is claimed.

Before acceptance, review the enabled form and disabled fallback at desktop widths around 1024/1440px and mobile widths around 320/390px. Check column balance/alignment, long email wrapping, five-row message usability, quiet but legible warning, 200% zoom, keyboard focus order/outlines, actual touch targets, screen-reader status announcements, and reduced-motion preferences. Keep submissions mocked or offline for local UI review; do not send a real message automatically.

Staging registration, the single owner-controlled legitimate submission, and Gmail notification confirmation remain governed by [MILESTONE_3D_1_NETLIFY_FORMS.md](MILESTONE_3D_1_NETLIFY_FORMS.md). Delivery is still unverified. Remove testing copy only after genuine verification and explicit approval of the public presentation.
