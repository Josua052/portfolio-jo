// src/types/gallery.ts

export type GalleryItemType = {
  id: string;
  type: "image" | "video";
  title: string;
  src: string;
  thumbnail?: string;  
  date?: string;
  location?: string;
  tags?: string[];
};


export type DesignProject = {
  id: string;
  title: string;
  category: string;         
  description: string;      
  coverImage: string;      
  behanceUrl?: string;       
  year?: string;             
  tools?: string[];       
  detailImages: {
    src: string;
    caption?: string;
  }[];
};