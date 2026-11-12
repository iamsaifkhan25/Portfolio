import Image from "next/image";
import { ArrowUpRight, Code2 } from "lucide-react";
import ProjectPipeline from "@/components/ProjectPipeline";
import { projectStatusLabels, type Project, type ProjectImage } from "@/data/projects";
import styles from "./ProjectShowcase.module.css";

function ProjectFigure({ screenshot }: { screenshot: ProjectImage }) {
  return (
    <figure className={styles.figure}>
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
        <p className={styles.overview}>{project.description}</p>
      </header>

      {project.limitation ? <p className={styles.limitation}>{project.limitation}</p> : null}

      <div className={styles.storyGrid}>
        <section>
          <h3>What it sets out to do</h3>
          <p>{project.caseStudy.purpose}</p>
        </section>
        <section>
          <h3>Features and implementation</h3>
          <ul className={styles.featureList}>
            {project.caseStudy.implementation.map((feature) => <li key={feature}>{feature}</li>)}
          </ul>
        </section>
      </div>

      {project.pipeline ? <ProjectPipeline pipeline={project.pipeline} /> : null}

      {project.screenshots?.length ? (
        <section className={styles.gallery}>
          <h3>Inside the project</h3>
          {project.screenshots.map((screenshot) => <ProjectFigure key={screenshot.src} screenshot={screenshot} />)}
        </section>
      ) : null}

      <section>
        <h3>Challenges and development notes</h3>
        <p>{project.caseStudy.developmentNotes}</p>
      </section>

      <section>
        <h3>Built with</h3>
        <ul className={styles.technologies} aria-label={`${project.title} technologies`}>
          {project.techStack.map((tech) => <li key={tech}>{tech}</li>)}
        </ul>
      </section>

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
