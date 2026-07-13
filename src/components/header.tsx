"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Menu, Moon, Sun, X } from "lucide-react";
import { useState } from "react";
import { contact, copy, type Locale } from "@/lib/content";

const routeFor = (locale: Locale, path: string) => locale === "en" ? path : `/${locale}${path === "/" ? "" : path}`;

export function Header({ locale = "en" }: { locale?: Locale }) {
  const t = copy[locale];
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const links = [
    [t.nav.services, "/services"], [t.nav.publishing, "/publishing"], [t.nav.systems, "/systems"],
    [t.nav.insights, "/insights"], [t.nav.company, "/company"], [t.nav.support, "/support"],
  ];

  function switchLocale(next: Locale) {
    const clean = pathname.replace(/^\/(fr|pt)(?=\/|$)/, "") || "/";
    document.cookie = `airix_locale=${next};path=/;max-age=31536000;samesite=lax`;
    router.push(routeFor(next, clean));
  }

  return (
    <header className="site-header">
      <div className="shell header-inner">
        <Link className="brand" href={routeFor(locale, "/")}>
          <span className="brand-mark" aria-hidden="true"><Image src="/airix-mark.svg" alt="" width={32} height={32} priority /></span>
          <span>AIRIX MEDIA</span>
        </Link>
        <nav className="desktop-nav" aria-label="Primary navigation">
          {links.map(([label, href]) => <Link key={href} href={routeFor(locale, href)}>{label}</Link>)}
          <a href={contact.portal} target="_blank" rel="noreferrer">{t.nav.portal}</a>
        </nav>
        <div className="header-tools">
          <label className="sr-only" htmlFor="locale-switch">{t.language}</label>
          <select id="locale-switch" className="icon-button mono" value={locale} onChange={(event) => switchLocale(event.target.value as Locale)} aria-label={t.language}>
            <option value="en">EN</option><option value="fr">FR</option><option value="pt">PT</option>
          </select>
          <button className="icon-button" onClick={() => { const root = document.documentElement; const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark"; root.setAttribute("data-theme", next); localStorage.setItem("airix-theme", next); }} aria-label="Toggle appearance">
            <span className="theme-icon theme-icon-light"><Moon size={18} /></span><span className="theme-icon theme-icon-dark"><Sun size={18} /></span>
          </button>
          <Link className="button compact" href={routeFor(locale, "/start-a-project")}>{t.nav.start}</Link>
          <button className="icon-button mobile-trigger" onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-controls="mobile-navigation" aria-label={open ? "Close menu" : "Open menu"}>
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
      {open && <div className="mobile-panel" id="mobile-navigation"><nav aria-label="Mobile navigation">{links.map(([label, href]) => <Link onClick={() => setOpen(false)} key={href} href={routeFor(locale, href)}>{label}</Link>)}<a href={contact.portal}>{t.nav.portal}</a><Link className="button" href={routeFor(locale, "/start-a-project")}>{t.nav.start}</Link></nav></div>}
    </header>
  );
}
