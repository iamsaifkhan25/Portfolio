import React from "react";
import { ExternalLink, Cpu, Layers, CheckCircle } from "lucide-react";
import GlassCard from "@/components/GlassCard";

export default function ProjectsPage() {
  const projects = [
    {
      title: "casfrosting.com",
      subtitle: "Commercial UI Assets & CSS Presets Platform",
      description:
        "A live commercial web application engineered and deployed end-to-end utilizing advanced agentic AI workflows. The platform operates on a premium monetization model, selling high-quality paid CSS presets directly to developers, validating its real-world user demand, commercial viability, and product-market fit.",
      techStack: ["Next.js", "React 19", "Tailwind CSS", "Stripe Checkout", "Agentic Engineering"],
      url: "https://casfrosting.com",
      highlights: [
        "Monetized via premium, paid developer-focused CSS styling packages",
        "Direct proof of product validation and commercial transaction safety",
        "Engineered with modular, high-speed cached code for optimal conversions",
      ],
    },
    {
      title: "openstudydeck.com",
      subtitle: "Full-Stack Learning & Study Platform (Community Funded)",
      description:
        "A full-stack learning companion application focusing on streamlined digital studying. Features robust spaced-repetition card decks and study metrics. It implements an active community donation integration ('Buy Me a Coffee') to self-fund server infrastructure, demonstrating user-first design and community support.",
      techStack: ["React", "TypeScript", "Node.js API", "Community Donation Flows", "User Analytics"],
      url: "https://openstudydeck.com",
      highlights: [
        "Sustained via community donations ('Buy Me a Coffee') to offset operations",
        "User-first learning tool validating clean full-stack architectural design",
        "Integrated client deck customization with minimal storage footings",
      ],
    },
  ];

  return (
    <div className="flex flex-col gap-10 md:gap-14 animate-fadeIn">
      {/* Page Header */}
      <div className="border-b border-white/5 pb-6">
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
          Live Deployed Projects
          <span className="text-indigo-400">.</span>
        </h1>
        <p className="text-slate-400 text-sm md:text-base mt-2">
          Deep-dive showcase of premium applications built and shipped to production.
        </p>
      </div>

      {/* Tech Narrative Banner */}
      <GlassCard className="border border-indigo-500/20 bg-indigo-950/10 shadow-[0_0_30px_rgba(99,102,241,0.05)] relative overflow-hidden" hoverEffect={false}>
        <div className="absolute top-0 right-0 p-8 opacity-5 text-indigo-400 pointer-events-none hidden md:block">
          <Cpu size={120} />
        </div>
        <div className="flex flex-col gap-4 relative z-10">
          <div className="flex items-center gap-2 text-indigo-400">
            <Cpu size={20} className="shrink-0" />
            <h2 className="text-lg font-bold tracking-wide uppercase">AI Agent Development Narrative</h2>
          </div>
          <p className="text-slate-300 text-sm md:text-base leading-relaxed font-light">
            These live applications are built by leveraging state-of-the-art AI agents (such as{" "}
            <code className="text-indigo-300 bg-indigo-500/10 border border-indigo-500/20 px-1.5 py-0.5 rounded text-xs">agy</code> and{" "}
            <code className="text-indigo-300 bg-indigo-500/10 border border-indigo-500/20 px-1.5 py-0.5 rounded text-xs">ccd</code>) as core development partners. 
            This agentic development paradigm maximizes **shipping velocity**, ensures **clean modular architecture**, and allows **rapid prototyping** that is fully production-ready from the very first commit.
          </p>
          <div className="flex flex-wrap gap-4 mt-1 text-xs text-slate-400">
            <div className="flex items-center gap-1.5">
              <CheckCircle size={12} className="text-emerald-400" />
              <span>10x Prototyping Speed</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle size={12} className="text-emerald-400" />
              <span>Rigorous Linting & Tests</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle size={12} className="text-emerald-400" />
              <span>Sleek, Production-Ready Deploys</span>
            </div>
          </div>
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
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/8 bg-white/3 hover:bg-indigo-500/25 hover:border-indigo-500/30 hover:text-indigo-300 text-slate-400 transition-all duration-300"
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
