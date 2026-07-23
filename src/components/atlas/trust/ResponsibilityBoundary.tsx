import { responsibilityBoundaries } from "@/content/atlas/trust";
import styles from "./atlas-trust.module.css";
export function ResponsibilityBoundary(){return <section className={styles.boundaries} aria-labelledby="boundary-title"><header><span>Responsibility boundary</span><h2 id="boundary-title">Trust includes knowing where control ends.</h2></header><dl data-responsibility-boundaries>{responsibilityBoundaries.map(([term,detail],index)=><div key={term}><dt><span>{String(index+1).padStart(2,"0")}</span>{term}</dt><dd>{detail}</dd></div>)}</dl></section>}
