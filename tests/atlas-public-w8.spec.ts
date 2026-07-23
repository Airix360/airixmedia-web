import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import path from "node:path";

const output = (name: string) => path.join(process.cwd(), "output/playwright/atlas-public-w8", name);

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem("airix-theme", "light"));
});

test("public homepage presents the complete Atlas journey without review leakage", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Every thriving city depends on invisible systems.");
  await expect(page.getByRole("heading", { name: /We build the invisible systems/ })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Responsibility becomes visible." })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Where shall we build next?" })).toBeVisible();
  await expect(page.locator("body")).not.toContainText(/owner approval required|internal review|candidate artwork/i);
  await expect(page.getByRole("img", { name: /long low bridge/i })).toBeVisible();
});

test("canonical navigation and direct utility routes remain explicit", async ({ page, isMobile }) => {
  if (!isMobile) await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/");
  const navigation = isMobile ? page.getByRole("dialog", { name: "Site navigation" }).getByRole("navigation") : page.getByRole("navigation", { name: "Primary navigation" });
  if (isMobile) await page.getByRole("button", { name: "Open menu" }).click();
  for (const label of ["Work", "Services", "Publishing", "Open Source", "Studio", "Contact"]) await expect(navigation.getByRole("link", { name: new RegExp(`${label}$`) })).toBeVisible();
  if (!isMobile) await page.getByRole("button", { name: "Open menu" }).click();
  const utilityScope = page.getByRole("dialog", { name: "Site navigation" });
  await expect(utilityScope.getByRole("link", { name: "Emergency", exact: true })).toHaveAttribute("href", "/support/emergency");
  await expect(utilityScope.getByRole("link", { name: "Client Portal", exact: true })).toHaveAttribute("href", "https://portal.airixmedia.com");
});

test("legacy routes redirect to the canonical public architecture", async ({ page }) => {
  for (const [legacy, canonical] of [["/systems", "/work"], ["/systems/ku-journals", "/work"], ["/company", "/studio"], ["/start-a-project", "/contact?form=project"], ["/project-brief", "/contact?form=project"]]) {
    await page.goto(legacy);
    expect(new URL(page.url()).pathname + new URL(page.url()).search + new URL(page.url()).hash).toBe(canonical);
  }
});

test("managed infrastructure retains its adaptive hero after client navigation", async ({ page }) => {
  await page.goto("/publishing");
  await page.goto("/services/managed-infrastructure");
  const hero = page.locator('[data-active-hero$="airix-managed-infrastructure-operations-day.webp"]');
  await expect(hero).toHaveAttribute("data-active-hero", "/atlas/heroes/airix-managed-infrastructure-operations-day.webp");
  await expect(hero).toHaveAttribute("src", "/atlas/heroes/airix-managed-infrastructure-operations-day.webp");
});

