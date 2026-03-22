// src/components/awards/AwardsSection.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import AwardCard, { type Award, ISSUER_CONFIG } from "./AwardsCard";
import awardsData from "@/data/awards.json";

const AWARDS = awardsData as Award[];

const ISSUER_ICON: Record<string, string> = Object.fromEntries(
  Object.entries(ISSUER_CONFIG).map(([key, val]) => [key, val.fallback])
);

const ISSUERS = ["All", ...Array.from(new Set(AWARDS.map((a) => a.issuer)))];

function useInView(threshold = 0.1) {
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

export default function AwardsSection() {
  const { ref: headRef, inView: headIn } = useInView(0.3);
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered =
    activeFilter === "All"
      ? AWARDS
      : AWARDS.filter((a) => a.issuer === activeFilter);

  return (
    <section className="awards-section">
      <div className="container-custom">

        {/* ── Heading ── */}
        <div
          ref={headRef}
          className="awards-heading-wrap"
          style={{
            opacity: headIn ? 1 : 0,
            transform: headIn ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.6s ease, transform 0.6s ease",
          }}
        >
          <p className="awards-eyebrow">/ awards & certifications</p>

          <div className="awards-heading-row">
            <h1 className="awards-heading">
              Awards &amp;<br />
              <span className="awards-heading-outline">Certifications</span>
            </h1>
            <p className="awards-heading-sub">
              A collection of certifications, achievements, and continuous
              learning milestones in my journey as a developer.
            </p>
          </div>

          {/* Stats bar */}
          <div className="awards-stats-bar">
            {[
              { value: AWARDS.length.toString(), label: "Total" },
              {
                value: AWARDS.filter(
                  (a) => a.issued?.includes("2026") || a.issued?.includes("2025")
                ).length.toString(),
                label: "Recent",
              },
              {
                value: Array.from(new Set(AWARDS.map((a) => a.issuer)))
                  .length.toString(),
                label: "Issuers",
              },
            ].map((s) => (
              <div key={s.label} className="awards-stat">
                <span className="awards-stat-value">{s.value}</span>
                <span className="awards-stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Filter tabs ── */}
        <div className="awards-filters">
          {ISSUERS.map((issuer) => (
            <button
              key={issuer}
              className={`awards-filter-btn ${
                activeFilter === issuer ? "awards-filter-active" : ""
              }`}
              onClick={() => setActiveFilter(issuer)}
            >
              {issuer === "All" ? "All" : (ISSUER_ICON[issuer] ?? issuer)}
              {issuer !== "All" && (
                <span className="awards-filter-full">{issuer}</span>
              )}
            </button>
          ))}
        </div>

        {/* ── Cards grid ── */}
        <div className="awards-grid">
          {filtered.map((award, i) => (
            <AwardCard
              key={`${award.title}-${i}`}
              award={award}
              delay={(i % 3) * 80}
              index={AWARDS.indexOf(award)}
            />
          ))}
        </div>
      </div>

      <style>{`
        .awards-section {
          background: var(--background);
          color: var(--foreground);
          padding: 5rem 1.5rem 7rem;
        }

        /* Heading */
        .awards-heading-wrap {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          margin-bottom: 3rem;
        }
        .awards-eyebrow {
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--muted);
        }
        .awards-heading-row {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 2rem;
          flex-wrap: wrap;
        }
        .awards-heading {
          font-family: var(--font-montserrat), Georgia, serif;
          font-size: clamp(2.5rem, 5vw, 4.5rem);
          font-weight: 800;
          letter-spacing: -0.035em;
          line-height: 0.95;
          color: var(--foreground);
          margin: 0;
        }
        .awards-heading-outline {
          -webkit-text-stroke: 1.5px var(--foreground);
          color: transparent;
        }
        .awards-heading-sub {
          max-width: 340px;
          font-size: 0.875rem;
          line-height: 1.75;
          color: var(--muted);
        }

        /* Stats bar */
        .awards-stats-bar {
          display: flex;
          width: fit-content;
          border: 1px solid var(--border);
          border-radius: 14px;
          overflow: hidden;
          background: var(--background);
        }
        .awards-stat {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 0.75rem 1.5rem;
          border-right: 1px solid var(--border);
          gap: 0.2rem;
        }
        .awards-stat:last-child { border-right: none; }
        .awards-stat-value {
          font-family: var(--font-montserrat), serif;
          font-size: 1.25rem;
          font-weight: 800;
          letter-spacing: -0.04em;
          color: var(--foreground);
          line-height: 1;
        }
        .awards-stat-label {
          font-size: 0.62rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--muted);
        }

        /* Filter tabs */
        .awards-filters {
          display: flex;
          flex-wrap: wrap;
          gap: 0.4rem;
          margin-bottom: 2.5rem;
        }
        .awards-filter-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          padding: 0.3rem 0.875rem;
          border-radius: 999px;
          border: 1px solid var(--border);
          background: var(--background);
          color: var(--muted);
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.02em;
          cursor: pointer;
          transition: border-color 0.2s, color 0.2s, background 0.2s;
          white-space: nowrap;
        }
        .awards-filter-btn:hover {
          color: var(--foreground);
          border-color: var(--foreground);
        }
        .awards-filter-active {
          background: var(--foreground) !important;
          color: var(--background) !important;
          border-color: var(--foreground) !important;
        }
        /* Show full issuer name on desktop */
        .awards-filter-full { display: none; }
        @media (min-width: 768px) {
          .awards-filter-full { display: inline; }
        }

        /* Cards grid */
        .awards-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 1.25rem;
        }

        @media (max-width: 640px) {
          .awards-heading-row { flex-direction: column; align-items: flex-start; }
          .awards-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
}