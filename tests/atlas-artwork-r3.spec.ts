import { expect, test, type Page } from "@playwright/test";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const routes = [["/atlas", "airix-atlas-highland-systems-overlook", "atlas"], ["/discuss", "airix-project-discussion-granite-arrival", "discuss"], ["/contact", "airix-contact-transport-interchange", "contact"], ["/book", "airix-consultation-courtyard-booking", "book"]] as const;
const output = path.join(process.cwd(), "output/playwright/atlas-artwork-r3");

async function theme(page: Page, value: "light" | "dark") {
  await page.evaluate(next => localStorage.setItem("airix-theme", next), value); await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-theme", value);
}

test.describe.configure({ mode: "serial" });
test("captures Wave 1 route crops and proves active sources", async ({ page }, info) => {
  test.skip(info.project.name !== "desktop", "Generate evidence once in desktop Chromium.");
  await mkdir(output, { recursive: true });
  for (const [route, assetKey, key] of routes) for (const [width, height, label] of [[1440, 1000, "desktop"], [768, 1024, "tablet"], [390, 844, "mobile-390"], [360, 800, "mobile-360"]] as const) {
    await page.setViewportSize({ width, height }); await page.goto(route); await theme(page, "light");
    await expect(page.locator("[data-active-hero]")).toHaveAttribute("src", new RegExp(`${assetKey}-day\\.webp$`));
    await expect.poll(() => page.locator("[data-active-hero]").evaluate((node: HTMLImageElement) => node.currentSrc)).toContain(`${assetKey}-day.webp`);
    await expect.poll(() => page.locator("[data-active-hero]").evaluate((node: HTMLImageElement) => node.naturalWidth)).toBeGreaterThan(0);
    await expect(page.locator("header").filter({ has: page.locator("[data-active-hero]") })).toHaveCSS("height", `${height}px`);
    await expect(page.locator("[data-active-hero]")).toHaveCSS("height", `${height}px`);
    await page.screenshot({ path: path.join(output, `${key}-${label}-light.png`), animations: "disabled", scale: "css" });
    if (label !== "tablet" && label !== "mobile-360") { await theme(page, "dark"); await expect(page.locator("[data-active-hero]")).toHaveAttribute("src", new RegExp(`${assetKey}-night\\.webp$`)); await expect.poll(() => page.locator("[data-active-hero]").evaluate((node: HTMLImageElement) => node.currentSrc)).toContain(`${assetKey}-night.webp`); await page.screenshot({ path: path.join(output, `${key}-${label}-dark.png`), animations: "disabled", scale: "css" }); }
    await expect(page.locator("body")).not.toContainText(/contemporary jos|olumo rock|abeokuta railway|pending landmark|pending owner review/i);
  }
});

test("R3 owner review remains private and undiscoverable", async ({ page }) => {
  await page.goto("/internal/owner-review-r3");
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
  await page.goto("/sitemap.xml"); await expect(page.locator("body")).not.toContainText("owner-review-r3");
  await page.goto("/"); await expect(page.getByRole("navigation").getByRole("link", { name: /owner review/i })).toHaveCount(0);
});
