// scripts/generate-og-images.ts
// Genera OG image statiche per ogni pagina principale.
// Output: public/images/og/*.png
//
// Uso: pnpm tsx scripts/generate-og-images.ts

import sharp from 'sharp';
import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const OUT = 'public/images/og';

interface OGSpec {
  filename: string;
  badge: string;
  title: string;
  subtitle: string;
  colorTop: string;
  colorBottom: string;
}

const specs: OGSpec[] = [
  { filename: 'default.png',       badge: 'Quickufficio · Ho.Re.Ca Italia', title: 'Software e hardware Ho.Re.Ca italiano',     subtitle: '0122 675000 · Sergio',                    colorTop: '#C04ECF', colorBottom: '#800080' },
  { filename: 'homepage.png',      badge: 'Quickufficio',                  title: 'Più controllo, più guadagno, più tempo libero', subtitle: 'Ho.Re.Ca · Italia · 20 anni di esperienza', colorTop: '#C04ECF', colorBottom: '#800080' },
  { filename: 'ristoranti.png',    badge: 'GeRì PMS',                      title: 'Il ristorante che funziona senza di te',     subtitle: '23 moduli · cassa · comande · food cost',  colorTop: '#D08AD0', colorBottom: '#800080' },
  { filename: 'hotel.png',         badge: 'Hotel Automation Cloud',        title: "L'unica soluzione All-in-One per hotel",      subtitle: 'PMS · Channel · CRM · da 120€/mese',       colorTop: '#A040A0', colorBottom: '#5C005C' },
  { filename: 'hardware.png',      badge: 'Hardware professionale',        title: 'POS, RT, Kiosk, palmari, serrature smart',   subtitle: '20+ prodotti · garanzia 24 mesi',          colorTop: '#E0B0E8', colorBottom: '#B070D0' },
  { filename: 'my-self-order.png', badge: 'My Self Order',                 title: 'Il cliente ordina dal cellulare',            subtitle: 'Menu QR code · da 25€/mese',               colorTop: '#B040A0', colorBottom: '#6B005A' },
  { filename: 'chi-siamo.png',     badge: 'Chi siamo · Susa (TO)',         title: 'Una vita per automatizzare Ho.Re.Ca italiano', subtitle: 'Sergio · 20 anni · 100+ clienti',         colorTop: '#C04ECF', colorBottom: '#800080' },
  { filename: 'prenota-demo.png',  badge: 'Demo gratuita',                 title: 'Parla con Sergio. 30-60 minuti.',            subtitle: 'Niente venditori. Niente pitch.',          colorTop: '#C04ECF', colorBottom: '#800080' },
  { filename: 'contatti.png',      badge: 'Contatti',                      title: 'Niente call center. Persone vere.',          subtitle: '0122 675000 · info@quickufficio.com',      colorTop: '#D08AD0', colorBottom: '#800080' },
  { filename: 'blog.png',          badge: 'Blog',                          title: 'Consigli pratici per Ho.Re.Ca italiano',     subtitle: 'Da chi vive il settore tutti i giorni',    colorTop: '#E0B0E8', colorBottom: '#B070D0' },
];

const W = 1200;
const H = 630;

const escapeSvg = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function svg(spec: OGSpec): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${spec.colorTop}"/>
      <stop offset="100%" stop-color="${spec.colorBottom}"/>
    </linearGradient>
    <radialGradient id="orb1" cx="50%" cy="50%">
      <stop offset="0%" stop-color="rgba(255,255,255,0.4)"/>
      <stop offset="100%" stop-color="rgba(255,255,255,0)"/>
    </radialGradient>
  </defs>

  <rect width="${W}" height="${H}" fill="#FFFFFF"/>

  <!-- Background gradient panel rounded -->
  <rect x="40" y="40" width="${W - 80}" height="${H - 80}" rx="48" fill="url(#bg)" opacity="0.95"/>

  <!-- Decorative orbs -->
  <circle cx="${W - 180}" cy="160" r="120" fill="url(#orb1)"/>
  <circle cx="${W - 60}" cy="${H - 80}" r="180" fill="rgba(255,255,255,0.12)"/>
  <circle cx="120" cy="${H - 100}" r="80" fill="rgba(255,255,255,0.18)"/>

  <!-- Logo top-left (placeholder rect — il logo PNG va sovrapposto in post se serve) -->
  <g transform="translate(96,96)">
    <rect width="72" height="72" rx="20" fill="rgba(255,255,255,0.95)"/>
    <text x="36" y="52" text-anchor="middle" font-family="Nunito, sans-serif" font-weight="900" font-size="42" fill="#800080">Q</text>
  </g>

  <!-- Badge -->
  <g transform="translate(96,200)">
    <rect x="0" y="0" width="${spec.badge.length * 10 + 36}" height="44" rx="22" fill="rgba(255,255,255,0.95)"/>
    <text x="${spec.badge.length * 5 + 18}" y="29" text-anchor="middle" font-family="Nunito, sans-serif" font-weight="800" font-size="16" fill="#1A0F1F" letter-spacing="1">
      ${escapeSvg(spec.badge.toUpperCase())}
    </text>
  </g>

  <!-- Title -->
  <foreignObject x="96" y="280" width="${W - 192}" height="200">
    <div xmlns="http://www.w3.org/1999/xhtml" style="font-family: Nunito, sans-serif; font-weight: 900; font-size: 64px; color: #FFFFFF; line-height: 1.05; letter-spacing: -0.01em;">
      ${escapeSvg(spec.title)}
    </div>
  </foreignObject>

  <!-- Subtitle -->
  <foreignObject x="96" y="${H - 160}" width="${W - 192}" height="80">
    <div xmlns="http://www.w3.org/1999/xhtml" style="font-family: 'DM Sans', sans-serif; font-weight: 500; font-size: 28px; color: rgba(255,253,248,0.92); line-height: 1.3;">
      ${escapeSvg(spec.subtitle)}
    </div>
  </foreignObject>

  <!-- Footer -->
  <text x="96" y="${H - 56}" font-family="Nunito, sans-serif" font-weight="800" font-size="20" fill="rgba(255,253,248,0.85)">quickufficio.com</text>
  <text x="${W - 96}" y="${H - 56}" text-anchor="end" font-family="Nunito, sans-serif" font-weight="800" font-size="20" fill="rgba(255,253,248,0.85)">0122 675000</text>
</svg>`;
}

async function main() {
  await mkdir(OUT, { recursive: true });
  for (const spec of specs) {
    const svgBuffer = Buffer.from(svg(spec));
    const png = await sharp(svgBuffer).png().toBuffer();
    await writeFile(join(OUT, spec.filename), png);
    console.log(`  ✓ ${spec.filename}`);
  }
  console.log(`\n═══ ${specs.length} OG images generate in ${OUT} ═══`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
