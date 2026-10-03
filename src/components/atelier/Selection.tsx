"use client";

import { useRef, useState, type MouseEvent } from "react";
import { projects, type ProjectItem } from "@/data/atelier";
import { Frame, Lines } from "./ui";

export default function Selection({
  onSelectProject,
}: {
  onSelectProject: (p: ProjectItem) => void;
}) {
  const root = useRef<HTMLElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [dragged, setDragged] = useState(false);

  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    const el = carouselRef.current;
    if (!el) return;
    setIsDown(true);
    setDragged(false);
    setStartX(e.pageX - el.offsetLeft);
    setScrollLeft(el.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDown(false);
  };

  const handleMouseUp = () => {
    setIsDown(false);
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!isDown) return;
    e.preventDefault();
    const el = carouselRef.current;
    if (!el) return;
    const x = e.pageX - el.offsetLeft;
    const walk = (x - startX) * 1.6;
    if (Math.abs(walk) > 6) setDragged(true);
    el.scrollLeft = scrollLeft - walk;
  };

  return (
    <section id="selection" ref={root} className="section selection ui-dark" data-theme="dark">
      <div className="selection__head">
        <div style={{ gridColumn: "1 / span 7" }}>
          <p className="small muted" style={{ marginBottom: "0.8rem" }}>
            The Portfolio
          </p>
          <Lines
            as="h2"
            className="h1"
            lines={["HANDPICKED", "AND FEW ENOUGH TO COUNT"]}
          />
        </div>
        <div style={{ gridColumn: "9 / span 4" }}>
          <p className="lead muted">
            Every residence in the Atelier collection is an irreproducible commission. Limited to six concurrent builds globally per calendar year.
          </p>
          <p className="small" style={{ marginTop: "1rem", color: "#fff" }}>
            DRAG TO EXPLORE — SELECT TO INQUIRE
          </p>
        </div>
      </div>

      <div
        ref={carouselRef}
        className={`carousel no-scrollbar ${isDown ? "is-drag" : ""}`}
        data-cursor="Drag"
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        {projects.map((p) => (
          <div
            key={p.id}
            className="slide"
            onClick={() => {
              if (!dragged) onSelectProject(p);
            }}
          >
            <div className="frame" style={{ cursor: "pointer" }}>
              <Frame
                name={p.img}
                alt={p.name}
                parallax={false}
                reveal={true}
                pos="50% 50%"
              />
            </div>
            <div className="slide__meta">
              <div>
                <h3 className="h3" style={{ fontSize: "1.35rem", textTransform: "none" }}>
                  {p.name}
                </h3>
                <span className="small muted">
                  {p.location} — {p.category}
                </span>
              </div>
              <div style={{ textAlign: "right" }}>
                <span className="small" style={{ color: "#fff", display: "block" }}>
                  {p.sqft}
                </span>
                <span className="small muted">{p.year}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
