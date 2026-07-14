import { studioPrinciples } from "@/content/atlas/studio";
import styles from "./atlas-studio.module.css";

export function StudioPrinciples() { return <section className={styles.principles} aria-labelledby="principles-title">
  <header><span>Principles and responsibilities</span><h2 id="principles-title">The standard lives in the decisions.</h2></header>
  <dl>{studioPrinciples.map(([term, detail], index) => <div key={term}><dt><span>{String(index + 1).padStart(2,"0")}</span>{term}</dt><dd>{detail}</dd></div>)}</dl>
</section>; }
