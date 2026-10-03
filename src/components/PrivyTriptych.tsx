"use client";

import React from "react";
import Image from "next/image";
import { privyData } from "@/data/privy-data";

export default function PrivyTriptych() {
  return (
    <section
      id="about"
      className="relative z-10 w-full bg-[#F8F8F8] text-[#1A1919] py-24 sm:py-36 px-6 sm:px-12 transition-colors duration-700"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-24">
          <p className="text-xs sm:text-sm font-light tracking-[0.35em] text-[#717170] uppercase mb-4">
            {privyData.triptych.eyebrow}
          </p>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-extralight tracking-tight uppercase leading-[1.1] text-[#1A1919]">
            of the rarest <br />
            <span className="font-serif italic font-normal text-[#6B5E51]">private estates</span>
          </h2>
        </div>

        {/* 3-Column Asymmetric Parallax Triptych */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-10 items-center mb-24">
          {/* Left Flanking Image (Floating Upward) */}
          <div className="md:col-span-3 order-2 md:order-1 transform md:-translate-y-8 transition-transform duration-700">
            <div className="relative aspect-[3/4] w-full overflow-hidden bg-neutral-200 shadow-xl group">
              <Image
                src={privyData.triptych.leftImage}
                alt="Architectural detail"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                sizes="(max-width: 768px) 100vw, 25vw"
              />
              <div className="absolute inset-0 bg-[#1A1919]/10 group-hover:bg-transparent transition-colors duration-500" />
            </div>
            <p className="mt-4 text-[10px] tracking-[0.25em] text-[#717170] uppercase">
              FIG. 01 · CANTILEVERED GEOMETRY
            </p>
          </div>

          {/* Center Monumental Focal Piece (Dominant Scale) */}
          <div className="md:col-span-6 order-1 md:order-2">
            <div className="relative aspect-[4/5] sm:aspect-[4/5.5] w-full overflow-hidden bg-neutral-300 shadow-2xl group">
              <Image
                src={privyData.triptych.centerImage}
                alt="Principal Estate View"
                fill
                priority
                className="object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-[#1A1919]/5 group-hover:bg-transparent transition-colors duration-500" />
            </div>
            <div className="mt-4 flex justify-between items-baseline">
              <p className="text-[11px] tracking-[0.3em] text-[#1A1919] uppercase font-medium">
                THE BEL-AIR MONOLITH
              </p>
              <span className="text-[10px] tracking-widest text-[#717170] font-mono">
                18,400 SQ.FT
              </span>
            </div>
          </div>

          {/* Right Flanking Image (Floating Upward) */}
          <div className="md:col-span-3 order-3 transform md:translate-y-8 transition-transform duration-700">
            <div className="relative aspect-[3/4] w-full overflow-hidden bg-neutral-200 shadow-xl group">
              <Image
                src={privyData.triptych.rightImage}
                alt="Material texture and reflection basin"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                sizes="(max-width: 768px) 100vw, 25vw"
              />
              <div className="absolute inset-0 bg-[#1A1919]/10 group-hover:bg-transparent transition-colors duration-500" />
            </div>
            <p className="mt-4 text-[10px] tracking-[0.25em] text-[#717170] uppercase">
              FIG. 02 · HONED ROMAN TRAVERTINE
            </p>
          </div>
        </div>

        {/* Editorial Narrative Statement */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end pt-12 border-t border-neutral-200">
          <div className="md:col-span-8">
            <h3 className="text-2xl sm:text-4xl md:text-5xl font-light tracking-tight text-[#1A1919] uppercase leading-[1.15]">
              Exclusive homes in the world&apos;s most rarefied geographies.{" "}
              <br className="hidden sm:inline" />
              <span className="font-serif italic font-normal text-[#6B5E51]">
                For the true connoisseurs of fine living
              </span>
            </h3>
          </div>
          <div className="md:col-span-4">
            <p className="text-xs sm:text-sm text-[#717170] leading-relaxed tracking-wide font-light">
              Every residence bearing our commission is selected through an uncompromising audit of
              structural permanence, environmental topography, and architectural pedigree.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
