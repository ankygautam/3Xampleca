import { config } from "@/config";

export function AboutSection() {
  return (
    <section className="section-shell pt-16">
      <div className="max-w-2xl">
        <p className="eyebrow">About this project</p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 dark:text-white">
          A solo build-in-public project shaped by daily application development
        </h2>
      </div>

      <div className="mt-8 grid gap-4 lg:grid-cols-2">
        <article className="surface-card p-6">
          <h3 className="text-xl font-semibold tracking-tight text-slate-950 dark:text-white">
            Who is building this
          </h3>
          <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
            {config.aboutMe[0]}
          </p>
        </article>

        <article className="surface-card p-6">
          <h3 className="text-xl font-semibold tracking-tight text-slate-950 dark:text-white">
            How it&apos;s supported
          </h3>
          <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
            {config.aboutMe[3]}
          </p>
        </article>
      </div>
    </section>
  );
}
