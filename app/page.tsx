import { DisclaimerFooter } from "@/components/DisclaimerFooter"
import { HeroSection } from "@/components/HeroSection"
import { Navbar } from "@/components/Navbar"
import { ProjectsGrid } from "@/components/ProjectsGrid"

export default function HomePage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.1),transparent_24%),radial-gradient(circle_at_top_right,rgba(255,255,255,0.08),transparent_20%),radial-gradient(circle_at_bottom,rgba(255,255,255,0.05),transparent_30%)]" />
      <Navbar />
      <div className="relative z-10">
        <HeroSection />
        <ProjectsGrid />
        <DisclaimerFooter />
      </div>
    </main>
  )
}
