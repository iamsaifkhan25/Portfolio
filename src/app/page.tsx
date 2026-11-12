import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, FileText } from "lucide-react";
import { projects } from "@/data/projects";
import styles from "./page.module.css";

const featuredProject = projects.find((project) => project.id === "open-study-deck");

export default function Home() {
  const image = featuredProject?.coverImage;

  return (
    <div className={styles.journal}>
      <section className={styles.hero} aria-labelledby="home-heading">
        <div className={styles.introduction}>
          <p className="type-metadata">Building & Learning</p>
          <p className={styles.name}>Saif Khan</p>
          <h1 id="home-heading" className={`type-display font-display-serif ${styles.headline}`}>
            I build things I&apos;m curious about.
          </h1>
          <p className={`type-intro ${styles.lead}`}>
            Web tools, interactive experiences, little experiments, and sometimes entire game worlds.
          </p>
          <div className={styles.actions}>
            <Link href="/projects" className="glass-btn-primary">
              Explore Projects
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
            <Link href="/resume" className="glass-btn">
              View Resume
              <FileText size={18} aria-hidden="true" />
            </Link>
          </div>
        </div>

        {image && (
          <figure className={styles.projectFigure}>
            <Link href="/projects" className={styles.projectImageLink} aria-label={`${featuredProject.title}: explore projects`}>
              <Image
                src={image.src}
                alt={image.alt}
                width={image.width}
                height={image.height}
                sizes="(min-width: 1024px) 380px, (min-width: 768px) 640px, calc(100vw - 32px)"
                loading="eager"
                className={styles.projectImage}
              />
            </Link>
            <figcaption className={`type-metadata ${styles.caption}`}>
              <span className={styles.projectTitle}>{featuredProject.title}</span>
              <span>{image.caption}</span>
            </figcaption>
          </figure>
        )}
      </section>

      <div className={styles.entries}>
        <section className={styles.entry} aria-labelledby="background-heading">
          <h2 id="background-heading" className="type-section">Where I Started</h2>
          <p className="type-body">
            My background is in partner operations, but over time I&apos;ve found myself drawn more and more toward building things of my own.
          </p>
        </section>
        <section className={styles.entry} aria-labelledby="learning-heading">
          <h2 id="learning-heading" className="type-section">Learning as I Go</h2>
          <p className="type-body">
            I&apos;m still learning. Some projects work out beautifully, others teach me what not to do, and there&apos;s usually another idea waiting before I&apos;ve finished the last one.
          </p>
        </section>
        <section className={styles.entry} aria-labelledby="workflow-heading">
          <h2 id="workflow-heading" className="type-section">How I Work</h2>
          <p className="type-body">
            I use AI coding tools as part of how I work. They help me explore, prototype, and tackle things I couldn&apos;t have built as quickly on my own. But I still have to understand what I&apos;m making, make decisions, test the results, and figure out what to fix when something breaks.
          </p>
        </section>
      </div>
      <p className={`type-intro ${styles.closing}`}>
        <Link href="/projects">
          <strong>This is a collection of what I&apos;ve built, what I&apos;m learning, and what I&apos;m working on next.</strong>
        </Link>
      </p>
    </div>
  );
}
