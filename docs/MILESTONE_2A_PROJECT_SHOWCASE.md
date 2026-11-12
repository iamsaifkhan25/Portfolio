# Milestone 2A: project showcase foundation

Reviewed 2026-11-09. Starting point: `MILESTONE_1A_CONTENT_AUDIT.md`, followed by read-only source inspection and current link checks. Scope ends at the project showcase foundation; no major redesign, commit, push, or deployment.

## Working tree and scope

`git rev-parse --show-toplevel` returned `C:/Dev/Portfolio`; `git status --porcelain=v1` was empty before editing. Git is now initialized, unlike the state recorded in the 1A audit. No pre-existing uncommitted changes were present.

Files changed:

- `src/data/projects.ts`: typed project inventory, development status, featured placement, optional public source/demo links, highlights, limitations, and optional local screenshot metadata.
- `src/components/ProjectCard.tsx`: reusable Server Component, semantic articles, readable status labels, technology lists, optional real screenshot rendering, and labeled external links.
- `src/app/projects/page.tsx`: three featured projects followed by two additional projects. Open Study Deck spans the desktop grid; the remaining cards use two columns, collapsing to one on mobile. The original AI disclosure follows the showcase with its wording unchanged.
- `docs/MILESTONE_2A_PROJECT_SHOWCASE.md`: evidence, asset needs, link decisions, and validation record.

Shared styles, layout, navigation, other pages, resume asset, configuration, and package versions were not edited. The installed Next.js guides for layouts/pages, Server/Client Components, and `next/image` were read before implementation. No new client boundary, hooks, API, dependencies, or runtime data fetching were added.

## Published claims and evidence

Implementation inspection supports the feature descriptions below. It does not establish successful end-to-end operation, security, performance, usage, revenue, or release readiness. Source links are included only where GitHub metadata currently reports a public repository. Private source URLs are deliberately omitted from this document and the project data.

### Open Study Deck

Published as a live study tool with text/image inputs, Gemini generation, four study modes, limited guest access/BYOK, browser library, and PNG export. Stack: HTML/CSS, JavaScript, Vite, Gemini, Cloudflare Pages Functions/KV/Turnstile.

Evidence:

