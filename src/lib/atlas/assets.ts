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
) as Record<typeof sceneDefinitions[number][0], AtlasSceneAsset> & Record<string, AtlasSceneAsset>;

const stateRoot = `${atlasRoot}/states` as const;

Object.assign(atlasScenes, {
  "ill-0051": {
    id: "ill-0051", name: "Edo Studio radial-city candidate", district: "studio", state: "edo", status: "candidate",
    master: `${stateRoot}/edo/studio/source/ILL-0051_edo-studio-master_source-desktop_1672x941_v01.png`,
    responsive: {
      desktop: `${stateRoot}/edo/studio/web/ILL-0051_edo-studio_desktop_1440x811_v01.webp`,
      tablet: `${stateRoot}/edo/studio/web/ILL-0051_edo-studio_tablet_1024x768_v01.webp`,
      mobile: `${stateRoot}/edo/studio/web/ILL-0051_edo-studio_mobile_960x1200_v01.webp`,
      social: `${stateRoot}/edo/studio/web/ILL-0051_edo-studio_desktop_1440x811_v01.webp`,
      thumbnail: `${stateRoot}/edo/studio/web/ILL-0051_edo-studio_thumbnail_480x270_v01.webp`,
    }, layers: [], fallback: `${stateRoot}/edo/studio/web/ILL-0051_edo-studio_thumbnail_480x270_v01.webp`,
    focalPoint: "72% 52%", focalPoints: { desktop: "72% 52%", tablet: "65% 54%", mobile: "50% 66%" },
    safeZones: { desktop: "left", tablet: "left", mobile: "top" }, desktopSafeZone: "left", mobileSafeZone: "top",
    alt: "A circular workshop court sends covered work bays and pedestrian routes outward like spokes while makers review drawings and prototypes.",
  },
  "ill-0071": {
    id: "ill-0071", name: "Edo Trust radial-record candidate", district: "studio", state: "edo", status: "candidate",
    master: `${stateRoot}/edo/trust/source/ILL-0071_edo-trust-master_source-desktop_1721x914_v01.png`,
    responsive: {
      desktop: `${stateRoot}/edo/trust/web/ILL-0071_edo-trust_desktop_1440x811_v01.webp`,
      tablet: `${stateRoot}/edo/trust/web/ILL-0071_edo-trust_tablet_1024x768_v01.webp`,
      mobile: `${stateRoot}/edo/trust/web/ILL-0071_edo-trust_mobile_960x1200_v01.webp`,
      social: `${stateRoot}/edo/trust/web/ILL-0071_edo-trust_desktop_1440x811_v01.webp`,
      thumbnail: `${stateRoot}/edo/trust/web/ILL-0071_edo-trust_thumbnail_480x270_v01.webp`,
    }, layers: [], fallback: `${stateRoot}/edo/trust/web/ILL-0071_edo-trust_thumbnail_480x270_v01.webp`,
    focalPoint: "44% 54%", focalPoints: { desktop: "44% 54%", tablet: "48% 55%", mobile: "50% 66%" },
    safeZones: { desktop: "right", tablet: "right", mobile: "top" }, desktopSafeZone: "right", mobileSafeZone: "top",
    alt: "A circular evidence court connects radial archive wings where people examine records, move document carts and review responsibility together.",
  },
  "ill-0060": {
    id: "ill-0060", name: "Kaduna Labs master candidate", district: "labs", state: "kaduna", status: "candidate",
    master: `${stateRoot}/kaduna/labs/source/ILL-0060_kaduna-labs-master_source-desktop_1672x941_v01.png`,
    responsive: {
      desktop: `${stateRoot}/kaduna/labs/web/ILL-0060_kaduna-labs_desktop_1440x811_v01.webp`,
      tablet: `${stateRoot}/kaduna/labs/web/ILL-0060_kaduna-labs_tablet_1024x768_v01.webp`,
      mobile: `${stateRoot}/kaduna/labs/web/ILL-0060_kaduna-labs_mobile_960x1200_v01.webp`,
      social: `${stateRoot}/kaduna/labs/web/ILL-0060_kaduna-labs_desktop_1440x811_v01.webp`,
      thumbnail: `${stateRoot}/kaduna/labs/web/ILL-0060_kaduna-labs_thumbnail_480x270_v01.webp`,
    }, layers: [], fallback: `${stateRoot}/kaduna/labs/web/ILL-0060_kaduna-labs_thumbnail_480x270_v01.webp`,
    focalPoint: "38% 58%", focalPoints: { desktop: "38% 58%", tablet: "44% 58%", mobile: "56% 66%" },
    safeZones: { desktop: "right", tablet: "right", mobile: "top" }, desktopSafeZone: "right", mobileSafeZone: "top",
    alt: "A dry-season red-earth engineering yard where people assemble, test, repair and document prototypes beside rail-inspired service routes.",
  },
} satisfies Record<string, AtlasSceneAsset>);

