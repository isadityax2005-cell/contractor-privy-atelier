"use client";

import React from "react";
import { privyData } from "@/data/privy-data";

export default function PrivyVideoInterlude() {
  return (
    <section className="relative w-full h-[85vh] min-h-[600px] flex items-center justify-center overflow-hidden bg-[#1A1919]">
      {/* Full-bleed Ambient Video Loop */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover opacity-40 filter contrast-125 brightness-75"
        >
          <source src={privyData.interlude.video} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1919] via-[#1A1919]/50 to-[#1A1919]" />
      </div>

      {/* Narrative Parallax Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center select-none">
        <h2 className="text-3xl sm:text-5xl md:text-7xl font-extralight tracking-tight text-[#F8F8F8] uppercase leading-[1.1] mb-6">
          {privyData.interlude.headline}
        </h2>
        <p className="text-sm sm:text-lg md:text-xl font-serif italic text-[#E5D8CA] tracking-wide">
          {privyData.interlude.subheadline}
        </p>

        <div className="mt-12 w-12 h-[1px] bg-[#E5D8CA]/60 mx-auto" />
      </div>
    </section>
  );
}
