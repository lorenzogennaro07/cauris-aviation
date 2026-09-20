import Image from "next/image";
import type {Locale} from "@/i18n/config";
import {getDictionary} from "@/i18n/dictionaries";
import {Navigation} from "./navigation";
import {RouteMap} from "./route-map";
import {JourneyMotion} from "./journey-motion";
import {Helicopter} from "./helicopter";
export function Journey({locale}:{locale:Locale}){
 const c=getDictionary(locale);
 return <><Navigation content={c} locale={locale}/><main id="contenuto" tabIndex={-1}>
 <section className="flight-sequence" aria-labelledby="hero-title"><div className="flight-stage">
 <div className="marine-environment"><Image src="/images/mediterraneo/open-water.webp" alt="" fill sizes="100vw" preload quality={85} className="marine-photo"/></div>
 <div className="hero-copy container"><p className="eyebrow">CATANIA · LIPARI</p><h1 id="hero-title">{c.hero.title[0]}<br/>{c.hero.title[1]}</h1><p className="aviation-label">{c.hero.aviation}</p>
 <div className="hero-bottom"><p className="hero-support">{c.hero.supporting}</p><div className="hero-actions"><a className="button-link" href="#collegamento">{c.hero.cta}<span aria-hidden="true">↗</span></a><span className="contact-pending" aria-disabled="true" title={c.nav.upcoming}>{c.hero.contact}<span className="sr-only"> — {c.nav.upcoming}</span></span></div></div></div>
 <section className="departure" aria-labelledby="departure-title"><div className="departure-copy container"><div><p className="eyebrow">{c.departure.label}</p><h2 id="departure-title">{c.departure.title}</h2></div><p>{c.departure.copy}</p></div><div className="departure-image"><Image src="/images/catania/etna-sunset.webp" alt={c.departure.alt} fill sizes="100vw" quality={85} className="photo" data-drift/><span className="location-caption">{c.departure.location}</span></div></section>
 <Helicopter label={c.hero.modelAlt}/>
 <div className="flight-caption container" aria-hidden="true"><span>CATANIA</span><span className="flight-rule"/><span>LIPARI</span><span className="flight-caption-detail">{c.hero.caption}</span></div>
 <div className="crossing-message container"><p>{c.transition.lead}</p><h2>{c.transition.title[0]}<br/><span>{c.transition.title[1]}</span></h2></div>
 </div></section>
 <section id="esperienza" className="experience" aria-labelledby="experience-title"><div className="experience-copy"><p className="eyebrow">{c.crossing.label}</p><h2 id="experience-title">{c.crossing.title}</h2><p>{c.crossing.copy}</p></div><div className="cockpit-image"><Image className="photo" src="/images/elicotteri/cockpit-modern.webp" alt={c.crossing.cockpitAlt} fill sizes="(max-width:767px) 100vw,55vw" quality={85}/></div></section>
 <section id="collegamento" className="destination-sequence" aria-labelledby="route-title"><div className="destination-stage"><div className="map-composition container"><div className="map-copy"><p className="eyebrow">CATANIA → LIPARI</p><h2 id="route-title">{c.map.title}</h2></div><RouteMap content={c}/></div><div className="arrival-photo"><Image className="photo" src="/images/lipari/lipari-east.webp" alt={c.arrival.alt} fill sizes="100vw" quality={85}/><div className="arrival-shade"/><div className="arrival-copy container"><p>Lipari</p><h2>{c.arrival.title[0]}<br/>{c.arrival.title[1]}</h2></div></div></div></section>
 <footer className="media-credits container"><span>CAURIS AVIATION</span><details><summary>{c.credits.title}</summary><p>Lipari / Mediterraneo: <a href="https://commons.wikimedia.org/wiki/File:Aerial_image_of_Lipari_(view_from_the_east).jpg">Carsten Steger</a> · <a href="https://creativecommons.org/licenses/by-sa/4.0/">CC BY-SA 4.0</a> · {c.arrival.edits}</p><p>3D: Heiko Schulz / FlightGear · <a href="https://github.com/Flightradar24/fr24-3d-models">Flightradar24</a> · <a href="/models/LICENSE-GPL-2.0.txt">GPL v2</a> · <a href="/models/source/ec135.zip">{c.credits.source}</a> · <a href="/models/source/convert-helicopter.mjs">{c.credits.adaptation}</a>. {c.credits.note}</p></details></footer>
 </main><JourneyMotion/></>;
}
