import GalleryLiveHero from "@/components/sections/Gallery-Live/GalleryLiveHero";
import GalleryLiveSection from "@/components/sections/Gallery-Live/GalleryLiveSection";

export const metadata = {
  title: "Gallery Live | Josua Ronaldo",
  description: "Daily of Josua Ronaldo Life",
};

export default function GalleryLivePage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <GalleryLiveHero />
      <GalleryLiveSection />
    </main>
  );
}
