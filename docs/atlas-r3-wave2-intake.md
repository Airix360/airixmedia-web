# Atlas R3 Wave 2 intake

External source root: `/Users/hendrix/airix-atlas-r3-source/Production/Services/`.

Twelve source masters were generated and technically validated on 2026-07-17. They remain external and have not been integrated into public routes. Technical intake does not establish owner, cultural, rights, landmark or launch approval.

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

## Received source-master record

Visual inspection confirms each file is one standalone scene with no visible readable text, logo, route label, state label, watermark, split panel or comparison board. Pair-composition and mobile-crop results are manual visual checks supported by the validator's matching dimensions and perceptual-difference result.

| Route / source master | Received | Dimensions / format | SHA-256 | Standalone / text / logo | Pair composition / mobile crop | Luminance / pair difference | Integration readiness | Human-review status |
|---|---|---|---|---|---|---|---|---|
| `/services/digital-experiences` · `Digital-Experiences/digital-experiences-day-master.png` | yes | 1536×1024 PNG | `38db1dcc41350db01f29aafb64b43c4f415b307031d2a7b57f47f7c032e58284` | pass / pass / pass | pass / pass | 122.08 / 64.24 | technical intake pass; runtime integration not started | pending owner, cultural, rights and launch review |
| `/services/digital-experiences` · `Digital-Experiences/digital-experiences-night-master.png` | yes | 1536×1024 PNG | `f9fb3164afaaa858ac025e15d8f9ee702af47b2ba847d483d5d60af2085197ef` | pass / pass / pass | pass / pass | 54.62 / 64.24 | technical intake pass; runtime integration not started | pending owner, cultural, rights and launch review |
| `/services/business-systems` · `Business-Systems/business-systems-day-master.png` | yes | 1536×1024 PNG | `e9f763546f7db1b0a5ef0cd0afba62e06ea80b0ea05e9ecd28359d8f1c8b6e29` | pass / pass / pass | pass / pass | 98.31 / 43.42 | technical intake pass; runtime integration not started | pending owner, cultural, rights and launch review |
| `/services/business-systems` · `Business-Systems/business-systems-night-master.png` | yes | 1536×1024 PNG | `9eca58b0325ffbffc289cc53884ac1f1f9d1fe62eef20171bea98b1c8fbd873b` | pass / pass / pass | pass / pass | 51.46 / 43.42 | technical intake pass; runtime integration not started | pending owner, cultural, rights and launch review |
| `/services/managed-infrastructure` · `Managed-Infrastructure/managed-infrastructure-day-master.png` | yes | 1536×1024 PNG | `035205b3c3ac8f44028311bacdac5e7eed7f46defffb898107b274ef37e1b751` | pass / pass / pass | pass / pass | 130.56 / 84.86 | technical intake pass; runtime integration not started | pending owner, cultural, rights and launch review |
| `/services/managed-infrastructure` · `Managed-Infrastructure/managed-infrastructure-night-master.png` | yes | 1536×1024 PNG | `6f2d5b667f0b54c250a45718811fc316467d58b28690d3392cdfde3587008850` | pass / pass / pass | pass / pass | 39.29 / 84.86 | technical intake pass; runtime integration not started | pending owner, cultural, rights and launch review |
| `/services/support-recovery` · `Support-Recovery/support-recovery-day-master.png` | yes | 1536×1024 PNG | `7ebba4e85f83d152cbe38c332402ff0a777bc38842a410200cbbfb5553ad9ab1` | pass / pass / pass | pass / pass | 117.72 / 69.16 | technical intake pass; runtime integration not started | pending owner, cultural, rights and launch review |
| `/services/support-recovery` · `Support-Recovery/support-recovery-night-master.png` | yes | 1536×1024 PNG | `7cf7604ac921e870731169f43e05e1f8315e54fd35f49f5a90e3ebcd9140868d` | pass / pass / pass | pass / pass | 44.43 / 69.16 | technical intake pass; runtime integration not started | pending owner, cultural, rights and launch review |
| `/support` · `Support/support-day-master.png` | yes | 1536×1024 PNG | `5903123b60637dafd30f79fb4157b234f4045028e1cdeae7a7518e6b67be4948` | pass / pass / pass | pass / pass | 114.18 / 61.64 | technical intake pass; runtime integration not started | pending owner, cultural, rights and launch review |
| `/support` · `Support/support-night-master.png` | yes | 1536×1024 PNG | `7c608e2867bd826b85dc9eab729267ef901b944f090bc68aab4f81597a4f041b` | pass / pass / pass | pass / pass | 47.90 / 61.64 | technical intake pass; runtime integration not started | pending owner, cultural, rights and launch review |
| `/support/emergency` · `Emergency/support-emergency-day-master.png` | yes | 1536×1024 PNG | `0db0fbfd7700de3a2a80c852232d07d6b44f755b07333c9939888d5b06dd3bb2` | pass / pass / pass | pass / pass | 150.87 / 102.85 | technical intake pass; runtime integration not started | pending owner, cultural, rights and launch review |
| `/support/emergency` · `Emergency/support-emergency-night-master.png` | yes | 1536×1024 PNG | `c3ba7b0960e0c8bec3ee07aadf7224eee0c1a0f1702af563f6100d6949be8a18` | pass / pass / pass | pass / pass | 42.26 / 102.85 | technical intake pass; runtime integration not started | pending owner, cultural, rights and launch review |

The private sequential review page is external at `/Users/hendrix/airix-atlas-r3-source/Production/Services/Review/index.html`. It displays every source as its own image element and makes no approval claim.
