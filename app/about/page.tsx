import AboutHero from "@/components/sections/About/AboutHero";
import { AboutContent } from "@/components/sections/About/AboutContent";
import { AboutEducation } from "@/components/sections/About/AboutEducation";

export default function AboutPage() {
  return (
    <main className="bg-black text-white">
      <AboutHero />
      <AboutContent />
      <AboutEducation />
    </main>
  );
}
