"use client";

import Image from "next/image";
import { useLayoutEffect, useRef, useState, useSyncExternalStore, type KeyboardEvent } from "react";
import { ArrowLeftRight, X } from "lucide-react";
import ProjectCapsule from "@/components/ProjectCapsule";
import ProjectDetail from "@/components/ProjectDetail";
import type { Project } from "@/data/projects";
import styles from "./ProjectShowcase.module.css";

interface Selection {
  project: Project;
  origin: HTMLButtonElement;
  rect: DOMRect;
}

const duration = 420;
const easing = "cubic-bezier(0.22, 1, 0.36, 1)";
const expandedFrame = { transform: "none", borderRadius: "0px", opacity: 1, clipPath: "inset(0% 0% 0% 0%)" };
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

function visibleCapsuleRect(origin: HTMLButtonElement, rect: DOMRect) {
  const row = origin.closest<HTMLElement>(`.${styles.projectRow}`);
  const clip = row && getComputedStyle(row).overflowX === "auto" ? row.getBoundingClientRect() : null;
  const left = Math.max(0, rect.left, clip?.left ?? 0);
  const top = Math.max(0, rect.top, clip?.top ?? 0);
  const right = Math.min(window.innerWidth, rect.right, clip?.right ?? window.innerWidth);
  const bottom = Math.min(window.innerHeight, rect.bottom, clip?.bottom ?? window.innerHeight);
  return { left, top, right, bottom, clipped: clip !== null, visible: origin.isConnected && right > left && bottom > top };
}

function playAnimation(animations: Animation[], element: Element | null, frames: Keyframe[], options: KeyframeAnimationOptions) {
  if (!element?.animate) return;
  const animation = element.animate(frames, options);
  animations.push(animation);
  return animation;
}

function capsuleFrame(dialog: HTMLDialogElement, origin: HTMLButtonElement, target: DOMRect): Keyframe {
  const width = dialog.offsetWidth;
  const height = dialog.offsetHeight;
  const clip = visibleCapsuleRect(origin, target);
  const canPosition = clip.visible && target.width > 0 && target.height > 0 && width > 0 && height > 0;
  return canPosition ? {
    transform: `translate(${target.left}px, ${target.top}px) scale(${target.width / width}, ${target.height / height})`,
    borderRadius: `${36 * width / target.width}px / ${36 * height / target.height}px`,
    opacity: 1,
    clipPath: clip.clipped
      ? `inset(${100 * (clip.top - target.top) / target.height}% ${100 * (target.right - clip.right) / target.width}% ${100 * (target.bottom - clip.bottom) / target.height}% ${100 * (clip.left - target.left) / target.width}%)`
      : expandedFrame.clipPath,
  } : { transform: "scale(0.97)", borderRadius: "24px", opacity: 0, clipPath: expandedFrame.clipPath };
}

function capsuleSnapshot(dialog: HTMLDialogElement, origin: HTMLButtonElement, rect: DOMRect) {
  if (rect.width <= 0 || rect.height <= 0 || !visibleCapsuleRect(origin, rect).visible) return null;
  // A noninteractive copy preserves the exact cropped image and text at both ends
  // of the morph. Only the active capsule is copied, and IDs never enter twice.
  const layer = document.createElement("div");
  layer.className = styles.snapshot;
  layer.inert = true;
  layer.setAttribute("aria-hidden", "true");
  const copy = origin.cloneNode(true) as HTMLButtonElement;
  [copy, ...copy.querySelectorAll("[id]")].forEach((element) => element.removeAttribute("id"));
  copy.removeAttribute("aria-describedby");
  Object.assign(copy.style, {
    visibility: "visible",
    width: `${rect.width}px`,
    height: `${rect.height}px`,
    transformOrigin: "top left",
    transform: `scale(${dialog.offsetWidth / rect.width}, ${dialog.offsetHeight / rect.height})`,
  });
  layer.append(copy);
  dialog.append(layer);
  return layer;
}

