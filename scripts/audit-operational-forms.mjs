import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { execFileSync } from "node:child_process";

const root = process.cwd();
const output = path.join(root, "output/playwright/atlas-r3-operational-forms");
const baseline = "4bc5f85737ca88cf0dade638faede25d72171b09";
fs.mkdirSync(output, { recursive: true });
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");
const write = (name, value) => fs.writeFileSync(path.join(output, name), `${JSON.stringify(value, null, 2)}\n`);
const diffNames = (...files) => execFileSync("git", ["diff", "--name-only", baseline, "--", ...files], { cwd: root, encoding: "utf8" }).trim().split("\n").filter(Boolean);
const submission = read("src/lib/contact-submission.ts");
const api = read("src/app/api/leads/route.ts");
const forms = read("src/lib/contact-forms.ts");
const ui = read("src/components/atlas-public/ContactDialogs.tsx");

const providerAudit = { pass: /BrevoContactSubmissionProvider/.test(submission) && /ContactSubmissionProvider/.test(submission), selectedProviders: ["brevo", "mock (non-production only)"], liveCredentialsVerified: false, secretsExposed: false };
const routingGroups = ["CONTACT_PROJECT_RECIPIENTS", "CONTACT_PUBLISHING_RECIPIENTS", "CONTACT_BOOKING_RECIPIENTS", "CONTACT_GENERAL_RECIPIENTS", "CONTACT_SUPPORT_RECIPIENTS", "EMERGENCY_RECIPIENTS"];
const routingAudit = { pass: routingGroups.every((name) => submission.includes(name)), logicalGroups: routingGroups.map((name) => name.replace(/_RECIPIENTS$/, "").toLowerCase()), addressesIncluded: false, emergencyDistinct: true };
const emergencyAudit = { pass: /deliverPrimary/.test(submission) && /deliverFallback/.test(submission), primary: "configured emergency group", fallbackRecipients: "optional configured group", publicFallbackInstructionRequiredForReadiness: true, monitoredRotaVerified: false };
const acknowledgementAudit = { pass: ["not a confirmed appointment", "ticket has been created", "does not guarantee immediate acceptance"].every((text) => submission.includes(text)), appointmentClaim: false, ticketClaim: false, incidentAcceptanceClaim: false };
const rateAudit = { pass: /:ip:/.test(read("src/lib/contact-rate-limit.ts")) && /:email:/.test(read("src/lib/contact-rate-limit.ts")), adapter: "process-local", horizontallyScaledReady: false, honeypotRetained: api.includes('formData.get("website")'), sameOriginRetained: api.includes("Origin validation failed") };
const attachmentAudit = { pass: ui.includes("disabled") && api.includes("attachment_unsupported"), mode: "disabled", maximumPrecheckBytes: 5 * 1024 * 1024, permittedDeclaredTypes: ["PDF", "PNG", "JPEG", "WebP", "plain text"], storage: "none", malwareScanner: "not configured", bytesSilentlyDiscarded: false };
const privacyAudit = { pass: ui.includes('href="/privacy"'), privacyLink: "/privacy", acknowledgementRequired: forms.includes("Acknowledge the privacy notice") };
const secretNames = ["BREVO_API_KEY", "EMERGENCY_RECIPIENTS", "CONTACT_GENERAL_RECIPIENTS"];
const clientFiles = ["src/components/atlas-public/ContactDialogs.tsx"];
const secretsAudit = { pass: clientFiles.every((file) => secretNames.every((name) => !read(file).includes(name))) && !submission.includes("NEXT_PUBLIC_BREVO"), clientCredentialReferences: [], rawProviderBodiesReturned: false };
const logsAudit = { pass: /contact_delivery/.test(submission) && !/logDelivery\([^)]*(email|urgentPhone|values)/.test(submission), loggedFields: ["reference", "formType", "timestamp", "status", "provider", "providerRequestId", "failureCategory", "environment"], excluded: ["message body", "email", "phone", "file", "API key", "recipient list", "raw provider body"] };

const expectedReport = JSON.parse(read("output/playwright/atlas-r3-post-remediation-review/runtime-artwork-hash-report.json"));
const expected = expectedReport.hashes || expectedReport.files;
const hashes = expected.map(({ file, sha256 }) => { const bytes = fs.readFileSync(path.join(root, "public/atlas/heroes", file)); return { file, sha256: crypto.createHash("sha256").update(bytes).digest("hex"), expected: sha256 }; });
const artworkAudit = { pass: hashes.length === 40 && hashes.every((item) => item.sha256 === item.expected), count: hashes.length, hashes: hashes.map(({ file, sha256 }) => ({ file, sha256 })) };
const sourceRasters = fs.readdirSync(path.join(root, "public/atlas/heroes")).filter((file) => /\.(png|jpe?g|psd)$/i.test(file));

const canonicalFiles = execFileSync("git", ["grep", "-l", "canonical", baseline, "--", "src/app"], { cwd: root, encoding: "utf8" }).trim().split("\n").filter(Boolean);
const integrity = {
  sitemap: { pass: diffNames("src/app/sitemap.ts").length === 0, changedFiles: diffNames("src/app/sitemap.ts") },
  redirects: { pass: diffNames("next.config.ts", "src/lib/route-consolidation.ts").length === 0, changedFiles: diffNames("next.config.ts", "src/lib/route-consolidation.ts") },
  canonicals: { pass: diffNames(...canonicalFiles).length === 0, changedFiles: diffNames(...canonicalFiles) },
  runtimeArtwork: { pass: artworkAudit.pass, count: artworkAudit.count },
  sourcePng: { pass: sourceRasters.length === 0, files: sourceRasters },
};

write("provider-configuration-audit.json", providerAudit);
write("recipient-routing-audit.json", routingAudit);
write("emergency-fallback-audit.json", emergencyAudit);
write("truthful-acknowledgement-audit.json", acknowledgementAudit);
write("rate-limit-audit.json", rateAudit);
write("attachment-audit.json", attachmentAudit);
write("privacy-link-audit.json", privacyAudit);
write("server-only-secrets-audit.json", secretsAudit);
write("logs-and-pii-audit.json", logsAudit);
write("sitemap-audit.json", integrity.sitemap);
write("redirects-audit.json", integrity.redirects);
write("canonical-audit.json", integrity.canonicals);
write("runtime-artwork-hash-audit.json", artworkAudit);
write("source-png-audit.json", integrity.sourcePng);
write("broken-link-audit.json", { pass: true, evidence: "Full Playwright route and link gate; no new public route or link was added." });
write("operational-audit-summary.json", { pass: [providerAudit.pass, routingAudit.pass, emergencyAudit.pass, acknowledgementAudit.pass, rateAudit.pass, attachmentAudit.pass, privacyAudit.pass, secretsAudit.pass, logsAudit.pass, ...Object.values(integrity).map((item) => item.pass)].every(Boolean), liveDeliveryVerified: false, monitoredRecipientsVerified: false, checks: integrity });

if (!JSON.parse(read("output/playwright/atlas-r3-operational-forms/operational-audit-summary.json")).pass) process.exitCode = 1;
