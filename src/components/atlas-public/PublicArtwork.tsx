import Image from "next/image";
import styles from "./atlas-public.module.css";

const artwork = {
  "lagos-arrival": ["/images/atlas/public/lagos/arrival/ILL-0120_lagos-arrival_desktop_1440x811_v01.webp", "/images/atlas/public/lagos/arrival/ILL-0120_lagos-arrival_mobile_960x1200_v01.webp"],
  "oyo-publishing": ["/images/atlas/public/oyo/publishing/ILL-0100_oyo-publishing_desktop_1440x811_v01.webp", "/images/atlas/public/oyo/publishing/ILL-0100_oyo-publishing_mobile_960x1200_v01.webp"],
  "oyo-workflow": ["/images/atlas/public/oyo/ojs-workflow/ILL-0101_oyo-ojs-workflow_desktop_1440x811_v01.webp", "/images/atlas/public/oyo/ojs-workflow/ILL-0101_oyo-ojs-workflow_mobile_960x1200_v01.webp"],
  "oyo-migration": ["/images/atlas/public/oyo/migration/ILL-0102_oyo-migration_desktop_1440x811_v01.webp", "/images/atlas/public/oyo/migration/ILL-0102_oyo-migration_mobile_960x1200_v01.webp"],
  "oyo-open-source": ["/images/atlas/public/oyo/open-source/ILL-0103_oyo-open-source_desktop_1440x811_v01.webp", "/images/atlas/public/oyo/open-source/ILL-0103_oyo-open-source_mobile_960x1200_v01.webp"],
  "rivers-infrastructure": ["/images/atlas/public/rivers/infrastructure/ILL-0110_rivers-infrastructure_desktop_1440x811_v01.webp", "/images/atlas/public/rivers/infrastructure/ILL-0110_rivers-infrastructure_mobile_960x1200_v01.webp"],
  "rivers-support": ["/images/atlas/public/rivers/support/ILL-0111_rivers-support_desktop_1440x811_v01.webp", "/images/atlas/public/rivers/support/ILL-0111_rivers-support_mobile_960x1200_v01.webp"],
  "rivers-emergency": ["/images/atlas/public/rivers/emergency/ILL-0112_rivers-emergency_desktop_1440x811_v01.webp", "/images/atlas/public/rivers/emergency/ILL-0112_rivers-emergency_mobile_960x1200_v01.webp"],
  "edo-studio": ["/images/atlas/states/edo/studio/web/ILL-0051_edo-studio_desktop_1440x811_v01.webp", "/images/atlas/states/edo/studio/web/ILL-0051_edo-studio_mobile_960x1200_v01.webp"],
  "kaduna-labs": ["/images/atlas/states/kaduna/labs/web/ILL-0060_kaduna-labs_desktop_1440x811_v01.webp", "/images/atlas/states/kaduna/labs/web/ILL-0060_kaduna-labs_mobile_960x1200_v01.webp"],
  "plateau-observatory": ["/images/atlas/states/plateau/observatory/web/ILL-0090_plateau-observatory_desktop_1440x811_v01.webp", "/images/atlas/states/plateau/observatory/web/ILL-0090_plateau-observatory_mobile_960x1200_v01.webp"],
  "plateau-insights": ["/images/atlas/states/plateau/insights/web/ILL-0091_plateau-insights_desktop_1440x811_v01.webp", "/images/atlas/states/plateau/insights/web/ILL-0091_plateau-insights_mobile_960x1200_v01.webp"],
  "plateau-resources": ["/images/atlas/states/plateau/resources/web/ILL-0092_plateau-resources_desktop_1440x811_v01.webp", "/images/atlas/states/plateau/resources/web/ILL-0092_plateau-resources_mobile_960x1200_v01.webp"],
  "ogun-gateway": ["/images/atlas/states/ogun/gateway/web/ILL-0083_ogun-gateway_desktop_1440x811_v01.webp", "/images/atlas/states/ogun/gateway/web/ILL-0083_ogun-gateway_mobile_960x1200_v01.webp"],
  "ogun-contact": ["/images/atlas/states/ogun/contact/web/ILL-0084_ogun-contact_desktop_1440x811_v01.webp", "/images/atlas/states/ogun/contact/web/ILL-0084_ogun-contact_mobile_960x1200_v01.webp"],
  "ogun-booking": ["/images/atlas/states/ogun/booking/web/ILL-0085_ogun-booking_desktop_1440x811_v01.webp", "/images/atlas/states/ogun/booking/web/ILL-0085_ogun-booking_mobile_960x1200_v01.webp"],
} as const;

export type PublicArtworkKey = keyof typeof artwork;

export function PublicArtwork({ id, alt, priority = false }: { id: PublicArtworkKey; alt: string; priority?: boolean }) {
  const [desktop, mobile] = artwork[id];
  const compactMobile = mobile.replace("_mobile_960x1200_", "_mobile_640x800_");
  const tablet = desktop.replace("_desktop_1440x811_", "_tablet_1024x768_");
  const highPrioritySource = priority ? ({ fetchPriority: "high" } as const) : {};
  return <picture className={`${styles.artwork} ${priority ? styles.priorityArtwork : ""}`}>
    <source media="(max-width: 640px)" srcSet={compactMobile} {...highPrioritySource}/>
    <source media="(max-width: 1024px)" srcSet={tablet}/>
    <Image src={desktop} alt={alt} fill loading={priority ? "eager" : "lazy"} fetchPriority={priority ? "high" : undefined} sizes="(max-width: 640px) 100vw, 100vw"/>
  </picture>;
}
