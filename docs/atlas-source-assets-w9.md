# Atlas source assets — W9

All active public artwork remains **candidate material**. No asset is approved, final or publishable by implication.

The W8 Lagos/Oyo/Rivers masters came from `thathman/-airix-atlas`, branch `assets/atlas-public-w8`, commit `16fcb3ae818223a1b019b63d1e57e9193382647c`, root `w8-source`. Edo, Kaduna, Plateau and Ogun masters and manifests live under `public/images/atlas/states/<state>/<family>/source` and record generation method, anchors, sensitivities, simplifications, defects and review status. Web derivatives are local WebP files; source masters are never requested by public routes.

W9 adds only mechanical 640×800 WebP derivatives for eight active older families. It does not generate, repaint or culturally reinterpret artwork. The private register at `/internal/w9-review/artwork` records every active ID, route family, desktop/mobile/tablet/thumbnail derivative, source reference, byte size, focal point, safe zone, anchors and known defect class.

Required approval chain: owner composition review; culturally informed geographic/infrastructure review; rights/provenance confirmation; defect inspection at source resolution; final crop/alt-text review; then an explicit manifest status change in a later approved sprint.

Final storage recommendation: keep canonical editable/source masters in the creative repository, not the implementation runtime; use Git LFS only after repository-size and hosting limits are approved; retain an access-controlled archival copy; record SHA-256 checksums, origin/generation method, date, rights, reviewer and supersession in each manifest; reproduce runtime WebPs from a versioned derivative script; and handle replacement through a new asset ID, explicit human approval record, manifest update, responsive regeneration and regression capture. W9 performs no destructive migration or history rewrite.
