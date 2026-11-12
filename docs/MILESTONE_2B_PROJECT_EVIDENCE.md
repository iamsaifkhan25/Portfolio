# Milestone 2B: project evidence and presentation

Reviewed 2026-11-09. Scope ends at 2B for owner review. No Editorial Glass redesign, dependency changes, commit, push, or deployment.

## Starting state and preservation

Read `MILESTONE_1A_CONTENT_AUDIT.md`, `MILESTONE_2A_PROJECT_SHOWCASE.md`, `AGENTS.md`, current project data/card/page implementation, shared card/styles, and package scripts before editing. The installed Next.js guides for layouts/pages, Server/Client Components, and images were consulted before code changes.

The starting working tree was not clean:

```text
 M src/app/projects/page.tsx
?? docs/MILESTONE_2A_PROJECT_SHOWCASE.md
?? src/components/ProjectCard.tsx
?? src/data/
```

These are the existing 2A changes and were preserved. A pre-edit SHA-256 manifest and copies of the project data/card were saved under the local temporary folder `portfolio-m2b-20261109`. Comparison against that manifest shows only `src/data/projects.ts` and `src/components/ProjectCard.tsx` changed among pre-existing files during 2B. The projects page itself, 2A report, global CSS, navigation, other pages, resume, configuration, and dependency files remained byte-identical to the starting state.

## Files changed or added in 2B

- `src/data/projects.ts`: owner-confirmed statuses, shorter card copy, preserved project limits, restored CSS Frosting site link, and optional cover/additional image metadata.
- `src/components/ProjectCard.tsx`: status labels, shared image figure rendering, optional cover, and a native disclosure for additional screenshots. No images or disclosure appear when metadata is absent.
- `docs/PROJECT_CASE_STUDIES.md`: five separate copy drafts covering purpose, motivation, technical/creative work, and learning. Unknown personal details are explicitly marked for owner input rather than placed on public cards.
- `docs/PROJECT_IMAGES.md`: capture requests, metadata requirements, provenance record, and instructions for adding real assets.
- `docs/MILESTONE_2B_PROJECT_EVIDENCE.md`: this review record.
- `.gitkeep` in each of the five image folders listed below.

## Owner-confirmed statuses

The owner's 2B instructions supersede the older availability/development uncertainty in the 1A/2A reports. Those reports remain historical evidence, not current status definitions.

| Project | Published badge | Supporting distinction |
| --- | --- | --- |
| Open Study Deck | Live website | Deployed at the owner-confirmed public URL; accessible through the current web fetch |
| CSS Frosting | Live website | Owner confirms deployment and production URL; automated fetch could not independently access it |
| Game of No Lore | In development | Active development with an owner-confirmed playable Unity prototype; not publicly released |
| Ghost Data Still Exists | Hackathon complete | HackerRank Orchestrate October 2026 attempt is complete; not a production service; documented 44 unresolved evaluation cases still fail local validation |
| EchoScape Labs | On hold | Earlier development and prototypes remain valid work; planned features are not all shipped |

Ghost Data's caveat remains visible directly on its card, including the documented 518-request candidate and 44 unresolved cases. Completion refers to the hackathon attempt, not a fully valid evaluation result. The solver was not rerun. CSS Frosting copy makes no claim about verified payment flows, transactions, revenue, or adoption.

## External link audit

| Project/action | Destination | Current result and decision |
| --- | --- | --- |
| Open Study Deck website | <https://openstudydeck.com/> | Web fetch accessible and shows the intended study workspace; preserved |
| Open Study Deck source | <https://github.com/iamsaifkhan25/Open-Study-Deck> | Connected GitHub repository metadata confirms matching canonical URL, `private: false`, and public visibility; preserved |
| CSS Frosting website | <https://cssfrosting.com> | Web fetch reports the URL inaccessible through that tool. Owner confirms it is deployed and running here; restored this exact destination without changing it based on the fetch failure |
| Ghost Data source | <https://github.com/iamsaifkhan25/October-Hackerrank-Orchestrate-2026> | Connected GitHub metadata confirms matching canonical URL and public visibility; preserved |
| Game of No Lore source | <https://github.com/iamsaifkhan25/Game-Of-No-Lore> | Connected GitHub metadata confirms matching canonical URL and public visibility; preserved |

