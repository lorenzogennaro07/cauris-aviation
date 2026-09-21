import type { Metadata } from "next";
import type { Locale } from "./config";
import { getDictionary } from "./dictionaries";
export function pageMetadata(locale: Locale): Metadata {
  const c = getDictionary(locale);
  const title = locale === "it" ? "CAURIS AVIATION" : "CAURIS AVIATION | Catania · Lipari";
  const description = locale === "it" ? "Collegamenti in elicottero tra la Sicilia e le sue isole." : c.description;
  return {
    title, description,
    robots: { index: false, follow: false },
    openGraph: { title, description, type: "website", locale: locale === "it" ? "it_IT" : "en_GB", alternateLocale: locale === "it" ? "en_GB" : "it_IT", siteName: c.brandName },
    twitter: { card: "summary", title, description },
  };
}
