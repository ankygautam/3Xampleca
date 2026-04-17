import { projects } from "@/projects";
import { ProjectCard } from "@/components/ProjectCard";

export function ProjectsGrid() {
  return (
    <section className="section-shell pt-16" id="projects">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}
