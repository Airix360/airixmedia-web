import { describe, expect, it } from "vitest";
import { retainedPublicRoutes, routeConsolidationRedirects } from "./route-consolidation";
import { publicPages } from "@/content/atlas/public";
import { legalDocuments } from "@/content/legal";
import { openSourceCatalogue } from "@/content/atlas/open-source";

const expectedRedirects: Record<string, string> = {
  "/atlas": "/studio#atlas", "/discuss": "/contact?form=project", "/book": "/contact?form=book",
  "/services/digital-experiences": "/services#digital-experiences", "/services/business-systems": "/services#business-systems", "/services/managed-infrastructure": "/services#managed-infrastructure", "/services/support-recovery": "/services#support-recovery",
  "/publishing/ojs": "/publishing#ojs", "/publishing/pricing": "/publishing#pricing", "/publishing/universities": "/publishing#universities", "/publishing/journal-platforms": "/publishing#journal-platforms", "/publishing/hosting-support": "/publishing#hosting-support", "/publishing/editorial-support": "/publishing#editorial-support", "/publishing/plugins": "/publishing#plugins", "/publishing/projects": "/publishing#projects", "/publishing/resources": "/publishing#resources",
  "/open-source/paystack-ojs": "/open-source#paystack-ojs", "/open-source/ojs-magic-login": "/open-source#ojs-magic-login", "/open-source/submission-fee": "/open-source#submission-fee", "/open-source/multipay": "/open-source#multipay", "/open-source/request-waiver": "/open-source#request-waiver",
  "/knowledge-base": "/support#guides", "/service-levels": "/support#service-levels", "/status": "/support", "/cookies": "/legal#cookies", "/accessibility": "/legal#accessibility", "/acceptable-use": "/legal#acceptable-use",
};

describe("R3 route consolidation", () => {
  it("retains exactly the approved 16-route public sitemap", () => {
    expect(retainedPublicRoutes).toHaveLength(16);
    expect(new Set(retainedPublicRoutes).size).toBe(16);
  });

  it("maps every required removed route to the exact approved destination", () => {
    const actual = Object.fromEntries(routeConsolidationRedirects.map(({ source, destination }) => [source, destination]));
    expect(actual).toMatchObject(expectedRedirects);
    for (const source of Object.keys(expectedRedirects)) expect(routeConsolidationRedirects.find((entry) => entry.source === source)?.permanent).toBe(true);
  });

  it("owns every redirected fragment on the canonical destination", () => {
    const anchors = new Map(publicPages.map((page) => [`/${page.path}`, new Set(page.sections.map((section) => section.id).filter(Boolean))]));
    anchors.set("/open-source", new Set(openSourceCatalogue.map((project) => project.slug)));
    anchors.set("/legal", new Set(legalDocuments.find((document) => document.path === "legal")?.sections.map((section) => section.id).filter(Boolean)));
    for (const { destination } of routeConsolidationRedirects) {
      if (!destination.includes("#")) continue;
      const [pathname, fragment] = destination.split("#");
      expect(anchors.get(pathname)?.has(fragment), destination).toBe(true);
    }
  });
});