function w7StateScene({id,name,state,district,slug,safe,alt,focal}:{id:string;name:string;state:"plateau"|"ogun";district:"observatory"|"gateway";slug:string;safe:"left"|"right";alt:string;focal:AtlasSceneAsset["focalPoints"]}):AtlasSceneAsset { const base=`${stateRoot}/${state}/${slug}` as const; const fileSlug=`${state}-${slug}`; return {id,name,state,district,status:"candidate",master:`${base}/source/${id}_${fileSlug}-master_source-desktop_v01.png`,responsive:{desktop:`${base}/web/${id}_${fileSlug}_desktop_1440x811_v01.webp`,tablet:`${base}/web/${id}_${fileSlug}_tablet_1024x768_v01.webp`,mobile:`${base}/web/${id}_${fileSlug}_mobile_960x1200_v01.webp`,social:`${base}/web/${id}_${fileSlug}_desktop_1440x811_v01.webp`,thumbnail:`${base}/web/${id}_${fileSlug}_thumbnail_480x270_v01.webp`},layers:[],fallback:`${base}/web/${id}_${fileSlug}_thumbnail_480x270_v01.webp`,focalPoint:focal.desktop,focalPoints:focal,safeZones:{desktop:safe,tablet:safe,mobile:"top"},desktopSafeZone:safe,mobileSafeZone:"top",alt}; }

