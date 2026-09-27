import Image from "next/image";
import type { Metadata } from "next";
import { Navigation } from "@/components/navigation";
import { getDictionary } from "@/i18n/dictionaries";

const description = "Soluzioni in elicottero pensate per esigenze di viaggio private, hospitality e richieste dedicate.";
export const metadata: Metadata = {
  title: "Servizi | CAURIS AVIATION",
  description,
  robots: { index: false, follow: false },
  openGraph: { title: "Servizi | CAURIS AVIATION", description, type: "website", locale: "it_IT" },
};

const services = [
  {
    title: "Private Travel",
    text: "Collegamenti e trasferimenti dedicati a chi desidera raggiungere le isole riducendo tempi e complessità dello spostamento.",
  },
  {
    title: "Hospitality & Concierge",
    text: "Soluzioni dedicate a hotel, resort e concierge per integrare il trasferimento in elicottero nell’organizzazione del viaggio dei propri ospiti.",
  },
  {
    title: "Richieste dedicate",
    text: "Collegamenti e trasferimenti da valutare sulla base delle specifiche esigenze di viaggio, della fattibilità operativa e della disponibilità.",
  },
];

export default function ServicesPage() {
  return <>
    <Navigation content={getDictionary("it")} locale="it" currentPage="services" />
    <main id="contenuto" className="services-page" tabIndex={-1}>
      <header className="services-opening">
        <div className="services-opening-copy">
          <h1>Servizi</h1>
          <p>{description}</p>
        </div>
        <div className="services-photo">
          <Image src="/images/aviation/esperienza-cabina.jpg" alt="Vista dalla cabina di un elicottero, con un passeggero e il paesaggio oltre il finestrino" fill loading="eager" sizes="(max-width: 767px) 86vw, 43vw" quality={85} />
        </div>
      </header>
      <div className="services-list">
        {services.map((service, index) => <section className="service-row" key={service.title} aria-labelledby={`service-title-${index}`}>
          <h2 id={`service-title-${index}`}>{service.title}</h2>
          <p>{service.text}</p>
        </section>)}
      </div>
      <p className="services-capacity">Le configurazioni previste possono accogliere fino a circa 6 passeggeri, in funzione dell’aeromobile impiegato.</p>
    </main>
  </>;
}
