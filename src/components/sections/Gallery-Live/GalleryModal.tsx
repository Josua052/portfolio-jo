// src/components/gallery/live/GalleryModal.tsx
"use client";

import { useEffect } from "react";
import Image from "next/image";
import { X, Calendar, Play } from "lucide-react";
import { GalleryItemType } from "@/types/gallery";

interface Props {
  item: GalleryItemType;
  onClose: () => void;
}

export default function GalleryModal({ item, onClose }: Props) {
  /* Lock scroll + Escape key to close */
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
      className="gmodal-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal
    >
      <div
        className="gmodal-inner"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button className="gmodal-close" onClick={onClose} aria-label="Close">
          <X size={18} />
        </button>

        {/* Media */}
        <div className="gmodal-media">
          {item.type === "image" ? (
            <Image
              src={item.src}
              alt={item.title}
              fill
              className="object-contain"
              sizes="90vw"
            />
          ) : (
            <video
              src={item.src}
              controls
              autoPlay
              className="gmodal-video"
              poster={item.thumbnail}
            />
          )}
        </div>

        {/* Info bar */}
        <div className="gmodal-info">
          <div className="gmodal-info-left">
            <span className="gmodal-type-badge">
              {item.type === "image" ? "📷 Photo" : "🎥 Video"}
            </span>
            <h2 className="gmodal-title">{item.title}</h2>
          </div>
          {item.date && (
            <div className="gmodal-date">
              <Calendar size={12} />
              {item.date}
            </div>
          )}
        </div>
      </div>

      <style>{`
        .gmodal-backdrop {
          position: fixed;
          inset: 0;
          z-index: 100;
          background: rgba(0,0,0,0.92);
          backdrop-filter: blur(20px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1.5rem;
          animation: gmodal-fade 0.2s ease;
        }
        @keyframes gmodal-fade {
          from { opacity: 0; }
          to   { opacity: 1; }
        }

        .gmodal-inner {
          position: relative;
          width: 100%;
          max-width: 900px;
          border-radius: 1.5rem;
          overflow: hidden;
          border: 1px solid rgba(255,255,255,0.1);
          background: #080808;
          display: flex;
          flex-direction: column;
          max-height: 92vh;
          animation: gmodal-rise 0.3s cubic-bezier(0.34,1.56,0.64,1);
        }
        @keyframes gmodal-rise {
          from { transform: scale(0.94) translateY(20px); opacity: 0; }
          to   { transform: scale(1) translateY(0); opacity: 1; }
        }

        .gmodal-close {
          position: absolute;
          top: 1rem;
          right: 1rem;
          z-index: 10;
          width: 36px;
          height: 36px;
          border-radius: 10px;
          border: 1px solid rgba(255,255,255,0.15);
          background: rgba(0,0,0,0.65);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background 0.2s;
          backdrop-filter: blur(6px);
        }
        .gmodal-close:hover { background: rgba(255,255,255,0.18); }

        .gmodal-media {
          position: relative;
          width: 100%;
          height: 520px;
          background: #0a0a0a;
          flex-shrink: 0;
        }
        @media (max-height: 720px) { .gmodal-media { height: 340px; } }
        @media (max-width: 640px)  { .gmodal-media { height: 260px; } }

        .gmodal-video {
          width: 100%;
          height: 100%;
          object-fit: contain;
          display: block;
        }

        .gmodal-info {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 0.75rem;
          padding: 1.25rem 1.5rem;
          border-top: 1px solid rgba(255,255,255,0.07);
        }
        .gmodal-info-left {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          flex-wrap: wrap;
        }
        .gmodal-type-badge {
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.06em;
          padding: 0.2rem 0.65rem;
          border-radius: 999px;
          border: 1px solid rgba(255,255,255,0.12);
          color: rgba(255,255,255,0.6);
          background: rgba(255,255,255,0.06);
          white-space: nowrap;
        }
        .gmodal-title {
          font-family: var(--font-montserrat), serif;
          font-size: 1rem;
          font-weight: 700;
          color: white;
          margin: 0;
          letter-spacing: -0.015em;
        }
        .gmodal-date {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.04em;
          color: rgba(255,255,255,0.35);
          white-space: nowrap;
        }
      `}</style>
    </div>
  );
}