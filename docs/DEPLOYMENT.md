# Deployment

## Prototype

Build with the multi-stage Dockerfile or run through Compose. `/health` provides a container health check. Keep the public site and portal separately deployable.

## Production direction

Place the container behind a reverse proxy that forwards trusted country headers, request IDs, protocol, and host. Store secrets outside the repository. Persist only data required by future retry queues, attachments, audit evidence, or CMS media.

GitHub Actions runs lint, type-check, unit tests, and build. A later approved deployment workflow should build an immutable image, deploy to staging, run smoke tests, promote by digest, and retain the previous digest for rollback.

No Dell, Cloudflare, DNS, tunnel, portal, or production deployment is authorised by this prototype.
