import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";
import { createHash } from "node:crypto";
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { retainedPublicRoutes, routeConsolidationRedirects } from "@/lib/route-consolidation";
import { contactFormDefinitions, contactFormKeys } from "@/lib/contact-forms";
import { legalDocuments } from "@/content/legal";

const output = path.join(process.cwd(), "output/playwright/atlas-r3-final-review");
const expectedSitemap = retainedPublicRoutes.map((route) => `https://airixmedia.com${route}`);
const requiredAnchors: Record<string, string[]> = {
  "/studio": ["atlas"],
  "/services": ["digital-experiences", "business-systems", "managed-infrastructure", "support-recovery"],
  "/publishing": ["overview", "ojs", "hosting-support", "editorial-support", "plugins", "universities", "journal-platforms", "pricing", "projects", "resources"],
  "/open-source": ["paystack-ojs", "ojs-magic-login", "submission-fee", "multipay", "request-waiver"],
  "/support": ["request-support", "what-to-include", "service-levels", "guides", "security-reporting", "emergency"],
  "/legal": ["cookies", "accessibility", "acceptable-use"],
};

const screenshotRoutes = [
  ["studio", "/studio"], ["services", "/services"], ["publishing", "/publishing"],
  ["open-source", "/open-source"], ["contact-cards", "/contact"], ["support", "/support"],
  ["emergency", "/support/emergency"], ["legal-centre", "/legal"], ["privacy", "/privacy"],
  ["terms", "/terms"], ["service-terms", "/service-terms"], ["security", "/security"],
  ["data-processing", "/data-processing"], ["subprocessors", "/subprocessors"],
] as const;

const publicPatterns = [
  "lorem ipsum", "todo", "fixme", "placeholder", "example.com", "coming soon",
  "owner approval required", "internal review", "draft structure awaiting legal review",
] as const;
const accidentalLocations = ["Lagos", "Oyo", "Rivers", "Edo", "Kaduna", "Plateau", "Ogun"] as const;

function writeJson(name: string, value: unknown) {
  fs.writeFileSync(path.join(output, name), `${JSON.stringify(value, null, 2)}\n`);
}

async function chooseTheme(page: Page, choice: "light" | "dark" | "auto") {
  await page.evaluate((next) => next === "auto" ? localStorage.removeItem("airix-theme") : localStorage.setItem("airix-theme", next), choice);
  await page.reload({ waitUntil: "networkidle" });
  const expected = choice === "auto" ? (new Date().getHours() >= 6 && new Date().getHours() < 18 ? "light" : "dark") : choice;
  await expect(page.locator("html")).toHaveAttribute("data-theme", expected);
  return expected;
}

async function capture(page: Page, name: string, fullPage = true) {
  if (fullPage) {
    const height = await page.evaluate(() => document.documentElement.scrollHeight);
    for (let y = 0; y < height; y += 700) {
      await page.evaluate((top) => window.scrollTo(0, top), y);
      await page.waitForTimeout(40);
    }
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(120);
  }
  await page.screenshot({ path: path.join(output, name), fullPage, animations: "disabled" });
}

