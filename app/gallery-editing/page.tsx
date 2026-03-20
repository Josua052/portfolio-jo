import GalleryHero from "@/components/sections/Gallery-Editing/GalleryHero";
import GalleryGrid from "@/components/sections/Gallery-Editing/GalleryGrid";

export default function GalleryEditingPage() {
  return (
    <main className="bg-black text-white">
      <GalleryHero />
      <GalleryGrid />
    </main>
  );
}