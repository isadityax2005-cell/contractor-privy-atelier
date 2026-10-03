"use client";

import React from "react";
import { siteConfig } from "@/data/site-config";
import { HardHat, ShieldCheck, Award, FileText, CheckCircle2 } from "lucide-react";

export default function ProcessSection() {
  return (
    <section id="process" className="py-20 lg:py-28 relative bg-zinc-950/70 border-t border-white/5">
      <div className="shell-container">
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4">
            <HardHat className="w-3.5 h-3.5" />
            <span>The Vanguard Design-Build Protocol</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight uppercase font-heading leading-tight">
            Predictable Timelines. <br />
            <span className="text-gradient-amber">White-Glove Construction Management.</span>
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base mt-4 leading-relaxed">
            Most contractors operate on guesswork and chaotic billings. We run your custom build with the rigor of commercial aerospace engineering.
          </p>
        </div>

        {/* 4-Step Process Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {siteConfig.processSteps.map((s) => (
            <div
              key={s.step}
              className="glass-panel p-6 rounded-xl border border-white/10 relative flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl font-extrabold text-orange-500 font-mono-draft">{s.step}</span>
                  <span className="text-[11px] font-mono-draft uppercase bg-white/5 px-2.5 py-1 rounded text-neutral-400 border border-white/10">
                    {s.timeline}
                  </span>
                </div>
                <h3 className="font-heading font-bold text-lg text-white uppercase mb-2">{s.title}</h3>
                <p className="text-xs text-neutral-400 leading-relaxed">{s.desc}</p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/5 flex items-center gap-1.5 text-[11px] text-orange-400 font-mono-draft">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Strict Quality Milestone</span>
              </div>
            </div>
          ))}
        </div>

        {/* Credentials & Structural Backing Banner */}
        <div id="credentials" className="glass-panel rounded-2xl p-8 sm:p-12 border border-orange-500/20 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-7 space-y-4">
              <span className="text-xs uppercase font-mono-draft font-bold text-orange-400 tracking-widest flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-orange-500" />
                Verified Legal Standing &amp; Client Protection
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white uppercase font-heading">
                {siteConfig.warrantyYears}-Year Structural Warranty &amp; $5,000,000 Insurance
              </h3>
              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                We carry top-tier commercial liability and workman&apos;s compensation with zero deductible client liability.
                Every structural alteration is certified by our third-party licensed PE (Professional Engineer) and registered
                with the municipal building department.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs text-neutral-300">
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-orange-400" />
                  <span>State License: <strong className="text-white font-mono-draft">{siteConfig.licenseNumber}</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-orange-400" />
                  <span>EPA Lead-Safe Certified Firm #NAT-89421</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-black/50 border border-white/10 text-center">
                <span className="text-3xl sm:text-4xl font-extrabold text-white font-heading">{siteConfig.yearsInBusiness}+</span>
                <span className="text-[11px] uppercase tracking-wider text-neutral-400 block mt-1">Years Master Building</span>
              </div>
              <div className="p-4 rounded-xl bg-black/50 border border-white/10 text-center">
                <span className="text-3xl sm:text-4xl font-extrabold text-orange-400 font-heading">{siteConfig.clientRating}★</span>
                <span className="text-[11px] uppercase tracking-wider text-neutral-400 block mt-1">{siteConfig.reviewsCount} Homeowner Reviews</span>
              </div>
              <div className="p-4 rounded-xl bg-black/50 border border-white/10 text-center col-span-2">
                <span className="text-3xl sm:text-4xl font-extrabold text-white font-heading">{siteConfig.projectsCompleted}+</span>
                <span className="text-[11px] uppercase tracking-wider text-neutral-400 block mt-1">Luxury Residential Projects Delivered</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
