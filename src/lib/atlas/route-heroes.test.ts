import { describe, expect, it } from "vitest";
import { routeHeroAssets, routeHeroFor } from "./route-heroes";

describe("route hero registry", () => {
  it("assigns a unique day/night pair to every integrated route", () => {
    const assets = Object.values(routeHeroAssets);
    expect(assets).toHaveLength(10);
    expect(new Set(assets.flatMap((asset) => [asset.day, asset.night])).size).toBe(20);
    expect(routeHeroFor("work")?.day).toBe("/atlas/heroes/work-day.webp");
    expect(routeHeroFor("publishing/pricing")?.day).not.toBe(routeHeroFor("publishing")?.day);
  });

  it("keeps DELSU internal and UNILAG out of public project claims", () => {
    expect(routeHeroAssets["/publishing/universities"].status).toBe("pending-campus-accuracy-review");
    expect(routeHeroAssets["/publishing/universities"].internalContext).toContain("Abraka");
    expect(routeHeroAssets["/publishing/journal-platforms"].status).toBe("context-only-pending-rights-review");
    expect(routeHeroAssets["/publishing/journal-platforms"].internalContext).toMatch(/never a client/i);
  });
});
