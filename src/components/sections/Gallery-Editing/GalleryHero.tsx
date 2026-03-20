// src/components/gallery/GalleryHero.tsx
"use client";

import { useEffect, useRef, useState } from "react";

function useInView(threshold = 0.2) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setInView(true);
      },
      { threshold },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, inView };
}

export default function GalleryHero() {
  const { ref, inView } = useInView(0.2);

  return (
    <section className="gallery-hero">
      {/* Background dot grid */}
      <div className="gallery-hero-grid" aria-hidden />

      <div
        ref={ref}
        className="gallery-hero-inner"
        style={{
          opacity: inView ? 1 : 0,
          transform: inView ? "translateY(0)" : "translateY(24px)",
          transition: "opacity 0.65s ease, transform 0.65s ease",
        }}
      >
        <p className="gallery-hero-eyebrow">/ gallery · editing</p>

        <h1 className="gallery-hero-title">
          <span className="gallery-hero-solid">Creative</span>
          <span className="gallery-hero-outline">Showcase</span>
        </h1>

        <p className="gallery-hero-sub">
          A collection of my visual editing work — posters, photo manipulation,
          UI/UX design explorations, and digital art.
        </p>

        <div className="gallery-hero-line" aria-hidden />
      </div>

      <style>{`
        .gallery-hero {
          position: relative;
          background: var(--background);
          padding: 8rem 1.5rem 4rem;
          overflow: hidden;
        }

        .gallery-hero-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(var(--border) 1px, transparent 1px),
            linear-gradient(90deg, var(--border) 1px, transparent 1px);
          background-size: 60px 60px;
          opacity: 0.28;
          mask-image: radial-gradient(ellipse 70% 90% at 50% 50%, black 20%, transparent 100%);
        }

        .gallery-hero-inner {
          position: relative;
          z-index: 1;
          max-width: 1280px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .gallery-hero-eyebrow {
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--muted);
        }

        .gallery-hero-title {
          display: flex;
          flex-direction: column;
          margin: 0;
          gap: 0.05em;
        }

        .gallery-hero-solid,
        .gallery-hero-outline {
          display: block;
          font-family: var(--font-montserrat), Georgia, serif;
          font-weight: 800;
          letter-spacing: -0.035em;
          line-height: 0.95;
          font-size: clamp(3rem, 7vw, 6rem);
        }

        .gallery-hero-solid {
          color: var(--foreground);
        }

        .gallery-hero-outline {
          -webkit-text-stroke: 1.5px var(--foreground);
          color: transparent;
        }

        .gallery-hero-sub {
          font-size: 1rem;
          line-height: 1.7;
          color: var(--muted);
          max-width: 480px;
        }

        .gallery-hero-line {
          width: 48px;
          height: 2px;
          background: var(--foreground);
          opacity: 0.2;
        }
      `}</style>
    </section>
  );
}
