<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Git and deployment workflow

- `main` is pre-production and the integration branch for ongoing portfolio work. Start optional `feature/*` branches from an up-to-date `main` and merge them back into `main`.
- `master` is production. Never commit, merge, push, or deploy to `master` without explicit owner release approval for the reviewed change. Approval to checkpoint or push `main` is not release approval.
- Inspect branch/tracking status and all working changes before switching branches. Preserve existing work; stop on unexpected divergence or conflicts. Never force-push, hard reset, or perform destructive cleanup.
- Review the exact staged paths and diff before committing. Exclude secrets, private source material, and generated/local files. Use explicit push refspecs targeting the intended branch; never use `--all` or `--mirror`.
- Confirm Netlify's production branch is `master` before ordinary pushes to `main`; changing GitHub's default branch does not configure Netlify. Until verified, use `[skip netlify]` in checkpoint commit messages to suppress Git-triggered Netlify builds.
- Follow [docs/DEPLOYMENT_WORKFLOW.md](docs/DEPLOYMENT_WORKFLOW.md) for testing, release checks, configuration, and rollback. External GitHub/Netlify setting changes require owner authorization.
