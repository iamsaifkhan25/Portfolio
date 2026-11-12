import { ArrowRight } from "lucide-react";
import type { ProjectPipeline as Pipeline } from "@/data/projects";

export default function ProjectPipeline({ pipeline }: { pipeline: Pipeline }) {
  return (
    <figure className="rounded-xl border border-indigo-300/20 bg-slate-950/50 p-4">
      <figcaption className="text-sm font-semibold text-slate-100">
        From deletion request to validation
      </figcaption>
      <ol role="list" className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
        {pipeline.stages.map((stage, index) => (
          <li key={stage.label} className="min-w-0 rounded-lg border border-white/10 bg-white/3 p-3">
            <div className="flex items-center justify-between gap-2 text-indigo-200">
              <span className="text-sm font-semibold">
                <span aria-hidden="true" className="mr-2 font-mono text-xs text-indigo-300/70">
                  {String(index + 1).padStart(2, "0")}
                </span>
                {stage.label}
              </span>
              {index < pipeline.stages.length - 1 ? (
                <ArrowRight size={14} aria-hidden="true" className="shrink-0" />
              ) : null}
            </div>
            <p className="mt-2 text-xs leading-relaxed text-slate-300">{stage.detail}</p>
          </li>
        ))}
      </ol>
      <p className="mt-5 text-xs font-medium text-slate-300">Documented evaluation run</p>
      <dl className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {pipeline.results.map((result) => (
          <div key={result.label} className="flex flex-col-reverse gap-1 rounded-lg border border-amber-300/15 bg-amber-300/5 p-3">
            <dt className="text-xs leading-relaxed text-slate-300">{result.label}</dt>
            <dd className="font-mono text-2xl font-semibold text-amber-100">{result.value}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-4 text-xs leading-relaxed text-slate-400">{pipeline.note}</p>
    </figure>
  );
}
