import { projects } from "@/projects"
import { ProjectCard } from "@/components/ProjectCard"

export function ProjectsGrid() {
  return (
    <section className="section-shell pb-6 pt-10 sm:pt-14" id="projects">
      <div className="mb-8 max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/60">
          Live examples
        </p>
        <h2 className="mt-4 text-3xl font-semibold tracking-[-0.05em] text-white sm:text-4xl">
          Recent builds and in-progress concepts
        </h2>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  )
}
