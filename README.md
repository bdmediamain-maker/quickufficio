# Quickufficio — rebuild

Rebuild del sito quickufficio.com (B2B Ho.Re.Ca) in Astro 6 + Tailwind 4 con design system **Hospitality Clay**.

- **Cliente:** Quickufficio.com Srls (Susa, TO) — Sergio
- **Agenzia:** BD Media
- **Brief:** `C:\Users\ervin\Downloads\quickufficio_claude_code_brief.md`
- **Dev port:** **3014**

## Stato — Fase 1 + Fase 2 ✓

Production-ready build. **12 pagine** + **20 schede prodotto** + **5 articoli blog pillar** + **3 endpoint API** (Resend + TeamLeader).

### Pagine implementate

| Path | Componenti chiave |
|---|---|
| `/` | Hero, StatOrbs, BentoFeatures 5 card, StorySection Sergio, SectorList 7, ThreePillars, TestimonialCarousel (Paola), BookingEmbed, Blog preview, ContactForm |
| `/ristoranti` | Hero, StatOrbs, BentoFeatures, ModuleAccordion 23 moduli, CaseStudyCard Paola, IntegrationLogos delivery, BookingEmbed, FAQ 6, ContactForm |
| `/hotel` | Hero, StatOrbs, BentoFeatures, ModuleAccordion 23 moduli, PricingTable 120/240/340, IntegrationLogos OTA, BookingEmbed, FAQ 6 |
| `/hardware` | Hero, ProductCategoryFilter (React island, 8 categorie), CTABanner, ContactForm |
| `/prodotti/[slug]` | Dynamic page × 20 — hero immagine, specs tabella, JSON-LD Product, breadcrumbs, prodotti correlati |
| `/my-self-order` | Hero, ThreePillars Web/Veloce/Potente, 15 feature bullet, PricingTable 25/70/140, Demo CTA, IntegrationLogos, BookingEmbed, FAQ |
| `/chi-siamo` | Hero Sergio, StorySection, Vision/Mission card, TeamGrid Sergio+Emanuela, ThreePillars, TestimonialCarousel grid, MapEmbed Susa, BookingEmbed |
| `/prenota-demo` | Hero, BookingForm 5 campi (split layout), "Cosa aspettarti" sticky card, TestimonialCarousel mini, FAQ booking |
| `/contatti` | Hero, ContactForm 5 campi + banner success/error, MapEmbed |
| `/privacy` | Iubenda embed inline (privacy + cookie), info titolare GDPR |
| `/blog` | Hero, filtri categoria, grid BlogCard, NewsletterSignup |
| `/blog/[slug]` | Dynamic page × 5 — BlogPostLayout completo con prose, JSON-LD Article, CTA inline, articoli correlati |
| `/404` | Hero "Hai cercato qualcosa che non c'è" + CTA |

### API endpoints (Resend + TeamLeader handoff)

| Endpoint | Funzione |
|---|---|
| `POST /api/booking-prequalify` | Form pre-qualifica demo → email Sergio + redirect TeamLeader con query params firstname/lastname/email/phone |
| `POST /api/contact` | Form contatto → email Sergio. Honeypot anti-spam + validation. Banner success su `/contatti?sent=1` |
| `POST /api/newsletter` | Iscrizione newsletter → notifica email per integrazione manuale MailerLite/Brevo |

### Design system

- **Hospitality Clay** completo in `src/styles/global.css` (Tailwind 4 CSS-first config)
- Palette warm (canvas cream, copper, bordeaux, sage, gold, terracotta)
- Shadow stack 4-layer multi-shadow (claySurface, clayCard, clayCardHover, clayButton, clayButtonHover, clayPressed)
- Keyframes clay-float × 3 + clay-breathe + animation-delay utilities
- Gradient orb utilities (.clay-orb-*), glass-clay, clay-text-gradient
- Self-hosted Nunito + DM Sans via `@fontsource`
- `prefers-reduced-motion` guard

### Componenti riusabili (40+)

