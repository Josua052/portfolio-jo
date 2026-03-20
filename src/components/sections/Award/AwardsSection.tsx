"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";

/* ─────────────────────────────────────────────
   Types & Data
───────────────────────────────────────────── */
type Award = {
  title: string;
  issuer: string;
  issued?: string;
  expires?: string;
  skills?: string[];
  credentialUrl?: string;
};

const AWARDS: Award[] = [
  {
    title: "Frontend Developer (React)",
    issuer: "HackerRank",
    issued: "Feb 2026",
    skills: ["React.js"],
  },
  {
    title: "Belajar Dasar AI",
    issuer: "Dicoding Indonesia",
    issued: "Jan 2026",
    expires: "Jan 2029",
  },
  {
    title: "Financial Literacy",
    issuer: "Dicoding Indonesia",
    issued: "Nov 2025",
    expires: "Nov 2028",
  },
  {
    title: "Memulai Pemrograman dengan Python",
    issuer: "Dicoding Indonesia",
    issued: "Nov 2023",
    expires: "Nov 2026",
  },
  {
    title: "Belajar Visualisasi Data",
    issuer: "Dicoding Indonesia",
    issued: "Sep 2023",
    expires: "Sep 2026",
  },
  {
    title: "Dicoding Developer Coaching",
    issuer: "Dicoding Indonesia",
  },
  {
    title: "Web Development",
    issuer: "Infinite Learning Indonesia",
    skills: ["Web Development", "React.js"],
  },
  {
    title: "Video Editor Certificate",
    issuer: "Infinite Learning Indonesia",
    skills: ["Video Editing", "Video Production"],
  },
  {
    title: "Kickstart Your Front End Developer Career with React JS",
    issuer: "Edspert.id",
  },
  {
    title: "National Integrated Science Olympic",
    issuer: "Universitas Gadjah Mada",
    skills: ["Mathematics"],
  },
];

/* Issuer → color accent mapping */
const ISSUER_COLOR: Record<string, string> = {
  "HackerRank":               "#22c55e",
  "Dicoding Indonesia":       "#6366f1",
  "Infinite Learning Indonesia": "#06B6D4",
  "Edspert.id":               "#f59e0b",
  "Universitas Gadjah Mada":  "#3b82f6",
};

/* Issuer → short icon label */
const ISSUER_ICON: Record<string, string> = {
  "HackerRank":               "HR",
  "Dicoding Indonesia":       "DC",
  "Infinite Learning Indonesia": "IL",
  "Edspert.id":               "ED",
  "Universitas Gadjah Mada":  "UGM",
};

/* ─────────────────────────────────────────────
   Intersection hook
───────────────────────────────────────────── */
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

/* ─────────────────────────────────────────────
   Award Card
───────────────────────────────────────────── */
function AwardCard({ award, delay, index }: { award: Award; delay: number; index: number }) {
  const { ref, inView } = useInView();
  const color = ISSUER_COLOR[award.issuer] ?? "#94a3b8";
  const icon  = ISSUER_ICON[award.issuer]  ?? "–";
  const isNew = award.issued && (
    award.issued.includes("2026") || award.issued.includes("2025")
  );

  return (
    <div
      ref={ref}
      className="award-card-outer"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0) scale(1)" : "translateY(28px) scale(0.97)",
        transition: `opacity 0.55s ${delay}ms ease, transform 0.55s ${delay}ms ease`,
      }}
    >
      {/* Index watermark */}
      <span className="award-watermark" aria-hidden>
        {String(index + 1).padStart(2, "0")}
      </span>

      <div className="award-card" style={{ "--accent": color } as React.CSSProperties}>
        {/* Accent top bar */}
        <div className="award-accent-bar" />

        {/* Header: icon badge + new tag */}
        <div className="award-header">
          <div className="award-issuer-badge" style={{ background: `${color}18`, borderColor: `${color}30`, color }}>
            {icon}
          </div>
          {isNew && (
            <span className="award-new-tag">New</span>
          )}
          {award.credentialUrl && (
            <a href={award.credentialUrl} target="_blank" rel="noopener noreferrer" className="award-external">
              <ArrowUpRight size={13} />
            </a>
          )}
        </div>

        {/* Title */}
        <h3 className="award-title">{award.title}</h3>

        {/* Issuer */}
        <p className="award-issuer">{award.issuer}</p>

        {/* Dates */}
        {(award.issued || award.expires) && (
          <div className="award-dates">
            {award.issued  && <span>Issued {award.issued}</span>}
            {award.issued && award.expires && <span className="award-dates-sep">·</span>}
            {award.expires && <span>Exp. {award.expires}</span>}
          </div>
        )}

        {/* Skills */}
        {award.skills && award.skills.length > 0 && (
          <div className="award-skills">
            {award.skills.map((s) => (
              <span key={s} className="award-skill-tag">{s}</span>
            ))}
          </div>
        )}

        {/* Bottom credential row */}
        <div className="award-footer">
          <span className="award-footer-label">
            {award.credentialUrl ? "View credential" : "Certificate"}
          </span>
          <ArrowUpRight size={13} className="award-footer-arrow" />
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Section
───────────────────────────────────────────── */

// Group awards by issuer for the filter tabs
const ISSUERS = ["All", ...Array.from(new Set(AWARDS.map((a) => a.issuer)))];

