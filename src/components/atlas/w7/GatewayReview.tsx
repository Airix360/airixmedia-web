import Link from "next/link";
import { W7ReviewShell } from "./W7ReviewShell";
import { ProjectRouteSelector } from "./ReviewForms";
import type { AtlasSceneAsset } from "@/lib/atlas/types";
import styles from "./atlas-w7.module.css";
export function GatewayReview({ scene, auditMode = false }: { scene: AtlasSceneAsset; auditMode?: boolean }) {
  return (
    <W7ReviewShell
      scene={scene}
      state="ogun"
      page="Discuss a Project"
      identity="Project Gateway"
      kind="gateway"
      title="Start with the right route."
      body="Choose the kind of responsibility involved, then bring context, constraints, timing, and ownership into a useful project brief."
      skip="project-route-selector"
      auditMode={auditMode}
    >
      <section
        className={styles.section}
        id="project-route-selector"
        tabIndex={-1}
      >
        <header>
          <span>What are we building?</span>
          <h2>Seven routes. One serious conversation.</h2>
          <p>
            Selection is local-only in W7. It does not create a lead or persist
            information.
          </p>
        </header>
        <ProjectRouteSelector />
      </section>
      <section className={styles.section} data-tone="dark">
        <header>
          <span>Readiness</span>
          <h2>Context before calendar.</h2>
          <p>
            A useful brief covers the organisation, problem, current system,
            service route, urgency, launch window, budget, billing country,
            support need, and available evidence.
          </p>
        </header>
        <ol className={styles.ledger}>
          <li>
            <small>01</small>
            <h3>Choose a route</h3>
            <p>
              Use the closest responsibility; uncertainty is a valid starting
              point.
            </p>
          </li>
          <li>
            <small>02</small>
            <h3>Prepare context</h3>
            <p>
              State what must work, who it affects, constraints, access, timing,
              and ownership.
            </p>
          </li>
          <li>
            <small>03</small>
            <h3>Airix reviews</h3>
            <p>
              A proposal or booking follows human review; this prototype creates
              neither.
            </p>
          </li>
        </ol>
        <div className={styles.linkRow}>
          <Link href="/start-a-project">Open public project brief</Link>
          <Link href="/contact">Use public Contact</Link>
        </div>
      </section>
    </W7ReviewShell>
  );
}
