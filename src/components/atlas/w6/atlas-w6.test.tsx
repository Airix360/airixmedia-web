import { fireEvent, render, screen, within } from "@testing-library/react";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { StudioReview } from "@/components/atlas/studio";
import { TrustReview } from "@/components/atlas/trust";
import { LabsReview } from "@/components/atlas/labs";
import { labsProjects } from "@/content/atlas/labs";
import { atlasScenes, getAtlasScene, CandidateAssetAccessError } from "@/lib/atlas/assets";

const review={candidateAccess:"internal-review"} as const;

describe("Atlas W6 multi-state reviews",()=>{
  it("gates all new state art behind internal-review access",()=>{
    expect(()=>getAtlasScene("ill-0051")).toThrow(CandidateAssetAccessError);
    expect(()=>getAtlasScene("ill-0071")).toThrow(CandidateAssetAccessError);
    expect(()=>getAtlasScene("ill-0060")).toThrow(CandidateAssetAccessError);
  });
  it("registers every responsive derivative without using a source master",()=>{
    for(const id of ["ill-0051","ill-0071","ill-0060"] as const){
      const scene=atlasScenes[id];
      for(const path of Object.values(scene.responsive)){
        expect(path).not.toContain("/source/");
        expect(existsSync(join(process.cwd(),"public",path))).toBe(true);
      }
    }
  });
  it("renders Edo Studio with process, principles, and public navigation",()=>{
    const {container}=render(<StudioReview scene={getAtlasScene("ill-0051",review)}/>);
    expect(container.querySelector("[data-atlas-state='edo']")).toBeInTheDocument();
    expect(container.querySelectorAll("[data-studio-process] > li")).toHaveLength(5);
    expect(screen.getByRole("heading",{name:"Small by design. Accountable by practice."})).toBeInTheDocument();
    expect(within(screen.getByRole("navigation",{name:"Primary navigation"})).getAllByRole("link").map(link=>link.textContent).join(" ")).toMatch(/Work.*Services.*Publishing.*Atlas.*Studio.*Discuss a Project/);
  });
  it("renders Edo Trust with evidence and limitations",()=>{
    const {container}=render(<TrustReview scene={getAtlasScene("ill-0071",review)}/>);
    expect(container.querySelector("[data-atlas-state='edo']")).toBeInTheDocument();
    expect(container.querySelectorAll("[data-trust-register] > li")).toHaveLength(6);
    expect(screen.getByText("Not verified is not hidden.")).toBeInTheDocument();
    expect(screen.getByText(/No testimonial, score, badge, certification/)).toBeInTheDocument();
  });
  it("renders Kaduna Labs with current repository records and keyboard tabs",()=>{
    const {container}=render(<LabsReview scene={getAtlasScene("ill-0060",review)}/>);
    expect(container.querySelector("[data-atlas-state='kaduna']")).toBeInTheDocument();
    expect(container.querySelectorAll("[data-labs-project-textual-equivalent] > li")).toHaveLength(labsProjects.length);
    const tabs=within(screen.getByRole("tablist",{name:"Open-source projects"})).getAllByRole("tab");
    tabs[0].focus();fireEvent.keyDown(tabs[0],{key:"End"});expect(tabs.at(-1)).toHaveFocus();
    expect(screen.getByRole("link",{name:/Inspect Request Waiver/})).toHaveAttribute("href","https://github.com/thathman/ojs-request-waiver");
  });
});