Object.assign(atlasScenes,{
  "ill-0090":w7StateScene({id:"ILL-0090",name:"Plateau Observatory master candidate",state:"plateau",district:"observatory",slug:"observatory",safe:"left",focal:{desktop:"70% 55%",tablet:"64% 56%",mobile:"52% 68%"},alt:"A highland research terrace where people compare field maps and observe routes across layered stone escarpments and distant horizons."}),
  "ill-0091":w7StateScene({id:"ILL-0091",name:"Plateau Insights master candidate",state:"plateau",district:"observatory",slug:"insights",safe:"right",focal:{desktop:"42% 56%",tablet:"45% 58%",mobile:"48% 70%"},alt:"A highland editorial terrace where researchers compare field notes, maps and evidence against layered stone escarpments before publication."}),
  "ill-0092":w7StateScene({id:"ILL-0092",name:"Plateau Resources master candidate",state:"plateau",district:"observatory",slug:"resources",safe:"left",focal:{desktop:"68% 55%",tablet:"62% 56%",mobile:"54% 68%"},alt:"A terraced highland field library where people organise maps, archive boxes, guides and practical references among stone shelves."}),
  "ill-0083":w7StateScene({id:"ILL-0083",name:"Ogun granite Gateway candidate",state:"ogun",district:"gateway",slug:"gateway",safe:"left",focal:{desktop:"72% 56%",tablet:"65% 58%",mobile:"52% 70%"},alt:"A rail line, road and project-entry pavilion bend around a layered granite outcrop as teams arrive with briefs and choose a working route."}),
  "ill-0084":w7StateScene({id:"ILL-0084",name:"Ogun granite Contact candidate",state:"ogun",district:"gateway",slug:"contact",safe:"right",focal:{desktop:"34% 56%",tablet:"40% 58%",mobile:"50% 70%"},alt:"A meeting court built against layered granite receives people and project cases directly from a curving rail siding and road handoff lane."}),
  "ill-0085":w7StateScene({id:"ILL-0085",name:"Ogun granite Booking candidate",state:"ogun",district:"gateway",slug:"booking",safe:"right",focal:{desktop:"35% 57%",tablet:"42% 58%",mobile:"50% 70%"},alt:"Preparation rooms cut into a granite slope connect to rail and stepped road routes while teams organise folios and consultation timing."}),
} satisfies Record<string,AtlasSceneAsset>);

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
  infrastructureMarker: { name: "Infrastructure district marker", category: "districtMarkers", src: `${atlasRoot}/markers/district/marker-04-infrastructure.svg`, status: "candidate", decorativeDefault: true },
  marketCanopy: { name: "Market canopy", category: "objects", src: `${atlasRoot}/objects/svg/obj-0006-market-canopy.svg`, status: "candidate", decorativeDefault: true },
  commerceRouteMap: { name: "Commerce route map", category: "objects", src: `${atlasRoot}/objects/svg/obj-0010-route-map.svg`, status: "candidate", decorativeDefault: true },
  logisticsTruck: { name: "Logistics truck", category: "transport", src: `${atlasRoot}/objects/svg/obj-0014-logistics-truck.svg`, status: "candidate", decorativeDefault: true },
  marketScale: { name: "Market scale", category: "objects", src: `${atlasRoot}/objects/svg/obj-0021-market-scale.svg`, status: "candidate", decorativeDefault: true },
  marketLaneSign: { name: "Market lane sign", category: "graphics", src: `${atlasRoot}/graphics/signs/sign-03-market-lane.svg`, status: "candidate", decorativeDefault: true },
  communityArchive: { name: "Community archive", category: "objects", src: `${atlasRoot}/objects/svg/obj-0007-community-archive.svg`, status: "candidate", decorativeDefault: true },
  letterpress: { name: "Letterpress", category: "objects", src: `${atlasRoot}/objects/svg/obj-0022-letterpress.svg`, status: "candidate", decorativeDefault: true },
  archiveCabinet: { name: "Archive cabinet", category: "objects", src: `${atlasRoot}/objects/svg/obj-0023-archive-cabinet.svg`, status: "candidate", decorativeDefault: true },
  archiveRoomSign: { name: "Archive room sign", category: "graphics", src: `${atlasRoot}/graphics/signs/sign-04-archive-room.svg`, status: "candidate", decorativeDefault: true },
  archiveCopyStamp: { name: "Archive copy stamp", category: "graphics", src: `${atlasRoot}/graphics/stamps/stamp-05-archive-copy.svg`, status: "candidate", decorativeDefault: true },
  thirdMainlandBridge: { name: "Third Mainland Bridge object", category: "objects", src: `${atlasRoot}/objects/svg/obj-0004-third-mainland-bridge.svg`, status: "candidate", decorativeDefault: true },
  utilityStreetlight: { name: "Utility streetlight", category: "objects", src: `${atlasRoot}/objects/svg/obj-0016-streetlight.svg`, status: "candidate", decorativeDefault: true },
  telecomMast: { name: "Telecom mast", category: "objects", src: `${atlasRoot}/objects/svg/obj-0017-telecom-mast.svg`, status: "candidate", decorativeDefault: true },
  secondaryRoute: { name: "Secondary Atlas route", category: "wayfinding", src: `${atlasRoot}/wayfinding/route-lines/route-02-secondary.svg`, status: "candidate", decorativeDefault: true },
  nightRoute: { name: "Night Atlas route", category: "wayfinding", src: `${atlasRoot}/wayfinding/route-lines/route-04-night.svg`, status: "candidate", decorativeDefault: true },
  statusReadyLabel: { name: "Status ready label", category: "graphics", src: `${atlasRoot}/graphics/labels/label-07-status-ready.svg`, status: "candidate", decorativeDefault: true },
  warningLabel: { name: "Warning label", category: "wayfinding", src: `${atlasRoot}/wayfinding/labels/label-04-warning.svg`, status: "candidate", decorativeDefault: true },
  routeConfirmedStamp: { name: "Route confirmed stamp", category: "graphics", src: `${atlasRoot}/graphics/stamps/stamp-06-route-confirmed.svg`, status: "candidate", decorativeDefault: true },
  roadGrit: { name: "Road grit texture", category: "textures", src: `${atlasRoot}/textures/environment/tex-env-02-road-grit.png`, status: "candidate", decorativeDefault: true },
  rain: { name: "Rain texture", category: "textures", src: `${atlasRoot}/textures/weather/tex-weather-01-rain.png`, status: "candidate", decorativeDefault: true },
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
