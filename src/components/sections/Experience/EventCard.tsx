// src/components/event/EventCard.tsx
"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { EventExperience } from "@/types/event";

/* ── Category config ── */
const CATEGORY_CONFIG: Record<
  EventExperience["category"],
  { label: string; emoji: string; color: string }
> = {
  festival: { label: "Festival", emoji: "🎪", color: "#f59e0b" },
  competition: { label: "Competition", emoji: "🏆", color: "#6366f1" },
  workshop: { label: "Workshop", emoji: "🛠", color: "#06B6D4" },
  "live-event": { label: "Live Event", emoji: "🎤", color: "#22c55e" },
  other: { label: "Event", emoji: "📌", color: "#94a3b8" },
};

function useInView(threshold = 0.12) {
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

export default function EventCard({
  item,
  delay = 0,
}: {
  item: EventExperience;
  delay?: number;
}) {
  const { ref, inView } = useInView();
  const [expanded, setExpanded] = useState(false);
  const PREVIEW = 2;
  const cat = CATEGORY_CONFIG[item.category] ?? CATEGORY_CONFIG["other"];

  return (
    <div
      ref={ref}
      className="ec-outer"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView
          ? "translateY(0) scale(1)"
          : "translateY(24px) scale(0.97)",
        transition: `opacity 0.6s ${delay}ms ease, transform 0.6s ${delay}ms ease`,
      }}
    >
      <div
        className={`ec-card ${item.highlight ? "ec-card-highlight" : ""}`}
        style={{ "--cat-color": cat.color } as React.CSSProperties}
      >
        {/* Accent top bar */}
        <div className="ec-accent-bar" />

        {/* Optional event image */}
        {item.image && (
          <div className="ec-img-wrap">
            <Image
              src={item.image}
              alt={item.title}
              fill
              className="ec-img"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="ec-img-overlay" />
            {/* Category badge over image */}
            <span className="ec-cat-badge-img">
              {cat.emoji} {cat.label}
            </span>
          </div>
        )}

        {/* Card body */}
        <div className="ec-body">
          {/* Top row */}
          <div className="ec-top-row">
            <div className="ec-left">
              {/* Category (no image fallback) */}
              {!item.image && (
                <span className="ec-cat-badge">
                  {cat.emoji} {cat.label}
                </span>
              )}

              {item.highlight && (
                <span className="ec-highlight-badge">Featured</span>
              )}
            </div>

            <div className="ec-right-meta">
              <span className="ec-period">{item.period}</span>
              {item.location && (
                <span className="ec-location">📍 {item.location}</span>
              )}
            </div>
          </div>

          {/* Title + org */}
          <div className="ec-title-wrap">
            <h3 className="ec-title">{item.title}</h3>
            <p className="ec-org">{item.organization}</p>
          </div>

          {/* Role pill */}
          <div className="ec-role-wrap">
            <span
              className="ec-role"
              style={{
                background: `${cat.color}15`,
                borderColor: `${cat.color}35`,
                color: cat.color,
              }}
            >
              {item.role}
            </span>
          </div>

          {/* Divider */}
          <div className="ec-divider" />

          {/* Points */}
          <ul className="ec-points">
            {(expanded ? item.points : item.points.slice(0, PREVIEW)).map(
              (pt, i) => (
                <li key={i} className="ec-point">
                  <span className="ec-point-icon" aria-hidden>
                    →
                  </span>
                  <span>{pt}</span>
                </li>
              ),
            )}
          </ul>

          {item.points.length > PREVIEW && (
            <button
              className="ec-expand-btn"
              onClick={() => setExpanded((p) => !p)}
            >
              {expanded
                ? "Show less ↑"
                : `+${item.points.length - PREVIEW} more`}
            </button>
          )}

          {/* Tags */}
          <div className="ec-tags">
            {item.tags.map((tag) => (
              <span key={tag} className="ec-tag">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .ec-outer { position: relative; }

        /* Card */
        .ec-card {
          position: relative;
          background: var(--background);
          border: 1px solid var(--border);
          border-radius: 1.25rem;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          transition: border-color 0.3s, box-shadow 0.3s, transform 0.3s;
        }
        .ec-card:hover {
          border-color: var(--cat-color, var(--foreground));
          box-shadow:
            0 0 0 1px var(--cat-color, var(--foreground)),
            0 12px 40px rgba(0,0,0,0.08);
          transform: translateY(-4px);
        }

        /* Highlight variant */
        .ec-card-highlight {
          background: var(--secondary);
        }
        .ec-card-highlight::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(
            135deg,
            color-mix(in srgb, var(--cat-color) 8%, transparent) 0%,
            transparent 60%
          );
          pointer-events: none;
          z-index: 0;
        }

        /* Accent top bar */
        .ec-accent-bar {
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2.5px;
          background: var(--cat-color, var(--border));
          opacity: 0;
          transition: opacity 0.3s;
          z-index: 2;
        }
        .ec-card:hover .ec-accent-bar { opacity: 1; }

        /* Event image */
        .ec-img-wrap {
          position: relative;
          width: 100%;
          height: 180px;
          flex-shrink: 0;
        }
        .ec-img {
          object-fit: cover;
          transition: transform 0.6s ease;
        }
        .ec-card:hover .ec-img { transform: scale(1.04); }
        .ec-img-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 60%);
        }
        .ec-cat-badge-img {
          position: absolute;
          bottom: 0.75rem;
          left: 0.875rem;
          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          padding: 0.22rem 0.65rem;
          border-radius: 999px;
          background: rgba(0,0,0,0.55);
          color: rgba(255,255,255,0.9);
          border: 1px solid rgba(255,255,255,0.15);
          backdrop-filter: blur(6px);
          z-index: 1;
        }

        /* Card body */
        .ec-body {
          position: relative;
          z-index: 1;
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          flex: 1;
        }

        /* Top row */
        .ec-top-row {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 0.5rem;
        }
        .ec-left {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          flex-wrap: wrap;
        }
        .ec-right-meta {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 0.2rem;
        }

        /* Category badge (no image) */
        .ec-cat-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.3rem;
          padding: 0.22rem 0.65rem;
          border-radius: 999px;
          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          border: 1px solid var(--border);
          color: var(--muted);
          background: var(--secondary);
        }

        /* Highlight badge */
        .ec-highlight-badge {
          display: inline-flex;
          padding: 0.2rem 0.55rem;
          border-radius: 999px;
          font-size: 0.6rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          background: rgba(245,158,11,0.12);
          color: #f59e0b;
          border: 1px solid rgba(245,158,11,0.25);
        }

        .ec-period {
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.06em;
          color: var(--muted);
          text-transform: uppercase;
        }
        .ec-location {
          font-size: 0.68rem;
          color: var(--muted);
          opacity: 0.7;
        }

        /* Title */
        .ec-title-wrap { display: flex; flex-direction: column; gap: 0.2rem; }
        .ec-title {
          font-family: var(--font-montserrat), Georgia, serif;
          font-size: clamp(1rem, 2vw, 1.2rem);
          font-weight: 800;
          letter-spacing: -0.025em;
          color: var(--foreground);
          margin: 0;
          line-height: 1.25;
        }
        .ec-org {
          font-size: 0.8rem;
          color: var(--muted);
          margin: 0;
        }

        /* Role pill */
        .ec-role-wrap { display: flex; }
        .ec-role {
          display: inline-flex;
          padding: 0.28rem 0.75rem;
          border-radius: 8px;
          border: 1px solid;
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.01em;
        }

        /* Divider */
        .ec-divider {
          height: 1px;
          background: var(--border);
        }

        /* Points */
        .ec-points {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .ec-point {
          display: flex;
          gap: 0.6rem;
          align-items: baseline;
        }
        .ec-point-icon {
          font-size: 0.65rem;
          color: var(--muted);
          flex-shrink: 0;
          transition: color 0.2s;
        }
        .ec-card:hover .ec-point-icon {
          color: var(--cat-color, var(--foreground));
        }
        .ec-point span:last-child {
          font-size: 0.85rem;
          line-height: 1.75;
          color: var(--muted);
        }

        /* Expand */
        .ec-expand-btn {
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
        .ec-expand-btn:hover { color: var(--foreground); }

        /* Tags */
        .ec-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.4rem;
          margin-top: auto;
        }
        .ec-tag {
          display: inline-flex;
          padding: 0.2rem 0.65rem;
          border-radius: 6px;
          font-size: 0.68rem;
          font-weight: 600;
          border: 1px solid var(--border);
          color: var(--muted);
          background: var(--secondary);
          transition: color 0.2s, border-color 0.2s;
          cursor: default;
        }
        .ec-card:hover .ec-tag {
          color: var(--foreground);
          border-color: var(--cat-color, var(--foreground));
          opacity: 0.65;
        }
      `}</style>
    </div>
  );
}
