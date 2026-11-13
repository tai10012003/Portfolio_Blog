import type { ExperienceItem, HomeDictionary } from "../types";
import Link from "next/link";
import { ArrowIcon } from "./arrow-icon";

export function ExperienceSection({ experiences, intro }: { experiences: ExperienceItem[]; intro: HomeDictionary["experienceIntro"] }) {
  return (
    <section className="section experience-section" id="experience" aria-labelledby="experience-title">
      <div><p className="eyebrow">03 / {intro.eyebrow}</p><h2 id="experience-title">{intro.title}</h2><p className="section-description">{intro.description}</p><Link className="text-link work-home-link" href="/experience">{intro.actionLabel}<ArrowIcon /></Link></div>
      <div className="timeline">{experiences.map((item) => (
        <article className="timeline-item" key={item.role}><span className="timeline-dot" aria-hidden="true" /><p className="period">{item.period}</p><h3>{item.role}</h3><p>{item.description}</p></article>
      ))}</div>
    </section>
  );
}
