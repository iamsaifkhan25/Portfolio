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
  readonly title?: string;
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
    readonly story: readonly string[];
    readonly purpose: string;
    readonly features: readonly string[];
    readonly workflow?: readonly { readonly title: string; readonly detail: string }[];
    readonly implementation: readonly string[];
    readonly decisions: readonly string[];
    readonly results: readonly string[];
    readonly lessons?: readonly string[];
    readonly futureWork?: readonly string[];
  };
}

export const projectStatusLabels: Record<ProjectStatus, string> = {
  live: "Live website",
  "in-development": "In development",
  "hackathon-complete": "Hackathon complete",
  "on-hold": "On hold",
};

// Owner-confirmed statuses and link decisions: docs/MILESTONE_2B_PROJECT_EVIDENCE.md.
// Owner-approved first-person stories: docs/PROJECT_CASE_STUDIES.md (Milestone 3A.4).
// Capture guide: docs/PROJECT_IMAGES.md.
// Source links must be public. Owner-confirmed site URLs remain valid when automated
// checks are inconclusive. Image provenance: docs/PROJECT_IMAGES.md and project-image-manifest.json.
export const projects: readonly Project[] = [
  {
    id: "open-study-deck",
    order: 1,
    title: "Open Study Deck",
    summary: "Turn notes and textbook images into study cards, then keep them in a browser library.",
    caseStudy: {
      story: [
        "Open Study Deck started with a conversation with my sister about using Gemini to make study notes.",
        "I wondered whether I could turn that process into something simpler: a free tool where students could create useful study materials without needing to understand prompts, configure a complicated application, or pay for a subscription.",
        "The project grew into a browser-first study tool with summaries, detailed outlines, simple explanations, and flashcards.",
        "I wanted to keep it ad-free and inexpensive to operate, so the design avoids a traditional account-and-database system. I later added limited guest access alongside the option to bring your own API key.",
        "It's a live product that I'm still learning from and improving.",
      ],
      purpose: "Turn notes and textbook images into study material in one workspace, then return to earlier decks in the same browser.",
      features: [
        "Summarize produces bullet highlights; ELI5 gives a simplified explanation and analogy; Detailed Outline organizes topics hierarchically; Flashcards creates question-and-answer cards.",
        "Card themes change the presentation, and PNG export captures the styled canvas in the browser.",
      ],
      workflow: [
        { title: "Choose access and input", detail: "Open the workstation with limited Guest Access or your own Gemini API key, then paste notes or upload a textbook image." },
        { title: "Generate and review", detail: "Choose one of the four study modes, generate the deck, and review the result before using it to study." },
        { title: "Keep or export", detail: "Return to saved decks in the current browser's library, adjust the card theme, or download a PNG." },
      ],
      implementation: [
        "HTML, CSS, and JavaScript modules form the Vite frontend. Guest generation uses a Cloudflare Pages Function, Turnstile bot checks, and a KV daily quota before calling Gemini.",
        "BYOK generation goes directly from the browser to Google Gemini. Deck history and preferences use localStorage; html2canvas-pro renders PNG exports from the card canvas.",
      ],
      decisions: [
        "Keeping decks in the browser avoids an account and cloud deck database, but limits the library to that browser. Generation still sends content to Gemini, through the guest gateway or directly with the visitor's key.",
        "A visitor's key stays in sessionStorage by default; remembering it on the device requires opting in. Analytics is consent-gated and excludes study content, generated answers, and keys. These describe the documented design, rather than an independent privacy audit.",
      ],
      results: [
        "The live tool brings generation, card presentation, a browser library, and PNG export into one workflow. The supplied workspace and library captures show generated summaries and saved Q&A decks.",
        "PNG export still has a known rendering issue: text overlaps in the supplied exported card. That issue remains unresolved; the workspace and library images show the in-app cards, not a corrected export.",
        "AI-generated material needs review. The library belongs to the current browser; local storage does not provide cross-device sync and clearing it removes saved decks.",
      ],
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
        title: "From input to a generated study deck",
        alt: "Open Study Deck workspace in guest mode, with a Rental Magica Wikipedia URL in the text input and a generated summary card beside the study-mode controls.",
        width: 1600,
        height: 770,
        caption: "Generated workspace with a summary card and controls for summaries, explanations, outlines, and flashcards.",
      },
      {
        src: "/projects/open-study-deck/library.webp",
        title: "Returning to saved material",
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
      story: [
        "I didn't want to build another music visualizer. I wanted to build an experience.",
        "EchoScape Labs explored the idea that music could become an environment you step into, rather than something you only hear or watch.",
        "The application lets users select local audio and explore browser-based 3D environments that react to sound. Different environments were designed around different moods, from quiet snowfall to neon energy and flowing gold.",
        "I worked on the experience studio, the visual worlds, the interface, and the way users move between selecting music and entering an experience.",
        "Development is currently on hold. The work that exists remains part of my exploration of interactive 3D experiences.",
      ],
      purpose: "Select a local track, choose a visual world, and enter an environment shaped by the music's changing energy.",
      features: [
        "Existing WebGL worlds include neon structures, snowfall, sakura, a nebula, and liquid-gold visuals, each with its own motion and atmosphere.",
        "The guest studio accepts local audio files in a session playlist to drive those environments.",
      ],
      implementation: [
        "React, TypeScript, and Vite provide the application shell. Three.js and React Three Fiber render the worlds; Web Audio utilities derive bass, mid, treble, and energy values from local audio.",
        "World configurations connect those signals to audio response, motion, and lighting, with renderers updating each frame.",
      ],
      decisions: [
        "Audio analysis and world-specific visual settings are separate, allowing each environment to interpret the same signals differently. The shared audio stream clamps numeric values to a finite 0–1 range.",
        "Each world has its own motion and lighting settings, so a track can shape different visual moods rather than drive the same effect in every scene.",
      ],
      results: [
        "The built foundation includes audio-reactive WebGL worlds and a guest studio with local playback. The supplied screenshots show the studio, world menu, and Liquid Gold environment. Development is on hold, and current demo availability remains unconfirmed.",
        "The existing worlds form an experimental foundation. The wider roadmap is unfinished, and the screenshots do not establish playback performance across devices.",
      ],
      futureWork: [
        "Dream Aria and Pixel Dance are planned experiences in the inspected roadmap. Payments, video export, desktop wallpapers, and other roadmap features are not presented as shipped.",
      ],
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
    coverImage: {
      src: "/projects/echoscape-labs/home.webp",
      alt: "EchoScape Labs home page with the heading Turn sound into immersive worlds, a luminous ring, and Start Studio and Explore Worlds controls.",
      width: 1600,
      height: 781,
      caption: "The home page introduces the music-driven world concept. This supplied capture does not confirm current demo availability.",
    },
    screenshots: [
      {
        src: "/projects/echoscape-labs/experience-studio.webp",
        title: "Experience Studio: start with a song",
        alt: "EchoScape Experience Studio at step one, Add Songs, showing a local audio drop zone and Choose Audio File control.",
        width: 1600,
        height: 778,
        caption: "The studio starts with local audio, followed by choosing a world and entering the experience.",
      },
      {
        src: "/projects/echoscape-labs/worlds.webp",
        title: "The available-world listing",
        alt: "EchoScape world cards for Cyber Neon, Aurora Snowfall, Blue Hour Sakura, Cosmic Nebula, and Liquid Gold, each with an Enter World control.",
        width: 1600,
        height: 781,
        caption: "Worlds listed in the supplied interface capture. The repeated ring illustrations are menu artwork, not screenshots of each environment.",
      },
      {
        src: "/projects/echoscape-labs/choose-world.webp",
        title: "Choosing the setting for the music",
        alt: "Experience Studio at step two, Choose a World, with a local audio filename, four full world cards, and part of the selected Liquid Gold card below.",
        width: 1600,
        height: 815,
        caption: "The next studio step pairs the selected local track with a world. The original capture includes only the top of the Liquid Gold card.",
      },
      {
        src: "/projects/echoscape-labs/liquid-gold.webp",
        title: "Inside Liquid Gold",
        alt: "Liquid Gold experience showing a stream of gold particles in a dark viewport, world selection, camera controls, settings, and an audio transport bar.",
        width: 1600,
        height: 811,
        caption: "A genuine in-world Liquid Gold capture. A still image shows the environment and controls; it does not demonstrate audio response or playback performance.",
      },
    ],
  },
  {
    id: "ghost-data",
    order: 3,
    title: "HackerRank Orchestrate 2026",
    subtitle: "Python-Based Data Deletion Audit Agent",
    summary: "Trace deletion requests through identity history, evidence, policy, and explicit validation limits.",
    caseStudy: {
      story: [
        "I built a Python-based deletion audit agent for the October 2026 HackerRank Orchestrate challenge.",
        "The task was to determine whether personal information had actually been deleted across different systems. A process saying that deletion was successful wasn't necessarily enough.",
        "The project examined identity history, available records, timestamps, and retention policies to produce structured findings and proposed remediation and verification steps.",
        "The final candidate processed 518 evaluation requests, but 44 cases remained unresolved and failed the required output contract.",
        "It was a substantial experiment in evidence handling and automated decision-making, but it was not a fully valid final solution or a production service.",
      ],
      purpose: "A deletion workflow can report completion while records survive in a replica, search index, export, or backup. The hackathon challenge was to reconstruct what identity history and surviving evidence establish at each request's audit timestamp.",
      features: [
        "Distinguishes deletion requests from access requests, corrections, and marketing opt-outs before proposing deletion-related steps.",
        "Traces current and historical identifiers, links surviving records to sources, and proposes ordered findings, remediation, and verification checks.",
        "Exports case_id, deletion_status, and steps_json in CSV, with explicit diagnostics for uncertain or unsupported decisions.",
      ],
      implementation: [
        "The final Python runtime is deterministic. Evidence extraction covers structured data, logs, text, text-layer PDFs via pypdf, and checked screenshot transcriptions. SQL snapshots are read in an isolated in-memory SQLite database.",
        "Time-bounded identity aliases and source observations feed policy decisions. A separate validator checks CSV structure, step ordering, citation availability, and remediation-to-verification coverage.",
      ],
      decisions: [
        "A relationship linking a subject to a resource does not prove that resource's state. Likewise, a clean primary record does not erase evidence of a surviving replica, and a later capture cannot prove an earlier state.",
        "Diagnostic candidate generation is separate from strict final writing. The final writer only replaces output after every row passes validation; failed candidates retain their diagnostics without overwriting existing output.",
      ],
      results: [
        "The source-reported candidate processed 518 requests, with 44 unresolved validation cases. It did not fully satisfy the output contract. The strict final gate failed; a preserved candidate file is not evidence of a successful final export.",
        "INCOMPLETE is a deletion-status classification, separate from unresolved validation cases. The CSV excerpts show candidate rows; they do not independently prove the 44-case count or successful audit decisions.",
        "The hackathon attempt is complete. The tool proposes actions without connecting to live systems or deleting data, and is not a production-ready compliance solution.",
      ],
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
        title: "Source-linked candidate output",
        alt: "HackerRank Orchestrate 2026 hackathon entry candidate CSV rows with deletion-status classifications and source-linked finding, remediation, and verification steps.",
        width: 1600,
        height: 618,
        caption: "Candidate output, not a validated final result. INCOMPLETE describes deletion status. Excel chrome, including a profile avatar, was cropped from this public copy.",
      },
      {
        src: "/projects/ghost-data/unresolved-csv.webp",
        title: "Deletion status and validation are separate",
        alt: "A short CSV excerpt showing INCOMPLETE, COMPLETE, and NOT_APPLICABLE deletion-status rows, with evidence-linked steps or empty step lists.",
        width: 1600,
        height: 287,
        caption: "Supplied as UnresolvedCSV.png. This visible excerpt shows deletion-status rows; it does not independently demonstrate the 44 unresolved validation cases.",
      },
      {
        src: "/projects/ghost-data/december-2026-event-context.webp",
        title: "Later event context: December 2026 Holiday Edition",
        alt: "HackerRank Orchestrate Holiday Edition event page with winter scenery and a December 12 start date; this is a later edition than the October 2026 project.",
        width: 1600,
        height: 811,
        caption: "December 2026 Holiday Edition, shown only as illustrative event context because the original October page was unavailable. This project was developed for October 2026. This screenshot does not indicate December participation, official HackerRank affiliation, or an award.",
      },
    ],
  },
  {
    id: "game-of-no-lore",
    order: 4,
    title: "Game of No Lore",
    summary: "An early Unity prototype with one house asset and experiments in movement, cameras, and materials.",
    caseStudy: {
      story: [
        "Game of No Lore started with a place I wanted to return to: my grandparents' house.",
        "The house had been sold, but I still remembered its layout, the courtyard, the narrow passage, the handpump, and the little details that made it familiar.",
        "I wanted to recreate some of that feeling through a small game.",
        "The idea is to spend fourteen days in Shila, a fictional village inspired by my grandparents' home, exploring, meeting people, helping with ordinary things, and eventually returning to city life.",
        "Right now, the project is still in its earliest technical stage. I've worked on the house asset, brought a prototype character into Unity, and experimented with materials, movement, camera zones, lighting, and basic interactions.",
        "There isn't a complete village or finished gameplay system yet.",
        "For me, this project is as much about learning to make a game as it is about preserving the memory that inspired one.",
      ],
      purpose: "Explore the feel of a small, familiar place through one house asset, a prototype character, and a test environment. The fourteen-day village story remains the intended direction.",
      features: [
        "One house asset, a prototype character, and a small test environment support material and lighting experiments. The planned village is still future work.",
        "The owner-confirmed playable prototype supports camera-relative movement, character facing and turning, and movement-driven animation.",
        "Camera zones change the view as the player moves through the scene, and a gate supports interaction input.",
      ],
      implementation: [
        "Unity and C# provide the prototype systems, with URP rendering, the Input System, and Cinemachine in the project stack.",
        "CharacterController movement connects camera-relative input to facing and turning. A separate animation bridge reads movement, camera-zone triggers switch views, and gate logic handles interaction input.",
      ],
      decisions: [
        "The movement controller holds the camera's horizontal heading while movement input is held, then takes a new reference after release. Large direction changes pause forward movement while the character turns. Animation reads the controller's actual horizontal velocity rather than input alone.",
        "Materials and lighting are early visual experiments around the house and test environment. Movement, camera zones, and the gate are prototype interactions; broader gameplay systems remain planned.",
      ],
      results: [
        "The current result is an early playable Unity prototype with one house asset and a prototype character and environment. The game has not been publicly released, and the village and broader gameplay systems are not complete.",
        "Movement, animation, changing camera views, and the gate remain prototype experiments. They are the starting point for the game, while village life and other activities remain future work.",
      ],
      futureWork: [
        "The broader cozy village experience is the intended direction. Village life and additional activities remain future scope; only the prototype systems described above are presented as implemented.",
      ],
    },
    category: "Cozy 3D game",
    description:
      "An early Unity prototype for a cozy game. I have developed one house asset and a prototype character and environment, with experiments in materials, lighting, camera-relative movement, camera zones, and a gate interaction.",
    techStack: ["Unity", "C#", "URP", "Input System", "Cinemachine"],
    status: "in-development",
    placement: "additional",
    limitation: "Early prototype, not publicly released. Only one house asset and a prototype character and environment have been developed; the village and broader gameplay systems remain planned.",
    links: {
      source: "https://github.com/iamsaifkhan25/Game-Of-No-Lore",
    },
    // Genuine Unity capture slots: gameplay overview, camera-zone transition, gate.
    // Empty until reviewed Play Mode/build captures have real paths and metadata.
    screenshots: [],
  },
  {
    id: "css-frosting",
    order: 2,
    title: "CSS Frosting",
    summary: "Experiment with glass effects in a live canvas, copy the styling code, and inspect existing CSS.",
    caseStudy: {
      story: [
        "CSS Frosting is a tool for experimenting with glassmorphic interfaces without repeatedly writing and adjusting every CSS property by hand.",
        "What began as a collection of reusable styling presets developed into a visual playground where users can adjust blur, transparency, borders, and other properties, preview the results, and export styling code.",
        "I also added a code analyzer to examine whether submitted styles contain common glassmorphism properties.",
        "It gave me a chance to work on an interactive visual tool rather than another conventional website.",
      ],
      purpose: "Explore glassmorphism visually and inspect the styles behind blur, transparency, borders, and shadows, then copy the code for use in a real interface.",
      features: [
        "A generator combines component presets with live tint, opacity, blur, border, and shadow controls, showing the result on a preview canvas.",
        "Copy the generated styling as CSS, Tailwind, or styled output to use in a project.",
        "The analyzer accepts pasted CSS, Tailwind utilities, or styled input and checks backdrop blur, translucency, frosted edges, and depth shadows.",
      ],
      workflow: [
        { title: "Build a glass style", detail: "Choose a component preset, adjust the live controls, and inspect the preview against a background." },
        { title: "Take the code with you", detail: "Select an output format and copy the styling into your project, where it can be checked in context." },
        { title: "Inspect existing styles", detail: "Paste code into the analyzer to view its preview and glass-effect scores." },
      ],
      implementation: [
        "Next.js, React, TypeScript, and Tailwind CSS form the interface. The generator derives preview styles from the control values and converts the same choices into export formats.",
        "The analyzer parses supported style input and evaluates the properties behind the main glass effects, alongside a rendered preview.",
      ],
      decisions: [
        "Preview, exported code, and analysis need to agree across style representations. The generator and analyzer expose both the visual result and the underlying code so they can be inspected together.",
        "The analyzer's scores describe its own glass-style checks. They are not an independent accessibility assessment or a substitute for checking contrast and behavior in the destination interface.",
      ],
      results: [
        "The site is live at the owner-confirmed URL. Genuine v2.0 captures show the generator, styling controls, code output, and analyzer result.",
        "The analyzer covers supported style inputs and its glass-effect checks. Copied styles still need review in their destination interface, where the surrounding background affects transparency and blur.",
      ],
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
        title: "Controls, preview, and code together",
        alt: "CSS Frosting generator with component presets, tint and opacity controls, a glass card preview, and generated CSS. Preview cardholder details are masked.",
        width: 1600,
        height: 776,
        caption: "Generator preview with styling controls and CSS output. Preview cardholder name, card suffix, and expiry are masked as a precaution.",
        version: "v2.0 shown in the interface",
      },
      {
        src: "/projects/css-frosting/analyzer-result.webp",
        title: "Inspecting an existing style",
        alt: "CSS Frosting analyzer showing CSS input, a glass preview, and scores for backdrop blur, translucency, frosted edge, and depth shadow.",
        width: 1600,
        height: 777,
        caption: "Analyzer input, preview, and the tool's own style scores; these are not an independent accessibility assessment.",
        version: "v2.0 shown in the interface",
      },
    ],
  },
];
