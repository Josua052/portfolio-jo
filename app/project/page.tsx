import ProjectsSection from "@/components/sections/Project/ProjectsSection";

export const metadata = {
  title: "Project | Josua Ronaldo",
  description: "Professional project of Josua Ronaldo",
};

export default function ProjectsPage() {
  return (
    <main className="bg-black min-h-screen">
      <ProjectsSection />
    </main>
  );
}