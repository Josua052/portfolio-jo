import AwardsSection from "@/components/sections/Award/AwardsSection";

export const metadata = {
  title: "Awards | Ronaldo Jo",
  description: "Certifications and achievements of Ronaldo Jo",
};

export default function AwardsPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <AwardsSection />
    </main>
  );
}