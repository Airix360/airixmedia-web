export const studioWorkingLayers = [
  { index: "01", name: "Creative direction", detail: "Frames the central idea, audience, decisions, and standard the work must meet." },
  { index: "02", name: "Design", detail: "Turns direction into language, structure, journeys, interfaces, and usable detail." },
  { index: "03", name: "Technology", detail: "Selects and builds the systems required by the real operating context." },
  { index: "04", name: "Operations", detail: "Maps roles, exceptions, handoffs, access, and ownership around the system." },
  { index: "05", name: "Long-term support", detail: "Keeps maintenance, improvement, documentation, and responsibility explicit after launch." },
] as const;

export const studioProcess = [
  { index: "01", name: "Listen and observe", action: "Understand the organisation, people, existing system, constraints, and work that must keep moving.", evidence: "Proposed W6 process structure; repository records strategy before implementation." },
  { index: "02", name: "Frame the responsibility", action: "Define the useful result, boundaries, roles, risks, and evidence needed before choosing technology.", evidence: "Repository record: roles, exceptions, data movement, and support are mapped before technology." },
  { index: "03", name: "Make and review", action: "Bring creative direction, design, engineering, content, and operations into one visible working rhythm.", evidence: "Proposed connective copy derived from recorded practices." },
  { index: "04", name: "Prove the route", action: "Test the critical journey, access, behaviour, performance, handoffs, and recovery assumptions.", evidence: "Repository quality and staging direction; exact validation plan is engagement-specific." },
  { index: "05", name: "Hand over and stay", action: "Document ownership, launch deliberately, then maintain or improve within the agreed relationship.", evidence: "Repository record: responsibility after launch and paths for maintenance and improvement." },
] as const;

export const studioPrinciples = [
  ["Clarity before implementation", "Strategy, content, roles, and operating needs shape the technical choice."],
  ["People remain accountable", "Automation supports human service; it does not replace responsible decisions."],
  ["Small by design", "A boutique practice with senior oversight is the recorded team model; no employee count is claimed."],
  ["Build for ownership", "Access, documentation, maintenance, support, and improvement belong in the work."],
  ["Proof over theatre", "Real interfaces, repository evidence, explicit limits, and working behaviour carry trust."],
] as const;

export const collaborationModel = [
  { title: "Airix leads the system", body: "Creative, technical, and operating decisions are connected rather than handed between isolated vendors." },
  { title: "The client holds context", body: "Organisational knowledge, priorities, approvals, and accountable decisions remain part of the working process." },
  { title: "Specialists stay explicit", body: "Selected providers or specialists may support a confirmed scope; no unverified partnership is implied." },
] as const;
