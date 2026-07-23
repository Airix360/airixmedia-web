# R3 asset naming and source directory specification

Source masters belong outside this repository:

```text
/Users/hendrix/airix-atlas-r3-source/Production/
  Priority/{Atlas,Discuss,Contact,Book}/
  Services/
  Publishing/
  Open-Source/
  Legal/
```

The source-master pair for route slug `x` is `x-day-master.png` and `x-night-master.png`. Runtime derivatives are `x-day.webp` and `x-night.webp`, delivered only from `public/atlas/heroes/` after review. Names are lowercase, hyphenated, route-derived, and contain no state, client, prompt, space, or version term.

| Route family | Slug |
|---|---|
| `/atlas`, `/discuss`, `/contact`, `/book` | `atlas`, `discuss`, `contact`, `book` |
| Service detail routes | `services-digital-experiences`, `services-business-systems`, `services-managed-infrastructure`, `services-support-recovery` |
| Operational routes | `support`, `support-emergency`, `knowledge-base`, `status`, `security`, `service-levels` |
| Publishing details | `publishing-hosting-support`, `publishing-editorial-support`, `publishing-plugins`, `publishing-projects`, `publishing-resources` |
| Open source details | `open-source-paystack-ojs`, `open-source-ojs-magic-login`, `open-source-submission-fee`, `open-source-multipay`, `open-source-request-waiver` |
| Legal | `legal`, `terms`, `privacy`, `cookies`, `accessibility`, `acceptable-use`, `service-terms`, `data-processing`, `subprocessors` |

Each delivery record must include master SHA-256, derivative SHA-256, source/runtime dimensions, byte size, day/night assignment, focal point, landmark/environment, relationship warning, and review status. The implementation repository never receives PNG masters.
