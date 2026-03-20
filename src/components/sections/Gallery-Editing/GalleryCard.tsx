// src/components/gallery/GalleryCard.tsx
"use client";

import Image from "next/image";
import { ZoomIn } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  image: string;
  description: string;
}

function useInView(threshold = 0.12) {
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
  item: GalleryItem;
  delay?: number;
  tall?: boolean;
  onOpen: (item: GalleryItem) => void;
}

export default function GalleryCard({
  item,
  delay = 0,
  tall = false,
  onOpen,
}: GalleryCardProps) {
  const { ref, inView } = useInView();

  return (
    <div
      ref={ref}
      className={`gallery-card ${tall ? "gallery-card-tall" : ""}`}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView
          ? "translateY(0) scale(1)"
          : "translateY(24px) scale(0.97)",
        transition: `opacity 0.55s ${delay}ms ease, transform 0.55s ${delay}ms ease`,
      }}
      onClick={() => onOpen(item)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === "Enter") onOpen(item); }}
      aria-label={`View ${item.title}`}
    >
      {/* Image */}
      <div className="gallery-card-img-wrap">
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="gallery-card-img"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>

      {/* Hover overlay */}
      <div className="gallery-card-overlay" />

      {/* Zoom icon */}
      <div className="gallery-card-zoom">
        <ZoomIn size={16} />
      </div>

      {/* Category chip — top left, always visible */}
      <div className="gallery-card-cat-wrap">
        <span className="gallery-card-cat">{item.category}</span>
      </div>

      {/* Title + description — slides up on hover */}
      <div className="gallery-card-content">
        <h3 className="gallery-card-title">{item.title}</h3>
        <p className="gallery-card-desc">{item.description}</p>
      </div>

      <style>{`
        .gallery-card {
          position: relative;
          break-inside: avoid;
          margin-bottom: 1.25rem;
          border-radius: 1.25rem;
          overflow: hidden;
          border: 1px solid var(--border);
          background: var(--secondary);
          cursor: pointer;
          height: 280px;
          transition: border-color 0.3s, transform 0.3s, box-shadow 0.3s;
        }
        .gallery-card-tall { height: 380px; }

        .gallery-card:hover {
          border-color: var(--foreground);
          transform: translateY(-3px);
          box-shadow: 0 12px 40px rgba(0,0,0,0.12);
        }

        .gallery-card-img-wrap {
          position: absolute;
          inset: 0;
        }
        .gallery-card-img {
          object-fit: cover;
          transition: transform 0.6s ease;
        }
        .gallery-card:hover .gallery-card-img {
          transform: scale(1.06);
        }

        .gallery-card-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to top,
            rgba(0,0,0,0.85) 0%,
            rgba(0,0,0,0.3) 50%,
            transparent 100%
          );
          opacity: 0;
          transition: opacity 0.35s ease;
        }
        .gallery-card:hover .gallery-card-overlay { opacity: 1; }

        .gallery-card-zoom {
          position: absolute;
          top: 1rem;
          right: 1rem;
          width: 34px;
          height: 34px;
          border-radius: 10px;
          background: rgba(0,0,0,0.5);
          border: 1px solid rgba(255,255,255,0.15);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transform: scale(0.8);
          transition: opacity 0.3s, transform 0.3s;
          backdrop-filter: blur(4px);
        }
        .gallery-card:hover .gallery-card-zoom {
          opacity: 1;
          transform: scale(1);
        }

        .gallery-card-cat-wrap {
          position: absolute;
          top: 1rem;
          left: 1rem;
        }
        .gallery-card-cat {
          display: inline-flex;
          padding: 0.2rem 0.65rem;
          border-radius: 999px;
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          background: rgba(0,0,0,0.5);
          color: rgba(255,255,255,0.85);
          border: 1px solid rgba(255,255,255,0.15);
          backdrop-filter: blur(4px);
        }

        .gallery-card-content {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 1.25rem;
          transform: translateY(8px);
          opacity: 0;
          transition: transform 0.35s ease, opacity 0.35s ease;
        }
        .gallery-card:hover .gallery-card-content {
          transform: translateY(0);
          opacity: 1;
        }
        .gallery-card-title {
          font-family: var(--font-montserrat), serif;
          font-size: 1rem;
          font-weight: 700;
          color: white;
          margin: 0 0 0.4rem;
          letter-spacing: -0.015em;
          line-height: 1.3;
        }
        .gallery-card-desc {
          font-size: 0.8rem;
          line-height: 1.6;
          color: rgba(255,255,255,0.7);
          margin: 0;
        }
      `}</style>
    </div>
  );
}