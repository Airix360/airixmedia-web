# Functional Integration W8

## Enquiry and project brief

Discuss and Contact provide accessible labelled fields and native validation. The
form uses `preventDefault`, sends no request, stores nothing and creates only an
in-memory summary. The result is explicitly labelled “Prepared locally — not sent”
and links into verified email and WhatsApp channels.

## Booking, status and portal

No calendar provider, availability source or booking endpoint is verified, so Book
contains no slots, holds or confirmation. Status contains no simulated incidents or
uptime. Client Portal remains an external operating access point.

## Missing production integrations

CRM, calendar, transactional email, Chatwoot, uploads, status, analytics, consent,
retention, spam protection and legal controller language remain W9 blockers. No
secret or sensitive-data logging was added.

## Public verification gate

The production crawl on 15 July 2026 resolved all 36 canonical sitemap URLs with
HTTP 200. Five legacy paths returned permanent redirects to their documented W8
destinations. Eight representative routes exposed a title, description, canonical
URL and organisation structured data. `robots.txt` allows public routes and blocks
`/api/`, `/preview/` and `/internal/`. Public component/source inspection found no
source-master or raw-generated path, and Playwright confirmed the responsive runtime
requests use WebP derivatives only.
