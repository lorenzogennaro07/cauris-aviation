import type { Locale } from "@/i18n/config";
export const siteUrl = "https://www.caurisaviation.com";
export const siteName = "CAURIS AVIATION";
export const isPreview = process.env.VERCEL_ENV === "preview";
export const seoPages = {
  home: {
    it: { path: "/", title: "Trasferimenti in elicottero in Sicilia | CAURIS AVIATION", description: "CAURIS AVIATION sviluppa collegamenti in elicottero tra la Sicilia e le isole minori, per esigenze private, hospitality e richieste dedicate." },
    en: { path: "/en", title: "Helicopter Transfers in Sicily | CAURIS AVIATION", description: "CAURIS AVIATION develops helicopter connections between Sicily and its smaller islands for private travel, hospitality and tailored requests." },
  },
  services: {
    it: { path: "/servizi", title: "Servizi di trasferimento in elicottero | CAURIS AVIATION", description: "Soluzioni di trasferimento in elicottero tra la Sicilia e le isole: viaggi privati, hospitality e richieste dedicate, secondo fattibilità e disponibilità." },
    en: { path: "/en/services", title: "Helicopter Transfer Services | CAURIS AVIATION", description: "Helicopter transfer services between Sicily and its islands for private travel, hospitality and tailored requests, subject to feasibility and availability." },
  },
  about: {
    it: { path: "/about", title: "CAURIS AVIATION | Sicilia e Isole Eolie più vicine", description: "L’idea di CAURIS AVIATION: rendere più diretto il viaggio tra la Sicilia e le sue isole, riducendo passaggi e distanza percepita." },
    en: { path: "/en/about", title: "About CAURIS AVIATION | Sicily & Aeolian Islands", description: "The idea behind CAURIS AVIATION: a more direct way to travel between Sicily and its islands, with fewer connections and less sense of distance." },
  },
  contact: {
    it: { path: "/contatti", title: "Contatti e richieste generali | CAURIS AVIATION", description: "Contatta CAURIS AVIATION per informazioni, collaborazioni o richieste generali. Compila il modulo o scrivi a info@caurisaviation.com. Catania, Sicilia." },
    en: { path: "/en/contact", title: "Contact and general enquiries | CAURIS AVIATION", description: "Contact CAURIS AVIATION for information, partnerships or general enquiries. Use the form or email info@caurisaviation.com. Catania, Sicily." },
  },
} satisfies Record<string, Record<Locale, { path: string; title: string; description: string }>>;
export type SeoPage = keyof typeof seoPages;
export const absoluteUrl = (path: string) => new URL(path, siteUrl).href;
export function languageAlternates(page: SeoPage) {
  return { it: absoluteUrl(seoPages[page].it.path), en: absoluteUrl(seoPages[page].en.path), "x-default": absoluteUrl(seoPages[page].it.path) };
}
