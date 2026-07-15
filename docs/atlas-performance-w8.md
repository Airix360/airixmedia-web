# Performance W8

Runtime artwork uses WebP derivatives only. No PNG master is referenced by public
code. Each opening requests one responsive family; only the opening image receives
priority and other state families are not preloaded.

The 40 public derivatives total 5,155,432 bytes. New derivatives range approximately
21–250 KiB; the largest is 255,602 bytes. Desktop images are 174–245 KiB, mobile
images 112–250 KiB, tablet images 111–151 KiB and thumbnails 21–31 KiB.
Source PNGs live in the creative repository branch and are never runtime requests.

The public integration adds no animation library. Motion is CSS-only, finite and
removed under `prefers-reduced-motion`. Production Lighthouse on 15 July 2026 was
99/100/100/100 desktop and 90/100/100/100 mobile for Performance, Accessibility,
Best Practices and SEO. Desktop LCP was 0.9 seconds; mobile LCP was 3.5 seconds,
with CLS 0 in both runs. The score gate passes, but mobile LCP remains above the
2.5-second practical target and is an explicit W9 optimisation item. Runtime-request
tests confirm only responsive WebP artwork is requested, with no PNG source or master
path. The production build emitted 24 JavaScript chunks totalling 1,924,771 bytes;
the largest individual emitted chunk was 314,091 bytes. This is a build-wide figure,
not the per-route transferred payload, and remains a W9 bundle-inspection baseline.
A Git LFS/archive policy for all historic source masters remains a W9 decision.
