import Image from "next/image";
import { ArrowUpRight, Code2 } from "lucide-react";
import ProjectPipeline from "@/components/ProjectPipeline";
import { projectStatusLabels, type Project, type ProjectImage } from "@/data/projects";
import styles from "./ProjectShowcase.module.css";

function ProjectFigure({ screenshot }: { screenshot: ProjectImage }) {
  return (
    <figure className={styles.figure}>
      {screenshot.title ? <h4 className={styles.figureTitle}>{screenshot.title}</h4> : null}
      <a
        href={screenshot.src}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Open screenshot: ${screenshot.alt} (opens in a new tab)`}
      >
        <Image
          src={screenshot.src}
          alt={screenshot.alt}
          width={screenshot.width}
          height={screenshot.height}
          sizes="(max-width: 1024px) 100vw, 1000px"
          className={styles.screenshot}
        />
      </a>
      <figcaption>
        {screenshot.caption}
        <span>Open full-resolution screenshot (new tab) <ArrowUpRight size={14} aria-hidden="true" /></span>
      </figcaption>
    </figure>
  );
}

export default function ProjectDetail({ project }: { project: Project }) {
  return (
    <article className={styles.detail}>
      <header>
        <p className={styles.category}>{project.category}</p>
        <h2 id={`${project.id}-detail-title`} className={styles.detailTitle}>{project.title}</h2>
        {project.subtitle ? <p className={styles.detailStatus}>{project.subtitle}</p> : null}
        <p className={styles.detailStatus}>{projectStatusLabels[project.status]}</p>
        <div className={`${styles.overview} ${styles.paragraphs}`}>
          {project.caseStudy.story.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </div>
      </header>

      {project.coverImage ? <ProjectFigure screenshot={project.coverImage} /> : null}

      {project.limitation ? <p className={styles.limitation}>{project.limitation}</p> : null}

      <div className={styles.storyGrid}>
        <section>
          <h3>The idea in practice</h3>
          <p>{project.caseStudy.purpose}</p>
        </section>
        <section>
          <h3>What I built</h3>
          <ul className={styles.featureList}>
            {project.caseStudy.features.map((feature) => <li key={feature}>{feature}</li>)}
          </ul>
        </section>
      </div>

      {project.caseStudy.workflow?.length ? (
        <section>
          <h3>How it works</h3>
          <ol className={styles.workflow}>
            {project.caseStudy.workflow.map((step) => (
              <li key={step.title}>
                <h4>{step.title}</h4>
                <p>{step.detail}</p>
              </li>
            ))}
          </ol>
        </section>
      ) : null}

      {project.screenshots?.length ? (
        <section className={styles.gallery}>
          <h3>Inside the project</h3>
          {project.screenshots.map((screenshot) => <ProjectFigure key={screenshot.src} screenshot={screenshot} />)}
        </section>
      ) : null}

      <section>
        <h3>Behind the Build</h3>
        <div className={styles.paragraphs}>
          {project.caseStudy.implementation.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </div>
        <ul className={styles.technologies} aria-label={`${project.title} technologies`}>
          {project.techStack.map((tech) => <li key={tech}>{tech}</li>)}
        </ul>
      </section>

      {project.pipeline ? <ProjectPipeline pipeline={project.pipeline} /> : null}

      <section>
        <h3>Design decisions</h3>
        <div className={styles.paragraphs}>
          {project.caseStudy.decisions.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </div>
      </section>

      <section>
        <h3>Results and limitations</h3>
        <div className={styles.paragraphs}>
          {project.caseStudy.results.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </div>
      </section>

      {project.caseStudy.futureWork?.length ? (
        <section>
          <h3>Future direction</h3>
          <div className={styles.paragraphs}>
            {project.caseStudy.futureWork.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
        </section>
      ) : null}

      {project.caseStudy.lessons?.length ? (
        <section>
          <h3>What I learned</h3>
          <div className={styles.paragraphs}>
            {project.caseStudy.lessons.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
        </section>
      ) : null}

      {project.links.demo || project.links.source ? (
        <nav className={styles.projectLinks} aria-label={`${project.title} external links`}>
          {project.links.demo ? (
            <a href={project.links.demo} target="_blank" rel="noopener noreferrer" aria-label={`Visit ${project.title} (opens in a new tab)`}>
              Visit site <ArrowUpRight size={18} aria-hidden="true" />
            </a>
          ) : null}
          {project.links.source ? (
            <a href={project.links.source} target="_blank" rel="noopener noreferrer" aria-label={`View ${project.title} source on GitHub (opens in a new tab)`}>
              <Code2 size={18} aria-hidden="true" /> Source code
            </a>
          ) : null}
        </nav>
      ) : null}
    </article>
  );
}
