// src/data/gallery-live.ts
import { GalleryItemType } from "@/types/gallery";
import { gdriveProxyUrl, gdriveThumbnailUrl } from "@/lib/gdrive";

/**
 * Untuk setiap item:
 *  - image  → src = gdriveProxyUrl (via Next.js API route, bypass CORS)
 *  - video  → src = URL video langsung (mp4), thumbnail = gdriveProxyUrl
 *
 * Cara dapat driveId:
 *  Buka file di Google Drive → klik kanan → "Get link"
 *  URL: https://drive.google.com/file/d/1OBdRxlt.../view
 *  driveId = bagian setelah /d/ sampai /view
 */
const GALLERY_LIVE_RAW: (Omit<GalleryItemType, "src" | "thumbnail"> & {
  driveId?: string; // untuk image via proxy
  videoUrl?: string; // untuk video (direct URL atau hosting lain)
  driveThumbnailId?: string; // thumbnail video via proxy
})[] = [
  {
    id: "1",
    type: "image",
    title: "Walet Waterfall Hiking",
    driveId: "1OBdRxltR6_roaeBRcLDqKy891-FRDiHT",
    date: "2026-02-15",
    location: "Gunung Salak, Bogor",
    tags: ["nature", "morning"],
  },
  {
    id: "2",
    type: "image",
    title: "Cibeureum Waterfall Hiking",
    driveId: "1IDaN_qFkfwQYkYLkNncN-LY-Vn1YQNmA",
    date: "2026-03-14",
    location: "Gunung Gede, Bogor",
    tags: ["nature", "morning"],
  },
  // Contoh video:
  // {
  //   id: "2",
  //   type: "video",
  //   title: "Walet Waterfall",
  //   videoUrl: "/videos/walet.mp4",        // local file
  //   driveThumbnailId: "YOUR_THUMB_ID",    // thumbnail dari Drive
  //   date: "2026-03-12",
  //   location: "Gunung Salak, Bogor",
  //   tags: ["nature"],
  // },
];

export const GALLERY_LIVE: GalleryItemType[] = GALLERY_LIVE_RAW.map((item) => {
  if (item.type === "video") {
    return {
      id: item.id,
      type: "video",
      title: item.title,
      src: item.videoUrl ?? "",
      thumbnail: item.driveThumbnailId
        ? gdriveProxyUrl(item.driveThumbnailId)
        : undefined,
      date: item.date,
      location: item.location,
      tags: item.tags,
    };
  }

  return {
    id: item.id,
    type: "image",
    title: item.title,
    // ✅ Pakai proxy route → tidak ada CORS / 403
    src: gdriveProxyUrl(item.driveId!),
    date: item.date,
    location: item.location,
    tags: item.tags,
  };
});
