import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { Navigation } from "./navigation";

export function ContactPage({ locale }: { locale: Locale }) {
  const it = locale === "it";
  return <>
    <Navigation content={getDictionary(locale)} locale={locale} currentPage="contact" />
    <main id="contenuto" className="contact-page" tabIndex={-1}>
      <h1>{it ? "Contatti" : "Contact"}</h1>
      <p>{it ? "Per informazioni, richieste e collaborazioni:" : "For information, enquiries and collaborations:"}</p>
      <a className="contact-address" href="mailto:info@caurisaviation.com">info@caurisaviation.com</a>
      <p className="contact-location">{it ? "Catania, Sicilia" : "Catania, Sicily"}</p>
    </main>
  </>;
}
