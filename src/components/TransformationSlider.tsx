"use client";

import React, { useState, useRef, useCallback } from "react";
import Image from "next/image";
import { siteConfig, TransformationItem } from "@/data/site-config";
import { Sparkles, SlidersHorizontal, ArrowLeftRight, CheckCircle2 } from "lucide-react";

export default function TransformationSlider() {
  const [selectedIdx, setSelectedIdx] = useState<number>(0);
  const [sliderPos, setSliderPos] = useState<number>(50); // 0 to 100%
  const containerRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef<boolean>(false);

  const currentItem = siteConfig.transformations[selectedIdx] || siteConfig.transformations[0];

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const pct = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(pct);
  }, []);

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDraggingRef.current) {
      handleMove(e.clientX);
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    isDraggingRef.current = true;
    handleMove(e.clientX);
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  return (
    <section id="transformations" className="py-20 lg:py-28 relative bg-zinc-950">
      <div className="shell-container">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Before &amp; After Case Studies</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight uppercase font-heading leading-tight">
              Real Transformations. <br />
              <span className="text-gradient-amber">Uncompromising Structural Craft.</span>
            </h2>
          </div>

          {/* Project Switcher Tabs */}
          <div className="flex items-center gap-2 bg-white/5 p-1.5 rounded-lg border border-white/10 self-start md:self-auto">
            {siteConfig.transformations.map((item, idx) => (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  setSelectedIdx(idx);
                  setSliderPos(50);
                }}
                className={`text-xs font-bold uppercase tracking-wider px-3.5 py-2 rounded-md transition-all cursor-pointer ${
                  selectedIdx === idx
                    ? "bg-orange-600 text-white shadow-md shadow-orange-600/30"
                    : "text-neutral-400 hover:text-white hover:bg-white/5"
                }`}
              >
                Project 0{idx + 1}
              </button>
            ))}
          </div>
        </div>

        {/* Project Meta Bar */}
        <div className="glass-panel rounded-t-xl px-6 py-4 border-b-0 flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="text-orange-400 text-xs font-bold font-mono-draft uppercase tracking-wider block">
              {currentItem.category} · {currentItem.location}
            </span>
            <h3 className="text-lg sm:text-xl font-bold text-white uppercase font-heading mt-0.5">
              {currentItem.title}
            </h3>
          </div>

          <div className="flex items-center gap-6 text-xs font-mono-draft">
            <div>
              <span className="text-neutral-500 uppercase block text-[10px]">Investment</span>
              <span className="text-white font-bold">{currentItem.investment}</span>
            </div>
            <div>
              <span className="text-neutral-500 uppercase block text-[10px]">Duration</span>
              <span className="text-white font-bold">{currentItem.duration}</span>
            </div>
          </div>
        </div>

        {/* Interactive Comparison Slider Container */}
        <div
          ref={containerRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchMove={handleTouchMove}
          className="relative w-full aspect-[16/9] sm:aspect-[21/9] select-none cursor-ew-resize overflow-hidden rounded-b-xl border border-white/10 shadow-2xl bg-black"
        >
          {/* AFTER Image (Full background) */}
          <div className="absolute inset-0">
            <Image
              src={currentItem.afterImage}
              alt={currentItem.afterAlt}
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
            {/* After Tag */}
            <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-md border border-orange-500/40 text-orange-400 text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded shadow-lg pointer-events-none">
              After: Finished Architectural Build
            </div>
          </div>

          {/* BEFORE Image (Clipped overlay) */}
          <div
            className="absolute inset-0 overflow-hidden"
            style={{ width: `${sliderPos}%` }}
          >
            <div className="relative w-full h-full min-w-[100%] aspect-[16/9] sm:aspect-[21/9]">
              <Image
                src={currentItem.beforeImage}
                alt={currentItem.beforeAlt}
                fill
                className="object-cover filter grayscale contrast-125"
                sizes="100vw"
              />
            </div>
            {/* Before Tag */}
            <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md border border-white/20 text-neutral-300 text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded shadow-lg pointer-events-none">
              Before: Original Dated State
            </div>
          </div>

          {/* Vertical Divider Handle Line */}
          <div
            className="absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_15px_rgba(255,255,255,0.7)] pointer-events-none"
            style={{ left: `${sliderPos}%` }}
          >
            {/* Center Drag Grip Handle */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-orange-600 border-2 border-white flex items-center justify-center text-white shadow-xl shadow-orange-600/40 cursor-ew-resize pointer-events-auto">
              <ArrowLeftRight className="w-4 h-4 text-white" />
            </div>
          </div>
        </div>

        {/* Caption & Scope Notes */}
        <div className="mt-4 p-4 rounded-lg bg-white/[0.02] border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-neutral-400">
          <p className="max-w-3xl leading-relaxed">
            <strong className="text-white font-semibold">Scope of Work: </strong>
            {currentItem.description}
          </p>
          <div className="flex items-center gap-1.5 text-neutral-500 font-mono-draft text-[11px] flex-shrink-0">
            <SlidersHorizontal className="w-3.5 h-3.5 text-orange-400" />
            <span>Drag slider horizontally to inspect seams</span>
          </div>
        </div>
      </div>
    </section>
  );
}
