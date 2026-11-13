import vi from "@/i18n/locales/vi.json";
import en from "@/i18n/locales/en.json";
import type { Locale } from "../home/data";

export const projectsDictionaries = {
  vi: vi.projectsPage,
  en: en.projectsPage,
} satisfies Record<Locale, typeof vi.projectsPage>;
