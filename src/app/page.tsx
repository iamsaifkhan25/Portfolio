import React from "react";
import Link from "next/link";
import { ArrowRight, FileText, Cpu, Sparkles, Terminal, Code } from "lucide-react";
import GlassCard from "@/components/GlassCard";

export default function Home() {
  return (
    <div className="flex flex-col gap-16 md:gap-24 animate-fadeIn">
      {/* Hero Section */}
      <section className="flex flex-col items-center text-center gap-6 md:gap-8 pt-6 md:pt-12">
        {/* Subtle AI badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-indigo-500/25 bg-indigo-500/5 text-xs font-semibold text-indigo-300 tracking-wider uppercase shadow-[0_0_15px_rgba(99,102,241,0.05)]">
          <Sparkles size={12} className="text-indigo-400" />
          <span>Next-Gen Development</span>
        </div>

        {/* Hero Title */}
        <div className="flex flex-col gap-3 max-w-3xl">
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent pb-1">
            Saif Khan
          </h1>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight bg-gradient-to-r from-indigo-300 via-violet-300 to-indigo-400 bg-clip-text text-transparent">
            AI-Driven Full-Stack Developer & Product Builder
          </h2>
        </div>

        {/* Catchphrase */}
        <p className="max-w-2xl text-base sm:text-lg md:text-xl text-slate-400 leading-relaxed font-light">
          Leveraging advanced agentic AI workflows to engineer, prototype, and deploy live full-stack applications.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-4 w-full sm:w-auto px-4 justify-center">
          <Link
            href="/projects"
            className="glass-btn-primary flex items-center justify-center text-base"
          >
            Explore Projects
            <ArrowRight size={18} />
          </Link>
          <Link
            href="/resume"
            className="glass-btn flex items-center justify-center text-base"
          >
            View Resume
            <FileText size={18} className="text-slate-400" />
          </Link>
        </div>
      </section>

      {/* Philosophy / Features Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <GlassCard className="flex flex-col gap-4">
          <div className="h-10 w-10 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
            <Cpu size={20} />
          </div>
          <h3 className="text-lg font-bold text-slate-100">Agentic Development</h3>
          <p className="text-slate-400 text-sm leading-relaxed">
            Harnessing state-of-the-art AI coding agents to multiply production speed, enabling rapid shipping and iterate-to-deploy cycles.
          </p>
        </GlassCard>

        <GlassCard className="flex flex-col gap-4">
          <div className="h-10 w-10 rounded-lg bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-400">
            <Code size={20} />
          </div>
          <h3 className="text-lg font-bold text-slate-100">Clean Architecture</h3>
          <p className="text-slate-400 text-sm leading-relaxed">
            Prioritizing modular React components, type safety with TypeScript, and optimal web performance configurations out of the box.
          </p>
        </GlassCard>

        <GlassCard className="flex flex-col gap-4">
          <div className="h-10 w-10 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
            <Terminal size={20} />
          </div>
          <h3 className="text-lg font-bold text-slate-100">Full-Stack Capability</h3>
          <p className="text-slate-400 text-sm leading-relaxed">
            From modern App Router frontends to serverless database backends, handling data structures, APIs, and complex deployments.
          </p>
        </GlassCard>
      </section>
    </div>
  );
}
