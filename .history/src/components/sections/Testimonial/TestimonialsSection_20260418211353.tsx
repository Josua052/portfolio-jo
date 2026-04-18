// src/components/testimonial/TestimonialsSection.tsx
import { Suspense } from "react";
import TestimonialForm from "./TestimonialForm";
import TestimonialsTicker from "./TestimonialsList";

function TickerSkeleton() {
  return (
    <div className="ts-ticker-skeleton">
      {[1, 2, 3, 4, 5].map((i) => (
        <div
          key={i}
          className="ts-ticker-sk-card"
          style={{ opacity: i === 3 ? 1 : i === 2 || i === 4 ? 0.65 : 0.35 }}
        >
          <div className="ts-sk-t-line ts-sk-t-short" />
          <div className="ts-sk-t-line ts-sk-t-long" />
          <div className="ts-sk-t-line ts-sk-t-long" />
          <div className="ts-sk-t-footer">
            <div className="ts-sk-t-avatar" />
            <div style={{ flex: 1 }}>
              <div className="ts-sk-t-line ts-sk-t-mid" />
            </div>
          </div>
        </div>
      ))}
      <style>{`
        .ts-ticker-skeleton {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 20px;
          padding: 2.75rem 1rem;
          overflow: hidden;
        }
        .ts-ticker-sk-card {
          flex-shrink: 0;
          width: 300px;
          border: 1px solid var(--border);
          border-radius: 1rem;
          padding: 1.375rem 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 10px;
          transition: opacity 0.3s;
        }
        .ts-ticker-sk-card:nth-child(3) {
          transform: scale(1.06);
        }
        .ts-ticker-sk-card:nth-child(2),
        .ts-ticker-sk-card:nth-child(4) {
          transform: scale(0.89);
        }
        .ts-ticker-sk-card:nth-child(1),
        .ts-ticker-sk-card:nth-child(5) {
          transform: scale(0.78);
        }
        .ts-sk-t-line {
          border-radius: 6px;
          background: var(--secondary);
          height: 10px;
          animation: ts-shimmer 1.6s ease-in-out infinite;
        }
        .ts-sk-t-short { width: 30%; }
        .ts-sk-t-mid   { width: 60%; }
        .ts-sk-t-long  { width: 100%; }
        .ts-sk-t-footer {
          display: flex;
          align-items: center;
          gap: 10px;
          border-top: 1px solid var(--border);
          padding-top: 0.875rem;
          margin-top: 4px;
        }
        .ts-sk-t-avatar {
          width: 36px; height: 36px; border-radius: 50%;
          background: var(--secondary);
          animation: ts-shimmer 1.6s ease-in-out infinite;
          flex-shrink: 0;
        }
        @keyframes ts-shimmer {
          0%, 100% { opacity: 0.4; }
          50%       { opacity: 0.9; }
        }
      `}</style>
    </div>
  );
}

export default function TestimonialsSection() {
  return (
    <section className="ts-section">
      <div className="container-custom">
        {/* ── Top: Heading + Form ── */}
        <div className="ts-top">
          {/* Left — Heading & Stats */}
          <div className="ts-heading-area">
            <div>
              <p className="ts-eyebrow">/ testimonials</p>
              <h1 className="ts-heading">
                What people
                <span className="ts-heading-outline">say about me</span>
              </h1>
              <p className="ts-heading-sub">
                Rekomendasi dari rekan kerja, klien, dan kolaborator yang pernah
                bekerja bersama saya secara langsung.
              </p>
            </div>
            <div className="ts-stats">
              <div className="ts-stat">
                <span className="ts-stat-num">24</span>
                <span className="ts-stat-label">Klien</span>
              </div>
              <div className="ts-stat">
                <span className="ts-stat-num">4.9</span>
                <span className="ts-stat-label">Rating</span>
              </div>
              <div className="ts-stat">
                <span className="ts-stat-num">3+</span>
                <span className="ts-stat-label">Tahun</span>
              </div>
            </div>
          </div>

          {/* Right — Form */}
          <div className="ts-form-area">
            <TestimonialForm />
          </div>
        </div>

        {/* ── Bottom: Ticker (no border wrapper, no label bar) ── */}
        <div className="ts-ticker-outer">
          <div className="ts-ticker-meta">
            <div className="ts-ticker-dot" />
            <span className="ts-ticker-label">Live testimonials</span>
          </div>
          <Suspense fallback={<TickerSkeleton />}>
            <TestimonialsTicker />
          </Suspense>
        </div>
      </div>

      <style>{`
        .ts-section {
          background: var(--background);
          padding: 5rem 1.5rem 7rem;
          overflow-x: hidden;
        }

        /* ── Top grid ── */
        .ts-top {
          display: grid;
          grid-template-columns: 1fr 1fr;
          border: 1px solid var(--border);
          border-radius: 1.25rem;
          overflow: hidden;
        }
        @media (max-width: 768px) {
          .ts-top { grid-template-columns: 1fr; }
        }

        /* ── Heading area ── */
        .ts-heading-area {
          padding: 2.5rem 2rem;
          border-right: 1px solid var(--border);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          gap: 2rem;
        }
        @media (max-width: 768px) {
          .ts-heading-area {
            border-right: none;
            border-bottom: 1px solid var(--border);
          }
        }

        .ts-eyebrow {
          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--muted);
          margin-bottom: 0.75rem;
          display: block;
        }

        .ts-heading {
          font-family: var(--font-montserrat), Georgia, serif;
          font-size: clamp(2rem, 4vw, 3rem);
          font-weight: 800;
          letter-spacing: -0.03em;
          line-height: 1.0;
          color: var(--foreground);
          display: flex;
          flex-direction: column;
          margin: 0 0 1rem;
        }

        .ts-heading-outline {
          -webkit-text-stroke: 1.5px var(--foreground);
          color: transparent;
        }

        .ts-heading-sub {
          font-size: 0.85rem;
          line-height: 1.7;
          color: var(--muted);
          max-width: 320px;
        }

        /* ── Stats ── */
        .ts-stats {
          display: flex;
          gap: 2rem;
          padding-top: 1.5rem;
          border-top: 1px solid var(--border);
        }

        .ts-stat {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .ts-stat-num {
          font-family: var(--font-montserrat), serif;
          font-size: 1.75rem;
          font-weight: 800;
          color: var(--foreground);
          letter-spacing: -0.04em;
          line-height: 1;
        }

        .ts-stat-label {
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--muted);
        }

        /* ── Form area ── */
        .ts-form-area {
          padding: 2.5rem 2rem;
        }

        /* ── Ticker outer — NO border, NO background ── */
        .ts-ticker-outer {
          margin-top: 3rem;
        }

        .ts-ticker-meta {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 0.25rem;
          padding: 0 0.25rem;
        }

        .ts-ticker-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--foreground);
          flex-shrink: 0;
        }

        .ts-ticker-label {
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--muted);
        }
      `}</style>
    </section>
  );
}
