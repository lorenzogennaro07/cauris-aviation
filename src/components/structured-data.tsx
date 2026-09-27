import { absoluteUrl, siteName, siteUrl } from "@/lib/seo";
const graph = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "Organization", "@id": `${siteUrl}/#organization`, name: siteName, url: absoluteUrl("/"), logo: absoluteUrl("/brand/png-logo-nuovo-verde-e-blu.png"), email: "info@caurisaviation.com", description: "CAURIS AVIATION sviluppa soluzioni di collegamento in elicottero tra la Sicilia e le isole minori siciliane." },
    { "@type": "WebSite", "@id": `${siteUrl}/#website`, name: siteName, url: absoluteUrl("/"), inLanguage: ["it", "en"], publisher: { "@id": `${siteUrl}/#organization` } },
  ],
};
export function StructuredData() {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(graph).replace(/</g, "\\u003c") }} />;
}
