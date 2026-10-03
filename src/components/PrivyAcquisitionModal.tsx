"use client";

import React, { useState, useEffect } from "react";
import { X, CheckCircle, ShieldCheck, Phone } from "lucide-react";
import { ProjectItem } from "@/data/privy-data";

interface PrivyAcquisitionModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedProject?: ProjectItem | null;
}

export default function PrivyAcquisitionModal({
  isOpen,
  onClose,
  selectedProject,
}: PrivyAcquisitionModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    interest: selectedProject ? selectedProject.name : "Custom Architectural Commission",
    budget: "$15M – $30M",
    timeline: "Within 6–12 Months",
  });

  useEffect(() => {
    if (selectedProject) {
      setFormData((prev) => ({
        ...prev,
        interest: `${selectedProject.name} (${selectedProject.category})`,
      }));
    }
  }, [selectedProject]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#1A1919]/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-[#222121] border border-white/10 p-8 sm:p-12 shadow-2xl text-white">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 text-[#8E8B85] hover:text-white border border-white/10 hover:border-white/30 transition-colors"
          aria-label="Close acquisition dossier"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 rounded-full border border-[#E5D8CA] flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-[#E5D8CA]" />
            </div>
            <h3 className="text-2xl sm:text-3xl font-light tracking-tight uppercase text-white mb-3">
              Dossier Transmitted
            </h3>
            <p className="text-sm text-[#8E8B85] font-light max-w-md mx-auto leading-relaxed mb-8">
              Your inquiry has been routed to the Managing Principal. A senior architectural partner
              will contact you under strict non-disclosure protocol within four business hours.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                onClose();
              }}
              className="text-xs tracking-[0.25em] uppercase px-6 py-3 border border-[#E5D8CA] text-[#E5D8CA] hover:bg-[#E5D8CA] hover:text-black transition-all"
            >
              Close Window
            </button>
          </div>
        ) : (
          <div>
            <div className="mb-8">
              <span className="text-[10px] tracking-[0.4em] text-[#E5D8CA] uppercase font-mono">
                CONFIDENTIAL ADVISORY
              </span>
              <h2 className="text-2xl sm:text-4xl font-extralight tracking-tight uppercase text-white mt-1">
                Acquisition <span className="font-serif italic text-[#E5D8CA]">Dossier</span>
              </h2>
              <p className="text-xs text-[#8E8B85] font-light mt-2">
                For private residence commissions, site acquisitions, and master build inquiries.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] tracking-[0.2em] text-[#8E8B85] uppercase mb-1.5">
                    Principal Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-[#1A1919] border border-white/10 focus:border-[#E5D8CA] px-4 py-2.5 text-xs text-white outline-none transition-colors"
                    placeholder="Lord / Lady / Dr. / Full Name"
                  />
                </div>
                <div>
                  <label className="block text-[10px] tracking-[0.2em] text-[#8E8B85] uppercase mb-1.5">
                    Direct Telephone *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-[#1A1919] border border-white/10 focus:border-[#E5D8CA] px-4 py-2.5 text-xs text-white outline-none transition-colors"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] tracking-[0.2em] text-[#8E8B85] uppercase mb-1.5">
                  Private Email *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-[#1A1919] border border-white/10 focus:border-[#E5D8CA] px-4 py-2.5 text-xs text-white outline-none transition-colors"
                  placeholder="principal@familyoffice.com"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] tracking-[0.2em] text-[#8E8B85] uppercase mb-1.5">
                    Anticipated Capital Allocation
                  </label>
                  <select
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    className="w-full bg-[#1A1919] border border-white/10 focus:border-[#E5D8CA] px-4 py-2.5 text-xs text-white outline-none transition-colors cursor-pointer"
                  >
                    <option value="$10M – $20M">$10M – $20M USD</option>
                    <option value="$20M – $40M">$20M – $40M USD</option>
                    <option value="$40M – $75M+">$40M – $75M+ USD</option>
                    <option value="Confidential / Institutional">Confidential / Institutional</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] tracking-[0.2em] text-[#8E8B85] uppercase mb-1.5">
                    Target Geography
                  </label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full bg-[#1A1919] border border-white/10 focus:border-[#E5D8CA] px-4 py-2.5 text-xs text-white outline-none transition-colors"
                    placeholder="e.g. Dubai, Beverly Hills, London"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] tracking-[0.2em] text-[#8E8B85] uppercase mb-1.5">
                  Scope of Interest
                </label>
                <input
                  type="text"
                  value={formData.interest}
                  onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                  className="w-full bg-[#1A1919] border border-white/10 focus:border-[#E5D8CA] px-4 py-2.5 text-xs text-white outline-none transition-colors"
                />
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-[10px] tracking-wider text-[#8E8B85]">
                  <ShieldCheck className="w-4 h-4 text-[#E5D8CA]" />
                  <span>Strict NDA Protocol &amp; Full Discretion</span>
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto text-xs tracking-[0.25em] uppercase px-8 py-3.5 bg-[#E5D8CA] text-black font-medium hover:bg-white transition-all cursor-pointer"
                >
                  Transmit Dossier
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
