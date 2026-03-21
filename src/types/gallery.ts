export type GalleryMediaType = "image" | "video";

export interface GalleryItemType {
  id: string;
  type: GalleryMediaType;
  title: string;
  description?: string;
  src: string;
  thumbnail?: string;
  date: string;
  location?: string;
  tags?: string[];
}