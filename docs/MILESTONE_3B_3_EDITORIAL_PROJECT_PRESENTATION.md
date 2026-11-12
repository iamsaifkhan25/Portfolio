# Milestone 3B.3: Editorial project presentation

Implemented on 2026-11-12 for owner review on `main`. Direction: **The Personal Studio Journal**. No commit, push, merge, dependency change, production deployment, or external setting change. `master` was not changed.

Read the 3B.0 design audit, 3B.1 foundations report, 3B.2B homepage expansion report, deployment workflow, and installed Next.js CSS, server/client component, and Image documentation before editing. Applied the React review checklist.

The starting tree already contained the uncommitted 3B.2B homepage expansion: `src/app/page.tsx`, `src/app/page.module.css`, `ProjectShowcase.tsx`, `HomeProjectPreview.tsx`, `ProjectDetailDialog.tsx`, and its report. Preserved that work. The dialog file was already untracked; this milestone changes only its cover caption/link markup and empty no-cover spacer. Its animation and interaction controller remain intact.

## 1. Files changed

| File | Change in this milestone |
| --- | --- |
| `src/app/projects/page.tsx` | Plain editorial title/introduction, visually hidden collection heading, and a quiet AI disclosure with its exact original wording. |
| `src/app/projects/page.module.css` | New scoped page spacing, reading measure, and disclosure separator using 3B.1 tokens. |
| `src/components/ProjectDetail.tsx` | Removed only the repeated article cover figure. All case-study sections and writing remain. |
| `src/components/ProjectDetailDialog.tsx` | Full-resolution cover link beside the retained animated image's caption; remove repeated decorative category text from the no-cover spacer. |
| `src/components/ProjectShowcase.module.css` | Token-based surfaces and type, prominent introductory paragraphs, prose measure, section spacing, open workflow/pipeline styling, and readable captions/metadata. |
| `src/components/ProjectPipeline.tsx` | Preserve pipeline content and structure while replacing nested cards, decorative arrows, and tiny type with open stage/result groups. |
| `docs/MILESTONE_3B_3_EDITORIAL_PROJECT_PRESENTATION.md` | This implementation and verification record. |

The existing homepage, its preview wrapper, and `ProjectShowcase.tsx` received no additional changes in this milestone. Data, approved source/public images, project statuses, resume, contact, global tokens, and dependency manifests were not edited.

## 2. Visual hierarchy improvements

- The Projects page has one visible page title, using the existing system-serif family and page-title role. Removed the gradient and decorative period. `Featured projects` remains a screen-reader heading and section label without competing visually with the capsules. The original introduction and opening instruction remain.
- The five capsules remain the primary collection elements. Surfaces, borders, focus colors, shadows, and feedback use the foundations tokens. An opaque fallback precedes conditional standard/WebKit backdrop filtering. Removed the capsule hover glow; retained its geometry, preview crop, title sizing, and layout. Category/status/Explore labels use the 14px metadata role.
- Expanded titles use the existing serif/page-title tokens. Category, subtitle, and status are secondary metadata, with textual statuses preserved. The first-person story uses primary text and the 17–20px introductory role directly on its paragraphs, fixing the wrapper-inheritance issue identified in 3B.0. Body prose uses the 16–18px role with 1.75 line height.
- Prose groups and ordinary sections use the existing 66ch measure. Purpose and features follow vertically, giving each a full reading column. Section headings use the 22–28px role. Major gaps are 80px on desktop and 48px on mobile; paragraphs use 24px gaps. The genuine gallery retains the wider article width.
- Workflow steps are a plain ordered list. Behind the Build retains all implementation prose followed by a quieter, wrapping technology list and one separator. The HackerRank pipeline keeps every stage, metric, and explanatory note, with open columns and 14px explanations instead of nested panels and arrows. Its 518/44 results use restrained type rather than promotional cards.
- The limitation note keeps a visible amber rule and its original warning wording. Results, future direction, design decisions, and learning sections remain intact, in their original order. Gallery titles, alt text, descriptions, captions, and full-resolution links remain.
- The AI disclosure retains its heading and paragraph verbatim. Replaced the large glass panel, uppercase styling, CPU icon, and watermark with a simple section and thin separator. Removed the page entrance animation; no new motion was introduced.

