import Link from "next/link";
import { W7ReviewShell } from "./W7ReviewShell";
import { atlasWorldStates, visitorRoutes } from "@/content/atlas/w7";
import type { AtlasSceneAsset } from "@/lib/atlas/types";
import styles from "./atlas-w7.module.css";
export function ObservatoryReview({ scene, auditMode = false }: { scene: AtlasSceneAsset; auditMode?: boolean }) {
  return (
    <W7ReviewShell
      scene={scene}
      state="plateau"
      page="Atlas"
      identity="Observatory"
      kind="observatory"
      title="See the whole system."
      body="Atlas organises services, proof, knowledge, operations, making, experiments, and project entry as one coherent Nigerian world."
      skip="atlas-world-map"
      auditMode={auditMode}
    >
      <section className={styles.section} id="atlas-world-map" tabIndex={-1}>
        <header>
          <span>Long view of Atlas</span>
          <h2>States give purpose a place.</h2>
          <p>
            Public labels remain the primary navigation. State and district
            identities provide context, material, rhythm, and orientation.
          </p>
        </header>
        <div
          className={styles.map}
          role="img"
          aria-label="Conceptual relationship of seven Atlas state identities"
        >
          <ol>
            {atlasWorldStates.map(([state, role, status]) => (
              <li key={state}>
                <strong>{state}</strong>
                <p>{role}</p>
                <small>{status}</small>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <section className={styles.section} data-tone="dark">
        <header>
          <span>Visitor routes</span>
          <h2>Choose by intent, not metaphor.</h2>
          <p>
            The Atlas environment enriches direct routes; it never replaces
            them.
          </p>
        </header>
        <ol className={styles.ledger}>
          {visitorRoutes.map(([intent, label, href]) => (
            <li key={label}>
              <small>{intent}</small>
              <h3>{label}</h3>
              <p>
                <Link href={href}>Open public {label} ↗</Link>
              </p>
            </li>
          ))}
        </ol>
      </section>
    </W7ReviewShell>
  );
}
