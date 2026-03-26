// src/components/gallery/live/GalleryItem.tsx
"use client";

import Image from "next/image";
import { Play, Calendar } from "lucide-react";
import { useEffect, useRef, useState, useCallback } from "react";
import { GalleryItemType } from "@/types/gallery";

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
  }, [threshold]);
  return { ref, inView };
}

// ✅ Placeholder SVG sebagai fallback jika gambar gagal dimuat
const FALLBACK_PLACEHOLDER =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 400 400'%3E%3Crect fill='%23222' width='400' height='400'/%3E%3Ctext fill='%23666' font-family='sans-serif' font-size='14' text-anchor='middle' x='200' y='200'%3EImage unavailable%3C/text%3E%3C/svg%3E";

interface Props {
  item: GalleryItemType;
  onClick: (item: GalleryItemType) => void;
  delay?: number;
}

export default function GalleryItem({ item, onClick, delay = 0 }: Props) {
  const { ref, inView } = useInView();
  const [imgSrc, setImgSrc] = useState(
    item.type === "image" ? item.src : (item.thumbnail ?? FALLBACK_PLACEHOLDER)
  );
  const [imgError, setImgError] = useState(false);

  // ✅ Handle error: fallback jika Google Drive gagal
  const handleImageError = useCallback(() => {
    if (!imgError) {
      setImgError(true);
      setImgSrc(FALLBACK_PLACEHOLDER);
    }
  }, [imgError]);

  return (
    <div
      ref={ref}
      className="gitem-wrap"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0) scale(1)" : "translateY(20px) scale(0.97)",
        transition: `opacity 0.5s ${delay}ms ease, transform 0.5s ${delay}ms ease`,
      }}
      onClick={() => onClick(item)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === "Enter") onClick(item); }}
      aria-label={`View ${item.title}`}
    >
      {/* Media thumbnail */}
      <div className="gitem-media">
        <Image
          src={imgSrc}
          alt={item.title}
          fill
          className="gitem-img"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          onError={handleImageError}
          // ✅ unoptimized untuk external URL dari Google Drive
          // karena Next.js image optimization mungkin gagal dengan redirect Google
          unoptimized
        />

        {/* Error indicator */}
        {imgError && (
          <div className="gitem-error-badge">
            ⚠️
          </div>
        )}

        {/* Video play overlay */}
        {item.type === "video" && (
          <div className="gitem-play-badge">
            <Play size={14} fill="white" />
          </div>
        )}

        {/* Hover overlay */}
        <div className="gitem-overlay" />

        {/* Hover content */}
        <div className="gitem-hover-content">
          <h3 className="gitem-title">{item.title}</h3>
          {item.date && (
            <div className="gitem-date">
              <Calendar size={11} />
              {item.date}
            </div>
          )}
        </div>
      </div>

      <style>{`
        .gitem-wrap {
          break-inside: avoid;
          margin-bottom: 1rem;
          border-radius: 1rem;
          overflow: hidden;
          border: 1px solid var(--border);
          background: var(--secondary);
          cursor: pointer;
          position: relative;
          transition: border-color 0.3s, transform 0.3s, box-shadow 0.3s;
        }
        .gitem-wrap:hover {
          border-color: var(--foreground);
          transform: translateY(-3px);
          box-shadow: 0 10px 32px rgba(0,0,0,0.12);
        }

        .gitem-media {
          position: relative;
          width: 100%;
          aspect-ratio: 1 / 1;
          overflow: hidden;
        }

        .gitem-img {
          object-fit: cover;
          transition: transform 0.55s ease;
        }
        .gitem-wrap:hover .gitem-img {
          transform: scale(1.06);
        }

        /* Video badge */
        .gitem-play-badge {
          position: absolute;
          top: 0.75rem;
          left: 0.75rem;
          z-index: 3;
          width: 30px;
          height: 30px;
          border-radius: 8px;
          background: rgba(0,0,0,0.6);
          border: 1px solid rgba(255,255,255,0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          backdrop-filter: blur(4px);
        }

        /* ✅ Error badge */
        .gitem-error-badge {
          position: absolute;
          top: 0.75rem;
          right: 0.75rem;
          z-index: 3;
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: rgba(255, 80, 80, 0.8);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.75rem;
          backdrop-filter: blur(4px);
        }

        /* Hover overlay */
        .gitem-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to top,
            rgba(0,0,0,0.82) 0%,
            rgba(0,0,0,0.25) 50%,
            transparent 100%
          );
          opacity: 0;
          transition: opacity 0.3s ease;
          z-index: 1;
        }
        .gitem-wrap:hover .gitem-overlay { opacity: 1; }

        /* Hover content */
        .gitem-hover-content {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 1rem;
          z-index: 2;
          transform: translateY(6px);
          opacity: 0;
          transition: transform 0.3s ease, opacity 0.3s ease;
          display: flex;
          flex-direction: column;
          gap: 0.3rem;
        }
        .gitem-wrap:hover .gitem-hover-content {
          transform: translateY(0);
          opacity: 1;
        }
        .gitem-title {
          font-family: var(--font-montserrat), serif;
          font-size: 0.875rem;
          font-weight: 700;
          color: white;
          margin: 0;
          letter-spacing: -0.01em;
          line-height: 1.3;
        }
        .gitem-date {
          display: flex;
          align-items: center;
          gap: 0.3rem;
          font-size: 0.7rem;
          font-weight: 500;
          color: rgba(255,255,255,0.55);
        }
      `}</style>
    </div>
  );
}