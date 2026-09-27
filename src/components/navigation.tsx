"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { HomeLink } from "./home-link";
import type { SiteContent } from "@/content/types";
import type { Locale } from "@/i18n/config";

export function Navigation({ content: c, locale, currentPage = "home" }: { content: Pick<SiteContent, "skip">; locale: Locale; currentPage?: "home" | "services" | "about" | "contact" }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const header = useRef<HTMLElement>(null);
  const menuButton = useRef<HTMLButtonElement>(null);
  const it = locale === "it";
  const italianPath = currentPage === "about" ? "/about" : currentPage === "contact" ? "/contatti" : currentPage === "services" ? "/servizi" : "/";
  const englishPath = currentPage === "about" ? "/en/about" : currentPage === "contact" ? "/en/contact" : currentPage === "services" ? "/en/services" : "/en";
  useEffect(() => {
    if (!menuOpen) return;
    const closeOutside = (event: PointerEvent) => {
      if (event.target instanceof Node && !header.current?.contains(event.target)) setMenuOpen(false);
    };
    document.addEventListener("pointerdown", closeOutside);
    return () => document.removeEventListener("pointerdown", closeOutside);
  }, [menuOpen]);
  return <header ref={header} className={currentPage === "home" ? "site-header site-header-home" : "site-header"} onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) setMenuOpen(false); }} onKeyDown={event => { if (event.key === "Escape" && menuOpen) { setMenuOpen(false); menuButton.current?.focus(); } }}>
    <a className="skip-link" href="#contenuto">{c.skip}</a>
    <div className="nav-shell">
      <Link className="brand" href="/" aria-label="CAURIS AVIATION">
        <Image src="/brand/png-logo-nuovo-verde-e-blu.png" alt="CAURIS AVIATION" width={6250} height={4419} unoptimized preload />
      </Link>
      <nav className="languages" aria-label={it ? "Lingua" : "Language"}>
        <Link href={italianPath} lang="it" hrefLang="it" aria-current={it ? "page" : undefined}>IT</Link>
        <span aria-hidden="true">/</span>
        <Link href={englishPath} lang="en" hrefLang="en" aria-current={!it ? "page" : undefined}>EN</Link>
      </nav>
      <button ref={menuButton} className="menu-toggle" type="button" aria-label={menuOpen ? (it ? "Chiudi menu" : "Close menu") : (it ? "Apri menu" : "Open menu")} aria-expanded={menuOpen} aria-controls="primary-navigation" onClick={() => setMenuOpen(!menuOpen)}>
        <span className="menu-icon" aria-hidden="true"><span /><span /><span /></span>
      </button>
      <nav id="primary-navigation" data-open={menuOpen} className="primary-navigation" aria-label={it ? "Navigazione principale" : "Main navigation"}>
        <HomeLink className="nav-services" onActivate={() => setMenuOpen(false)} />
        <Link onClick={() => setMenuOpen(false)} className="nav-services" href={it ? "/servizi" : "/en/services"} hrefLang={locale} aria-current={currentPage === "services" ? "page" : undefined}>{it ? "Servizi" : "Services"}</Link>
        <Link className="nav-services" href={it ? "/about" : "/en/about"} aria-current={currentPage === "about" ? "page" : undefined} onClick={() => setMenuOpen(false)}>About</Link>
        <Link className="nav-services" href={it ? "/contatti" : "/en/contact"} aria-current={currentPage === "contact" ? "page" : undefined} onClick={() => setMenuOpen(false)}>{it ? "Contatti" : "Contact"}</Link>
      </nav>
    </div>
  </header>;
}
