// scripts/optimize-hero.ts
// Comprime + genera varianti responsive della foto hero homepage.
// Sorgente: C:\Users\ervin\Downloads\hero quickufficio.jpg
// Output: public/images/hero/restaurant-{1920|1280|768|400}.{webp|avif|jpg}

import sharp from 'sharp';
import { mkdir, stat } from 'node:fs/promises';
import { join } from 'node:path';

const SRC = 'C:/Users/ervin/Downloads/hero quickufficio.jpg';
const OUT = 'public/images/hero';

const widths = [400, 768, 1280, 1920];

async function main() {
  await mkdir(OUT, { recursive: true });
  const srcStat = await stat(SRC);
  const srcMeta = await sharp(SRC).metadata();
  console.log(`Sorgente: ${(srcStat.size / 1024 / 1024).toFixed(2)} MB · ${srcMeta.width}x${srcMeta.height} · ${srcMeta.format}`);
  console.log('');

  for (const w of widths) {
    // WebP — qualità 78 è il sweet spot per fotografie
    const webpPath = join(OUT, `restaurant-${w}.webp`);
    const webpBuf = await sharp(SRC)
      .resize({ width: w, withoutEnlargement: true })
      .webp({ quality: 78, effort: 6 })
      .toBuffer();
    await sharp(webpBuf).toFile(webpPath);

    // AVIF — qualità 60 (formato più efficiente)
    const avifPath = join(OUT, `restaurant-${w}.avif`);
    const avifBuf = await sharp(SRC)
      .resize({ width: w, withoutEnlargement: true })
      .avif({ quality: 55, effort: 6 })
      .toBuffer();
    await sharp(avifBuf).toFile(avifPath);

    // JPG fallback per browser legacy
    const jpgPath = join(OUT, `restaurant-${w}.jpg`);
    const jpgBuf = await sharp(SRC)
      .resize({ width: w, withoutEnlargement: true })
      .jpeg({ quality: 80, mozjpeg: true, progressive: true })
      .toBuffer();
    await sharp(jpgBuf).toFile(jpgPath);

    const webpKB = (webpBuf.length / 1024).toFixed(0);
    const avifKB = (avifBuf.length / 1024).toFixed(0);
    const jpgKB = (jpgBuf.length / 1024).toFixed(0);
    console.log(`  ✓ ${w}px  webp ${webpKB}KB · avif ${avifKB}KB · jpg ${jpgKB}KB`);
  }

  // Generate also a low-quality placeholder (LQIP) base64 for blur-up
  const lqipBuf = await sharp(SRC)
    .resize({ width: 32 })
    .webp({ quality: 30 })
    .toBuffer();
  const lqip = `data:image/webp;base64,${lqipBuf.toString('base64')}`;
  console.log(`\n  ✓ LQIP base64: ${lqipBuf.length}B`);
  console.log(`\n${lqip}\n`);

  console.log(`\n═══ Hero ottimizzata in ${OUT}/ ═══`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
