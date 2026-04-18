import type { Project } from "@/projects"

const statusStyles: Record<Project["status"], string> = {
  live: "bg-white/12 text-white border border-white/15",
  completed: "bg-white/8 text-slate-200 border border-white/10",
  "coming-soon": "bg-white/10 text-slate-100 border border-white/12",
}

const statusLabels: Record<Project["status"], string> = {
  live: "Live now",
  completed: "Completed",
  "coming-soon": "Coming soon",
}

export function ProjectCard({ project }: { project: Project }) {
  return (
    <a
      className={`group relative flex min-h-[260px] flex-col justify-between overflow-hidden rounded-[1.75rem] border bg-white/6 p-5 shadow-[0_20px_80px_rgba(0,0,0,0.28)] backdrop-blur-2xl transition duration-200 hover:border-white/25 hover:bg-white/8 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white active:border-white/25 ${
        project.featured ? "border-white/20" : "border-white/10"
      }`}
      href={project.url}
    >
      <div className="absolute inset-0 bg-[linear-gradient(145deg,rgba(255,255,255,0.08),transparent_40%,transparent_70%,rgba(255,255,255,0.04))]" />
      <div>
        <div
          className={`inline-flex min-h-8 items-center gap-2 rounded-full px-3 text-xs font-medium ${statusStyles[project.status]}`}
        >
          {project.status === "live" ? (
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
          ) : null}
          {statusLabels[project.status]}
        </div>

        <h3 className="relative z-10 mt-4 text-xl font-semibold tracking-tight text-white">
          {project.title}
        </h3>
        <p className="relative z-10 mt-3 line-clamp-2 text-sm leading-6 text-slate-300">
          {project.description}
        </p>
      </div>

      <div className="relative z-10 mt-6 flex items-end justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          {project.stack.map((item) => (
            <span
              key={item}
              className="inline-flex min-h-8 items-center rounded-full border border-white/10 bg-white/5 px-3 text-xs font-medium text-slate-200"
            >
              {item}
            </span>
          ))}
        </div>
        <span className="text-white transition-transform group-hover:translate-x-1">
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
  )
}
