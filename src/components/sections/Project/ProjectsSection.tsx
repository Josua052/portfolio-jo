"use client";

import { useState } from "react";
import Link from "next/link";
import { PROJECTS, STATUS_CONFIG, Project } from "@/data/projects";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import { ArrowRight, RotateCcw } from "lucide-react";

/* ─────────────────────────────────────────────
   Section: Interactive Swipe Deck
───────────────────────────────────────────── */
export default function ProjectsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [exitX, setExitX] = useState(0);

  const handleDragEnd = (e: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    // If dragged sufficiently left or right
    if (info.offset.x > 150) {
      setExitX(1000); // Fly off to the right
      setActiveIndex((prev) => prev + 1);
    } else if (info.offset.x < -150) {
      setExitX(-1000); // Fly off to the left
      setActiveIndex((prev) => prev + 1);
    }
  };

  const handleRestart = () => {
    setActiveIndex(0);
    setExitX(0);
  };

  const activeProject = PROJECTS[activeIndex];

  return (
    <section className="proj-swipe-section">
      <div className="container-custom proj-swipe-container">
        
        {/* ── Left Side: Details Panel ── */}
        <div className="proj-swipe-left">
          <div className="proj-swipe-header">
            <p className="proj-eyebrow">/ swipe deck</p>
            <div className="proj-swipe-controls">
              <span>{Math.min(activeIndex + 1, PROJECTS.length)}</span>
              <span className="proj-swipe-divider">/</span>
              <span>{PROJECTS.length}</span>
            </div>
          </div>

          <div className="proj-swipe-details-wrap">
            <AnimatePresence mode="wait">
              {activeProject ? (
                <motion.div
                  key={activeProject.index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="proj-swipe-details"
                >
                  <div className="proj-status-badge">
                    <span
                      className="proj-status-dot"
                      style={{ background: STATUS_CONFIG[activeProject.status].dot }}
                    />
                    <span style={{ color: STATUS_CONFIG[activeProject.status].color }}>
                      {STATUS_CONFIG[activeProject.status].label}
                    </span>
                  </div>

                  <h2 className="proj-swipe-title">{activeProject.title}</h2>
                  <p className="proj-swipe-subtitle">{activeProject.subtitle}</p>
                  
                  <div className="proj-swipe-meta">
                    <div className="proj-meta-item">
                      <span className="proj-meta-label">Client / Company</span>
                      <span className="proj-meta-val">{activeProject.company}</span>
                    </div>
                    <div className="proj-meta-item">
                      <span className="proj-meta-label">Category</span>
                      <span className="proj-meta-val">{activeProject.category}</span>
                    </div>
                  </div>

                  <ul className="proj-swipe-points">
                    {activeProject.description.slice(0, 3).map((pt, i) => (
                      <li key={i}>
                        <ArrowRight size={16} className="proj-point-icon" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="proj-swipe-tags">
                    {activeProject.tech.map((t) => (
                      <span key={t} className="proj-swipe-tag">{t}</span>
                    ))}
                  </div>

                  {activeProject.url && (
                    <Link href={activeProject.url} target="_blank" className="proj-swipe-link">
                      Visit Live Project ↗
                    </Link>
                  )}
                </motion.div>
              ) : (
                <motion.div
                  key="done"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="proj-swipe-done"
                >
                  <h2>You've seen them all!</h2>
                  <p>That was the last project in the deck.</p>
                  <button onClick={handleRestart} className="proj-restart-btn">
                    <RotateCcw size={18} />
                    Shuffle Deck & Restart
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* ── Right Side: Interactive Deck ── */}
        <div className="proj-swipe-right">
          <div className="proj-deck-hint">
            <span>← Swipe to explore →</span>
          </div>

          <div className="proj-deck-wrapper">
            <AnimatePresence>
              {PROJECTS.map((project, index) => {
                // If it's already swiped, don't render it
                if (index < activeIndex) return null;

                const isTop = index === activeIndex;
                const offsetIndex = index - activeIndex;

                // Only render top 3 cards for performance and clean UI
                if (offsetIndex > 2) return null;

                return (
                  <motion.div
                    key={project.index}
                    className={`proj-deck-card ${project.status === "live" ? "proj-card-live" : ""}`}
                    style={{
                      zIndex: PROJECTS.length - index,
                      // The visual watermark index
                      '--card-index': `"${project.index}"`
                    } as any}
                    initial={{ scale: 0.8, opacity: 0, y: 50 }}
                    animate={{
                      scale: 1 - offsetIndex * 0.05,
                      y: offsetIndex * 40,
                      opacity: 1,
                      rotate: offsetIndex === 0 ? 0 : offsetIndex % 2 === 0 ? -2 : 2, // Slight organic tilt for background cards
                    }}
                    exit={{
                      x: exitX,
                      opacity: 0,
                      rotate: exitX > 0 ? 15 : -15, // Tilt wildly when flying off
                      transition: { duration: 0.3 }
                    }}
                    drag={isTop ? "x" : false}
                    dragConstraints={{ left: 0, right: 0 }} // Snap back if not swiped far enough
                    onDragEnd={isTop ? handleDragEnd : undefined}
                    whileDrag={{ 
                      scale: 1.02, 
                      cursor: "grabbing", 
                      boxShadow: "0 30px 60px rgba(0,0,0,0.2)" 
                    }}
                    whileHover={isTop ? { scale: 1.01 } : {}}
                  >
                    <div className="proj-card-inner-watermark" />
                    
                    <div className="proj-card-inner-content">
                      <div className="proj-card-index">{project.index}</div>
                      <h3 className="proj-card-title">{project.title}</h3>
                      <p className="proj-card-cat">{project.category}</p>
                    </div>

                    <div className="proj-card-drag-hint">
                      DRAG ME
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
            
            {/* Empty state placeholder when deck is empty */}
            {activeIndex >= PROJECTS.length && (
              <div className="proj-deck-empty">
                <RotateCcw size={48} className="opacity-20 mb-4" />
                <p>Deck is empty</p>
              </div>
            )}
          </div>
        </div>

      </div>

      <style>{`
        /* ── Core Layout ── */
        .proj-swipe-section {
          background: var(--background);
          color: var(--foreground);
          min-height: 100vh;
          display: flex;
          align-items: center;
          padding: 6rem 0;
          overflow: hidden;
        }

        .proj-swipe-container {
          display: flex;
          gap: 6rem;
          height: 100%;
          min-height: 80vh;
          align-items: center;
        }

        /* ── Left Side (Details) ── */
        .proj-swipe-left {
          flex: 1;
          display: flex;
          flex-direction: column;
          height: 100%;
        }

        .proj-swipe-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 3rem;
          border-bottom: 1px dashed var(--border);
          padding-bottom: 1.5rem;
        }
        .proj-eyebrow {
          font-family: var(--font-mono), monospace;
          font-size: 0.8rem;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--muted);
        }
        .proj-swipe-controls {
          font-family: var(--font-mono), monospace;
          font-size: 1.25rem;
          font-weight: 800;
          color: var(--foreground);
        }
        .proj-swipe-divider {
          color: var(--muted);
          margin: 0 0.5rem;
          font-weight: 400;
        }

        .proj-swipe-details-wrap {
          position: relative;
          flex: 1;
        }

        .proj-swipe-details {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .proj-status-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          background: color-mix(in srgb, var(--foreground) 5%, transparent);
          padding: 0.5rem 1rem;
          border-radius: 4px;
          align-self: flex-start;
        }
        .proj-status-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
        }

        .proj-swipe-title {
          font-family: var(--font-montserrat), sans-serif;
          font-size: clamp(2.5rem, 4vw, 4.5rem);
          font-weight: 800;
          letter-spacing: -0.02em;
          line-height: 1;
          color: var(--foreground);
        }
        .proj-swipe-subtitle {
          font-size: 1.2rem;
          color: var(--muted);
          line-height: 1.6;
        }

        .proj-swipe-meta {
          display: flex;
          gap: 3rem;
          margin-top: 1rem;
          padding: 1.5rem 0;
          border-top: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
        }
        .proj-meta-item {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }
        .proj-meta-label {
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--muted);
        }
        .proj-meta-val {
          font-weight: 600;
          color: var(--foreground);
        }

        .proj-swipe-points {
          list-style: none;
          padding: 0;
          margin: 1rem 0;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .proj-swipe-points li {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
          font-size: 1.05rem;
          line-height: 1.6;
          color: var(--muted);
        }
        .proj-point-icon {
          color: var(--foreground);
          flex-shrink: 0;
          margin-top: 0.3rem;
        }

        .proj-swipe-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.6rem;
          margin: 1.5rem 0;
        }
        .proj-swipe-tag {
          font-family: var(--font-mono), monospace;
          font-size: 0.75rem;
          padding: 0.4rem 1rem;
          border-radius: 100px;
          background: color-mix(in srgb, var(--background) 50%, transparent);
          border: 1px solid var(--border);
          color: var(--muted);
        }

        .proj-swipe-link {
          display: inline-flex;
          align-items: center;
          font-family: var(--font-mono), monospace;
          font-size: 0.85rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--background);
          background: var(--foreground);
          padding: 1rem 2rem;
          border-radius: 6px;
          text-decoration: none;
          align-self: flex-start;
          transition: transform 0.2s;
        }
        .proj-swipe-link:hover {
          transform: translateY(-3px);
        }

        .proj-swipe-done {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: center;
          height: 100%;
          gap: 1rem;
        }
        .proj-swipe-done h2 {
          font-family: var(--font-montserrat), sans-serif;
          font-size: 3rem;
          font-weight: 800;
          color: var(--foreground);
        }
        .proj-swipe-done p {
          font-size: 1.2rem;
          color: var(--muted);
          margin-bottom: 2rem;
        }
        .proj-restart-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
          font-family: var(--font-mono), monospace;
          font-size: 0.9rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--foreground);
          background: transparent;
          border: 1px solid var(--foreground);
          padding: 1rem 2rem;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.2s;
        }
        .proj-restart-btn:hover {
          background: var(--foreground);
          color: var(--background);
        }

        /* ── Right Side (Interactive Deck) ── */
        .proj-swipe-right {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          position: relative;
          height: 100%;
          min-height: 600px;
        }

        .proj-deck-hint {
          position: absolute;
          top: -2rem;
          font-family: var(--font-mono), monospace;
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: var(--muted);
          animation: bounceX 2s infinite ease-in-out;
        }
        @keyframes bounceX {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(10px); }
        }

        .proj-deck-wrapper {
          position: relative;
          width: 100%;
          max-width: 500px;
          height: 650px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* The Card */
        .proj-deck-card {
          position: absolute;
          width: 100%;
          height: 100%;
          background: color-mix(in srgb, var(--background) 80%, var(--foreground));
          border: 1px solid var(--border);
          border-radius: 24px;
          cursor: grab;
          box-shadow: 0 15px 35px rgba(0,0,0,0.05);
          overflow: hidden;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 3rem;
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
        }
        .proj-deck-card:active {
          cursor: grabbing;
        }
        .proj-card-live {
          border-top: 3px solid #22c55e;
        }

        /* Giant Watermark */
        .proj-card-inner-watermark::before {
          content: var(--card-index);
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-family: var(--font-montserrat), sans-serif;
          font-size: 15rem;
          font-weight: 900;
          color: var(--foreground);
          opacity: 0.03;
          pointer-events: none;
        }

        .proj-card-inner-content {
          position: relative;
          z-index: 10;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          margin-top: auto;
          margin-bottom: auto;
        }
        .proj-card-index {
          font-family: var(--font-mono), monospace;
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--muted);
          margin-bottom: 2rem;
          border: 1px solid var(--border);
          border-radius: 50%;
          width: 64px;
          height: 64px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .proj-card-title {
          font-family: var(--font-montserrat), sans-serif;
          font-size: 2.5rem;
          font-weight: 800;
          letter-spacing: -0.02em;
          color: var(--foreground);
          margin-bottom: 1rem;
        }
        .proj-card-cat {
          font-size: 1rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--muted);
        }

        .proj-card-drag-hint {
          position: relative;
          z-index: 10;
          text-align: center;
          font-family: var(--font-mono), monospace;
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.2em;
          color: var(--background);
          background: var(--foreground);
          padding: 1rem;
          border-radius: 12px;
          text-transform: uppercase;
          opacity: 0;
          transition: opacity 0.3s;
        }
        .proj-deck-card:hover .proj-card-drag-hint {
          opacity: 1;
        }

        .proj-deck-empty {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          color: var(--muted);
          font-family: var(--font-mono), monospace;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          font-size: 0.9rem;
        }

        /* ── Responsive ── */
        @media (max-width: 1024px) {
          .proj-swipe-container {
            flex-direction: column;
            gap: 4rem;
            min-height: auto;
          }
          .proj-swipe-left, .proj-swipe-right {
            width: 100%;
          }
          .proj-swipe-right {
            min-height: 500px;
          }
          .proj-deck-wrapper {
            height: 500px;
          }
        }
      `}</style>
    </section>
  );
}