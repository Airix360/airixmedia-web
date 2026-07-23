import Link from "next/link";
import { collaborationModel } from "@/content/atlas/studio";
import styles from "./atlas-studio.module.css";

export function CollaborationModel() { return <section className={styles.collaboration} aria-labelledby="collaboration-title">
  <header><span>Collaboration model</span><h2 id="collaboration-title">Small by design. Accountable by practice.</h2><p>Repository-recorded Studio language; no employee count, named team, award, certification, location, client total, or years-in-business claim is added.</p></header>
  <ol>{collaborationModel.map((item,index) => <li key={item.title}><span>{String(index+1).padStart(2,"0")}</span><h3>{item.title}</h3><p>{item.body}</p></li>)}</ol>
  <Link href="/start-a-project">Bring a useful brief <span aria-hidden="true">→</span></Link>
</section>; }