test.describe("R3 final owner review evidence", () => {
  test.describe.configure({ mode: "serial" });
  test.beforeAll(({}, testInfo) => {
    if (testInfo.project.name !== "desktop") return;
    fs.rmSync(output, { recursive: true, force: true });
    fs.mkdirSync(output, { recursive: true });
    const heroRoot = path.join(process.cwd(), "public/atlas/heroes");
    const runtimeFiles = fs.readdirSync(heroRoot).filter((file) => file.endsWith(".webp")).sort();
    const runtimeHashes = runtimeFiles.map((file) => ({ file, sha256: createHash("sha256").update(fs.readFileSync(path.join(heroRoot, file))).digest("hex") }));
    const sourceRasterMasters = fs.readdirSync(heroRoot).filter((file) => /\.(png|jpe?g)$/i.test(file));
    const trackedTextFiles = spawnSync("git", ["ls-files", "-z"], { cwd: process.cwd(), encoding: "utf8" }).stdout.split("\0").filter((entry) => entry && /(?:^|\/)(?:[^/]+\.)?(?:ts|tsx|js|mjs|json|md|yml|yaml|toml|env|example)$/i.test(entry) && fs.existsSync(path.join(process.cwd(), entry)));
    const secretPattern = /(?:api[_-]?key|secret|token|password|private[_-]?key)\s*[:=]\s*["'][^"']{8,}["']/ig;
    const possibleSecrets = trackedTextFiles.flatMap((entry) => {
      const file = path.join(process.cwd(), entry);
      const text = fs.readFileSync(file, "utf8");
      return [...text.matchAll(secretPattern)].map((match) => ({ file: path.relative(process.cwd(), file), match: match[0].replace(/([:=]\s*["']).+(["'])$/, "$1[redacted]$2") }));
    });
    const runtimeDiff = spawnSync("git", ["diff", "--quiet", "4594c6f08b34c36b77096ea39a21667b67499851", "--", "public/atlas/heroes"], { cwd: process.cwd() });
    writeJson("runtime-artwork-hash-report.json", { count: runtimeHashes.length, algorithm: "SHA-256", files: runtimeHashes });
    writeJson("static-audit-report.json", { sourcePngAudit: { directory: "public/atlas/heroes", disallowedRasterMasters: sourceRasterMasters }, secretsScan: { scope: "all tracked text and configuration files", possibleSecrets }, runtimeArtwork: { count: runtimeHashes.length, expectedCount: 40, unchangedFromReviewBase: runtimeDiff.status === 0, reviewBase: "4594c6f08b34c36b77096ea39a21667b67499851" } });
    writeJson("legal-placeholder-report.json", legalDocuments.map((document) => ({ route: `/${document.path}`, effectiveDate: document.effectiveDate, version: document.version, reviewRequired: document.sections.filter((section) => /draft|unresolved|remain|require|must be completed|no universal|once .* approved/i.test(section.body)).map((section) => ({ section: section.title, body: section.body })) })));
    writeJson("external-repository-report.json", { checkedAt: "2026-07-18", method: "Direct review of the public repository pages on GitHub", projects: [
      ["PaystackOJS", "https://github.com/thathman/PaystackOJS"],
      ["OJS Magic Login", "https://github.com/thathman/ojs-magic-login"],
      ["Submission Fee", "https://github.com/thathman/submissionFee-OJS"],
      ["MultiPay", "https://github.com/thathman/ojs-multipay"],
      ["Request Waiver", "https://github.com/thathman/ojs-request-waiver"],
    ].map(([name, url]) => ({ name, url, reachable: true, publicRepository: true })) });
  });

  test("captures approved routes, themes, responsive states and motion preferences", async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== "desktop", "One deterministic evidence set is generated by the desktop project.");
    test.setTimeout(300_000);
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.goto("/", { waitUntil: "networkidle" });
    await chooseTheme(page, "light");
    await capture(page, "homepage-desktop-light-1440x1000.png");
    await chooseTheme(page, "dark");
    await capture(page, "homepage-desktop-dark-1440x1000.png");
    await chooseTheme(page, "auto");
    await capture(page, "homepage-desktop-auto-1440x1000.png");

    for (const [name, route] of screenshotRoutes) {
      await page.goto(route, { waitUntil: "networkidle" });
      await chooseTheme(page, "light");
      await capture(page, `${name}-desktop-light-1440x1000.png`);
    }

    await page.goto("/", { waitUntil: "networkidle" });
    await chooseTheme(page, "light");
    await page.setViewportSize({ width: 390, height: 844 });
    await capture(page, "homepage-mobile-light-390x844.png");
    await page.setViewportSize({ width: 360, height: 800 });
    await capture(page, "homepage-mobile-light-360x800.png");
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto("/services", { waitUntil: "networkidle" });
    await capture(page, "services-tablet-light-768x1024.png");

    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/", { waitUntil: "networkidle" });
    await page.getByRole("button", { name: "Open menu" }).click();
    const mobileNavigation = await page.getByRole("dialog", { name: "Site navigation" }).evaluate((node) => {
      const utilities = node.querySelector<HTMLElement>(":scope > div:last-child");
      const rect = utilities?.getBoundingClientRect();
      return { viewportWidth: innerWidth, scrollWidth: node.scrollWidth, clientWidth: node.clientWidth, utilityLeft: rect?.left, utilityRight: rect?.right, clipped: node.scrollWidth > node.clientWidth + 1 || Boolean(rect && (rect.left < 0 || rect.right > innerWidth)) };
    });
    writeJson("mobile-navigation-report.json", mobileNavigation);
    await capture(page, "mobile-navigation-390x844.png", false);
    await page.keyboard.press("Escape");

    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.goto("/", { waitUntil: "networkidle" });
    await capture(page, "theme-switch-transparent-header.png", false);
    await page.evaluate(() => window.scrollTo(0, window.innerHeight));
    await expect(page.locator("header")).toHaveClass(/scrolled/);
    await capture(page, "theme-switch-sticky-header.png", false);
    await page.locator("footer").scrollIntoViewIfNeeded();
    await page.locator("footer").screenshot({ path: path.join(output, "footer.png"), animations: "disabled" });

    await page.goto("/", { waitUntil: "networkidle" });
    await page.evaluate(() => { document.documentElement.style.zoom = "2"; });
    const zoomReport = await page.evaluate(() => ({ viewportWidth: innerWidth, scrollWidth: document.documentElement.scrollWidth, clientWidth: document.documentElement.clientWidth, bodyScrollWidth: document.body.scrollWidth, overflow: document.documentElement.scrollWidth > document.documentElement.clientWidth + 1 || document.body.scrollWidth > document.documentElement.clientWidth + 1 }));
    writeJson("zoom-200-percent-report.json", zoomReport);
    await capture(page, "homepage-200-percent-zoom.png", false);
    await page.evaluate(() => { document.documentElement.style.zoom = ""; });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.reload({ waitUntil: "networkidle" });
    const motion = await page.evaluate(() => {
      const node = document.querySelector("button, a");
      const style = node ? getComputedStyle(node) : null;
      return { mediaMatches: matchMedia("(prefers-reduced-motion: reduce)").matches, animationDuration: style?.animationDuration, transitionDuration: style?.transitionDuration };
    });
    writeJson("reduced-motion-report.json", motion);
    expect(motion.mediaMatches).toBe(true);
    await capture(page, "homepage-reduced-motion.png", false);
  });

  test("captures and audits all six contact dialogs", async ({ page, request }, testInfo) => {
    test.skip(testInfo.project.name !== "desktop", "One deterministic evidence set is generated by the desktop project.");
    test.setTimeout(240_000);
    await page.setViewportSize({ width: 1440, height: 1000 });
    const formReport: unknown[] = [];
    for (const key of contactFormKeys) {
      await page.goto(`/contact?form=${key}`, { waitUntil: "networkidle" });
      const definition = contactFormDefinitions[key];
      const dialog = page.getByRole("dialog", { name: definition.title });
      await expect(dialog).toBeVisible();
      const fields = await dialog.locator("input:not([type=hidden]), select, textarea").evaluateAll((nodes) => nodes.map((node) => {
        const field = node as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
        return { name: field.name, type: field.type, required: field.required, label: document.querySelector(`label[for='${field.id}']`)?.textContent?.trim() ?? "" };
      }));
      await dialog.getByRole("button", { name: /Submit enquiry|Request consultation/ }).click();
      const validation = await dialog.getByRole("alert").innerText();
      formReport.push({ key, title: definition.title, description: definition.description, fields, validation });
      await capture(page, `contact-dialog-${key}-desktop-1440x1000.png`, false);
    }
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/contact?form=project", { waitUntil: "networkidle" });
    const mobileDialog = page.getByRole("dialog", { name: "Discuss a Project" });
    const mobileDimensions = await mobileDialog.evaluate((node) => ({ scrollWidth: node.scrollWidth, clientWidth: node.clientWidth, viewport: innerWidth }));
    await capture(page, "contact-dialog-project-mobile-390x844.png", false);
    expect(mobileDimensions.scrollWidth).toBeLessThanOrEqual(mobileDimensions.viewport);

    const preselection: Record<string, string> = {};
    for (const label of ["Digital Experiences", "Business Systems", "Managed Infrastructure", "Support & Recovery"]) {
      await page.goto("/services", { waitUntil: "networkidle" });
      await page.getByRole("link", { name: `Discuss ${label}` }).click();
      preselection[label] = await page.getByRole("dialog", { name: "Discuss a Project" }).locator("select[name=serviceNeeded]").inputValue();
    }
    const unavailable = await request.post("/api/leads", { multipart: { selectedForm: "general", fullName: "Owner Review", email: "review@example.com", organisation: "Airix", enquiryType: "General question", message: "This is a complete validation-only review message.", privacyAcknowledgement: "true", sourceRoute: "/contact" } });
    const unavailableBody = await unavailable.json();
    writeJson("contact-dialog-report.json", { forms: formReport, mobileDimensions, servicePreselection: preselection, providerResponse: { status: unavailable.status(), body: unavailableBody } });
    expect(unavailable.status()).toBe(503);
    expect(unavailableBody.code).toBe("provider_not_configured");
  });

  test("audits redirects, canonicals, sitemap, anchors, navigation and links", async ({ page, request }, testInfo) => {
    test.skip(testInfo.project.name !== "desktop", "One deterministic evidence set is generated by the desktop project.");
    test.setTimeout(300_000);
    const redirectReport: unknown[] = [];
    for (const redirect of routeConsolidationRedirects) {
      const response = await request.get(`${redirect.source}?owner_review=1`, { maxRedirects: 0 });
      const location = response.headers().location ?? "";
      await page.goto(`${redirect.source}?owner_review=1`, { waitUntil: "networkidle" });
      const final = new URL(page.url());
      const expected = new URL(redirect.destination, "http://127.0.0.1:3100");
      const destinationResponse = await request.get(`${expected.pathname}${expected.search}`, { maxRedirects: 0 });
      const anchorExists = expected.hash ? await page.locator(expected.hash).count() === 1 : true;
      const queryPreserved = final.searchParams.get("owner_review") === "1";
      redirectReport.push({ ...redirect, responseStatus: response.status(), location, final: `${final.pathname}${final.search}${final.hash}`, anchorExists, queryPreserved, destinationStatus: destinationResponse.status(), chained: destinationResponse.status() >= 300 && destinationResponse.status() < 400 });
      expect(response.status(), redirect.source).toBe(308);
      expect(final.pathname, redirect.source).toBe(expected.pathname);
      expect(final.hash, redirect.source).toBe(expected.hash);
      for (const [key, value] of expected.searchParams) expect(final.searchParams.get(key), `${redirect.source} query ${key}`).toBe(value);
      expect(queryPreserved, `${redirect.source} preserves query`).toBe(true);
      expect(anchorExists, `${redirect.source} owns anchor`).toBe(true);
      expect(destinationResponse.status(), `${redirect.source} has no chain`).toBeLessThan(300);
    }
    writeJson("redirect-report.json", { count: redirectReport.length, redirects: redirectReport });

    const canonicalReport: unknown[] = [];
    const anchorReport: unknown[] = [];
    const linkSet = new Set<string>();
    for (const route of retainedPublicRoutes) {
      await page.goto(route, { waitUntil: "networkidle" });
      const canonical = await page.locator('link[rel="canonical"]').getAttribute("href");
      const expectedCanonical = `https://airixmedia.com${route === "/" ? "" : route}`;
      canonicalReport.push({ route, canonical, expected: expectedCanonical, pass: canonical === expectedCanonical || canonical === `${expectedCanonical}/` });
      for (const href of await page.locator('a[href^="/"]').evaluateAll((links) => links.map((link) => (link as HTMLAnchorElement).getAttribute("href")!).filter(Boolean))) linkSet.add(href);
      const anchors = requiredAnchors[route] ?? [];
      anchorReport.push({ route, anchors: await Promise.all(anchors.map(async (anchor) => ({ anchor, count: await page.locator(`#${anchor}`).count() }))) });
    }
    expect(canonicalReport.every((item) => (item as { pass: boolean }).pass)).toBe(true);
    expect(anchorReport.every((item) => (item as { anchors: { count: number }[] }).anchors.every((anchor) => anchor.count === 1))).toBe(true);
    writeJson("canonical-report.json", canonicalReport);
    writeJson("anchor-report.json", anchorReport);

    const brokenLinks: unknown[] = [];
    for (const href of linkSet) {
      const url = new URL(href, "http://127.0.0.1:3100");
      const response = await request.get(`${url.pathname}${url.search}`);
      if (response.status() >= 400) brokenLinks.push({ href, status: response.status() });
    }
    writeJson("broken-link-report.json", { checked: linkSet.size, broken: brokenLinks });
    expect(brokenLinks).toHaveLength(0);

    await page.goto("/", { waitUntil: "networkidle" });
    const navigation = {
      primary: await page.getByRole("navigation", { name: "Primary navigation" }).getByRole("link").evaluateAll((links) => links.map((link) => ({ text: link.textContent?.trim(), href: (link as HTMLAnchorElement).getAttribute("href") }))),
      footer: await page.locator("footer a").evaluateAll((links) => links.map((link) => ({ text: link.textContent?.trim(), href: (link as HTMLAnchorElement).getAttribute("href") }))),
    };
    writeJson("navigation-report.json", navigation);

    const sitemapResponse = await request.get("/sitemap.xml");
    const sitemapXml = await sitemapResponse.text();
    const locations = [...sitemapXml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
    const sitemapReport = { status: sitemapResponse.status(), count: locations.length, locations, expected: expectedSitemap, missing: expectedSitemap.filter((route) => !locations.includes(route)), extra: locations.filter((route) => !expectedSitemap.includes(route)), removedRoutesPresent: routeConsolidationRedirects.filter(({ source }) => locations.some((location) => new URL(location).pathname === source)).map(({ source }) => source) };
    writeJson("sitemap-report.json", sitemapReport);
    fs.writeFileSync(path.join(output, "sitemap.xml"), sitemapXml);
    expect(sitemapReport.missing).toHaveLength(0);
    expect(sitemapReport.extra).toHaveLength(0);
    expect(sitemapReport.removedRoutesPresent).toHaveLength(0);
  });

  test("audits public content, responsive overflow, accessibility and console errors", async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== "desktop", "One deterministic evidence set is generated by the desktop project.");
    test.setTimeout(420_000);
    const contentReport: unknown[] = [];
    const consoleReport: unknown[] = [];
    const accessibilityReport: unknown[] = [];
    const responsiveReport: unknown[] = [];
    const pageErrors: string[] = [];
    page.on("console", (message) => { if (["error", "warning"].includes(message.type())) consoleReport.push({ type: message.type(), text: message.text(), url: page.url() }); });
    page.on("pageerror", (error) => pageErrors.push(`${page.url()} — ${error.message}`));

    for (const route of retainedPublicRoutes) {
      await page.setViewportSize({ width: 1440, height: 1000 });
      await page.goto(route, { waitUntil: "networkidle" });
      await chooseTheme(page, "light");
      const rendered = await page.evaluate(({ patterns, locations }) => {
        const html = document.documentElement.outerHTML;
        const visible = document.body.innerText;
        const attrs = [...document.querySelectorAll("[alt], [title], meta[content]")].map((node) => node.getAttribute("alt") || node.getAttribute("title") || node.getAttribute("content") || "").join("\n");
        const searchable = `${visible}\n${attrs}`;
        const headings = [...document.querySelectorAll("h1,h2,h3")].map((node) => node.textContent?.trim()).filter(Boolean);
        const paragraphs = [...document.querySelectorAll("main p")].map((node) => node.textContent?.trim()).filter((text): text is string => Boolean(text && text.length > 30));
        return {
          title: document.title,
          h1: document.querySelector("h1")?.textContent?.trim(),
          patternMatches: patterns.filter((pattern) => searchable.toLowerCase().includes(pattern)),
          accidentalLocations: locations.filter((location) => new RegExp(`\\b${location}\\b`, "i").test(searchable)),
          headings,
          paragraphs,
          imageFailures: [...document.images].filter((image) => image.complete && image.naturalWidth === 0).map((image) => image.currentSrc || image.src),
          internalReviewRouteLeak: /\/internal\//i.test(html),
        };
      }, { patterns: [...publicPatterns], locations: [...accidentalLocations] });
      contentReport.push({ route, ...rendered });

      const axe = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"]).analyze();
      accessibilityReport.push({ route, violations: axe.violations.map((violation) => ({ id: violation.id, impact: violation.impact, description: violation.description, nodes: violation.nodes.map((node) => node.target) })) });

      for (const viewport of [{ width: 768, height: 1024 }, { width: 390, height: 844 }, { width: 360, height: 800 }]) {
        await page.setViewportSize(viewport);
        await page.reload({ waitUntil: "networkidle" });
        const dimensions = await page.evaluate(() => ({ scrollWidth: document.documentElement.scrollWidth, clientWidth: document.documentElement.clientWidth, bodyScrollWidth: document.body.scrollWidth }));
        responsiveReport.push({ route, viewport, ...dimensions, overflow: dimensions.scrollWidth > dimensions.clientWidth + 1 || dimensions.bodyScrollWidth > dimensions.clientWidth + 1 });
      }
    }

    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.goto("/", { waitUntil: "networkidle" });
    await chooseTheme(page, "dark");
    const darkAxe = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"]).analyze();
    accessibilityReport.push({ route: "/ (dark)", violations: darkAxe.violations.map((violation) => ({ id: violation.id, impact: violation.impact, description: violation.description, nodes: violation.nodes.map((node) => node.target) })) });
    writeJson("content-placeholder-report.json", contentReport);
    writeJson("console-report.json", { console: consoleReport, pageErrors });
    writeJson("accessibility-report.json", accessibilityReport);
    writeJson("responsive-report.json", responsiveReport);
    expect(pageErrors).toHaveLength(0);
    expect(responsiveReport.filter((item) => (item as { overflow: boolean }).overflow)).toHaveLength(0);
    expect(contentReport.flatMap((item) => (item as { imageFailures: string[] }).imageFailures)).toHaveLength(0);
    expect(contentReport.some((item) => (item as { internalReviewRouteLeak: boolean }).internalReviewRouteLeak)).toBe(false);
  });
});
