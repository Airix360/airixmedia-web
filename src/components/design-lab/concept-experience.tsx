"use client";

import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef, type CSSProperties, type PointerEvent } from "react";
import type { DesignLabConcept } from "@/lib/design-lab";
import styles from "./design-lab.module.css";

function CityScene({ slug }: { slug: DesignLabConcept["slug"] }) {
  if (slug === "after-dark") return <div className={styles.nightScene} aria-hidden="true">
    <svg viewBox="0 0 1200 760" preserveAspectRatio="xMidYMid slice">
      <path className={styles.lagoon} d="M0 545C160 478 292 652 454 563S725 410 884 506s221 75 316 18v236H0Z" />
      <g className={styles.nightRoads}><path d="M-30 128 1230 682"/><path d="M-20 585 1100 52"/><path d="M156-20 500 790"/><path d="M760-40 542 790"/><path d="M970-30 120 790"/></g>
      <g className={styles.bridge}><path d="M35 568C360 458 786 455 1170 579"/><path d="M36 592C366 482 792 478 1168 603"/></g>
      <g className={styles.traffic}><circle cx="184" cy="534" r="7"/><circle cx="348" cy="493" r="7"/><circle cx="619" cy="474" r="7"/><circle cx="924" cy="515" r="7"/><circle cx="1055" cy="556" r="7"/></g>
    </svg>
    <span className={styles.nightDistrict}>01:42 / SYSTEMS ACTIVE</span>
    <span className={styles.nightPulse}>LAGOS, NG</span>
  </div>;

  if (slug === "in-motion") return <div className={styles.motionScene} aria-hidden="true">
    <div className={styles.sunDisc} />
    <div className={styles.marketRun}>{["OPEN", "MOVE", "EXCHANGE", "MAKE", "DELIVER"].map((word, index) => <span style={{ "--i": index } as CSSProperties} key={word}>{word}</span>)}</div>
    <svg viewBox="0 0 1200 760" preserveAspectRatio="xMidYMid slice"><path className={styles.wake} d="M-20 620c170-110 340 95 520-28s352-114 720 20"/><path className={styles.wakeSecond} d="M-20 671c190-108 390 100 600-19s390-96 660 16"/><path className={styles.ferry} d="m545 557 174 0-33 40H570Z"/></svg>
    <div className={styles.danfoMark}><span>CMS</span><i /><span>YABA</span></div>
  </div>;

  return <div className={styles.assembledScene} aria-hidden="true">
    <div className={`${styles.scrap} ${styles.scrapOne}`}>BUILD<br/>RUN</div>
    <div className={`${styles.scrap} ${styles.scrapTwo}`}>KEEP<br/>MOVING</div>
    <div className={`${styles.scrap} ${styles.scrapThree}`}>SYSTEM<br/>03</div>
    <div className={`${styles.scrap} ${styles.scrapFour}`}>RESCUE</div>
    <div className={styles.scaffold}><i/><i/><i/><i/><i/></div>
    <div className={styles.halftone} />
  </div>;
}

function ConceptInterface({ slug }: { slug: DesignLabConcept["slug"] }) {
  return <div className={styles.interfaceWrap}>
    <span className={styles.conceptLabel}>Concept interface</span>
    <div className={styles.interfaceTop}><span>Operating view</span><span>Live structure / 03</span></div>
    <div className={styles.interfaceBody}>
      <div className={styles.interfaceIndex}><b>Build</b><span>New digital product</span><b>Run</b><span>Ongoing operations</span><b>Rescue</b><span>Recovery and control</span></div>
      <div className={styles.interfaceSignal}>
        <svg viewBox="0 0 520 220" aria-hidden="true"><path d="M10 181C72 167 81 62 146 83s74 94 137 70 76-125 143-102 48 100 84 70"/><circle cx="146" cy="83" r="7"/><circle cx="283" cy="153" r="7"/><circle cx="426" cy="51" r="7"/></svg>
        <p>{slug === "after-dark" ? "Systems remain observable after handover." : slug === "in-motion" ? "Every handoff stays visible while work moves." : "Existing parts resolve into one accountable flow."}</p>
      </div>
    </div>
  </div>;
}

