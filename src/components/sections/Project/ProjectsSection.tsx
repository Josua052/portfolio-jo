"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { PROJECTS, STATUS_CONFIG, Project } from "@/data/projects";

/* ─────────────────────────────────────────────
   Intersection hook
───────────────────────────────────────────── */
function useInView(threshold = 0.12) {
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

/* ─────────────────────────────────────────────
   Project Card
───────────────────────────────────────────── */
function ProjectCard({
  project,
  delay,
  isLeft,
}: {
  project: Project;
  delay: number;
  isLeft: boolean;
}) {
  const { ref, inView } = useInView();
  const [expanded, setExpanded] = useState(false);
  const status = STATUS_CONFIG[project.status];

  return (
    <div
      ref={ref}
      className="proj-card-wrapper"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView
          ? "translateX(0) translateY(0)"
          : `translateX(${isLeft ? "-28px" : "28px"}) translateY(16px)`,
        transition: `opacity 0.65s ${delay}ms ease, transform 0.65s ${delay}ms ease`,
      }}
    >
      {/* Decorative index */}
      <div className="proj-index" aria-hidden>{project.index}</div>

      <div className={`proj-card ${project.status === "live" ? "proj-card-live" : ""}`}>

        {/* ── Top row ── */}
        <div className="proj-card-top">
          <div className="proj-meta-left">
            <span className="proj-category">{project.category}</span>
            <span className="proj-period">{project.period}</span>
          </div>
          <div className="proj-status-badge" style={{ borderColor: `${status.color}40` }}>
            <span
              className="proj-status-dot"
              style={{
                background: status.dot,
                boxShadow: project.status === "live"
                  ? `0 0 0 3px ${status.dot}22`
                  : "none",
                animation: project.status === "live" ? "proj-live-pulse 2s infinite" : "none",
              }}
            />
            <span style={{ color: status.color }}>{status.label}</span>
          </div>
        </div>

        {/* ── Title block ── */}
        <div className="proj-title-wrap">
          <h3 className="proj-title">{project.title}</h3>
          <p className="proj-subtitle">{project.subtitle}</p>
          <p className="proj-company">{project.company}</p>
        </div>

        {/* ── Divider ── */}
        <div className="proj-divider" />

        {/* ── Description ── */}
        <ul className="proj-points">
          {(expanded ? project.description : project.description.slice(0, 2)).map((pt, i) => (
            <li key={i} className="proj-point">
              <span className="proj-point-arrow" aria-hidden>→</span>
              <span>{pt}</span>
            </li>
          ))}
        </ul>
        {project.description.length > 2 && (
          <button className="proj-expand-btn" onClick={() => setExpanded((p) => !p)}>
            {expanded ? "Show less ↑" : `+${project.description.length - 2} more`}
          </button>
        )}

        {/* ── Tech tags ── */}
        <div className="proj-tags">
          {project.tech.map((t) => (
            <span key={t} className="proj-tag">{t}</span>
          ))}
        </div>

        {/* ── CTA ── */}
        {project.url && (
          <Link
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="proj-link"
          >
            View Live Site
            <span className="proj-link-arrow">↗</span>
          </Link>
        )}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Section
───────────────────────────────────────────── */
export default function ProjectsSection() {
  const { ref: headRef, inView: headIn } = useInView(0.3);

  return (
    <section className="proj-section">
      <div className="container-custom">

        {/* ── Heading ── */}
        <div
          ref={headRef}
          className="proj-heading-wrap"
          style={{
            opacity: headIn ? 1 : 0,
            transform: headIn ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.6s ease, transform 0.6s ease",
          }}
        >
          <p className="proj-eyebrow">/ projects</p>
          <div className="proj-heading-row">
            <h2 className="proj-heading">
              Selected<br />
              <span className="proj-heading-outline">Projects</span>
            </h2>
            <p className="proj-heading-sub">
              A collection of projects reflecting my growth in web development,
              from recent live products to early shipped work.
            </p>
          </div>

          {/* Stats bar */}
          <div className="proj-stats-bar">
            {[
              { value: PROJECTS.filter(p => p.status === "live").length.toString(),    label: "Live" },
              { value: PROJECTS.filter(p => p.status === "featured").length.toString(), label: "Featured" },
              { value: PROJECTS.length.toString(),                                      label: "Total" },
            ].map((s) => (
              <div key={s.label} className="proj-stat">
                <span className="proj-stat-value">{s.value}</span>
                <span className="proj-stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Timeline flow ── */}
        <div className="proj-timeline">
          {/* Central line (desktop) */}
          <div className="proj-timeline-line" aria-hidden />

          {PROJECTS.map((project, i) => {
            const isLeft = i % 2 === 0;
            return (
              <div
                key={project.index}
                className={`proj-timeline-row ${isLeft ? "proj-row-left" : "proj-row-right"}`}
              >
                {/* Left slot */}
                <div className="proj-slot proj-slot-left">
                  {isLeft && (
                    <ProjectCard project={project} delay={i * 100} isLeft={true} />
                  )}
                  {!isLeft && (
                    <div className="proj-year-marker">
                      <span>{project.period.split("·")[0].trim()}</span>
                    </div>
                  )}
                </div>

                {/* Center node */}
                <div className="proj-node-col">
                  <div className={`proj-node ${project.status === "live" ? "proj-node-live" : ""}`}>
                    {project.status === "live" && <div className="proj-node-pulse" />}
                    <span className="proj-node-num">{project.index}</span>
                  </div>
                </div>

                {/* Right slot */}
                <div className="proj-slot proj-slot-right">
                  {!isLeft && (
                    <ProjectCard project={project} delay={i * 100} isLeft={false} />
                  )}
                  {isLeft && (
                    <div className="proj-year-marker proj-year-right">
                      <span>{project.period.split("·")[0].trim()}</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        /* ── Section ── */
        .proj-section {
          background: var(--background);
          color: var(--foreground);
          padding: 5rem 1.5rem 7rem;
        }

        /* ── Heading ── */
        .proj-heading-wrap {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          margin-bottom: 5rem;
        }
        .proj-eyebrow {
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--muted);
        }
        .proj-heading-row {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 2rem;
          flex-wrap: wrap;
        }
        .proj-heading {
          font-family: var(--font-montserrat), Georgia, serif;
          font-size: clamp(2.5rem, 5vw, 4.5rem);
          font-weight: 800;
          letter-spacing: -0.035em;
          line-height: 0.95;
          color: var(--foreground);
          margin: 0;
        }
        .proj-heading-outline {
          -webkit-text-stroke: 1.5px var(--foreground);
          color: transparent;
        }
        .proj-heading-sub {
          max-width: 340px;
          font-size: 0.875rem;
          line-height: 1.75;
          color: var(--muted);
        }

        /* Stats bar */
        .proj-stats-bar {
          display: flex;
          gap: 0;
          border: 1px solid var(--border);
          border-radius: 14px;
          overflow: hidden;
          width: fit-content;
          background: var(--background);
        }
        .proj-stat {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 0.75rem 1.5rem;
          border-right: 1px solid var(--border);
          gap: 0.2rem;
        }
        .proj-stat:last-child { border-right: none; }
        .proj-stat-value {
          font-family: var(--font-montserrat), serif;
          font-size: 1.25rem;
          font-weight: 800;
          letter-spacing: -0.04em;
          color: var(--foreground);
          line-height: 1;
        }
        .proj-stat-label {
          font-size: 0.62rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--muted);
        }

        /* ── Timeline ── */
        .proj-timeline {
          position: relative;
          display: flex;
          flex-direction: column;
          gap: 3rem;
        }

        /* Central vertical line — desktop only */
        .proj-timeline-line {
          display: none;
        }
        @media (min-width: 768px) {
          .proj-timeline-line {
            display: block;
            position: absolute;
            left: 50%;
            top: 10px;
            bottom: 10px;
            width: 1px;
            transform: translateX(-50%);
            background: linear-gradient(
              to bottom,
              var(--foreground) 0%,
              var(--border) 30%,
              var(--border) 80%,
              transparent 100%
            );
            opacity: 0.18;
          }
        }

        /* Row */
        .proj-timeline-row {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1rem;
          position: relative;
        }
        @media (min-width: 768px) {
          .proj-timeline-row {
            grid-template-columns: 1fr 60px 1fr;
            gap: 0;
            align-items: start;
          }
        }

        /* Slots */
        .proj-slot {
          width: 100%;
        }
        @media (min-width: 768px) {
          .proj-slot-left  { padding-right: 2rem; }
          .proj-slot-right { padding-left: 2rem; }
        }

        /* Year marker */
        .proj-year-marker {
          display: none;
        }
        @media (min-width: 768px) {
          .proj-year-marker {
            display: flex;
            align-items: flex-start;
            padding-top: 1.85rem;
            padding-left: 0.5rem;
          }
          .proj-year-right {
            justify-content: flex-end;
            padding-right: 0.5rem;
            padding-left: 0;
          }
          .proj-year-marker span {
            font-size: 0.7rem;
            font-weight: 700;
            letter-spacing: 0.1em;
            text-transform: uppercase;
            color: var(--muted);
            opacity: 0.6;
          }
        }

        /* Node column */
        .proj-node-col {
          display: none;
        }
        @media (min-width: 768px) {
          .proj-node-col {
            display: flex;
            justify-content: center;
            padding-top: 1.65rem;
            position: relative;
            z-index: 2;
          }
        }

        /* Node dot */
        .proj-node {
          position: relative;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          border: 1.5px solid var(--border);
          background: var(--background);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: border-color 0.3s, background 0.3s;
          flex-shrink: 0;
        }
        .proj-node-live {
          border-color: var(--foreground);
          background: var(--foreground);
        }
        .proj-node-pulse {
          position: absolute;
          inset: -5px;
          border-radius: 50%;
          border: 1.5px solid var(--foreground);
          opacity: 0.2;
          animation: proj-node-ring 2.5s ease-in-out infinite;
        }
        @keyframes proj-node-ring {
          0%, 100% { transform: scale(1); opacity: 0.2; }
          50%       { transform: scale(1.35); opacity: 0; }
        }
        .proj-node-num {
          font-family: var(--font-montserrat), serif;
          font-size: 0.6rem;
          font-weight: 800;
          letter-spacing: 0.03em;
          color: var(--muted);
          line-height: 1;
        }
        .proj-node-live .proj-node-num {
          color: var(--background);
        }

        /* ── Card wrapper ── */
        .proj-card-wrapper {
          position: relative;
          width: 100%;
        }
        .proj-index {
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
          opacity: 0.5;
        }

        /* ── Card ── */
        .proj-card {
          position: relative;
          z-index: 1;
          background: var(--background);
          border: 1px solid var(--border);
          border-radius: 1.25rem;
          padding: 1.75rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          transition: border-color 0.3s, box-shadow 0.3s, transform 0.3s;
        }
        .proj-card:hover {
          border-color: var(--foreground);
          box-shadow: 0 8px 32px rgba(0,0,0,0.08);
          transform: translateY(-3px);
        }
        .proj-card-live {
          background: var(--secondary);
        }
        .proj-card-live::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: inherit;
          background: linear-gradient(135deg, rgba(34,197,94,0.05) 0%, transparent 60%);
          pointer-events: none;
        }

        /* Top row */
        .proj-card-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 0.5rem;
        }
        .proj-meta-left {
          display: flex;
          flex-direction: column;
          gap: 0.15rem;
        }
        .proj-category {
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--muted);
        }
        .proj-period {
          font-size: 0.7rem;
          font-weight: 600;
          color: var(--muted);
          opacity: 0.7;
        }

        /* Status badge */
        .proj-status-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.25rem 0.75rem;
          border-radius: 999px;
          border: 1px solid;
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          background: var(--background);
        }
        .proj-status-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          flex-shrink: 0;
        }
        @keyframes proj-live-pulse {
          0%, 100% { box-shadow: 0 0 0 3px rgba(34,197,94,0.2); }
          50%       { box-shadow: 0 0 0 5px rgba(34,197,94,0.08); }
        }

        /* Title */
        .proj-title-wrap {
          display: flex;
          flex-direction: column;
          gap: 0.2rem;
        }
        .proj-title {
          font-family: var(--font-montserrat), Georgia, serif;
          font-size: clamp(1.1rem, 2vw, 1.35rem);
          font-weight: 800;
          letter-spacing: -0.02em;
          color: var(--foreground);
          margin: 0;
          line-height: 1.2;
        }
        .proj-subtitle {
          font-size: 0.8rem;
          font-weight: 500;
          color: var(--muted);
          margin: 0;
        }
        .proj-company {
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.04em;
          color: var(--muted);
          opacity: 0.7;
          margin: 0;
        }

        /* Divider */
        .proj-divider {
          height: 1px;
          background: var(--border);
        }

        /* Points */
        .proj-points {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .proj-point {
          display: flex;
          gap: 0.6rem;
          align-items: baseline;
        }
        .proj-point-arrow {
          font-size: 0.65rem;
          color: var(--muted);
          flex-shrink: 0;
          transition: color 0.2s;
        }
        .proj-card:hover .proj-point-arrow { color: var(--foreground); }
        .proj-point span:last-child {
          font-size: 0.85rem;
          line-height: 1.75;
          color: var(--muted);
        }

        /* Expand */
        .proj-expand-btn {
          align-self: flex-start;
          font-size: 0.72rem;
          font-weight: 600;
          color: var(--muted);
          background: none;
          border: none;
          cursor: pointer;
          padding: 0;
          transition: color 0.2s;
          letter-spacing: 0.02em;
        }
        .proj-expand-btn:hover { color: var(--foreground); }

        /* Tags */
        .proj-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.35rem;
        }
        .proj-tag {
          display: inline-flex;
          padding: 0.2rem 0.6rem;
          border-radius: 6px;
          font-size: 0.68rem;
          font-weight: 600;
          letter-spacing: 0.02em;
          border: 1px solid var(--border);
          color: var(--muted);
          background: var(--secondary);
          transition: color 0.2s, border-color 0.2s;
          cursor: default;
        }
        .proj-card:hover .proj-tag {
          color: var(--foreground);
          border-color: var(--foreground);
          opacity: 0.6;
        }

        /* Live link */
        .proj-link {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.5rem 1rem;
          border-radius: 10px;
          border: 1px solid var(--border);
          font-size: 0.78rem;
          font-weight: 600;
          color: var(--foreground);
          background: var(--background);
          transition: background 0.2s, border-color 0.2s, transform 0.2s;
          width: fit-content;
          letter-spacing: 0.01em;
        }
        .proj-link:hover {
          background: var(--primary);
          color: var(--background);
          border-color: var(--primary);
          transform: translateY(-1px);
        }
        .proj-link-arrow {
          transition: transform 0.2s;
          font-size: 0.875rem;
        }
        .proj-link:hover .proj-link-arrow {
          transform: translate(2px, -2px);
        }

        /* ── Responsive ── */
        @media (max-width: 767px) {
          .proj-heading-row { flex-direction: column; align-items: flex-start; }
          .proj-index { font-size: 3.5rem; }
        }
      `}</style>
    </section>
  );
}