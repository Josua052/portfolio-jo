// src/components/gallery/GalleryGrid.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import GalleryCard from "./GalleryCard";
import { DesignProject } from "@/types/gallery-editing";
import galleryData from "@/data/galleryEditing.json";

const PROJECTS = galleryData as DesignProject[];
const ALL_CATEGORIES = [
  "All",
  ...Array.from(new Set(PROJECTS.map((p) => p.category))),
];

/* ─────────────────────────────────────────────
   Behance-style Detail Modal
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
    <div className="pm-backdrop" onClick={onClose} role="dialog" aria-modal>
      <div className="pm-inner" onClick={(e) => e.stopPropagation()}>
        {/* Close */}
        <button className="pm-close" onClick={onClose} aria-label="Close">
          <X size={18} />
        </button>

        {/* Left: image viewer */}
        <div className="pm-media">
          <div className="pm-img-wrap">
            <Image
              key={current.src}
              src={current.src}
              alt={current.caption ?? project.title}
              fill
              className="pm-img"
              sizes="70vw"
            />
          </div>

          {/* Navigation arrows */}
          {total > 1 && (
            <>
              <button
                className="pm-nav pm-nav-left"
                onClick={() => setImgIndex((p) => (p - 1 + total) % total)}
                aria-label="Previous"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                className="pm-nav pm-nav-right"
                onClick={() => setImgIndex((p) => (p + 1) % total)}
                aria-label="Next"
              >
                <ChevronRight size={18} />
              </button>
            </>
          )}

          {/* Caption */}
          {current.caption && (
            <div className="pm-caption">{current.caption}</div>
          )}

          {/* Dot indicators */}
          {total > 1 && (
            <div className="pm-dots">
              {project.detailImages.map((_, i) => (
                <button
                  key={i}
                  className={`pm-dot ${i === imgIndex ? "pm-dot-active" : ""}`}
                  onClick={() => setImgIndex(i)}
                  aria-label={`Image ${i + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Right: project info */}
        <div className="pm-info">
          {/* Header */}
          <div className="pm-info-header">
            <span className="pm-cat">{project.category}</span>
            {project.year && <span className="pm-year">{project.year}</span>}
          </div>

          <h2 className="pm-title">{project.title}</h2>
          <p className="pm-desc">{project.description}</p>

          {/* Divider */}
          <div className="pm-divider" />

          {/* Tools */}
          {project.tools && project.tools.length > 0 && (
            <div className="pm-section">
              <p className="pm-section-label">Tools Used</p>
              <div className="pm-tools">
                {project.tools.map((t) => (
                  <span key={t} className="pm-tool">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Image counter */}
          <div className="pm-section">
            <p className="pm-section-label">Project Images</p>
            <div className="pm-thumbnails">
              {project.detailImages.map((img, i) => (
                <button
                  key={i}
                  className={`pm-thumb ${i === imgIndex ? "pm-thumb-active" : ""}`}
                  onClick={() => setImgIndex(i)}
                >
                  <Image
                    src={img.src}
                    alt={img.caption ?? `Image ${i + 1}`}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Behance CTA */}
          {project.behanceUrl && (
            <Link
              href={project.behanceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="pm-behance-btn"
            >
              View on Behance
              <ArrowUpRight size={14} />
            </Link>
          )}
        </div>
      </div>

      <style>{`
        .pm-backdrop {
          position: fixed;
          inset: 0;
          z-index: 100;
          background: rgba(0,0,0,0.9);
          backdrop-filter: blur(20px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1.5rem;
          animation: pm-fade 0.2s ease;
        }
        @keyframes pm-fade {
          from { opacity: 0; }
          to   { opacity: 1; }
        }

        .pm-inner {
          position: relative;
          width: 100%;
          max-width: 1000px;
          max-height: 90vh;
          border-radius: 1.5rem;
          background: var(--background);
          border: 1px solid var(--border);
          display: grid;
          grid-template-columns: 1fr 320px;
          overflow: hidden;
          animation: pm-rise 0.3s cubic-bezier(0.34,1.56,0.64,1);
        }
        @media (max-width: 768px) {
          .pm-inner {
            grid-template-columns: 1fr;
            grid-template-rows: auto 1fr;
            max-height: 92vh;
            overflow-y: auto;
          }
        }
        @keyframes pm-rise {
          from { transform: scale(0.95) translateY(16px); opacity: 0; }
          to   { transform: scale(1) translateY(0); opacity: 1; }
        }

        .pm-close {
          position: absolute;
          top: 1rem;
          right: 1rem;
          z-index: 10;
          width: 36px;
          height: 36px;
          border-radius: 10px;
          border: 1px solid var(--border);
          background: var(--background);
          color: var(--foreground);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background 0.2s, border-color 0.2s;
        }
        .pm-close:hover {
          background: var(--hover);
          border-color: var(--foreground);
        }

        /* Media side */
        .pm-media {
          position: relative;
          background: var(--secondary);
          min-height: 400px;
          overflow: hidden;
        }
        @media (max-width: 768px) { .pm-media { min-height: 260px; } }

        .pm-img-wrap {
          position: absolute;
          inset: 0;
        }
        .pm-img {
          object-fit: contain;
          transition: opacity 0.25s;
        }

        /* Nav arrows */
        .pm-nav {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 36px;
          height: 36px;
          border-radius: 10px;
          border: 1px solid rgba(255,255,255,0.15);
          background: rgba(0,0,0,0.5);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background 0.2s;
          z-index: 2;
          backdrop-filter: blur(4px);
        }
        .pm-nav:hover { background: rgba(0,0,0,0.75); }
        .pm-nav-left  { left: 0.75rem; }
        .pm-nav-right { right: 0.75rem; }

        /* Caption */
        .pm-caption {
          position: absolute;
          bottom: 2.5rem;
          left: 50%;
          transform: translateX(-50%);
          font-size: 0.7rem;
          font-weight: 600;
          color: rgba(255,255,255,0.7);
          background: rgba(0,0,0,0.5);
          padding: 0.2rem 0.75rem;
          border-radius: 999px;
          backdrop-filter: blur(4px);
          white-space: nowrap;
          max-width: 80%;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        /* Dots */
        .pm-dots {
          position: absolute;
          bottom: 0.75rem;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 0.35rem;
        }
        .pm-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          border: none;
          background: rgba(255,255,255,0.35);
          cursor: pointer;
          padding: 0;
          transition: background 0.2s, transform 0.2s;
        }
        .pm-dot-active {
          background: white;
          transform: scale(1.3);
        }

        /* Info side */
        .pm-info {
          border-left: 1px solid var(--border);
          padding: 2rem 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          overflow-y: auto;
        }
        @media (max-width: 768px) {
          .pm-info {
            border-left: none;
            border-top: 1px solid var(--border);
          }
        }

        .pm-info-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 0.5rem;
        }
        .pm-cat {
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--muted);
          padding: 0.2rem 0.6rem;
          border-radius: 6px;
          border: 1px solid var(--border);
          background: var(--secondary);
        }
        .pm-year {
          font-size: 0.7rem;
          font-weight: 700;
          color: var(--muted);
          letter-spacing: 0.05em;
        }

        .pm-title {
          font-family: var(--font-montserrat), serif;
          font-size: 1.25rem;
          font-weight: 800;
          letter-spacing: -0.025em;
          color: var(--foreground);
          margin: 0;
          line-height: 1.2;
        }
        .pm-desc {
          font-size: 0.85rem;
          line-height: 1.7;
          color: var(--muted);
          margin: 0;
        }

        .pm-divider {
          height: 1px;
          background: var(--border);
        }

        .pm-section { display: flex; flex-direction: column; gap: 0.5rem; }
        .pm-section-label {
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--muted);
        }

        .pm-tools {
          display: flex;
          flex-wrap: wrap;
          gap: 0.35rem;
        }
        .pm-tool {
          padding: 0.22rem 0.65rem;
          border-radius: 7px;
          font-size: 0.72rem;
          font-weight: 600;
          border: 1px solid var(--border);
          color: var(--foreground);
          background: var(--secondary);
        }

        /* Thumbnails */
        .pm-thumbnails {
          display: flex;
          flex-wrap: wrap;
          gap: 0.4rem;
        }
        .pm-thumb {
          position: relative;
          width: 52px;
          height: 40px;
          border-radius: 6px;
          overflow: hidden;
          border: 2px solid transparent;
          cursor: pointer;
          padding: 0;
          background: var(--secondary);
          transition: border-color 0.2s;
          flex-shrink: 0;
        }
        .pm-thumb-active {
          border-color: var(--foreground);
        }
        .pm-thumb:hover:not(.pm-thumb-active) {
          border-color: var(--muted);
        }

        /* Behance CTA */
        .pm-behance-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          justify-content: center;
          padding: 0.75rem;
          border-radius: 10px;
          border: 1px solid var(--border);
          background: var(--background);
          color: var(--foreground);
          font-size: 0.8rem;
          font-weight: 700;
          text-decoration: none;
          transition: background 0.2s, border-color 0.2s, transform 0.2s;
          margin-top: auto;
        }
        .pm-behance-btn:hover {
          background: var(--primary);
          color: var(--background);
          border-color: var(--primary);
          transform: translateY(-1px);
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

        {/* Creative grid:
            Row 1: large (featured) + small
            Row 2: small + small + small
            Repeating pattern */}
        <div className="gg-grid">
          {filtered.map((item, i) => (
            <GalleryCard
              key={item.id}
              item={item}
              delay={(i % 3) * 80}
              featured={i % 4 === 0} /* every 4th item spans wider */
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
          overflow-x: hidden; 
        }
        .gg-container {
          max-width: 1280px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 2rem;
          min-width: 0;        
          overflow: hidden; 
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
          letter-spacing: -0.01em;
        }
        .gg-count span { font-weight: 500; color: var(--muted); }

        .gg-filters { display: flex; flex-wrap: wrap; gap: 0.4rem; }
        .gg-filter-btn {
          padding: 0.3rem 0.875rem;
          border-radius: 999px;
          border: 1px solid var(--border);
          background: var(--background);
          color: var(--muted);
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.02em;
          cursor: pointer;
          transition: border-color 0.2s, color 0.2s, background 0.2s;
          white-space: nowrap;
        }
        .gg-filter-btn:hover {
          color: var(--foreground);
          border-color: var(--foreground);
        }
        .gg-filter-active {
          background: var(--foreground) !important;
          color: var(--background) !important;
          border-color: var(--foreground) !important;
        }

        /* Creative grid layout */
        .gg-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.25rem;
          min-width: 0;            
          width: 100%;  
        }
        @media (min-width: 640px) {
          .gg-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          /* Every 4th item (featured) spans both columns */
          .gg-grid .gc-featured {
            grid-column: 1 / -1;
          }
        }
        @media (min-width: 1024px) {
          .gg-grid {
            grid-template-columns: repeat(3, 1fr);
          }
          /* Featured items span 2 cols on 3-col grid */
          .gg-grid .gc-featured {
            grid-column: span 2;
          }
        }

        @media (max-width: 640px) {
          .gg-section {
            padding: 0 1rem 5rem; 
          }
          .gg-controls {
            flex-direction: column;
            align-items: flex-start;
          }
          .gg-filters {
            max-width: 100%;         
            overflow-x: auto;        
            -webkit-overflow-scrolling: touch;
            scrollbar-width: none;
          }
          .gg-filters::-webkit-scrollbar {
            display: none;
          }
        }
      `}</style>
    </section>
  );
}
