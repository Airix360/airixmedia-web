import { Header } from "./header";
import { Footer } from "./footer";
import { ProjectSelector } from "./project-selector";

export function EmergencyPage() { return <><Header /><main id="main-content"><header className="page-hero"><div className="shell"><span className="mono">EMERGENCY RECOVERY</span><h1>Describe what failed and what is at risk.</h1><p>Use this route for an unavailable, compromised, corrupted, or severely impaired production system. An initial diagnostic may be chargeable. Submission does not guarantee immediate response or resolution.</p></div></header><section className="section"><div className="shell"><div className="verification">RESPONSE DEPENDS ON PACKAGE AND AVAILABILITY</div><ProjectSelector presetEmergency /></div></section></main><Footer /></>; }
