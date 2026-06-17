"""
Genera PDF "Quickufficio_BeforeAfter.pdf" — palette Purple Brand.
5 pagine A4: Cover, Sintesi, 10 punti critici, Decisioni operative, TODO post-launch.
"""

import os
from reportlab.lib.pagesizes import A4
from reportlab.lib.colors import HexColor, white
from reportlab.lib.units import mm
from reportlab.pdfgen import canvas
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont

# Palette Purple Brand
PURPLE_PRIMARY = HexColor("#800080")
PURPLE_LIGHT = HexColor("#C04ECF")
PURPLE_DEEP = HexColor("#5C005C")
TEXT_DARK = HexColor("#1A0F1F")
TEXT_MUTED = HexColor("#5C4A60")
TINT_BG = HexColor("#F7F0FB")
INPUT_BG = HexColor("#F5EDF7")
WHITE = white

# Try to register Nunito + DM Sans from node_modules @fontsource (se disponibili)
PROJECT_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
NUNITO_PATH = os.path.join(
    PROJECT_ROOT, "node_modules", "@fontsource", "nunito", "files", "nunito-latin-900-normal.woff2"
)
# woff2 non supportato direttamente — fallback su Helvetica
FONT_HEADING = "Helvetica-Bold"
FONT_HEADING_BLACK = "Helvetica-Bold"
FONT_BODY = "Helvetica"
FONT_BODY_BOLD = "Helvetica-Bold"

# Layout
W, H = A4
MARGIN = 25 * mm
CONTENT_W = W - 2 * MARGIN


def draw_q_logo(c, cx, cy, size=80):
    """Disegna il logo Q dentro un cerchio gradient viola."""
    # Cerchio esterno light purple
    c.setFillColor(PURPLE_LIGHT)
    c.circle(cx, cy, size / 2, fill=1, stroke=0)
    # Cerchio interno deep purple più piccolo
    c.setFillColor(PURPLE_PRIMARY)
    c.circle(cx, cy, size / 2 * 0.92, fill=1, stroke=0)
    # Lettera Q
    c.setFillColor(WHITE)
    c.setFont(FONT_HEADING_BLACK, size * 0.55)
    c.drawCentredString(cx, cy - size * 0.18, "Q")


def draw_footer(c, page_num, total=5):
    """Footer comune."""
    c.setFillColor(TEXT_MUTED)
    c.setFont(FONT_BODY, 8)
    c.drawString(MARGIN, 15 * mm, "BD Media · bdtr Srl · Per Quickufficio.com Srls · 2026")
    c.drawRightString(W - MARGIN, 15 * mm, f"{page_num} / {total}")
    # Linea top footer
    c.setStrokeColor(PURPLE_PRIMARY)
    c.setLineWidth(0.5)
    c.line(MARGIN, 22 * mm, W - MARGIN, 22 * mm)


def draw_section_header(c, x, y, title, kicker=None):
    """Heading di pagina."""
    if kicker:
        c.setFillColor(PURPLE_PRIMARY)
        c.setFont(FONT_BODY_BOLD, 9)
        c.drawString(x, y + 26, kicker.upper())
    c.setFillColor(TEXT_DARK)
    c.setFont(FONT_HEADING_BLACK, 28)
    c.drawString(x, y, title)
    # Linea sotto
    c.setStrokeColor(PURPLE_PRIMARY)
    c.setLineWidth(2)
    c.line(x, y - 8, x + 60, y - 8)


def wrap_text(text, font, size, max_width, c):
    """Wrap manuale: ritorna list di righe."""
    c.setFont(font, size)
    words = text.split()
    lines = []
    current = ""
    for word in words:
        test = (current + " " + word).strip()
        if c.stringWidth(test, font, size) <= max_width:
            current = test
        else:
            if current:
                lines.append(current)
            current = word
    if current:
        lines.append(current)
    return lines


