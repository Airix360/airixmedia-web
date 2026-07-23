import type { AtlasDistrictId } from "@/lib/atlas/types";

export interface AtlasNavigationItem {
  label: "Work" | "Services" | "Publishing" | "Atlas" | "Studio" | "Discuss a Project";
  href: string;
  district: AtlasDistrictId;
  priority: "primary" | "conversion";
}

export const atlasPrimaryNavigation = [
  { label: "Work", href: "/systems", district: "landmarks", priority: "primary" },
  { label: "Services", href: "/services", district: "commerce", priority: "primary" },
  { label: "Publishing", href: "/publishing", district: "knowledge", priority: "primary" },
  { label: "Atlas", href: "/atlas", district: "observatory", priority: "primary" },
  { label: "Studio", href: "/company", district: "studio", priority: "primary" },
  { label: "Discuss a Project", href: "/start-a-project", district: "gateway", priority: "conversion" },
] as const satisfies readonly AtlasNavigationItem[];

export const atlasUtilityNavigation = [
  { label: "Emergency Support", href: "/support/emergency" },
  { label: "Client Portal", href: "https://portal.airixmedia.com" },
  { label: "Contact", href: "/start-a-project" },
] as const;

export const atlasDistrictNames: Record<AtlasDistrictId, string> = {
  arrival: "Arrival District",
  landmarks: "Landmarks",
  commerce: "Commerce District",
  knowledge: "Knowledge District",
  infrastructure: "Infrastructure District",
  studio: "Studio District",
  labs: "Labs District",
  observatory: "Observatory",
  gateway: "Gateway District",
};

export function activeAtlasDistrict(pathname: string): AtlasDistrictId {
  const item = [...atlasPrimaryNavigation]
    .sort((a, b) => b.href.length - a.href.length)
    .find(({ href }) => pathname === href || pathname.startsWith(`${href}/`));
  if (item) return item.district;
  if (pathname.startsWith("/support")) return "infrastructure";
  return "arrival";
}
