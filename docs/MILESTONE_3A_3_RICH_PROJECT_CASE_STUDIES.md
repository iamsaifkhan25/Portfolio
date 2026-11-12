# Milestone 3A.3: rich project case studies

Completed for review on 2026-11-12. Scope ends at 3A.3. No commit, push, deployment, dependency change, generated artwork, or new project route.

## Starting state and evidence

The working tree was clean (`git status --short` returned no entries). Read the milestone reports from 1A through 3A.2, `PROJECT_CASE_STUDIES.md`, `PROJECT_IMAGES.md`, current project data/detail/showcase/capsule/pipeline code, and scoped styles. Consulted the installed Next.js Server/Client Component and Image guides before coding.

Saved SHA-256 hashes for 71 pre-existing files to `%TEMP%/portfolio-m3a3-baseline.json`. The final comparison found changes only in the five pre-existing files listed below. This report is the sixth changed/added file. All original screenshots, public derivatives, image manifest/preparation script, capsule interactions, Projects page, earlier milestone reports, dependencies, configuration, and unrelated routes are preserved.

## Files changed

- `src/data/projects.ts`: separate typed features, optional workflow, implementation, decisions, results, and optional future work. Adds optional screenshot titles and explicit empty screenshot arrays for Game/EchoScape. All existing short summaries, titles, statuses, order, links, stack labels, cover metadata, image descriptions/captions, and pipeline data remain unchanged.
- `src/components/ProjectDetail.tsx`: one shared renderer for the expanded sections, numbered workflows, screenshot headings, and future-direction sections. No new hooks, client boundary, requests, or dependencies.
- `src/components/ProjectShowcase.module.css`: eight added rules for paragraph spacing/reading width, responsive workflow steps, and screenshot headings. Every pre-existing rule is preserved, including desktop geometry, mobile groups/swipe rows, dialog scrolling, close control, focus styles, and reduced motion.
- `docs/PROJECT_CASE_STUDIES.md`: current evidence/publishing boundary and source mapping; original owner-input questions retained.
- `docs/PROJECT_IMAGES.md`: current capsule gallery description and concrete capture subjects for the optional image slots.
- `docs/MILESTONE_3A_3_RICH_PROJECT_CASE_STUDIES.md`: this report.

## Content added per project

| Project | Expanded content |
| --- | --- |
| Open Study Deck | Input/access, generation/review, and library/export workflow; all four modes; guest Cloudflare gateway versus direct BYOK; browser library and PNG implementation; session-default key storage and opt-in persistence; consent-gated analytics and salted quota tracking; AI review and local-storage limits. |
| CSS Frosting | Presets and live controls, preview/code workflow, CSS/Tailwind/styled output, analyzer input/property checks, consistency between representations, analyzer limits, and owner-confirmed live status. No payment, revenue, adoption, or measured-performance claim. |
| Game of No Lore | Intended cozy village experience; implemented movement/facing, animation bridge, camera-zone views, and gate interaction; Unity stack and responsibility split; unreleased prototype result; separate future village scope. No farming, NPC, quest, or completed village-simulation feature is inferred. |
| HackerRank Orchestrate 2026 | Deletion-intent checks, temporal identity/state reconstruction, evidence formats, deterministic Python/SQLite pipeline, CSV fields, policy/validation separation, and strict final-write gate. Retains source-reported **518 processed requests and 44 unresolved validation cases**, failed output contract, no solver rerun, and no live deletion or production-compliance claim. |
| EchoScape Labs | Completed audio-reactive WebGL foundation and existing worlds/studio; local audio signals and world-specific render settings; finite signal clamping; explicit **on-hold** status; historical baseline/current-availability distinction; planned worlds and wider product features separated from completed work. |

The Open Study Deck public README was refreshed through the connected GitHub provider (SHA `4ebded408043a6119fb79e04fdcda72a28b1463a`). Privacy statements describe its documented architecture, not independently verified enforcement. The local deletion-audit README and EchoScape audio-stream/roster sources were reread. Other feature detail rests on the earlier source audits and genuine captures, as mapped in `PROJECT_CASE_STUDIES.md`. The village direction comes from this milestone's owner brief.

Existing external actions are preserved, including the CSS Frosting source link present at the start. No new external destination was introduced and no fresh external availability/visibility audit is claimed.

## Screenshot coverage and remaining assets

