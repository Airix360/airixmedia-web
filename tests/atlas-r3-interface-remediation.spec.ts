import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Browser, type Locator, type Page } from "@playwright/test";
import { createHash } from "node:crypto";
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { retainedPublicRoutes, routeConsolidationRedirects } from "@/lib/route-consolidation";

const output = path.join(process.cwd(), "output/playwright/atlas-r3-interface-remediation");

function writeJson(name: string, value: unknown) {
  fs.mkdirSync(output, { recursive: true });
  fs.writeFileSync(path.join(output, name), `${JSON.stringify(value, null, 2)}\n`);
}

function rgb(value: string) {
  if (/^#[\da-f]{6}$/i.test(value)) return [value.slice(1, 3), value.slice(3, 5), value.slice(5, 7)].map((channel) => Number.parseInt(channel, 16));
  const channels = value.match(/[\d.]+/g)?.slice(0, 3).map(Number);
  if (!channels || channels.length !== 3) throw new Error(`Unsupported colour: ${value}`);
  return channels;
}

function luminance(value: string) {
  const [red, green, blue] = rgb(value).map((channel) => {
    const normalised = channel / 255;
    return normalised <= 0.04045 ? normalised / 12.92 : ((normalised + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * red + 0.7152 * green + 0.0722 * blue;
}

function contrast(foreground: string, background: string) {
  const first = luminance(foreground);
  const second = luminance(background);
  return (Math.max(first, second) + 0.05) / (Math.min(first, second) + 0.05);
}

async function setTheme(page: Page, theme: "light" | "dark") {
  await page.evaluate((value) => localStorage.setItem("airix-theme", value), theme);
  await page.reload({ waitUntil: "networkidle" });
  await expect(page.locator("html")).toHaveAttribute("data-theme", theme);
}

async function createAutoPage(browser: Browser, hour: number, viewport = { width: 1440, height: 1000 }) {
  const context = await browser.newContext({ viewport });
  await context.addInitScript(({ mockedHour }) => {
    const RealDate = Date;
    class MockDate extends RealDate {
      constructor(...args: ConstructorParameters<typeof Date>) {
        super(...(args.length ? args : [2026, 6, 18, mockedHour, 0, 0] as never));
      }
      static now() { return new RealDate(2026, 6, 18, mockedHour, 0, 0).getTime(); }
    }
    Object.defineProperty(window, "Date", { value: MockDate });
    localStorage.removeItem("airix-theme");
  }, { mockedHour: hour });
  const page = await context.newPage();
  await page.goto("/", { waitUntil: "networkidle" });
  return { context, page };
}

async function styleRecord(locator: Locator, backgroundLocator: Locator, referenceBackground: string) {
  const foreground = await locator.evaluate((node) => {
    const style = getComputedStyle(node);
    return {
      colour: style.color,
      fontSize: style.fontSize,
      fontWeight: style.fontWeight,
      textDecorationLine: style.textDecorationLine,
      textDecorationStyle: style.textDecorationStyle,
      textDecorationThickness: style.textDecorationThickness,
      outlineStyle: style.outlineStyle,
      outlineWidth: style.outlineWidth,
    };
  });
  const computedBackground = await backgroundLocator.evaluate((node) => getComputedStyle(node).backgroundColor);
  return {
    ...foreground,
    computedBackground,
    referenceBackground,
    contrastRatio: contrast(foreground.colour, referenceBackground),
    passesAA: contrast(foreground.colour, referenceBackground) >= 4.5,
  };
}

async function trustRecord(page: Page) {
  const section = page.locator("section").filter({ hasText: "Stay accountable after launch." });
  await section.scrollIntoViewIfNeeded();
  return section.evaluate((node) => {
    const background = getComputedStyle(node).backgroundColor;
    const targets = { kicker: node.querySelector("span"), heading: node.querySelector("h2"), paragraph: node.querySelector("p"), link: node.querySelector("a") };
    return {
      theme: document.documentElement.dataset.theme,
      background,
      elements: Object.fromEntries(Object.entries(targets).map(([name, target]) => {
        if (!target) throw new Error(`Missing trust ${name}`);
        const style = getComputedStyle(target);
        return [name, { colour: style.color, fontSize: style.fontSize, fontWeight: style.fontWeight }];
      })),
    };
  });
}

async function menuGeometry(page: Page) {
  const dialog = page.getByRole("dialog", { name: "Site navigation" });
  const targets = {
    support: dialog.getByRole("link", { name: "Support", exact: true }),
    emergency: dialog.getByRole("link", { name: "Emergency", exact: true }),
    clientPortal: dialog.getByRole("link", { name: "Client Portal", exact: true }),
    theme: dialog.getByRole("switch"),
    close: dialog.getByRole("button", { name: "Close menu" }),
  };
  const bounds = Object.fromEntries(await Promise.all(Object.entries(targets).map(async ([name, locator]) => {
    const box = await locator.boundingBox();
    if (!box) throw new Error(`${name} is not rendered`);
    return [name, { left: box.x, right: box.x + box.width, top: box.y, bottom: box.y + box.height, width: box.width, height: box.height }];
  }))) as Record<string, { left: number; right: number; top: number; bottom: number; width: number; height: number }>;
  const documentState = await page.evaluate(() => ({
    viewportWidth: innerWidth,
    clientWidth: document.documentElement.clientWidth,
    rootScrollWidth: document.documentElement.scrollWidth,
    bodyScrollWidth: document.body.scrollWidth,
    bodyOverflow: getComputedStyle(document.body).overflow,
  }));
  return { bounds, documentState };
}

test.describe("R3 interface remediation verification", () => {
  test.describe.configure({ mode: "serial" });

  test.beforeAll(({}, testInfo) => {
    if (testInfo.project.name !== "desktop") return;
    fs.rmSync(output, { recursive: true, force: true });
    fs.mkdirSync(output, { recursive: true });
  });

  test("Emergency link passes every authorised state", async ({ page, browser }, testInfo) => {
    test.skip(testInfo.project.name !== "desktop", "Capture one deterministic evidence set.");
    test.setTimeout(240_000);
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.goto("/", { waitUntil: "networkidle" });
    const report: Record<string, unknown> = {
      before: { foreground: "#953e29", background: "#1a1916", contrastRatio: 2.51, passesAA: false },
    };

    for (const theme of ["light", "dark"] as const) {
      await setTheme(page, theme);
      const header = page.locator("header");
      const emergency = header.getByRole("link", { name: "Emergency", exact: true });
      await page.evaluate(() => window.scrollTo(0, 0));
      await expect(header).not.toHaveClass(/scrolled/);
      const transparent = await styleRecord(emergency, header, "#14110d");
      expect(transparent.contrastRatio).toBeGreaterThanOrEqual(4.5);
      expect(transparent.textDecorationLine).toContain("underline");
      report[`${theme}Transparent`] = transparent;
      await header.screenshot({ path: path.join(output, `emergency-${theme}-transparent.png`), animations: "disabled" });

      await page.evaluate(() => window.scrollTo(0, innerHeight));
      await expect(header).toHaveClass(/scrolled/);
      const stickyBackground = theme === "light" ? "#f2e8d2" : "#1a1916";
      const sticky = await styleRecord(emergency, header, stickyBackground);
      expect(sticky.contrastRatio).toBeGreaterThanOrEqual(4.5);
      report[`${theme}Sticky`] = sticky;
      await header.screenshot({ path: path.join(output, `emergency-${theme}-sticky.png`), animations: "disabled" });

      await emergency.hover();
      const hovered = await styleRecord(emergency, header, stickyBackground);
      expect(hovered.contrastRatio).toBeGreaterThanOrEqual(4.5);
      expect(hovered.textDecorationThickness).not.toBe("1px");
      report[`${theme}Hover`] = hovered;
      if (theme === "dark") await header.screenshot({ path: path.join(output, "emergency-link-hover.png"), animations: "disabled" });

      await emergency.focus();
      const focused = await styleRecord(emergency, header, stickyBackground);
      expect(focused.outlineStyle).not.toBe("none");
      expect(focused.contrastRatio).toBeGreaterThanOrEqual(4.5);
      report[`${theme}Focus`] = focused;
      if (theme === "dark") await header.screenshot({ path: path.join(output, "emergency-link-keyboard-focus.png"), animations: "disabled" });

      await emergency.hover();
      await page.mouse.down();
      const active = await styleRecord(emergency, header, stickyBackground);
      await page.mouse.up();
      expect(active.textDecorationStyle).toBe("double");
      report[`${theme}Active`] = active;
    }

    for (const [name, hour, expected] of [["auto-light", 10, "light"], ["auto-dark", 22, "dark"]] as const) {
      const automatic = await createAutoPage(browser, hour);
      await expect(automatic.page.locator("html")).toHaveAttribute("data-theme", expected);
      await automatic.page.evaluate(() => window.scrollTo(0, innerHeight));
      const header = automatic.page.locator("header");
      await expect(header).toHaveClass(/scrolled/);
      const result = await styleRecord(header.getByRole("link", { name: "Emergency", exact: true }), header, expected === "light" ? "#f2e8d2" : "#1a1916");
      expect(result.contrastRatio).toBeGreaterThanOrEqual(4.5);
      report[name] = result;
      await header.screenshot({ path: path.join(output, `${name}-header.png`), animations: "disabled" });
      await automatic.context.close();
    }

    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/", { waitUntil: "networkidle" });
    await setTheme(page, "dark");
    await page.getByRole("button", { name: "Open menu" }).click();
    const dialog = page.getByRole("dialog", { name: "Site navigation" });
    const mobileEmergency = dialog.getByRole("link", { name: "Emergency", exact: true });
    const mobile = await styleRecord(mobileEmergency, dialog, "#191714");
    expect(mobile.contrastRatio).toBeGreaterThanOrEqual(4.5);
    expect(mobile.textDecorationLine).toContain("underline");
    report.mobileDark = mobile;
    await dialog.evaluate((node) => { node.scrollTop = node.scrollHeight; });
    await page.screenshot({ path: path.join(output, "emergency-link-mobile.png"), animations: "disabled" });
    await page.keyboard.press("Escape");

    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.emulateMedia({ forcedColors: "active" });
    await page.goto("/", { waitUntil: "networkidle" });
    await page.evaluate(() => window.scrollTo(0, innerHeight));
    const forcedHeader = page.locator("header");
    await expect(forcedHeader).toHaveClass(/scrolled/);
    const forcedEmergency = forcedHeader.getByRole("link", { name: "Emergency", exact: true });
    const forcedColours = await forcedEmergency.evaluate((node) => ({
      active: matchMedia("(forced-colors: active)").matches,
      colour: getComputedStyle(node).color,
      textDecorationLine: getComputedStyle(node).textDecorationLine,
      textDecorationStyle: getComputedStyle(node).textDecorationStyle,
    }));
    expect(forcedColours.active).toBe(true);
    expect(forcedColours.textDecorationLine).toContain("underline");
    expect(forcedColours.textDecorationStyle).toBe("double");
    report.forcedColours = forcedColours;

    await page.emulateMedia({ forcedColors: "none", reducedMotion: "reduce" });
    await page.setViewportSize({ width: 390, height: 844 });
    await page.getByRole("button", { name: "Open menu" }).click();
    const reduced = await page.getByRole("dialog", { name: "Site navigation" }).locator(".theme-switch-thumb").evaluate((node) => ({ mediaMatches: matchMedia("(prefers-reduced-motion: reduce)").matches, transitionDuration: getComputedStyle(node).transitionDuration }));
    expect(reduced.mediaMatches).toBe(true);
    expect(reduced.transitionDuration).toBe("0s");
    report.reducedMotion = reduced;
    await page.keyboard.press("Escape");
    writeJson("emergency-link-contrast-report.json", report);
  });

  test("trust contrast remains compliant in manual and Auto themes", async ({ page, browser }, testInfo) => {
    test.skip(testInfo.project.name !== "desktop", "Capture one deterministic evidence set.");
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.goto("/", { waitUntil: "networkidle" });
    const report: Record<string, unknown> = {
      before: { foreground: "rgb(238, 229, 211)", background: "rgb(214, 197, 165)", contrastRatio: 1.35 },
    };

    for (const theme of ["light", "dark"] as const) {
      await setTheme(page, theme);
      const metrics = await trustRecord(page);
      const ratios = Object.fromEntries(Object.entries(metrics.elements).map(([name, value]) => [name, contrast(value.colour, metrics.background)]));
      for (const value of Object.values(ratios)) expect(value).toBeGreaterThanOrEqual(4.5);
      report[theme] = { ...metrics, ratios };
      await page.locator("section").filter({ hasText: "Stay accountable after launch." }).screenshot({ path: path.join(output, `homepage-trust-${theme}.png`), animations: "disabled" });
    }

    for (const [name, hour, expected] of [["autoLight", 10, "light"], ["autoDark", 22, "dark"]] as const) {
      const automatic = await createAutoPage(browser, hour);
      await expect(automatic.page.locator("html")).toHaveAttribute("data-theme", expected);
      const metrics = await trustRecord(automatic.page);
      const ratios = Object.fromEntries(Object.entries(metrics.elements).map(([key, value]) => [key, contrast(value.colour, metrics.background)]));
      for (const value of Object.values(ratios)) expect(value).toBeGreaterThanOrEqual(4.5);
      report[name] = { ...metrics, ratios };
      await automatic.context.close();
    }

    await page.setViewportSize({ width: 390, height: 844 });
    await setTheme(page, "dark");
    const mobile = await trustRecord(page);
    expect(contrast(mobile.elements.paragraph.colour, mobile.background)).toBeGreaterThanOrEqual(4.5);
    await page.setViewportSize({ width: 360, height: 800 });
    const compact = await trustRecord(page);
    expect(contrast(compact.elements.paragraph.colour, compact.background)).toBeGreaterThanOrEqual(4.5);

    const accessibility: Record<string, unknown> = {};
    await page.setViewportSize({ width: 1440, height: 1000 });
    for (const theme of ["light", "dark"] as const) {
      await setTheme(page, theme);
      const result = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"]).analyze();
      const serious = result.violations.filter((violation) => ["serious", "critical"].includes(violation.impact ?? ""));
      expect(serious).toHaveLength(0);
      accessibility[theme] = { violations: result.violations.map(({ id, impact, nodes }) => ({ id, impact, nodes: nodes.length })), seriousCount: serious.length };
    }
    writeJson("trust-contrast-report.json", report);
    writeJson("computed-contrast-report.json", { emergency: JSON.parse(fs.readFileSync(path.join(output, "emergency-link-contrast-report.json"), "utf8")), trust: report });
    writeJson("accessibility-audit.json", accessibility);
  });

  test("mobile navigation remains in bounds and keyboard complete", async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== "desktop", "Capture one deterministic evidence set.");
    const cases = [
      { name: "320px-expanded-navigation.png", width: 320, height: 568 },
      { name: "360px-expanded-navigation.png", width: 360, height: 800 },
      { name: "375px-expanded-navigation.png", width: 375, height: 667 },
      { name: "390px-expanded-navigation.png", width: 390, height: 844 },
      { name: "412px-expanded-navigation.png", width: 412, height: 915 },
      { name: "landscape-navigation.png", width: 844, height: 390 },
    ];
    const report: Record<string, unknown> = {};
    for (const item of cases) {
      await page.setViewportSize({ width: item.width, height: item.height });
      await page.goto("/", { waitUntil: "networkidle" });
      const trigger = page.getByRole("button", { name: "Open menu" });
      await trigger.click();
      const geometry = await menuGeometry(page);
      for (const bounds of Object.values(geometry.bounds)) {
        expect(bounds.left).toBeGreaterThanOrEqual(-0.5);
        expect(bounds.right).toBeLessThanOrEqual(item.width + 0.5);
      }
      expect(geometry.documentState.rootScrollWidth).toBeLessThanOrEqual(geometry.documentState.clientWidth + 1);
      expect(geometry.documentState.bodyScrollWidth).toBeLessThanOrEqual(geometry.documentState.clientWidth + 1);
      expect(geometry.documentState.bodyOverflow).toBe("hidden");
      report[`${item.width}x${item.height}`] = geometry;
      const dialog = page.getByRole("dialog", { name: "Site navigation" });
      await dialog.evaluate((node) => { node.scrollTop = node.scrollHeight; });
      await page.screenshot({ path: path.join(output, item.name), animations: "disabled" });
      await page.keyboard.press("Escape");
      await expect(trigger).toBeFocused();
      expect(await page.evaluate(() => getComputedStyle(document.body).overflow)).not.toBe("hidden");
    }

    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/", { waitUntil: "networkidle" });
    await page.evaluate(() => { document.documentElement.style.fontSize = "125%"; });
    await page.getByRole("button", { name: "Open menu" }).click();
    const enlarged = await menuGeometry(page);
    for (const bounds of Object.values(enlarged.bounds)) {
      expect(bounds.left).toBeGreaterThanOrEqual(-0.5);
      expect(bounds.right).toBeLessThanOrEqual(390.5);
    }
    report.increasedText125Percent = enlarged;
    await page.keyboard.press("Escape");
    await page.evaluate(() => { document.documentElement.style.fontSize = ""; });

    const trigger = page.getByRole("button", { name: "Open menu" });
    await trigger.click();
    const visited: string[] = [];
    for (let index = 0; index < 13; index += 1) {
      visited.push(await page.evaluate(() => {
        const node = document.activeElement as HTMLElement | null;
        return node?.getAttribute("aria-label") || node?.textContent?.trim().replace(/\s+/g, " ") || "";
      }));
      await page.keyboard.press("Tab");
    }
    for (const expected of ["Support", "Emergency", "Client Portal"]) expect(visited).toContain(expected);
    expect(visited.some((value) => value.startsWith("Switch to "))).toBe(true);
    const menuEmergency = page.getByRole("dialog", { name: "Site navigation" }).getByRole("link", { name: "Emergency", exact: true });
    await menuEmergency.focus();
    await expect(menuEmergency).toBeFocused();
    await page.keyboard.press("Escape");
    await expect(trigger).toBeFocused();
    report.keyboard = { visited, escapeClosed: true, focusReturned: true };

    await page.emulateMedia({ reducedMotion: "reduce" });
    await trigger.click();
    const transitionDuration = await page.getByRole("dialog", { name: "Site navigation" }).locator(".theme-switch-thumb").evaluate((node) => getComputedStyle(node).transitionDuration);
    expect(transitionDuration).toBe("0s");
    report.reducedMotion = { mediaMatches: await page.evaluate(() => matchMedia("(prefers-reduced-motion: reduce)").matches), transitionDuration };
    await page.keyboard.press("Escape");
    writeJson("overflow-audit.json", report);
    writeJson("reduced-motion-audit.json", report.reducedMotion);
  });

  test("header reflows at every required zoom equivalent", async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== "desktop", "Capture one deterministic evidence set.");
    const levels = [100, 125, 150, 175, 200] as const;
    const report: Record<string, unknown> = {};
    for (const level of levels) {
      const width = Math.round(1440 / (level / 100));
      await page.setViewportSize({ width, height: 1000 });
      await page.goto("/", { waitUntil: "networkidle" });
      const header = page.locator("header");
      const trigger = header.getByRole("button", { name: "Open menu" });
      const theme = header.getByRole("switch");
      const primary = header.getByRole("navigation", { name: "Primary navigation" });
      const state = await page.evaluate(() => ({ clientWidth: document.documentElement.clientWidth, rootScrollWidth: document.documentElement.scrollWidth, bodyScrollWidth: document.body.scrollWidth }));
      expect(state.rootScrollWidth).toBeLessThanOrEqual(state.clientWidth + 1);
      expect(state.bodyScrollWidth).toBeLessThanOrEqual(state.clientWidth + 1);
      await expect(theme).toBeVisible();
      if (level === 100) await expect(primary).toBeVisible();
      else await expect(trigger).toBeVisible();

      const visible = level === 100 ? [header.getByRole("link", { name: "Airix Media home" }), primary, theme] : [header.getByRole("link", { name: "Airix Media home" }), theme, trigger];
      const boxes = (await Promise.all(visible.map((locator) => locator.boundingBox()))).filter((box): box is NonNullable<typeof box> => Boolean(box));
      for (let first = 0; first < boxes.length; first += 1) for (let second = first + 1; second < boxes.length; second += 1) {
        const a = boxes[first]; const b = boxes[second];
        expect(a.x < b.x + b.width && a.x + a.width > b.x && a.y < b.y + b.height && a.y + a.height > b.y).toBe(false);
      }
      await page.evaluate(() => window.scrollTo(0, innerHeight));
      await expect(header).toHaveClass(/scrolled/);
      await expect(theme).toBeVisible();
      if (level !== 100) await expect(trigger).toBeVisible();
      report[`${level}%`] = { physicalWidth: 1440, effectiveCssWidth: width, ...state, responsiveMenu: level !== 100, controlsOverlap: false, stickyUsable: true };
      if (level !== 100) await header.screenshot({ path: path.join(output, `${level}-percent-zoom-header.png`), animations: "disabled" });
    }
    writeJson("zoom-reflow-audit.json", report);
  });

  test("sitemap, redirects, canonicals, links, console and assets are unchanged", async ({ page, request }, testInfo) => {
    test.skip(testInfo.project.name !== "desktop", "Run the integrity audit once.");
    const sitemapResponse = await request.get("/sitemap.xml");
    const sitemapText = await sitemapResponse.text();
    const sitemapUrls = [...sitemapText.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]);
    expect(sitemapUrls).toEqual(retainedPublicRoutes.map((route) => `https://airixmedia.com${route}`));

    const redirects = [];
    for (const redirect of routeConsolidationRedirects) {
      const response = await request.get(redirect.source, { maxRedirects: 0 });
      const location = response.headers().location ?? "";
      const resolved = new URL(location, "https://airixmedia.com");
      expect(response.status()).toBe(308);
      expect(`${resolved.pathname}${resolved.search}${resolved.hash}`).toBe(redirect.destination);
      redirects.push({ source: redirect.source, destination: redirect.destination, status: response.status(), location });
    }

    const canonicals = [];
    const internalLinks = new Set<string>();
    const consoleErrors: { route: string; text: string }[] = [];
    page.on("console", (message) => { if (message.type() === "error") consoleErrors.push({ route: new URL(page.url()).pathname, text: message.text() }); });
    page.on("pageerror", (error) => consoleErrors.push({ route: new URL(page.url()).pathname, text: error.message }));
    for (const route of retainedPublicRoutes) {
      await page.goto(route, { waitUntil: "networkidle" });
      const canonical = await page.locator('link[rel="canonical"]').getAttribute("href");
      expect(canonical).toBe(route === "/" ? "https://airixmedia.com" : `https://airixmedia.com${route}`);
      canonicals.push({ route, canonical });
      for (const href of await page.locator('a[href^="/"]').evaluateAll((links) => links.map((link) => (link as HTMLAnchorElement).getAttribute("href") ?? ""))) internalLinks.add(href);
    }
    expect(consoleErrors).toHaveLength(0);
    const brokenLinks = [];
    for (const href of internalLinks) {
      const response = await request.get(href);
      if (response.status() >= 400) brokenLinks.push({ href, status: response.status() });
    }
    expect(brokenLinks).toHaveLength(0);

    const heroRoot = path.join(process.cwd(), "public/atlas/heroes");
    const runtimeFiles = fs.readdirSync(heroRoot).filter((file) => file.endsWith(".webp")).sort();
    const runtimeHashes = runtimeFiles.map((file) => ({ file, sha256: createHash("sha256").update(fs.readFileSync(path.join(heroRoot, file))).digest("hex") }));
    const sourceRasters = fs.readdirSync(heroRoot).filter((file) => /\.(png|jpe?g)$/i.test(file));
    const artworkDiff = spawnSync("git", ["diff", "--quiet", "1adc7e110766cc5bc6db59509b6073fefc0f5ea4", "--", "public/atlas/heroes"], { cwd: process.cwd() });
    expect(artworkDiff.status).toBe(0);
    expect(sourceRasters).toHaveLength(0);

    const trackedText = spawnSync("git", ["ls-files", "-z"], { cwd: process.cwd(), encoding: "utf8" }).stdout.split("\0").filter((file) => file && /\.(?:ts|tsx|js|mjs|json|md|yml|yaml|toml|env|example)$/i.test(file));
    const secretPattern = /(?:api[_-]?key|secret|token|password|private[_-]?key)\s*[:=]\s*["'][^"']{8,}["']/ig;
    const possibleSecrets = trackedText.flatMap((file) => {
      try {
        return [...fs.readFileSync(path.join(process.cwd(), file), "utf8").matchAll(secretPattern)].map(() => file);
      } catch (error) {
        if ((error as NodeJS.ErrnoException).code === "ENOENT") return [];
        throw error;
      }
    });
    expect(possibleSecrets).toHaveLength(0);

    writeJson("integrity-audit.json", {
      sitemap: { status: sitemapResponse.status(), expectedCount: 16, urls: sitemapUrls },
      redirects,
      canonicals,
      brokenLinks,
      consoleErrors,
      secretsScan: { filesScanned: trackedText.length, possibleSecrets },
      runtimeArtwork: { count: runtimeFiles.length, unchangedFromSourceReviewCommit: artworkDiff.status === 0, hashes: runtimeHashes },
      sourcePngAudit: { disallowedRuntimeRasterMasters: sourceRasters },
    });
  });
});
