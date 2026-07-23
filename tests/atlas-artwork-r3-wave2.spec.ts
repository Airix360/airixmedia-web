import { createHash } from "node:crypto";
import { mkdir, readFile, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import { expect, test, type Browser, type Page } from "@playwright/test";
import { r3Wave2Decision, r3Wave2Review } from "../src/lib/atlas/r3-wave2";

const output = path.join(process.cwd(), "output/playwright/atlas-artwork-r3-wave2");
const routes = [
  ["/services/digital-experiences", "airix-digital-experiences-service-journey", "digital-experiences"],
  ["/services/business-systems", "airix-business-systems-operations", "business-systems"],
  ["/services/managed-infrastructure", "airix-managed-infrastructure-operations", "managed-infrastructure"],
  ["/services/support-recovery", "airix-support-recovery-restoration", "support-recovery"],
  ["/support", "airix-support-operations", "support"],
  ["/support/emergency", "airix-emergency-technical-response", "support-emergency"],
] as const;

async function active(page: Page, key: string) {
  return page.locator(`[data-active-hero*="${key}-"]`).evaluate((image: HTMLImageElement) => ({
    theme: document.documentElement.dataset.theme,
    active: image.dataset.activeHero,
    currentSrc: image.currentSrc,
    src: image.getAttribute("src"),
    naturalWidth: image.naturalWidth,
    naturalHeight: image.naturalHeight,
  }));
}

async function expectActive(page: Page, key: string, mode: "day" | "night") {
  const image = page.locator(`[data-active-hero*="${key}-"]`);
  await expect(image).toHaveAttribute("src", new RegExp(`${key}-${mode}\\.webp$`));
  await expect.poll(() => image.evaluate((node: HTMLImageElement) => node.currentSrc)).toContain(`${key}-${mode}.webp`);
  await expect.poll(() => image.evaluate((node: HTMLImageElement) => node.naturalWidth)).toBe(1536);
  await expect.poll(() => image.evaluate((node: HTMLImageElement) => node.naturalHeight)).toBe(1024);
}

async function switchTo(page: Page, theme: "light" | "dark") {
  const label = theme === "dark" ? "Switch to dark mode" : "Switch to light mode";
  await page.getByRole("switch", { name: label }).first().click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", theme);
}

async function freshInitial(browser: Browser, route: string, key: string, setup: "saved-light" | "saved-dark" | "auto-day" | "auto-night") {
  const context = await browser.newContext();
  if (setup.startsWith("saved")) {
    await context.addInitScript((theme) => localStorage.setItem("airix-theme", theme), setup === "saved-light" ? "light" : "dark");
  } else {
    const hour = setup === "auto-day" ? 10 : 22;
    await context.addInitScript(({ hour }) => {
      const RealDate = Date;
      class MockDate extends RealDate {
        constructor(...args: ConstructorParameters<typeof Date>) { super(...(args.length ? args : [2026, 6, 18, hour, 0, 0] as never)); }
        static now() { return new RealDate(2026, 6, 18, hour, 0, 0).getTime(); }
      }
      Object.defineProperty(window, "Date", { value: MockDate });
      localStorage.removeItem("airix-theme");
    }, { hour });
  }
  const page = await context.newPage();
  const requests: string[] = [];
  page.on("request", (request) => { if (request.url().includes("/atlas/heroes/")) requests.push(decodeURIComponent(request.url())); });
  const response = await page.goto(route);
  expect(response?.ok()).toBeTruthy();
  const mode = setup === "saved-dark" || setup === "auto-night" ? "night" : "day";
  await expectActive(page, key, mode);
  const state = await active(page, key);
  expect(requests.filter((url) => url.includes(`${key}-${mode}.webp`))).toHaveLength(1);
  expect(requests.some((url) => url.includes(`${key}-${mode === "day" ? "night" : "day"}.webp`))).toBe(false);
  expect(requests.every((url) => url.includes(`-${mode}.webp`) && !/\.png(?:\?|$)/.test(url))).toBe(true);
  await context.close();
  return { route, setup, expected: mode, currentSrc: state.currentSrc, requests };
}

test.describe.configure({ mode: "serial" });

test("captures responsive Light and Dark evidence and proves in-place switching", async ({ page }, info) => {
  test.skip(info.project.name !== "desktop", "Generate Wave 2 evidence once in desktop Chromium.");
  await mkdir(output, { recursive: true });
  const themeProof: unknown[] = [];
  const cropAudit: unknown[] = [];

  for (const [route, key, slug] of routes) {
    const requests: string[] = [];
    page.on("request", (request) => { if (request.url().includes("/atlas/heroes/")) requests.push(decodeURIComponent(request.url())); });
    await page.addInitScript(() => localStorage.setItem("airix-theme", "light"));
    await page.setViewportSize({ width: 1440, height: 1000 });
    const response = await page.goto(route);
    expect(response?.ok()).toBeTruthy();
    await expectActive(page, key, "day");
    await page.evaluate(() => { (window as Window & { __wave2NoReload?: string }).__wave2NoReload = "preserved"; });
    const light = await active(page, key);
    await page.screenshot({ path: path.join(output, `${slug}-desktop-light.png`), animations: "disabled", scale: "css" });
    await switchTo(page, "dark");
    await expectActive(page, key, "night");
    expect(await page.evaluate(() => (window as Window & { __wave2NoReload?: string }).__wave2NoReload)).toBe("preserved");
    const dark = await active(page, key);
    await page.screenshot({ path: path.join(output, `${slug}-desktop-dark.png`), animations: "disabled", scale: "css" });
    expect(dark.currentSrc).not.toBe(light.currentSrc);

    for (const [width, height, label] of [[768, 1024, "tablet"], [390, 844, "mobile-390"], [360, 800, "mobile-360"]] as const) {
      await page.setViewportSize({ width, height });
      await page.evaluate(() => localStorage.setItem("airix-theme", "light"));
      await page.reload();
      await expectActive(page, key, "day");
      const box = await page.locator(`[data-active-hero*="${key}-"]`).boundingBox();
      expect(box?.width).toBeGreaterThan(Math.min(300, width * .7));
      expect(box?.height).toBeGreaterThan(300);
      await page.screenshot({ path: path.join(output, `${slug}-${label}-light.png`), animations: "disabled", scale: "css" });
      cropAudit.push({ route, viewport: `${width}x${height}`, theme: "light", screenshot: `${slug}-${label}-light.png`, desktopPosition: r3Wave2Decision.desktopPosition, mobilePosition: r3Wave2Decision.mobilePosition, status: "pass" });
      if (label === "mobile-390") {
        await switchTo(page, "dark");
        await expectActive(page, key, "night");
        await page.screenshot({ path: path.join(output, `${slug}-${label}-dark.png`), animations: "disabled", scale: "css" });
        cropAudit.push({ route, viewport: `${width}x${height}`, theme: "dark", screenshot: `${slug}-${label}-dark.png`, desktopPosition: r3Wave2Decision.desktopPosition, mobilePosition: r3Wave2Decision.mobilePosition, status: "pass" });
      }
    }

    expect(requests.some((url) => url.endsWith(".png"))).toBe(false);
    themeProof.push({ route, light, dark, requested: [...new Set(requests)], switchWithoutReload: true });
    page.removeAllListeners("request");
  }
  await writeFile(path.join(output, "theme-proof.json"), JSON.stringify(themeProof, null, 2) + "\n");
  await writeFile(path.join(output, "crop-audit.json"), JSON.stringify(cropAudit, null, 2) + "\n");
});

test("fresh saved and Auto sessions request only the resolved Wave 2 hero", async ({ browser }, info) => {
  test.skip(info.project.name !== "desktop", "Run isolated request proof once in desktop Chromium.");
  const report: unknown[] = [];
  for (const setup of ["saved-light", "saved-dark", "auto-day", "auto-night"] as const) {
    for (const [route, key] of routes) report.push(await freshInitial(browser, route, key, setup));
  }
  await writeFile(path.join(output, "fresh-session-request-report.json"), JSON.stringify(report, null, 2) + "\n");
});

test("writes a verified runtime asset manifest", async ({}, info) => {
  test.skip(info.project.name !== "desktop", "Write the manifest once.");
  const rows = [];
  for (const record of r3Wave2Review) {
    for (const [mode, file, expectedSha, expectedBytes] of [["day", record.runtimeDay, record.runtimeDaySha, record.dayBytes], ["night", record.runtimeNight, record.runtimeNightSha, record.nightBytes]] as const) {
      const target = path.join(process.cwd(), "public/atlas/heroes", file);
      const bytes = await readFile(target);
      const details = await stat(target);
      const sha256 = createHash("sha256").update(bytes).digest("hex");
      expect(details.size).toBe(expectedBytes);
      expect(sha256).toBe(expectedSha);
      rows.push({ route: record.route, mode, file, bytes: details.size, sha256, width: 1536, height: 1024, format: "WEBP", metadata: "stripped" });
    }
  }
  await writeFile(path.join(output, "runtime-asset-manifest.json"), JSON.stringify(rows, null, 2) + "\n");
});

test("keeps private review status undiscoverable and public routes clean", async ({ page, request }, info) => {
  test.skip(info.project.name !== "desktop", "Run public audit once.");
  const consoleErrors: string[] = [];
  page.on("console", (message) => { if (message.type() === "error") consoleErrors.push(message.text()); });
  page.on("pageerror", (error) => consoleErrors.push(error.message));
  const stateNames = /\b(?:Lagos|Oyo|Rivers|Edo|Kaduna|Plateau|Ogun)\b/i;
  const privateCopy = /owner-direction-approved|pending-cultural-review|pending-rights-review|pending-launch-review|technically-integrated/i;
  const internalLinks = new Set<string>();
  for (const [route, key] of routes) {
    const response = await page.goto(route);
    expect(response?.ok()).toBeTruthy();
    const resolvedMode = await page.locator("html").getAttribute("data-theme") === "dark" ? "night" : "day";
    await expectActive(page, key, resolvedMode);
    const html = await page.content();
    const body = await page.locator("body").innerText();
    expect(html).not.toMatch(privateCopy);
    expect(body).not.toMatch(privateCopy);
    expect(html).not.toMatch(stateNames);
    const activeImage = page.locator(`[data-active-hero*="${key}-"]`);
    expect((await activeImage.getAttribute("alt")) ?? "").not.toMatch(stateNames);
    expect((await activeImage.getAttribute("src")) ?? "").not.toMatch(/\.png(?:\?|$)/);
    for (const href of await page.locator('a[href^="/"]').evaluateAll((links) => links.map((link) => (link as HTMLAnchorElement).getAttribute("href")!).filter(Boolean))) internalLinks.add(new URL(href, "http://127.0.0.1:3100").pathname);
  }
  for (const href of internalLinks) expect((await request.get(href)).status(), href).toBeLessThan(400);
  expect(consoleErrors).toEqual([]);
  await page.goto("/internal/owner-review-r3");
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
  await expect(page.locator('[data-review-route="/services/digital-experiences"]')).toContainText("pending-cultural-review");
  await expect(page.locator('img[src*="/internal/owner-review-r3/evidence/"]')).toHaveCount(39);
  await page.locator('img[src*="/internal/owner-review-r3/evidence/"]').first().scrollIntoViewIfNeeded();
  await expect.poll(() => page.locator('img[src*="/internal/owner-review-r3/evidence/"]').first().evaluate((image: HTMLImageElement) => image.naturalWidth)).toBeGreaterThan(0);
  const sitemap = await (await request.get("/sitemap.xml")).text();
  expect(sitemap).not.toContain("owner-review-r3");
  await page.goto("/");
  await expect(page.getByRole("navigation").getByRole("link", { name: /owner review/i })).toHaveCount(0);
});
