"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { Appear, Frame, Lines } from "./ui";

export default function Luxury() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;

      const mm = gsap.matchMedia();

      mm.add("(min-width: 861px)", () => {
        const stage = el.querySelector<HTMLElement>(".luxury__stage");
        const title = el.querySelector<HTMLElement>(".luxury__title");
        const center = el.querySelector<HTMLElement>(".luxury__center");
        const left = el.querySelector<HTMLElement>(".luxury__side--left");
        const right = el.querySelector<HTMLElement>(".luxury__side--right");
        const imagesGroup = el.querySelector<HTMLElement>(".luxury__images");
        const textBlock = el.querySelector<HTMLElement>(".luxury__text");
        const textLines = textBlock?.querySelectorAll(".line > span");

        if (!stage || !center || !left || !right || !imagesGroup) return;

        // Initial setup for the pinned choreography
        gsap.set(center, { yPercent: 45, scale: 1.25 });
        gsap.set([left, right], { yPercent: 110, opacity: 0 });
        if (textBlock) gsap.set(textBlock, { opacity: 0 });
        if (textLines) gsap.set(textLines, { yPercent: 112 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: stage,
            start: "top top",
            end: "+=320%",
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        // 1. Center image rises up and settles
        tl.to(center, { yPercent: 0, scale: 1, duration: 2, ease: "power2.out" }, 0)
          .to(title, { yPercent: -40, opacity: 0, duration: 1.4, ease: "power1.in" }, 0.4)
          // 2. Side images rise up flanking center
          .to([left, right], { yPercent: 0, opacity: 1, duration: 1.8, ease: "power2.out", stagger: 0.15 }, 0.8)
          // 3. Images recede to background
          .to(imagesGroup, { scale: 0.92, opacity: 0.16, duration: 1.6, ease: "power2.inOut" }, 2.4)
          // 4. Grand editorial statement sweeps across
          .to(textBlock || [], { opacity: 1, duration: 0.2 }, 2.8)
          .to(
            textLines || [],
            { yPercent: 0, duration: 1.5, ease: "sobha", stagger: 0.1 },
            2.8,
          );
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section id="about" ref={root} className="section luxury ui-light" data-theme="light">
      <div className="luxury__stage">
        <div className="luxury__title">
          <p className="small muted" style={{ marginBottom: "0.8rem" }}>
            The Atelier Collection
          </p>
          <Lines
            as="h2"
            className="h2"
            lines={["A HANDPICKED COLLECTION", "OF THE RAREST LUXURY HOMES"]}
          />
        </div>

        <div className="luxury__images">
          <div className="luxury__side luxury__side--left">
            <Frame
              name="triptych-left"
              alt="Concrete cantilever structural precision"
              parallax={false}
              reveal={false}
              pos="50% 50%"
            />
          </div>
          <div className="luxury__center">
            <Frame
              name="triptych-center"
              alt="Soaring double-height living room architecture"
              parallax={false}
              reveal={false}
              pos="50% 50%"
            />
          </div>
          <div className="luxury__side luxury__side--right">
            <Frame
              name="triptych-right"
              alt="Travertine and bronze material craftsmanship"
              parallax={false}
              reveal={false}
              pos="50% 50%"
            />
          </div>
        </div>

        <div className="luxury__text">
          <div style={{ maxWidth: "min(72rem, 90vw)", margin: "0 auto", textAlign: "center" }}>
            <Lines
              as="h2"
              className="luxury__editorial"
              lines={[
                "EXCLUSIVE ESTATES",
                "IN THE WORLD'S MOST",
                "RAREFIED ADDRESSES.",
                "FOR THE TRUE",
                "CONNOISSEURS",
              ]}
              trigger={false}
            />
            <span className="line">
              <span className="luxury__editorial-accent">
                of fine living
              </span>
            </span>
          </div>
        </div>
      </div>

      <div className="luxury__bottom">
        <div className="a">
          <Frame
            name="smoked-oak-stairs"
            alt="Sculptural smoked oak floating staircase"
            parallax={true}
            reveal={true}
            pos="50% 40%"
          />
          <Appear delay={0.2} style={{ marginTop: "1.2rem" }}>
            <span className="small muted">Material Rarity — 01</span>
            <p className="lead" style={{ marginTop: "0.4rem" }}>
              Quarter-sawn smoked European oak, cold-bent over twenty-six weeks to form an unbroken monolithic ascent.
            </p>
          </Appear>
        </div>

        <div className="b">
          <Frame
            name="material-fluted-glass"
            alt="Hand-fluted architectural glass partitions"
            parallax={true}
            reveal={true}
            pos="50% 50%"
          />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "2rem", marginTop: "2rem" }}>
            <Appear delay={0.2}>
              <span className="small muted">Material Rarity — 02</span>
              <p className="lead" style={{ marginTop: "0.4rem" }}>
                Cast bronze and custom-fluted acoustic glass, shielding living quarters from external vibration while diffusing light into amber radiance.
              </p>
            </Appear>
            <Appear delay={0.35}>
              <span className="small muted">The Methodology</span>
              <p className="lead" style={{ marginTop: "0.4rem" }}>
                We refuse standardized specifications. Every stone quarry is visited in person, every grain pattern indexed, and every facade engineered for centuries.
              </p>
            </Appear>
          </div>
        </div>
      </div>
    </section>
  );
}
