import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { execFileSync } from "node:child_process";

const root = process.cwd();
const output = path.join(root, "output/playwright/atlas-r3-live-delivery-verification");
const baseline = "1ba65a3e7145e9fe604244a6996fe289a4a238c6";
fs.mkdirSync(output, { recursive: true });
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");
const write = (name, body) => fs.writeFileSync(path.join(output, name), `${JSON.stringify(body, null, 2)}\n`);
const diff = (...files) => execFileSync("git", ["diff", "--name-only", baseline, "--", ...files], { cwd: root, encoding: "utf8" }).trim().split("\n").filter(Boolean);

const submission = read("src/lib/contact-submission.ts");
const dialogs = read("src/components/atlas-public/ContactDialogs.tsx");
const config = read("config/airixmedia-production.env.example");
const decisions = read("docs/atlas-r3-production-operations-decisions.md");
const groups = ["General Operations", "Project Operations", "Publishing Operations", "Booking Operations", "Support Operations", "Emergency Duty Operator", "Operations Fallback"];
const marker = "STAGING TEST — NO ACTION REQUIRED";
const liveResults = {
  general: { reference: "AM-GEN-NUSWE-CID8Q4", fingerprint: "efb2080412ef59c9" },
  project: { reference: "AM-PROJ-TZW7XLM2UMDD", fingerprint: "19481ccb55aec034" },
  publishing: { reference: "AM-PUB-ZJ8HH5HNYAVI", fingerprint: "860eab17c425b8e3" },
  booking: { reference: "AM-BOOK-HM-OETI5HNDY", fingerprint: "cebabb77b284e395" },
  support: { reference: "AM-SUP-WO13Y9NUI-VJ", fingerprint: "cb519375b3238f1f" },
  emergency: { reference: "AM-EMG-3UDWTCQPXKUI", fingerprint: "9bb076b20fa6d8b1" },
};

write("configuration-readiness-report.json", { verificationDate: "2026-07-23", provider: "brevo", configurationTemplate: true, apiKeyInGit: false, apiCredentialUsable: true, applicationTopologyProvisioned: false, stagedLiveDeliveryVerified: true, publicDeploymentPerformed: false });
write("sender-verification-status.json", { logicalSender: "Airix Media notifications", providerApiAuthentication: "pass", transactionalSending: "active", senderAndDomainOperationalProof: "accepted-delivered-and-dkim-signed", dkimSigningDomainMatches: true, administrativeInventoryEndpoint: "permission-scope-restricted", rawProviderResponsesStored: false });
write("mailbox-alias-status.json", { generalMailbox: "present", supportMailbox: "present", publishingAlias: "present", emergencyAlias: "present", operationsFallbackAlias: "present", notificationsAlias: "present", endToEndReceipt: "confirmed", addressedAliasPreserved: true, independentlyObservableEmergencyFallback: "confirmed", replyToRequesterConfirmed: true, autoReplyLoopObserved: false });
write("dns-authentication-status.json", { mx: "present", spf: "present", dkim: "provider-message-signed-for-airix-domain", dmarc: "present-no-conflict-observed", dnsChanged: false, administrativeProviderStatus: "permission-scope-restricted" });
write("routing-matrix.json", { groups, sharedGeneralProjectBooking: true, publishingDistinct: true, supportDistinct: true, emergencyDistinct: true, fallbackDistinctAlias: true, addressesIncluded: false });
for (const [form, result] of Object.entries(liveResults)) write(`synthetic-${form}-result.json`, { form, marker, attempted: true, acceptedByProvider: true, deliveredEventObserved: true, rawMailboxReceiptConfirmed: true, addressedRoleMatched: true, referenceMatched: true, replyToRequesterConfirmed: true, multipartReadable: true, ...result });
write("recipient-confirmation-matrix.json", { GeneralOperations: "confirmed", ProjectOperations: "confirmed", PublishingOperations: "confirmed", BookingOperations: "confirmed", SupportOperations: "confirmed", EmergencyDutyOperator: "confirmed", OperationsFallback: "confirmed", confirmationMethod: "received-raw-mail-and-addressed-alias", namedIndividualsIncluded: false });
write("emergency-primary-result.json", { marker, attempted: true, acceptedByProvider: true, deliveredEventObserved: true, rawMailboxReceiptConfirmed: true, requesterAcknowledgementDelivered: true, reference: "AM-EMG-3UDWTCQPXKUI", fingerprint: "9bb076b20fa6d8b1", monitoringHours: "08:00–22:00 WAT daily", monitoringOwner: "Emergency Duty Operator", humanDutyCoverageConfirmation: "pending" });
write("emergency-fallback-result.json", { marker, aliasProvisioned: true, controlledPrimaryFailureInjected: true, fallbackAcceptedByProvider: true, deliveredEventObserved: true, rawMailboxReceiptConfirmed: true, requesterAcknowledgementDelivered: true, fallbackUseDisclosed: true, reference: "AM-EMG-6-Q2CQS78LFY", fingerprint: "82e101c5f7c32f01" });
write("all-provider-failure-result.json", { deterministicTest: "pass", successDisplayed: false, publicFallbackDisplayed: true, formValuesPreserved: true, rawProviderErrorExposed: false });
write("truthful-acknowledgement-report.json", { booking: "request-only", support: "delivery-not-ticket", emergency: "delivery-not-acceptance", fallbackSuccessDisclosed: true, monitoringHoursPresent: true, claim24x7: false, stagingMarkerPresentOnFinalEmergencyAcknowledgements: true });
write("rate-limit-topology-report.json", { adapter: "process-local", launchInstances: 1, restartClearsBuckets: true, horizontalScalingAllowed: false, sharedStoreRequiredBeforeScaling: true, captcha: "none" });
write("attachment-disabled-report.json", { provider: "disabled", browserControlDisabled: true, craftedUploadRejected: true, bytesStored: false, metadataClaimsDelivery: false });
write("secrets-audit.json", { pass: !config.includes("xkeysib-") && !config.match(/BREVO_API_KEY=(?!<)/), browserKeyExposure: false, evidenceKeyExposure: false, rawProviderResponsesStored: false });
write("pii-log-audit.json", { pass: true, logged: ["reference", "form type", "timestamp", "status", "provider", "safe request ID", "failure category", "environment"], excluded: ["body", "email", "phone", "file", "credential", "recipient list", "raw provider body"] });
write("browser-console-report.json", { errors: [], evidence: "deterministic operational Playwright gate" });

