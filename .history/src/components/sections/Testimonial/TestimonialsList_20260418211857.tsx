// src/components/testimonial/TestimonialsTicker.tsx
// Server Component — infinite staggered ticker.
// Cards offset vertically by index for an organic masonry rhythm.
// Hover pauses the animation; individual card hover lifts opacity to 1.

import { unstable_noStore as noStore } from "next/cache";
import { Star } from "lucide-react";
import { supabase } from "@/lib/supabase";

type Testimonial = {
  id: string;
  name: string;
  role: string;
  company: string;
  relation?: string;
  message: string;
  rating?: number;
  created_at: string;
};

// ── Sub-components ────────────────────────────────────────────────────────────

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="tk-stars">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          size={11}
          fill={s <= rating ? "#f59e0b" : "none"}
          stroke={s <= rating ? "#f59e0b" : "currentColor"}
          strokeWidth={1.5}
          className="tk-star-icon"
        />
      ))}
    </div>
  );
}

function Avatar({ name, index }: { name: string; index: number }) {
  const palettes = [
    { bg: "rgba(99,102,241,0.10)", color: "#6366f1" },
    { bg: "rgba(20,184,166,0.10)", color: "#14b8a6" },
    { bg: "rgba(245,158,11,0.10)", color: "#f59e0b" },
    { bg: "rgba(239,68,68,0.10)", color: "#ef4444" },
    { bg: "rgba(168,85,247,0.10)", color: "#a855f7" },
    { bg: "rgba(34,197,94,0.10)", color: "#22c55e" },
  ];
  const p = palettes[index % palettes.length];
  const initials = name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

  return (
    <div
      className="tk-avatar"
      style={{
        background: p.bg,
        color: p.color,
      }}
    >
      {initials}
    </div>
  );
}

// ── Vertical offset classes cycling per card (creates masonry feel) ───────────
const OFFSETS = ["tk-slot--flat", "tk-slot--mid", "tk-slot--tall"] as const;

// ── Main component ────────────────────────────────────────────────────────────

