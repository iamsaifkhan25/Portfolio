# Milestone 3A: expandable project capsules

## Scope and files

The Projects route now presents five expandable capsules. The existing layout, navigation, footer, AI-tools disclosure, other routes, image files, and image provenance records remain in place. No dependencies were added. No commit, push, or deployment was performed.

Changed:

- `src/app/projects/page.tsx`: replaces the two card groups with an explicitly ordered showcase; the page stays a Server Component.
- `src/data/projects.ts`: adds numeric ordering, short summaries, typed case-study fields, and shared status labels. Existing image metadata, verified/owner-confirmed destinations, statuses, and Ghost Data results are retained. CSS Frosting is now featured.

Added:

- `src/components/ProjectShowcase.tsx`: the client interaction boundary, single active selection, native modal dialog, animation lifecycle, scroll lock, and focus management.
- `src/components/ProjectCapsule.tsx`: one whole-card button with image preview, summary, status, and persistent Explore cue.
- `src/components/ProjectDetail.tsx`: detailed content, genuine screenshots, technologies, external links, and the existing reusable `ProjectPipeline`.
- `src/components/ProjectShowcase.module.css`: scoped glass surfaces, capsule geometry, full-screen detail layout, and responsive styles.

The earlier uncommitted `ProjectCard.tsx` and `ProjectPipeline.tsx` files were preserved. Sources and public WebP assets were not regenerated or edited.

## Layout and content

The data model assigns explicit orders: Open Study Deck, CSS Frosting, Ghost Data Still Exists, Game of No Lore, EchoScape Labs. The page sorts a copy by that numeric field. Desktop uses two equal columns, putting Open Study Deck and CSS Frosting side by side in the first row. Below 768px, capsules form a single column.

Cover images keep their native aspect ratio and are enlarged within an overflow-hidden preview to crop the lower portion. A gradient connects the preview to the dark information panel. The two leading images load eagerly; supporting images mount only with the active detail view. Ghost Data, Game of No Lore, and EchoScape use typographic category treatments where no cover exists. The CSV evidence is not repurposed as cover artwork.

Expanded content comes from the existing typed project data and `PROJECT_CASE_STUDIES.md`. It includes overview, practical purpose, implementation, development notes, limitations, technologies, and the existing approved destinations. Personal motivations, particular bugs/resolutions, and personal lessons are still absent from the source notes and have not been invented. The new copy presents documented engineering considerations rather than claiming a personal retrospective. Owner wording is still needed for those personal additions.

Ghost Data retains 518 processed evaluation requests and 44 unresolved validation cases, distinguishes them from deletion-status classifications, and states that its candidate is neither fully validated nor production-ready. No live deletions or new solver run are claimed. Image captions continue to disclose masking/cropping and the limits of the CSV excerpts.

## Animation and lifecycle

The native dialog enters the browser's top layer. A 420ms Web Animations API transform maps its full-screen geometry to the originating capsule rectangle, then expands to the viewport. A temporary inert, accessibility-hidden DOM copy of the actual capsule preserves its cropped image and text at the transition endpoints. Duplicate IDs are removed from that copy; no raster screenshot or replacement artwork is generated.

The complete header image slides upward by 36px while detail content fades in. Closing reverses the positional transform and reveals the capsule copy before restoring the original button. An early close starts from the currently animated transform. Repeated close requests are guarded. Off-screen or unavailable geometry uses a small scale-and-fade transition. Without Web Animations API support, the dialog opens/closes immediately. Reduced motion also bypasses animation; changes to that preference finish active animations. Resizing finishes in-flight animations to avoid stale viewport geometry.

The page's scroll position is stored before locking the body. Scrollbar space is compensated, the detail scroller contains overscroll, and the original inline styles and window scroll are restored on cleanup. The originating button retains its layout space while hidden and receives focus after it becomes visible again.

## Mobile and accessibility

The native modal supplies dialog semantics and makes the background inert. It is labelled by the project heading. Initial focus moves to the close button; explicit Tab/Shift+Tab wrapping supplements native containment and excludes the inert transition copy. The detail scroller is keyboard-focusable for arrow/Page Down scrolling, including projects without links. Escape invokes the same animated close path. Each collapsed capsule is a single native button with an accessible project/status label and summary description; it contains no nested links or controls.

The close control is 48px square, remains fixed within the dialog while the content scrolls, and respects top/right safe areas. Detail padding accounts for left/right/bottom safe areas. The view uses dynamic viewport height, fluid images, wrapping text/technologies, visible focus styles, and meaningful existing image descriptions. Screenshot and external links retain new-tab notices.

## Verification

- `npm run lint`: passed using `npm.cmd` because this PowerShell session blocks the npm PowerShell shim.
- `npm run build`: passed using `npm.cmd`; the initial restricted-network attempt could not fetch the existing Plus Jakarta Sans Google font. A network-enabled build succeeded without changing the font or layout.
- `npx tsc --noEmit`: passed.
- `git diff --check`: passed; Git emits a line-ending normalization notice for the already-modified Projects page.
- Executed content-contract checks: all five explicit positions, eight genuine WebP paths/metadata, optional covers, and the Ghost Data counts/limitations passed.
- Production HTTP checks: `/projects` returned 200 with five dialog triggers in the specified order; all eight image files returned WebP responses; a responsive Next.js image response returned 200.

These are source, build, content, and HTTP checks. They do not exercise client interactions.

## Browser limitation and review checklist

Computer-use inventory returned no browsers and `The browser access host is unavailable`. No browser interaction, desktop/mobile screenshot, console observation, screen-reader test, or animation capture was obtained. Opening, closing, changing projects, keyboard traversal, scroll locking, focus restoration, reduced motion, and mobile safe-area behavior are implemented but **not browser-verified**.

Manual review should cover:

1. Desktop at common viewport sizes: first-row prominence, screenshot crop, text wrapping, and glass contrast.
2. Every capsule: open, scroll the details, close by X and Escape, then open another project. Confirm the original page scroll and trigger focus return.
3. Tab and Shift+Tab from both ends of the dialog; verify that background navigation cannot receive focus or pointer input.
4. Rapid open/close, repeated Escape, closing after deep detail scrolling, and resizing during transitions. Check for endpoint flashes, distortion, or layout shifts.
5. Mobile portrait/landscape: single column, no horizontal overflow, reachable close button, browser-toolbar changes, and device safe areas.
6. Reduced motion, including changing the setting while a transition is running; also review current Chrome, Firefox, and Safari.
7. Confirm the genuine header images appear promptly on a cold cache. Their detail resolution may load after the smaller capsule preview.

No visual defect is confirmed without a browser capture. Crop balance, transition smoothness, cold-cache image reveal, touch behavior, and focus/scroll behavior remain manual review items. Milestone 3A stops here; no wider Editorial Glass redesign is included.
