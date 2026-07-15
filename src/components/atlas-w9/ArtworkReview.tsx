"use client";

import Image from "next/image";
import { useState } from "react";
import type { W9Artwork } from "@/content/atlas/w9-review";
import styles from "./w9-review.module.css";

const decisions = ["Retain", "Revise", "Replace", "Needs closer review"] as const;

function Overlay({ focal, safe }: { focal: string; safe: "left" | "right" | "top" }) {
  const [x, y] = focal.split(" ");
  return <><span className={`${styles.safeZone} ${styles[`safe_${safe}`]}`}>SAFE ZONE</span><span className={styles.focal} style={{ left: x, top: y }} aria-hidden="true"/></>;
}

export function ArtworkReview({ assets }: { assets: W9Artwork[] }) {
  const [selection, setSelection] = useState<Record<string, string>>({});
  return <div className={styles.artworkRegister}>
    <p className={styles.disclosure}>Review controls are visual only. No decision is transmitted or stored.</p>
    {assets.map((asset) => <article key={asset.id} id={asset.id.toLowerCase()} className={styles.artSheet}>
      <div className={styles.sheetHead}><div><span>{asset.state} · {asset.family}</span><h2>{asset.id}</h2></div><span className={styles.status}>{asset.status}</span></div>
      <div className={styles.comparison}>
        <figure className={styles.desktopFrame}><div className={styles.imageFrame}><Image src={asset.desktop} alt="" fill sizes="(max-width: 900px) 100vw, 60vw"/><Overlay focal={asset.focal.desktop} safe={asset.safe.desktop}/></div><figcaption>Desktop · 1440×811 · {Math.round(asset.sizes.desktop / 1024)} KB</figcaption></figure>
        <figure className={styles.mobileFrame}><div className={styles.imageFrame}><Image src={asset.mobile} alt="" fill sizes="(max-width: 900px) 50vw, 24vw"/><Overlay focal={asset.focal.mobile} safe={asset.safe.mobile}/></div><figcaption>Mobile · 960×1200 · {Math.round(asset.sizes.mobile / 1024)} KB</figcaption></figure>
      </div>
      <div className={styles.sheetGrid}>
        <dl><div><dt>Public routes</dt><dd>{asset.routes.join(", ")}</dd></div><div><dt>Derivatives</dt><dd>Desktop, tablet, mobile, compact mobile, thumbnail</dd></div><div><dt>Source master</dt><dd>{asset.sourceMaster} · {asset.sourceDimensions}</dd></div><div><dt>Review state</dt><dd>{asset.ownerStatus} · {asset.culturalStatus}</dd></div></dl>
        <dl><div><dt>Geographic anchor</dt><dd>{asset.anchors.geographic}</dd></div><div><dt>Infrastructure anchor</dt><dd>{asset.anchors.infrastructure}</dd></div><div><dt>Activity anchor</dt><dd>{asset.anchors.activity}</dd></div><div><dt>Material anchor</dt><dd>{asset.anchors.material}</dd></div></dl>
      </div>
      <div className={styles.defect}><strong>Closer inspection</strong><p>{asset.defects}</p></div>
      <fieldset className={styles.controls}><legend>Visual review control for {asset.id}</legend>{decisions.map((decision) => <button type="button" key={decision} aria-pressed={selection[asset.id] === decision} onClick={() => setSelection((current) => ({ ...current, [asset.id]: decision }))}>{decision}</button>)}</fieldset>
      <p className={styles.candidate}>Candidate artwork. Not approved, final or publishable until owner, cultural and rights review is complete.</p>
    </article>)}
  </div>;
}
