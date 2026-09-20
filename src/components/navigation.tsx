"use client";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import type { SiteContent } from "@/content/types";
import type { Locale } from "@/i18n/config";
export function Navigation({ content: c, locale }: { content: SiteContent; locale: Locale }) {
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  return <header className="site-header" onKeyDown={e => { if (e.key === "Escape") { setOpen(false); toggle.current?.focus(); } }}>
    <a className="skip-link" href="#contenuto">{c.skip}</a>
    <div className="nav-shell">
      <a className="brand" href="#contenuto" aria-label="CAURIS AVIATION">
        <Image src="/brand/cauris-logo.svg" alt="CAURIS AVIATION" width={100} height={100} unoptimized priority />
      </a>
      <button ref={toggle} className="menu-toggle" aria-expanded={open} aria-controls="main-navigation" onClick={() => setOpen(!open)}>{open ? c.nav.close : c.nav.menu}<span className={open ? "menu-mark open" : "menu-mark"} aria-hidden="true" /></button>
      <nav id="main-navigation" aria-label={c.nav.label} className={open ? "nav-links is-open" : "nav-links"}>
        <a href="#collegamento" onClick={() => setOpen(false)}>{c.nav.connection}</a>
        <a href="#esperienza" onClick={() => setOpen(false)}>{c.nav.experience}</a>
        {[c.nav.hospitality, c.nav.company, c.nav.contact].map(label => <span key={label} className="nav-future" aria-disabled="true" title={c.nav.upcoming}>{label}<span className="sr-only"> ({c.nav.upcoming})</span></span>)}
        <div className="languages" aria-label={locale === "it" ? "Lingua" : "Language"}>
          <Link href="/" lang="it" hrefLang="it" aria-current={locale === "it" ? "page" : undefined}>IT</Link><span aria-hidden="true">|</span><Link href="/en" lang="en" hrefLang="en" aria-current={locale === "en" ? "page" : undefined}>EN</Link>
        </div>
      </nav>
    </div>
  </header>;
}
