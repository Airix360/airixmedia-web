# Atlas SEO audit — W9

The English public architecture exposes only explicit records. W9 removes generic detail fallbacks so invented `/insights/*`, `/resources/*` and `/work/*` slugs return 404 instead of producing unlimited thin pages. The sitemap contains explicit English routes only and no longer assigns the build time as a misleading universal modification date.

Global metadata provides title, description, canonical, Open Graph and Twitter summary fields. Organization JSON-LD contains only brand name, canonical site URL and public email. Incomplete French/Portuguese trees and every `/internal/` review route are noindexed; robots blocks `/api/`, `/preview/` and `/internal/`; internal routes are absent from the sitemap and public navigation. Global `hreflang` is withheld until locale parity exists.

Blockers: approve social-sharing artwork before adding an OG image; approve legal/entity details before enriching Organization schema; validate production origin, redirects, 404s, rendered canonicals and sitemap after staging deployment.
