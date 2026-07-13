import styles from "./atlas-accessibility.module.css";

export function SkipJourneyLink({ href = "#atlas-review-content", label = "Skip Atlas scene" }: { href?: string; label?: string }) {
  return <a className={styles.skipJourney} href={href}>{label}</a>;
}
