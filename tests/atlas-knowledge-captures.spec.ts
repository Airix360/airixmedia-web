import path from "node:path";
import { expect, test } from "@playwright/test";

const output = (name: string) => path.join(process.cwd(), "output/playwright/atlas-knowledge-w4", name);

async function captureSection(page: import("@playwright/test").Page, hash: string, selector: string, filename: string) {
  await page.goto(`/internal/atlas-knowledge${hash}`);
  const subject = page.locator(selector).first();
  await expect(subject).toBeVisible();
  await subject.scrollIntoViewIfNeeded();
  await page.waitForTimeout(200);
  await page.screenshot({ path: output(filename), animations: "disabled", scale: "css" });
}

test("capture W4 desktop evidence", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop", "Desktop evidence runs once in the desktop project.");
  await page.setViewportSize({ width: 1440, height: 1000 });
  await captureSection(page, "", "[data-atlas-knowledge]", "desktop-opening-1440x1000.png");
  await captureSection(page, "#publishing-workflow", "[data-publishing-workflow]", "desktop-workflow-1440x1000.png");
  await captureSection(page, "#publishing-capabilities", "[data-pathway-variant='knowledge']", "desktop-capabilities-1440x1000.png");
  await captureSection(page, "#publishing-system", "[data-publishing-system-textual-equivalent]", "desktop-platform-system-1440x1000.png");
  await captureSection(page, "#open-source-workshop", "[data-open-source-project]", "desktop-open-source-1440x1000.png");
});

test("capture W4 mobile evidence", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "mobile", "Mobile evidence runs once in the mobile project.");
  await page.setViewportSize({ width: 390, height: 844 });
  await captureSection(page, "", "[data-atlas-knowledge]", "mobile-opening-390x844.png");
  await captureSection(page, "#publishing-workflow", "[data-publishing-workflow]", "mobile-workflow-390x844.png");
  await captureSection(page, "#publishing-capabilities", "[data-pathway-variant='knowledge']", "mobile-capabilities-390x844.png");
  await captureSection(page, "#open-source-workshop", "[data-open-source-project]", "mobile-open-source-390x844.png");
});

test("capture W4 reduced-motion evidence", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop", "Reduced-motion evidence runs once in the desktop project.");
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await captureSection(page, "", "[data-atlas-knowledge]", "reduced-motion-opening-1440x1000.png");
  await captureSection(page, "#publishing-workflow", "[data-publishing-workflow]", "reduced-motion-workflow-1440x1000.png");
});
