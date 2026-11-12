# Milestone 3C.1: Staging release candidate and acceptance

Reviewed on 2026-11-12 in `C:\Dev\Portfolio`, on `main`.

**Status: Local release-candidate checks passed. Owner-verified deployment configuration clears the earlier push gate. The authorized staging checkpoint is in progress; hosted acceptance remains pending.**

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

Only the explicit 18 reviewed paths are authorized for staging. Inspect the complete staged diff and whitespace check before committing `chore: prepare Personal Studio Journal staging release` on `main`, without a skip marker. Push only `main:refs/heads/main` to `origin`. No production release is authorized.

## 3. Fresh local checks

| Check | Result and boundary |
| --- | --- |
| `npm.cmd run lint` | Passed, exit 0. |
| `npx.cmd tsc --noEmit` | Passed, exit 0, after the build. |
| `npm.cmd run build` | Passed, exit 0, Next.js 16.4.5/Turbopack. Child-process settings: `CONTEXT=production`, `NEXT_PUBLIC_CONTACT_FORM_ENABLED=false`, `CONTACT_DELIVERY_ENABLED=false`. Four content pages prerender; contact API remains dynamic. |
| `node --test tests/*.test.mjs` | **95 passed, 0 failed:** 90 contact cases and five site/context cases. All provider calls mocked; no emails or activation requests. Isolated enabled-path test setup restores settings afterward. |
| `git diff --check` and initial `git diff --cached --check` | Passed. Initial index empty; LF/CRLF notices are not failures. Final staged check must also pass. |
| Source/assets/dependencies preservation | Protected paths have no diff against fetched `origin/main`; unchanged PDF hash confirmed. |

No aggregate `npm test` script exists; both existing test files were included. No tests or dependencies were added. These are local automated results, not hosted/browser acceptance. Prior artifact/HTTP/audit results in 3B.5 remain historical and were not rerun here.

## 4. New staging deployment evidence

Pending the authorized candidate commit and push. Record the exact pushed SHA, deploy ID, protected branch URL, immutable permalink, build context, branch, status, timestamps, and read-only evidence source here after Netlify completes. Verify `commit_ref` exactly equals the pushed SHA and that the published production deploy remains unchanged. Do not infer deployment success from the previous deployment or an authentication response.

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
