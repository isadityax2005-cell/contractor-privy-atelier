export interface ProjectCategory {
  id: string;
  name: string;
  baseCostPerSqFt: number;
  minSqFt: number;
  maxSqFt: number;
  defaultSqFt: number;
  durationWeeksPerThousandSqFt: number;
  description: string;
  phases: string[];
}

export interface MaterialTier {
  id: string;
  name: string;
  multiplier: number;
  description: string;
  highlights: string[];
}

export interface TransformationItem {
  id: string;
  title: string;
  location: string;
  category: string;
  investment: string;
  duration: string;
  beforeImage: string;
  afterImage: string;
  beforeAlt: string;
  afterAlt: string;
  description: string;
}

export interface PortfolioProject {
  id: string;
  title: string;
  category: string;
  location: string;
  sqft: string;
  timeline: string;
  investment: string;
  image: string;
  highlights: string[];
  clientQuote: string;
  clientAuthor: string;
}

export const siteConfig = {
  name: "Vanguard Architectural Builders",
  shortName: "Vanguard",
  tagline: "Master Construction · Structural Renovations · Bespoke Residential Estates",
  emergencyPhone: "(555) 849-2041",
  officePhone: "(555) 849-2040",
  email: "builds@vanguardbuilders.com",
  address: "840 Industrial Parkway, Suite 400, Austin, TX 78701",
  serviceRadius: "Austin Metro, Westlake Hills, Barton Creek & Texas Hill Country",
  licenseNumber: "TX-BLD-849204",
  insuranceCoverage: "$5,000,000 Commercial Liability & Full Workman's Comp",
  warrantyYears: 10,
  yearsInBusiness: 18,
  projectsCompleted: 340,
  clientRating: 4.9,
  reviewsCount: 148,

  hero: {
    badge: "Master Builder · Architectural Grade Construction",
    titleLine1: "We build what others",
    titleAccent: "claim is impossible.",
    subtitle:
      "High-performance residential construction, whole-home structural transformations, and bespoke architectural craftsmanship engineered with zero shortcuts and fixed-price certainty.",
  },

  trustBadges: [
    { title: "10-Year Warranty", subtitle: "Full structural backing on all foundations & framing" },
    { title: "$5M Insured & Bonded", subtitle: "Zero-liability client protection on every jobsite" },
    { title: "Fixed-Price Guarantee", subtitle: "Line-item transparent contracts with no surprise billings" },
    { title: "In-House Engineers", subtitle: "Dedicated master joiners and structural superintendents" },
  ],

  categories: [
    {
      id: "whole-home",
      name: "Whole-Home Architectural Remodel",
      baseCostPerSqFt: 185,
      minSqFt: 1200,
      maxSqFt: 6500,
      defaultSqFt: 3200,
      durationWeeksPerThousandSqFt: 4,
      description: "Complete structural gut and reconfiguration, foundation reinforcement, new envelope and bespoke finishes.",
      phases: ["Demolition & Structural Steel", "Mechanical/Electrical/Plumbing", "Drywall & Architectural Casework", "Master Finishes & Turnkey Handover"],
    },
    {
      id: "ground-up",
      name: "Custom Estate Ground-Up Build",
      baseCostPerSqFt: 295,
      minSqFt: 2500,
      maxSqFt: 10000,
      defaultSqFt: 4500,
      durationWeeksPerThousandSqFt: 5,
      description: "Turnkey luxury estate construction from civil excavation and helical piers to custom architectural rooflines.",
      phases: ["Civil & Foundation", "Structural Framing & Envelope", "Smart-Home Infrastructure", "Bespoke Architectural Detailing"],
    },
    {
      id: "chef-kitchen",
      name: "Luxury Chef's Kitchen & Living",
      baseCostPerSqFt: 240,
      minSqFt: 400,
      maxSqFt: 1800,
      defaultSqFt: 850,
      durationWeeksPerThousandSqFt: 7,
      description: "Load-bearing wall removal, bookmatched slab islands, bespoke cabinetry, and integrated Sub-Zero/Wolf ventilation.",
      phases: ["Load-Bearing Wall Removal", "Plumbing & High-Amperage Electrical", "Custom Cabinetry & Slabs", "Appliance Commissioning"],
    },
    {
      id: "master-sanctuary",
      name: "Master Suite & Spa Bath Sanctuary",
      baseCostPerSqFt: 210,
      minSqFt: 350,
      maxSqFt: 1500,
      defaultSqFt: 650,
      durationWeeksPerThousandSqFt: 6,
      description: "Freestanding stone soaking soaks, curbless steam showers, radiant underfloor heating, and custom boutique closets.",
      phases: ["Subfloor Waterproofing", "Steam Plumbing & Radiant Heat", "Tile Masonry & Glass Installation", "Vanity Joinery & Fixture Trim"],
    },
    {
      id: "outdoor-pavilion",
      name: "Outdoor Pavilion & Poolhouse",
      baseCostPerSqFt: 165,
      minSqFt: 500,
      maxSqFt: 2500,
      defaultSqFt: 1100,
      durationWeeksPerThousandSqFt: 4,
      description: "Heavy timber pavilions, cantilevered steel overhangs, integrated chef kitchens, fire features, and pool cabanas.",
      phases: ["Excavation & Footings", "Structural Steel / Heavy Timber", "Gas & Outdoor Electrical", "Masonry, Appliances & Lighting"],
    },
  ] as ProjectCategory[],

  tiers: [
    {
      id: "artisan",
      name: "Artisan Select",
      multiplier: 1.0,
      description: "Commercial-grade durability with refined designer fixtures and solid hardwood cabinetry.",
      highlights: ["Custom rift-sawn oak cabinetry", "Quartzite or quartz countertops", "Thermador or Bosch benchmark appliances", "Porcelain large-format tile"],
    },
    {
      id: "luxury",
      name: "Architectural Luxury",
      multiplier: 1.35,
      description: "Bespoke architectural detailing, continuous slab marble, hidden pivot doors, and full-spectrum lighting.",
      highlights: ["Bookmatched Calacatta or Taj Mahal marble", "Integrated Sub-Zero / Wolf suites", "Hidden acoustic pivot doors & trimless reveals", "Lutron Palladiom architectural home automation"],
    },
    {
      id: "haute",
      name: "Haute Custom Estate",
      multiplier: 1.8,
      description: "Uncompromised one-of-one luxury with imported European stonework, structural bronze, and museum-grade finishes.",
      highlights: ["Hand-quarried European stone & architectural bronze", "Gaggenau & La Cornue master culinary stations", "Custom steel-frame thermally broken curtain walls", "Museum-spec climate conditioning & concealed linear diffusers"],
    },
  ] as MaterialTier[],

  transformations: [
    {
      id: "westlake-kitchen",
      title: "Westlake Hills Mid-Century Transformation",
      location: "Westlake Hills, Austin, TX",
      category: "Chef's Kitchen & Great Room",
      investment: "$265,000",
      duration: "11 Weeks",
      beforeImage: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80",
      afterImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
      beforeAlt: "Original dated kitchen with enclosed partitions and claustrophobic soffits",
      afterAlt: "Modern open-concept architectural kitchen with bookmatched quartzite and walnut cabinetry",
      description: "Removed a 28-foot load-bearing partition wall, inserted a recessed steel flitch beam, and installed an expansive 16-foot waterfall quartzite island.",
    },
    {
      id: "barton-creek-estate",
      title: "Barton Creek Modern Pavilion Overhaul",
      location: "Barton Creek, TX",
      category: "Whole-Home Structural Remodel",
      investment: "$780,000",
      duration: "22 Weeks",
      beforeImage: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80",
      afterImage: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
      beforeAlt: "Weathered exterior with decayed limestone veneer and failing eaves",
      afterAlt: "Stunning contemporary estate with Shou Sugi Ban cedar siding and cantilevered steel roofs",
      description: "Re-engineered the building envelope with Japanese charred cedar, structural floor-to-ceiling glass, and expansive cantilevered steel rooflines.",
    },
  ] as TransformationItem[],

  projects: [
    {
      id: "proj-1",
      title: "The Glass Pavilion at Mount Bonnell",
      category: "Ground-Up Custom Estate",
      location: "Mount Bonnell, Austin",
      sqft: "5,800 sq ft",
      timeline: "14 Months",
      investment: "$1,850,000",
      image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
      highlights: ["Cliffside helical pier stabilization", "32-foot floor-to-ceiling glass curtain walls", "Infinite edge cantilevered pool structure"],
      clientQuote: "Vanguard engineered solutions where two prior builders threw their hands up. Their transparent cost ledger was accurate to within 1.2% upon completion.",
      clientAuthor: "David & Eleanor M. · Technology Executive",
    },
    {
      id: "proj-2",
      title: "Bouldin Creek Brutalist Sanctuary",
      category: "Architectural Renovation & Addition",
      location: "Bouldin Creek, Austin",
      sqft: "3,400 sq ft",
      timeline: "7 Months",
      investment: "$620,000",
      image: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80",
      highlights: ["Board-formed architectural concrete accents", "Rift-cut white oak casework throughout", "Zero-threshold indoor-outdoor transitions"],
      clientQuote: "The precision of their woodwork and structural joints is museum quality. The jobsite was immaculate every single day.",
      clientAuthor: "Sarah K. · Architectural Partner",
    },
    {
      id: "proj-3",
      title: "Davenport Ranch Contemporary Master Bath",
      category: "Master Sanctuary Transformation",
      location: "Davenport Ranch, TX",
      sqft: "850 sq ft",
      timeline: "9 Weeks",
      investment: "$195,000",
      image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80",
      highlights: ["Monolithic carved limestone soaking tub", "Double steam suite with aromatherapy injection", "Concealed radiant wall heating"],
      clientQuote: "Our master bath feels like a five-star hotel spa in Kyoto. Delivered 3 days ahead of our Thanksgiving deadline.",
      clientAuthor: "Marcus T. · Private Wealth Advisory",
    },
  ] as PortfolioProject[],

  processSteps: [
    {
      step: "01",
      title: "Structural Audit & Feasibility",
      timeline: "Days 1 – 7",
      desc: "Our structural engineer and senior estimator conduct laser scanning, verify load paths, and test soil and foundation integrity.",
    },
    {
      step: "02",
      title: "3D BIM & Transparent Cost Model",
      timeline: "Weeks 2 – 4",
      desc: "We generate 3D building information models with exact material allowances and provide a binding fixed-price contract.",
    },
    {
      step: "03",
      title: "Fast-Track Permitting & Procurement",
      timeline: "Weeks 4 – 8",
      desc: "In-house expeditors secure municipality permits while all custom long-lead items (slabs, steel, glass) are pre-ordered and warehoused.",
    },
    {
      step: "04",
      title: "Precision Execution & White-Glove Handover",
      timeline: "Build Phase",
      desc: "Daily superintendent supervision, weekly photo progress portals, clean-air HEPA scrubbing, and an exhaustive 200-point punch list handover.",
    },
  ],
};
