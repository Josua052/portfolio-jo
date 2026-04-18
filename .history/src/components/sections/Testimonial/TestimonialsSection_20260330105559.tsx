// src/components/testimonial/TestimonialsSection.tsx
// This is the main section — import this in page.tsx
// TestimonialsList is a Server Component (async), so it can be used with Suspense.

import { Suspense } from "react";
import TestimonialForm from "./TestimonialForm";
import TestimonialsList from "./TestimonialsList";

/* ── Loading skeleton ── */
function ListSkeleton() {
  return (
    <div className="ts-skeleton-grid">
      {[1, 2, 3].map((i) => (
        <div key={i} className="ts-skeleton-card">
          <div className="ts-sk-line ts-sk-short" />
          <div className="ts-sk-line ts-sk-long" />
          <div className="ts-sk-line ts-sk-long" />
          <div className="ts-sk-line ts-sk-mid" />
          <div className="ts-sk-footer">
            <div className="ts-sk-avatar" />
            <div className="ts-sk-meta">
              <div className="ts-sk-line ts-sk-mid" />
              <div className="ts-sk-line ts-sk-short" />
            </div>
          </div>
        </div>
      ))}
      <style>{`
        .ts-skeleton-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 1.25rem;
        }
        .ts-skeleton-card {
          border: 1px solid var(--border);
          border-radius: 1.25rem;
          padding: 1.625rem;
          display: flex;
          flex-direction: column;
          gap: 0.875rem;
          background: var(--background);
        }
        .ts-sk-line {
          border-radius: 6px;
          background: var(--secondary);
          height: 12px;
          animation: ts-shimmer 1.6s ease-in-out infinite;
        }
        .ts-sk-short  { width: 40%; }
        .ts-sk-mid    { width: 65%; }
        .ts-sk-long   { width: 100%; }
        .ts-sk-footer {
          display: flex; align-items: center; gap: 0.75rem;
          padding-top: 0.75rem; border-top: 1px solid var(--border);
          margin-top: 0.25rem;
        }
        .ts-sk-avatar {
          width: 40px; height: 40px; border-radius: 50%;
          background: var(--secondary);
          animation: ts-shimmer 1.6s ease-in-out infinite;
          flex-shrink: 0;
        }
        .ts-sk-meta { display: flex; flex-direction: column; gap: 0.4rem; flex: 1; }
        @keyframes ts-shimmer {
          0%, 100% { opacity: 0.5; }
          50%       { opacity: 1; }
        }
      `}</style>
    </div>
  );
}

export default function TestimonialsSection() {
  return (
    <section className="ts-section">
      <div className="container-custom ts-inner">
        {/* ── Heading ── */}
        <div className="ts-heading-wrap">
          <p className="ts-eyebrow">/ testimonials</p>
          <div className="ts-heading-row">
            <h1 className="ts-heading">
              What People
              <br />
              <span className="ts-heading-outline">Say About Me</span>
            </h1>
            <p className="ts-heading-sub">
              Rekomendasi dari rekan kerja, klien, dan kolaborator yang pernah
              bekerja bersama saya secara langsung.
            </p>
          </div>
        </div>

        {/* ── Content: list (left) + form (right) ── */}
        <div className="ts-grid">
          {/* Left — testimonials list */}
          <div className="ts-left">
            <Suspense fallback={<ListSkeleton />}>
              <TestimonialsList />
            </Suspense>
          </div>

          {/* Right — sticky form */}
          <div className="ts-right">
            <div className="ts-form-sticky">
              <TestimonialForm />
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .ts-section {
          background: var(--background);
          padding: 5rem 1.5rem 7rem;
          overflow-x: hidden;
        }
        .ts-inner {
          display: flex;
          flex-direction: column;
          gap: 3.5rem;
        }

        /* Heading */
        .ts-heading-wrap { display: flex; flex-direction: column; gap: 1.25rem; }
        .ts-eyebrow {
          font-size: 0.7rem; font-weight: 700;
          letter-spacing: 0.14em; text-transform: uppercase;
          color: var(--muted);
        }
        .ts-heading-row {
          display: flex; align-items: flex-end;
          justify-content: space-between; gap: 2rem; flex-wrap: wrap;
        }
        .ts-heading {
          font-family: var(--font-montserrat), Georgia, serif;
          font-size: clamp(2.5rem, 5vw, 4.5rem);
          font-weight: 800; letter-spacing: -0.035em;
          line-height: 0.95; color: var(--foreground); margin: 0;
        }
        .ts-heading-outline {
          -webkit-text-stroke: 1.5px var(--foreground);
          color: transparent;
        }
        .ts-heading-sub {
          max-width: 360px; font-size: 0.875rem;
          line-height: 1.75; color: var(--muted);
        }

        /* Grid: list 2/3 + form 1/3 */
        .ts-grid {
          display: grid;
          grid-template-columns: 1fr 380px;
          gap: 2.5rem;
          align-items: start;
          width: 100%;
          min-width: 0;
        }
        /* Critical: prevent grid children from overflowing */
        .ts-left,
        .ts-right {
          min-width: 0;
          width: 100%;
        }
        @media (max-width: 1024px) {
          /* Stack: form first on mobile, list below */
          .ts-grid {
            grid-template-columns: 1fr;
          }
          .ts-right { order: -1; }
        }

        /* Sticky form on desktop */
        .ts-form-sticky {
          position: sticky;
          top: 88px; /* below fixed navbar */
        }

        @media (max-width: 640px) {
          .ts-heading-row { flex-direction: column; align-items: flex-start; }
        }
      `}</style>
    </section>
  );
}
