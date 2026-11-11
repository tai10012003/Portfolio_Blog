import type { AboutContent } from "../types";
import Link from "next/link";
import { ArrowIcon } from "./arrow-icon";

export function AboutSection({ content }: { content: AboutContent }) {
  return (
    <section className="section about-section" id="about" aria-labelledby="about-title">
      <div><p className="eyebrow">01 / {content.eyebrow}</p><h2 id="about-title">{content.title}</h2></div>
      <div className="about-copy"><p>{content.description}</p><div className="personal-note"><span aria-hidden="true">✦</span>{content.note}</div><Link className="text-link about-read-more" href="/about">{content.readMoreLabel}<ArrowIcon /></Link></div>
    </section>
  );
}
