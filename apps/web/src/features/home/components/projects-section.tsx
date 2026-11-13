import type { HomeDictionary, ProjectItem } from "../types";
import { Reveal } from "./reveal";
import { ArrowIcon } from "./arrow-icon";
import Link from "next/link";
import { ProjectPreview } from "../../projects/project-preview";

export function ProjectsSection({ intro, projects }: { intro: HomeDictionary["projectsIntro"]; projects: ProjectItem[] }) {
  return (
    <section className="section" id="projects" aria-labelledby="projects-title">
      <Reveal className="section-heading"><div><p className="eyebrow">04 / {intro.eyebrow}</p><h2 id="projects-title">{intro.title}</h2></div><Link className="text-link" href="/projects">{intro.actionLabel}<ArrowIcon /></Link></Reveal>
      <div className="project-grid">{projects.map((project, index) => (
        <Reveal as="article" className="project-card" key={project.title} delay={index * 80}>
          <Link className="home-project-preview" href={project.href} aria-label={project.title}><ProjectPreview variant={project.id} /></Link>
          <div className="project-body"><p className="project-number">0{index + 1} / {project.categoryLabel}</p><h3><Link className="home-project-title" href={project.href}>{project.title}<ArrowIcon /></Link></h3><p>{project.summary}</p><div className="tags">{project.stack.map((tech) => <span key={tech}>{tech}</span>)}</div></div>
        </Reveal>
      ))}</div>
    </section>
  );
}