def draw_wrapped(c, x, y, text, font, size, max_width, color=TEXT_DARK, leading=None):
    """Disegna testo wrapped — ritorna y finale."""
    if leading is None:
        leading = size * 1.4
    lines = wrap_text(text, font, size, max_width, c)
    c.setFillColor(color)
    c.setFont(font, size)
    for line in lines:
        c.drawString(x, y, line)
        y -= leading
    return y


# ------------------------------------------------------------------
# PAGE 1 — Cover
# ------------------------------------------------------------------
def page_cover(c):
    # Background bianco
    c.setFillColor(WHITE)
    c.rect(0, 0, W, H, fill=1, stroke=0)

    # Stripe viola superiore decorativa (banda diagonale leggera)
    c.setFillColor(TINT_BG)
    c.rect(0, H - 30 * mm, W, 30 * mm, fill=1, stroke=0)

    # Banda viola sottile sopra al tint
    c.setFillColor(PURPLE_PRIMARY)
    c.rect(0, H - 32 * mm, W, 2 * mm, fill=1, stroke=0)

    # Logo Q centrato
    draw_q_logo(c, W / 2, H / 2 + 60, size=100)

    # Titolo principale
    c.setFillColor(TEXT_DARK)
    c.setFont(FONT_HEADING_BLACK, 42)
    c.drawCentredString(W / 2, H / 2 - 30, "Quickufficio.com")

    # Linea decorativa
    c.setStrokeColor(PURPLE_PRIMARY)
    c.setLineWidth(2)
    c.line(W / 2 - 40, H / 2 - 45, W / 2 + 40, H / 2 - 45)

    # Sottotitolo
    c.setFillColor(PURPLE_PRIMARY)
    c.setFont(FONT_HEADING, 18)
    c.drawCentredString(W / 2, H / 2 - 75, "Rebuild 2026 - Prima vs Dopo")

    # Tag riquadro viola in basso
    c.setFillColor(TEXT_DARK)
    c.roundRect(W / 2 - 80, H / 2 - 130, 160, 30, 15, fill=1, stroke=0)
    c.setFillColor(WHITE)
    c.setFont(FONT_BODY_BOLD, 11)
    c.drawCentredString(W / 2, H / 2 - 112, "BRIEF PER SERGIO")

    # Footer cover
    c.setFillColor(TEXT_MUTED)
    c.setFont(FONT_BODY, 10)
    c.drawCentredString(W / 2, 30 * mm, "BD Media · Bdtr Srl · Documento di confronto progettuale")


# ------------------------------------------------------------------
# PAGE 2 — Sintesi
# ------------------------------------------------------------------
def page_sintesi(c):
    c.setFillColor(WHITE)
    c.rect(0, 0, W, H, fill=1, stroke=0)

    # Header
    draw_section_header(c, MARGIN, H - 50 * mm, "Cosa abbiamo cambiato", kicker="Sintesi")

    # Intro
    intro = ("Il vecchio sito su Business in Cloud era una brochure passiva che non vendeva. "
             "L'abbiamo rifatto da zero in Astro 6 con un design system custom (Purple Brand) e "
             "una macchina di acquisizione lead unificata su TeamLeader.")
    y = H - 80 * mm
    y = draw_wrapped(c, MARGIN, y, intro, FONT_BODY, 11, CONTENT_W, color=TEXT_MUTED, leading=16)

    # Tabella
    y -= 15
    table_data = [
        ("Metrica", "Prima", "Dopo"),
        ("Pagine", "6 fisse", "40+ statiche"),
        ("Performance", "Lighthouse ~55", "Target 95+"),
        ("Foto hero", "Cellulare amatoriale", "Unsplash, 107KB AVIF"),
        ("Booking systems", "3 paralleli", "1 unificato (TeamLeader)"),
        ("Numeri telefono", "3 incongruenti", "1 unico: 0122 675000"),
        ("Blog", "Vuoto", "5 articoli pillar"),
        ("Mobile", "Non responsive", "Mobile-first"),
    ]

    row_h = 22
    col_widths = [55 * mm, 55 * mm, 50 * mm]
    table_x = MARGIN
    table_y = y

    # Header riga
    c.setFillColor(PURPLE_PRIMARY)
    c.rect(table_x, table_y - row_h, sum(col_widths), row_h, fill=1, stroke=0)
    c.setFillColor(WHITE)
    c.setFont(FONT_BODY_BOLD, 10)
    cx = table_x + 8
    for i, header in enumerate(table_data[0]):
        c.drawString(cx, table_y - 14, header)
        cx += col_widths[i]
    table_y -= row_h

    # Body rows alternate
    for i, row in enumerate(table_data[1:]):
        if i % 2 == 0:
            c.setFillColor(TINT_BG)
            c.rect(table_x, table_y - row_h, sum(col_widths), row_h, fill=1, stroke=0)
        c.setFillColor(TEXT_DARK)
        c.setFont(FONT_BODY_BOLD, 9)
        c.drawString(table_x + 8, table_y - 14, row[0])
        c.setFont(FONT_BODY, 9)
        c.setFillColor(TEXT_MUTED)
        c.drawString(table_x + 8 + col_widths[0], table_y - 14, row[1])
        c.setFillColor(PURPLE_PRIMARY)
        c.setFont(FONT_BODY_BOLD, 9)
        c.drawString(table_x + 8 + col_widths[0] + col_widths[1], table_y - 14, row[2])
        table_y -= row_h

    # Bordo tabella
    c.setStrokeColor(PURPLE_PRIMARY)
    c.setLineWidth(0.8)
    c.rect(table_x, table_y, sum(col_widths), len(table_data) * row_h, fill=0, stroke=1)

    draw_footer(c, 2)


