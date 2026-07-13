export type AtlasPath = `/${string}`;

export type AtlasDistrictId =
  | "arrival"
  | "landmarks"
  | "commerce"
  | "knowledge"
  | "infrastructure"
  | "studio"
  | "labs"
  | "observatory"
  | "gateway";

export type AtlasAssetStatus = "approved" | "candidate" | "internal-only";
export type AtlasCandidateAccess = "none" | "internal-review";
export type AtlasSceneVariant = "desktop" | "tablet" | "mobile" | "social" | "thumbnail";
export type AtlasSceneLayerRole = "atmosphere" | "distant-world" | "midground" | "surface" | "foreground";
export type AtlasSafeZone = "left" | "right" | "top" | "bottom" | "none";

export interface AtlasResponsiveSources {
  desktop: AtlasPath;
  tablet: AtlasPath;
  mobile: AtlasPath;
  social: AtlasPath;
  thumbnail: AtlasPath;
}

export interface AtlasSceneLayerAsset {
  id: string;
  src: AtlasPath;
  role: AtlasSceneLayerRole;
  depth: number;
  decorative: true;
}

export interface AtlasSceneAsset {
  id: string;
  name: string;
  district: AtlasDistrictId;
  status: AtlasAssetStatus;
  master: AtlasPath;
  responsive: AtlasResponsiveSources;
  layers: readonly AtlasSceneLayerAsset[];
  fallback: AtlasPath;
  focalPoint: `${number}% ${number}%`;
  desktopSafeZone: AtlasSafeZone;
  mobileSafeZone: AtlasSafeZone;
  alt: string;
}

export type AtlasLibraryCategory =
  | "objects"
  | "districtMarkers"
  | "icons"
  | "people"
  | "clothing"
  | "transport"
  | "vegetation"
  | "landmarks"
  | "streetDetails"
  | "wayfinding"
  | "graphics"
  | "textures";

export interface AtlasLibraryAsset {
  id: string;
  name: string;
  category: AtlasLibraryCategory;
  src: AtlasPath;
  status: AtlasAssetStatus;
  decorativeDefault: boolean;
}

export interface AtlasAssetAccess {
  candidateAccess?: AtlasCandidateAccess;
}

export type AtlasSceneMode = "layered" | "static" | "reduced";