| Project | Current coverage | Remaining asset work |
| --- | --- | --- |
| Open Study Deck | Home cover, generated workspace, saved library | Corrected genuine PNG export. The malformed `Sources/OpenStudyDeck/Exported Card.png` remains unpublished. |
| CSS Frosting | Home cover, generator/controls/code, analyzer result | No additional image required for the current story. Original preview masking remains disclosed. |
| HackerRank Orchestrate 2026 | Two CSV evidence images | Optional genuine validation-summary capture showing the 44-case limitation. CSV excerpts do not independently prove that count. Original Excel crop disclosure remains. |
| Game of No Lore | No screenshot claimed | Prepared subjects: genuine Unity gameplay overview, camera-zone view, gate interaction. |
| EchoScape Labs | No screenshot claimed | Optional subjects: implemented world, guest studio/local playlist, another built world. Five PNG candidates already exist under `Sources/EchoScapeLabs`; they remain untouched/unpublished pending review and provenance, rather than being treated as approved world screenshots from their filenames. |

All eight existing public WebP images were inspected directly as local images and remain byte-identical. No original, derivative, crop, mask, dimension, alt text, or caption was replaced. Six supporting screenshots now have short descriptive headings above the existing figures. Galleries retain full content width (approximately 936px at the desktop maximum), native aspect ratio, responsive `next/image` output, and full-resolution new-tab links. No carousel or thumbnail-only evidence view was added.

Game and EchoScape use empty typed `screenshots` arrays with documented capture subjects. The renderer omits galleries until reviewed entries exist; there are no placeholder images, broken URLs, or empty public panels. Dates/build references remain unknown unless already documented. The additional competition-home PNG also stays unpublished; the CSV evidence remains the visual focus.

## Owner input still needed

These details remain in documentation, not generic public copy:

- **Open Study Deck:** personal origin, hardest generation/storage/export tradeoff or bug and its resolution, and a concrete lesson. The README's product origin is not expanded into a first-person anecdote.
- **CSS Frosting:** personal design motivation, a specific style-conversion/parser or preview inconsistency and resolution, and a concrete lesson.
- **Game of No Lore:** what everyday village experience matters personally, a movement/animation/camera iteration and its resolution, and a lesson from actual prototype testing. Future activities need owner-defined scope before being named.
- **HackerRank Orchestrate 2026:** personal reason for choosing the challenge beyond entering the event, the most significant evidence/validation decision, and what the unresolved cases taught the owner.
- **EchoScape Labs:** creative motivation, a particular audio-to-visual mapping experiment and outcome, and a lesson from rendering or audio analysis. Current demo availability remains unconfirmed.

Documented engineering considerations populate “Challenges and decisions.” No personal difficulty, achievement, lesson, or new success metric is invented. “Results and limitations” is shown without a fabricated lessons subsection.

## Verification

- `npm.cmd run lint`: passed.
- `npx.cmd tsc --noEmit`: passed.
- `npm.cmd run build`: passed; Next.js 16.4.5 compilation, TypeScript, and all 11 static-generation tasks completed. `/projects` remains prerendered.
- `git diff --check`: passed. Git emits LF-to-CRLF normalization notices; no whitespace errors.
- Temporary Node verification rendered all five actual `ProjectDetail` components with React server rendering and the real Next Image/pipeline components. Checked headings, title references, optional workflow/future/gallery branches, image count/dimensions/responsive attributes, meaningful alternatives, screenshot links/new-tab notices, statuses, and validation caveats. CSS-module names were stubbed for this markup check; browser rendering was not simulated.
- Preservation assertions compared current typed data with Git HEAD: existing capsule copy/order/status/links/stack/cover/pipeline and supporting image metadata are unchanged, apart from added screenshot titles and the intentional empty arrays. Hash comparison and CSS comparison confirm the interaction files, all source/public images, dependencies, and prior CSS rules are preserved.
- Production HTTP at `127.0.0.1:3143`: `/projects` returned 200 with exactly five dialog triggers in the existing desktop order. All eight public images returned WebP data matching manifest SHA-256 and dimensions. All eight Next Image requests at width 640/quality 75 returned 200 with proportional dimensions. The withheld source-card URL returned 404.

The verification script and per-project static HTML artifacts are under `%TEMP%/portfolio-m3a3-*`, outside the repository. These checks establish content, source preservation, build, and HTTP/image behavior. They do not establish client interaction or visual correctness.

## Browser limitation and review still required

Current computer-use inventory returned `browsers: []` and `The browser access host is unavailable`. No browser interaction or screenshot was obtained. Real capsule scrolling and image rendering therefore remain unverified, along with deep-scroll close-button reachability, keyboard focus containment/restoration, X/Escape closing, page/row scroll restoration, mobile swipes/snap, safe areas, reduced motion, and transition quality.

Review each capsule at desktop and mobile widths, scroll through the large images and new sections, open full-resolution screenshots, then close with X and Escape. Confirm the original page/row positions and focus return. Check reduced motion and resizing across 768px, and confirm the mobile status groups and desktop layout remain visually intact. No browser, touch, screen-reader, Unity Play Mode, external generation/payment, or WebGL runtime success is claimed.

Milestone 3A.3 stops here for review.
