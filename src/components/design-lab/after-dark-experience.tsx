"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { useState, type PointerEvent } from "react";
import type { DesignLabConcept } from "@/lib/design-lab";
import { DiscussProjectLink, ReviewCaption } from "./concept-primitives";
import styles from "./after-dark.module.css";

function NightLandscape() {
  return <div className={styles.landscape} aria-hidden="true">
    <svg viewBox="0 0 1400 900" preserveAspectRatio="xMidYMid slice">
      <path className={styles.lagoon} d="M0 632C180 545 326 733 520 630s322-170 503-62 261 74 377 10v322H0Z" />
      <g className={styles.routes}><path d="M-90 168 1480 788"/><path d="M-30 690 1285 42"/><path d="M158-80 590 960"/><path d="M893-30 632 950"/><path d="M1170-50 130 940"/></g>
      <g className={styles.bridge}><path d="M-10 694C370 554 890 554 1430 713"/><path d="M-12 727C375 587 896 585 1432 747"/></g>
      <g className={styles.signals}><circle cx="195" cy="674" r="7"/><circle cx="405" cy="615" r="7"/><circle cx="745" cy="575" r="7"/><circle cx="1087" cy="616" r="7"/><circle cx="1296" cy="688" r="7"/></g>
    </svg>
  </div>;
}

function CorridorScene({ responsibility, title, body, kind }: { responsibility: string; title: string; body: string; kind: "build" | "operate" | "recover" }) {
  return <article className={`${styles.corridorScene} ${styles[kind]}`}>
    <div className={styles.sceneGraphic} aria-hidden="true">
      {kind === "build" && <div className={styles.siteScene}><span>Home</span><strong>Useful digital experiences begin with a clear point of view.</strong><i/><i/><i/></div>}
      {kind === "operate" && <div className={styles.operationScene}><b>PAYMENT</b><b>PORTAL</b><b>INFRA</b><svg viewBox="0 0 500 220"><path d="M18 174C92 164 88 49 170 77s72 111 154 68 91-103 161-48"/></svg></div>}
      {kind === "recover" && <div className={styles.recoveryScene}><span/><span/><span/><span/><strong>CONTROL<br/>RESTORED</strong></div>}
    </div>
    <div className={styles.sceneCopy}><span>{responsibility}</span><h2>{title}</h2><p>{body}</p></div>
  </article>;
}

export function AfterDarkExperience({ concept }: { concept: DesignLabConcept }) {
  const [menuOpen, setMenuOpen] = useState(false);

  function trackPointer(event: PointerEvent<HTMLElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--night-x", `${((event.clientX - rect.left) / rect.width) * 100}%`);
    event.currentTarget.style.setProperty("--night-y", `${((event.clientY - rect.top) / rect.height) * 100}%`);
  }

  return <main id="main-content" className={styles.afterDark} data-concept="after-dark" data-navigation-model="route-legend" data-proof-model="immersive-corridor" onPointerMove={trackPointer}>
    <aside className={styles.routeLegend} data-record-nav>
      <Link className={styles.routeHome} href="/__design_lab" aria-label="Return to Living Lagos concepts">A</Link>
      <span className={styles.routeStatus}><i/> Systems active</span>
      <button aria-expanded={menuOpen} aria-controls="night-route-menu" onClick={() => setMenuOpen((open) => !open)}>Routes</button>
      <nav id="night-route-menu" aria-label="After Dark routes" data-open={menuOpen}>
        <a href="#build-scene">Build</a><a href="#operate-scene">Operate</a><a href="#recover-scene">Recover</a><a href="#final-cta">Contact</a>
      </nav>
    </aside>

    <section className={styles.opening} aria-labelledby="after-dark-title">
      <NightLandscape />
      <div className={styles.pointerLight} aria-hidden="true" />
      <div className={styles.openingCopy}>
        <h1 id="after-dark-title">{concept.strapline}</h1>
        <p>{concept.lens}</p>
      </div>
      <motion.p className={styles.landscapeProposition} initial={{ opacity: .18 }} whileInView={{ opacity: 1 }} viewport={{ once: true, amount: .8 }} transition={{ duration: 1.8 }}>
        Airix builds digital systems that remain dependable after the launch moment passes.
      </motion.p>
      <a className={styles.enterRoute} href="#build-scene">Follow the signal <span aria-hidden="true">↓</span></a>
    </section>

    <section id="proof" className={styles.corridor} aria-label="Airix responsibility corridor">
      <div id="first-transition" />
      <div id="build-scene"><CorridorScene responsibility="Build" title="Make the useful thing visible." body="Websites, commerce and business systems take shape as one intentional experience—not a pile of features." kind="build" /></div>
      <div id="operate-scene"><CorridorScene responsibility="Operate" title="Keep every handoff observable." body="Payments, approvals, portals and infrastructure remain connected to the people responsible for them." kind="operate" /></div>
      <div id="recover-scene"><CorridorScene responsibility="Recover" title="Restore control before adding complexity." body="Airix traces failure, reconnects the critical path and leaves the system easier to own." kind="recover" /></div>
      <ReviewCaption>Concept material · generated locally for private review</ReviewCaption>
    </section>

    <section id="final-cta" className={styles.quietClose}>
      <p>When the city goes quiet, the system should still make sense.</p>
      <DiscussProjectLink />
      <Link href="/__design_lab">Return to all concepts</Link>
      <span>After Dark / private study</span>
    </section>
  </main>;
}
