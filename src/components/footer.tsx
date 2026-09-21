import Link from "next/link";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-brand" role="img" aria-label="CAURIS AVIATION" />
      <p className="footer-descriptor" lang="it">Collegamenti in elicottero tra la Sicilia e le isole minori siciliane.</p>
      <div className="footer-contact">
        <p lang="it">Per informazioni e richieste:</p>
        <a className="footer-email" href="mailto:info@caurisaviation.com">info@caurisaviation.com</a>
      </div>
      <nav className="footer-navigation" aria-label="Navigazione footer" lang="it">
        <Link href="/servizi">Servizi</Link>
        <span aria-disabled="true">Collegamenti</span>
        <span aria-disabled="true">CAURIS</span>
        <span aria-disabled="true">Contatti</span>
      </nav>
    </footer>
  );
}
