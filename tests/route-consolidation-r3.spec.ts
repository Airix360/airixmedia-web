import { expect, test } from "@playwright/test";
import fs from "node:fs";
import path from "node:path";

const output = path.join(process.cwd(), "output/playwright/atlas-route-consolidation-r3");
const redirects = [
  ["/atlas", "/studio#atlas"], ["/discuss", "/contact?form=project"], ["/book", "/contact?form=book"],
  ["/services/digital-experiences", "/services#digital-experiences"], ["/services/business-systems", "/services#business-systems"], ["/services/managed-infrastructure", "/services#managed-infrastructure"], ["/services/support-recovery", "/services#support-recovery"],
  ["/publishing/ojs", "/publishing#ojs"], ["/publishing/pricing", "/publishing#pricing"], ["/publishing/universities", "/publishing#universities"], ["/publishing/journal-platforms", "/publishing#journal-platforms"], ["/publishing/hosting-support", "/publishing#hosting-support"], ["/publishing/editorial-support", "/publishing#editorial-support"], ["/publishing/plugins", "/publishing#plugins"], ["/publishing/projects", "/publishing#projects"], ["/publishing/resources", "/publishing#resources"],
  ["/open-source/paystack-ojs", "/open-source#paystack-ojs"], ["/open-source/ojs-magic-login", "/open-source#ojs-magic-login"], ["/open-source/submission-fee", "/open-source#submission-fee"], ["/open-source/multipay", "/open-source#multipay"], ["/open-source/request-waiver", "/open-source#request-waiver"],
  ["/knowledge-base", "/support#guides"], ["/service-levels", "/support#service-levels"], ["/status", "/support"], ["/cookies", "/legal#cookies"], ["/accessibility", "/legal#accessibility"], ["/acceptable-use", "/legal#acceptable-use"],
] as const;

test.beforeAll(() => fs.mkdirSync(output, { recursive: true }));

test("every removed canonical route redirects to its exact retained destination", async ({ page }) => {
  for (const [former, destination] of redirects) {
    await page.goto(former);
    expect(new URL(page.url()).pathname + new URL(page.url()).search + new URL(page.url()).hash, former).toBe(destination);
  }
});

test("consolidated pages own anchors, navigation, footer and sitemap", async ({ page, request }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  const required: Record<string, string[]> = {
    "/studio": ["atlas"],
    "/services": ["digital-experiences", "business-systems", "managed-infrastructure", "support-recovery"],
    "/publishing": ["overview", "ojs", "hosting-support", "editorial-support", "plugins", "universities", "journal-platforms", "pricing", "projects", "resources"],
    "/support": ["request-support", "what-to-include", "service-levels", "guides", "security-reporting", "emergency"],
    "/legal": ["cookies", "accessibility", "acceptable-use"],
    "/open-source": ["paystack-ojs", "ojs-magic-login", "submission-fee", "multipay", "request-waiver"],
  };
  for (const [route, anchors] of Object.entries(required)) {
    await page.goto(route);
    for (const anchor of anchors) await expect(page.locator(`#${anchor}`), `${route}#${anchor}`).toHaveCount(1);
  }
  await page.goto("/");
  const primary = page.getByRole("navigation", { name: "Primary navigation" });
  for (const label of ["Work", "Services", "Publishing", "Open Source", "Studio", "Contact"]) await expect(primary.getByRole("link", { name: label, exact: true })).toBeVisible();
  for (const href of ["/legal", "/privacy", "/terms", "/service-terms", "/security", "/data-processing", "/subprocessors"]) await expect(page.locator(`footer a[href='${href}']`)).toHaveCount(1);
  const xml = await (await request.get("/sitemap.xml")).text();
  expect((xml.match(/<url>/g) ?? [])).toHaveLength(16);
  for (const [former] of redirects) expect(xml).not.toContain(`<loc>http://localhost:3000${former}</loc>`);
  expect(xml).not.toContain("/internal/");
});

