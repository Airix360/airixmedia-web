import { studioWorkingLayers } from "@/content/atlas/studio";
import styles from "./atlas-studio.module.css";

export function WorkingCompound() { return <section className={styles.compound} aria-labelledby="compound-title">
  <header><span>The working compound</span><h2 id="compound-title">One practice. Five connected responsibilities.</h2><p>Airix is recorded as a boutique creative-technology studio. This model explains how its stated practices relate; it does not claim a team size or fixed staffing structure.</p></header>
  <ol data-studio-working-layers>{studioWorkingLayers.map((item) => <li key={item.index}><span>{item.index}</span><h3>{item.name}</h3><p>{item.detail}</p></li>)}</ol>
</section>; }
