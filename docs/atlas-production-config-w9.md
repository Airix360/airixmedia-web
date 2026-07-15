# Atlas production configuration — W9

Version: `2.0.0.1`. Build target: Next.js standalone output. W9 does not deploy or change DNS, Cloudflare, tunnels, portal or Dell configuration.

Required public setting: `NEXT_PUBLIC_SITE_URL` set to the approved HTTPS canonical origin. `FX_NGN_USD` and `FX_NGN_EUR` are review fallbacks only; production regional estimates require an approved exchange-rate source and pricing policy. No CRM, calendar, chat, upload, analytics or CMS credential is active. See `.env.example`.

Verified public configuration in the current content record: canonical site `https://airixmedia.com`; portal `https://portal.airixmedia.com`; email `hello@airixmedia.com`; Nigerian telephone/WhatsApp `+234 905 091 7937`; emergency public route `/support/emergency`. Reconfirm ownership and operating coverage immediately before staging. W9 ran on Node `v26.0.0` and pnpm `11.12.0`; CI/production must use a supported Node release meeting the project’s ≥22.12 baseline and the frozen pnpm lockfile.

Build with `pnpm install --frozen-lockfile && pnpm check && pnpm test:e2e`. Run the standalone server behind an HTTPS reverse proxy, preserve trusted host/proxy headers, serve immutable Next/static assets with caching, keep HTML revalidation intentional, forward health probes to `/health`, and verify `/health` reports `2.0.0.1`. Confirm CSP/HSTS at the public origin, request-size/time limits, logs without sensitive form data, process restart policy and rollback artefact retention.
