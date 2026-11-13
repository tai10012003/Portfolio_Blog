"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { defaultLocale, homeDictionaries, profile, type Locale } from "../home/data";
import { SiteHeader } from "../home/components/site-header";
import { SiteFooter } from "../home/components/site-footer";
import { Reveal } from "../home/components/reveal";
import { ArrowIcon } from "../home/components/arrow-icon";
import { experienceDictionaries } from "./data";

export function ExperienceView() {
  const [locale, setLocale] = useState<Locale>(defaultLocale);
  const content = experienceDictionaries[locale];
  const home = homeDictionaries[locale];
  useEffect(() => { document.documentElement.lang = locale; }, [locale]);

  return (
    <div className="home-page work-page" id="page-top">
      <a className="skip-link" href="#main-content">{home.skipLink}</a>
      <SiteHeader locale={locale} navItems={home.navItems} onLocaleChange={setLocale} />
      <main className="site-container work-page-main" id="main-content">
        <nav className="about-breadcrumb" aria-label={locale === "vi" ? "Đường dẫn" : "Breadcrumb"}>
          <Link href="/">{home.navItems[0].label}</Link><span aria-hidden="true">/</span><span aria-current="page">{content.breadcrumb}</span>
        </nav>
        <Reveal><header className="work-page-intro"><p className="eyebrow"><span className="status-dot" />{content.eyebrow}</p><h1>{content.title}</h1><p>{content.intro}</p></header></Reveal>

        <div className="work-layout">
          <aside className="work-sidebar">
            <p className="work-sidebar-name">{profile.name}</p>
            <nav aria-label={content.timelineLabel}><h2>{content.timelineLabel}</h2><ol>{content.jobs.map((job) => (
              <li key={job.id}><a href={`#${job.id}`}><span className={`work-nav-dot${job.current ? " is-current" : ""}`} aria-hidden="true" /><div><strong>{job.company}</strong><span>{job.period}</span></div><ArrowIcon /></a></li>
            ))}</ol></nav>
            <Link className="text-link" href="/skills">{content.skillsCta}<ArrowIcon /></Link>
          </aside>

          <div className="work-jobs">{content.jobs.map((job, index) => (
            <section className="work-job-section" id={job.id} aria-labelledby={`${job.id}-title`} key={job.id}>
              <Reveal as="article" className={`work-job-card${job.current ? " work-job-current" : ""}`}>
                <div className="work-job-top"><span className={`work-company-mark work-company-${job.id}`} aria-hidden="true">{job.monogram}</span><div><p className="work-company-name">{job.company}</p><h2 id={`${job.id}-title`}>{job.role}</h2></div><span className={`work-status${job.current ? " is-current" : ""}`}>{job.current ? content.currentLabel : content.pastLabel}</span></div>
                <p className="work-period"><span aria-hidden="true">0{index + 1} /</span>{job.period}</p>
                <p className="work-summary">{job.summary}</p>
                <div className="work-stack"><h3>{content.stackLabel}</h3><ul>{job.technologies.map((technology) => <li key={technology}>{technology}</li>)}</ul></div>

                <div className="work-responsibilities"><h3>{content.tasksLabel}</h3><ul className="work-bullet-list">{job.tasks.map((task) => <li key={task}>{task}</li>)}</ul></div>
                {job.project && <div className="work-project"><p className="eyebrow">{content.projectLabel}</p><h3>{job.project.title}</h3><p>{job.project.description}</p><ol className="work-service-flow">{job.project.services.map((service) => <li key={service}>{service}</li>)}</ol><a className="text-link" href={job.project.href} target="_blank" rel="noopener noreferrer">{content.projectLinkLabel}<ArrowIcon direction="up-right" /></a></div>}
                <div className="work-outcomes"><h3>{content.outcomesLabel}</h3><ul className="work-bullet-list">{job.outcomes.map((outcome) => <li key={outcome}>{outcome}</li>)}</ul></div>
                <div className="work-environment"><h3>{content.workflowLabel}</h3><div>{job.workflow.map((item) => <span key={item}>{item}</span>)}</div></div>
              </Reveal>
            </section>
          ))}</div>
        </div>

        <Reveal><section className="about-closing" aria-labelledby="work-closing-title"><div><h2 id="work-closing-title">{content.closingTitle}</h2><p>{content.closingDescription}</p></div><Link className="button button-primary" href="/#contact">{content.contactCta}<ArrowIcon /></Link></section></Reveal>
      </main>
      <SiteFooter content={home.footer} navItems={home.navItems} />
    </div>
  );
}
