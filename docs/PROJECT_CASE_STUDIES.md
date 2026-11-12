# Project case studies: owner-approved working copy

Updated for Milestone 3A.4 on 2026-11-12. The owner supplied the stories below in this session and approved them as the narrative foundation of the current five expanded capsules. Their wording and paragraph breaks are preserved in `caseStudy.story` in `src/data/projects.ts`. Minor wording adjustments may be made during later owner review. The factual sections from 3A.3 remain the technical basis; they do not replace these personal accounts.

Display order remains Open Study Deck, CSS Frosting, HackerRank Orchestrate 2026, Game of No Lore, EchoScape Labs. Beyond The Veil is outside this milestone and is not added.

## Open Study Deck

**Live Web Product**

Open Study Deck started with a conversation with my sister about using Gemini to make study notes.

I wondered whether I could turn that process into something simpler: a free tool where students could create useful study materials without needing to understand prompts, configure a complicated application, or pay for a subscription.

The project grew into a browser-first study tool with summaries, detailed outlines, simple explanations, and flashcards.

I wanted to keep it ad-free and inexpensive to operate, so the design avoids a traditional account-and-database system. I later added limited guest access alongside the option to bring your own API key.

It's a live product that I'm still learning from and improving.

### Verified build details and limits

The Vite frontend uses HTML, CSS, and JavaScript modules. Limited guest requests pass through a Cloudflare Pages Function with Turnstile and a KV daily quota. BYOK generation calls Gemini directly from the browser. Decks and preferences use localStorage; keys use sessionStorage by default, with opt-in persistence. The documented analytics design requires consent and excludes content, answers, and keys. Quota tracking uses a salted IP-and-date hash. These are documented design choices, not an independent privacy audit.

The four modes, browser library, themes, and html2canvas-pro PNG export are implemented. **The overlapping-text export-rendering issue remains unresolved.** `Exported Card.png` stays unpublished. Genuine workspace and library captures show in-app cards, not a corrected export. Generated material needs review; browser storage does not provide cross-device sync, and clearing it removes saved decks. No measured learning outcome, adoption, or operating-cost saving is claimed.

## CSS Frosting

**Live Web Product**

CSS Frosting is a tool for experimenting with glassmorphic interfaces without repeatedly writing and adjusting every CSS property by hand.

What began as a collection of reusable styling presets developed into a visual playground where users can adjust blur, transparency, borders, and other properties, preview the results, and export styling code.

I also added a code analyzer to examine whether submitted styles contain common glassmorphism properties.

It gave me a chance to work on an interactive visual tool rather than another conventional website.

### Verified build details and limits

Next.js, React, TypeScript, and Tailwind CSS form the interface. Generator controls produce preview styles and CSS/Tailwind/styled output. The analyzer accepts those supported input representations and checks transparency, blur, borders, and shadows alongside a preview. Keeping the visible result and copied code together is a verified design choice; no particular parsing bug or successful fix is inferred.

Owner-confirmed live status and genuine v2.0 generator/analyzer screenshots support the described functionality. Analyzer scores are the tool's style checks, not an independent accessibility assessment. Exported styles need checking against their destination background and interface. No commercial results, revenue, payment success, adoption, or performance improvements are claimed.

## HackerRank Orchestrate 2026

**Completed Hackathon Attempt**

I built a Python-based deletion audit agent for the October 2026 HackerRank Orchestrate challenge.

The task was to determine whether personal information had actually been deleted across different systems. A process saying that deletion was successful wasn't necessarily enough.

The project examined identity history, available records, timestamps, and retention policies to produce structured findings and proposed remediation and verification steps.

The final candidate processed 518 evaluation requests, but 44 cases remained unresolved and failed the required output contract.

It was a substantial experiment in evidence handling and automated decision-making, but it was not a fully valid final solution or a production service.

### Verified build details and limits

