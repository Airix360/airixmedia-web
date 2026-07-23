# Atlas launch checklist — W9

## Technical merge gate

- [x] lint, typecheck, unit tests, production build and complete Playwright suite pass on the final commit
- [x] representative Axe checks have no critical/serious findings
- [x] Lighthouse reaches ≥90 performance and ≥95 accessibility/best-practices/SEO on the representative production-mode median
- [x] 1440, 1280, 1024, 768, 390 and 360 evidence is reviewed in light/dark/reduced-motion modes
- [x] every active mobile derivative returns successfully; no source master is requested publicly
- [x] unknown detail routes return 404; redirects, canonicals, robots, sitemap and noindex boundaries pass
- [x] CSP/headers, explicit 503 lead API and dependency audit are reviewed

## Owner/staging gate

- [ ] artwork owner, cultural and rights decisions are recorded
- [ ] legal and entity content is approved
- [ ] OJS pricing/effective-date and KU Journals use are approved
- [ ] production integrations and failure ownership are approved
- [ ] French/Portuguese critical journeys are complete or excluded from launch
- [ ] staging environment, monitoring, health probe and immutable rollback are rehearsed

Unchecked owner/staging items block launch even when local checks pass.
