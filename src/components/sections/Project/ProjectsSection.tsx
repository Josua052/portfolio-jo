"use client";

import { useRef } from "react";
import Link from "next/link";
import { PROJECTS, STATUS_CONFIG, Project } from "@/data/projects";
import { motion, useScroll, useTransform } from "framer-motion";
import { ExternalLink, ArrowRight } from "lucide-react";

/* ─────────────────────────────────────────────
   Timeline Node Component
───────────────────────────────────────────── */
function TimelineNode({
  project,
  yPos,
  isRightNode,
}: {
  project: Project;
  yPos: number;
  isRightNode: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);

  // Track the card entering the viewport
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 85%", "start 40%"],
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const dotScale = useTransform(scrollYProgress, [0.8, 1], [0, 1]);

  const status = STATUS_CONFIG[project.status];

  return (
    <>
      {/* ── Glowing Dot on the SVG Line ── */}
      <motion.div
        className="proj-curve-dot"
        style={{
          "--desktop-left": `${isRightNode ? 75 : 25}%`,
          "--mobile-left": `${isRightNode ? 15 : 8}%`,
          top: `${yPos}%`,
          scale: dotScale,
        } as any}
      >
        <div className="proj-curve-dot-inner" />
      </motion.div>

      {/* ── The Project Card ── */}
      <motion.div
        ref={ref}
        className={`proj-curve-card-wrap ${isRightNode ? "proj-pos-left" : "proj-pos-right"}`}
        style={{
          top: `${yPos}%`,
          opacity,
          scale,
        }}
      >
        <div className={`proj-curve-card ${project.status === "live" ? "proj-card-live" : ""}`}>
          
          <div className="proj-curve-header">
            <div className="proj-curve-index">{project.index}</div>
            <div className="proj-curve-meta">
              <span className="proj-curve-cat">{project.category}</span>
              <div className="proj-status-badge">
                <span
                  className="proj-status-dot"
                  style={{ background: status.dot }}
                />
                <span style={{ color: status.color }}>{status.label}</span>
              </div>
            </div>
          </div>

          <h3 className="proj-curve-title">{project.title}</h3>
          <p className="proj-curve-subtitle">{project.subtitle}</p>

          <div className="proj-curve-company">
            <strong>{project.company}</strong>
          </div>

          <ul className="proj-curve-points">
            {project.description.slice(0, 3).map((pt, idx) => (
              <li key={idx}>
                <ArrowRight size={16} className="proj-point-icon" />
                <span>{pt}</span>
              </li>
            ))}
          </ul>

          <div className="proj-curve-footer">
            <div className="proj-curve-tags">
              {project.tech.slice(0, 4).map((t) => (
                <span key={t} className="proj-curve-tag">{t}</span>
              ))}
            </div>

            {project.url && (
              <Link href={project.url} target="_blank" className="proj-curve-link">
                Visit <ExternalLink size={14} />
              </Link>
            )}
          </div>
        </div>
      </motion.div>
    </>
  );
}

