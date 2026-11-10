"use client";

import { useEffect, useState } from "react";
import { AboutSection } from "./components/about-section";
import { BlogSection } from "./components/blog-section";
import { ContactSection } from "./components/contact-section";
import { ExperienceSection } from "./components/experience-section";
import { HeroSection } from "./components/hero-section";
import { ProjectsSection } from "./components/projects-section";
import { Reveal } from "./components/reveal";
import { SiteFooter } from "./components/site-footer";
import { SiteHeader } from "./components/site-header";
import { SkillsSection } from "./components/skills-section";
import { defaultLocale, homeDictionaries, type Locale } from "./data";

export function HomeView() {
  const [locale, setLocale] = useState<Locale>(defaultLocale);
  const content = homeDictionaries[locale];

  useEffect(() => { document.documentElement.lang = locale; }, [locale]);

  return (
    <div className="home-page">
      <a className="skip-link" href="#main-content">{content.skipLink}</a>
      <SiteHeader locale={locale} navItems={content.navItems} onLocaleChange={setLocale} />
      <main id="main-content">
        <HeroSection content={content.hero} skills={content.skills} />
        <div className="site-container home-sections">
          <Reveal><AboutSection content={content.about} /></Reveal>
          <SkillsSection intro={content.skillsIntro} skills={content.skills} />
          <Reveal><ExperienceSection experiences={content.experiences} intro={content.experienceIntro} /></Reveal>
          <ProjectsSection intro={content.projectsIntro} projects={content.projects} />
          <BlogSection intro={content.blogIntro} posts={content.posts} />
          <Reveal><ContactSection content={content.contact} /></Reveal>
        </div>
      </main>
      <SiteFooter content={content.footer} navItems={content.navItems} />
    </div>
  );
}
