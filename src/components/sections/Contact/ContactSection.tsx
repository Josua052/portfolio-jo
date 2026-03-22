// src/components/contact/ContactSection.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import ContactForm from "./ContactForm";
import ContactCard from "./ContactCard";

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, inView };
}

export default function ContactSection() {
  const { ref: headRef, inView: headIn } = useInView(0.3);

  return (
    <section className="cs-section">
      <div className="cs-bg-grid" aria-hidden />

      <div className="container-custom cs-inner">

        {/* Heading */}
        <div
          ref={headRef}
          className="cs-heading-wrap"
          style={{
            opacity: headIn ? 1 : 0,
            transform: headIn ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.6s ease, transform 0.6s ease",
          }}
        >
          <p className="cs-eyebrow">/ contact</p>
          <div className="cs-heading-row">
            <h1 className="cs-heading">
              Get in<br />
              <span className="cs-heading-outline">Touch</span>
            </h1>
            <p className="cs-heading-sub">
              Have a project in mind? A collaboration idea? Or just want to say hi?
              Fill out the form and I will get back to you.
            </p>
          </div>
        </div>

        {/* Grid */}
        <div className="cs-grid">
          <div style={{
            opacity: headIn ? 1 : 0,
            transform: headIn ? "translateY(0)" : "translateY(32px)",
            transition: "opacity 0.65s 0.1s ease, transform 0.65s 0.1s ease",
          }}>
            <ContactForm />
          </div>
          <div style={{
            opacity: headIn ? 1 : 0,
            transform: headIn ? "translateY(0)" : "translateY(32px)",
            transition: "opacity 0.65s 0.2s ease, transform 0.65s 0.2s ease",
          }}>
            <ContactCard />
          </div>
        </div>
      </div>

      <style>{`
        .cs-section {
          position: relative;
          background: var(--background);
          padding: 5rem 1.5rem 7rem;
          overflow: hidden;
        }
        .cs-bg-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(var(--border) 1px, transparent 1px),
            linear-gradient(90deg, var(--border) 1px, transparent 1px);
          background-size: 60px 60px;
          opacity: 0.18;
          mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%);
          pointer-events: none;
        }
        .cs-inner {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          gap: 3.5rem;
        }
        .cs-heading-wrap {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }
        .cs-eyebrow {
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--muted);
        }
        .cs-heading-row {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 2rem;
          flex-wrap: wrap;
        }
        .cs-heading {
          font-family: var(--font-montserrat), Georgia, serif;
          font-size: clamp(2.5rem, 5vw, 4.5rem);
          font-weight: 800;
          letter-spacing: -0.035em;
          line-height: 0.95;
          color: var(--foreground);
          margin: 0;
        }
        .cs-heading-outline {
          -webkit-text-stroke: 1.5px var(--foreground);
          color: transparent;
        }
        .cs-heading-sub {
          max-width: 360px;
          font-size: 0.875rem;
          line-height: 1.75;
          color: var(--muted);
        }
        .cs-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2.5rem;
          align-items: start;
        }
        @media (max-width: 768px) {
          .cs-heading-row { flex-direction: column; align-items: flex-start; }
          .cs-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
}