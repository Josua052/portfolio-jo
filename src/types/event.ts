// src/types/event.ts

export type EventExperience = {
  id: string;
  title: string;
  organization: string;
  role: string;
  period: string;
  location?: string;
  highlight?: boolean;
  category: "live-event" | "competition" | "workshop" | "festival" | "other";
  points: string[];
  tags: string[];
  image?: string; // optional event photo/poster
};