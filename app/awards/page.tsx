import AwardsSection from "@/components/sections/Award/AwardsSection";

export const metadata = {
  title: "Awards | Josua Ronaldo",
  description: "Certifications and achievements of Josua Ronaldo",
};

export default function AwardsPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <AwardsSection />
    </main>
  );
}
