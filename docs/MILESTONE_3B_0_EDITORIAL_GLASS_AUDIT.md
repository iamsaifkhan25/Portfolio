# Milestone 3B.0: Editorial Glass design audit

Prepared for owner review on 2026-11-12. This is a design proposal, with no application, content, asset, dependency, or interaction changes. No commit, push, or deployment.

**Recommendation:** retain the dark glass foundation and existing project experience, then give the site an editorial hierarchy through clearer typography, quieter surfaces, and more intentional spacing. The personal writing and genuine project evidence should supply its character.

**Inspection boundary:** browser inventory returned no browser surfaces and reported `The browser access host is unavailable`. No rendered page, screenshot, touch interaction, computed style, screen-reader behavior, or animation was verified. Findings below distinguish source facts from design judgments and browser-review risks. Earlier milestone reports are historical evidence, not new validation.

Reviewed the homepage, root layout, global styles, navigation, footer, background, shared glass component, Projects page, capsule/detail/showcase components and scoped styles, pipeline, resume, contact, current project/image metadata, and relevant 3A reports. Consulted the installed Next.js font and CSS guides. The older `ProjectCard.tsx` is not the renderer used by the current Projects page and should not drive this redesign.

## 1. Current design strengths

- **A personal voice.** The first-person introduction, background, learning, and AI-workflow copy give the homepage a credible identity. Preserve this wording and all approved project narratives.
- **A coherent starting palette.** The near-black canvas, cool text, indigo accents, and translucent surfaces already support the requested direction. A visual refinement can work within the existing architecture.
- **Evidence leads the projects.** Current data distinguishes live work, prototypes, hackathon work, and work on hold. Genuine images carry dimensions, alternatives, and captions; galleries expose full-resolution links. Game of No Lore and the October hackathon retain intentional typographic covers.
- **A distinctive interaction is already present.** Capsules expand into native full-screen dialogs. Source includes an inert transition snapshot, Escape/X closing, focus containment/restoration, page and horizontal-row scroll restoration, safe-area handling, and explicit reduced-motion logic.
- **Mobile organization has a purpose.** The existing four status groups explain the collection. Native horizontal scrolling is limited to the multi-project live group, with a next-card cue, keyboard scrolling, and gesture checks that distinguish swipes from taps.
- **Accessibility has a foundation.** The code includes a skip link, focus-visible styles, labelled form controls, required inputs, a live status region, named dialog controls, and textual project statuses. These are source strengths, not a claim of complete accessibility.

## 2. Identified design problems

**Confirmed source issues and inconsistencies**

| Finding and evidence | Design implication and proposed response |
| --- | --- |
| `ProjectShowcase.tsx:235` renders an image-backed project's cover above the article; `ProjectDetail.tsx:47` renders the same cover again after the story. This affects Open Study Deck, CSS Frosting, and EchoScape. | Duplicate full-width imagery and captions lengthen an already substantial reading experience. Keep one cover presentation, its caption, and access to the full-resolution image. Prefer retaining the existing animated hero and removing the repeated article figure in a later approved presentation change. |
| `Navbar.tsx:134` keeps the closed mobile drawer mounted, using `aria-hidden`, opacity, transforms, and pointer-event suppression. Its links have no closed-state focus exclusion. | Hidden links remain eligible for keyboard navigation below the desktop breakpoint. Make the closed drawer unavailable to focus; handle Escape focus return. This is a source-demonstrated accessibility issue, separate from capsule animation. |
| `layout.tsx:9` assigns Plus Jakarta Sans to `--font-sans`; `globals.css:8` also defines that token using unconfigured Geist variables. | Font ownership is inconsistent. Use one explicit font source/token mapping and verify the computed font later. The source alone does not establish which family currently wins. |
| `ProjectShowcase.module.css:137` sets a larger introduction size on its wrapper, while `.detail p` at line 139 explicitly sets the child paragraphs to 1rem and a different color. | The intended lead-paragraph treatment does not reach the story paragraphs through inheritance. Apply the approved introduction treatment directly to those paragraphs. Preserve every paragraph and its order. |
| Shared glass uses 45% opacity and 16px corners; capsules use 80% opacity and 36px corners; dialogs use an opaque background. Colors, radii, borders, and shadows recur as literals. | Some differences appropriately express depth, but there is no clear shared surface hierarchy. Introduce named surface levels, without flattening every component into the same panel. Keep the capsule's current 36px radius because its transition calculation also uses 36. |
| `GlassCard.tsx:12` enables hover lift/glow by default. Static homepage cards, education cards, and the contact location card inherit it. | Static content gets an interactive affordance. Reserve hover response for actual links, buttons, and interactive capsules. |

