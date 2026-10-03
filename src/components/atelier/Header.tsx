"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

export default function Header({
  ready,
  menuOpen,
  onMenu,
  onModel,
}: {
  ready: boolean;
  menuOpen: boolean;
  onMenu: () => void;
  onModel: () => void;
}) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.set(".header__row", { yPercent: -110, opacity: 0 });
    },
    { scope: root },
  );
  useGSAP(
    () => {
      if (!ready) return;
      gsap.to(".header__row", { yPercent: 0, opacity: 1, duration: 1.4, ease: "sobha", delay: 0.4 });
    },
    { scope: root, dependencies: [ready] },
  );

  return (
    <header ref={root} className={`header ${menuOpen ? "is-menu" : ""}`}>
      <div className="header__row">
        <button className="menu-btn small" onClick={onMenu} aria-expanded={menuOpen} aria-label="Toggle menu">
          <span className="menu-btn__lines">
            <i />
            <i />
          </span>
          <span className="hidden sm:inline">{menuOpen ? "Close" : "Menu"}</span>
        </button>
        <a href="#top" className="header__logo" aria-label="Atelier Privé — back to top">
          Atelier Privé
        </a>
        <div className="header__right">
          <button className="small link-u" onClick={onModel}>
            3D Model
          </button>
        </div>
      </div>
    </header>
  );
}
