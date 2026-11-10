import en from "@/i18n/locales/en.json";
import vi from "@/i18n/locales/vi.json";
import type { HomeDictionary } from "./types";

export type Locale = "vi" | "en";

export const homeDictionaries = {
  vi: vi.home,
  en: en.home,
} satisfies Record<Locale, HomeDictionary>;

export const defaultLocale: Locale = "vi";

export const profile = {
  name: "Pham Duc Tai",
  avatar: "/images/avatar.jpg",
};
