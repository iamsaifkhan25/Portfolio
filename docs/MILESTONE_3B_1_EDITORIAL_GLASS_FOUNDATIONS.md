# Milestone 3B.1: Editorial Glass foundations

Implemented on 2026-11-12 for owner review. Direction: **The Personal Studio Journal**. This milestone establishes shared styling and corrects the mobile navigation disclosure. Page composition and content order remain intact. No dependencies added; no commit, push, or deployment.

Read `MILESTONE_3B_0_EDITORIAL_GLASS_AUDIT.md` and the installed Next.js CSS, font optimization, and font API guides before editing. Initial `git status --short` showed only the untracked 3B.0 audit. That existing document was left untouched.

## 1. Files changed

| File | Change |
| --- | --- |
| `src/app/globals.css` | Semantic palette, spacing, radii, surface/border/shadow tokens, opt-in typography roles, glass fallback, shared controls, and focus treatment. |
| `src/app/layout.tsx` | Unique Jakarta source variable; removed body color utilities that overrode the global palette. Container structure and dimensions unchanged. |
| `src/app/page.tsx` | Applied display and introduction roles to the existing name heading and introductory sentence. Only two class attributes changed; writing, reading order, actions, and layout classes retained. |
| `src/components/BackgroundOrbs.tsx` | Connected the canvas and existing indigo/violet colors to tokens. Geometry, mesh, cyan orb, and animation behavior retained for the later shell milestone. |
| `src/components/GlassCard.tsx` | Ordinary-panel radius token; hover feedback now opt-in. Existing explicit hover choices remain supported, with color/border feedback instead of lift/glow. |
| `src/components/Navbar.tsx` | Closed-drawer focus exclusion, conditional focus restoration, breakpoint handling, current-page semantics, and representative token colors. Existing disclosure architecture and navigation destinations retained. |
| `docs/MILESTONE_3B_1_EDITORIAL_GLASS_FOUNDATIONS.md` | This implementation and verification record. |

Protected project components and their scoped stylesheet have no diff. The capsule engine still uses **420ms**, with its existing **36px** corners and transition geometry. Project data, statuses, order, case studies, screenshot/source assets, resume PDF, contact submission logic, mobile grouping/swiping, HackerRank evidence/limitations, and AI disclosure have no diff. A TypeScript AST comparison also confirmed identical homepage JSX text against `HEAD`.

## 2. Tokens implemented

Palette variables live in Tailwind's `@theme`, available to shared CSS and semantic utilities such as `bg-canvas`, `text-muted`, and `border-control`.

| Variable | Value | Role |
| --- | --- | --- |
| `--color-canvas` | `#070A12` | Page canvas |
| `--color-reading` | `#101523` | Opaque reading surface and glass fallback |
| `--color-raised` | `#151B2D` | Raised surface and opaque controls |
| `--color-primary` | `#F1F2F6` | Primary text |
| `--color-body` | `#CED3DE` | Body text |
| `--color-muted` | `#A4ADBD` | Metadata and placeholders |
| `--color-accent` | `#A5B4FC` | Accent text and focus |
| `--color-action` | `#4338CA` | Primary action |
| `--color-ambient-indigo` | `#6366F1` | Ambient indigo |
| `--color-ambient-violet` | `#8B5CF6` | Ambient violet |
| `--color-control` | `#67718A` | Essential control boundary |

- `--color-glass-bg`: `rgb(16 21 35 / 88%)`; `--color-glass-raised`: `rgb(21 27 45 / 92%)`. Decorative separators use `--color-glass-border`, white at 10%, through `--border-separator`. Controls use the separate `--border-control`.
- Spacing: `--space-1/2/3/4/6/8/12/16/20/28`, respectively 4/8/12/16/24/32/48/64/80/112px at a 16px root. Existing page gutters and section gaps were not migrated.
- Radii: `--radius-control` 12px, `--radius-panel` 20px, `--radius-capsule` 36px, `--radius-dialog` 0px, and `--radius-pill` 9999px. Capsule/dialog tokens reserve the existing geometry; their scoped implementation is unchanged.
- `--shadow-surface` combines one black elevation shadow with a faint inset upper edge. `--surface-blur` is 16px. Shared feedback uses `--transition-feedback`, 160ms, on explicitly named properties. No new animation system or blanket transition was introduced.
- `--measure-reading` prepares a 66ch measure for later prose adoption; it does not constrain existing page layouts in this milestone.

