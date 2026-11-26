# Milestone 3C.1: Staging release candidate and acceptance

> Configuration update (2026-11-26): This is a historical milestone record. Its unset-means-disabled presentation instructions and old relay procedures are superseded by [the contact default-state fix](CONTACT_DEFAULT_STATE_FIX.md). Unset or exact `true` now shows the Netlify form; `false` and all other explicit values disable it. Production requires verified delivery and owner approval to enable, or explicit `NEXT_PUBLIC_CONTACT_FORM_ENABLED=false` in Netlify's production build context. `/api/contact` remains retired; do not follow historical FormSubmit activation steps.

Reviewed on 2026-11-12 in `C:\Dev\Portfolio`, on `main`.

**Status: Staging checkpoint completed. Netlify reports the exact pushed release-candidate SHA ready on `main` in `branch-deploy` context. Authenticated hosted acceptance remains pending owner review.**

Read `AGENTS.md`, `MILESTONE_3B_5_RELEASE_READINESS.md`, and `DEPLOYMENT_WORKFLOW.md`. The earlier attempt stopped without a commit or push because Netlify configuration was unverified. The owner has now verified the configuration and explicitly authorized this staging deployment. This report supersedes the earlier blocked status. Historical 3B.4/3B.5 statements retain their original review context.

## 1. Authorization and deployment configuration

The owner verified:

- Project `saifkhans`, repository `iamsaifkhan25/Portfolio`.
- Production branch `master`; pre-production branch `main` with a prior successful `branch-deploy` deployment.
- Netlify team SSO protects staging and explains the earlier HTTP 401 response.
- `NEXT_PUBLIC_CONTACT_FORM_ENABLED` and `CONTACT_DELIVERY_ENABLED` are absent at site and team level. Preserve their disabled defaults.

Read-only connected Netlify inspection independently confirmed project ID `17195066-3fe2-4b06-9c06-515353658398`, team SSO required for `non_production`, and prior ready `main` branch deploy `6af5c8411a3c70d32218047b` in `branch-deploy` context at SHA `36bc0a1317eab78a3ee9a3ae34b80e8cdbe1a33e`. Before this checkpoint, the published production deploy was `6af5c667016e494f42077644`, `master`, `production`, SHA `0da2e282313a890f4d17c3a2b9fbd0b4a3c0af91`. Branch configuration and absent environment settings are owner-verified; no external setting was changed or environment value exposed.

## 2. Git state and candidate scope

`git fetch origin` completed successfully. Local `main` and fetched `origin/main` both pointed to `36bc0a1317eab78a3ee9a3ae34b80e8cdbe1a33e`, zero commits ahead/behind. Local `master` and fetched `origin/master` both pointed to `0da2e282313a890f4d17c3a2b9fbd0b4a3c0af91`. `main` has three existing commits beyond `master`, with no unique production commits. No branch switch, merge, conflict, or divergence occurred. The initial index was empty.

Reviewed all ten modified tracked files and all eight untracked files, including complete new-file text:

| Scope | Paths |
| --- | --- |
| Resume and Contact refinement | `src/app/contact/page.tsx`, `src/app/contact/page.module.css`, `src/app/resume/page.tsx`, `src/app/resume/page.module.css` |
| Domain, route metadata, and indexing | `src/app/layout.tsx`, `src/app/contact/layout.tsx`, `src/app/opengraph-image.tsx`, `src/app/projects/page.tsx`, `src/app/robots.ts`, `src/app/sitemap.ts`, `src/lib/site.ts` |
| Disabled contact API and regression coverage | `src/app/api/contact/route.ts`, `src/lib/contact.ts`, `tests/contact.test.mjs`, `tests/site.test.mjs` |
| Milestone documentation | `docs/MILESTONE_3B_4_RESUME_CONTACT_REFINEMENT.md`, `docs/MILESTONE_3B_5_RELEASE_READINESS.md`, `docs/MILESTONE_3C_1_STAGING_ACCEPTANCE.md` |

No unrelated change, new private source material, unintended file, or confirmed incomplete implementation was identified. A scoped scan of the 18 paths found no selected private-key markers, common provider/GitHub/AWS token formats, or quoted credential assignments, and no selected sensitive/generated/binary filenames. No root `.env*` files were found. This is a scoped text review, not an exhaustive secret scan or history/binary audit.

`public`, `Sources`, `src/data`, `package.json`, and `package-lock.json` have no diff from fetched `origin/main`. The existing project content, design implementation, assets, dependencies, and tests were not edited during this resumed task. Only this report was revised. PDF SHA-256 remains `AB7027A0987C00E69E80FF5D505AAF4211BBE7E72EAEC677F950C98D1CB7AB3A`. Generated Next/TypeScript output remains ignored.