```
ui/        ClayCard, ClayButton, ClayInput, ClayTextarea, ClayBadge, ClayCheckbox, ClayRadioGroup, IconOrb, Logo
layout/    Header (floating glass), Footer (shadow-claySurface), MobileMenu, StickyCTA, Breadcrumbs, ClayBlobs
sections/  ClayHero, StatOrbs, BentoFeatures, StorySection, SectorList, ModuleAccordion, PricingTable, FAQ,
           TestimonialCarousel, CaseStudyCard, BookingEmbed, BookingForm, ContactForm, MapEmbed,
           IntegrationLogos, NewsletterSignup, BlogCard, ThreePillars, CTABanner
product/   ProductCard, ProductGrid, ProductSpecs, ProductCategoryFilter (React island)
```

### SEO

- `LocalBusiness` JSON-LD globale (BaseLayout) con indirizzo, telefono, orari
- `Product` JSON-LD per ogni scheda prodotto (20)
- `BlogPosting` JSON-LD per ogni articolo (5)
- `BreadcrumbList` JSON-LD su breadcrumbs (Hardware + product detail + blog)
- `FAQPage` JSON-LD su FAQ components
- Meta description uniche per pagina
- Open Graph + Twitter Card meta
- 10 OG image PNG generate via Sharp (`scripts/generate-og-images.ts`)
- Sitemap auto via `@astrojs/sitemap` (escluso `/api/`)
- 301 redirect map dai vecchi slug BIC in `astro.config.mjs`
- robots.txt + manifest.webmanifest + favicon SVG

### Content Collections

| Collection | Loader | Quantità Fase 2 |
|---|---|---|
| `blog` | `glob('**/*.{md,mdx}', './src/content/blog')` | 5 articoli pillar (Booking, RT, Food cost, GDPR, Channel manager) |
| `products` | `glob('**/*.{md,mdx}', './src/content/products')` | 20 schede hardware (POS, RT, kiosk, palmari, stampanti, serrature) |
| `modules` | `glob('**/*.{md,mdx}', './src/content/modules')` | 46 moduli (23 Hotel + 23 Ristoranti) |
| `testimonials` | `file('./src/content/testimonials/index.json')` | 1 (Paola Osteria del Conte — solo confermato reale) |

## Build & deploy

### Local dev

```bash
pnpm install
cp .env.example .env   # popola RESEND_API_KEY + PUBLIC_TEAMLEADER_BOOKING_URL
pnpm dev               # http://localhost:3014
pnpm build             # statico in dist/client + server runtime per /api/*
pnpm preview           # anteprima build su :3014
```

`pnpm build` produce **40 pagine statiche** + bundle Netlify Function per i 3 endpoint API.

### Deploy Netlify

Il progetto è già configurato per deploy su Netlify:
- Adapter: `@astrojs/netlify` → compila gli endpoint `/api/*` come Netlify Functions
- Config: `netlify.toml` (build command + cache headers + security headers)
- Node version: 20 (fissato in `netlify.toml`)

**Procedura:**

1. **Push su GitHub** (o GitLab/Bitbucket)
2. **Su Netlify**: New site → Import existing project → seleziona repo
3. Netlify rileva `netlify.toml` e auto-configura:
   - Build command: `pnpm build`
   - Publish directory: `dist`
4. **Environment variables** da impostare nel dashboard Netlify (Site settings → Environment variables):

| Variabile | Valore |
|---|---|
| `RESEND_API_KEY` | La tua API key Resend (per email transazionali) |
| `PUBLIC_TEAMLEADER_BOOKING_URL` | URL booking TeamLeader di Sergio |
| `PUBLIC_CONTACT_PHONE` | `+390122675000` |
| `PUBLIC_CONTACT_EMAIL` | `info@quickufficio.com` |

5. **Deploy** → Netlify build + pubblica
6. **Dominio**: collega `quickufficio.com` (Site settings → Domain management)

**Nota build locale Windows**: lo step finale di Netlify functions packaging usa symlink → può fallire con `EPERM` su Windows. Il `.npmrc` con `node-linker=hoisted` previene il problema. Il build su Netlify cloud (Linux) funziona senza problemi.

## Variabili ambiente

