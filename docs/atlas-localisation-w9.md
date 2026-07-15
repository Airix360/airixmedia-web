# Atlas localisation audit — W9

Status: **not launch-ready for French or Portuguese**.

English is the only complete public journey. `/fr` and `/pt` contain earlier critical-route drafts, but navigation coverage, page-family coverage, legal text, accessibility QA and content parity are incomplete. W9 therefore removes misleading global `hreflang` declarations and adds `noindex, nofollow` metadata to both locale trees. English remains the unprefixed canonical experience.

Before enabling a locale: translate and owner-review navigation, homepage, publishing hub, pricing, project brief, contact/booking handoff, footer and essential legal content; hide every untranslated secondary route; verify language attributes and fallback; test manual selection persistence and browser-language detection; validate dates, currency labels, telephone formatting and terminology; then add reciprocal `hreflang` only for genuinely equivalent pages.
