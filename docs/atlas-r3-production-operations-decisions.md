# Airix Media production operations decisions

Date: 18 July 2026  
Branch: `feat/atlas-r3-form-delivery-emergency-routing`  
Version: `2.4.0.0`

## Approved delivery model

The production origin is `https://airixmedia.com`. Brevo transactional email is the approved contact-delivery transport. The configured sender is Airix Media at `notifications@airixmedia.com`, with validated requester reply-to. The only external secret is `BREVO_API_KEY`; it must be injected from the runtime secret store and never committed, logged or sent to the browser.

Routing is role-based: general, project and booking use `hello@airixmedia.com`; publishing uses `publishing@airixmedia.com`; support uses `support@airixmedia.com`; emergency primary delivery uses `emergency@airixmedia.com`; and emergency fallback uses `operations@airixmedia.com`. Emergency CC is intentionally empty. Transactional sender mail must not become the operational fallback.

Sanitized verification identifies these logical groups: General Operations, Project Operations, Publishing Operations, Booking Operations, Support Operations, Emergency Duty Operator and Operations Fallback.

## Monitoring and acknowledgement boundaries

Airix Media Operations owns enquiry and support mail. The Emergency Duty Operator owns primary emergency monitoring, with Operations Fallback as the fallback role. Approved monitoring hours are daily 08:00–22:00 West Africa Time; outside-hours handling is best effort. This is not 24/7 coverage and carries no response-time guarantee. The owner or operations lead must confirm the duty arrangement before launch. Brevo acceptance proves electronic delivery only—not human review, incident acceptance, assignment, ticket creation or restoration work.

Consultation acknowledgement: the request was delivered, but no appointment exists until Airix confirms availability. Support acknowledgement: delivery only, with no ticket or assignment claim. Emergency acknowledgement: delivery only, chargeability warning, monitoring hours and no acceptance/assignment/technician-seen claim. A fallback-success acknowledgement explicitly says the fallback route was used.

## Mailbox implementation and current result

The approved cPanel model permits aliases into one monitored operations mailbox. `hello@airixmedia.com` and `support@airixmedia.com` already existed as independent mailboxes. On 18 July 2026, the missing publishing, emergency, operations and notifications role aliases were provisioned through cPanel and configured with one approved operations target each. Address existence/routing configuration is verified; end-to-end receipt, alias header preservation, independent emergency/fallback observability, auto-reply safety and human monitoring remain unconfirmed.

Provisioning checklist:

- [x] General operations mailbox exists.
- [x] Support mailbox exists.
- [x] Publishing alias exists.
- [x] Emergency alias exists.
- [x] Operations fallback alias exists.
- [x] Notifications sender alias exists.
- [ ] Send one synthetic message to every role address and confirm the addressed alias in the received headers.
- [ ] Confirm emergency and fallback can be distinguished in the monitored mailbox.
- [ ] Confirm no forward or automatic-reply loop.
- [ ] Confirm Emergency Duty Operator coverage for the approved hours.

## DNS and sender authentication

Public DNS currently has MX, an SPF record, cPanel DKIM, a `mail._domainkey` record, Brevo domain-verification TXT and DMARC (`p=none`). No DNS was changed. Brevo-specific SPF authorization/alignment and Brevo DKIM/domain status could not be confirmed because the stored API credential returned HTTP 401. `notifications@airixmedia.com` sender verification therefore remains unproven.

Checklist before live sending:

- [ ] Replace/repair the Brevo API credential in the secure store.
- [ ] Confirm `notifications@airixmedia.com` is active in Brevo.
- [ ] Confirm Brevo reports `airixmedia.com` authenticated.
- [ ] Confirm the existing `mail._domainkey` record is the current Brevo value.
- [ ] Confirm SPF alignment/authorization using Brevo's current provider-facing value; change DNS only after separate approval.
- [x] Confirm DMARC exists and does not reject the approved sender configuration.

## Deployment and abuse controls

Launch topology is one persistent Node.js application process/container behind a reverse proxy, with no serverless runtime and no replica. The process-local limiter is accepted only for that topology: general default 8 requests/600 seconds, emergency default 3/900 seconds, maximum 10,000 buckets, independent IP and email fingerprints. Restarting clears buckets. A second instance is prohibited until Redis or another approved shared store replaces the process-local adapter. Same-origin protection, honeypot and explicit HTTP 429 remain. No CAPTCHA is approved.

No website production process currently runs on the inspected cPanel host. The approved application topology must be provisioned and verified separately; this task did not deploy the site.

## Attachments and handover

`CONTACT_ATTACHMENT_PROVIDER=disabled`. No form accepts, stores or delivers file bytes. Crafted uploads are rejected server-side. Private storage, malware scanning and retention are out of scope.

Operational handover requires: valid secret injection; sender/domain authentication; six synthetic staging deliveries; role-based receipt confirmations; reply-to verification; controlled emergency primary failure; fallback receipt; all-provider-failure UI proof; log/PII review; one-instance topology proof; and signed acceptance of emergency duty ownership/hours.
