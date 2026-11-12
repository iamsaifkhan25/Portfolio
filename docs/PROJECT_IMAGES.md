# Project visuals

Milestone 3A.4 retains the eight public images from 2C and adds five genuine EchoScape screenshots plus one later-edition HackerRank event-context image. All 15 source PNGs, including the withheld exported card, remain unchanged outside `public/`. No substitute artwork was created.

## Accepted assets

Paths are relative to `public/projects/`. Capture dates and build commits were not supplied; dates are omitted from project data. Filesystem timestamps are not capture provenance. CSS Frosting visibly identifies itself as v2.0.

| Original under Sources/ | Public copy | Role | Dimensions | Treatment |
| --- | --- | --- | --- | --- |
| OpenStudyDeck/Home Page OSD.png | open-study-deck/home.webp | Cover | 1600 x 785 | Encoding only |
| OpenStudyDeck/Generated Workspace.png | open-study-deck/generated-workspace.webp | Supporting | 1600 x 770 | Encoding only |
| OpenStudyDeck/Library.png | open-study-deck/library.webp | Additional | 1600 x 775 | Encoding only |
| CSSFrosting/Home Page CSSF.png | css-frosting/home.webp | Cover | 1600 x 777 | Encoding only |
| CSSFrosting/Generator Preview.png | css-frosting/generator-preview.webp | Supporting | 1600 x 776 | Preview cardholder name, visible card suffix, and expiry masked as a precaution |
| CSSFrosting/Analyzer Result.png | css-frosting/analyzer-result.webp | Additional | 1600 x 777 | Encoding only |
| HackerRankOrchestrate/OutputCSV.png | ghost-data/output-csv.webp | Supporting evidence | 1600 x 618 | Crop x=0, y=225, width=1600, height=618 removes Excel chrome/profile avatar |
| HackerRankOrchestrate/UnresolvedCSV.png | ghost-data/unresolved-csv.webp | Supporting evidence | 1600 x 287 | Encoding only |
| EchoScapeLabs/ESL Home Page.png | echoscape-labs/home.webp | Cover and expanded header image | 1600 x 781 | Encoding only |
| EchoScapeLabs/EXPERIENCE STUDIO STEP ONE.png | echoscape-labs/experience-studio.webp | Experience Studio / local audio | 1600 x 778 | Encoding only |
| EchoScapeLabs/ALL WORLDS.png | echoscape-labs/worlds.webp | World menu | 1600 x 781 | Encoding only |
| EchoScapeLabs/EXPERIENCE STUDIO STEP TWO.png | echoscape-labs/choose-world.webp | World selection | 1600 x 815 | Encoding only |
| EchoScapeLabs/EXPERIENCE STUDIO STEP THREE.png | echoscape-labs/liquid-gold.webp | In-world Liquid Gold | 1600 x 811 | Encoding only |
| HackerRankOrchestrate/Comptetion Home Page.png | ghost-data/december-2026-event-context.webp | Later-event context, expanded details only | 1600 x 811 | Encoding only; December edition explicitly labeled |

Reviewed all eight originals and the treated/CSV public copies directly as local images. The spreadsheet regions contain numbered case, evidence, and resource references; no names, emails, credentials, or private contact details were observed in those regions. The Excel avatar is excluded. CSS generator card-like preview details were masked without assuming whether they are real. Treatments are disclosed in visible captions. Other accepted images show product UI, public Wikipedia material, generated study content, or CSS examples; no visible API key or account details were observed.

`UnresolvedCSV.png` is the supplied filename. Its visible content shows ordinary deletion-status rows, including INCOMPLETE, COMPLETE, and NOT_APPLICABLE. It does not independently prove the documented count of 44 unresolved validation cases. Its caption and alt text describe the visible content.

For 3A.4, all six added originals and optimized public copies were viewed directly. EchoScape's home, studio, menu, world selection, and Liquid Gold viewport are visible in the corresponding images. The world menu uses repeated ring illustrations; these are not in-world captures of each scene. The second studio capture cuts off the lower Liquid Gold card, and that original framing is disclosed rather than reconstructed. A local music filename is visible in the studio/transport; no audio file is published. No visible credentials or personal account details were observed. The still Liquid Gold image does not prove audio reactivity or device performance. EchoScape remains on hold and current demo availability remains unconfirmed.

The owner's follow-up explicitly authorizes the genuine **December 2026 Holiday Edition** screenshot as illustrative event context because the original October page was unavailable. Its visible heading, alt text, caption, and public filename identify the later edition. The actual project is the **October 2026** entry. The image is never a cover, background, or capsule thumbnail, and implies no December participation, official affiliation, or award. The October project's text/CSS cover, candidate evidence, 518 processed requests, 44 unresolved cases, and failed-contract/non-production limitations remain intact.

