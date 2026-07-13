"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { caseStudies } from "@/lib/content";
import { EvidenceFlag } from "./evidence-flag";

export function SelectedSystems() {
  const [active, setActive] = useState(caseStudies[0]);
  return (
    <div className="systems-stage">
      <div className="systems-index" role="tablist" aria-label="Selected systems">
        {caseStudies.slice(0, 5).map((item) => <button key={item.slug} role="tab" className="system-choice" aria-selected={active.slug === item.slug} onClick={() => setActive(item)}>{item.name}<br /><span className="mono">{item.sector}</span></button>)}
      </div>
      <div className="system-canvas">
        <AnimatePresence mode="wait">
          <motion.div className="browser-frame" key={active.slug} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}>
            <div className="browser-bar"><i /><i /><i /><span className="mono">system / {active.slug}</span></div>
            <div className="browser-content"><div><EvidenceFlag state={active.evidence} /><h3>{active.name}</h3><p className="section-copy">{active.summary}</p></div><div className="browser-panel"><span className="mono">SYSTEM RESPONSIBILITY</span><p>{active.solution}</p><strong>{active.ongoingRole}</strong></div></div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
