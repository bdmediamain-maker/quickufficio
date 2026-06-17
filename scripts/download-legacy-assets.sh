#!/usr/bin/env bash
# scripts/download-legacy-assets.sh
# Scarica tutte le immagini dal sito attuale quickufficio.com
# Brief §8.1 — Fase A asset recovery.
#
# NB: NON usa `set -e` — uno script di download deve essere tollerante
# ai 404 (alcuni file legacy potrebbero essere scaduti). Logga successi
# e fallimenti separatamente e produce un report alla fine.

ROOT="public/images/legacy"
LOG="$ROOT/.download-log.txt"
ERRORS="$ROOT/.download-errors.txt"

mkdir -p "$ROOT"/{global,homepage,chi-siamo,ristoranti,hotel,hardware,my-self-order,testimonials,team,icons,logos,screenshots}

# Reset logs
: > "$LOG"
: > "$ERRORS"

CF="https://d1hjjl5l7cel88.cloudfront.net/uploads/library_element_image/file"
LOGO_CF="https://d1n7pvm7k6elmp.cloudfront.net/uploads/academy/logo/6021"
S3="https://s3-eu-west-1.amazonaws.com/socialacademy/business-in-cloud/dist/imgs"

OK_COUNT=0
ERR_COUNT=0

dl() {
  local url="$1"
  local out="$2"
  if curl -fsSL --connect-timeout 10 --max-time 60 "$url" -o "$out"; then
    echo "OK  $out  <-  $url" >> "$LOG"
    OK_COUNT=$((OK_COUNT + 1))
    printf "  ✓ %s\n" "$(basename "$out")"
  else
    echo "ERR $out  <-  $url" >> "$ERRORS"
    ERR_COUNT=$((ERR_COUNT + 1))
    printf "  ✗ %s (FAILED)\n" "$(basename "$out")"
  fi
}

echo ""
echo "→ Logo originale (sito attuale, backup — NON usare nel rebuild, vedi §8.8)"
dl "$LOGO_CF/sd-BqqS8kbawu.png" "$ROOT/logos/quickufficio-logo-original.png"

echo ""
echo "→ Logo brand secondario (Automazionehotel.com)"
dl "$CF/125357/Logo_automazionehotel.com_-922_-_480_px-.png" "$ROOT/logos/automazionehotel-logo.png"

echo ""
echo "→ Team"
dl "$CF/70115/IMG_20210228_110342.jpg"  "$ROOT/team/sergio-original.jpg"
dl "$CF/70723/manu.png"                 "$ROOT/team/emanuela-original.png"
dl "$CF/113461/IMG_20210228_110342.jpg" "$ROOT/team/sergio-home.jpg"
dl "$CF/113459/manu.png"                "$ROOT/team/emanuela-home.png"

echo ""
echo "→ Homepage sections"
dl "$CF/113457/hotel.png"                                 "$ROOT/homepage/focus-hotel.png"
dl "$CF/113473/assistenza-software-ristorante-hotel.png"  "$ROOT/homepage/assistenza.png"
dl "$CF/113474/ristorante-pc-software.png"                "$ROOT/homepage/blog-banner.png"

echo ""
echo "→ Icone placeholder Business in Cloud (DA SOSTITUIRE con Lucide nel rebuild)"
dl "$S3/icons/github.svg"    "$ROOT/icons/legacy-assistenza.svg"
dl "$S3/icons/layers.svg"    "$ROOT/icons/legacy-formazione.svg"
dl "$S3/icons/life-buoy.svg" "$ROOT/icons/legacy-resilienza.svg"

echo ""
echo "→ Testimonial avatars"
dl "$CF/70336/paola.png"                  "$ROOT/testimonials/paola-avatar.png"
dl "$CF/70724/2021-11-16_18.38.41.jpg"    "$ROOT/testimonials/paola-extended.jpg"
dl "$CF/71572/direttore.png"              "$ROOT/testimonials/francesco-avatar.png"
dl "$S3/people/2.jpg"                     "$ROOT/testimonials/stock-francesco.jpg"
dl "$S3/people/3.jpg"                     "$ROOT/testimonials/stock-giusy.jpg"

echo ""
echo "→ Chi Siamo"
dl "$CF/70714/hardware_proprietario_.png" "$ROOT/chi-siamo/hardware-cta.png"

echo ""
echo "→ Ristoranti"
dl "$CF/73907/foto_6.png"                     "$ROOT/ristoranti/hero.png"
dl "$CF/71925/form_al_ristorante.png"         "$ROOT/ristoranti/myselforder-form.png"
dl "$CF/120173/tutorial_quickufficio_-1-.png" "$ROOT/ristoranti/tutorial.png"
dl "$CF/113462/foto_6.png"                    "$ROOT/ristoranti/foto-secondaria.png"
dl "$CF/113458/manu.png"                      "$ROOT/ristoranti/emanuela-ristoranti.png"

echo ""
echo "→ Hotel"
dl "$CF/74549/hotel1.png"  "$ROOT/hotel/hero.png"
dl "$CF/74551/camea_2.png" "$ROOT/hotel/automation-cloud.png"

