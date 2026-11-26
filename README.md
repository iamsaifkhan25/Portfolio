# My Portfolio

Hi, I'm Saif.

My professional background is in partner operations, but outside work I've spent a lot of time learning how to build things. Web tools, AI experiments, games, and occasionally ideas that turn out to be much harder than I expected.

This portfolio is where I keep that work.

Some projects are live, some are still in development, and a few are on hold. I've tried to share what actually exists, what I learned along the way, and what still needs fixing.

**[Visit my portfolio](https://saifkhans.netlify.app/)**

## Projects

- **Open Study Deck:** A free study tool that turns notes and textbook images into summaries, explanations, outlines, and flashcards.
- **CSS Frosting:** A visual CSS tool for experimenting with glass effects without having to adjust every property by hand.
- **HackerRank Orchestrate 2026:** A Python-based deletion audit agent I built for a hackathon. It didn't pass every validation case, but I learned a lot from working through the problem.
- **Game of No Lore:** An early Unity game project inspired by memories of my grandparents' house. It's still in the prototype stage.
- **EchoScape Labs:** An experiment in making music shape interactive 3D environments. Development is currently on hold.

Each project has a longer case study on the website, including screenshots, technical details, decisions, and unfinished work.

## What I used

The portfolio is built with Next.js App Router, React, TypeScript, Tailwind CSS, and CSS Modules. It's hosted on Netlify.

I wanted something that felt personal without getting in the way of reading about the projects, so most of the design is built around typography, actual project screenshots, and expandable case studies.

## Running it locally

Clone the repository, install the dependencies, and start the development server.

```bash
npm ci
npm run dev
```

Then open `http://localhost:3000`.

To run the checks:

```bash
npm run lint
npx tsc --noEmit
node --test tests/*.test.mjs
npm run build
```

On Windows, `npm.cmd` can be used if PowerShell blocks `npm.ps1`.

## Contact form

The Contact page uses Netlify Forms and shows the form by default without contact-related environment variables. Contact Details stays on the left on desktop, with the form on the right; mobile stacks details before the form. If sending fails, only the right panel offers email and Try again. Retrying restores your entries without resending them.

An unset `NEXT_PUBLIC_CONTACT_FORM_ENABLED` or the exact value `true` shows the form. The exact value `false` is the emergency disable switch; any other explicit value (including empty, uppercase, or whitespace-padded values) also disables it. These are build-time settings, so changing them requires a development-server restart or a production rebuild. HTTP acceptance clears the fields and shows a thank-you message; it does not prove inbox delivery.

The contact form is currently being tested on staging. The owner verified two submissions initially classified as spam and then received their email notifications. Registration, storage, and the notification path have been demonstrated; automatic verification of a fresh legitimate submission and final staging acceptance remain pending. Direct email is always available.

Before any future merge to `master`, record and verify the effective production build setting: explicitly choose `NEXT_PUBLIC_CONTACT_FORM_ENABLED=true` only with owner approval to enable, or `false` to retain email-only contact. Do not release with an unset value. The existing `netlify.toml` build default remains `false`, with `main` explicitly enabled; this staging milestone changes no hosted settings and authorizes no production release. After final acceptance, `NEXT_PUBLIC_CONTACT_DELIVERY_VERIFIED=true` removes the testing notice. Leave that flag unset or `false` during staging verification. It does not enable the form or send anything. The legacy `/api/contact` FormSubmit endpoint stays inactive. See [Milestone 3D.5](docs/MILESTONE_3D_5_FINAL_STAGING_RELEASE.md).

To see the form locally without creating an environment file:

```bash
npm run dev
```

In PowerShell:

```powershell
npm.cmd run dev
```

If the presentation flag was previously set in your shell or an environment file, remove it and restart to test the default. Set it to `false` and restart to test the emergency email alternative.

The local Next.js server is useful for checking the interface. Delivery must be verified on Netlify.

## A note about AI tools

I use Codex and Claude Code while building projects. They're useful when I'm stuck, trying something unfamiliar, or figuring out why a piece of code isn't behaving as expected.

I'm still learning, and I don't want to pretend otherwise. I review the changes, make decisions about what belongs in a project, and test the results. When something doesn't work, I go back and try to understand why.

## Deployment

I use `main` for development and staging, and `master` for the live website.

Changes are tested on staging before being reviewed for production. The details are in [the deployment workflow](docs/DEPLOYMENT_WORKFLOW.md).