- [README](https://github.com/iamsaifkhan25/Open-Study-Deck/blob/master/README.md), blob `4ebded408043a6119fb79e04fdcda72a28b1463a`.
- [Package manifest](https://github.com/iamsaifkhan25/Open-Study-Deck/blob/master/package.json), blob `dc42df6e870ef77e2c8594679abc8b158c666e41`. This is a JavaScript/Vite project; React/TypeScript are not claimed.
- [Guest generation handler](https://github.com/iamsaifkhan25/Open-Study-Deck/blob/master/functions/api/generate-study-deck.js), blob `17c2ea4bf5d9720b5df840b64031ce4bdc86f0bc`. Inspected input validation, Turnstile/quota imports, and Gemini request implementation.
- [Live site](https://openstudydeck.com/) was accessible through a web fetch on the review date. It exposed image/text inputs, Summarize/ELI5/Detailed Outline/Flashcards, guest/BYOK controls, browser library, and export documentation.

The live-site link is displayed. No generation request, export, donation, or payment was exercised. No scheduler, learning-outcome, privacy-enforcement, or adoption claim is made.

### EchoScape Labs

Published as an in-development browser audio-reactive 3D experience, with built WebGL worlds and a guest studio/local playlist. Stack shown: React, TypeScript, Vite, Three.js/React Three Fiber, Web Audio.

Read through the connected source provider:

- `README.md` and `package.json`; package blob `24b1cdc34d8c27020387ce543b9bf0d0fad4d085` confirms the frontend/rendering dependencies.
- `src/utils/audioData.ts`, blob `c8568decf748669e7ff9fa180c3d44fa96a459b5`, supplies bass/mid/treble/energy values.
- `src/utils/experienceConfigs.ts`, blob `b1cd03b0b4691ab07047b3e3fa97c6d8053cc820`, includes world-specific motion, lighting, and audio-response configurations.
- `src/components/LiquidGoldWorld.tsx`, blob `d8fde9c60c2ea899fc285b89213f0f55fe0bd79d`, includes a frame-driven world renderer.
- `MasterDocument/00_CURRENT_STATE.md`, blob `a12cdd8dbcf1f2654209cb947c82f7f197942ec3`, last verified by its authors on 2026-08-03. It documents the foundation baseline, guest studio, and local playlist, while distinguishing the broader roadmap.
- `MasterDocument/02_Product/Experience_Roster.md`, blob `a3b77c87466b7cfc73773b3c745f63a6175fd2b8`, distinguishes built renderers from planned Dream Aria/Pixel Dance work. No permanent world count or planned-world completion is claimed.

GitHub metadata reports private visibility. No source link is displayed. The previously documented production destination could not be accessed through the web-fetch tool; no demo link is displayed. This is a verification limit, not evidence of an outage. Current WebGL playback, accounts, and deployment were not exercised.

### Ghost Data Still Exists

Published as a Python evidence/policy audit tool built for HackerRank Orchestrate, with explicit incomplete validation. Stack shown: Python, SQLite, pypdf.

Read-only local evidence under `C:\Dev\HackerRank-Orchestrate-October26\hackerrank-orchestrate-october26-main`:

- `README.md` describes identity history, evidence reconstruction at audit timestamps, source-linked findings, proposed remediation/verification, and the deterministic runtime.
- `code/deletion_audit/submission_candidate.py` distinguishes diagnostic candidates from final output and permits a final write only when validation has no errors.

The README still reports 518 requests and 44 unresolved rows failing the local contract. The card explicitly calls these documented results. The solver and benchmark were not rerun for this portfolio change; the numbers are source-reported, not newly measured. A passing structural check would not by itself establish correct policy interpretation. No live deletion, production compliance, contest placement, or fully valid output is claimed.

GitHub metadata confirms the [source repository](https://github.com/iamsaifkhan25/October-Hackerrank-Orchestrate-2026) is public; that link is displayed. No demo is offered.

### Game of No Lore

Published as a cozy Unity game in development, describing its early movement, animation bridge, camera zones, and gate interaction. Stack shown: Unity, C#, URP, Input System, Cinemachine.

Read-only local evidence under `C:\Dev\Game-Of-No-Lore\Game\GameOfNoLore`:

- `Assets/_game/Scripts/Player/Player_Prototype.cs`: CharacterController movement, camera-derived movement reference, facing/turn handling, and Input System actions.
- `Assets/_game/Scripts/Animation/PrototypeCharacterAnimator.cs`: horizontal controller velocity drives the animator's `MoveSpeed` parameter.
- `Assets/_game/Scripts/Camera/CameraZone.cs`: trigger-based Cinemachine camera enable/disable.
- `Assets/_game/Scripts/Interaction/PrototypeGateInteraction.cs`: interaction input toggles a rotating gate while the player is inside its trigger.
- `Packages/manifest.json`: URP, Input System, and Cinemachine dependencies.

The cozy direction is owner-provided and consistent with the 1A resume audit. This milestone did not compile Unity, enter Play Mode, or test a playable build. The public repository may lag local prototype work. No release/platform support is implied. GitHub metadata confirms the [repository](https://github.com/iamsaifkhan25/Game-Of-No-Lore) is public; its source link is displayed, without a demo.

### CSS Frosting

Published as a built styling/code-generation implementation with a preview canvas, presets, code copying, and a glass-effect analyzer. Stack shown: Next.js, React, TypeScript, Tailwind CSS.

Read through the connected source provider:

- `README.md` and `package.json`, package blob `4804ec8d9b265a042fda6f26c8b8cdc05caf8fc1`.
- `src/app/generator/generator-client.tsx`, blob `cf2989b8bb581341e44e66135a6e4316024657df`: blur/saturation style generation, color controls, clipboard code copy, and style conversion.
- `src/app/analyzer/analyzer-client.tsx`, blob `5131a3c6f65a1d0c0e24dc2fcbfd23c6eb11e09b`: CSS/Tailwind/styled input modes and checks for background transparency, blur, borders, and shadows.

GitHub metadata reports private visibility, so no source link is displayed. The documented production destination could not be accessed through the web-fetch tool, so the old demo link was removed from `/projects`. Current availability is explicitly unconfirmed. No verified sales, active payment readiness, security guarantee, or commercial success is claimed.

## Asset inventory and next captures

A recursive search of the portfolio, including hidden paths and excluding dependencies/build output/Git metadata/agent internals, found no project PNG/JPEG/WebP/AVIF/SVG/GIF assets. `public/` contains the resume PDF; the app favicon is not a project screenshot. No existing project screenshot was available to reuse.

Remote repository tree checks found mostly icons; EchoScape also has branded hero/OG imagery. These were not treated as real product screenshots or copied from private source. No images were generated, substituted, or downloaded. All five entries use deliberate text-first cards, with optional screenshot support ready for genuine local captures.

Useful assets for a later review:

| Project | Capture needed |
| --- | --- |
| Open Study Deck | Real workspace with generated material, plus library or card export. Use non-sensitive sample notes. |
| EchoScape Labs | Actual running studio/world with a caption identifying the built experience. |
| Ghost Data Still Exists | Redacted real CLI/report output showing both findings and unresolved validation, with no subject identifiers or private evidence. |
| Game of No Lore | Current Play Mode or build capture demonstrating movement/camera/gate systems. |
| CSS Frosting | Real generator preview and analyzer result, excluding account/payment information. |

For each capture, record its project version/date, original dimensions, alt text, and a factual caption. Screenshot rendering is implemented but unexercised because no verified assets are supplied.

## Validation

- `npm.cmd run lint`: passed, exit 0, no warnings/errors reported.
- `npm.cmd run build`: passed, exit 0. Next.js 16.4.5 compiled successfully, TypeScript passed, and 11/11 static generation tasks completed. `/projects` remains prerendered.
- Production server at `127.0.0.1:3137`: `/projects` returned HTTP 200. Rendered-HTML assertions passed for exactly five project articles in the intended order, three section/disclosure headings, unique article heading references, the Ghost Data caveat, and the original AI disclosure wording compared with Git HEAD.
- Rendered links: exactly four project actions, comprising one confirmed demo and three currently public source repositories. Each has a project-specific accessible label, new-tab notice, `noopener noreferrer`, and a minimum 44px height. No private source URLs, unconfirmed demo URLs, or placeholder images appear in the articles.
- React/source review: stable IDs as keys, typed data outside presentation, semantic heading hierarchy, native anchors, decorative icons hidden from accessibility APIs, wrapping badges/statuses, and responsive one/two-column classes. Shared focus-visible and reduced-motion rules are retained; project panels do not add hover translation or new animation logic.
- `git diff --check`: passed. Package manifests, lockfile, shared components/styles, and unrelated pages are unchanged.

Browser limitations: the browser inventory reported `The browser access host is unavailable`. A native Firefox fallback was then stopped by the computer-use tool because browser URL-policy enforcement is unsupported for this Windows browser. No further UI automation was attempted. Desktop/mobile visuals, keyboard traversal, responsive menu behavior, runtime motion preferences, and browser console/network state are therefore **not browser-verified**. Source review and rendered-HTML checks do not replace those checks.

No AI generation, purchase, contact submission, account operation, remote write, commit, push, or deployment was performed. Milestone 2A ends here for review.
