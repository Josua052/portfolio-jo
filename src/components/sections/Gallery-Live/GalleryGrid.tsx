// src/components/gallery/live/GalleryGrid.tsx
"use client";

import GalleryItem from "./GalleryItem";
import { GalleryItemType } from "@/types/gallery";

interface Props {
  data: GalleryItemType[];
  onClick: (item: GalleryItemType) => void;
}

export default function GalleryGrid({ data, onClick }: Props) {
  return (
    <>
      <div className="glive-masonry">
        {data.map((item, i) => (
          <GalleryItem
            key={item.id}
            item={item}
            onClick={onClick}
            delay={(i % 3) * 70}
          />
        ))}
      </div>

      <style>{`
        .glive-masonry {
          columns: 1;
          gap: 1rem;
        }
        @media (min-width: 540px)  { .glive-masonry { columns: 2; } }
        @media (min-width: 1024px) { .glive-masonry { columns: 3; } }
      `}</style>
    </>
  );
}
