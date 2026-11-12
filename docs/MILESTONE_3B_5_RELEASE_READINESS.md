# Milestone 3B.5: Final quality assurance and release readiness

Reviewed on 2026-11-12 in `C:\Dev\Portfolio`, on `main`.

## 1. Executive quality assessment

**Recommendation: Ready for staging review. Not ready for production approval.**

Lint, TypeScript, production and branch-deploy builds, 90 contact tests, five metadata tests, local production HTTP checks, and image/PDF integrity checks pass. Confirmed repairs address the callable contact relay while the form is disabled, incorrect production-domain metadata, missing route-specific metadata/canonicals, and staging indexing exposure. No redesign or approved page-copy changes were made.

Production approval still requires real browser acceptance, authenticated staging review, verification of Netlify's production branch and deploy context, and explicit owner release approval. The general design approval does not authorize a release. FormSubmit delivery remains unverified; both public presentation and server delivery default to disabled.

Read `AGENTS.md`, `DEPLOYMENT_WORKFLOW.md`, and the 3B.0, 3B.1, 3B.2, 3B.2B, 3B.3, 3B.3A, and 3B.4 reports. Consulted installed Next.js 16.4.5 metadata, route-handler, environment-variable, robots, font, and image documentation. Applied the React review checklist to the changed server metadata boundaries and preserved client components.

Starting work already included modified Contact and Resume pages plus their untracked CSS modules and the 3B.4 report. Those changes were preserved. An initial SHA-256 snapshot covered 85 files under `src`, `public`, `Sources`, `tests`, and `docs`. The existing Contact page, both new CSS modules, and 3B.4 report remain byte-identical to that snapshot. Resume's existing body matches the snapshot after removing only this milestone's metadata addition.

## 2. Confirmed defects

Using the requested categories: Critical identifies security/data-loss risk; High identifies broken essential functionality; Medium covers accessibility, responsiveness, performance, and metadata issues; Low is minor polish. SEC-01 is the confirmed security risk and is repaired for the default configuration. Dependency findings retain npm's own moderate severity and development-only scope; no exploited vulnerability or data loss was observed.

| ID | Severity | Confirmed finding | Disposition |
| --- | --- | --- | --- |
| SEC-01 | Critical (security risk) | Hiding the form did not disable `POST /api/contact`. Valid direct requests still reached FormSubmit, with no application rate limit or authentication. This exposed a relay for unwanted submissions even during the disabled-form period. | Repaired for the default deployment: separate server opt-in checked before body parsing, provider access, or logging. Further protection is required before public delivery is enabled. No abuse campaign or delivered spam was observed or simulated. |
| SEO-01 | Medium | Root metadata, robots, sitemap, and the generated social image used `iamsaifkhan.com`, rather than the verified production domain. | Repaired to `https://saifkhans.netlify.app`. |
| SEO-02 | Medium | Projects, Resume, and Contact inherited the homepage title/description and had no route-specific canonical. | Added route metadata and canonical URLs. Approved visible content retained. |
| SEO-03 | Medium | Index/follow was unconditional, including branch builds. Netlify's latest branch deploy does not automatically receive its preview no-index header. | Added build-context preview no-index metadata, with production indexing retained. This is indexing guidance, not access control. |
| DEP-01 | Medium | Full npm audit reports eight moderate development-package findings linked to one minimatch advisory. | Documented; dependency manifests and lockfile unchanged. Production-only audit reports zero findings. |

No additional broken essential local route, missing screenshot, or missing PDF was confirmed. Unavailable browser tests are unresolved acceptance work, not passing results or proof of defects.

## 3. Repairs performed

