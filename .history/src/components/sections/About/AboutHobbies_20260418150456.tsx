// src/components/about/AboutHobbies.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import hobbiesData from "@/data/hobbies.json";

/* ── Type ── */
export interface HobbyData {
  id: string;
  title: string;
  description: string;
  color: string;
  tags?: string[];
  icon?: string;
}

const HOBBIES = hobbiesData as HobbyData[];

/* ── useInView ── */
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

/* ─────────────────────────────────────────────
   Canvas animations
───────────────────────────────────────────── */
function FootballCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current!;
    const ctx = c.getContext("2d")!;
    let raf = 0;
    const balls = Array.from({ length: 22 }, () => ({
      x: Math.random() * 1400,
      y: Math.random() * 700,
      r: 8 + Math.random() * 18,
      vx: (Math.random() - 0.5) * 0.6,
      vy: (Math.random() - 0.5) * 0.6,
      alpha: 0.06 + Math.random() * 0.12,
    }));
    const draw = () => {
      const W = c.offsetWidth,
        H = c.offsetHeight;
      c.width = W;
      ctx.clearRect(0, 0, W, H);
      balls.forEach((b) => {
        b.x += b.vx;
        b.y += b.vy;
        if (b.x < -b.r) b.x = W + b.r;
        if (b.x > W + b.r) b.x = -b.r;
        if (b.y < -b.r) b.y = H + b.r;
        if (b.y > H + b.r) b.y = -b.r;
        ctx.save();
        ctx.globalAlpha = b.alpha;
        ctx.translate(b.x, b.y);
        ctx.beginPath();
        ctx.arc(0, 0, b.r, 0, Math.PI * 2);
        ctx.strokeStyle = "#f59e0b";
        ctx.lineWidth = 1.5;
        ctx.stroke();
        for (let i = 0; i < 5; i++) {
          const a = (i * 2 * Math.PI) / 5 - Math.PI / 2;
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.lineTo(Math.cos(a) * b.r * 0.65, Math.sin(a) * b.r * 0.65);
          ctx.strokeStyle = "#f59e0b";
          ctx.lineWidth = 0.9;
          ctx.stroke();
        }
        ctx.beginPath();
        ctx.arc(0, 0, b.r * 0.3, 0, Math.PI * 2);
        ctx.strokeStyle = "#f59e0b";
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.restore();
      });
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(raf);
  }, []);
  return <canvas ref={ref} className="hbs-panel-canvas" />;
}

function BadmintonCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current!;
    const ctx = c.getContext("2d")!;
    let raf = 0;
    const shuttles = Array.from({ length: 18 }, () => ({
      x: Math.random() * 1400,
      y: Math.random() * 700,
      size: 10 + Math.random() * 14,
      vx: 0.5 + Math.random() * 0.8,
      vy: (Math.random() - 0.5) * 0.4,
      rot: Math.random() * Math.PI * 2,
      rotV: 0.01 + Math.random() * 0.02,
      alpha: 0.06 + Math.random() * 0.1,
    }));
    const draw = () => {
      const W = c.offsetWidth,
        H = c.offsetHeight;
      c.width = W;
      ctx.clearRect(0, 0, W, H);
      shuttles.forEach((s) => {
        s.x += s.vx;
        s.y += s.vy;
        s.rot += s.rotV;
        if (s.x > W + s.size * 2) s.x = -s.size * 2;
        if (s.y < 0) s.y = H;
        if (s.y > H) s.y = 0;
        ctx.save();
        ctx.globalAlpha = s.alpha;
        ctx.translate(s.x, s.y);
        ctx.rotate(s.rot);
        for (let i = 0; i < 8; i++) {
          const a = (i / 8) * Math.PI * 2;
          ctx.beginPath();
          ctx.moveTo(Math.cos(a) * s.size * 0.25, Math.sin(a) * s.size * 0.25);
          ctx.lineTo(Math.cos(a) * s.size, Math.sin(a) * s.size);
          ctx.strokeStyle = "#22c55e";
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
        ctx.beginPath();
        ctx.arc(0, 0, s.size, 0, Math.PI * 2);
        ctx.strokeStyle = "#22c55e";
        ctx.lineWidth = 0.7;
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(0, 0, s.size * 0.25, 0, Math.PI * 2);
        ctx.strokeStyle = "#22c55e";
        ctx.lineWidth = 1.2;
        ctx.stroke();
        ctx.restore();
      });
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(raf);
  }, []);
  return <canvas ref={ref} className="hbs-panel-canvas" />;
}

function HikingCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current!;
    const ctx = c.getContext("2d")!;
    let raf = 0;
    const stars = Array.from({ length: 55 }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: 0.8 + Math.random() * 2.4,
      speed: 0.15 + Math.random() * 0.35,
      alpha: 0.05 + Math.random() * 0.14,
    }));
    const peakDefs = [
      [0, 0.75],
      [0.07, 0.4],
      [0.18, 0.65],
      [0.28, 0.28],
      [0.4, 0.55],
      [0.52, 0.22],
      [0.62, 0.48],
      [0.74, 0.3],
      [0.85, 0.52],
      [0.94, 0.35],
      [1, 0.6],
    ];
    const draw = () => {
      const W = c.offsetWidth,
        H = c.offsetHeight;
      c.width = W;
      ctx.clearRect(0, 0, W, H);
      stars.forEach((s) => {
        s.y -= (s.speed / H) * 80;
        if (s.y < -0.02) s.y = 1.05;
        ctx.beginPath();
        ctx.arc(s.x * W, s.y * H, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(6,182,212,${s.alpha})`;
        ctx.fill();
      });
      ctx.beginPath();
      ctx.moveTo(0, H);
      peakDefs.forEach(([px, py], i) => {
        if (i === 0) {
          ctx.lineTo(px * W, py * H);
          return;
        }
        const [ppx, ppy] = peakDefs[i - 1];
        ctx.quadraticCurveTo(
          ppx * W,
          ppy * H,
          ((ppx + px) / 2) * W,
          ((ppy + py) / 2) * H,
        );
      });
      ctx.lineTo(W, H);
      ctx.closePath();
      ctx.strokeStyle = "rgba(6,182,212,0.12)";
      ctx.lineWidth = 1.5;
      ctx.stroke();
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(raf);
  }, []);
  return <canvas ref={ref} className="hbs-panel-canvas" />;
}

function TravellingCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current!;
    const ctx = c.getContext("2d")!;
    let raf = 0,
      t = 0;
    const nodes = Array.from({ length: 15 }, () => ({
      x: 0.05 + Math.random() * 0.9,
      y: 0.1 + Math.random() * 0.8,
      r: 2 + Math.random() * 3,
      phase: Math.random() * Math.PI * 2,
    }));
    const routes = nodes.map((_, i) => ({
      from: i,
      to: (i + 4 + Math.floor(Math.random() * 4)) % nodes.length,
    }));
    const travelers = routes.map((r) => ({
      ...r,
      prog: Math.random(),
      speed: 0.0015 + Math.random() * 0.003,
    }));
    const draw = () => {
      const W = c.offsetWidth,
        H = c.offsetHeight;
      c.width = W;
      ctx.clearRect(0, 0, W, H);
      t += 0.008;
      const pts = nodes.map((n) => ({
        x: n.x * W,
        y: n.y * H,
        r: n.r,
        phase: n.phase,
      }));
      routes.forEach((r) => {
        const a = pts[r.from],
          b = pts[r.to];
        ctx.beginPath();
        ctx.setLineDash([2, 10]);
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.strokeStyle = "rgba(99,102,241,0.08)";
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.setLineDash([]);
      });
      pts.forEach((p) => {
        const pulse = Math.sin(t * 1.5 + p.phase) * 0.5 + 0.5;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r + pulse * 2.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(99,102,241,${0.05 + pulse * 0.08})`;
        ctx.fill();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * (1.6 + pulse * 1.8), 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(99,102,241,${0.03 + pulse * 0.05})`;
        ctx.lineWidth = 0.8;
        ctx.stroke();
      });
      travelers.forEach((tr) => {
        tr.prog += tr.speed;
        if (tr.prog > 1) tr.prog = 0;
        const a = pts[tr.from],
          b = pts[tr.to];
        ctx.beginPath();
        ctx.arc(
          a.x + (b.x - a.x) * tr.prog,
          a.y + (b.y - a.y) * tr.prog,
          2.5,
          0,
          Math.PI * 2,
        );
        ctx.fillStyle = "rgba(99,102,241,0.35)";
        ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(raf);
  }, []);
  return <canvas ref={ref} className="hbs-panel-canvas" />;
}

const CANVAS_MAP: Record<string, React.FC> = {
  football: FootballCanvas,
  badminton: BadmintonCanvas,
  hiking: HikingCanvas,
  travelling: TravellingCanvas,
};

/* Warna & label per hobi */
const HOBBY_META: Record<string, { accent: string; num: string }> = {
  football: { accent: "#f59e0b", num: "01" },
  badminton: { accent: "#22c55e", num: "02" },
  hiking: { accent: "#06b6d4", num: "03" },
  travelling: { accent: "#6366f1", num: "04" },
};

/* ─────────────────────────────────────────────
   AboutHobbies — default export
───────────────────────────────────────────── */
export default function AboutHobbies() {
  const { ref: headRef, inView: headIn } = useInView(0.2);
  const [activeIdx, setActiveIdx] = useState(0);
  const [visible, setVisible] = useState(true);

  /* Auto-cycle 5s */
  useEffect(() => {
    const t = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setActiveIdx((p) => (p + 1) % HOBBIES.length);
        setVisible(true);
      }, 380);
    }, 5000);
    return () => clearInterval(t);
  }, []);

  const goTo = (i: number) => {
    if (i === activeIdx) return;
    setVisible(false);
    setTimeout(() => {
      setActiveIdx(i);
      setVisible(true);
    }, 380);
  };

  const hobby = HOBBIES[activeIdx];
  const meta = HOBBY_META[hobby.id] ?? { accent: "#888", num: "01" };
  const Canvas = CANVAS_MAP[hobby.id];

  return (
    <section className="hbs-section">
      <div className="container-custom hbs-inner">
        {/* ── Heading ── */}
        <div
          ref={headRef}
          className="hbs-heading-wrap"
          style={{
            opacity: headIn ? 1 : 0,
            transform: headIn ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.6s ease, transform 0.6s ease",
          }}
        >
          <p className="hbs-eyebrow">/ hobbies & interests</p>
          <div className="hbs-heading-row">
            <h2 className="hbs-heading">
              Beyond
              <br />
              <span className="hbs-heading-outline">the Screen</span>
            </h2>
            <p className="hbs-heading-sub">
              What I do when I&apos;m not coding — the passions that keep me
              energized and inspired every single day.
            </p>
          </div>
        </div>

        {/* ── Split Panel ── */}
        <div
          className="hbs-split"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.38s ease, transform 0.38s ease",
          }}
        >
          {/* LEFT — content */}
          <div className="hbs-left">
            {/* Index number */}
            <span className="hbs-index" style={{ color: meta.accent }}>
              {meta.num} / 0{HOBBIES.length}
            </span>

            {/* Title */}
            <h3 className="hbs-title">{hobby.title}</h3>

            {/* Accent rule */}
            <div className="hbs-rule" style={{ background: meta.accent }} />

            {/* Description */}
            <p className="hbs-desc">{hobby.description}</p>

            {/* Tags */}
            {hobby.tags && hobby.tags.length > 0 && (
              <div className="hbs-tags">
                {hobby.tags.map((tag) => (
                  <span
                    key={tag}
                    className="hbs-tag"
                    style={{
                      borderColor: meta.accent + "55",
                      color: meta.accent,
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Dot nav */}
            <div className="hbs-dots">
              {HOBBIES.map((h, i) => (
                <button
                  key={h.id}
                  className="hbs-dot-btn"
                  onClick={() => goTo(i)}
                  aria-label={`Go to ${h.title}`}
                >
                  <span
                    className="hbs-dot"
                    style={{
                      background:
                        i === activeIdx ? meta.accent : "var(--border)",
                      transform: i === activeIdx ? "scale(1.4)" : "scale(1)",
                      transition: "background 0.3s, transform 0.3s",
                    }}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT — canvas panel */}
          <div className="hbs-right" key={hobby.id}>
            {/* Tint overlay keyed to accent */}
            <div
              className="hbs-right-tint"
              style={{ background: meta.accent + "12" }}
            />

            {/* Corner label */}
            <span
              className="hbs-corner-label"
              style={{ color: meta.accent + "99" }}
            >
              {hobby.title}
            </span>

            {/* Animated canvas */}
            {Canvas && <Canvas />}
          </div>
        </div>
      </div>

      <style>{`
        .hbs-section {
          background: var(--background);
          padding: 5rem 1.5rem 6rem;
          overflow: hidden;
        }
        .hbs-inner {
          display: flex;
          flex-direction: column;
          gap: 3rem;
        }

        /* Heading */
        .hbs-heading-wrap { display: flex; flex-direction: column; gap: 1.25rem; }
        .hbs-eyebrow {
          font-size: 0.7rem; font-weight: 700;
          letter-spacing: 0.14em; text-transform: uppercase; color: var(--muted);
        }
        .hbs-heading-row {
          display: flex; align-items: flex-end;
          justify-content: space-between; gap: 2rem; flex-wrap: wrap;
        }
        .hbs-heading {
          font-family: var(--font-montserrat), Georgia, serif;
          font-size: clamp(2.5rem, 5vw, 4.5rem);
          font-weight: 800; letter-spacing: -0.035em;
          line-height: 0.95; color: var(--foreground); margin: 0;
        }
        .hbs-heading-outline {
          -webkit-text-stroke: 1.5px var(--foreground);
          color: transparent;
        }
        .hbs-heading-sub {
          max-width: 340px; font-size: 0.875rem;
          line-height: 1.75; color: var(--muted);
        }

        /* ── Split layout ── */
        .hbs-split {
          display: grid;
          grid-template-columns: 1fr 1fr;
          border: 1px solid var(--border);
          border-radius: 1.5rem;
          overflow: hidden;
          min-height: 420px;
        }

        /* LEFT panel */
        .hbs-left {
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 1.25rem;
          padding: 3rem 2.5rem;
          background: var(--background);
          border-right: 1px solid var(--border);
        }
        .hbs-index {
          font-family: var(--font-montserrat), serif;
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.18em;
        }
        .hbs-title {
          font-family: var(--font-montserrat), Georgia, serif;
          font-size: clamp(2rem, 3.5vw, 3rem);
          font-weight: 800;
          letter-spacing: -0.03em;
          line-height: 1.0;
          color: var(--foreground);
          margin: 0;
        }
        .hbs-rule {
          width: 2.5rem;
          height: 3px;
          border-radius: 999px;
          flex-shrink: 0;
        }
        .hbs-desc {
          font-size: 0.9rem;
          line-height: 1.8;
          color: var(--muted);
          margin: 0;
          max-width: 36ch;
        }
        .hbs-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.4rem;
        }
        .hbs-tag {
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          padding: 0.25rem 0.7rem;
          border-radius: 999px;
          border: 1px solid;
          cursor: default;
        }
        .hbs-dots {
          display: flex;
          gap: 0.6rem;
          align-items: center;
          margin-top: 0.5rem;
        }
        .hbs-dot-btn {
          background: none;
          border: none;
          padding: 4px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .hbs-dot {
          display: block;
          width: 7px;
          height: 7px;
          border-radius: 50%;
        }

        /* RIGHT panel */
        .hbs-right {
          position: relative;
          overflow: hidden;
          background: var(--secondary);
          min-height: 320px;
        }
        .hbs-right-tint {
          position: absolute;
          inset: 0;
          z-index: 1;
          pointer-events: none;
          transition: background 0.6s ease;
        }
        .hbs-corner-label {
          position: absolute;
          bottom: 1.25rem;
          right: 1.5rem;
          z-index: 3;
          font-family: var(--font-montserrat), serif;
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          pointer-events: none;
        }
        .hbs-panel-canvas {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          display: block;
          z-index: 2;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .hbs-split {
            grid-template-columns: 1fr;
            min-height: auto;
          }
          .hbs-left {
            border-right: none;
            border-bottom: 1px solid var(--border);
            padding: 2rem 1.5rem;
          }
          .hbs-right { min-height: 220px; }
          .hbs-heading-row { flex-direction: column; align-items: flex-start; }
        }
      `}</style>
    </section>
  );
}
