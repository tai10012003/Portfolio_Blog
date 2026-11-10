import type { HomeDictionary, ProjectItem } from "../types";
import { Reveal } from "./reveal";
import { ArrowIcon } from "./arrow-icon";

export function ProjectsSection({ intro, projects }: { intro: HomeDictionary["projectsIntro"]; projects: ProjectItem[] }) {
  return (
    <section className="section" id="projects" aria-labelledby="projects-title">
      <Reveal className="section-heading"><div><p className="eyebrow">04 / {intro.eyebrow}</p><h2 id="projects-title">{intro.title}</h2></div><a className="text-link" href="#contact">{intro.actionLabel}<ArrowIcon /></a></Reveal>
      <div className="project-grid">{projects.map((project, index) => (
        <Reveal as="article" className="project-card" key={project.title} delay={index * 80}>
          <div className={`project-art project-art-${index % 3}`} aria-hidden="true">
            {index % 3 === 0 ? <div className="mini-site"><div className="mini-nav"><i /><i /><i /></div><div className="mini-site-body"><div><span className="mini-line" /><span className="mini-line short" /><span className="mini-pill" /></div><div className="mini-avatar">tp.</div></div><div className="mini-cards"><i /><i /><i /></div></div>
            : index % 3 === 1 ? <div className="mini-dashboard"><div className="mini-sidebar"><i /><i /><i /><i /></div><div className="mini-board">{[0, 1, 2].map((n) => <div key={n}><span /><i /><i /></div>)}</div></div>
            : <div className="mini-notes"><span className="notes-symbol">{'{ }'}</span><div><span className="mini-line" /><span className="mini-line short" /><span className="mini-line" /></div><span className="notes-caption">ideas → systems</span></div>}
          </div>
          <div className="project-body"><p className="project-number">0{index + 1} / {project.stack[0]}</p><h3>{project.title}</h3><p>{project.summary}</p><div className="tags">{project.stack.map((tech) => <span key={tech}>{tech}</span>)}</div></div>
        </Reveal>
      ))}</div>
    </section>
  );
}
