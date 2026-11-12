import vi from "@/i18n/locales/vi.json";
import en from "@/i18n/locales/en.json";
import type { Locale } from "../home/data";

export const skillsDictionaries = {
  vi: vi.skillsPage,
  en: en.skillsPage,
} satisfies Record<Locale, typeof vi.skillsPage>;
