import { chromium } from "@playwright/test";
import { mkdir, rm } from "node:fs/promises";
import path from "node:path";

const baseURL = process.env.BASE_URL ?? "http://127.0.0.1:3100";
const root = path.resolve("design-review/phase-03b-concept-differentiation");
const screenshots = path.join(root, "screenshots");
const recordings = path.join(root, "recordings");
const concepts = process.env.CONCEPT ? [process.env.CONCEPT] : ["after-dark", "in-motion", "reassembled"];
await mkdir(screenshots, { recursive: true });
await mkdir(recordings, { recursive: true });

const browser = await chromium.launch();
async function settled(page) {
  await page.waitForLoadState("networkidle");
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(500);
}
async function captureAt(page, concept, label, state, selector) {
  if (selector) { await page.locator(selector).scrollIntoViewIfNeeded(); await page.waitForTimeout(900); }
  await page.screenshot({ path: path.join(screenshots, `${concept}-${label}-${state}.png`) });
}
async function captureSet(concept, viewport, label) {
  const context = await browser.newContext({ viewport });
  const page = await context.newPage();
  await page.goto(`${baseURL}/__design_lab/${concept}`); await settled(page);
  await captureAt(page, concept, label, "opening");
  await captureAt(page, concept, label, "transition", "#first-transition");
  await captureAt(page, concept, label, "proof", "#proof");
  await captureAt(page, concept, label, "final-cta", "#final-cta");
  await page.goto(`${baseURL}/__design_lab/${concept}`); await settled(page);
  await page.screenshot({ path: path.join(screenshots, `${concept}-${label}-full.png`), fullPage: true });
  await context.close();
}
for (const concept of concepts) {
  await captureSet(concept, { width: 1440, height: 1000 }, "desktop");
  await captureSet(concept, { width: 390, height: 844 }, "mobile");
  const context = await browser.newContext({ viewport: { width: 1440, height: 1000 }, reducedMotion: "reduce" });
  const page = await context.newPage();
  await page.goto(`${baseURL}/__design_lab/${concept}`); await settled(page);
  await captureAt(page, concept, "desktop-reduced", "opening");
  await captureAt(page, concept, "desktop-reduced", "proof", "#proof");
  await context.close();
}
await browser.close();

for (const concept of concepts) {
  const videoDir = path.join(recordings, `.tmp-${concept}`);
  await rm(videoDir, { recursive: true, force: true }); await mkdir(videoDir, { recursive: true });
  const videoBrowser = await chromium.launch();
  const context = await videoBrowser.newContext({ viewport: { width: 1280, height: 800 }, recordVideo: { dir: videoDir, size: { width: 1280, height: 800 } } });
  const page = await context.newPage();
  await page.goto(`${baseURL}/__design_lab/${concept}`); await settled(page);
  const interactive = page.locator("[data-record-nav] button").last();
  if (await interactive.count()) await interactive.click();
  else await page.locator("[data-record-nav] a").last().focus();
  await page.waitForTimeout(900);
  for (const selector of ["#first-transition", "#proof", "#final-cta"]) { await page.locator(selector).scrollIntoViewIfNeeded(); await page.waitForTimeout(1450); }
  const video = page.video(); await context.close();
  if (!video) throw new Error(`Video unavailable for ${concept}`);
  await video.saveAs(path.join(recordings, `${concept}.webm`));
  await videoBrowser.close(); await rm(videoDir, { recursive: true, force: true });
}
