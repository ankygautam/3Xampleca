import { DisclaimerFooter } from "@/components/DisclaimerFooter";
import { HeroSection } from "@/components/HeroSection";
import { Navbar } from "@/components/Navbar";
import { ProjectsGrid } from "@/components/ProjectsGrid";

export default function HomePage() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <ProjectsGrid />
      <DisclaimerFooter />
    </main>
  );
}
