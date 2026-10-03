"use client";

import { useState, type FormEvent } from "react";
import { brand, ateliers } from "@/data/atelier";
import { Lines } from "./ui";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <section id="contact" className="section contact ui-light" data-theme="light">
        <div style={{ padding: "0 var(--gutter)" }}>
          <span className="accent t-sub" style={{ display: "block" }}>
            Inquire
          </span>
          <Lines
            as="h2"
            className="h0"
            lines={["PERMANENCE"]}
          />
        </div>

        <div className="contact__grid">
          <div className="contact__side">
            <p className="small muted" style={{ marginBottom: "1rem" }}>
              Private Client Advisory
            </p>
            <p className="lead" style={{ color: "#1a1919" }}>
              We welcome private inquiries from patrons, family offices, and architectural estates.
            </p>
            <div style={{ marginTop: "2.4rem" }}>
              <span className="small muted" style={{ display: "block" }}>Direct Line</span>
              <a href={`tel:${brand.phone.replace(/[^+\d]/g, "")}`} className="h3 link-u" style={{ marginTop: "0.4rem", textTransform: "none" }}>
                {brand.phone}
              </a>
            </div>
          </div>

          <div className="contact__form">
            {submitted ? (
              <div style={{ gridColumn: "1 / -1", padding: "3rem 0" }}>
                <span className="small muted" style={{ display: "block" }}>Inquiry Received</span>
                <h3 className="h2" style={{ marginTop: "0.8rem", color: "#1a1919" }}>
                  Thank you for contacting the Atelier.
                </h3>
                <p className="lead muted" style={{ marginTop: "1rem" }}>
                  Our principal partner will contact you directly within twenty-four hours to coordinate your confidential briefing.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "contents" }}>
                <label className="field">
                  <span className="small muted">Full Name</span>
                  <input type="text" name="name" required placeholder="Lord / Lady / Mr. / Ms." />
                </label>

                <label className="field">
                  <span className="small muted">Email Address</span>
                  <input type="email" name="email" required placeholder="principal@estate.com" />
                </label>

                <label className="field">
                  <span className="small muted">Intended Location</span>
                  <input type="text" name="location" placeholder="e.g. Zurich, Cap d'Antibes, Beverly Hills" />
                </label>

                <label className="field">
                  <span className="small muted">Commission Scope</span>
                  <select name="scope" defaultValue="new-estate">
                    <option value="new-estate">New Private Estate (&gt;12,000 sq.ft)</option>
                    <option value="architecture">Bespoke Architectural Pavilion</option>
                    <option value="design-build">Full Design-Build Commission</option>
                    <option value="heritage">Heritage Mansion Modernization</option>
                  </select>
                </label>

                <label className="field field--wide">
                  <span className="small muted">Confidential Brief</span>
                  <textarea name="message" rows={3} placeholder="Please describe the site, vision, or acquisition parameters..." />
                </label>

                <div style={{ gridColumn: "1 / -1", marginTop: "1rem" }}>
                  <button type="submit" className="btn-outline small">
                    <span>Submit Commission Inquiry</span>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M1 7h12M7 1l6 6-6 6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      <footer className="footer ui-dark" data-theme="dark">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: "2rem" }}>
          <div>
            <span className="header__logo" style={{ fontSize: "clamp(1.2rem, 1.8vw, 2.2rem)", padding: 0 }}>
              {brand.name}
            </span>
            <p className="small muted" style={{ marginTop: "0.6rem" }}>
              Private Architecture & High-Ticket Master Building
            </p>
          </div>
          <a href="#top" className="small link-u">
            Back to Top ↑
          </a>
        </div>

        <div className="footer__cols">
          {ateliers.map((a) => (
            <div key={a.city}>
              <span className="small" style={{ color: "#fff", display: "block", marginBottom: "0.6rem" }}>
                {a.city}
              </span>
              <p className="small muted" style={{ lineHeight: 1.6 }}>
                {a.address}
                <br />
                {a.coord}
              </p>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid var(--t-line)", paddingTop: "2rem", flexWrap: "wrap", gap: "1rem" }}>
          <span className="small muted">
            © {new Date().getFullYear()} Atelier Privé. All rights reserved.
          </span>
          <div style={{ display: "flex", gap: "2rem" }}>
            <span className="small muted">Confidentiality Assured</span>
            <span className="small muted">Private Register</span>
          </div>
        </div>
      </footer>
    </>
  );
}
