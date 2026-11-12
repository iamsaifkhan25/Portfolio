# Milestone 3B.2B: Homepage project expansion

Implemented on 2026-11-12 for owner review on `main`, starting from clean checkpoint `c92c8ca`. No commit, push, release, deployment, or external setting change. `master` was not changed.

## Implementation

- The Open Study Deck homepage image is now a native button that opens the existing full-screen case study directly. Opening and closing do not change the URL or navigate to `/projects`.
- `HomeProjectPreview.tsx` is the small client boundary for that button. The homepage remains a server component; its existing image is passed as server-rendered children. Introduction, journal sections, caption, and other navigation remain server-rendered. The explicit Explore Projects link and closing Projects link remain available.
- `ProjectDetailDialog.tsx` contains the dialog extracted from `ProjectShowcase.tsx` and a shared selection hook. Both entry points use the same dialog, `ProjectDetail`, and project metadata. No case-study content or accessibility controller was duplicated.
- The extracted native modal retains its labelled dialog, initial close-button focus, Tab/Shift+Tab containment, Escape interception, scrollable details, background scroll locking, saved page position, and focus restoration with `preventScroll`. Projects row offsets are still restored after closing.
- The 420ms Web Animations API transition and inert, assistive-technology-hidden snapshot remain. Corner radii now come from the actual trigger and are compensated for horizontal and vertical scaling. The inverse-scaled snapshot preserves the source image ratio at the transition endpoints, supporting the homepage's uncropped landscape image and the existing tall capsules.
- Source clipping accounts for both the viewport and an overflowing Projects row. Disconnected, offscreen, nonfinite, zero-size, or smaller-than-24px geometry uses the existing scale/fade fallback without a source snapshot. Without Web Animations API support, opening and closing are immediate. Reduced motion skips animations; changing that preference or resizing finishes running animations as before.
- The homepage button keeps the existing figure border, radius, background, image sizing, alt text, and caption. Its accessible name is Explore Open Study Deck and its description references the existing caption. It contains no link or nested control and uses the existing global focus-visible treatment.

Read the installed Next.js client-boundary, server/client component, and CSS guides before editing. Applied the React review checklist. No dependency or design token changed.

## Files

| File | Change |
| --- | --- |
| `src/app/page.tsx` | Replace only the preview link with the client button wrapper; identify its existing caption. |
| `src/app/page.module.css` | Retain preview appearance with explicit button width, zero padding, and pointer cursor. |
| `src/components/HomeProjectPreview.tsx` | Homepage trigger and shared dialog connection. |
| `src/components/ProjectDetailDialog.tsx` | Extracted controller/dialog and source-aware transition geometry. |
| `src/components/ProjectShowcase.tsx` | Use the shared hook/dialog; keep grouping, rows, and capsule behavior. |
| This document | Implementation, validation, and pending browser checks. |

## Validation

| Check | Result |
| --- | --- |
| `npm.cmd run lint` | Passed. |
| `npx.cmd tsc --noEmit` | Passed. |
| `npm.cmd run build` | Passed; homepage and Projects remain static routes, dynamic Contact API retained. |
| `git diff --check` | Passed. |
| Dialog extraction comparison | TypeScript-transpiled comparison against HEAD confirmed identical dialog rendering, focus/scroll lifecycle, Escape, and reduced-motion logic after normalizing extracted function/helper names and comments. Geometry helpers are the intentional change. |
| Projects preservation comparison | Status definitions, responsive subscription, grouping/order calculations, and row keyboard scrolling match HEAD. `ProjectCapsule.tsx`, including its pan/click guard, and Projects CSS are unchanged. |
| Homepage writing comparison | All 13 original JSX text passages preserved in order. No client directive added to the page. |
| Geometry checks | Executed actual geometry helpers against mocked DOM values: homepage and capsule radii compensate correctly; viewport and row clips are correct; tiny, zero, offscreen, nonfinite, disconnected, and zero-dialog-size cases fall back without invalid keyframes. These are algorithm checks, not browser measurements. |
| Production HTTP checks | Local production server returned 200 for `/` and `/projects`. Delivered homepage HTML has one `h1`, a named dialog button containing the genuine image, the original alt/caption, no nested link, and the Explore Projects link. Projects HTML retains five dialog triggers in project order. |
| Image delivery | All 14 metadata-referenced cover/gallery assets and an optimized homepage image returned nonempty image responses. This does not establish rendered image loading or lazy-gallery behavior. |
| Scope review | Only the six files above changed. Project data/writing/statuses, genuine assets, `ProjectDetail`, mobile pan handling, design tokens, shell, Resume, Contact, Contact API, and AI disclosure remain unchanged. |

## Browser verification still required

Browser inventory reported **The browser access host is unavailable**. Selecting the existing native Firefox window was also blocked because browser URL-policy enforcement is unsupported for this Windows browser. No browser input was performed. Opening, closing, focus, scrolling, image rendering, animation quality, mobile behavior, and reduced-motion interaction were not verified in a browser.

Before accepting the interaction:

1. On desktop and mobile, activate the homepage image with pointer, Enter, and Space. Confirm the URL stays `/`, the full case study appears, and the close button receives focus.
2. Tab and Shift+Tab through the dialog, including its scroll region and screenshot/external links. Confirm focus stays inside, the background cannot scroll, and all approved story, screenshots, and technical information are reachable.
3. Scroll the case study, close with X and Escape, and confirm the original homepage offset and image-button focus return. Repeat from a nonzero homepage offset, close during opening, and reopen several times.
4. Inspect image loading, natural image ratio, source corners, clipping, and transition endpoints on narrow and wide viewports. Resize while open and confirm the fallback/return remains usable.
5. Enable reduced motion before opening and toggle it during an animation. Confirm immediate transitions with the same focus and scroll restoration. Check with Web Animations API unavailable as well.
6. On `/projects`, repeat keyboard/open/close/focus/scroll checks across all five projects. On mobile, verify status-group order, horizontal swipes, the pan/click guard, row Arrow/Home/End keys, clipped capsules, and row-position restoration.

Stopped after implementation for review. Production release remains a separate owner decision.
