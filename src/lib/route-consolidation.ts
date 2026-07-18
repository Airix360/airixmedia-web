export type RouteConsolidationRedirect = {
  source: string;
  destination: string;
  permanent: true;
  reason: string;
  artworkDisposition?: string;
};

export const routeConsolidationRedirects: RouteConsolidationRedirect[] = [
  { source: "/atlas", destination: "/studio#atlas", permanent: true, reason: "Atlas philosophy now lives within Studio.", artworkDisposition: "Atlas pair retained as the Studio Atlas section visual." },
  { source: "/discuss", destination: "/contact?form=project", permanent: true, reason: "Project enquiries use the shared contact-dialog system.", artworkDisposition: "Discuss pair retained in the Contact enquiry artwork register." },
  { source: "/book", destination: "/contact?form=book", permanent: true, reason: "Consultation context uses the shared contact-dialog system.", artworkDisposition: "Booking pair retained in the Contact enquiry artwork register." },
  { source: "/services/digital-experiences", destination: "/services#digital-experiences", permanent: true, reason: "Service detail consolidated into the Services page.", artworkDisposition: "Pair used as section visual." },
  { source: "/services/business-systems", destination: "/services#business-systems", permanent: true, reason: "Service detail consolidated into the Services page.", artworkDisposition: "Pair used as section visual." },
  { source: "/services/managed-infrastructure", destination: "/services#managed-infrastructure", permanent: true, reason: "Service detail consolidated into the Services page.", artworkDisposition: "Pair used as section visual." },
  { source: "/services/support-recovery", destination: "/services#support-recovery", permanent: true, reason: "Service detail consolidated into the Services page.", artworkDisposition: "Pair used as section visual." },
  { source: "/publishing/ojs", destination: "/publishing#ojs", permanent: true, reason: "Publishing detail consolidated into one publishing route." },
  { source: "/publishing/pricing", destination: "/publishing#pricing", permanent: true, reason: "Pricing is a section of the Publishing page." },
  { source: "/publishing/universities", destination: "/publishing#universities", permanent: true, reason: "Institutional publishing is a section of the Publishing page." },
  { source: "/publishing/journal-platforms", destination: "/publishing#journal-platforms", permanent: true, reason: "Platform architecture is a section of the Publishing page." },
  { source: "/publishing/hosting-support", destination: "/publishing#hosting-support", permanent: true, reason: "Hosting and support are sections of the Publishing page." },
  { source: "/publishing/editorial-support", destination: "/publishing#editorial-support", permanent: true, reason: "Editorial support is a section of the Publishing page." },
  { source: "/publishing/plugins", destination: "/publishing#plugins", permanent: true, reason: "Themes and plugins are sections of the Publishing page." },
  { source: "/publishing/projects", destination: "/publishing#projects", permanent: true, reason: "Publishing work is summarised and linked to Work." },
  { source: "/publishing/resources", destination: "/publishing#resources", permanent: true, reason: "Publishing resources are consolidated into Publishing." },
  { source: "/open-source/paystack-ojs", destination: "/open-source#paystack-ojs", permanent: true, reason: "Project record consolidated into the Open Source catalogue." },
  { source: "/open-source/ojs-magic-login", destination: "/open-source#ojs-magic-login", permanent: true, reason: "Project record consolidated into the Open Source catalogue." },
  { source: "/open-source/submission-fee", destination: "/open-source#submission-fee", permanent: true, reason: "Project record consolidated into the Open Source catalogue." },
  { source: "/open-source/multipay", destination: "/open-source#multipay", permanent: true, reason: "Project record consolidated into the Open Source catalogue." },
  { source: "/open-source/request-waiver", destination: "/open-source#request-waiver", permanent: true, reason: "Project record consolidated into the Open Source catalogue." },
  { source: "/knowledge-base", destination: "/support#guides", permanent: true, reason: "Verified guidance belongs on the Support page." },
  { source: "/service-levels", destination: "/support#service-levels", permanent: true, reason: "Agreement-specific service-level guidance belongs on Support." },
  { source: "/status", destination: "/support", permanent: true, reason: "No verified public status feed exists; a dedicated status service may be added later." },
  { source: "/cookies", destination: "/legal#cookies", permanent: true, reason: "Cookie and local-storage information lives in the Legal centre." },
  { source: "/accessibility", destination: "/legal#accessibility", permanent: true, reason: "Accessibility information lives in the Legal centre." },
  { source: "/acceptable-use", destination: "/legal#acceptable-use", permanent: true, reason: "Acceptable-use information lives in the Legal centre." },
  { source: "/work/ku-journals", destination: "/work#publishing", permanent: true, reason: "Publishing proof is consolidated into Work." },
  { source: "/insights", destination: "/support#guides", permanent: true, reason: "The placeholder insight route is replaced by verified support guidance." },
  { source: "/resources", destination: "/support#guides", permanent: true, reason: "The placeholder resource route is replaced by verified support guidance." },
];

export const retainedPublicRoutes = ["/", "/studio", "/work", "/services", "/publishing", "/open-source", "/contact", "/support", "/support/emergency", "/legal", "/privacy", "/terms", "/service-terms", "/security", "/data-processing", "/subprocessors"] as const;