/* ─────────────────────────────────────────────
   Section: Interactive SVG Curving
───────────────────────────────────────────── */
export default function ProjectsSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Global scroll tracker for the glowing SVG line
  const { scrollYProgress: lineProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end 80%"],
  });

  // Calculate mathematically flawless bezier curves dynamically
  const N = PROJECTS.length;
  // Use 10% and 90% bounds to ensure the first and last cards don't bleed out of the massive container
  const startY = 10;
  const endY = 90;
  const stepY = (endY - startY) / (N - 1 || 1);

  let dDesktop = `M 50 0 `;
  let dMobile = `M 15 0 `;

  const nodePositions = PROJECTS.map((project, i) => {
    const y = startY + i * stepY;
    const isRightNode = i % 2 === 0;

    // Desktop Path calculation
    const targetXDesktop = isRightNode ? 75 : 25;
    const prevXDesktop = i === 0 ? 50 : isRightNode ? 25 : 75;
    const prevY = i === 0 ? 0 : startY + (i - 1) * stepY;
    const midY = (y + prevY) / 2;

    dDesktop += `C ${prevXDesktop} ${midY}, ${targetXDesktop} ${midY}, ${targetXDesktop} ${y} `;

    // Mobile Path calculation
    const targetXMobile = isRightNode ? 15 : 8;
    const prevXMobile = i === 0 ? 15 : isRightNode ? 8 : 15;
    dMobile += `C ${prevXMobile} ${midY}, ${targetXMobile} ${midY}, ${targetXMobile} ${y} `;

    return { y, isRightNode };
  });

  // Final segment to bottom
  const finalXDesktop = N % 2 !== 0 ? 75 : 25;
  dDesktop += `C ${finalXDesktop} 98, 50 98, 50 100`;

  const finalXMobile = N % 2 !== 0 ? 15 : 8;
  dMobile += `C ${finalXMobile} 98, 15 98, 15 100`;

  return (
    <section className="proj-curve-section">
      <div className="container-custom">
        {/* ── Header ── */}
        <div className="proj-curve-intro">
          <p className="proj-eyebrow">/ the journey</p>
          <div className="proj-curve-title-row">
            <h2 className="proj-heading">
              Selected <span className="proj-heading-outline">Timeline</span>
            </h2>
            <p className="proj-heading-sub">
              Tracing the path of digital creations, architectures, and robust platforms over the years.
            </p>
          </div>
        </div>

        {/* ── Interactive Timeline Container ── */}
        <div 
          ref={containerRef} 
          className="proj-curve-container"
          // Dynamically scale height based on number of projects so they NEVER overlap vertically
          // 120vh per project guarantees massive vertical breathing room.
          style={{ height: `${Math.max(400, PROJECTS.length * 120)}vh` }}
        >
          
          {/* SVG Canvas */}
          <div className="proj-svg-wrapper">
            
            {/* Desktop SVG */}
            <svg className="proj-svg-desktop" viewBox="0 0 100 100" preserveAspectRatio="none">
              {/* Faded background path */}
              <path d={dDesktop} className="proj-svg-bg" />
              {/* Animated glowing path */}
              <motion.path
                d={dDesktop}
                className="proj-svg-glow"
                style={{ pathLength: lineProgress }}
              />
            </svg>

            {/* Mobile SVG */}
            <svg className="proj-svg-mobile" viewBox="0 0 100 100" preserveAspectRatio="none">
              {/* Faded background path */}
              <path d={dMobile} className="proj-svg-bg" />
              {/* Animated glowing path */}
              <motion.path
                d={dMobile}
                className="proj-svg-glow"
                style={{ pathLength: lineProgress }}
              />
            </svg>

          </div>

          {/* Cards & Dots */}
          {PROJECTS.map((project, i) => (
            <TimelineNode
              key={project.index}
              project={project}
              yPos={nodePositions[i].y}
              isRightNode={nodePositions[i].isRightNode}
            />
          ))}

        </div>
      </div>

      <style>{`
        /* ── Core Layout ── */
        .proj-curve-section {
          background: var(--background);
          color: var(--foreground);
          padding: 6rem 0 10rem 0;
          overflow: hidden;
        }

        /* ── Intro ── */
        .proj-curve-intro {
          margin-bottom: 6rem;
        }
        .proj-eyebrow {
          font-family: var(--font-poppins), sans-serif;
          font-size: 0.8rem;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--muted);
          margin-bottom: 1.5rem;
        }
        .proj-curve-title-row {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 2rem;
          padding-bottom: 2rem;
          border-bottom: 1px dashed var(--border);
        }
        .proj-heading {
          font-family: var(--font-montserrat), Georgia, serif;
          font-size: clamp(3.5rem, 6vw, 6rem);
          font-weight: 800;
          letter-spacing: -0.02em;
          line-height: 0.95;
          margin: 0;
          color: var(--foreground);
        }
        .proj-heading-outline {
          -webkit-text-stroke: 1.5px var(--foreground);
          color: transparent;
        }
        .proj-heading-sub {
          max-width: 400px;
          font-size: 1.1rem;
          line-height: 1.6;
          color: var(--muted);
          margin: 0;
        }

        /* ── Interactive Timeline ── */
        .proj-curve-container {
          position: relative;
          width: 100%;
          /* Height is set inline dynamically based on number of projects */
        }

        /* ── SVG Wrappers & Paths ── */
        .proj-svg-wrapper {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 0;
        }
        
        .proj-svg-desktop, .proj-svg-mobile {
          width: 100%;
          height: 100%;
          overflow: visible;
        }
        .proj-svg-mobile {
          display: none; /* Hidden on desktop */
        }
        
        .proj-svg-bg {
          fill: none;
          stroke: color-mix(in srgb, var(--border) 50%, transparent);
          stroke-width: 1.5;
          vector-effect: non-scaling-stroke; /* Crucial: prevents stroke distortion */
        }
        
        .proj-svg-glow {
          fill: none;
          stroke: var(--foreground);
          stroke-width: 3;
          stroke-linecap: round;
          vector-effect: non-scaling-stroke; /* Crucial: prevents stroke distortion */
        }

        /* ── Glowing Dots ── */
        .proj-curve-dot {
          position: absolute;
          z-index: 10;
          width: 20px;
          height: 20px;
          transform: translate(-50%, -50%);
          display: flex;
          align-items: center;
          justify-content: center;
          /* Positioning is handled via inline variables */
          left: var(--desktop-left);
        }
        .proj-curve-dot::before {
          content: "";
          position: absolute;
          inset: -10px;
          background: radial-gradient(circle, color-mix(in srgb, var(--foreground) 40%, transparent), transparent 70%);
          border-radius: 50%;
        }
        .proj-curve-dot-inner {
          width: 10px;
          height: 10px;
          background: var(--background);
          border: 2px solid var(--foreground);
          border-radius: 50%;
          position: relative;
          z-index: 2;
          box-shadow: 0 0 15px var(--foreground);
        }

        /* ── Card Wrappers ── */
        .proj-curve-card-wrap {
          position: absolute;
          width: 42%; /* Desktop card width */
          transform: translateY(-50%); /* Center perfectly on the dot */
          z-index: 20;
        }
        /* If node is on the right, card is on the left */
        .proj-pos-left {
          right: 32%; /* Node is at 75%, leaving a nice visual gap */
        }
        /* If node is on the left, card is on the right */
        .proj-pos-right {
          left: 32%; /* Node is at 25% */
        }

        /* ── The Card Design ── */
        .proj-curve-card {
          background: color-mix(in srgb, var(--background) 80%, transparent);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid var(--border);
          border-radius: 20px;
          padding: 2.5rem;
          box-shadow: 0 20px 40px rgba(0,0,0,0.05);
          transition: border-color 0.3s, transform 0.3s;
        }
        .proj-curve-card:hover {
          border-color: color-mix(in srgb, var(--foreground) 30%, transparent);
          transform: translateY(-5px);
        }
        .proj-card-live {
          border-top: 2px solid #22c55e;
        }

        .proj-curve-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
          padding-bottom: 1rem;
          border-bottom: 1px dashed var(--border);
        }
        .proj-curve-index {
          font-family: var(--font-mono), monospace;
          font-size: 1.5rem;
          font-weight: 800;
          color: var(--muted);
        }
        .proj-curve-meta {
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        .proj-curve-cat {
          font-family: var(--font-mono), monospace;
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--muted);
        }
        .proj-status-badge {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.7rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          border: 1px solid var(--border);
          padding: 0.3rem 0.8rem;
          border-radius: 999px;
        }
        .proj-status-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
        }

        .proj-curve-title {
          font-family: var(--font-montserrat), sans-serif;
          font-size: clamp(1.8rem, 2.5vw, 2.5rem);
          font-weight: 800;
          letter-spacing: -0.02em;
          color: var(--foreground);
          margin-bottom: 0.5rem;
        }
        .proj-curve-subtitle {
          font-size: 1rem;
          color: var(--muted);
          line-height: 1.5;
          margin-bottom: 1.5rem;
        }
        .proj-curve-company {
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--foreground);
          margin-bottom: 2rem;
          background: color-mix(in srgb, var(--foreground) 8%, transparent);
          display: inline-block;
          padding: 0.4rem 0.8rem;
          border-radius: 6px;
        }

        .proj-curve-points {
          list-style: none;
          padding: 0;
          margin: 0 0 2rem 0;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .proj-curve-points li {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
          font-size: 0.95rem;
          line-height: 1.6;
          color: var(--muted);
        }
        .proj-point-icon {
          color: var(--foreground);
          flex-shrink: 0;
          margin-top: 0.3rem;
        }

        .proj-curve-footer {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-top: 1rem;
        }
        .proj-curve-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          max-width: 65%;
        }
        .proj-curve-tag {
          font-family: var(--font-mono), monospace;
          font-size: 0.7rem;
          padding: 0.3rem 0.6rem;
          border: 1px solid var(--border);
          border-radius: 6px;
          color: var(--muted);
        }

        .proj-curve-link {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-family: var(--font-mono), monospace;
          font-size: 0.8rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--background);
          background: var(--foreground);
          padding: 0.8rem 1.25rem;
          border-radius: 8px;
          text-decoration: none;
          transition: transform 0.2s;
        }
        .proj-curve-link:hover {
          transform: translateY(-2px);
        }

        /* ── Responsive Mobile ── */
        @media (max-width: 1024px) {
          .proj-curve-card-wrap {
            width: 50%;
          }
          .proj-pos-left { right: 28%; }
          .proj-pos-right { left: 28%; }
        }

        @media (max-width: 768px) {
          /* Swap SVGs */
          .proj-svg-desktop { display: none; }
          .proj-svg-mobile { display: block; }
          
          /* Switch dot coordinates via CSS variables */
          .proj-curve-dot {
            left: var(--mobile-left);
          }

          /* Force all cards to align rightwards on mobile */
          .proj-curve-card-wrap {
            width: 75%;
          }
          .proj-pos-left, .proj-pos-right {
            left: 22%; /* Align all just to the right of the mobile curving line */
            right: auto;
          }

          .proj-curve-card {
            padding: 1.5rem;
          }
          .proj-curve-title {
            font-size: 1.5rem;
          }
          .proj-curve-footer {
            flex-direction: column;
            align-items: flex-start;
            gap: 1.5rem;
          }
          .proj-curve-tags {
            max-width: 100%;
          }
        }
      `}</style>
    </section>
  );
}