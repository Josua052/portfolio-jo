"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import GalleryCard from "./GalleryCard";
import { DesignProject } from "@/types/gallery-editing";
import galleryData from "@/data/galleryEditing.json";

const PROJECTS = galleryData as DesignProject[];
const ALL_CATEGORIES = [
  "All",
  ...Array.from(new Set(PROJECTS.map((p) => p.category))),
];

/* ─────────────────────────────────────────────
   Bento Style Apple Modal
───────────────────────────────────────────── */
function ProjectModal({
  project,
  onClose,
}: {
  project: DesignProject;
  onClose: () => void;
}) {
  const [imgIndex, setImgIndex] = useState(0);
  const total = project.detailImages.length;

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") setImgIndex((p) => (p + 1) % total);
      if (e.key === "ArrowLeft") setImgIndex((p) => (p - 1 + total) % total);
    };
    document.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [onClose, total]);

  const current = project.detailImages[imgIndex];

  return (
    <div className="bm-backdrop" onClick={onClose} role="dialog" aria-modal>
      <div className="bm-inner" onClick={(e) => e.stopPropagation()}>
        
        {/* Close Button - Apple Style */}
        <button className="bm-close" onClick={onClose} aria-label="Close">
          <X size={20} />
        </button>

        {/* Bento Box Grid Inside Modal */}
        <div className="bm-bento-grid">
          
          {/* Main Media Box */}
          <div className="bm-media-box">
            <div className="bm-img-wrap">
              <Image
                key={current.src}
                src={current.src}
                alt={current.caption ?? project.title}
                fill
                className="bm-img"
                sizes="(max-width: 1024px) 90vw, 60vw"
              />
            </div>
            {total > 1 && (
              <div className="bm-nav-overlay">
                <button
                  className="bm-nav-btn"
                  onClick={() => setImgIndex((p) => (p - 1 + total) % total)}
                >
                  <ChevronLeft size={20} />
                </button>
                <div className="bm-dots">
                  {project.detailImages.map((_, i) => (
                    <div 
                      key={i} 
                      className={`bm-dot ${i === imgIndex ? "bm-dot-active" : ""}`}
                      onClick={() => setImgIndex(i)}
                    />
                  ))}
                </div>
                <button
                  className="bm-nav-btn"
                  onClick={() => setImgIndex((p) => (p + 1) % total)}
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            )}
          </div>

          {/* Info Box */}
          <div className="bm-info-box">
            <div>
              <div className="bm-cat-wrap">
                <span className="bm-cat">{project.category}</span>
                {project.year && <span className="bm-year">{project.year}</span>}
              </div>
              <h2 className="bm-title">{project.title}</h2>
              <p className="bm-desc">{project.description}</p>
            </div>
            
            {project.tools && project.tools.length > 0 && (
              <div className="bm-tools">
                <div className="bm-tools-label">SOFTWARE / TOOLS</div>
                <div className="bm-tools-list">
                  {project.tools.map(t => (
                    <span key={t} className="bm-tool-chip">{t}</span>
                  ))}
                </div>
              </div>
            )}

            {current.caption && (
              <div className="bm-caption">
                <span className="bm-caption-label">SCENE INFO</span>
                {current.caption}
              </div>
            )}
          </div>
        </div>

      </div>

      <style>{`
        .bm-backdrop {
          position: fixed;
          inset: 0;
          z-index: 9999;
          background: rgba(0, 0, 0, 0.4);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1.5rem;
          animation: bm-fade 0.3s ease;
        }

        @keyframes bm-fade {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .bm-inner {
          position: relative;
          width: 100%;
          max-width: 1200px;
          max-height: 90vh;
          background: color-mix(in srgb, var(--background) 80%, transparent);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 32px;
          box-shadow: 0 30px 60px rgba(0,0,0,0.3);
          display: flex;
          flex-direction: column;
          overflow: hidden;
          animation: bm-slide 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes bm-slide {
          from { transform: translateY(40px) scale(0.95); opacity: 0; }
          to { transform: translateY(0) scale(1); opacity: 1; }
        }

        .bm-close {
          position: absolute;
          top: 1.25rem;
          right: 1.25rem;
          z-index: 10;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: rgba(150, 150, 150, 0.2);
          backdrop-filter: blur(8px);
          border: none;
          color: var(--foreground);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background 0.2s, transform 0.2s;
        }
        .bm-close:hover {
          background: rgba(150, 150, 150, 0.4);
          transform: scale(1.05);
        }

        /* Bento Grid Inside Modal */
        .bm-bento-grid {
          display: flex;
          flex-direction: column;
          padding: 1rem;
          gap: 1rem;
          overflow-y: auto;
          max-height: 90vh;
        }
        @media (min-width: 1024px) {
          .bm-bento-grid {
            flex-direction: row;
            height: 85vh;
            overflow: hidden;
          }
        }

        /* Boxes */
        .bm-media-box {
          position: relative;
          flex: 2;
          background: #000;
          border-radius: 24px;
          overflow: hidden;
          min-height: 400px;
        }
        .bm-info-box {
          flex: 1;
          background: rgba(150, 150, 150, 0.05);
          border: 1px solid rgba(150, 150, 150, 0.1);
          border-radius: 24px;
          padding: 2.5rem 2rem;
          display: flex;
          flex-direction: column;
          gap: 2.5rem;
          overflow-y: auto;
        }

        /* Image */
        .bm-img-wrap {
          position: absolute;
          inset: 0;
        }
        .bm-img {
          object-fit: contain;
          animation: bm-fade-img 0.4s ease;
        }
        @keyframes bm-fade-img {
          from { opacity: 0; filter: blur(10px); }
          to { opacity: 1; filter: blur(0); }
        }

        /* Nav */
        .bm-nav-overlay {
          position: absolute;
          bottom: 1.5rem;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          align-items: center;
          gap: 1rem;
          background: rgba(0,0,0,0.5);
          backdrop-filter: blur(10px);
          padding: 0.5rem 1rem;
          border-radius: 999px;
          border: 1px solid rgba(255,255,255,0.1);
        }
        .bm-nav-btn {
          background: transparent;
          border: none;
          color: white;
          cursor: pointer;
          display: flex;
          padding: 0.2rem;
          border-radius: 50%;
          transition: background 0.2s;
        }
        .bm-nav-btn:hover { background: rgba(255,255,255,0.2); }
        .bm-dots { display: flex; gap: 0.4rem; }
        .bm-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: rgba(255,255,255,0.3);
          cursor: pointer;
          transition: background 0.2s, transform 0.2s;
        }
        .bm-dot-active {
          background: white;
          transform: scale(1.2);
        }

        /* Info Typography */
        .bm-cat-wrap {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 1rem;
        }
        .bm-cat {
          background: var(--foreground);
          color: var(--background);
          padding: 0.3rem 0.8rem;
          border-radius: 999px;
          font-family: var(--font-montserrat), sans-serif;
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }
        .bm-year {
          color: var(--muted);
          font-family: 'Fira Code', monospace;
          font-size: 0.8rem;
          font-weight: 500;
        }

        .bm-title {
          font-family: var(--font-montserrat), serif;
          font-size: 2.2rem;
          font-weight: 800;
          letter-spacing: -0.03em;
          color: var(--foreground);
          margin: 0 0 1rem;
          line-height: 1.1;
        }
        .bm-desc {
          font-size: 0.95rem;
          line-height: 1.6;
          color: var(--muted);
          margin: 0;
        }

        /* Tools / Caption inside Info Box */
        .bm-tools-label, .bm-caption-label {
          font-family: 'Fira Code', monospace;
          font-size: 0.7rem;
          font-weight: 600;
          color: var(--muted);
          margin-bottom: 0.75rem;
          letter-spacing: 0.05em;
        }
        .bm-tools-list {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }
        .bm-tool-chip {
          padding: 0.4rem 0.8rem;
          border-radius: 10px;
          background: var(--background);
          border: 1px solid var(--border);
          color: var(--foreground);
          font-size: 0.75rem;
          font-weight: 600;
        }
        .bm-caption {
          background: var(--background);
          padding: 1.25rem;
          border-radius: 16px;
          font-size: 0.85rem;
          line-height: 1.5;
          color: var(--muted);
          border: 1px solid var(--border);
        }
      `}</style>
    </div>
  );
}