- `src/app/api/contact/route.ts` now requires exact `CONTACT_DELIVERY_ENABLED=true` before reading the body or calling FormSubmit. Unset and every other value return HTTP 503, `{ success: false, code: "CONTACT_DISABLED", error: ... }`, with `Cache-Control: no-store`. Disabled requests produce no application delivery log. Provider, recipient, enabled-path validation, redirects, deadlines, diagnostics, and acceptance rules remain unchanged.
- `src/lib/contact.ts` supplies the safe disabled-state message. Six new tests prove that unset, `false`, `TRUE`, `1`, empty, and unknown switch values neither parse input nor fetch/log. The original 84 cases still run with delivery explicitly enabled and all external calls mocked. Tests restore the process environment after each case.
- `src/lib/site.ts` centralizes the verified domain, route metadata, social-image references, and Netlify preview-context detection. Root layout, robots, sitemap, Projects, and Resume use it. A server-only Contact layout supplies metadata without changing the preserved client page or adding DOM wrappers.
- The generated 1200 x 630 social image displays the verified domain and exports alternative text. Route metadata explicitly retains the shared Open Graph/Twitter image because child metadata replaces nested parent fields. Final generated HTML verifies these references on all four pages. The rendered social PNG was inspected directly and its text fits; this is artifact inspection, not browser QA.
- With build-time `CONTEXT=branch-deploy` or `deploy-preview`, root robots metadata becomes `noindex, nofollow`; preview robots.txt omits its sitemap advertisement while allowing crawlers to read the no-index directive. Production and ordinary local builds retain `index, follow` and the production sitemap. No account or deployment setting changed.
- Added `tests/site.test.mjs`: five context cases check production-domain URLs, route/social metadata, robots advertisement, and sitemap destinations. No test dependencies were added.

These changes do not alter capsule code, its 420ms duration, grouping, responsive geometry, or approved visual design.

## 4. Remaining risks and functional assessment

| Area | Evidence obtained | Remaining acceptance work |
| --- | --- | --- |
| Navigation | Four intended destinations present; all four local routes return 200. Source retains disclosure state, inert closed drawer, current-page semantics, Escape/outside dismissal, and matching 48rem CSS/JS breakpoint. | Actual desktop/mobile activation, keyboard order, dismissal, and resize focus transfer. |
| Homepage expansion | HTML contains one Open Study Deck dialog trigger; source uses the shared dialog and leaves the URL unchanged. | Pointer/Enter/Space activation and return to the homepage position. |
| Five capsules | HTML contains five triggers in approved desktop order. All five actual dialog components server-render with title associations, close labels, statuses, and 26 story paragraphs. | Opening, X/Escape closing, repeated/rapid use, and short-viewport reading. Server rendering does not run effects. |
| Focus and scrolling | Source retains native `showModal`, initial close focus, Tab containment, background scroll lock, style cleanup, page position and horizontal-row restoration. | Native focus containment/restoration, deep scroll close, disconnected/offscreen triggers, resize while open, and restoration after mobile regrouping. |
| Mobile project row | Source retains status groups, native overflow/snap, Arrow/Home/End controls, and the pointer movement/cancel/scroll guard. | Actual touch swipes, no accidental opening, keyboard scrolling, and preserved row offset. |
| Screenshots | All 14 full-resolution destinations return nonempty images; hashes and dimensions match provenance. Dialog markup retains full-resolution links. | Actual lazy loading, intentional thumbnail crops, and new-tab interaction. |
| External links | Open Study Deck, CSS Frosting, all four linked source repositories, and the GitHub profile return 200 by read-only HTTP. | Human navigation where required; LinkedIn returned 999, so its reachability is unverified rather than declared broken. |
| Resume PDF | HTTP 200 with PDF content type; unchanged 2,132,119-byte file and SHA-256. Download destination retained. | Browser download filename, PDF viewer opening, and device behavior. |
| Email/telephone | Expected mailto/tel destinations present in local HTML; visible, wrapping contact values retained. | OS email/telephone application handling and copy behavior. |
| Contact fallback/errors | Default HTML contains fallback and no form. Local valid and malformed POSTs return disabled 503. Enabled backend/browser-helper outcomes are mocked. Source retains native constraints, sending state, draft retention on error, reset only on acceptance, and polite status. | Enabled-form DOM interactions, native validation, duplicate-submit behavior, announcements, and owner-controlled staging delivery verification. |

