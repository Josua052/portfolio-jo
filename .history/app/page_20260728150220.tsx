import dynamic from "next/dynamic";
import HeroSection from "@/components/sections/HeroSection";

const AtGlanceSection = dynamic(() => import("@/components/sections/Home/AtGlanceSection"), { ssr: true });
const AboutQuotes = dynamic(() => import("@/components/sections/About/Quotes"), { ssr: true });
const ContactSection = dynamic(() => import("@/components/sections/Home/ContactSection"), { ssr: true });
const TestimonialsSection = dynamic(() => import("@/components/sections/Testimonial/TestimonialsSection"), { ssr: true });

export const metadata = {
  title: "Portfolio of Josua | Homepage",
  description: "Homepage of Josua Ronaldo",
  openGraph: {
    title: "Portfolio of Josua Ronaldo",
    description:
      "Explore my projects, skills, and experience in web development & design.",
    url: "https://www.josuaronaldo.my.id",
    siteName: "Josua Ronaldo Portfolio",
    images: [
      {
        url: "https://www.josuaronaldo.my.id/cover1.png",
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
      <AtGlanceSection />
      <AboutQuotes />
      <ContactSection />
      <TestimonialsSection />
    </main>
  );
}
