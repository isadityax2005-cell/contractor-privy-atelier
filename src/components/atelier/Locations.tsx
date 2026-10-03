"use client";

import { useRef, useState } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { ateliers, img } from "@/data/atelier";
import { Lines } from "./ui";

export default function Locations() {
  const root = useRef<HTMLElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;

      const rows = el.querySelectorAll<HTMLElement>(".locations__row");

      rows.forEach((row, idx) => {
        ScrollTrigger.create({
          trigger: row,
          start: "top 60%",
          end: "bottom 40%",
          onToggle: (self) => {
            if (self.isActive) setActiveIdx(idx);
          },
        });
      });
    },
    { scope: root },
  );

  return (
    <section id="locations" ref={root} className="section locations ui-dark" data-theme="dark">
      <div className="locations__grid">
        <div className="locations__list">
          <p className="small muted" style={{ marginBottom: "1.4rem" }}>
            Global Presence
          </p>
          <Lines
            as="h2"
            className="h1"
            lines={["OUR FOUR ATELIERS"]}
          />

          <div style={{ marginTop: "4vw" }}>
            {ateliers.map((a, i) => (
              <div
                key={a.city}
                className={`locations__row ${activeIdx === i ? "is-active" : ""}`}
                onMouseEnter={() => setActiveIdx(i)}
                style={{ cursor: "pointer" }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                  <span className="small muted">0{i + 1}</span>
                  <span className="small muted">{a.coord}</span>
                </div>
                <h3 className="h2" style={{ margin: "0.6rem 0", fontSize: "clamp(2rem, 4.4vw, 5.2rem)" }}>
                  {a.city}
                </h3>
                <p className="lead muted">{a.address}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="locations__side">
          <div className="locations__sticky">
            <div className="frame" style={{ position: "relative", overflow: "hidden", aspectRatio: "4 / 5" }}>
              {ateliers.map((a, i) => {
                const imageDesc = img(a.img);
                return (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    key={a.city}
                    src={imageDesc.src}
                    srcSet={imageDesc.srcSet}
                    sizes="30vw"
                    alt={a.city}
                    className={activeIdx === i ? "is-active" : ""}
                    style={{
                      position: "absolute",
                      inset: 0,
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                );
              })}
            </div>
            <div style={{ marginTop: "1rem", display: "flex", justifyContent: "space-between" }}>
              <span className="small muted">Private consultation by appointment</span>
              <span className="small" style={{ color: "#fff" }}>
                {ateliers[activeIdx].city}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