# ------------------------------------------------------------------
# PAGE 3 — 10 punti critici migliorati
# ------------------------------------------------------------------
def page_punti(c):
    c.setFillColor(WHITE)
    c.rect(0, 0, W, H, fill=1, stroke=0)

    draw_section_header(c, MARGIN, H - 40 * mm, "10 punti critici migliorati", kicker="Cambiamenti chiave")

    points = [
        ("Copy che vende, non brochure passiva",
         "Prima: claim generico 'Hardware e Software per Hotel'. Dopo: 'Piu controllo, piu guadagno, piu tempo libero' - claim emotivo + benefit promise."),
        ("Funnel unificato, niente piu 5 sistemi paralleli",
         "Prima: TeamLeader + Calendly + Jotform + WhatsApp + telefono. Dopo: form Astro pre-qualifica con handoff TeamLeader e query params precompilati."),
        ("Numero pubblico unico",
         "Prima: 3 numeri diversi sparsi nel sito. Dopo: 0122 675000 (fisso Susa) hardcoded in Header, Footer, CTA mobile e schema JSON-LD."),
        ("Solo foto reali, niente stock fasullo",
         "Prima: 'Francesco S.' con stock photo Business in Cloud + IMG cellulare 2021. Dopo: solo testimonial verificati, Unsplash CC0 per contesti generici."),
        ("Performance: -95% peso immagini",
         "Prima: PNG fino a 2,1 MB serviti da CDN BIC. Dopo: AVIF/WebP/JPG multi-size 400/768/1280/1920 - hero 107 KB invece di 2,1 MB."),
        ("SEO completo: schema, sitemap, OG image",
         "Prima: meta description tutte uguali, nessuno schema. Dopo: JSON-LD LocalBusiness/Product/Blog/FAQ, sitemap auto, 10 OG images, 301 redirect."),
        ("Accessibilita WCAG 2.1 AA",
         "Prima: alt text 'image' o vuoti, contrast issues, no focus visible. Dopo: alt descrittivi SEO, focus ring viola, skip-to-content, reduced-motion guard."),
        ("Design system identitario 'Purple Brand'",
         "Prima: template Business in Cloud uguale a centinaia di altri siti. Dopo: palette viola+bianco unica nel B2B Ho.Re.Ca italiano, riconoscibile al colpo."),
        ("Animazioni di valore: Plasma WebGL + Stacking Cards",
         "Prima: sito completamente statico. Dopo: plasma background alternato, deck-of-cards stacking effect su 'Cosa fa la differenza', scroll-reveal staggered."),
        ("Mobile-first reale",
         "Prima: layout desktop schiacciato su mobile. Dopo: testi ricalibrati <640px, sticky CTA bottom con tel+demo, hamburger menu glass-clay."),
    ]

    y = H - 65 * mm
    for i, (title, desc) in enumerate(points):
        if y < 40 * mm:
            break  # Safety guard
        # Numero in pallino viola
        c.setFillColor(PURPLE_PRIMARY)
        c.circle(MARGIN + 7, y + 2, 9, fill=1, stroke=0)
        c.setFillColor(WHITE)
        c.setFont(FONT_BODY_BOLD, 9)
        c.drawCentredString(MARGIN + 7, y - 1, str(i + 1).zfill(2))

        # Titolo
        c.setFillColor(TEXT_DARK)
        c.setFont(FONT_HEADING_BLACK, 11)
        c.drawString(MARGIN + 22, y + 1, title)

        # Descrizione (wrapped)
        c.setFillColor(TEXT_MUTED)
        c.setFont(FONT_BODY, 9)
        desc_lines = wrap_text(desc, FONT_BODY, 9, CONTENT_W - 25, c)
        dy = y - 13
        for line in desc_lines[:2]:  # max 2 righe per item
            c.drawString(MARGIN + 22, dy, line)
            dy -= 11
        y = dy - 8

    draw_footer(c, 3)


