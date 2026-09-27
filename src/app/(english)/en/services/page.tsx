import Image from "next/image";
import type { Metadata } from "next";
import { Navigation } from "@/components/navigation";
import { getDictionary } from "@/i18n/dictionaries";

const description = "Helicopter services for private travel, hospitality and tailored requests.";
export const metadata: Metadata = {
  title: "Services | CAURIS AVIATION",
  description,
  robots: { index: false, follow: false },
  openGraph: { title: "Services | CAURIS AVIATION", description, type: "website", locale: "en_GB" },
};

const services = [
  {
    title: "Private Travel",
    text: "Connections and transfers for travellers seeking a simpler, faster way to reach the islands.",
  },
  {
    title: "Hospitality & Concierge",
    text: "Services for hotels, resorts and concierges looking to include helicopter transfers in their guests’ travel arrangements.",
  },
  {
    title: "Tailored requests",
    text: "Connections and transfers considered according to specific travel needs, operational feasibility and availability.",
  },
];

export default function ServicesPage() {
  return <>
    <Navigation content={getDictionary("en")} locale="en" currentPage="services" />
    <main id="contenuto" className="services-page" tabIndex={-1}>
      <header className="services-opening">
        <div className="services-opening-copy">
          <h1>Services</h1>
          <p>{description}</p>
        </div>
        <div className="services-photo">
          <Image src="/images/aviation/esperienza-cabina.jpg" alt="View from a helicopter cabin, with a passenger and the landscape beyond the window" fill loading="eager" sizes="(max-width: 767px) 86vw, 43vw" quality={85} />
        </div>
      </header>
      <div className="services-list">
        {services.map((service, index) => <section className="service-row" key={service.title} aria-labelledby={`service-title-${index}`}>
          <h2 id={`service-title-${index}`}>{service.title}</h2>
          <p>{service.text}</p>
        </section>)}
      </div>
      <p className="services-capacity">Planned configurations can accommodate up to around 6 passengers, depending on the aircraft used.</p>
    </main>
  </>;
}