**Composition and density judgments based on source**

- **Homepage:** centered badge, gradient name, gradient statement, two pill buttons, three identical icon cards, and a centered closing statement follow a familiar template. The three cards give unequal amounts of prose equal visual space; the longer workflow paragraph is compressed into a desktop third. There is no genuine project imagery on this page. The copy is strong enough to support a less boxed composition.
- **Navigation:** four icon-and-label links, monogram/name, two social icons, and a separate contact CTA compete inside one pill. Contact appears twice. The full desktop arrangement starts at 768px inside a 92%-width container, which warrants a tablet fit check. Active routes have visual styling but no `aria-current`. The `sticky` nav sits inside a short wrapper, so persistent sticking should not be assumed without browser inspection.
- **Footer:** identity, tagline, copyright, location, email, and socials receive small text and multiple separators. The location/email pair stays in a non-wrapping row, creating a narrow-screen/zoom risk. Reflow and grouping would help more than additional decoration.
- **Projects:** the large page title, a second Featured projects heading, explanatory copy, 520px minimum desktop capsules, and a large AI disclosure panel create several competing layers of emphasis. The 36px capsule shape is distinctive and should stay. The disclosure can retain its exact wording while losing the oversized decorative CPU watermark and heavy callout styling.
- **Capsule imagery:** `.previewImage` uses at least 140% width inside a fixed-height, clipped preview with a gradient overlay. This is a deliberate crop, not a proven defect. Browser review must establish whether recognizable UI survives on each image; retain it unless a demonstrated legibility issue warrants a targeted adjustment. Do not regenerate or alter approved image files.
- **Case studies:** long introductions, full-width galleries, workflow tiles, technical prose, pipeline panels, and multiple concluding sections need a clearer reading rhythm. Preserve all sections and facts; reduce surrounding visual competition. Paragraph groups allow up to 75ch, while purpose/features span their grid tracks. The top hero can also put the title below the initial viewport; this is a review risk, not an observed screenshot finding.
- **Resume:** glowing timeline nodes, date pills, many 11px highlight chips, small/light descriptions, two education panels, and checklist icons make the page busier than its information requires. Important qualifications and dates deserve a readable document hierarchy.
- **Contact:** three separate icon panels compete with the form. Labels reach 11px, inputs use 14px text, email/phone are truncated, and the message field cannot be resized. The location panel lifts on hover despite having no action. Larger controls and plain contact rows would feel more direct.
- **Background and motion:** the mesh, three drifting indigo/violet/cyan orbs, repeated glow shadows, gradient headings, icon tiles, and card lifts supply more atmosphere than the content needs. Their actual visibility and GPU cost were not measured. Reduce decoration by design; do not claim a measured performance improvement.

## 3. Proposed homepage layout

Use an asymmetric introduction followed by a calm editorial background section. Preserve the existing approved text, actions, and reading order.

**Desktop composition, within roughly 1088px:**

1. A quiet masthead aligned with the page grid: name/monogram on the left, four clear navigation links on the right. Keep socials in the footer and contact page; remove the duplicate masthead contact CTA. Use an underline or subtle surface for the active page.
2. A roughly 7:5 hero split. The left column contains a plain Building & Learning eyebrow, Saif Khan, the existing curiosity statement as the strongest message, the existing descriptive sentence, and Explore Projects / View Resume. Use solid text rather than two competing text gradients.
3. The right column provides one genuine image from an existing live project, slightly lower than the text start. Default proposal: Open Study Deck's existing cover, labelled with its exact project title and linked to `/projects`. Preserve its aspect ratio and approved caption where presented. This is a supporting figure, not another capsule or a new expansion system. Mobile places it after the actions. No stock image, invented portrait, or new artwork is needed.
4. Below, turn Where I Started, Learning as I Go, and How I Work into an open editorial layout: small section labels beside comfortable text columns and thin separators. Give the longer workflow text more width. Keep the three approved passages verbatim and in order; remove decorative icon tiles and static hover lifts.
5. Retain the existing closing collection statement, left aligned as a quiet bridge toward projects rather than a third centered headline. Finish with the compact shared footer.