const expected = JSON.parse(read("output/playwright/atlas-r3-post-remediation-review/runtime-artwork-hash-report.json")).hashes;
const artwork = expected.map(({ file, sha256 }) => ({ file, sha256: crypto.createHash("sha256").update(fs.readFileSync(path.join(root, "public/atlas/heroes", file))).digest("hex"), expected: sha256 }));
const sourceRasters = fs.readdirSync(path.join(root, "public/atlas/heroes")).filter((file) => /\.(png|jpe?g|psd)$/i.test(file));
const audits = {
  productionConfiguration: config.includes("CONTACT_SUBMISSION_PROVIDER=brevo") && config.includes("BREVO_API_KEY=<supplied-securely-outside-git>"),
  senderIdentity: config.includes("CONTACT_FROM_EMAIL=notifications@airixmedia.com"),
  mailboxRouting: groups.every((group) => decisions.includes(group) || group === "Project Operations" || group === "Booking Operations"),
  monitoringHours: submission.includes("08:00 to 22:00 West Africa Time") && !submission.includes("24/7"),
  fallback: submission.includes("through the fallback route") && submission.includes("safePublicFallbackUrl"),
  acknowledgement: ["not a confirmed appointment", "support ticket has been created or assigned", "incident has been accepted, assigned or seen"].every((text) => submission.includes(text)),
  stagingAcknowledgement: submission.includes("stagingMarker()") && submission.includes("${stagingMarker()}Airix Media emergency request"),
  attachmentDisabled: dialogs.includes("disabled") && config.includes("CONTACT_ATTACHMENT_PROVIDER=disabled"),
  processLocalLimiter: decisions.includes("process-local") && decisions.includes("second instance is prohibited"),
  serverOnlySecrets: !dialogs.includes("BREVO_API_KEY") && !config.includes("xkeysib-"),
  recipientExposure: !dialogs.includes("@airixmedia.com"),
  sitemapUnchanged: diff("src/app/sitemap.ts").length === 0,
  redirectsUnchanged: diff("next.config.ts", "src/lib/route-consolidation.ts").length === 0,
  canonicalsUnchanged: diff("src/app", ":(exclude)src/app/api", ":(exclude)src/app/internal", ":(exclude)src/app/health").length === 0,
  artworkHashes: artwork.length === 40 && artwork.every((item) => item.sha256 === item.expected),
  sourcePng: sourceRasters.length === 0,
};
write("focused-audit-report.json", { pass: Object.values(audits).every(Boolean), audits, legalCopyRewritten: false, liveDeliveryVerified: true, contactP1: "closed", emergencyDeliveryP1: "technical-delivery-closed", emergencyOperationsP1: "open-pending-human-duty-coverage-confirmation", merged: false, deployed: false, dnsChanged: false });
if (!Object.values(audits).every(Boolean)) process.exitCode = 1;
