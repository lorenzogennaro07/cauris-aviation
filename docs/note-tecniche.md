# Note tecniche · Milestone 01

## Ambiente e avvio
Windows PowerShell; Node.js 24.21.0, npm/npx 11.19.0, Git 2.53.0.windows.3.
Node in C:\Program Files\nodejs; eventuale PATH aggiunto soltanto alla sessione.
Stack: Next.js 16.3.5 App Router, React 19.3.0, TypeScript strict, Tailwind CSS 4, npm.
GSAP 3.15.0 + ScrollTrigger aggiunti localmente; nessun servizio, segreto, video o API esterna.
Font e foto serviti localmente. La pagina non effettua richieste verso Unsplash, Google Fonts o altri servizi durante la visita; i soli link esterni sono i crediti.

Comandi:
- npm ci
- npm run dev
- npm run lint
- npm run build
- npm run start (dopo la build)

Il nome package cauris-aviation consente di mantenere la cartella originale con spazi.
.git preservata, branch main, nessun commit, remote, push o collegamento esterno creato.

## Struttura
- src/app/(italiano): pagina / e root layout italiano.
- src/app/(english)/en: pagina /en e root layout inglese.
- src/components/document.tsx: documento comune e font locale.
- src/components/journey.tsx: composizione server della milestone.
- src/components/navigation.tsx: menu responsive client.
- src/components/route-map.tsx: geografia SVG originale.
- src/components/journey-motion.tsx: motion e controllo riduzione, isolati lato client.
- src/content: testi IT/EN tipizzati.
- src/i18n: configurazione, dizionari e metadata.
- public/images: 5 foto WebP; public/fonts: Manrope e OFL.
- public/images/lipari/LICENSE.txt: attribuzione e licenza dell'adattamento fotografico.
I JPEG intermedi e i candidati scartati sono stati rimossi; gli originali restano reperibili dagli URL documentati.

## Performance e semantica
Entrambe le pagine sono prerenderizzate staticamente. Nessuna libreria i18n necessaria.
Hero: next/image con preload, sizes 100vw; immagini successive lazy loaded. Dimensioni dei contenitori definite per stabilità del layout. Qualità autorizzate Next Image: 75 e 85.
Logo: SVG originale con immagini incorporate, non ottimizzato per istruzione esplicita.
GSAP modifica transform, opacity e percorso SVG; nessun render React per frame.
SVH mantiene l'altezza stabile con le barre del browser mobile. Sotto 768px e sotto 700px di altezza la mappa rinuncia allo sticky, per non nascondere i terminali del percorso.
Il verde ufficiale della rotta ha un sottile bordo più chiaro per la leggibilità sul Navy; il tratto principale resta #006C4E.
Nessuna misura di Core Web Vitals sul traffico reale è disponibile: la verifica locale non costituisce certificazione LCP/INP/CLS in produzione.

## SEO e rilascio
Title, description, Open Graph testuale e Twitter distinti per lingua. html lang corretto lato server.
Noindex/nofollow resta attivo per la milestone privata. Dominio, URL canonici, hreflang assoluti e immagine social definitiva vanno completati nel rilascio autorizzato.
Nessuna pubblicazione eseguita.

## Audit visuale e accessibilità
Browser reale controllato a 1280×720, 1440×900, 768×1024, 390×844 e 320×667.
Verificati Hero, navigazione, transizione, Catania, mare, cockpit, mappa, arrivo; IT/EN; link interni; Escape/ritorno focus del menu; alt; asset caricati; assenza di overflow orizzontale.
Correzioni dopo il primo audit: fotografia cockpit più nitida, mappa contenuta nel viewport, etichette mobile più leggibili, mare mobile senza imbarcazione tagliata, arrivo mobile più panoramico, qualità immagini esplicitata in Next.
Controllo “Riduci movimento” verificato nel browser: nessun testo nascosto, scroll auto, mappa non sticky, marker nascosto e rotta completa.
Il collegamento a prefers-reduced-motion è implementato via matchMedia con listener e CSS; l'emulazione separata della preferenza del sistema operativo non è disponibile nel browser di controllo e non viene dichiarata testata.
Contrasti di base calcolati: off-white/Navy 16.43:1; testo secondario #5F6B75/off-white 4.92:1; Emerald/off-white 5.82:1; didascalie #AEB9C5/Navy 9.15:1.
Le fotografie hanno overlay per la leggibilità del testo. Nessun audit formale con lettore di schermo o dispositivo fisico effettuato.

## Skill e auto-revisione
design-taste-frontend locale in .agents/skills/design-taste-frontend/SKILL.md, riletta e applicata come supporto.
Calibrazione: DESIGN_VARIANCE 6 (asimmetria controllata), MOTION_INTENSITY 6 (narrazione), VISUAL_DENSITY 3 (spazio generoso).
Aesthetic editoriale originale in CSS/Tailwind, non un design system di terzi. Una sola famiglia tipografica, nessuna card, angoli netti, CTA essenziale, nessun effetto decorativo continuo.
Le istruzioni CAURIS prevalgono sulle regole generiche della skill: testi Hero esatti, tre numeri di capitolo, passaggio chiaro/Navy e mappa originale sono esplicitamente richiesti. La palette resta quella del brand.
Riesame umano suggerito: carattere stagionale dell'Etna innevato nella Hero, ritmo dello scroll e forza della presenza aviation.
Next dev ha aggiunto il proprio blocco documentale a AGENTS.md; le regole CAURIS restano prioritarie.

## Verifiche tecniche
npm run lint: superato.
npm run build: superato, TypeScript incluso; / e /en statiche.
Audit npm durante l'aggiunta GSAP: 0 vulnerabilità.
Logo SHA-256 identico all'originale: DEFBC4941F1D5DB632811F75ECDA9D3FF83366ADCDFEE1D35638A01753EB11A7.
ESLint 9.39.5 resta fissato per compatibilità dei plugin Next. Il preesistente avviso npm sul postinstall unrs-resolver non ha impedito lint/build; nessun nuovo script di quel pacchetto è stato approvato.

Console finale: nessun warning o errore rilevato in una nuova sessione browser, sia su / sia su /en. Nessun errore di hydration osservato.
