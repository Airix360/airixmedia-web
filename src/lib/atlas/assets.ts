import type {
  AtlasAssetAccess,
  AtlasLibraryAsset,
  AtlasLibraryCategory,
  AtlasPath,
  AtlasSceneAsset,
  AtlasSceneLayerRole,
} from "./types";

const atlasRoot = "/images/atlas" as const;
const sceneRoot = `${atlasRoot}/scenes` as AtlasPath;

export class CandidateAssetAccessError extends Error {
  constructor(assetId: string) {
    super(`Atlas candidate asset "${assetId}" requires explicit internal-review access.`);
    this.name = "CandidateAssetAccessError";
  }
}

const sceneDefinitions = [
  ["ill-0001", "arrival-district", "Arrival District", "arrival", "right", "bottom", "A warm illustrated Lagos arrival scene with skyline, lagoon movement and civic activity."],
  ["ill-0002", "knowledge-district", "Knowledge District", "knowledge", "left", "bottom", "An illustrated knowledge district with university architecture, reading and editorial activity."],
  ["ill-0003", "commerce-district", "Commerce District", "commerce", "right", "top", "An illustrated Lagos commerce district showing exchange, movement and connected work."],
  ["ill-0004", "infrastructure-district", "Infrastructure District", "infrastructure", "left", "bottom", "An illustrated infrastructure district making routes, utilities and operating systems visible."],
  ["ill-0005", "studio-district", "Studio District", "studio", "right", "top", "An inhabited illustrated studio district where people make, maintain and improve systems."],
  ["ill-0006", "gateway-district", "Gateway District", "gateway", "left", "top", "An illustrated Lagos gateway and ferry terminal connecting one journey to the next."],
  ["ill-0007", "community-square", "Community Square", "studio", "right", "bottom", "An illustrated community square organised around gathering, shade and trust."],
  ["ill-0008", "marina-waterfront", "Marina Waterfront", "landmarks", "left", "top", "An illustrated Lagos marina waterfront with civic scale and movement across water."],
  ["ill-0009", "logistics-hub", "Logistics Hub", "infrastructure", "right", "top", "An illustrated logistics hub showing dependable handoffs and operational movement."],
  ["ill-0010", "night-waterfront", "Night Waterfront", "gateway", "left", "bottom", "An illustrated Lagos waterfront at night with visible infrastructure and routes."],
] as const;

const layerRoles: readonly [AtlasSceneLayerRole, string, number][] = [
  ["atmosphere", "01-atmosphere", 0],
  ["distant-world", "02-distant-world", 1],
  ["midground", "03-midground-structures", 2],
  ["surface", "04-surface-water-road", 3],
  ["foreground", "05-foreground-activity", 4],
];

function candidateScene(definition: typeof sceneDefinitions[number]): AtlasSceneAsset {
  const [id, slug, name, district, desktopSafeZone, mobileSafeZone, alt] = definition;
  const directory = `${id}-${slug}`;
  const base = `${sceneRoot}/responsive/${directory}/${directory}`;
  const layerBase = `${sceneRoot}/layers/${directory}/${directory}`;
  const arrivalFocalPoints = {
    desktop: "52% 50%",
    tablet: "58% 48%",
    mobile: "56% 42%",
  } as const;
  const knowledgeFocalPoints = {
    desktop: "72% 50%",
    tablet: "68% 50%",
    mobile: "66% 46%",
  } as const;
  const defaultFocalPoints = {
    desktop: "50% 50%",
    tablet: "50% 50%",
    mobile: "50% 50%",
  } as const;
  const focalPoints = id === "ill-0001" ? arrivalFocalPoints : id === "ill-0002" ? knowledgeFocalPoints : defaultFocalPoints;
  return {
    id,
    name,
    district,
    status: "candidate",
    master: `${sceneRoot}/masters/${id}-${slug}.png` as AtlasPath,
    responsive: {
      desktop: `${base}-desktop-16x9.webp` as AtlasPath,
      tablet: `${base}-tablet-4x3.webp` as AtlasPath,
      mobile: `${base}-mobile-4x5.webp` as AtlasPath,
      social: `${base}-social-og.webp` as AtlasPath,
      thumbnail: `${base}-thumbnail-16x9.webp` as AtlasPath,
    },
    layers: layerRoles.map(([role, suffix, depth]) => ({
      id: `${id}-${role}`,
      src: `${layerBase}-${suffix}.webp` as AtlasPath,
      role,
      depth,
      decorative: true,
    })),
    fallback: `${layerBase}-preview.jpg` as AtlasPath,
    focalPoint: focalPoints.desktop,
    focalPoints,
    safeZones: {
      desktop: desktopSafeZone,
      tablet: desktopSafeZone,
      mobile: mobileSafeZone,
    },
    desktopSafeZone,
    mobileSafeZone,
    alt,
  };
}

export const atlasScenes = Object.fromEntries(
  sceneDefinitions.map((definition) => [definition[0], candidateScene(definition)]),
) as Record<typeof sceneDefinitions[number][0], AtlasSceneAsset>;

