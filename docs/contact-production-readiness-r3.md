# Contact production readiness, R3

Review date: 23 July 2026
Implementation base: `4bc5f85737ca88cf0dade638faede25d72171b09`
Version: `2.4.0.0`
Status: **live staged delivery verified; launch remains blocked by topology and human emergency-duty acceptance**

## Delivery design

All six forms pass through typed server validation and a `ContactSubmissionProvider`. `BrevoContactSubmissionProvider` sends transactional email through Brevo's HTTPS API using a verified configured sender. Project, publishing, consultation, general and support requests each have an independent logical recipient group. Consultation remains a request; support email is not described as a ticket.

Emergency requests cross a separate `EmergencyEscalationProvider` boundary. The current approved implementation uses the Brevo transport with a distinct emergency recipient group. If the primary call fails, it attempts configured fallback recipients. Confirmed email acceptance is not described as incident acceptance, technician acknowledgement or response underway. An Airix Media OS/ticket adapter can replace this boundary only after a verified API is approved.

## Server-only environment

Required: `CONTACT_SUBMISSION_PROVIDER=brevo`, `BREVO_API_KEY`, `CONTACT_FROM_EMAIL`, `CONTACT_FROM_NAME`, the five `CONTACT_*_RECIPIENTS` groups, `CONTACT_REPLY_TO_MODE`, `EMERGENCY_ESCALATION_PROVIDER=email`, and `EMERGENCY_RECIPIENTS`. Optional emergency values are `EMERGENCY_CC_RECIPIENTS`, `EMERGENCY_FALLBACK_RECIPIENTS`, `EMERGENCY_ACKNOWLEDGEMENT_ENABLED`, `EMERGENCY_PUBLIC_FALLBACK_MESSAGE`, and `EMERGENCY_PUBLIC_FALLBACK_URL`. Timeout and rate-limit settings are documented in `.env.example`. None may use `NEXT_PUBLIC_`.

Recipient lists are comma/semicolon-separated and validated as email addresses. No recipient or sender is invented. Invalid or missing configuration fails readiness and returns an explicit not-sent response. The browser receives no credentials, internal addresses or raw provider body.

## References, acknowledgements and logs

References are generated server-side from cryptographically random bytes with form-specific non-sequential prefixes. Structured logs contain only reference, form type, timestamp, status, provider, safe provider request ID, failure category and environment. They exclude body text, email, telephone, files, recipients, API keys and raw responses.

Success appears only after provider acceptance. Booking says the consultation request was delivered but is not a confirmed appointment, support says delivery did not create or assign a ticket, and emergency says delivery did not establish incident acceptance, assignment or technician review. Emergency copy preserves chargeability, monitoring hours and public fallback boundaries. Optional requester acknowledgement is attempted only after confirmed emergency delivery and does not change the delivery result if the acknowledgement itself fails.

## Attachments and retention

File upload is disabled visibly. The endpoint rejects any supplied file rather than discarding it. The defensive pre-check allows only PDF, PNG, JPEG, WebP and plain text extensions/MIME declarations up to 5 MB, but no file reaches delivery because approved private storage, file-signature validation, malware scanning, retention and deletion are not yet configured. No uploaded bytes are written to a public or local filesystem.

Brevo email and provider logs create processor-retained personal data. Before live enablement, approve Brevo's processing region/terms, retention, access ownership, deletion procedure, subprocessor/legal disclosures and mailbox retention. This implementation does not modify public legal copy.

## Abuse controls

Same-origin validation and the honeypot remain. Privacy-preserving SHA-256 request fingerprints back independent configurable per-IP and per-email limits, with stricter emergency defaults and a bounded in-memory bucket count. Trusted proxy headers must be preserved and stripped from untrusted clients at the reverse proxy. The current adapter is process-local and deterministic; a horizontally scaled deployment needs an approved shared rate-limit store. No CAPTCHA or external challenge is active.

## Production validation and rollback

Live staged verification exercised project, publishing, booking, general, support and emergency delivery through the production Brevo adapter. A controlled primary-emergency failure exercised the real fallback route. Provider acceptance, delivery events, raw-mail receipt, role alias, requester Reply-To, references, multipart content, acknowledgements and secret/PII boundaries passed. No public deployment occurred.

Rollback: remove `CONTACT_SUBMISSION_PROVIDER` and `EMERGENCY_ESCALATION_PROVIDER` (or their credentials/recipients) to fail closed with truthful unavailable responses, then revert the feature release if needed. Do not point emergency traffic at the general inbox.

Current infrastructure evidence is recorded in `docs/atlas-r3-live-delivery-verification.md`. Contact delivery and emergency technical routing are verified. Remaining limitations: human emergency-duty coverage has not been signed off; the deployment topology is not provisioned; the credential cannot read Brevo administrative sender/domain inventory; and there is no ticket/system-of-record API, distributed rate limiter, challenge provider, attachment adapter, delivery retry queue or calendar confirmation.
