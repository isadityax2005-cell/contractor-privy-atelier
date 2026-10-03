"use client";

import React, { useState, useEffect } from "react";
import SmoothScroll from "@/components/SmoothScroll";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import Cursor from "@/components/atelier/Cursor";
import Preloader from "@/components/atelier/Preloader";
import Header from "@/components/atelier/Header";
import Menu from "@/components/atelier/Menu";
import Hero from "@/components/atelier/Hero";
import Luxury from "@/components/atelier/Luxury";
import Merit from "@/components/atelier/Merit";
import Sensation from "@/components/atelier/Sensation";
import Sublime from "@/components/atelier/Sublime";
import Worlds from "@/components/atelier/Worlds";
import Tenets from "@/components/atelier/Tenets";
import Selection from "@/components/atelier/Selection";
import Locations from "@/components/atelier/Locations";
import Idea from "@/components/atelier/Idea";
import Contact from "@/components/atelier/Contact";
import Privy3DModal from "@/components/Privy3DModal";
import PrivyAcquisitionModal from "@/components/PrivyAcquisitionModal";
import type { ProjectItem } from "@/data/atelier";

export default function HomePage() {
  const [ready, setReady] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [modal3DOpen, setModal3DOpen] = useState(false);
  const [dossierOpen, setDossierOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  // Dynamic header theme toggling (Sobha data-themed header)
  useGSAP(
    () => {
      const header = document.querySelector<HTMLElement>(".header");
      if (!header) return;

      const lightSections = gsap.utils.toArray<HTMLElement>('[data-theme="light"]');

      lightSections.forEach((sec) => {
        ScrollTrigger.create({
          trigger: sec,
          start: "top 44px",
          end: "bottom 44px",
          onEnter: () => header.classList.add("is-light"),
          onEnterBack: () => header.classList.add("is-light"),
          onLeave: () => header.classList.remove("is-light"),
          onLeaveBack: () => header.classList.remove("is-light"),
        });
      });

      // Refresh triggers after DOM settles
      const timer = setTimeout(() => ScrollTrigger.refresh(), 300);
      return () => clearTimeout(timer);
    },
    { dependencies: [ready] },
  );

  useEffect(() => {
    const handleResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSelectProject = (project: ProjectItem) => {
    setSelectedProject(project);
    setDossierOpen(true);
  };

  const handleOpenDossier = () => {
    setSelectedProject(null);
    setDossierOpen(true);
  };

  return (
    <SmoothScroll>
      <div className="relative min-h-screen bg-[#1a1919] text-white">
        {/* Custom interactive cursor with blend mode */}
        <Cursor />

        {/* Monogram preloader curtain */}
        <Preloader onReveal={() => setReady(true)} />

        {/* Dynamic Header that adapts theme to dark/light sections */}
        <Header
          ready={ready}
          menuOpen={menuOpen}
          onMenu={() => setMenuOpen((v) => !v)}
          onModel={() => setModal3DOpen(true)}
        />

        {/* Fullscreen circular clip-path menu */}
        <Menu
          open={menuOpen}
          onClose={() => setMenuOpen(false)}
          onModel={() => setModal3DOpen(true)}
          onDossier={handleOpenDossier}
        />

        <main>
          {/* Hero: Sticky ambient video loop + masked typography + 3D card */}
          <Hero ready={ready} onModel={() => setModal3DOpen(true)} />

          {/* About: Light pinned asymmetric triptych choreography */}
          <Luxury />

          {/* Merit: Dark full-height craft-breaker video + text float */}
          <Merit />

          {/* Sensation: 5-line display typography + physical study */}
          <Sensation />

          {/* Sublime: Hillside sanctuary parallax + grand script accent */}
          <Sublime />

          {/* Three Disciplines: Pinned clip wipe layers */}
          <Worlds />

          {/* Tenets: Expanding video card to horizontal slider */}
          <Tenets />

          {/* Selection: Draggable commission carousel */}
          <Selection onSelectProject={handleSelectProject} />

          {/* Locations: Four global ateliers with sticky image crossfade */}
          <Locations />

          {/* The Idea: Founder philosophy on architectural permanence */}
          <Idea />

          {/* Contact & Footer: Confidential inquiry & atelier coordinates */}
          <Contact />
        </main>

        {/* Interactive 3D BIM Structural Modal */}
        <Privy3DModal
          isOpen={modal3DOpen}
          onClose={() => setModal3DOpen(false)}
        />

        {/* Confidential Acquisition Dossier Modal */}
        <PrivyAcquisitionModal
          isOpen={dossierOpen}
          onClose={() => setDossierOpen(false)}
          selectedProject={selectedProject}
        />
      </div>
    </SmoothScroll>
  );
}
