import ExperienceSection from "@/components/sections/Experience/ExperienceSection";

export const metadata = {
  title: "Experience | Portfolio",
  description: "Professional experience and journey",
};

export default function ExperiencePage() {
  return (
    <main className="min-h-screen bg-neutral-950 text-white">
      <ExperienceSection />
    </main>
  );
}