"use client";

import { useId, useRef, useState, type KeyboardEvent } from "react";
import type { ProjectMedia } from "@/content/atlas/landmarks";
import styles from "./atlas-proof.module.css";

export function ProjectMediaSequence({ projectName, media }: { projectName: string; media: readonly ProjectMedia[] }) {
  const [active, setActive] = useState(0);
  const prefix = useId();
  const controls = useRef<Array<HTMLButtonElement | null>>([]);

  if (media.length === 0) {
    return (
      <figure className={styles.mediaPlaceholder} data-media-status="placeholder">
        <div aria-hidden="true"><span>01</span><i /><span>CAPTURE REQUIRED</span></div>
        <figcaption><strong>No authentic project media registered.</strong><span>Desktop interface, mobile interface, and implementation detail remain required before approval.</span></figcaption>
      </figure>
    );
  }

  const selectWithKeyboard = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight" && event.key !== "Home" && event.key !== "End") return;
    event.preventDefault();
    const next = event.key === "Home" ? 0 : event.key === "End" ? media.length - 1 : (index + (event.key === "ArrowRight" ? 1 : -1) + media.length) % media.length;
    setActive(next);
    controls.current[next]?.focus();
  };

  const selected = media[active];
  return (
    <div className={styles.mediaSequence} data-media-status="source_capture">
      <div className={styles.mediaTabs} role="tablist" aria-label={`${projectName} evidence views`}>
        {media.map((item, index) => (
          <button
            key={item.id}
            ref={(element) => { controls.current[index] = element; }}
            id={`${prefix}-tab-${index}`}
            type="button"
            role="tab"
            aria-selected={active === index}
            aria-controls={`${prefix}-panel`}
            tabIndex={active === index ? 0 : -1}
            onClick={() => setActive(index)}
            onKeyDown={(event) => selectWithKeyboard(event, index)}
          >
            <span>{String(index + 1).padStart(2, "0")}</span>{item.type}
          </button>
        ))}
      </div>
      <figure id={`${prefix}-panel`} className={styles.mediaPanel} role="tabpanel" aria-labelledby={`${prefix}-tab-${active}`} tabIndex={0}>
        {/* Authentic evidence captures retain their source proportions and should not be transformed by image optimisation. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={selected.src} alt={selected.alt} loading="lazy" decoding="async" />
        <figcaption><span>{selected.type} · {selected.capturedAt}</span><p>{selected.caption}</p></figcaption>
      </figure>
    </div>
  );
}
