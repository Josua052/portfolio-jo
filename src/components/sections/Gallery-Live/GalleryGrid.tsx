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
      {/* Accordion Container */}
      <div className="gl-accordion">
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
        /* Accordion Layout */
        .gl-accordion {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
          width: 100%;
        }

        @media (max-width: 768px) {
          .gl-accordion {
            flex-direction: column;
            flex-wrap: nowrap;
          }
        }
      `}</style>
    </>
  );
}
