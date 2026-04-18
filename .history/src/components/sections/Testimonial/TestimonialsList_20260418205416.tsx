// src/components/testimonial/TestimonialsTicker.tsx
// Server Component — fetches testimonials and renders the infinite scrolling ticker.

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

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="tk-stars">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          size={9}
          fill={s <= rating ? "#f59e0b" : "none"}
          stroke={s <= rating ? "#f59e0b" : "var(--border)"}
          strokeWidth={1.5}
        />
      ))}
    </div>
  );
}

function Avatar({ name, index }: { name: string; index: number }) {
  const palettes = [
    { bg: "rgba(99,102,241,0.1)", color: "#6366f1" },
    { bg: "rgba(34,197,94,0.1)",  color: "#22c55e" },
    { bg: "rgba(245,158,11,0.1)", color: "#f59e0b" },
    { bg: "rgba(6,182,212,0.1)",  color: "#06B6D4" },
    { bg: "rgba(239,68,68,0.1)",  color: "#ef4444" },
    { bg: "rgba(168,85,247,0.1)", color: "#a855f7" },
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
      style={{ background: p.bg, color: p.color, borderColor: `${p.color}33` }}
    >
      {initials}
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
  const num = String(index + 1).padStart(2, "0");

  return (
    <div className="tk-card">
      <div className="tk-card-top">
        <span className="tk-num">{num}</span>
        {item.rating && <StarRating rating={item.rating} />}
      </div>

      <blockquote className="tk-message">
        &ldquo;{item.message}&rdquo;
      </blockquote>

      <div className="tk-footer">
        <Avatar name={item.name} index={index} />
        <div className="tk-footer-text">
          <p className="tk-name">{item.name}</p>
          <p className="tk-meta">
            {item.role && <span>{item.role}</span>}
            {item.role && item.company && <span className="tk-dot">&middot;</span>}
            {item.company && <span>{item.company}</span>}
          </p>
        </div>
      </div>

      <style>{`
        .tk-card {
          flex-shrink: 0;
          width: 260px;
          background: var(--secondary);
          border: 1px solid var(--border);
          border-radius: 0.875rem;
          padding: 1.125rem 1.25rem;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          box-sizing: border-box;
        }

        .tk-card-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .tk-num {
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          color: var(--muted);
        }

        .tk-stars {
          display: flex;
          align-items: center;
          gap: 2px;
        }

        .tk-message {
          font-size: 0.8rem;
          line-height: 1.7;
          color: var(--muted);
          margin: 0;
          flex: 1;
          overflow-wrap: break-word;
          word-break: break-word;
          display: -webkit-box;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .tk-footer {
          display: flex;
          align-items: center;
          gap: 0.625rem;
          padding-top: 0.75rem;
          border-top: 1px solid var(--border);
        }

        .tk-avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          border: 1px solid;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--font-montserrat), serif;
          font-size: 0.7rem;
          font-weight: 800;
          flex-shrink: 0;
          letter-spacing: -0.01em;
        }

        .tk-footer-text {
          display: flex;
          flex-direction: column;
          gap: 0.1rem;
          min-width: 0;
        }

        .tk-name {
          font-size: 0.8rem;
          font-weight: 700;
          letter-spacing: -0.01em;
          color: var(--foreground);
          margin: 0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .tk-meta {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          font-size: 0.68rem;
          color: var(--muted);
          margin: 0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .tk-dot { opacity: 0.4; }
      `}</style>
    </div>
  );
}

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
            padding: 2rem 1.5rem;
            font-size: 0.875rem;
            color: var(--muted);
            text-align: center;
          }
        `}</style>
      </div>
    );
  }

  // Duplicate items to create seamless loop (need at least 2 full sets)
  const looped = items.length < 6
    ? [...items, ...items, ...items]
    : [...items, ...items];

  return (
    <div className="tk-track-wrap">
      <div className="tk-track">
        {looped.map((item, i) => (
          <TestimonialCard key={`${item.id}-${i}`} item={item} index={i % items.length} />
        ))}
      </div>

      <style>{`
        .tk-track-wrap {
          overflow: hidden;
          padding: 1.25rem 0;
          position: relative;
        }

        /* Fade edges */
        .tk-track-wrap::before,
        .tk-track-wrap::after {
          content: '';
          position: absolute;
          top: 0;
          bottom: 0;
          width: 80px;
          z-index: 2;
          pointer-events: none;
        }
        .tk-track-wrap::before {
          left: 0;
          background: linear-gradient(to right, var(--background), transparent);
        }
        .tk-track-wrap::after {
          right: 0;
          background: linear-gradient(to left, var(--background), transparent);
        }

        .tk-track {
          display: flex;
          gap: 0.875rem;
          width: max-content;
          padding: 0 1.25rem;
          animation: tk-scroll 40s linear infinite;
          will-change: transform;
        }

        /* Pause on hover for readability */
        .tk-track:hover {
          animation-play-state: paused;
        }

        @keyframes tk-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}