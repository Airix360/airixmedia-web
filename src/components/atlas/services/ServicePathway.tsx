import Link from "next/link";
import { CapabilityGroup } from "./CapabilityGroup";
import styles from "./atlas-services.module.css";

export interface ServicePathwayContent {
  id: string;
  index: string;
  name: string;
  summary: string;
  covers: readonly string[];
  needs: readonly string[];
  mayBuild: readonly string[];
  route: string;
  routeLabel: string;
  evidenceStatus: "repository_record" | "proposed_internal";
  sources: readonly string[];
}

const statusLabel = {
  repository_record: "Repository scope record",
  proposed_internal: "Proposed internal scope · approval required",
} as const;

export function ServicePathway({ pathway, variant = "commerce" }: { pathway: ServicePathwayContent; variant?: "commerce" | "knowledge" }) {
  return (
    <article className={styles.servicePathway} id={pathway.id} data-pathway={pathway.id} data-evidence-status={pathway.evidenceStatus} data-pathway-variant={variant}>
      <div className={styles.pathwayRoute} aria-hidden="true"><span>{pathway.index}</span><i /></div>
      <header>
        <span>Service pathway {pathway.index}</span>
        <h2>{pathway.name}</h2>
        <p>{pathway.summary}</p>
      </header>
      <div className={styles.pathwayCapabilities}>
        <CapabilityGroup label="Scope" title="What it covers" items={pathway.covers} />
        <CapabilityGroup label="Common need" title="When it becomes useful" items={pathway.needs} />
        <CapabilityGroup label="Airix scope" title="What Airix may build or connect" items={pathway.mayBuild} />
      </div>
      <footer>
        <div><span>Evidence status</span><strong>{statusLabel[pathway.evidenceStatus]}</strong><small>{pathway.sources.join(" · ")}</small></div>
        <Link href={pathway.route}>Explore {pathway.routeLabel}<span aria-hidden="true"> →</span></Link>
      </footer>
    </article>
  );
}
