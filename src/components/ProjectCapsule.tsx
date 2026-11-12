"use client";

import Image from "next/image";
import { useRef, type PointerEvent } from "react";
import { ArrowUpRight } from "lucide-react";
import { projectStatusLabels, type Project } from "@/data/projects";
import styles from "./ProjectShowcase.module.css";

export default function ProjectCapsule({
  project,
  active,
  onOpen,
}: {
  project: Project;
  active: boolean;
  onOpen: (project: Project, origin: HTMLButtonElement) => void;
}) {
  const gesture = useRef({ pointerId: -1, x: 0, y: 0, moved: false, row: null as HTMLElement | null, scrollLeft: 0, scrollY: 0 });

  function trackPointer(event: PointerEvent<HTMLButtonElement>) {
    const start = gesture.current;
    if (start.pointerId === event.pointerId && Math.hypot(event.clientX - start.x, event.clientY - start.y) > 8) start.moved = true;
  }

  return (
    <article className={styles.capsuleSlot}>
      <button
        type="button"
        className={styles.capsule}
        style={{ visibility: active ? "hidden" : undefined }}
        aria-haspopup="dialog"
        aria-label={`Explore ${project.title}: ${projectStatusLabels[project.status]}`}
        aria-describedby={`${project.id}-summary`}
        onPointerDown={(event) => {
          const row = event.currentTarget.closest<HTMLElement>(`.${styles.projectRow}`);
          gesture.current = { pointerId: event.pointerId, x: event.clientX, y: event.clientY, moved: false, row, scrollLeft: row?.scrollLeft ?? 0, scrollY: window.scrollY };
        }}
        onPointerMove={trackPointer}
        onPointerUp={trackPointer}
        onPointerCancel={() => { gesture.current.moved = true; }}
        onClick={(event) => {
          const start = gesture.current;
          // Native scrolling stays in charge; suppress only a click after a pan.
          if (event.detail !== 0 && (start.moved || Math.abs((start.row?.scrollLeft ?? 0) - start.scrollLeft) > 8 || Math.abs(window.scrollY - start.scrollY) > 8)) return;
          onOpen(project, event.currentTarget);
        }}
      >
        <span className={styles.preview}>
          {project.coverImage ? (
            <Image
              src={project.coverImage.src}
              alt={project.coverImage.alt}
              width={project.coverImage.width}
              height={project.coverImage.height}
              sizes="(max-width: 767px) 100vw, 480px"
              loading={project.order <= 2 ? "eager" : "lazy"}
              className={styles.previewImage}
            />
          ) : (
            <span className={styles.typographicCover} aria-hidden="true">
              <span className={styles.coverNumber}>{String(project.order).padStart(2, "0")}</span>
              <span>{project.category}</span>
            </span>
          )}
        </span>
        <span className={styles.capsuleInfo}>
          <span className={styles.category}>{project.category}</span>
          <span className={styles.capsuleTitle}>{project.title}</span>
          <span id={`${project.id}-summary`} className={styles.summary}>{project.subtitle ?? project.summary}</span>
          <span className={styles.capsuleFooter}>
            <span className={styles.status} data-live={project.status === "live"}>
              {projectStatusLabels[project.status]}
            </span>
            <span className={styles.explore}>Explore <ArrowUpRight size={18} aria-hidden="true" /></span>
          </span>
        </span>
      </button>
    </article>
  );
}
