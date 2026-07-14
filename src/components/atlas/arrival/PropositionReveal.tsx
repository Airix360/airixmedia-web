import type { AtlasLibraryAsset } from "@/lib/atlas/types";
import { SystemsTransition } from "./SystemsTransition";
import styles from "./atlas-arrival.module.css";

export function PropositionReveal({ marker }: { marker: AtlasLibraryAsset }) {
  return (
    <section id="arrival-proposition" className={styles.proposition} data-arrival-step="understanding" data-rhythm="monumental-calm" aria-labelledby="arrival-proposition-title" tabIndex={-1}>
      <div className={styles.propositionStatement}>
        <span>Arrival · Understanding</span>
        <h2 id="arrival-proposition-title">We build the invisible systems that allow ambitious organisations to thrive.</h2>
        <p>Invisible systems. Visible progress.</p>
      </div>
      <SystemsTransition marker={marker} />
    </section>
  );
}
