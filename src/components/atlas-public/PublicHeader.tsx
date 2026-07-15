"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, Moon, Sun, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { contact } from "@/lib/content";
import styles from "./atlas-public.module.css";

const links = [
  ["Work", "/work"], ["Services", "/services"], ["Publishing", "/publishing"],
  ["Atlas", "/atlas"], ["Studio", "/studio"], ["Discuss a Project", "/discuss"],
] as const;

export function PublicHeader() {
  const [open, setOpen] = useState(false);
  const close = useRef<HTMLButtonElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const menu = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
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
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  function toggleTheme() {
    const root = document.documentElement;
    const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    localStorage.setItem("airix-theme", next);
  }

  return <header className={styles.header}>
    <div className={styles.headerInner}>
      <Link href="/" className={styles.brand} aria-label="Airix Media home">
        <Image src="/airix-mark.svg" alt="" width={30} height={30} priority /><span>AIRIX MEDIA</span>
      </Link>
      <nav className={styles.desktopNav} aria-label="Primary navigation">{links.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}</nav>
      <div className={styles.headerTools}>
        <Link className={styles.emergencyLink} href="/support/emergency">Emergency Support</Link>
        <a className={styles.portalLink} href={contact.portal}>Client Portal</a>
        <button className={styles.iconButton} onClick={toggleTheme} aria-label="Toggle colour theme"><Moon className={styles.lightIcon} size={18}/><Sun className={styles.darkIcon} size={18}/></button>
        <button ref={trigger} className={`${styles.iconButton} ${styles.menuButton}`} onClick={() => setOpen(true)} aria-label="Open menu" aria-expanded={open}><Menu size={20}/></button>
      </div>
    </div>
    {open && <div ref={menu} className={styles.menuOverlay} role="dialog" aria-modal="true" aria-label="Site navigation">
      <div className={styles.menuTop}><span>Airix Atlas / Directory</span><button ref={close} className={styles.iconButton} onClick={() => { setOpen(false); trigger.current?.focus(); }} aria-label="Close menu"><X size={21}/></button></div>
      <nav>{links.map(([label, href], index) => <Link key={href} onClick={() => setOpen(false)} href={href}><span>0{index + 1}</span>{label}</Link>)}</nav>
      <div className={styles.menuUtilities}><Link href="/support/emergency">Emergency Support</Link><a href={contact.portal}>Client Portal</a></div>
    </div>}
  </header>;
}
