import { projects } from "@/projects";
import { ProjectCard } from "@/components/ProjectCard";

export function ProjectsGrid() {
  return (
    <section className="section-shell pt-16" id="projects">
      <div className="max-w-2xl">
        <p className="eyebrow">Recent projects</p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 dark:text-white">
          Live examples of agentic products and public builds
        </h2>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}
