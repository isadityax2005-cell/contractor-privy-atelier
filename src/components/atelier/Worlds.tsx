"use client";

import { useRef, useState } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { disciplines, img } from "@/data/atelier";

export default function Worlds() {
  const root = useRef<HTMLElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;

      const mm = gsap.matchMedia();

      mm.add("(min-width: 861px)", () => {
        const images = el.querySelectorAll<HTMLElement>(".worlds__img");
        const words = el.querySelectorAll<HTMLElement>(".worlds__word");

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: el,
            start: "top top",
            end: `+=${disciplines.length * 100}%`,
            pin: true,
            scrub: 0.8,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const step = Math.min(
                disciplines.length - 1,
                Math.floor(self.progress * disciplines.length),
              );
              setActiveIdx(step);
            },
          },
        });

        // Wipe transitions between image layers
        images.forEach((imgEl, i) => {
          if (i === 0) return;
          tl.fromTo(
            imgEl,
            { clipPath: "inset(100% 0 0 0)" },
            { clipPath: "inset(0% 0 0 0)", duration: 1, ease: "none" },
            i - 0.5,
          );
        });
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section id="disciplines" ref={root} className="section worlds ui-dark" data-theme="dark">
      {disciplines.map((d, i) => {
        const imageDesc = img(d.img);
        return (
          <div
            key={d.key}
            className="worlds__img"
            style={i === 0 ? { clipPath: "inset(0)" } : undefined}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={imageDesc.src}
              srcSet={imageDesc.srcSet}
              sizes="100vw"
              alt={d.word}
              loading="lazy"
              draggable={false}
              style={{ position: "absolute", inset: "-6% 0", width: "100%", height: "112%", objectFit: "cover", opacity: 0.62 }}
            />
          </div>
        );
      })}

      <div className="worlds__shade" />

      <div className="worlds__inner">
        <div className="worlds__list">
          <p className="small muted" style={{ marginBottom: "1.4rem" }}>
            The Three Disciplines
          </p>
          {disciplines.map((d, i) => (
            <span
              key={d.key}
              className={`worlds__word h1 ${activeIdx === i ? "is-active" : ""}`}
              style={{
                fontSize: "clamp(2.8rem, 7.8vw, 11rem)",
                cursor: "pointer",
                transition: "opacity 0.6s var(--ease), transform 0.6s var(--ease)",
              }}
              onClick={() => setActiveIdx(i)}
            >
              {d.word}
            </span>
          ))}
        </div>

        <div className="worlds__aside">
          <div>
            <span className="small muted" style={{ display: "block", marginBottom: "0.5rem" }}>
              0{activeIdx + 1} / 0{disciplines.length}
            </span>
            <p className="small" style={{ letterSpacing: "0.12em", marginBottom: "0.8rem", color: "#fff" }}>
              {disciplines[activeIdx].kicker}
            </p>
            <p className="lead" style={{ color: "#d1d1d1" }}>
              {disciplines[activeIdx].note}
            </p>
          </div>
          <div style={{ borderTop: "1px solid var(--t-line)", paddingTop: "1rem" }}>
            <span className="small muted">{disciplines[activeIdx].count}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
