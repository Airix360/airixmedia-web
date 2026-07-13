"use client";

/* eslint-disable @next/next/no-img-element -- review objects must preserve authored transparent bounds */

import type { CSSProperties } from "react";
import { useState } from "react";
import { atlasPrimaryNavigation } from "@/content/atlas/navigation";
import { getAtlasLibraryAsset, getAtlasScene, atlasLibraryCoverage } from "@/lib/atlas/assets";
import type { AtlasSceneMode } from "@/lib/atlas/types";
import { FooterDirectory, PrimaryNavigation } from "@/components/atlas/navigation";
import { AtlasScene, AtlasSignal, DistrictMarker, SceneCaption } from "@/components/atlas/scene";
import { SkipJourneyLink } from "@/components/atlas/accessibility";
import styles from "./atlas-review.module.css";

const candidateAccess = { candidateAccess: "internal-review" } as const;
const arrival = getAtlasScene("ill-0001", candidateAccess);
const warmPaper = getAtlasLibraryAsset("warmPaper", candidateAccess);
const halftone = getAtlasLibraryAsset("fineHalftone", candidateAccess);
const routeLegend = getAtlasLibraryAsset("routeLegend", candidateAccess);
const ferry = getAtlasLibraryAsset("ferry", candidateAccess);
const trustTree = getAtlasLibraryAsset("trustTree", candidateAccess);
const arrivalMarker = getAtlasLibraryAsset("arrivalMarker", candidateAccess);

const colourTokens = [
  ["Paper Cream", "--atlas-color-paper-cream"], ["Atlas Orange", "--atlas-color-signal-orange"],
  ["Transit Yellow", "--atlas-color-transit-yellow"], ["Terracotta", "--atlas-color-terracotta"],
  ["Deep Umber", "--atlas-color-deep-umber"], ["Charcoal Ink", "--atlas-color-charcoal-ink"],
  ["Lagoon Blue", "--atlas-color-lagoon-blue"], ["Foliage Green", "--atlas-color-foliage-green"],
] as const;

export function AtlasReviewHarness() {
  const [mode, setMode] = useState<AtlasSceneMode>("layered");
  const paperStyle = { "--review-texture": `url(${warmPaper.src})` } as CSSProperties;
  const halftoneStyle = { "--review-texture": `url(${halftone.src})` } as CSSProperties;

  return (
    <div className={styles.review} data-review-mode={mode}>
      <SkipJourneyLink />
      <PrimaryNavigation activeDistrict="arrival" />
      <main id="main-content">
        <section className={styles.reviewHeader}>
          <div><span>INTERNAL · ATLAS RUNTIME 1 · W0</span><h1>World-building primitives,<br />before public integration.</h1></div>
          <aside><b>Review boundary</b><p>This route validates runtime behaviour. Candidate artwork is explicitly opted into for internal review and is not approved for publication.</p></aside>
        </section>

        <section className={styles.sceneBench} aria-labelledby="scene-bench-title">
          <div className={styles.benchControls}>
            <div><span>Scene bench / ILL-0001</span><h2 id="scene-bench-title">Arrival composition</h2><p>Test responsive crops, separated depth layers and equivalent static rendering without changing the public homepage.</p></div>
            <fieldset><legend>Rendering mode</legend>{(["layered", "static", "reduced"] as const).map((value) => <button key={value} type="button" aria-pressed={mode === value} onClick={() => setMode(value)}>{value}</button>)}</fieldset>
          </div>
          <AtlasScene
            scene={arrival}
            mode={mode}
            priority
            showSignal
            captionZone="left"
            caption={<SceneCaption zone="left" eyebrow="Arrival District"><p>Every thriving city depends on invisible systems.</p><small>Candidate scene · explicit internal-review access</small></SceneCaption>}
          />
          <div className={styles.sceneReadout}><span>Desktop safe zone · {arrival.desktopSafeZone}</span><span>Mobile safe zone · {arrival.mobileSafeZone}</span><span>Layers · {arrival.layers.length}</span><span>Fallback · ready</span></div>
        </section>

        <section id="atlas-review-content" className={styles.routeBench} aria-labelledby="route-bench-title">
          <div><span>Navigation state</span><h2 id="route-bench-title">Clear labels. District identity underneath.</h2></div>
          <div className={styles.routeLine}>
            <DistrictMarker district="arrival" label="Home" icon={arrivalMarker.src} />
            <i aria-hidden="true" />
            <DistrictMarker district="commerce" label="Services" />
            <i aria-hidden="true" />
            <DistrictMarker district="knowledge" label="Publishing" />
            <i aria-hidden="true" />
            <DistrictMarker district="gateway" label="Discuss a Project" />
          </div>
          <p>{atlasPrimaryNavigation.length} public destinations remain explicit. Emergency Support, Client Portal and Contact remain available outside the metaphor.</p>
        </section>

        <section className={styles.materialBench} aria-labelledby="material-title">
          <div className={styles.materialIntro}><span>Material and type</span><h2 id="material-title">Warm print fields. Calm interface typography.</h2><p>The Atlas system supplies roles, not a competing page template. Districts may alter composition and proportion while inheriting the same material grammar.</p></div>
          <div className={styles.typeSpecimen}>
            <div><span>Structural / Sans</span><strong>Invisible systems.<br />Visible progress.</strong></div>
            <div><span>Editorial / Serif</span><blockquote>“Build worlds, not pages.”</blockquote></div>
            <div><span>Wayfinding / Mono</span><code>ARRIVAL → LANDMARKS → GATEWAY</code></div>
          </div>
          <div className={styles.colourStrip} aria-label="Atlas colour tokens">{colourTokens.map(([name, token]) => <div key={name} style={{ "--review-swatch": `var(${token})` } as CSSProperties}><i /><span>{name}</span></div>)}</div>
        </section>

        <section className={styles.assetBench} aria-labelledby="asset-title">
          <div className={styles.assetHeading}><span>Registry coverage</span><h2 id="asset-title">One typed source for scenes and supporting material.</h2><p>{Object.keys(atlasLibraryCoverage).length} library categories are represented. Candidate access remains denied unless the caller declares internal review.</p></div>
          <div className={styles.objectField}>
            <div className={styles.texture} style={paperStyle}><span>Paper surface</span></div>
            <div className={styles.texture} style={halftoneStyle}><span>Print overlay</span></div>
            {/* These transparent review objects are decorative and must retain their authored pixel bounds. */}
            <figure><img src={ferry.src} alt="" aria-hidden="true" /><figcaption>Reusable transport object</figcaption></figure>
            <figure><img src={trustTree.src} alt="" aria-hidden="true" /><figcaption>Vegetation / Trust Tree</figcaption></figure>
            <figure className={styles.legend}><img src={routeLegend.src} alt="" aria-hidden="true" /><figcaption>Wayfinding asset</figcaption></figure>
            <div className={styles.signalStudy}><AtlasSignal /><span>Important-scene signal</span></div>
          </div>
        </section>
      </main>
      <FooterDirectory />
    </div>
  );
}