| Variabile | Uso |
|---|---|
| `RESEND_API_KEY` | Email transazionali (form contatto + pre-qualifica demo + newsletter). Se mancante, gli endpoint loggano in console invece di inviare. |
| `PUBLIC_TEAMLEADER_BOOKING_URL` | URL booking Sergio. Default fallback hardcoded nell'endpoint. |
| `PUBLIC_CONTACT_PHONE` | Telefono pubblico — `+390122675000` |
| `PUBLIC_CONTACT_EMAIL` | Email pubblica — `info@quickufficio.com` |
| `PUBLIC_WHATSAPP_NUMBER` | WhatsApp Business |
| `PUBLIC_ANALYTICS_DOMAIN` | Dominio Plausible/Umami (opzionale) |

## Decisioni pre-build implementate (brief §0)

- ✅ Numero pubblico unico **0122 675000** hardcoded in Header, Footer, ContactForm, StickyCTA, JSON-LD, `tel:` links
- ✅ Booking unico TeamLeader via form pre-qualifica → handoff con query params (firstname/lastname/email/phone)
- ✅ 5 articoli pillar al lancio (Booking, RT, Food cost, GDPR, Channel manager)
- ✅ CEO solo nome "Sergio" (mai cognome)
- ✅ Testimonial "Francesco S." **eliminato** (non era persona reale)
- ✅ Testimonial "Giusy" **omesso** in attesa di verifica con Sergio
- ✅ Logo placeholder testuale `Q` + wordmark Nunito (in attesa SVG BD Media §8.8)

## Script utility

```bash
pnpm assets:download         # Scarica asset legacy da CDN (idempotente)
pnpm assets:screenshots      # Cattura screenshot Playwright sito attuale
pnpm tsx scripts/generate-og-images.ts   # Rigenera OG images
pnpm typecheck               # Astro check
```

## Riferimenti

- `ASSETS_REPORT.md` — stato asset (🟢/🟡/🔴), lista shooting professionale, decisioni testimonial
- Brief originale: `C:\Users\ervin\Downloads\quickufficio_claude_code_brief.md`

## TODO Fase 3 (post-launch)

- [ ] **Logo SVG da BD Media** → integrare in `public/images/brand/logo.svg`, aggiornare `Logo.astro` con SVG `currentColor`
- [ ] **Foto editorial Sergio + Emanuela** (priorità 1 §8.7) → sostituire `legacy/team/*` in tutto il sito
- [ ] **Rifoto serratura smart** (sostituire screenshot WhatsApp `legacy/hardware/serratura-smart.jpg`)
- [ ] **2-3 testimonial reali aggiuntivi** raccolti da Sergio → aggiungere in `src/content/testimonials/index.json`
- [ ] **Ottimizzazione immagini** AVIF/WebP + resize multi-breakpoint via Astro `<Image />` component (sostituire `<img>` nelle card)
- [ ] **Spostare asset finali** da `public/images/legacy/` a `public/images/{categoria}/` con nomi puliti come tabella §8.4
- [ ] **Verifica testimonial "Giusy"** → mantenere o eliminare in `src/content/testimonials/index.json`
- [ ] **Configurare dominio Resend** `noreply@quickufficio.com` come sender verificato
- [ ] **Testare TeamLeader query params** con un booking pilota prima del go-live
- [ ] **Iubenda** verificare codice 33601357 ancora attivo
- [ ] **Cookie banner** se Iubenda lo richiede attivo nella head globale
- [ ] **Analytics** scegliere tra Plausible / Umami / Fathom e attivare
- [ ] **Chat widget** scegliere tra Crisp / Tawk.to (sostituire vecchio Wildix kite)
- [ ] **`quickufficio_content_audit.md`** se BD Media lo fornisce → review body copy attualmente derivato dal brief

## Convenzioni

- Commit: Conventional Commits (`feat:`, `fix:`, `chore:`, `docs:`)
- Naming: PascalCase `*.astro` / `*.tsx`
- Routing: URL italiani (`/ristoranti`, `/hotel`)
- 301 redirect da slug BIC configurati in `astro.config.mjs`
