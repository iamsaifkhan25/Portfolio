# Portfolio deployment workflow

## Branch roles

| Branch | Purpose | Publish policy |
| --- | --- | --- |
| `master` | Approved production history | Netlify production must build from this branch. Every release requires explicit owner approval. |
| `main` | Pre-production integration and ongoing portfolio work | Use a separate Netlify branch deploy after its configuration is verified. |
| `feature/*` | Optional isolated development from `main` | Integrate into `main`; never release directly to `master`. |

Production URL: <https://saifkhans.netlify.app/>. Repository: <https://github.com/iamsaifkhan25/Portfolio>.

Pushing `main` is not permission to release. Future Codex tasks must never commit, merge, push, or deploy to `master` without explicit owner approval of the release scope. Do not enable automatic merges from `main` into `master`.

## Development and testing

Start by inspecting the branch, tracking information, staged changes, and untracked files:

```powershell
git status --short --branch
git branch -avv
git remote -v
git diff
git diff --cached
```

If existing work belongs to the current task, preserve it. Do not discard, blindly stash, or overwrite unrelated changes. Resolve branch divergence deliberately; stop and report conflicts or unexpected history. Never use a hard reset, force-push, or destructive cleanup.

With a clean working tree, update `main` and optionally start a feature branch:

```powershell
git fetch origin
git switch main
git merge --ff-only origin/main
git switch -c feature/short-description
```

The last command is optional. Direct integration work can remain on `main`. Before application code changes, read the relevant installed Next.js documentation specified in `AGENTS.md`.

Run checks appropriate to the change. Application changes normally need:

```powershell
npm.cmd run lint
npx.cmd tsc --noEmit
npm.cmd run build
git diff --check
```

For visual or interaction changes, also review the affected pages in a browser on desktop and mobile, including keyboard use and reduced motion. Report browser checks separately from source, type, and build checks. Preserve approved copy, project evidence, original assets, and milestone records.

Stage explicit reviewed files, then inspect `git diff --cached --name-status`, `git diff --cached`, and `git diff --cached --check` before committing. Do not stage credentials, `.env*`, private source material, `node_modules`, `.next`, local service state, or generated caches. Existing tracked reference assets are not a reason to add new private sources.

Push a feature branch with an explicit refspec, for example `git push -u origin feature/short-description:refs/heads/feature/short-description`. Open an integration PR with base `main`, review its full diff and checks, and merge into `main`. Confirm the PR base explicitly while GitHub's default branch still points to `master`.

## Pre-production

After integration, verify that the current branch is `main`, review the complete changes against production, and push only `main`:

```powershell
git branch --show-current
git log --oneline origin/master..main
git diff --stat origin/master...main
git push -u origin main:refs/heads/main
```

Ordinary pushes can trigger a Netlify build, so first verify the Netlify production branch is `master` and the `main` branch deploy is configured. Until that is verified, checkpoint commits must include `[skip netlify]`. Netlify documents that marker as suppressing Git-triggered branch and production deploys; the next push without it includes skipped changes. It is a temporary setup safeguard, not a permanent release gate. Do not manually trigger or publish a deploy as part of branch setup.

Once configured, the expected pre-production URL is `https://main--saifkhans.netlify.app/`; this address is expected, not verified as deployed. Review the exact commit, layout, interactions, assets, and relevant runtime behavior there before requesting release approval.

## Production release and safety checks

Only after explicit owner release approval:

1. Record the approved `main` commit, current remote `master` SHA, and last known-good Netlify production deploy ID.
2. Fetch current refs and verify a clean working tree, expected ancestry, and the full `origin/master...origin/main` diff. Stop if production has unexpected commits or the approved candidate changed.
3. Verify Netlify still publishes `master`, `main` remains a separate branch deploy, and GitHub protection applies to `master`. Check scoped environment settings without exposing their values.
4. Confirm lint, types, build, and relevant browser/runtime checks passed for the approved candidate. Review staged/release files for secrets and unintended assets. Resolve all pending owner review items.
5. Open a release PR with base `master` and head `main`. Explicitly confirm the target and approved scope. Keep auto-merge off. Merge only after the owner approves the release; do not reuse an old approval for new changes.
6. Use a merge commit to retain integration ancestry. A release PR title/message should not carry `[skip netlify]` when an automatic production build is intended. Verify the resulting published deploy's branch and commit, then check the production site.
7. Bring the production merge back into `main` through the normal reviewed integration process before further work. Avoid rewriting either branch's history.

