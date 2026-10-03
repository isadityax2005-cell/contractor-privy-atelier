"use client";

import React, { useState } from "react";
import { siteConfig } from "@/data/site-config";
import { Hammer, Menu, X, ArrowUpRight, Phone, Calculator } from "lucide-react";

interface NavigationProps {
  onOpenConsultation: () => void;
}

export default function Navigation({ onOpenConsultation }: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-[37px] z-40 bg-zinc-950/90 backdrop-blur-md border-b border-white/10 transition-all">
      <div className="shell-container flex items-center justify-between py-4">
        {/* Brand Logo */}
        <a href="#top" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-lg bg-orange-600 flex items-center justify-center text-white shadow-lg shadow-orange-600/30 group-hover:scale-105 transition-transform">
            <Hammer className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-lg tracking-tight text-white uppercase font-heading">
                {siteConfig.shortName}
              </span>
              <span className="hidden sm:inline-block text-[10px] uppercase font-bold bg-white/10 text-orange-400 px-2 py-0.5 rounded border border-orange-500/30 font-mono-draft">
                TX-BLD
              </span>
            </div>
            <p className="text-[10px] text-neutral-400 tracking-wider uppercase font-semibold">
              Architectural Builders & Remodel
            </p>
          </div>
        </a>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-8 text-xs font-semibold text-neutral-300 uppercase tracking-wider">
          <a href="#calculator" className="hover:text-orange-400 transition-colors flex items-center gap-1.5">
            <Calculator className="w-3.5 h-3.5 text-orange-500" />
            Cost Estimator
          </a>
          <a href="#transformations" className="hover:text-orange-400 transition-colors">
            Before & After
          </a>
          <a href="#blueprint" className="hover:text-orange-400 transition-colors">
            3D Schematics
          </a>
          <a href="#projects" className="hover:text-orange-400 transition-colors">
            Portfolio
          </a>
          <a href="#process" className="hover:text-orange-400 transition-colors">
            Our Process
          </a>
          <a href="#credentials" className="hover:text-orange-400 transition-colors">
            Warranty & Safety
          </a>
        </div>

        {/* Right CTA */}
        <div className="hidden sm:flex items-center gap-3">
          <a
            href={`tel:${siteConfig.officePhone.replace(/\D/g, "")}`}
            className="flex items-center gap-2 text-xs font-bold text-neutral-300 hover:text-white px-3 py-2 rounded border border-white/10 hover:border-white/20 transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-neutral-400" />
            <span>{siteConfig.officePhone}</span>
          </a>

          <button
            type="button"
            onClick={onOpenConsultation}
            className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs uppercase px-4 py-2.5 rounded shadow-lg shadow-orange-600/25 transition-all hover:translate-y-[-1px] cursor-pointer"
          >
            <span>Request Consultation</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mobile Hamburger */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-neutral-300 hover:text-white"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-zinc-950 border-b border-white/10 px-6 py-6 flex flex-col gap-4 text-sm font-semibold uppercase text-neutral-300">
          <a
            href="#calculator"
            onClick={() => setMobileMenuOpen(false)}
            className="py-2 border-b border-white/5 flex items-center justify-between text-orange-400"
          >
            <span>Project Cost Estimator</span>
            <Calculator className="w-4 h-4" />
          </a>
          <a href="#transformations" onClick={() => setMobileMenuOpen(false)} className="py-2 border-b border-white/5">
            Before & After Showcase
          </a>
          <a href="#blueprint" onClick={() => setMobileMenuOpen(false)} className="py-2 border-b border-white/5">
            3D Structural Schematics
          </a>
          <a href="#projects" onClick={() => setMobileMenuOpen(false)} className="py-2 border-b border-white/5">
            Completed Portfolios
          </a>
          <a href="#process" onClick={() => setMobileMenuOpen(false)} className="py-2 border-b border-white/5">
            4-Step Design-Build
          </a>
          <a href="#credentials" onClick={() => setMobileMenuOpen(false)} className="py-2 border-b border-white/5">
            10-Year Warranty & License
          </a>
          <button
            type="button"
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenConsultation();
            }}
            className="w-full mt-2 bg-orange-600 hover:bg-orange-500 text-white font-bold py-3 rounded text-center text-xs tracking-wider"
          >
            Request Architectural Consultation
          </button>
        </div>
      )}
    </nav>
  );
}
