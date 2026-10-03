"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { tenets } from "@/data/atelier";
import { AutoVideo, Frame, Lines } from "./ui";

export default function Tenets() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;

      const mm = gsap.matchMedia();

      mm.add("(min-width: 861px)", () => {
        const stage = el.querySelector<HTMLElement>(".tenets__stage");
        const intro = el.querySelector<HTMLElement>(".tenets__intro");
        const videoPanel = el.querySelector<HTMLElement>(".panel--video");
        const videoCopy = el.querySelector<HTMLElement>(".panel--video .panel__copy");
        const track = el.querySelector<HTMLElement>(".tenets__track");
        const progress = el.querySelector<HTMLElement>(".tenets__progress");
        const progressBar = el.querySelector<HTMLElement>(".tenets__progress .bar i");

        if (!stage || !videoPanel || !track) return;

        // Number of panels beyond panel 01: 3 panels
        const totalPanels = 4;
        const scrollDistance = (totalPanels - 1) * window.innerWidth;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: stage,
            start: "top top",
            end: `+=${totalPanels * 130}%`,
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        // 1. Video card expands to full screen while intro fades
        tl.to(videoPanel, { clipPath: "inset(0% 0% 0% 0%)", duration: 2, ease: "power2.inOut" }, 0)
          .to(intro, { opacity: 0, y: -40, duration: 1.2, ease: "power1.in" }, 0.2)
          .to(videoCopy, { opacity: 1, y: 0, duration: 1.4, ease: "sobha" }, 1.2)
          .to(progress, { opacity: 1, duration: 0.8 }, 1.4)
          // 2. Track translates horizontally across panels
          .to(track, { x: -scrollDistance, duration: 6, ease: "none" }, 2.4);

        if (progressBar) {
          tl.to(progressBar, { scaleX: 1, duration: 6, ease: "none" }, 2.4);
        }
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  const [p1, p2, p3] = tenets.panels;

  return (
    <section id="tenets" ref={root} className="section tenets ui-light" data-theme="light">
      <div className="tenets__stage">
        <div className="tenets__intro">
          <p className="small muted" style={{ marginBottom: "0.8rem" }}>
            The Guiding Principles
          </p>
          <Lines
            as="h2"
            className="h1"
            lines={["THE ATELIER TENETS"]}
          />
          <p className="lead muted">{tenets.intro}</p>
        </div>

        <div className="tenets__track">
          {/* Panel 01: Video expands from center card to full */}
          <div className="panel panel--video">
            <AutoVideo name={p1.video || "tenet-architecture"} />
            <div className="shade" />
            <div className="panel__copy" style={{ opacity: 0, transform: "translateY(30px)" }}>
              <span className="small" style={{ letterSpacing: "0.2em", display: "block", marginBottom: "0.6rem" }}>
                TENET {p1.n}
              </span>
              <span className="accent t-sub" style={{ display: "block", lineHeight: 0.9 }}>
                {p1.accent}
              </span>
              <h3 className="h1" style={{ fontSize: "clamp(2.4rem, 6.2vw, 8rem)", marginTop: "0.2rem" }}>
                {p1.word}
              </h3>
              <p className="lead" style={{ marginTop: "1.4rem", maxWidth: "34rem", color: "rgba(255,255,255,0.85)" }}>
                {p1.body}
              </p>
            </div>
          </div>

          {/* Panel 02: Permanent Craft */}
          <div className="panel" style={{ background: "#f8f8f7" }}>
            <div className="panel__grid">
              <div className="panel__text" style={{ gridColumn: "1 / span 5" }}>
                <span className="small muted" style={{ display: "block", marginBottom: "0.6rem" }}>
                  TENET {p2.n}
                </span>
                <span className="accent t-sub" style={{ display: "block", lineHeight: 0.9 }}>
                  {p2.accent}
                </span>
                <h3 className="h1" style={{ fontSize: "clamp(2.4rem, 6.2vw, 8rem)", marginTop: "0.2rem" }}>
                  {p2.word}
                </h3>
                <p className="lead muted" style={{ marginTop: "1.4rem" }}>
                  {p2.body}
                </p>
                <ul className="panel__list">
                  {p2.list?.map(([k, v]) => (
                    <li key={k}>
                      <span className="small muted">{k}</span>
                      <span className="small" style={{ fontWeight: 600 }}>{v}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div style={{ gridColumn: "7 / span 6", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.2rem" }}>
                <Frame name={p2.imgs![0]} alt="TIG welding precision craftsmanship" parallax={false} reveal={false} />
                <Frame name={p2.imgs![1]} alt="Board-formed concrete gallery architecture" parallax={false} reveal={false} />
              </div>
            </div>
          </div>

          {/* Panel 03: Total Sanctuary */}
          <div className="panel" style={{ background: "#ffffff" }}>
            <div className="panel__grid">
              <div className="panel__text" style={{ gridColumn: "1 / span 5" }}>
                <span className="small muted" style={{ display: "block", marginBottom: "0.6rem" }}>
                  TENET {p3.n}
                </span>
                <span className="accent t-sub" style={{ display: "block", lineHeight: 0.9 }}>
                  {p3.accent}
                </span>
                <h3 className="h1" style={{ fontSize: "clamp(2.4rem, 6.2vw, 8rem)", marginTop: "0.2rem" }}>
                  {p3.word}
                </h3>
                <p className="lead muted" style={{ marginTop: "1.4rem" }}>
                  {p3.body}
                </p>
                <ul className="panel__list">
                  {p3.list?.map(([k, v]) => (
                    <li key={k}>
                      <span className="small muted">{k}</span>
                      <span className="small" style={{ fontWeight: 600 }}>{v}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div style={{ gridColumn: "7 / span 6", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.2rem" }}>
                <Frame name={p3.imgs![0]} alt="Alpine sanctuary mountain modernism" parallax={false} reveal={false} />
                <Frame name={p3.imgs![1]} alt="Villa Solstice coastal architecture" parallax={false} reveal={false} />
              </div>
            </div>
          </div>

          {/* Panel 04: Above */}
          <div className="panel" style={{ background: "#1a1919", color: "#fff" }}>
            <div style={{ height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "0 var(--gutter)", textAlign: "center" }}>
              <span className="accent t-sub" style={{ color: "#fff" }}>
                {tenets.above.accent}
              </span>
              <p className="lead" style={{ maxWidth: "34rem", margin: "1.6rem auto 0", color: "#c2c2c2" }}>
                {tenets.above.body}
              </p>
            </div>
          </div>
        </div>

        <div className="tenets__progress">
          <span className="small">01</span>
          <div className="bar">
            <i />
          </div>
          <span className="small">04</span>
        </div>
      </div>
    </section>
  );
}
