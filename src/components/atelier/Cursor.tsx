"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

/** Dot cursor that swells into a labelled disc over [data-cursor] elements (Sobha: cursor plugin). */
export default function Cursor() {
  const root = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const el = root.current!;
    gsap.set(el, { opacity: 0 });
    const xTo = gsap.quickTo(el, "x", { duration: 0.5, ease: "power3" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.5, ease: "power3" });
    let shown = false;
    const move = (e: PointerEvent) => {
      if (!shown) {
        gsap.set(el, { x: e.clientX, y: e.clientY });
        gsap.to(el, { opacity: 1, duration: 0.4 });
        shown = true;
      }
      xTo(e.clientX);
      yTo(e.clientY);
    };
    const over = (e: PointerEvent) => {
      const t = (e.target as HTMLElement).closest<HTMLElement>("[data-cursor]");
      if (t) {
        if (label.current) label.current.textContent = t.dataset.cursor || "";
        el.classList.add("is-active");
      } else el.classList.remove("is-active");
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerover", over);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", over);
    };
  }, []);

  return (
    <div ref={root} className="cursor" aria-hidden>
      <div className="cursor__dot">
        <span ref={label} className="cursor__label" />
      </div>
    </div>
  );
}
