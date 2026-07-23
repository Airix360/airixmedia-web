export const atlasWorldStates = [
  ["Lagos","Capital, Arrival, Commerce and primary Work index","Structural prototypes available; public integration belongs to W8"],
  ["Oyo","Publishing and Knowledge-family public pages","Artwork required"],
  ["Rivers","Infrastructure and support-family public pages","Artwork required"],
  ["Edo","Studio, company, principles and Trust","W6 candidate review available"],
  ["Kaduna","Labs, open source, APIs and experiments","W6 candidate review available"],
  ["Plateau","Atlas, Insights, Resources and Observatory","W7 candidate review"],
  ["Ogun","Discuss, Contact, Booking and project entry","W7 candidate review"],
] as const;

export const visitorRoutes = [
  ["Understand what Airix does","Services","/services"],
  ["Inspect work and evidence","Work","/systems"],
  ["Explore scholarly publishing","Publishing","/publishing"],
  ["Read the wider system","Atlas","/atlas"],
  ["Understand the practice","Studio","/company"],
  ["Begin a serious conversation","Discuss a Project","/start-a-project"],
] as const;

export const insightRecords = [
  {status:"Existing public structure",subject:"Publishing operations",title:"Planning an OJS upgrade without testing in production",href:"/insights/planning-an-ojs-upgrade",note:"Repository-defined article template covering inventory, staging, validation, rollback and communication."},
  {status:"Structural example — not published",subject:"Digital systems",title:"Ownership before rebuilding",href:null,note:"A future field-note position; no article or publication date is claimed."},
  {status:"Structural example — not published",subject:"Infrastructure",title:"Continuity begins with responsibility",href:null,note:"A future subject route; no operational outcome is claimed."},
] as const;

export const resourceRecords = [
  {status:"Existing public structure",title:"Digital Systems Health Checklist",href:"/resources/digital-systems-health-checklist",detail:"Repository-defined checklist structure; no downloadable file is claimed."},
  {status:"Repository reference",title:"OJS upgrade planning guide",href:"/insights/planning-an-ojs-upgrade",detail:"A current article template, not a downloadable resource."},
  {status:"Public repository evidence",title:"Open-source OJS project references",href:"/open-source",detail:"Inspectable repositories and release records; managed support is separate."},
  {status:"Structural placeholder",title:"OJS Platform Health Check",href:null,detail:"Named in repository content but no downloadable file exists in W7."},
] as const;

export const projectRoutes = [
  ["website","Website or digital experience","Clarity, content, accessibility, performance and customer journeys"],
  ["systems","E-commerce or business system","Commerce, portals, applications, payments, workflows and operations"],
  ["publishing","Publishing or OJS","Journal platforms, editorial workflows, migrations, plugins and support"],
  ["infrastructure","Infrastructure or support","Hosting, domains, email, monitoring, maintenance, recovery and continuity"],
  ["design","Branding or design","Creative direction, identity, interface and connected system design"],
  ["integration","Integration or automation","APIs, data handoffs, payments, email and accountable workflow automation"],
  ["uncertain","Another or uncertain need","Start with context; Airix can recommend the most useful route"],
] as const;

export const verifiedContact = { email:"hello@airixmedia.com", nigeriaPhone:"+234 905 091 7937", nigeriaWhatsApp:"https://wa.me/2349050917937", usWhatsApp:"https://wa.me/19292439382", portal:"https://portal.airixmedia.com" } as const;
