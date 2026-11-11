"use client";

import type { FooterContent, NavItem } from "../types";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getSiteNavigation } from "@/lib/navigation";
import { profile } from "../data";
import { Reveal } from "./reveal";
import { ArrowIcon } from "./arrow-icon";

export function SiteFooter({ content, navItems }: { content: FooterContent; navItems: NavItem[] }) {
  const links = getSiteNavigation(navItems, usePathname());
  return (
    <footer className="site-footer">
      <div className="site-container">
        <Reveal className="footer-main">
          <div className="footer-profile">
            <Link className="footer-brand" href="/#home" aria-label={profile.name}>
              <span className="brand-mark" aria-hidden="true">t<span>.</span></span>
              <span>{profile.name}</span>
            </Link>
            <p className="footer-label">Portfolio & Blog</p>
            <p className="footer-description">{content.description}</p>
          </div>
          <nav className="footer-navigation" aria-label={content.navLabel}>
            <h2>{content.exploreLabel}</h2>
            <div className="footer-links">
              {links.filter((item) => !item.href.endsWith("#home")).map((item) => (
                <Link key={item.href} href={item.href}><span>{item.label}</span><ArrowIcon /></Link>
              ))}
            </div>
          </nav>
          <div className="footer-note">
            <span className="footer-note-icon" aria-hidden="true">✳</span>
            <h2>{content.noteTitle}</h2>
            <p>{content.note}</p>
            <span className="footer-code" aria-hidden="true">&lt;learn /&gt; &lt;build /&gt; &lt;share /&gt;</span>
          </div>
        </Reveal>
        <div className="footer-bottom">
          <p>{content.brand}</p>
          <p className="footer-signature">{content.signature}</p>
          <a className="back-to-top" href="#page-top">{content.backToTop}<span><ArrowIcon direction="up" /></span></a>
        </div>
      </div>
    </footer>
  );
}