Staged only the explicit 18 reviewed paths, inspected the staged paths and diff, confirmed the index matched the reviewed working files, and passed `git diff --cached --check`. Created commit `4108337fc36c37f929964ce155db1f8e922707bd` on `main` with message `chore: prepare Personal Studio Journal staging release`, without a skip marker. Pushed only `main:refs/heads/main` to `origin`. The first push waited at Git Credential Manager's account-selection dialog and was interrupted before any ref changed; the successful retry used the existing authenticated GitHub CLI helper through command-local `-c` options. No Git credential configuration was changed or credential value read.

After the push, `git ls-remote --heads origin main master` confirmed remote `main` exactly equals the release-candidate SHA and remote `master` remains `0da2e282313a890f4d17c3a2b9fbd0b4a3c0af91`. Local `main`/`origin/main` match the candidate; local `master`/`origin/master` retain the production SHA. The working tree was clean and index empty before adding this post-deploy evidence. No production release was created.

## 3. Fresh local checks

| Check | Result and boundary |
| --- | --- |
| `npm.cmd run lint` | Passed, exit 0. |
| `npx.cmd tsc --noEmit` | Passed, exit 0, after the build. |
| `npm.cmd run build` | Passed, exit 0, Next.js 16.4.5/Turbopack. Child-process settings: `CONTEXT=production`, `NEXT_PUBLIC_CONTACT_FORM_ENABLED=false`, `CONTACT_DELIVERY_ENABLED=false`. Four content pages prerender; contact API remains dynamic. |
| `node --test tests/*.test.mjs` | **95 passed, 0 failed:** 90 contact cases and five site/context cases. All provider calls mocked; no emails or activation requests. Isolated enabled-path test setup restores settings afterward. |
| `git diff --check`, `git diff --cached --check`, and `git diff HEAD^ HEAD --check` | Passed, including the final staged candidate and committed diff. LF/CRLF notices are not failures. |
| Source/assets/dependencies preservation | Protected paths have no diff against fetched `origin/main`; unchanged PDF hash confirmed. |

No aggregate `npm test` script exists; both existing test files were included. No tests or dependencies were added. These are local automated results, not hosted/browser acceptance. Prior artifact/HTTP/audit results in 3B.5 remain historical and were not rerun here.

## 4. New staging deployment evidence

Verified through the connected Netlify service on 2026-11-12, with final project inspection at approximately 15:40:55 UTC (21:10:55 IST). `open-deployments` identified the newly triggered deployment; site-scoped `get-deploy-for-site` confirmed its exact revision and final state. `get-project` confirmed the published production deploy and SSO protection remained unchanged.

