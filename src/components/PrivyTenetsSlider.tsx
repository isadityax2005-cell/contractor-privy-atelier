"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { privyData } from "@/data/privy-data";

export default function PrivyTenetsSlider() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeTenet = privyData.tenets[activeIndex];

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % privyData.tenets.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + privyData.tenets.length) % privyData.tenets.length);
  };

  return (
    <section id="tenets" className="relative w-full bg-[#1A1919] text-[#F8F8F8] py-24 sm:py-36 px-6 sm:px-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        {/* Section Title Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 sm:mb-20 pb-8 border-b border-white/10 gap-6">
          <div>
            <p className="text-xs font-light tracking-[0.35em] text-[#8E8B85] uppercase mb-3">
              THE PRIVY PRINCIPLES
            </p>
            <h2 className="text-3xl sm:text-5xl font-extralight tracking-tight uppercase text-[#F8F8F8]">
              Architectural <span className="font-serif italic text-[#E5D8CA]">Tenets</span>
            </h2>
          </div>

          {/* Tenet Navigation Tabs */}
          <div className="flex items-center gap-3">
            {privyData.tenets.map((tenet, idx) => (
              <button
                key={tenet.id}
                onClick={() => setActiveIndex(idx)}
                className={`text-xs tracking-[0.2em] uppercase px-4 py-2 border transition-all duration-300 ${
                  activeIndex === idx
                    ? "border-[#E5D8CA] text-white bg-white/5"
                    : "border-white/10 text-[#8E8B85] hover:border-white/30"
                }`}
              >
                {tenet.number} · {tenet.discipline.split(" ")[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Active Tenet Display */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Left Column: Visual Media (Video / Imagery Card) */}
          <div className="lg:col-span-7">
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-neutral-900 border border-white/10 shadow-2xl group">
              <video
                key={activeTenet.id}
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover filter contrast-110 brightness-90 transition-all duration-700"
              >
                <source src={activeTenet.video} type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A1919] via-transparent to-transparent opacity-80" />

              {/* Number Watermark */}
              <div className="absolute top-6 left-6 font-mono text-3xl font-extralight text-[#E5D8CA]/60">
                {activeTenet.number}
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Copy & Metrics */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <span className="text-[10px] tracking-[0.35em] text-[#E5D8CA] uppercase font-mono">
                {activeTenet.discipline}
              </span>
              <h3 className="text-3xl sm:text-4xl font-extralight tracking-tight text-white uppercase mt-2 mb-4">
                {activeTenet.title}
              </h3>
              <p className="text-base sm:text-lg font-serif italic text-[#E5D8CA] mb-6 leading-snug">
                &ldquo;{activeTenet.leadText}&rdquo;
              </p>
              <p className="text-xs sm:text-sm text-[#8E8B85] leading-relaxed font-light mb-8">
                {activeTenet.description}
              </p>

              {/* Specifications / Metrics */}
              <div className="space-y-3 pt-6 border-t border-white/10">
                {activeTenet.metrics.map((metric) => (
                  <div key={metric} className="flex items-center gap-3 text-xs tracking-wider text-neutral-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#E5D8CA]" />
                    <span className="font-mono text-[11px] text-white/90">{metric}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Prev / Next Slider Controls */}
            <div className="flex items-center gap-4 mt-10 pt-6 border-t border-white/10">
              <button
                onClick={handlePrev}
                className="p-3 border border-white/10 hover:border-[#E5D8CA] hover:text-[#E5D8CA] text-white transition-colors"
                aria-label="Previous tenet"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <span className="text-xs font-mono text-[#8E8B85]">
                {activeTenet.number} / 0{privyData.tenets.length}
              </span>
              <button
                onClick={handleNext}
                className="p-3 border border-white/10 hover:border-[#E5D8CA] hover:text-[#E5D8CA] text-white transition-colors"
                aria-label="Next tenet"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