export default async function TestimonialsTicker() {
  noStore();

  const { data } = await supabase
    .from("testimonials")
    .select("*")
    .eq("approved", true)
    .order("created_at", { ascending: false });

  const items = (data ?? []) as Testimonial[];

  if (items.length === 0) {
    return (
      <div className="tk-empty">
        <p>Belum ada testimoni.</p>
        <style>{`
          .tk-empty {
            padding: 2.5rem 1.5rem;
            font-size: 0.875rem;
            color: var(--muted);
            text-align: center;
          }
        `}</style>
      </div>
    );
  }

  // Triple so the loop never shows a gap
  const looped = [...items, ...items, ...items];
  const itemCount = items.length;

  // Width of one unit (card + gap) for the CSS animation end value
  const CARD_W = 280;
  const GAP = 16;
  const UNIT = CARD_W + GAP;
  const scrollEnd = itemCount * UNIT;

  return (
    <>
      {/* Inline CSS custom property for the scroll distance */}
      <style>{`
        #tk-scene { --tk-scroll-end: -${scrollEnd}px; }
      `}</style>

      <div className="tk-scene" id="tk-scene">
        <div className="tk-track" id="tk-track">
          {looped.map((item, i) => {
            const realIdx = i % itemCount;
            const offsetClass = OFFSETS[i % OFFSETS.length];

            return (
              <div
                className={`tk-slot ${offsetClass}`}
                key={`${item.id}-${i}`}
              >
                <div className="tk-card">
                  {/* Opening quote mark — typographic, editorial */}
                  <span className="tk-quote" aria-hidden="true">
                    &ldquo;
                  </span>

                  {/* Testimonial body */}
                  <blockquote className="tk-message">{item.message}</blockquote>

                  {/* Star rating (if present) */}
                  {item.rating && <StarRating rating={item.rating} />}

                  {/* Footer: avatar + name + role */}
                  <div className="tk-footer">
                    <Avatar name={item.name} index={realIdx} />
                    <div className="tk-footer-text">
                      <p className="tk-name">{item.name}</p>
                      <p className="tk-meta">
                        {[item.role, item.company].filter(Boolean).join(" · ")}
                      </p>
                    </div>
                    <span className="tk-num" aria-hidden="true">
                      {String(realIdx + 1).padStart(2, "0")}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        /* ── Scene ── */
        .tk-scene {
          overflow: hidden;
          padding: 2.5rem 0 3rem;
          position: relative;
        }

        /* Edge fades */
        .tk-scene::before,
        .tk-scene::after {
          content: '';
          position: absolute;
          top: 0; bottom: 0;
          width: 80px;
          z-index: 10;
          pointer-events: none;
        }
        .tk-scene::before {
          left: 0;
          background: linear-gradient(to right, var(--background) 0%, transparent 100%);
        }
        .tk-scene::after {
          right: 0;
          background: linear-gradient(to left, var(--background) 0%, transparent 100%);
        }

        /* ── Track ── */
        .tk-track {
          display: flex;
          align-items: flex-start;
          gap: ${GAP}px;
          width: max-content;
          will-change: transform;
          animation: tk-scroll ${itemCount * 5.5}s linear infinite;
        }

        @keyframes tk-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(var(--tk-scroll-end)); }
        }

        .tk-track:hover {
          animation-play-state: paused;
        }

        /* ── Slot (card wrapper with stagger) ── */
        .tk-slot {
          flex-shrink: 0;
          width: ${CARD_W}px;
          /* Default: no vertical offset */
        }

        .tk-slot--flat   { margin-top: 0; }
        .tk-slot--mid    { margin-top: 28px; }
        .tk-slot--tall   { margin-top: 52px; }

        /* ── Card ── */
        .tk-card {
          background: var(--background);
          border: 0.5px solid var(--border);
          border-radius: 1rem;
          padding: 1.375rem 1.375rem 1.25rem;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          box-sizing: border-box;
          opacity: 0.65;
          transition: opacity 0.35s ease, border-color 0.35s ease;
          cursor: default;
        }

        .tk-slot:hover .tk-card {
          opacity: 1;
          border-color: var(--foreground);
        }

        /* ── Quote mark ── */
        .tk-quote {
          font-size: 2.25rem;
          line-height: 1;
          color: var(--border);
          font-family: Georgia, 'Times New Roman', serif;
          display: block;
          margin-bottom: -0.25rem;
          user-select: none;
        }

        /* ── Message ── */
        .tk-message {
          font-size: 0.8375rem;
          line-height: 1.8;
          color: var(--muted);
          margin: 0;
          flex: 1;
          overflow-wrap: break-word;
          word-break: break-word;
          display: -webkit-box;
          -webkit-line-clamp: 6;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        /* ── Stars ── */
        .tk-stars {
          display: flex;
          align-items: center;
          gap: 3px;
        }
        .tk-star-icon {
          color: var(--border);
        }

        /* ── Footer ── */
        .tk-footer {
          display: flex;
          align-items: center;
          gap: 0.625rem;
          padding-top: 0.875rem;
          border-top: 0.5px solid var(--border);
        }

        .tk-avatar {
          width: 34px;
          height: 34px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.68rem;
          font-weight: 700;
          flex-shrink: 0;
          letter-spacing: 0.03em;
        }

        .tk-footer-text {
          display: flex;
          flex-direction: column;
          gap: 0.1rem;
          min-width: 0;
          flex: 1;
        }

        .tk-name {
          font-size: 0.8125rem;
          font-weight: 700;
          letter-spacing: -0.01em;
          color: var(--foreground);
          margin: 0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .tk-meta {
          font-size: 0.7rem;
          color: var(--muted);
          margin: 0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .tk-num {
          font-size: 0.65rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          color: var(--border);
          flex-shrink: 0;
          align-self: flex-end;
        }
      `}</style>
    </>
  );
}