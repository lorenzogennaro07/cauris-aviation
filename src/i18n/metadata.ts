import type { Metadata } from "next";
import type { Locale } from "./config";
import { absoluteUrl, isPreview, languageAlternates, seoPages, siteName, siteUrl, type SeoPage } from "@/lib/seo";
export function pageMetadata(locale: Locale, page: SeoPage = "home"): Metadata {
  const { title, description, path } = seoPages[page][locale];
  const image = { url: absoluteUrl("/images/hero/sfondo-pagina-iniziale.jpg"), width: 6000, height: 4000, alt: locale === "it" ? "Elicottero in volo sul mare al tramonto" : "A helicopter flying over the sea at sunset" };
  return {
    metadataBase: new URL(siteUrl), title, description,
    alternates: { canonical: absoluteUrl(path), languages: languageAlternates(page) },
    robots: { index: !isPreview, follow: !isPreview },
    openGraph: { title, description, url: absoluteUrl(path), type: "website", locale: locale === "it" ? "it_IT" : "en_GB", alternateLocale: locale === "it" ? "en_GB" : "it_IT", siteName, images: [image] },
    twitter: { card: "summary_large_image", title, description, images: [image] },
  };
}