test("public routes request only their active runtime artwork", async ({ page }) => {
  for (const [route, expectedArtwork] of [["/publishing", "/atlas/heroes/publishing-day.webp"], ["/services/managed-infrastructure", "/atlas/heroes/airix-managed-infrastructure-operations-day.webp"]] as const) {
    const artworkRequests: string[] = [];
    const record = (request: { url: () => string }) => {
      const url = decodeURIComponent(request.url());
      if (url.includes("/images/atlas/") || url.includes("/atlas/heroes/")) artworkRequests.push(url);
    };
    page.on("request", record);
    await page.goto(route);
    await page.locator("[data-active-hero]").first().waitFor();
    await page.waitForLoadState("networkidle");
    page.off("request", record);
    expect(artworkRequests.some(url => url.includes(expectedArtwork) && url.includes(".webp"))).toBe(true);
    expect(artworkRequests.some(url => /\.png(?:\?|$)|\/source\/|\/scenes\/masters\//.test(url))).toBe(false);
  }
});

test("publishing prices use only the approved From amounts", async ({ page }) => {
  await page.goto("/publishing/pricing");
  for (const value of ["From ₦150,000", "From ₦200,000", "From ₦300,000/year", "From ₦150,000/year", "From ₦100,000/session", "Quoted based on requirements"]) await expect(page.getByText(value, { exact: true }).first()).toBeVisible();
  await expect(page.locator("body")).not.toContainText(/₦36,000|₦70,000|₦100,000 per year|guaranteed response/i);
});

test("project dialog validates locally without claiming submission", async ({ page }) => {
  const requests: string[] = [];
  page.on("request", request => {
    if (request.method() !== "GET" && !request.url().includes("/__nextjs_")) requests.push(request.url());
  });
  await page.goto("/contact?form=project");
  const dialog = page.getByRole("dialog", { name: "Discuss a Project" });
  await dialog.getByRole("button", { name: "Submit enquiry" }).click();
  await expect(dialog.getByRole("alert")).toContainText("Review the highlighted fields");
  await expect(dialog.getByText("Enquiry accepted.")).toHaveCount(0);
  expect(requests).toEqual([]);
});

test("representative public routes have no critical or serious Axe violations", async ({ page }) => {
  test.setTimeout(120_000);
  for (const route of ["/", "/publishing", "/services", "/studio", "/open-source", "/contact", "/support/emergency"]) {
    await page.goto(route);
    const result = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"]).analyze();
    const blocking = result.violations.filter(item => item.impact === "critical" || item.impact === "serious");
    expect(blocking, `${route}: ${blocking.map(item => item.id).join(", ")}`).toEqual([]);
  }
});

test("reduced motion retains the homepage narrative and captures evidence", async ({ page }, info) => {
  test.skip(info.project.name !== "desktop", "Captured once in desktop Chromium.");
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.getByRole("heading", { name: /We build the invisible systems/ })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Where shall we build next?" })).toBeVisible();
  await expect(page.locator("[data-active-hero]").first()).toHaveCSS("animation-name", "none");
  await page.screenshot({ path: output("home-reduced-motion-1440x1000.png"), fullPage: true, animations: "disabled", scale: "css" });
});

test("capture representative W8 desktop evidence", async ({ page }, info) => {
  test.setTimeout(120_000);
  test.skip(info.project.name !== "desktop", "Captured once in desktop Chromium.");
  await page.setViewportSize({ width: 1440, height: 1000 });
  const capture = async (route: string, heading: string | RegExp, name: string) => {
    await page.goto(route);
    const subject = page.getByRole("heading", { name: heading }).first();
    await subject.scrollIntoViewIfNeeded();
    await page.waitForTimeout(120);
    await page.screenshot({ path: output(name), animations: "disabled", scale: "css" });
  };
  await capture("/", "Every thriving city depends on invisible systems.", "home-opening-desktop-1440x1000.png");
  await capture("/", "Movement", "home-movement-desktop-1440x1000.png");
  await capture("/", "Responsibility becomes visible.", "home-work-desktop-1440x1000.png");
  await capture("/", "Choose the system that needs attention.", "home-pathways-desktop-1440x1000.png");
  await capture("/", "Stay accountable after launch.", "home-trust-desktop-1440x1000.png");
  await capture("/", "Where shall we build next?", "home-gateway-desktop-1440x1000.png");
  for (const [route, heading, name] of [
    ["/work", /Proof lives/, "lagos-work-desktop.png"],
    ["/services/digital-experiences", /Make the first interaction/, "lagos-digital-experiences-desktop.png"],
    ["/services/business-systems", /Move important work/, "lagos-business-systems-desktop.png"],
    ["/publishing", /African journals/, "oyo-publishing-opening-desktop.png"],
    ["/publishing/ojs", /OJS built/, "oyo-ojs-workflow-desktop.png"],
    ["/publishing/plugins", /Extend OJS/, "oyo-plugins-desktop.png"],
    ["/work/ku-journals", /Publishing systems with a visible public record/, "oyo-project-evidence-desktop.png"],
    ["/publishing/pricing", /Starting points for a scoped proposal/, "oyo-pricing-desktop.png"],
    ["/services/managed-infrastructure", /Keep the operating layer/, "rivers-infrastructure-desktop.png"],
    ["/support", /remain understandable/, "rivers-support-desktop.png"],
    ["/support/emergency", /Describe what failed/, "rivers-emergency-desktop.png"],
    ["/security", /Security is an operating practice/, "rivers-security-desktop.png"],
    ["/studio", /Small by design/, "edo-studio-desktop.png"],
    ["/open-source", /improved in public/, "kaduna-open-source-desktop.png"],
    ["/open-source/paystack-ojs", "PaystackOJS", "kaduna-paystack-ojs-desktop.png"],
    ["/atlas", /Invisible systems. Visible progress/, "plateau-atlas-desktop.png"],
    ["/insights", /A focused support library/, "plateau-insights-desktop.png"],
    ["/resources", /A focused support library/, "plateau-resources-desktop.png"],
    ["/discuss", /Discuss a Project/, "ogun-discuss-desktop.png"],
    ["/contact", /Start with the conversation/, "ogun-contact-desktop.png"],
    ["/book", /Book a Consultation/, "ogun-book-desktop.png"],
  ] as const) await capture(route, heading, name);
  for (const [route, name] of [["/publishing", "oyo-hidden-label-desktop.png"], ["/services/managed-infrastructure", "rivers-hidden-label-desktop.png"]] as const) {
    await page.goto(route);
    await page.addStyleTag({ content: "header, main header > div:not(:first-child), main header > div:nth-child(2){display:none!important}" });
    await page.screenshot({ path: output(name), animations: "disabled", scale: "css" });
  }
});

test("capture mobile and hidden-label state evidence", async ({ page }, info) => {
  test.setTimeout(60_000);
  test.skip(info.project.name !== "mobile", "Captured once in mobile Chromium.");
  await page.setViewportSize({ width: 390, height: 844 });
  for (const [route, name] of [["/", "home-opening-mobile-390x844.png"], ["/", "home-pathways-mobile-390x844.png"], ["/publishing", "oyo-publishing-mobile-390x844.png"], ["/services/managed-infrastructure", "rivers-infrastructure-mobile-390x844.png"]] as const) {
    await page.goto(route);
    if (name.includes("pathways")) await page.getByRole("heading", { name: "Choose the system that needs attention." }).scrollIntoViewIfNeeded();
    await page.screenshot({ path: output(name), animations: "disabled", scale: "css" });
  }
  for (const [route, state, name] of [["/publishing", "oyo", "oyo-hidden-label-mobile.png"], ["/services/managed-infrastructure", "rivers", "rivers-hidden-label-mobile.png"]] as const) {
    await page.goto(route);
    await page.addStyleTag({ content: "header, main header > div:not(:first-child), main header > div:nth-child(2){display:none!important}" });
    await page.screenshot({ path: output(name), animations: "disabled", scale: "css" });
    expect(state).toBeTruthy();
  }
});
