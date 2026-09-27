import Image from "next/image";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { StructuredData } from "./structured-data";
import { Navigation } from "./navigation";
import { CorporateIntroduction } from "./corporate-introduction";

export function Journey({ locale }: { locale: Locale }) {
  const c = getDictionary(locale);
  const it = locale === "it";
  return <>
    <StructuredData />
    <Navigation content={{ skip: c.skip }} locale={locale} />
    <main id="contenuto" tabIndex={-1}>
      <section className="hero" aria-labelledby="hero-title">
        {/* LOCKED: user-selected sfondo pagina iniziale.JPG; same source at every breakpoint. */}
        <div className="hero-photo">
          <Image src="/images/hero/sfondo-pagina-iniziale.jpg" alt={it ? "Elicottero in volo sul mare nella luce del tramonto" : "Helicopter flying over the sea in the evening light"} fill sizes="100vw" quality={85} preload />
        </div>
        <div className="hero-copy">
          <h1 id="hero-title">{it ? "Dalla Sicilia alle isole minori." : "Connecting Sicily with its smaller islands."}</h1>
          <p>{it ? "Collegamenti in elicottero tra la Sicilia e le sue isole." : "Helicopter connections between Sicily and its islands."}</p>
        </div>
      </section>
      <CorporateIntroduction locale={locale} />
      <section className="mobility" aria-labelledby="mobility-title">
        <div className="mobility-inner">
          <h2 id="mobility-title">{it ? "Una mobilità più diretta." : "A more direct way to travel."}</h2>
          <p>{it ? "CAURIS sviluppa soluzioni di collegamento pensate per ridurre tempi e complessità degli spostamenti tra la Sicilia e le isole minori, adattandosi a esigenze private, hospitality e richieste dedicate." : "CAURIS develops connections designed to reduce travel time and simplify journeys between Sicily and its smaller islands, tailored to private travel, hospitality and individual requests."}</p>
          <ul className="mobility-principles">{(it ? ["Rapidità", "Semplicità", "Flessibilità"] : ["Speed", "Simplicity", "Flexibility"]).map(label => <li key={label}>{label}</li>)}</ul>
        </div>
      </section>
    </main>
  </>;
}