These are implemented styling choices. Rendered hierarchy, contrast, wrapping, and visual fit have not been observed in a browser.

## 3. Duplicate image handling and factual preservation

`ProjectDetail` no longer renders `project.coverImage` as an article figure. The shared dialog still renders the existing animated header image with the original `src`, `alt`, intrinsic dimensions, responsive `sizes`, eager loading, and `heroImage` animation hook. Its caption now includes a keyboard-accessible full-resolution link, with the same source asset and a new-tab announcement.

Open Study Deck, CSS Frosting, and EchoScape Labs each have one content cover in the rendered dialog markup. The inert, assistive-technology-hidden transition snapshot remains part of the existing animation system. Supporting screenshots are unchanged and remain separately linked. HackerRank and Game of No Lore still work without a cover; their article category remains visible, and their empty top spacer reserves room for the close control.

The data file and original asset bytes are identical to the starting tree. Server-render assertions verified every approved story paragraph in order, purpose, feature, workflow step, implementation passage, decision, result, future/learning passage where present, limitation, subtitle, technology, and status. Also verified pipeline stages, results, and note.

Protected facts remain:

- HackerRank: **518 processed requests**, **44 unresolved validation cases**, the failed output contract, and all non-production limitations. The December Holiday Edition screenshot remains only in the supporting gallery, with its original later-edition title, alt text, and full context caption. No December participation or affiliation claim was added.
- Game of No Lore: early prototype, one house asset, prototype character/environment, and planned village/gameplay scope. No cover or invented capture was added.
- EchoScape Labs: **On hold**. All other statuses remain unchanged.

## 4. Shared dialog regression protection

Both the homepage Open Study Deck preview and Projects capsules continue to import the same `ProjectDetailDialog` and `useProjectDialog`. There is no second dialog implementation.

Compared against a snapshot of the starting working tree, the dialog's entire controller code before its JSX return is unchanged. This includes the **420ms** duration, easing, trigger geometry, corner compensation, source clipping, inert snapshot, fallback, Web Animations API calls, close guard, Escape-close function, focus containment, initial close-button focus, cleanup, page/body scroll handling, horizontal-row restoration, resize handling, and reduced-motion subscription/branches. The dialog's `onCancel`, `onKeyDown`, close-button action, accessible label, and title association remain connected as before.

Rendered each of the five actual shared dialogs using React server rendering and the installed Next Image component. Checked title association, close-button naming, expected cover/gallery image counts, original alt text and dimensions, single captions, supporting screenshot titles, and full-resolution destinations. Production HTML checks also verified the homepage's dialog trigger and the five Projects triggers in approved order.

These checks protect source and markup contracts. Server rendering does not execute effects, native modal behaviour, focus transfer, scrolling, animation, or keyboard events. Actual X/Escape, focus, scroll, and reduced-motion interaction results remain unverified.

## 5. Desktop and mobile behaviour

Desktop still uses the two-column collection and the approved order: Open Study Deck, CSS Frosting, HackerRank Orchestrate 2026, Game of No Lore, EchoScape Labs. Capsule minimum heights remain 520px desktop / 440px mobile, with 36px corners and the existing screenshot crops.

Below 768px, the four existing status groups remain Completed / Live, In Progress, Hackathon Work, and On Hold. The native horizontal live-project row, snap settings, next-card cue, keyboard row controls, pointer pan/click guard, and 640px container rule are preserved. Compared the protected group/swipe CSS rules and capsule geometry declarations against the starting snapshot; they match. `ProjectShowcase.tsx` and `ProjectCapsule.tsx` are unchanged from that snapshot.

Case-study prose and workflow are a single reading column. The pipeline uses two open columns on desktop and stacks on mobile. The wider screenshot gallery, natural image ratios, safe-area gutters, scroll region, and fixed 48px close control remain. Text-first projects have less empty space above the article. Browser fit and actual swiping have not been verified.

## 6. Verification results

