# Project case-study drafts

Prepared for Milestone 2B on 2026-11-09. These notes stay separate from the short summaries in `src/data/projects.ts`; they are not published as case-study pages. Evidence comes from the implementation inspections recorded in [1A](MILESTONE_1A_CONTENT_AUDIT.md) and [2A](MILESTONE_2A_PROJECT_SHOWCASE.md), plus the owner's 2B status confirmations. They do not represent new product tests.

The technical sections describe work visible in the sources. The owner still needs to identify which parts were personally most difficult or significant. Personal lessons cannot be inferred from a dependency list or a completed feature.

## Open Study Deck

**What it is.** A live browser study tool that turns text or textbook images into summaries, simplified explanations, outlines, and flashcards with Gemini. Generated decks can be kept in a browser library and exported as PNG images.

**Why it was built.** Its practical purpose is to turn existing notes into study material. **Owner input needed:** what prompted you to build it, and which study problem mattered most to you personally? The public site's subscription-free positioning is not evidence of a personal origin story.

**Technical work and challenges.** The implementation supports two generation paths: limited guest requests through a Cloudflare function with Turnstile and KV quota checks, and requests using the visitor's own key. Keeping those paths distinct, accepting text and image inputs, and carrying generated material through browser storage and PNG export are the main engineering areas supported by the audit. **Owner input needed:** which tradeoff or bug was the hardest, and how did you resolve it?

**What was learned.** **Owner input needed:** one concrete lesson from the generation, storage, or export work, ideally tied to a decision you changed. No learning-outcome or adoption claim is established.

## CSS Frosting

**What it is.** A live website for experimenting with glassmorphism. The generator offers a preview canvas, adjustable styles, presets, and copied styling code; an analyzer checks pasted styles for the main glass effects.

**Why it was built.** It provides a place to explore and inspect glass-effect styling. **Owner input needed:** why you chose this problem and whether it grew from a specific design task or experiment.

**Technical work and challenges.** The inspected generator derives styles from controls and converts them into export formats. The analyzer accepts CSS, Tailwind, and styled input and checks transparency, blur, borders, and shadows. Keeping the preview, copied code, and analysis consistent across those representations is the engineering area to explain. **Owner input needed:** a specific inconsistency or parsing case you worked through.

**What was learned.** **Owner input needed:** a concrete lesson about style generation, parsing, or preview behavior. Deployment is owner-confirmed; payment flows, transactions, revenue, and user adoption remain unverified and are not portfolio results.

## Game of No Lore

**What it is.** A cozy Unity game in active development. An owner-confirmed playable prototype exists, with camera-relative movement, an animation bridge, camera zones, and a gate interaction. It has not been publicly released.

**Why it was built.** The cozy game direction is owner-provided. **Owner input needed:** what kind of everyday experience you want the player to have, and what motivated that direction.

**Technical work and challenges.** The inspected systems connect CharacterController movement, facing and turning, velocity-driven animation, camera triggers, and interaction input. Coordinating movement with changing camera views is a concrete area for a case study. **Owner input needed:** which movement, animation, or camera behavior required the most iteration, and what you changed.

**What was learned.** **Owner input needed:** one lesson from testing or revising the prototype. This portfolio milestone did not run Unity, enter Play Mode, or verify a distributed build; playable status comes from the owner.

## Ghost Data Still Exists

**What it is.** A Python evidence and policy audit tool developed for HackerRank Orchestrate October 2026. It reconstructs identity history and surviving records at an audit timestamp, then produces source-linked findings and proposed remediation and verification steps.

**Why it was built.** It was built to address the hackathon's deletion-audit challenge. The owner confirms that the hackathon attempt is complete. **Owner input needed:** any personal reason for choosing this challenge beyond entering the event.

**Technical work and challenges.** The documented pipeline separates evidence reconstruction, policy decisions, and output-contract validation. Diagnostic candidates are kept separate from final output, which is written only when validation passes. The documented candidate covers 518 requests and includes **44 unresolved evaluation cases that fail local validation**. Those cases remain part of the result and must stay visible in any case study or capture.

**What was learned.** **Owner input needed:** what the unresolved cases taught you about evidence, interpretation, or validation, and what you would change in a later attempt. The documented limit is evidence; a personal lesson about it still needs your words.

This is not a production service. It proposes steps without connecting to live systems or deleting data. The solver was not rerun for 2B; the counts are documented results, not new measurements. No complete solution, contest placement, or compliance guarantee is claimed.

## EchoScape Labs

**What it is.** A browser project with music-reactive 3D environments, existing world renderers, and a guest studio with a session playlist for local audio. Development is currently on hold. Earlier prototypes remain valid examples of the work.

**Why it was built.** Its product concept connects music with the movement and atmosphere of 3D environments. **Owner input needed:** the creative motivation behind that concept and the experience you hoped listeners would have.

**Technical work and challenges.** The inspected audio utilities produce bass, mid, treble, and energy values; world configurations use audio-response, motion, and lighting settings, and renderers update each frame. Mapping audio signals to distinct visual behavior is the main technical and creative area supported by the sources. **Owner input needed:** which mapping or visual result took the most experimentation.

**What was learned.** **Owner input needed:** a concrete lesson from audio analysis, rendering, or designing the worlds. Do not describe the project as actively developed. The older foundation documentation does not establish that all planned worlds, payments, export, or other roadmap features shipped. Current demo availability remains unconfirmed.

## Owner review before publishing longer stories

For each project, supply a short personal motivation, one specific difficult decision or bug with its resolution, and one lesson in your own words. Confirm those details before promoting these drafts to public case studies. No new metrics or outcome claims are needed to tell a useful story.
