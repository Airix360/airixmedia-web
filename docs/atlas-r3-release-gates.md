# Atlas R3 release gates

Date: 23 July 2026
Version: `2.4.0.0`
Status: **technical baseline merged; deployment blocked**

## Merged baseline

The Atlas R3 technical and operational baseline is merged into `main` with its implementation and review history preserved.

The completed operational decisions are:

- Contact delivery P1: closed.
- Emergency technical-delivery P1: closed.
- Emergency operational-coverage P1: closed.

## Remaining P1 release gates

Public deployment remains blocked until both of these approvals are complete:

- qualified legal review;
- artwork cultural, landmark and rights clearance.

No public launch tag, GitHub release or version tag may be created until both remaining P1s are closed.

## Production constraints

- Deployment must use one persistent Node.js application instance behind the approved reverse proxy.
- Horizontal scaling is prohibited until an approved shared rate-limit store replaces the process-local adapter.
- Attachments remain disabled.
- Production secrets must be injected from the secure runtime secret store. They must not be committed, logged, exposed to the browser or included in review evidence.

This document records merge readiness only. It does not authorize deployment, DNS changes or a public release.
