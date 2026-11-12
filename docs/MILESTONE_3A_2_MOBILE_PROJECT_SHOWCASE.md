# Milestone 3A.2: mobile project showcase

## Scope and modified files

This milestone changes the Projects showcase below 768px. Existing uncommitted work was inspected and preserved. No dependency, project content, project status, genuine image asset, unrelated route, or wider design-system change was made. Nothing was committed, pushed, or deployed.

Modified:

- `src/components/ProjectShowcase.tsx`: shared responsive groups, mobile keyboard scrolling, clipped animation endpoints, and horizontal scroll restoration.
- `src/components/ProjectCapsule.tsx`: pointer gesture tracking to distinguish a tap from a swipe or page scroll.
- `src/components/ProjectShowcase.module.css`: mobile status headings, snap row, focus-ring space, and room for two readable cards when the container permits.

Added: `docs/MILESTONE_3A_2_MOBILE_PROJECT_SHOWCASE.md`.

The existing `docs/MILESTONE_3A_PROJECT_CAPSULES.md` was read before editing. Its original implementation and verification notes remain intact; this document records the mobile follow-up.

## Mobile grouping

The existing typed `Project.status` and numeric `Project.order` supply all grouping and ordering. No extra metadata field was necessary.

| Section, in mobile order | Projects, in row order | Existing status |
| --- | --- | --- |
| Completed / Live | Open Study Deck; CSS Frosting | `live` |
| In Progress | Game of No Lore | `in-development` |
| Hackathon Work | HackerRank Orchestrate 2026 | `hackathon-complete` |
| On Hold | EchoScape Labs | `on-hold` |

Hackathon completion remains separate from live/completed products. The capsule's existing status text and the detail view's validation limits are unchanged, including the 518 processed evaluation requests, 44 unresolved validation cases, and statements that the candidate is neither fully valid nor production-ready.

Each project has one interactive capsule. CSS orders mobile groups before hydration, while a media-query subscription aligns the hydrated DOM and keyboard order with the current layout. Stable group/project keys preserve the originating button when the viewport crosses 768px.

## Horizontal scrolling

Only the multi-project group uses horizontal overflow. The row uses native scrolling, `scroll-snap-type: x mandatory`, and start-aligned snap positions. There is no carousel dependency, drag implementation, or prevention of native touch scrolling.

On narrow screens, each card occupies the row's content width minus 2rem, leaving part of its neighbor visible. The row has a 1rem gap, thin scrollbar, and a text/icon hint: “Swipe to explore.” Eight pixels of inner space protect capsule focus outlines from clipping. When the status-group container reaches 640px, two cards share the available width; the swipe hint is hidden because both cards fit. This threshold uses available container space rather than viewport width alone.

The grid stretches cards to a shared row height. Summaries wrap without truncation, and existing image aspect ratios/crops remain unchanged. Single-project groups use a normal grid cell with no horizontal overflow or added row tab stop.

The multi-project row is a labelled, focusable region on mobile. Left/Right Arrow, Home, and End scroll it when the row itself has focus. Keys from capsule buttons are left to the browser, and Tab continues through the cards and onward. Existing capsule and dialog focus indicators remain in place.

Pointer movement beyond eight CSS pixels, pointer cancellation, row movement, or page movement suppresses the resulting pointer click. Keyboard and assistive activation without a pointer click remain available. No pointer capture or touch-axis restriction is added, so vertical page scrolling and native horizontal swiping remain browser-controlled.

## Capsule transitions and restoration

The existing native modal, 420ms Web Animations API transition, image-header reveal, inert snapshot, X/Escape handling, focus containment, body scroll lock, and reduced-motion behavior remain in use.

Mobile FLIP endpoints intersect the capsule rectangle with its overflow row and the viewport. An animated inset clip reveals only the portion visible in the row at the transition endpoint, including a partly visible neighboring card. Closing measures the current originating button again; early closing also captures the current clip alongside the in-flight transform. Entirely off-screen or unavailable geometry uses the existing fade/scale fallback. Desktop endpoints retain their existing transform and radius calculations without the mobile row clip.

Cleanup restores the saved page position and explicitly restores the originating row's horizontal offset after native dialog focus restoration. Focus returns to the same mounted button with `preventScroll`. If a viewport change has left that button entirely outside the visible area, a nearest-position scroll brings it back. Detail scrolling remains isolated inside the top-layer dialog with the existing overscroll containment; the background swipe row is inert while the modal is open.

