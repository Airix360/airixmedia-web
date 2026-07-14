import Link from "next/link";
import styles from "./atlas-proof.module.css";

export function CaseStudyLink({ href, label, district }: { href: string; label: string; district: string }) {
  return <Link className={styles.caseStudyLink} href={href}><span><small>Related public route</small>{label}</span><em>{district}</em><b aria-hidden="true">→</b></Link>;
}
