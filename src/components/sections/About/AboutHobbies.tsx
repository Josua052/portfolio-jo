// src/components/about/AboutHobbies.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import HobbyCard, { type HobbyData } from "@/components/ui/HobbyCard";
import hobbiesData from "@/data/hobbies.json";

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
   Canvas animations per hobby
───────────────────────────────────────────── */
function FootballCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current!;
    const ctx = c.getContext("2d")!;
    let raf = 0;
    const resize = () => {
      c.width = c.offsetWidth;
      c.height = c.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const balls = Array.from({ length: 18 }, () => ({
      x: Math.random() * 1400,
      y: Math.random() * 700,
      r: 7 + Math.random() * 15,
      vx: (Math.random() - 0.5) * 0.55,
      vy: (Math.random() - 0.5) * 0.55,
      alpha: 0.05 + Math.random() * 0.09,
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
        // Outer circle
        ctx.beginPath();
        ctx.arc(0, 0, b.r, 0, Math.PI * 2);
        ctx.strokeStyle = "#f59e0b";
        ctx.lineWidth = 1.5;
        ctx.stroke();
        // Star lines from center
        for (let i = 0; i < 5; i++) {
          const a = (i * 2 * Math.PI) / 5 - Math.PI / 2;
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.lineTo(Math.cos(a) * b.r * 0.65, Math.sin(a) * b.r * 0.65);
          ctx.strokeStyle = "#f59e0b";
          ctx.lineWidth = 0.9;
          ctx.stroke();
        }
        // Inner circle
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
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);
  return <canvas ref={ref} className="hbs-canvas" />;
}

function BadmintonCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current!;
    const ctx = c.getContext("2d")!;
    let raf = 0;
    const resize = () => {
      c.width = c.offsetWidth;
      c.height = c.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const shuttles = Array.from({ length: 14 }, () => ({
      x: Math.random() * 1400,
      y: Math.random() * 700,
      size: 9 + Math.random() * 13,
      vx: 0.45 + Math.random() * 0.75,
      vy: (Math.random() - 0.5) * 0.38,
      rot: Math.random() * Math.PI * 2,
      rotV: 0.008 + Math.random() * 0.018,
      alpha: 0.06 + Math.random() * 0.09,
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
        // Feathers
        for (let i = 0; i < 8; i++) {
          const a = (i / 8) * Math.PI * 2;
          ctx.beginPath();
          ctx.moveTo(Math.cos(a) * s.size * 0.25, Math.sin(a) * s.size * 0.25);
          ctx.lineTo(Math.cos(a) * s.size, Math.sin(a) * s.size);
          ctx.strokeStyle = "#22c55e";
          ctx.lineWidth = 0.7;
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
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);
  return <canvas ref={ref} className="hbs-canvas" />;
}

function HikingCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current!;
    const ctx = c.getContext("2d")!;
    let raf = 0,
      t = 0;
    const resize = () => {
      c.width = c.offsetWidth;
      c.height = c.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const stars = Array.from({ length: 45 }, () => ({
      x: Math.random(),
      y: Math.random() + 0.1,
      r: 0.7 + Math.random() * 2.2,
      speed: 0.12 + Math.random() * 0.3,
      alpha: 0.04 + Math.random() * 0.11,
    }));

    const peakDefs = [
      [0, 0.72],
      [0.06, 0.42],
      [0.16, 0.68],
      [0.26, 0.3],
      [0.38, 0.58],
      [0.5, 0.25],
      [0.6, 0.5],
      [0.72, 0.33],
      [0.83, 0.55],
      [0.93, 0.38],
      [1, 0.62],
    ];

    const draw = () => {
      const W = c.offsetWidth,
        H = c.offsetHeight;
      c.width = W;
      ctx.clearRect(0, 0, W, H);
      t += 0.004;

      // Rising stars/mist
      stars.forEach((s) => {
        s.y -= (s.speed / H) * 70;
        if (s.y < -0.02) s.y = 1.05;
        ctx.beginPath();
        ctx.arc(s.x * W, s.y * H, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(6,182,212,${s.alpha})`;
        ctx.fill();
      });

      // Mountain ridge
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
      ctx.strokeStyle = "rgba(6,182,212,0.1)";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);
  return <canvas ref={ref} className="hbs-canvas" />;
}

function TravellingCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current!;
    const ctx = c.getContext("2d")!;
    let raf = 0,
      t = 0;
    const resize = () => {
      c.width = c.offsetWidth;
      c.height = c.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

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
      speed: 0.0015 + Math.random() * 0.0025,
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

      // Routes
      routes.forEach((r) => {
        const a = pts[r.from],
          b = pts[r.to];
        ctx.beginPath();
        ctx.setLineDash([2, 10]);
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.strokeStyle = "rgba(99,102,241,0.07)";
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.setLineDash([]);
      });

      // Nodes with pulse
      pts.forEach((p) => {
        const pulse = Math.sin(t * 1.5 + p.phase) * 0.5 + 0.5;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r + pulse * 2.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(99,102,241,${0.05 + pulse * 0.07})`;
        ctx.fill();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * (1.6 + pulse * 1.8), 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(99,102,241,${0.03 + pulse * 0.04})`;
        ctx.lineWidth = 0.8;
        ctx.stroke();
      });

      // Moving travelers
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
        ctx.fillStyle = "rgba(99,102,241,0.32)";
        ctx.fill();
      });

      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);
  return <canvas ref={ref} className="hbs-canvas" />;
}

const BG_CANVAS: Record<string, React.FC> = {
  football: FootballCanvas,
  badminton: BadmintonCanvas,
  hiking: HikingCanvas,
  travelling: TravellingCanvas,
};

/* ─────────────────────────────────────────────
   AboutHobbies — default export
───────────────────────────────────────────── */
export default function AboutHobbies() {
  const { ref: headRef, inView: headIn } = useInView(0.2);
  const BgCanvas = BG_CANVAS[HOBBIES[0].id];
  // We show ALL hobbies in a grid — no tab switching needed

  return (
    <section className="hbs-section">
      {/* Rotating background canvas — cycles through all hobbies' animations */}
      <CyclingBackground hobbies={HOBBIES} />

      <div className="container-custom hbs-inner">
        {/* Heading */}
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
              What I do when I am not coding — the passions that keep me
              energized and inspired every single day.
            </p>
          </div>
        </div>

        {/* 2×2 grid of all hobby cards */}
        <div className="hbs-grid">
          {HOBBIES.map((hobby, i) => (
            <HobbyCard key={hobby.id} hobby={hobby} delay={i * 80} />
          ))}
        </div>
      </div>

      <style>{`
        .hbs-section {
          position: relative;
          background: var(--background);
          padding: 5rem 1.5rem 6rem;
          overflow: hidden;
        }

        .hbs-inner {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          gap: 3rem;
        }

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

        /* 2×2 grid */
        .hbs-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.25rem;
        }
        @media (max-width: 640px) {
          .hbs-grid { grid-template-columns: 1fr; }
          .hbs-heading-row { flex-direction: column; align-items: flex-start; }
        }

        /* Canvas */
        .hbs-canvas {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          display: block;
        }
      `}</style>
    </section>
  );
}

/* ─────────────────────────────────────────────
   Cycling background — slowly transitions
   between each hobby's canvas animation
───────────────────────────────────────────── */
function CyclingBackground({ hobbies }: { hobbies: HobbyData[] }) {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setIdx((p) => (p + 1) % hobbies.length);
    }, 6000);
    return () => clearInterval(t);
  }, [hobbies.length]);

  const h = hobbies[idx];
  const Canvas = BG_CANVAS[h.id];

  return (
    <div className="hbs-bg-wrap" key={h.id}>
      {Canvas && <Canvas />}
      {/* Gradient: opaque top→transparent center→opaque bottom */}
      <div
        className="hbs-bg-fade"
        style={{
          background: `linear-gradient(
            to bottom,
            var(--background) 0%,
            transparent 28%,
            transparent 72%,
            var(--background) 100%
          )`,
        }}
      />
      {/* Subtle color wash */}
      <div className="hbs-bg-tint" style={{ background: `${h.color}05` }} />

      <style>{`
        .hbs-bg-wrap {
          position: absolute;
          inset: 0;
          z-index: 0;
          pointer-events: none;
          animation: hbs-fade-in 1.2s ease;
        }
        @keyframes hbs-fade-in {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        .hbs-bg-fade {
          position: absolute;
          inset: 0;
          z-index: 1;
        }
        .hbs-bg-tint {
          position: absolute;
          inset: 0;
          z-index: 0;
          transition: background 1.5s ease;
        }
      `}</style>
    </div>
  );
}
