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
        <div className="ts-grid">
          {/* Left Column: Heading + Stats + Form */}
          <div className="ts-left">
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
                  <span className="ts-stat-num">5</span>
                  <span className="ts-stat-label">Klien</span>
                </div>
                <div className="ts-stat">
                  <span className="ts-stat-num">5</span>
                  <span className="ts-stat-label">Rating</span>
                </div>
                <div className="ts-stat">
                  <span className="ts-stat-num">1+</span>
                  <span className="ts-stat-label">Tahun</span>
                </div>
              </div>
            </div>

            <div className="ts-form-area">
              <TestimonialForm />
            </div>
          </div>

          {/* Right Column: Vertical Ticker */}
          <div className="ts-right">
            <Suspense fallback={<TickerSkeleton />}>
              <TestimonialsTicker />
            </Suspense>
          </div>
        </div>
      </div>

      <style>{`
        .ts-section {
          background: var(--background);
          padding: 5rem 1.5rem 7rem;
          overflow-x: hidden;
        }

        /* ── Grid Layout ── */
        .ts-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: stretch;
        }

        @media (max-width: 900px) {
          .ts-grid {
            grid-template-columns: 1fr;
            gap: 3rem;
          }
        }

        /* ── Left Column ── */
        .ts-left {
          display: flex;
          flex-direction: column;
          gap: 2.5rem;
          position: sticky;
          top: 6rem;
        }

        @media (max-width: 900px) {
          .ts-left {
            position: static;
          }
        }

        /* ── Heading area ── */
        .ts-heading-area {
          display: flex;
          flex-direction: column;
          gap: 2rem;
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
          font-size: clamp(2.5rem, 4vw, 3.5rem);
          font-weight: 800;
          letter-spacing: -0.03em;
          line-height: 1.05;
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
          max-width: 380px;
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
          padding-top: 1.5rem;
          border-top: 1px solid var(--border);
        }

        /* ── Right Column ── */
        .ts-right {
          position: relative;
          min-height: 600px;
        }
        @media (max-width: 900px) {
          .ts-right {
            min-height: 500px;
          }
        }
      `}</style>
    </section>
  );
}
