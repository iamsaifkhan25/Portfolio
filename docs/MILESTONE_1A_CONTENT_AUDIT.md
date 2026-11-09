# Portfolio Milestone 1A content audit

Audit date: 2026-11-09. Scope: authentic copy, resume accuracy, project inventory, and verification. No deployment, push, dependency update, or visual-system redesign.

## Repository and architecture

`C:\Dev\Portfolio` has no `.git` directory; `git status --short` fails with "not a git repository". A clean/dirty working-tree claim is therefore unavailable. Files were inspected before editing; a pre-edit source snapshot and SHA-256 manifest were saved at `C:\Users\Saif\AppData\Local\Temp\portfolio-m1a-20261109-090431` for comparison.

Next.js 16.4.5 App Router and React 19.2.4. Home, projects, and resume are Server Components; Navbar and contact are Client Components. Root layout supplies navigation, footer, animated orbs, and global styling. Contact submits to `/api/contact`, which forwards to FormSubmit. No backend/database was added.

The installed Next.js guides for layouts/pages, Server/Client Components, and metadata/OG images were read before editing. Shared CSS, navigation logic, responsive breakpoints, animations, reduced-motion rules, contact form/API, and dependency files were preserved.

## Files inspected and modified

Modified:

- `src/app/page.tsx`: approved introduction in the existing hero/actions/three-card layout, with final emphasized sentence.
- `src/app/resume/page.tsx`: source-backed roles, dates, responsibilities, skills, education, and download link.
- `src/app/projects/page.tsx`: corrected existing cards and AI disclosure; kept two-card implementation.
- `src/app/layout.tsx`: title, description, and keywords aligned with the introduction.
- `src/app/opengraph-image.tsx`: aligned social-preview copy; preserved visual layout.
- `src/components/Footer.tsx`: replaced AI-marketing label with "Building & Learning".
- `public/Saif Resume.pdf`: replaced placeholder with the owner's genuine PDF unchanged.
- `README.md`: corrected architecture, workflow, project-status, and resume claims.
- `docs/MILESTONE_1A_CONTENT_AUDIT.md`: this inventory and audit.

Also inspected without source edits: `AGENTS.md`, `CLAUDE.md`, `package.json`, `package-lock.json`, `tsconfig.json`, `next.config.ts`, `eslint.config.mjs`, `.gitignore`, `src/app/globals.css`, `src/components/{Navbar,GlassCard,BackgroundOrbs}.tsx`, `src/app/contact/page.tsx`, `src/app/api/contact/route.ts`, `src/app/{sitemap,robots}.ts`, and the project sources below. Output under `.next` is generated.

## Homepage and AI disclosure

Approved introduction retained in its original reading order, adapting the background, learning, and AI paragraphs into existing glass cards. JSX apostrophe escaping does not change rendered wording. The opening line and final collection statement remain emphasized.

Removed unsupported claims of next-generation development, 10x speed, guaranteed architecture/performance, full-stack expertise, first-commit production readiness, monetization success, product-market fit, and optimized conversions. Metadata, social preview, footer, and README no longer repeat that positioning.

Published disclosure on `/projects`:

> I use Codex and Claude Code to help explore ideas, understand unfamiliar code, prototype, and work through bugs. I'm still learning, and AI assistance is part of that process. I remain responsible for what I build: the design decisions, understanding the changes, testing the results, and iterating when something doesn't work.

The owner's resume also names these tools. No speed multiplier, independent-expertise claim, or blanket testing guarantee is implied.

## Resume evidence and corrections

Original public download: 141 bytes of text beginning "Saif Khan - Resume Placeholder", not a PDF. The owner then supplied the Downloads location and explicitly selected `C:\Users\Saif\Downloads\Saif_Khan_Resume_Updated.pdf` over newer `-1` and `-2` variants. Its one page was text-extracted and visually inspected after rendering. The owner's selected file is authoritative for this milestone.

