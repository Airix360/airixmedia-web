import Link from "next/link";
import { emergencyRecord } from "@/content/atlas/infrastructure";
import styles from "./atlas-infrastructure.module.css";

export function EmergencySupportCTA() {
  return <aside className={styles.emergency} id="emergency-support" aria-labelledby="emergency-title" data-emergency-support>
    <header><span>Emergency route · direct access</span><h2 id="emergency-title">{emergencyRecord.heading}</h2><p>{emergencyRecord.instruction}</p><Link href={emergencyRecord.href}>Open Emergency Recovery <span aria-hidden="true">→</span></Link></header>
    <section><h3>Provide this context</h3><ul>{emergencyRecord.provide.map((item) => <li key={item}>{item}</li>)}</ul></section>
    <section><h3>Terms kept explicit</h3>{emergencyRecord.limits.map((item) => <p key={item}>{item}</p>)}<strong>Unavailable public terms</strong>{emergencyRecord.missing.map((item) => <small key={item}>{item}</small>)}</section>
  </aside>;
}
