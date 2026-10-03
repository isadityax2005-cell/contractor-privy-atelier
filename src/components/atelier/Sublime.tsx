"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { img } from "@/data/atelier";
import { Lines } from "./ui";

export default function Sublime() {
  const root = useRef<HTMLElement>(null);
  const imageDesc = img("hillside-sanctuary");

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;

      const bg = el.querySelector(".sublime__bg");
      const word = el.querySelector(".sublime__word");

      if (bg) {
        gsap.fromTo(
          bg,
          { yPercent: -12 },
          {
            yPercent: 12,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          },
        );
      }

      if (word) {
        gsap.fromTo(
          word,
          { scale: 0.9, opacity: 0.6 },
          {
            scale: 1.05,
            opacity: 1,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          },
        );
      }
    },
    { scope: root },
  );

  return (
    <section ref={root} className="section sublime ui-dark" data-theme="dark">
      <div className="sublime__bg">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imageDesc.src}
          srcSet={imageDesc.srcSet}
          sizes="100vw"
          alt="Hillside sanctuary modern architectural estate at sunset"
          loading="lazy"
          draggable={false}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>
      <div className="sublime__shade" />

      <div className="sublime__content">
        <p className="small muted" style={{ marginBottom: "1rem", letterSpacing: "0.18em" }}>
          The Horizon of Permanence
        </p>
        <span className="accent t-sub sublime__word" style={{ display: "block", color: "#fff" }}>
          Enduring
        </span>
        <div style={{ marginTop: "1.4rem" }}>
          <Lines
            as="p"
            className="small"
            lines={["CRAFTED FOR GENERATIONS UNSEEN"]}
          />
        </div>
      </div>
    </section>
  );
}
