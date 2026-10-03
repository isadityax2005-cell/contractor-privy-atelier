"use client";

import { useEffect, useRef, type CSSProperties, type ElementType, type ReactNode } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { img, vid } from "@/data/atelier";

/** Masked line-by-line title reveal (Sobha: data-reveal="title"). */
export function Lines({
  lines,
  as = "h2",
  className = "",
  delay = 0,
  trigger = true,
  start = "top 88%",
}: {
  lines: ReactNode[];
  as?: ElementType;
  className?: string;
  delay?: number;
  /** false → parent timeline drives `.line > span` itself */
  trigger?: boolean;
  start?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const Tag = as as any;

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const inner = el.querySelectorAll(".line > span");
      gsap.set(inner, { yPercent: 112 });
      if (!trigger) return;
      ScrollTrigger.create({
        trigger: el,
        start,
        once: true,
        onEnter: () => gsap.to(inner, { yPercent: 0, duration: 1.5, ease: "sobha", stagger: 0.1, delay }),
      });
    },
    { scope: ref },
  );

  return (
    <Tag ref={ref} className={className}>
      {lines.map((l, i) => (
        <span className="line" key={i}>
          <span>{l}</span>
        </span>
      ))}
    </Tag>
  );
}

/** Fade + rise on enter (Sobha: data-reveal="text"). */
export function Appear({
  children,
  className = "",
  as = "div",
  delay = 0,
  y = 28,
  start = "top 90%",
  style,
}: {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  delay?: number;
  y?: number;
  start?: string;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLElement>(null);
  const Tag = as as any;
  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      gsap.set(el, { opacity: 0, y });
      ScrollTrigger.create({
        trigger: el,
        start,
        once: true,
        onEnter: () => gsap.to(el, { opacity: 1, y: 0, duration: 1.3, ease: "sobha", delay }),
      });
    },
    { scope: ref },
  );
  return (
    <Tag ref={ref} className={className} style={style}>
      {children}
    </Tag>
  );
}

/** Image frame: clip reveal on enter + inner scroll parallax (Sobha: parallax-image-move). */
export function Frame({
  name,
  alt = "",
  className = "",
  parallax = true,
  reveal = true,
  sizes = "50vw",
  pos = "50% 50%",
  eager = false,
}: {
  name: string;
  alt?: string;
  className?: string;
  parallax?: boolean;
  reveal?: boolean;
  sizes?: string;
  pos?: string;
  eager?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { src, srcSet } = img(name);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const im = el.querySelector("img");
      if (parallax && im) {
        gsap.fromTo(
          im,
          { yPercent: -7 },
          { yPercent: 7, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true } },
        );
      }
      if (reveal && im) {
        gsap.set(el, { clipPath: "inset(100% 0 0 0)" });
        const wrap = im.parentElement as HTMLElement;
        gsap.set(wrap, { scale: 1.3 });
        ScrollTrigger.create({
          trigger: el,
          start: "top 90%",
          once: true,
          onEnter: () => {
            gsap.to(el, { clipPath: "inset(0% 0 0 0)", duration: 1.5, ease: "sobha" });
            gsap.to(wrap, { scale: 1, duration: 1.9, ease: "sobha" });
          },
        });
      }
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={`frame ${parallax ? "" : "frame--still"} ${className}`}>
      <div style={{ position: "absolute", inset: 0 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          srcSet={srcSet}
          sizes={sizes}
          alt={alt}
          loading={eager ? "eager" : "lazy"}
          decoding="async"
          draggable={false}
          style={{ objectPosition: pos }}
        />
      </div>
    </div>
  );
}

/** Muted looping video that only plays while on screen (Sobha: videoAutoPlay). */
export function AutoVideo({
  name,
  poster,
  className = "",
  style,
  eager = false,
  hero = false,
}: {
  name: string;
  poster?: string;
  className?: string;
  style?: CSSProperties;
  eager?: boolean;
  hero?: boolean;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) v.play().catch(() => {});
        else v.pause();
      },
      { threshold: 0.02 },
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);
  return (
    <video
      ref={ref}
      className={className}
      style={style}
      muted
      loop
      playsInline
      disablePictureInPicture
      preload={eager ? "auto" : "metadata"}
      poster={poster ? img(poster).src : undefined}
      data-hero-video={hero ? "" : undefined}
    >
      <source src={vid(name)} type="video/mp4" />
    </video>
  );
}
