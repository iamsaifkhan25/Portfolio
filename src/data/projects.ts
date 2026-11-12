export type ProjectStatus =
  | "live"
  | "in-development"
  | "hackathon-complete"
  | "on-hold";

export interface ProjectImage {
  readonly src: `/projects/${string}`;
  readonly alt: string;
  readonly width: number;
  readonly height: number;
  readonly caption: string;
  readonly capturedOn?: string; // YYYY-MM-DD when known; never infer from file timestamps.
  readonly version?: string;
}

export interface ProjectPipeline {
  readonly stages: readonly { readonly label: string; readonly detail: string }[];
  readonly results: readonly { readonly value: string; readonly label: string }[];
  readonly note: string;
}

export interface Project {
  readonly id: string;
  readonly order: number;
  readonly title: string;
  readonly subtitle?: string;
  readonly summary: string;
  readonly category: string;
  readonly description: string;
  readonly techStack: readonly string[];
  readonly status: ProjectStatus;
  readonly placement: "lead" | "featured" | "additional";
  readonly highlights?: readonly string[];
  readonly limitation?: string;
  readonly links: {
    readonly source?: `https://${string}`;
    readonly demo?: `https://${string}`;
  };
  readonly coverImage?: ProjectImage;
  readonly screenshots?: readonly ProjectImage[];
  readonly pipeline?: ProjectPipeline;
  readonly caseStudy: {
    readonly purpose: string;
    readonly implementation: readonly string[];
    readonly developmentNotes: string;
  };
}

export const projectStatusLabels: Record<ProjectStatus, string> = {
  live: "Live website",
  "in-development": "In development",
  "hackathon-complete": "Hackathon complete",
  "on-hold": "On hold",
};

