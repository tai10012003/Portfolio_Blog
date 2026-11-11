"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { defaultLocale, homeDictionaries, profile, type Locale } from "../home/data";
import { SiteHeader } from "../home/components/site-header";
import { SiteFooter } from "../home/components/site-footer";
import { Reveal } from "../home/components/reveal";
import { ArrowIcon } from "../home/components/arrow-icon";
import { aboutDictionaries, aboutPortrait } from "./data";

const principlePaths = [
  "m10 4-6 8 6 8m4-16 6 8-6 8",
  "M4 7h16M4 12h10M4 17h7m5 0 2 2 4-5",
  "M12 6v14M3 4c4-1 6 0 9 2 3-2 5-3 9-2v14c-4-1-6 0-9 2-3-2-5-3-9-2Z",
];

export function AboutView() {
  const [locale, setLocale] = useState<Locale>(defaultLocale);
  const content = aboutDictionaries[locale];
  const home = homeDictionaries[locale];
  useEffect(() => { document.documentElement.lang = locale; }, [locale]);

  return (
    <div className="home-page about-page" id="page-top">
      <a className="skip-link" href="#main-content">{home.skipLink}</a>
      <SiteHeader locale={locale} navItems={home.navItems} onLocaleChange={setLocale} />
      <main className="site-container about-page-main" id="main-content">
        <nav className="about-breadcrumb" aria-label={locale === "vi" ? "Đường dẫn" : "Breadcrumb"}>
          <Link href="/">{home.navItems[0].label}</Link><span aria-hidden="true">/</span><span aria-current="page">{content.breadcrumb}</span>
        </nav>
        <Reveal>
          <header className="about-page-intro">
            <p className="eyebrow"><span className="status-dot" />{content.eyebrow}</p>
            <h1>{content.title}</h1><p>{content.intro}</p>
          </header>
        </Reveal>
        <section className="about-story-grid" aria-labelledby="story-title">
          <Reveal className="about-story-card">
            <p className="eyebrow">{content.storyLabel}</p><h2 id="story-title">{content.storyTitle}</h2>
            <div className="about-story-copy">{content.storyParagraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
            <blockquote><span aria-hidden="true">“</span><p>{content.quote}</p><cite>{profile.name}</cite></blockquote>
            <Link className="text-link" href="/#projects">{content.projectCta}<ArrowIcon /></Link>
          </Reveal>
          <Reveal className="about-profile-card" delay={100}>
            <div className="about-profile-photo"><Image src={aboutPortrait} alt={content.portraitAlt} width={1536} height={2048} priority sizes="(max-width: 700px) calc(100vw - 72px), 340px" /></div>
            <div className="about-profile-details"><p className="eyebrow">{content.role}</p><h2>{profile.name}</h2><p>{content.profileCaption}</p></div>
          </Reveal>
        </section>
        <section className="about-principles" aria-labelledby="principles-title">
          <Reveal className="section-heading"><div><p className="eyebrow">{content.principlesLabel}</p><h2 id="principles-title">{content.principlesTitle}</h2></div><p>{content.principlesDescription}</p></Reveal>
          <div className="about-principle-grid">{content.principles.map((principle, index) => (
            <Reveal as="article" className="about-principle-card" key={principle.title} delay={index * 80}>
              <div className="about-principle-top"><span className="about-principle-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={principlePaths[index]} /></svg></span><span className="about-principle-number" aria-hidden="true">0{index + 1}</span></div>
              <h3>{principle.title}</h3><p>{principle.description}</p>
            </Reveal>
          ))}</div>
        </section>
        <Reveal>
          <section className="about-learning-grid" aria-labelledby="learning-title">
            <div className="about-learning-copy"><p className="eyebrow">{content.learningLabel}</p><h2 id="learning-title">{content.learningTitle}</h2><p>{content.learningDescription}</p><div className="about-topic-list">{content.learningTopics.map((topic) => <span key={topic}>{topic}</span>)}</div></div>
            <div className="about-writing-card"><span className="about-writing-mark" aria-hidden="true">&lt;/&gt;</span><h3>{content.writingTitle}</h3><p>{content.writingDescription}</p><Link className="text-link" href="/#blog">{content.writingCta}<ArrowIcon /></Link></div>
          </section>
        </Reveal>
        <Reveal>
          <section className="about-closing" aria-labelledby="closing-title"><div><h2 id="closing-title">{content.closingTitle}</h2><p>{content.closingDescription}</p></div><Link className="button button-primary" href="/#contact">{content.contactCta}<ArrowIcon /></Link></section>
        </Reveal>
      </main>
      <SiteFooter content={home.footer} navItems={home.navItems} />
    </div>
  );
}
