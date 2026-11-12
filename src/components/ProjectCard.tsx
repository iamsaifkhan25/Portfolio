import Image from "next/image";
import { ArrowUpRight, Code2 } from "lucide-react";
import GlassCard from "@/components/GlassCard";
import ProjectPipeline from "@/components/ProjectPipeline";
import type { Project, ProjectImage, ProjectStatus } from "@/data/projects";

const statusLabels: Record<ProjectStatus, string> = {
  live: "Live website",
  "in-development": "In development",
  "hackathon-complete": "Hackathon complete",
  "on-hold": "On hold",
};

function ProjectFigure({ screenshot, sizes }: { screenshot: ProjectImage; sizes: string }) {
  return (
    <figure>
      <a
        href={screenshot.src}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Open screenshot: ${screenshot.alt} (opens in a new tab)`}
        className="block rounded-xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-indigo-300"
      >
        <Image
          src={screenshot.src}
          alt={screenshot.alt}
          width={screenshot.width}
          height={screenshot.height}
          sizes={sizes}
          className="h-auto w-full rounded-xl border border-white/10"
        />
      </a>
      <figcaption className="mt-2 text-xs leading-relaxed text-slate-400">
        {screenshot.caption}
        <span className="mt-1 block text-indigo-300">Open full-resolution screenshot (new tab)</span>
      </figcaption>
    </figure>
  );
}

export default function ProjectCard({ project }: { project: Project }) {
  const isLead = project.placement === "lead";
  const titleId = `${project.id}-title`;
  const imageSizes = isLead ? "(max-width: 1024px) 100vw, 960px" : "(max-width: 767px) 100vw, 480px";

  return (
    <article aria-labelledby={titleId} className={`min-w-0 ${isLead ? "md:col-span-2" : ""}`}>
      <GlassCard
        className={`flex h-full flex-col gap-6 ${isLead ? "border-indigo-400/25 bg-indigo-950/10" : ""}`}
        hoverEffect={false}
      >
        {project.coverImage ? (
          <ProjectFigure screenshot={project.coverImage} sizes={imageSizes} />
        ) : null}

        {project.pipeline ? <ProjectPipeline pipeline={project.pipeline} /> : null}

        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-xs font-medium tracking-wide text-indigo-300">{project.category}</p>
          <span className={`rounded-full border px-3 py-1 text-xs leading-relaxed ${
            project.status === "live"
              ? "border-emerald-400/20 bg-emerald-400/5 text-emerald-200"
              : project.status === "hackathon-complete"
                ? "border-amber-400/20 bg-amber-400/5 text-amber-200"
                : "border-white/10 bg-white/5 text-slate-300"
          }`}>
            {statusLabels[project.status]}
          </span>
        </div>

        <div className={`grid gap-6 ${isLead ? "md:grid-cols-[1.4fr_1fr] md:gap-10" : ""}`}>
          <div>
            <h3 id={titleId} className={`font-bold tracking-tight text-slate-100 ${isLead ? "text-2xl md:text-3xl" : "text-xl"}`}>
              {project.title}
            </h3>
            <p className="mt-3 text-sm leading-7 text-slate-300">{project.description}</p>
          </div>

          {project.highlights ? (
            <div className="rounded-xl border border-white/5 bg-white/3 p-4">
              <p className="text-xs font-semibold text-slate-200">Inside the project</p>
              <ul className="mt-3 space-y-3 text-sm leading-relaxed text-slate-300">
                {project.highlights.map((highlight) => (
                  <li key={highlight} className="flex items-start gap-2.5">
                    <span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 rounded-full bg-indigo-400" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>

        {project.limitation ? (
          <p className={`border-l-2 pl-3 text-sm leading-relaxed ${
            project.status === "hackathon-complete"
              ? "border-amber-300/40 text-amber-100/90"
              : "border-indigo-300/25 text-slate-400"
          }`}>
            {project.limitation}
          </p>
        ) : null}

        {project.screenshots?.length ? (
          <details className="border-t border-white/5 pt-3">
            <summary className="min-h-11 cursor-pointer content-center rounded-md text-sm font-medium text-indigo-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-indigo-300">
              Screenshots of {project.title} ({project.screenshots.length})
            </summary>
            <div className="mt-4 grid gap-6">
              {project.screenshots.map((screenshot) => (
                <ProjectFigure key={screenshot.src} screenshot={screenshot} sizes={imageSizes} />
              ))}
            </div>
          </details>
        ) : null}

        <ul aria-label={`${project.title} technologies`} className="mt-auto flex flex-wrap gap-2">
          {project.techStack.map((tech) => (
            <li key={tech} className="rounded-full border border-white/5 bg-white/5 px-2.5 py-1 text-xs leading-relaxed text-slate-300">
              {tech}
            </li>
          ))}
        </ul>

        {project.links.demo || project.links.source ? (
          <div className="flex flex-wrap gap-x-5 gap-y-2 border-t border-white/5 pt-3">
            {project.links.demo ? (
              <a
                href={project.links.demo}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visit ${project.title} (opens in a new tab)`}
                className="inline-flex min-h-11 items-center gap-2 rounded-md text-sm font-medium text-indigo-300 transition-colors hover:text-indigo-200"
              >
                Visit site <ArrowUpRight size={16} aria-hidden="true" />
              </a>
            ) : null}
            {project.links.source ? (
              <a
                href={project.links.source}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View ${project.title} source on GitHub (opens in a new tab)`}
                className="inline-flex min-h-11 items-center gap-2 rounded-md text-sm font-medium text-slate-300 transition-colors hover:text-white"
              >
                <Code2 size={16} aria-hidden="true" /> Source code
              </a>
            ) : null}
          </div>
        ) : null}
      </GlassCard>
    </article>
  );
}
