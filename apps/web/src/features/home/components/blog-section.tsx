import type { BlogPostPreview, SectionIntro } from "../types";
import { Reveal } from "./reveal";

export function BlogSection({ intro, posts }: { intro: SectionIntro; posts: BlogPostPreview[] }) {
  return (
    <section className="section blog-section" id="blog" aria-labelledby="blog-title">
      <Reveal className="section-heading"><div><p className="eyebrow">05 / {intro.eyebrow}</p><h2 id="blog-title">{intro.title}</h2></div><p>{intro.description}</p></Reveal>
      <div className="post-list">{posts.map((post, index) => (
        <Reveal as="article" className="post-row" key={post.title} delay={index * 70}><span className="post-index" aria-hidden="true">0{index + 1}</span><div><span className="post-category">{post.category}</span><h3>{post.title}</h3></div><span className="read-time">{post.readTime}</span></Reveal>
      ))}</div>
    </section>
  );
}
