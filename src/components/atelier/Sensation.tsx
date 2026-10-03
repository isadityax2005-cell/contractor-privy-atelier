"use client";

import { useRef } from "react";
import { img } from "@/data/atelier";
import { Frame, Lines, Appear } from "./ui";

export default function Sensation() {
  const root = useRef<HTMLElement>(null);
  const imageDesc = img("zen-courtyard");

  return (
    <section ref={root} className="section sensation ui-dark" data-theme="dark">
      <div className="sensation__bg">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imageDesc.src}
          srcSet={imageDesc.srcSet}
          sizes="100vw"
          alt="Zen courtyard reflecting pool at dusk"
          loading="lazy"
          draggable={false}
          style={{ width: "100%", height: "116%", objectFit: "cover", position: "absolute", left: 0, top: "-8%", opacity: 0.55 }}
        />
      </div>

      <div className="sensation__title">
        <Lines
          as="h2"
          className="h1"
          lines={[
            "EVOKING",
            "A PERMANENCE",
            "SOUGHT BY SO",
            "MANY, BUILT",
            "BY SO FEW",
          ]}
        />
      </div>

      <div className="sensation__row">
        <div className="img">
          <Frame
            name="scale-model"
            alt="Hand-milled bronze and acrylic 1:50 architectural scale model"
            parallax={true}
            reveal={true}
            pos="50% 50%"
          />
        </div>
        <div className="txt">
          <Appear delay={0.2}>
            <span className="small muted">The Physical Study</span>
            <p className="lead" style={{ marginTop: "0.8rem", color: "#e5e5e5" }}>
              Before earth is broken, every commission is rendered in a physical 1:50 bronze and acrylic study at our Mayfair and DIFC ateliers.
            </p>
            <p className="small muted" style={{ marginTop: "1.4rem" }}>
              Solar trajectories, wind acoustics, and seasonal shadow profiles are verified by hand.
            </p>
          </Appear>
        </div>
      </div>
    </section>
  );
}
