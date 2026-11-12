import { Cpu } from "lucide-react";
import GlassCard from "@/components/GlassCard";
import ProjectShowcase from "@/components/ProjectShowcase";
import { projects } from "@/data/projects";

const orderedProjects = [...projects].sort((a, b) => a.order - b.order);

export default function ProjectsPage() {
  return (
    <div className="flex flex-col gap-10 md:gap-14 animate-fade-in">
      <div className="border-b border-white/5 pb-6">
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
          Projects<span className="text-indigo-400">.</span>
        </h1>
        <p className="text-slate-400 text-sm md:text-base mt-3 max-w-2xl leading-relaxed">
          Tools, experiments, and a game I&apos;m slowly building. Each one has given me
          something different to work through, and there&apos;s still more to learn.
        </p>
      </div>

      <section aria-labelledby="featured-projects-title" className="flex flex-col gap-5">
        <div>
          <h2 id="featured-projects-title" className="text-xl md:text-2xl font-bold text-slate-100">Featured projects</h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-400">Open a project to explore the work, the details, and what&apos;s still in progress.</p>
        </div>
        <ProjectShowcase projects={orderedProjects} />
      </section>

      <GlassCard className="border border-indigo-500/20 bg-indigo-950/10 shadow-[0_0_30px_rgba(99,102,241,0.05)] relative overflow-hidden" hoverEffect={false}>
        <div aria-hidden="true" className="absolute top-0 right-0 p-8 opacity-5 text-indigo-400 pointer-events-none hidden md:block">
          <Cpu size={120} />
        </div>
        <div className="flex flex-col gap-4 relative z-10">
          <div className="flex items-center gap-2 text-indigo-400">
            <Cpu size={20} className="shrink-0" aria-hidden="true" />
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
    </div>
  );
}
