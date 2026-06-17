#!/bin/bash
# Genera 20 file MDX prodotti hardware in src/content/products/
set -e
ROOT="src/content/products"
mkdir -p "$ROOT"

write_product() {
  local slug="$1"; local title="$2"; local category="$3"; local brand="$4"
  local image="$5"; local imageAlt="$6"; local short="$7"; local featured="$8"
  shift 8
  {
    echo "---"
    echo "title: \"$title\""
    echo "slug: \"$slug\""
    echo "category: \"$category\""
    echo "brand: \"$brand\""
    echo "image: \"$image\""
    echo "imageAlt: \"$imageAlt\""
    echo "shortDescription: \"$short\""
    echo "featured: $featured"
    echo "available: true"
    echo "specs:"
    while [ $# -gt 0 ]; do
      echo "  - label: \"$1\""
      echo "    value: \"$2\""
      shift 2
    done
    echo "---"
    echo ""
  } > "$ROOT/$slug.mdx"
}

write_product "mypos-kt1500" \
  "MyPOS KT1500" "POS Desktop" "Lasersoft" \
  "/images/legacy/hardware/mypos-kt1500.jpg" \
  "POS Desktop MyPOS KT1500 — touchscreen 15 pollici per ristoranti e bar" \
  "POS touch 15 pollici entry-level per ristoranti e bar di piccole dimensioni. Robusto, silenzioso, pronto all'uso." "true" \
  "Display" "15 pollici capacitivo multitouch" \
  "Processore" "Intel J1900 quad-core" \
  "RAM" "4 GB DDR3" \
  "Storage" "64 GB SSD" \
  "OS" "Windows 10 IoT" \
  "Connettivita" "4x USB, 2x RS232, 1x LAN" \
  "Garanzia" "24 mesi"

write_product "mypos-kt2000" \
  "MyPOS KT2000" "POS Desktop" "Lasersoft" \
  "/images/legacy/hardware/mypos-kt2000.jpg" \
  "POS Desktop MyPOS KT2000 — touchscreen 15 pollici performance" \
  "POS touch 15 pollici performance per ristoranti di medie dimensioni. CPU piu veloce e storage SSD ampliato." "false" \
  "Display" "15 pollici capacitivo multitouch IPS" \
  "Processore" "Intel J6412 quad-core" \
  "RAM" "8 GB DDR4" \
  "Storage" "128 GB SSD M.2" \
  "OS" "Windows 11 IoT" \
  "Connettivita" "6x USB, 2x RS232, 1x LAN, WiFi" \
  "Garanzia" "24 mesi"

write_product "mypos-kt3000" \
  "MyPOS KT3000" "POS Desktop" "Lasersoft" \
  "/images/legacy/hardware/mypos-kt3000.jpg" \
  "POS Desktop MyPOS KT3000 — top di gamma 15 pollici" \
  "POS touch 15 pollici top di gamma per attivita con alti volumi. Massima reattivita e storage NVMe." "true" \
  "Display" "15.6 pollici capacitivo IPS HD" \
  "Processore" "Intel i3 quad-core" \
  "RAM" "8 GB DDR4" \
  "Storage" "256 GB NVMe SSD" \
  "OS" "Windows 11 IoT" \
  "Connettivita" "6x USB, 2x RS232, 1x LAN, WiFi 6, Bluetooth" \
  "Garanzia" "24 mesi"

write_product "mypos-d1a" \
  "MyPOS D1a" "POS Desktop" "Lasersoft" \
  "/images/legacy/hardware/mypos-d1a.jpg" \
  "POS Desktop MyPOS D1a — design compatto" \
  "POS desktop compatto con display 14 pollici e ingombro ridotto per bar e take-away." "false" \
  "Display" "14 pollici capacitivo" \
  "Processore" "Intel J4125" \
  "RAM" "4 GB" \
  "Storage" "64 GB SSD" \
  "OS" "Windows 10 IoT" \
  "Garanzia" "24 mesi"

write_product "mypos-kt21a" \
  "MyPOS KT21a" "Palmari" "Lasersoft" \
  "/images/legacy/hardware/mypos-kt21a.jpg" \
  "Palmare Android MyPOS KT21a — comande tavolo" \
  "Palmare Android per presa comande al tavolo. Robusto, leggero, autonomia tutto il servizio." "true" \
  "Display" "5.5 pollici HD touch" \
  "OS" "Android 12" \
  "Connettivita" "WiFi, 4G LTE, Bluetooth" \
  "Batteria" "4500 mAh — autonomia 10h" \
  "Resistenza" "Drop test 1.5m, IP65" \
  "Garanzia" "24 mesi"

write_product "asus-expertcenter" \
  "ASUS ExpertCenter" "POS Desktop" "ASUS" \
  "/images/legacy/hardware/asus-expertcenter.jpg" \
  "Mini PC ASUS ExpertCenter per back-office gestionale" \
  "Mini PC silenzioso per back-office, contabilita e gestionale. Affidabilita ASUS con garanzia commercial." "false" \
  "Form factor" "Mini PC 1L" \
  "Processore" "Intel i5 / i7 a richiesta" \
  "RAM" "8 / 16 GB" \
  "Storage" "256 GB / 512 GB SSD" \
  "OS" "Windows 11 Pro" \
  "Garanzia" "36 mesi business"

write_product "eden-max20" \
  "Eden Max 20" "Stampanti" "Eden" \
  "/images/legacy/hardware/eden-max20.jpg" \
  "Stampante termica Eden Max 20 — comande veloci" \
  "Stampante termica per comande cucina. 80mm, taglierina automatica, alta velocita." "false" \
  "Tipo" "Termica diretta" \
  "Larghezza carta" "80 mm" \
  "Velocita" "250 mm/sec" \
  "Taglierina" "Automatica" \
  "Connettivita" "USB + LAN + RS232" \
  "Garanzia" "24 mesi"

write_product "eden-max30" \
  "Eden Max 30" "Stampanti" "Eden" \
  "/images/legacy/hardware/eden-max30.jpg" \
  "Stampante termica Eden Max 30 — alto volume" \
  "Stampante termica top di gamma per ristoranti ad alto volume. 80mm, WiFi integrato." "false" \
  "Tipo" "Termica diretta" \
  "Larghezza carta" "80 mm" \
  "Velocita" "300 mm/sec" \
  "Connettivita" "USB + LAN + WiFi + Bluetooth" \
  "Garanzia" "24 mesi"

write_product "eden-maxi21" \
  "Eden Maxi 21" "Stampanti" "Eden" \
  "/images/legacy/hardware/eden-maxi21.jpg" \
  "Stampante fiscale Eden Maxi 21 — Registratore Telematico" \
  "Registratore Telematico per cassa fiscale. Conforme normativa RT 2026, integrazione GeRi PMS." "true" \
  "Tipo" "Registratore Telematico" \
  "Conformita" "RT (Italia) — invio Agenzia Entrate" \
  "Larghezza carta" "57 / 80 mm" \
  "Connettivita" "USB + LAN + RS232" \
  "Display" "LCD lato cliente" \
  "Garanzia" "24 mesi"

write_product "eden-maxi50p" \
  "Eden Maxi 50P" "Stampanti" "Eden" \
  "/images/legacy/hardware/eden-maxi50p.jpg" \
  "Registratore Telematico Eden Maxi 50P — versione professionale" \
  "RT versione PRO con stampante 80mm, ideale per attivita con scontrini lunghi (centri benessere, hotel)." "false" \
  "Tipo" "Registratore Telematico" \
  "Conformita" "RT (Italia)" \
  "Larghezza carta" "80 mm" \
  "Connettivita" "USB + LAN + RS232 + Bluetooth" \
  "Garanzia" "24 mesi"

write_product "tablet-eden-10" \
  "Tablet Eden 10 pollici" "Tablet" "Eden" \
  "/images/legacy/hardware/tablet-eden-10.jpg" \
  "Tablet Android 10 pollici per ordini e gestione sala" \
  "Tablet Android robusto per presa ordini, kitchen monitor o cassa secondaria. Custodia rinforzata." "false" \
  "Display" "10.1 pollici IPS HD" \
  "OS" "Android 13" \
  "RAM" "4 GB" \
  "Storage" "64 GB" \
  "Connettivita" "WiFi + Bluetooth, opz. 4G" \
  "Batteria" "7000 mAh" \
  "Garanzia" "24 mesi"

write_product "myprinter-p90" \
  "MyPrinter P90" "Stampanti" "Lasersoft" \
  "/images/legacy/hardware/myprinter-p90.jpg" \
  "Stampante termica MyPrinter P90 — entry level cucina" \
  "Stampante termica per comande cucina, formato compatto. Versione con connessione LAN/USB." "false" \
  "Tipo" "Termica diretta" \
  "Larghezza carta" "80 mm" \
  "Velocita" "200 mm/sec" \
  "Taglierina" "Automatica" \
  "Connettivita" "USB + LAN" \
  "Garanzia" "24 mesi"

write_product "myprinter-p90-wifi" \
  "MyPrinter P90 WiFi" "Stampanti" "Lasersoft" \
  "/images/legacy/hardware/myprinter-p90-wifi.jpg" \
  "Stampante termica MyPrinter P90 WiFi — versione wireless" \
  "Versione wireless della P90 per installazioni senza cavo. Ideale per ristoranti con cucina lontana dalla rete." "false" \
  "Tipo" "Termica diretta" \
  "Larghezza carta" "80 mm" \
  "Velocita" "200 mm/sec" \
  "Connettivita" "WiFi + USB" \
  "Garanzia" "24 mesi"

write_product "kitchen-monitor" \
  "Kitchen Monitor" "Kitchen monitor" "Lasersoft" \
  "/images/legacy/hardware/kitchen-monitor.jpg" \
  "Monitor cucina KDS — ordini su schermo, basta carta" \
  "Display 21 pollici per cucina. Sostituisce la stampante: ordini in tempo reale, tempi di servizio sempre sotto controllo, niente sprechi di carta." "true" \
  "Display" "21 pollici HD touch capacitivo" \
  "Montaggio" "VESA 100 + stand desktop" \
  "Resistenza" "Anti-grasso, anti-vapore IP54" \
  "Connettivita" "LAN + WiFi" \
  "Software" "KDS Lasersoft integrato GeRi" \
  "Garanzia" "24 mesi"

write_product "monitor-43-clearq" \
  "Monitor 43 pollici MyClearQ" "Kitchen monitor" "Lasersoft" \
  "/images/legacy/hardware/monitor-43-clearq.jpg" \
  "Display 43 pollici sala MyClearQ — ordini pronti per asporto" \
  "Display sala 43 pollici per asporto e MyClearQ: comunica al cliente lo stato dell'ordine in tempo reale. Riduce le code." "false" \
  "Display" "43 pollici 4K UHD" \
  "Software" "MyClearQ integrato" \
  "Connettivita" "LAN + WiFi" \
  "Montaggio" "Parete VESA / supporto a colonna" \
  "Garanzia" "24 mesi"

write_product "pager-trasmettitore" \
  "Pager trasmettitore" "Pager" "Lasersoft" \
  "/images/legacy/hardware/pager-trasmettitore.jpg" \
  "Sistema pager wireless — ordini pronti al cliente" \
  "Set pager wireless per chiamare cliente quando l'ordine e pronto. Ideale per asporto, ristoranti self-service, take-away." "false" \
  "Portata" "Fino a 300m in linea d'aria" \
  "Batteria" "Ricaricabile, autonomia 24h" \
  "Configurazione" "Trasmettitore + 10/20 pager" \
  "Notifica" "Vibrazione + LED + buzzer" \
  "Garanzia" "24 mesi"

write_product "mykiosk-27" \
  "MyKiosk 27 pollici" "Kiosk" "Lasersoft" \
  "/images/legacy/hardware/mykiosk-27.jpg" \
  "Kiosk autoservizio 27 pollici con stampante e scanner" \
  "Kiosk verticale autoservizio per asporto/ordinazione: 27 pollici touch, stampante 80mm, scanner barcode 2D. Riduce code e costi del personale." "true" \
  "Display" "27 pollici Full HD touch capacitivo" \
  "Form factor" "Verticale con base bloccante" \
  "Stampante" "80 mm integrata" \
  "Scanner" "Barcode 2D + QR code" \
  "OS" "Android / Windows 10 IoT" \
  "Connettivita" "LAN + WiFi" \
  "Garanzia" "24 mesi"

write_product "lettore-presenze" \
  "Lettore presenze MyProxyAccess" "Lettori presenze" "Lasersoft" \
  "/images/legacy/hardware/lettore-presenze.jpg" \
  "Lettore presenze badge per gestione dipendenti" \
  "Sistema rilevazione presenze per personale: badge contactless, integrazione modulo Worktime di gestionale." "false" \
  "Tecnologia" "RFID 125kHz + Mifare" \
  "Capacita" "10000 utenti, 100000 timbrature" \
  "Display" "OLED informativo" \
  "Connettivita" "LAN + WiFi + USB" \
  "Software" "Integrazione Worktime + buste paga" \
  "Garanzia" "24 mesi"

write_product "serratura-smart" \
  "Serratura smart" "Serrature" "Lasersoft" \
  "/images/legacy/hardware/serratura-smart.jpg" \
  "Serratura elettronica per camere hotel — apertura SMS/WhatsApp/card" \
  "Serratura smart per camere d'hotel: apertura via SMS, WhatsApp, card RFID o codice numerico. Integrata con PMS per check-in/out automatici." "true" \
  "Apertura" "SMS, WhatsApp, card RFID, PIN, app" \
  "Materiale" "Acciaio inox" \
  "Alimentazione" "4 batterie AA — 1 anno" \
  "Compatibilita" "Porte standard 35-55mm spessore" \
  "Integrazione" "PMS Hotel Automation Cloud" \
  "Garanzia" "24 mesi"

write_product "tastierino-smart" \
  "Tastierino smart" "Serrature" "Lasersoft" \
  "/images/legacy/hardware/tastierino-smart.jpg" \
  "Tastierino apri-porta con codice PIN" \
  "Tastierino PIN da abbinare a serratura smart per apertura da codice numerico. Ideale per personale di servizio e gestione codici temporanei." "false" \
  "Codici" "Fino a 200 codici programmabili" \
  "Display" "LCD retroilluminato" \
  "Alimentazione" "Batteria AA + cablato" \
  "Resistenza" "IP54 outdoor" \
  "Garanzia" "24 mesi"

echo ""
echo "Scritti $(ls -1 $ROOT/*.mdx | wc -l) file MDX in $ROOT/"
