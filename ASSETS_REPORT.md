# ASSETS_REPORT — Quickufficio rebuild

> Stato asset legacy scaricati in Fase 1. Riferimento brief §8.4 (mapping completo) e §8.7 (lista shooting professionale).
>
> **Status legenda:**
> - 🟢 USE_AS_IS — qualità accettabile, riusare direttamente
> - 🟡 PLACEHOLDER — segnaposto, sostituire post-launch
> - 🔴 REPLACE_URGENT — qualità inaccettabile, sostituire **prima del lancio**

Aggiornato: 2026-06-17 (Fase 1).

---

## Sintesi numerica

- **65 asset target** dal brief §8.1 (download via curl)
- **64 scaricati con successo** dopo correzione host CDN
- **1 fallito** (404) — `hotel/74831/hotel.png` (era duplicato di `113457/hotel.png` già scaricato come `homepage/focus-hotel.png`)
- **+15 asset extra scoperti** crawlando il sito live (gallery hotel, software previews homepage, shapes SVG, etc.)
- **21 screenshot Playwright** (7 pagine × desktop fold + desktop fullpage + mobile fullpage), ~57 MB

## Correzioni rispetto al brief

| Voce brief | Realtà | Azione |
|---|---|---|
| CDN host `d1n7pvm7k6elmp.cloudfront.net` per `library_element_image` | Host effettivo è `d1hjjl5l7cel88.cloudfront.net` (l'altro funziona solo per `academy/logo` e `academy/favicon`) | Script aggiornato |
| `hotel/74831/hotel.png` URL nel brief implicito | 403 sul CDN | Lasciato fuori; in §8.4 era listato 5 immagini hotel, ne abbiamo 4 + hero |
| Mancano dal brief: `1873/bic-gradient-due.jpg`, `71532/home.png`, software-front previews, gallery hotel completa, shapes SVG | Tutti presenti nel sito live | Aggiunti al download script in sezione "Asset extra" |

---

## Asset scaricati per categoria

### Logo · `public/images/legacy/logos/`
| File | Status | Note |
|---|---|---|
| `quickufficio-logo-original.png` | 🔴 | Solo backup. Logo definitivo da BD Media in `public/images/brand/logo.svg` (vedi §8.8). Finché non arriva: placeholder testuale `<span class="font-display">Quickufficio</span>`. |
| `automazionehotel-logo.png` | 🟢 | Brand collegato, riusabile in Footer + Hotel.astro. |

### Team · `public/images/legacy/team/`
| File | Status | Note |
|---|---|---|
| `sergio-original.jpg` | 🔴 | Cellulare 2021, sotto-esposto. RIFOTOGRAFARE editorial pre-launch (3 pose §8.7 priorità 1). |
| `emanuela-original.png` | 🔴 | Idem. |
| `sergio-home.jpg` | 🔴 | Stesso scatto duplicato sul CDN. |
| `emanuela-home.png` | 🔴 | Idem duplicato. |

### Homepage sections · `public/images/legacy/homepage/`
| File | Status | Note |
|---|---|---|
| `focus-hotel.png` | 🟡 | Sezione "Il focus" — placeholder. |
| `assistenza.png` | 🟡 | Sezione "Assistenza/Punti di forza" — placeholder. |
| `blog-banner.png` | 🟡 | Sezione "Tieniti informato" — placeholder. |
| `software-hotel-front.jpg` | 🟡 | Preview gestionale hotel — uso in BentoFeatures. |
| `software-ristorante-front.png` | 🟡 | Preview gestionale ristorante — uso in BentoFeatures. |

### Chi siamo · `public/images/legacy/chi-siamo/`
| File | Status | Note |
|---|---|---|
| `hardware-cta.png` | 🟡 | Riusabile in sez. CTA. |

### Ristoranti · `public/images/legacy/ristoranti/`
| File | Status | Note |
|---|---|---|
| `hero.png` | 🟡 | Hero ristoranti — idealmente rifoto case study Paola. |
| `myselforder-form.png` | 🟡 | Screenshot webapp — riusabile in My Self Order page. |
| `tutorial.png` | 🟡 | Gallery. |
| `foto-secondaria.png` | 🟡 | Duplicato di `foto_6` ma con ID diverso (113462 vs 73907). |
| `emanuela-ristoranti.png` | 🔴 | Duplicato di Emanuela. Non riusare. |
| `pudu.png` | 🟢 | Robot consegna Pudu — riusabile in delivery section. |
| `foto2.png` | 🟡 | Ristorante generico. |
| `menu-ristorante.png` | 🟡 | Menu mockup. |
| `asporto.png` | 🟡 | Sezione asporto. |
| `applicazione.png` | 🟡 | Screenshot app. |

### Hotel · `public/images/legacy/hotel/`
| File | Status | Note |
|---|---|---|
| `hero.png` | 🟡 | Hero hotel. |
| `automation-cloud.png` | 🟡 | Sezione moduli. |
| `gallery-2.png`, `gallery-3.png`, `gallery-4.png`, `gallery-5.png` | 🟡 | Gallery hotel — 4 di 5 (1 mancante 404). |

### Hardware (20 prodotti) · `public/images/legacy/hardware/`
Tutti i prodotti scaricati con successo. **Status 🟢** per tutti tranne:
| File | Status | Note |
|---|---|---|
| `serratura-smart.jpg` | 🔴 | Screenshot WhatsApp (file `WhatsApp_Image_2021-10-22.jpeg`). RIFOTOGRAFARE prima del lancio. |
| `myprinter-p90-wifi.jpg` | 🟡 | Copia dell'altra P90, scattare foto distinta. |
| `mypos-kt1500.jpg`, `mypos-kt2000.jpg`, `mypos-kt3000.jpg`, `mypos-d1a.jpg`, `mypos-kt21a.jpg` | 🟢 | POS Lasersoft — qualità ok. |
| `eden-max20.jpg`, `eden-max30.jpg`, `eden-maxi21.jpg`, `eden-maxi50p.jpg` | 🟢 | Stampanti Eden — qualità ok. |
| `tablet-eden-10.jpg`, `myprinter-p90.jpg`, `kitchen-monitor.jpg`, `monitor-43-clearq.jpg` | 🟢 | |
| `pager-trasmettitore.jpg`, `mykiosk-27.jpg`, `lettore-presenze.jpg`, `tastierino-smart.jpg` | 🟢 | |
| `asus-expertcenter.jpg` | 🟢 | Fix link errato del sito legacy applicato. |

### My Self Order · `public/images/legacy/my-self-order/`
| File | Status | Note |
|---|---|---|
| `all-in-one.png` | 🟡 | Mockup webapp — usabile come placeholder hero. |
| `menu-presentation.png` | 🟡 | "Come presenti" — gallery. |

### Testimonial · `public/images/legacy/testimonials/`
| File | Status | Note |
|---|---|---|
| `paola-avatar.png` | 🟢 | Foto vera Paola, ottima qualità. **Unico testimonial confermato reale.** |
| `paola-extended.jpg` | 🟢 | Foto estesa Paola — usare per CaseStudyCard Osteria del Conte. La foto migliore del sito attuale. |
| `francesco-avatar.png` | 🔴 | "Francesco S." NON esiste come persona reale (template fake). **ELIMINARE dal sito.** Decisione confermata in brief §0 e §6. |
| `stock-francesco.jpg`, `stock-giusy.jpg` | 🔴 | Stock photo Business in Cloud. **Non usare in nessun caso.** Brief §6: "Nessun uso di stock photo BIC". |

### Icone legacy · `public/images/legacy/icons/`
| File | Status | Note |
|---|---|---|
| `legacy-assistenza.svg` (github.svg) | 🔴 | Semanticamente sbagliato. SOSTITUIRE con `Shield` o `Headphones` Lucide. |
| `legacy-formazione.svg` (layers.svg) | 🔴 | SOSTITUIRE con `GraduationCap` Lucide. |
| `legacy-resilienza.svg` (life-buoy.svg) | 🔴 | SOSTITUIRE con `RefreshCw` o `LifeBuoy` Lucide. |

### Asset globali · `public/images/legacy/global/`
| File | Status | Note |
|---|---|---|
| `bic-gradient-due.jpg` | 🟡 | Background gradient BIC — non riutilizzabile, abbiamo design system. |
| `home.png` | 🟡 | Riusato in più pagine come hero alternativo. |
| `shape-1.svg`, `shape-8.svg`, `shape-9.svg` | 🟢 | SVG decorativi astratti — possibile riuso come background illustration. |
| `favicon-192-legacy.jpg` | 🟡 | Reference favicon precedente. Non riusabile (nuovo favicon §8.8). |

### Screenshot Playwright · `public/images/legacy/screenshots/`
21 file × 7 pagine: `{page}-fold.png`, `{page}-fullpage.png`, `{page}-mobile.png`.

Servono come **visual reference** durante il rebuild Fase 2 — non vanno usati nel sito finale.

- `homepage-*` (3 file)
- `chi-siamo-*` (3 file)
- `ristoranti-*` (3 file)
- `hotel-*` (3 file)
- `hardware-*` (3 file)
- `my-self-order-*` (3 file)
- `cosa-facciamo-*` (3 file)

Dimensione totale: ~57 MB. Aggiungere a `.gitignore` se diventa scomodo nel repo.

---

## Asset NON disponibili → da produrre ex-novo

| Asset | Provider | Note brief |
|---|---|---|
| Logo SVG definitivo | BD Media | Posizione attesa `public/images/brand/logo.svg`. Finché non arriva → placeholder testuale (§8.8). |
| OG image per pagina | Generare con script (`scripts/generate-og-images.ts`) | 12 OG images statiche, una per pagina principale. Da fare in Fase 2. |
| Foto Sergio editorial × 3 | Sergio + fotografo (§8.7 prio 1) | Corporate / azione cliente / casual. |
| Foto Emanuela editorial × 3 | Idem | Idem. |
| Foto serratura smart | Sergio (§8.7 prio 1) | Sostituire screenshot WhatsApp. |
| Foto distinta MYPRINTER P90 vs P90-WIFI | Sergio (§8.7 prio 1) | Differenziarle. |
| 1-2 foto editorial Sergio in trasferta cliente | Sergio (§8.7 prio 1) | Per case study Paola. |
| 3-4 foto clienti reali nei loro locali | Sergio + liberatorie | Per testimonial reali da raccogliere. |
| Foto interno sede Susa | Sergio (§8.7 prio 2) | |
| Foto Sergio in call demo | Sergio (§8.7 prio 2) | Per `/prenota-demo`. |

## Testimonial reali — stato verifica

| Nome | Status | Azione |
|---|---|---|
| **Paola** (Osteria del Conte) | 🟢 Confermato reale | Mantenere copy + foto attuale (ottima qualità). Pillar testimonial homepage + Ristoranti. |
| **Francesco S.** | 🔴 NON esiste | **Eliminare** da tutte le sezioni (decisione confermata in brief §0). |
| **Giusy** | ⚠️ Da verificare | Chiedere a Sergio: se reale → mantenere copy + chiedere foto vera. Se fake → eliminare. **Al day-1 mostrare solo Paola** finché non confermato. |
| Nuovi 2-3 testimonial | ⏳ Da raccogliere | Sergio deve indicare 2-3 clienti soddisfatti + ottenere consenso foto + 1-2 frasi citazione prima del go-live. |

---

## Pipeline post-Fase 1 (Fase 2 entry)

1. **Ottimizzazione immagini** — convertire in AVIF/WebP + resize multi-breakpoint via Astro Image (`@astrojs/image` integrato). Brief §8.5.
2. **Posizionamento file finale** — spostare/copiare da `public/images/legacy/{categoria}/` a `public/images/{categoria}/` con nomi puliti come da tabella mapping §8.4. La cartella `legacy/` resta come backup.
3. **Alt text descrittivi** — generare alt SEO-oriented (brief §8.5 punto 3).
4. **Generare OG images** statiche con script Sharp custom.
5. **Componenti** — costruire `Logo.astro`, `IconOrb.astro`, `ClayCard.astro`, etc. consumando questi asset.
6. **Marcare nel codice** ogni asset 🔴 con `<!-- TODO: REPLACE — vedi ASSETS_REPORT.md -->` (brief Note finali).

---

## File di log scaricamento

- `public/images/legacy/.download-log.txt` — 65 record OK
- `public/images/legacy/.download-errors.txt` — 1 record 404 (`hotel/74831/hotel.png`)
