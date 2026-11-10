import Image from "next/image";
import { profile } from "../data";
import type { HeroContent, SkillItem } from "../types";
import { Reveal } from "./reveal";
import { ArrowIcon } from "./arrow-icon";

export function HeroSection({ content, skills }: { content: HeroContent; skills: SkillItem[] }) {
  return (
    <section className="hero site-container" id="home" aria-labelledby="hero-title">
      <Reveal className="hero-copy">
        <p className="eyebrow"><span className="status-dot" />{content.eyebrow}</p>
        <p className="hero-greeting">{content.greeting} <span aria-hidden="true">✳</span></p>
        <h1 id="hero-title">{content.title}</h1>
        <p className="hero-description">{content.description}</p>
        <div className="hero-actions">
          <a className="button button-primary" href="#projects">{content.primaryCta}<ArrowIcon /></a>
          <a className="button button-secondary" href="#blog">{content.secondaryCta}<ArrowIcon /></a>
        </div>
        <div className="hero-technologies"><span>{content.stackLabel}</span><div>{skills.slice(0, 4).map((skill) => <span key={skill.name}>{skill.name}</span>)}</div></div>
      </Reveal>
      <Reveal className="portrait-area" delay={120}>
        <div className="portrait-outline" aria-hidden="true" />
        <div className="portrait-frame">
          <Image src={profile.avatar} alt={content.avatarAlt} width={1536} height={2048} sizes="(max-width: 640px) 230px, (max-width: 1050px) 290px, 340px" priority className="portrait-image" />
          <span className="portrait-monogram" aria-hidden="true">TP.</span>
        </div>
        <span className="portrait-spark" aria-hidden="true">✳</span>
        <div className="portrait-caption"><span className="caption-icon" aria-hidden="true">&lt;/&gt;</span><div><strong>{profile.name}</strong><span>{content.eyebrow}</span></div></div>
        <p className="portrait-note">{content.profileNote}</p>
      </Reveal>
    </section>
  );
}
