"use client";

import type { ReactNode } from "react";
import ProjectDetailDialog, { useProjectDialog } from "@/components/ProjectDetailDialog";
import type { Project } from "@/data/projects";

export default function HomeProjectPreview({ project, className, descriptionId, children }: {
  project: Project;
  className: string;
  descriptionId: string;
  children: ReactNode;
}) {
  const { selection, openProject, closeProject } = useProjectDialog();

  return (
    <>
      <button
        type="button"
        className={className}
        style={{ visibility: selection ? "hidden" : undefined }}
        aria-label={`Explore ${project.title}`}
        aria-describedby={descriptionId}
        aria-haspopup="dialog"
        onClick={(event) => openProject(project, event.currentTarget)}
      >
        {children}
      </button>
      {selection ? <ProjectDetailDialog selection={selection} onClosed={closeProject} /> : null}
    </>
  );
}
