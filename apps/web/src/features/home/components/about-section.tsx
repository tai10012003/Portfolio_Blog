import type { AboutContent } from "../types";

export function AboutSection({ content }: { content: AboutContent }) {
  return (
    <section className="section about-section" id="about" aria-labelledby="about-title">
      <div><p className="eyebrow">01 / {content.eyebrow}</p><h2 id="about-title">{content.title}</h2></div>
      <div className="about-copy"><p>{content.description}</p><div className="personal-note"><span aria-hidden="true">✦</span>{content.note}</div></div>
    </section>
  );
}
