import Link from "next/link";
import type { CommerceServicePathway } from "@/content/atlas/commerce";
import { CapabilityGroup } from "./CapabilityGroup";
import styles from "./atlas-services.module.css";

const statusLabel = {
  repository_record: "Repository scope record",
  proposed_internal: "Proposed internal scope · approval required",
} as const;

export function ServicePathway({ pathway }: { pathway: CommerceServicePathway }) {
  return (
    <article className={styles.servicePathway} id={pathway.id} data-pathway={pathway.id} data-evidence-status={pathway.evidenceStatus}>
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