The web tool could not fetch the three GitHub pages directly (`DisabledError`); the connected GitHub provider supplied repository identity/visibility verification instead. A fetch failure is not evidence that a website is down. CSS Frosting's owner-confirmed status remains authoritative, while independent page availability is unverified here.

CSS Frosting and EchoScape private source links remain omitted. EchoScape has no demo link in the current project data; its current demo availability remains unconfirmed. No new private repository URLs were added. The rendered page contains exactly five project actions: two site links and three public source links. No generation, export, payment, account, contact, or gameplay flow was exercised.

## Image folders and outstanding owner captures

Created under `public/projects/`:

- `open-study-deck/`
- `css-frosting/`
- `game-of-no-lore/`
- `ghost-data/`
- `echoscape-labs/`

Each contains only `.gitkeep`. The current portfolio asset scan found no genuine project screenshots. No stock images, generated artwork, placeholder files, speculative paths, or private-repository imagery were added. All five cards remain text-first.

The data now accepts optional `coverImage` and `screenshots`, sharing required local path, descriptive alt text, actual dimensions, caption, and capture date, plus an optional version. The optional gallery uses native `details`/`summary`, explicit focus-visible styling, and no animation or client state. Image rendering uses `next/image`, intrinsic dimensions, responsive sizing, and captions. These image branches compile but await real captures and browser checks.

Owner captures still required:

| Project | Requested evidence |
| --- | --- |
| Open Study Deck | Generated workspace, browser library, and exported card using non-sensitive notes |
| CSS Frosting | Generator preview/controls and an actual analyzer input/result |
| Game of No Lore | Current Play Mode or build, plus camera-zone and gate views |
| Ghost Data Still Exists | Redacted real report/CLI findings and unresolved-case diagnostics, retaining the validation limitation |
| EchoScape Labs | Actual built world, guest studio/local playlist, and another existing world; identify historical versions clearly |

Record date, version when known, source, dimensions, redactions, alt text, and caption for each accepted capture. The detailed workflow is in `PROJECT_IMAGES.md`.

## Content requiring owner review

`PROJECT_CASE_STUDIES.md` keeps longer copy out of cards and out of public routes. All five drafts contain factual project purpose and source-supported technical areas. The hackathon motivation is established for Ghost Data. Personal origin stories for the other projects, personal reasons for choosing the hackathon challenge, each project's most significant challenge/resolution, and concrete personal lessons still require owner input. No personal learning, commercial outcome, unsupported metric, shipped roadmap feature, or contest result was invented.

## Validation

- `npm.cmd run lint`: passed, exit 0, no warnings/errors reported.
- `npm.cmd run build`: passed, exit 0; Next.js 16.4.5 compilation, TypeScript, and 11/11 static generation tasks completed. `/projects` remains prerendered; route architecture is unchanged.
- Production server at `127.0.0.1:3139`: `/projects` returned HTTP 200. Rendered-HTML checks passed for five ordered project articles, all status labels, unreleased/on-hold/incomplete-evaluation caveats, matching heading references, and exactly the five intended external destinations.
- External anchors retain project-specific accessible labels with a new-tab notice, `noopener noreferrer`, and minimum 44px height. The original AI disclosure is unchanged and present in rendered HTML.
- Data/folder checks passed: all five project folders exist, all entries omit image metadata, and the project articles contain no image, figure, or empty-gallery markup. There are no broken image references in the current data.
- SHA-256 comparison confirms preservation of all pre-existing files except the two scoped project files. Source review confirms wrapping status/technology rows, unchanged responsive grid classes, no new client boundary, no hooks/dependencies, and preserved shared focus/reduced-motion styles.
- `git diff --check`: passed; Git reports only a line-ending normalization warning for the pre-existing projects-page change.

Browser limitation: current computer-use inventory reports no available browsers and `The browser access host is unavailable`. Desktop/mobile visuals, keyboard traversal, native gallery interaction, console/network behavior, and reduced-motion behavior are **not browser-verified**. No authentic screenshots were captured. Source/build/HTTP checks do not replace browser verification, and the image renderer remains unverified with real product assets.

Milestone 2B stops here for review. No commit, push, or deployment was performed.
