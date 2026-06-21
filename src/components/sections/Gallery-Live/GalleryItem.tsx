"use client";

import Image from "next/image";
import { Play, Calendar, ArrowUpRight } from "lucide-react";
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

  const handleImageError = useCallback(() => {
    if (!imgError) {
      setImgError(true);
      setImgSrc(FALLBACK_PLACEHOLDER);
    }
  }, [imgError]);

  return (
    <div
      ref={ref}
      className="gl-accordion-wrap"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(30px)",
        transition: `opacity 0.6s ${delay}ms ease, transform 0.6s ${delay}ms ease, flex 0.6s cubic-bezier(0.25, 1, 0.5, 1)`,
      }}
      onClick={() => onClick(item)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === "Enter") onClick(item); }}
      aria-label={`View ${item.title}`}
    >
      <div className="gl-accordion-inner">
        <Image
          src={imgSrc}
          alt={item.title}
          fill
          className="gl-accordion-img"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          onError={handleImageError}
          unoptimized
        />

        {/* Video badge top right */}
        {item.type === "video" && (
          <div className="gl-play-badge">
            <Play size={16} fill="white" />
          </div>
        )}

        {/* Error indicator */}
        {imgError && (
          <div className="gl-error-badge">⚠️</div>
        )}

        <div className="gl-accordion-overlay" />

        {/* Content visible only on hover/expansion */}
        <div className="gl-accordion-content">
          <div className="gl-accordion-text">
            <span className="gl-cat">{item.type.toUpperCase()}</span>
            <h3 className="gl-title">{item.title}</h3>
            {item.date && (
              <span className="gl-date">
                <Calendar size={12} style={{ display: 'inline', marginRight: '4px' }} />
                {item.date}
              </span>
            )}
          </div>
          <div className="gl-icon-wrap">
            <ArrowUpRight size={24} />
          </div>
        </div>

        {/* Vertical title (visible when collapsed) */}
        <div className="gl-vertical-title">
          <span>{item.title}</span>
        </div>
      </div>

      <style>{`
        .gl-accordion-wrap {
          position: relative;
          flex: 1 1 10%;
          min-width: 80px;
          height: 480px;
          border-radius: 20px;
          overflow: hidden;
          cursor: pointer;
        }

        .gl-accordion-wrap:hover {
          flex: 1 1 60%;
        }

        .gl-accordion-inner {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          background: var(--secondary);
        }

        .gl-accordion-img {
          object-fit: cover;
          transition: transform 0.8s cubic-bezier(0.25, 1, 0.5, 1), filter 0.5s ease;
          filter: grayscale(80%) brightness(0.7);
        }

        .gl-accordion-wrap:hover .gl-accordion-img {
          transform: scale(1.05);
          filter: grayscale(0%) brightness(1);
        }

        .gl-accordion-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to top,
            rgba(0,0,0,0.85) 0%,
            rgba(0,0,0,0.2) 50%,
            transparent 100%
          );
          opacity: 0;
          transition: opacity 0.5s ease;
        }

        .gl-accordion-wrap:hover .gl-accordion-overlay {
          opacity: 1;
        }

        /* Top Right Badges */
        .gl-play-badge, .gl-error-badge {
          position: absolute;
          top: 1rem;
          right: 1rem;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: rgba(0,0,0,0.5);
          backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          z-index: 2;
          transition: opacity 0.3s ease;
        }
        .gl-error-badge { background: rgba(255, 80, 80, 0.8); }
        .gl-accordion-wrap:hover .gl-play-badge { opacity: 0; }

        /* Vertical title shown when collapsed */
        .gl-vertical-title {
          position: absolute;
          bottom: 2rem;
          left: 50%;
          transform: translateX(-50%) rotate(-90deg);
          transform-origin: bottom center;
          white-space: nowrap;
          color: rgba(255, 255, 255, 0.6);
          font-family: 'Fira Code', monospace;
          font-size: 0.85rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          transition: opacity 0.3s ease;
          pointer-events: none;
        }

        .gl-accordion-wrap:hover .gl-vertical-title {
          opacity: 0;
        }

        /* Expanded Content */
        .gl-accordion-content {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 2rem;
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.5s cubic-bezier(0.25, 1, 0.5, 1);
          pointer-events: none;
          min-width: 300px;
        }

        .gl-accordion-wrap:hover .gl-accordion-content {
          opacity: 1;
          transform: translateY(0);
          transition-delay: 0.1s;
        }

        .gl-accordion-text {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }

        .gl-cat {
          font-family: var(--font-montserrat), sans-serif;
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--primary);
        }

        .gl-title {
          font-family: var(--font-montserrat), serif;
          font-size: 1.8rem;
          font-weight: 800;
          color: white;
          margin: 0;
          line-height: 1.1;
          letter-spacing: -0.02em;
        }

        .gl-date {
          font-family: 'Fira Code', monospace;
          font-size: 0.8rem;
          color: rgba(255,255,255,0.6);
        }

        .gl-icon-wrap {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: rgba(255,255,255,0.15);
          backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          flex-shrink: 0;
          transition: background 0.3s, transform 0.3s;
        }

        .gl-accordion-wrap:hover .gl-icon-wrap {
          transform: rotate(45deg);
        }

        /* Mobile Adjustments: Disable accordion, show standard stacked cards */
        @media (max-width: 768px) {
          .gl-accordion-wrap {
            flex: none;
            width: 100%;
            height: 350px;
          }

          .gl-accordion-wrap:hover {
            flex: none;
            height: 350px;
          }

          .gl-accordion-img {
            filter: grayscale(0%) brightness(1);
          }

          .gl-accordion-overlay {
            opacity: 1;
          }

          .gl-accordion-content {
            opacity: 1;
            transform: translateY(0);
            pointer-events: auto;
            padding: 1.5rem;
            min-width: unset;
          }

          .gl-vertical-title {
            display: none;
          }

          .gl-title {
            font-size: 1.4rem;
          }
        }
      `}</style>
    </div>
  );
}