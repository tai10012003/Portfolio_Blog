"use client";

import { useEffect, useRef, useState } from "react";
import { profile, type Locale } from "../data";
import type { NavItem } from "../types";
import { ThemeToggle } from "./theme-toggle";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getSiteNavigation } from "@/lib/navigation";

type Props = { locale: Locale; navItems: NavItem[]; onLocaleChange: (locale: Locale) => void };

export function SiteHeader({ locale, navItems, onLocaleChange }: Props) {
  const pathname = usePathname();
  const links = getSiteNavigation(navItems, pathname);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("#home");
  const menuButton = useRef<HTMLButtonElement>(null);
  const header = useRef<HTMLElement>(null);

  useEffect(() => {
    if (pathname !== "/") return;
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting);
      if (visible.length) setActive("#" + visible[0].target.id);
    }, { rootMargin: "-15% 0px -55% 0px", threshold: 0 });
    document.querySelectorAll("main section[id]").forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const dismiss = (event: KeyboardEvent) => {
      if (event.key === "Escape") { setOpen(false); menuButton.current?.focus(); }
    };
    const outside = (event: PointerEvent) => {
      if (!header.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", dismiss);
    document.addEventListener("pointerdown", outside);
    return () => {
      document.removeEventListener("keydown", dismiss);
      document.removeEventListener("pointerdown", outside);
    };
  }, [open]);

  return (
    <header className="site-header" ref={header}>
      <div className="site-container header-inner">
        <Link className="brand" href="/#home" onClick={() => { setOpen(false); setActive("#home"); }} aria-label={profile.name}>
          <span className="brand-mark">t<span>.</span></span>
          <span className="brand-name">{profile.name}<span>portfolio & blog</span></span>
        </Link>
        <nav id="primary-navigation" className={`primary-nav ${open ? "is-open" : ""}`} aria-label={locale === "vi" ? "Điều hướng chính" : "Main navigation"}>
          {links.map((item) => (
            <Link href={item.href} key={item.href} aria-current={item.href === pathname ? "page" : pathname === "/" && active === item.href ? "location" : undefined}
              onClick={() => setOpen(false)}>{item.label}</Link>
          ))}
        </nav>
        <div className="header-actions">
          <ThemeToggle locale={locale} />
          <div className="language-switch" role="group" aria-label={locale === "vi" ? "Ngôn ngữ" : "Language"}>
            {(["vi", "en"] as const).map((value) => (
              <button type="button" key={value} aria-pressed={locale === value}
                onClick={() => { onLocaleChange(value); setOpen(false); }}>{value.toUpperCase()}</button>
            ))}
          </div>
          <button ref={menuButton} type="button" className="menu-toggle" aria-expanded={open}
            aria-controls="primary-navigation" aria-label={locale === "vi" ? (open ? "Đóng menu" : "Mở menu") : (open ? "Close menu" : "Open menu")}
            onClick={() => setOpen(!open)}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
              {open ? <path d="m6 6 12 12M6 18 18 6" /> : <path d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