## Optimization and provenance

Run `node scripts/prepare-project-images.mjs` to reproduce public derivatives using already-installed `sharp`; no dependency was added. The script reads originals and writes only derivatives and `docs/project-image-manifest.json`.

- WebP quality 90, smart subsampling, effort 6; embedded metadata stripped.
- Source resolution retained except the disclosed Excel crop. No upscaling or stretching.
- The original eight accepted files remain byte-identical: **1,459,871 source bytes**, **821,310 public bytes**.
- The six new files total **683,164 source bytes**, **374,490 public bytes**. All 14 accepted derivatives total **1,195,800 bytes** from **2,143,035 source bytes**, about **44.2% smaller**, including the original crop. These are asset sizes, not page-performance measurements.
- Manifest records source/output SHA-256, dimensions, byte counts, treatments, and unknown capture dates.
- Alt text and visible captions live in `src/data/projects.ts` and were written after viewing the originals.

Initial lossless WebP trials were larger than the original PNGs. Final copies use quality 90 instead; trial outputs were replaced and are not retained.

## Presentation contract

The existing typed `ProjectImage` retains local src, meaningful alt, actual width/height, caption, optional version, and now optional capturedOn. Use capturedOn only when the actual date is known. Do not infer it from filesystem dates.

Cover and screenshots remain optional and independent. `next/image` supplies responsive sizes/srcset, intrinsic dimensions reserve aspect ratio, and width 100% with height auto avoids distortion. Screenshot links open full-resolution reviewed public derivatives with accessible new-tab notices and focus outlines. In expanded capsules, the approved introduction leads into the project's cover image when present; supporting images form a full-width vertical gallery with descriptive headings, captions, and no cropping. They mount with the selected detail view. The older `ProjectCard` retains its native details/summary presentation but is not the current Projects showcase.

Ghost Data's optional typed pipeline renders Request → Identity → Evidence → Policy → Decision → Validation with a semantic ordered list and responsive grid. Source-reported results use a definition list. No spreadsheet is a cover or background. The card states that the best-effort candidate is not a fully valid final output or production-ready service and no live deletion actions were executed. INCOMPLETE is a deletion-status classification separate from the 44 unresolved validation cases; no successful-audit count or success rate is claimed.

## Withheld and remaining captures

- Open Study Deck: Exported Card.png remains only in Sources because the owner identified overlapping text. A corrected genuine export is needed.
- Game of No Lore: `Sources/GameOfNoLore` is empty. No cover or gallery is published; genuine early prototype or house-reference images could be added later after review.
- EchoScape Labs: the five reviewed images above are published. Current demo availability, capture dates, and build references remain unknown; the project remains on hold.
- Ghost Data: a real validation summary showing the 44-case limitation would provide stronger visual support. Current counts come from the documented run supplied by the owner, not a solver rerun or the short CSV excerpt.
- Exact capture dates and build references remain unknown unless stated above.

For future captures: preserve originals outside public, inspect sensitive/malformed content, record provenance/treatments, measure dimensions, then add typed metadata only after public assets exist. Verify paths, rendered HTML, image responses, lint/build, and browser behavior when available.

## Historical Milestone 3A.3 capture slots

At the end of 3A.3, Game of No Lore and EchoScape had explicit empty `screenshots` arrays. Game remains text-first; the EchoScape slots are now superseded by the five reviewed images above. The shared renderer still omits empty galleries, with no placeholder art or speculative URLs.

| Project / slot | Genuine evidence to add |
| --- | --- |
| Game / gameplay overview | Unity Play Mode or a running build showing the current player and environment |
| Game / camera zone | A second view of the same prototype demonstrating an implemented camera-zone change |
| Game / gate | The current gate interaction in Play Mode or a build |
| EchoScape / existing world (optional) | A running built world with its name and historical version identified |
| EchoScape / studio (optional) | The actual guest studio/local playlist, with private audio filenames removed if necessary |
| EchoScape / second world (optional) | Another implemented world; no planned-world mockups |

Each accepted slot uses the existing `ProjectImage` shape: real public `src`, meaningful `alt`, measured width/height, factual caption, optional descriptive `title`, and date/version only when known. Slot names in this table are capture subjects, not filenames or inferred alt text.

The five EchoScape PNG candidates and competition-home PNG were untouched and unpublished in 3A.3. They were inspected and optimized in 3A.4, with the restrictions described above. All source images and the original eight public derivatives remain byte-identical. No image was generated.
