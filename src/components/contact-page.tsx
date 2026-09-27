import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { ContactForm } from "./contact-form";
import { Navigation } from "./navigation";

export function ContactPage({ locale }: { locale: Locale }) {
  const it = locale === "it";
  return <>
    <Navigation content={getDictionary(locale)} locale={locale} currentPage="contact" />
    <main id="contenuto" className="contact-page" tabIndex={-1}>
      <div className="contact-intro">
      <h1>{it ? "Contatti" : "Contact"}</h1>
      <p>{it ? "Per informazioni, collaborazioni o richieste generali, contatta CAURIS Aviation." : "For information, partnerships or general enquiries, contact CAURIS Aviation."}</p>
      <a className="contact-address" href="mailto:info@caurisaviation.com">info@caurisaviation.com</a>
      <p className="contact-location">{it ? "Catania, Sicilia" : "Catania, Sicily"}</p>
      </div>
      <ContactForm locale={locale} />
    </main>
  </>;
}
