"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { defaultLocale, homeDictionaries, type Locale } from "../home/data";
import { SiteHeader } from "../home/components/site-header";
import { SiteFooter } from "../home/components/site-footer";
import { Reveal } from "../home/components/reveal";
import { ArrowIcon } from "../home/components/arrow-icon";
import { skillsDictionaries } from "./data";

const softSkillPaths: Record<string, string> = {
  communication: "M4 4h16v12H9l-5 4V4Zm4 5h8m-8 3h5",
  teamwork: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M16 4a4 4 0 0 1 0 8m6 9v-2a4 4 0 0 0-3-3M13 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0",
  presentation: "M3 3h18v12H3V3Zm5 18 4-6 4 6M7 11l3-3 3 2 4-4",
  "problem-solving": "M9 18h6m-5 3h4M8 14a6 6 0 1 1 8 0c-1 1-1 2-1 4H9c0-2 0-3-1-4Z",
  "critical-thinking": "M9 3H4v5m11 13h5v-5M4 8a8 8 0 0 1 14-3m2 11A8 8 0 0 1 6 19m3-7 2 2 4-4",
};

export function SkillsView() {
  const [locale, setLocale] = useState<Locale>(defaultLocale);
  const [category, setCategory] = useState("all");
  const content = skillsDictionaries[locale];
  const home = homeDictionaries[locale];
  const visible = content.technologies.filter((technology) => category === "all" || technology.category === category);
  useEffect(() => { document.documentElement.lang = locale; }, [locale]);

  return (
    <div className="home-page skills-page" id="page-top">
      <a className="skip-link" href="#main-content">{home.skipLink}</a>
      <SiteHeader locale={locale} navItems={home.navItems} onLocaleChange={setLocale} />
      <main className="site-container skills-page-main" id="main-content">
        <nav className="about-breadcrumb" aria-label={locale === "vi" ? "Đường dẫn" : "Breadcrumb"}>
          <Link href="/">{home.navItems[0].label}</Link><span aria-hidden="true">/</span><span aria-current="page">{content.breadcrumb}</span>
        </nav>
        <section className="skills-page-hero" aria-labelledby="skills-page-title">
          <Reveal className="skills-page-intro">
            <p className="eyebrow"><span className="status-dot" />{content.eyebrow}</p>
            <h1 id="skills-page-title">{content.title}</h1><p>{content.intro}</p>
            <div className="skills-summary"><span><strong>{content.technologies.length.toString().padStart(2, "0")}</strong>{content.resultLabel}</span><span><strong>{content.softSkills.length.toString().padStart(2, "0")}</strong>{content.softCountLabel}</span></div>
          </Reveal>
          <Reveal className="skills-system-card" delay={100}>
            <div className="skills-system-heading"><span className="skills-system-symbol" aria-hidden="true">&lt;/&gt;</span><div><h2>{content.mapLabel}</h2><p>{content.mapDescription}</p></div></div>
            <ol className="skills-system-layers">{content.mapSteps.map((step, index) => <li key={step.title}><span className="skills-layer-index" aria-hidden="true">0{index + 1}</span><div><h3>{step.title}</h3><p>{step.stack}</p></div><span className="skills-layer-dot" aria-hidden="true" /></li>)}</ol>
          </Reveal>
        </section>

        <section className="skills-catalog" aria-labelledby="catalog-title">
          <Reveal className="section-heading"><div><p className="eyebrow">{content.catalogLabel}</p><h2 id="catalog-title">{content.catalogTitle}</h2></div><p>{content.catalogDescription}</p></Reveal>
          <div className="skills-filter-bar"><div className="skills-filters" role="group" aria-label={content.filterLabel}>
            {[{ id: "all", label: content.allLabel }, ...content.categories].map((group) => <button type="button" key={group.id} aria-pressed={category === group.id} aria-controls="technology-grid" onClick={() => setCategory(group.id)}>{group.label}<span>{group.id === "all" ? content.technologies.length : content.technologies.filter((technology) => technology.category === group.id).length}</span></button>)}
          </div><p className="skills-result-count" role="status" aria-live="polite" aria-atomic="true">{visible.length} {content.resultLabel}</p></div>
          <div className="skills-technology-grid" id="technology-grid">{visible.map((technology, index) => (
            <Reveal as="article" className={`skills-technology-card technology-${technology.category}`} key={technology.id} delay={(index % 3) * 65}>
              <div className="skills-technology-heading"><span className={`skill-mark skill-${technology.id}`} aria-hidden="true">{technology.mark}</span><span className="skills-category-label">{content.categories.find((group) => group.id === technology.category)?.label}</span></div>
              <h3>{technology.name}</h3><p>{technology.description}</p><ul className="skills-topic-tags">{technology.topics.map((topic) => <li key={topic}>{topic}</li>)}</ul>
            </Reveal>
          ))}</div>
        </section>

        <section className="skills-soft-section" id="soft-skills" aria-labelledby="soft-skills-title">
          <Reveal className="section-heading"><div><p className="eyebrow">{content.softLabel}</p><h2 id="soft-skills-title">{content.softTitle}</h2></div><p>{content.softDescription}</p></Reveal>
          <div className="skills-soft-grid">{content.softSkills.map((skill, index) => (
            <Reveal as="article" className="skills-soft-card" key={skill.id} delay={(index % 2) * 70}>
              <span className="skills-soft-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={softSkillPaths[skill.id]} /></svg></span>
              <div><h3>{skill.title}</h3><p>{skill.description}</p></div>
            </Reveal>
          ))}</div>
        </section>

        <section className="skills-practice" aria-labelledby="practice-title">
          <Reveal className="section-heading"><div><p className="eyebrow">{content.practiceLabel}</p><h2 id="practice-title">{content.practiceTitle}</h2></div><p>{content.practiceDescription}</p></Reveal>
          <ol className="skills-practice-grid">{content.practiceSteps.map((step, index) => <li key={step.title}><Reveal className="skills-practice-step" delay={index * 70}><span className="skills-step-number" aria-hidden="true">0{index + 1}</span><h3>{step.title}</h3><p>{step.description}</p><span className="skills-step-stack">{step.stack}</span></Reveal></li>)}</ol>
        </section>

        <Reveal>
          <section className="skills-learning-panel" aria-labelledby="skills-learning-title"><div><p className="eyebrow">{content.learningLabel}</p><h2 id="skills-learning-title">{content.learningTitle}</h2><p>{content.learningDescription}</p></div><div className="skills-learning-aside"><div className="skills-learning-tags">{content.learningTopics.map((topic) => <span key={topic}>{topic}</span>)}</div><p><span aria-hidden="true">✦</span>{content.learningNote}</p><Link className="text-link" href="/#blog">{content.blogCta}<ArrowIcon /></Link></div></section>
        </Reveal>
        <Reveal><section className="about-closing" aria-labelledby="skills-closing-title"><div><h2 id="skills-closing-title">{content.closingTitle}</h2><p>{content.closingDescription}</p></div><Link className="button button-primary" href="/#projects">{content.projectCta}<ArrowIcon /></Link></section></Reveal>
      </main>
      <SiteFooter content={home.footer} navItems={home.navItems} />
    </div>
  );
}
