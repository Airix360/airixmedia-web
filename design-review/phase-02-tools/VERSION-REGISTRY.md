# Design-tool version registry

Recorded: 2026-07-13

| Name | Source | Installed version or snapshot | Source commit | Location | Licence | Committed | Update command | Execution model |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `gpt-taste` | `Leonxlnx/taste-skill` | Unversioned skill snapshot | `b17742737e796305d829b3ad39eda3add0d79060` | `.agents/skills/gpt-taste` | MIT | Yes | `npx skills update gpt-taste` | Instructions only |
| `redesign-existing-projects` | `Leonxlnx/taste-skill` | Unversioned skill snapshot | `b17742737e796305d829b3ad39eda3add0d79060` | `.agents/skills/redesign-existing-projects` | MIT | Yes | `npx skills update redesign-existing-projects` | Instructions only |
| `brandkit` | `Leonxlnx/taste-skill` | Unversioned skill snapshot | `b17742737e796305d829b3ad39eda3add0d79060` | `.agents/skills/brandkit` | MIT | Yes | `npx skills update brandkit` | Instructions only |
| `imagegen-frontend-web` | `Leonxlnx/taste-skill` | Unversioned skill snapshot | `b17742737e796305d829b3ad39eda3add0d79060` | `.agents/skills/imagegen-frontend-web` | MIT | Yes | `npx skills update imagegen-frontend-web` | Instructions; may call approved image tools later |
| `image-to-code` | `Leonxlnx/taste-skill` | Unversioned skill snapshot | `b17742737e796305d829b3ad39eda3add0d79060` | `.agents/skills/image-to-code` | MIT | Yes | `npx skills update image-to-code` | Instructions only |
| Hallmark | `nutlope/hallmark` | Unversioned skill snapshot | `aeb42fb354ff4efa36ab475773a082315a3af2ce` | `.agents/skills/hallmark` | MIT | Yes | `npx skills update hallmark` | Instructions and reference catalogue |
| Impeccable | npm `impeccable`; `pbakaus/impeccable` | `3.2.1` | npm `gitHead` `0d1c34e9d0fcfff1070c7210cd808eda504105d7` | `.agents/skills/impeccable`, `.github/skills/impeccable` | Apache-2.0 | Yes | `npx impeccable update` | Instructions plus executable detector, hooks, and live tooling |
| shadcn skill | `shadcn-ui/ui` | Unversioned skill snapshot | `e25f651351ac014254da7b36e2d35e56494cd8b2` | `.agents/skills/shadcn` | MIT | Yes | `npx skills update shadcn` | Instructions only; no component runtime installed |
| Playwright | npm `@playwright/test` | `1.61.1` | Package lock resolution | `node_modules`; declared in `package.json` | Apache-2.0 | Lockfile already committed | `pnpm update @playwright/test` | Executable browser automation |
| Motion | npm `motion` | `12.42.2` | Package lock resolution | `node_modules`; declared in `package.json` | MIT | Lockfile already committed | `pnpm update motion` | Existing production animation runtime |
| Variant | External service | Not installed | Not applicable | External | Service terms apply | No | Not applicable | External visual exploration only |

## Installer provenance

- `skills` CLI version: `1.5.16`
- Impeccable npm integrity: `sha512-Lnh8BeLNj493iYuKRijVLP5nvdeKvReYtqGeov6tfsqECiKDSHBY5JfkxzfsC912AASMreCwzha0ZY3PC2pw+g==`
- Source repository heads were queried immediately after installation. For unversioned skills, the commit plus the content hash in `skills-lock.json` is the reproducibility record.
