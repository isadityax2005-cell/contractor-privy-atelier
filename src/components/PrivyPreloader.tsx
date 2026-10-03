"use client";

import React, { useEffect, useState } from "react";

interface PrivyPreloaderProps {
  onComplete?: () => void;
}

export default function PrivyPreloader({ onComplete }: PrivyPreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => setIsDone(true), 250);
          setTimeout(() => {
            setShouldRender(false);
            if (onComplete) onComplete();
          }, 850);
          return 100;
        }
        // Smooth logarithmic easing for natural luxury feel
        const increment = prev < 60 ? Math.floor(Math.random() * 8) + 4 : Math.floor(Math.random() * 4) + 2;
        return Math.min(prev + increment, 100);
      });
    }, 45);

    return () => clearInterval(timer);
  }, [onComplete]);

  if (!shouldRender) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#1A1919] transition-opacity duration-700 ease-out select-none ${
        isDone ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* Subtle Noise / Gradient Atmosphere */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0%,transparent_70%)]" />

      {/* Geometric Luxury Monogram Morphing SVG */}
      <div className="relative z-10 flex flex-col items-center">
        <svg
          width="80"
          height="80"
          viewBox="0 0 80 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="mb-8"
        >
          <defs>
            <linearGradient id="monogram-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="35%" stopColor="#AFAFAF" />
              <stop offset="70%" stopColor="#717170" />
              <stop offset="100%" stopColor="#3C3C3B" />
            </linearGradient>
            <linearGradient id="gold-accent" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#8C7A65" />
              <stop offset="50%" stopColor="#D4C3B3" />
              <stop offset="100%" stopColor="#8C7A65" />
            </linearGradient>
          </defs>

          {/* Exterior Geometric Minimalist Diamond Frame */}
          <rect
            x="40"
            y="6"
            width="48"
            height="48"
            transform="rotate(45 40 6)"
            stroke="url(#monogram-grad)"
            strokeWidth="1.2"
            fill="none"
            strokeDasharray="200"
            strokeDashoffset={200 - (progress / 100) * 200}
            className="transition-all duration-100 ease-out"
          />

          {/* Architectural Axis Crosshairs */}
          <line
            x1="40"
            y1="16"
            x2="40"
            y2="64"
            stroke="url(#gold-accent)"
            strokeWidth="0.8"
            strokeOpacity="0.4"
          />
          <line
            x1="16"
            y1="40"
            x2="64"
            y2="40"
            stroke="url(#gold-accent)"
            strokeWidth="0.8"
            strokeOpacity="0.4"
          />

          {/* Precision Architectural Core Nodes */}
          <circle cx="40" cy="40" r="3" fill="#E5D8CA" className="animate-pulse" />
          <circle cx="40" cy="40" r="12" stroke="url(#gold-accent)" strokeWidth="0.75" strokeDasharray="3 3" />
        </svg>

        {/* Brand Typography */}
        <div className="text-center overflow-hidden">
          <p className="text-[11px] tracking-[0.45em] text-[#AFAFAF] uppercase font-light font-sans mb-1.5">
            ATELIER PRIVÉ
          </p>
          <p className="text-[9px] tracking-[0.3em] text-[#717170] uppercase">
            ARCHITECTURAL COLLECTION
          </p>
        </div>

        {/* Progress Tracker */}
        <div className="mt-8 flex items-center gap-3">
          <div className="w-24 h-[1px] bg-white/10 relative overflow-hidden">
            <div
              className="absolute left-0 top-0 bottom-0 bg-[#E5D8CA] transition-all duration-75 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="text-[10px] tracking-widest text-[#E5D8CA] font-mono min-w-[3ch] text-right">
            {progress}%
          </span>
        </div>
      </div>
    </div>
  );
}
