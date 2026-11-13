import vi from "@/i18n/locales/vi.json";
import en from "@/i18n/locales/en.json";
import type { Locale } from "../home/data";

export const experienceDictionaries = {
  vi: vi.experiencePage,
  en: en.experiencePage,
} satisfies Record<Locale, typeof vi.experiencePage>;
