import { describe, expect, it } from "vitest";
import { formatBasePrice, pricingPackages, regionForCountry } from "./pricing";
describe("regional pricing", () => {
  it("maps countries deterministically", () => { expect(regionForCountry("NG")).toBe("nigeria"); expect(regionForCountry("UG")).toBe("africa"); expect(regionForCountry("FR")).toBe("europe"); expect(regionForCountry(undefined)).toBe("global"); });
  it("formats the approved NGN base without a dollar sign", () => { expect(formatBasePrice(pricingPackages[0])).toContain("250,000"); expect(formatBasePrice(pricingPackages[0])).not.toContain("$"); });
});