// Owner-confirmed statuses and link decisions: docs/MILESTONE_2B_PROJECT_EVIDENCE.md.
// Detailed copy drafts: docs/PROJECT_CASE_STUDIES.md. Capture guide: docs/PROJECT_IMAGES.md.
// Source links must be public. Owner-confirmed site URLs remain valid when automated
// checks are inconclusive. Image provenance: docs/PROJECT_IMAGES.md and project-image-manifest.json.
export const projects: readonly Project[] = [
  {
    id: "open-study-deck",
    order: 1,
    title: "Open Study Deck",
    summary: "Turn notes and textbook images into study cards, then keep them in a browser library.",
    caseStudy: {
      purpose: "Turn existing notes and textbook images into material for studying: summaries, explanations, outlines, and flashcards.",
      implementation: [
        "Text and image inputs feed Gemini generation across four study modes.",
        "Limited guest requests go through a Cloudflare function with Turnstile and KV quota checks. Visitors can also use their own API key.",
        "Generated decks carry through to browser storage, card styling, and PNG export.",
      ],
      developmentNotes: "Guest access and visitor-supplied keys follow distinct generation paths. Input handling, local storage, and image export are the main engineering areas documented in this project. Saved decks belong to the current browser; cross-device library sync is not established.",
    },
    category: "Study tool",
    description:
      "A study tool that turns pasted notes or textbook images into summaries, simplified explanations, outlines, and flashcards with Gemini. Use limited guest access or bring your own API key.",
    techStack: ["HTML / CSS", "JavaScript", "Vite", "Gemini", "Cloudflare Pages Functions / KV / Turnstile"],
    status: "live",
    placement: "lead",
    highlights: [
      "Keep generated decks in a browser-based study library.",
      "Style study cards and export them as PNG images.",
    ],
    links: {
      demo: "https://openstudydeck.com/",
      source: "https://github.com/iamsaifkhan25/Open-Study-Deck",
    },
    coverImage: {
      src: "/projects/open-study-deck/home.webp",
      alt: "Open Study Deck home page with Launch Workstation and Configure API Key controls.",
      width: 1600,
      height: 785,
      caption: "The home page introduces guest access and the browser-first study workspace.",
    },
    screenshots: [
      {
        src: "/projects/open-study-deck/generated-workspace.webp",
        alt: "Open Study Deck workspace in guest mode, with a Rental Magica Wikipedia URL in the text input and a generated summary card beside the study-mode controls.",
        width: 1600,
        height: 770,
        caption: "Generated workspace with a summary card and controls for summaries, explanations, outlines, and flashcards.",
      },
      {
        src: "/projects/open-study-deck/library.webp",
        alt: "Study Library showing two locally saved Rental Magica decks: summary bullets and question-and-answer flashcards.",
        width: 1600,
        height: 775,
        caption: "The browser library holds generated study decks on the current computer.",
      },
    ],
  },
  {
    id: "echoscape-labs",
    order: 5,
    title: "EchoScape Labs",
    summary: "Local music shapes the motion and atmosphere of experimental 3D worlds in the browser.",
    caseStudy: {
      purpose: "Connect music with the movement and atmosphere of interactive 3D environments.",
      implementation: [
        "Web Audio utilities derive bass, mid, treble, and energy values from local audio.",
        "World configurations connect audio response with motion and lighting; existing renderers update each frame.",
        "A guest studio supports a session playlist of local audio files.",
      ],
      developmentNotes: "Mapping audio signals to distinct visual behavior is the central technical area in the existing prototype. Development is on hold, and the earlier world renderers remain the baseline. Planned worlds and roadmap features should not be read as shipped work.",
    },
    category: "Audio-reactive 3D",
    description:
      "A browser experience I built around music and 3D environments. Local audio drives the movement and atmosphere of WebGL worlds, from neon structures to snowfall and molten gold.",
    techStack: ["React", "TypeScript", "Vite", "Three.js / React Three Fiber", "Web Audio"],
    status: "on-hold",
    placement: "featured",
    highlights: [
      "A guest studio with a session playlist for local audio files.",
      "Existing world renderers form the prototype baseline.",
    ],
    limitation: "Development is on hold. Existing worlds and prototypes remain part of the work; planned experiences and features are not all shipped. Current demo availability is unconfirmed.",
    links: {},
  },
  {
    id: "ghost-data",
    order: 3,
    title: "HackerRank Orchestrate 2026",
    subtitle: "Python-Based Data Deletion Audit Agent",
    summary: "Trace deletion requests through identity history, evidence, policy, and explicit validation limits.",
    caseStudy: {
      purpose: "Develop an entry for the October 2026 HackerRank Orchestrate hackathon's deletion-audit challenge: determine what surviving records and identity history support at an audit timestamp.",
      implementation: [
        "Python and SQLite reconstruct identity history and link surviving records to source evidence, including PDF material read with pypdf.",
        "Evidence reconstruction, policy decisions, and CSV output-contract validation are separate stages.",
        "Diagnostic candidates stay separate from final output. Final output is written only when validation passes.",
      ],
      developmentNotes: "The documented candidate processed 518 requests, with 44 unresolved evaluation cases that fail local validation. Those cases remain explicit rather than being presented as successful decisions. This is a documented run, not a fresh measurement; the supplied CSV excerpts do not independently prove the unresolved-case count.",
    },
    category: "Evidence and policy audit",
    description:
      "An entry developed for the October 2026 HackerRank Orchestrate hackathon, not an official HackerRank product. This Python agent traces identity history and surviving records for deletion requests, then proposes remediation and verification steps with source references.",
    techStack: ["Python", "SQLite", "pypdf"],
    status: "hackathon-complete",
    placement: "featured",
    highlights: [
      "Reconstructs what the evidence supports at the audit timestamp.",
      "Keeps uncertain cases explicit and checks the CSV output contract.",
    ],
    limitation: "The hackathon attempt is complete. This best-effort candidate is not a fully valid final output or a production-ready service. No live deletion actions were executed.",
    links: {
      source: "https://github.com/iamsaifkhan25/October-Hackerrank-Orchestrate-2026",
    },
    pipeline: {
      stages: [
        { label: "Request", detail: "Read the deletion request." },
        { label: "Identity", detail: "Trace identity history." },
        { label: "Evidence", detail: "Link surviving records to sources." },
        { label: "Policy", detail: "Apply the audit-time rules." },
        { label: "Decision", detail: "Propose a status and next steps." },
        { label: "Validation", detail: "Check the CSV output contract." },
      ],
      results: [
        { value: "518", label: "Evaluation requests processed" },
        { value: "44", label: "Unresolved validation cases" },
      ],
      note: "Source-reported results from the documented evaluation run. INCOMPLETE is a deletion-status classification, not a program validation failure. The 44 unresolved validation cases are separate from legitimate deletion-status classifications. These counts do not establish successful audit decisions.",
    },
    screenshots: [
      {
        src: "/projects/ghost-data/output-csv.webp",
        alt: "HackerRank Orchestrate 2026 hackathon entry candidate CSV rows with deletion-status classifications and source-linked finding, remediation, and verification steps.",
        width: 1600,
        height: 618,
        caption: "Candidate output, not a validated final result. INCOMPLETE describes deletion status. Excel chrome, including a profile avatar, was cropped from this public copy.",
      },
      {
        src: "/projects/ghost-data/unresolved-csv.webp",
        alt: "A short CSV excerpt showing INCOMPLETE, COMPLETE, and NOT_APPLICABLE deletion-status rows, with evidence-linked steps or empty step lists.",
        width: 1600,
        height: 287,
        caption: "Supplied as UnresolvedCSV.png. This visible excerpt shows deletion-status rows; it does not independently demonstrate the 44 unresolved validation cases.",
      },
    ],
  },
  {
    id: "game-of-no-lore",
    order: 4,
    title: "Game of No Lore",
    summary: "A cozy Unity game taking shape through movement, animation, camera zones, and small interactions.",
    caseStudy: {
      purpose: "Build a cozy 3D game, starting with a playable movement and interaction prototype.",
      implementation: [
        "CharacterController movement connects camera-relative input with facing and turning.",
        "A movement-driven animation bridge connects velocity to the character's animation.",
        "Camera-zone triggers and a gate interaction connect changing views with interaction input.",
      ],
      developmentNotes: "Coordinating movement, facing, animation, and changing camera views is a concrete engineering area in the prototype. Playable status is owner-confirmed; this portfolio does not establish a publicly distributed build or a new Unity Play Mode test.",
    },
    category: "Cozy 3D game",
    description:
      "A cozy Unity game in active development. The playable prototype includes camera-relative movement, a movement-driven animation bridge, camera zones, and a gate interaction.",
    techStack: ["Unity", "C#", "URP", "Input System", "Cinemachine"],
    status: "in-development",
    placement: "additional",
    limitation: "A playable Unity prototype exists. The game has not been publicly released.",
    links: {
      source: "https://github.com/iamsaifkhan25/Game-Of-No-Lore",
    },
  },
  {
    id: "css-frosting",
    order: 2,
    title: "CSS Frosting",
    summary: "Experiment with glass effects in a live canvas, copy the styling code, and inspect existing CSS.",
    caseStudy: {
      purpose: "Provide a place to explore glassmorphism visually and inspect the styles behind blur, transparency, borders, and shadows.",
      implementation: [
        "A preview canvas derives glass styles from adjustable controls and component presets.",
        "The generator converts the chosen styles into code that can be copied into a project.",
        "A separate analyzer accepts CSS, Tailwind, and styled input and checks the main glass effects.",
      ],
      developmentNotes: "Keeping the preview, generated code, and analysis consistent across different style representations is the main engineering area documented here. The analyzer's scores describe its own style checks; they are not an independent accessibility assessment.",
    },
    category: "Styling and code generation",
    description:
      "A tool I built to experiment with glassmorphism. Adjust blur, transparency, borders, and shadows in a preview canvas, explore presets, and copy styling code. A separate analyzer checks pasted styles for the main glass effects.",
    techStack: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    status: "live",
    placement: "featured",
    links: {
      demo: "https://cssfrosting.com",
      source: "https://github.com/iamsaifkhan25/CSS-frosting",
    },
    coverImage: {
      src: "/projects/css-frosting/home.webp",
      alt: "CSS Frosting home page with a glass-style demo card and links to launch the canvas or explore layouts.",
      width: 1600,
      height: 777,
      caption: "CSS Frosting home page and interactive glass-style demo.",
      version: "v2.0 shown in the interface",
    },
    screenshots: [
      {
        src: "/projects/css-frosting/generator-preview.webp",
        alt: "CSS Frosting generator with component presets, tint and opacity controls, a glass card preview, and generated CSS. Preview cardholder details are masked.",
        width: 1600,
        height: 776,
        caption: "Generator preview with styling controls and CSS output. Preview cardholder name, card suffix, and expiry are masked as a precaution.",
        version: "v2.0 shown in the interface",
      },
      {
        src: "/projects/css-frosting/analyzer-result.webp",
        alt: "CSS Frosting analyzer showing CSS input, a glass preview, and scores for backdrop blur, translucency, frosted edge, and depth shadow.",
        width: 1600,
        height: 777,
        caption: "Analyzer input, preview, and the tool's own style scores; these are not an independent accessibility assessment.",
        version: "v2.0 shown in the interface",
      },
    ],
  },
];
