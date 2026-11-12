# Project visuals

Milestone 2C integrates eight owner-supplied screenshots from `Sources/`. All nine original PNGs, including the withheld exported card, remain unchanged outside `public/`. No substitute artwork was created.

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

Reviewed all eight originals and the treated/CSV public copies directly as local images. The spreadsheet regions contain numbered case, evidence, and resource references; no names, emails, credentials, or private contact details were observed in those regions. The Excel avatar is excluded. CSS generator card-like preview details were masked without assuming whether they are real. Treatments are disclosed in visible captions. Other accepted images show product UI, public Wikipedia material, generated study content, or CSS examples; no visible API key or account details were observed.

`UnresolvedCSV.png` is the supplied filename. Its visible content shows ordinary deletion-status rows, including INCOMPLETE, COMPLETE, and NOT_APPLICABLE. It does not independently prove the documented count of 44 unresolved validation cases. Its caption and alt text describe the visible content.

## Optimization and provenance

Run `node scripts/prepare-project-images.mjs` to reproduce public derivatives using already-installed `sharp`; no dependency was added. The script reads originals and writes only derivatives and `docs/project-image-manifest.json`.

- WebP quality 90, smart subsampling, effort 6; embedded metadata stripped.
- Source resolution retained except the disclosed Excel crop. No upscaling or stretching.
- Eight original files: **1,459,871 bytes**. Public copies: **821,310 bytes**, **43.7% smaller**, including the crop. These are asset sizes, not page-performance measurements.
- Manifest records source/output SHA-256, dimensions, byte counts, treatments, and unknown capture dates.
- Alt text and visible captions live in `src/data/projects.ts` and were written after viewing the originals.

Initial lossless WebP trials were larger than the original PNGs. Final copies use quality 90 instead; trial outputs were replaced and are not retained.

## Presentation contract

The existing typed `ProjectImage` retains local src, meaningful alt, actual width/height, caption, optional version, and now optional capturedOn. Use capturedOn only when the actual date is known. Do not infer it from filesystem dates.

Cover and screenshots remain optional and independent. `next/image` supplies responsive sizes/srcset, intrinsic dimensions reserve aspect ratio, and width 100% with height auto avoids distortion. Screenshot links open full-resolution reviewed public derivatives with accessible new-tab notices and focus outlines. Supporting images remain in native details/summary galleries with no carousel, client state, or animation.

Ghost Data's optional typed pipeline renders Request → Identity → Evidence → Policy → Decision → Validation with a semantic ordered list and responsive grid. Source-reported results use a definition list. No spreadsheet is a cover or background. The card states that the best-effort candidate is not a fully valid final output or production-ready service and no live deletion actions were executed. INCOMPLETE is a deletion-status classification separate from the 44 unresolved validation cases; no successful-audit count or success rate is claimed.

## Withheld and remaining captures

- Open Study Deck: Exported Card.png remains only in Sources because the owner identified overlapping text. A corrected genuine export is needed.
- Game of No Lore: image fields remain absent pending genuine Unity Play Mode/build screenshots, ideally including camera-zone and gate views.
- EchoScape Labs: image fields remain absent; project remains on hold. Genuine existing-world/studio captures may be supplied later.
- Ghost Data: a real validation summary showing the 44-case limitation would provide stronger visual support. Current counts come from the documented run supplied by the owner, not a solver rerun or the short CSV excerpt.
- Exact capture dates and build references remain unknown unless stated above.

For future captures: preserve originals outside public, inspect sensitive/malformed content, record provenance/treatments, measure dimensions, then add typed metadata only after public assets exist. Verify paths, rendered HTML, image responses, lint/build, and browser behavior when available.
