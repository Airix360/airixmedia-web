import type { AtlasResponsiveFocalPoints, AtlasResponsiveSources } from "@/lib/atlas/types";
import { ResponsivePicture } from "./ResponsivePicture";
import styles from "./atlas-scene.module.css";

interface SceneFallbackProps {
  sources: AtlasResponsiveSources;
  alt: string;
  priority?: boolean;
  objectPosition?: string | AtlasResponsiveFocalPoints;
}

export function SceneFallback({ sources, alt, priority, objectPosition }: SceneFallbackProps) {
  return (
    <div className={styles.fallback} data-atlas-scene-fallback>
      <ResponsivePicture sources={sources} alt={alt} priority={priority} objectPosition={objectPosition} />
    </div>
  );
}
