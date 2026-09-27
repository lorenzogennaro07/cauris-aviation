import Image from "next/image";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import about from "@/content/about";
import { Navigation } from "./navigation";

export function AboutPage({ locale }: { locale: Locale }) {
  const c = about[locale];
  const paragraphs = (lines: string[]) => lines.map(line => <p key={line}>{line}</p>);
  return <>
    <Navigation content={{ skip: getDictionary(locale).skip }} locale={locale} currentPage="about" />
    <main id="contenuto" className="about-page" tabIndex={-1}>
      <header className="about-opening">
        <div className="about-opening-photo"><Image src="/images/about/atterraggio.JPG" alt={c.alts[0]} fill sizes="100vw" quality={85} preload /></div>
        <div className="about-opening-text">
          <p className="about-label">About</p>
          <h1>{c.opening}</h1>
          <p className="about-introduction">{c.introduction}</p>
        </div>
      </header>
      <section className="about-distance about-shell" aria-labelledby="about-distance-title">
        <div className="about-distance-photo"><Image src="/images/about/elicottero mare interno.JPG" alt={c.alts[1]} fill sizes="(max-width: 767px) 86vw, 34vw" quality={85} /></div>
        <div className="about-prose">
          <h2 id="about-distance-title">{c.distanceTitle.map(line => <span key={line}>{line}{" "}</span>)}</h2>
          {paragraphs(c.distance)}
        </div>
      </section>
      <section className="about-sea about-shell" aria-labelledby="about-sea-title">
        <div className="about-prose"><h2 id="about-sea-title">{c.seaTitle}</h2>{paragraphs(c.sea)}</div>
        <p className="about-question">{c.question}</p>
      </section>
      <div className="about-wide-photo"><Image src="/images/about/eliche.JPG" alt={c.alts[2]} fill sizes="100vw" quality={85} /></div>
      <section className="about-idea about-shell" aria-labelledby="about-idea-title">
        <h2 id="about-idea-title">{c.ideaTitle}</h2>
        <div className="about-prose">{paragraphs(c.idea)}<div className="about-continuity">{paragraphs(c.continuity)}</div></div>
        <p className="about-thought">{c.thought[0]} <strong>{c.thought[1]}</strong></p>
      </section>
      <section className="about-islands" aria-labelledby="about-islands-title">
        <div className="about-shell about-islands-inner">
          <div className="about-prose">
            <h2 id="about-islands-title">{c.islandsTitle}</h2>
            <p className="about-island-names"><span>Lipari.</span>{" "}<span>Pantelleria.</span></p>
            {paragraphs(c.islands)}
          </div>
          <div className="about-islands-photo"><Image src="/images/about/cockpit vista mare.JPG" alt={c.alts[3]} fill sizes="(max-width: 767px) 86vw, 40vw" quality={85} /></div>
        </div>
      </section>
      <section className="about-closing about-shell" aria-labelledby="about-closing-title">
        <h2 id="about-closing-title">{c.closingTitle.map(line => <span key={line}>{line}{" "}</span>)}</h2>
        <p>{c.closing}</p>
        <p className="about-last">{c.last.join(" ")}</p>
      </section>
    </main>
  </>;
}
