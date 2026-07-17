# Atlas R3 Wave 2 intake

External source root: `/Users/hendrix/airix-atlas-r3-source/Production/Services/`.

Wave 2 is preparation-only. No source masters have been integrated into public routes, and missing files are expected to report `missing-source-master` without failing workspace preparation.

| Route | External folder | Required day master | Required night master | Visual assignment |
|---|---|---|---|---|
| `/services/digital-experiences` | `Digital-Experiences/` | `digital-experiences-day-master.png` | `digital-experiences-night-master.png` | Human movement, wayfinding and accessible service touchpoints in a contemporary Nigerian public or cultural environment. |
| `/services/business-systems` | `Business-Systems/` | `business-systems-day-master.png` | `business-systems-night-master.png` | Records, transactions, routing and accountable handoffs in a dependable operational environment. |
| `/services/managed-infrastructure` | `Managed-Infrastructure/` | `managed-infrastructure-day-master.png` | `managed-infrastructure-night-master.png` | Port, quay, plant or water-linked infrastructure with maintenance, monitoring and visible ownership. |
| `/services/support-recovery` | `Support-Recovery/` | `support-recovery-day-master.png` | `support-recovery-night-master.png` | Repair, fault isolation and restoration activity, visually distinct from managed infrastructure. |
| `/support` | `Support/` | `support-day-master.png` | `support-night-master.png` | Calm operational coordination, maintenance and assistance around real systems. |
| `/support/emergency` | `Emergency/` | `support-emergency-day-master.png` | `support-emergency-night-master.png` | Urgent but controlled technical intervention, with urgency expressed through night lighting rather than disaster theatre. |

## Locked production rules

- Generate one route at a time: day, inspection, exact-composition night transformation, validation, then recorded hashes and dimensions.
- Preserve Gongbi influence, Atlas palette, standalone 1536×1024 landscape composition and contemporary Nigerian context.
- Do not include readable generated text, logos, labels, comparison boards, collages, floating screens, fake interfaces or dashboard overlays.
- Day and night must use the exact same composition; lighting is the variable.
- Automated validation establishes technical intake only. It never establishes cultural, rights, landmark, owner or launch approval.

Run `python3 scripts/validate-atlas-r3-wave2.py`. The report is written to `output/atlas-r3-wave2-intake-report.json`; absent masters remain non-fatal.
