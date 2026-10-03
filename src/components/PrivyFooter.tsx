"use client";

import React from "react";
import { ArrowUp } from "lucide-react";
import { privyData } from "@/data/privy-data";

export default function PrivyFooter({ onOpenInquiry }: { onOpenInquiry: () => void }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative w-full bg-[#141313] text-[#F8F8F8] pt-24 pb-12 px-6 sm:px-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        {/* Top Call to Action Monograph */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-20 border-b border-white/10 gap-8">
          <div>
            <span className="text-[10px] tracking-[0.4em] text-[#8E8B85] uppercase font-mono">
              COMMISSIONS &amp; ACQUISITIONS
            </span>
            <h2 className="text-3xl sm:text-5xl font-extralight tracking-tight uppercase text-white mt-2">
              Commission <span className="font-serif italic text-[#E5D8CA]">Permanence</span>
            </h2>
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={onOpenInquiry}
              className="text-xs tracking-[0.25em] uppercase px-8 py-4 bg-[#E5D8CA] text-black font-medium hover:bg-white transition-all cursor-pointer"
            >
              Request Private Dossier
            </button>

            <button
              onClick={scrollToTop}
              className="p-4 border border-white/10 hover:border-[#E5D8CA] text-[#E5D8CA] hover:text-white transition-colors"
              aria-label="Scroll back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Global Ateliers Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 py-16 border-b border-white/10 text-xs font-light">
          <div>
            <p className="text-[10px] tracking-[0.3em] text-[#E5D8CA] uppercase mb-4 font-mono">
              DUBAI ATELIER
            </p>
            <p className="text-[#8E8B85] leading-relaxed">
              Gate Precinct 4, Level 08 <br />
              DIFC, Dubai, UAE <br />
              dubai@atelier-prive.com
            </p>
          </div>

          <div>
            <p className="text-[10px] tracking-[0.3em] text-[#E5D8CA] uppercase mb-4 font-mono">
              LONDON ATELIER
            </p>
            <p className="text-[#8E8B85] leading-relaxed">
              14 Berkeley Square <br />
              Mayfair, London W1J 6BQ <br />
              london@atelier-prive.com
            </p>
          </div>

          <div>
            <p className="text-[10px] tracking-[0.3em] text-[#E5D8CA] uppercase mb-4 font-mono">
              ZURICH ATELIER
            </p>
            <p className="text-[#8E8B85] leading-relaxed">
              Bahnhofstrasse 28 <br />
              8001 Zürich, Switzerland <br />
              zurich@atelier-prive.com
            </p>
          </div>

          <div>
            <p className="text-[10px] tracking-[0.3em] text-[#E5D8CA] uppercase mb-4 font-mono">
              LOS ANGELES ATELIER
            </p>
            <p className="text-[#8E8B85] leading-relaxed">
              9600 Wilshire Boulevard <br />
              Beverly Hills, CA 90212 <br />
              la@atelier-prive.com
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between pt-10 text-[10px] tracking-[0.25em] text-[#8E8B85] uppercase gap-4">
          <p>© 2026 ATELIER PRIVÉ · INSPIRED BY SOBHA PRIVY COLLECTION STANDARDS</p>
          <div className="flex gap-6">
            <span>DISCRETION POLICY</span>
            <span>STRUCTURAL AUDIT</span>
            <span>TERMS OF ENGAGEMENT</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
