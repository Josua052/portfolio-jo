// src/components/gallery/live/GalleryFilter.tsx

import { Image as ImageIcon, Video, LayoutGrid } from "lucide-react";

interface Props {
  filter: "all" | "image" | "video";
  setFilter: (value: "all" | "image" | "video") => void;
  counts: { all: number; image: number; video: number };
}

const FILTER_OPTIONS: {
  value: "all" | "image" | "video";
  label: string;
  Icon: React.ComponentType<{ size?: number }>;
}[] = [
  { value: "all",   label: "All",    Icon: LayoutGrid },
  { value: "image", label: "Photos", Icon: ImageIcon  },
  { value: "video", label: "Videos", Icon: Video      },
];

export default function GalleryFilter({ filter, setFilter, counts }: Props) {
  return (
    <div className="glive-filter-row">
      {/* Count */}
      <span className="glive-filter-count">
        {counts[filter]}{" "}
        <span>
          {filter === "all" ? "items" : filter === "image" ? "photos" : "videos"}
        </span>
      </span>

      {/* Pills */}
      <div className="glive-filter-pills">
        {FILTER_OPTIONS.map(({ value, label, Icon }) => (
          <button
            key={value}
            className={`glive-filter-btn ${filter === value ? "glive-filter-active" : ""}`}
            onClick={() => setFilter(value)}
          >
            <Icon size={13} />
            {label}
            <span className="glive-filter-num">{counts[value]}</span>
          </button>
        ))}
      </div>

      <style>{`
        .glive-filter-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 1rem;
          padding: 1.25rem 0;
          border-bottom: 1px solid var(--border);
          margin-bottom: 2rem;
        }
        .glive-filter-count {
          font-family: var(--font-montserrat), serif;
          font-size: 0.85rem;
          font-weight: 700;
          color: var(--foreground);
          letter-spacing: -0.01em;
        }
        .glive-filter-count span {
          font-weight: 500;
          color: var(--muted);
        }
        .glive-filter-pills {
          display: flex;
          gap: 0.4rem;
        }
        .glive-filter-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          padding: 0.35rem 0.9rem;
          border-radius: 999px;
          border: 1px solid var(--border);
          background: var(--background);
          color: var(--muted);
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.02em;
          cursor: pointer;
          transition: border-color 0.2s, color 0.2s, background 0.2s;
          white-space: nowrap;
        }
        .glive-filter-btn:hover {
          color: var(--foreground);
          border-color: var(--foreground);
        }
        .glive-filter-active {
          background: var(--foreground) !important;
          color: var(--background) !important;
          border-color: var(--foreground) !important;
        }
        .glive-filter-num {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-width: 18px;
          height: 18px;
          border-radius: 999px;
          font-size: 0.6rem;
          font-weight: 800;
          background: rgba(0,0,0,0.12);
          padding: 0 4px;
        }
        .glive-filter-active .glive-filter-num {
          background: rgba(255,255,255,0.2);
        }
        @media (max-width: 480px) {
          .glive-filter-row { flex-direction: column; align-items: flex-start; }
        }
      `}</style>
    </div>
  );
}