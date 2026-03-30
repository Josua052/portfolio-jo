import AboutQuotes from "@/components/sections/About/Quotes";
import HeroSection from "@/components/sections/HeroSection";
import AtGlanceSection from "@/components/sections/Home/AtGlanceSection";
import ContactSection from "@/components/sections/Home/ContactSection";
import TestimonialsSection from "@/components/sections/Testimonial/TestimonialsSection";

export const metadata = {
  title: "Portfolio of Josua | Homepage",
  description: "Homepage of Josua Ronaldo",
  openGraph: {
    title: "Portfolio of Josua Ronaldo",
    description: "Explore my projects, skills, and experience in web development & design.",
    url: "https://www.josuaronaldo.my.id",
    siteName: "Josua Ronaldo Portfolio",
    images: [
      {
        url: "https://www.josuaronaldo.my.id/cover.png", 
        width: 1200,
        height: 630,
        alt: "Josua Ronaldo Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <AboutQuotes />
      <AtGlanceSection />
      <ContactSection />
      <TestimonialsSection />
    </main>
  );
}
