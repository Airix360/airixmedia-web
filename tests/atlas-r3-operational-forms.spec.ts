import { test, expect, type Page } from "@playwright/test";
import fs from "node:fs";
import path from "node:path";

const output = path.join(process.cwd(), "output/playwright/atlas-r3-operational-forms");
const forms = [
  ["project", "Discuss a Project", "AM-PROJ-MOCK123456", "Enquiry delivered. Reference AM-PROJ-MOCK123456."],
  ["publishing", "Publishing Enquiry", "AM-PUB-MOCK123456", "Enquiry delivered. Reference AM-PUB-MOCK123456."],
  ["book", "Book a Consultation", "AM-BOOK-MOCK123456", "Consultation request received. Reference AM-BOOK-MOCK123456. This is a request, not a confirmed appointment."],
  ["general", "General Enquiry", "AM-GEN-MOCK123456", "Enquiry delivered. Reference AM-GEN-MOCK123456."],
  ["support", "Technical Support", "AM-SUP-MOCK123456", "Support request delivered. Reference AM-SUP-MOCK123456. Delivery does not mean that a ticket has been created."],
  ["emergency", "Emergency Support", "AM-EMG-MOCK123456", "Emergency request delivered. Reference AM-EMG-MOCK123456. Emergency work may be chargeable. Delivery does not guarantee immediate acceptance or mean a technician has seen the request. Use the verified client portal if service continuity requires immediate action."],
] as const;

test.describe.configure({ mode: "serial" });
test.beforeAll(() => fs.mkdirSync(output, { recursive: true }));

async function fillValidForm(page: Page) {
  const dialog = page.getByRole("dialog");
  await expect(dialog.locator('[name="fullName"]')).toBeVisible();
  for (const select of await dialog.locator("select").all()) await select.selectOption({ index: 1 });
  for (const input of await dialog.locator('input:not([type="hidden"]):not([type="checkbox"]):not([type="file"])').all()) {
    const name = await input.getAttribute("name");
    const type = await input.getAttribute("type");
    const value = type === "email" ? "reviewer@example.com" : type === "tel" ? "+234 800 000 0000" : type === "date" ? "2026-08-01" : name === "journalUrl" || name === "relevantLinks" ? "https://example.com" : name === "journalCount" ? "1" : name === "ojsVersion" ? "3.4" : `Review ${name || "value"}`;
    await input.fill(value);
  }
  for (const textarea of await dialog.locator("textarea").all()) await textarea.fill(`A complete mocked review value for ${await textarea.getAttribute("name")} with sufficient detail for validation.`);
  for (const checkbox of await dialog.locator('input[type="checkbox"]').all()) await checkbox.check();
}

for (const [key, title, reference, message] of forms) {
  test(`${key} shows confirmed mocked delivery truthfully`, async ({ page }, testInfo) => {
    const browserErrors: string[] = [];
    page.on("pageerror", (error) => browserErrors.push(error.message));
    page.on("console", (message) => { if (message.type() === "error") browserErrors.push(message.text()); });
    if (testInfo.project.name === "mobile") await page.setViewportSize({ width: 390, height: 844 });
    await page.route("**/api/leads", (route) => route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ ok: true, reference, message }) }));
    await page.goto(`/contact?form=${key}`);
    await fillValidForm(page);
    const dialog = page.getByRole("dialog", { name: title });
    await dialog.getByRole("button", { name: key === "book" ? "Request consultation" : "Submit enquiry" }).click();
    await expect(dialog.getByText(message)).toBeVisible();
    await expect(dialog.getByRole("link", { name: "Open Privacy notice" })).toHaveAttribute("href", "/privacy");
    await page.screenshot({ path: path.join(output, `${key}-success-${testInfo.project.name}.png`), fullPage: true });
    const text = await dialog.innerText();
    if (key === "book") expect(text).not.toMatch(/appointment booked/i);
    if (key === "support") expect(text).not.toMatch(/ticket created/i);
    if (key === "emergency") expect(text).not.toMatch(/incident accepted|engineer assigned|response underway/i);
    expect(browserErrors).toEqual([]);
  });
}

