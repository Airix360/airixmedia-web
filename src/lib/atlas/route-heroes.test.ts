import { describe, expect, it } from "vitest";
import { routeHeroAssets, routeHeroFor } from "./route-heroes";

describe("route hero registry", () => {
  it("assigns a unique day/night pair to every integrated route", () => {
    const assets = Object.values(routeHeroAssets);
    expect(assets).toHaveLength(14);
    expect(new Set(assets.flatMap((asset) => [asset.day, asset.night])).size).toBe(28);
    expect(routeHeroFor("work")?.day).toBe("/atlas/heroes/work-day.webp");
    expect(routeHeroFor("publishing/pricing")?.day).not.toBe(routeHeroFor("publishing")?.day);
  });

  it("preserves the R3 human-review boundaries", () => {
    expect(routeHeroAssets["/atlas"].status).toBe("pending-independent-landmark-verification");
    expect(routeHeroAssets["/discuss"].status).toBe("pending-landmark-verification");
    expect(routeHeroAssets["/contact"].status).toBe("pending-landmark-and-rights-review");
    expect(routeHeroAssets["/book"].status).toBe("owner-approved-production-qa-pending");
    expect(routeHeroAssets["/contact"].warning).toMatch(/no railway endorsement/i);
  });

  it("uses descriptive R3 filenames and visible-scene alternative text", () => {
    for (const route of ["/atlas", "/discuss", "/contact", "/book"] as const) {
      const asset = routeHeroAssets[route];
      expect(asset.day).toMatch(/\/airix-[a-z-]+-day\.webp$/);
      expect(asset.night).toMatch(/\/airix-[a-z-]+-night\.webp$/);
      expect(asset.alt).toBeTruthy();
      expect(asset.alt).not.toMatch(/Jos|Olumo|Abeokuta|Nigeria/i);
    }
  });

  it("keeps DELSU internal and UNILAG out of public project claims", () => {
    expect(routeHeroAssets["/publishing/universities"].status).toBe("pending-campus-accuracy-review");
    expect(routeHeroAssets["/publishing/universities"].internalContext).toContain("Abraka");
    expect(routeHeroAssets["/publishing/journal-platforms"].status).toBe("context-only-pending-rights-review");
    expect(routeHeroAssets["/publishing/journal-platforms"].internalContext).toMatch(/never a client/i);
  });
});
