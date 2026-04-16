import { DisclaimerFooter } from "@/components/DisclaimerFooter";
import { Navbar } from "@/components/Navbar";
import { PageIntro } from "@/components/PageIntro";
import { ProjectsGrid } from "@/components/ProjectsGrid";
import { StatusBar } from "@/components/StatusBar";

export default function ProjectsPage() {
  return (
    <main>
      <Navbar />
      <section className="section-shell pt-12 sm:pt-16">
        <PageIntro
          eyebrow="Projects"
          title="Recent AI-agentic web application examples"
          description="A running set of real builds created to show what AI-assisted development can produce in practice."
        />
      </section>
      <StatusBar />
      <ProjectsGrid />
      <DisclaimerFooter />
    </main>
  );
}
