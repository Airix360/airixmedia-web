# Airix Media Web

Version `2.1.0.0` of the Airix Atlas public-site prototype. It positions Airix Media as a boutique creative technology studio and digital operations partner across websites, business systems, publishing technology, infrastructure, support, and recovery.

## Run locally

```bash
cp .env.example .env
pnpm install
pnpm dev
```

Open `http://localhost:3000`. Integrations default to mock mode and make no external CRM, calendar, Chatwoot, Cloudflare, portal, or production changes.

## Quality checks

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
pnpm test:e2e
```

## Content integrity

All structured claims carry an evidence state. Production output is limited to `verified` and `owner_confirmed` content. Local review may show `inferred_needs_review` and `placeholder` with visible labels; `do_not_publish` is always excluded.

## Architecture

- Next.js App Router and TypeScript
- Local typed content with CMS adapter direction
- System, light, and dark appearance support
- English canonical routes with French and Portuguese critical journeys
- Regional-pricing simulation with final billing-country confirmation
- Mock server adapters for Twenty CRM and future operational integrations
- Docker standalone output and CI quality gates

See [PRODUCT.md](./PRODUCT.md), [DESIGN.md](./DESIGN.md), and [docs](./docs) for strategy, evidence, deployment, and owner-review requirements.
