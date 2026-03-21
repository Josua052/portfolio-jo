// src/components/gallery/live/GalleryLiveSection.tsx
"use client";

import { useState } from "react";
import { GALLERY_LIVE } from "@/data/galleryLive";
import GalleryFilter from "./GalleryFilter";
import GalleryGrid   from "./GalleryGrid";
import GalleryModal  from "./GalleryModal";
import { GalleryItemType } from "@/types/gallery";

export default function GalleryLiveSection() {
  const [filter, setFilter]     = useState<"all" | "image" | "video">("all");
  const [selected, setSelected] = useState<GalleryItemType | null>(null);

  const filteredData =
    filter === "all"
      ? GALLERY_LIVE
      : GALLERY_LIVE.filter((item) => item.type === filter);

  const counts = {
    all:   GALLERY_LIVE.length,
    image: GALLERY_LIVE.filter((i) => i.type === "image").length,
    video: GALLERY_LIVE.filter((i) => i.type === "video").length,
  };

  return (
    <section className="glive-section">
      <div className="glive-container">

        <GalleryFilter
          filter={filter}
          setFilter={setFilter}
          counts={counts}
        />

        {filteredData.length > 0 ? (
          <GalleryGrid data={filteredData} onClick={setSelected} />
        ) : (
          <div className="glive-empty">
            <p>No items yet.</p>
          </div>
        )}
      </div>

      {selected && (
        <GalleryModal item={selected} onClose={() => setSelected(null)} />
      )}

      <style>{`
        .glive-section {
          background: var(--background);
          padding: 0 1.5rem 7rem;
        }
        .glive-container {
          max-width: 1280px;
          margin: 0 auto;
        }
        .glive-empty {
          padding: 5rem 0;
          text-align: center;
          color: var(--muted);
          font-size: 0.9rem;
        }
      `}</style>
    </section>
  );
}