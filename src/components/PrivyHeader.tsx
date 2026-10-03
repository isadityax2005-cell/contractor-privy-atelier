"use client";

import React, { useState, useEffect } from "react";
import { Compass, X, ArrowUpRight, Shield } from "lucide-react";

interface PrivyHeaderProps {
  onOpen3DMap: () => void;
  onOpenInquiry: () => void;
}

export default function PrivyHeader({ onOpen3DMap, onOpenInquiry }: PrivyHeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          isScrolled
            ? "bg-[#1A1919]/90 backdrop-blur-md border-b border-white/10 py-3.5"
            : "bg-gradient-to-b from-[#1A1919]/90 to-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-10 flex items-center justify-between">
          {/* Left: Minimal Menu Trigger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="group flex items-center gap-3 text-xs tracking-[0.25em] text-[#E5D8CA] hover:text-white uppercase transition-colors"
            aria-label="Toggle menu"
          >
            <span className="w-5 h-5 flex flex-col justify-center gap-1">
              <span
                className={`block h-[1px] bg-current transition-all duration-300 ${
                  menuOpen ? "w-5 translate-y-[2.5px] rotate-45" : "w-5"
                }`}
              />
              <span
                className={`block h-[1px] bg-current transition-all duration-300 ${
                  menuOpen ? "w-5 -translate-y-[2.5px] -rotate-45" : "w-3 group-hover:w-5"
                }`}
              />
            </span>
            <span className="hidden sm:inline font-light">{menuOpen ? "Close" : "Menu"}</span>
          </button>

          {/* Center: Monogram & Brand */}
          <a
            href="#top"
            className="flex flex-col items-center group cursor-pointer"
            aria-label="Scroll to top"
          >
            <span className="text-[13px] sm:text-[15px] font-medium tracking-[0.35em] text-[#F8F8F8] group-hover:text-[#E5D8CA] transition-colors uppercase">
              ATELIER PRIVÉ
            </span>
            <span className="text-[8px] sm:text-[9px] tracking-[0.45em] text-[#8E8B85] uppercase">
              Sobha Inspired Architecture
            </span>
          </a>

          {/* Right: 3D Map Trigger & Private Consultation */}
          <div className="flex items-center gap-4 sm:gap-7">
            <button
              onClick={onOpen3DMap}
              className="group flex items-center gap-2 text-xs tracking-[0.2em] text-[#E5D8CA] hover:text-white uppercase relative py-1"
            >
              <Compass className="w-3.5 h-3.5 text-[#E5D8CA] group-hover:rotate-45 transition-transform duration-500" />
              <span className="hidden sm:inline">3D BIM Model</span>
              <span className="absolute bottom-0 left-0 right-0 h-[1px] bg-[#E5D8CA] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </button>

            <button
              onClick={onOpenInquiry}
              className="hidden md:inline-flex items-center gap-2 text-xs tracking-[0.2em] uppercase px-4 py-2 border border-[#E5D8CA]/40 hover:border-[#E5D8CA] text-[#F8F8F8] hover:bg-[#E5D8CA]/10 transition-all rounded-none"
            >
              <span>Acquisition Dossier</span>
              <ArrowUpRight className="w-3 h-3 text-[#E5D8CA]" />
            </button>
          </div>
        </div>
      </header>

      {/* Full-screen Luxury Navigation Overlay */}
      {menuOpen && (
        <div className="fixed inset-0 z-30 bg-[#1A1919] flex flex-col justify-between p-8 sm:p-16 animate-fadeIn text-[#F8F8F8]">
          <div className="flex justify-between items-center border-b border-white/10 pb-6">
            <span className="text-[10px] tracking-[0.4em] text-[#8E8B85] uppercase">
              Index of Architecture
            </span>
            <button
              onClick={() => setMenuOpen(false)}
              className="text-xs tracking-[0.2em] text-[#E5D8CA] hover:text-white uppercase flex items-center gap-2"
            >
              <X className="w-4 h-4" />
              <span>Close</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto w-full my-auto">
            <nav className="flex flex-col gap-6">
              {[
                { name: "The Collection", href: "#about", num: "01" },
                { name: "Architectural Tenets", href: "#tenets", num: "02" },
                { name: "Interactive 3D Model", action: onOpen3DMap, num: "03" },
                { name: "Masterwork Portfolio", href: "#portfolio", num: "04" },
                { name: "Acquisition Dossier", action: onOpenInquiry, num: "05" },
              ].map((item) => (
                <div key={item.name} className="group flex items-baseline gap-4 cursor-pointer">
                  <span className="text-xs font-mono text-[#8E8B85] group-hover:text-[#E5D8CA] transition-colors">
                    {item.num}
                  </span>
                  {item.href ? (
                    <a
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      className="text-3xl sm:text-5xl font-light tracking-tight hover:text-[#E5D8CA] transition-colors"
                    >
                      {item.name}
                    </a>
                  ) : (
                    <button
                      onClick={() => {
                        setMenuOpen(false);
                        if (item.action) item.action();
                      }}
                      className="text-3xl sm:text-5xl font-light tracking-tight text-left hover:text-[#E5D8CA] transition-colors"
                    >
                      {item.name}
                    </button>
                  )}
                </div>
              ))}
            </nav>

            <div className="border-l border-white/10 pl-8 flex flex-col justify-between hidden md:flex">
              <div>
                <p className="text-xs tracking-[0.3em] text-[#8E8B85] uppercase mb-4">
                  Global Ateliers
                </p>
                <div className="space-y-3 text-sm text-[#E5D8CA] font-light">
                  <p>Dubai · DIFC Gate Precinct 4</p>
                  <p>London · Mayfair, 14 Berkeley Square</p>
                  <p>Zurich · Bahnhofstrasse 28</p>
                  <p>Los Angeles · Beverly Hills Triangle</p>
                </div>
              </div>

              <div className="pt-8 border-t border-white/10">
                <p className="text-xs tracking-[0.3em] text-[#8E8B85] uppercase mb-2">
                  Direct Principal Line
                </p>
                <a
                  href="tel:+18005550199"
                  className="text-xl font-light tracking-wide text-white hover:text-[#E5D8CA] transition-colors"
                >
                  +1 (800) 555-0199
                </a>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center text-[10px] tracking-[0.3em] text-[#8E8B85] uppercase border-t border-white/10 pt-6">
            <span>© 2026 ATELIER PRIVÉ</span>
            <span>All rights reserved · Structural Permanence</span>
          </div>
        </div>
      )}
    </>
  );
}
