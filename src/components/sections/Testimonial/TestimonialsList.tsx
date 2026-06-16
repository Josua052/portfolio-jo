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
          fill={s <= rating ? "var(--foreground)" : "none"}
          stroke={s <= rating ? "var(--foreground)" : "currentColor"}
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

  return (
    <>
      <div className="tk-scene" id="tk-scene">
        <div className="tk-track" id="tk-track" style={{ animationDuration: `${itemCount * 8}s` }}>
          {looped.map((item, i) => {
            const realIdx = i % itemCount;

            return (
              <div className="tk-slot" key={`${item.id}-${i}`}>
                <div className="tk-card">
                  {/* Custom golden quote mark */}
                  <div className="tk-quote-mark" aria-hidden="true">
                    <span>/</span><span>/</span>
                  </div>

                  {/* Testimonial body */}
                  <blockquote className="tk-message">{item.message}</blockquote>

                  <hr className="tk-divider" />

                  {/* Footer: avatar + details */}
                  <div className="tk-footer">
                    <Avatar name={item.name} index={realIdx} />
                    <div className="tk-footer-text">
                      <p className="tk-name">{item.name}</p>
                      {(item.role || item.company) && (
                        <p className="tk-role-company">
                          {[item.role, item.company].filter(Boolean).join(" di ")}
                        </p>
                      )}
                      <div className="tk-meta-row">
                        {item.rating && <StarRating rating={item.rating} />}
                        <span className="tk-dot">•</span>
                        <span>{new Date(item.created_at).toLocaleDateString('en-US', { month: 'short', year: 'numeric'})}</span>
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
        /* ── Scene ── */
        .tk-scene {
          overflow: hidden;
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          mask-image: linear-gradient(to bottom, transparent, black 5%, black 95%, transparent);
          -webkit-mask-image: linear-gradient(to bottom, transparent, black 5%, black 95%, transparent);
        }

        /* ── Track ── */
        .tk-track {
          display: flex;
          flex-direction: column;
          gap: 24px;
          height: max-content;
          will-change: transform;
          animation-name: tk-scroll-y;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }

        @keyframes tk-scroll-y {
          from { transform: translateY(0); }
          to   { transform: translateY(-33.33333%); }
        }

        .tk-track:hover {
          animation-play-state: paused;
        }

        /* ── Slot ── */
        .tk-slot {
          width: 100%;
          flex-shrink: 0;
        }

        /* ── Card ── */
        .tk-card {
          background: var(--background);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 1.75rem 2rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          box-shadow: 0 4px 20px rgba(0,0,0,0.03);
          box-sizing: border-box;
          opacity: 0.9;
          transition: opacity 0.35s ease, border-color 0.35s ease, box-shadow 0.35s ease;
        }

        .tk-card:hover {
          opacity: 1;
          border-color: rgba(0,0,0,0.1);
          box-shadow: 0 8px 30px rgba(0,0,0,0.06);
        }

        /* ── Quote mark ── */
        .tk-quote-mark {
          display: flex;
          gap: 2px;
          font-size: 1.5rem;
          font-weight: 900;
          font-style: italic;
          line-height: 1;
          margin-bottom: 0.5rem;
          color: var(--foreground);
        }
        .tk-quote-mark span:nth-child(2) {
          opacity: 0.5;
        }

        /* ── Message ── */
        .tk-message {
          font-size: 0.95rem;
          line-height: 1.8;
          color: var(--muted);
          margin: 0;
          overflow-wrap: break-word;
          word-break: break-word;
        }

        /* ── Divider ── */
        .tk-divider {
          border: 0;
          height: 1px;
          background: var(--border);
          margin: 0.5rem 0;
          opacity: 0.6;
        }

        /* ── Stars ── */
        .tk-stars {
          display: flex;
          align-items: center;
          gap: 3px;
        }

        /* ── Footer ── */
        .tk-footer {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .tk-avatar {
          width: 42px;
          height: 42px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.75rem;
          font-weight: 700;
          flex-shrink: 0;
          letter-spacing: 0.03em;
        }

        .tk-footer-text {
          display: flex;
          flex-direction: column;
          gap: 0.2rem;
          flex: 1;
        }

        .tk-name {
          font-size: 0.95rem;
          font-weight: 700;
          color: var(--foreground);
          margin: 0;
        }

        .tk-role-company {
          font-size: 0.75rem;
          color: var(--muted);
          margin: 0;
          opacity: 0.8;
        }

        .tk-meta-row {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.75rem;
          color: var(--muted);
        }

        .tk-dot {
          opacity: 0.5;
        }
      `}</style>
    </>
  );
}