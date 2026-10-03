export type ProjectItem = {
  id: string;
  name: string;
  location: string;
  category: "Architecture" | "Design-Build" | "Private Estate";
  sqft: string;
  year: string;
  img: string;
  tagline: string;
  materials: string[];
};

/** Responsive image descriptor: every Magnific render ships as WebP @2048 + @1024. */
export const img = (name: string) => ({
  src: `/media/img/${name}.webp`,
  srcSet: `/media/img/${name}-1024.webp 1024w, /media/img/${name}.webp 2048w`,
});
export const vid = (name: string) => `/media/video/${name}.mp4`;

export const brand = {
  name: "Atelier Privé",
  wordmark: "Atelier Privé",
  phone: "+1 (800) 555-0199",
};

export const disciplines = [
  {
    key: "architecture",
    word: "Architecture",
    kicker: "Bespoke architecture",
    note: "Monolithic geometry, drawn once and drawn for a century.",
    count: "14 commissions",
    img: "project-kyoto",
  },
  {
    key: "design-build",
    word: "Design-Build",
    kicker: "Master design-build",
    note: "One hand from first sketch to final reveal. No hand-offs, no excuses.",
    count: "22 commissions",
    img: "project-knightsbridge",
  },
  {
    key: "estates",
    word: "Estates",
    kicker: "Private estates",
    note: "Land, privacy and infrastructure engineered as a single composition.",
    count: "9 commissions",
    img: "project-belair",
  },
];

export const tenets = {
  intro:
    "How does a residence earn the Atelier Privé seal? We set our own benchmarks, and made them rigorous. We call them the Tenets, and each one defines an unmistakable quality that must be satisfied before a single drawing is released.",
  panels: [
    {
      n: "01",
      accent: "Expansive",
      word: "Spaces",
      body: "We have pushed beyond conventional boundaries in more ways than one. A Privé residence opens into seven-metre volumes where board-formed concrete dissolves into frameless glass, so that even in the heart of the city you keep a private, expansive retreat.",
      video: "tenet-architecture",
    },
    {
      n: "02",
      accent: "Permanent",
      word: "Craft",
      body: "Every joint, reveal and structural tolerance is calibrated to half a millimetre. Hand-honed stone, cast bronze with a living patina, post-tensioned slabs engineered to outlast the people who commission them.",
      imgs: ["tig-welding", "concrete-gallery"],
      list: [
        ["Tolerance", "0.5 mm"],
        ["Structure", "Post-tensioned"],
        ["Metalwork", "Cast bronze"],
      ],
    },
    {
      n: "03",
      accent: "Total",
      word: "Sanctuary",
      body: "An enclave insulated from everything beyond its walls. Autonomous energy, subterranean galleries, thermal reflection basins and a perimeter of mature forest that turns the outside world to silence.",
      imgs: ["hillside-sanctuary", "project-alps"],
      list: [
        ["Energy", "Solar + geothermal"],
        ["Access", "Separate, private"],
        ["Acoustics", "52 dB attenuation"],
      ],
    },
  ],
  above: {
    accent: "Above",
    body: "Each commission is a hallmark of rarity. Every address, every space and every experience carries aspects that set it apart, and set it above.",
  },
};

export const projects: ProjectItem[] = [
  { id: "p1", name: "The Bel-Air Monolith", location: "Los Angeles", category: "Private Estate", sqft: "18,400 sq.ft", year: "2025", img: "project-belair", tagline: "A cantilevered travertine pavilion floating over a subterranean gallery.", materials: ["Roman travertine", "Blackened zinc", "Smoked oak"] },
  { id: "p2", name: "Villa Solstice", location: "Cap d'Antibes", category: "Architecture", sqft: "14,200 sq.ft", year: "2024", img: "project-antibes", tagline: "Cascading terraces that dissolve the pool into the Mediterranean.", materials: ["Thassos marble", "Champagne bronze", "Structural glass"] },
  { id: "p3", name: "The Knightsbridge Atelier", location: "London", category: "Design-Build", sqft: "9,800 sq.ft", year: "2025", img: "project-knightsbridge", tagline: "A Grade II mansion restored, with a bronze-and-glass pavilion behind it.", materials: ["London stock brick", "Belgian granite", "Cast bronze"] },
  { id: "p4", name: "High-Alpine Sanctuary", location: "St. Moritz", category: "Private Estate", sqft: "12,600 sq.ft", year: "2024", img: "project-alps", tagline: "A geothermal compound of Andeer granite and charred larch.", materials: ["Andeer granite", "Charred larch", "Triple glazing"] },
  { id: "p5", name: "The Kyoto Pavilion", location: "Higashiyama", category: "Architecture", sqft: "8,500 sq.ft", year: "2025", img: "project-kyoto", tagline: "Structural steel and ancient joinery around a lantern-lit court.", materials: ["Burnt cedar", "Volcanic basalt", "Washi glass"] },
  { id: "p6", name: "Penthouse Sovereign", location: "Dubai Harbour", category: "Design-Build", sqft: "16,500 sq.ft", year: "2026", img: "project-dubai", tagline: "A double-height sky mansion above the marina.", materials: ["Calacatta Viola", "Fluted glass", "Brushed titanium"] },
];

export const ateliers = [
  { city: "Dubai", address: "Gate Precinct 4, Level 08, DIFC", coord: "25.2048° N, 55.2708° E", img: "project-dubai" },
  { city: "London", address: "14 Berkeley Square, Mayfair", coord: "51.5098° N, 0.1456° W", img: "project-knightsbridge" },
  { city: "Zürich", address: "Bahnhofstrasse 28", coord: "47.3769° N, 8.5417° E", img: "project-alps" },
  { city: "Los Angeles", address: "9600 Wilshire Blvd, Beverly Hills", coord: "34.0736° N, 118.4004° W", img: "project-belair" },
];
