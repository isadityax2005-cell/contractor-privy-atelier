"use client";

import { useEffect, useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { getLenis, scrollToTarget } from "@/lib/lenis";
import { AutoVideo } from "./ui";
import { brand } from "@/data/atelier";

const links = [
  { label: "The Collection", href: "#about" },
  { label: "Three Disciplines", href: "#disciplines" },
  { label: "Tenets", href: "#tenets" },
  { label: "Commissions", href: "#selection" },
  { label: "Ateliers", href: "#locations" },
  { label: "The Idea", href: "#idea" },
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
          .to(el, { clipPath: "circle(150% at 3% 4%)", duration: 1.3, ease: "sobha" })
          .fromTo(items, { yPercent: 110 }, { yPercent: 0, duration: 1.1, ease: "sobha", stagger: 0.06 }, "-=0.8")
          .fromTo(el.querySelectorAll(".menu__aside > *"), { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1, ease: "sobha", stagger: 0.08 }, "-=0.9");
      } else {
        gsap
          .timeline({
            onComplete: () => {
              gsap.set(el, { visibility: "hidden" });
              getLenis()?.start();
            },
          })
          .to(items, { yPercent: -110, duration: 0.7, ease: "sobha", stagger: 0.03 })
          .to(el, { clipPath: "circle(0% at 3% 4%)", duration: 1, ease: "sobha" }, "-=0.45");
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
    setTimeout(() => scrollToTarget(href, 2), 900);
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
              <span className="num">0{i + 1}</span>
              <span className="line" style={{ marginBottom: 0 }}>
                <span className="menu__item h1" style={{ fontSize: "clamp(2.4rem, 6.4vw, 7.6rem)" }}>
                  {l.label}
                </span>
              </span>
            </a>
          ))}
        </nav>
        <aside className="menu__aside">
          <div>
            <p className="small muted" style={{ marginBottom: ".8rem" }}>Private line</p>
            <a href={`tel:${brand.phone.replace(/[^+\d]/g, "")}`} className="h3 link-u" style={{ textTransform: "none" }}>
              {brand.phone}
            </a>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.4rem", alignItems: "flex-start" }}>
            <button
              className="small link-u"
              onClick={() => {
                onClose();
                setTimeout(onModel, 900);
              }}
            >
              Open the 3D model
            </button>
            <button
              className="btn-outline small"
              onClick={() => {
                onClose();
                setTimeout(onDossier, 900);
              }}
            >
              <span>Request the dossier</span>
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}
