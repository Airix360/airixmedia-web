/* eslint-disable @next/next/no-img-element -- authored marker SVGs are decorative and already sized */
import type { CSSProperties } from "react";
import { atlasDistrictNames } from "@/content/atlas/navigation";
import { atlasDistrictAccents } from "@/lib/atlas/tokens";
import type { AtlasDistrictId, AtlasPath } from "@/lib/atlas/types";
import styles from "./atlas-scene.module.css";

export function DistrictMarker({ district, label, icon }: { district: AtlasDistrictId; label?: string; icon?: AtlasPath }) {
  const style = { "--atlas-marker-accent": atlasDistrictAccents[district] } as CSSProperties;
  return (
    <span className={styles.marker} style={style} data-district={district}>
      {/* Marker artwork is a decorative, authored SVG and does not need image optimisation. */}
      {icon ? <img src={icon} alt="" aria-hidden="true" /> : <i aria-hidden="true" />}
      <span><b>{label ?? atlasDistrictNames[district]}</b><small>{atlasDistrictNames[district]}</small></span>
    </span>
  );
}
