"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { Github, Instagram, Linkedin, ArrowUpRight, MapPin } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { LifeSeconds } from "./LifeSeconds";
import LiveTime from "@/components/ui/LiveTime";

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollY } = useScroll();
  const opacityScroll = useTransform(scrollY, [0, 600], [1, 0]);
  const yUpScroll = useTransform(scrollY, [0, 600], [0, -100]);
  const xLeftScroll = useTransform(scrollY, [0, 600], [0, -100]);
  const xRightScroll = useTransform(scrollY, [0, 600], [0, 100]);
  const yDownScroll = useTransform(scrollY, [0, 600], [0, 100]);
  const scaleDownScroll = useTransform(scrollY, [0, 600], [1, 0.85]);



  // Parallax effect on mouse move
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const handleMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 40;
      const y = (e.clientY / innerHeight - 0.5) * 40;
      el.style.setProperty("--mx", `${x}px`);
      el.style.setProperty("--my", `${y}px`);
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);


  return (
    <section
      ref={containerRef}
      className="hero-section"
      style={{ "--mx": "0px", "--my": "0px" } as React.CSSProperties}
    >
      {/* ── Background Decor ── */}
      <div className="hero-bg-grid" aria-hidden />
      <div className="hero-orb hero-orb-1" aria-hidden />
      <div className="hero-orb hero-orb-2" aria-hidden />
      <div className="hero-noise" aria-hidden />

      {/* ── Huge Background Name ── */}
      <div className="hero-bg-text-wrapper" aria-hidden>
        <motion.div style={{ opacity: opacityScroll, y: yUpScroll }} className="flex flex-col items-center">
          <motion.div
            className="flex flex-col items-center css-animate-fade-in"
          >
            <h1 className="flex flex-col items-center m-0">
              <span className="hero-bg-text hero-bg-text-outline">Josua</span>
              <span className="hero-bg-text">Ronaldo</span>
            </h1>
          </motion.div>
        </motion.div>
      </div>

      {/* ── Central Character (Anchored to the very bottom) ── */}
      <div className="hero-character-anchor">
        <motion.div style={{ opacity: opacityScroll, scale: scaleDownScroll, y: yDownScroll }} className="w-full h-full flex justify-center items-end">
          <motion.div
            className="w-full h-full flex justify-center items-end css-animate-slide-up"
          >
            <Image
              src="/images/dashboard/me.png"
              alt="Josua Ronaldo"
              width={600}
              height={900}
              className="hero-character-img"
              priority
            />
          </motion.div>
        </motion.div>
        {/* Subtle fade at the absolute bottom edge just in case */}
        <div className="hero-character-bottom-fade" />
      </div>

      {/* ── Dynamic Content Layer ── */}
      <div className="hero-content-layer">
        
        {/* Left Side: About Panel */}
        <motion.div className="hero-panel-left" style={{ opacity: opacityScroll, x: xLeftScroll }}>
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            <div className="hero-glass-panel">
            <div className="flex items-center justify-between mb-4 hero-about-header">
              <span className="hero-label">/ about</span>
            </div>
            <p className="hero-about-text">
              Currently <span className="hero-card-highlight"><LifeSeconds /></span> lifetime. 
              A software developer guided by a strong IT philosophy across <strong>UI/UX Design</strong>, <strong>Business Analysis</strong>, and <strong>Frontend Development</strong>.
            </p>
            </div>
          </motion.div>
        </motion.div>

        {/* Right Side: Status & CTA */}
        <motion.div className="hero-panel-right" style={{ opacity: opacityScroll, x: xRightScroll }}>
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="flex flex-col items-end w-full"
          >
            <div className="hero-status-pill mb-8">
            <span className="status-dot status-dot-green" /> Open to work
          </div>
          
          <Link
            href="https://drive.google.com/file/d/1Tyqtqpr_NVBmf9WHje12vDTNDUm8aovW/preview"
            target="_blank"
            className="hero-cta-button group"
          >
            <span className="relative z-10 flex items-center gap-2">
              Get Resume <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </span>
            <div className="hero-cta-glow"></div>
            </Link>
          </motion.div>
        </motion.div>

      </div>

      {/* ── Bottom Floating Dock ── */}
      <motion.div 
        style={{ opacity: opacityScroll, y: yDownScroll, position: 'absolute', bottom: '2.5rem', left: 0, right: 0, margin: '0 auto', width: 'max-content', zIndex: 30 }}
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          className="hero-bottom-dock"
          style={{ position: 'relative', bottom: 'auto' }}
        >
          <div className="dock-item">
          <MapPin size={18} className="text-blue-500" />
          <span>Jakarta, ID</span>
        </div>
        <div className="dock-divider" />
        <div className="dock-item">
          <span className="text-blue-500 font-medium"><LiveTime /> WIB</span>
        </div>
        <div className="dock-divider" />
        <div className="dock-socials">
          <Link href="https://www.instagram.com/josua_ronaldo_/" target="_blank" className="dock-social-link" aria-label="Instagram">
            <Instagram size={18} />
          </Link>
          <Link href="https://www.linkedin.com/in/josua-ronaldo/" target="_blank" className="dock-social-link" aria-label="LinkedIn">
            <Linkedin size={18} />
          </Link>
          <Link href="https://github.com/Josua052" target="_blank" className="dock-social-link" aria-label="GitHub">
            <Github size={18} />
          </Link>
        </div>
        </motion.div>
      </motion.div>

      <style>{`
        /* ── Base ── */
        .hero-section {
          position: relative;
          width: 100%;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          background: var(--background);
        }

        /* ── Decor ── */
        .hero-bg-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(var(--border) 1px, transparent 1px),
            linear-gradient(90deg, var(--border) 1px, transparent 1px);
          background-size: 60px 60px;
          opacity: 0.3;
          mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 20%, transparent 100%);
        }

        .hero-noise {
          position: absolute;
          inset: 0;
          opacity: 0.025;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
          pointer-events: none;
          z-index: 50; /* Add slight noise over everything */
        }

        .hero-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(90px);
          opacity: 0.15;
          pointer-events: none;
          transform: translate(calc(var(--mx) * 1.2), calc(var(--my) * 1.2));
          transition: transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        .hero-orb-1 { width: 500px; height: 500px; top: -10%; right: 5%; background: #6366f1; }
        .hero-orb-2 { width: 450px; height: 450px; bottom: 0%; left: 5%; background: #0ea5e9; }

        /* ── Huge BG Text ── */
        .hero-bg-text-wrapper {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          pointer-events: none;
          z-index: 2;
          transform: translate(calc(var(--mx) * -0.4), calc(var(--my) * -0.4));
          transition: transform 0.2s ease-out;
        }

        .css-animate-fade-in {
          animation: fadeInScale 1.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .css-animate-slide-up {
          animation: slideUpScale 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        @keyframes fadeInScale {
          0% { opacity: 0; transform: scale(1.2); }
          100% { opacity: 1; transform: scale(1); }
        }

        @keyframes slideUpScale {
          0% { opacity: 0; transform: translateY(80px) scale(0.95); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }

        .hero-bg-text {
          font-family: var(--font-montserrat), sans-serif;
          font-size: clamp(6rem, 20vw, 22rem);
          font-weight: 900;
          line-height: 0.8;
          letter-spacing: -0.04em;
          text-transform: uppercase;
          color: var(--foreground);
          opacity: 0.03;
          white-space: nowrap;
          margin: 0;
        }

        .hero-bg-text-outline {
          -webkit-text-stroke: 2px var(--foreground);
          color: transparent;
          opacity: 0.08;
        }

        /* ── Character Anchor ── */
        .hero-character-anchor {
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          z-index: 10; /* Behind content but in front of background */
          width: 100%;
          max-width: 600px;
          height: 85vh; /* Extends from bottom up to 85% of screen */
          display: flex;
          justify-content: center;
          align-items: flex-end;
          pointer-events: none;
        }

        .hero-character-img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          object-position: bottom;
          filter: drop-shadow(0 20px 40px rgba(0,0,0,0.6));
          transform: translate(calc(var(--mx) * 0.3), calc(var(--my) * 0.3));
          transition: transform 0.2s ease-out;
        }

        .hero-character-bottom-fade {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 10vh;
          background: linear-gradient(to top, var(--background) 0%, transparent 100%);
          z-index: 11;
        }

        /* ── Dynamic Content Layer ── */
        .hero-content-layer {
          position: relative;
          z-index: 20; /* Overlaps character */
          width: 100%;
          max-width: 1400px;
          height: 100vh;
          margin: 0 auto;
          padding: 0 4rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          pointer-events: none; /* Let clicks pass through empty space */
        }

        .hero-panel-left {
          pointer-events: auto;
          flex: 1;
          max-width: 460px;
          margin-top: 40px; /* Slightly lower for asymmetrical look */
        }

        .hero-panel-right {
          pointer-events: auto;
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          margin-top: -80px; /* Slightly higher */
        }

        /* ── Left: About Panel ── */
        .hero-glass-panel {
          padding: 2.5rem;
          border-radius: 32px;
          border: 1px solid rgba(255, 255, 255, 0.08);
          background: color-mix(in srgb, var(--background) 65%, transparent);
          backdrop-filter: blur(24px);
          box-shadow: 
            0 20px 50px -10px rgba(0,0,0,0.15),
            inset 0 1px 0 rgba(255,255,255,0.05);
          transition: transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94), border-color 0.3s ease;
        }

        .hero-glass-panel:hover {
          transform: translateY(-8px);
          border-color: rgba(99,102,241,0.3);
        }

        .hero-label {
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--muted);
        }

        .hero-about-text {
          font-size: 1.1rem; /* Reduced font size for desktop */
          line-height: 1.8;
          color: var(--foreground);
        }

        .hero-card-highlight {
          font-weight: 700;
          color: var(--foreground);
          font-variant-numeric: tabular-nums;
        }

        /* ── Right: Status & CTA ── */
        .hero-status-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1.25rem;
          border-radius: 99px;
          font-size: 0.85rem;
          font-weight: 600;
          border: 1px solid rgba(255, 255, 255, 0.1);
          background: color-mix(in srgb, var(--background) 80%, transparent);
          backdrop-filter: blur(12px);
          box-shadow: 0 10px 30px -10px rgba(0,0,0,0.1);
        }

        .status-dot { width: 10px; height: 10px; border-radius: 50%; }
        .status-dot-green { background: #22c55e; box-shadow: 0 0 0 3px rgba(34,197,94,0.2); animation: pulse-dot 2s infinite; }
        @keyframes pulse-dot {
          0%, 100% { box-shadow: 0 0 0 3px rgba(34,197,94,0.2); }
          50% { box-shadow: 0 0 0 6px rgba(34,197,94,0.1); }
        }

        .hero-cta-button {
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 0.5rem 1.25rem;
          border-radius: 99px;
          font-size: 0.85rem;
          font-weight: 600;
          background: var(--foreground);
          color: var(--background);
          overflow: hidden;
          transition: transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94), box-shadow 0.3s ease;
          box-shadow: 0 15px 35px -5px rgba(0,0,0,0.25);
        }

        .hero-cta-button:hover {
          transform: translateY(-4px) scale(1.02);
          box-shadow: 0 20px 40px -5px rgba(0,0,0,0.3);
        }

        .hero-cta-glow {
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
          transform: translateX(-100%);
          transition: transform 0.6s ease;
        }

        .hero-cta-button:hover .hero-cta-glow {
          transform: translateX(100%);
        }

        /* ── Bottom Dock ── */
        .hero-bottom-dock {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          padding: 0.85rem 2rem;
          border-radius: 99px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          background: color-mix(in srgb, var(--background) 75%, transparent);
          backdrop-filter: blur(24px);
          box-shadow: 0 25px 50px -12px rgba(0,0,0,0.25);
          pointer-events: auto;
        }

        .dock-item {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          font-size: 0.95rem;
          font-weight: 600;
          color: var(--foreground);
        }

        .dock-divider {
          width: 1px;
          height: 24px;
          background: var(--border);
          opacity: 0.5;
        }

        .dock-socials {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .dock-social-link {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 42px;
          height: 42px;
          border-radius: 50%;
          color: var(--muted);
          transition: all 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .dock-social-link:hover {
          color: var(--foreground);
          background: color-mix(in srgb, var(--foreground) 10%, transparent);
          transform: translateY(-3px) scale(1.1);
        }

        /* ── Responsive ── */
        @media (max-width: 1024px) {
          .hero-content-layer {
            display: block; /* Disable flex to use strict absolute positioning */
            padding: 0;
            height: 100vh;
            height: 100dvh;
            position: relative;
          }
          .hero-panel-right {
            position: absolute;
            top: 7rem; /* Under header */
            left: 0; right: 0; margin: 0 auto;
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            z-index: 30;
          }
          .hero-panel-left {
            position: absolute;
            bottom: 11rem; /* Safely above the dock */
            left: 0; right: 0; margin: 0 auto;
            width: 90%;
            max-width: 420px;
            z-index: 30;
          }
          .hero-character-anchor {
            height: 75vh;
            height: 75dvh;
            z-index: 20;
          }
          .hero-glass-panel {
            padding: 1.75rem;
            backdrop-filter: blur(16px);
          }
        }

        @media (max-width: 640px) {
          .hero-bg-text {
            font-size: clamp(4rem, 24vw, 8rem);
          }
          .hero-character-img {
            max-width: 100%;
          }
          .hero-panel-left {
            width: calc(100% - 2rem);
            max-width: 340px; /* Match the dock width */
            bottom: 10.5rem; /* Sit cleanly above the dock without overlap */
          }
          .hero-glass-panel {
            padding: 1.15rem 1.25rem;
            border-radius: 24px; /* Slightly less rounded on mobile */
          }
          .hero-about-header {
            margin-bottom: 0.75rem !important; /* Tighter spacing */
          }
          .hero-label {
            font-size: 0.65rem;
          }
          .hero-about-text {
            font-size: 0.85rem;
            line-height: 1.5;
          }
          .hero-bottom-dock {
            flex-wrap: wrap;
            justify-content: center;
            border-radius: 24px;
            padding: 1rem 1.5rem;
            gap: 1rem;
            width: calc(100% - 2rem);
            max-width: 340px;
          }
          .dock-divider {
            display: none;
          }
        }
      `}</style>
    </section>
  );
}
