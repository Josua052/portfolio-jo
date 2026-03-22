// src/components/event/EventExperienceSection.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import EventCard from "./EventCard";
import { EventExperience } from "@/types/event";

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

function useInView(threshold = 0.15) {
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

export default function EventExperienceSection() {
  const [events, setEvents]         = useState<EventExperience[]>([]);
  const [activeFilter, setFilter]   = useState<EventExperience["category"] | "all">("all");
  const { ref: headRef, inView: headIn } = useInView(0.3);

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

  const filtered =
    activeFilter === "all"
      ? events
      : events.filter((e) => e.category === activeFilter);

  return (
    <section className="ev-section">
      <div className="container-custom">

        {/* ── Heading ── */}
        <div
          ref={headRef}
          className="ev-heading-wrap"
          style={{
            opacity: headIn ? 1 : 0,
            transform: headIn ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.6s ease, transform 0.6s ease",
          }}
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
                { value: events.length.toString(),                                     label: "Total" },
                { value: events.filter((e) => e.highlight).length.toString(),         label: "Featured" },
                { value: Array.from(presentCategories).length.toString(),             label: "Types" },
              ].map((s) => (
                <div key={s.label} className="ev-stat">
                  <span className="ev-stat-value">{s.value}</span>
                  <span className="ev-stat-label">{s.label}</span>
                </div>
              ))}
            </div>
          )}
        </div>

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

        {/* ── Grid ── */}
        {filtered.length > 0 ? (
          <div className="ev-grid">
            {filtered.map((event, i) => (
              <EventCard key={event.id} item={event} delay={(i % 2) * 100} />
            ))}
          </div>
        ) : (
          <div className="ev-empty">
            <span>No events yet.</span>
          </div>
        )}
      </div>

      <style>{`
        .ev-section {
          background: var(--background);
          color: var(--foreground);
          padding: 5rem 1.5rem 7rem;
        }

        /* Heading */
        .ev-heading-wrap {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          margin-bottom: 3rem;
        }
        .ev-eyebrow {
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.14em;
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
          font-size: clamp(2.5rem, 5vw, 4.5rem);
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
          max-width: 340px;
          font-size: 0.875rem;
          line-height: 1.75;
          color: var(--muted);
        }

        /* Stats bar */
        .ev-stats-bar {
          display: flex;
          width: fit-content;
          border: 1px solid var(--border);
          border-radius: 14px;
          overflow: hidden;
          background: var(--background);
        }
        .ev-stat {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 0.75rem 1.5rem;
          border-right: 1px solid var(--border);
          gap: 0.2rem;
        }
        .ev-stat:last-child { border-right: none; }
        .ev-stat-value {
          font-family: var(--font-montserrat), serif;
          font-size: 1.25rem;
          font-weight: 800;
          letter-spacing: -0.04em;
          color: var(--foreground);
          line-height: 1;
        }
        .ev-stat-label {
          font-size: 0.62rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--muted);
        }

        /* Filters */
        .ev-filters {
          display: flex;
          flex-wrap: wrap;
          gap: 0.4rem;
          margin-bottom: 2.5rem;
        }
        .ev-filter-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          padding: 0.35rem 0.875rem;
          border-radius: 999px;
          border: 1px solid var(--border);
          background: var(--background);
          color: var(--muted);
          font-size: 0.75rem;
          font-weight: 600;
          cursor: pointer;
          transition: border-color 0.2s, color 0.2s, background 0.2s;
          white-space: nowrap;
        }
        .ev-filter-btn:hover {
          color: var(--foreground);
          border-color: var(--foreground);
        }
        .ev-filter-active {
          background: var(--foreground) !important;
          color: var(--background) !important;
          border-color: var(--foreground) !important;
        }
        .ev-filter-count {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-width: 18px;
          height: 18px;
          padding: 0 4px;
          border-radius: 999px;
          font-size: 0.6rem;
          font-weight: 800;
          background: rgba(0,0,0,0.1);
        }
        .ev-filter-active .ev-filter-count {
          background: rgba(255,255,255,0.2);
        }

        /* Grid */
        .ev-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.5rem;
        }
        @media (min-width: 768px) {
          .ev-grid { grid-template-columns: repeat(2, 1fr); }
        }

        /* Empty */
        .ev-empty {
          padding: 4rem 0;
          text-align: center;
          font-size: 0.9rem;
          color: var(--muted);
        }

        @media (max-width: 640px) {
          .ev-heading-row { flex-direction: column; align-items: flex-start; }
        }
      `}</style>
    </section>
  );
}