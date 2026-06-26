"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Calendar, MapPin, Sparkles } from "lucide-react";
import { EventExperience } from "@/types/event";
import { motion, useScroll, useTransform } from "framer-motion";

const CATEGORY_FILTERS: {
  value: EventExperience["category"] | "all";
  label: string;
  emoji: string;
}[] = [
  { value: "all",         label: "All",         emoji: "✦" },
  { value: "festival",    label: "Festival",    emoji: "🎪" },
  { value: "competition", label: "Competition", emoji: "🏆" },
  { value: "workshop",    label: "Workshop",    emoji: "🛠" },
  { value: "live-event",  label: "Live",        emoji: "🎤" },
  { value: "other",       label: "Other",       emoji: "📌" },
];

/* ─────────────────────────────────────────────
   Animated Accordion Item (Framer Motion)
───────────────────────────────────────────── */
function AnimatedEventAccordionItem({ 
  event, 
  isActive, 
  onToggle, 
  onHover 
}: { 
  event: EventExperience; 
  isActive: boolean; 
  onToggle: () => void;
  onHover: () => void;
}) {
  const itemRef = useRef<HTMLDivElement>(null);

  // Scroll animations for individual accordion items
  const { scrollYProgress } = useScroll({
    target: itemRef,
    offset: ["start end", "end start"],
  });

  const yScroll = useTransform(scrollYProgress, [0, 0.5, 1], [80, 0, -40]);
  const opacityScroll = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scaleScroll = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.95, 1, 1, 0.95]);

  return (
    <motion.div 
      ref={itemRef}
      style={{
        y: yScroll,
        opacity: opacityScroll,
        scale: scaleScroll,
      }}
      className={`ev-accordion-item ${isActive ? 'active' : ''}`}
      onClick={onToggle}
      onMouseEnter={onHover}
    >
      <div className="ev-accordion-header">
        <div className="ev-acc-header-left">
          <div className="ev-acc-title-wrap">
            {event.highlight && <Sparkles size={20} className="text-yellow-500 flex-shrink-0" />}
            <h2 className="ev-acc-title">{event.title}</h2>
          </div>
          <p className="ev-acc-org">{event.organization}</p>
        </div>
        
        <div className="ev-acc-header-right">
          <div className="ev-acc-period">{event.period}</div>
          <div className={`ev-acc-icon ${isActive ? 'rotate' : ''}`}>
            <ArrowUpRight size={24} />
          </div>
        </div>
      </div>

      <div className="ev-accordion-content">
        <div className="ev-accordion-content-inner">
          <div className="ev-acc-details">
            {/* Detail Left: Meta & Tags */}
            <div className="ev-acc-meta-side">
              <div className="ev-acc-role">{event.role}</div>
              
              {event.location && (
                <div className="ev-acc-location">
                  <MapPin size={14} className="mr-2" />
                  {event.location}
                </div>
              )}

              <div className="ev-acc-tags">
                {event.tags.map(tag => (
                  <span key={tag} className="ev-acc-tag">{tag}</span>
                ))}
              </div>
            </div>

            {/* Detail Right: Points */}
            <div className="ev-acc-points-side">
              <ul className="ev-acc-points">
                {event.points.map((pt, i) => (
                  <li key={i}>
                    <span className="ev-acc-point-bullet"></span>
                    {pt}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      {/* Hover background effect */}
      <div className="ev-acc-bg-hover"></div>
    </motion.div>
  );
}

export default function EventExperienceSection() {
  const [events, setEvents] = useState<EventExperience[]>([]);
  const [activeFilter, setFilter] = useState<EventExperience["category"] | "all">("all");
  const [activeIndex, setActiveIndex] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    import("@/data/event-experiences.json").then((mod) => {
      setEvents(mod.default as EventExperience[]);
    });
  }, []);

  /* Available categories from data */
  const presentCategories = new Set(events.map((e) => e.category));
  const visibleFilters = CATEGORY_FILTERS.filter(
    (f) => f.value === "all" || presentCategories.has(f.value as EventExperience["category"])
  );

  const filtered = activeFilter === "all"
    ? events
    : events.filter((e) => e.category === activeFilter);

  useEffect(() => {
    if (filtered.length > 0) {
      setActiveIndex(filtered[0].id);
    } else {
      setActiveIndex(null);
    }
  }, [activeFilter, events.length]);

  // Header Parallax
  const { scrollYProgress: headScroll } = useScroll({
    target: containerRef,
    offset: ["start end", "center center"],
  });
  const headY = useTransform(headScroll, [0, 1], [100, 0]);
  const headOpacity = useTransform(headScroll, [0, 0.8], [0, 1]);

  return (
    <section className="ev-section" ref={containerRef}>
      <div className="container-custom">

        {/* ── Heading ── */}
        <motion.div
          className="ev-heading-wrap"
          style={{ y: headY, opacity: headOpacity }}
        >
          <p className="ev-eyebrow">/ event experience</p>

          <div className="ev-heading-row">
            <h1 className="ev-heading">
              Event<br />
              <span className="ev-heading-outline">Experience</span>
            </h1>
            <p className="ev-heading-sub">
              Creative involvement in live events, visual performance,
              competitions, and motion design experiences.
            </p>
          </div>

          {/* Stats bar */}
          {events.length > 0 && (
            <div className="ev-stats-bar">
              {[
                { value: events.length.toString(), label: "Total" },
                { value: events.filter((e) => e.highlight).length.toString(), label: "Featured" },
                { value: Array.from(presentCategories).length.toString(), label: "Types" },
              ].map((s) => (
                <div key={s.label} className="ev-stat">
                  <span className="ev-stat-value">{s.value}</span>
                  <span className="ev-stat-label">{s.label}</span>
                </div>
              ))}
            </div>
          )}
        </motion.div>

        {/* ── Filter pills ── */}
        {visibleFilters.length > 1 && (
          <div className="ev-filters">
            {visibleFilters.map((f) => (
              <button
                key={f.value}
                className={`ev-filter-btn ${activeFilter === f.value ? "ev-filter-active" : ""}`}
                onClick={() => setFilter(f.value)}
              >
                <span>{f.emoji}</span>
                {f.label}
                <span className="ev-filter-count">
                  {f.value === "all"
                    ? events.length
                    : events.filter((e) => e.category === f.value).length}
                </span>
              </button>
            ))}
          </div>
        )}

        {/* ── Fluid Expandable Accordion with Parallax ── */}
        {filtered.length > 0 ? (
          <div className="ev-accordion">
            {filtered.map((event) => (
              <AnimatedEventAccordionItem
                key={event.id}
                event={event}
                isActive={activeIndex === event.id}
                onToggle={() => setActiveIndex(activeIndex === event.id ? null : event.id)}
                onHover={() => {
                  if (window.innerWidth >= 1024) setActiveIndex(event.id);
                }}
              />
            ))}
          </div>
        ) : (
          <div className="ev-empty">
            <span>No events found.</span>
          </div>
        )}
      </div>

      <style>{`
        .ev-section {
          background: var(--background);
          color: var(--foreground);
          padding: 6rem 1.5rem 8rem;
          overflow: hidden;
        }

        /* ── Heading ── */
        .ev-heading-wrap {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          margin-bottom: 4rem;
        }
        .ev-eyebrow {
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--muted);
        }
        .ev-heading-row {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 2rem;
          flex-wrap: wrap;
        }
        .ev-heading {
          font-family: var(--font-montserrat), Georgia, serif;
          font-size: clamp(2rem, 5vw, 5rem);
          font-weight: 800;
          letter-spacing: -0.035em;
          line-height: 0.95;
          color: var(--foreground);
          margin: 0;
        }
        .ev-heading-outline {
          -webkit-text-stroke: 1.5px var(--foreground);
          color: transparent;
        }
        .ev-heading-sub {
          max-width: 400px;
          font-size: 0.95rem;
          line-height: 1.75;
          color: var(--muted);
          padding-bottom: 0.5rem;
        }

        /* ── Stats ── */
        .ev-stats-bar {
          display: flex;
          gap: 2rem;
          padding-top: 1.5rem;
          border-top: 1px solid var(--border);
          margin-top: 1rem;
        }
        .ev-stat {
          display: flex;
          flex-direction: column;
          gap: 0.2rem;
        }
        .ev-stat-value {
          font-family: var(--font-montserrat), sans-serif;
          font-size: 1.5rem;
          font-weight: 800;
          color: var(--foreground);
        }
        .ev-stat-label {
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          color: var(--muted);
        }

        /* ── Filters ── */
        .ev-filters {
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem;
          margin-bottom: 3rem;
        }
        .ev-filter-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: color-mix(in srgb, var(--background) 50%, transparent);
          border: 1px solid var(--border);
          color: var(--muted);
          padding: 0.5rem 1rem;
          border-radius: 999px;
          font-size: 0.85rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .ev-filter-btn:hover {
          border-color: rgba(150, 150, 150, 0.4);
          color: var(--foreground);
        }
        .ev-filter-active {
          background: var(--foreground);
          color: var(--background);
          border-color: var(--foreground);
        }
        .ev-filter-active:hover {
          color: var(--background);
        }
        .ev-filter-count {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: var(--border);
          color: var(--muted);
          font-size: 0.65rem;
          font-weight: 700;
          min-width: 1.2rem;
          height: 1.2rem;
          border-radius: 999px;
          padding: 0 4px;
        }
        .ev-filter-active .ev-filter-count {
          background: var(--background);
          color: var(--foreground);
        }

        /* ── Accordion ── */
        .ev-accordion {
          display: flex;
          flex-direction: column;
          border-top: 2px solid var(--foreground);
        }

        .ev-accordion-item {
          position: relative;
          border-bottom: 1px solid var(--border);
          overflow: hidden;
          transition: border-color 0.4s ease;
        }

        .ev-acc-bg-hover {
          position: absolute;
          inset: 0;
          background: color-mix(in srgb, var(--foreground) 2%, transparent);
          transform: scaleY(0);
          transform-origin: top;
          transition: transform 0.4s cubic-bezier(0.25, 1, 0.5, 1);
          z-index: 0;
          pointer-events: none;
        }
        .ev-accordion-item:hover .ev-acc-bg-hover,
        .ev-accordion-item.active .ev-acc-bg-hover {
          transform: scaleY(1);
        }

        /* Header */
        .ev-accordion-header {
          position: relative;
          z-index: 10;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 2.5rem 0;
          cursor: pointer;
        }

        .ev-acc-header-left {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .ev-acc-title-wrap {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .ev-acc-title {
          font-family: var(--font-montserrat), sans-serif;
          font-size: clamp(1.2rem, 3.5vw, 2.5rem);
          font-weight: 700;
          letter-spacing: -0.02em;
          color: var(--muted);
          transition: color 0.4s ease, transform 0.4s ease;
          margin: 0;
        }
        .ev-accordion-item:hover .ev-acc-title,
        .ev-accordion-item.active .ev-acc-title {
          color: var(--foreground);
          transform: translateX(10px);
        }

        .ev-acc-org {
          font-size: 1rem;
          font-weight: 500;
          color: var(--muted);
          transition: transform 0.4s ease;
        }
        .ev-accordion-item:hover .ev-acc-org,
        .ev-accordion-item.active .ev-acc-org {
          transform: translateX(10px);
        }

        .ev-acc-header-right {
          display: flex;
          align-items: center;
          gap: 3rem;
        }

        .ev-acc-period {
          font-family: var(--font-mono), monospace;
          font-size: 0.9rem;
          color: var(--muted);
        }

        .ev-acc-icon {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          border: 1px solid var(--border);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--muted);
          transition: all 0.4s cubic-bezier(0.25, 1, 0.5, 1);
        }
        .ev-accordion-item:hover .ev-acc-icon {
          background: var(--foreground);
          color: var(--background);
          border-color: var(--foreground);
        }
        .ev-acc-icon.rotate {
          background: var(--foreground);
          color: var(--background);
          transform: rotate(45deg);
        }

        /* Content Animation (CSS Grid Hack) */
        .ev-accordion-content {
          position: relative;
          z-index: 10;
          display: grid;
          grid-template-rows: 0fr;
          transition: grid-template-rows 0.5s cubic-bezier(0.25, 1, 0.5, 1);
        }
        .ev-accordion-item.active .ev-accordion-content {
          grid-template-rows: 1fr;
        }

        .ev-accordion-content-inner {
          overflow: hidden;
          padding: 0 1rem;
          opacity: 0;
          transform: translateY(-10px);
          transition: opacity 0.4s ease, transform 0.4s ease, padding 0.5s ease;
        }
        .ev-accordion-item.active .ev-accordion-content-inner {
          opacity: 1;
          transform: translateY(0);
          padding-bottom: 3rem;
        }

        /* Details Layout */
        .ev-acc-details {
          display: flex;
          gap: 4rem;
          margin-top: 1rem;
          border-top: 1px solid color-mix(in srgb, var(--border) 50%, transparent);
          padding-top: 2rem;
        }

        .ev-acc-meta-side {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .ev-acc-role {
          font-size: 1.25rem;
          font-weight: 600;
          color: var(--foreground);
        }

        .ev-acc-location {
          display: flex;
          align-items: center;
          font-size: 0.9rem;
          color: var(--muted);
        }

        .ev-acc-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }
        .ev-acc-tag {
          padding: 0.35rem 0.85rem;
          border-radius: 999px;
          font-size: 0.75rem;
          font-family: var(--font-mono), monospace;
          background: color-mix(in srgb, var(--background) 50%, transparent);
          border: 1px solid var(--border);
          color: var(--muted);
        }

        .ev-acc-points-side {
          flex: 2;
        }

        .ev-acc-points {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .ev-acc-points li {
          font-size: 1rem;
          line-height: 1.6;
          color: var(--muted);
          display: flex;
          align-items: flex-start;
          gap: 1rem;
        }
        .ev-acc-point-bullet {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #22c55e;
          flex-shrink: 0;
          margin-top: 0.5rem;
        }

        .ev-empty {
          padding: 4rem;
          text-align: center;
          color: var(--muted);
          border: 1px dashed var(--border);
          border-radius: 12px;
        }

        /* ── Responsive ── */
        @media (max-width: 1024px) {
          .ev-acc-header-right { gap: 1rem; }
          .ev-acc-period { display: none; }
          .ev-acc-details { flex-direction: column; gap: 2rem; }
          .ev-accordion-item:hover .ev-acc-title,
          .ev-accordion-item.active .ev-acc-title { transform: translateX(0); }
          .ev-accordion-item:hover .ev-acc-org,
          .ev-accordion-item.active .ev-acc-org { transform: translateX(0); }
          .ev-accordion-content-inner { padding: 0; }
        }

        @media (max-width: 768px) {
          .ev-acc-points li { font-size: 0.85rem; }
          .ev-heading-sub { font-size: 0.85rem; }
        }
      `}</style>
    </section>
  );
}