Never use `git push --all`, `git push --mirror`, a forced ref update, or a local production commit as a shortcut.

## Netlify and GitHub configuration

Inspection on 2026-11-12, before branch setup:

| Setting | Observed state | Owner action |
| --- | --- | --- |
| GitHub default branch | `master`, verified through the repository API and remote HEAD | After `main` exists remotely, set Settings > General > Default branch to `main`. |
| GitHub `master` protection | Branch API reports `protected: false` | Add a rule/ruleset targeting `master`; require a PR, block force pushes and deletion, and enforce it for administrators/bypass roles where available. Require actual CI checks once configured. |
| Netlify production branch | Unverified; owner identifies `master` as production | Verify production branch is exactly `master`; correct it only with owner authorization. |
| Netlify `main` branch deploy | Unverified | Enable a branch deploy specifically for `main`. |

For GitHub protection, use Settings > Branches > Add branch protection rule (or an equivalent active ruleset). Require an approving review if a separate eligible reviewer is available; a solo owner cannot approve their own PR. Explicit owner release approval remains required regardless of GitHub's reviewer configuration. Do not require invented status checks; select existing checks after CI is established.

For Netlify, open the `saifkhans` project and go to Project configuration > Developer settings > Continuous deployment > Branches and deploy contexts > Configure. Keep Production branch set to `master`; for Branch deploys choose Let me add individual branches and add `main`. Save only after owner authorization. Review build settings and branch-specific environment configuration without altering production settings incidentally.

Changing GitHub's default branch does not change Netlify's production branch. A Git branch alone does not enable a Netlify branch deploy. Verify both independently. No external GitHub or Netlify settings were changed during this milestone.

Netlify account settings could not be inspected: no Netlify connector/CLI was available, browser inventory reported its access host unavailable, and native Firefox inspection was blocked because browser URL-policy enforcement is unsupported. These settings remain owner verification items.

## Rollback

Rollback is a production action requiring explicit owner authorization. For an urgent incident, record the current deploy and commit, select the last known-good successful production deploy in Netlify, and publish that deploy using Netlify's rollback flow. A rollback does not revert Git history. With auto publishing enabled, a later production build can replace the rollback; coordinate an owner-authorized deploy lock if needed.

For the durable fix, create a rollback/fix branch from current `origin/master`, revert the faulty change (a merge revert requires deliberate parent selection), test, and submit an approved PR to `master`. Merge the resulting production history into `main` so future releases retain the fix. Do not reset `master` or force-push old history. Verify the published branch/commit and live behavior after recovery.

## Milestone 3B.2A checkpoint scope

The initial local branch was `master` tracking `origin/master`. Both, and live remote `master`, pointed to `0da2e282313a890f4d17c3a2b9fbd0b4a3c0af91`; neither local nor remote `main` existed. Local `master` was zero commits ahead and zero behind its tracking ref.

`main` starts from that shared baseline and preserves seven modified source files, two new CSS modules, and the three existing 3B.0/3B.1/3B.2 milestone documents. This document and the appended `AGENTS.md` guidance complete the checkpoint scope. Earlier milestone statements about no commit/push describe their original work sessions; this milestone explicitly authorizes the pre-production checkpoint.

The checkpoint uses `[skip netlify]` to suppress Netlify's Git-triggered deploy while settings remain unverified. Only `refs/heads/main` is an authorized remote write target. `master` must retain its recorded SHA. UI acceptance and production release are separate later decisions.

## References

- [Netlify deploy overview and production branch](https://docs.netlify.com/deploy/deploy-overview/)
- [Netlify branch deploy configuration](https://docs.netlify.com/deploy/deploy-types/branch-deploys/)
- [Netlify skip-deploy markers and rollback behavior](https://docs.netlify.com/deploy/manage-deploys/manage-deploys-overview/)
- [GitHub branch protection](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/managing-a-branch-protection-rule)
