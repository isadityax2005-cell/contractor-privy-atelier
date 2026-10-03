"use client";

import React from "react";
import Image from "next/image";
import { siteConfig } from "@/data/site-config";
import { FolderGit2, Star, CheckCircle, ArrowUpRight } from "lucide-react";

interface ProjectGalleryProps {
  onOpenConsultation: () => void;
}

export default function ProjectGallery({ onOpenConsultation }: ProjectGalleryProps) {
  return (
    <section id="projects" className="py-20 lg:py-28 relative bg-zinc-950">
      <div className="shell-container">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4">
              <FolderGit2 className="w-3.5 h-3.5" />
              <span>Flagship Completed Portfolios</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight uppercase font-heading leading-tight">
              Bespoke Craftsmanship. <br />
              <span className="text-gradient-amber">Built for Generations.</span>
            </h2>
          </div>

          <button
            type="button"
            onClick={onOpenConsultation}
            className="self-start md:self-auto inline-flex items-center gap-2 text-xs uppercase font-bold text-orange-400 hover:text-orange-300 border-b border-orange-500/40 pb-1 cursor-pointer"
          >
            <span>Inquire About Your Project</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

        {/* Projects Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {siteConfig.projects.map((proj) => (
            <article
              key={proj.id}
              className="glass-panel glass-panel-hover rounded-xl overflow-hidden flex flex-col group border border-white/10"
            >
              {/* Image Frame */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-black">
                <Image
                  src={proj.image}
                  alt={proj.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />

                <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded text-[10px] font-mono-draft font-bold text-orange-400 uppercase border border-orange-500/30">
                  {proj.category}
                </div>

                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <div className="text-[11px] text-neutral-300 font-mono-draft">{proj.location}</div>
                  <h3 className="font-heading font-bold text-lg uppercase tracking-tight mt-0.5">
                    {proj.title}
                  </h3>
                </div>
              </div>

              {/* Project Specs Bar */}
              <div className="grid grid-cols-3 border-b border-white/10 p-3 bg-black/40 text-center font-mono-draft text-[11px]">
                <div>
                  <span className="text-neutral-500 block text-[9px] uppercase">Footprint</span>
                  <span className="text-white font-bold">{proj.sqft}</span>
                </div>
                <div className="border-x border-white/5">
                  <span className="text-neutral-500 block text-[9px] uppercase">Timeline</span>
                  <span className="text-white font-bold">{proj.timeline}</span>
                </div>
                <div>
                  <span className="text-neutral-500 block text-[9px] uppercase">Investment</span>
                  <span className="text-orange-400 font-bold">{proj.investment}</span>
                </div>
              </div>

              {/* Highlights & Testimonial */}
              <div className="p-6 flex flex-col justify-between flex-grow space-y-4">
                <div className="space-y-1.5">
                  {proj.highlights.map((h, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-neutral-300">
                      <CheckCircle className="w-3.5 h-3.5 text-orange-500 flex-shrink-0" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>

                {/* Client Quote */}
                <div className="pt-4 border-t border-white/5 text-xs text-neutral-400 italic">
                  <div className="flex items-center gap-1 text-amber-400 mb-1.5 not-italic">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-amber-400" />
                    ))}
                  </div>
                  &ldquo;{proj.clientQuote}&rdquo;
                  <div className="mt-2 text-[11px] font-semibold text-neutral-300 not-italic font-mono-draft">
                    — {proj.clientAuthor}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
