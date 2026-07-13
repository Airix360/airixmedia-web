"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import type { DesignLabConcept } from "@/lib/design-lab";
import { DiscussProjectLink, ReviewCaption } from "./concept-primitives";
import styles from "./reassembled.module.css";

const fragments = [
  { label: "Website", className: styles.fragmentWebsite, x: -150, y: -90, rotate: -8 },
  { label: "Commerce", className: styles.fragmentCommerce, x: 130, y: -120, rotate: 7 },
  { label: "Payment", className: styles.fragmentPayment, x: -180, y: 105, rotate: 5 },
  { label: "Portal", className: styles.fragmentPortal, x: 165, y: 80, rotate: -6 },
  { label: "Publishing", className: styles.fragmentPublishing, x: -80, y: 175, rotate: -4 },
  { label: "Continuity", className: styles.fragmentContinuity, x: 110, y: 165, rotate: 6 },
] as const;

function AssemblyFragment({ item, progress }: { item: typeof fragments[number]; progress: ReturnType<typeof useScroll>["scrollYProgress"] }) {
  const x = useTransform(progress, [0.08, 0.68], [item.x, 0]);
  const y = useTransform(progress, [0.08, 0.68], [item.y, 0]);
  const rotate = useTransform(progress, [0.08, 0.68], [item.rotate, 0]);
  return <motion.div className={`${styles.assemblyFragment} ${item.className}`} style={{ x, y, rotate }}><span>{item.label}</span></motion.div>;
}

export function ReassembledExperience({ concept }: { concept: DesignLabConcept }) {
  const assemblyRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: assemblyRef, offset: ["start end", "end start"] });

  return <main id="main-content" className={styles.reassembled} data-concept="reassembled" data-navigation-model="scaffold-index" data-proof-model="fragment-resolution" data-mobile-reading-lane="true">
    <header className={styles.scaffoldNav} data-record-nav>
      <Link href="/__design_lab" aria-label="Return to Living Lagos concepts">AIRIX / C</Link>
      <nav aria-label="Reassembled scaffold index"><a href="#first-transition">Fragments</a><a href="#proof">Assembly</a><a href="#final-cta">Accountability</a></nav>
      <span>Structure / 03</span>
    </header>

    <section className={styles.opening} aria-labelledby="reassembled-title">
      <div className={styles.materialField} aria-hidden="true">
        <span className={styles.paintBlock}>RUN</span><span className={styles.printStrip}>PAYMENT · WEBSITE · SUPPORT</span><span className={styles.tarpBlock}>BUILD</span><span className={styles.cutPaper}>RESCUE</span><i/><i/><i/>
      </div>
      <div className={styles.readingLane} data-mobile-reading-lane="true">
        <span>C / Living Lagos</span><h1 id="reassembled-title">{concept.strapline}</h1><p>{concept.lens}</p>
      </div>
    </section>

    <section id="first-transition" className={styles.brokenSystem} aria-labelledby="broken-title">
      <div><h2 id="broken-title">Useful parts.<br/>No shared operating logic.</h2><p>{concept.proposition}</p></div>
      <div className={styles.brokenBoard} aria-label="Disconnected digital system fragments">
        <article><b>Website</b><span>Current offer</span></article><article><b>Payment</b><span>Confirmation?</span></article><article><b>Portal</b><span>Who approves?</span></article><article><b>Publishing</b><span>Workflow held</span></article>
      </div>
    </section>

    <section id="proof" ref={assemblyRef} className={styles.assemblyJourney} aria-labelledby="assembly-title">
      <div className={styles.assemblySticky}>
        <div className={styles.assemblyCopy}><h2 id="assembly-title">A system appears when every part knows its role.</h2><p>Structure replaces improvisation. Responsibility becomes legible.</p></div>
        <div className={styles.assemblyBoard} aria-label="Digital responsibilities assembling into one operating system">
          {fragments.map((item) => <AssemblyFragment key={item.label} item={item} progress={scrollYProgress}/>) }
          <div className={styles.systemCore}><b>AIRIX</b><span>One accountable operating layer</span></div>
        </div>
        <ReviewCaption>Concept material · generated locally for private review</ReviewCaption>
      </div>
    </section>

    <section className={styles.resolvedSystem} aria-labelledby="resolved-title">
      <h2 id="resolved-title">Built to be understood.<br/>Run without guesswork.<br/>Recoverable by design.</h2>
      <div><p>Web experiences</p><p>Commerce and payment</p><p>Business operations</p><p>Publishing workflows</p><p>Infrastructure continuity</p></div>
    </section>

    <section id="final-cta" className={styles.accountabilityClose}>
      <h2>Bring us the system<br/>that no longer fits together.</h2><p>We will find the useful parts, make the responsibilities clear, and leave you with something that can be operated.</p><div><DiscussProjectLink/><Link href="/__design_lab">Return to all concepts</Link></div>
    </section>
  </main>;
}
