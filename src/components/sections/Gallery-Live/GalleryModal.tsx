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
            {item.type === "image" ? (
              <div className="bm-img-wrap">
                <Image
                  src={item.src}
                  alt={item.title}
                  fill
                  className="bm-img"
                  sizes="(max-width: 1024px) 90vw, 60vw"
                  unoptimized
                />
              </div>
            ) : (
              <video
                src={item.src}
                controls
                autoPlay
                className="bm-video"
                poster={item.thumbnail}
              />
            )}
          </div>

          {/* Info Box */}
          <div className="bm-info-box">
            <div>
              <div className="bm-cat-wrap">
                <span className="bm-cat">
                  {item.type === "image" ? "📷 Photo" : "🎥 Video"}
                </span>
                {item.date && (
                  <span className="bm-year">
                    <Calendar size={12} style={{ display: 'inline', marginRight: '4px' }} />
                    {item.date}
                  </span>
                )}
              </div>
              <h2 className="bm-title">{item.title}</h2>
            </div>
            
            <div className="bm-caption">
              <span className="bm-caption-label">MEDIA INFO</span>
              <p style={{ margin: 0 }}>High-resolution {item.type} recorded for the live gallery. Fully unoptimized and loaded directly from source.</p>
            </div>
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
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .bm-info-box {
          flex: 1;
          background: rgba(150, 150, 150, 0.05);
          border: 1px solid rgba(150, 150, 150, 0.1);
          border-radius: 24px;
          padding: 2.5rem 2rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          gap: 2.5rem;
          overflow-y: auto;
        }

        /* Image & Video */
        .bm-img-wrap {
          position: absolute;
          inset: 0;
        }
        .bm-img {
          object-fit: contain;
          animation: bm-fade-img 0.4s ease;
        }
        .bm-video {
          width: 100%;
          height: 100%;
          object-fit: contain;
          outline: none;
        }
        @keyframes bm-fade-img {
          from { opacity: 0; filter: blur(10px); }
          to { opacity: 1; filter: blur(0); }
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
          display: flex;
          align-items: center;
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

        /* Caption inside Info Box */
        .bm-caption-label {
          font-family: 'Fira Code', monospace;
          font-size: 0.7rem;
          font-weight: 600;
          color: var(--muted);
          margin-bottom: 0.75rem;
          letter-spacing: 0.05em;
          display: block;
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
