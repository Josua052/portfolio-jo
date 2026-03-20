// src/components/gallery/GalleryGrid.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import Image from "next/image";
import GalleryCard, { type GalleryItem } from "./GalleryCard";
import galleryData from "@/data/galleryEditing.json";

/* ── Derive category list from data ── */
const ALL_CATEGORIES = [
  "All",
  ...Array.from(new Set(galleryData.map((i: GalleryItem) => i.category))),
];

/* ─────────────────────────────────────────────
   Lightbox — shown when a card is clicked
───────────────────────────────────────────── */
function Lightbox({
  item,
  onClose,
}: {
  item: GalleryItem;
  onClose: () => void;
}) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      className="gallery-lightbox"
      onClick={onClose}
      role="dialog"
      aria-modal
    >
      <div
        className="gallery-lightbox-inner"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          className="gallery-lb-close"
          onClick={onClose}
          aria-label="Close lightbox"
        >
          <X size={18} />
        </button>

        {/* Image */}
        <div className="gallery-lb-img-wrap">
          <Image
            src={item.image}
            alt={item.title}
            fill
            className="object-contain"
            sizes="90vw"
          />
        </div>

        {/* Info */}
        <div className="gallery-lb-info">
          <span className="gallery-lb-cat">{item.category}</span>
          <h3 className="gallery-lb-title">{item.title}</h3>
          <p className="gallery-lb-desc">{item.description}</p>
        </div>
      </div>

      <style>{`
        .gallery-lightbox {
          position: fixed;
          inset: 0;
          z-index: 100;
          background: rgba(0,0,0,0.88);
          backdrop-filter: blur(16px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1.5rem;
          animation: lb-fade 0.25s ease;
        }
        @keyframes lb-fade {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        .gallery-lightbox-inner {
          position: relative;
          width: 100%;
          max-width: 880px;
          border-radius: 1.5rem;
          overflow: hidden;
          border: 1px solid rgba(255,255,255,0.1);
          background: #0a0a0a;
          display: grid;
          grid-template-rows: 1fr auto;
          max-height: 90vh;
          animation: lb-rise 0.3s cubic-bezier(0.34,1.56,0.64,1);
        }
        @keyframes lb-rise {
          from { transform: scale(0.95) translateY(16px); opacity: 0; }
          to   { transform: scale(1) translateY(0); opacity: 1; }
        }
        .gallery-lb-close {
          position: absolute;
          top: 1rem;
          right: 1rem;
          z-index: 10;
          width: 36px;
          height: 36px;
          border-radius: 10px;
          border: 1px solid rgba(255,255,255,0.15);
          background: rgba(0,0,0,0.6);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background 0.2s;
          backdrop-filter: blur(4px);
        }
        .gallery-lb-close:hover { background: rgba(255,255,255,0.15); }
        .gallery-lb-img-wrap {
          position: relative;
          width: 100%;
          height: 500px;
          background: #111;
        }
        @media (max-height: 700px) { .gallery-lb-img-wrap { height: 300px; } }
        .gallery-lb-info {
          padding: 1.5rem;
          border-top: 1px solid rgba(255,255,255,0.08);
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }
        .gallery-lb-cat {
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.4);
        }
        .gallery-lb-title {
          font-family: var(--font-montserrat), serif;
          font-size: 1.25rem;
          font-weight: 700;
          color: white;
          margin: 0;
          letter-spacing: -0.02em;
        }
        .gallery-lb-desc {
          font-size: 0.875rem;
          line-height: 1.65;
          color: rgba(255,255,255,0.5);
          margin: 0;
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
  const [lightboxItem, setLightboxItem] = useState<GalleryItem | null>(null);

  const filtered =
    activeFilter === "All"
      ? galleryData
      : galleryData.filter((i: GalleryItem) => i.category === activeFilter);

  return (
    <section className="gallery-grid-section">
      <div className="gallery-grid-container">

        {/* Controls: count + filter pills */}
        <div className="gallery-controls">
          <span className="gallery-count">
            {filtered.length}{" "}
            <span>work{filtered.length !== 1 ? "s" : ""}</span>
          </span>

          <div className="gallery-filters">
            {ALL_CATEGORIES.map((cat) => (
              <button
                key={cat}
                className={`gallery-filter-btn ${
                  activeFilter === cat ? "gallery-filter-active" : ""
                }`}
                onClick={() => setActiveFilter(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Masonry grid */}
        <div className="gallery-masonry">
          {filtered.map((item: GalleryItem, i: number) => (
            <GalleryCard
              key={item.id}
              item={item}
              delay={(i % 3) * 80}
              tall={i % 5 === 0}
              onOpen={setLightboxItem}
            />
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxItem && (
        <Lightbox
          item={lightboxItem}
          onClose={() => setLightboxItem(null)}
        />
      )}

      <style>{`
        .gallery-grid-section {
          background: var(--background);
          padding: 0 1.5rem 7rem;
        }
        .gallery-grid-container {
          max-width: 1280px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        /* Controls row */
        .gallery-controls {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 1rem;
          padding: 1.25rem 0;
          border-bottom: 1px solid var(--border);
        }
        .gallery-count {
          font-family: var(--font-montserrat), serif;
          font-size: 0.85rem;
          font-weight: 700;
          color: var(--foreground);
          letter-spacing: -0.01em;
        }
        .gallery-count span {
          font-weight: 500;
          color: var(--muted);
        }

        /* Filter pills */
        .gallery-filters {
          display: flex;
          flex-wrap: wrap;
          gap: 0.4rem;
        }
        .gallery-filter-btn {
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
        .gallery-filter-btn:hover {
          color: var(--foreground);
          border-color: var(--foreground);
        }
        .gallery-filter-active {
          background: var(--foreground) !important;
          color: var(--background) !important;
          border-color: var(--foreground) !important;
        }

        /* Masonry columns */
        .gallery-masonry { columns: 1; gap: 0; }
        @media (min-width: 640px)  { .gallery-masonry { columns: 2; } }
        @media (min-width: 1024px) { .gallery-masonry { columns: 3; } }

        @media (max-width: 640px) {
          .gallery-controls { flex-direction: column; align-items: flex-start; }
        }
      `}</style>
    </section>
  );
}