## Desktop preservation

At 768px and above, group and row wrappers use `display: contents`, and status headings/hints are hidden. The original two-column grid and its spacing, capsule geometry, images, and desktop styles remain unchanged. DOM order remains Open Study Deck, CSS Frosting, HackerRank Orchestrate 2026, Game of No Lore, EchoScape Labs. The two live sites therefore retain the first row.

Source checks compared the existing desktop CSS against a pre-edit copy: all original rules before the mobile media query are identical after line-ending normalization. Production HTML contains exactly five dialog triggers in the original desktop order with the existing status labels. These checks establish source and output preservation, not visual browser equivalence.

## Validation results

All commands passed on the final source:

- `npm run lint`, executed as `npm.cmd run lint`.
- `npm run build`, executed as `npm.cmd run build`; Next.js 16.4.5 generated the Projects route successfully.
- `npx tsc --noEmit`, executed as `npx.cmd tsc --noEmit` after the build.
- `git diff --check`. Git reports its existing LF-to-CRLF normalization notice for the already-modified Projects page; no whitespace error was reported.

Additional executed checks:

- Component checks with mocked React/browser state exercised mobile and desktop grouping branches for representative 360, 390, 430, 688, 767, 768, and 1280px cases: exact labels/order, five unique triggers, only one mobile row tab stop, keyboard scrolling, and no Tab interception.
- Simulated pointer events checked normal taps, swipes, cancelled gestures, row/page movement during a tap, and keyboard activation after cancellation.
- Geometry checks covered a horizontally clipped source, a fully off-screen source, and an unclipped desktop endpoint.
- A mocked reduced-motion dialog lifecycle checked initial focus, Tab wrapping, Escape and repeated-close handling, lock cleanup, page-position restoration, originating focus, and restoring a horizontal offset changed by native close behavior.
- Production HTML checks confirmed five triggers and unchanged desktop order/status text.
- Hash checks confirmed that `src/data/projects.ts`, `src/app/projects/page.tsx`, `package.json`, `package-lock.json`, and all 13 existing public project image files match the pre-edit baseline.
- Applied the React component review checklist: viewport state uses an external-store subscription with cleanup and a stable server snapshot; transient gesture state uses a ref; derived groups do not add synchronized state; buttons retain native keyboard activation and have no nested controls.

The mocked checks exercise component decisions and event handlers. They do not render CSS, execute a browser layout engine, generate real touch input, or establish animation quality.

## Browser limitation and remaining review

Browser inventory returned no browser automation surfaces and reported `The browser access host is unavailable`. A native Firefox window was present, but its screenshot attempt stopped computer use with: `browser URL policy enforcement is not yet supported for the current Windows browser`. No browser interaction or screenshot was obtained. No alternative browser automation was attempted after that stop.

Actual viewport testing at 360, 390, 430, 768px, and desktop remains pending. Also review a mobile width with at least 640px of group space to confirm the two-card layout. Browser review should cover:

1. Exact section order, readable card widths and summaries, equal row heights, genuine-image crop/aspect ratio, a visible next-card cue on narrow screens, and no horizontal page overflow.
2. Real touch swipes, momentum scrolling, snap alignment, vertical page scrolling from inside a card, and no accidental expansion during either gesture.
3. Open every capsule from every group, including CSS Frosting after horizontally scrolling its row and a partly visible neighboring capsule. Check the clipped expansion and animated image-header reveal.
4. Scroll deeply in each detail view; close using X and Escape. Verify the same source button receives visible focus and the original vertical/horizontal page positions return.
5. Keyboard entry into/out of the row, arrow/Home/End scrolling, Tab access to every capsule, dialog focus wrapping, and no background focus or gestures while the dialog is open.
6. Reduced motion, including toggling it during animation; rapid open/close; resizing across 768px while open; and mobile browser toolbar/safe-area changes.
7. At 768px and desktop, confirm the original two-column arrangement, Open Study Deck/CSS Frosting first row, no mobile section headings, no layout shifts, and unchanged desktop animation appearance.

No browser, touch, visual, screen-reader, or animation success is claimed. This milestone stops here for review.