| Item | Previous page | Corrected from selected PDF |
| --- | --- | --- |
| IGT | Customer Support Executive; no dates | Vendor Support Agent; IGT Solutions Pvt. Ltd., Gurugram; May 2025 - Present |
| Convergys | No dates; upselling/conflict/process claims | Customer Service Executive, Gurugram; Sep 2023 - Apr 2025; service/billing questions, pricing options, customer retention |
| Viva Holiday Planners | No dates; database administration, tour scheduling, internal audits | Admin Representative, Noida; Feb 2022 - May 2023; EMS metrics, written inquiries, productivity reports |
| Duration | Nearly a decade | Removed; exact periods shown instead of calculating an aggregate |
| IGT duties | Salesforce configuration, GDS ticketing | B2B car/activity partner support through Salesforce, onboarding support, case ownership, internal coordination |
| Degree | Implied completion; Psychology/Radio Lekhan specialization | Bachelor of Travel & Tour Management, IGNOU; 2025 - Present; distance learning, not yet completed |
| School | Missing | Higher Secondary, Science; Govt. Boys Senior Secondary School; 2020 |
| Skills | GDS and other unsourced labels | Resume-listed onboarding, investigation, CRM follow-up, documentation, coordination, process accuracy, Salesforce |

Responsibilities are conservative paraphrases. No qualifications or accomplishments were inferred from titles. The PDF mentions document inputs for Open Study Deck; portfolio copy uses the narrower text/image inputs supported by the inspected project sources.

The PDF was copied byte-for-byte to the existing public asset path. Download points to `/Saif%20Resume.pdf`. Source and destination SHA-256: `AB7027A0987C00E69E80FF5D505AAF4211BBE7E72EAEC677F950C98D1CB7AB3A`.

**No resume replacement task remains.** The genuine PDF was neither edited nor regenerated. Future employment/education changes require an updated source and page review.

## Five-project inventory

Repository claims and live observations are distinguished below. A page fetch is not a successful transaction, generation request, gameplay test, security review, or performance measurement. Private source links here are audit references; check visibility and owner intent before adding public source links to the site.

| Project | Evidence-supported classification | Stack | Safe portfolio scope |
| --- | --- | --- | --- |
| Open Study Deck | Deployed web tool; homepage accessible during audit | HTML, CSS, JavaScript modules; Vite; Gemini; Cloudflare Pages Functions, KV, Turnstile; Razorpay | Text/image inputs, four study modes, guest/BYOK paths, browser library, PNG export, optional donation integration |
| CSS Frosting | Web product with deployment configuration; current deployment not independently confirmed | Next.js 16, React 19, TypeScript, Tailwind v4; Supabase; Razorpay; OpenNext/Cloudflare Workers | Glass canvas, presets, style exports, analyzer, account/checkout implementation; no proven sales or product-market fit |
| EchoScape Labs / EchoScape | Documentation reports deployed Web Foundation v1.0.0; broader product in development; current site inaccessible via audit fetch | React 19, TypeScript, Vite, Three.js, React Three Fiber/Drei, Web Audio, Supabase; Cloudflare Pages | Audio-reactive environments, guest studio, local playlist, optional accounts/settings/presets; separate built baseline from planned features |
| Game of No Lore | Unity prototype in development; released game not verified | Unity 6000.3.23f1, C#, URP 17.3, Input System, Cinemachine 3; Blender per owner's resume | Movement, animation bridge, camera zones, gate interaction; slice-of-life direction per resume |
| Ghost Data Still Exists (HackerRank Orchestrate) | Challenge audit tool / best-effort candidate; not a deployed service or fully valid final output | Python 3.11+, SQLite, pypdf; optional AI experiment adapters | Evidence/policy audit, identity history, structured findings/remediation/verification, strict validation; no live deletion execution |

### Open Study Deck

