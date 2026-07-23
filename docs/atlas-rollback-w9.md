# Atlas rollback plan — W9

W9 base: `build/atlas-public-integration-w8` at `7d46e60dea68ee6a9caad2139eb7f3a0fea77f59`.

No deployment is authorised in this sprint. For a future staged release, produce an immutable build/image tagged with commit SHA and version, retain the previously healthy W8 artefact, record environment/config checksums without secret values, and test both forward and rollback health checks before exposure.

Rollback triggers include elevated 5xx/404 rates, CSP breakage, missing artwork, navigation/form regression, canonical/sitemap leakage, accessibility blockers, unacceptable Core Web Vitals or accidental publication of review content. Repoint the deployment to the last healthy artefact; do not rewrite Git history or mutate databases as part of a static-site rollback. Verify homepage, health, critical routes, robots, sitemap and local-only form messaging after rollback. Escalate content/artwork/legal defects rather than masking them with an infrastructure rollback.
