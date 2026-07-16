import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";
import path from "node:path";

const output = (name: string) => path.join(process.cwd(), "output/playwright/atlas-launch-w9", name);

async function settle(page: Page) {
  await page.waitForLoadState("domcontentloaded");
  await page.waitForTimeout(100);
  await page.addStyleTag({ content: "nextjs-portal{display:none!important}" });
}

test("W9 review workspace is private, complete and locally self-contained", async ({ page, request }) => {
  const external: string[] = [];
  page.on("request", (req) => { if (!req.url().startsWith("http://127.0.0.1:3100")) external.push(req.url()); });
  await page.goto("/internal/w9-review/artwork");
  await settle(page);
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
  await expect(page.getByText("Review controls are visual only. No decision is transmitted or stored.")).toBeVisible();
  await expect(page.locator("article[id^='ill-']")).toHaveCount(16);
  await expect(page.getByText("Candidate artwork. Not approved, final or publishable until owner, cultural and rights review is complete.")).toHaveCount(16);
  expect(external).toEqual([]);
  const sitemap = await (await request.get("/sitemap.xml")).text();
  expect(sitemap).not.toContain("/internal/");
  const robots = await (await request.get("/robots.txt")).text();
  expect(robots).toContain("Disallow: /internal/");
});

test("review controls change only the current visual state", async ({ page }) => {
  await page.goto("/internal/w9-review/artwork#ill-0120");
  const sheet = page.locator("#ill-0120");
  await sheet.getByRole("button", { name: "Revise" }).click();
  await expect(sheet.getByRole("button", { name: "Revise" })).toHaveAttribute("aria-pressed", "true");
  await page.reload();
  await expect(page.locator("#ill-0120").getByRole("button", { name: "Revise" })).toHaveAttribute("aria-pressed", "false");
});

test("compact mobile artwork derivatives exist for every active family", async ({ page }, info) => {
  test.skip(info.project.name !== "desktop", "The route matrix sets its own mobile viewport.");
  test.setTimeout(120_000);
  const routes = ["/", "/publishing", "/publishing/ojs", "/publishing/plugins", "/services/managed-infrastructure", "/support", "/support/emergency", "/studio", "/open-source", "/atlas", "/insights", "/resources", "/discuss", "/contact", "/book"];
  await page.setViewportSize({ width: 390, height: 844 });
  for (const route of routes) {
    const failures: string[] = [];
    const record = (response: import("@playwright/test").Response) => { if (response.url().includes("_mobile_640x800_") && response.status() >= 400) failures.push(response.url()); };
    page.on("response", record);
    await page.goto(route);
    await page.locator("picture img").first().waitFor();
    await page.waitForLoadState("networkidle");
    page.off("response", record);
    expect(failures, route).toEqual([]);
  }
});

test("unknown detail routes return 404 and the lead API refuses simulated success", async ({ page, request }) => {
  const unknown = await request.get("/insights/not-a-real-record");
  expect(unknown.status()).toBe(404);
  const lead = await request.post("/api/leads", { data: { brief: {} } });
  expect(lead.status()).toBe(503);
  await expect.poll(async () => (await lead.json()).ok).toBe(false);
  await page.goto("/discuss");
  await page.getByRole("button", { name: "Prepare local summary" }).click();
  const errorSummary = page.locator('[role="alert"]').filter({ hasText: "Review the highlighted fields" });
  await expect(errorSummary).toBeFocused();
  await expect(errorSummary).toContainText("Review the highlighted fields");
});

test("W9 review surfaces have no critical or serious accessibility violations", async ({ page }, info) => {
  test.skip(info.project.name !== "desktop", "The same responsive DOM is audited once in Chromium.");
  test.setTimeout(120_000);
  for (const route of ["/internal/w9-review", "/internal/w9-review/artwork", "/internal/w9-review/pages", "/internal/w9-review/content", "/internal/w9-review/launch"]) {
    await page.goto(route);
    const result = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"]).analyze();
    expect(result.violations.filter((item) => item.impact === "critical" || item.impact === "serious"), route).toEqual([]);
  }
});

