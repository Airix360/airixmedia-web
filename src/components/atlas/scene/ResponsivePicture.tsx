import type { CSSProperties } from "react";
import type { AtlasResponsiveFocalPoints, AtlasResponsiveSources } from "@/lib/atlas/types";

interface ResponsivePictureProps {
  sources: AtlasResponsiveSources;
  alt: string;
  decorative?: boolean;
  priority?: boolean;
  className?: string;
  objectPosition?: string | AtlasResponsiveFocalPoints;
}

export function ResponsivePicture({
  sources,
  alt,
  decorative = false,
  priority = false,
  className,
  objectPosition = "50% 50%",
}: ResponsivePictureProps) {
  const positions = typeof objectPosition === "string"
    ? { desktop: objectPosition, tablet: objectPosition, mobile: objectPosition }
    : objectPosition;
  const style = {
    "--atlas-object-position": positions.desktop,
    "--atlas-object-position-tablet": positions.tablet,
    "--atlas-object-position-mobile": positions.mobile,
  } as CSSProperties;
  return (
    <picture className={className} data-atlas-picture="responsive">
      <source media="(max-width: 639px)" srcSet={sources.mobile} />
      <source media="(max-width: 1023px)" srcSet={sources.tablet} />
      <img
        src={sources.desktop}
        alt={decorative ? "" : alt}
        aria-hidden={decorative || undefined}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        decoding="async"
        style={style}
      />
    </picture>
  );
}
