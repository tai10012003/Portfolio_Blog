import type { HomeDictionary, SkillItem } from "../types";
import Link from "next/link";
import { ArrowIcon } from "./arrow-icon";
import { Reveal } from "./reveal";

const marks: Record<string, string> = { React: "⚛", "Next.js": "N", TypeScript: "TS", "Node.js": "JS", Docker: "D", AWS: "aws", "Coding Agent": "AI" };

export function SkillsSection({ intro, skills }: { intro: HomeDictionary["skillsIntro"]; skills: SkillItem[] }) {
  return (
    <section className="section" id="skills" aria-labelledby="skills-title">
      <Reveal className="section-heading"><div><p className="eyebrow">02 / {intro.eyebrow}</p><h2 id="skills-title">{intro.title}</h2></div><p>{intro.description}</p></Reveal>
      <div className="skills-grid">{skills.map((skill, index) => (
        <Reveal className={`skill-item${skill.name === "Coding Agent" ? " skill-item-agent" : ""}`} key={skill.name} delay={(index % 3) * 65}><span className={`skill-mark skill-${skill.name.toLowerCase().replace(/[^a-z]/g, "")}`} aria-hidden="true">{marks[skill.name] ?? skill.name.slice(0, 2)}</span><div><h3>{skill.name}</h3><p>{skill.group}</p></div></Reveal>
      ))}</div>
      <div className="home-soft-skills"><h3>{intro.softSkillsLabel}</h3><ul>{intro.softSkills.map((skill) => <li key={skill}><Link href="/skills#soft-skills">{skill}</Link></li>)}</ul></div>
      <Link className="text-link skills-read-more" href="/skills">{intro.actionLabel}<ArrowIcon /></Link>
    </section>
  );
}
