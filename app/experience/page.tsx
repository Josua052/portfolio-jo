import EventExperienceSection from "@/components/sections/Experience/EventExperienceSection";
import ExperienceSection from "@/components/sections/Experience/ExperienceSection";

export const metadata = {
  title: "Experience | Josua Ronaldo",
  description: "Professional experience and journey of Josua Ronaldo",
};

export default function ExperiencePage() {
  return (
    <main className="min-h-screen bg-neutral-950 text-white">
      <ExperienceSection />
      <EventExperienceSection />
    </main>
  );
}
