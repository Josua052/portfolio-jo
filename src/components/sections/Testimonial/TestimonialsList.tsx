// src/components/testimonial/TestimonialsList.tsx
import { Star, Quote } from "lucide-react";
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

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="tl-stars">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          size={12}
          fill={s <= rating ? "#f59e0b" : "none"}
          stroke={s <= rating ? "#f59e0b" : "var(--border)"}
          strokeWidth={1.5}
        />
      ))}
    </div>
  );
}

function Avatar({ name, index }: { name: string; index: number }) {
  // Cycle through muted accent colors — no hardcoded branding
  const palettes = [
    { bg: "rgba(99,102,241,0.12)", color: "#6366f1" },
    { bg: "rgba(34,197,94,0.12)", color: "#22c55e" },
    { bg: "rgba(245,158,11,0.12)", color: "#f59e0b" },
    { bg: "rgba(6,182,212,0.12)", color: "#06B6D4" },
    { bg: "rgba(239,68,68,0.12)", color: "#ef4444" },
  ];
  const p = palettes[index % palettes.length];

  return (
    <div
      className="tl-avatar"
      style={{ background: p.bg, color: p.color, borderColor: `${p.color}30` }}
    >
      {name.charAt(0).toUpperCase()}
    </div>
  );
}

function TestimonialCard({
  item,
  index,
}: {
  item: Testimonial;
  index: number;
}) {
  return (
    <div className="tl-card">
      {/* Accent top bar */}
      <div className="tl-accent-bar" />

      {/* Quote icon */}
      <div className="tl-quote-icon">
        <Quote size={16} />
      </div>

      {/* Rating */}
      {item.rating && <StarRating rating={item.rating} />}

      {/* Message */}
      <blockquote className="tl-message">
        &ldquo;{item.message}&rdquo;
      </blockquote>

      {/* Footer */}
      <div className="tl-footer">
        <Avatar name={item.name} index={index} />
        <div className="tl-footer-text">
          <p className="tl-name">{item.name}</p>
          <p className="tl-meta">
            {item.role && <span>{item.role}</span>}
            {item.role && item.company && <span className="tl-dot">·</span>}
            {item.company && <span>{item.company}</span>}
          </p>
          {item.relation && (
            <span className="tl-relation">{item.relation}</span>
          )}
        </div>
      </div>

      <style>{`
        .tl-card {
          position: relative;
          background: var(--background);
          border: 1px solid var(--border);
          border-radius: 1.25rem;
          padding: 1.625rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          overflow: hidden;
          transition: border-color 0.3s, box-shadow 0.3s, transform 0.3s;
          break-inside: avoid;
          /* Prevent card from overflowing its column */
          box-sizing: border-box;
          max-width: 100%;
          word-break: break-word;
          overflow-wrap: break-word;
        }
        .tl-card:hover {
          border-color: var(--foreground);
          box-shadow: 0 8px 32px rgba(0,0,0,0.07);
          transform: translateY(-3px);
        }

        .tl-accent-bar {
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: var(--border);
          opacity: 0;
          transition: opacity 0.3s;
          border-radius: 1.25rem 1.25rem 0 0;
        }
        .tl-card:hover .tl-accent-bar { opacity: 1; }

        .tl-quote-icon {
          color: var(--border);
          transition: color 0.3s;
        }
        .tl-card:hover .tl-quote-icon { color: var(--muted); }

        .tl-stars { display: flex; align-items: center; gap: 2px; }

        .tl-message {
          font-size: 0.875rem;
          line-height: 1.75;
          color: var(--muted);
          margin: 0;
          font-style: italic;
          flex: 1;
          overflow-wrap: break-word;
          word-break: break-word;
        }
        .tl-card:hover .tl-message { color: var(--foreground); opacity: 0.8; }

        .tl-footer {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding-top: 0.75rem;
          border-top: 1px solid var(--border);
        }

        .tl-avatar {
          width: 40px; height: 40px;
          border-radius: 50%;
          border: 1.5px solid;
          display: flex; align-items: center; justify-content: center;
          font-family: var(--font-montserrat), serif;
          font-size: 0.875rem; font-weight: 800;
          flex-shrink: 0;
          letter-spacing: -0.01em;
        }

        .tl-footer-text { display: flex; flex-direction: column; gap: 0.15rem; min-width: 0; }
        .tl-name {
          font-size: 0.875rem; font-weight: 700;
          letter-spacing: -0.01em; color: var(--foreground);
          margin: 0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }
        .tl-meta {
          display: flex; align-items: center; gap: 0.3rem;
          font-size: 0.72rem; color: var(--muted); margin: 0;
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }
        .tl-dot { opacity: 0.4; }
        .tl-relation {
          font-size: 0.62rem; font-weight: 700;
          letter-spacing: 0.07em; text-transform: uppercase;
          color: var(--muted); opacity: 0.7;
        }
      `}</style>
    </div>
  );
}

export default async function TestimonialsList() {
  const { data } = await supabase
    .from("testimonials")
    .select("*")
    .eq("approved", true) // only show approved
    .order("created_at", { ascending: false });

  const items = (data ?? []) as Testimonial[];

  if (items.length === 0) {
    return (
      <div className="tl-empty">
        <p></p>
        <style>{`
          .tl-empty {
            padding: 4rem 0; text-align: center;
            font-size: 0.875rem; color: var(--muted);
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="tl-grid">
      {items.map((item, i) => (
        <TestimonialCard key={item.id} item={item} index={i} />
      ))}

      <style>{`
        .tl-grid {
          columns: 1;
          column-gap: 1.25rem;
          width: 100%;
          /* Prevent columns from causing horizontal scroll */
          overflow: hidden;
        }
        @media (min-width: 640px)  { .tl-grid { columns: 2; column-gap: 1.25rem; } }
        @media (min-width: 1024px) { .tl-grid { columns: 3; column-gap: 1.25rem; } }
        .tl-grid > * { margin-bottom: 1.25rem; }
      `}</style>
    </div>
  );
}
