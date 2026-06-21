"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { DesignProject } from "@/types/gallery-editing";

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setInView(true);
      },
      { threshold },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, inView };
}

interface GalleryCardProps {
  item: DesignProject;
  delay?: number;
  featured?: boolean;
  onOpen: (item: DesignProject) => void;
}

export default function GalleryCard({
  item,
  delay = 0,
  onOpen,
}: GalleryCardProps) {
  const { ref, inView } = useInView();

  return (
    <div
      ref={ref}
      className="gc-accordion-wrap"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView
          ? "translateY(0)"
          : "translateY(30px)",
        transition: `opacity 0.6s ${delay}ms ease, transform 0.6s ${delay}ms ease, flex 0.6s cubic-bezier(0.25, 1, 0.5, 1)`,
      }}
      onClick={() => onOpen(item)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter") onOpen(item);
      }}
      aria-label={`View ${item.title}`}
    >
      <div className="gc-accordion-inner">
        <Image
          src={item.coverImage}
          alt={item.title}
          fill
          className="gc-accordion-img"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        
        <div className="gc-accordion-overlay" />

        {/* Content visible only on hover/expansion */}
        <div className="gc-accordion-content">
          <div className="gc-accordion-text">
            <span className="gc-cat">{item.category}</span>
            <h3 className="gc-title">{item.title}</h3>
            {item.year && <span className="gc-year">{item.year}</span>}
          </div>
          <div className="gc-icon-wrap">
            <ArrowUpRight size={24} />
          </div>
        </div>

        {/* Vertical title (visible when collapsed) */}
        <div className="gc-vertical-title">
          <span>{item.title}</span>
        </div>
      </div>

      <style>{`
        /* 
          The wrap controls the flex-grow behavior for the accordion.
          It defaults to flex 1, but expands to flex 4 (or 5) on hover.
        */
        .gc-accordion-wrap {
          position: relative;
          flex: 1 1 10%;
          min-width: 80px; /* Minimum width when compressed */
          height: 480px;   /* Fixed height for the accordion slice */
          border-radius: 20px;
          overflow: hidden;
          cursor: pointer;
          /* Transition for flex-grow expansion */
        }

        .gc-accordion-wrap:hover {
          flex: 1 1 60%;
        }

        .gc-accordion-inner {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          background: var(--secondary);
        }

        .gc-accordion-img {
          object-fit: cover;
          transition: transform 0.8s cubic-bezier(0.25, 1, 0.5, 1), filter 0.5s ease;
          filter: grayscale(80%) brightness(0.7);
        }

        .gc-accordion-wrap:hover .gc-accordion-img {
          transform: scale(1.05);
          filter: grayscale(0%) brightness(1);
        }

        .gc-accordion-overlay {
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

        .gc-accordion-wrap:hover .gc-accordion-overlay {
          opacity: 1;
        }

        /* Vertical title shown when collapsed */
        .gc-vertical-title {
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

        .gc-accordion-wrap:hover .gc-vertical-title {
          opacity: 0;
        }

        /* Expanded Content */
        .gc-accordion-content {
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
          min-width: 300px; /* Prevents text squishing during animation */
        }

        .gc-accordion-wrap:hover .gc-accordion-content {
          opacity: 1;
          transform: translateY(0);
          transition-delay: 0.1s;
        }

        .gc-accordion-text {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }

        .gc-cat {
          font-family: var(--font-montserrat), sans-serif;
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--primary);
        }

        .gc-title {
          font-family: var(--font-montserrat), serif;
          font-size: 1.8rem;
          font-weight: 800;
          color: white;
          margin: 0;
          line-height: 1.1;
          letter-spacing: -0.02em;
        }

        .gc-year {
          font-family: 'Fira Code', monospace;
          font-size: 0.8rem;
          color: rgba(255,255,255,0.6);
        }

        .gc-icon-wrap {
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

        .gc-accordion-wrap:hover .gc-icon-wrap {
          transform: rotate(45deg); /* Arrow points right up */
        }

        /* Mobile Adjustments: Disable accordion, show standard stacked cards */
        @media (max-width: 768px) {
          .gc-accordion-wrap {
            flex: none;
            width: 100%;
            height: 350px; /* Fixed standard height */
          }

          .gc-accordion-wrap:hover {
            flex: none;
            height: 350px; /* No expansion */
          }

          .gc-accordion-img {
            filter: grayscale(0%) brightness(1); /* Always full color */
          }

          .gc-accordion-overlay {
            opacity: 1; /* Always show gradient */
          }

          .gc-accordion-content {
            opacity: 1; /* Always show text */
            transform: translateY(0);
            pointer-events: auto;
            padding: 1.5rem;
            min-width: unset;
          }

          .gc-vertical-title {
            display: none; /* Hide vertical title */
          }

          .gc-title {
            font-size: 1.4rem;
          }
        }
      `}</style>
    </div>
  );
}
