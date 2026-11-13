"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { defaultLocale, homeDictionaries, type Locale } from "../home/data";
import { SiteHeader } from "../home/components/site-header";
import { SiteFooter } from "../home/components/site-footer";
import { Reveal } from "../home/components/reveal";
import { ArrowIcon } from "../home/components/arrow-icon";
import { projectsDictionaries } from "./data";
import { ProjectPreview } from "./project-preview";

export function ProjectsView() {
  const [locale, setLocale] = useState<Locale>(defaultLocale);
  const [category, setCategory] = useState("all");
  const home = homeDictionaries[locale];
  const content = projectsDictionaries[locale];
  const visible = content.projects.filter((project) => category === "all" || project.category === category);
  useEffect(() => { document.documentElement.lang = locale; }, [locale]);

  return (
    <div className="home-page projects-page" id="page-top">
      <a className="skip-link" href="#main-content">{home.skipLink}</a>
      <SiteHeader locale={locale} navItems={home.navItems} onLocaleChange={setLocale} />
      <main className="site-container portfolio-main" id="main-content">
        <nav className="about-breadcrumb" aria-label={locale === "vi" ? "Đường dẫn" : "Breadcrumb"}><Link href="/">{home.navItems[0].label}</Link><span aria-hidden="true">/</span><span aria-current="page">{content.breadcrumb}</span></nav>
        <Reveal><header className="portfolio-intro"><p className="eyebrow"><span className="status-dot" />{content.eyebrow}</p><h1>{content.title}</h1><p>{content.intro}</p></header></Reveal>
        <div className="portfolio-filter-bar"><div className="skills-filters" role="group" aria-label={content.filterLabel}>
          {[{id:"all",label:content.allLabel},{id:"personal",label:content.personalLabel},{id:"company",label:content.companyLabel}].map((group) => <button key={group.id} type="button" aria-pressed={category === group.id} aria-controls="portfolio-list" onClick={() => setCategory(group.id)}>{group.label}<span>{content.projects.filter((project) => group.id === "all" || project.category === group.id).length}</span></button>)}
        </div><p role="status" aria-live="polite" aria-atomic="true">{visible.length} {content.resultLabel}</p></div>

        <div className="portfolio-list" id="portfolio-list">{visible.map((project, index) => (
          <section className="portfolio-entry" id={project.id} aria-labelledby={`${project.id}-title`} key={project.id}>
            <Reveal as="article" className={`portfolio-card portfolio-${project.id}`} delay={index * 55}>
              <div className="portfolio-card-main">
                <div className="portfolio-art"><ProjectPreview variant={project.id} /><span className="portfolio-preview-label">{content.previewLabel}</span></div>
                <div className="portfolio-card-copy"><span className={`portfolio-category category-${project.category}`}>{project.categoryLabel}</span><h2 id={`${project.id}-title`}>{project.title}</h2><p className="portfolio-subtitle">{project.subtitle}</p><p className="portfolio-description">{project.summary}</p><ul className="portfolio-highlights">{project.highlights.map((item) => <li key={item}><span aria-hidden="true">✓</span>{item}</li>)}</ul><div className="tags">{project.stack.map((tech) => <span key={tech}>{tech}</span>)}</div></div>
              </div>
              <details className="portfolio-details">
                <summary aria-label={`${content.detailLabel}: ${project.title}`}><span>{content.detailLabel}</span><ArrowIcon /></summary>
                <div className="portfolio-detail-body"><div className="portfolio-detail-columns"><div><h3>{project.detailTitle}</h3><ul>{project.features.map((item) => <li key={item}>{item}</li>)}</ul></div><div><h3>{content.architectureLabel}</h3><ul>{project.architecture.map((item) => <li key={item}>{item}</li>)}</ul></div></div><div className="portfolio-full-stack"><h3>{content.stackLabel}</h3><div className="tags">{project.fullStack.map((tech) => <span key={tech}>{tech}</span>)}</div></div></div>
              </details>
              <div className="portfolio-card-links"><Link className="text-link" href={project.contextHref}>{project.contextLabel}<ArrowIcon /></Link>{project.sourceHref && <a className="portfolio-source-link" href={project.sourceHref} target="_blank" rel="noopener noreferrer"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m8 6-6 6 6 6m8-12 6 6-6 6m-3-15-2 18" /></svg>{content.sourceLabel}<ArrowIcon direction="up-right" /></a>}</div>
            </Reveal>
          </section>
        ))}</div>
        <Reveal><section className="about-closing" aria-labelledby="projects-closing-title"><div><h2 id="projects-closing-title">{content.closingTitle}</h2><p>{content.closingDescription}</p></div><Link className="button button-primary" href="/#contact">{content.contactCta}<ArrowIcon /></Link></section></Reveal>
      </main>
      <SiteFooter content={home.footer} navItems={home.navItems} />
    </div>
  );
}
