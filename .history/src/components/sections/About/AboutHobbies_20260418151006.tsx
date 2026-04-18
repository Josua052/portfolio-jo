// src/components/about/AboutHobbies.tsx
"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import hobbiesData from "@/data/hobbies.json";

export interface HobbyData {
  id: string;
  title: string;
  description: string;
  color: string;
  tags?: string[];
}

const HOBBIES = hobbiesData as HobbyData[];

const HOBBY_META: Record<string, { accent: string; index: string }> = {
  football: { accent: "#f59e0b", index: "01" },
  badminton: { accent: "#22c55e", index: "02" },
  hiking: { accent: "#06b6d4", index: "03" },
  travelling: { accent: "#6366f1", index: "04" },
};

/* ── Canvas components ── */
function FootballCanvas({ active }: { active: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current!;
    const ctx = c.getContext("2d")!;
    let raf = 0;
    const balls = Array.from({ length: 16 }, () => ({
      x: Math.random() * 800,
      y: Math.random() * 400,
      r: 8 + Math.random() * 16,
      vx: (Math.random() - 0.5) * 0.55,
      vy: (Math.random() - 0.5) * 0.55,
    }));
    const draw = () => {
      c.width = c.offsetWidth;
      c.height = c.offsetHeight;
      const W = c.width,
        H = c.height;
      ctx.clearRect(0, 0, W, H);
      balls.forEach((b) => {
        b.x += b.vx;
        b.y += b.vy;
        if (b.x < -b.r) b.x = W + b.r;
        if (b.x > W + b.r) b.x = -b.r;
        if (b.y < -b.r) b.y = H + b.r;
        if (b.y > H + b.r) b.y = -b.r;
        ctx.save();
        ctx.translate(b.x, b.y);
        ctx.beginPath();
        ctx.arc(0, 0, b.r, 0, Math.PI * 2);
        ctx.strokeStyle = "#f59e0b";
        ctx.lineWidth = 1.2;
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
        ctx.restore();
      });
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(raf);
  }, []);
  return <canvas ref={ref} className="hbs-canvas" />;
}

function BadmintonCanvas({ active }: { active: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current!;
    const ctx = c.getContext("2d")!;
    let raf = 0;
    const sh = Array.from({ length: 14 }, () => ({
      x: Math.random() * 800,
      y: Math.random() * 400,
      sz: 10 + Math.random() * 14,
      vx: 0.5 + Math.random() * 0.7,
      rot: Math.random() * Math.PI * 2,
      rv: 0.01 + Math.random() * 0.02,
    }));
    const draw = () => {
      c.width = c.offsetWidth;
      c.height = c.offsetHeight;
      const W = c.width,
        H = c.height;
      ctx.clearRect(0, 0, W, H);
      sh.forEach((b) => {
        b.x += b.vx;
        b.rot += b.rv;
        if (b.x > W + b.sz * 2) b.x = -b.sz * 2;
        ctx.save();
        ctx.translate(b.x, b.y);
        ctx.rotate(b.rot);
        for (let i = 0; i < 8; i++) {
          const a = (i / 8) * Math.PI * 2;
          ctx.beginPath();
          ctx.moveTo(Math.cos(a) * b.sz * 0.25, Math.sin(a) * b.sz * 0.25);
          ctx.lineTo(Math.cos(a) * b.sz, Math.sin(a) * b.sz);
          ctx.strokeStyle = "#22c55e";
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
        ctx.beginPath();
        ctx.arc(0, 0, b.sz, 0, Math.PI * 2);
        ctx.strokeStyle = "#22c55e";
        ctx.lineWidth = 0.7;
        ctx.stroke();
        ctx.restore();
      });
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(raf);
  }, []);
  return <canvas ref={ref} className="hbs-canvas" />;
}

function HikingCanvas({ active }: { active: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current!;
    const ctx = c.getContext("2d")!;
    let raf = 0;
    const stars = Array.from({ length: 50 }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: 0.8 + Math.random() * 2.2,
      speed: 0.15 + Math.random() * 0.35,
    }));
    const peaks = [
      [0, 0.75],
      [0.08, 0.4],
      [0.2, 0.65],
      [0.3, 0.28],
      [0.42, 0.55],
      [0.54, 0.22],
      [0.65, 0.48],
      [0.76, 0.3],
      [0.87, 0.52],
      [0.95, 0.35],
      [1, 0.6],
    ];
    const draw = () => {
      c.width = c.offsetWidth;
      c.height = c.offsetHeight;
      const W = c.width,
        H = c.height;
      ctx.clearRect(0, 0, W, H);
      stars.forEach((s) => {
        s.y -= (s.speed / H) * 70;
        if (s.y < -0.02) s.y = 1.05;
        ctx.beginPath();
        ctx.arc(s.x * W, s.y * H, s.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(6,182,212,0.7)";
        ctx.fill();
      });
      ctx.beginPath();
      ctx.moveTo(0, H);
      peaks.forEach(([px, py], i) => {
        if (i === 0) {
          ctx.lineTo(px * W, py * H);
          return;
        }
        const [ppx, ppy] = peaks[i - 1];
        ctx.quadraticCurveTo(
          ppx * W,
          ppy * H,
          ((ppx + px) / 2) * W,
          ((ppy + py) / 2) * H,
        );
      });
      ctx.lineTo(W, H);
      ctx.closePath();
      ctx.strokeStyle = "rgba(6,182,212,0.5)";
      ctx.lineWidth = 1.5;
      ctx.stroke();
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(raf);
  }, []);
  return <canvas ref={ref} className="hbs-canvas" />;
}

