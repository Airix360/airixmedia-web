import { infrastructurePathways, operatingLayers } from "@/content/atlas/infrastructure";
import { ServicePathway } from "@/components/atlas/services";
import { OperatingLayers } from "./OperatingLayers";
import styles from "./atlas-infrastructure.module.css";

export function InfrastructureCapabilities() {
  return <section className={styles.capabilities} id="infrastructure-capabilities" aria-labelledby="capabilities-title" tabIndex={-1}>
    <header><span>Systems become visible</span><h2 id="capabilities-title">Seven layers. One operating responsibility.</h2><p>The model shows dependencies, not a universal architecture. Actual providers, environments, access, and terms are defined during scoping.</p></header>
    <OperatingLayers layers={operatingLayers} />
    <div className={styles.pathwayHeading}><span>Infrastructure capability routes</span><h2>Six ways Airix may operate, connect, or restore a system.</h2></div>
    <nav className={styles.pathwayIndex} aria-label="Infrastructure capability groups">{infrastructurePathways.map((pathway) => <a key={pathway.id} href={`#${pathway.id}`}><span>{pathway.index}</span>{pathway.name}</a>)}</nav>
    <div className={styles.pathways}>{infrastructurePathways.map((pathway) => <ServicePathway key={pathway.id} pathway={pathway} variant="infrastructure" />)}</div>
  </section>;
}
