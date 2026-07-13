import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import {
  CandidateAssetAccessError,
  atlasAssetLibrary,
  atlasLibraryCoverage,
  atlasScenes,
  getAtlasLibraryAsset,
  getAtlasScene,
} from "./assets";

const internalReview = { candidateAccess: "internal-review" } as const;

describe("Atlas candidate asset registry", () => {
  it("denies candidate scenes and library material without an explicit review grant", () => {
    expect(() => getAtlasScene("ill-0001")).toThrow(CandidateAssetAccessError);
    expect(() => getAtlasLibraryAsset("atlasSignal")).toThrow(CandidateAssetAccessError);
  });

  it("returns complete responsive and layered scene data for internal review", () => {
    const scene = getAtlasScene("ill-0001", internalReview);

    expect(scene.status).toBe("candidate");
    expect(scene.layers).toHaveLength(5);
    expect(Object.keys(scene.responsive)).toEqual([
      "desktop",
      "tablet",
      "mobile",
      "social",
      "thumbnail",
    ]);
    expect(scene.fallback).toMatch(/preview\.jpg$/);
    expect(scene.alt).toBeTruthy();
  });

  it("keeps forbidden raw and scene-candidate paths out of the runtime registry", () => {
    const paths = [
      ...Object.values(atlasScenes).flatMap((scene) => [
        scene.master,
        scene.fallback,
        ...Object.values(scene.responsive),
        ...scene.layers.map((layer) => layer.src),
      ]),
      ...Object.values(atlasAssetLibrary).map((asset) => asset.src),
    ];

    expect(paths.some((path) => path.includes("/raw-generated/"))).toBe(false);
    expect(paths.some((path) => path.includes("/scenes/candidates/"))).toBe(false);
  });

  it("resolves every registered path against the organised Atlas tree", () => {
    const paths = [
      ...Object.values(atlasScenes).flatMap((scene) => [
        scene.master,
        scene.fallback,
        ...Object.values(scene.responsive),
        ...scene.layers.map((layer) => layer.src),
      ]),
      ...Object.values(atlasAssetLibrary).map((asset) => asset.src),
    ];

    expect(paths.every((path) => existsSync(join(process.cwd(), "public", path.slice(1))))).toBe(true);
  });

  it("represents every W0 library category", () => {
    expect(Object.values(atlasLibraryCoverage).every((count) => count > 0)).toBe(true);
  });
});
