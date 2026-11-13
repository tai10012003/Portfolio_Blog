export type NavItem = {
  label: string;
  href: string;
};

export type StatItem = {
  value: string;
  label: string;
};

export type SkillItem = {
  name: string;
  group: string;
};

export type ExperienceItem = {
  role: string;
  period: string;
  description: string;
};

export type ProjectItem = {
  title: string;
  summary: string;
  stack: string[];
};

export type BlogPostPreview = {
  title: string;
  category: string;
  readTime: string;
};

export type HeroContent = {
  greeting: string;
  stackLabel: string;
  avatarAlt: string;
  profileNote: string;
  eyebrow: string;
  title: string;
  description: string;
  primaryCta: string;
  secondaryCta: string;
  profileEyebrow: string;
  profileTitle: string;
  profileBadge: string;
};

export type AboutContent = {
  readMoreLabel: string;
  note: string;
  eyebrow: string;
  title: string;
  description: string;
};

export type SectionIntro = {
  eyebrow: string;
  title: string;
  description?: string;
};

export type ContactContent = {
  eyebrow: string;
  title: string;
  description: string;
  email: string;
};

export type FooterContent = {
  description: string;
  exploreLabel: string;
  noteTitle: string;
  note: string;
  signature: string;
  navLabel: string;
  backToTop: string;
  brand: string;
};

export type HomeDictionary = {
  skipLink: string;
  navItems: NavItem[];
  stats: StatItem[];
  skills: SkillItem[];
  experiences: ExperienceItem[];
  projects: ProjectItem[];
  posts: BlogPostPreview[];
  hero: HeroContent;
  about: AboutContent;
  skillsIntro: SectionIntro & { actionLabel: string; softSkillsLabel: string; softSkills: string[] };
  experienceIntro: SectionIntro & { actionLabel: string };
  projectsIntro: SectionIntro & {
    actionLabel: string;
  };
  blogIntro: SectionIntro;
  contact: ContactContent;
  footer: FooterContent;
};