Live production returned 200. The expected staging URL, `https://main--saifkhans.netlify.app/`, returned 401. Its deployed revision, protected content, runtime, and metadata could not be inspected. These results do not establish Netlify's branch settings or successful staging acceptance.

Before enabling public delivery, choose reviewed platform-level rate limiting/abuse controls and a bounded request-body strategy. The enabled handler currently parses JSON before checking field sizes, has no application origin/content-type gate, and has no distributed rate limit. Browser origin checks alone would not stop direct clients. The disabled switch prevents provider relay use but does not eliminate platform invocation costs. Do not add a process-local counter and describe it as serverless-wide protection.

No provider migration, CAPTCHA bypass, real message, activation request, or retry campaign was performed. Delivery can remain disabled for the portfolio release because direct email is the approved fallback.

## 5. Accessibility and responsive assessment

**Source and markup assessment only; no WCAG conformance or browser pass claimed.**

| Width/scenario | Source safeguards assessed | Actual browser status |
| --- | --- | --- |
| 320, 360, 390, 430px | Single-column pages; wrapped actions/contact values; zero-minimum grid tracks; natural image ratios; intentional live-project scroller. | All pending. |
| 768px | Shared navigation/resume breakpoint; Projects changes at 768px independently; two-column project collection. | Pending, including just below/above the boundary. |
| 1024px | Homepage and Contact split layouts; bounded reading measures and wrapping metadata. | Pending. |
| 1440px | Shared 1024px maximum page width and bounded full-screen reading content. | Pending. |
| 200%/400% zoom and enlarged text | Rem-based sizes, wrapping links/grid tracks, no fixed reading-panel height. | Pending; global `overflow-x: hidden` can conceal overflow and is not proof of fit. |
| Short landscape/safe areas | Dialog uses dynamic viewport height, safe-area close positioning, bottom padding, and mobile reading gutters. Shell uses the default viewport. | Pending on an actual mobile browser/device. |

One `h1` appears in each page's local HTML. Source retains the skip link, labelled sections, visible global focus outlines, modal title association, inert transition snapshot, named screenshot/external links, textual statuses, and meaningful image alternatives. Principal actions/inputs/close/menu controls are 48px; footer links are at least 44px. Inline prose links retain normal text geometry and require actual spacing/target review.

Reduced-motion CSS shortens transitions; the dialog's JavaScript skips animations and finishes running ones when the preference changes. No motion code was edited. Actual preference toggling, no-Web-Animations fallback, focus-ring clipping, touch geometry, screen-reader announcements, and keyboard-only completion remain pending.

Recalculated token contrast from current CSS: primary/reading 16.27:1, body/reading 12.13:1, muted/reading 8.05:1, muted/raised 7.57:1, accent/reading 9.13:1, primary/action 7.06:1, control-boundary/raised 3.51:1. These selected opaque pairs meet their 4.5:1 normal-text or 3:1 control targets. They do not measure every composited glass, hover, disabled, caption, or rendered focus state.

## 6. Performance results

Production build: Next.js 16.4.5/Turbopack succeeds, generating 11 static build entries. `/`, `/projects`, `/resume`, `/contact`, robots, sitemap, and social image are static; `/api/contact` remains dynamic. The build's entry count includes framework-generated entries, not 11 public content pages.

Measured on the final local production output:

| Route | HTML bytes | Referenced script files | JavaScript file bytes | Sum of individually gzipped script bytes |
| --- | ---: | ---: | ---: | ---: |
| `/` | 31,425 | 10 | 613,179 | 190,754 |
| `/projects` | 55,055 | 10 | 617,109 | 192,237 |
| `/resume` | 26,083 | 8 | 583,756 | 180,489 |
| `/contact` | 16,697 | 9 | 586,476 | 181,439 |

Scripts are deduplicated within each route. These are on-disk bytes of HTML-referenced scripts, including shared framework/runtime and compatibility code; gzip is computed locally. They are not observed browser transfers, parsed/executed JS, cold-cache load costs, Brotli sizes, or cross-route totals. Shared files should not be added repeatedly to estimate a session. No bundle analyzer or browser coverage trace was available. The largest emitted JS chunk is 229,052 bytes (71,681 gzip); attribution beyond the inspected dependency/source boundaries needs a proper analyzer.

