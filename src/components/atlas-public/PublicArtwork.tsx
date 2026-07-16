import Image from "next/image";
import styles from "./atlas-public.module.css";

const artwork = {
  arrival: ["/images/atlas/runtime/arrival/desktop.webp", "/images/atlas/runtime/arrival/mobile.webp", "50% 62%", "50% 74%"],
  publishing: ["/images/atlas/runtime/publishing/desktop.webp", "/images/atlas/runtime/publishing/mobile.webp", "54% 60%", "52% 73%"],
  workflow: ["/images/atlas/runtime/workflow/desktop.webp", "/images/atlas/runtime/workflow/mobile.webp", "48% 58%", "49% 71%"],
  migration: ["/images/atlas/runtime/migration/desktop.webp", "/images/atlas/runtime/migration/mobile.webp", "54% 57%", "50% 72%"],
  engineering: ["/images/atlas/runtime/engineering/desktop.webp", "/images/atlas/runtime/engineering/mobile.webp", "52% 60%", "50% 74%"],
  infrastructure: ["/images/atlas/runtime/infrastructure/desktop.webp", "/images/atlas/runtime/infrastructure/mobile.webp", "51% 58%", "52% 72%"],
  continuity: ["/images/atlas/runtime/continuity/desktop.webp", "/images/atlas/runtime/continuity/mobile.webp", "48% 59%", "50% 74%"],
  recovery: ["/images/atlas/runtime/recovery/desktop.webp", "/images/atlas/runtime/recovery/mobile.webp", "54% 58%", "51% 73%"],
  studio: ["/images/atlas/runtime/studio/desktop.webp", "/images/atlas/runtime/studio/mobile.webp", "53% 57%", "52% 70%"],
  labs: ["/images/atlas/runtime/labs/desktop.webp", "/images/atlas/runtime/labs/mobile.webp", "49% 57%", "50% 72%"],
  observatory: ["/images/atlas/runtime/observatory/desktop.webp", "/images/atlas/runtime/observatory/mobile.webp", "66% 55%", "52% 70%"],
  insights: ["/images/atlas/runtime/insights/desktop.webp", "/images/atlas/runtime/insights/mobile.webp", "43% 57%", "50% 71%"],
  resources: ["/images/atlas/runtime/resources/desktop.webp", "/images/atlas/runtime/resources/mobile.webp", "64% 56%", "53% 70%"],
  gateway: ["/images/atlas/runtime/gateway/desktop.webp", "/images/atlas/runtime/gateway/mobile.webp", "69% 57%", "52% 72%"],
  contact: ["/images/atlas/runtime/contact/desktop.webp", "/images/atlas/runtime/contact/mobile.webp", "38% 57%", "50% 72%"],
  booking: ["/images/atlas/runtime/booking/desktop.webp", "/images/atlas/runtime/booking/mobile.webp", "61% 57%", "51% 72%"],
} as const;

export type PublicArtworkKey = keyof typeof artwork;

export function PublicArtwork({ id, alt, priority = false }: { id: PublicArtworkKey; alt: string; priority?: boolean }) {
  const [desktop, , desktopPosition, mobilePosition] = artwork[id];
  const highPrioritySource = priority ? ({ fetchPriority: "high" } as const) : {};
  const style = { "--art-desktop-position": desktopPosition, "--art-mobile-position": mobilePosition } as React.CSSProperties;
  return <picture className={`${styles.artwork} ${priority ? styles.priorityArtwork : ""}`} style={style}>
    <source media="(max-width: 640px)" srcSet={`/images/atlas/runtime/${id}/compact.webp`} {...highPrioritySource}/>
    <source media="(max-width: 1024px)" srcSet={`/images/atlas/runtime/${id}/tablet.webp`}/>
    <Image src={desktop} alt={alt} fill loading={priority ? "eager" : "lazy"} fetchPriority={priority ? "high" : undefined} sizes="(max-width: 640px) 100vw, 100vw"/>
  </picture>;
}