Use 80–112px between major desktop sections and 48–64px on mobile. This rearranges existing material; it does not require a new route, content rewrite, stats strip, skills dashboard, or new homepage carousel.

## 4. Resume and contact refinements

**Resume:** keep the real PDF link prominent beside the title on wide screens and full width below it on mobile. Present What I'm Building Toward as a restrained introductory note with its exact wording. Use a wide experience column and narrower education/competencies column on sufficiently wide screens. Replace glowing nodes with quiet rules, make dates plain aligned metadata, and present all existing highlights as wrapping text or a simple list rather than many tiny pills. Preserve roles, employers, dates, education-in-progress wording, competencies, and PDF bytes. Target 16px descriptions and 14px metadata; stack the sections in their current reading order on mobile. No embedded PDF viewer is needed.

**Contact:** preserve the existing introduction, details, form fields, submission behavior, and status messages. Keep the current useful 2:3 desktop split, but render email, phone, and location as three simple rows beside one glass form surface. Allow the full email/phone to wrap; do not truncate them. Use 16px field text, visible sentence-case labels, at least 48px control height, and a taller, vertically resizable message field. Keep email access prominent before the form on mobile. Use a visible control boundary and focus ring, with clear disabled, sending, success, and error states. Preserve the live status region. Form submission/delivery was not tested in this audit; visual refinement should not change the API or imply delivery verification.

**Shared footer:** retain all current information and social destinations, but consolidate it into two quiet groups. Permit location/email/socials to wrap or stack. Use 14px contact text and enough link padding for touch; reduce excess vertical padding where it creates a second large page ending. Avoid adding another promotional CTA.

## 5. Design tokens and typography recommendations

These are proposed values for review, not applied CSS. Functional state colors remain distinct from atmospheric indigo/violet; live, warning, and error states must keep visible text labels.

| Token or role | Proposed value / rule |
| --- | --- |
| Canvas | `#070A12` |
| Reading surface / fallback | `#101523`, opaque for long-form reading |
| Raised surface / fallback | `#151B2D` |
| Glass | `rgba(16,21,35,0.88)` with 12–16px blur, primarily masthead and interactive project surfaces; opaque fallback |
| Primary text | `#F1F2F6` |
| Body text | `#CED3DE` |
| Muted text | `#A4ADBD`; avoid additional opacity on essential metadata |
| Accent text / focus | `#A5B4FC` |
| Primary action background | `#4338CA`, solid enough to support legible text |
| Ambient indigo / violet | `#6366F1` / `#8B5CF6`, around 6–10% opacity, localized near hero edges |
| Decorative separator | `rgba(255,255,255,0.10)`; not the sole identifier of an input/control |
| Control boundary | `#67718A` against the raised surface |
| Corner radii | 12px controls, 20px ordinary panels; preserve 36px capsules and 0px expanded dialog |
| Spacing scale | 4, 8, 12, 16, 24, 32, 48, 64, 80, 112px |
| Page / reading widths | Approximately 1088px page maximum, 62–68ch prose; evidence figures may use the wider article/gallery width |
| Shadows | One quiet black elevation shadow and a faint upper edge; avoid stacking panel and button glow |

Calculated contrast for opaque proposed pairs: primary/body/muted/accent text against `#101523` is respectively **16.27:1 / 12.13:1 / 8.05:1 / 9.13:1**. The proposed control boundary against `#151B2D` is **3.51:1**; primary text on `#4338CA` is **7.06:1**. These are numerical solid-color checks, not rendered contrast or accessibility certification. Check glass composites, all states, captions, warnings, and focus against the actual backgrounds during implementation. Use design acceptance targets of at least 4.5:1 for normal text and 3:1 for essential control boundaries/focus indicators.

