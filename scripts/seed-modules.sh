#!/bin/bash
# Genera moduli software hotel + ristoranti in src/content/modules/
set -e
ROOT="src/content/modules"
mkdir -p "$ROOT"

write_module() {
  local slug="$1"; local title="$2"; local sector="$3"
  local group="$4"; local icon="$5"; local order="$6"
  local short="$7"
  {
    echo "---"
    echo "title: \"$title\""
    echo "sector: \"$sector\""
    echo "group: \"$group\""
    echo "icon: \"$icon\""
    echo "order: $order"
    echo "shortDescription: \"$short\""
    echo "---"
    echo ""
  } > "$ROOT/$slug.mdx"
}

# ============ RISTORANTI — 23 moduli ============

# Vendita & Cassa
write_module "ri-geri-pms" "GeRi PMS" "Ristoranti" "Vendita & Cassa" "ChefHat" 1 \
  "Il software gestionale completo per ristoranti: cassa, comande, magazzino, contabilita."
write_module "ri-modulo-rt" "Modulo RT" "Ristoranti" "Vendita & Cassa" "FileText" 2 \
  "Registratore Telematico integrato. Invio automatico corrispettivi Agenzia Entrate."
write_module "ri-pos-bancario" "POS bancario" "Ristoranti" "Vendita & Cassa" "CreditCard" 3 \
  "Integrazione POS bancario: pagamento e chiusura conto in un tap, niente errori di battitura."
write_module "ri-cassetto-automatico" "Cassetto automatico" "Ristoranti" "Vendita & Cassa" "Box" 4 \
  "Apertura programmabile, controllo dei fondi cassa, riduzione errori e ammanchi."
write_module "ri-asporto" "Modulo Asporto" "Ristoranti" "Vendita & Cassa" "ShoppingBag" 5 \
  "Gestione ordini d'asporto via telefono, sito web, app. Storico clienti e tempi di consegna."

# Cliente & Ordini
write_module "ri-my-self-order" "My Self Order" "Ristoranti" "Cliente & Ordini" "QrCode" 6 \
  "Menu QR code: il cliente ordina dal proprio cellulare. Riduce attese, aumenta ticket medio."
write_module "ri-menu-digitale" "Menu digitale" "Ristoranti" "Cliente & Ordini" "BookOpen" 7 \
  "Menu digitale interattivo con foto, allergeni, traduzioni. Aggiornamento real-time."
write_module "ri-prenotazione-tavoli" "Prenotazione tavoli" "Ristoranti" "Cliente & Ordini" "Calendar" 8 \
  "Sistema prenotazione online con conferma email, gestione sala, sovrapposizione turni."
write_module "ri-kitchen-monitor" "Kitchen monitor" "Ristoranti" "Cliente & Ordini" "Monitor" 9 \
  "Display cucina KDS: ordini in tempo reale, niente piu carta, tempi di preparazione tracciati."
write_module "ri-waiter-call" "Waiter call" "Ristoranti" "Cliente & Ordini" "Bell" 10 \
  "Pulsante a tavolo per chiamare il cameriere. Niente attese al banco, servizio efficiente."
write_module "ri-myclearq" "My ClearQ" "Ristoranti" "Cliente & Ordini" "Monitor" 11 \
  "Display sala che mostra ordini pronti per asporto. Riduce code e confusione al ritiro."
write_module "ri-fattorini" "Gestione fattorini" "Ristoranti" "Cliente & Ordini" "Bike" 12 \
  "Assegnazione consegne, mappa percorsi, tracking in tempo reale. Storico per area geografica."

# Marketing & Fidelity
write_module "ri-fidelity-card" "Fidelity Card" "Ristoranti" "Marketing & Fidelity" "Award" 13 \
  "Programma fedelta digitale: punti, sconti, premi. Tutto integrato in cassa senza tessere fisiche."
write_module "ri-my-crm" "My CRM" "Ristoranti" "Marketing & Fidelity" "Users" 14 \
  "Anagrafica clienti, segmentazione, campagne email/SMS. Conoscere il cliente fa la differenza."
write_module "ri-modulo-translate" "Modulo Translate" "Ristoranti" "Marketing & Fidelity" "Languages" 15 \
  "Menu digitale in 30+ lingue, traduzione automatica con revisione umana. Per turisti internazionali."
write_module "ri-digital-signage" "Digital Signage" "Ristoranti" "Marketing & Fidelity" "Tv" 16 \
  "Display promozionali in sala: piatti del giorno, offerte happy hour, eventi. Controllo da remoto."

# Operations
write_module "ri-gestione-accessi" "Gestione accessi" "Ristoranti" "Operations" "Lock" 17 \
  "Controllo accessi personale: badge, orari, permessi. Integrato modulo Worktime e buste paga."
write_module "ri-bilance" "Collegamento bilance" "Ristoranti" "Operations" "Scale" 18 \
  "Bilance professionali integrate: pesatura automatica, etichette, controllo HACCP."
write_module "ri-presa-ordinazioni" "Presa ordinazioni" "Ristoranti" "Operations" "Smartphone" 19 \
  "Palmari Android per cameriere: ordini al tavolo direttamente in cucina. Zero errori di trascrizione."
write_module "ri-contabili" "Esportazione contabili" "Ristoranti" "Operations" "Calculator" 20 \
  "Export automatico verso commercialista: prima nota, IVA, F24. Tutti i tracciati standard italiani."
write_module "ri-magazzino" "Magazzino" "Ristoranti" "Operations" "Package" 21 \
  "Gestione magazzino: scorte, inventari, ordini fornitori. Allarmi sotto soglia, controllo deperibilita."
