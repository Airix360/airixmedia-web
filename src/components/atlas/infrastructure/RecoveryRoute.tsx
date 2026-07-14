"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { recoveryRoute } from "@/content/atlas/infrastructure";
import styles from "./atlas-infrastructure.module.css";

export function RecoveryRoute() {
  const [active, setActive] = useState(0);
  const controls = useRef<Array<HTMLButtonElement | null>>([]);
  const move = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (!["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Home", "End"].includes(event.key)) return;
    event.preventDefault(); const delta = event.key === "ArrowLeft" || event.key === "ArrowUp" ? -1 : 1;
    const next = event.key === "Home" ? 0 : event.key === "End" ? recoveryRoute.length - 1 : (index + delta + recoveryRoute.length) % recoveryRoute.length;
    setActive(next); controls.current[next]?.focus();
  };
  const selected = recoveryRoute[active];
  return <section className={styles.recovery} id="recovery-route" aria-labelledby="recovery-title">
    <header><span>Failure and recovery route · proposed structural sequence</span><h2 id="recovery-title">Calm steps through an impaired system.</h2><p>Actual actions vary by incident, access, dependencies, providers, available backups, and confirmed scope. This sequence promises neither timing nor outcome.</p></header>
    <div className={styles.recoveryRoute} data-recovery-route>
      <div className={styles.recoveryControls} role="tablist" aria-label="Variable recovery route">{recoveryRoute.map((stage, index) => <button key={stage.id} ref={(el) => { controls.current[index] = el; }} id={`recovery-tab-${stage.id}`} role="tab" type="button" aria-selected={active === index} aria-controls="recovery-panel" tabIndex={active === index ? 0 : -1} onClick={() => setActive(index)} onKeyDown={(event) => move(event, index)}><span>{stage.index}</span>{stage.name}</button>)}</div>
      <section id="recovery-panel" className={styles.recoveryPanel} role="tabpanel" aria-labelledby={`recovery-tab-${selected.id}`} tabIndex={0}><span>Current route stage · {selected.index}</span><h3>{selected.name}</h3><p>{selected.action}</p><small>{selected.limit}</small></section>
      <ol data-recovery-route-textual-equivalent aria-label="Complete textual recovery route">{recoveryRoute.map((stage) => <li key={stage.id}><span>{stage.index}</span><div><strong>{stage.name}</strong><p>{stage.action}</p><small>{stage.limit}</small></div></li>)}</ol>
    </div>
  </section>;
}