`.glass-panel` defaults to an opaque reading surface. Transparency and blur are enabled only inside an `@supports` condition accepting standard or WebKit backdrop filtering. Hover has its own opaque raised fallback. Buttons and inputs remain opaque in both modes. Removed the mobile panel's competing background/filter utilities so it inherits this fallback correctly.

Adoption is limited to the shared primitives, canvas, navigation colors, and two homepage typography examples. Project presentation, footer styling, resume typography, and contact layout await their respective milestones. Shared input/button styling reaches the existing form without changing its logic or structure.

## 3. Typography changes

The existing `Plus_Jakarta_Sans` loader now supplies `--font-plus-jakarta-sans` on `<html>`. A single `@theme inline` mapping connects `--font-sans` to that variable plus system fallbacks. The body retains `font-sans`. Removed references to unconfigured Geist fonts; monospace uses the system stack. Existing Jakarta weights remain configured; no additional font family or dependency was downloaded or introduced.

| Opt-in class | Size range | Line height / weight |
| --- | --- | --- |
| `.type-display` | 36–72px | 1.1 / 600 |
| `.type-page-title` | 32–56px | 1.2 / 600 |
| `.type-section` | 22–28px | 1.2 / 600 |
| `.type-intro` | 17–20px | 1.75 / 400 |
| `.type-body` | 16–18px | 1.75 / 400 |
| `.type-metadata` | 14px | 1.5 / 400 |

Sizes use rem-based limits with fluid viewport interpolation. Interface weight is 500. Headings use primary text, prose uses body text, and metadata uses muted text; the display role allows an explicit color treatment, retaining the existing homepage name gradient. Roles are opt-in, with no global heading or paragraph reset. The introductory sentence now uses regular weight and body contrast.

Prepared `--font-display-serif` in the Tailwind theme (`Georgia, Cambria, "Times New Roman", serif`), enabling the optional `font-display-serif` utility when adopted. No element uses it yet. Computed font selection and wrapping still need browser inspection.

## 4. Mobile navigation accessibility

- Closed drawer: `inert={!isOpen}` excludes the entire subtree, including social links and the contact CTA, from keyboard focus and interaction. `aria-hidden` remains synchronized. Opening removes inertness and leaves native link keyboard behavior intact.
- Trigger: retains its label, `aria-controls`, and synchronized `aria-expanded`, with an explicit button type and ref. Toggle uses functional state updates.
- Escape: closes the disclosure; restores trigger focus when focus is within navigation. If the user has moved focus elsewhere, closing does not steal it back.
- Outside click: preserves the existing document `mousedown` dismissal. If focus was inside the closing drawer it first returns to the trigger; the pointer's normal action can then focus the outside target.
- Destination activation: retains existing link navigation and closes the drawer. Focus returns to the trigger before its subtree becomes inert, including same-route activation; Next.js retains control of route navigation.
- Current page: exact current destinations expose `aria-current="page"` in desktop/mobile links, including the home mark and contact CTAs. Existing visual route matching remains.
- Resizing: listens to the existing 768px breakpoint, resets open state when entering desktop, and transfers drawer/trigger focus to the current desktop destination (first-link fallback). A desktop navigation control that becomes hidden on return to mobile transfers focus to the trigger. Listeners are cleaned up on unmount/state changes.
- Short viewports: the existing dropdown can scroll within the available viewport height. No modal architecture, focus trap, or replacement navigation system added. Existing reduced-motion CSS covers menu transitions.

These are implementation/source findings. Native inert behavior, tab order, actual focus transfers, route focus management, outside dismissal, and breakpoint behavior were **not verified in a browser**.

## 5. Contrast checks

Calculated using sRGB relative luminance and `(lighter + 0.05) / (darker + 0.05)`, reading the implemented hex tokens. Targets: 4.5:1 for normal text and 3:1 for essential control boundaries/focus. Rounded results:

| Background | Primary | Body | Muted | Accent/focus |
| --- | --- | --- | --- | --- |
| Canvas | 17.69:1 | 13.19:1 | 8.76:1 | 9.93:1 |
| Reading | 16.27:1 | 12.13:1 | 8.05:1 | 9.13:1 |
| Raised | 15.30:1 | 11.41:1 | 7.57:1 | 8.59:1 |
| Reading glass, 88%, over canvas | 16.47:1 | 12.28:1 | 8.15:1 | 9.24:1 |
| Reading glass, 88%, over white | 11.59:1 | 8.65:1 | 5.74:1 | 6.51:1 |
| Raised glass, 92%, over white | 12.21:1 | 9.11:1 | 6.04:1 | 6.85:1 |