write_module "ri-food-cost" "Food cost" "Ristoranti" "Operations" "DollarSign" 22 \
  "Calcolo food cost per piatto: ricetta, materie prime, margine. Sapere quanto guadagni davvero."
write_module "ri-report-vendite" "Report vendite" "Ristoranti" "Operations" "BarChart" 23 \
  "Dashboard vendite real-time: piatti piu venduti, orari di picco, performance per cameriere."

# ============ HOTEL — 23 moduli ============

# Core PMS
write_module "ho-pms" "PMS Hotel" "Hotel" "Core PMS" "Hotel" 1 \
  "Property Management System cloud: prenotazioni, check-in/out, tariffe, planning camere."
write_module "ho-modulo-rt" "Modulo RT" "Hotel" "Core PMS" "FileText" 2 \
  "Registratore Telematico per cassa hotel. Conformita normativa italiana."
write_module "ho-mycloudhub" "MyCloudHub" "Hotel" "Core PMS" "Cloud" 3 \
  "Hub centrale dati: sincronizzazione tra strutture, multi-property, multi-utente."
write_module "ho-myfiscalcloud" "MyFiscalCloud" "Hotel" "Core PMS" "ShieldCheck" 4 \
  "Conservazione fiscale a norma. Backup automatico, export controllabile dall'Agenzia Entrate."
write_module "ho-cloud-recovery" "Cloud Recovery" "Hotel" "Core PMS" "RefreshCw" 5 \
  "Disaster recovery: ripristino dati < 1h. Zero rischio perdita prenotazioni e fatture."

# Distribuzione
write_module "ho-booking-engine" "Booking Engine" "Hotel" "Distribuzione" "Globe" 6 \
  "Motore prenotazioni sul tuo sito senza commissioni. Conversion-first, mobile-friendly."
write_module "ho-channel-manager" "Channel Manager" "Hotel" "Distribuzione" "Share2" 7 \
  "Sincronizzazione automatica Booking.com, Expedia, Airbnb. Zero overbooking, tariffe sempre allineate."

# CRM & Marketing
write_module "ho-crm-preventivi" "CRM Preventivi" "Hotel" "CRM & Marketing" "Mail" 8 \
  "Invio preventivi personalizzati con tracking apertura/click. Migliora conversion da richiesta a prenotazione."
write_module "ho-email-marketing" "CRM Email Marketing" "Hotel" "CRM & Marketing" "Send" 9 \
  "Campagne email segmentate: ospiti ricorrenti, compleanni, offerte stagionali."
write_module "ho-my-forecast" "My Forecast" "Hotel" "CRM & Marketing" "TrendingUp" 10 \
  "Previsioni occupazione e tariffe basate su storico, eventi locali, meteo. Revenue management semplificato."
write_module "ho-promo-coupon" "Motore Promo & Coupon" "Hotel" "CRM & Marketing" "Tag" 11 \
  "Crea codici sconto, offerte stagionali, pacchetti. Misurazione ROI per ogni campagna."

# Check-in/out
write_module "ho-web-checkin" "Modulo Web Check-In/Out" "Hotel" "Check-in/out" "LogIn" 12 \
  "Check-in online prima dell'arrivo, check-out smartphone. Zero coda alla reception."
write_module "ho-mysignup" "MySignUp" "Hotel" "Check-in/out" "FileCheck" 13 \
  "Schede ospite firmate digitalmente, invio automatico questura, archivio normativo."
write_module "ho-gdpr-service" "GDPR Service" "Hotel" "Check-in/out" "Shield" 14 \
  "Compliance GDPR completa: consensi, diritti ospiti, dossier per ispezioni Garante."

# Operations
write_module "ho-magazzino" "Magazzino" "Hotel" "Operations" "Package" 15 \
  "Gestione magazzino F&B, biancheria, prodotti puliz. Riordini automatici, controllo scadenze."
write_module "ho-contabilita-industriale" "Contabilita Industriale" "Hotel" "Operations" "Calculator" 16 \
  "Centri di costo per reparto, analisi marginalita, integrazione con commercialista."
write_module "ho-worktime" "Worktime" "Hotel" "Operations" "Clock" 17 \
  "Rilevazione presenze personale, turnazione, export buste paga. Compliance contratti collettivi."
write_module "ho-sale-meeting" "Sale Meeting" "Hotel" "Operations" "Users" 18 \
  "Gestione sale meeting/conferenze: prenotazioni, allestimenti, fatturazione separata."
write_module "ho-spa" "Centro Benessere & SPA" "Hotel" "Operations" "Sparkles" 19 \
  "Prenotazione trattamenti SPA, scheda terapista, listino servizi, voucher omaggio."
write_module "ho-myevents" "MyEvents" "Hotel" "Operations" "Star" 20 \
  "Gestione eventi privati: matrimoni, anniversari, eventi aziendali. Quotation e contratti automatici."
write_module "ho-mydesk" "MyDesk" "Hotel" "Operations" "Briefcase" 21 \
  "Front desk avanzato: housekeeping, manutenzioni, lost & found, comunicazione tra reparti."
write_module "ho-cassa-bar" "Cassa Bar/Ristorante" "Hotel" "Operations" "Coffee" 22 \
  "Cassa integrata per bar e ristorante interno hotel. Addebito automatico camera, controlli minibar."
write_module "ho-fidelity" "Fidelity Card Hotel" "Hotel" "Operations" "Award" 23 \
  "Programma fedelta hotel: tariffe loyalty, upgrade premio, status clienti ricorrenti."

echo ""
echo "Scritti $(ls -1 $ROOT/*.mdx | wc -l) moduli MDX in $ROOT/"
