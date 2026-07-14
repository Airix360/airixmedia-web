import { studioProcess } from "@/content/atlas/studio";
import styles from "./atlas-studio.module.css";

export function StudioProcess() { return <section className={styles.process} id="studio-process" tabIndex={-1} aria-labelledby="process-title">
  <header><span>How work moves</span><h2 id="process-title">A deliberate route from context to ownership.</h2><p>The five-stage sequence is proposed for internal review. Real engagements adapt to their scope, evidence, access, and risk.</p></header>
  <ol data-studio-process>{studioProcess.map((stage) => <li key={stage.index}><span>{stage.index}</span><div><h3>{stage.name}</h3><p>{stage.action}</p><small>{stage.evidence}</small></div></li>)}</ol>
</section>; }
