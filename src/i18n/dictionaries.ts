import italian from "@/content/it";
import english from "@/content/en";
import type { SiteContent } from "@/content/types";
import type { Locale } from "./config";

const dictionaries: Record<Locale, SiteContent> = {
  it: italian,
  en: english,
};

export function getDictionary(locale: Locale): SiteContent {
  return dictionaries[locale];
}
