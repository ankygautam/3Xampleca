import { config } from "@/config";

export function HeroSection() {
  return (
    <section className="section-shell pt-12 sm:pt-16 lg:pt-20">
      <div className="mx-auto max-w-4xl text-center">
        <p className="eyebrow">Build in public · AI-agentic development</p>
        <h1 className="mt-4 text-[1.75rem] font-semibold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl dark:text-white">
          Real web apps, built with{" "}
          <span className="text-brand-primary">AI in real time</span>
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg dark:text-slate-300">
          {config.mainProjectStatement[0]}
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center">
          <a
            className="button-primary w-full sm:w-auto"
            href={config.pumpFunUrl}
            rel="noreferrer"
            target="_blank"
          >
            Watch live on Pump.fun
          </a>
          <a className="button-secondary w-full sm:w-auto" href="/projects">
            Browse projects
          </a>
        </div>
      </div>
    </section>
  );
}
