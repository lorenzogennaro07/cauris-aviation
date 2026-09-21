import Image from "next/image";
import Link from "next/link";
import type { SiteContent } from "@/content/types";
import type { Locale } from "@/i18n/config";

export function Navigation({ content: c, locale, currentPage = "home" }: { content: SiteContent; locale: Locale; currentPage?: "home" | "services" }) {
  return <header className="site-header">
    <a className="skip-link" href="#contenuto">{c.skip}</a>
    <div className="nav-shell">
      <a className="brand" href={locale === "it" ? "/" : "/en"} aria-label="CAURIS AVIATION">
        <Image src="/brand/cauris-logo.svg.svg" alt="CAURIS AVIATION" width={1123} height={794} unoptimized preload />
      </a>
      <div className="nav-actions">
        <nav aria-label={locale === "it" ? "Navigazione principale" : "Main navigation"}>
          <Link className="nav-services" href="/servizi" lang="it" aria-current={currentPage === "services" ? "page" : undefined}>Servizi</Link>
        </nav>
        <nav className="languages" aria-label={locale === "it" ? "Lingua" : "Language"}>
          <Link href={currentPage === "services" ? "/servizi" : "/"} lang="it" hrefLang="it" aria-current={locale === "it" ? "page" : undefined}>IT</Link>
          <span aria-hidden="true">|</span>
          <Link href="/en" lang="en" hrefLang="en" aria-label={currentPage === "services" ? "English homepage" : undefined} aria-current={locale === "en" ? "page" : undefined}>EN</Link>
        </nav>
      </div>
    </div>
  </header>;
}
