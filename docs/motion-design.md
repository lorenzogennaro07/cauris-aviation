# Motion design · Milestone 01
GSAP 3.15.0 + ScrollTrigger, unica libreria di animazione aggiunta. Scroll nativo: nessun smooth-scroll hijack.
- Hero: ingresso una sola volta di testo e CTA (1.25 s, stagger 0.15 s), lieve scala fino a 1.045 e spostamento verticale legati allo scroll.
- Testi successivi: reveal di 1.1 s, 20 px mobile / 36 px desktop, una sola volta.
- Fotografie: drift contenuto e scala 1.065 → 1 durante la lettura.
- Mappa: contenitore sticky; avanzamento normalizzato allo scroll, strokeDashoffset del percorso, marker lungo getPointAtLength, comparsa graduata di costa/Eolie/destinazione.
- Arrivo: maschera da inset 9% 7% a 0 e scala 1.055 → 1; testo finale con reveal.
Nessun bounce, marquee, loop o movimento continuo decorativo. Su mobile ampiezze minori e impaginazione verticale della mappa.

## Movimento ridotto
prefers-reduced-motion è letto tramite matchMedia e useSyncExternalStore, anche quando cambia durante la sessione.
Il controllo “Riduci movimento” sulla mappa consente una scelta aggiuntiva per la pagina corrente. La preferenza di sistema ha priorità e non può essere forzata ad animare.
In modalità ridotta: cleanup GSAP, fotografie/testi statici, rotta interamente visibile, niente marker animato, niente sezione lunga/sticky, scroll immediato. Tutto il contenuto resta leggibile.
Ogni effect ripristina il contesto GSAP ed elimina gli ScrollTrigger alla dismissione; nessun listener scroll manuale o stato React aggiornato a ogni frame.