**Typography:** keep Plus Jakarta Sans for interface and body text, with one unambiguous token. Add editorial contrast through a restrained system serif stack such as `Georgia, Cambria, serif` for the homepage's curiosity statement and selected large page/case-study titles. This adds no dependency or font download; platform differences require review. Keep project capsule titles in the existing sans family to protect their geometry. If serif review is unconvincing, use the same hierarchy with the existing sans family; do not add another display font by default.

| Role | Desktop / mobile starting range | Treatment |
| --- | --- | --- |
| Hero message | 56–72px / 36–44px | Display face, 1.08–1.15 line height, deliberate wrapping |
| Page / detail title | 40–56px / 30–36px | 1.1–1.2 line height; no truncation or forced one-line titles |
| Section title | 24–28px / 22–24px | Medium or semibold; clear space above |
| Introductory prose | 18–20px / 17–18px | 1.65–1.8 line height; preserve all story paragraphs |
| Body | 17–18px / 16–17px | Weight 400; 1.7–1.8 line height |
| Captions / metadata | 14–15px / 14px | Comfortable contrast; reserve uppercase for short category labels |

Use at most three ordinary interface weights, roughly 400/500/600, with stronger headings only where needed. Avoid long lightweight gray paragraphs and tightly tracked small labels. Retain a system monospace only for technical identifiers and numeric pipeline results.

## 6. Animation recommendations

- **Preserve the capsule system:** retain its 420ms duration, easing, snapshot, clipping, image reveal, focus behavior, and scroll restoration. There is no observed browser evidence supporting a rewrite. Preserve the 36px radius shared between CSS and transition math. Reading-layout changes must keep the existing hero animation target and be checked against both opening and closing.
- **Make ambience static:** replace drifting orbs and the mesh with one or two low-opacity, static indigo/violet light fields. Drop the cyan atmospheric accent. Keep light away from dense reading areas.
- **Limit ordinary transitions:** use explicit color, border-color, background-color, and opacity transitions around 140–180ms. Replace blanket `transition: all` where feasible during implementation. Do not make static content lift; capsules already provide their own restrained hover response.
- **Reduce route entrance emphasis:** the current 600ms fade/8px translation can become a short 160–220ms opacity entrance, or be omitted on reading pages. Avoid staggered paragraph reveals, parallax, animated counters, cursor effects, and scroll-driven decoration.
- **Preserve reduced motion:** retain global CSS and the dialog's JavaScript preference listener. Use immediate state changes for reduced motion, including menu changes; keep sending feedback understandable through text even when the spinner stops.

These are design recommendations, not animation-quality or performance measurements.

## 7. Desktop, mobile, and accessibility considerations

**Projects and expanded reading:** keep the existing two-column desktop collection, five-project order, and textual statuses. Reconcile colors, text sizes, and spacing with the new tokens rather than replacing the layout with a masonry grid. Treat the 520/440px capsule minimum heights as review parameters; do not shorten them until real content fit is checked. Keep summaries intact and the Explore affordance visible without hover.

Retain mobile group order: Completed / Live, In Progress, Hackathon Work, On Hold. Preserve the native live-project swipe row, snap behavior, neighbor cue, and touch/keyboard distinctions. Keep the 768px showcase boundary and the existing 640px container rule unless a real layout failure demonstrates a reason to change them.

For case studies, retain the approved introduction-first article structure, all subsequent sections, full-width readable evidence, captions, and full-resolution access. Reduce prose measure toward 62–68ch and increase the separation between major sections. Workflow and pipeline visuals explain real processes and should remain; simplify surrounding borders and enlarge small explanatory text. Keep warning/limitation blocks visibly distinct. Preserve 518 processed requests, 44 unresolved cases, failed-contract/non-production limits, and the later December image's secondary, expanded-only role. Never turn that image into a cover or remove its contextual wording. Keep Game text-first until genuine approved images exist.

The existing pre-article hero must be reviewed at short viewport heights: aim to expose title/status early without removing the hero animation hook. Avoid duplicated imagery and unnecessary top space on text-first projects. Do not add a sticky contents sidebar, carousel, or additional dialog navigation in this milestone without demonstrated need.

