# Atlas performance audit — W9

W8 baseline: desktop Lighthouse 99/100/100/100 with 0.9 s LCP; mobile 90/100/100/100 with 3.5 s LCP and zero CLS. W9 preserves the public composition.

W9 found eight active older state families whose mobile `<source>` paths resolved to absent 640×800 derivatives. It adds those derivatives at 41–72 KB each, preventing broken mobile art and avoiding the 112–197 KB 960×1200 fallback. Across all active families, desktop derivatives are 171–245 KB, tablet derivatives 85–165 KB, 960×1200 mobile derivatives 112–256 KB, compact mobile derivatives 41–100 KB and thumbnails 17–31 KB.

Production-mode Lighthouse 13 results on the local final candidate: desktop **95/100/96/100**, LCP 1.1 s, CLS 0; three mobile runs produced performance 89, 95 and 94 (median **94**) with a representative **94/100/96/100**, LCP 3.0 s, CLS 0. Scores are Performance/Accessibility/Best Practices/SEO. The cold-run performance variation is retained as evidence rather than discarded; staging must repeat the audit behind the real proxy/CDN.

The representative median clears the launch gate of Performance ≥90, Accessibility ≥95, Best Practices ≥95 and SEO ≥95. Screenshot evidence is recorded in `output/playwright/atlas-launch-w9/`; external infrastructure and CDN behaviour remain staging responsibilities.
