"use client";

import { useEffect, useState } from "react";
import Card from "@/components/ui/Card";
import { MapPin, Github, Clock, Zap, ArrowUpRight } from "lucide-react";
import RealGlobe from "@/components/RealGlobe";
import {
  Atom,
  Globe,
  FileCode,
  Wind,
  Server,
  Database,
  GitBranch,
} from "lucide-react";

/* ─────────────────────────────────────────────
   Tech Stack Data
───────────────────────────────────────────── */
export const TECH_STACK = [
  { name: "React", color: "#61DAFB", icon: <Atom className="w-5 h-5" /> },
  { name: "Next.js", color: "#ffffff", icon: <Globe className="w-5 h-5" /> },
  {
    name: "TypeScript",
    color: "#3178C6",
    icon: <FileCode className="w-5 h-5" />,
  },
  { name: "Tailwind", color: "#06B6D4", icon: <Wind className="w-5 h-5" /> },
  { name: "Node.js", color: "#68A063", icon: <Server className="w-5 h-5" /> },
  { name: "MySQL", color: "#4479A1", icon: <Database className="w-5 h-5" /> },
  {
    name: "PostgreSQL",
    color: "#336791",
    icon: <Database className="w-5 h-5" />,
  },
  { name: "Git", color: "#F05032", icon: <GitBranch className="w-5 h-5" /> },
];

/* ─────────────────────────────────────────────
   Live Jakarta Time Hook
───────────────────────────────────────────── */
function useJakartaTime() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const update = () => {
      setTime(
        new Date().toLocaleTimeString("en-US", {
          timeZone: "Asia/Jakarta",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        }),
      );
    };
    update();
    const t = setInterval(update, 1000);
    return () => clearInterval(t);
  }, []);
  return time;
}

