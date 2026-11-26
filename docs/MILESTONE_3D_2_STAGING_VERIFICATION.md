# Milestone 3D.2: Netlify Forms Staging Verification

Reviewed on 2026-11-26 in `C:\Dev\Portfolio`, on `main`.

## Checkpoint scope and preservation

The owner authorized a reviewed checkpoint and push to `origin/main` only. Initial `main` was `2ee71294a80407afd1310cf48deed0ba0b77d13b`, one production merge commit ahead of `origin/main` (`4108337fc36c37f929964ce155db1f8e922707bd`). A fresh fetch confirmed this history and no divergence. Local `master` remains `0da2e282313a890f4d17c3a2b9fbd0b4a3c0af91`; remote `master` is `2ee71294a80407afd1310cf48deed0ba0b77d13b`.

Preserved all nine existing changed/untracked files: the 3C.1 staging report, 3D.1 implementation/report/tests/static definition, and 3D.1A Contact composition/report. No existing application file was edited during 3D.2. Added only `netlify.toml` and this record. No other page, global style, content dataset, asset, dependency, lockfile, or approved contact composition was changed.

## Integration and configuration review

- `public/__forms.html` contains a hidden static `portfolio-contact` form with `method="POST"`, `data-netlify="true"`, and `netlify-honeypot="bot-field"`.
- Static definition, rendered form, and AJAX body agree on `form-name`, `name`, `email`, `message`, and `bot-field`. Identity is `form-name=portfolio-contact`; the email field has type `email`.
- Submission is a same-origin, URL-encoded AJAX POST to `/__forms.html`. The client checks HTTP failure and redirected responses, retains failed input, uses a timeout and synchronous duplicate lock, and distinguishes acceptance from inbox delivery.
- `/api/contact` remains an unconditional HTTP 410 tombstone with no delivery capability. FormSubmit remains retired.
- This matches the current [OpenNext Forms guide](https://opennext.js.org/netlify/forms) and [Netlify Forms setup](https://docs.netlify.com/manage/forms/setup/), reviewed on this date. A localhost Next.js error is not evidence of hosted processing or delivery failure.
- `netlify.toml` sets the public presentation flag to `false` by default and overrides it to `true` only in `[context.main.environment]`. This is a public build-time switch, not a secret or runtime delivery credential. No hosted environment variable was edited. Site-level environment inspection returned an empty list.
- Reviewed context precedence in [Netlify file-based configuration](https://docs.netlify.com/build/configure-builds/file-based-configuration/). The official `netlify.schema.json` confirms the context and environment object/string types used here.

Authenticated Netlify project inspection independently confirmed `forms=enabled`, zero registered forms, and team SSO required for `non_production`. The production deploy before this work is `6af5e5e9fee75cf19ffa3865`, `ready`, `master` / `production`, exact commit `2ee71294a80407afd1310cf48deed0ba0b77d13b`.

The connector does not expose configured build branches. The official CLI's read-only site lookup returned Unauthorized, and browser inventory reported its access host unavailable. The owner explicitly confirmed the current settings in this session: production branch is `master`, and `main` branch deploys are enabled. This clears the repository's pre-push configuration gate without changing any external setting.

## Fresh local verification

| Check | Result |
| --- | --- |
| `npm.cmd run lint` | Passed. |
| `npx.cmd tsc --noEmit` | Passed, including after both builds. |
| `node --test tests/*.test.mjs` | 56 passed, 0 failed. All submission requests mocked. |
| Enabled production build | Passed, Next.js 16.4.5/Turbopack, `CONTEXT=branch-deploy`, public flag `true`, legacy delivery `false`. Named form and all five fields present in generated contact HTML. |
| Disabled production build | Passed, `CONTEXT=production`, public flag `false`, legacy delivery `false`. Generated contact HTML has no form and retains direct email. This is the final local build artifact. |
| Whitespace | Working diff passed; final staged and committed checks required before push. |
| Content/secrets review | Reviewed implementation, current tests, all reports, static definition, and minimal configuration; no credentials or unintended source material found. Generated/local files remain excluded. |
| Browser/hosted interaction | Not performed; no browser acceptance or real submission claimed. |

Installed Next.js environment-variable and public-folder guides were read. Public flags are compiled into client bundles, and the static public definition is referenced from the site root. No code changes were needed to the reviewed Forms integration.

## Staging outcome

Checkpoint commit, exact-SHA branch-deploy result, form registration, and final production-preservation checks will be recorded after the authorized push. This record's post-deploy update will remain local to preserve the deployed candidate SHA.

Stop after staging registration verification. The owner must perform the single legitimate submission, verify Netlify storage/spam classification, configure or verify submission notifications, and confirm receipt in Gmail. Production presentation stays disabled; no release, bypass of SSO, automatic real message, or legacy relay activation is authorized.
