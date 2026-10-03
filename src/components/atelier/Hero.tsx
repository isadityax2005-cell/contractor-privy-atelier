"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { AutoVideo, Lines } from "./ui";

export default function Hero({
  ready,
  onModel,
}: {
  ready: boolean;
  onModel: () => void;
}) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;

      const media = el.querySelector(".hero__media");
      const sub = el.querySelector(".hero__sub");
      const titleSpans = el.querySelectorAll(".h0 .line > span");
      const arrow = el.querySelector(".hero__arrow");
      const card = el.querySelector(".card3d");
      const dim = el.querySelector(".hero__dim");

      gsap.set(media, { scale: 1.18 });
      gsap.set(sub, { opacity: 0, y: 36 });
      gsap.set(titleSpans, { yPercent: 112 });
      gsap.set([arrow, card], { opacity: 0, y: 24 });

      // Scroll choreography when #about enters
      ScrollTrigger.create({
        trigger: "#about",
        start: "top bottom",
        end: "top top",
        scrub: true,
        onUpdate: (self) => {
          if (media) gsap.set(media, { yPercent: self.progress * 14 });
          if (dim) gsap.set(dim, { opacity: self.progress * 0.75 });
        },
      });

      // Visibility toggle at top top to preserve GPU
      ScrollTrigger.create({
        trigger: "#about",
        start: "top top",
        onEnter: () => gsap.set(el, { visibility: "hidden" }),
        onLeaveBack: () => gsap.set(el, { visibility: "visible" }),
      });
    },
    { scope: root },
  );

  useGSAP(
    () => {
      if (!ready) return;
      const el = root.current;
      if (!el) return;

      const media = el.querySelector(".hero__media");
      const sub = el.querySelector(".hero__sub");
      const titleSpans = el.querySelectorAll(".h0 .line > span");
      const arrow = el.querySelector(".hero__arrow");
      const card = el.querySelector(".card3d");

      const tl = gsap.timeline({ delay: 0.1 });
      tl.to(media, { scale: 1, duration: 2.4, ease: "sobha" }, 0)
        .to(sub, { opacity: 1, y: 0, duration: 1.4, ease: "sobha" }, 0.2)
        .to(titleSpans, { yPercent: 0, duration: 1.5, ease: "sobha" }, 0.35)
        .to([arrow, card], { opacity: 1, y: 0, duration: 1.2, ease: "sobha", stagger: 0.15 }, 0.6);
    },
    { scope: root, dependencies: [ready] },
  );

  return (
    <section id="top" ref={root} className="hero ui-dark" data-theme="dark">
      <div className="hero__dim" />
      <div className="hero__inner">
        <div className="hero__media">
          <AutoVideo name="hero-loop" poster="hero-poster" hero eager />
        </div>
        <div className="hero__shade" />

        <div className="hero__content">
          <span className="hero__sub accent t-sub">The art</span>
          <Lines
            as="h1"
            className="h0"
            lines={["OF PERMANENCE"]}
            trigger={false}
          />
        </div>

        <a href="#about" className="circle-btn hero__arrow" aria-label="Scroll to collection">
          <svg className="ring" viewBox="0 0 44 44" fill="none">
            <circle cx="22" cy="22" r="21" stroke="rgba(255,255,255,0.28)" strokeWidth="1" />
          </svg>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M7 1v11M2 7l5 5 5-5" stroke="#fff" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>

        <button className="card3d" onClick={onModel} aria-label="Open 3D interactive model">
          <div className="card3d__bg">
            <AutoVideo name="bim-orbit" eager />
          </div>
          <div className="card3d__shade" />
          <span className="card3d__top small" style={{ letterSpacing: ".16em", color: "#fff" }}>
            3D MODEL
          </span>
          <span className="card3d__bottom small muted">EXPLORE THE ARCHITECTURE</span>
          <span className="card3d__plus" aria-hidden="true">
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path d="M5 1v8M1 5h8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
          </span>
        </button>
      </div>
    </section>
  );
}
