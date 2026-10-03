"use client";

import React, { useState } from "react";
import SmoothScroll from "@/components/SmoothScroll";
import PrivyPreloader from "@/components/PrivyPreloader";
import PrivyHeader from "@/components/PrivyHeader";
import PrivyHero from "@/components/PrivyHero";
import PrivyTriptych from "@/components/PrivyTriptych";
import PrivyVideoInterlude from "@/components/PrivyVideoInterlude";
import PrivyTenetsSlider from "@/components/PrivyTenetsSlider";
import PrivyCollectionGrid from "@/components/PrivyCollectionGrid";
import PrivyFooter from "@/components/PrivyFooter";
import Privy3DModal from "@/components/Privy3DModal";
import PrivyAcquisitionModal from "@/components/PrivyAcquisitionModal";
import { ProjectItem } from "@/data/privy-data";

export default function HomePage() {
  const [modal3DOpen, setModal3DOpen] = useState(false);
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  const handleOpen3DMap = () => {
    setModal3DOpen(true);
  };

  const handleOpenInquiry = () => {
    setSelectedProject(null);
    setInquiryModalOpen(true);
  };

  const handleSelectProject = (project: ProjectItem) => {
    setSelectedProject(project);
    setInquiryModalOpen(true);
  };

  return (
    <SmoothScroll>
      <div id="top" className="min-h-screen bg-[#1A1919] text-[#F8F8F8] flex flex-col selection:bg-[#E5D8CA] selection:text-black">
        {/* Monogram SVG Preloader with Percentage Progression */}
        <PrivyPreloader />

        {/* Global Minimalist Header */}
        <PrivyHeader
          onOpen3DMap={handleOpen3DMap}
          onOpenInquiry={handleOpenInquiry}
        />

        <main className="flex-grow">
          {/* Section 1: Hero Ambient Video Loop & Kinetic Typography */}
          <PrivyHero onOpen3DMap={handleOpen3DMap} />

          {/* Section 2: "A Handpicked Collection" Asymmetric Parallax Triptych in Ivory */}
          <PrivyTriptych />

          {/* Section 3: Full-Bleed Cinematic Narrative Video Breaker */}
          <PrivyVideoInterlude />

          {/* Section 4: Architectural Tenets Pinned Slider (3 Disciplines) */}
          <PrivyTenetsSlider />

          {/* Section 5: Selected Commissions / Residence Matrix */}
          <PrivyCollectionGrid onSelectProject={handleSelectProject} />
        </main>

        {/* Global Luxury Footer */}
        <PrivyFooter onOpenInquiry={handleOpenInquiry} />

        {/* Interactive 3D BIM Structural Explorer Modal */}
        <Privy3DModal
          isOpen={modal3DOpen}
          onClose={() => setModal3DOpen(false)}
        />

        {/* Private Advisory & Acquisition Dossier Modal */}
        <PrivyAcquisitionModal
          isOpen={inquiryModalOpen}
          onClose={() => setInquiryModalOpen(false)}
          selectedProject={selectedProject}
        />
      </div>
    </SmoothScroll>
  );
}
