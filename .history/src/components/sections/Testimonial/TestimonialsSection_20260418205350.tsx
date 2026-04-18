// src/components/testimonial/TestimonialsSection.tsx
import { Suspense } from "react";
import TestimonialForm from "./TestimonialForm";
import TestimonialsTicker from "./TestimonialsTicker";

function FormSkeleton() {
  return (
    <div className="ts-form-skeleton">
      <div className="ts-sk-line ts-sk-short" />
      <div className="ts-sk-line ts-sk-mid" />
      <div className="ts-sk-line ts-sk-long" />
      <div className="ts-sk-line ts-sk-long" />
      <div className="ts-sk-line ts-sk-long" />
      <div className="ts-sk-btn" />
      <style>{`
        .ts-form-skeleton {
          display: flex; flex-direction: column; gap: 14px;
          padding: 32px 28px;
        }
        .ts-sk-line {
          border-radius: 6px;
          background: var(--secondary);
          height: 12px;
          animation: ts-shimmer 1.6s ease-in-out infinite;
        }
        .ts-sk-short  { width: 35%; }
        .ts-sk-mid    { width: 55%; }
        .ts-sk-long   { width: 100%; height: 32px; border-radius: 8px; }
        .ts-sk-btn    { width: 100%; height: 34px; border-radius: 8px; background: var(--secondary); animation: ts-shimmer 1.6s ease-in-out infinite; margin-top: 4px; }
        @keyframes ts-shimmer {
          0%, 100% { opacity: 0.4; }
          50%       { opacity: 0.9; }
        }
      `}</style>
    </div>
  );
}

function TickerSkeleton() {
  return (
    <div className="ts-ticker-skeleton">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="ts-ticker-sk-card">
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
          display: flex; gap: 14px; padding: 20px;
          overflow: hidden;
        }
        .ts-ticker-sk-card {
          flex-shrink: 0; width: 240px;
          border: 1px solid var(--border);
          border-radius: 12px; padding: 18px;
          display: flex; flex-direction: column; gap: 10px;
        }
        .ts-sk-t-line {
          border-radius: 6px; background: var(--secondary);
          height: 10px;
          animation: ts-shimmer 1.6s ease-in-out infinite;
        }
        .ts-sk-t-short { width: 30%; }
        .ts-sk-t-mid   { width: 60%; }
        .ts-sk-t-long  { width: 100%; }
        .ts-sk-t-footer {
          display: flex; align-items: center; gap: 10px;
          border-top: 1px solid var(--border); padding-top: 10px; margin-top: 2px;
        }
        .ts-sk-t-avatar {
          width: 30px; height: 30px; border-radius: 50%;
          background: var(--secondary);
          animation: ts-shimmer 1.6s ease-in-out infinite;
          flex-shrink: 0;
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
            <Suspense fallback={<FormSkeleton />}>
              <TestimonialForm />
            </Suspense>
          </div>
        </div>

        {/* ── Bottom: Ticker ── */}
        <div className="ts-ticker-wrapper">
          <div className="ts-ticker-bar">
            <div className="ts-ticker-dot" />
            <span className="ts-ticker-label">Live testimonials</span>
            <div className="ts-ticker-line" />
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

        /* Top grid */
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

        /* Heading area */
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

        /* Stats */
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

        /* Form area */
        .ts-form-area {
          padding: 2.5rem 2rem;
        }

        /* Ticker wrapper */
        .ts-ticker-wrapper {
          margin-top: 1.25rem;
          border: 1px solid var(--border);
          border-radius: 1.25rem;
          overflow: hidden;
        }

        .ts-ticker-bar {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 0.625rem 1.25rem;
          border-bottom: 1px solid var(--border);
          background: var(--secondary);
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
          white-space: nowrap;
        }

        .ts-ticker-line {
          flex: 1;
          height: 1px;
          background: var(--border);
        }
      `}</style>
    </section>
  );
}
