import { AtlasScene } from "@/components/atlas/scene";
import { AtlasStateMarker } from "@/components/atlas/state";
import type { AtlasSceneAsset } from "@/lib/atlas/types";
import styles from "./atlas-trust.module.css";
export function TrustArrival({scene}:{scene:AtlasSceneAsset}){return <><AtlasStateMarker state="edo" page="Trust" identity="Stewardship Register"/><section className={styles.arrival} aria-labelledby="trust-title"><AtlasScene scene={scene} mode="static" priority className={styles.scene}/><span className={styles.candidate}>Candidate Edo art · private review</span><div className={styles.copy}><span>Trust · proposed internal copy</span><h1 id="trust-title">Accountability, made visible.</h1><p>Evidence, boundaries, maintenance, limitations, and responsibility belong in the same record.</p><a href="#trust-register">Open the register ↓</a></div></section></>}
