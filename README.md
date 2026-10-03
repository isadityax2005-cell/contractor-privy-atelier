# High-Ticket Home Contractor Base Template (`contractor-base-template`)

A state-of-the-art Next.js 16 base template engineered for high-ticket home contractors, luxury architectural remodeling firms, custom home builders, and structural renovation companies. Designed to rank as a flagship pillar in the autonomous local-business outreach and agency engine.

---

## Architecture & Technology Stack

- **Framework:** Next.js 16.3.6 (App Router, Turbopack)
- **Runtime:** React 19.2.8 & TypeScript 5
- **Styling:** Tailwind CSS 4 & Custom CAD Glassmorphic Design System (`globals.css`)
- **Animation & Motion:** GSAP 3.15.0, Lenis smooth inertial scrolling
- **Interactive 3D:** React Three Fiber 9.8.0 + Three.js 0.186.1 (`BlueprintScene.tsx`)
- **Interactive Micro-Engines:**
  - Real-Time Project Cost Estimator with dynamic square-footage sliders and tier calculations.
  - Interactive Touch & Drag Before / After Transformation comparison slider.
  - Pre-filled Consultation & Blueprint Audit Dispatch Modal with zero-setup mailto/clipboard generator.

---

## Core Interactive Experiences

1. **Top Emergency Structural Response Banner (`EmergencyBanner.tsx`)**
   - 24/7 urgent structural damage and storm repair dispatch hotline with animated beacon.
   - Click-to-call direct routing with live average response time HUD.

2. **Interactive Architectural Cost Estimator (`ProjectEstimator.tsx`)**
   - 5 Project Classifications (Whole-Home Remodel, Custom Ground-Up Build, Chef's Kitchen, Master Suite Sanctuary, Outdoor Pavilion).
   - Dynamic square-footage footprint slider (300 to 10,000 sq ft).
   - 3 Architectural Finish Tiers (Artisan Select, Architectural Luxury, Haute Custom Estate).
   - Live calibrated cost forecast, build timeline, and 4-phase cost allocation breakdown.
   - "Lock In Estimate" direct transfer into consultation request state.

3. **Before & After Project Transformation Slider (`TransformationSlider.tsx`)**
   - Interactive split comparison slider with horizontal drag handle.
   - Smooth multi-project tab switcher with before/after labels and project investment specs.

4. **Interactive 3D Architectural Blueprint BIM Schematics (`BlueprintScene.tsx`)**
   - Real-time 3D wireframe isometric house model with structural columns, foundation slab, and roof trusses.
   - Orbit controls allowing clients to rotate and inspect structural steel load paths.

5. **Flagship Completed Portfolios (`ProjectGallery.tsx`)**
   - Spec grids: Footprint, Timeline, Investment, and verified client testimonials.

6. **The 4-Step Design-Build Protocol & Credentials (`ProcessSection.tsx`)**
   - Milestone timelines from Discovery & BIM to Turnkey handover.
   - 10-Year Structural Warranty, $5M Commercial Insurance, and State Master Builder license badges.

7. **Consultation & Blueprint Audit Modal (`ConsultationModal.tsx`)**
   - Pre-fills calculator data and generates formatted proposal drafts with 1-click clipboard copy.

---

## Rapid Client Hydration

To adapt this template for any local contractor prospect in under 2 minutes, update `src/data/site-config.ts`:

```typescript
export const siteConfig = {
  name: "Pro Builders & Remodeling",
  shortName: "Pro Builders",
  emergencyPhone: "(555) 019-2831",
  officePhone: "(555) 019-2830",
  email: "estimates@probuilders.com",
  address: "100 Construction Way, City, ST",
  serviceRadius: "Greater Metropolitan Area",
  licenseNumber: "ST-BLD-123456",
  categories: [ ... ],
  tiers: [ ... ],
  transformations: [ ... ],
  projects: [ ... ],
};
```

---

## Local Development & Build

```bash
# Run local dev server on port 3003
npm run dev -- --hostname 127.0.0.1 --port 3003

# Run production build
npm run build
```