/* ─────────────────────────────────────────────
   GalleryGrid — default export
───────────────────────────────────────────── */
export default function GalleryGrid() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [selected, setSelected] = useState<DesignProject | null>(null);

  const filtered =
    activeFilter === "All"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === activeFilter);

  return (
    <section className="gg-section">
      <div className="gg-container">
        {/* Controls */}
        <div className="gg-controls">
          <span className="gg-count">
            {filtered.length}
            <span> work{filtered.length !== 1 ? "s" : ""}</span>
          </span>
          <div className="gg-filters">
            {ALL_CATEGORIES.map((cat) => (
              <button
                key={cat}
                className={`gg-filter-btn ${activeFilter === cat ? "gg-filter-active" : ""}`}
                onClick={() => setActiveFilter(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Accordion Container */}
        <div className="gg-accordion">
          {filtered.map((item, i) => (
            <GalleryCard
              key={item.id}
              item={item}
              delay={(i % 3) * 80}
              onOpen={setSelected}
            />
          ))}
        </div>
      </div>

      {selected && (
        <ProjectModal project={selected} onClose={() => setSelected(null)} />
      )}

      <style>{`
        .gg-section {
          background: var(--background);
          padding: 0 1.5rem 7rem;
        }
        .gg-container {
          max-width: 1280px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        /* Controls */
        .gg-controls {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 1rem;
          padding: 1.25rem 0;
          border-bottom: 1px solid var(--border);
        }
        .gg-count {
          font-family: var(--font-montserrat), serif;
          font-size: 0.85rem;
          font-weight: 700;
          color: var(--foreground);
        }
        .gg-count span { color: var(--muted); font-weight: 500; }

        .gg-filters { 
          display: flex; 
          flex-wrap: wrap; 
          gap: 1.5rem; 
          align-items: center;
        }
        .gg-filter-btn {
          padding: 0.2rem 0;
          border: none;
          background: transparent;
          color: var(--muted);
          font-family: var(--font-montserrat), sans-serif;
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          cursor: pointer;
          position: relative;
          transition: color 0.3s ease;
        }
        .gg-filter-btn::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0;
          width: 0%;
          height: 2px;
          background: var(--foreground);
          transition: width 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .gg-filter-btn:hover {
          color: var(--foreground);
        }
        .gg-filter-btn:hover::after {
          width: 40%;
        }
        .gg-filter-active {
          color: var(--foreground) !important;
        }
        .gg-filter-active::after {
          width: 100% !important;
        }

        /* Accordion Layout */
        .gg-accordion {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
          width: 100%;
        }

        @media (max-width: 768px) {
          .gg-section { padding: 0 1rem 5rem; }
          .gg-controls { flex-direction: column; align-items: flex-start; }
          .gg-accordion {
            flex-direction: column;
            flex-wrap: nowrap;
          }
        }
      `}</style>
    </section>
  );
}
