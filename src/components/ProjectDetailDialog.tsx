"use client";

import Image from "next/image";
import { useLayoutEffect, useRef, useState, type KeyboardEvent } from "react";
import { X } from "lucide-react";
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

// Both entry points keep the same selection and dialog lifecycle.
export function useProjectDialog() {
  const [selection, setSelection] = useState<Selection | null>(null);

  function openProject(project: Project, origin: HTMLButtonElement) {
    const rect = origin.getBoundingClientRect();
    setSelection((current) => current ?? { project, origin, rect });
  }

  return { selection, openProject, closeProject: () => setSelection(null) };
}

function visiblePreviewRect(origin: HTMLButtonElement, rect: DOMRect) {
  const row = origin.closest<HTMLElement>(`.${styles.projectRow}`);
  const clip = row && getComputedStyle(row).overflowX === "auto" ? row.getBoundingClientRect() : null;
  const left = Math.max(0, rect.left, clip?.left ?? 0);
  const top = Math.max(0, rect.top, clip?.top ?? 0);
  const right = Math.min(window.innerWidth, rect.right, clip?.right ?? window.innerWidth);
  const bottom = Math.min(window.innerHeight, rect.bottom, clip?.bottom ?? window.innerHeight);
  return { left, top, right, bottom, visible: origin.isConnected && right > left && bottom > top };
}

function canMorph(dialog: HTMLDialogElement, origin: HTMLButtonElement, rect: DOMRect) {
  return [rect.left, rect.top, rect.width, rect.height].every(Number.isFinite)
    && rect.width >= 24 && rect.height >= 24
    && dialog.offsetWidth > 0 && dialog.offsetHeight > 0
    && visiblePreviewRect(origin, rect).visible;
}

function scaledCorners(dialog: HTMLDialogElement, origin: HTMLButtonElement, rect: DOMRect) {
  const style = getComputedStyle(origin);
  const corners = [style.borderTopLeftRadius, style.borderTopRightRadius, style.borderBottomRightRadius, style.borderBottomLeftRadius];
  const pairs = corners.map((corner) => {
    const [x, y = x] = corner.split(" ");
    const pixels = (value: string, length: number) => parseFloat(value) * (value.endsWith("%") ? length / 100 : 1);
    return [pixels(x, rect.width) * dialog.offsetWidth / rect.width, pixels(y, rect.height) * dialog.offsetHeight / rect.height];
  });
  return `${pairs.map(([x]) => `${x}px`).join(" ")} / ${pairs.map(([, y]) => `${y}px`).join(" ")}`;
}

function playAnimation(animations: Animation[], element: Element | null, frames: Keyframe[], options: KeyframeAnimationOptions) {
  if (!element?.animate) return;
  const animation = element.animate(frames, options);
  animations.push(animation);
  return animation;
}

function previewFrame(dialog: HTMLDialogElement, origin: HTMLButtonElement, target: DOMRect): Keyframe {
  const width = dialog.offsetWidth;
  const height = dialog.offsetHeight;
  const clip = visiblePreviewRect(origin, target);
  return canMorph(dialog, origin, target) ? {
    transform: `translate(${target.left}px, ${target.top}px) scale(${target.width / width}, ${target.height / height})`,
    borderRadius: scaledCorners(dialog, origin, target),
    opacity: 1,
    clipPath: `inset(${100 * (clip.top - target.top) / target.height}% ${100 * (target.right - clip.right) / target.width}% ${100 * (target.bottom - clip.bottom) / target.height}% ${100 * (clip.left - target.left) / target.width}%)`,
  } : { transform: "scale(0.97)", borderRadius: "24px", opacity: 0, clipPath: expandedFrame.clipPath };
}

function previewSnapshot(dialog: HTMLDialogElement, origin: HTMLButtonElement, rect: DOMRect) {
  if (!canMorph(dialog, origin, rect)) return null;
  // Inverse scaling keeps each preview's image ratio and crop intact at both
  // endpoints. Only the trigger is copied; the snapshot never receives focus.
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

export default function ProjectDetailDialog({ selection, onClosed }: { selection: Selection; onClosed: () => void }) {
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
      snapshot.current = previewSnapshot(dialog, origin, rect);
      playAnimation(animations.current, snapshot.current, [{ opacity: 1 }, { opacity: 0 }], { duration: 220, fill: "forwards", easing });
      playAnimation(animations.current, dialog, [previewFrame(dialog, origin, rect), expandedFrame], { duration, easing });
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
      // its offset explicitly after React makes the original trigger visible.
      queueMicrotask(() => {
        if (!origin.isConnected) return;
        origin.focus({ preventScroll: true });
        originRow?.scrollTo({ left: rowScrollLeft, behavior: "instant" });
        // A viewport change may have moved the project into a different row.
        if (!visiblePreviewRect(origin, origin.getBoundingClientRect()).visible) {
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
      snapshot.current = previewSnapshot(dialog, origin, target);
      playAnimation(animations.current, snapshot.current, [{ opacity: snapshotOpacity }, { opacity: 1 }], { duration: 240, delay: 180, fill: "both", easing });
      const animation = playAnimation(animations.current, dialog, [
        currentFrame,
        previewFrame(dialog, origin, target),
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
            <figcaption>
              {project.coverImage.caption}
              <a
                href={project.coverImage.src}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open screenshot: ${project.coverImage.alt} (opens in a new tab)`}
              >
                Open full-resolution screenshot (new tab)
              </a>
            </figcaption>
          </figure>
        ) : <div className={styles.noCover} aria-hidden="true" />}
        <ProjectDetail project={project} />
      </div>
    </dialog>
  );
}
