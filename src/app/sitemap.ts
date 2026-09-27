import type { MetadataRoute } from "next";
import { absoluteUrl, isPreview, languageAlternates, seoPages, type SeoPage } from "@/lib/seo";
export default function sitemap(): MetadataRoute.Sitemap {
  if (isPreview) return [];
  return (Object.keys(seoPages) as SeoPage[]).flatMap(page => (["it", "en"] as const).map(locale => ({
    url: absoluteUrl(seoPages[page][locale].path), alternates: { languages: languageAlternates(page) },
  })));
}