| Check | Result |
| --- | --- |
| `npm.cmd run lint` | Passed without diagnostics. |
| `npx.cmd tsc --noEmit` | Passed. |
| `npm.cmd run build` | Passed; all 11 static pages generated, homepage/Projects remain static, existing Contact API remains dynamic. |
| `git diff --check` | Passed; ordinary LF-to-CRLF working-copy notices only. Staging area remains empty. |
| Starting-tree preservation | Compared 88 starting files; all outside the five intended existing-file edits remain byte-identical, including the other 3B.2B work, data, assets, manifests, and gesture handling. Two new files are the page stylesheet and this report. |
| Shared controller comparison | Passed: controller unchanged from the starting 3B.2B version; both entry points continue using it. |
| Case-study server rendering | Passed for all five projects: approved content/statuses, image counts, captions, title/close labels, dimensions, alt text, and original image destinations. These are markup checks, not runtime dialog tests. |
| Disclosure preservation | Original and current rendered disclosure paragraphs match after whitespace normalization; heading unchanged. |
| Responsive source protection | Group/swipe CSS rules and capsule geometry declarations match the starting version. No new grouping or animation controller. |
| Image metadata | All 14 cover/gallery records match actual on-disk dimensions using installed Sharp. Source metadata and original assets unchanged. |
| Production CSS | Existing serif, monospace, reading-width, intro-size, and spacing tokens emitted; the direct introductory-paragraph sizing rule is present. No new font/dependency. |
| Local production HTTP | `/` and `/projects` returned 200; one `h1` each, homepage dialog trigger, five ordered capsule triggers, visually hidden collection heading, and no CPU decoration. |
| Image HTTP | All 14 metadata-referenced image responses and an optimized Open Study Deck cover returned nonempty image responses. This does not establish rendered image loading. |
| React review | Reviewed shared boundaries, unchanged hooks/effect cleanup, stable project/step keys, labelled sections/dialog/links, safe external targets, conditional no-cover/gallery handling, and no nested interactive controls. |
| Browser interaction/visual tests | **Blocked**, as detailed below. No visual, touch, focus, scroll, or animation pass claimed. |

Temporary verification code used installed TypeScript, React, Next Image, PostCSS, and Sharp; no test dependency or generated verification artifact was added to the repository. Initial helper assertions were corrected to ignore a color-only `@supports` rule when comparing geometry and to include the existing status suffix in capsule accessible names; implementation changes were not needed for those assertions.

## 7. Remaining browser review requirements

Current browser inventory returned no browser surfaces and **The browser access host is unavailable**. Native Firefox inspection was then stopped because **browser URL policy enforcement is not yet supported for the current Windows browser**. No browser input or page interaction was performed. Computer Use ended at that blocker; no alternative browser-control mechanism was used.

Before accepting the presentation, review both entry points on desktop and mobile:

1. Open the homepage preview and each Projects capsule with pointer, Enter, and Space. Confirm one modal, unchanged URL, close-button focus, correct title/status, single content cover, original captions, and readable story hierarchy. Check no-cover projects and all supporting screenshots, including the December context disclaimer.
2. Tab/Shift+Tab through the close control, scroll region, new cover link, galleries, and external links. Confirm containment, visible focus, reachable links, and correct full-resolution assets. Close via X and Escape at the top and after deep scrolling; confirm trigger focus, page offset, and mobile row offset restoration.
3. Repeat open/close, close during opening, resize while open/across 768px, and offscreen/clipped trigger fallback. Inspect the retained 420ms transition, source corners/crops, and title visibility after the hero at short viewport heights. The uncropped header image still precedes the article and can put title/status below the first viewport.
4. Enable reduced motion before opening, then toggle it during an animation. Confirm immediate transitions and the same close/focus/scroll outcomes. Check the existing no-Web-Animations fallback.
5. On mobile, swipe the live group without accidental opening; test Arrow/Home/End row controls and row restoration after opening CSS Frosting. Confirm original status-group order and the 640px container layout.
6. Review 320/360/390/430/768/1024/1440px widths, short landscape heights, safe areas, enlarged text, and 200%/400% zoom. Check caption/link wrapping, long titles, changed metadata sizes, single-column reading, gallery loading, and absence of unintended page overflow. Inspect computed fonts, actual contrast, and opaque glass fallback.

Stopped after implementation for owner review. No automatic commit, push, release, or deployment.