test("contact query states and browser history control the accessible dialog", async ({ page }, info) => {
  await page.goto("/contact?form=project&service=Digital%20Experiences&source=%2Fservices%23digital-experiences");
  const dialog = page.getByRole("dialog", { name: "Discuss a Project" });
  await expect(dialog).toBeVisible();
  await expect(dialog.locator("input[name=sourceRoute]")).toHaveValue("/services#digital-experiences");
  await expect(dialog.locator("select[name=serviceNeeded]")).toHaveValue("Digital Experiences");
  await expect(dialog.getByRole("link", { name: "Open Privacy notice" })).toHaveAttribute("href", "/privacy");
  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
  await expect(page).toHaveURL(/\/contact$/);

  const launcher = page.locator("[data-contact-launcher=publishing]");
  await launcher.focus(); await launcher.click();
  const publishing = page.getByRole("dialog", { name: "Publishing Enquiry" });
  await expect(publishing).toBeVisible();
  await page.goBack(); await expect(publishing).toBeHidden();
  await page.goForward(); await expect(publishing).toBeVisible();
  await page.keyboard.press("Escape"); await expect(launcher).toBeFocused();

  await page.goto("/contact?form=invalid");
  await expect(page.getByRole("dialog")).toHaveCount(0);
  if (info.project.name === "desktop") {
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.goto("/contact?form=project");
    await page.screenshot({ path: path.join(output, "contact-project-desktop.png"), fullPage: true, animations: "disabled" });
    await page.keyboard.press("Escape");
    await page.screenshot({ path: path.join(output, "navigation-desktop.png"), fullPage: true, animations: "disabled" });
  } else {
    await page.goto("/contact?form=publishing");
    await page.setViewportSize({ width: 390, height: 844 });
    await page.screenshot({ path: path.join(output, "contact-publishing-mobile.png"), fullPage: true, animations: "disabled" });
    const dimensions = await page.getByRole("dialog").evaluate((node) => ({ width: node.scrollWidth, viewport: window.innerWidth }));
    expect(dimensions.width).toBeLessThanOrEqual(dimensions.viewport);
  }
});

test("all six launchers open the correct form and validation never fakes success", async ({ page }) => {
  await page.goto("/contact");
  const expected = { project: "Discuss a Project", publishing: "Publishing Enquiry", book: "Book a Consultation", general: "General Enquiry", support: "Technical Support", emergency: "Emergency Support" } as const;
  for (const [key, title] of Object.entries(expected)) {
    const launcher = page.locator(`[data-contact-launcher=${key}]`); await launcher.click();
    const dialog = page.getByRole("dialog", { name: title }); await expect(dialog).toBeVisible();
    await dialog.getByRole("button", { name: /Submit enquiry|Request consultation/ }).click();
    await expect(dialog.getByRole("alert")).toContainText("Review the highlighted fields");
    await page.keyboard.press("Escape"); await expect(launcher).toBeFocused();
  }
});

test("dialog traps focus and exposes emergency escalation", async ({ page }) => {
  await page.goto("/contact?form=support");
  const dialog = page.getByRole("dialog", { name: "Technical Support" });
  await dialog.locator("select[name=severity]").selectOption("Critical outage");
  await expect(dialog.getByRole("link", { name: "Emergency Support route" })).toHaveAttribute("href", "/support/emergency");
  await dialog.getByRole("button", { name: "Close Technical Support" }).focus();
  await page.keyboard.press("Shift+Tab");
  expect(await dialog.evaluate((node) => node.contains(document.activeElement))).toBe(true);
  await page.keyboard.press("Escape");
});

test("service and publishing CTAs select the correct form", async ({ page }) => {
  await page.goto("/services");
  await page.getByRole("link", { name: "Discuss Digital Experiences" }).click();
  await expect(page.getByRole("dialog", { name: "Discuss a Project" }).locator("select[name=serviceNeeded]")).toHaveValue("Digital Experiences");
  await page.keyboard.press("Escape");
  await page.goto("/publishing");
  await page.getByRole("link", { name: "Start a publishing enquiry" }).first().click();
  await expect(page.getByRole("dialog", { name: "Publishing Enquiry" })).toBeVisible();
});

test("submission endpoint explicitly reports unavailable provider", async ({ request }) => {
  const response = await request.post("/api/leads", { multipart: { selectedForm: "general", fullName: "Owner Review", email: "review@example.com", organisation: "Airix", enquiryType: "General question", message: "This is a complete validation-only review message.", privacyAcknowledgement: "true", sourceRoute: "/contact" } });
  expect(response.status()).toBe(503);
  expect(await response.json()).toMatchObject({ ok: false, code: "provider_not_configured" });
});

test("canonical and broken-link audits cover all retained routes", async ({ page, request }) => {
  const retained = ["/", "/studio", "/work", "/services", "/publishing", "/open-source", "/contact", "/support", "/support/emergency", "/legal", "/privacy", "/terms", "/service-terms", "/security", "/data-processing", "/subprocessors"];
  const internal = new Set<string>();
  for (const route of retained) {
    await page.goto(route);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", new RegExp(`${route === "/" ? "/?$" : `${route}$`}`));
    for (const href of await page.locator('a[href^="/"]').evaluateAll((links) => links.map((link) => (link as HTMLAnchorElement).getAttribute("href")!).filter(Boolean))) internal.add(href);
  }
  await page.goto("/contact?form=publishing");
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", /\/contact$/);
  for (const href of internal) {
    const url = new URL(href, "http://127.0.0.1:3100");
    expect((await request.get(`${url.pathname}${url.search}`)).status(), href).toBeLessThan(400);
  }
  await page.goto("/open-source");
  for (const link of await page.locator('a[href^="https://github.com/"][target="_blank"]').all()) await expect(link).toHaveAttribute("rel", /noreferrer/);
});
