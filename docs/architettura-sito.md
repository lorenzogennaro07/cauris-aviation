# Architettura sito · Milestone 01
## Esperienza implementata
1. Navigazione responsive.
2. Hero fotografica: Catania · Lipari e concetto creativo approvato.
3. Transizione tipografica, ancora #collegamento.
4. Partenza da Catania con Etna.
5. Traversata mediterranea, ancora #esperienza, mare e dettaglio aeronautico.
6. Mappa SVG originale: costa orientale, Etna discreto, Eolie, Catania e Lipari.
7. Reveal di Lipari e credito fotografico obbligatorio. Fine della milestone.

Non sono implementati Hospitality, società, contatti, footer definitivo, booking, prezzi, orari o altre rotte. Le voci future della navbar sono testo non interattivo con indicazione accessibile “Sezione in preparazione”; su tablet sono nascoste per mantenere una sola riga. Nessun finto Contattaci: la seconda CTA resta esclusa fino a una destinazione reale.

## Lingue e URL
/ italiano; /en inglese. Decisione tecnica minima per lo switch richiesto.
Due root layout tramite route groups garantiscono html lang corretto già nel documento server.
Dizionari indipendenti e contratto condiviso in src/content; composizione server condivisa in src/components/journey.tsx.
Il cambio lingua usa un collegamento reale e torna all'inizio della versione scelta. Nessuna traduzione automatica, cookie o servizio esterno.

## Navigazione e accessibilità
Menu mobile disclosure (non dialog): pulsante aria-expanded/aria-controls, chiusura Escape con ritorno focus al pulsante, chiusura al click sulle ancore. Skip link, un solo h1, h2 semantici, alt tradotti.
Le ancore funzionano anche senza JavaScript; il racconto server è leggibile senza animazioni.
Metadata title, description, Open Graph testuale e Twitter predisposti per entrambe le lingue. Noindex/nofollow mantenuto perché è una milestone privata. Dominio canonico, hreflang assoluti, immagine OG e indicizzazione definitiva attendono la pubblicazione autorizzata.
