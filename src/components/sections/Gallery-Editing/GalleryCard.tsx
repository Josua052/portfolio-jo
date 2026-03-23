// src/components/gallery/GalleryCard.tsx
"use client";

import Image from "next/image";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { DesignProject } from "@/types/gallery-editing";

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, inView };
}

interface GalleryCardProps {
  item: DesignProject;
  delay?: number;
  /** span 2 columns on desktop for featured items */
  featured?: boolean;
  onOpen: (item: DesignProject) => void;
}

export default function GalleryCard({
  item,
  delay = 0,
  featured = false,
  onOpen,
}: GalleryCardProps) {
  const { ref, inView } = useInView();

  return (
    <div
      ref={ref}
      className={`gc-wrap ${featured ? "gc-featured" : ""}`}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0) scale(1)" : "translateY(20px) scale(0.97)",
        transition: `opacity 0.55s ${delay}ms ease, transform 0.55s ${delay}ms ease`,
      }}
    >
      <div
        className="gc-card"
        onClick={() => onOpen(item)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => { if (e.key === "Enter") onOpen(item); }}
        aria-label={`View ${item.title}`}
      >
        {/* Cover image */}
        <div className="gc-cover">
          <Image
            src={item.coverImage}
            alt={item.title}
            fill
            className="gc-cover-img"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />

          {/* Hover overlay */}
          <div className="gc-overlay" />

          {/* Hover CTA */}
          <div className="gc-hover-cta">
            <span className="gc-hover-btn">View Project</span>
          </div>

          {/* Category chip */}
          <span className="gc-cat">{item.category}</span>

          {/* Behance link — top right */}
          {item.behanceUrl && (
            <a
              href={item.behanceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="gc-behance-link"
              onClick={(e) => e.stopPropagation()}
              aria-label="View on Behance"
            >
              <ExternalLink size={12} />
            </a>
          )}
        </div>

        {/* Info bar */}
        <div className="gc-info">
          <div className="gc-info-left">
            <h3 className="gc-title">{item.title}</h3>
            <p className="gc-desc">{item.description}</p>
          </div>
          <div className="gc-info-right">
            {item.year && <span className="gc-year">{item.year}</span>}
            <ArrowUpRight size={14} className="gc-arrow" />
          </div>
        </div>

        {/* Tools row */}
        {item.tools && item.tools.length > 0 && (
          <div className="gc-tools">
            {item.tools.map((t) => (
              <span key={t} className="gc-tool">{t}</span>
            ))}
          </div>
        )}
      </div>

      <style>{`
        .gc-wrap {
          position: relative;
          break-inside: avoid;
        }

        .gc-card {
          background: var(--background);
          border: 1px solid var(--border);
          border-radius: 1.25rem;
          overflow: hidden;
          cursor: pointer;
          display: flex;
          flex-direction: column;
          transition: border-color 0.3s, box-shadow 0.3s, transform 0.3s;
        }
        .gc-card:hover {
          border-color: var(--foreground);
          box-shadow: 0 12px 40px rgba(0,0,0,0.1);
          transform: translateY(-4px);
        }

        /* Cover */
        .gc-cover {
          position: relative;
          width: 100%;
          aspect-ratio: 4 / 3;
          overflow: hidden;
          background: var(--secondary);
          flex-shrink: 0;
        }
        .gc-featured .gc-cover {
          aspect-ratio: 16 / 7;
        }

        .gc-cover-img {
          object-fit: cover;
          transition: transform 0.6s ease;
        }
        .gc-card:hover .gc-cover-img { transform: scale(1.05); }

        /* Overlay */
        .gc-overlay {
          position: absolute;
          inset: 0;
          background: rgba(0,0,0,0.5);
          opacity: 0;
          transition: opacity 0.3s;
        }
        .gc-card:hover .gc-overlay { opacity: 1; }

        /* Hover CTA center */
        .gc-hover-cta {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transform: translateY(6px);
          transition: opacity 0.3s, transform 0.3s;
        }
        .gc-card:hover .gc-hover-cta {
          opacity: 1;
          transform: translateY(0);
        }
        .gc-hover-btn {
          padding: 0.55rem 1.25rem;
          border-radius: 999px;
          background: white;
          color: #0f172a;
          font-size: 0.78rem;
          font-weight: 700;
          letter-spacing: 0.02em;
        }

        /* Category chip — bottom left */
        .gc-cat {
          position: absolute;
          bottom: 0.75rem;
          left: 0.875rem;
          padding: 0.2rem 0.65rem;
          border-radius: 999px;
          font-size: 0.62rem;
          font-weight: 700;
          letter-spacing: 0.07em;
          text-transform: uppercase;
          background: rgba(0,0,0,0.55);
          color: rgba(255,255,255,0.88);
          border: 1px solid rgba(255,255,255,0.15);
          backdrop-filter: blur(6px);
        }

        /* Behance link — top right */
        .gc-behance-link {
          position: absolute;
          top: 0.75rem;
          right: 0.75rem;
          width: 30px;
          height: 30px;
          border-radius: 8px;
          background: rgba(0,0,0,0.55);
          border: 1px solid rgba(255,255,255,0.18);
          color: rgba(255,255,255,0.8);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.2s, background 0.2s;
          backdrop-filter: blur(4px);
          z-index: 2;
        }
        .gc-card:hover .gc-behance-link { opacity: 1; }
        .gc-behance-link:hover { background: rgba(255,255,255,0.2); }

        /* Info bar */
        .gc-info {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 0.75rem;
          padding: 1rem 1.25rem 0.75rem;
        }
        .gc-info-left { flex: 1; min-width: 0; }
        .gc-title {
          font-family: var(--font-montserrat), serif;
          font-size: 0.95rem;
          font-weight: 700;
          letter-spacing: -0.015em;
          color: var(--foreground);
          margin: 0 0 0.25rem;
          line-height: 1.3;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .gc-desc {
          font-size: 0.78rem;
          line-height: 1.5;
          color: var(--muted);
          margin: 0;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .gc-info-right {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 0.25rem;
          flex-shrink: 0;
        }
        .gc-year {
          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: 0.05em;
          color: var(--muted);
          opacity: 0.7;
        }
        .gc-arrow {
          color: var(--muted);
          opacity: 0;
          transform: translate(-3px, 3px);
          transition: opacity 0.2s, transform 0.2s, color 0.2s;
        }
        .gc-card:hover .gc-arrow {
          opacity: 1;
          transform: translate(0, 0);
          color: var(--foreground);
        }

        /* Tools */
        .gc-tools {
          display: flex;
          flex-wrap: wrap;
          gap: 0.35rem;
          padding: 0 1.25rem 1rem;
        }
        .gc-tool {
          padding: 0.15rem 0.55rem;
          border-radius: 5px;
          font-size: 0.65rem;
          font-weight: 600;
          border: 1px solid var(--border);
          color: var(--muted);
          background: var(--secondary);
          transition: color 0.2s, border-color 0.2s;
        }
        .gc-card:hover .gc-tool {
          color: var(--foreground);
          border-color: var(--foreground);
          opacity: 0.55;
        }
      `}</style>
    </div>
  );
}