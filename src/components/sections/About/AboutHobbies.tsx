// src/components/sections/About/AboutHobbies.tsx
"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import hobbiesData from "@/data/hobbies.json";

export interface HobbyHighlight {
  icon: string;
  text: string;
}
export interface HobbyStat {
  value: string;
  label: string;
}
export interface HobbyData {
  id: string;
  label: string;
  emoji: string;
  tagline: string;
  color: string;
  description: string;
  highlights: HobbyHighlight[];
  stat: HobbyStat;
}

const HOBBIES = hobbiesData as HobbyData[];

export default function AboutHobbies() {
  const [active, setActive] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const advance = useCallback(() => {
    setActive((p) => (p + 1) % HOBBIES.length);
  }, []);

  useEffect(() => {
    if (!isHovered) {
      timerRef.current = setInterval(advance, 5000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [advance, isHovered]);

  return (
    <section className="hobbies-section">
      <div className="container-custom">
        <div className="hobbies-header">
          <p className="hobbies-eyebrow">/ hobbies &amp; interests</p>
          <div className="hobbies-heading-row">
            <h2 className="hobbies-title">
              Beyond
              <br />
              <span className="hobbies-title-outline">the Screen</span>
            </h2>
            <p className="hobbies-desc">
              What I do when I&apos;m not coding — the passions that keep me
              energized and inspired every single day.
            </p>
          </div>
        </div>

        <div 
          className="hobbies-accordion"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {HOBBIES.map((hobby, index) => {
            const isActive = index === active;
            
            return (
              <div
                key={hobby.id}
                className={`hobby-card ${isActive ? "active" : ""}`}
                onClick={() => setActive(index)}
                style={{
                  '--hobby-color': hobby.color,
                  '--hobby-color-transparent': `${hobby.color}15`,
                  '--hobby-color-glow': `${hobby.color}30`,
                } as React.CSSProperties}
              >
                <div className="hobby-card-bg"></div>
                
                {/* Inactive State - Vertical Title */}
                <div className="hobby-collapsed">
                  <div className="hobby-icon-small-wrapper">
                    <span className="hobby-emoji-small">{hobby.emoji}</span>
                  </div>
                  <span className="hobby-title-vertical">{hobby.label}</span>
                </div>

                {/* Active State Content */}
                <div className="hobby-content">
                  <div className="hobby-content-inner">
                    <div className="hobby-header-active">
                      <div className="hobby-icon-wrapper">
                        <span className="hobby-emoji-large">{hobby.emoji}</span>
                      </div>
                      <div>
                        <h3 className="hobby-active-title">{hobby.label}</h3>
                        <span className="hobby-tagline">{hobby.tagline}</span>
                      </div>
                    </div>

                    <p className="hobby-description">{hobby.description}</p>

                    <div className="hobby-highlights-grid">
                      {hobby.highlights.map((hl, i) => (
                        <div key={i} className="hobby-highlight-item">
                          <span className="hl-icon">{hl.icon}</span>
                          <span className="hl-text">{hl.text}</span>
                        </div>
                      ))}
                    </div>

                    <div className="hobby-footer">
                      <div className="hobby-stat-box">
                        <span className="stat-val">{hobby.stat.value}</span>
                        <span className="stat-lbl">{hobby.stat.label}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        .hobbies-section {
          padding: 6rem 1.5rem;
          background: var(--background);
          position: relative;
          overflow: hidden;
        }

        .hobbies-header {
          margin-bottom: 4rem;
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .hobbies-eyebrow {
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--muted);
          margin: 0;
        }

        .hobbies-heading-row {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 2rem;
          flex-wrap: wrap;
        }

        .hobbies-title {
          font-family: var(--font-montserrat), Georgia, serif;
          font-size: clamp(2.5rem, 5vw, 4.5rem);
          font-weight: 800;
          letter-spacing: -0.035em;
          line-height: 0.95;
          color: var(--foreground);
          margin: 0;
        }

        .hobbies-title-outline {
          -webkit-text-stroke: 1.5px var(--foreground);
          color: transparent;
        }

        .hobbies-desc {
          max-width: 320px;
          font-size: 0.875rem;
          line-height: 1.7;
          color: var(--muted);
          padding-bottom: 0.25rem;
          margin: 0;
        }

        .hobbies-accordion {
          display: flex;
          gap: 1rem;
          height: 540px;
          width: 100%;
          max-width: 1100px;
          margin: 0 auto;
        }

        .hobby-card {
          position: relative;
          border-radius: 32px;
          overflow: hidden;
          cursor: pointer;
          flex: 1;
          min-width: 90px;
          background: color-mix(in srgb, var(--foreground) 3%, transparent);
          border: 1px solid color-mix(in srgb, var(--foreground) 8%, transparent);
          transition: flex 0.7s cubic-bezier(0.32, 0.72, 0, 1), 
                      background 0.4s ease, 
                      border-color 0.4s ease,
                      box-shadow 0.4s ease;
        }

        .hobby-card.active {
          flex: 7;
          cursor: default;
          background: var(--hobby-color-transparent);
          border-color: var(--hobby-color-glow);
          box-shadow: 0 20px 50px -15px var(--hobby-color-glow);
        }

        .hobby-card-bg {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at bottom right, var(--hobby-color-glow) 0%, transparent 65%);
          opacity: 0;
          transition: opacity 0.7s ease;
          z-index: 0;
          pointer-events: none;
        }

        .hobby-card.active .hobby-card-bg {
          opacity: 1;
        }

        .hobby-collapsed {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-end;
          padding-bottom: 2.5rem;
          gap: 1.5rem;
          opacity: 1;
          transition: opacity 0.3s ease 0.2s;
          z-index: 2;
        }

        .hobby-card.active .hobby-collapsed {
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.2s ease;
        }

        .hobby-icon-small-wrapper {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: color-mix(in srgb, var(--foreground) 5%, transparent);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.3s ease, background 0.3s ease;
        }

        .hobby-emoji-small {
          font-size: 1.5rem;
          filter: grayscale(0.8);
          transition: filter 0.3s ease;
        }

        .hobby-card:hover .hobby-icon-small-wrapper {
          transform: translateY(-5px);
          background: color-mix(in srgb, var(--foreground) 8%, transparent);
        }

        .hobby-card:hover .hobby-emoji-small {
          filter: grayscale(0);
        }

        .hobby-title-vertical {
          writing-mode: vertical-rl;
          transform: rotate(180deg);
          font-weight: 700;
          font-size: 1.1rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--foreground);
          opacity: 0.6;
          white-space: nowrap;
          font-family: var(--font-sans), sans-serif;
          transition: opacity 0.3s ease;
        }

        .hobby-card:hover .hobby-title-vertical {
          opacity: 0.9;
        }

        .hobby-content {
          position: absolute;
          inset: 0;
          padding: 3rem;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.4s ease 0.1s;
          z-index: 2;
          overflow-y: auto;
          scrollbar-width: thin;
          scrollbar-color: var(--hobby-color) transparent;
        }

        .hobby-content::-webkit-scrollbar {
          width: 4px;
        }
        .hobby-content::-webkit-scrollbar-thumb {
          background-color: var(--hobby-color);
          border-radius: 4px;
        }

        .hobby-card.active .hobby-content {
          opacity: 1;
          pointer-events: auto;
          transition: opacity 0.6s ease 0.3s;
        }

        .hobby-content-inner {
          display: flex;
          flex-direction: column;
          height: 100%;
          min-width: 450px;
        }

        .hobby-header-active {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        .hobby-icon-wrapper {
          width: 72px;
          height: 72px;
          border-radius: 20px;
          background: color-mix(in srgb, var(--foreground) 5%, transparent);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--foreground) 10%, transparent);
          backdrop-filter: blur(10px);
        }

        .hobby-emoji-large {
          font-size: 2.5rem;
        }

        .hobby-active-title {
          font-size: 2.25rem;
          font-weight: 800;
          margin: 0 0 0.25rem 0;
          color: var(--foreground);
          font-family: var(--font-montserrat), sans-serif;
          letter-spacing: -0.02em;
        }

        .hobby-tagline {
          font-size: 0.95rem;
          color: var(--hobby-color);
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          font-family: var(--font-sans), sans-serif;
        }

        .hobby-description {
          font-size: 1.05rem;
          line-height: 1.7;
          color: var(--muted);
          margin-bottom: 2.5rem;
          max-width: 550px;
          font-family: var(--font-sans), sans-serif;
        }

        .hobby-highlights-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1rem;
          margin-bottom: auto;
          max-width: 550px;
        }

        .hobby-highlight-item {
          display: flex;
          align-items: center;
          gap: 0.875rem;
          padding: 1rem 1.25rem;
          background: color-mix(in srgb, var(--foreground) 3%, transparent);
          border-radius: 16px;
          border: 1px solid color-mix(in srgb, var(--foreground) 6%, transparent);
          transition: transform 0.2s ease, background 0.2s ease;
        }

        .hobby-highlight-item:hover {
          transform: translateY(-2px);
          background: color-mix(in srgb, var(--foreground) 6%, transparent);
        }

        .hl-icon {
          font-size: 1.25rem;
        }

        .hl-text {
          font-size: 0.9rem;
          font-weight: 500;
          color: var(--foreground);
          opacity: 0.9;
          font-family: var(--font-sans), sans-serif;
        }

        .hobby-footer {
          margin-top: 2rem;
          padding-top: 2rem;
          border-top: 1px solid color-mix(in srgb, var(--foreground) 10%, transparent);
        }

        .hobby-stat-box {
          display: flex;
          align-items: baseline;
          gap: 0.75rem;
        }

        .stat-val {
          font-size: 3rem;
          font-weight: 800;
          color: var(--hobby-color);
          line-height: 1;
          font-family: var(--font-montserrat), sans-serif;
        }

        .stat-lbl {
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--muted);
          text-transform: uppercase;
          letter-spacing: 0.1em;
          font-family: var(--font-sans), sans-serif;
        }

        /* Responsive Design */
        @media (max-width: 900px) {
          .hobbies-accordion {
            flex-direction: column;
            height: auto;
            min-height: 600px;
          }

          .hobby-card {
            min-height: 85px;
            border-radius: 24px;
          }

          .hobby-card.active {
            min-height: 500px;
          }

          .hobby-collapsed {
            flex-direction: row;
            justify-content: flex-start;
            padding: 0 1.5rem;
            align-items: center;
            gap: 1rem;
          }

          .hobby-icon-small-wrapper {
            width: 40px;
            height: 40px;
          }

          .hobby-emoji-small {
            font-size: 1.25rem;
          }

          .hobby-title-vertical {
            writing-mode: horizontal-tb;
            transform: none;
            margin-left: 0.5rem;
          }

          .hobby-content {
            padding: 1.75rem;
          }

          .hobby-content-inner {
            min-width: 100%;
          }

          .hobby-highlights-grid {
            grid-template-columns: 1fr;
            max-width: 100%;
          }
          
          .hobby-header-active {
            flex-direction: column;
            align-items: flex-start;
            gap: 1rem;
          }

          .hobbies-heading-row { flex-direction: column; align-items: flex-start; }
        }
      `}</style>
    </section>
  );
}
