"use client";

import { useEffect, useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { getLenis, scrollToTarget } from "@/lib/lenis";
import { AutoVideo } from "./ui";
import { brand } from "@/data/atelier";

const links = [
  { label: "The Collection", href: "#about" },
  { label: "Three Disciplines", href: "#disciplines" },
  { label: "The Tenets", href: "#tenets" },
  { label: "Commissions", href: "#selection" },
  { label: "Global Ateliers", href: "#locations" },
  { label: "The Philosophy", href: "#idea" },
];

export default function Menu({
  open,
  onClose,
  onModel,
  onDossier,
}: {
  open: boolean;
  onClose: () => void;
  onModel: () => void;
  onDossier: () => void;
}) {
  const root = useRef<HTMLDivElement>(null);
  const first = useRef(true);

  useGSAP(
    () => {
      const el = root.current!;
      const items = el.querySelectorAll(".menu__item");
      if (first.current) {
        first.current = false;
        return;
      }
      if (open) {
        getLenis()?.stop();
        gsap.set(el, { visibility: "visible" });
        gsap
          .timeline()
          .to(el, { clipPath: "circle(150% at 3% 4%)", duration: 0.8, ease: "power3.inOut" })
          .fromTo(items, { yPercent: 110 }, { yPercent: 0, duration: 0.65, ease: "power3.out", stagger: 0.035 }, "-=0.55")
          .fromTo(el.querySelectorAll(".menu__aside > *"), { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out", stagger: 0.04 }, "-=0.5");
      } else {
        gsap
          .timeline({
            onComplete: () => {
              gsap.set(el, { visibility: "hidden" });
              getLenis()?.start();
            },
          })
          .to(items, { yPercent: -110, duration: 0.4, ease: "power3.in", stagger: 0.02 })
          .to(el, { clipPath: "circle(0% at 3% 4%)", duration: 0.6, ease: "power3.inOut" }, "-=0.25");
      }
    },
    { scope: root, dependencies: [open] },
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && open && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const go = (href: string) => {
    onClose();
    setTimeout(() => scrollToTarget(href, 2), 800);
  };

  return (
    <div ref={root} className="menu ui-dark" aria-hidden={!open}>
      <div className="menu__bg">
        <AutoVideo name="hero-loop" />
      </div>
      <div className="menu__inner">
        <nav className="menu__nav">
          {links.map((l, i) => (
            <a
              key={l.href}
              href={l.href}
              className="menu__link"
              onClick={(e) => {
                e.preventDefault();
                go(l.href);
              }}
            >
              <span className="menu__num">0{i + 1}</span>
              <span className="menu__mask">
                <span className="menu__item">
                  {l.label}
                </span>
              </span>
              <span className="menu__arrow" aria-hidden="true">→</span>
            </a>
          ))}
        </nav>
        <aside className="menu__aside">
          <div className="menu__brand-note">
            <span className="small muted" style={{ letterSpacing: "0.2em", display: "block", marginBottom: "0.5rem" }}>
              ARCHITECTURAL ATELIER
            </span>
            <p className="lead" style={{ fontSize: "0.95rem", lineHeight: 1.5, color: "rgba(255,255,255,0.7)", maxWidth: "25rem", margin: 0 }}>
              Master-crafted private estates and bespoke residential architecture engineered for multi-generational permanence.
            </p>
          </div>
          <div>
            <span className="small muted" style={{ letterSpacing: "0.18em", display: "block", marginBottom: "0.5rem" }}>
              DIRECT PRIVATE INQUIRY
            </span>
            <a href={`tel:${brand.phone.replace(/[^+\d]/g, "")}`} className="h3 link-u" style={{ textTransform: "none", fontSize: "clamp(1.35rem, 1.9vw, 2.1rem)", display: "block" }}>
              {brand.phone}
            </a>
            <span className="small muted" style={{ display: "block", marginTop: "0.35rem", fontSize: "0.85rem" }}>
              concierge@atelierprive.luxury
            </span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.9rem", alignItems: "flex-start" }}>
            <button
              className="btn-outline small"
              onClick={() => {
                onClose();
                setTimeout(onModel, 700);
              }}
            >
              <span>Explore 3D Model</span>
            </button>
            <button
              className="small link-u muted"
              onClick={() => {
                onClose();
                setTimeout(onDossier, 700);
              }}
            >
              Request Confidential Dossier →
            </button>
          </div>
          <div className="menu__locations">
            <span className="small muted" style={{ letterSpacing: "0.16em", fontSize: "0.7rem" }}>
              DUBAI &nbsp;·&nbsp; LONDON &nbsp;·&nbsp; ZÜRICH &nbsp;·&nbsp; LOS ANGELES
            </span>
          </div>
        </aside>
      </div>
    </div>
  );
}
