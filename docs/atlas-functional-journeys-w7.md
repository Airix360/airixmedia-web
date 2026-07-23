# Atlas Functional Journeys W7

## Field inventory

Gateway route selector: seven service/uncertain routes. Contact: name, email, enquiry route, message. Booking: meeting purpose, service family, project stage, preferred time zone, preferred timing, and optional preparation notes.

## Validation

Contact requires a name, syntactically plausible email, and at least 20 message characters. Booking requires purpose, service family, stage, time zone, and timing. Errors remain beside controls and in a `role=alert` summary; values are not cleared. Native types support email input. Controls are keyboard and touch accessible.

## Submission and persistence guarantee

Both forms use client-side `preventDefault`, contain no form action, never call `fetch`, never call `/api/leads`, never write local/session storage, never invoke email or calendar APIs, and never show a sent/received/appointment success state. The only result is an in-memory preview. Every journey states: **“Internal review — no information is transmitted.”** Reloading discards all review form state.

## Verified and missing contact details

Verified repository records: `hello@airixmedia.com`, Nigerian phone/WhatsApp `+234 905 091 7937`, US WhatsApp record, and client portal URL. Missing: postal/street address, verified offices, opening hours, response times, availability window, countries-of-operation statement, collaboration policy, and channel-specific retention.

## Privacy, consent and legal gaps

Final controller/entity identity, lawful basis, consent wording, privacy notice, purpose limitation, retention, deletion, data-subject rights, international transfers, processor list, cookie/analytics relationship, sensitive-data policy, minors policy, booking cancellation terms, recording policy, and accessibility statement need legal review. Review copy warns against sending secrets but is not final legal advice.

## Future integration requirements

Lead/contact: approved server endpoint, Twenty/CRM configuration, payload mapping, authentication, secret management, duplicate handling, transactional email, delivery/failure reporting, consent capture, retention, deletion, auditability and monitoring. Booking: approved provider, host/calendar ownership, duration, buffers, time zones, real availability, holds, expiry, cancellation/rescheduling, reminders, webhook verification, idempotency, fallback and outage states.

## Security and abuse prevention

Production needs server validation, rate limits, CSRF/origin strategy, honeypot and risk-based spam controls, upload prohibition or isolated scanning/storage, log redaction, payload size limits, HTML/URL sanitisation, dependency failure handling, no secrets in client bundles, restricted operational access, and incident/abuse monitoring. W7 adds no backend.