function ProjectDialog({ selection, onClosed }: { selection: Selection; onClosed: () => void }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const animations = useRef<Animation[]>([]);
  const snapshot = useRef<HTMLDivElement | null>(null);
  const closing = useRef(false);
  const disposed = useRef(false);
  const { project, origin, rect } = selection;

  useLayoutEffect(() => {
    const dialog = dialogRef.current!;
    const body = document.body;
    const root = document.documentElement;
    const scrollX = window.scrollX;
    const scrollY = window.scrollY;
    const originRow = origin.closest<HTMLElement>(`.${styles.projectRow}`);
    const rowScrollLeft = originRow?.scrollLeft ?? 0;
    const properties = ["position", "top", "left", "width", "overflow", "padding-right"] as const;
    const originalStyles = properties.map((property) => [property, body.style.getPropertyValue(property), body.style.getPropertyPriority(property)]);
    const originalOverflow = root.style.overflow;
    const gutter = window.innerWidth - root.clientWidth;
    const padding = parseFloat(getComputedStyle(body).paddingRight) || 0;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    disposed.current = false;

    // Keep the layout width and originating button in place, including on iOS.
    body.style.position = "fixed";
    body.style.top = `${-scrollY}px`;
    body.style.left = `${-scrollX}px`;
    body.style.width = "100%";
    body.style.overflow = "hidden";
    body.style.paddingRight = `${padding + gutter}px`;
    root.style.overflow = "hidden";
    dialog.showModal();
    closeRef.current?.focus({ preventScroll: true });

    if (!motion.matches && typeof dialog.animate === "function") {
      snapshot.current = capsuleSnapshot(dialog, origin, rect);
      playAnimation(animations.current, snapshot.current, [{ opacity: 1 }, { opacity: 0 }], { duration: 220, fill: "forwards", easing });
      playAnimation(animations.current, dialog, [capsuleFrame(dialog, origin, rect), expandedFrame], { duration, easing });
      playAnimation(animations.current, dialog.querySelector(`.${styles.heroImage}`), [
        { transform: "translateY(36px)", opacity: 0.65 },
        { transform: "translateY(0)", opacity: 1 },
      ], { duration, easing });
      playAnimation(animations.current, dialog.querySelector(`.${styles.detail}`), [
        { opacity: 0, transform: "translateY(20px)" },
        { opacity: 1, transform: "none" },
      ], { duration: 300, delay: 100, fill: "backwards", easing });
    }

    const finishAnimations = () => animations.current.forEach((animation) => {
      if (animation.playState === "running") animation.finish();
    });
    const onMotionChange = () => { if (motion.matches) finishAnimations(); };
    motion.addEventListener("change", onMotionChange);
    window.addEventListener("resize", finishAnimations);

    return () => {
      disposed.current = true;
      animations.current.forEach((animation) => animation.cancel());
      animations.current = [];
      snapshot.current?.remove();
      motion.removeEventListener("change", onMotionChange);
      window.removeEventListener("resize", finishAnimations);
      dialog.close();
      originalStyles.forEach(([property, value, priority]) => body.style.setProperty(property, value, priority));
      root.style.overflow = originalOverflow;
      const originalBehavior = root.style.scrollBehavior;
      root.style.scrollBehavior = "auto";
      window.scrollTo(scrollX, scrollY);
      root.style.scrollBehavior = originalBehavior;
      // Native dialog focus restoration can also scroll an overflow row. Restore
      // its offset explicitly after React makes the original capsule visible.
      queueMicrotask(() => {
        if (!origin.isConnected) return;
        origin.focus({ preventScroll: true });
        originRow?.scrollTo({ left: rowScrollLeft, behavior: "instant" });
        // A viewport change may have moved the project into a different row.
        if (!visibleCapsuleRect(origin, origin.getBoundingClientRect()).visible) {
          origin.scrollIntoView({ block: "nearest", inline: "nearest", behavior: "instant" });
        }
      });
    };
  }, [origin, rect]);

  async function close() {
    if (closing.current) return;
    closing.current = true;
    const dialog = dialogRef.current!;
    // Capture the in-flight frame so Escape during opening reverses without a jump.
    const computed = getComputedStyle(dialog);
    const currentFrame = {
      transform: computed.transform,
      borderRadius: computed.borderRadius,
      opacity: computed.opacity,
      clipPath: computed.clipPath === "none" ? expandedFrame.clipPath : computed.clipPath,
    };
    const snapshotOpacity = snapshot.current ? getComputedStyle(snapshot.current).opacity : "0";
    dialog.getAnimations?.().forEach((animation) => animation.cancel());
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches && typeof dialog.animate === "function") {
      const target = origin.getBoundingClientRect();
      snapshot.current?.remove();
      snapshot.current = capsuleSnapshot(dialog, origin, target);
      playAnimation(animations.current, snapshot.current, [{ opacity: snapshotOpacity }, { opacity: 1 }], { duration: 240, delay: 180, fill: "both", easing });
      const animation = playAnimation(animations.current, dialog, [
        currentFrame,
        capsuleFrame(dialog, origin, target),
      ], { duration, easing, fill: "forwards" });
      playAnimation(animations.current, scrollRef.current, [{ opacity: 1 }, { opacity: 0 }], { duration: 240, fill: "forwards" });
      if (animation) await animation.finished.catch(() => {});
    }
    if (!disposed.current) onClosed();
  }

  function containFocus(event: KeyboardEvent<HTMLDialogElement>) {
    if (event.key !== "Tab") return;
    const focusable = Array.from(dialogRef.current!.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex="0"]',
    )).filter((element) => !element.closest("[inert]") && element.getClientRects().length > 0);
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last?.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first?.focus();
    }
  }

  return (
    <dialog
      ref={dialogRef}
      className={styles.dialog}
      aria-modal="true"
      aria-labelledby={`${project.id}-detail-title`}
      onCancel={(event) => { event.preventDefault(); void close(); }}
      onKeyDown={containFocus}
    >
      <button ref={closeRef} type="button" className={styles.close} aria-label={`Close ${project.title}`} onClick={() => void close()}>
        <X size={24} aria-hidden="true" />
      </button>
      <div ref={scrollRef} className={styles.scrollArea} tabIndex={0} role="region" aria-label={`${project.title} project details`}>
        {project.coverImage ? (
          <figure className={styles.hero}>
            <Image
              src={project.coverImage.src}
              alt={project.coverImage.alt}
              width={project.coverImage.width}
              height={project.coverImage.height}
              sizes="(max-width: 1200px) 100vw, 1100px"
              loading="eager"
              className={styles.heroImage}
            />
            <figcaption>{project.coverImage.caption}</figcaption>
          </figure>
        ) : <div className={styles.noCover} aria-hidden="true">{project.category}</div>}
        <ProjectDetail project={project} />
      </div>
    </dialog>
  );
}

export default function ProjectShowcase({ projects }: { projects: readonly Project[] }) {
  const [selection, setSelection] = useState<Selection | null>(null);
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
                    onOpen={(project, origin) => {
                      if (!selection) setSelection({ project, origin, rect: origin.getBoundingClientRect() });
                    }}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
      {selection ? <ProjectDialog key={selection.project.id} selection={selection} onClosed={() => setSelection(null)} /> : null}
    </>
  );
}