export default function AwardsSection() {
  const { ref: headRef, inView: headIn } = useInView(0.3);
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered = activeFilter === "All"
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

          {/* Stats */}
          <div className="awards-stats-bar">
            {[
              { value: AWARDS.length.toString(),                                            label: "Total" },
              { value: AWARDS.filter(a => a.issued?.includes("2026") || a.issued?.includes("2025")).length.toString(), label: "Recent" },
              { value: Array.from(new Set(AWARDS.map(a => a.issuer))).length.toString(),   label: "Issuers" },
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
              className={`awards-filter-btn ${activeFilter === issuer ? "awards-filter-active" : ""}`}
              onClick={() => setActiveFilter(issuer)}
            >
              {issuer === "All" ? issuer : (ISSUER_ICON[issuer] ?? issuer)}
              {issuer !== "All" && (
                <span className="awards-filter-full">{issuer}</span>
              )}
            </button>
          ))}
        </div>

        {/* ── Grid ── */}
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
        /* ── Section ── */
        .awards-section {
          background: var(--background);
          color: var(--foreground);
          padding: 5rem 1.5rem 7rem;
        }

        /* ── Heading ── */
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
          gap: 0;
          border: 1px solid var(--border);
          border-radius: 14px;
          overflow: hidden;
          width: fit-content;
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

        /* ── Filter tabs ── */
        .awards-filters {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-bottom: 2.5rem;
        }
        .awards-filter-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.35rem 0.9rem;
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
          max-width: 140px;
          overflow: hidden;
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
        .awards-filter-full {
          display: none;
        }

        /* ── Grid ── */
        .awards-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 1.25rem;
        }

        /* ── Card outer ── */
        .award-card-outer {
          position: relative;
        }
        .award-watermark {
          position: absolute;
          top: -0.75rem;
          right: 0.75rem;
          font-family: var(--font-montserrat), serif;
          font-size: 3.5rem;
          font-weight: 900;
          letter-spacing: -0.05em;
          line-height: 1;
          color: var(--border);
          pointer-events: none;
          user-select: none;
          z-index: 0;
          opacity: 0.4;
        }

        /* ── Card ── */
        .award-card {
          position: relative;
          z-index: 1;
          background: var(--background);
          border: 1px solid var(--border);
          border-radius: 1.25rem;
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          overflow: hidden;
          transition: border-color 0.3s, box-shadow 0.3s, transform 0.3s;
          height: 100%;
        }
        .award-card:hover {
          border-color: var(--accent, var(--foreground));
          box-shadow: 0 0 0 1px var(--accent, var(--foreground)),
                      0 8px 32px rgba(0,0,0,0.08);
          transform: translateY(-3px);
        }

        /* Accent top bar */
        .award-accent-bar {
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: var(--accent, var(--border));
          opacity: 0;
          transition: opacity 0.3s;
          border-radius: 1.25rem 1.25rem 0 0;
        }
        .award-card:hover .award-accent-bar {
          opacity: 1;
        }

        /* Header */
        .award-header {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .award-issuer-badge {
          width: 36px;
          height: 36px;
          border-radius: 10px;
          border: 1px solid;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--font-montserrat), serif;
          font-size: 0.6rem;
          font-weight: 800;
          letter-spacing: 0.04em;
          flex-shrink: 0;
        }
        .award-new-tag {
          margin-left: auto;
          padding: 0.15rem 0.55rem;
          border-radius: 999px;
          font-size: 0.6rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          background: rgba(34,197,94,0.12);
          color: #22c55e;
          border: 1px solid rgba(34,197,94,0.25);
        }
        .award-external {
          margin-left: auto;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 28px;
          height: 28px;
          border-radius: 8px;
          border: 1px solid var(--border);
          color: var(--muted);
          transition: color 0.2s, border-color 0.2s, background 0.2s;
        }
        .award-external:hover {
          color: var(--foreground);
          border-color: var(--foreground);
          background: var(--hover);
        }

        /* Title */
        .award-title {
          font-family: var(--font-montserrat), Georgia, serif;
          font-size: 0.95rem;
          font-weight: 700;
          letter-spacing: -0.015em;
          color: var(--foreground);
          margin: 0;
          line-height: 1.35;
        }

        /* Issuer */
        .award-issuer {
          font-size: 0.78rem;
          font-weight: 500;
          color: var(--muted);
          margin: 0;
        }

        /* Dates */
        .award-dates {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          flex-wrap: wrap;
          font-size: 0.7rem;
          font-weight: 600;
          letter-spacing: 0.03em;
          color: var(--muted);
          opacity: 0.75;
        }
        .award-dates-sep { opacity: 0.4; }

        /* Skills */
        .award-skills {
          display: flex;
          flex-wrap: wrap;
          gap: 0.35rem;
        }
        .award-skill-tag {
          display: inline-flex;
          padding: 0.18rem 0.6rem;
          border-radius: 6px;
          font-size: 0.68rem;
          font-weight: 600;
          border: 1px solid var(--border);
          color: var(--muted);
          background: var(--secondary);
          transition: color 0.2s, border-color 0.2s;
        }
        .award-card:hover .award-skill-tag {
          color: var(--foreground);
          border-color: var(--accent, var(--foreground));
          opacity: 0.7;
        }

        /* Footer */
        .award-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: auto;
          padding-top: 0.75rem;
          border-top: 1px solid var(--border);
        }
        .award-footer-label {
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.04em;
          color: var(--muted);
          transition: color 0.2s;
        }
        .award-card:hover .award-footer-label {
          color: var(--foreground);
        }
        .award-footer-arrow {
          color: var(--muted);
          opacity: 0;
          transform: translate(-4px, 4px);
          transition: opacity 0.2s, transform 0.2s, color 0.2s;
        }
        .award-card:hover .award-footer-arrow {
          opacity: 1;
          transform: translate(0, 0);
          color: var(--foreground);
        }

        /* ── Responsive ── */
        @media (max-width: 640px) {
          .awards-heading-row { flex-direction: column; align-items: flex-start; }
          .awards-grid { grid-template-columns: 1fr; }
          .award-watermark { font-size: 2.5rem; }
        }
      `}</style>
    </section>
  );
}