"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { AutoVideo, Lines } from "./ui";

export default function Merit() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;

      const bg = el.querySelector(".merit__bg");
      const content = el.querySelector(".merit__content");

      // Background video slow parallax
      if (bg) {
        gsap.fromTo(
          bg,
          { yPercent: -10 },
          {
            yPercent: 10,
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

      // Content float through viewport
      if (content) {
        gsap.fromTo(
          content,
          { y: 60, opacity: 0.8 },
          {
            y: -60,
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
    <section ref={root} className="section merit ui-dark" data-theme="dark">
      <div className="merit__bg">
        <AutoVideo name="craft-breaker" />
      </div>
      <div className="merit__shade" />

      <div className="merit__content">
        <p className="small muted" style={{ marginBottom: "1.2rem", letterSpacing: "0.14em" }}>
          Above the lofty adage of luxury
        </p>
        <Lines
          as="h2"
          className="h1"
          lines={["SOME COMMISSIONS", "MERIT A PLACE"]}
        />
        <p className="accent t-sub-s muted" style={{ marginTop: "0.8rem" }}>
          beyond comparison
        </p>
      </div>
    </section>
  );
}
