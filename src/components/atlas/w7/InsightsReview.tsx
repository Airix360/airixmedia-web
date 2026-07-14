import Link from "next/link";
import { W7ReviewShell } from "./W7ReviewShell";
import { insightRecords } from "@/content/atlas/w7";
import type { AtlasSceneAsset } from "@/lib/atlas/types";
import styles from "./atlas-w7.module.css";
export function InsightsReview({ scene, auditMode = false }: { scene: AtlasSceneAsset; auditMode?: boolean }) {
  return (
    <W7ReviewShell
      scene={scene}
      state="plateau"
      page="Insights"
      identity="Field-note Terrace"
      kind="insights"
      title="Observation becomes guidance."
      body="A research and editorial system for practical notes about publishing, digital systems, infrastructure, design, and operations."
      skip="observation-index"
      auditMode={auditMode}
    >
      <section className={styles.section} id="observation-index" tabIndex={-1}>
        <header>
          <span>Current observations</span>
          <h2>Only published material reads as published.</h2>
          <p>
            Structural examples remain visibly labelled and have no invented
            author, date, claim, or destination.
          </p>
        </header>
        <ol className={styles.ledger}>
          {insightRecords.map((x, i) => (
            <li key={x.title}>
              <small>
                {String(i + 1).padStart(2, "0")} · {x.status}
              </small>
              <h3>{x.title}</h3>
              <p>
                {x.note}{" "}
                {x.href ? (
                  <Link href={x.href}>Inspect public material ↗</Link>
                ) : null}
              </p>
            </li>
          ))}
        </ol>
      </section>
      <section className={styles.section} data-tone="stone">
        <header>
          <span>Subject routes</span>
          <h2>Research follows operating questions.</h2>
          <p>
            Publishing operations, digital systems, infrastructure, design
            practice, and open-source engineering form future editorial routes.
            No publication cadence is promised.
          </p>
        </header>
        <div className={styles.linkRow}>
          <Link href="/insights">Public Insights</Link>
          <Link href="/resources">Public Resources</Link>
          <Link href="/open-source">Open source</Link>
        </div>
      </section>
    </W7ReviewShell>
  );
}
