"use client";

import { useSyncExternalStore, type KeyboardEvent } from "react";
import { ArrowLeftRight } from "lucide-react";
import ProjectCapsule from "@/components/ProjectCapsule";
import ProjectDetailDialog, { useProjectDialog } from "@/components/ProjectDetailDialog";
import type { Project } from "@/data/projects";
import styles from "./ProjectShowcase.module.css";

const statusGroups = [
  { status: "live", label: "Completed / Live" },
  { status: "in-development", label: "In Progress" },
  { status: "hackathon-complete", label: "Hackathon Work" },
  { status: "on-hold", label: "On Hold" },
] as const satisfies readonly { status: Project["status"]; label: string }[];

function subscribeToMobile(callback: () => void) {
  const query = window.matchMedia("(width < 768px)");
  query.addEventListener("change", callback);
  return () => query.removeEventListener("change", callback);
}

const getMobileSnapshot = () => window.matchMedia("(width < 768px)").matches;
const getServerSnapshot = () => false;

export default function ProjectShowcase({ projects }: { projects: readonly Project[] }) {
  const { selection, openProject, closeProject } = useProjectDialog();
  const mobile = useSyncExternalStore(subscribeToMobile, getMobileSnapshot, getServerSnapshot);
  const groups = statusGroups.map((group) => ({
    ...group,
    projects: projects.filter((project) => project.status === group.status).sort((a, b) => a.order - b.order),
  })).filter((group) => group.projects.length > 0);
  // Keep DOM/keyboard order aligned with each layout, without duplicating triggers.
  if (!mobile) groups.sort((a, b) => a.projects[0].order - b.projects[0].order);

  function scrollRow(event: KeyboardEvent<HTMLDivElement>) {
    if (event.target !== event.currentTarget) return;
    const row = event.currentTarget;
    const distance = row.clientWidth * 0.9;
    const positions: Record<string, number> = {
      ArrowLeft: row.scrollLeft - distance,
      ArrowRight: row.scrollLeft + distance,
      Home: 0,
      End: row.scrollWidth,
    };
    if (!(event.key in positions)) return;
    event.preventDefault();
    row.scrollTo({ left: positions[event.key], behavior: "instant" });
  }

  return (
    <>
      <div className={styles.grid}>
        {groups.map((group) => {
          const multiple = group.projects.length > 1;
          const titleId = `projects-${group.status}-title`;
          const hintId = `projects-${group.status}-hint`;
          return (
            <div
              key={group.status}
              className={styles.statusGroup}
              // CSS also orders the server-rendered mobile groups before hydration.
              style={{ order: statusGroups.findIndex(({ status }) => status === group.status) }}
            >
              <div className={styles.groupHeading}>
                <h3 id={titleId}>{group.label}</h3>
                {multiple ? <p id={hintId} className={styles.swipeHint}>
                  <ArrowLeftRight size={16} aria-hidden="true" /> Swipe to explore
                  <span className="sr-only">. Keyboard: focus this row and use Left or Right Arrow, Home, or End.</span>
                </p> : null}
              </div>
              <div
                className={`${styles.projectRow} ${multiple ? styles.swipeRow : ""}`}
                role={mobile && multiple ? "region" : undefined}
                aria-labelledby={mobile && multiple ? titleId : undefined}
                aria-describedby={mobile && multiple ? hintId : undefined}
                tabIndex={mobile && multiple ? 0 : undefined}
                onKeyDown={mobile && multiple ? scrollRow : undefined}
              >
                {group.projects.map((project) => (
                  <ProjectCapsule
                    key={project.id}
                    project={project}
                    active={selection?.project.id === project.id}
                    onOpen={openProject}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
      {selection ? <ProjectDetailDialog key={selection.project.id} selection={selection} onClosed={closeProject} /> : null}
    </>
  );
}
