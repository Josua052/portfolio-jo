"use client";

import { useEffect, useRef } from "react";
import { Sparkles } from "lucide-react";

export default function AboutQuotes() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Parallax subtle effect for background text
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const handleMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 30;
      const y = (e.clientY / innerHeight - 0.5) * 30;
      el.style.setProperty("--mx", `${x}px`);
      el.style.setProperty("--my", `${y}px`);
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <section ref={containerRef} className="ph-section">
      {/* Huge subtle background text */}
      <div className="ph-bg-text-wrapper" aria-hidden>
        <div className="ph-bg-text">BOLD</div>
      </div>

      <div className="container-custom ph-inner">
        {/* ── Creative Typographic Poster Layout ── */}
        <div className="ph-poster">
          {/* 1. FORTIS (Top Left) */}
          <div className="ph-word-layer ph-word-left">FORTIS</div>

          {/* 2. Interwoven Quote Block (Right side overlapping) */}
          <div className="ph-float-block ph-float-right">
            <div className="ph-quote-line" />
            <p className="ph-desc-text">
              Keberuntungan berpihak pada mereka yang berani. Inovasi sejati
              tidak pernah lahir dari kenyamanan, melainkan dari keberanian
              mengambil risiko dan eksperimen tanpa henti.
            </p>
          </div>

          {/* 3. Fortuna (Center, Italic, Identity Colors) */}
          <div className="ph-word-layer ph-word-center" data-aos="zoom-in" data-aos-duration="1000">
            <span className="ph-highlight-identity">Fortuna</span>
          </div>

          {/* 4. Interwoven Message Block (Left side overlapping) */}
          <div className="ph-float-block ph-float-left">
            <div className="ph-message-card">
              <h3 className="ph-message-title">
                <Sparkles size={18} className="text-indigo-500" />
                Be Bold.
              </h3>
              <p className="ph-desc-text">
                Seni tertinggi dalam{" "}
                <span className="font-semibold text-foreground">
                  digital experience
                </span>{" "}
                adalah ketika kompleksitas kode melebur sempurna menjadi
                pengalaman yang halus, intuitif, dan tak terlihat.
              </p>
            </div>
          </div>

          {/* 5. ADIUVAT (Bottom Right) */}
          <div className="ph-word-layer ph-word-right">ADIUVAT</div>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@600&display=swap');

        /* ── Section Base ── */
        .ph-section {
          position: relative;
          background: var(--background);
          padding: 6rem 1.5rem 10rem;
          overflow: hidden;
        }

        .ph-bg-text-wrapper {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          pointer-events: none;
          z-index: 0;
          transform: translate(calc(var(--mx) * -0.6), calc(var(--my) * -0.6));
          transition: transform 0.2s ease-out;
        }

        .ph-bg-text {
          font-family: var(--font-montserrat), sans-serif;
          font-size: clamp(8rem, 30vw, 40rem);
          font-weight: 900;
          line-height: 1;
          letter-spacing: -0.05em;
          color: var(--foreground);
          opacity: 0.015;
          user-select: none;
        }

        .ph-inner {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          gap: 6rem;
          max-width: 1200px;
          margin: 0 auto;
        }

        /* ── Heading Concept ── */
        .ph-head {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }
        
        .ph-eyebrow {
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--muted);
          margin: 0;
        }

        .ph-head-row {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 2rem;
          flex-wrap: wrap;
        }

        .ph-title {
          font-family: var(--font-montserrat), Georgia, serif;
          font-size: clamp(3rem, 6vw, 4.5rem);
          font-weight: 800;
          letter-spacing: -0.035em;
          line-height: 0.95;
          color: var(--foreground);
          margin: 0;
          text-transform: capitalize;
        }

        .ph-title-outline {
          -webkit-text-stroke: 1.5px var(--foreground);
          color: transparent;
        }

        .ph-subtitle {
          max-width: 340px;
          font-size: 0.95rem;
          line-height: 1.6;
          color: var(--muted);
          margin: 0;
        }

        /* ── Typographic Poster Layout ── */
        .ph-poster {
          display: flex;
          flex-direction: column;
          position: relative;
          width: 100%;
          padding: 2rem 0;
        }

        .ph-word-layer {
          line-height: 0.85;
          margin: 0;
          pointer-events: none;
          user-select: none;
        }

        /* Left aligned massive text */
        .ph-word-left {
          font-family: var(--font-montserrat), sans-serif;
          font-size: clamp(4rem, 11vw, 10rem);
          font-weight: 900;
          letter-spacing: -0.04em;
          -webkit-text-stroke: 1.5px var(--foreground);
          color: transparent;
          text-align: left;
        }

        /* Center aligned italic text */
        .ph-word-center {
          font-family: 'Caveat', cursive;
          font-size: clamp(5.5rem, 15vw, 14rem);
          font-weight: 600;
          text-align: center;
          margin-top: -2rem; /* Overlaps with the blocks */
          position: relative;
          z-index: 1;
        }

        /* Right aligned massive text */
        .ph-word-right {
          font-family: var(--font-montserrat), sans-serif;
          font-size: clamp(4rem, 11vw, 10rem);
          font-weight: 900;
          letter-spacing: -0.04em;
          -webkit-text-stroke: 1.5px var(--foreground);
          color: transparent;
          text-align: right;
          margin-top: -2rem;
        }

        /* Identity Gradient Shimmer & Write Animation */
        .ph-highlight-identity {
          background: linear-gradient(110deg, #6366f1 20%, #38bdf8 40%, #38bdf8 60%, #4f46e5 80%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          color: transparent;
          display: inline-block;
          padding-right: 2rem; /* Prevent italic cutoff */
          
          /* Mask for writing effect */
          -webkit-mask-image: linear-gradient(to right, black 50%, transparent 50%);
          -webkit-mask-size: 200% 100%;
          -webkit-mask-position: 100% 0;
        }

        [data-aos].aos-animate .ph-highlight-identity,
        .aos-animate .ph-highlight-identity {
          animation: write-erase-text 10s ease-in-out infinite, shimmer-identity 5s linear infinite;
        }

        @keyframes write-erase-text {
          0%, 5% { -webkit-mask-position: 100% 0; }
          20%, 80% { -webkit-mask-position: 0 0; }
          95%, 100% { -webkit-mask-position: 100% 0; }
        }

        @keyframes shimmer-identity {
          to { background-position: 200% center; }
        }

        /* ── Interwoven Blocks ── */
        .ph-float-block {
          position: relative;
          z-index: 10;
          max-width: 400px;
        }

        .ph-float-right {
          align-self: flex-end;
          margin-top: -4rem;
          margin-right: 5%;
          padding-left: 1.5rem;
        }

        .ph-quote-line {
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 2px;
          background: linear-gradient(to bottom, #6366f1, transparent);
        }

        .ph-float-left {
          align-self: flex-start;
          margin-top: -3rem;
          margin-left: 5%;
        }

        /* Typography inside blocks */
        .ph-quote-text {
          font-family: Georgia, serif;
          font-size: 1.6rem;
          font-style: italic;
          font-weight: 600;
          color: var(--foreground);
          margin: 0 0 0.75rem 0;
        }

        .ph-desc-text {
          font-size: 0.95rem;
          line-height: 1.8;
          color: var(--muted);
          margin: 0;
        }

        /* Refined Message Card */
        .ph-message-card {
          padding: 1.5rem 2rem;
          background: color-mix(in srgb, var(--background) 60%, transparent);
          backdrop-filter: blur(12px);
          border-radius: 20px;
          border: 1px solid color-mix(in srgb, var(--foreground) 5%, transparent);
          box-shadow: 0 20px 40px -10px rgba(0,0,0,0.05);
        }

        .ph-message-title {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 1.1rem;
          font-weight: 800;
          color: var(--foreground);
          margin: 0 0 0.5rem 0;
        }

        /* ── Responsive Adjustments ── */
        @media (max-width: 768px) {
          .ph-poster {
            padding: 1rem 0;
            gap: 2rem;
          }
          .ph-word-center {
            margin-top: 0;
            text-align: left;
          }
          .ph-word-right {
            margin-top: 0;
            text-align: left;
          }
          .ph-float-right, .ph-float-left {
            align-self: flex-start;
            margin: 0;
            margin-left: 1rem;
            max-width: 90%;
          }
          .ph-float-right {
            margin-top: 1rem;
            margin-bottom: 2rem;
          }
          .ph-message-card {
            padding: 1.25rem 1.5rem;
          }
        }
      `}</style>
    </section>
  );
}
