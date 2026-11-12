# Milestone 3A.4: authentic storytelling and project evidence

Completed for owner review on 2026-11-12. No commit, push, deployment, dependency change, new route, or additional project.

## Starting state and scope

The working tree already contained the 3A.3 changes in `src/data/projects.ts`, `src/components/ProjectDetail.tsx`, `src/components/ProjectShowcase.module.css`, `docs/PROJECT_CASE_STUDIES.md`, and `docs/PROJECT_IMAGES.md`, plus the untracked 3A.3 report. Those changes were the starting point. Git's combined diff includes both milestones; its file list alone does not attribute every change to 3A.4.

Read the repository instructions and the installed Next.js Image and Server/Client Component guides before coding. Consulted earlier portfolio evidence notes, then checked the current files and relevant local project sources. No external deployment or product availability audit was performed.

## Narrative and content

The owner supplied five approved working stories during this session. All **26 paragraphs** are preserved verbatim, in their original order within each story, in `caseStudy.story` and `docs/PROJECT_CASE_STUDIES.md`. The expanded capsule begins with that personal introduction. The shorter functional description remains available to the older card component, and collapsed summaries stay concise.

The existing practical-purpose/features grid, workflows, galleries, verified implementation information, decisions, results/limitations, and future-direction sections follow the introduction. The technical section is titled **Behind the Build**. `caseStudy.lessons` is optional and currently absent for every project; the renderer omits that section until personally confirmed. Project-specific owner questions are saved in the case-study document. The Game story's owner-approved learning motivation remains in the narrative without being expanded into invented lessons.

- **Open Study Deck:** preserves the sister/Gemini origin, subscription-free motivation, browser-first approach, and guest/BYOK history. Documents the unresolved overlapping-text PNG export issue. The malformed exported-card image remains unpublished; existing workspace/library screenshots do not imply a corrected export.
- **CSS Frosting:** preserves the reusable-presets origin, visual-playground motivation, generator, export, and analyzer. Technical detail explains preview/code correspondence and the limits of the analyzer's checks. No commercial outcomes are added.
- **EchoScape Labs:** preserves the immersive-music motivation and the owner's work on the studio, worlds, interface, and transitions into an experience. Keeps **on hold** status, unconfirmed current demo availability, and the built/planned distinction.
- **HackerRank Orchestrate 2026:** preserves the **October** entry and **518 processed evaluation requests / 44 unresolved cases**, failed output contract/strict final gate, and non-production status. Candidate CSVs are not presented as proof of successful audits. The deterministic runtime remains distinct from AI-assisted development.
- **Game of No Lore:** preserves the grandparents' house memory and intended fourteen-day Shila story. Clearly limits completed work to **one house asset and a prototype character/environment**, with material, movement, camera-zone, lighting, and basic-interaction experiments. The village and broader gameplay remain planned. No release or new Unity runtime result is implied.

The technical refresh included the local Game movement, animation, camera-zone, and gate scripts, house material assets, and visual-benchmark scene; EchoScape's audio-signal utility; and the deletion-audit README. These checks support implementation descriptions, not new runtime, performance, or successful-fix claims. Full source mapping is in `PROJECT_CASE_STUDIES.md`.

## Genuine images

Added five EchoScape WebP derivatives: home/header, Experience Studio, available-world menu, studio world selection, and the in-world Liquid Gold experience. All originals and optimized copies were visually inspected. Menu artwork is identified as menu artwork; the original partial framing of the selected Liquid Gold card is disclosed. No image is reconstructed or generated. Still images do not prove playback or performance.

The owner then authorized the genuine **December 2026 Holiday Edition** screenshot solely as **later-event illustrative context**, because the original October page was unavailable. It appears after the candidate CSV evidence only inside expanded details. Its heading, alt text, caption, and public filename identify the later edition and distinguish it from this October entry. The caption explicitly rules out December participation, official HackerRank affiliation, and an award. The capsule retains its own title and text/CSS cover; the event screenshot is never its cover or background.

