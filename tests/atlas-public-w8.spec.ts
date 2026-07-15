import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import path from "node:path";

const output = (name: string) => path.join(process.cwd(), "output/playwright/atlas-public-w8", name);

test("public homepage presents the complete Atlas journey without review leakage", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Every thriving city depends on invisible systems.");
  await expect(page.getByRole("heading", { name: /We build the invisible systems/ })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Responsibility becomes visible." })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Where shall we build next?" })).toBeVisible();
  await expect(page.locator("body")).not.toContainText(/owner approval required|internal review|candidate artwork/i);
  await expect(page.locator("img[src*='ILL-0120']")).toBeVisible();
});

test("canonical navigation and direct utility routes remain explicit", async ({ page, isMobile }) => {
  await page.goto("/");
  if (isMobile) await page.getByRole("button", { name: "Open menu" }).click();
  const navigation = isMobile ? page.getByRole("dialog", { name: "Site navigation" }).getByRole("navigation") : page.getByRole("navigation", { name: "Primary navigation" });
  for (const label of ["Work", "Services", "Publishing", "Atlas", "Studio", "Discuss a Project"]) await expect(navigation.getByRole("link", { name: new RegExp(`${label}$`) })).toBeVisible();
  const utilityScope = isMobile ? page.getByRole("dialog") : page.getByRole("banner");
  await expect(utilityScope.getByRole("link", { name: "Emergency Support", exact: true })).toHaveAttribute("href", "/support/emergency");
  await expect(utilityScope.getByRole("link", { name: "Client Portal", exact: true })).toHaveAttribute("href", "https://portal.airixmedia.com");
});

test("legacy routes redirect to the canonical public architecture", async ({ page }) => {
  for (const [legacy, canonical] of [["/systems", "/work"], ["/systems/ku-journals", "/work/ku-journals"], ["/company", "/studio"], ["/start-a-project", "/discuss"], ["/project-brief", "/discuss"]]) {
    await page.goto(legacy);
    await expect(page).toHaveURL(new RegExp(`${canonical.replaceAll("/", "\\/")}/?$`));
  }
});

test("Oyo and Rivers pages use separately authored responsive state art", async ({ page }) => {
  await page.goto("/publishing");
  await expect(page.locator("picture source").first()).toHaveAttribute("srcset", /oyo\/publishing\/.*mobile/);
  await expect(page.locator("picture img").first()).toHaveAttribute("src", /oyo%2Fpublishing%2F.*desktop/);
  await page.goto("/services/managed-infrastructure");
  await expect(page.locator("picture source").first()).toHaveAttribute("srcset", /rivers\/infrastructure\/.*mobile/);
  await expect(page.locator("picture img").first()).toHaveAttribute("src", /rivers%2Finfrastructure%2F.*desktop/);
});

test("public routes request only their responsive runtime artwork", async ({ page }) => {
  for (const [route, expectedState] of [["/publishing", "/oyo/"], ["/services/managed-infrastructure", "/rivers/"]] as const) {
    const artworkRequests: string[] = [];
    const record = (request: { url: () => string }) => {
      const url = decodeURIComponent(request.url());
      if (url.includes("/images/atlas/")) artworkRequests.push(url);
    };
    page.on("request", record);
    await page.goto(route);
    await page.locator("picture img").first().waitFor();
    await page.waitForLoadState("networkidle");
    page.off("request", record);
    expect(artworkRequests.some(url => url.includes(expectedState) && url.includes(".webp"))).toBe(true);
    expect(artworkRequests.some(url => /\.png(?:\?|$)|\/source\/|\/scenes\/masters\//.test(url))).toBe(false);
  }
});

test("publishing prices use only the approved From amounts", async ({ page }) => {
  await page.goto("/publishing/pricing");
  for (const value of ["From ₦150,000", "From ₦200,000", "From ₦300,000/year", "From ₦150,000/year", "From ₦100,000/session", "From ₦250,000"]) await expect(page.getByText(value, { exact: true }).first()).toBeVisible();
  await expect(page.locator("body")).not.toContainText(/₦36,000|₦70,000|₦100,000 per year|guaranteed response/i);
});

test("project brief creates a local summary without network submission", async ({ page }) => {
  const requests: string[] = [];
  page.on("request", request => {
    if (request.method() !== "GET" && !request.url().includes("/__nextjs_")) requests.push(request.url());
  });
  await page.goto("/discuss");
  await page.getByLabel("Organisation").fill("Example Organisation");
  await page.getByLabel("Your name").fill("Ada Example");
  await page.getByLabel("Email").fill("ada@example.com");
  await page.getByLabel("Primary route").selectOption({ label: "Publishing or OJS" });
  await page.getByLabel("What needs to work better?").fill("We need a controlled journal-platform migration and clearer ownership.");
  await page.getByRole("button", { name: "Prepare local summary" }).click();
  await expect(page.getByText("Prepared locally — not sent")).toBeVisible();
  await expect(page.getByRole("link", { name: "Continue in email" })).toHaveAttribute("href", /^mailto:/);
  expect(requests).toEqual([]);
});

test("representative public routes have no critical or serious Axe violations", async ({ page }) => {
  for (const route of ["/", "/publishing", "/services/managed-infrastructure", "/studio", "/open-source", "/atlas", "/discuss", "/support/emergency"]) {
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
  await expect(page.locator("picture img").first()).toHaveCSS("animation-name", "none");
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
    ["/publishing/plugins", /Extensions shaped/, "oyo-plugins-desktop.png"],
    ["/work/ku-journals", "KU Journals", "oyo-project-evidence-desktop.png"],
    ["/publishing/pricing", /A clear starting point/, "oyo-pricing-desktop.png"],
    ["/services/managed-infrastructure", /Keep the operating layer/, "rivers-infrastructure-desktop.png"],
    ["/support", /remain understandable/, "rivers-support-desktop.png"],
    ["/support/emergency", /Describe what failed/, "rivers-emergency-desktop.png"],
    ["/security", /Security is an operating practice/, "rivers-security-desktop.png"],
    ["/studio", /Small by design/, "edo-studio-desktop.png"],
    ["/open-source", /improved in public/, "kaduna-open-source-desktop.png"],
    ["/open-source/paystack-ojs", "PaystackOJS", "kaduna-paystack-ojs-desktop.png"],
    ["/atlas", /A wider view/, "plateau-atlas-desktop.png"],
    ["/insights", /Practical thinking/, "plateau-insights-desktop.png"],
    ["/resources", /Useful tools/, "plateau-resources-desktop.png"],
    ["/discuss", /Where shall we build next/, "ogun-discuss-desktop.png"],
    ["/contact", /Tell us what needs/, "ogun-contact-desktop.png"],
    ["/book", /useful conversation/, "ogun-book-desktop.png"],
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
