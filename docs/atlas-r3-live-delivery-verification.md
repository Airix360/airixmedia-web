# Atlas R3 live delivery verification

Verification date: 23 July 2026
Status: **live staged delivery passed; no public deployment**

## Final result

Brevo authentication succeeded using the approved credential from the secure host store. Six marked submissions were sent through the real website server adapter: general, project, publishing, booking, support and emergency. Brevo accepted every message, delivery events were observed, and the intended cPanel mailbox or addressed role alias was confirmed from received raw mail.

The configured notifications sender and `airixmedia.com` domain are operational for transactional delivery: received messages use the approved sender and contain a DKIM signature for the Airix domain. The credential cannot read Brevo's administrative sender/domain inventory endpoints because those endpoints return permission-scope HTTP 403. This is recorded as an administrative visibility limitation, not represented as a delivery failure.

| Check | Result |
|---|---|
| Brevo API authentication | Pass |
| General delivery | Pass |
| Project delivery | Pass |
| Publishing delivery | Pass |
| Booking delivery | Pass |
| Support delivery | Pass; a transient soft-bounce event preceded final delivery |
| Emergency primary | Pass |
| Controlled emergency fallback | Pass |
| Requester Reply-To header | Pass |
| Reference agreement | Pass |
| Plain-text and HTML readability | Pass |
| Truthful acknowledgement wording | Pass |
| All-provider-failure state | Pass in deterministic browser verification |
| Secret and PII evidence audit | Pass |

Every live subject and final emergency requester acknowledgement carried `STAGING TEST — NO ACTION REQUIRED`. During verification, an emergency requester acknowledgement was found to omit that staging label. The acknowledgement template was corrected, regression-tested, and the final primary and fallback acknowledgements were re-sent and received with the label. No unmarked result is used as final evidence.

## Emergency proof

The final primary emergency delivery reached the Emergency Duty Operator route. A controlled staging-only primary failure then exercised the separately configured Operations Fallback; the fallback was accepted, delivered and present in cPanel, and the requester acknowledgement truthfully disclosed use of the fallback route. The deterministic all-provider-failure browser test still shows no success state, preserves entered values and exposes only the public fallback guidance.

Email acceptance and mailbox receipt do not prove human review, ticket creation, incident acceptance, assignment or restoration work. The approved daily 08:00–22:00 West Africa Time operating model remains documented, but human duty-coverage acceptance is still required before launch.

## Evidence handling

Sanitized machine-readable evidence is under `output/playwright/atlas-r3-live-delivery-verification/`. It retains logical role names, public references and irreversible safe provider-message fingerprints only. It excludes credentials, recipient lists, raw provider bodies, submitted message content, telephone numbers and private personal data.

The controlled network test is opt-in and skipped in ordinary test runs. Operations may repeat it only in an isolated staging process with the approved secrets injected:

`RUN_LIVE_BREVO_VERIFICATION=true APP_ENVIRONMENT=staging LIVE_VERIFICATION_REQUESTER_EMAIL=<approved-internal-address> pnpm test:live:brevo`

No site was merged or deployed, and no DNS record was changed.

## P1 decision

- Contact-delivery P1: **closed**. All five non-emergency paths and their intended role routing passed.
- Emergency technical-delivery P1: **closed**. Primary, controlled fallback and all-provider-failure behavior passed.
- Emergency operational-coverage P1: **open** until the owner or operations lead records active human duty coverage for the approved hours.