`Sources/GameOfNoLore` is empty, so Game remains text-first. The original eight public derivatives and all 15 source PNGs remain byte-identical. The six added public copies total **374,490 bytes** from **683,164 source bytes**, using the existing quality-90 WebP process without resizing, cropping, or metadata copying. The 14 public derivatives total **1,195,800 bytes**. The source/output manifest records dimensions, hashes, encoding, and unknown capture dates. Capture dates are not inferred from filesystem timestamps.

## Files changed by 3A.4

- `src/data/projects.ts`: approved stories, optional confirmed lessons, factual scope/limit refinements, five EchoScape image entries, December detail-only context entry.
- `src/components/ProjectDetail.tsx`: renders the approved introduction, existing project cover in expanded content when available, clearer section headings, optional confirmed lessons. Adds no state, hooks, event handlers, or client boundary.
- `scripts/prepare-project-images.mjs`: six genuine source-to-public mappings; existing encoding/treatment logic unchanged.
- `docs/project-image-manifest.json`: six appended provenance records; earlier records unchanged.
- Six new public WebP files under `public/projects/echoscape-labs` and `public/projects/ghost-data`.
- `docs/PROJECT_CASE_STUDIES.md`, `docs/PROJECT_IMAGES.md`, and this report: approved working material, evidence, image roles, open owner questions, and verification.

No 3A.4 edits were made to the showcase/capsule interaction files, scoped CSS, Projects page/AI disclosure, other pages, dependencies, or configuration. The already-modified 3A.3 scoped CSS remains as found. All original responsive rules, mobile status groups, order, animations, focus/scroll behavior, reduced motion, and accessible controls remain in their existing code.

## Verification

- `npm.cmd run lint`: passed after the final content/component changes.
- `npx.cmd tsc --noEmit`: passed.
- `npm.cmd run build`: passed with Next.js 16.4.5, TypeScript, and all 11 static-generation tasks; `/projects` remains prerendered.
- `git diff --check`: passed; Git reports only its existing LF-to-CRLF normalization notices. Reviewed the combined diff and starting-state differences; no staging or Git writes were performed.
- Data/image checks: exactly five projects in the approved order; all 26 story paragraphs match the saved owner material; no unconfirmed lessons; on-hold/prototype/failed-contract states retained; December context is not a cover. All **14 image paths, source/output hashes, actual dimensions, alt text, and captions** passed manifest checks. No reference points to the malformed export or `Sources/`.
- Preservation: all **33 files** captured in the task's SHA-256 baseline remain unchanged, including every source PNG, the original eight public derivatives, showcase/capsule interaction files, scoped styles, and package manifests. Git review confirms the AI disclosure and unrelated tracked application files are unchanged.
- Rendered the five actual detail and capsule components with React server rendering and real Next Image/pipeline components. Verified all approved paragraphs, section headings, 14 images with dimensions/responsive attributes, accessible full-resolution links, conditional lessons, text-first Game/October covers, and December detail-only labeling. CSS module names were stubbed; this is a markup check, not browser simulation.
- Production HTTP on `127.0.0.1:3144`: `/projects` returned 200 with five correctly ordered accessible dialog triggers and the existing AI disclosure. All 14 image responses matched manifest hashes; all 14 Next Image requests at width 640/quality 75 returned 200 with proportional dimensions. The withheld source-export URL returned 404. The temporary server was stopped afterward.

## Unverified browser interactions and review

No browser interaction or browser screenshot was obtained in this milestone. Static rendering, successful HTTP responses, and unchanged interaction code do not establish visual or client-interaction correctness.

Review desktop and mobile capsules for the longer narrative, cover/header images, full-width galleries, readable captions, safe areas, and deep-scroll close-button reachability. Exercise X and Escape, keyboard focus containment/restoration, page and mobile-row scroll restoration, touch/swipe/snap behavior, status-group layout, resizing across 768px, full-resolution image links, and reduced-motion transitions. Confirm the December context is unambiguously secondary to the October entry.

No browser, touch, screen-reader, Unity Play Mode/collision, WebGL/audio playback, product generation/export, payment, or performance success is claimed. Milestone 3A.4 stops here for review.
