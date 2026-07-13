export type DesignLabSlug = "after-dark" | "in-motion" | "reassembled";

export type DesignLabConcept = {
  slug: DesignLabSlug;
  index: string;
  name: string;
  strapline: string;
  proposition: string;
  summary: string;
  lens: string;
  type: {
    sans: string;
    serif: string;
    source: string;
    licence: string;
    roles: string;
    fit: string;
    weakness: string;
    mobile: string;
  };
  palette: Array<{ name: string; value: string; role: string }>;
};

export const designLabConcepts: DesignLabConcept[] = [
  {
    slug: "after-dark",
    index: "A",
    name: "After Dark",
    strapline: "Infrastructure wakes when the light drops.",
    proposition: "Airix builds the systems that keep organisations moving after the launch moment has passed.",
    summary: "A dense, premium night study where routes, bridges and reflections become a working digital system.",
    lens: "City → connection → dependable digital operations",
    type: {
      sans: "Barlow Condensed",
      serif: "Literata",
      source: "Google Fonts / upstream open-source repositories",
      licence: "SIL Open Font License 1.1",
      roles: "Condensed sans for directional language; serif for measured proposition and proof.",
      fit: "Feels architectural and sign-led without imitating road signs literally.",
      weakness: "Condensed display copy loses authority when overused.",
      mobile: "Short labels remain sans; longer copy switches decisively to the serif.",
    },
    palette: [
      { name: "Asphalt", value: "#0d0e0f", role: "primary field" },
      { name: "Lagoon black", value: "#151a1d", role: "depth" },
      { name: "Signal yellow", value: "#ffd400", role: "action and route" },
      { name: "Headlamp", value: "#f4f0df", role: "primary text" },
      { name: "Tail light", value: "#ef4c35", role: "rare state cue" },
    ],
  },
  {
    slug: "in-motion",
    index: "B",
    name: "In Motion",
    strapline: "Commerce is a current, not a queue.",
    proposition: "Airix turns movement—orders, people, decisions and payments—into systems that stay legible.",
    summary: "A daylight interpretation built from market shutters, ferry wakes, painted routes and useful velocity.",
    lens: "Movement → exchange → working digital products",
    type: {
      sans: "Anybody",
      serif: "Bitter",
      source: "Google Fonts / upstream open-source repositories",
      licence: "SIL Open Font License 1.1",
      roles: "Variable sans carries motion and signage; slab serif slows the explanatory read.",
      fit: "Energetic without becoming a tourism campaign or generic sport identity.",
      weakness: "The sans can become cartoonish at extreme widths.",
      mobile: "Moderate width axis and large optical sizes keep the voice direct rather than novelty-led.",
    },
    palette: [
      { name: "Market ivory", value: "#f4ead2", role: "primary field" },
      { name: "Concrete", value: "#d7ccb5", role: "quiet surface" },
      { name: "Danfo yellow", value: "#f2c800", role: "movement marker" },
      { name: "Lagoon blue", value: "#006e78", role: "structural contrast" },
      { name: "Pepper red", value: "#d64125", role: "action" },
      { name: "Ink", value: "#171611", role: "text" },
    ],
  },
  {
    slug: "reassembled",
    index: "C",
    name: "Reassembled",
    strapline: "Useful systems are made from what is already here.",
    proposition: "Airix finds the working parts, removes the noise and reassembles digital operations around real use.",
    summary: "A controlled collage of kiosk geometry, copied matter and scaffold logic that resolves into order.",
    lens: "Fragments → decisions → coherent operating system",
    type: {
      sans: "Archivo Black",
      serif: "Bodoni Moda",
      source: "Google Fonts / upstream open-source repositories",
      licence: "SIL Open Font License 1.1",
      roles: "Heavy sans behaves like painted instruction; high-contrast serif provides editorial counterweight.",
      fit: "Carries physical construction and print tension without borrowing a fashion campaign.",
      weakness: "Both faces are forceful, so hierarchy must be sparse and disciplined.",
      mobile: "Display sizes contract sharply; body copy uses the serif only at comfortable reading sizes.",
    },
    palette: [
      { name: "Copy paper", value: "#f2eedf", role: "primary field" },
      { name: "Process ink", value: "#11100d", role: "text and rails" },
      { name: "Paint red", value: "#e0442e", role: "collision point" },
      { name: "Tarp blue", value: "#2458a6", role: "large fragment" },
      { name: "Chalk yellow", value: "#f0c928", role: "annotation" },
    ],
  },
];

export function getDesignLabConcept(slug: DesignLabSlug) {
  return designLabConcepts.find((concept) => concept.slug === slug)!;
}
