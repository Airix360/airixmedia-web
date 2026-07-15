import Link from "next/link";
import type { ReactNode } from "react";
import styles from "./w9-review.module.css";

const links = [
  ["Overview", "/internal/w9-review"],
  ["Artwork", "/internal/w9-review/artwork"],
  ["Pages", "/internal/w9-review/pages"],
  ["Content", "/internal/w9-review/content"],
  ["Launch", "/internal/w9-review/launch"],
] as const;

export function W9ReviewShell({ title, eyebrow, intro, children }: { title: string; eyebrow: string; intro: string; children: ReactNode }) {
  return <div className={styles.workspace}>
    <header className={styles.header}>
      <Link href="/internal/w9-review" className={styles.brand}>AIRIX ATLAS <span>W9</span></Link>
      <nav aria-label="W9 review sections">{links.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}</nav>
      <span className={styles.privateMark}>PRIVATE · NOINDEX</span>
    </header>
    <main id="main-content" className={styles.main}>
      <div className={styles.masthead}><span>{eyebrow}</span><h1>{title}</h1><p>{intro}</p></div>
      {children}
    </main>
    <footer className={styles.footer}>W9 review workspace · Visual decisions are not persisted · Version 2.0.0.1</footer>
  </div>;
}

export { styles as w9Styles };
