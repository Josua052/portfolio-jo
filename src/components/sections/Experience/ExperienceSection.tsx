"use client";

import { useEffect, useRef, useState } from "react";

import experiencesData from "@/data/experiences.json";
import { Experience } from "@/types/experience";

const EXPERIENCES = experiencesData as Experience[];

/* ─────────────────────────────────────────────
   Intersection hook
───────────────────────────────────────────── */
function useInView(threshold = 0.15) {
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

/* ─────────────────────────────────────────────
   Experience Card
───────────────────────────────────────────── */
function ExperienceCard({
  item,
  delay,
}: {
  item: (typeof EXPERIENCES)[0];
  delay: number;
}) {
  const { ref, inView } = useInView();
  const [expanded, setExpanded] = useState(false);
  const PREVIEW = 3;

  return (
    <div
      ref={ref}
      className="exp-card-wrapper"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateX(0)" : "translateX(-32px)",
        transition: `opacity 0.65s ${delay}ms ease, transform 0.65s ${delay}ms ease`,
      }}
    >
      {/* Decorative index */}
      <div className="exp-index" aria-hidden>
        {item.index}
      </div>

      <div className={`exp-card ${item.highlight ? "exp-card-highlight" : ""}`}>
        {/* ── Header ── */}
        <div className="exp-header">
          <div className="exp-header-left">
            {item.highlight && (
              <span className="exp-current-badge">
                <span className="exp-current-dot" />
                Current
              </span>
            )}
            <h3 className="exp-role">{item.role}</h3>
            <p className="exp-company">{item.company}</p>
          </div>

          <div className="exp-header-right">
            <span className="exp-location">{item.location}</span>
            <span className="exp-period">{item.period}</span>
          </div>
        </div>

        {/* ── Divider ── */}
        <div className="exp-divider" />

        {/* ── Points ── */}
        <ul className="exp-points">
          {(expanded ? item.points : item.points.slice(0, PREVIEW)).map(
            (pt, i) => (
              <li key={i} className="exp-point">
                <span className="exp-point-icon" aria-hidden>
                  →
                </span>
                <span>{pt}</span>
              </li>
            ),
          )}
        </ul>

        {item.points.length > PREVIEW && (
          <button
            className="exp-expand-btn"
            onClick={() => setExpanded((p) => !p)}
          >
            {expanded
              ? "Show less ↑"
              : `+${item.points.length - PREVIEW} more responsibilities`}
          </button>
        )}

        {/* ── Tags ── */}
        <div className="exp-tags">
          {item.tags.map((t) => (
            <span key={t} className="exp-tag">
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Section
───────────────────────────────────────────── */
export default function ExperienceSection() {
  const { ref: headRef, inView: headIn } = useInView(0.3);

  return (
    <section className="exp-section">
      <div className="container-custom">
        {/* ── Heading ── */}
        <div
          ref={headRef}
          className="exp-heading-wrap"
          style={{
            opacity: headIn ? 1 : 0,
            transform: headIn ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.6s ease, transform 0.6s ease",
          }}
        >
          <p className="exp-eyebrow">/ experience</p>
          <div className="exp-heading-row">
            <h1 className="exp-heading">
              Profesional
              <br />
              <span className="exp-heading-outline">Experience</span>
            </h1>
            <p className="exp-heading-sub">
              A journey through my professional growth, projects, and
              contributions in web development and design.
            </p>
          </div>
        </div>

        {/* ── Timeline ── */}
        <div className="exp-timeline">
          {/* Vertical line */}
          <div className="exp-timeline-line" aria-hidden />

          {EXPERIENCES.map((exp, i) => (
            <div key={exp.company} className="exp-timeline-row">
              {/* Node */}
              <div className="exp-node-wrap">
                <div
                  className={`exp-node ${exp.highlight ? "exp-node-active" : ""}`}
                >
                  {exp.highlight && <div className="exp-node-pulse" />}
                </div>
              </div>

              <ExperienceCard item={exp} delay={i * 120} />
            </div>
          ))}
        </div>
      </div>

      <style>{`
        /* ── Section ── */
        .exp-section {
          background: var(--background);
          color: var(--foreground);
          padding: 5rem 1.5rem 6rem;
        }

        /* ── Heading ── */
        .exp-heading-wrap {
          margin-bottom: 4rem;
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }
        .exp-eyebrow {
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--muted);
        }
        .exp-heading-row {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 2rem;
          flex-wrap: wrap;
        }
        .exp-heading {
          font-family: var(--font-montserrat), Georgia, serif;
          font-size: clamp(2.5rem, 5vw, 4.5rem);
          font-weight: 800;
          letter-spacing: -0.035em;
          line-height: 0.95;
          color: var(--foreground);
          margin: 0;
        }
        .exp-heading-outline {
          -webkit-text-stroke: 1.5px var(--foreground);
          color: transparent;
        }
        .exp-heading-sub {
          max-width: 340px;
          font-size: 0.875rem;
          line-height: 1.75;
          color: var(--muted);
          padding-bottom: 0.25rem;
        }

        /* ── Timeline ── */
        .exp-timeline {
          position: relative;
          padding-left: 2.5rem;
          display: flex;
          flex-direction: column;
          gap: 0;
        }
        .exp-timeline-line {
          position: absolute;
          left: 7px;
          top: 14px;
          bottom: 14px;
          width: 1px;
          background: linear-gradient(
            to bottom,
            var(--foreground) 0%,
            var(--border) 40%,
            var(--border) 80%,
            transparent 100%
          );
          opacity: 0.2;
        }

        /* ── Timeline row ── */
        .exp-timeline-row {
          position: relative;
          padding-bottom: 2.5rem;
        }
        .exp-timeline-row:last-child { padding-bottom: 0; }

        /* Node */
        .exp-node-wrap {
          position: absolute;
          left: -2.5rem;
          top: 1.85rem;
          width: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .exp-node {
          position: relative;
          width: 14px;
          height: 14px;
          border-radius: 50%;
          border: 2px solid var(--foreground);
          background: var(--background);
          z-index: 1;
          transition: background 0.3s;
        }
        .exp-node-active {
          background: var(--foreground);
        }
        .exp-node-pulse {
          position: absolute;
          inset: -4px;
          border-radius: 50%;
          border: 1.5px solid var(--foreground);
          opacity: 0.3;
          animation: exp-pulse 2s ease-in-out infinite;
        }
        @keyframes exp-pulse {
          0%, 100% { transform: scale(1); opacity: 0.3; }
          50%       { transform: scale(1.4); opacity: 0; }
        }

        /* ── Card wrapper ── */
        .exp-card-wrapper {
          position: relative;
          width: 100%;
        }
        .exp-index {
          position: absolute;
          top: -1.25rem;
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
          opacity: 0.5;
        }

        /* ── Card ── */
        .exp-card {
          position: relative;
          z-index: 1;
          background: var(--background);
          border: 1px solid var(--border);
          border-radius: 1.25rem;
          padding: 2rem;
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          transition: border-color 0.3s, box-shadow 0.3s, transform 0.3s;
        }
        .exp-card:hover {
          border-color: var(--foreground);
          box-shadow: 0 8px 32px rgba(0,0,0,0.08);
          transform: translateY(-3px);
        }

        /* Highlight variant — uses CSS vars, no hardcoded colors */
        .exp-card-highlight {
          background: var(--secondary);
          border-color: var(--border);
        }
        .exp-card-highlight::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: inherit;
          background: linear-gradient(
            135deg,
            rgba(99,102,241,0.06) 0%,
            transparent 60%
          );
          pointer-events: none;
        }

        /* ── Header ── */
        .exp-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 1rem;
          flex-wrap: wrap;
        }
        .exp-header-left {
          display: flex;
          flex-direction: column;
          gap: 0.3rem;
        }
        .exp-header-right {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 0.3rem;
          flex-shrink: 0;
        }

        /* Current badge */
        .exp-current-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.2rem 0.65rem;
          border-radius: 999px;
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          border: 1px solid var(--border);
          color: var(--foreground);
          background: var(--background);
          width: fit-content;
        }
        .exp-current-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #22c55e;
          box-shadow: 0 0 0 3px rgba(34,197,94,0.2);
          animation: exp-dot-pulse 2s infinite;
          flex-shrink: 0;
        }
        @keyframes exp-dot-pulse {
          0%, 100% { box-shadow: 0 0 0 3px rgba(34,197,94,0.2); }
          50%       { box-shadow: 0 0 0 5px rgba(34,197,94,0.08); }
        }

        .exp-role {
          font-family: var(--font-montserrat), Georgia, serif;
          font-size: clamp(1.1rem, 2vw, 1.35rem);
          font-weight: 800;
          letter-spacing: -0.02em;
          color: var(--foreground);
          margin: 0;
          line-height: 1.2;
        }
        .exp-company {
          font-size: 0.85rem;
          color: var(--muted);
          margin: 0;
        }
        .exp-location {
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: var(--muted);
        }
        .exp-period {
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.04em;
          color: var(--muted);
          white-space: nowrap;
        }

        /* ── Divider ── */
        .exp-divider {
          height: 1px;
          background: var(--border);
        }

        /* ── Points ── */
        .exp-points {
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .exp-point {
          display: flex;
          gap: 0.625rem;
          align-items: baseline;
        }
        .exp-point-icon {
          font-size: 0.65rem;
          color: var(--muted);
          flex-shrink: 0;
          margin-top: 0.1rem;
          transition: color 0.2s;
        }
        .exp-card:hover .exp-point-icon {
          color: var(--foreground);
        }
        .exp-point span:last-child {
          font-size: 0.875rem;
          line-height: 1.75;
          color: var(--muted);
        }

        /* Expand button */
        .exp-expand-btn {
          align-self: flex-start;
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.02em;
          color: var(--muted);
          background: none;
          border: none;
          cursor: pointer;
          padding: 0;
          transition: color 0.2s;
        }
        .exp-expand-btn:hover {
          color: var(--foreground);
        }

        /* ── Tags ── */
        .exp-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.4rem;
        }
        .exp-tag {
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
          cursor: default;
        }
        .exp-card:hover .exp-tag {
          color: var(--foreground);
          border-color: var(--foreground);
          opacity: 0.6;
        }

        /* ── Responsive ── */
        @media (max-width: 640px) {
          .exp-timeline { padding-left: 2rem; }
          .exp-node-wrap { left: -2rem; }
          .exp-index { font-size: 3.5rem; }
          .exp-heading-row { flex-direction: column; align-items: flex-start; }
          .exp-header { flex-direction: column; }
          .exp-header-right { align-items: flex-start; }
        }
      `}</style>
    </section>
  );
}