test("360px public families avoid horizontal overflow and blocking console errors", async ({ page }, info) => {
  test.skip(info.project.name !== "desktop", "The route matrix sets its own narrow viewport.");
  test.setTimeout(120_000);
  const consoleErrors: string[] = [];
  page.on("console", (message) => { if (message.type() === "error") consoleErrors.push(message.text()); });
  await page.setViewportSize({ width: 360, height: 800 });
  for (const route of ["/", "/work", "/services", "/publishing", "/services/managed-infrastructure", "/studio", "/open-source", "/atlas", "/insights", "/resources", "/discuss", "/contact", "/book", "/support/emergency", "/legal"]) {
    await page.goto(route);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow, route).toBeLessThanOrEqual(1);
  }
  expect(consoleErrors).toEqual([]);
});

test("capture homepage viewport, theme and motion evidence", async ({ page }, info) => {
  test.skip(info.project.name !== "desktop", "Captured once in desktop Chromium.");
  test.setTimeout(120_000);
  for (const [width, height] of [[1440, 1000], [1280, 900], [1024, 768], [768, 1024], [390, 844], [360, 800]] as const) {
    await page.setViewportSize({ width, height });
    await page.emulateMedia({ colorScheme: "light", reducedMotion: "no-preference" });
    await page.goto("/");
    await settle(page);
    await page.screenshot({ path: output(`home-light-${width}x${height}.png`), animations: "disabled", scale: "css" });
  }
  for (const [width, height] of [[1440, 1000], [390, 844]] as const) {
    await page.setViewportSize({ width, height });
    await page.emulateMedia({ colorScheme: "dark" });
    await page.goto("/");
    await page.evaluate(() => { localStorage.removeItem("airix-theme"); document.documentElement.setAttribute("data-theme", "dark"); });
    await page.screenshot({ path: output(`home-dark-${width}x${height}.png`), animations: "disabled", scale: "css" });
  }
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.emulateMedia({ reducedMotion: "reduce", colorScheme: "light" });
  await page.goto("/");
  await page.screenshot({ path: output("home-reduced-motion-1440x1000.png"), animations: "disabled", scale: "css" });
  await page.emulateMedia({ reducedMotion: "no-preference", colorScheme: "light" });
  await page.goto("/");
  await settle(page);
  await page.screenshot({ path: output("home-full-page-desktop-1440.png"), fullPage: true, animations: "disabled", scale: "css" });
  await page.evaluate(() => { document.documentElement.style.zoom = "2"; });
  await page.screenshot({ path: output("home-zoom-200-percent.png"), animations: "disabled", scale: "css" });
  await page.evaluate(() => { document.documentElement.style.zoom = ""; });
  await page.keyboard.press("Tab");
  await page.screenshot({ path: output("home-keyboard-focus.png"), animations: "disabled", scale: "css" });
});

test("capture every public page family at desktop and mobile", async ({ page }, info) => {
  test.skip(info.project.name !== "desktop", "Captured once in desktop Chromium.");
  test.setTimeout(180_000);
  const families = [["work", "/work"], ["services", "/services"], ["publishing", "/publishing"], ["infrastructure", "/services/managed-infrastructure"], ["studio", "/studio"], ["open-source", "/open-source"], ["atlas", "/atlas"], ["insights", "/insights"], ["resources", "/resources"], ["discuss", "/discuss"], ["contact", "/contact"], ["book", "/book"], ["emergency", "/support/emergency"], ["legal", "/legal"]] as const;
  for (const [name, route] of families) for (const [width, height, suffix] of [[1440, 1000, "desktop"], [390, 844, "mobile"]] as const) {
    await page.setViewportSize({ width, height });
    await page.goto(route);
    await settle(page);
    await page.screenshot({ path: output(`family-${name}-${suffix}.png`), animations: "disabled", scale: "css" });
  }
});

