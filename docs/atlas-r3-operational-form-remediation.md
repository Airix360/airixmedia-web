# Atlas R3 operational form remediation

- Source: `4bc5f85737ca88cf0dade638faede25d72171b09`
- Branch: `feat/atlas-r3-form-delivery-emergency-routing`
- Version: `2.4.0.0`
- Original P1s: six unavailable form routes; no monitored emergency delivery/escalation.

## Implementation

`src/lib/contact-submission.ts` defines typed contact and emergency provider boundaries, validated environment configuration, Brevo and deterministic non-production mock adapters, independent routing, safe email rendering, random public references, emergency fallback and PII-safe structured events. `src/lib/contact-rate-limit.ts` supplies the replaceable process-local abuse-control boundary. `src/app/api/leads/route.ts` retains origin/honeypot controls, submits only schema-clean values, rejects unsupported uploads and maps failures truthfully. The existing form layout is retained; only submission feedback and the disabled upload state changed.

The Brevo request uses `POST https://api.brevo.com/v3/smtp/email`, server-only `api-key` authentication, plain-text plus accessible escaped HTML, configured sender/recipients, validated requester reply-to and a bounded timeout. Provider errors are reduced to safe categories.

## Security and operational ownership

No credentials, recipient addresses, raw provider errors, message bodies, phone numbers or files enter public responses/evidence/logs. Header fields reject newlines and subjects are normalised. URLs, phone, dates, field lengths, extensions and declared MIME types are bounded. File input remains unavailable pending storage/scanning approval.

Operations must designate and monitor each mailbox, establish an emergency rota and fallback, approve Brevo/legal processing details, choose a shared rate limiter before horizontal scaling, and own retention/deletion. Email delivery is not a ticket or incident record.

## Verification and closure

Unit tests cover configuration, parsing, escaping, headers, routing, references, provider response modes, emergency primary/fallback, validation, rate limiting, honeypot/origin and attachments. Browser evidence covers every form's mocked success plus failure, rate-limit, fallback, mobile, keyboard and privacy-link states. Audits are written to `output/playwright/atlas-r3-operational-forms/` without secrets or personal submissions.

Deployment checklist: configure secrets; verify sender; approve logical recipient lists; confirm monitored emergency ownership; run controlled staged deliveries; force emergency fallback; inspect logs and acknowledgements; validate readiness; confirm sitemap/redirect/canonical/artwork hashes; then obtain owner/security/legal operations approval. Roll back by removing provider selection/credentials to fail closed.

Contact delivery and emergency technical routing are closed by the staged live verification. Airix Media Operations has formally accepted emergency operational coverage for the documented monitoring window and fallback arrangement, closing the third operational P1. Legal and artwork P1 states are unchanged.

## Production configuration follow-up

Approved sender, role routing, monitoring hours, fallback semantics and single-instance topology are recorded in `docs/atlas-r3-production-operations-decisions.md`; the non-secret runtime template is `config/airixmedia-production.env.example`. The secure Brevo credential now authenticates. All six marked form routes, requester Reply-To, references, cPanel receipts, controlled emergency fallback and deterministic all-provider failure passed. No public deployment or DNS change occurred. Human duty monitoring and production topology remain unconfirmed.
