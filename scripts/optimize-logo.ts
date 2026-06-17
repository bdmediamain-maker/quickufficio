// scripts/optimize-logo.ts
// Comprime il logo Quickufficio + rimuove il fondo bianco (chroma-key).
// Sorgente: C:\Users\ervin\Downloads\logo quickufficio.png
// Output: public/images/brand/logo-{32|64|128|256|512}.{png|webp}
//
// Strategia chroma-key:
// - Per ogni pixel: se R,G,B sono tutti > soglia → alpha=0 (trasparente)
// - Se sono tutti molto chiari ma con leggero color cast → fade alpha proporzionalmente
// Evita aloni grazie a soft threshold.

import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';
import { join } from 'node:path';

const SRC = 'C:/Users/ervin/Downloads/logo quickufficio.png';
const OUT = 'public/images/brand';

const sizes = [32, 64, 128, 256, 512];

// Soglie chroma-key: pixel con luminosità > UPPER → trasparenti
// pixel tra LOWER e UPPER → semi-trasparenti (anti-alias)
const UPPER = 245;
const LOWER = 210;

async function removeWhiteBackground(srcPath: string): Promise<Buffer> {
  // Estrae raw pixels per manipolazione alpha
  const { data, info } = await sharp(srcPath)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const channels = info.channels; // dovrebbe essere 4 (RGBA)
  const pixels = new Uint8Array(data);

  for (let i = 0; i < pixels.length; i += channels) {
    const r = pixels[i];
    const g = pixels[i + 1];
    const b = pixels[i + 2];
    // Luminosità percepita (più peso al verde)
    const lum = 0.299 * r + 0.587 * g + 0.114 * b;
    // Saturazione: differenza tra max e min canale
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const sat = max - min;

    if (lum > UPPER && sat < 25) {
      // Bianco/quasi-bianco e desaturato → trasparente
      pixels[i + 3] = 0;
    } else if (lum > LOWER && sat < 30) {
      // Soft falloff tra LOWER e UPPER
      const t = (lum - LOWER) / (UPPER - LOWER);
      pixels[i + 3] = Math.round(255 * (1 - t));
    }
  }

  // Ricostruisce PNG dai raw pixels
  return sharp(pixels, {
    raw: {
      width: info.width,
      height: info.height,
      channels: channels as 1 | 2 | 3 | 4,
    },
  })
    .png()
    .toBuffer();
}

async function main() {
  await mkdir(OUT, { recursive: true });

  console.log('▸ Rimozione fondo bianco (chroma-key)...');
  const transparentBuf = await removeWhiteBackground(SRC);
  console.log(`  ✓ Transparent master: ${(transparentBuf.length / 1024).toFixed(0)}KB\n`);

  // Trim per ridurre il bounding box agli effettivi pixel del logo (no white space attorno)
  const trimmedBuf = await sharp(transparentBuf)
    .trim({ threshold: 10 })
    .toBuffer();

  const trimmedMeta = await sharp(trimmedBuf).metadata();
  console.log(`▸ Master trimmed: ${trimmedMeta.width}x${trimmedMeta.height}\n`);

  console.log('▸ Generazione varianti multi-size...');
  for (const w of sizes) {
    const pngPath = join(OUT, `logo-${w}.png`);
    const pngBuf = await sharp(trimmedBuf)
      .resize({ width: w, withoutEnlargement: false, fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png({ compressionLevel: 9, quality: 90 })
      .toBuffer();
    await sharp(pngBuf).toFile(pngPath);

    const webpPath = join(OUT, `logo-${w}.webp`);
    const webpBuf = await sharp(trimmedBuf)
      .resize({ width: w, withoutEnlargement: false, fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .webp({ quality: 90, effort: 6, alphaQuality: 100 })
      .toBuffer();
    await sharp(webpBuf).toFile(webpPath);

    console.log(`  ✓ ${w}px  png ${(pngBuf.length / 1024).toFixed(0)}KB · webp ${(webpBuf.length / 1024).toFixed(0)}KB`);
  }

  // Salva anche il master full-size trimmed
  const fullPath = join(OUT, 'logo-full.png');
  await sharp(trimmedBuf).png({ compressionLevel: 9 }).toFile(fullPath);
  console.log(`  ✓ full  ${(trimmedBuf.length / 1024).toFixed(0)}KB`);

  console.log(`\n═══ Logo ottimizzato in ${OUT}/ ═══`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