test("capture one complete review context for every state", async ({ page }, info) => {
  test.skip(info.project.name !== "desktop", "Captured once in desktop Chromium.");
  test.setTimeout(120_000);
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/internal/w9-review/artwork");
  await settle(page);
  await page.screenshot({ path: output("artwork-review-index.png"), animations: "disabled", scale: "css" });
  for (const [state, id] of [["lagos", "ill-0120"], ["oyo", "ill-0100"], ["rivers", "ill-0110"], ["edo", "ill-0051"], ["kaduna", "ill-0060"], ["plateau", "ill-0090"], ["ogun", "ill-0083"]] as const) {
    const sheet = page.locator(`#${id}`);
    await sheet.scrollIntoViewIfNeeded();
    await sheet.locator("img").first().waitFor();
    await sheet.screenshot({ path: output(`artwork-${state}-review-sheet.png`), animations: "disabled", scale: "css" });
  }
});

test("capture functional review evidence", async ({ page, request }, info) => {
  test.skip(info.project.name !== "desktop", "Captured once in desktop Chromium.");
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.getByRole("button", { name: "Open menu" }).click();
  await page.screenshot({ path: output("functional-mobile-navigation.png"), animations: "disabled", scale: "css" });
  await page.goto("/discuss");
  await page.getByRole("button", { name: "Prepare local summary" }).click();
  await page.screenshot({ path: output("functional-form-errors.png"), animations: "disabled", scale: "css" });
  await page.getByLabel("Organisation").fill("Review Organisation");
  await page.getByLabel("Your name").fill("Review Owner");
  await page.getByLabel("Email").fill("owner@example.com");
  await page.getByLabel("What needs to work better?").fill("We need a verified and maintainable public system handoff.");
  await page.getByRole("button", { name: "Prepare local summary" }).click();
  await expect(page.getByText("Prepared locally — not sent")).toBeVisible();
  await expect(page.getByRole("link", { name: "Continue in email" })).toHaveAttribute("href", /^mailto:/);
  await expect(page.getByRole("link", { name: "Continue in WhatsApp" })).toHaveAttribute("href", /^https:\/\/wa\.me\//);
  await page.screenshot({ path: output("functional-local-only-email-whatsapp.png"), animations: "disabled", scale: "css" });
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/systems");
  await expect(page).toHaveURL(/\/work\/?$/);
  await page.screenshot({ path: output("functional-redirect-result.png"), animations: "disabled", scale: "css" });
  await page.goto("/not-a-public-atlas-route");
  await expect(page.getByRole("heading", { name: "This page could not be found." })).toBeVisible();
  await page.screenshot({ path: output("functional-404.png"), animations: "disabled", scale: "css" });
  await page.goto("/internal/w9-review");
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
  await page.screenshot({ path: output("functional-internal-noindex.png"), animations: "disabled", scale: "css" });
  await page.goto("/sitemap.xml");
  await page.screenshot({ path: output("functional-sitemap.png"), animations: "disabled", scale: "css" });
  await page.goto("/robots.txt");
  await page.screenshot({ path: output("functional-robots.png"), animations: "disabled", scale: "css" });
  const response = await request.get("/");
  const securityHeaders = Object.fromEntries(["content-security-policy", "strict-transport-security", "x-content-type-options", "referrer-policy", "permissions-policy", "x-frame-options"].map((name) => [name, response.headers()[name] ?? "not present in development mode"]));
  const headerEvidence = `<main style="font:16px/1.6 ui-monospace;padding:40px"><h1>Verified response headers</h1><pre style="white-space:pre-wrap">${JSON.stringify(securityHeaders, null, 2).replaceAll("<", "&lt;")}</pre></main>`;
  await page.goto(`data:text/html,${encodeURIComponent(headerEvidence)}`);
  await page.screenshot({ path: output("functional-security-headers.png"), animations: "disabled", scale: "css" });
  await page.goto("/internal/w9-review/launch");
  await page.screenshot({ path: output("functional-launch-decision.png"), animations: "disabled", scale: "css" });
});