export function ConceptExperience({ concept }: { concept: DesignLabConcept }) {
  const reducedMotion = useReducedMotion();
  const opening = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: opening, offset: ["start start", "end start"] });
  const sceneY = useTransform(scrollYProgress, [0, 1], ["0%", reducedMotion ? "0%" : "18%"]);
  const sceneScale = useTransform(scrollYProgress, [0, 1], [1, reducedMotion ? 1 : 1.08]);

  function trackPointer(event: PointerEvent<HTMLElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--pointer-x", `${((event.clientX - rect.left) / rect.width) * 100}%`);
    event.currentTarget.style.setProperty("--pointer-y", `${((event.clientY - rect.top) / rect.height) * 100}%`);
  }

  return <main id="main-content" className={`${styles.concept} ${styles[concept.slug.replace("-", "") as "afterdark" | "inmotion" | "reassembled"]}`} onPointerMove={trackPointer}>
    <header className={styles.conceptHeader}>
      <Link className={styles.labMark} href="/__design_lab"><span>Airix Media</span><small>Living Lagos / {concept.index}</small></Link>
      <nav aria-label="Concept navigation"><a href="#proposition">Position</a><a href="#selected-work">First proof</a><Link href="/__design_lab">All concepts</Link></nav>
    </header>
    <section className={styles.opening} ref={opening} aria-labelledby="opening-title">
      <motion.div className={styles.sceneMotion} style={{ y: sceneY, scale: sceneScale }}><CityScene slug={concept.slug} /></motion.div>
      <div className={styles.openingCaption}><span>{concept.index} / LIVING LAGOS</span><h1 id="opening-title">{concept.strapline}</h1><p>{concept.lens}</p></div>
      <div className={styles.pointerEcho} aria-hidden="true" />
      <a className={styles.scrollCue} href="#proposition"><span>Enter the system</span><i /></a>
      <div className={styles.reducedProposition}><p>{concept.proposition}</p><div><Link href="/start-a-project">Discuss a project</Link><a href="#selected-work">View selected work</a></div></div>
    </section>
    <section id="proposition" className={styles.proposition}>
      <span className={styles.sectionNumber}>01 / POSITION</span>
      <motion.div initial={reducedMotion ? false : { opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .35 }} transition={{ duration: .7 }}>
        <h2>{concept.proposition}</h2>
        <p>{concept.summary}</p>
        <div className={styles.conceptActions}><Link href="/start-a-project">Discuss a project</Link><a href="#selected-work">View selected work</a></div>
      </motion.div>
    </section>
    <section id="selected-work" className={styles.firstProof}>
      <div className={styles.proofLead}><span className={styles.sectionNumber}>02 / FIRST PROOF</span><h2>A system should reveal how the work moves.</h2><p>No invented client story. This generated study demonstrates the relationship between delivery, operation and recovery.</p></div>
      <motion.div initial={reducedMotion ? false : { opacity: 0, y: 80 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .25 }} transition={{ duration: .8 }}><ConceptInterface slug={concept.slug} /></motion.div>
    </section>
    <section className={styles.methodSection}>
      <span className={styles.sectionNumber}>03 / OPERATING MODEL</span>
      <div className={styles.methodWords}><article><b>Build.</b><p>Define the useful thing and make it real.</p></article><article><b>Run.</b><p>Stay close enough to keep it dependable.</p></article><article><b>Rescue.</b><p>Restore visibility before adding complexity.</p></article></div>
    </section>
    <footer className={styles.conceptFooter}><Link href="/__design_lab">← Return to concept review</Link><span>Private study · noindex · Phase 03</span></footer>
  </main>;
}
