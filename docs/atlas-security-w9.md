# Atlas security review — W9

Scope: Next.js public prototype and local review workspace. No production infrastructure or secret inspection was performed.

W9 disables the mock lead-submission success path: `POST /api/leads` now returns an explicit non-cacheable 503 and never claims a record was created. Public forms remain local-only. `.env.example` contains configuration names and non-secret review defaults only. Internal review routes contain no credentials and make no external requests.

Response headers now include CSP, HSTS in production, `frame-ancestors 'none'`, `X-Frame-Options: DENY`, nosniff, strict referrer policy, a restrictive permissions policy, COOP and disabled DNS prefetch. The CSP excludes `unsafe-eval`, remote scripts, remote images, framing and objects; Next’s current inline boot/theme/JSON-LD scripts require `script-src 'unsafe-inline'`. A nonce/hash CSP is a documented hardening follow-up before accepting user data or privileged sessions.

The first production dependency audit identified one moderate PostCSS advisory through Next. W9 added a workspace override to PostCSS ≥8.5.10; the repeated `pnpm audit --prod` reports **no known vulnerabilities**.

Remaining release checks: secret scan, staging headers inspection, malformed/oversized request tests if an API is enabled, origin/rate-limit/spam controls for any future submission endpoint, upload isolation, provider webhook verification, log redaction, dependency-update ownership and incident/rollback ownership. Security certifications or guarantees are not claimed.
