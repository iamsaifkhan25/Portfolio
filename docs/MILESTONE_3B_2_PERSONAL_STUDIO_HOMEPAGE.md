# Milestone 3B.2: Personal Studio Journal homepage

Implemented on 2026-11-12 for owner review. Direction: **The Personal Studio Journal**, using the approved Editorial Glass audit and 3B.1 foundations. No commit, push, or deployment. Work stops at 3B.2.

Read both prerequisite milestone documents and the installed Next.js CSS and image guides, including image sizing/loading guidance, before implementation. Used the existing React, Next.js, Tailwind, and CSS Modules capabilities. No dependency, artwork, or asset-generation workflow added.

## 1. Files changed

The starting working tree already contained the 3B.1 modifications and both prerequisite documents. The list below describes this milestone's changes relative to that starting state, rather than attributing the entire Git diff to 3B.2.

| File | 3B.2 change |
| --- | --- |
| `src/app/page.tsx` | Asymmetric hero, metadata-backed genuine project figure, open story sections, linked closing statement; original writing retained. |
| `src/app/page.module.css` | Scoped homepage grid, spacing, serif headline, reading measures, actions, figure, captions, and responsive rules. New file. |
| `src/components/Navbar.tsx` | Plain identity and navigation links; removed decorative icons, monogram treatment, masthead socials, and duplicate Contact CTA. Retained disclosure logic and accessibility corrections. |
| `src/components/Footer.tsx` | Two information groups with the existing identity, tagline, copyright, location, email, and social destinations. |
| `src/components/BackgroundOrbs.tsx` | Replaced the animated mesh/orb markup with one static decorative ambient layer; retained the component name to avoid changing root-layout structure. |
| `src/components/SiteShell.module.css` | Scoped masthead, menu, footer, wrapping, and token-based static ambience. New file. |
| `src/app/globals.css` | Removed unused drifting/pulsing animation definitions and updated the serif usage comment. All 3B.1 palette, font, typography, focus, glass fallback, and reduced-motion rules retained. |
| `docs/MILESTONE_3B_2_PERSONAL_STUDIO_HOMEPAGE.md` | This implementation and verification record. New file. |

`layout.tsx` and `GlassCard.tsx` retain their starting 3B.1 bytes. The shared main container and all protected page widths remain unchanged.

## 2. Homepage layout decisions

- At 64rem and wider, the hero uses `minmax(0, 7fr) minmax(0, 5fr)` with 48px between columns. The image column aligns vertically with the introduction. The existing shared page maximum remains 1024px, avoiding changes to the Projects container.
- The original name remains visible above the curiosity statement. The curiosity statement is now the single `h1` and strongest visual message, using 3B.1's display size and prepared system serif family. Supporting copy uses the existing introduction role. No gradient headline, badge surface, glow, or icon tiles remain.
- Below 64rem, the DOM and visual order are text, actions, then project figure. Actions stack below 30rem and otherwise wrap naturally. There is no fixed hero height, spacer, CSS reordering, or viewport-height minimum.
- Where I Started, Learning as I Go, and How I Work remain in order. Each is a labelled section with an `h2`, thin top rule, and full prose row. From 48rem, headings sit beside a two-thirds-width prose column; narrower screens stack them. The longer workflow explanation receives that entire prose column rather than a third-width card.
- Prose is capped by the existing 66ch reading measure. Major sections are separated by 48px on mobile and 80px from tablet widths. Static content has no hover-lift behavior.
- The closing statement remains verbatim, left aligned and quietly linked to `/projects`.

A TypeScript AST comparison against the starting homepage confirmed all **13 original JSX text passages** match, in order, after normalizing layout whitespace. The personal introduction, background, learning story, AI-assisted workflow explanation, and closing statement were not rewritten. The figure adds only the existing project title and approved caption from metadata.

## 3. Genuine image integration

The homepage reads Open Study Deck's existing `coverImage` from `src/data/projects.ts`:

