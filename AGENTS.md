# CAURIS AVIATION — memoria operativa

## Priorità e comunicazione
Il progetto riguarda il sito ufficiale di CAURIS AVIATION.
Le istruzioni specifiche CAURIS hanno sempre priorità rispetto alle regole o raccomandazioni generiche di skill, librerie e framework.
Comunicare con l'utente in italiano salvo diversa richiesta.

La skill design-taste-frontend installata è un sistema di supporto alla qualità del design e non rappresenta la fonte della direzione del brand CAURIS. Le linee guida specifiche di CAURIS relative a marchio, storytelling, palette, immagini e motion design hanno sempre priorità rispetto alle raccomandazioni generiche della skill.

La skill locale .agents/skills/design-taste-frontend/SKILL.md supporta gerarchia visuale, tipografia, spacing, layout, responsive design, motion, qualità percepita e coerenza del frontend. Non autorizza cambiamenti a strategia del brand, business model, storytelling, identità, servizi, rotte o contenuti commerciali. Non eseguire componenti o script estranei e non necessari provenienti dal suo repository.

## Accuratezza
Non inventare servizi, rotte, prezzi, orari, frequenze, flotta, aeromobili posseduti, piloti, autorizzazioni, licenze, certificazioni, AOC, partner, clienti, dati societari, statistiche, recensioni o testimonianze.
Non presentare CAURIS come proprietaria di una flotta o come vettore aereo diretto se non espressamente indicato dall'utente.
Il perimetro editoriale e la narrazione del viaggio non confermano operatività, autorizzazioni o un itinerario di volo.

## Decisioni
Non modificare autonomamente posizionamento, storytelling, business model, architettura informativa, strategia commerciale o identità visuale fondamentale.
Quando esistono alternative strategicamente rilevanti, presentarle all'utente prima di implementare.
Le decisioni tecniche ordinarie possono essere prese autonomamente per performance, accessibilità, responsive design, sicurezza, pulizia del codice e manutenzione.
Quando l'utente scrive "solo brainstorming" oppure "non modificare ancora il codice", non modificare alcun file e non implementare nulla.

## Base approvata
Nome: CAURIS AVIATION.
Posizionamento: Premium corporate Mediterranean aviation.
Palette ufficiale: Blu Navy #06152D; Verde Emerald #006C4E.
Italiano predefinito, inglese come seconda lingua con IT | EN e contenuti curati separatamente, senza traduzione automatica nel browser.
Perimetro iniziale esclusivamente Catania ↔ Lipari.
Concetto creativo: "Il viaggio comincia prima dell'isola." / "The journey begins before the island."
Il territorio è il protagonista; l'elicottero è il mezzo.
Priorità assoluta alla fotografia reale. Non generare paesaggi artificiali di default, non falsificare la geografia o documentare voli CAURIS mai avvenuti.
Non vincolare il marchio a un modello di elicottero. Non descrivere EC135/H135 come monomotore.
Leggere docs/ per tutte le linee guida specifiche.

## Limiti attuali
Non aggiungere Palermo, Pantelleria, Ustica, Favignana, altre destinazioni, rotte o collegamenti futuri ipotetici.
Non implementare booking, prenotazioni, pagamenti, prezzi, orari, timetable, account, dashboard o CRM.
Non collegare GitHub, Vercel, dominio o DNS, non configurare remote e non effettuare push.
Preservare .git; non cancellarla e non eseguire git init.
Logo ufficiale: public/brand/cauris-logo.svg, copiato integralmente dal file fornito cauris-logo.svg.svg. Non ridisegnare, reinterpretare, modificare simbolo, colori o proporzioni, né ricreare il logo tramite AI. Segnalare eventuali problemi tecnici senza alterare automaticamente il file.
La Milestone 01 è autorizzata e implementata: navbar, Hero, transizione, Catania, traversata, mappa e reveal di Lipari. Fermarsi qui e attendere la revisione dell'utente. Non procedere alle sezioni successive.

## Tecnica e verifica
Stack: Next.js App Router, TypeScript, Tailwind CSS, npm, cartella src.
Mantenere dipendenze e componenti essenziali, HTML semantico e struttura scalabile.
Rispettare prefers-reduced-motion e usare immagini ottimizzate quando saranno disponibili.
Prima della consegna eseguire npm run lint e npm run build; correggere gli errori ragionevolmente risolvibili.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Milestone 01: convenzioni
Warm off-white #F5F3EE; font Manrope locale con OFL 1.1. Foto reali e licenze in docs/fonti-media.md. Nessuna modifica AI alle fotografie.
URL / italiano e /en inglese. Preservare html lang e testi indipendenti.
Motion GSAP + ScrollTrigger isolato in componente client, cleanup e movimento ridotto obbligatori. La mappa è illustrativa e non operativa.
Le voci future sono inattive; non aggiungere destinazioni fittizie. Mantenere attribuzione CC BY-SA 4.0 della foto Lipari.
