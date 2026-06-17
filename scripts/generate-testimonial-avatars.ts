// scripts/generate-testimonial-avatars.ts
// Genera avatar illustrati (PNG) per testimonial in attesa di foto reali.
// Brief §6: "meglio nessuna foto che una foto stock evidente" → niente stock.
// Le illustrazioni sono chiaramente non-fotografiche (gradient + iniziale + decoro).
//
// Uso: pnpm tsx scripts/generate-testimonial-avatars.ts

import sharp from 'sharp';
import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const OUT = 'public/images/testimonials';
const SIZE = 256;

interface AvatarSpec {
  filename: string;
  initial: string;
  // Gradient palette Hospitality Clay
  colorTop: string;
  colorMid: string;
  colorBottom: string;
  // Subtle decorative orb color
  decorColor: string;
}

const specs: AvatarSpec[] = [
  {
    filename: 'marco-avatar.png',
    initial: 'M',
    // Deep purple gradient — settore hotel
    colorTop: '#A040A0',
    colorMid: '#700070',
    colorBottom: '#5C005C',
    decorColor: 'rgba(255, 255, 255, 0.20)',
  },
  {
    filename: 'laura-avatar.png',
    initial: 'L',
    // Light purple → primary purple gradient — settore bar/pasticceria
    colorTop: '#D08AD0',
    colorMid: '#B040B0',
    colorBottom: '#800080',
    decorColor: 'rgba(255, 255, 255, 0.22)',
  },
];

function svg(spec: AvatarSpec): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${SIZE}" height="${SIZE}" viewBox="0 0 ${SIZE} ${SIZE}">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${spec.colorTop}"/>
      <stop offset="55%" stop-color="${spec.colorMid}"/>
      <stop offset="100%" stop-color="${spec.colorBottom}"/>
    </linearGradient>
    <radialGradient id="glow" cx="35%" cy="30%" r="60%">
      <stop offset="0%" stop-color="rgba(255,255,255,0.35)"/>
      <stop offset="100%" stop-color="rgba(255,255,255,0)"/>
    </radialGradient>
    <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="2"/>
    </filter>
  </defs>

  <!-- Base circle gradient -->
  <circle cx="${SIZE / 2}" cy="${SIZE / 2}" r="${SIZE / 2}" fill="url(#bg)"/>

  <!-- Specular highlight (clay material) -->
  <circle cx="${SIZE / 2}" cy="${SIZE / 2}" r="${SIZE / 2}" fill="url(#glow)"/>

  <!-- Decorative orbs (clay micro-shapes) -->
  <circle cx="${SIZE * 0.78}" cy="${SIZE * 0.32}" r="${SIZE * 0.12}" fill="${spec.decorColor}"/>
  <circle cx="${SIZE * 0.20}" cy="${SIZE * 0.78}" r="${SIZE * 0.16}" fill="${spec.decorColor}"/>

  <!-- Initial letter — Nunito 900 -->
  <text
    x="${SIZE / 2}"
    y="${SIZE / 2 + SIZE * 0.06}"
    text-anchor="middle"
    dominant-baseline="middle"
    font-family="Nunito, -apple-system, system-ui, sans-serif"
    font-weight="900"
    font-size="${SIZE * 0.5}"
    fill="rgba(255, 253, 248, 0.96)"
    letter-spacing="-2"
    filter="url(#softShadow)"
  >${spec.initial}</text>

  <!-- Subtle inner ring -->
  <circle cx="${SIZE / 2}" cy="${SIZE / 2}" r="${SIZE / 2 - 4}" fill="none" stroke="rgba(255,255,255,0.10)" stroke-width="2"/>
</svg>`;
}

async function main() {
  await mkdir(OUT, { recursive: true });
  for (const spec of specs) {
    const svgBuffer = Buffer.from(svg(spec));
    const png = await sharp(svgBuffer).png().toBuffer();
    await writeFile(join(OUT, spec.filename), png);
    console.log(`  ✓ ${spec.filename}  (${SIZE}x${SIZE}, gradient ${spec.colorTop} → ${spec.colorBottom})`);
  }
  console.log(`\n═══ ${specs.length} testimonial avatars generati in ${OUT}/ ═══`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
