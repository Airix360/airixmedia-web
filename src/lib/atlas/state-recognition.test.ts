import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { atlasScenes, CandidateAssetAccessError, getAtlasScene } from "./assets";
import { hasHiddenStateLabels } from "./state-audit";

const active = ["ill-0051", "ill-0071", "ill-0060", "ill-0090", "ill-0091", "ill-0092", "ill-0083", "ill-0084", "ill-0085"];
const manifests = ["edo/studio", "edo/trust", "kaduna/labs", "plateau/observatory", "plateau/insights", "plateau/resources", "ogun/gateway", "ogun/contact", "ogun/booking"];

describe("W7.1 state recognition governance", () => {
  it("keeps every active scene candidate-gated with meaningful label-independent alt text", () => {
    for (const id of active) {
      expect(() => getAtlasScene(id)).toThrow(CandidateAssetAccessError);
      const scene = atlasScenes[id];
      expect(scene.alt.length).toBeGreaterThan(60);
      expect(scene.alt).not.toMatch(/Edo|Kaduna|Plateau|Ogun/);
      for (const path of Object.values(scene.responsive)) expect(existsSync(join(process.cwd(), "public", path))).toBe(true);
    }
  });

  it("records all four recognition anchors and pending approvals in every manifest", () => {
    for (const directory of manifests) {
      const value = JSON.parse(readFileSync(join(process.cwd(), "public/images/atlas/states", directory, "manifest.json"), "utf8"));
      for (const key of ["geographicAnchor", "infrastructureAnchor", "activityAnchor", "materialAnchor", "recognitionExplanation"]) expect(value[key]).toBeTruthy();
      expect(value.hiddenLabelRecognition).toBe("pass");
      expect(value.sources.every((source: { dimensions?: string }) => source.dimensions)).toBe(true);
      expect(value.derivatives.every((derivative: { dimensions?: string }) => derivative.dimensions)).toBe(true);
      expect(value.finalAuditOutcome).toBe("pass");
      expect(value.ownerReviewStatus).toBe("pending");
      expect(value.culturalReviewStatus).toBe("pending");
      expect(value.generatedTextDefects).toMatch(/No readable generated text accepted/);
    }
  });

  it("enables hidden-label mode only through the private audit query", async () => {
    expect(await hasHiddenStateLabels(Promise.resolve({ "state-audit": "hidden-labels" }))).toBe(true);
    expect(await hasHiddenStateLabels(Promise.resolve({ "state-audit": "labelled" }))).toBe(false);
  });
});
