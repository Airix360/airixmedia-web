import { ExternalLink } from "lucide-react";
import { atlasUtilityNavigation } from "@/content/atlas/navigation";
import styles from "./atlas-navigation.module.css";

export function PortalAccess({ compact = false }: { compact?: boolean }) {
  const portal = atlasUtilityNavigation.find((item) => item.label === "Client Portal")!;
  return <a className={compact ? styles.portalCompact : styles.portal} href={portal.href} target="_blank" rel="noreferrer">{portal.label}<ExternalLink size={14} aria-hidden="true" /></a>;
}