| Evidence | Observed value |
| --- | --- |
| Project | `saifkhans` (`17195066-3fe2-4b06-9c06-515353658398`) |
| Deploy ID | `6af5ddc231b6df842cf2ee75` |
| Branch | `main` |
| Build context | `branch-deploy` |
| Status | `ready` |
| Plugin state / deploy error | `success` / `null` |
| Exact deployed `commit_ref` | `4108337fc36c37f929964ce155db1f8e922707bd` |
| Commit | [Release candidate on GitHub](https://github.com/iamsaifkhan25/Portfolio/commit/4108337fc36c37f929964ce155db1f8e922707bd) |
| Protected staging URL | [main branch deployment](https://main--saifkhans.netlify.app/) |
| Immutable deploy permalink | [This candidate deployment](https://6af5ddc231b6df842cf2ee75--saifkhans.netlify.app/) |
| Deploy details | [Netlify deployment record](https://app.netlify.com/sites/17195066-3fe2-4b06-9c06-515353658398/deploys/6af5ddc231b6df842cf2ee75) |
| Created / last updated | `2026-11-12T15:39:46.370Z` / `2026-11-12T15:40:24.238Z` |
| Reported deploy time | 27 seconds |
| Trigger / framework | Git-triggered (`manual_deploy=false`) / `next` |
| Production deploy after staging completion | Unchanged: `6af5c667016e494f42077644`, `ready`; previously verified `master`, `production`, SHA `0da2e282313a890f4d17c3a2b9fbd0b4a3c0af91` |
| Visitor protection after staging completion | Team SSO required for `non_production`; unchanged. |

The remote pushed SHA and Netlify `commit_ref` match exactly. No deployment discrepancy was observed. A branch deploy's `published_at` is `null`; the successful result is its explicit `ready` state, branch/context, URLs, exact SHA, and plugin success, not a production-publication claim.

This post-deploy evidence update is intentionally left as the sole unstaged local change for owner review. The deployed RC already includes the reviewed implementation, tests, prior milestone documentation, and the pre-deploy version of this report. No second commit, amend, or push was made after deployment verification; the tested/deployed SHA remains fixed.

## 5. Pending authenticated acceptance

**Hosted candidate pages, API behavior, visual/keyboard/mobile checks, and Lighthouse remain pending owner review through normal SSO.** No authentication bypass, real email submission, production action, or browser acceptance is authorized by this checkpoint. The connected service can verify deployment metadata without accessing protected page content.

For each acceptance item, record SHA, deploy ID, URL, date, browser/version, viewport/device, result, and any issue. The checklist below is retained for owner review; it is not claimed as executed in this task.

- [ ] Load `/`, `/projects`, `/resume`, and `/contact` directly and through navigation; verify expected content, no missing CSS/fonts/images, no runtime/console errors, and correct current-page navigation.
- [ ] Inspect deployed HTML for `noindex, nofollow` on all four staging pages. Verify each canonical points to the corresponding route at `https://saifkhans.netlify.app`, including the homepage canonical without a route suffix. Check Open Graph URLs/images, `/robots.txt`, `/sitemap.xml`, and `/opengraph-image`. Preview robots should omit the sitemap advertisement; sitemap URLs should remain production URLs.
- [ ] Confirm all project images load, full-resolution image links work, static CSS/JS/font requests succeed, and the social image renders. Download the Resume PDF, verify the filename `Saif Khan Resume.pdf`, and open the file successfully.
- [ ] Confirm Contact shows the disabled-form explanation, visible/copyable email address, and email action with `mailto:iamsaifkhan25@gmail.com`; no form or inputs. Check its telephone link. Opening handlers does not require sending an email or placing a call.
- [ ] Confirm the two hosted switches remain unset/false. Only after the exact candidate is confirmed, send a small malformed JSON request to `/api/contact` and expect HTTP 503, `CONTACT_DISABLED`, and `Cache-Control: no-store`. Do not submit a real message, enable either switch, or activate FormSubmit. Example from PowerShell: `curl.exe -i -X POST 'https://main--saifkhans.netlify.app/api/contact' -H 'Content-Type: application/json' --data-binary '{'`.
- [ ] On Home, open Open Study Deck by pointer, Enter, and Space. Confirm its reading panel, close with X and Escape, and repeat after scrolling down the panel. Check focus returns to its trigger and the homepage scroll position is restored.
- [ ] On Projects, repeat opening, X closing, and Escape closing for all five capsules: Open Study Deck, CSS Frosting, HackerRank Orchestrate 2026, Game of No Lore, and EchoScape Labs. Check panel reading, screenshots/links, rapid/repeated activation, correct content, and no stuck transitions.
- [ ] While each dialog is open, verify initial focus, visible focus, Tab/Shift+Tab containment, background scroll lock, and keyboard access to its content/links. After closing, verify focus, page position, and horizontal project-row position restore. Include resizing while open and a short landscape viewport.
- [ ] On a touch device, swipe the mobile project row in both directions; verify horizontal scrolling/snap, no accidental dialog opening, preserved offset after closing, and usable remaining groups. Check row Arrow/Home/End controls with a keyboard.
- [ ] Check desktop navigation and the mobile menu: open/close, route activation, Escape/outside dismissal, keyboard order, visible focus, and behavior across the 48rem breakpoint.
- [ ] Review 320, 360, 390, 430, 768, 1024, and 1440px widths; test either side of layout breakpoints, short landscape, safe areas, enlarged text, and 200%/400% zoom. Check wrapping, clipping, reading width, reachable close/menu actions, and unintended horizontal overflow.
- [ ] Enable reduced motion before loading, repeat dialog interactions, and toggle the preference while a transition runs. Confirm motion settles correctly and focus/scroll behavior remains usable.
- [ ] Complete keyboard-only navigation through all four routes and dialogs, including skip link and PDF action. Check accessible names/headings and screen-reader announcements where available.
- [ ] Run supported Lighthouse mobile and desktop performance/accessibility audits on the authenticated candidate. Record tool/version, throttling, scores, LCP/CLS and other measured results with limitations. Record manual interaction responsiveness separately. If tooling cannot access the protected site, leave these results pending.

## 6. Remaining risks and review boundary

- Authenticated routes, assets/PDF, noindex/canonicals, disabled fallback/API behavior, browser interactions, accessibility, and performance still require owner acceptance.
- 3B.5 records eight moderate development dependency findings and zero production-only findings at that earlier audit. No dependency change or fresh audit occurred here; owner disposition remains pending.
- Delivery remains unverified and disabled. The abuse/body-control work recorded in 3B.5 is required before any future public delivery activation; it is outside this checkpoint.

Stop after verifying the staging checkpoint and recording evidence for owner review. Do not modify, merge, or push `master`, create a production release, change contact flags, send email, change external settings, or bypass staging authentication. Production approval remains withheld.
