import React from "react";
import Link from "next/link";
import { ArrowRight, FileText, Cpu, Sparkles, Terminal, Code } from "lucide-react";
import GlassCard from "@/components/GlassCard";

export default function Home() {
  return (
    <div className="flex flex-col gap-16 md:gap-24 animate-fade-in">
      {/* Hero Section */}
      <section className="flex flex-col items-center text-center gap-6 md:gap-8 pt-6 md:pt-12">
        {/* Introduction badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-indigo-500/25 bg-indigo-500/5 text-xs font-semibold text-indigo-300 tracking-wider uppercase shadow-[0_0_15px_rgba(99,102,241,0.05)]">
          <Sparkles size={12} className="text-indigo-400" />
          <span>Building & Learning</span>
        </div>

        {/* Hero Title */}
        <div className="flex flex-col gap-3 max-w-3xl">
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent pb-1">
            Saif Khan
          </h1>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight bg-gradient-to-r from-indigo-300 via-violet-300 to-indigo-400 bg-clip-text text-transparent">
            I build things I&apos;m curious about.
          </h2>
        </div>

        {/* Catchphrase */}
        <p className="max-w-2xl text-base sm:text-lg md:text-xl text-slate-400 leading-relaxed font-light">
          Web tools, interactive experiences, little experiments, and sometimes entire game worlds.
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

      {/* Background, learning, and workflow */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <GlassCard className="flex flex-col gap-4">
          <div className="h-10 w-10 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
            <Cpu size={20} />
          </div>
          <h3 className="text-lg font-bold text-slate-100">Where I Started</h3>
          <p className="text-slate-400 text-sm leading-relaxed">
            My background is in partner operations, but over time I&apos;ve found myself drawn more and more toward building things of my own.
          </p>
        </GlassCard>

        <GlassCard className="flex flex-col gap-4">
          <div className="h-10 w-10 rounded-lg bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-400">
            <Code size={20} />
          </div>
          <h3 className="text-lg font-bold text-slate-100">Learning as I Go</h3>
          <p className="text-slate-400 text-sm leading-relaxed">
            I&apos;m still learning. Some projects work out beautifully, others teach me what not to do, and there&apos;s usually another idea waiting before I&apos;ve finished the last one.
          </p>
        </GlassCard>

        <GlassCard className="flex flex-col gap-4">
          <div className="h-10 w-10 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
            <Terminal size={20} />
          </div>
          <h3 className="text-lg font-bold text-slate-100">How I Work</h3>
          <p className="text-slate-400 text-sm leading-relaxed">
            I use AI coding tools as part of how I work. They help me explore, prototype, and tackle things I couldn&apos;t have built as quickly on my own. But I still have to understand what I&apos;m making, make decisions, test the results, and figure out what to fix when something breaks.
          </p>
        </GlassCard>
      </section>
      <p className="max-w-3xl mx-auto text-center text-base sm:text-lg text-slate-300 leading-relaxed">
        <strong>This is a collection of what I&apos;ve built, what I&apos;m learning, and what I&apos;m working on next.</strong>
      </p>
    </div>
  );
}
