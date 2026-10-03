"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { privyData, ProjectItem } from "@/data/privy-data";

interface PrivyCollectionGridProps {
  onSelectProject: (project: ProjectItem) => void;
}

export default function PrivyCollectionGrid({ onSelectProject }: PrivyCollectionGridProps) {
  const [activeFilter, setActiveFilter] = useState<string>("All");

  const filteredProjects =
    activeFilter === "All"
      ? privyData.projects
      : privyData.projects.filter((p) => p.category === activeFilter);

  return (
    <section id="portfolio" className="relative w-full bg-[#1A1919] text-[#F8F8F8] py-24 sm:py-36 px-6 sm:px-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        {/* Header & Filter Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 sm:mb-20 pb-8 border-b border-white/10 gap-6">
          <div>
            <p className="text-xs font-light tracking-[0.35em] text-[#8E8B85] uppercase mb-3">
              THE PORTFOLIO
            </p>
            <h2 className="text-3xl sm:text-5xl font-extralight tracking-tight uppercase text-[#F8F8F8]">
              Selected <span className="font-serif italic text-[#E5D8CA]">Commissions</span>
            </h2>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {["All", "Architecture", "Design-Build", "Private Estate"].map((category) => (
              <button
                key={category}
                onClick={() => setActiveFilter(category)}
                className={`text-xs tracking-[0.2em] uppercase px-4 py-2 border transition-all duration-300 ${
                  activeFilter === category
                    ? "border-[#E5D8CA] text-white bg-white/5"
                    : "border-white/10 text-[#8E8B85] hover:border-white/30"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* 2-Column Luxury Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 sm:gap-16">
          {filteredProjects.map((project, idx) => (
            <div
              key={project.id}
              onClick={() => onSelectProject(project)}
              className="group cursor-pointer flex flex-col justify-between"
            >
              {/* Image Frame */}
              <div className="relative aspect-[16/11] w-full overflow-hidden bg-neutral-900 border border-white/10 mb-6">
                <Image
                  src={project.image}
                  alt={project.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out filter contrast-105 brightness-95"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-[#1A1919]/20 group-hover:bg-transparent transition-colors duration-500" />
                
                {/* Subtle Category Badge */}
                <div className="absolute top-4 left-4 text-[9px] tracking-[0.3em] uppercase px-2.5 py-1 bg-black/60 backdrop-blur-md text-[#E5D8CA] border border-white/10">
                  {project.category}
                </div>

                <div className="absolute bottom-4 right-4 p-2 bg-[#1A1919]/80 backdrop-blur-md text-white/80 group-hover:text-white group-hover:bg-[#E5D8CA] group-hover:text-black transition-all">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>

              {/* Editorial Spec Information */}
              <div>
                <div className="flex justify-between items-baseline mb-2">
                  <span className="text-[10px] tracking-[0.3em] text-[#8E8B85] uppercase">
                    {project.location} · {project.year}
                  </span>
                  <span className="text-xs font-mono text-[#E5D8CA] tracking-wider">
                    {project.sqft} {project.acreage && `· ${project.acreage}`}
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-extralight tracking-tight text-white uppercase group-hover:text-[#E5D8CA] transition-colors mb-3">
                  {project.name}
                </h3>

                <p className="text-xs sm:text-sm text-[#8E8B85] font-light leading-relaxed mb-4">
                  {project.tagline}
                </p>

                {/* Material Tags */}
                <div className="flex flex-wrap gap-2 pt-3 border-t border-white/5">
                  {project.materials.map((mat) => (
                    <span
                      key={mat}
                      className="text-[9px] font-mono tracking-wider text-[#AFAFAF] uppercase px-2 py-0.5 bg-white/5"
                    >
                      {mat}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
