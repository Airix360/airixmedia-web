import Link from "next/link";
import { AtlasScene } from "@/components/atlas/scene";
import { AtlasStateMarker } from "@/components/atlas/state";
import type { AtlasSceneAsset } from "@/lib/atlas/types";
import styles from "./atlas-studio.module.css";

export function StudioArrival({ scene }: { scene: AtlasSceneAsset }) { return <>
  <AtlasStateMarker state="edo" page="Studio" identity="Studio District" />
  <section className={styles.arrival} aria-labelledby="studio-title">
    <AtlasScene scene={scene} mode="static" priority className={styles.scene} />
    <span className={styles.candidate}>Candidate Edo art · private review</span>
    <div className={styles.arrivalCopy}>
      <span>Airix Studio · proposed internal copy</span>
      <h1 id="studio-title">The work stays connected.</h1>
      <p>Creative direction, design, technology, operations, and long-term support share one working table.</p>
      <div><a href="#studio-process">Follow the work ↓</a><Link href="/start-a-project">Discuss a Project ↗</Link></div>
    </div>
  </section>
  </>; }
