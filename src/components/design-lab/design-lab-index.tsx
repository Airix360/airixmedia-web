"use client";

import Link from "next/link";
import { useState } from "react";
import { designLabConcepts } from "@/lib/design-lab";
import styles from "./design-lab.module.css";

const reviewTemplate = `CONCEPT: [A / B / C]\nKEEP: \nQUESTION: \nREMOVE: \nAIRIX FEELS LIKE: \nLAGOS FEELS LIKE: \nCONFIDENCE (1–5): `;

export function DesignLabIndex() {
  const [copied, setCopied] = useState(false);
  async function copyTemplate() {
    await navigator.clipboard.writeText(reviewTemplate);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  return <main id="main-content" className={styles.labIndex}>
    <header className={styles.indexHeader}>
      <Link href="/__design_lab" aria-label="Living Lagos design lab home">AIRIX / LIVING LAGOS</Link>
      <span>Phase 03B · Corrective review</span>
    </header>
    <section className={styles.indexIntro}>
      <p>Three live interpretations. No production decision has been made.</p>
      <h1>Choose by behaviour,<br />not by thumbnail.</h1>
      <div className={styles.indexInstructions}>
        <p>Open each route on desktop and mobile. Scroll through the first proof sequence. Try pointer or touch. Then review reduced motion.</p>
        <p>These are structural interpretations—not skins, finished brand identities, or public claims.</p>
      </div>
    </section>
    <section className={styles.conceptDirectory} aria-labelledby="concepts-title">
      <h2 id="concepts-title">Live concepts</h2>
      {designLabConcepts.map((concept) => <Link className={styles.directoryRow} href={`/__design_lab/${concept.slug}`} key={concept.slug}>
        <span>{concept.index}</span>
        <div><strong>{concept.name}</strong><p>{concept.summary}</p></div>
        <em>Enter concept ↗</em>
      </Link>)}
    </section>
    <section className={styles.reviewPanel}>
      <div>
        <p className={styles.indexEyebrow}>OWNER REVIEW PANEL</p>
        <h2>Evaluate the system, not personal taste alone.</h2>
      </div>
      <div className={styles.criteria}>
        <article><b>01</b><h3>Distinctly Airix?</h3><p>Does this feel like a capable creative-technology and operations partner rather than a portfolio template?</p></article>
        <article><b>02</b><h3>Lagos, without costume?</h3><p>Is the city present through behaviour, material and rhythm—without tourism shorthand?</p></article>
        <article><b>03</b><h3>Work becomes clear?</h3><p>Does the movement lead naturally to what Airix builds, runs and rescues?</p></article>
        <article><b>04</b><h3>Useful under pressure?</h3><p>Can you navigate, read and act on it across mobile, keyboard and reduced-motion settings?</p></article>
      </div>
      <pre className={styles.reviewTemplate}>{reviewTemplate}</pre>
      <button className={styles.copyButton} onClick={copyTemplate}>{copied ? "Copied" : "Copy review template"}</button>
    </section>
  </main>;
}
