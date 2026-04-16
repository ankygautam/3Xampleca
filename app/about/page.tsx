import { DisclaimerFooter } from "@/components/DisclaimerFooter";
import { Navbar } from "@/components/Navbar";
import { PageIntro } from "@/components/PageIntro";
import { TextContentCard } from "@/components/TextContentCard";
import { config } from "@/config";

export default function AboutPage() {
  return (
    <main>
      <Navbar />
      <section className="section-shell pt-12 sm:pt-16">
        <PageIntro
          eyebrow="About me"
          title="The solo developer behind 3xample"
          description="This page keeps the full background and motivation in one place."
        />
        <div className="mt-8">
          <TextContentCard title="About me" paragraphs={config.aboutMe} />
        </div>
      </section>
      <DisclaimerFooter />
    </main>
  );
}