function TravelCanvas({ active }: { active: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current!;
    const ctx = c.getContext("2d")!;
    let raf = 0,
      t = 0;
    const nodes = Array.from({ length: 12 }, () => ({
      x: 0.05 + Math.random() * 0.9,
      y: 0.1 + Math.random() * 0.8,
      r: 2 + Math.random() * 3,
      phase: Math.random() * Math.PI * 2,
    }));
    const routes = nodes.map((_, i) => ({
      from: i,
      to: (i + 3 + Math.floor(Math.random() * 3)) % nodes.length,
    }));
    const travelers = routes.map((r) => ({
      ...r,
      prog: Math.random(),
      speed: 0.002 + Math.random() * 0.003,
    }));
    const draw = () => {
      c.width = c.offsetWidth;
      c.height = c.offsetHeight;
      const W = c.width,
        H = c.height;
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
        ctx.setLineDash([2, 8]);
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.strokeStyle = "rgba(99,102,241,0.4)";
        ctx.lineWidth = 0.8;
        ctx.stroke();
        ctx.setLineDash([]);
      });
      pts.forEach((p) => {
        const pulse = Math.sin(t * 1.5 + p.phase) * 0.5 + 0.5;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r + pulse * 3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(99,102,241,${0.15 + pulse * 0.2})`;
        ctx.fill();
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
        ctx.fillStyle = "rgba(99,102,241,0.7)";
        ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(raf);
  }, []);
  return <canvas ref={ref} className="hbs-canvas" />;
}

const CANVAS_MAP: Record<string, React.FC<{ active: boolean }>> = {
  football: FootballCanvas,
  badminton: BadmintonCanvas,
  hiking: HikingCanvas,
  travelling: TravelCanvas,
};

/* ── Main Component ── */
export default function AboutHobbies() {
  const [active, setActive] = useState(0);
  const [progKey, setProgKey] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval>>();

  const goTo = useCallback((i: number) => {
    setActive(i);
    setProgKey((k) => k + 1);
  }, []);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setActive((p) => {
        const next = (p + 1) % HOBBIES.length;
        setProgKey((k) => k + 1);
        return next;
      });
    }, 5000);
    return () => clearInterval(timerRef.current);
  }, []);

  const handleClick = (i: number) => {
    clearInterval(timerRef.current);
    goTo(i);
    timerRef.current = setInterval(() => {
      setActive((p) => {
        const next = (p + 1) % HOBBIES.length;
        setProgKey((k) => k + 1);
        return next;
      });
    }, 5000);
  };

  return (
    <section className="hbs-section">
      <div className="container-custom hbs-inner">
        {/* Heading */}
        <div className="hbs-head">
          <span className="hbs-blink" />
          <span className="hbs-sys-label">
            SYS://JOSUA.HOBBIES — MODULE ACTIVE
          </span>
        </div>

        <div className="hbs-title-row">
          <div>
            <p className="hbs-eyebrow">/ hobbies & interests</p>
            <h2 className="hbs-heading">
              Beyond
              <br />
              <span className="hbs-heading-outline">the Screen</span>
            </h2>
          </div>
          <p className="hbs-sub">
            What I do when I'm not coding — the passions that keep me energized
            and inspired every single day.
          </p>
        </div>

        {/* Timeline strip */}
        <div className="hbs-strip">
          {HOBBIES.map((h, i) => {
            const meta = HOBBY_META[h.id] ?? {
              accent: "#888",
              index: "0" + (i + 1),
            };
            const isActive = i === active;
            const Canvas = CANVAS_MAP[h.id];
            return (
              <div
                key={h.id}
                className={`hbs-tile${isActive ? " hbs-tile-active" : ""}`}
                onClick={() => handleClick(i)}
                style={{
                  borderColor: isActive
                    ? meta.accent + "55"
                    : "rgba(255,255,255,0.08)",
                }}
              >
                {/* BG tint */}
                <div className="hbs-tile-bg" />

                {/* Animated canvas */}
                {Canvas && <Canvas active={isActive} />}

                {/* Corner brackets */}
                <div
                  className="hbs-brk hbs-brk-tl"
                  style={{ borderColor: meta.accent + "55" }}
                />
                <div
                  className="hbs-brk hbs-brk-br"
                  style={{ borderColor: meta.accent + "55" }}
                />

                {/* Collapsed label */}
                <span
                  className="hbs-collapsed-label"
                  style={{ color: meta.accent + "99" }}
                >
                  {h.title}
                </span>

                {/* Active content */}
                <div className="hbs-tile-content">
                  <div className="hbs-tile-top">
                    <span
                      className="hbs-tile-num"
                      style={{ color: meta.accent + "88" }}
                    >
                      {meta.index} / 0{HOBBIES.length}
                    </span>
                    <h3 className="hbs-tile-title">{h.title}</h3>
                    <div
                      className="hbs-tile-rule"
                      style={{ background: meta.accent }}
                    />
                  </div>
                  <p className="hbs-tile-desc">{h.description}</p>
                  {h.tags && (
                    <div className="hbs-tile-tags">
                      {h.tags.map((tag) => (
                        <span
                          key={tag}
                          className="hbs-tile-tag"
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
                  <div className="hbs-tile-footer">
                    <div className="hbs-status">
                      <span
                        className="hbs-status-dot"
                        style={{ background: meta.accent }}
                      />
                      Active module
                    </div>
                    <div className="hbs-prog-wrap">
                      <div
                        key={isActive ? `prog-${progKey}` : undefined}
                        className="hbs-prog-bar"
                        style={{ background: meta.accent }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        .hbs-section {
          background: #080c10;
          padding: 5rem 1.5rem 6rem;
          overflow: hidden;
          position: relative;
        }
        /* scanlines */
        .hbs-section::before {
          content: '';
          position: absolute; inset: 0;
          background: repeating-linear-gradient(
            0deg, transparent, transparent 3px,
            rgba(255,255,255,0.012) 3px, rgba(255,255,255,0.012) 4px
          );
          pointer-events: none; z-index: 0;
        }
        /* grid */
        .hbs-section::after {
          content: '';
          position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.022) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.022) 1px, transparent 1px);
          background-size: 44px 44px;
          pointer-events: none; z-index: 0;
        }
        .hbs-inner {
          position: relative; z-index: 2;
          display: flex; flex-direction: column; gap: 2.5rem;
        }

        /* Heading */
        .hbs-head { display: flex; align-items: center; gap: 8px; }
        .hbs-blink {
          display: inline-block; width: 7px; height: 7px;
          border-radius: 50%; background: #22c55e;
          animation: hbs-blink 1.1s step-end infinite;
        }
        @keyframes hbs-blink { 0%,100%{opacity:1} 50%{opacity:0} }
        .hbs-sys-label {
          font-family: 'Courier New', monospace;
          font-size: 0.65rem; letter-spacing: 0.18em;
          text-transform: uppercase; color: rgba(255,255,255,0.25);
        }
        .hbs-title-row {
          display: flex; align-items: flex-end;
          justify-content: space-between; gap: 2rem; flex-wrap: wrap;
        }
        .hbs-eyebrow {
          font-size: 0.65rem; font-weight: 700;
          letter-spacing: 0.14em; text-transform: uppercase;
          color: rgba(255,255,255,0.3);
          font-family: 'Courier New', monospace;
        }
        .hbs-heading {
          font-family: var(--font-montserrat), Georgia, serif;
          font-size: clamp(2.5rem, 5vw, 4.5rem);
          font-weight: 800; letter-spacing: -0.035em;
          line-height: 0.95; color: #fff; margin: 0.5rem 0 0;
        }
        .hbs-heading-outline {
          -webkit-text-stroke: 1.5px rgba(255,255,255,0.4);
          color: transparent;
        }
        .hbs-sub {
          max-width: 320px; font-size: 0.85rem;
          line-height: 1.75; color: rgba(255,255,255,0.35);
          font-family: 'Courier New', monospace;
        }

        /* ── Strip ── */
        .hbs-strip {
          display: flex; gap: 10px; align-items: stretch;
          min-height: 380px;
        }

        /* Tile */
        .hbs-tile {
          flex: 1;
          min-width: 0;
          position: relative;
          border: 1px solid;
          border-radius: 4px;
          overflow: hidden;
          cursor: pointer;
          transition: flex 0.55s cubic-bezier(0.4,0,0.2,1), border-color 0.3s;
        }
        .hbs-tile-active { flex: 4; }

        .hbs-tile-bg {
          position: absolute; inset: 0; z-index: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px);
          background-size: 20px 20px;
        }

        /* Canvas */
        .hbs-canvas {
          position: absolute; inset: 0;
          width: 100%; height: 100%;
          display: block; z-index: 1; opacity: 0.2;
        }

        /* Corner brackets */
        .hbs-brk {
          position: absolute; width: 14px; height: 14px;
          z-index: 3; border-style: solid;
        }
        .hbs-brk-tl { top: 8px; left: 8px; border-width: 1.5px 0 0 1.5px; border-radius: 2px 0 0 0; }
        .hbs-brk-br { bottom: 8px; right: 8px; border-width: 0 1.5px 1.5px 0; border-radius: 0 0 2px 0; }

        /* Collapsed label */
        .hbs-collapsed-label {
          position: absolute; bottom: 1.25rem; left: 50%;
          transform: translateX(-50%) rotate(180deg);
          writing-mode: vertical-rl;
          font-family: 'Courier New', monospace;
          font-size: 0.65rem; font-weight: 700;
          letter-spacing: 0.18em; text-transform: uppercase;
          white-space: nowrap; z-index: 4;
          opacity: 1; transition: opacity 0.2s;
        }
        .hbs-tile-active .hbs-collapsed-label { opacity: 0; pointer-events: none; }

        /* Active content */
        .hbs-tile-content {
          position: relative; z-index: 4;
          height: 100%; display: flex; flex-direction: column;
          justify-content: space-between; padding: 1.5rem 1.25rem;
          opacity: 0; transition: opacity 0.3s 0.2s;
          pointer-events: none;
        }
        .hbs-tile-active .hbs-tile-content { opacity: 1; pointer-events: auto; }

        .hbs-tile-top { display: flex; flex-direction: column; gap: 0.5rem; }
        .hbs-tile-num {
          font-family: 'Courier New', monospace;
          font-size: 0.62rem; letter-spacing: 0.2em;
        }
        .hbs-tile-title {
          font-family: var(--font-montserrat), Georgia, serif;
          font-size: clamp(1.6rem, 3vw, 2.4rem);
          font-weight: 800; letter-spacing: -0.025em;
          line-height: 1; color: #fff; margin: 0;
        }
        .hbs-tile-rule { height: 2px; width: 2rem; border-radius: 999px; flex-shrink: 0; }

        .hbs-tile-desc {
          font-family: 'Courier New', monospace;
          font-size: 0.78rem; line-height: 1.8;
          color: rgba(255,255,255,0.45); max-width: 38ch;
        }

        .hbs-tile-tags { display: flex; flex-wrap: wrap; gap: 6px; }
        .hbs-tile-tag {
          font-family: 'Courier New', monospace;
          font-size: 0.6rem; font-weight: 700;
          letter-spacing: 0.12em; text-transform: uppercase;
          padding: 3px 8px; border-radius: 2px; border: 1px solid;
          cursor: default;
        }

        /* Footer */
        .hbs-tile-footer {
          display: flex; align-items: center;
          justify-content: space-between; gap: 1rem;
        }
        .hbs-status {
          display: flex; align-items: center; gap: 6px;
          font-family: 'Courier New', monospace;
          font-size: 0.58rem; letter-spacing: 0.14em;
          text-transform: uppercase; color: rgba(255,255,255,0.25);
        }
        .hbs-status-dot {
          width: 5px; height: 5px; border-radius: 50%;
          animation: hbs-blink 1.4s step-end infinite;
          flex-shrink: 0;
        }
        .hbs-prog-wrap {
          width: 80px; height: 2px;
          background: rgba(255,255,255,0.08);
          border-radius: 1px; overflow: hidden; flex-shrink: 0;
        }
        .hbs-prog-bar {
          height: 100%; border-radius: 1px;
          width: 0%;
          animation: hbs-prog 5s linear forwards;
        }
        @keyframes hbs-prog { from { width: 0% } to { width: 100% } }

        @media (max-width: 768px) {
          .hbs-strip { flex-direction: column; min-height: auto; }
          .hbs-tile { flex: none !important; min-height: 64px; }
          .hbs-tile-active { min-height: 380px; }
          .hbs-collapsed-label {
            writing-mode: horizontal-tb;
            transform: none; left: 1rem; bottom: auto; top: 50%;
            transform: translateY(-50%);
          }
          .hbs-title-row { flex-direction: column; align-items: flex-start; }
        }
      `}</style>
    </section>
  );
}
