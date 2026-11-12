# Milestone 2C: authentic project visuals

Completed 2026-11-09 for review. No Editorial Glass redesign, dependency change, commit, push, or deployment.

## Implementation

Inspected all three source directories and eight assigned screenshots. Added three public WebP derivatives each for Open Study Deck and CSS Frosting, using assigned home-page covers and two supporting screenshots each. Ghost Data has two supporting evidence images and a responsive semantic HTML pipeline instead of an image cover. Game of No Lore and EchoScape retain absent optional images; EchoScape remains on hold.

The existing typed project model now has an optional pipeline field. Image fields are retained, with capturedOn made optional because actual dates were not provided. Alt text, captions, actual dimensions, and redactions are recorded in data. ProjectPipeline.tsx uses an ordered list for Request → Identity → Evidence → Policy → Decision → Validation, and a definition list for the source-reported 518 requests and 44 unresolved validation cases. It has no client boundary, hooks, animation, external requests, or added dependency.

The card separates INCOMPLETE deletion status from validation failures and the 44 unresolved cases. It identifies the candidate as best effort, not a fully valid final output or production-ready service, and says no live deletion actions were executed. No successful-audit count is inferred. UnresolvedCSV.png does not visibly establish the 44-case count; its caption states that limitation. No solver was rerun.

Existing page/grid/navigation, badges, external destinations, native gallery disclosure, focus styling, and global reduced-motion rules are preserved. Screenshots reserve their intrinsic aspect ratios and use responsive next/image variants. Each links to its full-resolution reviewed public copy for reading small UI/CSV text.

## Assets and privacy

See PROJECT_IMAGES.md for the source-to-public mapping and capture review. All nine original PNGs remain untouched, including Exported Card.png, which has no public derivative or reference because it needs recapture. The CSV output derivative removes Excel chrome/profile avatar; the CSS generator derivative masks preview cardholder name, visible suffix, and expiry as a precaution. Captions disclose treatments. No spreadsheet outcome or cell text was rewritten. No other sensitive personal details or credentials were observed in the accepted images.

WebP quality 90, smart subsampling, effort 6, metadata stripped. Source resolution retained except the disclosed crop. Accepted originals total 1,459,871 bytes; copies total 821,310 bytes, 43.7% smaller including the crop. This is an asset-size comparison, not a performance measurement. scripts/prepare-project-images.mjs reproduces copies with installed sharp; docs/project-image-manifest.json records source/output SHA-256, dimensions, sizes, and treatments. Capture dates remain unknown.

## Verification

- Read installed Next.js 16.4.5 image/CSS guides and relevant Image API sections before writing code. Applied the React checklist: typed props, stable keys, semantic figures/lists, native disclosure, meaningful alternatives, and no unnecessary state/effects/dependencies.
- npm run lint (via npm.cmd): passed, exit 0, no warnings/errors reported.
- npm run build (via npm.cmd): passed, exit 0; compilation, TypeScript, and 11/11 static generation tasks succeeded. /projects remains prerendered.
- Production HTTP at 127.0.0.1:3141/projects: 200. Rendered HTML has five project articles, eight expected image references with matching intrinsic dimensions and responsive sizes/srcset, three galleries, and the six pipeline stages in order.
- All eight public copies returned HTTP 200 and matched output hashes. All eight Next.js optimizer requests at width 640/quality 75 returned 200 with correct proportional dimensions.
- Both optional-image projects render no image/gallery. Ghost Data has no image before its supporting gallery. Rendered markup contains the best-effort, no-live-deletion, validation, and INCOMPLETE distinctions.
- No rendered image/source reference points to Sources or the exported card. HTTP request for the source exported-card path returned 404.
- Manifest checks confirm source/output hashes and typed dimensions. Separate pre-edit hashes cover pre-existing source/public/app/docs and package/config files; final preservation review is recorded below.

Browser verification is blocked: browser inventory returned "The browser access host is unavailable". Read-only native Firefox access was stopped because URL-policy enforcement is unsupported for that Windows browser. No browser screenshot, desktop/mobile layout, keyboard/gallery behavior, console/network inspection, reduced-motion runtime, or layout-shift measurement is claimed. Local image inspection and production HTTP checks are separate evidence.

## Remaining assets

A corrected Open Study Deck exported card, genuine Unity captures, and optional existing EchoScape world/studio captures remain needed. A Ghost Data validation-summary capture showing the documented 44-case limitation would strengthen visual support. Capture dates/build references remain unspecified.

Final preservation comparison: all nine Sources originals are byte-identical. Only src/data/projects.ts, src/components/ProjectCard.tsx, and docs/PROJECT_IMAGES.md changed among the 40 pre-existing files in the pre-edit manifest. The existing projects page, shared styles, other pages, prior milestone reports, public assets, configuration, package.json, and lockfile are unchanged from the start of 2C. New files are the pipeline component, eight WebP derivatives, preparation script, image manifest, and this report.

git diff --check passed. Git emitted only the pre-existing projects-page LF/CRLF normalization warning. A separate trailing-whitespace/conflict-marker check covers the scoped new and updated text files, which are mostly untracked and therefore omitted by ordinary git diff.

Milestone stops here for owner review. No commit, push, or deployment was performed.