/* ─────────────────────────────────────────────
   Tech Pill
───────────────────────────────────────────── */
function TechPill({ tech }: { tech: (typeof TECH_STACK)[0] }) {
  return (
    <div className="ags-pill">
      <span className="ags-pill-icon" style={{ color: tech.color }}>
        {tech.icon}
      </span>
      <span className="ags-pill-label">{tech.name}</span>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Dual-direction Marquee
───────────────────────────────────────────── */
function TechStackMarquee() {
  const row1 = [...TECH_STACK, ...TECH_STACK, ...TECH_STACK];
  const row2 = [...TECH_STACK, ...TECH_STACK, ...TECH_STACK].reverse();
  return (
    <div className="ags-marquee-wrap">
      {/* Row 1 — left → right */}
      <div className="ags-marquee-mask">
        <div className="ags-marquee-track ags-fwd">
          {row1.map((t, i) => (
            <TechPill key={`r1-${i}`} tech={t} />
          ))}
        </div>
      </div>
      {/* Row 2 — right → left */}
      <div className="ags-marquee-mask">
        <div className="ags-marquee-track ags-rev">
          {row2.map((t, i) => (
            <TechPill key={`r2-${i}`} tech={t} />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   useInView
───────────────────────────────────────────── */
function useInView(threshold = 0.1) {
  const [ref, setRef] = useState<HTMLElement | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (!ref) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setInView(true);
      },
      { threshold },
    );
    obs.observe(ref);
    return () => obs.disconnect();
  }, [ref, threshold]);
  return { setRef, inView };
}

/* ─────────────────────────────────────────────
   AtGlanceSection — default export
───────────────────────────────────────────── */
export default function AtGlanceSection() {
  const jakartaTime = useJakartaTime();
  const { setRef: headRef, inView: headIn } = useInView(0.2);

  return (
    <section className="ags-section">
      {/* Dot-grid background */}
      <div className="ags-dotgrid" aria-hidden />

      <div className="container-custom ags-inner">
        {/* ── Editorial Heading ── */}
        <div
          ref={headRef}
          className="ags-heading-wrap"
          style={{
            opacity: headIn ? 1 : 0,
            transform: headIn ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.6s ease, transform 0.6s ease",
          }}
        >
          <p className="ags-eyebrow">/ at a glance</p>
          <div className="ags-heading-row">
            <h2 className="ags-heading">
              Quick
              <br />
              <span className="ags-heading-outline">Overview</span>
            </h2>
            <p className="ags-heading-sub">
              Locations, GitHub activity, and the technologies I use daily in building digital products.
            </p>
          </div>
        </div>

        {/* ── Bento Grid ── */}
        <div className="ags-bento">
          {/* ① Globe / Location — tall left cell */}
          <div className="ags-cell ags-cell-globe">
            <div className="ags-cell-header">
              <span className="ags-cell-label">
                <MapPin className="w-3.5 h-3.5" />
                Location
              </span>
              <span className="ags-cell-badge ags-badge-green">
                <span className="ags-pulse" />
                Available
              </span>
            </div>

            <div className="ags-globe-wrap">
              <RealGlobe />
              <div className="ags-globe-overlay">
                <span className="ags-pulse-dot" />
                Jakarta, Indonesia
              </div>
              <div className="ags-globe-hint">drag to rotate</div>
            </div>

            {/* Live time */}
            <div className="ags-time-row">
              <Clock
                className="w-3.5 h-3.5"
                style={{ color: "var(--muted)" }}
              />
              <span className="ags-time-label">WIB (UTC+7)</span>
              <span className="ags-time-value">{jakartaTime}</span>
            </div>
          </div>

          {/* ② GitHub Contributions */}
          <div className="ags-cell ags-cell-github">
            <div className="ags-cell-header">
              <span className="ags-cell-label">
                <Github className="w-3.5 h-3.5" />
                GitHub Activity
              </span>
              <a
                href="https://github.com/Josua052"
                target="_blank"
                rel="noopener noreferrer"
                className="ags-cell-link"
              >
                View profile
                <ArrowUpRight className="w-3 h-3" />
              </a>
            </div>

            <div className="ags-github-chart">
              <img
                src="https://ghchart.rshah.org/Josua052"
                alt="GitHub contribution chart"
                className="ags-github-img"
              />
            </div>

            <p className="ags-github-sub">
              Contributions across public repositories
            </p>
          </div>

          {/* ③ Status mini-card */}
          <div className="ags-cell ags-cell-status">
            <div className="ags-status-icon">
              <Zap className="w-5 h-5" style={{ color: "#f59e0b" }} />
            </div>
            <p className="ags-status-title">Open to Work</p>
            <p className="ags-status-sub">
              Freelance &amp; full-time opportunities
            </p>
            <div className="ags-status-tags">
              <span className="ags-tag">Frontend</span>
              <span className="ags-tag">Fullstack</span>
            </div>
          </div>

          {/* ④ Tech Stack — full-width bottom */}
          <div className="ags-cell ags-cell-tech">
            <div className="ags-cell-header">
              <span className="ags-cell-label">
                <span>⚡</span>
                Tech Stack
              </span>
              <span className="ags-tech-count">
                {TECH_STACK.length} technologies
              </span>
            </div>
            <TechStackMarquee />
          </div>
        </div>
      </div>

      <style>{`
        /* ── Section ── */
        .ags-section {
          position: relative;
          background: var(--background);
          padding: 5rem 1.5rem 6rem;
          overflow: hidden;
        }

        /* Dot-grid background */
        .ags-dotgrid {
          position: absolute;
          inset: 0;
          background-image: radial-gradient(circle, var(--border) 1px, transparent 1px);
          background-size: 28px 28px;
          opacity: 0.35;
          pointer-events: none;
          mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%);
          -webkit-mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%);
        }

        .ags-inner {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          gap: 3rem;
        }

        /* ── Heading ── */
        .ags-heading-wrap { display: flex; flex-direction: column; gap: 1.25rem; }
        .ags-eyebrow {
          font-size: 0.7rem; font-weight: 700;
          letter-spacing: 0.14em; text-transform: uppercase; color: var(--muted);
        }
        .ags-heading-row {
          display: flex; align-items: flex-end;
          justify-content: space-between; gap: 2rem; flex-wrap: wrap;
        }
        .ags-heading {
          font-family: var(--font-montserrat), Georgia, serif;
          font-size: clamp(2.5rem, 5vw, 4.5rem);
          font-weight: 800; letter-spacing: -0.035em;
          line-height: 0.95; color: var(--foreground); margin: 0;
        }
        .ags-heading-outline {
          -webkit-text-stroke: 1.5px var(--foreground);
          color: transparent;
        }
        .ags-heading-sub {
          max-width: 340px; font-size: 0.875rem;
          line-height: 1.75; color: var(--muted);
        }

        /* ── Bento Grid ── */
        .ags-bento {
          display: grid;
          grid-template-columns: 1.1fr 1fr 0.7fr;
          grid-template-rows: auto auto;
          gap: 1rem;
        }

        /* Cell base */
        .ags-cell {
          background: var(--background);
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 1.25rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          transition: border-color 0.2s;
          position: relative;
          overflow: hidden;
        }
        .ags-cell:hover { border-color: color-mix(in srgb, var(--foreground) 30%, transparent); }

        /* Cell placements */
        .ags-cell-globe  { grid-column: 1; grid-row: 1 / 3; }
        .ags-cell-github { grid-column: 2; grid-row: 1; }
        .ags-cell-status { grid-column: 3; grid-row: 1; }
        .ags-cell-tech   { grid-column: 2 / 4; grid-row: 2; }

        /* ── Cell Header ── */
        .ags-cell-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 0.5rem;
        }
        .ags-cell-label {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: var(--muted);
        }
        .ags-cell-badge {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.62rem;
          font-weight: 700;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          padding: 0.2rem 0.6rem;
          border-radius: 999px;
        }
        .ags-badge-green {
          background: rgba(34,197,94,0.1);
          color: #22c55e;
          border: 1px solid rgba(34,197,94,0.25);
        }
        .ags-cell-link {
          display: flex;
          align-items: center;
          gap: 0.2rem;
          font-size: 0.65rem;
          font-weight: 600;
          color: var(--muted);
          text-decoration: none;
          transition: color 0.2s;
        }
        .ags-cell-link:hover { color: var(--foreground); }

        /* ── Globe ── */
        .ags-globe-wrap {
          position: relative;
          border-radius: 12px;
          overflow: hidden;
          flex: 1;
          min-height: 220px;
        }
        .ags-globe-overlay {
          position: absolute;
          bottom: 10px; left: 10px;
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 5px 10px;
          border-radius: 999px;
          background: rgba(2,6,23,0.75);
          border: 1px solid rgba(255,255,255,0.12);
          color: #e2e8f0;
          font-size: 0.7rem;
          font-weight: 600;
          backdrop-filter: blur(8px);
          pointer-events: none;
        }
        .ags-globe-hint {
          position: absolute;
          top: 10px; right: 10px;
          font-size: 0.6rem;
          color: rgba(255,255,255,0.3);
          letter-spacing: 0.08em;
          pointer-events: none;
        }
        .ags-pulse-dot {
          width: 7px; height: 7px;
          border-radius: 50%;
          background: #22c55e;
          flex-shrink: 0;
          animation: ags-pulse 2s infinite;
        }
        @keyframes ags-pulse {
          0%,100% { box-shadow: 0 0 0 2px rgba(34,197,94,0.4); }
          50%      { box-shadow: 0 0 0 5px rgba(34,197,94,0.1); }
        }
        .ags-pulse {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: #22c55e;
          flex-shrink: 0;
          animation: ags-pulse 2s infinite;
        }

        /* Live time row */
        .ags-time-row {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.6rem 0.75rem;
          border-radius: 10px;
          background: var(--secondary);
          border: 1px solid var(--border);
        }
        .ags-time-label {
          font-size: 0.68rem;
          font-weight: 600;
          color: var(--muted);
          flex: 1;
        }
        .ags-time-value {
          font-size: 0.8rem;
          font-weight: 700;
          font-variant-numeric: tabular-nums;
          color: var(--foreground);
          letter-spacing: 0.04em;
        }

        /* ── GitHub ── */
        .ags-github-chart {
          border-radius: 10px;
          overflow: hidden;
          padding: 0.75rem;
          background: var(--secondary);
          border: 1px solid var(--border);
          flex: 1;
        }
        .ags-github-img {
          width: 100%;
          border-radius: 4px;
          display: block;
        }
        .ags-github-sub {
          font-size: 0.65rem;
          color: var(--muted);
          margin: 0;
        }

        /* ── Status Card ── */
        .ags-cell-status {
          justify-content: center;
          align-items: flex-start;
          background: linear-gradient(135deg, var(--background) 0%, color-mix(in srgb, #f59e0b 4%, var(--background)) 100%);
        }
        .ags-status-icon {
          width: 40px; height: 40px;
          border-radius: 10px;
          background: rgba(245,158,11,0.1);
          border: 1px solid rgba(245,158,11,0.2);
          display: flex; align-items: center; justify-content: center;
        }
        .ags-status-title {
          font-size: 0.95rem;
          font-weight: 700;
          color: var(--foreground);
          margin: 0;
          line-height: 1.2;
        }
        .ags-status-sub {
          font-size: 0.7rem;
          color: var(--muted);
          margin: 0;
          line-height: 1.5;
        }
        .ags-status-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.35rem;
          margin-top: auto;
        }
        .ags-tag {
          font-size: 0.6rem;
          font-weight: 700;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          padding: 0.2rem 0.55rem;
          border-radius: 999px;
          border: 1px solid var(--border);
          color: var(--muted);
          background: var(--background);
        }

        /* ── Tech Stack ── */
        .ags-tech-count {
          font-size: 0.62rem;
          font-weight: 600;
          color: var(--muted);
          opacity: 0.6;
        }
        .ags-marquee-wrap {
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
          overflow: hidden;
        }
        .ags-marquee-mask {
          overflow: hidden;
          mask-image: linear-gradient(to right, transparent, black 8%, black 92%, transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, black 8%, black 92%, transparent);
        }
        .ags-marquee-track {
          display: flex;
          gap: 0.6rem;
          width: max-content;
        }
        .ags-fwd { animation: ags-scroll-fwd 30s linear infinite; }
        .ags-rev { animation: ags-scroll-rev 30s linear infinite; }
        .ags-marquee-mask:hover .ags-fwd,
        .ags-marquee-mask:hover .ags-rev { animation-play-state: paused; }
        @keyframes ags-scroll-fwd {
          from { transform: translateX(0); }
          to   { transform: translateX(-33.333%); }
        }
        @keyframes ags-scroll-rev {
          from { transform: translateX(-33.333%); }
          to   { transform: translateX(0); }
        }

        /* Tech Pill */
        .ags-pill {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.45rem 0.9rem 0.45rem 0.65rem;
          border-radius: 999px;
          border: 1px solid var(--border);
          background: var(--background);
          white-space: nowrap;
          cursor: default;
          user-select: none;
          transition: border-color 0.2s, transform 0.2s, box-shadow 0.2s;
        }
        .ags-pill:hover {
          border-color: var(--foreground);
          transform: translateY(-2px);
          box-shadow: 0 4px 16px rgba(0,0,0,0.1);
        }
        .ags-pill-icon {
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
          transition: transform 0.3s;
        }
        .ags-pill:hover .ags-pill-icon { transform: rotate(10deg) scale(1.1); }
        .ags-pill-label {
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--foreground);
          letter-spacing: 0.01em;
        }

        /* ── Responsive ── */
        @media (max-width: 900px) {
          .ags-bento {
            grid-template-columns: 1fr 1fr;
            grid-template-rows: auto;
          }
          .ags-cell-globe  { grid-column: 1 / 3; grid-row: 1; }
          .ags-cell-github { grid-column: 1; grid-row: 2; }
          .ags-cell-status { grid-column: 2; grid-row: 2; }
          .ags-cell-tech   { grid-column: 1 / 3; grid-row: 3; }
        }
        @media (max-width: 560px) {
          .ags-bento { grid-template-columns: 1fr; }
          .ags-cell-globe  { grid-column: 1; grid-row: 1; }
          .ags-cell-github { grid-column: 1; grid-row: 2; }
          .ags-cell-status { grid-column: 1; grid-row: 3; }
          .ags-cell-tech   { grid-column: 1; grid-row: 4; }
          .ags-heading-row { flex-direction: column; align-items: flex-start; }
        }
      `}</style>
    </section>
  );
}
