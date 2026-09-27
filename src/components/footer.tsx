import Link from "next/link";
import Image from "next/image";
import { HomeLink } from "./home-link";
import type { Locale } from "@/i18n/config";

export function Footer({ locale }: { locale: Locale }) {
  const it = locale === "it";
  return (
    <footer className="site-footer">
      <div className="footer-brand"><Image src="/brand/logo-png-bianco-sfondo-blu.png" alt="CAURIS AVIATION" width={6250} height={4419} unoptimized /></div>
      <p className="footer-descriptor">{it ? "Collegamenti in elicottero tra la Sicilia e le isole minori siciliane." : "Helicopter connections between Sicily and its smaller islands."}</p>
      <div className="footer-contact">
        <p>{it ? "Per informazioni e richieste" : "For information and enquiries"}</p>
        <a className="footer-email" href="mailto:info@caurisaviation.com">info@caurisaviation.com</a>
      </div>
      <nav className="footer-navigation" aria-label={it ? "Navigazione footer" : "Footer navigation"}>
        <HomeLink />
        <Link href={it ? "/servizi" : "/en/services"} hrefLang={locale}>{it ? "Servizi" : "Services"}</Link>
        <Link href={it ? "/about" : "/en/about"}>About</Link>
        <Link href={it ? "/contatti" : "/en/contact"}>{it ? "Contatti" : "Contact"}</Link>
      </nav>
    </footer>
  );
}
