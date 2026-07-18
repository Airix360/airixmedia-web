export type OpenSourceProject = {
  slug: "paystack-ojs" | "ojs-magic-login" | "submission-fee" | "multipay" | "request-waiver";
  name: string;
  summary: string;
  capabilities: string[];
  supportedVersions?: string;
  status: "Public repository";
  repositoryUrl: string;
  documentationUrl?: string;
  issueUrl: string;
  licence: "GPL-3.0";
  featured: boolean;
  warnings?: string[];
};

export const openSourceCatalogue: OpenSourceProject[] = [
  {
    slug: "paystack-ojs",
    name: "PaystackOJS",
    summary: "A Paystack payment gateway for OJS publishing payments using hosted checkout and server-side verification.",
    capabilities: ["Hosted payment checkout", "Server-side payment verification", "OJS payment workflow integration"],
    supportedVersions: "OJS 3.5.0+ · PHP 8.1+",
    status: "Public repository",
    repositoryUrl: "https://github.com/thathman/PaystackOJS",
    documentationUrl: "https://github.com/thathman/PaystackOJS#readme",
    issueUrl: "https://github.com/thathman/PaystackOJS/issues",
    licence: "GPL-3.0",
    featured: true,
    warnings: ["README header and latest GitHub release use different version labels.", "Currency availability depends on the connected Paystack account."],
  },
  {
    slug: "ojs-magic-login",
    name: "OJS Magic Login",
    summary: "Passwordless OJS sign-in through time-limited, one-time email links.",
    capabilities: ["Passwordless sign-in", "One-time email links"],
    supportedVersions: "OJS 3.5",
    status: "Public repository",
    repositoryUrl: "https://github.com/thathman/ojs-magic-login",
    documentationUrl: "https://github.com/thathman/ojs-magic-login#readme",
    issueUrl: "https://github.com/thathman/ojs-magic-login/issues",
    licence: "GPL-3.0",
    featured: false,
  },
  {
    slug: "submission-fee",
    name: "Submission Fee",
    summary: "An OJS plugin for charging authors through the journal payment gateway during submission.",
    capabilities: ["Submission-time fee handling", "Journal payment-gateway integration"],
    supportedVersions: "OJS 3.5",
    status: "Public repository",
    repositoryUrl: "https://github.com/thathman/submissionFee-OJS",
    documentationUrl: "https://github.com/thathman/submissionFee-OJS#readme",
    issueUrl: "https://github.com/thathman/submissionFee-OJS/issues",
    licence: "GPL-3.0",
    featured: false,
  },
  {
    slug: "multipay",
    name: "MultiPay",
    summary: "An OJS payment orchestrator that routes supported gateways according to currency and configuration.",
    capabilities: ["Multiple payment gateways", "Currency-based routing"],
    supportedVersions: "OJS 3.5",
    status: "Public repository",
    repositoryUrl: "https://github.com/thathman/ojs-multipay",
    documentationUrl: "https://github.com/thathman/ojs-multipay#readme",
    issueUrl: "https://github.com/thathman/ojs-multipay/issues",
    licence: "GPL-3.0",
    featured: false,
    warnings: ["Provider availability remains installation-specific."],
  },
  {
    slug: "request-waiver",
    name: "Request Waiver",
    summary: "An OJS workflow extension for author requests to waive submission or publication fees.",
    capabilities: ["Author waiver request", "Submission and publication fee contexts", "Administrative and author notifications"],
    supportedVersions: "OJS 3.5",
    status: "Public repository",
    repositoryUrl: "https://github.com/thathman/ojs-request-waiver",
    documentationUrl: "https://github.com/thathman/ojs-request-waiver#readme",
    issueUrl: "https://github.com/thathman/ojs-request-waiver/issues",
    licence: "GPL-3.0",
    featured: false,
  },
];