**Responsive shell:** use 20–24px mobile gutters where width permits, with 16px as a narrow-screen fallback; roughly 32px on tablet and 48px on wide desktop. Let content determine the masthead breakpoint: consider retaining the mobile menu into tablet widths if the full link row does not fit. This can change independently of the showcase's 768px breakpoint. Prefer a normal in-flow masthead unless persistent navigation demonstrates a benefit. If sticky navigation is retained, fix its containing structure deliberately and check focus visibility below it.

**Mobile menu:** preserve a simple disclosure, not a new full-screen modal. Make closed links unavailable to focus, indicate the current page semantically, return focus to the trigger on Escape, provide enough panel opacity, and allow the open panel to scroll within short/landscape viewports. Preserve outside dismissal and link activation behavior. Keep the owner's name readable beside the mobile mark if it fits, rather than relying only on initials.

**Review matrix for later implementation:** 320, 360, 390, 430, 768, 1024, and 1440px widths; one mobile group with at least 640px of available container width; short landscape heights; 200% and 400% zoom; enlarged text; keyboard-only use; reduced motion; and safe areas. Page content must reflow without horizontal overflow, while the intentional live-project row remains scrollable. The global `overflow-x: hidden` must not be taken as proof of correct fit.

Target at least 44px touch areas and 48px for principal controls. Preserve the existing 48px close button and its deep-scroll availability. Check focus containment/restoration, X/Escape, rapid close during opening, resizing across 768px while open, page/row scroll restoration, image links, real swipes without accidental expansion, and captions/long titles at zoom. Verify contrast on actual composite surfaces and use textual labels alongside status colors. No such browser or assistive-technology results are claimed here.

## 8. Proposed Milestone 3B implementation sequence

| Stage | Bounded work | Review / acceptance |
| --- | --- | --- |
| **3B.1 — Foundations** | Resolve font token ownership; introduce shared colors, surfaces, spacing, type roles, and an opaque glass fallback. Retain capsule radius/animation constants and dependencies. | Review a small set of real headings, paragraphs, panels, and controls on desktop/mobile. Check computed fonts and contrast. No approved data or image changes. |
| **3B.2 — Shared shell and homepage** | Simplify masthead/footer; fix closed-menu focus access and current-page semantics; make ambient light static; apply the proposed asymmetric homepage and existing copy. | Review homepage rhythm, real image framing, tablet navigation fit, keyboard menu behavior, footer wrapping, and mobile reading order. |
| **3B.3 — Project presentation** | Align capsule colors/type to tokens; refine article measure and spacing; resolve duplicate cover presentation while retaining caption/full-resolution access and the animated hero. Quiet the AI disclosure without rewriting it. | Review all five projects, every evidence caption, original desktop/mobile ordering, actual image crops, and opening/closing/scroll/focus behavior. No capsule engine redesign. |
| **3B.4 — Resume and contact** | Apply readable resume rows and metadata; simplify contact rows; improve field sizes, boundaries, wrapping, and message-field resizing. Keep the PDF, credentials, contact details, and submission logic intact. | Review long strings, zoom, touch targets, keyboard focus, and all form states. Validate the real form flow separately in an appropriate test context; do not send an unsolicited message. |
| **3B.5 — Regression and owner review** | Run appropriate lint/type/build checks, inspect diffs, and complete the responsive/interaction review matrix above. Compare approved content, statuses, source/public images, PDF, and dependencies against the starting baseline. | Record source/build results separately from actual browser, touch, and accessibility results. If browser inspection remains unavailable, mark those checks pending. Stop for owner review; no automatic commit, push, or deploy. |

Each stage should be reviewable before broadening the visual treatment. Read the relevant installed Next.js guides before future code changes. Use the existing CSS/Tailwind/Next.js/React capabilities; no new animation, carousel, design-system, or UI dependency is proposed.

**3B.0 outcome:** audit complete for review. The only repository addition is this document. Application code, approved stories, statuses, technical evidence, project interactions, assets, PDF, and package manifests remain unchanged.
