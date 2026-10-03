"use client";

import Lenis from "lenis";
import { gsap, ScrollTrigger } from "./gsap";

let instance: Lenis | null = null;

/** Singleton Lenis, driven by GSAP's ticker so ScrollTrigger scrubs stay frame-perfect. */
export function getLenis(): Lenis | null {
  if (typeof window === "undefined") return null;
  if (!instance) {
    instance = new Lenis({ lerp: 0.085, smoothWheel: true, wheelMultiplier: 0.95 });
    instance.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => instance?.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);
  }
  return instance;
}

export function scrollToTarget(target: string | HTMLElement, duration = 1.8) {
  const lenis = getLenis();
  const el = typeof target === "string" ? document.querySelector<HTMLElement>(target) : target;
  if (!el) return;
  if (lenis) lenis.scrollTo(el, { duration, easing: (t: number) => (t < 0.5 ? 8 * t ** 4 : 1 - (-2 * t + 2) ** 4 / 2) });
  else el.scrollIntoView({ behavior: "smooth" });
}
