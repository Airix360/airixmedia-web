import { describe, expect, it } from "vitest";
import { recommendBrief } from "./selector";
describe("project recommendations", () => {
  it("routes rescue work ahead of the requested practice", () => { expect(recommendBrief({ requestedService: "publishing", projectType: "rescue", urgency: "urgent", ongoingSupport: true }).practice).toBe("Support and Recovery"); });
  it("routes normal publishing work to Publishing Technology", () => { expect(recommendBrief({ requestedService: "publishing", projectType: "migration", urgency: "planned", ongoingSupport: true }).practice).toBe("Publishing Technology"); });
});
