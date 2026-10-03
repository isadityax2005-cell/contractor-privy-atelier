"use client";

import React, { useState } from "react";
import { siteConfig } from "@/data/site-config";
import { X, CheckCircle, Copy, Send, Phone, Calendar, MapPin, HardHat } from "lucide-react";

interface EstimatePayload {
  category: string;
  tier: string;
  sqft: number;
  estimatedMin: number;
  estimatedMax: number;
  timelineWeeks: number;
}

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  estimateData: EstimatePayload | null;
}

export default function ConsultationModal({ isOpen, onClose, estimateData }: ConsultationModalProps) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [timeframe, setTimeframe] = useState("Within 30-60 Days");
  const [notes, setNotes] = useState("");
  const [copied, setCopied] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(val);
  };

  const draftText = `--- ARCHITECTURAL CONSULTATION REQUEST ---
Business: ${siteConfig.name}
Client Name: ${fullName || "[Not specified]"}
Phone: ${phone || "[Not specified]"}
Email: ${email || "[Not specified]"}
Property Address: ${address || "[Not specified]"}
Desired Start: ${timeframe}
${estimateData ? `\nESTIMATED SCOPE PARAMETERS:
- Category: ${estimateData.category}
- Finish Tier: ${estimateData.tier}
- Footprint: ${estimateData.sqft.toLocaleString()} sq ft
- Budget Target: ${formatCurrency(estimateData.estimatedMin)} – ${formatCurrency(estimateData.estimatedMax)}
- Estimated Build Duration: ~${estimateData.timelineWeeks} Weeks` : ""}
Project Notes: ${notes || "None"}
------------------------------------------`;

  const handleCopy = () => {
    navigator.clipboard.writeText(draftText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    const subject = encodeURIComponent(`Architectural Consultation: ${fullName || "New Inquiry"}`);
    const body = encodeURIComponent(draftText);
    window.location.href = `mailto:${siteConfig.email}?subject=${subject}&body=${body}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-zinc-950 border border-white/10 rounded-2xl shadow-2xl p-6 sm:p-8 my-8 text-white max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 text-neutral-400 hover:text-white p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
          aria-label="Close Modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="mb-6">
          <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-3">
            <HardHat className="w-3.5 h-3.5" />
            <span>Direct Lead Estimator Dispatch</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold uppercase font-heading">
            Request Architectural Consultation
          </h3>
          <p className="text-xs text-neutral-400 mt-1">
            Our Senior Project Superintendent and Structural Engineer will review your blueprint or schedule an on-site feasibility walk.
          </p>
        </div>

        {/* Pre-filled Scope Summary Banner */}
        {estimateData && (
          <div className="p-4 rounded-xl bg-orange-950/20 border border-orange-500/30 mb-6 space-y-1 text-xs">
            <div className="flex justify-between items-center text-orange-400 font-bold uppercase text-[11px] font-mono-draft">
              <span>Attached Calculator Parameters</span>
              <span>{estimateData.sqft.toLocaleString()} SQ FT</span>
            </div>
            <div className="font-heading text-white font-bold text-sm">
              {estimateData.category} ({estimateData.tier})
            </div>
            <div className="text-neutral-300 text-xs">
              Projected Investment:{" "}
              <strong className="text-orange-400 font-mono-draft">
                {formatCurrency(estimateData.estimatedMin)} – {formatCurrency(estimateData.estimatedMax)}
              </strong>{" "}
              · Timeline: ~{estimateData.timelineWeeks} Weeks
            </div>
          </div>
        )}

        {/* Form Body */}
        {submitted ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-14 h-14 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/40">
              <CheckCircle className="w-7 h-7" />
            </div>
            <h4 className="text-xl font-bold uppercase font-heading text-white">
              Consultation Package Prepared
            </h4>
            <p className="text-xs text-neutral-300 max-w-md mx-auto leading-relaxed">
              Your default mail client has opened with your detailed project scope. If your mail client didn&apos;t open automatically,
              simply copy the inquiry draft below and email directly to{" "}
              <strong className="text-orange-400 font-mono-draft">{siteConfig.email}</strong>.
            </p>
            <div className="pt-2">
              <button
                type="button"
                onClick={handleCopy}
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase px-4 py-2.5 rounded transition-colors"
              >
                <Copy className="w-4 h-4 text-orange-400" />
                <span>{copied ? "Copied to Clipboard!" : "Copy Full Project Specs"}</span>
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSendEmail} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1.5 font-mono-draft">
                  Your Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Richard Henderson"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1.5 font-mono-draft">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. (555) 234-5678"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-orange-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1.5 font-mono-draft">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  placeholder="e.g. richard@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1.5 font-mono-draft">
                  Target Start Date
                </label>
                <select
                  value={timeframe}
                  onChange={(e) => setTimeframe(e.target.value)}
                  className="w-full bg-zinc-900 border border-white/10 rounded-lg px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-orange-500"
                >
                  <option value="Urgent (Within 14 Days)">Urgent (Within 14 Days)</option>
                  <option value="Within 30-60 Days">Within 30-60 Days</option>
                  <option value="Next 3-6 Months">Next 3-6 Months</option>
                  <option value="Planning & Blueprints Phase">Planning &amp; Blueprints Phase</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1.5 font-mono-draft">
                Property Address / Neighborhood (Austin Metro)
              </label>
              <input
                type="text"
                placeholder="e.g. 2400 Westlake Dr, Austin, TX 78746"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-orange-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1.5 font-mono-draft">
                Specific Architectural Goals or Blueprints Available
              </label>
              <textarea
                rows={3}
                placeholder="Describe your property, load-bearing concerns, architectural style, or if you already possess stamped drawings..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-orange-500 resize-none"
              />
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 pt-3">
              <button
                type="submit"
                className="w-full sm:flex-1 bg-orange-600 hover:bg-orange-500 text-white font-extrabold text-xs uppercase tracking-wider py-3.5 rounded-lg shadow-xl shadow-orange-600/30 flex items-center justify-center gap-2 cursor-pointer transition-colors"
              >
                <Send className="w-4 h-4" />
                <span>Submit Consultation Request</span>
              </button>

              <button
                type="button"
                onClick={handleCopy}
                className="w-full sm:w-auto px-4 py-3.5 rounded-lg bg-white/5 hover:bg-white/10 text-neutral-300 text-xs font-bold uppercase border border-white/10 transition-colors flex items-center justify-center gap-1.5"
              >
                <Copy className="w-3.5 h-3.5 text-orange-400" />
                <span>{copied ? "Copied!" : "Copy Details"}</span>
              </button>
            </div>

            <p className="text-[11px] text-neutral-500 text-center pt-1 font-mono-draft">
              Direct dispatch hotline:{" "}
              <a href={`tel:${siteConfig.officePhone.replace(/\D/g, "")}`} className="text-orange-400 underline">
                {siteConfig.officePhone}
              </a>{" "}
              · All client information held strictly confidential.
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
