import { chromium } from "@playwright/test";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const baseURL = process.env.BASE_URL ?? "http://127.0.0.1:3100";
const root = path.resolve("design-review/phase-03-concepts");
const screenshots = path.join(root, "screenshots");
const recordings = path.join(root, "recordings");
const concepts = ["after-dark", "in-motion", "reassembled"];
await mkdir(screenshots, { recursive: true });
await mkdir(recordings, { recursive: true });

const browser = await chromium.launch();

async function settled(page) {
  await page.waitForLoadState("networkidle");
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(350);
}

async function captureSet(concept, viewport, label) {
  const context = await browser.newContext({ viewport, colorScheme: "light" });
  const page = await context.newPage();
  await page.goto(`${baseURL}/__design_lab/${concept}`);
  await settled(page);
  await page.screenshot({ path: path.join(screenshots, `${concept}-${label}-opening.png`) });
  await page.locator("#proposition").scrollIntoViewIfNeeded();
  await page.waitForTimeout(850);
  await page.screenshot({ path: path.join(screenshots, `${concept}-${label}-reveal.png`) });
  await page.locator("#selected-work").scrollIntoViewIfNeeded();
  await page.waitForTimeout(900);
  await page.screenshot({ path: path.join(screenshots, `${concept}-${label}-work.png`) });
  await page.goto(`${baseURL}/__design_lab/${concept}`);
  await settled(page);
  await page.screenshot({ path: path.join(screenshots, `${concept}-${label}-full.png`), fullPage: true });
  await context.close();
}

for (const concept of concepts) {
  await captureSet(concept, { width: 1440, height: 1000 }, "desktop");
  await captureSet(concept, { width: 390, height: 844 }, "mobile");
  const reduced = await browser.newContext({ viewport: { width: 1440, height: 1000 }, reducedMotion: "reduce" });
  const reducedPage = await reduced.newPage();
  await reducedPage.goto(`${baseURL}/__design_lab/${concept}`);
  await settled(reducedPage);
  await reducedPage.screenshot({ path: path.join(screenshots, `${concept}-desktop-reduced-opening.png`) });
  await reduced.close();
}

await browser.close();

for (const concept of concepts) {
  const videoDir = path.join(recordings, `.tmp-${concept}`);
  await mkdir(videoDir, { recursive: true });
  const videoBrowser = await chromium.launch();
  const context = await videoBrowser.newContext({
    viewport: { width: 1280, height: 800 },
    recordVideo: { dir: videoDir, size: { width: 1280, height: 800 } },
  });
  const page = await context.newPage();
  await page.goto(`${baseURL}/__design_lab/${concept}`);
  await settled(page);
  await page.mouse.move(180, 240);
  await page.waitForTimeout(1500);
  await page.mouse.move(1000, 520, { steps: 20 });
  await page.waitForTimeout(1500);
  await page.locator("#proposition").scrollIntoViewIfNeeded();
  await page.waitForTimeout(2200);
  await page.locator("#selected-work").scrollIntoViewIfNeeded();
  await page.waitForTimeout(2600);
  await page.mouse.move(750, 360, { steps: 16 });
  await page.waitForTimeout(1200);
  const video = page.video();
  await context.close();
  if (!video) throw new Error(`Video recording unavailable for ${concept}`);
  await video.saveAs(path.join(recordings, `${concept}.webm`));
  await videoBrowser.close();
}
