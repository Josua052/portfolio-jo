"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { 
  IconPlus, IconMinus, 
  IconBuildingStadium, IconBolt, IconTarget, IconDeviceTv,
  IconTrophy, IconActivity, IconMedal, IconCast,
  IconMountain, IconTree, IconDroplet, IconBackpack,
  IconMap, IconSoup, IconCamera, IconWorld
} from "@tabler/icons-react";

export interface HobbyHighlight {
  icon: React.ReactNode;
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

const HOBBIES: HobbyData[] = [
  {
    id: "football",
    label: "Football",
    emoji: "⚽",
    tagline: "Every match tells a story",
    color: "#f59e0b",
    description: "Football adalah bahasa universal yang melampaui batas. Menonton laga setiap pekan adalah ritual yang tak pernah terlewat — dari liga domestik hingga panggung Eropa.",
    highlights: [
      { icon: <IconBuildingStadium size={20} stroke={1.5} />, text: "Liga Eropa Favorit" },
      { icon: <IconBolt size={20} stroke={1.5} />, text: "Klub Favorit sejak kecil" },
      { icon: <IconTarget size={20} stroke={1.5} />, text: "Selalu pantau statistik pemain" },
      { icon: <IconDeviceTv size={20} stroke={1.5} />, text: "Nonton live setiap pekan" }
    ],
    stat: { value: "10+", label: "Tahun mengikuti sepakbola" }
  },
  {
    id: "badminton",
    label: "Badminton",
    emoji: "🏸",
    tagline: "Smash harder every day",
    color: "#22c55e",
    description: "Bulutangkis mengajarkan refleks, strategi, dan mental tangguh. Olahraga ini sudah jadi bagian dari rutinitas mingguan — baik bermain maupun menonton turnamen internasional.",
    highlights: [
      { icon: <IconTrophy size={20} stroke={1.5} />, text: "Bangga dengan prestasi Indonesia" },
      { icon: <IconActivity size={20} stroke={1.5} />, text: "Rutin bermain mingguan" },
      { icon: <IconMedal size={20} stroke={1.5} />, text: "Ikuti turnamen lokal" },
      { icon: <IconCast size={20} stroke={1.5} />, text: "Pantau BWF World Tour" }
    ],
    stat: { value: "3×", label: "Per minggu main badminton" }
  },
  {
    id: "hiking",
    label: "Hiking",
    emoji: "🏔",
    tagline: "Summit fever, always",
    color: "#06B6D4",
    description: "Mendaki gunung memberi perspektif berbeda. Setiap langkah menuju puncak adalah latihan mental dan fisik yang luar biasa — dan pemandangan dari atas selalu sepadan.",
    highlights: [
      { icon: <IconMountain size={20} stroke={1.5} />, text: "Sudah mendaki beberapa gunung" },
      { icon: <IconTree size={20} stroke={1.5} />, text: "Suka jalur hutan tropis" },
      { icon: <IconDroplet size={20} stroke={1.5} />, text: "Air terjun jadi destinasi favorit" },
      { icon: <IconBackpack size={20} stroke={1.5} />, text: "Selalu siap perlengkapan lengkap" }
    ],
    stat: { value: "5+", label: "Gunung & destinasi didaki" }
  },
  {
    id: "travelling",
    label: "Travelling",
    emoji: "✈️",
    tagline: "Every city, a new story",
    color: "#6366f1",
    description: "Travelling memperluas cara pandang dan inspirasi. Setiap kota punya karakter, kuliner, dan cerita unik yang tidak bisa ditemukan dari balik layar laptop.",
    highlights: [
      { icon: <IconMap size={20} stroke={1.5} />, text: "Eksplorasi kota-kota baru" },
      { icon: <IconSoup size={20} stroke={1.5} />, text: "Kuliner lokal jadi prioritas" },
      { icon: <IconCamera size={20} stroke={1.5} />, text: "Dokumentasi setiap momen" },
      { icon: <IconWorld size={20} stroke={1.5} />, text: "Rencana jelajah Asia Tenggara" }
    ],
    stat: { value: "10+", label: "Kota yang pernah dikunjungi" }
  }
];

export default function AboutHobbies() {
  const containerRef = useRef(null);
  const inView = useInView(containerRef, { once: false, margin: "-100px" });

  // Accordion state. First one open by default.
  const [activeIdx, setActiveIdx] = useState<number | null>(0);

  return (
    <section className="hobbies-editorial-section" ref={containerRef}>
      <div className="container-custom">
        
        {/* Section heading */}
        <motion.div 
          className="hobbies-header"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 30 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <p className="hobbies-eyebrow">/ hobbies &amp; interests</p>
          <div className="hobbies-heading-row">
            <h2 className="hobbies-title">
              Beyond
              <br />
              <span className="hobbies-title-outline">the Screen</span>
            </h2>
            <p className="hobbies-desc">
              An index of passions that keep me energized and inspired outside the realm of code.
            </p>
          </div>
        </motion.div>

        {/* EDITORIAL ACCORDION LIST */}
        <div className="editorial-accordion-container">
          {HOBBIES.map((hobby, index) => {
            const isActive = activeIdx === index;
            const numStr = (index + 1).toString().padStart(2, '0');
            
            return (
              <motion.div 
                key={hobby.id} 
                className={`editorial-row ${isActive ? 'active' : ''}`}
                style={{ '--hobby-color': hobby.color } as React.CSSProperties}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 30 }}
                transition={{ duration: 0.6, delay: index * 0.1 + 0.2 }}
              >
                {/* Clickable Header Row */}
                <div 
                  className="editorial-row-header" 
                  onClick={() => setActiveIdx(isActive ? null : index)}
                >
                  <div className="header-left">
                    <span className="row-num">{numStr}</span>
                    <h3 className="row-title">{hobby.label}</h3>
                  </div>
                  
                  <div className="header-right">
                    <span className="row-tagline">{hobby.tagline}</span>
                    <div className="row-toggle">
                      {isActive ? <IconMinus size={20} stroke={1.5} /> : <IconPlus size={20} stroke={1.5} />}
                    </div>
                  </div>
                </div>

                {/* Expandable Content Area */}
                <AnimatePresence initial={false}>
                  {isActive && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      className="editorial-content-wrapper"
                    >
                      <div className="editorial-content-inner simplified">
                        
                        <div className="editorial-highlights-grid">
                          {hobby.highlights.map((hl, i) => (
                            <div className="hl-item" key={i}>
                              <span className="hl-icon">{hl.icon}</span> 
                              <span className="hl-text">{hl.text}</span>
                            </div>
                          ))}
                        </div>
                        
                        <div className="editorial-stat">
                          <strong className="stat-value">{hobby.stat.value}</strong> 
                          <span className="stat-label">{hobby.stat.label}</span>
                        </div>

                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

              </motion.div>
            );
          })}
        </div>

      </div>

      <style>{`
        /* ── Section ── */
        .hobbies-editorial-section {
          background: var(--background);
          color: var(--foreground);
          padding: 6rem 1.5rem 8rem;
        }

        /* ── Header ── */
        .hobbies-header {
          margin-bottom: 6rem;
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
          font-size: clamp(2rem, 5vw, 4.5rem);
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
          max-width: 380px;
          font-size: 0.95rem;
          line-height: 1.7;
          color: var(--muted);
          padding-bottom: 0.25rem;
          margin: 0;
        }

        /* ── Editorial Accordion List ── */
        .editorial-accordion-container {
          width: 100%;
          border-bottom: 1px solid color-mix(in srgb, var(--foreground) 15%, transparent);
        }

        .editorial-row {
          border-top: 1px solid color-mix(in srgb, var(--foreground) 15%, transparent);
        }

        /* ── Clickable Header Row ── */
        .editorial-row-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 3.5rem 0;
          cursor: pointer;
          transition: opacity 0.3s ease;
        }

        .editorial-row-header:hover {
          opacity: 0.7;
        }

        .header-left {
          display: flex;
          align-items: baseline;
          gap: 2.5rem;
        }

        .row-num {
          font-family: 'Fira Code', monospace;
          font-size: 1.25rem;
          font-weight: 600;
          color: color-mix(in srgb, var(--foreground) 40%, transparent);
        }

        .row-title {
          font-family: var(--font-montserrat), sans-serif;
          font-size: clamp(1.75rem, 6vw, 5rem);
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: -0.04em;
          margin: 0;
          color: var(--foreground);
          transition: color 0.4s ease;
        }

        /* Active highlight color */
        .editorial-row.active .row-title {
          color: var(--hobby-color);
        }

        .header-right {
          display: flex;
          align-items: center;
          gap: 4rem;
        }

        .row-tagline {
          font-size: 0.85rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          color: var(--muted);
        }

        .row-toggle {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          border: 1px solid color-mix(in srgb, var(--foreground) 20%, transparent);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--foreground);
          transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), 
                      background 0.3s ease,
                      color 0.3s ease;
        }

        .editorial-row.active .row-toggle {
          background: var(--foreground);
          color: var(--background);
          transform: rotate(180deg);
        }

        /* ── Expandable Content Area ── */
        .editorial-content-wrapper {
          overflow: hidden;
        }

        .editorial-content-inner.simplified {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-bottom: 4rem;
          padding-top: 1rem;
        }

        .editorial-highlights-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1rem 3rem;
          flex: 1;
          max-width: 800px;
        }

        .hl-item {
          display: flex;
          align-items: center;
          gap: 1.2rem;
          font-size: 0.95rem;
          font-weight: 500;
          color: var(--foreground);
          border-bottom: 1px solid color-mix(in srgb, var(--foreground) 10%, transparent);
          padding: 1.2rem 0;
        }

        .hl-icon {
          font-size: 1.25rem;
          color: var(--hobby-color);
        }

        .hl-text {
          opacity: 0.8;
        }

        .editorial-stat {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          text-align: right;
          min-width: 200px;
        }

        .stat-value {
          font-family: var(--font-montserrat), serif;
          font-size: 4rem;
          font-weight: 800;
          line-height: 0.9;
          letter-spacing: -0.04em;
          color: var(--foreground);
        }

        .stat-label {
          font-size: 0.85rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--muted);
          margin-top: 0.8rem;
        }

        /* ── Responsive Mobile ── */
        @media (max-width: 1024px) {
          .row-tagline {
            display: none;
          }
          .header-right {
            gap: 2rem;
          }
        }

        @media (max-width: 768px) {
          .hobbies-desc { font-size: 0.85rem; }
          .editorial-row-header {
            padding: 2.5rem 0;
          }
          .header-left {
            gap: 1.5rem;
          }
          .row-num {
            font-size: 1rem;
          }
          .row-toggle {
            width: 44px;
            height: 44px;
          }
          
          .editorial-content-inner.simplified {
            flex-direction: column;
            align-items: flex-start;
            gap: 3rem;
            padding-bottom: 3rem;
          }
          .editorial-highlights-grid {
            grid-template-columns: 1fr;
            width: 100%;
          }
          .editorial-stat {
            align-items: flex-start;
            text-align: left;
          }
          .hl-item {
            padding: 1rem 0;
          }
          .stat-value {
            font-size: 3rem;
          }
        }
      `}</style>
    </section>
  );
}
