"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { getLenis } from "@/lib/lenis";

const fmt = (v: number) => `${String(Math.round(v)).padStart(2, "0")}`;

/** Four arches rise into place while assets load, then the curtain wipes up to reveal the hero. */
export default function Preloader({ onReveal }: { onReveal: () => void }) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = root.current!;
      const lenis = getLenis();
      lenis?.stop();
      let dead = false;

      const num = el.querySelector<HTMLElement>(".pl-num")!;
      const bar = el.querySelector<HTMLElement>(".preloader__line i")!;
      const pieces = gsap.utils.toArray<SVGGElement>(el.querySelectorAll(".pl-piece"));
      const counter = { v: 0 };
      const paint = () => {
        num.textContent = fmt(counter.v);
        gsap.set(bar, { scaleX: counter.v / 100 });
      };

      gsap.set(pieces, { y: 64 });
      gsap.timeline().to(pieces, { y: 0, duration: 1.2, ease: "sobha", stagger: 0.13 }, 0.1);
      gsap.to(counter, { v: 86, duration: 2.4, ease: "power2.out", onUpdate: paint });

      const heroReady = new Promise<void>((res) => {
        const v = document.querySelector<HTMLVideoElement>("[data-hero-video]");
        if (!v || v.readyState >= 3) return res();
        v.addEventListener("canplay", () => res(), { once: true });
      });
      const fontsReady = document.fonts?.ready ?? Promise.resolve();
      const minTime = new Promise<void>((r) => setTimeout(r, 2600));
      const cap = new Promise<void>((r) => setTimeout(r, 6000));

      Promise.race([Promise.all([heroReady, fontsReady, minTime]), cap]).then(() => {
        if (dead) return;
        gsap
          .timeline({
            onComplete: () => {
              el.style.display = "none";
              document.documentElement.classList.remove("is-loading");
              lenis?.start();
            },
          })
          .to(counter, { v: 100, duration: 0.7, ease: "power2.inOut", onUpdate: paint })
          .to(pieces, { y: -72, duration: 1, ease: "sobha", stagger: 0.07 }, "+=0.1")
          .to(el, { clipPath: "inset(0 0 100% 0)", duration: 1.3, ease: "sobha" }, "<0.15")
          .call(onReveal, [], "<0.5");
      });

      return () => {
        dead = true;
      };
    },
    { scope: root },
  );

  return (
    <div ref={root} className="preloader ui-dark" aria-hidden>
      <div className="preloader__mark">
        <svg width="132" height="78" viewBox="0 0 92 54" fill="none" overflow="hidden">
          <defs>
            <linearGradient id="plg" x1="0" y1="1" x2="1" y2="0">
              <stop offset="0" stopColor="#3c3c3b" />
              <stop offset=".4" stopColor="#717170" />
              <stop offset=".72" stopColor="#afafaf" />
              <stop offset="1" stopColor="#fff" />
            </linearGradient>
            <clipPath id="plc">
              <rect width="92" height="54" />
            </clipPath>
          </defs>
          <g clipPath="url(#plc)">
            {[30, 44, 54, 38].map((h, i) => {
              const x = i * 25;
              const top = 54 - h;
              return (
                <g className="pl-piece" key={i}>
                  <path d={`M${x} 54V${top + 8}A8 8 0 0 1 ${x + 16} ${top + 8}V54Z`} fill="url(#plg)" />
                </g>
              );
            })}
          </g>
        </svg>
      </div>
      <div className="preloader__line">
        <i />
      </div>
      <div className="preloader__bar">
        <span className="small muted">Atelier Privé</span>
        <span className="h3" style={{ fontVariantNumeric: "tabular-nums" }}>
          <span className="pl-num">00</span>
          <span className="small muted" style={{ marginLeft: ".4em" }}>%</span>
        </span>
      </div>
    </div>
  );
}
