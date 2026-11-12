import ProjectShowcase from "@/components/ProjectShowcase";
import { projects } from "@/data/projects";
import styles from "./page.module.css";

const orderedProjects = [...projects].sort((a, b) => a.order - b.order);

export default function ProjectsPage() {
  return (
    <div className={styles.page}>
      <header className={styles.introduction}>
        <h1 className="type-page-title font-display-serif">Projects</h1>
        <p className="type-intro">
          Tools, experiments, and a game I&apos;m slowly building. Each one has given me
          something different to work through, and there&apos;s still more to learn.
        </p>
      </header>

      <section aria-labelledby="featured-projects-title" className={styles.collection}>
        <h2 id="featured-projects-title" className="sr-only">Featured projects</h2>
        <p className="type-metadata">Open a project to explore the work, the details, and what&apos;s still in progress.</p>
        <ProjectShowcase projects={orderedProjects} />
      </section>

      <section className={styles.disclosure} aria-labelledby="ai-disclosure-title">
        <h2 id="ai-disclosure-title">How I Use AI Tools</h2>
        <p className="type-body">
          I use Codex and Claude Code to help explore ideas, understand unfamiliar code, prototype,
          and work through bugs. I&apos;m still learning, and AI assistance is part of that process.
          I remain responsible for what I build: the design decisions, understanding the changes,
          testing the results, and iterating when something doesn&apos;t work.
        </p>
      </section>
    </div>
  );
}