# ------------------------------------------------------------------
# PAGE 4 — Decisioni operative
# ------------------------------------------------------------------
def page_decisioni(c):
    c.setFillColor(WHITE)
    c.rect(0, 0, W, H, fill=1, stroke=0)

    draw_section_header(c, MARGIN, H - 40 * mm, "Decisioni operative", kicker="Cosa abbiamo deciso")

    boxes = [
        {
            "title": "Testimonial reali only",
            "color": PURPLE_PRIMARY,
            "bullets": [
                "'Francesco S.' eliminato (non era persona reale, era stock template).",
                "'Giusy' da verificare con Sergio: se reale teniamo, se fake eliminiamo.",
                "Day-1 mostra solo Paola finche non raccolgono 2-3 testimonial reali aggiuntivi.",
            ],
        },
        {
            "title": "Logo finale BD Media",
            "color": PURPLE_LIGHT,
            "bullets": [
                "Logo PNG fornito integrato in Header, Footer, favicon, OG images, JSON-LD.",
                "Chroma-keyed: fondo bianco rimosso, transparent PNG multi-size 32/64/128/256/512.",
                "WebP fallback per browser moderni, riduzione peso 99,9% (8,3 MB -> 4 KB).",
            ],
        },
        {
            "title": "Stack tecnico produzione",
            "color": PURPLE_DEEP,
            "bullets": [
                "Astro 6.4 + Tailwind 4 CSS-first + TypeScript strict.",
                "Deploy: Netlify (adapter Functions per /api/* endpoints Resend).",
                "Email: Resend (form contatto + pre-qualifica + newsletter).",
            ],
        },
    ]

    y = H - 65 * mm
    box_h = 65 * mm
    box_padding = 8 * mm

    for box in boxes:
        # Riquadro background tint
        c.setFillColor(TINT_BG)
        c.roundRect(MARGIN, y - box_h, CONTENT_W, box_h, 6, fill=1, stroke=0)
        # Stripe sinistra colorata
        c.setFillColor(box["color"])
        c.roundRect(MARGIN, y - box_h, 4, box_h, 2, fill=1, stroke=0)
        # Titolo box
        c.setFillColor(box["color"])
        c.setFont(FONT_HEADING_BLACK, 14)
        c.drawString(MARGIN + box_padding, y - 18, box["title"])
        # Bullets
        c.setFillColor(TEXT_DARK)
        c.setFont(FONT_BODY, 10)
        by = y - 36
        for bullet in box["bullets"]:
            # Dot viola
            c.setFillColor(box["color"])
            c.circle(MARGIN + box_padding + 4, by + 3, 2, fill=1, stroke=0)
            # Testo
            c.setFillColor(TEXT_DARK)
            lines = wrap_text(bullet, FONT_BODY, 10, CONTENT_W - box_padding * 2 - 15, c)
            tx = MARGIN + box_padding + 12
            for line in lines[:2]:
                c.drawString(tx, by, line)
                by -= 13
            by -= 4
        y -= box_h + 6 * mm

    draw_footer(c, 4)


