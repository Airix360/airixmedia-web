# Atlas accessibility audit — W9

Target: WCAG 2.2 AA. Status: **technical review complete locally; owner/content review outstanding**.

W9 retains the semantic page hierarchy, skip link, keyboard-operable navigation, visible focus treatment, reduced-motion equivalent and descriptive public artwork alternatives. The local brief now uses an explicit error summary, moves focus to it, links each error to its field, and exposes `aria-invalid` plus field-specific messages. The W9 artwork controls are native buttons with `aria-pressed`; review images are intentionally decorative beside complete text records.

Automated Axe coverage includes representative public routes and all five W9 review routes, with no critical or serious findings. The complete Playwright matrix passed 175 tests with 25 intentional project-mode skips. Automated checks cannot approve alternative-text intent, cultural interpretation, reading ease or assistive-technology usability. Manual release checks still require VoiceOver form/menu review, high-contrast inspection and owner approval of artwork descriptions.
