"use client";

import { useEffect, useRef, useState } from "react";

const EDUCATION = [
  {
    period: "2019 – 2025",
    institution: "Universitas Sumatera Utara",
    research: "Image Classification of Tongue Lesion Types for Early Detection of Oral Cancer Using EfficientnetV2",
    degree: "Teknologi Informasi",
    grade: "GPA 3.57",
    gradeLabel: "GPA",
    gradeValue: "3.57",
    index: "01",
    quote:
      "Graduated with a Bachelor's degree in Information Technology from Universitas Sumatera Utara with a GPA of 3.57, laying a strong foundation for a career in design and software development.",
    tags: ["S1 / Bachelor", "Teknologi Informasi", "Medan, Indonesia"],
  },
];

function useInView(threshold = 0.2) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, inView };
}

function EducationCard({
  item,
  delay,
}: {
  item: (typeof EDUCATION)[0];
  delay: number;
}) {
  const { ref, inView } = useInView(0.15);

  return (
    <div
      ref={ref}
      className="edu-card-wrapper"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(40px)",
        transition: `opacity 0.7s ${delay}ms ease, transform 0.7s ${delay}ms ease`,
      }}
    >
      {/* Index number — decorative */}
      <div className="edu-index" aria-hidden>
        {item.index}
      </div>

      <div className="edu-card">
        {/* Top row: period + grade badge */}
        <div className="edu-card-top">
          <span className="edu-period">{item.period}</span>
          <div className="edu-grade-badge">
            <span className="edu-grade-label">{item.gradeLabel}</span>
            <span className="edu-grade-value">{item.gradeValue}</span>
          </div>
        </div>

        {/* Institution */}
        <h3 className="edu-institution">{item.institution}</h3>

        {/* Degree */}
        <p className="edu-degree">{item.degree}</p>
        {item.research && (
        <p className="edu-research">
          <span className="edu-research-label">Research:</span>{" "}
          {item.research}
        </p>
      )}

        {/* Divider */}
        <div className="edu-divider" />

        {/* Quote */}
        <blockquote className="edu-quote">
          <span className="edu-quote-mark"></span>
          {item.quote}
        </blockquote>

        {/* Tags */}
        <div className="edu-tags">
          {item.tags.map((t) => (
            <span key={t} className="edu-tag">
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export function AboutEducation() {
  const { ref: headingRef, inView: headingIn } = useInView(0.3);

  return (
    <section className="about-edu-section">
      <div className="container-custom">
        {/* Section heading */}
        <div
          ref={headingRef}
          className="about-edu-heading-wrap"
          style={{
            opacity: headingIn ? 1 : 0,
            transform: headingIn ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.6s ease, transform 0.6s ease",
          }}
        >
          <p className="about-edu-eyebrow">/ education</p>
          <div className="about-edu-heading-row">
            <h2 className="about-edu-heading">
              Academic
              <br />
              <span className="about-edu-heading-outline">Background</span>
            </h2>
            <p className="about-edu-heading-sub">
              The academic milestones that shaped my thinking as a designer and
              developer.
            </p>
          </div>
        </div>

        {/* Timeline */}
        <div className="edu-timeline">
          {/* Vertical line */}
          <div className="edu-timeline-line" aria-hidden />

          {EDUCATION.map((item, i) => (
            <div key={item.institution} className="edu-timeline-row">
              {/* Node dot on the line */}
              <div className="edu-timeline-node-wrap">
                <div className="edu-timeline-node" />
              </div>

              {/* Card */}
              <EducationCard item={item} delay={i * 150} />
            </div>
          ))}
        </div>
      </div>

      <style>{`
        /* ── Section ── */
        .about-edu-section {
          background: var(--background);
          color: var(--foreground);
          padding: 5rem 1.5rem 6rem;
        }

        /* ── Heading block ── */
        .about-edu-heading-wrap {
          margin-bottom: 4rem;
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .about-edu-eyebrow {
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--muted);
        }

        .about-edu-heading-row {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 2rem;
          flex-wrap: wrap;
        }

        .about-edu-heading {
          font-family: var(--font-montserrat), Georgia, serif;
          font-size: clamp(2.5rem, 5vw, 4.5rem);
          font-weight: 800;
          letter-spacing: -0.035em;
          line-height: 0.95;
          color: var(--foreground);
          margin: 0;
        }

        .about-edu-heading-outline {
          -webkit-text-stroke: 1.5px var(--foreground);
          color: transparent;
        }

        .about-edu-heading-sub {
          max-width: 320px;
          font-size: 0.875rem;
          line-height: 1.7;
          color: var(--muted);
          padding-bottom: 0.25rem;
        }
          .edu-research {
          font-size: 0.8rem;
          line-height: 1.6;
          color: var(--muted);
        }

        .edu-research-label {
          font-weight: 600;
          color: var(--foreground);
        }

        /* ── Timeline container ── */
        .edu-timeline {
          position: relative;
          display: flex;
          flex-direction: column;
          gap: 0;
          padding-left: 2.5rem;
        }

        /* Vertical line */
        .edu-timeline-line {
          position: absolute;
          left: 7px;
          top: 12px;
          bottom: 12px;
          width: 1px;
          background: linear-gradient(
            to bottom,
            var(--foreground) 0%,
            var(--border) 40%,
            var(--border) 70%,
            transparent 100%
          );
          opacity: 0.25;
        }

        /* ── Timeline row ── */
        .edu-timeline-row {
          position: relative;
          display: flex;
          gap: 2.5rem;
          padding-bottom: 3rem;
          align-items: flex-start;
        }
        .edu-timeline-row:last-child { padding-bottom: 0; }

        /* Node dot */
        .edu-timeline-node-wrap {
          position: absolute;
          left: -2.5rem;
          top: 1.75rem;
          width: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .edu-timeline-node {
          width: 14px;
          height: 14px;
          border-radius: 50%;
          border: 2px solid var(--foreground);
          background: var(--background);
          position: relative;
          z-index: 1;
          transition: background 0.3s;
        }
        .edu-timeline-row:hover .edu-timeline-node {
          background: var(--foreground);
        }

        /* ── Card wrapper (holds index + card) ── */
        .edu-card-wrapper {
          position: relative;
          width: 100%;
        }

        /* Decorative large index number */
        .edu-index {
          position: absolute;
          top: -1rem;
          right: 0;
          font-family: var(--font-montserrat), serif;
          font-size: 5rem;
          font-weight: 900;
          letter-spacing: -0.05em;
          line-height: 1;
          color: var(--border);
          pointer-events: none;
          user-select: none;
          z-index: 0;
          opacity: 0.6;
        }

        /* ── Card ── */
        .edu-card {
          position: relative;
          z-index: 1;
          background: var(--background);
          border: 1px solid var(--border);
          border-radius: 1.25rem;
          padding: 2rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          transition: border-color 0.3s, box-shadow 0.3s, transform 0.3s;
        }

        .edu-card:hover {
          border-color: var(--foreground);
          box-shadow: 0 8px 32px rgba(0,0,0,0.08);
          transform: translateY(-3px);
        }

        /* Top row */
        .edu-card-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 0.75rem;
        }

        .edu-period {
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--muted);
        }

        /* Grade badge */
        .edu-grade-badge {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.3rem 0.875rem;
          border-radius: 999px;
          border: 1px solid var(--border);
          background: var(--secondary);
        }

        .edu-grade-label {
          font-size: 0.65rem;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--muted);
        }

        .edu-grade-value {
          font-family: var(--font-montserrat), serif;
          font-size: 0.875rem;
          font-weight: 800;
          letter-spacing: -0.02em;
          color: var(--foreground);
        }

        /* Institution */
        .edu-institution {
          font-family: var(--font-montserrat), Georgia, serif;
          font-size: clamp(1.25rem, 2.5vw, 1.625rem);
          font-weight: 800;
          letter-spacing: -0.025em;
          color: var(--foreground);
          margin: 0;
          line-height: 1.2;
        }

        /* Degree */
        .edu-degree {
          font-size: 0.875rem;
          font-weight: 500;
          color: var(--muted);
          margin: 0;
        }

        /* Divider */
        .edu-divider {
          height: 1px;
          background: var(--border);
        }

        /* Quote */
        .edu-quote {
          position: relative;
          font-size: 0.875rem;
          line-height: 1.8;
          color: var(--muted);
          margin: 0;
          padding-left: 1rem;
          border-left: 2px solid var(--border);
          font-style: italic;
          transition: border-color 0.3s;
        }
        .edu-card:hover .edu-quote {
          border-left-color: var(--foreground);
        }

        .edu-quote-mark {
          position: absolute;
          top: -0.5rem;
          left: -0.25rem;
          font-size: 2rem;
          line-height: 1;
          color: var(--border);
          font-style: normal;
          pointer-events: none;
        }

        /* Tags */
        .edu-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.4rem;
        }

        .edu-tag {
          display: inline-flex;
          padding: 0.2rem 0.65rem;
          border-radius: 6px;
          font-size: 0.7rem;
          font-weight: 600;
          letter-spacing: 0.02em;
          border: 1px solid var(--border);
          color: var(--muted);
          background: var(--secondary);
          transition: color 0.2s, border-color 0.2s;
        }
        .edu-card:hover .edu-tag {
          color: var(--foreground);
          border-color: var(--foreground);
          opacity: 0.6;
        }

        /* ── Responsive ── */
        @media (max-width: 640px) {
          .edu-timeline { padding-left: 2rem; }
          .edu-timeline-node-wrap { left: -2rem; }
          .edu-index { font-size: 3.5rem; }
          .about-edu-heading-row { flex-direction: column; align-items: flex-start; }
        }
      `}</style>
    </section>
  );
}
