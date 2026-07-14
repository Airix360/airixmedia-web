import type { ProofStatus } from "@/content/atlas/landmarks";
import styles from "./atlas-proof.module.css";

const labels: Record<ProofStatus, string> = {
  verified: "Verified",
  source_capture: "Source captured",
  placeholder: "Evidence incomplete",
};

export function ProjectFeature({ eyebrow, name, relationship, status, headingId }: { eyebrow: string; name: string; relationship: string; status: ProofStatus; headingId: string }) {
  return (
    <header className={styles.projectFeature} data-proof-status={status}>
      <div><span>{eyebrow}</span><h2 id={headingId}>{name}</h2><p>{relationship}</p></div>
      <strong><i aria-hidden="true" />{labels[status]}</strong>
    </header>
  );
}
