import Link from "next/link";
import { knownTrustLimitations } from "@/content/atlas/trust";
import styles from "./atlas-trust.module.css";
export function KnownLimitations(){return <section className={styles.limitations} aria-labelledby="limitations-title"><header><span>Known limitations</span><h2 id="limitations-title">Not verified is not hidden.</h2><p>No testimonial, score, badge, certification, guarantee, award, customer count, uptime, or response time is introduced in this review.</p></header><ol>{knownTrustLimitations.map((item,index)=><li key={item}><span>{String(index+1).padStart(2,"0")}</span><p>{item}</p></li>)}</ol><div><Link href="/security">Security posture ↗</Link><Link href="/support">Support routes ↗</Link><Link href="/legal">Draft legal centre ↗</Link></div></section>}