The final runtime is deterministic Python. Evidence extraction covers structured files, logs, text-layer PDFs through pypdf, and checked screenshot transcriptions; SQL snapshots are read in isolated in-memory SQLite. Time-bounded identity aliases and source observations feed policy decisions. Relationship proof and resource-state proof are distinct. A later observation does not prove an earlier state.

A separate validator checks CSV structure, ordering, citation availability, and remediation-to-verification coverage. Diagnostic candidates are separate from the strict final writer, which replaces final output only after validation passes. **518 requests processed, 44 unresolved cases, failed contract and strict final gate** remain source-reported results, not a successful final export. `INCOMPLETE` is a deletion-status classification, distinct from unresolved validation. CSV images show candidate rows rather than proving the count. The solver was not rerun for this portfolio milestone. No live systems were connected and no deletion was executed. No production compliance or award is claimed.

The project's own title and identity remain its text/CSS capsule cover. By the owner's follow-up instruction, the genuine **December 2026 Holiday Edition** image is included only in expanded details as **later-event illustrative context**, because the original October page was unavailable. Its visible heading, alt text, filename, and caption distinguish December from the actual October entry. It implies neither December participation nor official HackerRank affiliation nor an award.

## Game of No Lore

**Early Prototype • In Development**

Game of No Lore started with a place I wanted to return to: my grandparents' house.

The house had been sold, but I still remembered its layout, the courtyard, the narrow passage, the handpump, and the little details that made it familiar.

I wanted to recreate some of that feeling through a small game.

The idea is to spend fourteen days in Shila, a fictional village inspired by my grandparents' home, exploring, meeting people, helping with ordinary things, and eventually returning to city life.

Right now, the project is still in its earliest technical stage. I've worked on the house asset, brought a prototype character into Unity, and experimented with materials, movement, camera zones, lighting, and basic interactions.

There isn't a complete village or finished gameplay system yet.

For me, this project is as much about learning to make a game as it is about preserving the memory that inspired one.

### Verified build details and limits

Only one house asset and a prototype character/environment have been developed. Local source contains Unity/C#/URP, the Input System, and Cinemachine. CharacterController movement holds a horizontal camera reference while input is held, pauses translation during larger turns, and feeds an animation bridge through actual horizontal velocity. Camera-zone triggers enable/disable Cinemachine cameras; nearby interaction input toggles a rotating gate. This describes implemented code rather than a newly verified runtime fix.

House and prototype material assets and the visual-benchmark scene support the material/lighting experiment description. They do not establish completed art direction or a finished environment. The fourteen-day story, village life, meeting people, and helping with activities remain intended scope. There is no public release. No new Unity Play Mode, collision, or build test was performed. `Sources/GameOfNoLore` is empty, so the project remains text-first with no substitute image.

## EchoScape Labs

**Development On Hold**

I didn't want to build another music visualizer. I wanted to build an experience.

EchoScape Labs explored the idea that music could become an environment you step into, rather than something you only hear or watch.

The application lets users select local audio and explore browser-based 3D environments that react to sound. Different environments were designed around different moods, from quiet snowfall to neon energy and flowing gold.

I worked on the experience studio, the visual worlds, the interface, and the way users move between selecting music and entering an experience.

Development is currently on hold. The work that exists remains part of my exploration of interactive 3D experiences.

### Verified build details and limits

React, TypeScript, and Vite form the shell; Three.js/React Three Fiber render the worlds. Web Audio utilities derive bass, mid, treble, and energy values. Shared signals are clamped to finite values between zero and one, and world-specific configurations map them to motion, lighting, and audio response. Each environment can interpret the same signals differently. This is implementation evidence rather than a measured stability or performance improvement.

The built foundation includes world renderers and a guest studio/local session playlist. Dream Aria, Pixel Dance, payments, export, desktop wallpapers, and other roadmap features are not presented as all shipped. Current demo availability is unconfirmed and development remains on hold. The genuine home, studio, world menu, world selection, and Liquid Gold screenshots were reviewed and optimized for 3A.4. Menu ring artwork is labeled as menu artwork, and a still in-world capture does not establish playback performance.

