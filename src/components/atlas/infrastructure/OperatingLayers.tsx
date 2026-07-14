"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import type { OperatingLayerRecord } from "@/content/atlas/infrastructure";
import styles from "./atlas-infrastructure.module.css";

export function OperatingLayers({ layers }: { layers: readonly OperatingLayerRecord[] }) {
  const [active, setActive] = useState(0);
  const controls = useRef<Array<HTMLButtonElement | null>>([]);
  const move = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (!["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    const delta = event.key === "ArrowUp" || event.key === "ArrowLeft" ? -1 : 1;
    const next = event.key === "Home" ? 0 : event.key === "End" ? layers.length - 1 : (index + delta + layers.length) % layers.length;
    setActive(next); controls.current[next]?.focus();
  };
  const selected = layers[active];
  return <div className={styles.layerModel} data-operating-layers>
    <div className={styles.layerControls} role="tablist" aria-label="Infrastructure operating layers" aria-orientation="vertical">
      {layers.map((layer, index) => <button key={layer.id} ref={(el) => { controls.current[index] = el; }} id={`layer-tab-${layer.id}`} role="tab" type="button" aria-selected={active === index} aria-controls="operating-layer-panel" tabIndex={active === index ? 0 : -1} onClick={() => setActive(index)} onKeyDown={(event) => move(event, index)}><span>{layer.index}</span><strong>{layer.name}</strong></button>)}
    </div>
    <section className={styles.layerPanel} id="operating-layer-panel" role="tabpanel" aria-labelledby={`layer-tab-${selected.id}`} tabIndex={0}>
      <span>Active operating layer · {selected.index}</span><h3>{selected.name}</h3><p>{selected.role}</p><dl><dt>Dependency</dt><dd>{selected.dependency}</dd></dl>
    </section>
    <ol className={styles.layerText} data-operating-layers-textual-equivalent aria-label="Complete textual operating-layer model">
      {layers.map((layer) => <li key={layer.id}><span>{layer.index}</span><div><strong>{layer.name}</strong><p>{layer.role}</p><small>{layer.dependency}</small></div></li>)}
    </ol>
  </div>;
}