Only Next, React/React DOM, and Lucide are direct runtime dependencies. No chart, 3D, general animation, analytics, or provider SDK was added. Homepage and Projects share the dialog; case-study data crosses the existing client boundary, explaining some application payload. Lazy-loading that content would be a later measured optimization with loading/focus implications, not an automatic refactor here.

The 14 genuine WebPs total 1,195,800 bytes. The largest is `ghost-data/output-csv.webp`, 396,322 bytes at 1600 x 618, followed by December event context at 147,648 bytes and unresolved CSV at 104,680 bytes. The homepage cover is 55,888 bytes. Images retain intrinsic dimensions, responsive `sizes`, eager homepage/leading capsule covers, and lazy supporting galleries. A local optimized-image request returned a valid 640px image. No image/PDF recompression was performed.

`next/font` self-hosts Jakarta. Four WOFF2 assets total 58,968 bytes; each tested page has one font preload. System serif/monospace stacks add no font request. No third-party runtime request is apparent from active source except deliberately activated project/social links and the opt-in server contact call. Link prefetches, cache reuse, and browser network waterfalls were not observed.

The existing 420ms dialog animates transforms/opacity plus clip/radius geometry, with one inert preview snapshot. Clip/radius changes may paint; frame rate and main-thread cost are unmeasured. Static ambience avoids continuous animation. Meaningful content and animations were retained.

Lighthouse, axe-in-browser, Core Web Vitals, CPU/memory, actual request counts, LCP/INP/CLS, and mobile frame-rate measurements were unavailable. No synthetic score, estimated Web Vital, or device-performance claim is supplied.

## 7. Security findings