White is a conservative brightest-backdrop bound for the glass calculation, not an observed page background. Active-indigo and white-hover navigation overlays over that bound retain muted-text ratios of 5.21:1 and 4.92:1, respectively.

Control boundary against raised/reading surfaces: **3.51:1 / 3.73:1**. Primary text on the primary action: **7.06:1**; accent border/focus against that action: **3.96:1**. Primary-action hover uses the opaque reading surface, retaining 16.27:1 text contrast. The existing sending button's 70% opacity was calculated at 4.76:1 over the brightest reading-glass bound. Placeholder text uses muted at full opacity. Focus outlines use opaque accent with a 2px offset and no longer overwrite component corner radii.

These numerical checks validate the adopted pairs, not every existing status, caption, decorative gradient, or rendered state. Decorative separators are not used as the sole boundary for shared form inputs or buttons. Actual compositing, focus clipping, text rendering, and untouched component states remain browser-review items.

## 6. Tests and results

| Check | Result |
| --- | --- |
| `npm.cmd run lint` | Passed; no diagnostics. |
| `npx.cmd tsc --noEmit` | Passed. |
| `npm.cmd run build` | Passed; all 11 static pages generated, existing dynamic contact route retained. |
| `git diff --check` | Passed. Git also reported normal LF-to-CRLF working-copy notices. |
| Token/font source and production CSS assertions | Passed: source custom-property declarations unique, no Geist references, generated Jakarta family present, `font-sans` maps directly to its unique variable, opaque glass default and conditional backdrop support emitted. The initial assertion was adjusted to accept generated CSS whitespace; no implementation change was needed. |
| Isolated React server-render checks | Eight cases passed: four routes multiplied by injected closed/open state; checked `inert`, `aria-hidden`, `aria-expanded`, and exact `aria-current`. State injection verifies markup only, not event handling or browser focus. |
| Preservation checks | Passed: homepage JSX text unchanged; no diff under protected data/assets/public files, project components/styles, resume/contact/API routes, or dependency manifests. |
| React review | Reviewed effect cleanup/dependencies, stable close callback, functional toggle updates, semantic disclosure attributes, and server/client boundaries. No extra client boundary or library added. |

The `.cmd` commands are the Windows equivalents of the requested npm/npx checks. Inline Node assertions used installed TypeScript and React; no testing dependency was added. A successful build is not evidence of form delivery, rendered layout, touch behavior, or animation quality.

## 7. Pending browser verification

Computer-use inventory returned no browser surfaces and `The browser access host is unavailable`. No browser page was opened and no visual, keyboard, screen-reader, or touch success is claimed.

Owner/browser review should cover:

- Closed drawer skipped by Tab/Shift+Tab; open drawer links reachable and activatable; Escape restoration; closing via trigger; outside clicks on focusable and non-focusable targets; same-route and cross-route activation; social links and contact CTA.
- Focus already outside navigation when Escape closes it; repeated toggles; resizing across 768px with focus on trigger, drawer links, desktop links, and desktop social/CTA controls. Returning to mobile must leave the menu closed.
- Computed Jakarta font on body and controls; homepage display/intro wrapping; metadata contrast; focus-ring clipping and glass appearance with backdrop filtering disabled; standard and WebKit support branches.
- Widths 320/360/390/430/768/1024/1440px, short landscape heights, 200%/400% zoom, enlarged text, and reduced motion. Check dropdown scrolling and the unchanged tablet masthead fit.
- Capsule opening/closing, focus, scroll restoration, and intentional mobile project swipes as regression checks. Their implementation is untouched, but the inherited font configuration changed.

## 8. Risks and handoff to 3B.2

The full desktop masthead still starts at 768px, and its fit remains unobserved. Existing footer wrapping, static contact-card affordances, background mesh/cyan/motion, and page-specific small text remain within later milestones. Do not treat this foundation as a completed shell or site-wide accessibility review.

Shared panels are more opaque and ordinary GlassCards use 20px corners. Typography ownership is now explicit; if the previous conflict resolved differently on a device, Jakarta metrics may change wrapping there. Review this before expanding token adoption. Keep the optional serif opt-in until owner review.

Preserve the capsule's 36px radius in CSS and transition math when later adopting its matching token. Its 420ms duration, animation targets, screenshot crops, grouping, and swipe handling remain outside 3B.2's shell/homepage scope. Duplicate case-study imagery and lead-paragraph styling from the audit remain deferred to project presentation work.

Stopped after 3B.1 for owner review. No 3B.2 layout work performed.