| Property | Verified value |
| --- | --- |
| Optimized path | `/projects/open-study-deck/home.webp` |
| Original source | `Sources/OpenStudyDeck/Home Page OSD.png` |
| Dimensions | 1600 x 785 pixels |
| Optimized file size | 55,888 bytes |
| Optimized SHA-256 | `8629622814395c232cbf0215dd4706bb3c0b6a8255f723c2d11992e0ff6c3214` |

Both optimized and original source hashes match `docs/project-image-manifest.json`. Sharp independently confirmed the optimized file's dimensions. No image bytes or metadata files changed.

`next/image` receives the existing source, alt text, width, and height, plus responsive `sizes` and eager loading. CSS uses full available width and automatic height, retaining the complete aspect ratio without cropping, transforms, overlays, or invented framing. The figure links to `/projects`, presents the exact project title and approved caption, and adds no capsule/expansion behavior.

## 4. Navigation and footer

The normal in-flow masthead presents **Saif Khan** and four straightforward destinations: Home, Projects, Resume, Contact. There is one Contact link per responsive navigation group. GitHub and LinkedIn remain accessible as named text links in the footer, retaining the original URLs and safe external-link attributes.

The active route uses accent text and an underline, without a glow or pill. Current-page semantics remain exact-route `aria-current="page"`, including the home identity. The four text links have a substantially smaller footprint than the former icons/socials/CTA row.

Desktop links appear from **48rem** (768px at the default initial font size). CSS and `matchMedia` use the same query. This retains the previous default threshold after reducing its content; the desktop group can wrap if font metrics require it. Actual tablet fit is still a browser check. The homepage's 64rem split is independent of this threshold and the untouched Projects breakpoint.

The existing toggle state, `aria-controls`, `aria-expanded`, closed-state `inert`/`aria-hidden`, Escape handling, outside dismissal, activation closing, conditional focus restoration, and breakpoint focus transfer remain. The drawer also uses closed-state visibility and a scrollable height bounded by the viewport. It remains a disclosure, with no navigation library or modal introduced.

The footer has two quiet groups: identity/tagline/copyright and location/email/socials. They stack on mobile and sit side by side from 48rem. Text uses the 14px metadata size; contact/social links have at least 44px height. Zero-minimum grid tracks, `min-width: 0`, `max-width: 100%`, wrapping social links, and `overflow-wrap: anywhere` allow long contact details to reflow. The footer has one top separator and no promotional CTA or blur-dependent surface.

## 5. Background and animation

- Replaced the mesh, three moving orbs, cyan accent, blur fields, and ambient overlay with two static radial treatments: token-based indigo at 8% and violet at 6%, fading into the canvas. If the gradient/color-mix declaration is unsupported, the opaque token canvas remains.
- Removed unused float and pulse animation definitions. The homepage has no route-entry animation. Existing other-page entrance animation remains unchanged, avoiding an unrelated project/resume/contact presentation change.
- Shell feedback uses the existing 160ms token on explicit color, text-decoration color, background color, and disclosure opacity properties. There are no static-content transforms, scroll reveals, parallax, cursor effects, or new animation dependencies.
- Retained the global reduced-motion override and the untouched project dialog's JavaScript preference listener. No performance measurement or rendered motion success is claimed.

## 6. Accessibility and preservation

- Semantic single homepage `h1`, three labelled story sections with `h2` headings, meaningful image alternative/caption, native links, and preserved DOM reading order.
- Existing global focus-visible outline, skip link, font ownership, palette, control boundaries, opaque glass defaults, and conditional standard/WebKit backdrop-filter enhancement remain intact. Masthead and drawer continue to use that shared glass fallback without overriding its background/filter behavior.
- Actions and menu trigger have at least 48px height. Decorative action/menu icons and the ambient layer are hidden from assistive technology.
- Grid tracks can shrink; images preserve aspect ratio; actions/socials wrap; long footer details can break. No new horizontal-scroll area was added. These are source safeguards, not measured proof of overflow-free rendering. The inherited body `overflow-x: hidden` is not treated as verification.
- Byte comparison against a snapshot taken before editing confirmed only the five listed existing application files changed. Project page/layout/components/styles, 420ms mechanics, 36px capsule geometry, mobile swipe groups, approved descriptions and AI disclosure, project data, screenshot/source assets and provenance, PDF, Resume/Contact pages, form API, HackerRank evidence, dependency manifests, and prior documents retain their starting bytes.

