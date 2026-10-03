"use client";

import React from "react";
import { siteConfig } from "@/data/site-config";
import { PhoneCall, ShieldAlert, Clock } from "lucide-react";

export default function EmergencyBanner() {
  return (
    <aside
      className="bg-gradient-to-r from-red-950 via-zinc-950 to-neutral-950 border-b border-red-900/40 text-xs py-2 px-4 sticky top-0 z-50 text-neutral-200"
      aria-label="Emergency Structural Response Banner"
    >
      <div className="shell-container flex flex-wrap items-center justify-between gap-3 text-center sm:text-left">
        <div className="flex items-center gap-2 mx-auto sm:mx-0">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
          </span>
          <span className="font-semibold text-red-200 tracking-wide uppercase text-[11px] flex items-center gap-1.5">
            <ShieldAlert className="w-3.5 h-3.5 text-red-400 inline" />
            24/7 Urgent Structural & Storm Damage Dispatch
          </span>
          <span className="hidden md:inline text-neutral-400 text-[11px]">
            · Crews On Standby across {siteConfig.serviceRadius}
          </span>
        </div>

        <div className="flex items-center gap-4 mx-auto sm:mx-0">
          <span className="hidden lg:flex items-center gap-1 text-[11px] text-neutral-400">
            <Clock className="w-3 h-3 text-neutral-400" />
            Avg. On-Site Response &lt; 45 Mins
          </span>
          <a
            href={`tel:${siteConfig.emergencyPhone.replace(/\D/g, "")}`}
            className="inline-flex items-center gap-1.5 bg-red-600 hover:bg-red-500 text-white font-bold px-3 py-1 rounded text-[11px] tracking-wide transition-colors shadow-sm"
          >
            <PhoneCall className="w-3 h-3" />
            <span>DISPATCH HOTLINE: {siteConfig.emergencyPhone}</span>
          </a>
        </div>
      </div>
    </aside>
  );
}
