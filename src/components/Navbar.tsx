"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import styles from "./SiteShell.module.css";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const desktopLinksRef = useRef<HTMLDivElement>(null);

  const closeMenu = useCallback((restoreFocus = false) => {
    if (restoreFocus) triggerRef.current?.focus();
    setIsOpen(false);
  }, []);

  // Close on outside click / Escape for keyboard and pointer users
  useEffect(() => {
    if (!isOpen) return;

    function handlePointerDown(event: MouseEvent) {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        // The pointer's default action can still focus the outside target.
        closeMenu(drawerRef.current?.contains(document.activeElement));
      }
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        closeMenu(navRef.current?.contains(document.activeElement));
      }
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, closeMenu]);

  // Match the shell CSS: the simplified name/link row has room from 48rem.
  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 48rem)");
    function handleBreakpointChange(event: MediaQueryListEvent) {
      const focused = document.activeElement;
      if (event.matches) {
        if (drawerRef.current?.contains(focused) || focused === triggerRef.current) {
          const links = desktopLinksRef.current;
          const destination = links?.querySelector<HTMLAnchorElement>('[aria-current="page"]')
            ?? links?.querySelector<HTMLAnchorElement>("a");
          destination?.focus();
        }
        closeMenu();
      } else if (
        focused instanceof HTMLElement &&
        navRef.current?.contains(focused) &&
        focused.getClientRects().length === 0
      ) {
        // A desktop link/control has just become hidden.
        triggerRef.current?.focus();
      }
    }
    desktop.addEventListener("change", handleBreakpointChange);
    return () => desktop.removeEventListener("change", handleBreakpointChange);
  }, [closeMenu]);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Projects", href: "/projects" },
    { name: "Resume", href: "/resume" },
    { name: "Contact", href: "/contact" },
  ];

  const isActive = (path: string) => {
    if (path === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(path);
  };

  return (
    <nav ref={navRef} aria-label="Main navigation" className={styles.nav}>
      <div className={`glass-panel ${styles.masthead}`}>
        <Link href="/" aria-current={pathname === "/" ? "page" : undefined} className={styles.identity}>
          Saif Khan
        </Link>
        <div ref={desktopLinksRef} className={styles.desktopLinks}>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={pathname === link.href ? "page" : undefined}
              className={`${styles.navLink} ${isActive(link.href) ? styles.active : ""}`}
            >
              {link.name}
            </Link>
          ))}
        </div>
        <button
          ref={triggerRef}
          type="button"
          onClick={() => setIsOpen((open) => !open)}
          className={styles.menuTrigger}
          aria-label="Toggle navigation menu"
          aria-expanded={isOpen}
          aria-controls="mobile-nav-drawer"
        >
          {isOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
        </button>
      </div>
      <div
        ref={drawerRef}
        id="mobile-nav-drawer"
        aria-hidden={!isOpen}
        inert={!isOpen}
        className={`${styles.drawer} ${isOpen ? styles.drawerOpen : ""}`}
      >
        <div className={`glass-panel ${styles.drawerPanel}`}>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={pathname === link.href ? "page" : undefined}
              onClick={() => closeMenu(true)}
              className={`${styles.navLink} ${isActive(link.href) ? styles.active : ""}`}
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
