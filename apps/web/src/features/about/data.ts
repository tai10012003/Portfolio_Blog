import vi from "@/i18n/locales/vi.json";
import en from "@/i18n/locales/en.json";
import type { Locale } from "../home/data";

export const aboutPortrait = "/images/about-portrait.jpg";

export const aboutDictionaries = {
  vi: vi.aboutPage,
  en: en.aboutPage,
} satisfies Record<Locale, typeof vi.aboutPage>;