Sources: [README](https://github.com/iamsaifkhan25/Open-Study-Deck/blob/master/README.md), [package.json](https://github.com/iamsaifkhan25/Open-Study-Deck/blob/master/package.json), [guest handler](https://github.com/iamsaifkhan25/Open-Study-Deck/blob/master/functions/api/generate-study-deck.js), [live homepage](https://openstudydeck.com/).

README blob: `4ebded408043a6119fb79e04fdcda72a28b1463a`; package blob: `dc42df6e870ef77e2c8594679abc8b158c666e41`. Package contains Vite/Wrangler tooling, no React/TypeScript dependency. Guest handler validates input, Turnstile and KV quota, then calls Gemini. Live page exposes Summarize, ELI5, Detailed Outline, Flashcards, browser library, and guest/BYOK controls.

Removed React/TypeScript badges and claims of a built-in spaced-repetition scheduler and study metrics. The live site's advice to revisit cards at intervals does not establish a scheduling engine. Donation integration does not prove operating-cost coverage. Generation, donation payment, exports, and privacy enforcement were not exercised here.

### CSS Frosting

Sources: [README](https://github.com/iamsaifkhan25/CSS-frosting/blob/main/README.md), [package.json](https://github.com/iamsaifkhan25/CSS-frosting/blob/main/package.json), [checkout](https://github.com/iamsaifkhan25/CSS-frosting/blob/main/src/app/api/checkout/route.ts), [Wrangler config](https://github.com/iamsaifkhan25/CSS-frosting/blob/main/wrangler.jsonc), [sitemap](https://github.com/iamsaifkhan25/CSS-frosting/blob/main/src/app/sitemap.ts), layout/footer, and repository tree. Visibility at inspection: private.

README blob: `a57acfeac0e5217e0d993b5e0a62ecbb88698498`; package blob: `4804ec8d9b265a042fda6f26c8b8cdc05caf8fc1`. Checkout code implements authenticated Razorpay orders with product/purchase records. Generator, analyzer, presets, verification and webhook routes exist. Stripe dependencies do not alone prove an active Stripe checkout; inspected checkout uses Razorpay. OpenNext worker/asset configuration targets Cloudflare Workers.

Corrected `casfrosting.com` to `cssfrosting.com`, matching the source sitemap. Both URLs were inaccessible via audit fetch; this does not prove an outage. Removed demand, commercial viability, product-market fit, actual-sales, secure-payment, cached-performance, and conversion claims. Owner should confirm production URL and payment readiness before calling it a currently live commercial service.

### EchoScape Labs

Sources: [README](https://github.com/iamsaifkhan25/Echo-Scape/blob/main/README.md), [package.json](https://github.com/iamsaifkhan25/Echo-Scape/blob/main/package.json), [current state](https://github.com/iamsaifkhan25/Echo-Scape/blob/main/MasterDocument/00_CURRENT_STATE.md), [roster](https://github.com/iamsaifkhan25/Echo-Scape/blob/main/MasterDocument/02_Product/Experience_Roster.md), repository tree. Visibility at inspection: private despite README's public-visibility wording.

Current-state document, last verified 2026-08-03, records a deployed Web Foundation v1.0.0 at `https://echoscapelabs.com` with active roadmap development. README's `1.0.0-rc.1` conflicts with the package/current-state `1.0.0`; prefer the dated foundation-release distinction, not a claim that the whole roadmap is complete.

Roster documents five built baseline worlds: Cyber Neon, Aurora Snowfall, Blue Hour Sakura, Cosmic Nebula, Liquid Gold. Dream Aria is planned to replace Cosmic Nebula; Pixel Dance is planned as an additional world. Neither planned world should be described as shipped. Avoid a fixed permanent world count. Plus payments, video export, rewarded ads, desktop wallpapers, and profile editing remain planned in inspected docs. Current availability, accounts, audio privacy and WebGL runtime were not independently exercised.

### Game of No Lore

Read-only local sources under `C:\Dev\Game-Of-No-Lore\Game\GameOfNoLore`:

- `ProjectSettings/ProjectVersion.txt` and `Packages/manifest.json`.
- `Assets/_game/Scripts/Player/Player_Prototype.cs`.
- `Assets/_game/Scripts/Camera/CameraZone.cs`.
- `Assets/_game/Scripts/Interaction/PrototypeGateInteraction.cs`.
- Animation bridge inspected at `Assets/_game/Scripts/Animation/PrototypeCharacterAnimator.cs`.

Public repository identified: [Game-Of-No-Lore](https://github.com/iamsaifkhan25/Game-Of-No-Lore). Owner-selected resume describes a Unity/Blender game in development with a playable prototype. Inspected code supports movement, camera triggers, and gate interaction. Unity compilation, Play Mode, distributed builds, platform support and release readiness were not checked here. Installed packages alone do not establish features such as multiplayer.

### Ghost Data Still Exists

Read-only local source: `C:\Dev\HackerRank-Orchestrate-October26\hackerrank-orchestrate-october26-main\README.md`. Public repository identified: [October-Hackerrank-Orchestrate-2026](https://github.com/iamsaifkhan25/October-Hackerrank-Orchestrate-2026).

Local README describes a deterministic Python evidence/policy audit pipeline, with AI used extensively during development and separate interpretation experiments. It reports 518 evaluation requests, including 44 unresolved rows failing the local output contract. These are source-reported results, not newly reproduced measurements. Do not claim every case solved or the candidate valid. It proposes remediation/verification without connecting to live systems or deleting data. No rank, award, production deployment or autonomous compliance guarantee is supported.

## Claims requiring owner verification

- CSS Frosting and EchoScape current availability, canonical production URLs, enabled features, and payment readiness. Fetch failures are a verification limit, not an outage finding.
- Permission/visibility before publishing CSS Frosting/EchoScape source-code links.
- Current roadmap status beyond the dated EchoScape documentation.
- Revenue, users, donation coverage, performance, contest results, and release-readiness claims before adding any. None were inferred or published here.

## Validation

Before edits, `npm.cmd run lint` and `npm.cmd run build` passed. Initial `npm run lint` was blocked by PowerShell policy for `npm.ps1`; `npm.cmd` resolved invocation without changing system policy.

Final `npm.cmd run lint`: passed, exit 0, no warnings/errors reported. Final `npm.cmd run build`: passed, exit 0; compilation, TypeScript, and all 11 static-page generation tasks completed. Public page routes remain prerendered; `/api/contact` remains a dynamic server route. No baseline lint/build errors were found and none were introduced.

Production-server HTTP smoke checks at `127.0.0.1:3137` returned 200 for `/`, `/projects`, `/resume`, `/contact`, `/robots.txt`, `/sitemap.xml`, and `/opengraph-image` (PNG). Checks against rendered HTML confirmed the approved introduction exactly after whitespace normalization, in reading order; removed claims are absent. The corrected CSS Frosting link is present. The resume link served `application/pdf` with a PDF signature and SHA-256 identical to the selected original. Contact was checked with GET only; no messages, payments, or AI requests were sent.

Post-edit SHA-256 comparison against the initial manifest confirms only the listed pre-existing files changed. `package.json`, `package-lock.json`, shared CSS, Navbar, GlassCard, BackgroundOrbs, contact/API, and configuration files remained byte-identical. React review found no added Client Component boundary, hooks, dependencies, or event logic; existing keyboard/focus/reduced-motion code is preserved.

Browser visual and interactive verification could not run: UI tool inventory reported "The browser access host is unavailable" and no browsers. Consequently, desktop/mobile layout, menu interactions, keyboard traversal, and animation behavior are not claimed as runtime-verified. Their implementation was preserved, and lint/build/HTTP checks passed; these checks are not a substitute for a browser review.