echo ""
echo "→ Hardware (20 prodotti)"
dl "$CF/74535/kt1500.jpg"                                  "$ROOT/hardware/mypos-kt1500.jpg"
dl "$CF/193017/kt2000.jpg"                                 "$ROOT/hardware/mypos-kt2000.jpg"
dl "$CF/193018/kt3000.jpg"                                 "$ROOT/hardware/mypos-kt3000.jpg"
dl "$CF/193019/asus.jpg"                                   "$ROOT/hardware/asus-expertcenter.jpg"
dl "$CF/74536/my_pos_D1a.jpg"                              "$ROOT/hardware/mypos-d1a.jpg"
dl "$CF/74537/kt21.jpg"                                    "$ROOT/hardware/mypos-kt21a.jpg"
dl "$CF/74538/eden_max20.jpg"                              "$ROOT/hardware/eden-max20.jpg"
dl "$CF/74539/eden_max_30.jpg"                             "$ROOT/hardware/eden-max30.jpg"
dl "$CF/74540/eden_max_21.jpg"                             "$ROOT/hardware/eden-maxi21.jpg"
dl "$CF/74541/eden_max_50P.jpg"                            "$ROOT/hardware/eden-maxi50p.jpg"
dl "$CF/74542/tablet_eden.jpg"                             "$ROOT/hardware/tablet-eden-10.jpg"
dl "$CF/74543/MYPRINTERP90WIFI.jpg"                        "$ROOT/hardware/myprinter-p90.jpg"
if [ -f "$ROOT/hardware/myprinter-p90.jpg" ]; then
  cp "$ROOT/hardware/myprinter-p90.jpg" "$ROOT/hardware/myprinter-p90-wifi.jpg"
  echo "OK  $ROOT/hardware/myprinter-p90-wifi.jpg  (copy of P90)" >> "$LOG"
  OK_COUNT=$((OK_COUNT + 1))
  printf "  ✓ %s (copy of P90)\n" "myprinter-p90-wifi.jpg"
fi
dl "$CF/74544/KITCHEN.jpg"                                 "$ROOT/hardware/kitchen-monitor.jpg"
dl "$CF/74545/CLEARQ.jpg"                                  "$ROOT/hardware/monitor-43-clearq.jpg"
dl "$CF/74546/PAGER.jpg"                                   "$ROOT/hardware/pager-trasmettitore.jpg"
dl "$CF/74547/KIOSK.jpg"                                   "$ROOT/hardware/mykiosk-27.jpg"
dl "$CF/74548/MYPROXYACCESS.jpg"                           "$ROOT/hardware/lettore-presenze.jpg"
dl "$CF/82528/WhatsApp_Image_2021-10-22_at_11.35.37.jpeg"  "$ROOT/hardware/serratura-smart.jpg"
dl "$CF/121175/tastierino.jpg"                             "$ROOT/hardware/tastierino-smart.jpg"

echo ""
echo "→ My Self Order"
dl "$CF/74837/Applicazione3.png" "$ROOT/my-self-order/all-in-one.png"
dl "$CF/74836/locandina.png"     "$ROOT/my-self-order/menu-presentation.png"

echo ""
echo "→ Asset extra scoperti via crawl live"
# Homepage software previews
dl "$CF/113471/Software-hotel-front.jpg"     "$ROOT/homepage/software-hotel-front.jpg"
dl "$CF/113472/software-ristorante-front.png" "$ROOT/homepage/software-ristorante-front.png"
# Chi siamo / generic
dl "$CF/1873/bic-gradient-due.jpg"           "$ROOT/global/bic-gradient-due.jpg"
dl "$CF/71532/home.png"                      "$ROOT/global/home.png"
# Ristoranti extra
dl "$CF/73232/pudu.png"                      "$ROOT/ristoranti/pudu.png"
dl "$CF/73898/foto2.png"                     "$ROOT/ristoranti/foto2.png"
dl "$CF/74121/menu_ristorante.png"           "$ROOT/ristoranti/menu-ristorante.png"
dl "$CF/74533/asporto.png"                   "$ROOT/ristoranti/asporto.png"
dl "$CF/74534/applicazione.png"              "$ROOT/ristoranti/applicazione.png"
# Hotel gallery
dl "$CF/74831/hotel.png"  "$ROOT/hotel/gallery-1.png"
dl "$CF/74832/hotel1.png" "$ROOT/hotel/gallery-2.png"
dl "$CF/74833/hotel2.png" "$ROOT/hotel/gallery-3.png"
dl "$CF/74834/hotel3.png" "$ROOT/hotel/gallery-4.png"
dl "$CF/74835/hotel4.png" "$ROOT/hotel/gallery-5.png"
# Shapes decorative SVG (riusabili come illustrations)
dl "$S3/shapes/1.svg" "$ROOT/global/shape-1.svg"
dl "$S3/shapes/8.svg" "$ROOT/global/shape-8.svg"
dl "$S3/shapes/9.svg" "$ROOT/global/shape-9.svg"
# Favicon BIC
dl "https://d1n7pvm7k6elmp.cloudfront.net/uploads/academy/favicon/6021/onehundredninetytwo_192x192.jpg" "$ROOT/global/favicon-192-legacy.jpg"

echo ""
echo "═══════════════════════════════════════════════════════"
echo "  Download completo."
echo "  ✓ Successi: $OK_COUNT"
echo "  ✗ Errori:   $ERR_COUNT"
echo "  Log:    $LOG"
[ "$ERR_COUNT" -gt 0 ] && echo "  Errori: $ERRORS"
echo "═══════════════════════════════════════════════════════"
