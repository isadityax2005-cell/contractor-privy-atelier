"use client";

import React from "react";
import Image from "next/image";
import { ChevronDown, Maximize2 } from "lucide-react";
import { privyData } from "@/data/privy-data";

interface PrivyHeroProps {
  onOpen3DMap: () => void;
}

export default function PrivyHero({ onOpen3DMap }: PrivyHeroProps) {
  return (
    <section className="relative w-full h-screen min-h-[700px] flex items-center justify-center overflow-hidden bg-[#1A1919]">
      {/* Ambient Looping Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover opacity-45 brightness-90 filter contrast-110"
        >
          <source src={privyData.hero.video} type="video/mp4" />
        </video>
        {/* Subtle Vignette & Luxury Gradient Shading */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1919] via-[#1A1919]/40 to-[#1A1919]/80" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,#1A1919_100%)]" />
      </div>

      {/* Main Kinetic Typography */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center select-none pt-12">
        <p className="text-sm sm:text-lg md:text-xl font-light tracking-[0.35em] text-[#E5D8CA] uppercase mb-4 animate-fade-in">
          {privyData.hero.eyebrow}
        </p>
        <h1 className="text-4xl sm:text-6xl md:text-8xl font-extralight tracking-tight text-[#F8F8F8] leading-[1.05] uppercase">
          of architectural <br className="hidden sm:inline" />
          <span className="font-light italic text-[#E5D8CA]">permanence</span>
        </h1>
        <p className="mt-8 text-xs sm:text-sm tracking-[0.25em] text-[#8E8B85] uppercase max-w-xl mx-auto">
          Bespoke Architecture · Master Design-Build · Private Estates
        </p>
      </div>

      {/* Scroll Down Circular Gradient Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center">
        <a
          href="#about"
          className="group relative w-12 h-12 rounded-full border border-white/20 hover:border-[#E5D8CA] flex items-center justify-center transition-all duration-300 hover:scale-110 bg-black/20 backdrop-blur-sm"
          aria-label="Scroll down to collection"
        >
          <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none" viewBox="0 0 48 48">
            <circle
              cx="24"
              cy="24"
              r="23"
              fill="none"
              stroke="#E5D8CA"
              strokeWidth="1"
              strokeDasharray="145"
              strokeDashoffset="110"
              className="group-hover:stroke-dashoffset-0 transition-all duration-700"
            />
          </svg>
          <ChevronDown className="w-4 h-4 text-[#E5D8CA] group-hover:translate-y-0.5 transition-transform" />
        </a>
      </div>

      {/* Floating 3D Map / BIM Teaser Card (Exact Sobha Privy Feature) */}
      <div className="absolute bottom-8 right-6 sm:right-12 z-20 hidden sm:block">
        <button
          onClick={onOpen3DMap}
          className="group relative flex flex-col items-start p-4 bg-[#242323]/80 hover:bg-[#242323] border border-white/10 hover:border-[#E5D8CA]/60 backdrop-blur-md transition-all duration-500 rounded-none w-48 text-left shadow-2xl cursor-pointer"
        >
          {/* Card Video Thumbnail */}
          <div className="relative w-full h-24 mb-3 overflow-hidden bg-black/40">
            <video
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover opacity-60 group-hover:opacity-90 group-hover:scale-105 transition-all duration-700"
            >
              <source src={privyData.hero.bimTeaserVideo} type="video/mp4" />
            </video>
            <div className="absolute top-2 right-2 p-1 bg-black/60 rounded-full text-white/80 group-hover:text-white">
              <Maximize2 className="w-3 h-3" />
            </div>
          </div>

          <div className="flex items-baseline justify-between w-full">
            <span className="text-xl font-light text-white tracking-wider">3D</span>
            <span className="text-[9px] tracking-[0.25em] text-[#E5D8CA] uppercase">
              BIM MODEL
            </span>
          </div>
          <span className="text-[10px] tracking-widest text-[#8E8B85] uppercase mt-1">
            Explore Structure &amp; Coordinates →
          </span>
        </button>
      </div>
    </section>
  );
}
