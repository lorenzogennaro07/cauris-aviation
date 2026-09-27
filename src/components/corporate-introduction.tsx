import Image from "next/image";
import type { Locale } from "@/i18n/config";

const introduction = {
  it: {
    title: ["Ridurre le distanze.", "Semplificare gli spostamenti."],
    description: "CAURIS sviluppa soluzioni di collegamento in elicottero tra la Sicilia e le isole minori siciliane, pensate per rendere gli spostamenti più diretti, rapidi e flessibili.",
    audience: "Per viaggi privati, hospitality e richieste dedicate.",
  },
  en: {
    title: ["Bringing places closer.", "Making travel simpler."],
    description: "CAURIS develops helicopter connections between Sicily and its smaller islands to make travel faster, more direct and more flexible.",
    audience: "For private clients, hospitality and tailored requests.",
  },
} satisfies Record<Locale, { title: string[]; description: string; audience: string }>;

export function CorporateIntroduction({ locale }: { locale: Locale }) {
  const copy = introduction[locale];
  return (
    <section className="corporate-intro" aria-labelledby="corporate-title">
      <div className="corporate-intro-inner">
        <div className="corporate-intro-heading">
          <p className="corporate-intro-label">CAURIS AVIATION</p>
          <h2 id="corporate-title">{copy.title.map(line => <span key={line}>{line}{" "}</span>)}</h2>
        </div>
        <div className="corporate-intro-copy">
          <p>{copy.description}</p>
          <p className="corporate-intro-audience">{copy.audience}</p>
        </div>
        <div className="corporate-intro-photo">
          <Image src="/images/aviation/due-elicotteri-sorvolano.jpg" alt={locale === "it" ? "Due elicotteri in volo sopra il mare" : "Two helicopters flying over the sea"} fill sizes="(max-width: 767px) 86vw, 43vw" quality={85} />
        </div>
      </div>
    </section>
  );
}
