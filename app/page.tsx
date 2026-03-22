import HeroSection from "@/components/sections/HeroSection";
import AtGlanceSection from "@/components/sections/Home/AtGlanceSection";
import ContactSection from "@/components/sections/Home/ContactSection";

export const metadata = {
  title: "Portfolio of Josua | Homepage",
  description: "Homepage of Josua Ronaldo",
};

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <AtGlanceSection />
      <ContactSection />
    </main>
  );
}
