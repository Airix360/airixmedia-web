# Discovery

## Sources inspected

- Current Airix Media website, indexed pages, pricing, services, cases, and policies
- `hendrix.com.ng` public portfolio
- Public `portal.airixmedia.com` landing page
- Public and authorised GitHub repository inventory for `thathman`
- Read-only Cloudflare metadata from the Dell credential store

## Verified findings

- Public positioning is currently dominated by OJS and does not represent the full requested business.
- The portal publicly verifies projects, approvals, and billing only.
- Public repositories verify OJS payment, access, fee, and waiver engineering.
- Airix 360 owns the `airixfood.com`, `airixmedia.com`, and `airixstore.com` zones.
- The older Airix account owns `domj.org`, `eftbhs.com`, `hendrix.com.ng`, and `kujournals.ac.ug`.

## Access limitations

- The current site’s browser-verification layer blocks direct automated `robots.txt` and sitemap retrieval.
- No authenticated portal workspace was inspected.
- Cloudflare access remained read-only; no DNS, tunnel, Worker, Pages, or SSL state changed.
