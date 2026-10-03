"use client";

import React, { useState, useMemo } from "react";
import { siteConfig, ProjectCategory, MaterialTier } from "@/data/site-config";
import { Calculator, ArrowRight, ShieldCheck, Clock, CheckCircle2, DollarSign } from "lucide-react";

interface ProjectEstimatorProps {
  onSelectEstimate: (estimateData: {
    category: string;
    tier: string;
    sqft: number;
    estimatedMin: number;
    estimatedMax: number;
    timelineWeeks: number;
  }) => void;
}

export default function ProjectEstimator({ onSelectEstimate }: ProjectEstimatorProps) {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>(siteConfig.categories[0].id);
  const [selectedTierId, setSelectedTierId] = useState<string>(siteConfig.tiers[1].id); // default to Architectural Luxury

  const currentCategory = useMemo<ProjectCategory>(
    () => siteConfig.categories.find((c) => c.id === selectedCategoryId) || siteConfig.categories[0],
    [selectedCategoryId]
  );

  const currentTier = useMemo<MaterialTier>(
    () => siteConfig.tiers.find((t) => t.id === selectedTierId) || siteConfig.tiers[0],
    [selectedTierId]
  );

  const [sqft, setSqft] = useState<number>(currentCategory.defaultSqFt);

  // When category changes, reset sqft to that category's default
  const handleCategoryChange = (catId: string) => {
    setSelectedCategoryId(catId);
    const cat = siteConfig.categories.find((c) => c.id === catId);
    if (cat) {
      setSqft(cat.defaultSqFt);
    }
  };

  // Calculations
  const baseCostPerSqFt = currentCategory.baseCostPerSqFt * currentTier.multiplier;
  const rawEstimate = sqft * baseCostPerSqFt;
  const estimatedMin = Math.round((rawEstimate * 0.92) / 1000) * 1000;
  const estimatedMax = Math.round((rawEstimate * 1.08) / 1000) * 1000;
  const timelineWeeks = Math.max(
    6,
    Math.round((sqft / 1000) * currentCategory.durationWeeksPerThousandSqFt * (currentTier.id === "haute" ? 1.25 : 1.0))
  );

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(val);
  };

  const handleLockIn = () => {
    onSelectEstimate({
      category: currentCategory.name,
      tier: currentTier.name,
      sqft,
      estimatedMin,
      estimatedMax,
      timelineWeeks,
    });
  };

  return (
    <section id="calculator" className="py-20 lg:py-28 relative overflow-hidden bg-zinc-950/80">
      {/* Background Architectural Grid Elements */}
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(#f97316_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="shell-container relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4">
            <Calculator className="w-3.5 h-3.5" />
            <span>Interactive Architectural Cost Engine</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight uppercase font-heading leading-tight">
            Instant Estimate. <br />
            <span className="text-gradient-amber">No Vague Ranges. No Surprises.</span>
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base mt-4 leading-relaxed">
            Every high-ticket remodel starts with transparent structural parameters. Select your project classification,
            desired footprint, and finishes tier below for a real-time calibrated investment scope.
          </p>
        </div>

        {/* Estimator Grid Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Controls Column (7 Cols) */}
          <div className="lg:col-span-7 glass-panel cad-corner rounded-xl p-6 sm:p-8 space-y-8">
            {/* Step 1: Select Category */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-xs font-bold uppercase tracking-wider text-neutral-300 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-orange-500/20 text-orange-400 flex items-center justify-center text-[10px] font-mono-draft">
                    01
                  </span>
                  Select Project Classification
                </label>
                <span className="text-[11px] text-neutral-500 uppercase font-mono-draft">
                  {siteConfig.categories.length} Categories
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {siteConfig.categories.map((cat) => {
                  const isSelected = cat.id === selectedCategoryId;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => handleCategoryChange(cat.id)}
                      className={`text-left p-3.5 rounded-lg border transition-all cursor-pointer ${
                        isSelected
                          ? "bg-orange-500/15 border-orange-500 text-white shadow-sm shadow-orange-500/10"
                          : "bg-white/[0.02] border-white/10 text-neutral-300 hover:border-white/20 hover:bg-white/[0.04]"
                      }`}
                    >
                      <div className="font-bold text-xs uppercase tracking-wide">{cat.name}</div>
                      <div className="text-[11px] text-neutral-400 mt-1 line-clamp-1">{cat.description}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Footprint Slider */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold uppercase tracking-wider text-neutral-300 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-orange-500/20 text-orange-400 flex items-center justify-center text-[10px] font-mono-draft">
                    02
                  </span>
                  Anticipated Square Footage
                </label>
                <div className="bg-orange-500/10 border border-orange-500/30 px-3 py-1 rounded text-orange-400 font-mono-draft font-bold text-sm">
                  {sqft.toLocaleString()} SQ FT
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <input
                  type="range"
                  min={currentCategory.minSqFt}
                  max={currentCategory.maxSqFt}
                  step={50}
                  value={sqft}
                  onChange={(e) => setSqft(Number(e.target.value))}
                  className="w-full cursor-pointer accent-orange-500"
                />
                <div className="flex justify-between text-[11px] font-mono-draft text-neutral-500 uppercase">
                  <span>Min: {currentCategory.minSqFt.toLocaleString()} sq ft</span>
                  <span className="text-neutral-400">Drag to adjust footprint</span>
                  <span>Max: {currentCategory.maxSqFt.toLocaleString()} sq ft</span>
                </div>
              </div>
            </div>

            {/* Step 3: Material & Craftsmanship Tier */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-xs font-bold uppercase tracking-wider text-neutral-300 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-orange-500/20 text-orange-400 flex items-center justify-center text-[10px] font-mono-draft">
                    03
                  </span>
                  Architectural Specification Tier
                </label>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {siteConfig.tiers.map((tier) => {
                  const isSelected = tier.id === selectedTierId;
                  return (
                    <button
                      key={tier.id}
                      type="button"
                      onClick={() => setSelectedTierId(tier.id)}
                      className={`text-left p-3.5 rounded-lg border transition-all cursor-pointer ${
                        isSelected
                          ? "bg-orange-500/15 border-orange-500 text-white ring-1 ring-orange-500/30"
                          : "bg-white/[0.02] border-white/10 text-neutral-300 hover:border-white/20 hover:bg-white/[0.04]"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs uppercase tracking-tight">{tier.name}</span>
                        {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-orange-400" />}
                      </div>
                      <div className="text-[11px] text-neutral-400 mt-1.5 line-clamp-2">{tier.description}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Inclusions checklist for selected tier */}
            <div className="p-4 rounded-lg bg-black/40 border border-white/5 space-y-2">
              <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider block font-mono-draft">
                Included in &ldquo;{currentTier.name}&rdquo; Specification:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-neutral-300">
                {currentTier.highlights.map((h, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-orange-400 flex-shrink-0" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Live Scope & Estimate Output (5 Cols) */}
          <div className="lg:col-span-5 glass-panel rounded-xl p-6 sm:p-8 space-y-6 lg:sticky lg:top-28">
            <div className="border-b border-white/10 pb-4">
              <span className="text-[11px] uppercase tracking-wider font-bold text-neutral-400 font-mono-draft">
                Calibrated Cost Forecast
              </span>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-3xl sm:text-4xl font-extrabold text-orange-400 font-heading tracking-tight">
                  {formatCurrency(estimatedMin)}
                </span>
                <span className="text-xl font-bold text-neutral-400 font-heading">—</span>
                <span className="text-3xl sm:text-4xl font-extrabold text-orange-400 font-heading tracking-tight">
                  {formatCurrency(estimatedMax)}
                </span>
              </div>
              <p className="text-xs text-neutral-400 mt-2">
                Estimated average rate:{" "}
                <span className="text-white font-mono-draft font-semibold">
                  ${Math.round(baseCostPerSqFt)} / sq ft
                </span>{" "}
                inclusive of structural labor, materials &amp; permits.
              </p>
            </div>

            {/* Estimated Duration & Phases */}
            <div className="grid grid-cols-2 gap-3 py-2">
              <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5">
                <div className="flex items-center gap-1.5 text-neutral-400 text-xs font-semibold uppercase">
                  <Clock className="w-3.5 h-3.5 text-orange-400" />
                  <span>Build Timeline</span>
                </div>
                <div className="text-lg font-bold text-white font-mono-draft mt-1">
                  ~{timelineWeeks} Weeks
                </div>
                <div className="text-[10px] text-neutral-500">From permit approval</div>
              </div>

              <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5">
                <div className="flex items-center gap-1.5 text-neutral-400 text-xs font-semibold uppercase">
                  <ShieldCheck className="w-3.5 h-3.5 text-orange-400" />
                  <span>Contract Guarantee</span>
                </div>
                <div className="text-lg font-bold text-white font-mono-draft mt-1">
                  100% Fixed
                </div>
                <div className="text-[10px] text-neutral-500">No surprise change orders</div>
              </div>
            </div>

            {/* Scope Phase Allocation Progress */}
            <div>
              <span className="text-[11px] uppercase tracking-wider font-bold text-neutral-400 font-mono-draft block mb-3">
                Scope Cost Allocation Breakdown:
              </span>
              <div className="space-y-2 text-xs">
                <div>
                  <div className="flex justify-between text-neutral-300 mb-1">
                    <span>Structural Engineering &amp; Demolition</span>
                    <span className="font-mono-draft text-neutral-400">18%</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 rounded-full w-[18%]" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-neutral-300 mb-1">
                    <span>Rough MEP, Framing &amp; Building Envelope</span>
                    <span className="font-mono-draft text-neutral-400">32%</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-orange-500 rounded-full w-[32%]" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-neutral-300 mb-1">
                    <span>Architectural Finishes, Stone &amp; Custom Millwork</span>
                    <span className="font-mono-draft text-neutral-400">38%</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 rounded-full w-[38%]" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-neutral-300 mb-1">
                    <span>Permits, Project Supervision &amp; Turnover</span>
                    <span className="font-mono-draft text-neutral-400">12%</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-purple-500 rounded-full w-[12%]" />
                  </div>
                </div>
              </div>
            </div>

            {/* Lock In CTA Button */}
            <div className="pt-2">
              <button
                type="button"
                onClick={handleLockIn}
                className="w-full bg-orange-600 hover:bg-orange-500 text-white font-extrabold text-xs uppercase tracking-wider py-4 rounded-lg shadow-xl shadow-orange-600/30 flex items-center justify-center gap-2 transition-all hover:translate-y-[-1px] cursor-pointer"
              >
                <span>Lock In Estimate &amp; Request Blueprint Audit</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <p className="text-[11px] text-center text-neutral-500 mt-3">
                No credit card required. Connect directly with our lead structural estimator.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
