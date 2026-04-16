import { DisclaimerFooter } from "@/components/DisclaimerFooter";
import { HeroSection } from "@/components/HeroSection";
import { Navbar } from "@/components/Navbar";
import { ProjectsGrid } from "@/components/ProjectsGrid";
import { PageIntro } from "@/components/PageIntro";
import { StatusBar } from "@/components/StatusBar";
import { TextContentCard } from "@/components/TextContentCard";
import { config } from "@/config";
import Link from "next/link";

export default function HomePage() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <StatusBar />
      <section className="section-shell pt-16">
        <PageIntro
          eyebrow="Overview"
          title="What 3xample is about"
          description="A direct introduction to the build-in-public idea behind 3xample."
        />
        <div className="mt-8">
          <TextContentCard
            title="Main project statement"
            paragraphs={config.mainProjectStatement}
          />
        </div>
      </section>
      <section className="section-shell pt-16">
        <PageIntro
          eyebrow="Quick access"
          title="Browse the work, the background, and the token details"
          description="The site now uses dedicated pages so each part is easier to read."
        />
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <Link
            className="surface-card p-6 transition-colors hover:border-brand-primary"
            href="/projects"
          >
            <p className="text-lg font-semibold tracking-tight text-slate-950 dark:text-white">
              Projects
            </p>
            <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
              Review recent examples and what has already been built live.
            </p>
          </Link>
          <Link
            className="surface-card p-6 transition-colors hover:border-brand-primary"
            href="/about"
          >
            <p className="text-lg font-semibold tracking-tight text-slate-950 dark:text-white">
              About
            </p>
            <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
              Read the full background on the solo developer and the public journey.
            </p>
          </Link>
          <Link
            className="surface-card p-6 transition-colors hover:border-brand-primary"
            href="/token-info"
          >
            <p className="text-lg font-semibold tracking-tight text-slate-950 dark:text-white">
              Token info
            </p>
            <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
              Verify official addresses and read the support and disclaimer notes.
            </p>
          </Link>
        </div>
      </section>
      <ProjectsGrid />
      <DisclaimerFooter />
    </main>
  );
}
