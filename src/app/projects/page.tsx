import React from "react";
import { ExternalLink, Cpu, Layers } from "lucide-react";
import GlassCard from "@/components/GlassCard";

export default function ProjectsPage() {
  const projects = [
    {
      title: "CSS Frosting",
      subtitle: "Glassmorphism Styling Tool",
      description:
        "A tool for experimenting with glassmorphic styles, previewing presets, and exporting styling code. The repository includes a code analyzer, account features, and a Razorpay checkout flow for paid access.",
      techStack: ["Next.js", "React 19", "TypeScript", "Tailwind CSS", "Supabase", "Razorpay", "OpenNext / Cloudflare Workers"],
      url: "https://cssfrosting.com",
      highlights: [
        "Adjust and preview glassmorphic styling in an interactive canvas",
        "Export CSS, Tailwind classes, styled-components, or React inline styles",
        "Explore presets and check styling with the code analyzer",
      ],
    },
    {
      title: "Open Study Deck",
      subtitle: "Browser-Based AI Study Card Studio",
      description:
        "Turn pasted notes or textbook images into flashcards, summaries, and outlines with Google Gemini. Use limited guest access or your own API key, keep a study library in your browser, and export styled cards as PNG images. An optional Razorpay donation flow is included.",
      techStack: ["HTML / CSS", "JavaScript", "Vite", "Google Gemini", "Cloudflare Pages Functions", "Cloudflare KV / Turnstile", "Razorpay"],
      url: "https://openstudydeck.com",
      highlights: [
        "Generate study material from text or images in four study modes",
        "Save decks in the browser and export styled cards as PNGs",
        "Choose guest generation or bring your own Gemini API key",
      ],
    },
  ];

  return (
    <div className="flex flex-col gap-10 md:gap-14 animate-fade-in">
      {/* Page Header */}
      <div className="border-b border-white/5 pb-6">
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
          Projects
          <span className="text-indigo-400">.</span>
        </h1>
        <p className="text-slate-400 text-sm md:text-base mt-2">
          Tools I&apos;ve built and continue to learn from.
        </p>
      </div>

      {/* AI workflow disclosure */}
      <GlassCard className="border border-indigo-500/20 bg-indigo-950/10 shadow-[0_0_30px_rgba(99,102,241,0.05)] relative overflow-hidden" hoverEffect={false}>
        <div className="absolute top-0 right-0 p-8 opacity-5 text-indigo-400 pointer-events-none hidden md:block">
          <Cpu size={120} />
        </div>
        <div className="flex flex-col gap-4 relative z-10">
          <div className="flex items-center gap-2 text-indigo-400">
            <Cpu size={20} className="shrink-0" />
            <h2 className="text-lg font-bold tracking-wide uppercase">How I Use AI Tools</h2>
          </div>
          <p className="text-slate-300 text-sm md:text-base leading-relaxed font-light">
            I use Codex and Claude Code to help explore ideas, understand unfamiliar code, prototype,
            and work through bugs. I&apos;m still learning, and AI assistance is part of that process.
            I remain responsible for what I build: the design decisions, understanding the changes,
            testing the results, and iterating when something doesn&apos;t work.
          </p>
        </div>
      </GlassCard>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((project, index) => (
          <GlassCard key={index} className="flex flex-col h-full">
            <div className="flex flex-col flex-1 gap-4">
              {/* Title & Badge */}
              <div className="flex justify-between items-start gap-4">
                <div>
                  <h3 className="text-xl font-bold text-slate-100">{project.title}</h3>
                  <p className="text-xs text-indigo-400 mt-1">{project.subtitle}</p>
                </div>
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/8 bg-white/3 hover:bg-indigo-500/25 hover:border-indigo-500/30 hover:text-indigo-300 text-slate-400 transition-all duration-300"
                  aria-label={`Visit ${project.title} (opens in a new tab)`}
                  title="Visit Website"
                >
                  <ExternalLink size={14} />
                </a>
              </div>

              {/* Description */}
              <p className="text-slate-400 text-xs md:text-sm leading-relaxed font-light">
                {project.description}
              </p>

              {/* Highlights */}
              <div className="flex flex-col gap-2 bg-white/3 rounded-xl p-4 border border-white/5">
                <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Layers size={12} className="text-indigo-400" />
                  Key Highlights
                </span>
                <ul className="flex flex-col gap-1.5 text-xs text-slate-400 font-light">
                  {project.highlights.map((highlight, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-indigo-500 shrink-0 mt-1.5" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tech Badges */}
              <div className="flex flex-wrap gap-1.5 mt-auto pt-4">
                {project.techStack.map((tech, idx) => (
                  <span
                    key={idx}
                    className="text-[10px] font-semibold uppercase tracking-wider text-slate-300 bg-white/5 border border-white/5 rounded-full px-2.5 py-0.5"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
