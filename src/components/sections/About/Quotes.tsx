// src/components/about/AboutQuotes.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import quotesData from "@/data/quotes.json";

/* ─────────────────────────────────────────────
   Types
───────────────────────────────────────────── */
type Quote = {
  id: string;
  quote: string;
  source: string;
  category: "mindset" | "work" | "growth" | string;
  highlight?: boolean;
};

const QUOTES = quotesData as Quote[];

const CAT: Record<string, { label: string; color: string; icon: string }> = {
  mindset: { label: "Mindset",    color: "#6366f1", icon: "🧠" },
  work:    { label: "Kerja",      color: "#f59e0b", icon: "⚡" },
  growth:  { label: "Tumbuh",     color: "#22c55e", icon: "🌱" },
};
const getCat = (c: string) => CAT[c] ?? { label: c, color: "#94a3b8", icon: "✦" };

/* ─────────────────────────────────────────────
   useInView
───────────────────────────────────────────── */
function useInView<T extends HTMLElement = HTMLDivElement>(threshold = 0.12) {
  const ref = useRef<T>(null);
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
   Subtle background canvas — drifting
   thin lines like journal ruled paper
───────────────────────────────────────────── */
function PaperCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current!;
    const ctx = c.getContext("2d")!;
    let raf = 0;
    let t = 0;

    const resize = () => { c.width = c.offsetWidth; c.height = c.offsetHeight; };
    resize();
    window.addEventListener("resize", resize);

    // Horizontal lines drifting slowly upward
    const lines = Array.from({ length: 14 }, (_, i) => ({
      y: (i / 14) * 1.2,     // 0..1.2 (normalized)
      speed: 0.00015 + Math.random() * 0.0001,
      alpha: 0.04 + Math.random() * 0.05,
      width: 0.5 + Math.random() * 0.5,
    }));

    // Scattered dots
    const dots = Array.from({ length: 20 }, () => ({
      x: Math.random(), y: Math.random(),
      r: 0.8 + Math.random() * 1.4,
      alpha: 0.03 + Math.random() * 0.05,
    }));

    const draw = () => {
      const W = c.offsetWidth, H = c.offsetHeight;
      c.width = W;
      ctx.clearRect(0, 0, W, H);
      t++;

      lines.forEach((l) => {
        l.y -= l.speed;
        if (l.y < -0.02) l.y = 1.08;
        const y = l.y * H;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(W, y);
        ctx.strokeStyle = `rgba(var(--line-rgb, 15,23,42), ${l.alpha})`;
        ctx.lineWidth = l.width;
        ctx.stroke();
      });

      dots.forEach((d) => {
        ctx.beginPath();
        ctx.arc(d.x * W, d.y * H, d.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(var(--line-rgb, 15,23,42), ${d.alpha})`;
        ctx.fill();
      });

      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden
      style={{
        position: "absolute", inset: 0,
        width: "100%", height: "100%",
        display: "block", pointerEvents: "none",
      }}
    />
  );
}

/* ─────────────────────────────────────────────
   Progress bar auto-cycle indicator
───────────────────────────────────────────── */
function ProgressBar({ color, running }: { color: string; running: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transition = "none";
    el.style.width = "0%";
    if (running) {
      requestAnimationFrame(() => {
        el.style.transition = "width 8s linear";
        el.style.width = "100%";
      });
    }
  }, [running, color]);

  return (
    <div className="pb-track">
      <div ref={ref} className="pb-fill" style={{ background: color }} />
      <style>{`
        .pb-track {
          height: 2px;
          background: var(--border);
          border-radius: 2px;
          overflow: hidden;
          width: 100%;
        }
        .pb-fill {
          height: 100%;
          width: 0%;
          border-radius: 2px;
        }
      `}</style>
    </div>
  );
}

/* ─────────────────────────────────────────────
   AboutQuotes — default export
───────────────────────────────────────────── */
export default function AboutQuotes() {
  const { ref: headRef, inView: headIn } = useInView(0.15);

  const initialIdx = QUOTES.findIndex((q) => q.highlight);
  const [activeIdx, setActiveIdx] = useState(initialIdx !== -1 ? initialIdx : 0);
  const [displayIdx, setDisplayIdx] = useState(activeIdx);
  const [phase, setPhase] = useState<"in" | "out">("in");
  const [cycleKey, setCycleKey] = useState(0); // resets progress bar

  // Smooth transition when active changes
  useEffect(() => {
    if (activeIdx === displayIdx) return;
    setPhase("out");
    const t = setTimeout(() => { setDisplayIdx(activeIdx); setPhase("in"); }, 280);
    return () => clearTimeout(t);
  }, [activeIdx]); // eslint-disable-line react-hooks/exhaustive-deps

  // Auto-cycle every 8s
  useEffect(() => {
    const t = setInterval(() => {
      setActiveIdx((p) => (p + 1) % QUOTES.length);
      setCycleKey((k) => k + 1);
    }, 8000);
    return () => clearInterval(t);
  }, []);

  const handleSelect = (i: number) => {
    setActiveIdx(i);
    setCycleKey((k) => k + 1);
  };

  const active   = QUOTES[activeIdx];
  const display  = QUOTES[displayIdx];
  const cat      = getCat(display.category);

  return (
    <section className="aq-section">

      {/* Subtle ruled-paper background */}
      <div className="aq-bg">
        <PaperCanvas />
        {/* Gradient veils: top, bottom, sides */}
        <div className="aq-veil aq-veil-tb" />
        <div className="aq-veil aq-veil-lr" />
      </div>

      <div className="container-custom aq-inner">

        {/* ── Section heading ── */}
        <div
          ref={headRef}
          className="aq-head"
          style={{
            opacity: headIn ? 1 : 0,
            transform: headIn ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.6s ease, transform 0.6s ease",
          }}
        >
          <p className="aq-eyebrow">/ words i live by</p>
          <div className="aq-head-row">
            <h2 className="aq-title">
              Life<br />
              <span className="aq-title-outline">Philosophy</span>
            </h2>
            <p className="aq-subtitle">
              Words that shape the way I think, work, and live every day.
            </p>
          </div>
        </div>

        {/* ── Main body ── */}
        <div className="aq-body">

          {/* LEFT — large featured quote */}
          <div className="aq-left">

            {/* Big decorative quote mark — restrained, not garish */}
            <div className="aq-bigmark" aria-hidden>&ldquo;</div>

            <div
              className="aq-quote-wrap"
              style={{
                opacity: phase === "in" ? 1 : 0,
                transform: phase === "in" ? "translateY(0)" : "translateY(10px)",
                transition: "opacity 0.28s ease, transform 0.28s ease",
              }}
            >
              {/* Category badge */}
              <span
                className="aq-badge"
                style={{
                  color: cat.color,
                  background: `${cat.color}10`,
                  borderColor: `${cat.color}30`,
                }}
              >
                {cat.icon} {cat.label}
              </span>

              {/* Quote */}
              <blockquote className="aq-quote">
                {display.quote}
              </blockquote>

              {/* Source */}
              <div className="aq-source-row">
                <div className="aq-source-dash" style={{ background: cat.color }} />
                <span className="aq-source-text">{display.source}</span>
              </div>
            </div>

            {/* Auto-cycle progress + dot indicators */}
            <div className="aq-controls">
              <ProgressBar key={cycleKey} color={getCat(active.category).color} running={true} />

              <div className="aq-dots-row">
                <span className="aq-counter">
                  <b>{activeIdx + 1}</b>/{QUOTES.length}
                </span>

                <div className="aq-dots">
                  {QUOTES.map((q, i) => (
                    <button
                      key={q.id}
                      className={`aq-dot ${i === activeIdx ? "aq-dot-on" : ""}`}
                      onClick={() => handleSelect(i)}
                      aria-label={`Quote ${i + 1}`}
                      style={i === activeIdx ? {
                        background: getCat(q.category).color,
                        width: "20px",
                      } : {}}
                    />
                  ))}
                </div>

                {/* Prev / Next */}
                <div className="aq-arrows">
                  <button
                    className="aq-arrow"
                    onClick={() => handleSelect((activeIdx - 1 + QUOTES.length) % QUOTES.length)}
                    aria-label="Previous"
                  >←</button>
                  <button
                    className="aq-arrow"
                    onClick={() => handleSelect((activeIdx + 1) % QUOTES.length)}
                    aria-label="Next"
                  >→</button>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT — stacked quote list */}
          <div className="aq-right">
            <p className="aq-list-label">Semua Pegangan</p>
            <div className="aq-list">
              {QUOTES.map((q, i) => {
                const c = getCat(q.category);
                const isActive = i === activeIdx;
                return (
                  <button
                    key={q.id}
                    className={`aq-item ${isActive ? "aq-item-on" : ""}`}
                    onClick={() => handleSelect(i)}
                    style={{
                      "--ic": c.color,
                      animationDelay: `${i * 55}ms`,
                    } as React.CSSProperties}
                  >
                    {/* Left accent */}
                    <div
                      className="aq-item-accent"
                      style={{ background: isActive ? c.color : "transparent" }}
                    />

                    <div className="aq-item-body">
                      {/* Index + category */}
                      <div className="aq-item-meta">
                        <span className="aq-item-num">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span
                          className="aq-item-cat"
                          style={isActive ? { color: c.color } : {}}
                        >
                          {c.icon} {c.label}
                        </span>
                      </div>

                      {/* Preview text */}
                      <p className="aq-item-text">{q.quote}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        /* ── Section ── */
        .aq-section {
          position: relative;
          background: var(--background);
          padding: 5rem 1.5rem 6rem;
          overflow: hidden;
        }

        /* ── Background ── */
        .aq-bg {
          position: absolute;
          inset: 0;
          z-index: 0;
          pointer-events: none;
          /* Pass foreground color as rgb triplet for canvas */
          --line-rgb: 15,23,42;
        }
        .dark .aq-bg { --line-rgb: 226,232,240; }

        .aq-veil {
          position: absolute;
          inset: 0;
          z-index: 1;
        }
        .aq-veil-tb {
          background: linear-gradient(
            to bottom,
            var(--background) 0%,
            transparent 22%,
            transparent 78%,
            var(--background) 100%
          );
        }
        .aq-veil-lr {
          background: linear-gradient(
            to right,
            var(--background) 0%,
            transparent 18%,
            transparent 82%,
            var(--background) 100%
          );
        }

        /* ── Content ── */
        .aq-inner {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          gap: 3.5rem;
        }

        /* ── Heading ── */
        .aq-head { display: flex; flex-direction: column; gap: 1.25rem; }
        .aq-eyebrow {
          font-size: 0.7rem; font-weight: 700;
          letter-spacing: 0.14em; text-transform: uppercase;
          color: var(--muted);
        }
        .aq-head-row {
          display: flex; align-items: flex-end;
          justify-content: space-between; gap: 2rem; flex-wrap: wrap;
        }
        .aq-title {
          font-family: var(--font-montserrat), Georgia, serif;
          font-size: clamp(2.5rem, 5vw, 4.5rem);
          font-weight: 800; letter-spacing: -0.035em;
          line-height: 0.95; color: var(--foreground); margin: 0;
        }
        .aq-title-outline {
          -webkit-text-stroke: 1.5px var(--foreground);
          color: transparent;
        }
        .aq-subtitle {
          max-width: 340px; font-size: 0.875rem;
          line-height: 1.75; color: var(--muted);
        }

        /* ── Body grid ── */
        .aq-body {
          display: grid;
          grid-template-columns: 1.35fr 1fr;
          gap: 4rem;
          align-items: start;
        }
        @media (max-width: 768px) {
          .aq-body { grid-template-columns: 1fr; gap: 2.5rem; }
          .aq-head-row { flex-direction: column; align-items: flex-start; }
        }

        /* ── Left ── */
        .aq-left {
          display: flex;
          flex-direction: column;
          gap: 2rem;
          position: relative;
        }

        .aq-bigmark {
          font-family: Georgia, "Times New Roman", serif;
          font-size: 10rem;
          line-height: 0.65;
          color: var(--border);
          font-weight: 900;
          letter-spacing: -0.04em;
          user-select: none;
          pointer-events: none;
          /* Restrained opacity — atmosphere only */
          opacity: 0.7;
        }

        .aq-quote-wrap {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .aq-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          padding: 0.28rem 0.75rem;
          border-radius: 999px;
          border: 1px solid;
          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          width: fit-content;
        }

        .aq-quote {
          font-family: var(--font-montserrat), Georgia, serif;
          font-size: clamp(1.35rem, 2.8vw, 2rem);
          font-weight: 700;
          letter-spacing: -0.025em;
          line-height: 1.35;
          color: var(--foreground);
          margin: 0;
          font-style: italic;
        }

        .aq-source-row {
          display: flex;
          align-items: center;
          gap: 0.625rem;
        }
        .aq-source-dash {
          width: 28px; height: 1.5px;
          border-radius: 2px; flex-shrink: 0;
        }
        .aq-source-text {
          font-size: 0.72rem; font-weight: 600;
          letter-spacing: 0.08em; text-transform: uppercase;
          color: var(--muted);
        }

        /* Controls */
        .aq-controls { display: flex; flex-direction: column; gap: 0.75rem; }
        .aq-dots-row {
          display: flex; align-items: center; gap: 0.875rem; flex-wrap: wrap;
        }
        .aq-counter {
          font-size: 0.72rem; color: var(--muted);
          letter-spacing: 0.04em; min-width: 28px;
        }
        .aq-counter b { color: var(--foreground); font-weight: 700; }

        .aq-dots { display: flex; align-items: center; gap: 0.35rem; flex: 1; }
        .aq-dot {
          width: 6px; height: 6px; border-radius: 999px;
          background: var(--border); border: none; padding: 0;
          cursor: pointer;
          transition: width 0.3s ease, background 0.3s ease;
        }

        .aq-arrows { display: flex; gap: 0.3rem; }
        .aq-arrow {
          width: 30px; height: 30px; border-radius: 8px;
          border: 1px solid var(--border);
          background: var(--background); color: var(--foreground);
          font-size: 0.8rem; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          transition: border-color 0.2s, background 0.2s, transform 0.15s;
        }
        .aq-arrow:hover {
          border-color: var(--foreground);
          background: var(--hover);
          transform: scale(1.08);
        }

        /* ── Right list ── */
        .aq-right { display: flex; flex-direction: column; gap: 0.875rem; }
        .aq-list-label {
          font-size: 0.62rem; font-weight: 700;
          letter-spacing: 0.14em; text-transform: uppercase;
          color: var(--muted);
        }
        .aq-list { display: flex; flex-direction: column; gap: 0.4rem; }

        .aq-item {
          display: flex;
          align-items: stretch;
          gap: 0;
          border: 1px solid var(--border);
          border-radius: 10px;
          background: var(--background);
          cursor: pointer;
          text-align: left;
          width: 100%;
          padding: 0;
          overflow: hidden;
          transition: border-color 0.2s, background 0.2s, transform 0.2s;
          animation: aq-item-in 0.45s ease both;
        }
        @keyframes aq-item-in {
          from { opacity: 0; transform: translateX(12px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        .aq-item:hover {
          border-color: var(--ic, var(--foreground));
          background: var(--hover);
          transform: translateX(-2px);
        }
        .aq-item-on {
          border-color: var(--ic, var(--foreground)) !important;
          background: var(--secondary) !important;
        }

        .aq-item-accent {
          width: 3px;
          flex-shrink: 0;
          transition: background 0.25s;
          border-radius: 10px 0 0 10px;
        }

        .aq-item-body {
          padding: 0.75rem 0.875rem;
          display: flex;
          flex-direction: column;
          gap: 0.3rem;
          flex: 1;
          min-width: 0;
        }

        .aq-item-meta {
          display: flex;
          align-items: center;
          gap: 0.6rem;
        }
        .aq-item-num {
          font-family: var(--font-montserrat), serif;
          font-size: 0.65rem; font-weight: 800;
          letter-spacing: 0.05em; color: var(--border);
          flex-shrink: 0;
        }
        .aq-item-on .aq-item-num { color: var(--muted); }
        .aq-item-cat {
          font-size: 0.6rem; font-weight: 700;
          letter-spacing: 0.1em; text-transform: uppercase;
          color: var(--muted);
          transition: color 0.2s;
        }

        .aq-item-text {
          font-size: 0.78rem; font-weight: 500;
          line-height: 1.5; color: var(--foreground);
          margin: 0; font-style: italic;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
}