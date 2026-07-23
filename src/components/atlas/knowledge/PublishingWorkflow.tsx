"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import type { PublishingWorkflowStage } from "@/content/atlas/knowledge";
import styles from "./atlas-knowledge.module.css";

export function PublishingWorkflow({ stages }: { stages: readonly PublishingWorkflowStage[] }) {
  const [active, setActive] = useState(0);
  const tabs = useRef<Array<HTMLButtonElement | null>>([]);

  const move = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (!["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    const delta = event.key === "ArrowLeft" || event.key === "ArrowUp" ? -1 : 1;
    const next = event.key === "Home" ? 0 : event.key === "End" ? stages.length - 1 : (index + delta + stages.length) % stages.length;
    setActive(next);
    tabs.current[next]?.focus();
  };

  const selected = stages[active];

  return (
    <div className={styles.workflow} data-publishing-workflow>
      <div className={styles.workflowTabs} role="tablist" aria-label="Configurable publishing workflow stages" aria-orientation="horizontal">
        {stages.map((stage, index) => (
          <button
            key={stage.id}
            ref={(element) => { tabs.current[index] = element; }}
            id={`workflow-tab-${stage.id}`}
            type="button"
            role="tab"
            aria-selected={active === index}
            aria-controls="workflow-stage-panel"
            tabIndex={active === index ? 0 : -1}
            onClick={() => setActive(index)}
            onKeyDown={(event) => move(event, index)}
          >
            <span>{stage.index}</span><strong>{stage.name}</strong>
          </button>
        ))}
      </div>
      <section id="workflow-stage-panel" className={styles.workflowPanel} role="tabpanel" aria-labelledby={`workflow-tab-${selected.id}`} tabIndex={0}>
        <span>Active editorial record · {selected.index}</span>
        <h3>{selected.name}</h3>
        <p>{selected.action}</p>
        <dl><dt>Record carried forward</dt><dd>{selected.record}</dd></dl>
      </section>
      <ol className={styles.workflowText} data-workflow-textual-equivalent aria-label="Complete textual publishing workflow">
        {stages.map((stage) => <li key={stage.id}><span>{stage.index}</span><div><strong>{stage.name}</strong><p>{stage.action}</p><small>{stage.record}</small></div></li>)}
      </ol>
    </div>
  );
}
