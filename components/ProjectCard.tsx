import type { Project } from "@/projects";

const statusStyles: Record<Project["status"], string> = {
  live: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-300",
  completed:
    "bg-slate-100 text-slate-700 dark:bg-slate-900 dark:text-slate-300",
  "coming-soon":
    "bg-brand-surface text-brand-primary dark:bg-slate-900 dark:text-brand-accent",
};

const statusLabels: Record<Project["status"], string> = {
  live: "Live now",
  completed: "Completed",
  "coming-soon": "Coming soon",
};

export function ProjectCard({ project }: { project: Project }) {
  return (
    <a
      className={`surface-card group flex min-h-[260px] flex-col justify-between p-5 transition-colors duration-200 hover:border-brand-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary active:border-brand-primary ${
        project.featured ? "border-brand-primary" : ""
      }`}
      href={project.url}
    >
      <div>
        <div
          className={`inline-flex min-h-8 items-center gap-2 rounded-full px-3 text-xs font-medium ${statusStyles[project.status]}`}
        >
          {project.status === "live" ? (
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
          ) : null}
          {statusLabels[project.status]}
        </div>

        <h3 className="mt-4 text-xl font-semibold tracking-tight text-slate-950 dark:text-white">
          {project.title}
        </h3>
        <p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
          {project.description}
        </p>
      </div>

      <div className="mt-6 flex items-end justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          {project.stack.map((item) => (
            <span
              key={item}
              className="inline-flex min-h-8 items-center rounded-full border border-slate-200 px-3 text-xs font-medium text-slate-600 dark:border-slate-800 dark:text-slate-300"
            >
              {item}
            </span>
          ))}
        </div>
        <span className="text-brand-primary transition-transform group-hover:translate-x-1">
          <svg className="h-5 w-5" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path
              d="M4.166 10h11.667m0 0-4.584-4.583M15.833 10l-4.584 4.583"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </div>
    </a>
  );
}
