"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowDown, Briefcase, MapPin, Calendar, Sparkles } from "lucide-react";

import experiencesData from "@/data/experiences.json";
import { Experience } from "@/types/experience";

const EXPERIENCES = experiencesData as Experience[];

/* ─────────────────────────────────────────────
   Intersection hook for scroll animations
───────────────────────────────────────────── */
function useInView(threshold = 0.4) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        setInView(e.isIntersecting);
      },
      { threshold },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

/* ─────────────────────────────────────────────
   Cinematic Slide Component
───────────────────────────────────────────── */
function CinematicSlide({ exp, index }: { exp: Experience; index: number }) {
  const { ref, inView } = useInView(0.5);

  // Extract a single year from period string (e.g. "Aug 2024 - Present" -> "2024")
  const yearMatch = exp.period.match(/\d{4}/);
  const watermarkText = yearMatch
    ? yearMatch[0]
    : (index + 1).toString().padStart(2, "0");

  return (
    <div className="exp-slide" ref={ref}>
      {/* Giant Watermark Background */}
      <div className={`exp-watermark ${inView ? "in-view" : ""}`}>
        {watermarkText}
      </div>

      <div className="container-custom exp-slide-inner">
        {/* Left Side: Company & Year */}
        <div className={`exp-slide-left ${inView ? "in-view" : ""}`}>
          <div className="exp-company-block">
            {exp.highlight && (
              <span className="exp-current-badge">
                <span className="exp-current-dot" />
                Current Role
              </span>
            )}
            <h2 className="exp-company-name">{exp.company}</h2>
            <div className="exp-meta">
              <span className="exp-meta-item">
                <Calendar size={16} className="inline mr-2 opacity-70" />
                {exp.period}
              </span>
              <span className="exp-meta-item">
                <MapPin size={16} className="inline mr-2 opacity-70" />
                {exp.location}
              </span>
            </div>
          </div>
        </div>

        {/* Right Side: Role & Details */}
        <div className={`exp-slide-right ${inView ? "in-view" : ""}`}>
          <div className="exp-role-block">
            <h3 className="exp-role-title">
              <Briefcase
                size={28}
                className={`inline mr-3 mb-1 ${
                  exp.highlight ? "text-green-500" : "text-[var(--muted)]"
                }`}
              />
              {exp.role}
            </h3>

            <ul className="exp-points-list">
              {exp.points.map((pt, i) => (
                <li key={i} style={{ transitionDelay: `${i * 0.1 + 0.4}s` }}>
                  <span className="exp-point-arrow">→</span>
                  <span>{pt}</span>
                </li>
              ))}
            </ul>

            <div className="exp-tags-cinematic">
              {exp.tags.map((t, i) => (
                <span key={t} style={{ transitionDelay: `${i * 0.05 + 0.6}s` }}>
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Section
───────────────────────────────────────────── */
export default function ExperienceSection() {
  const { ref: introRef, inView: introInView } = useInView(0.5);

  return (
    <section className="exp-snap-container">
      {/* ── Slide 1: Intro Heading ── */}
      <div className="exp-slide exp-slide-intro" ref={introRef}>
        <div className="container-custom">
          <div className={`exp-intro-content ${introInView ? "in-view" : ""}`}>
            <p className="exp-eyebrow">/ experience</p>
            <h1 className="exp-heading">
              Profesional
              <br />
              <span className="exp-heading-outline">Experience</span>
            </h1>
            <p className="exp-heading-sub">
              A journey through my professional growth, projects, and
              contributions in web development and design.
            </p>

            <div className="exp-scroll-indicator">
              <div className="exp-mouse">
                <div className="exp-wheel"></div>
              </div>
              <span>Scroll to explore</span>
              <ArrowDown size={16} className="exp-arrow-bounce" />
            </div>
          </div>
        </div>
      </div>

      {/* ── Slides: Experiences ── */}
      {EXPERIENCES.map((exp, i) => (
        <CinematicSlide key={exp.company + i} exp={exp} index={i} />
      ))}

      <style>{`
        /* ── Container ── */
        .exp-snap-container {
          height: 100vh;
          width: 100%;
          overflow-y: auto;
          scroll-snap-type: y mandatory;
          scroll-behavior: smooth;
          background: var(--background);
          color: var(--foreground);
          /* Hide scrollbar */
          scrollbar-width: none;
          -ms-overflow-style: none;
          position: relative;
          z-index: 20;
        }
        .exp-snap-container::-webkit-scrollbar {
          display: none;
        }

        /* ── Slides ── */
        .exp-slide {
          height: 100vh;
          width: 100%;
          scroll-snap-align: start;
          scroll-snap-stop: always;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        /* ── Intro Slide ── */
        .exp-slide-intro {
          background: radial-gradient(circle at bottom right, rgba(34, 197, 94, 0.05) 0%, transparent 50%);
        }
        
        .exp-intro-content {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          opacity: 0;
          transform: translateY(40px);
          transition: all 1s cubic-bezier(0.2, 0.8, 0.2, 1);
        }
        .exp-intro-content.in-view {
          opacity: 1;
          transform: translateY(0);
        }

        .exp-eyebrow {
          font-size: 0.85rem;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--muted);
        }
        .exp-heading {
          font-family: var(--font-montserrat), Georgia, serif;
          font-size: clamp(2.5rem, 8vw, 7rem);
          font-weight: 800;
          letter-spacing: -0.04em;
          line-height: 0.95;
          color: var(--foreground);
          margin: 0;
        }
        .exp-heading-outline {
          -webkit-text-stroke: 2px var(--foreground);
          color: transparent;
        }
        .exp-heading-sub {
          max-width: 450px;
          font-size: 1.1rem;
          line-height: 1.8;
          color: var(--muted);
          margin-top: 1rem;
        }

        .exp-scroll-indicator {
          margin-top: 4rem;
          display: flex;
          align-items: center;
          gap: 1rem;
          font-family: var(--font-poppins), sans-serif;
          font-size: 0.85rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--muted);
        }
        .exp-mouse {
          width: 24px;
          height: 36px;
          border: 2px solid var(--muted);
          border-radius: 12px;
          position: relative;
        }
        .exp-wheel {
          width: 4px;
          height: 8px;
          background: var(--muted);
          border-radius: 2px;
          position: absolute;
          top: 6px;
          left: 50%;
          transform: translateX(-50%);
          animation: mouseWheel 2s infinite ease-in-out;
        }
        @keyframes mouseWheel {
          0% { top: 6px; opacity: 1; }
          50% { top: 16px; opacity: 0; }
          100% { top: 6px; opacity: 0; }
        }
        .exp-arrow-bounce {
          animation: bounce 2s infinite ease-in-out;
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(5px); }
        }

        /* ── Cinematic Slide ── */
        .exp-watermark {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) scale(0.8);
          font-family: var(--font-montserrat), sans-serif;
          font-size: clamp(8rem, 35vw, 35rem);
          font-weight: 900;
          color: var(--foreground);
          opacity: 0;
          z-index: 0;
          pointer-events: none;
          transition: all 1.2s cubic-bezier(0.2, 0.8, 0.2, 1);
          white-space: nowrap;
        }
        .exp-watermark.in-view {
          opacity: 0.02;
          transform: translate(-50%, -50%) scale(1);
        }
        .dark .exp-watermark.in-view {
          opacity: 0.03;
        }

        .exp-slide-inner {
          position: relative;
          z-index: 10;
          display: flex;
          align-items: center;
          gap: 4rem;
          width: 100%;
          max-width: 1400px;
          padding: 0 2rem;
        }

        /* Split Screen Left */
        .exp-slide-left {
          flex: 1;
          display: flex;
          justify-content: flex-end;
          text-align: right;
          opacity: 0;
          transform: translateX(-50px);
          transition: all 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) 0.2s;
        }
        .exp-slide-left.in-view {
          opacity: 1;
          transform: translateX(0);
        }

        .exp-company-name {
          font-family: var(--font-montserrat), Georgia, serif;
          font-size: clamp(1.5rem, 4vw, 4.5rem);
          font-weight: 800;
          line-height: 1.1;
          color: var(--foreground);
          margin-bottom: 1rem;
        }
        .exp-meta {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          align-items: flex-end;
        }
        .exp-meta-item {
          font-family: var(--font-poppins), sans-serif;
          font-size: 1rem;
          color: var(--muted);
          display: flex;
          align-items: center;
        }

        .exp-current-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.4rem 1rem;
          border-radius: 999px;
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          border: 1px solid rgba(34,197,94,0.3);
          color: #22c55e;
          background: rgba(34,197,94,0.05);
          margin-bottom: 1.5rem;
        }
        .exp-current-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #22c55e;
          box-shadow: 0 0 10px #22c55e;
          animation: pulse-glow 2s infinite;
        }
        @keyframes pulse-glow {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.2); }
        }

        /* Split Screen Right */
        .exp-slide-right {
          flex: 1.2;
          padding-left: 4rem;
          border-left: 2px solid color-mix(in srgb, var(--border) 50%, transparent);
          opacity: 0;
          transform: translateX(50px);
          transition: all 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) 0.3s;
        }
        .exp-slide-right.in-view {
          opacity: 1;
          transform: translateX(0);
        }

        .exp-role-title {
          font-family: var(--font-montserrat), sans-serif;
          font-size: clamp(1.2rem, 2.5vw, 2.5rem);
          font-weight: 700;
          color: var(--foreground);
          margin-bottom: 2.5rem;
          line-height: 1.2;
        }

        .exp-points-list {
          list-style: none;
          padding: 0;
          margin: 0 0 3rem 0;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        .exp-points-list li {
          display: flex;
          gap: 1.25rem;
          align-items: flex-start;
          font-size: 1.1rem;
          line-height: 1.7;
          color: var(--muted);
          opacity: 0;
          transform: translateY(15px);
          transition: all 0.5s ease;
        }
        .exp-slide-right.in-view .exp-points-list li {
          opacity: 1;
          transform: translateY(0);
        }
        .exp-point-arrow {
          color: #22c55e;
          font-weight: bold;
          font-size: 1.25rem;
          margin-top: -2px;
        }

        .exp-tags-cinematic {
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem;
        }
        .exp-tags-cinematic span {
          padding: 0.5rem 1.2rem;
          border-radius: 100px;
          background: color-mix(in srgb, var(--foreground) 5%, transparent);
          color: var(--foreground);
          font-family: var(--font-poppins), sans-serif;
          font-size: 0.8rem;
          font-weight: 600;
          letter-spacing: 0.05em;
          border: 1px solid color-mix(in srgb, var(--border) 50%, transparent);
          opacity: 0;
          transform: scale(0.9);
          transition: all 0.4s ease;
        }
        .exp-slide-right.in-view .exp-tags-cinematic span {
          opacity: 1;
          transform: scale(1);
        }
        .exp-tags-cinematic span:hover {
          background: var(--foreground);
          color: var(--background);
          transform: translateY(-3px) !important;
        }

        /* ── Responsive Mobile ── */
        @media (max-width: 1023px) {
          .exp-slide-inner {
            flex-direction: column;
            text-align: left;
            gap: 2.5rem;
            justify-content: center;
          }
          
          .exp-slide-left {
            text-align: left;
            justify-content: flex-start;
            width: 100%;
            transform: translateY(-30px);
          }
          .exp-slide-left.in-view {
            transform: translateY(0);
          }
          .exp-meta {
            align-items: flex-start;
          }

          .exp-slide-right {
            padding-left: 0;
            border-left: none;
            width: 100%;
            transform: translateY(30px);
          }
          .exp-slide-right.in-view {
            transform: translateY(0);
          }
          
          .exp-role-title {
            margin-bottom: 1.5rem;
          }
          .exp-points-list li {
            font-size: 0.9rem;
            gap: 1rem;
          }
          .exp-heading-sub { font-size: 0.85rem; }
        }
      `}</style>
    </section>
  );
}
