import { DisclaimerFooter } from "@/components/DisclaimerFooter";
import { Navbar } from "@/components/Navbar";
import { config } from "@/config";

export default function VisionPage() {
  return (
    <main>
      <Navbar />
      <section className="section-shell pt-12 sm:pt-16">
        <div className="max-w-3xl">
          <h1 className="text-[1.9rem] font-semibold tracking-tight text-slate-950 sm:text-4xl dark:text-white">
            Vision
          </h1>
        </div>
        <div className="mt-8 surface-card p-6 sm:p-8">
          <div className="space-y-4 text-sm leading-7 text-slate-600 dark:text-slate-300 sm:text-base">
            {config.projectVision.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>
      <DisclaimerFooter />
    </main>
  );
}
