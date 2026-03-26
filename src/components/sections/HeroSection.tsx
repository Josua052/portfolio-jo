"use client";

import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { Github, Instagram, Twitter, ArrowUpRight } from "lucide-react";
import { LifeSeconds } from "./LifeSeconds";

export default function HeroSection() {
  const [time, setTime] = useState<string>("");
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    const updateTime = () => {
      const now = new Date();
      const formatted = now.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      });
      setTime(formatted + " WIB");
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  // Subtle parallax on mouse move
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const handleMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 20;
      const y = (e.clientY / innerHeight - 0.5) * 20;
      el.style.setProperty("--mx", `${x}px`);
      el.style.setProperty("--my", `${y}px`);
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  if (!mounted) return null;

  return (
    <section
      ref={containerRef}
      className="hero-section"
      style={{ "--mx": "0px", "--my": "0px" } as React.CSSProperties}
    >
      {/* Background decoration */}
      <div className="hero-bg-grid" aria-hidden />
      <div className="hero-orb hero-orb-1" aria-hidden />
      <div className="hero-orb hero-orb-2" aria-hidden />
      <div className="hero-noise" aria-hidden />

      <div className="hero-inner">
        {/* Top row: status + social */}
        <div className="hero-top-row">
          <div className="hero-status-group">
            <span className="badge hero-badge-available">
              <span className="status-dot status-dot-green" />
              Open to work
            </span>
            <span className="badge hero-badge-time">
              <span className="status-dot status-dot-blue" />
              {time}
            </span>
          </div>

          <div className="hero-social-row">
            <Link
              href="https://www.instagram.com/josua_ronaldo_/"
              target="_blank"
              className="hero-social-link"
              aria-label="Instagram"
            >
              <Instagram size={16} />
            </Link>
            <Link
              href="#"
              target="_blank"
              className="hero-social-link"
              aria-label="Twitter"
            >
              <Twitter size={16} />
            </Link>
            <Link
              href="https://github.com/Josua052"
              target="_blank"
              className="hero-social-link"
              aria-label="GitHub"
            >
              <Github size={16} />
            </Link>
          </div>
        </div>

        {/* Main content */}
        <div className="hero-content">
          {/* Left: typography block */}
          <div className="hero-left">
            <p className="hero-eyebrow">Software Developer · Jakarta, ID</p>

            <h1 className="hero-title">
              <span className="hero-title-line hero-title-line-1">Josua</span>
              <span className="hero-title-line hero-title-line-2">Ronaldo</span>
              <span className="hero-title-line hero-title-line-3 hero-title-outline">
                Pandiangan
              </span>
            </h1>

            <div className="hero-cta-group">
              <Link
                href="https://drive.google.com/file/d/1NIL0NBRAFaNe07HS3obsMMvdeI4nHxes/preview"
                target="_blank"
                className="hero-cta-primary"
              >
                Get Resume
                <ArrowUpRight size={16} />
              </Link>
              <Link href="/about" className="hero-cta-secondary">
                About Me
              </Link>
            </div>
          </div>

          {/* Right: description card */}
          <div className="hero-right">
            <div className="hero-card">
              <div className="hero-card-label">/ about</div>
              <p className="hero-card-text">
                Currently{" "}
                <span className="hero-card-highlight">
                  <LifeSeconds />
                </span>{" "}
                lifetime. A software developer who thinks a lot about{" "}
                <strong>code, culture,</strong> and how people connect in this
                messy digital world.
              </p>
              <div className="hero-card-divider" />
              <div className="hero-card-stack">
                {["React", "Next.js", "TypeScript", "Node.js"].map((tech) => (
                  <span key={tech} className="hero-tag">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Floating accent number */}
            <div className="hero-accent-number" aria-hidden>
              01
            </div>
          </div>
        </div>

        {/* Bottom scroll indicator */}
        <div className="hero-scroll-indicator" aria-hidden>
          <span className="hero-scroll-line" />
          <span className="hero-scroll-text">scroll</span>
        </div>
      </div>

      <style>{`
        /* ── Hero wrapper ── */
        .hero-section {
          position: relative;
          width: 100%;
          min-height: 100vh;
          display: flex;
          align-items: center;
          overflow: hidden;
          background: var(--background);
        }

        .hero-inner {
          position: relative;
          z-index: 1;
          width: 100%;
          max-width: 1280px;
          margin: 0 auto;
          padding: 7rem 2rem 4rem;
          display: flex;
          flex-direction: column;
          gap: 3rem;
        }

        /* ── Background decorations ── */
        .hero-bg-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(var(--border) 1px, transparent 1px),
            linear-gradient(90deg, var(--border) 1px, transparent 1px);
          background-size: 60px 60px;
          opacity: 0.35;
          mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%);
        }

        .hero-noise {
          position: absolute;
          inset: 0;
          opacity: 0.025;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
          pointer-events: none;
        }

        .hero-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          opacity: 0.12;
          pointer-events: none;
          transform: translate(var(--mx), var(--my));
          transition: transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .hero-orb-1 {
          width: 600px;
          height: 600px;
          top: -150px;
          right: -100px;
          background: radial-gradient(circle, #6366f1 0%, transparent 70%);
        }

        .hero-orb-2 {
          width: 400px;
          height: 400px;
          bottom: 0;
          left: -80px;
          background: radial-gradient(circle, #0ea5e9 0%, transparent 70%);
          transform: translate(calc(var(--mx) * -0.5), calc(var(--my) * -0.5));
        }

        /* ── Top row ── */
        .hero-top-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 1rem;
          animation: fadeSlideUp 0.6s ease both;
        }

        .hero-status-group {
          display: flex;
          gap: 0.625rem;
          flex-wrap: wrap;
        }

        .hero-badge-available,
        .hero-badge-time {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.35rem 0.875rem;
          border-radius: 9999px;
          font-size: 0.75rem;
          font-weight: 500;
          border: 1px solid var(--border);
          color: var(--foreground);
          background: var(--background);
          letter-spacing: 0.01em;
        }

        .status-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          flex-shrink: 0;
        }

        .status-dot-green {
          background: #22c55e;
          box-shadow: 0 0 0 3px rgba(34,197,94,0.2);
          animation: pulse-dot 2s infinite;
        }

        .status-dot-blue {
          background: #3b82f6;
        }

        @keyframes pulse-dot {
          0%, 100% { box-shadow: 0 0 0 3px rgba(34,197,94,0.2); }
          50%       { box-shadow: 0 0 0 5px rgba(34,197,94,0.1); }
        }

        .hero-social-row {
          display: flex;
          gap: 0.5rem;
        }

        .hero-social-link {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          border-radius: 10px;
          border: 1px solid var(--border);
          color: var(--muted);
          transition: color 0.2s, background 0.2s, border-color 0.2s, transform 0.2s;
        }

        .hero-social-link:hover {
          color: var(--foreground);
          background: var(--hover);
          transform: translateY(-2px);
        }

        /* ── Main content ── */
        .hero-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 3rem;
          align-items: center;
        }

        @media (max-width: 768px) {
          .hero-content {
            grid-template-columns: 1fr;
            gap: 2.5rem;
          }
        }

        /* ── Left block ── */
        .hero-left {
          display: flex;
          flex-direction: column;
          gap: 2rem;
          animation: fadeSlideUp 0.7s 0.1s ease both;
        }

        .hero-eyebrow {
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--muted);
        }

        .hero-title {
          display: flex;
          flex-direction: column;
          line-height: 0.9;
          margin: 0;
          gap: 0.1em;
        }

        .hero-title-line {
          display: block;
          font-family: var(--font-montserrat), Georgia, serif;
          font-weight: 800;
          letter-spacing: -0.03em;
          color: var(--foreground);
        }

        .hero-title-line-1 { font-size: clamp(3.5rem, 8vw, 7rem); }
        .hero-title-line-2 { font-size: clamp(3.5rem, 8vw, 7rem); }
        .hero-title-line-3 {
          font-size: clamp(2.2rem, 5vw, 4.5rem);
          margin-left: 0.05em;
        }

        .hero-title-outline {
          -webkit-text-stroke: 1.5px var(--foreground);
          color: transparent;
        }

        .hero-cta-group {
          display: flex;
          gap: 0.875rem;
          flex-wrap: wrap;
        }

        .hero-cta-primary {
          display: inline-flex;
          align-items: center;
          gap: 0.375rem;
          padding: 0.7rem 1.375rem;
          border-radius: 10px;
          font-size: 0.875rem;
          font-weight: 600;
          background: var(--primary);
          color: var(--background);
          transition: opacity 0.2s, transform 0.2s;
          letter-spacing: 0.01em;
        }

        .hero-cta-primary:hover {
          opacity: 0.85;
          transform: translateY(-1px);
        }

        .hero-cta-secondary {
          display: inline-flex;
          align-items: center;
          padding: 0.7rem 1.375rem;
          border-radius: 10px;
          font-size: 0.875rem;
          font-weight: 500;
          border: 1px solid var(--border);
          color: var(--foreground);
          background: transparent;
          transition: background 0.2s, transform 0.2s;
        }

        .hero-cta-secondary:hover {
          background: var(--hover);
          transform: translateY(-1px);
        }

        /* ── Right card ── */
        .hero-right {
          position: relative;
          animation: fadeSlideUp 0.7s 0.2s ease both;
        }

        .hero-card {
          position: relative;
          padding: 2rem;
          border-radius: 1.25rem;
          border: 1px solid var(--border);
          background: var(--background);
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          backdrop-filter: blur(12px);
          box-shadow:
            0 4px 24px rgba(0,0,0,0.06),
            inset 0 1px 0 rgba(255,255,255,0.04);
        }

        .hero-card::before {
          content: '';
          position: absolute;
          inset: -1px;
          border-radius: inherit;
          background: linear-gradient(135deg, var(--border), transparent 60%);
          mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          mask-composite: exclude;
          padding: 1px;
          pointer-events: none;
        }

        .hero-card-label {
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--muted);
        }

        .hero-card-text {
          font-size: 1rem;
          line-height: 1.75;
          color: var(--muted);
        }

        .hero-card-highlight {
          font-weight: 600;
          color: var(--foreground);
          font-variant-numeric: tabular-nums;
          font-feature-settings: "tnum";
        }

        .hero-card-divider {
          height: 1px;
          background: var(--border);
        }

        .hero-card-stack {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .hero-tag {
          padding: 0.25rem 0.75rem;
          border-radius: 6px;
          font-size: 0.75rem;
          font-weight: 500;
          border: 1px solid var(--border);
          color: var(--muted);
          background: var(--secondary);
          transition: color 0.2s, background 0.2s;
        }

        .hero-tag:hover {
          color: var(--foreground);
          background: var(--hover);
        }

        .hero-accent-number {
          position: absolute;
          top: -1.5rem;
          right: -1rem;
          font-family: var(--font-montserrat), serif;
          font-size: 6rem;
          font-weight: 900;
          letter-spacing: -0.05em;
          line-height: 1;
          color: var(--border);
          pointer-events: none;
          user-select: none;
          z-index: -1;
        }

        /* ── Scroll indicator ── */
        .hero-scroll-indicator {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          animation: fadeSlideUp 0.7s 0.4s ease both;
        }

        .hero-scroll-line {
          display: block;
          width: 1px;
          height: 40px;
          background: linear-gradient(to bottom, var(--foreground), transparent);
          animation: scroll-line 1.8s ease-in-out infinite;
        }

        @keyframes scroll-line {
          0%   { transform: scaleY(0); transform-origin: top; }
          50%  { transform: scaleY(1); transform-origin: top; }
          51%  { transform: scaleY(1); transform-origin: bottom; }
          100% { transform: scaleY(0); transform-origin: bottom; }
        }

        .hero-scroll-text {
          font-size: 0.65rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--muted);
        }

        /* ── Entrance animation ── */
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}
