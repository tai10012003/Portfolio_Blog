import type { ContactContent } from "../types";
import { ArrowIcon } from "./arrow-icon";

export function ContactSection({ content }: { content: ContactContent }) {
  return (
    <section className="contact-section" id="contact" aria-labelledby="contact-title">
      <div className="contact-decoration" aria-hidden="true">✳</div>
      <div><p className="eyebrow">06 / {content.eyebrow}</p><h2 id="contact-title">{content.title}</h2><p>{content.description}</p></div>
      <a className="button button-primary" href={`mailto:${content.email}`}>{content.email}<ArrowIcon direction="up-right" /></a>
    </section>
  );
}
