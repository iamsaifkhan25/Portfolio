import type { ProjectPipeline as Pipeline } from "@/data/projects";
import styles from "./ProjectShowcase.module.css";

export default function ProjectPipeline({ pipeline }: { pipeline: Pipeline }) {
  return (
    <figure className={styles.pipeline}>
      <figcaption>
        From deletion request to validation
      </figcaption>
      <ol role="list" className={styles.pipelineStages}>
        {pipeline.stages.map((stage, index) => (
          <li key={stage.label}>
            <p className={styles.pipelineStageTitle}>
              <span aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              {stage.label}
            </p>
            <p>{stage.detail}</p>
          </li>
        ))}
      </ol>
      <p className={styles.evaluationLabel}>Documented evaluation run</p>
      <dl className={styles.pipelineResults}>
        {pipeline.results.map((result) => (
          <div key={result.label}>
            <dt>{result.label}</dt>
            <dd>{result.value}</dd>
          </div>
        ))}
      </dl>
      <p className={styles.pipelineNote}>{pipeline.note}</p>
    </figure>
  );
}
