import type { NavItem } from "../features/home/types";

export function getSiteNavigation(items: NavItem[], pathname: string): NavItem[] {
  return items.map((item) => ({
    ...item,
    href: pathname !== "/" && item.href.startsWith("#") ? `/${item.href}` : item.href,
  }));
}