# ------------------------------------------------------------------
# PAGE 5 — TODO post-launch
# ------------------------------------------------------------------
def page_todo(c):
    c.setFillColor(WHITE)
    c.rect(0, 0, W, H, fill=1, stroke=0)

    draw_section_header(
        c, MARGIN, H - 40 * mm, "TODO post-launch", kicker="Cosa serve da Sergio"
    )

    intro = ("Il sito e production-ready. Per andare live al 100% servono questi step lato cliente. "
             "Indicativi 1-3 settimane di lavoro distribuito.")
    y = H - 65 * mm
    y = draw_wrapped(c, MARGIN, y, intro, FONT_BODY, 10, CONTENT_W, color=TEXT_MUTED, leading=14)

    y -= 10

    todos = [
        ("CONTENUTI", [
            "Foto editorial professionali (Sergio, Emanuela, 3 pose ciascuno)",
            "Rifoto serratura smart (no piu screenshot WhatsApp)",
            "2-3 testimonial reali aggiuntivi con foto e copy verificati",
            "Verifica 'Giusy' testimonial: reale o eliminare?",
        ]),
        ("INTEGRAZIONI", [
            "Configurare RESEND_API_KEY su Netlify",
            "Verificare dominio noreply@quickufficio.com su Resend",
            "Testare TeamLeader query params con booking pilota",
            "Cookie banner Iubenda (codice 33601357 confermato attivo)",
        ]),
        ("SERVIZI TERZI", [
            "Analytics: scegliere Plausible vs Umami (privacy-first)",
            "Chat widget: scegliere Crisp vs Tawk.to (sostituire Wildix kite)",
        ]),
    ]

    for category, items in todos:
        # Categoria
        c.setFillColor(PURPLE_PRIMARY)
        c.setFont(FONT_BODY_BOLD, 10)
        c.drawString(MARGIN, y, category)
        # Linea sotto categoria
        c.setStrokeColor(PURPLE_PRIMARY)
        c.setLineWidth(1)
        c.line(MARGIN, y - 4, MARGIN + 40, y - 4)
        y -= 18

        for item in items:
            # Checkbox quadratino vuoto
            box_size = 10
            c.setStrokeColor(PURPLE_PRIMARY)
            c.setLineWidth(1.2)
            c.rect(MARGIN + 5, y - 2, box_size, box_size, fill=0, stroke=1)
            # Testo
            c.setFillColor(TEXT_DARK)
            c.setFont(FONT_BODY, 10)
            c.drawString(MARGIN + 5 + box_size + 8, y + 1, item)
            y -= 18
        y -= 6

    draw_footer(c, 5)


# ------------------------------------------------------------------
# Build PDF
# ------------------------------------------------------------------
def main():
    out_dir = r"C:\Users\ervin\Downloads\quickufficio"
    os.makedirs(out_dir, exist_ok=True)
    out_path = os.path.join(out_dir, "Quickufficio_BeforeAfter.pdf")

    c = canvas.Canvas(out_path, pagesize=A4)
    c.setTitle("Quickufficio.com — Rebuild 2026 — Prima vs Dopo")
    c.setAuthor("BD Media — bdtr Srl")
    c.setSubject("Documento di confronto Before/After per Sergio")
    c.setKeywords("Quickufficio, rebuild, BD Media, Ho.Re.Ca, Astro")

    page_cover(c)
    c.showPage()
    page_sintesi(c)
    c.showPage()
    page_punti(c)
    c.showPage()
    page_decisioni(c)
    c.showPage()
    page_todo(c)
    c.showPage()

    c.save()
    print(f"PDF generato: {out_path}")
    print(f"Size: {os.path.getsize(out_path)} bytes")


if __name__ == "__main__":
    main()
