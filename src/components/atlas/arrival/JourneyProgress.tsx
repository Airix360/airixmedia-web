"use client";

import { useEffect, useState } from "react";
import styles from "./atlas-arrival.module.css";

const steps = [
  ["wonder", "Wonder", "arrival-opening"],
  ["movement", "Movement", "arrival-movement"],
  ["discovery", "Discovery", "arrival-discovery"],
  ["understanding", "Understanding", "arrival-proposition"],
] as const;

export function JourneyProgress() {
  const [active, setActive] = useState<(typeof steps)[number][0]>(steps[0][0]);

  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        const target = visible?.target;
        if (target instanceof HTMLElement) {
          const next = steps.find(([id]) => id === target.dataset.arrivalStep)?.[0];
          if (next) setActive(next);
        }
      },
      { rootMargin: "-30% 0px -45%", threshold: [0, 0.2, 0.5, 0.8] },
    );
    document.querySelectorAll<HTMLElement>("[data-arrival-step]").forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <nav className={styles.journeyProgress} aria-label="Arrival journey progress">
      <ol>
        {steps.map(([id, label, target], index) => (
          <li key={id} data-active={active === id}>
            <a href={`#${target}`} aria-current={active === id ? "step" : undefined}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <b>{label}</b>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
