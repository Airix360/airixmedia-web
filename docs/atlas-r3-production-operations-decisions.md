# Airix Media production operations decisions

Date: 23 July 2026
Branch: `feat/atlas-r3-form-delivery-emergency-routing`
Version: `2.4.0.0`

## Approved delivery model

The production origin is `https://airixmedia.com`. Brevo transactional email is the approved contact-delivery transport. The configured sender is Airix Media at `notifications@airixmedia.com`, with validated requester reply-to. The only external secret is `BREVO_API_KEY`; it must be injected from the runtime secret store and never committed, logged or sent to the browser.

Routing is role-based: general, project and booking use `hello@airixmedia.com`; publishing uses `publishing@airixmedia.com`; support uses `support@airixmedia.com`; emergency primary delivery uses `emergency@airixmedia.com`; and emergency fallback uses `operations@airixmedia.com`. Emergency CC is intentionally empty. Transactional sender mail must not become the operational fallback.

Sanitized verification identifies these logical groups: General Operations, Project Operations, Publishing Operations, Booking Operations, Support Operations, Emergency Duty Operator and Operations Fallback.

## Monitoring and acknowledgement boundaries

Airix Media Operations owns enquiry and support mail. On 23 July 2026, Airix Media Operations formally accepted responsibility for monitoring `emergency@airixmedia.com` daily from 08:00 to 22:00 WAT. Requests outside that window are handled on a best-effort basis. Delivery of an emergency request does not guarantee immediate acceptance, assignment or response. `operations@airixmedia.com` remains the fallback route.

The approved window is 08:00–22:00 West Africa Time; outside-hours handling is best effort. This is not 24/7 coverage and carries no response-time guarantee. Brevo acceptance proves electronic delivery only—not human review, incident acceptance, assignment, ticket creation or restoration work.

Consultation acknowledgement: the request was delivered, but no appointment exists until Airix confirms availability. Support acknowledgement: delivery only, with no ticket or assignment claim. Emergency acknowledgement: delivery only, chargeability warning, monitoring hours and no acceptance/assignment/technician-seen claim. A fallback-success acknowledgement explicitly says the fallback route was used.

## Mailbox implementation and verified result

The approved cPanel model permits aliases into one monitored operations mailbox. `hello@airixmedia.com` and `support@airixmedia.com` exist as independent mailboxes; publishing, emergency, operations and notifications are configured role aliases. On 23 July 2026, received raw mail confirmed end-to-end receipt, preservation of the addressed role alias, distinct emergency and fallback routing, requester Reply-To headers, matching references and no observed automatic-reply loop. Airix Media Operations has accepted the documented monitoring responsibility.

Provisioning checklist:

- [x] General operations mailbox exists.
- [x] Support mailbox exists.
- [x] Publishing alias exists.
- [x] Emergency alias exists.
- [x] Operations fallback alias exists.
- [x] Notifications sender alias exists.
- [x] Send one synthetic message to every role address and confirm the addressed alias in the received headers.
- [x] Confirm emergency and fallback can be distinguished in the monitored mailbox.
- [x] Confirm no forward or automatic-reply loop was observed.
- [x] Confirm Airix Media Operations coverage for the approved hours.

## DNS and sender authentication

Public DNS has MX, SPF, DKIM/domain-verification material and DMARC (`p=none`). No DNS was changed. Brevo authentication now succeeds, transactional messages are accepted and delivered, and received mail is DKIM-signed for `airixmedia.com`. The credential's administrative sender/domain inventory endpoints remain permission-scope restricted (HTTP 403), so their dashboard fields were not independently read.

Checklist before live sending:

- [x] Confirm the secure Brevo credential authenticates.
- [x] Confirm the configured notifications sender can send accepted and delivered transactional messages.
- [x] Confirm received mail is DKIM-signed for `airixmedia.com`.
- [ ] Obtain read permission for Brevo administrative sender/domain inventory only if dashboard-status evidence is required.
- [ ] Confirm SPF alignment from a receiving system that exposes authentication results; change DNS only after separate approval if a defect is found.
- [x] Confirm DMARC exists and does not reject the approved sender configuration.

## Deployment and abuse controls

Launch topology is one persistent Node.js application process/container behind a reverse proxy, with no serverless runtime and no replica. The process-local limiter is accepted only for that topology: general default 8 requests/600 seconds, emergency default 3/900 seconds, maximum 10,000 buckets, independent IP and email fingerprints. Restarting clears buckets. A second instance is prohibited until Redis or another approved shared store replaces the process-local adapter. Same-origin protection, honeypot and explicit HTTP 429 remain. No CAPTCHA is approved.

No website production process currently runs on the inspected cPanel host. The approved application topology must be provisioned and verified separately; this task did not deploy the site.

## Attachments and handover

`CONTACT_ATTACHMENT_PROVIDER=disabled`. No form accepts, stores or delivers file bytes. Crafted uploads are rejected server-side. Private storage, malware scanning and retention are out of scope.

Technical delivery handover is complete for secret injection, six staged deliveries, role-based receipt, requester Reply-To, controlled emergency primary failure, fallback receipt, all-provider-failure UI and log/PII review. Emergency duty ownership and hours are formally accepted. Deployment must still preserve the approved one-instance topology until a shared rate-limit store is introduced.
