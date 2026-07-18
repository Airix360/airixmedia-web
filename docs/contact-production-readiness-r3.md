# Contact production readiness, R3

Review date: 18 July 2026  
Implementation base: `4bc5f85737ca88cf0dade638faede25d72171b09`
Version: `2.4.0.0`
Status: **adapters and role aliases configured; production delivery blocked by rejected Brevo credential and unconfirmed monitoring**

## Delivery design

All six forms pass through typed server validation and a `ContactSubmissionProvider`. `BrevoContactSubmissionProvider` sends transactional email through Brevo's HTTPS API using a verified configured sender. Project, publishing, consultation, general and support requests each have an independent logical recipient group. Consultation remains a request; support email is not described as a ticket.

Emergency requests cross a separate `EmergencyEscalationProvider` boundary. The current approved implementation uses the Brevo transport with a distinct emergency recipient group. If the primary call fails, it attempts configured fallback recipients. Confirmed email acceptance is not described as incident acceptance, technician acknowledgement or response underway. An Airix Media OS/ticket adapter can replace this boundary only after a verified API is approved.

## Server-only environment

Required: `CONTACT_SUBMISSION_PROVIDER=brevo`, `BREVO_API_KEY`, `CONTACT_FROM_EMAIL`, `CONTACT_FROM_NAME`, the five `CONTACT_*_RECIPIENTS` groups, `CONTACT_REPLY_TO_MODE`, `EMERGENCY_ESCALATION_PROVIDER=email`, and `EMERGENCY_RECIPIENTS`. Optional emergency values are `EMERGENCY_CC_RECIPIENTS`, `EMERGENCY_FALLBACK_RECIPIENTS`, `EMERGENCY_ACKNOWLEDGEMENT_ENABLED`, `EMERGENCY_PUBLIC_FALLBACK_MESSAGE`, and `EMERGENCY_PUBLIC_FALLBACK_URL`. Timeout and rate-limit settings are documented in `.env.example`. None may use `NEXT_PUBLIC_`.

Recipient lists are comma/semicolon-separated and validated as email addresses. No recipient or sender is invented. Invalid or missing configuration fails readiness and returns an explicit not-sent response. The browser receives no credentials, internal addresses or raw provider body.

## References, acknowledgements and logs

References are generated server-side from cryptographically random bytes with form-specific non-sequential prefixes. Structured logs contain only reference, form type, timestamp, status, provider, safe provider request ID, failure category and environment. They exclude body text, email, telephone, files, recipients, API keys and raw responses.

Success appears only after provider acceptance. Booking says consultation request received, support says support request delivered, and emergency says emergency request delivered. Emergency copy preserves chargeability, no-immediate-acceptance and public fallback boundaries. Optional requester acknowledgement is attempted only after confirmed emergency delivery and does not change the delivery result if the acknowledgement itself fails.

## Attachments and retention

File upload is disabled visibly. The endpoint rejects any supplied file rather than discarding it. The defensive pre-check allows only PDF, PNG, JPEG, WebP and plain text extensions/MIME declarations up to 5 MB, but no file reaches delivery because approved private storage, file-signature validation, malware scanning, retention and deletion are not yet configured. No uploaded bytes are written to a public or local filesystem.

Brevo email and provider logs create processor-retained personal data. Before live enablement, approve Brevo's processing region/terms, retention, access ownership, deletion procedure, subprocessor/legal disclosures and mailbox retention. This implementation does not modify public legal copy.

## Abuse controls

Same-origin validation and the honeypot remain. Privacy-preserving SHA-256 request fingerprints back independent configurable per-IP and per-email limits, with stricter emergency defaults and a bounded in-memory bucket count. Trusted proxy headers must be preserved and stripped from untrusted clients at the reverse proxy. The current adapter is process-local and deterministic; a horizontally scaled deployment needs an approved shared rate-limit store. No CAPTCHA or external challenge is active.

## Production validation and rollback

Before closing either operational P1: configure approved monitored recipient groups and rota; inject secrets through the deployment secret store; run a controlled project, publishing, booking, general, support and emergency delivery; force primary emergency failure and observe fallback; verify acknowledgements, headers and structured logs; verify no secrets/PII leak; and confirm mailbox monitoring ownership. Live Brevo delivery has not been exercised in this development environment.

Rollback: remove `CONTACT_SUBMISSION_PROVIDER` and `EMERGENCY_ESCALATION_PROVIDER` (or their credentials/recipients) to fail closed with truthful unavailable responses, then revert the feature release if needed. Do not point emergency traffic at the general inbox.

Current infrastructure evidence is recorded in `docs/atlas-r3-live-delivery-verification.md`. The role aliases now exist, but receipt, sender authentication, duty coverage and live delivery remain unverified. Remaining limitations: rejected Brevo credential, no confirmed sender status, no ticket/system-of-record API, no distributed rate limiter, no challenge provider, no attachment adapter, no delivery retry queue, no calendar confirmation, and no live-delivery evidence.
