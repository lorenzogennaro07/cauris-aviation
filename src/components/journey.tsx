import Image from "next/image";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { Navigation } from "./navigation";
import { JourneyMotion } from "./journey-motion";
import { CorporateIntroduction } from "./corporate-introduction";

export function Journey({ locale }: { locale: Locale }) {
  const c = getDictionary(locale);
  const it = locale === "it";
  return <>
    <Navigation content={c} locale={locale} />
    <main id="contenuto" tabIndex={-1}>
      <section className="hero-sequence" aria-labelledby="hero-title">
        <div className="hero-stage">
          <div className="hero-landscape">
            <Image src="/images/hero/cauris-sicilia-eolie-hero.png" alt={it ? "Veduta della Sicilia con Etna, costa e Mediterraneo verso le Eolie; immagine fornita da CAURIS." : "View of Sicily with Etna, the coastline and Mediterranean toward the Aeolian Islands; image supplied by CAURIS."} fill sizes="100vw" quality={85} preload className="landscape-photo" />
          </div>
          <div className="hero-atmosphere" aria-hidden="true" />
          <div className="hero-wordmark" aria-hidden="true">
            <Image src="/brand/cauris-wordmark.svg.svg" alt="" width={1123} height={794} unoptimized preload />
          </div>
          <div className="hero-aircraft">
            <Image src="/images/hero/helicopter.webp" alt={it ? "Elicottero civile executive argento in volo, fotografato da Alec Wilson; composizione illustrativa." : "Silver executive civilian helicopter in flight, photographed by Alec Wilson; illustrative composition."} width={2050} height={745} sizes="(max-width: 767px) 94vw, 78vw" preload />
          </div>
          <div className="hero-copy">
            <h1 id="hero-title">{it ? "Dalla Sicilia alle isole minori." : "From Sicily to the Aeolian Islands."}</h1>
            <p>{it ? "Collegamenti in elicottero tra la Sicilia e le sue isole." : "Helicopter connections to the islands."}</p>
          </div>
          <div className="hero-progress" aria-hidden="true"><span /></div>
        </div>
      </section>
      <CorporateIntroduction locale={locale} />
    </main>
    <aside className="media-credits" aria-label={it ? "Crediti fotografici" : "Photography credits"}>
      <details>
        <summary>{it ? "Crediti fotografici" : "Photography credits"}</summary>
        <p><a href="https://www.flickr.com/photos/76052339@N05/32185277147">G-GBMM — Alec Wilson</a> · <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC BY-SA 2.0</a>. {it ? "Scontorno e ottimizzazione; adattamento sotto la stessa licenza." : "Background removal and optimisation; adaptation under the same licence."} <a href="/images/hero/helicopter.webp">{it ? "Fotografia adattata" : "Adapted photograph"}</a>.</p>
        <p>{it ? "Sfondo: immagine fornita da CAURIS. Inquadratura adattata al dispositivo, senza alterazioni della geografia rappresentata." : "Background: image supplied by CAURIS. Framing adapted to the device, without altering the geography depicted."}</p>
        <p>{it ? "Composizione fotografica illustrativa: non documenta un volo CAURIS né un aeromobile della sua flotta. Nessuna affiliazione con il fotografo dell’elicottero." : "Illustrative photographic composition: it does not depict a CAURIS flight or fleet aircraft. No affiliation with the helicopter photographer."}</p>
      </details>
    </aside>
    <JourneyMotion />
  </>;
}

