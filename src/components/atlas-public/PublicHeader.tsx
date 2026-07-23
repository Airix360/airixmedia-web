"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { contact } from "@/lib/content";
import styles from "./atlas-public.module.css";
import { ThemeControl } from "../theme-control";
import { OfficialLogo } from "../official-logo";

const links = [
  ["Work", "/work"], ["Services", "/services"], ["Publishing", "/publishing"],
  ["Open Source", "/open-source"], ["Studio", "/studio"], ["Contact", "/contact"],
] as const;

export function PublicHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const close = useRef<HTMLButtonElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const menu = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    const previousPaddingRight = document.body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    if (scrollbarWidth > 0) document.body.style.paddingRight = `${scrollbarWidth}px`;
    close.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") { setOpen(false); requestAnimationFrame(() => trigger.current?.focus()); }
      if (event.key === "Tab" && menu.current) {
        const focusable = Array.from(menu.current.querySelectorAll<HTMLElement>("a[href], button:not([disabled])"));
        const first = focusable[0]; const last = focusable.at(-1);
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
      document.body.style.paddingRight = previousPaddingRight;
    };
  }, [open]);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > Math.max(120, window.innerHeight * 0.55));
    update(); window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return <header className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}>
    <div className={styles.headerInner}>
      <Link href="/" className={styles.brand} aria-label="Airix Media home">
        <OfficialLogo />
      </Link>
      <nav className={styles.desktopNav} aria-label="Primary navigation">{links.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}</nav>
      <div className={styles.headerTools}>
        <Link className={styles.supportLink} href="/support">Support</Link>
        <Link className={styles.emergencyLink} href="/support/emergency">Emergency</Link>
        <a className={styles.portalLink} href={contact.portal}>Client Portal</a>
        <ThemeControl className={styles.themeControl} />
        <button ref={trigger} className={`${styles.iconButton} ${styles.menuButton}`} onClick={() => setOpen(true)} aria-label="Open menu" aria-expanded={open}><Menu size={20}/></button>
      </div>
    </div>
    {open && <div ref={menu} className={styles.menuOverlay} role="dialog" aria-modal="true" aria-label="Site navigation">
      <div className={styles.menuTop}><span>Airix Media / Directory</span><button ref={close} className={styles.iconButton} onClick={() => { setOpen(false); trigger.current?.focus(); }} aria-label="Close menu"><X size={21}/></button></div>
      <nav>{links.map(([label, href], index) => <Link key={href} onClick={() => setOpen(false)} href={href}><span>0{index + 1}</span>{label}</Link>)}</nav>
      <div className={styles.menuUtilities}><Link href="/support">Support</Link><Link className={styles.menuEmergencyLink} href="/support/emergency">Emergency</Link><a href={contact.portal}>Client Portal</a><ThemeControl className={styles.menuThemeControl} expanded /></div>
    </div>}
  </header>;
}