## 7. Verification results

| Check | Result |
| --- | --- |
| `npm.cmd run lint` | Passed, no diagnostics. |
| `npx.cmd tsc --noEmit` | Passed. |
| `npm.cmd run build` | Passed after final CSS adjustment; all 11 static pages generated and dynamic contact route retained. |
| `git diff --check` | Passed; Git reports normal LF-to-CRLF working-copy notices. |
| Homepage text comparison | All 13 original passages preserved and in order against the starting 3B.1 files. |
| Isolated homepage server render | Single `h1`, single image, 1600 x 785 attributes, genuine image path, approved caption, and text/actions/figure/story/closing order confirmed. |
| Navigation render checks | Eight isolated cases (four routes x open/closed) passed for `inert`, `aria-hidden`, `aria-expanded`, controlled drawer ID, and exact current-page semantics. Injected state checks markup, not browser events or focus. |
| Disclosure implementation comparison | Focus/restoration, Escape/outside handling, state updates, and breakpoint listener logic match the starting 3B.1 implementation; only the matching query notation/comment changed. |
| Genuine image checks | Sharp dimensions and both source/optimized SHA-256 hashes match the provenance manifest. |
| Footer preservation | Original text, email destination, and both social destinations retained. Wrapping rules reviewed in source. |
| React review | Server-rendered homepage/footer/background retained; navigation remains the existing client boundary. Effect cleanup/dependencies and functional toggle updates preserved; no new client dependency added. |
| Responsive/reduced-motion/overflow review | Source and render-markup review only. Real layout, computed styles, focus behavior, and motion remain unverified. |

The `.cmd` commands are the Windows equivalents of the requested npm/npx commands. Verification used installed TypeScript, React server rendering, Sharp, and byte/hash comparisons without adding test dependencies or permanent test files. Builds and isolated renders do not establish visual, keyboard, touch, screen-reader, or form-delivery success. No form was submitted.

Browser inventory reported `The browser access host is unavailable`. A running native Firefox window was found, but selecting it was stopped by Computer Use because browser URL-policy enforcement is unsupported for the current Windows browser. No page inspection or screenshot verification succeeded. Browser automation was stopped after that response.

## 8. Remaining manual browser checks

- Review 320/360/390/430/768/1024/1440px widths, short landscape heights, 200%/400% zoom, and enlarged text. Confirm headline wrapping, serif/Jakarta rendering, balanced desktop split, natural mobile height, full image framing, caption legibility, and comfortable workflow measure.
- Confirm the four plain desktop links fit at the threshold; check just below/above 48rem and the hero split at 64rem. Verify no horizontal overflow or clipped content, including with the inherited overflow suppression disabled for inspection.
- Tab/Shift+Tab through the skip link, identity, desktop links or mobile trigger, homepage actions, figure, closing link, and footer. Closed drawer links must be skipped. Verify focus rings stay visible and unclipped.
- Open and close the disclosure using keyboard and pointer; check Escape focus return, focus already outside navigation, outside dismissal, same-route/cross-route activation, repeated toggles, short-viewport drawer scrolling, and resize focus transfer in both directions. Returning to mobile should leave it closed.
- Check footer email/location/social wrapping at narrow widths and zoom. Confirm all existing links reach the intended destination.
- Enable reduced motion, check immediate menu changes and still ambience, and inspect opaque masthead/drawer fallback with backdrop filtering disabled. Review actual text/focus contrast against rendered surfaces.
- Smoke-check unchanged Projects capsules, opening/closing, 420ms transition, 36px starting corners, focus/scroll restoration, and intentional mobile swipes under the shared shell. Resume and Contact receive only shared-shell changes; verify their navigation/footer integration without redesigning or submitting the form.

Stopped after 3B.2 for owner review. Later project presentation, Resume/Contact refinement, and deployment remain outside this milestone.