## Evidence ledger

| Project | Verified detail | Source |
| --- | --- | --- |
| Open Study Deck | Four modes, guest gateway/direct BYOK, browser storage, key persistence, privacy design, PNG export | Public README refreshed in 3A.3 on 2026-11-12, blob `4ebded408043a6119fb79e04fdcda72a28b1463a`; implementation inspections recorded in [1A](MILESTONE_1A_CONTENT_AUDIT.md) and [2A](MILESTONE_2A_PROJECT_SHOWCASE.md). Existing captures and owner-identified export defect. No new generation/export test. |
| CSS Frosting | Generator/preview/exports and analyzer properties | Generator/analyzer source inspections in 2A; genuine v2.0 captures; owner-confirmed live status. No new payment or external availability audit. |
| Game of No Lore | Movement/facing/animation/camera/gate, material assets and lighting scene | 2A inspection plus 3A.4 read-only refresh of `Assets/_game/Scripts/Player/Player_Prototype.cs`, `Animation/PrototypeCharacterAnimator.cs`, `Camera/CameraZone.cs`, `Interaction/PrototypeGateInteraction.cs`, house `.mat` assets, and `Scenes/M0B_Shila_VisualBenchmark.unity` under `C:/Dev/Game-Of-No-Lore/Game/GameOfNoLore`. Personal memory, single-house scope, and planned story are owner-approved in this session. |
| HackerRank Orchestrate 2026 | Deterministic pipeline, validation boundary, 518 requests/44 unresolved | Local `C:/Dev/HackerRank-Orchestrate-October26/hackerrank-orchestrate-october26-main/README.md`, reread in 3A.4; final-writer inspection in 2A and 3A.3 documentation. December screenshot role explicitly authorized by owner follow-up. |
| EchoScape Labs | Audio signal stream and world-specific architecture; built/planned boundary | 2A source audit; local `C:/Dev/Echo-Scape/src/utils/audioData.ts` reread in 3A.4; `MasterDocument/02_Product/Experience_Roster.md` reread in 3A.3. Historical foundation documents do not supersede the owner's current on-hold status. |

## Owner questions still open

Personal lessons remain optional in `caseStudy.lessons` and are omitted for every project until explicitly confirmed. The approved Game story's general learning motivation is preserved without turning it into a specific lesson or achievement. No personal difficulty, successful bug fix, commercial result, performance result, or metric is inferred from source code.

- Open Study Deck: What concrete lesson came from choosing browser storage and guest/BYOK access? When the export issue is actually corrected, what changed and what verification establishes the outcome?
- CSS Frosting: Which preview, style-conversion, or parsing decision mattered most personally, and what did you learn from it?
- EchoScape Labs: Which audio-to-world mapping required the most experimentation, what was its verified outcome, and what did you learn?
- HackerRank Orchestrate 2026: What did the unresolved cases teach you personally about evidence or validation, and what would you change?
- Game of No Lore: Which movement, material, or camera iteration was most significant, what was actually verified, and what specific lesson would you like to share?

## Presentation and review boundary

Expanded capsules lead with the approved personal introduction, followed by practical purpose and built functionality, existing workflows, genuine screenshots, Behind the Build, documented design decisions, results/limitations, and optional future direction/confirmed lessons. Existing capsule behavior, responsive/mobile groups, order, accessibility, and the AI-assisted-development disclosure are preserved. Source-supported decisions are not relabeled as personally difficult challenges or solved bugs.

See [PROJECT_IMAGES.md](PROJECT_IMAGES.md) for image provenance and [the 3A.4 report](MILESTONE_3A_4_AUTHENTIC_STORYTELLING.md) for current verification and unverified browser interactions. Earlier 3A.3 reports remain historical. No commit, push, deployment, new project, dependency change, or new route is part of this milestone.
