# Audit responsive e motion — 22 settembre 2026

## Stato osservato
- Route attive: `/`, `/en`, `/servizi`.
- La Hero attiva usa una fotografia WebP scontornata e GSAP/ScrollTrigger. I vecchi componenti Three.js sono conservati ma non importati da alcuna pagina attiva; nessun canvas nel DOM delle tre route.
- La navigazione locale contiene Servizi e IT/EN: non esiste un menu hamburger da correggere. Confrontato anche https://cauris-aviation.vercel.app/: nessun hamburger nella versione pubblicata corrente. Nessuna configurazione di deployment modificata.
- Logo master SVG 1123 × 794, viewBox 842.25 × 595.499986: testo a tracciati e quattro immagini PNG incorporate a 1920 × 1920. Non è interamente vettoriale. L'immagine era alta circa 109 px nel contenitore mobile alto 74 px; molti pixel erano margini trasparenti. Nessuna rasterizzazione Next Image (`unoptimized`). Il master pubblicato su Vercel è identico byte per byte (SHA-256 EDDEC656F9DF889E99DA271016A3509C88D575744EBA1C25C7AC973C165602A6). Nessuna sgranatura evidente riprodotta nel browser desktop emulato; resta da verificare su Safari/iPhone reale.

## Interventi
- Frame del logo proporzionato all'area disegnata, con piccolo margine di sicurezza; sorgente SVG intatto. Nessun filtro, trasformazione animata, conversione o upscaling raster del logo.
- Header con logo non comprimibile e tap target lingua da 44 px. Nessun menu inventato.
- Scena Hero separata dal copy: sotto 900 px fotografia/wordmark/elicottero hanno un'area autonoma; il copy è nel flusso e può crescere senza sovrapporre il mezzo.
- Timeline unica con cinque pose: presenza, partenza, presentazione, passaggio, assestamento. Nessun tween d'ingresso concorrente, ciclo continuo o rotazione completa. La fotografia resta una superficie pseudo-3D; non vengono inventate altre viste dell'aeromobile.
- Desktop: prospettiva Y da -12° a +12°, inclinazione massima 3.2°, scala massima 1.055; piccolo rialzo della posizione base per preservare la distanza dal copy.
- Mobile/tablet compatto: prospettiva Y da -5° a +7°, inclinazione massima 1.6°, scala massima 1.015, escursione orizzontale limitata. Scrub 0.35 s contro 0.65 desktop; durata geometrica calcolata dal tratto sticky effettivo.
- Assestamento prima della fine dello sticky, poi uscita con lo scroll normale senza fade o rimozioni improvvise.
- prefers-reduced-motion: nessuna timeline, stage statico, eliminato tratto aggiuntivo di scroll. Cleanup tramite matchMedia.revert al cambio breakpoint/preferenza o smontaggio.
- Scroll CSS nativo senza smooth globale concorrente. Nessun overflow-x:hidden globale introdotto.
- Elicottero servito a qualità 85 con sizes mobile aggiornato. Nessuna nuova dipendenza o asset.

## Verifiche e limiti
- Matrice browser sulle tre route: 320×740, 360×800, 375×812, 390×844, 393×852, 414×896, 430×932, 768×1024, 820×1180, 1024×768, 1180×820, 1280×800, 1440×900, 1600×1000, 1920×1080.
- Nessun overflow orizzontale o collisione fra logo e navigazione nella matrice. Il browser ha arrotondato una delle richieste 393 px a 394 CSS px; questa discrepanza è registrata, non equivale a un test su iPhone fisico.
- Controlli geometrici e visuali della Hero durante lo scroll; controllo pagine e footer.
- Il browser locale disponibile usa DPR circa 1. Test fisico Safari/iPhone Retina, toolbar dinamica, zoom testo e prestazioni su device reale restano necessari; non viene dichiarata una certificazione Retina o FPS.
- prefers-reduced-motion verificato nel codice, non emulato nel browser disponibile.
- Credito CC BY-SA della foto Hero conservato come esplicitamente confermato dall'utente.
- Nessun commit, push o deploy.

## Esito finale
- npm run lint e npm run build superati; tutte e tre le route prerenderizzate.
- SVG originali invariati, hash confrontati.
- Matrice di 45 combinazioni route/viewport: nessun overflow o collisione header. Aggiunto un margine verticale di sicurezza di 24 px nella sola Home EN desktop: a 1600 × 1000 la distanza misurata dalla headline è 24.17 px.
- Sticky mobile verificato a scroll 274 px: stage top 0; oltre la fine della timeline a circa 549 px, stage scorre naturalmente senza sparire.
- Nessun errore o warning console rilevato.
