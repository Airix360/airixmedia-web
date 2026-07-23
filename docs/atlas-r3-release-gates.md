# Atlas R3 release gates

Date: 23 July 2026
Version: `2.4.0.0`
Status: **approved for production deployment**

The technical baseline was merged with deployment blocked pending two owner-governed
publication approvals. The final approval addendum below closes those gates without
erasing that historical decision.

## Merged baseline

The Atlas R3 technical and operational baseline is merged into `main` with its implementation and review history preserved.

The completed operational decisions are:

- Contact delivery P1: closed.
- Emergency technical-delivery P1: closed.
- Emergency operational-coverage P1: closed.

## P1 release gates at baseline merge

Public deployment was blocked until both of these approvals were complete:

- qualified legal review;
- artwork cultural, landmark and rights clearance.

No public launch tag, GitHub release or version tag was permitted while either P1
remained open.

## Production constraints

- Deployment must use one persistent Node.js application instance behind the approved reverse proxy.
- Horizontal scaling is prohibited until an approved shared rate-limit store replaces the process-local adapter.
- Attachments remain disabled.
- Production secrets must be injected from the secure runtime secret store. They must not be committed, logged, exposed to the browser or included in review evidence.

## Final owner approval addendum — 23 July 2026

The owner has recorded the following final approvals:

- Qualified legal review: **approved**.
- Artwork cultural review: **approved**.
- Artwork landmark/location review: **approved**.
- Artwork usage-rights review: **approved**.

The resulting release classification is:

- Legal P1: **closed**.
- Artwork P1: **closed**.
- P0: **0**.
- P1: **0**.
- P2: **3**.
- P3: **3**.

The site is approved for production deployment. The approval is conditional on the
documented production topology and controls remaining in force:

- one persistent Node.js application instance;
- the approved reverse proxy;
- secure runtime environment variables supplied outside Git;
- no horizontal scaling while process-local rate limiting is active;
- attachments disabled;
- the verified Brevo delivery configuration present at runtime;
- the recorded Airix Media Operations emergency monitoring and fallback sign-off.

The release gate authorizes production preparation and deployment after all automated
checks pass. It does not itself perform a deployment or authorize an unreviewed DNS
change.
