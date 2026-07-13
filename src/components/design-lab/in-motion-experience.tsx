"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import type { DesignLabConcept } from "@/lib/design-lab";
import { DiscussProjectLink, ReviewCaption } from "./concept-primitives";
import styles from "./in-motion.module.css";

const handoffs = [
  { name: "Idea", code: "01", title: "A useful proposition finds its shape.", kind: "idea", detail: "Strategy → structure" },
  { name: "Experience", code: "02", title: "A website makes the decision easier.", kind: "experience", detail: "Interface → action" },
  { name: "Payment", code: "03", title: "Commerce moves value without losing trust.", kind: "payment", detail: "Order → confirmation" },
  { name: "Operation", code: "04", title: "The business sees what happens next.", kind: "operation", detail: "Portal → approval" },
  { name: "Support", code: "05", title: "Someone stays responsible after launch.", kind: "support", detail: "Signal → response" },
] as const;

function DaylightCurrent() {
  return <div className={styles.daylightScene} aria-hidden="true">
    <div className={styles.sun}/>
    <div className={styles.marketVerbs}><b>OPEN</b><b>MOVE</b><b>EXCHANGE</b><b>MAKE</b><b>DELIVER</b></div>
    <svg viewBox="0 0 1400 900" preserveAspectRatio="xMidYMid slice"><path className={styles.waterOne} d="M-30 690c220-124 390 118 626-30s470-84 850 32"/><path className={styles.waterTwo} d="M-50 775c240-112 428 101 680-23s490-54 830 49"/><path className={styles.ferry} d="m590 624 205 0-39 47H620Z"/></svg>
  </div>;
}

function HandoffVisual({ kind }: { kind: typeof handoffs[number]["kind"] }) {
  if (kind === "idea") return <div className={styles.ideaVisual}><span>Need</span><i/><strong>Direction</strong></div>;
  if (kind === "experience") return <div className={styles.webVisual}><nav>Airix concept site <span>Menu</span></nav><strong>Move from attention<br/>to understanding.</strong><div><i/><i/><i/></div></div>;
  if (kind === "payment") return <div className={styles.paymentVisual}><span>ORDER</span><span>PAYMENT</span><span>CONFIRMED</span><svg viewBox="0 0 500 130"><path d="M8 78h126l42-42 71 68 63-46 72 23 109-55"/></svg></div>;
  if (kind === "operation") return <div className={styles.portalVisual}><b>Projects</b><b>Approvals</b><b>Billing</b><span>Clear next action</span></div>;
  return <div className={styles.supportVisual}><span/><span/><span/><strong>Continuity held</strong></div>;
}

export function InMotionExperience({ concept }: { concept: DesignLabConcept }) {
  const [active, setActive] = useState(0);
  const current = handoffs[active];
  const move = (direction: number) => setActive((active + direction + handoffs.length) % handoffs.length);

  return <main id="main-content" className={styles.inMotion} data-concept="in-motion" data-navigation-model="destination-strip" data-proof-model="controlled-handoff">
    <header className={styles.dispatchNav} data-record-nav>
      <Link href="/__design_lab" aria-label="Return to Living Lagos concepts">AIRIX / B</Link>
      <nav aria-label="In Motion destinations"><a href="#first-transition">Current</a><a href="#proof">Handoffs</a><a href="#pathways">Pathways</a><a href="#final-cta">Discuss</a></nav>
      <div><button onClick={() => move(-1)} aria-label="Previous handoff">←</button><span>{current.code} / 05</span><button onClick={() => move(1)} aria-label="Next handoff">→</button></div>
    </header>

    <section className={styles.opening} aria-labelledby="in-motion-title">
      <DaylightCurrent />
      <div className={styles.openingStatement}>
        <span>B / Living Lagos</span>
        <h1 id="in-motion-title">{concept.strapline}</h1>
        <p>{concept.lens}</p>
      </div>
      <a href="#first-transition" className={styles.joinCurrent}>Join the current <span aria-hidden="true">→</span></a>
    </section>

    <section id="first-transition" className={styles.currentProposition}>
      <div className={styles.propositionTrack} aria-hidden="true"><span>IDEA</span><span>EXPERIENCE</span><span>PAYMENT</span><span>OPERATION</span><span>SUPPORT</span></div>
      <p>{concept.proposition}</p>
      <span>Every handoff should stay visible.</span>
    </section>

    <section id="proof" className={styles.handoffJourney} aria-labelledby="handoff-title">
      <div className={styles.handoffHead}><h2 id="handoff-title">Work moves.<br/>Responsibility travels with it.</h2><p>Select a stage or use the dispatch controls.</p></div>
      <div className={styles.stageSelector} role="tablist" aria-label="Digital work handoff stages">
        {handoffs.map((stage, index) => <button role="tab" aria-selected={active === index} aria-controls="handoff-stage" onClick={() => setActive(index)} key={stage.name}><span>{stage.code}</span>{stage.name}</button>)}
      </div>
      <div id="handoff-stage" className={styles.handoffStage} role="tabpanel">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div key={current.name} className={styles.activeHandoff} initial={{ x: "18%", opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: "-18%", opacity: 0 }} transition={{ duration: .42 }}>
            <div className={styles.handoffCopy}><span>{current.detail}</span><h3>{current.title}</h3></div>
            <HandoffVisual kind={current.kind}/>
          </motion.div>
        </AnimatePresence>
      </div>
      <ReviewCaption>Concept material · generated locally for private review</ReviewCaption>
    </section>

    <section id="pathways" className={styles.pathways}>
      <article><span>Websites · commerce · business systems</span><h2>Digital experiences and systems</h2><p>From first interaction to the operation behind it.</p><a href="#final-cta">Take this route →</a></article>
      <article><span>Platforms · workflows · payments · support</span><h2>Publishing technology</h2><p>Specialist infrastructure for serious scholarly work.</p><a href="#final-cta">Take this route →</a></article>
    </section>

    <section id="final-cta" className={styles.dispatchClose}>
      <span>Next destination</span><h2>Bring the problem.<br/>We will map the movement.</h2><DiscussProjectLink/><Link href="/__design_lab">All concepts</Link>
    </section>
  </main>;
}
