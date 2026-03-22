import GalleryHero from "@/components/sections/Gallery-Editing/GalleryHero";
import GalleryGrid from "@/components/sections/Gallery-Editing/GalleryGrid";

export const metadata = {
  title: "Gallery Editing | Josua Ronaldo",
  description: "Everything editing from Josua Ronaldo",
};

export default function GalleryEditingPage() {
  return (
    <main className="bg-black text-white">
      <GalleryHero />
      <GalleryGrid />
    </main>
  );
}