- `npm.cmd audit --json`: exit 1, **8 moderate, 0 high, 0 critical**. These are affected-package findings through `eslint-config-next` / `typescript-eslint`, rooted in minimatch glob-pattern resource amplification, [GHSA-g3hv-75wg-m249](https://github.com/advisories/GHSA-g3hv-75wg-m249). They are not eight distinct runtime exploits. The advisory lists minimatch 11.0.1 as patched; select a compatible lint-tool dependency update in a separate reviewed change, rerun checks, and avoid a forced override or breaking upgrade.
- `npm.cmd audit --omit=dev --json`: exit 0, **0 reported vulnerabilities**. This is registry evidence on the review date, not a security guarantee. The initial restricted-network audit failed; the permitted registry retry succeeded. No package installation/update occurred.
- Scanned 61 tracked/untracked source/config/document text files for selected private-key/API-token/credential patterns: no matches. No root `.env*` files or selected sensitive credential filenames were found. No environment values were printed. This was not a full Git-history, binary, screenshot OCR, or exhaustive secret scan. Existing original PNGs under `Sources` were already tracked and were preserved; no new private source material was added.
- The only `NEXT_PUBLIC_*` application read is the non-secret form-presentation flag. Server delivery opt-in is not exposed through a public environment variable. No `env` export exists in Next config. Both switches must remain unset/false for ordinary staging/production review.
- Existing enabled validation checks string types, trimming, required values, 100/254/5000-character caps, email shape, and name newline/NUL injection. The route forwards only approved fields and constructs its subject/deployment contact URL server-side. It does not render arbitrary provider responses as HTML.
- Provider requests retain 15-second abort, no-store, and manual redirect handling; the browser helper retains 20 seconds. Ambiguous/HTML/redirect/non-2xx outcomes fail safely. Logs omit message, sender data, raw bodies, exceptions, query strings, and sensitive URL path segments. Disabled calls avoid delivery-log flooding.
- Active new-tab links retain `noopener noreferrer`. Local `.git`, `.env`, docs, and a `Sources` path return 404. This confirms local serving boundaries only; it is not a hosted penetration test.
- Next config has no custom security-header policy or repository Netlify configuration. Hosted CSP, framing/referrer policy, HTTPS behavior, function limits, build/runtime environment scopes, adapter/runtime versions, and account protections remain deployment-review items. A restrictive CSP requires a separately tested Next-compatible policy; none was silently imposed.

## 8. SEO and evidence preservation

Final local HTML verifies unique Home/Projects/Resume/Contact titles, descriptions, production-domain canonicals and Open Graph URLs, social-image dimensions/alternative text, and Twitter images. Production robots advertises the correct sitemap; sitemap has exactly four production URLs. Social image HTTP returns PNG at 1200 x 630. No unsupported title, credential, employment outcome, or project result was added.

Preview and production builds were tested separately. All four branch-build pages emit noindex/nofollow; final production HTML emits index/follow. Deploy-preview behavior is also covered by the context tests. These are build-time decisions: rebuilding in the correct Netlify context is required, and promoting preview artifacts directly is not the release procedure. Canonicals and preview no-index metadata are not authentication. Netlify documents that the latest branch deploy can otherwise be indexed: [branch deploys](https://docs.netlify.com/deploy/deploy-types/branch-deploys/), [deploy contexts and indexing](https://docs.netlify.com/deploy/deploy-overview/).

All project data, story renderers, navigation, homepage writing, AI disclosures, capsule/swipe controller/style files, source PNGs, public WebPs, provenance manifest, and PDF match the initial snapshot. Five dialog server renders verified 26 unchanged story paragraphs, status labels, and all 14 screenshot destinations/alternatives. The ordered desktop list remains Open Study Deck, CSS Frosting, HackerRank Orchestrate 2026, Game of No Lore, EchoScape Labs; mobile status grouping is unchanged.

HackerRank retains 518 processed requests, 44 unresolved validation cases, failed-contract/non-production limits, and no live deletion. Its December image remains explicitly titled/captioned as later-edition context. Game of No Lore remains an early prototype with planned broader scope. EchoScape remains on hold. The AI-assisted-development disclosure remains intact.

Resume PDF SHA-256: `AB7027A0987C00E69E80FF5D505AAF4211BBE7E72EAEC677F950C98D1CB7AB3A`. All 14 optimized/source image pairs match the provenance manifest's SHA-256 and dimensions. No genuine asset bytes changed.

## 9. Test evidence and limitations

| Check | Result and boundary |
| --- | --- |
| `npm.cmd run lint` | Passed after final code changes. |
| `npx.cmd tsc --noEmit` | Passed after final production build. |
| `npm.cmd run build` | Passed for production and branch-deploy contexts; final artifact is production context with form/delivery disabled. |
| `npm.cmd run test:contact` | Original 84 cases passed before repairs; expanded suite passed all 90 cases both standalone and in the final combined run. All provider/browser-helper fetches mocked. |
| `node --test tests/contact.test.mjs tests/site.test.mjs` | **95 passed, 0 failed** after final code changes. No real messages. |
| Local production HTTP | Four pages 200, one h1 each, expected triggers, metadata, fallback links, 26 internal destinations, all 14 raw images, optimized image, PDF, robots, sitemap, social PNG. Disabled valid/malformed contact POST 503; GET 405. Sensitive/source paths 404. |
| Isolated React server rendering | Five dialogs, 26 story paragraphs, title/close semantics, statuses, image alternatives/full-resolution links. Effects, clicks, focus, animation, and scrolling do not run. |
| Preservation | Initial 85-file snapshot, manifest source/output hashes, Sharp dimensions, PDF hash, and unchanged Resume body verified. |
| External HTTP | Production/site/source links 200; staging 401; LinkedIn 999. No browser or provider-delivery success inferred. |
| `git diff --check` | Passed; ordinary LF-to-CRLF notices only. Staging area remains empty. |
| Actual browser/assistive technology | **Blocked.** Browser inventory reported `The browser access host is unavailable`. Selecting existing Firefox was stopped because browser URL-policy enforcement is unsupported for the current Windows browser. Computer Use ended there. No alternate browser-control route, rendered page screenshot, touch, focus, zoom, or screen-reader pass claimed. |

An intermediate metadata assertion caught child-route social-image inheritance loss; explicit shared-image references corrected it, and both build contexts were checked again. The generated social PNG was inspected as a local artifact. That limited visual observation does not validate page rendering.

## 10. Production release checklist

Current branch evidence, read without fetching/mutating refs:

| Ref | Local/tracking/live remote state |
| --- | --- |
| `main` / `origin/main` / remote `refs/heads/main` | `36bc0a1317eab78a3ee9a3ae34b80e8cdbe1a33e` |
| `master` / `origin/master` / remote `refs/heads/master` | `0da2e282313a890f4d17c3a2b9fbd0b4a3c0af91` |
| GitHub remote HEAD | Still `master`. No setting changed. |
| Ancestry | `main` is three commits ahead of `master`, zero behind. |

The three committed changes are `c92c8ca` (3B.0-3B.2 checkpoint with skip marker), `6b91f71` (FormSubmit repair), and `36bc0a1` (main staging-build trigger). The starting 3B.4 work and this QA milestone remain uncommitted, so that SHA does **not** identify the full reviewed working-tree candidate. No commit, push, merge, deploy, branch switch, or account-setting change was made.

Before staging acceptance:

- [ ] Owner reviews this diff, including preserved 3B.4 work, and identifies the exact future candidate revision through a separately authorized checkpoint. Review explicit staged files and exclude credentials, new private material, caches, and local output.
- [ ] Verify Netlify production branch is exactly `master`, and `main` is a separate branch deploy. Current settings were not accessible; a 401 staging response is insufficient proof. Until verified, any separately authorized checkpoint follows the workflow's `[skip netlify]` safeguard. No push is authorized by this report.
- [ ] Verify the reviewed candidate's build context, Node/Next adapter support, build command, scoped environment settings, and deployed commit. Keep both contact switches unset/false. Authenticate to the staging site through the owner's normal access flow.
- [ ] Check staging noindex in the deployed HTML/headers, correct production canonicals, all four routes/assets, and disabled contact behavior. Netlify's automatic indexing rules differ between previews and latest branch deploys.
- [ ] Complete every pending browser matrix and functional item in sections 4-5, including keyboard-only navigation, mobile swipes, all six dialog entry points, X/Escape, focus/page/row restoration, reduced motion, zoom/enlarged text, safe areas, and actual PDF/email/telephone behavior. Record browser/device and candidate revision.
- [ ] Run a supported Lighthouse/performance audit on that revision and assess real load/interaction results. Resolve any confirmed High defect before approval. Accept or separately remediate the development-only dependency finding.

Before production, only after explicit owner release approval:

- [ ] Resolve staging acceptance and record the exact approved `main` commit, current remote `master`, and last known-good Netlify deploy ID. Confirm the candidate has not changed.
- [ ] Recheck current branch ancestry, complete release diff, required tests, master protection/rulesets, and Netlify production branch. The deployment workflow's older unprotected-branch observation was not reverified here.
- [ ] Keep default email fallback and server delivery disabled. If enabling delivery is proposed later, first add reviewed abuse/body controls and perform the separately authorized controlled activation/inbox procedure in 3B.3A. Its historical one-switch testing instructions now also require the server switch; never enable it casually on a publicly reachable staging endpoint.
- [ ] Follow `DEPLOYMENT_WORKFLOW.md`: reviewed release PR from `main` to `master`, auto-merge off, merge commit only with owner release approval, and a fresh production-context build. Do not promote the no-index preview artifact.
- [ ] Verify the published branch/commit and production HTTPS, titles/canonicals, indexability, assets, disabled-contact fallback/API, navigation, and capsule interactions. Record the known-good deploy and recovery evidence.
- [ ] If rollback is needed, obtain owner authorization and use the documented known-good Netlify deploy procedure; retain Git history and integrate resulting production history back into `main`. Never force-push or reset production.

Work stops here for owner review. **Ready for staging review; production approval is withheld pending the specific checks above.**
