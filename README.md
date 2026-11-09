# Saif Khan's Portfolio

A personal portfolio for projects, learning, and a background in partner operations. Built with Next.js App Router, React, TypeScript, and Tailwind CSS, using the existing dark glassmorphic design.

## Structure

- `/`: personal introduction and approach to learning and building.
- `/projects`: two existing project cards and a disclosure of AI assistance.
- `/resume`: professional experience, education, and the genuine resume download.
- `/contact`: contact details and a form forwarding messages through `/api/contact` to FormSubmit. Delivery requires the external service and was not tested in Milestone 1A.
- `src/components`: shared navigation, footer, glass cards, and animated background orbs.
- `src/app/globals.css`: shared styling, responsive utilities, focus treatment, and reduced-motion rules.

## AI assistance

I use Codex and Claude Code to explore ideas, understand unfamiliar code, prototype, and work through bugs. I'm still learning. I remain responsible for design decisions, understanding changes, testing results, and iteration.

## Local development

Use the dependency versions recorded in `package.json` and `package-lock.json`.

```sh
npm ci
npm run dev
npm run lint
npm run build
npm start
```

On Windows, use `npm.cmd` if PowerShell blocks `npm.ps1`. The build prerenders the public pages and retains a server route for `/api/contact`; it is not configured as a static export.

## Content evidence

See [the Milestone 1A audit](docs/MILESTONE_1A_CONTENT_AUDIT.md) for the five-project inventory, resume corrections, evidence sources, remaining owner checks, and validation results. The projects page retains its existing two-card layout; adding the other projects is a later content/layout milestone.

The former `public/Saif Resume.pdf` was a 141-byte plain-text placeholder. It has been replaced with an unchanged copy of the genuine `Saif_Khan_Resume_Updated.pdf` selected by the owner from Downloads. No PDF was generated or edited.