const library = <T extends Record<string, Omit<AtlasLibraryAsset, "id">>>(entries: T) =>
  Object.fromEntries(Object.entries(entries).map(([id, asset]) => [id, { id, ...asset }])) as {
    [K in keyof T]: AtlasLibraryAsset & { id: K };
  };

export const atlasAssetLibrary = library({
  atlasSignal: { name: "Atlas Signal", category: "objects", src: `${atlasRoot}/objects/svg/obj-0001-atlas-signal.svg`, status: "candidate", decorativeDefault: true },
  danfo: { name: "Danfo bus", category: "transport", src: `${atlasRoot}/transport/01-danfo-bus.png`, status: "candidate", decorativeDefault: true },
  ferry: { name: "Passenger ferry", category: "transport", src: `${atlasRoot}/transport/02-passenger-ferry.png`, status: "candidate", decorativeDefault: true },
  professionalWoman: { name: "Professional woman", category: "people", src: `${atlasRoot}/people/03-professional-woman-tote.png`, status: "candidate", decorativeDefault: true },
  smartCasual: { name: "Smart casual clothing set", category: "clothing", src: `${atlasRoot}/clothing/08-smart-casual-set.png`, status: "candidate", decorativeDefault: true },
  trustTree: { name: "Trust Tree", category: "vegetation", src: `${atlasRoot}/vegetation/01-trust-tree.png`, status: "candidate", decorativeDefault: true },
  bridge: { name: "Cable-stayed bridge", category: "landmarks", src: `${atlasRoot}/landmarks/05-cable-stayed-bridge.png`, status: "candidate", decorativeDefault: true },
  signFrame: { name: "Atlas sign frame", category: "streetDetails", src: `${atlasRoot}/street-details/01-atlas-sign-frame.png`, status: "candidate", decorativeDefault: true },
  arrivalMarker: { name: "Arrival district marker", category: "districtMarkers", src: `${atlasRoot}/markers/district/marker-01-arrival.svg`, status: "candidate", decorativeDefault: true },
  knowledgeMarker: { name: "Knowledge district marker", category: "districtMarkers", src: `${atlasRoot}/markers/district/marker-02-knowledge.svg`, status: "candidate", decorativeDefault: true },
  commerceMarker: { name: "Commerce district marker", category: "districtMarkers", src: `${atlasRoot}/markers/district/marker-03-commerce.svg`, status: "candidate", decorativeDefault: true },
  publishingIcon: { name: "Publishing icon", category: "icons", src: `${atlasRoot}/icons/svg/ico-005-book.svg`, status: "candidate", decorativeDefault: true },
  routeLegend: { name: "Atlas route legend", category: "wayfinding", src: `${atlasRoot}/wayfinding/legends/atlas-route-legend.svg`, status: "candidate", decorativeDefault: true },
  atlasLettering: { name: "Airix Atlas lettering", category: "graphics", src: `${atlasRoot}/graphics/lettering/lettering-01-airix-atlas.svg`, status: "candidate", decorativeDefault: true },
  warmPaper: { name: "Warm paper texture", category: "textures", src: `${atlasRoot}/textures/paper/tex-paper-01-warm-paper.png`, status: "candidate", decorativeDefault: true },
  fineHalftone: { name: "Fine halftone texture", category: "textures", src: `${atlasRoot}/textures/print/tex-print-01-fine-halftone.png`, status: "candidate", decorativeDefault: true },
  morningHaze: { name: "Morning haze texture", category: "textures", src: `${atlasRoot}/textures/weather/tex-weather-02-haze.png`, status: "candidate", decorativeDefault: true },
  primaryRoute: { name: "Primary Atlas route", category: "wayfinding", src: `${atlasRoot}/wayfinding/route-lines/route-01-primary.svg`, status: "candidate", decorativeDefault: true },
});

function assertAccess(asset: { id: string; status: string; src?: AtlasPath }, access: AtlasAssetAccess = {}) {
  if (asset.src && (/\/scenes\/candidates\//.test(asset.src) || /\/raw-generated\//.test(asset.src))) {
    throw new CandidateAssetAccessError(asset.id);
  }
  if (asset.status === "candidate" && access.candidateAccess !== "internal-review") {
    throw new CandidateAssetAccessError(asset.id);
  }
}

export function getAtlasScene(id: keyof typeof atlasScenes, access: AtlasAssetAccess = {}) {
  const scene = atlasScenes[id];
  assertAccess(scene, access);
  return scene;
}

export function getAtlasLibraryAsset(id: keyof typeof atlasAssetLibrary, access: AtlasAssetAccess = {}) {
  const asset = atlasAssetLibrary[id];
  assertAccess(asset, access);
  return asset;
}

export const atlasLibraryCoverage = Object.freeze(
  Object.values(atlasAssetLibrary).reduce<Record<AtlasLibraryCategory, number>>((coverage, asset) => {
    coverage[asset.category] += 1;
    return coverage;
  }, {
    objects: 0,
    districtMarkers: 0,
    icons: 0,
    people: 0,
    clothing: 0,
    transport: 0,
    vegetation: 0,
    landmarks: 0,
    streetDetails: 0,
    wayfinding: 0,
    graphics: 0,
    textures: 0,
  }),
);

export const atlasAssetRoots = { atlasRoot, sceneRoot } as const;
