import type { Metadata } from "next";
import type { Locale } from "./config";
import { getDictionary } from "./dictionaries";
export function pageMetadata(locale: Locale): Metadata {
  const c = getDictionary(locale);
  const title = "CAURIS AVIATION | Catania · Lipari";
  return {
    title, description: c.description,
    robots: { index: false, follow: false },
    openGraph: { title, description: c.description, type: "website", locale: locale === "it" ? "it_IT" : "en_GB", alternateLocale: locale === "it" ? "en_GB" : "it_IT", siteName: c.brandName },
    twitter: { card: "summary", title, description: c.description },
  };
}
