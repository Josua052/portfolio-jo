import AboutHero from "@/components/sections/About/AboutHero";
import { AboutContent } from "@/components/sections/About/AboutContent";
import { AboutEducation } from "@/components/sections/About/AboutEducation";

export const metadata = {
  title: "About | Josua Ronaldo",
  description: "Profile of Josua Ronaldo",
};

export default function AboutPage() {
  return (
    <main className="bg-black text-white">
      <AboutHero />
      <AboutContent />
      <AboutEducation />
    </main>
  );
}