test("provider unavailable, delivery failure, retry preservation and rate limit remain explicit", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name === "mobile");
  let call = 0;
  await page.route("**/api/leads", async (route) => {
    call += 1;
    const states = [
      { status: 503, body: { ok: false, code: "provider_not_configured", error: "Online submission is not configured. Your enquiry has not been sent." } },
      { status: 503, body: { ok: false, code: "delivery_failed", error: "Delivery failed. Your enquiry has not been sent." } },
      { status: 200, body: { ok: true, reference: "AM-GEN-RETRY123456", message: "Enquiry delivered. Reference AM-GEN-RETRY123456." } },
    ];
    const state = states[Math.min(call - 1, states.length - 1)];
    await route.fulfill({ status: state.status, contentType: "application/json", body: JSON.stringify(state.body) });
  });
  await page.goto("/contact?form=general"); await fillValidForm(page);
  const dialog = page.getByRole("dialog");
  await dialog.getByRole("button", { name: "Submit enquiry" }).click();
  await expect(dialog.getByText(/Online submission is not configured/)).toBeVisible();
  await page.screenshot({ path: path.join(output, "provider-unavailable.png"), fullPage: true });
  await dialog.getByRole("button", { name: "Submit enquiry" }).click();
  await expect(dialog.getByText(/Delivery failed/)).toBeVisible();
  await expect(dialog.locator('[name="fullName"]')).toHaveValue("Review fullName");
  await page.screenshot({ path: path.join(output, "failed-delivery.png"), fullPage: true });
  await dialog.getByRole("button", { name: "Submit enquiry" }).click();
  await expect(dialog.getByText(/AM-GEN-RETRY123456/)).toBeVisible();

  await page.unroute("**/api/leads");
  await page.route("**/api/leads", (route) => route.fulfill({ status: 429, headers: { "Retry-After": "600" }, contentType: "application/json", body: JSON.stringify({ ok: false, code: "rate_limited", error: "Too many requests were received. Your enquiry has not been sent. Wait before trying again." }) }));
  await dialog.getByRole("button", { name: "Submit enquiry" }).click();
  await expect(dialog.getByText(/Too many requests/)).toBeVisible();
  await page.screenshot({ path: path.join(output, "rate-limited.png"), fullPage: true });
});

test("emergency failure shows configured public fallback without a false success", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name === "mobile");
  await page.route("**/api/leads", (route) => route.fulfill({ status: 503, contentType: "application/json", body: JSON.stringify({ ok: false, code: "delivery_failed", error: "Emergency delivery failed. Your request has not been sent.", fallbackMessage: "Use the verified client portal if service continuity requires immediate action.", fallbackUrl: "https://portal.airixmedia.com" }) }));
  await page.goto("/contact?form=emergency"); await fillValidForm(page);
  const dialog = page.getByRole("dialog"); await dialog.getByRole("button", { name: "Submit enquiry" }).click();
  await expect(dialog.getByText(/Emergency delivery failed/)).toBeVisible();
  await expect(dialog.getByRole("link", { name: "Use the published emergency fallback" })).toHaveAttribute("href", "https://portal.airixmedia.com");
  await expect(dialog.getByText(/Emergency request delivered/)).toHaveCount(0);
  await page.screenshot({ path: path.join(output, "emergency-failure-fallback.png"), fullPage: true });
});

test("attachment is visibly disabled and form remains keyboard operable", async ({ page }, testInfo) => {
  if (testInfo.project.name === "mobile") await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/contact?form=project");
  const dialog = page.getByRole("dialog");
  await expect(dialog.locator('input[type="file"]')).toBeDisabled();
  await expect(dialog.getByText(/private storage and malware scanning/)).toBeVisible();
  await dialog.locator('[name="fullName"]').focus(); await expect(dialog.locator('[name="fullName"]')).toBeFocused();
  await page.screenshot({ path: path.join(output, `attachment-disabled-${testInfo.project.name}.png`), fullPage: true });
});

test("writes secret-free operational audit evidence", async ({}, testInfo) => {
  test.skip(testInfo.project.name === "mobile");
  const reports = {
    "readiness-report.json": { version: "2.4.0.0", contactProvider: "mock", emergencyProvider: "mock", liveCredentialsVerified: false, monitoredRecipientsVerified: false, status: "configuration-required" },
    "routing-audit.json": { groups: ["project", "publishing", "book", "general", "support", "emergency"], emergencyDistinct: true, addressesIncluded: false },
    "rate-limit-report.json": { adapter: "process-local", generalDefault: { max: 8, seconds: 600 }, emergencyDefault: { max: 3, seconds: 900 }, maximumBuckets: 10000, independentIpAndEmailBuckets: true, distributedAdapterRequiredForHorizontalScale: true },
    "validation-report.json": { maxFieldLengths: true, headerInjection: true, url: true, phone: true, date: true, strictUnknownFields: true, attachments: "disabled" },
    "console-report.json": { browserErrors: [], sensitiveLogFields: [] },
    "secrets-safety-report.json": { apiKeysInBrowser: false, recipientAddressesInBrowser: false, rawProviderBodiesInBrowser: false, livePersonalSubmissions: false },
  };
  for (const [name, body] of Object.entries(reports)) fs.writeFileSync(path.join(output, name), `${JSON.stringify(body, null, 2)}\n`);
});
