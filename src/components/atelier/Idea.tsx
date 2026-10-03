"use client";

import { useRef } from "react";
import { Appear, Frame, Lines } from "./ui";

export default function Idea() {
  const root = useRef<HTMLElement>(null);

  return (
    <section id="idea" ref={root} className="section idea ui-light" data-theme="light">
      <div style={{ padding: "0 var(--gutter)" }}>
        <p className="small muted" style={{ marginBottom: "0.8rem" }}>
          The Philosophy
        </p>
        <Lines
          as="h2"
          className="h0"
          lines={["IF YOU MUST", "BUILD ONCE,", "BUILD FOREVER"]}
        />
      </div>

      <div className="idea__grid">
        <div className="idea__img">
          <Frame
            name="founder-portrait"
            alt="Henri de Valois, Principal Architect and Founder"
            parallax={true}
            reveal={true}
            pos="50% 30%"
          />
          <span className="small muted" style={{ display: "block", marginTop: "1rem" }}>
            Henri de Valois — Founder & Principal Architect
          </span>
        </div>

        <div className="idea__txt">
          <Appear delay={0.1}>
            <p className="lead" style={{ fontSize: "clamp(1.15rem, 1.5vw, 1.6rem)", lineHeight: 1.45, color: "#1a1919" }}>
              Architecture should never expire with transient decorative trends. We design structures that absorb time — materials that patina with dignity rather than decay.
            </p>
          </Appear>
          <Appear delay={0.25}>
            <p className="lead muted">
              Each residence is conceived as an enduring civic monolith. We take on no more than six global commissions each year to ensure that every structural calculation, stone joint, and custom bronze extrusion receives obsessive personal oversight.
            </p>
          </Appear>
          <Appear delay={0.4} style={{ borderTop: "1px solid var(--t-line)", paddingTop: "1.4rem" }}>
            <span className="small muted">Atelier Charter</span>
            <p className="small" style={{ marginTop: "0.4rem", color: "#1a1919", letterSpacing: "0.06em" }}>
              GENEVA · LONDON · DUBAI · LOS ANGELES
            </p>
          </Appear>
        </div>
      </div>
    </section>
  );
}
