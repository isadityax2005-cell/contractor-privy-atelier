export interface ProjectItem {
  id: string;
  name: string;
  location: string;
  category: "Architecture" | "Design-Build" | "Private Estate";
  sqft: string;
  acreage?: string;
  year: string;
  materials: string[];
  image: string;
  tagline: string;
}

export const privyData = {
  brand: {
    name: "ATELIER PRIVÉ",
    collectionName: "THE PERMANENCE COLLECTION",
    tagline: "The Art of Architectural Permanence",
    monogram: "AP",
    locations: ["Dubai", "London", "Zurich", "Los Angeles"],
  },
  hero: {
    eyebrow: "The art",
    title: "of architectural permanence",
    video: "/media/hero-loop.mp4",
    poster: "/media/hero-poster.png",
    bimTeaserVideo: "/media/bim-orbit.mp4",
  },
  triptych: {
    eyebrow: "a handpicked collection",
    title: "of the rarest private estates",
    subtitle: "Exclusive residences in the world's most rarefied geographies. For the true connoisseurs of fine living and structural permanence.",
    centerImage: "/media/triptych-center.png",
    leftImage: "/media/triptych-left.png",
    rightImage: "/media/triptych-right.png",
    bottomDetail1: "/media/craft-chisel.png",
    bottomDetail2: "/media/smoked-oak-stairs.png",
  },
  interlude: {
    headline: "SOME CREATIONS MERIT A PLACE",
    subheadline: "Above The Lofty Adage Of Luxury",
    video: "/media/craft-breaker.mp4",
    poster: "/media/craft-chisel.png",
  },
  tenets: [
    {
      id: "tenet-01",
      number: "01",
      title: "Expansive Spaces",
      discipline: "Bespoke Architecture",
      leadText: "Monumental scale orchestrated with surgical transparency.",
      description: "We push beyond conventional engineering envelopes. A Privy residence features 7-meter double-height pavilions where unyielding structural board-formed concrete dissolves into frameless acoustic glass, merging interior sanctity with panoramic natural vistas.",
      video: "/media/tenet-architecture.mp4",
      image: "/media/glass-pavilion.png",
      metrics: ["7.2m Ceiling Voids", "Triple-Glazed Low-E Glass", "Acoustic Attenuation 52dB"],
    },
    {
      id: "tenet-02",
      number: "02",
      title: "Permanent Craft",
      discipline: "Master Design-Build",
      leadText: "Material integrity that matures with geological grace.",
      description: "Every joint, reveal, and structural tolerance is calibrated to sub-millimeter precision. Hand-honed Italian Grigio Carnico marble, cast architectural bronze with custom living patina, and post-tensioned structural slabs designed for multi-century longevity.",
      video: "/media/tenet-craft.mp4",
      image: "/media/concrete-gallery.png",
      metrics: ["0.5mm Tolerance Standard", "Post-Tensioned Monoliths", "Custom Architectural Bronze"],
    },
    {
      id: "tenet-03",
      number: "03",
      title: "Total Sanctuary",
      discipline: "Private Estate Development",
      leadText: "Radical privacy buffered by private topography.",
      description: "An enclave that remains completely insulated from the exterior world. Autonomous micro-grid infrastructure, private subterranean vehicular galleries, thermal water reflection basins, and lush perimeter forestry creating an impenetrable acoustic haven.",
      video: "/media/bim-orbit.mp4",
      image: "/media/hillside-sanctuary.png",
      metrics: ["Autonomous Solar & Geothermal", "Subterranean 8-Car Gallery", "Acoustic Perimeter Forest"],
    },
  ],
  projects: [
    {
      id: "p1",
      name: "The Bel-Air Monolith",
      location: "Los Angeles, California",
      category: "Private Estate" as const,
      sqft: "18,400 sq.ft",
      acreage: "3.2 Acres",
      year: "2025",
      materials: ["Honed Roman Travertine", "Blackened Zinc", "Smoked European Oak"],
      image: "/media/project-belair.png",
      tagline: "A cantilevered brutalist sculpture nestled into private canyon ridgelines.",
    },
    {
      id: "p2",
      name: "Villa Solstice",
      location: "Cap d'Antibes, Côte d'Azur",
      category: "Architecture" as const,
      sqft: "14,200 sq.ft",
      acreage: "1.8 Acres",
      year: "2024",
      materials: ["White Thassos Marble", "Anodized Champagne Bronze", "Frameless Structural Glass"],
      image: "/media/project-antibes.png",
      tagline: "Cascading sea-facing terraces merging infinity water with the Mediterranean horizon.",
    },
    {
      id: "p3",
      name: "The Knightsbridge Atelier",
      location: "London, SW1X",
      category: "Design-Build" as const,
      sqft: "9,800 sq.ft",
      year: "2025",
      materials: ["Historic London Stock Brick", "Polished Belgian Black Granite", "Cast Bronze Facade"],
      image: "/media/project-knightsbridge.png",
      tagline: "Surgical restoration of a Grade II Victorian heritage mansion with a subterranean wellness sanctuary.",
    },
    {
      id: "p4",
      name: "High-Alpine Sanctuary",
      location: "St. Moritz, Engadin",
      category: "Private Estate" as const,
      sqft: "12,600 sq.ft",
      acreage: "4.5 Hectares",
      year: "2024",
      materials: ["Local Andeer Granite", "Charred Alpine Larch", "Triple-Pane Thermal Glass"],
      image: "/media/project-alps.png",
      tagline: "Geothermal-heated monolithic compound engineered for extreme alpine winters.",
    },
    {
      id: "p5",
      name: "The Kyoto Pavilion",
      location: "Higashiyama, Kyoto",
      category: "Architecture" as const,
      sqft: "8,500 sq.ft",
      year: "2025",
      materials: ["Yakisugi Burnt Cedar", "Volcanic Basalt", "Custom Washi Glass Screens"],
      image: "/media/project-kyoto.png",
      tagline: "A timeless Zen courtyard residence balancing modern structural steel with ancient carpentry.",
    },
    {
      id: "p6",
      name: "Penthouse Sovereign",
      location: "Dubai Harbour, UAE",
      category: "Design-Build" as const,
      sqft: "16,500 sq.ft",
      year: "2026",
      materials: ["Bookmatched Calacatta Viola", "Acoustic Fluted Glass", "Brushed Titanium"],
      image: "/media/project-dubai.png",
      tagline: "Double-height sky mansion featuring a 360-degree infinity cantilever pool overlooking the Persian Gulf.",
    },
  ],
  materialsStudy: {
    flutedGlass: "/media/material-fluted-glass.png",
    scaleModel: "/media/scale-model.png",
    founder: "/media/founder-portrait.png",
  },
};
