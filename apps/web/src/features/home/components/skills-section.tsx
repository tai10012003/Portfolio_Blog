import type { SectionIntro, SkillItem } from "../types";
import { Reveal } from "./reveal";

const marks: Record<string, string> = { React: "⚛", "Next.js": "N", TypeScript: "TS", "Node.js": "JS", Docker: "D", AWS: "aws" };

export function SkillsSection({ intro, skills }: { intro: SectionIntro; skills: SkillItem[] }) {
  return (
    <section className="section" id="skills" aria-labelledby="skills-title">
      <Reveal className="section-heading"><div><p className="eyebrow">02 / {intro.eyebrow}</p><h2 id="skills-title">{intro.title}</h2></div><p>{intro.description}</p></Reveal>
      <div className="skills-grid">{skills.map((skill, index) => (
        <Reveal className="skill-item" key={skill.name} delay={(index % 3) * 65}><span className={`skill-mark skill-${skill.name.toLowerCase().replace(/[^a-z]/g, "")}`} aria-hidden="true">{marks[skill.name] ?? skill.name.slice(0, 2)}</span><div><h3>{skill.name}</h3><p>{skill.group}</p></div></Reveal>
      ))}</div>
    </section>
  );
}
