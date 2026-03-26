// src/components/about/HobbyCard.tsx
"use client";

import { useEffect, useRef, useState } from "react";

export type HobbyHighlight = {
  icon: string;
  text: string;
};

export type HobbyData = {
  id: string;
  label: string;
  emoji: string;
  tagline: string;
  color: string;
  description: string;
  highlights: HobbyHighlight[];
  stat: { value: string; label: string };
};

function useInView(threshold = 0.1) {
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

export default function HobbyCard({
  hobby,
  delay = 0,
}: {
  hobby: HobbyData;
  delay?: number;
}) {
  const { ref, inView } = useInView();

  return (
    <div
      ref={ref}
      className="hc-outer"
      style={
        {
          opacity: inView ? 1 : 0,
          transform: inView
            ? "translateY(0) scale(1)"
            : "translateY(20px) scale(0.97)",
          transition: `opacity 0.55s ${delay}ms ease, transform 0.55s ${delay}ms ease`,
          "--hc": hobby.color,
        } as React.CSSProperties
      }
    >
      <div className="hc-card">
        {/* Accent top bar */}
        <div className="hc-bar" style={{ background: hobby.color }} />

        {/* Noise texture overlay */}
        <div className="hc-noise" aria-hidden />

        {/* Big decorative emoji — background */}
        <div className="hc-deco" aria-hidden>
          {hobby.emoji}
        </div>

        {/* Content */}
        <div className="hc-content">
          {/* Header */}
          <div className="hc-header">
            <div
              className="hc-icon-wrap"
              style={{
                background: `${hobby.color}18`,
                borderColor: `${hobby.color}30`,
              }}
            >
              <span className="hc-icon-emoji">{hobby.emoji}</span>
            </div>

            <div className="hc-header-text">
              <h3 className="hc-title">{hobby.label}</h3>
              <p className="hc-tagline" style={{ color: hobby.color }}>
                {hobby.tagline}
              </p>
            </div>

            {/* Stat pill */}
            <div
              className="hc-stat-pill"
              style={{
                borderColor: `${hobby.color}30`,
                background: `${hobby.color}10`,
              }}
            >
              <span className="hc-stat-value" style={{ color: hobby.color }}>
                {hobby.stat.value}
              </span>
              <span className="hc-stat-label">{hobby.stat.label}</span>
            </div>
          </div>

          {/* Divider */}
          <div className="hc-divider" />

          {/* Highlights grid */}
          <div className="hc-highlights">
            {hobby.highlights.map((h, i) => (
              <div
                key={i}
                className="hc-highlight"
                style={{ animationDelay: `${delay + i * 50}ms` }}
              >
                <span className="hc-hi-icon">{h.icon}</span>
                <span className="hc-hi-text">{h.text}</span>
              </div>
            ))}
          </div>

          {/* Description */}
          <p className="hc-desc">{hobby.description}</p>
        </div>
      </div>

      <style>{`
        .hc-outer { position: relative; }

        .hc-card {
          position: relative;
          border: 1px solid var(--border);
          border-radius: 1.5rem;
          overflow: hidden;
          background: var(--background);
          display: flex;
          flex-direction: column;
          transition: border-color 0.3s, box-shadow 0.3s, transform 0.3s;
          height: 100%;
        }
        .hc-card:hover {
          border-color: var(--hc, var(--foreground));
          box-shadow: 0 0 0 1px var(--hc, var(--foreground)),
                      0 16px 48px rgba(0,0,0,0.1);
          transform: translateY(-5px);
        }

        /* Top accent */
        .hc-bar {
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 3px;
          opacity: 0;
          transition: opacity 0.3s;
          z-index: 2;
        }
        .hc-card:hover .hc-bar { opacity: 1; }

        /* Noise */
        .hc-noise {
          position: absolute;
          inset: 0;
          opacity: 0.02;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          pointer-events: none;
          z-index: 0;
        }

        /* Big bg emoji */
        .hc-deco {
          position: absolute;
          bottom: -0.5rem;
          right: 0.5rem;
          font-size: 7rem;
          line-height: 1;
          opacity: 0.05;
          pointer-events: none;
          user-select: none;
          z-index: 0;
          transition: opacity 0.3s, transform 0.4s;
        }
        .hc-card:hover .hc-deco {
          opacity: 0.09;
          transform: scale(1.1) rotate(6deg);
        }

        /* Content */
        .hc-content {
          position: relative;
          z-index: 1;
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 1.125rem;
          flex: 1;
        }

        /* Header */
        .hc-header {
          display: flex;
          align-items: flex-start;
          gap: 0.875rem;
          flex-wrap: wrap;
        }
        .hc-icon-wrap {
          width: 48px;
          height: 48px;
          border-radius: 14px;
          border: 1px solid;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .hc-icon-emoji { font-size: 1.5rem; line-height: 1; }
        .hc-header-text { flex: 1; min-width: 0; }
        .hc-title {
          font-family: var(--font-montserrat), serif;
          font-size: 1.05rem;
          font-weight: 800;
          letter-spacing: -0.02em;
          color: var(--foreground);
          margin: 0 0 0.2rem;
          line-height: 1.2;
        }
        .hc-tagline {
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.04em;
          margin: 0;
        }

        /* Stat pill */
        .hc-stat-pill {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 0.4rem 0.75rem;
          border-radius: 10px;
          border: 1px solid;
          flex-shrink: 0;
          gap: 0.05rem;
        }
        .hc-stat-value {
          font-family: var(--font-montserrat), serif;
          font-size: 1rem;
          font-weight: 800;
          letter-spacing: -0.03em;
          line-height: 1;
        }
        .hc-stat-label {
          font-size: 0.55rem;
          font-weight: 700;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: var(--muted);
          text-align: center;
          line-height: 1.3;
        }

        /* Divider */
        .hc-divider { height: 1px; background: var(--border); }

        /* Highlights */
        .hc-highlights {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.5rem;
        }
        .hc-highlight {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 0.625rem;
          border-radius: 9px;
          border: 1px solid var(--border);
          background: var(--secondary);
          animation: hc-hi-in 0.4s ease both;
          transition: border-color 0.2s, background 0.2s;
        }
        @keyframes hc-hi-in {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .hc-card:hover .hc-highlight {
          border-color: color-mix(in srgb, var(--hc) 25%, var(--border));
        }
        .hc-hi-icon { font-size: 0.95rem; line-height: 1; flex-shrink: 0; }
        .hc-hi-text {
          font-size: 0.72rem;
          font-weight: 600;
          color: var(--muted);
          line-height: 1.35;
          transition: color 0.2s;
        }
        .hc-card:hover .hc-hi-text { color: var(--foreground); }

        /* Description */
        .hc-desc {
          font-size: 0.82rem;
          line-height: 1.75;
          color: var(--muted);
          margin: 0;
        }
        @media (max-width: 480px) {
          .hc-header {
            flex-direction: column;
            align-items: stretch;
            gap: 0.75rem;
          }
          .hc-header > .hc-icon-wrap {
            align-self: flex-start;
          }
          .hc-stat-pill {
            flex-direction: row;
            align-self: flex-start;
            gap: 0.4rem;
          }
        }
        @media (max-width: 400px) {
          .hc-highlights {
            grid-template-columns: 1fr; /* 1 kolom di ponsel kecil */
          }
        }
        @media (max-width: 480px) {
          .hc-content {
            padding: 1rem;
            gap: 0.875rem;
          }
        }
        @media (max-width: 480px) {
          .hc-icon-wrap {
            width: 40px;
            height: 40px;
            border-radius: 11px;
          }
          .hc-icon-emoji { font-size: 1.25rem; }
        }
        @media (max-width: 480px) {
          .hc-deco {
              font-size: 4.5rem;
              bottom: -0.25rem;
              right: 0.25rem;
            }
          }
          @media (max-width: 480px) {
            .hc-stat-pill {
              flex-direction: row;
              gap: 0.35rem;
              padding: 0.35rem 0.6rem;
            }
          }
          @media (max-width: 480px) {
            .hc-title { font-size: 0.95rem; }
            .hc-desc { font-size: 0.78rem; line-height: 1.65; }
          }
          `}</style>
    </div>
  );
}
