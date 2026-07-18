# Contact production readiness, R3

Review date: 18 July 2026  
Review base: `4594c6f08b34c36b77096ea39a21667b67499851`  
Status: **not ready to receive live form submissions**

## Current behaviour

The six public contact choices are distinct and understandable: Discuss a Project, Publishing Enquiry, Book a Consultation, General Enquiry, Technical Support and Emergency Support. Query links open the correct accessible dialog, service links preselect the correct service, client-side and server-side Zod validation agree, dialogs retain entries during the current visit, and invalid submissions never display success.

`POST /api/leads` currently validates same-origin requests, rejects the honeypot field, validates the selected form, limits declared attachments to 10 MB and an allowlist of MIME types, then calls `submitContactEnquiry`. No approved provider adapter exists. With the repository's current environment, a valid request returns HTTP 503 with `provider_not_configured` and the explicit message that the enquiry was not sent.

## Missing provider and integration point

The integration point is `src/lib/contact-submission.ts`. `CONTACT_SUBMISSION_PROVIDER` is read, but every non-empty value currently returns `provider_not_supported`. There is no production-capable value that can be added to the environment without implementing and approving an adapter.

Recommended production direction:

1. Use a server-side Twenty CRM adapter as the system of record for project, publishing and general enquiries.
2. Add an approved transactional notification provider for staff acknowledgement and routing. Email must not be treated as the only durable record.
3. Route technical support to the approved client-support or ticket system.
4. Route emergency submissions to a monitored incident channel with an explicit ownership rota. Do not rely on the ordinary CRM queue.
5. Keep consultation requests as requests until an approved calendar adapter confirms availability.

This recommendation does not authorise a provider, create an account or select a data region.

## Required secrets and configuration

No live secrets are present or required by the current mock. The chosen implementation will need server-only values. A likely Twenty integration would require an approved API origin and API key. A notification adapter would require its own server API key, verified sender and approved recipients. Booking, upload, spam and emergency providers will require separate server credentials where applicable.

Proposed names such as `TWENTY_API_URL`, `TWENTY_API_KEY`, `CONTACT_NOTIFICATION_FROM`, `CONTACT_NOTIFICATION_TO`, `UPLOAD_BUCKET`, `TURNSTILE_SECRET_KEY` and calendar credentials are implementation recommendations, not currently supported variables. None should use a `NEXT_PUBLIC_` prefix.

## Validation required before go-live

- Preserve the current typed server validation and same-origin check.
- Add per-IP and per-identity rate limits with privacy-aware retention.
- Validate the declared file type and the actual file signature.
- Scan retained attachments for malware before staff access.
- Reject unexpected fields and cap field lengths at the server boundary.
- Normalise URLs, phone numbers, dates and time zones without silently changing meaning.
- Record consent text and policy version with each accepted enquiry.
- Test provider timeouts, retries, idempotency and duplicate submission handling.
- Return a reference only after the system of record accepts the request.
- Keep failure language explicit. Never show success after only queuing a browser request.

## Attachment handling

The browser accepts PDF, PNG, JPEG, WebP and plain-text files. The API validates declared type and size, but it discards the bytes and passes only name, type and size metadata to the unconfigured adapter. **Live file upload is not implemented.**

Production attachment handling needs encrypted object storage in an approved region, short-lived upload or retrieval URLs, file-signature validation, malware scanning, access logging, retention/deletion rules and a clear maximum. CRM records should link to controlled objects rather than copy unrestricted files into notifications.

## Booking limitation

Book a Consultation records a preferred date, time window and time zone, but no calendar availability is read and no event is created. The wording correctly says that a request is not a confirmed appointment. Production booking needs an approved calendar adapter, availability rules, conflict handling, confirmation, cancellation and time-zone tests.

## Support and emergency limitations

Technical Support does not create a ticket, associate a client agreement or notify an assigned operator. Emergency Support does not page, call, text or otherwise escalate to a monitored incident channel. Both currently reach the same unavailable endpoint. This is a launch blocker because a visitor could complete an urgent report that cannot be delivered.

The emergency route must retain its warning about chargeable work and lack of guaranteed resolution, but it also needs a clearly monitored channel, operating ownership and a tested fallback when the primary provider is unavailable.

## Spam protection

Current controls are same-origin validation and a honeypot. There is no rate limit, abuse reputation, challenge, duplicate control or provider-side suppression. Before enabling public submission, add server-side rate limiting and an approved privacy-conscious challenge such as Cloudflare Turnstile where risk warrants it. The form must remain usable with assistive technology and must handle challenge failure without losing the draft.

## Logging and notification routing

No durable accepted-submission log exists. Production logging should record a generated reference, form type, source route, provider result, timestamps and routing outcome without copying message bodies or secrets into application logs. Define retention and access ownership before collection.

Recommended routing matrix:

| Form | System of record | Notification route | Production state |
|---|---|---|---|
| Discuss a Project | CRM opportunity | New-business owners | Missing |
| Publishing Enquiry | CRM opportunity with publishing interest | Publishing practice owners | Missing |
| Book a Consultation | CRM plus calendar request | Assigned consultant | Missing |
| General Enquiry | CRM person/activity | General inbox owner | Missing |
| Technical Support | Ticket/support system | Agreement owner or support queue | Missing |
| Emergency Support | Incident system | Monitored on-call route plus fallback | Missing |

## Privacy implications

Enabling forms will create a new live personal-data collection flow. Before that happens, qualified legal review must confirm the controller identity, registered address and jurisdiction; lawful bases; provider and subprocessor records; international transfers; retention and deletion schedules; data-subject contact route; attachment handling; incident notification; and the policy version stored with consent. The current public Privacy, Data Processing and Subprocessors pages explicitly leave these fields unresolved.

## Go-live checklist

- [ ] Approve the production provider and processing region.
- [ ] Complete and review the provider adapter.
- [ ] Add server-only credentials through the deployment secret store.
- [ ] Complete the legal controller, privacy, DPA and subprocessor records.
- [ ] Implement rate limiting, abuse controls and operational monitoring.
- [ ] Implement attachment storage, scanning, access and deletion, or remove file fields.
- [ ] Implement consultation booking handoff, or keep it explicitly request-only.
- [ ] Implement support ticket creation and agreement-aware routing.
- [ ] Implement emergency escalation, fallback and owner rota.
- [ ] Test accepted, rejected, timeout, duplicate, retry and provider-outage states.
- [ ] Verify notification recipients and least-privilege provider access.
- [ ] Run end-to-end tests against a non-production provider environment.
- [ ] Confirm that an accepted enquiry appears in the system of record and reaches the correct owner.

Until every checked item relevant to the enabled forms is complete, keep the endpoint unavailable or replace the forms with a clearly labelled verified direct contact channel.
