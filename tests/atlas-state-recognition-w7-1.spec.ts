import path from "node:path";
import { expect, test, type Page } from "@playwright/test";

const families = [
  { state: "edo", route: "studio" },
  { state: "kaduna", route: "labs" },
  { state: "plateau", route: "observatory" },
  { state: "ogun", route: "gateway" },
] as const;
const allRoutes = ["studio", "trust", "labs", "observatory", "insights", "resources", "gateway", "contact", "booking"] as const;
const output = (state: string, file: string) => path.join(process.cwd(), "output/playwright/atlas-state-audit-w7-1", state, file);

async function ready(page: Page, route: string, hidden = false) {
  await page.goto(`/internal/atlas-${route}${hidden ? "?state-audit=hidden-labels" : ""}`);
  await expect(page.locator("[data-state-audit]")).toHaveAttribute("data-state-audit", hidden ? "hidden-labels" : "labelled");
  await expect(page.locator("[data-asset-status='candidate'] img")).toBeVisible();
  await page.addStyleTag({ content: "nextjs-portal{display:none!important}" });
}

test("every active scene survives hidden-label audit and keeps responsive WebP assets", async ({ page }, info) => {
  test.skip(info.project.name !== "desktop");
  for (const route of allRoutes) {
    const requests: string[] = [];
    page.on("request", request => requests.push(request.url()));
    await ready(page, route, true);
    await expect(page.locator("[data-atlas-state]")).toHaveCSS("opacity", "0");
    const alt = await page.locator("[data-asset-status='candidate'] img").getAttribute("alt");
    expect(alt).not.toMatch(/Edo|Kaduna|Plateau|Ogun/);
    expect(requests.some(url => url.endsWith(".webp"))).toBeTruthy();
    expect(requests.some(url => url.includes("/source/") || url.endsWith(".png"))).toBeFalsy();
  }
});

test("capture desktop labelled, hidden, reduced and anchor evidence", async ({ page }, info) => {
  test.skip(info.project.name !== "desktop");
  await page.setViewportSize({ width: 1440, height: 1000 });
  for (const family of families) {
    await ready(page, family.route);
    await page.screenshot({ path: output(family.state, "desktop-labelled-1440x1000.png"), animations: "disabled" });
    await ready(page, family.route, true);
    await page.screenshot({ path: output(family.state, "desktop-hidden-labels-1440x1000.png"), animations: "disabled" });
    await page.locator("[data-asset-status='candidate']").screenshot({ path: output(family.state, "principal-anchor-crop.png"), animations: "disabled" });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await ready(page, family.route, true);
    await page.screenshot({ path: output(family.state, "reduced-motion-hidden-1440x1000.png"), animations: "disabled" });
    await page.emulateMedia({ reducedMotion: "no-preference" });
  }
});

test("capture mobile labelled and hidden evidence with mobile masters", async ({ page }, info) => {
  test.skip(info.project.name !== "mobile");
  await page.setViewportSize({ width: 390, height: 844 });
  for (const family of families) {
    await ready(page, family.route);
    expect(await page.locator("[data-asset-status='candidate'] img").evaluate(image => (image as HTMLImageElement).currentSrc)).toContain("_mobile_");
    await page.screenshot({ path: output(family.state, "mobile-labelled-390x844.png"), animations: "disabled" });
    await ready(page, family.route, true);
    await page.screenshot({ path: output(family.state, "mobile-hidden-labels-390x844.png"), animations: "disabled" });
  }
});

test("public homepage remains outside the recognition audit runtime", async ({ page }) => {
  await page.goto("/?state-audit=hidden-labels");
  await expect(page.locator("[data-state-audit]")).toHaveCount(0);
  await expect(page.locator("[data-w6-review], [data-w7-review]")).toHaveCount(0);
});
