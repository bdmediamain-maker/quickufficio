// scripts/optimize-page-photos.ts
// Comprime le 16 foto Unsplash + genera varianti responsive AVIF/WebP/JPG.
// Sorgente: public/images/unsplash-raw/
// Output:
//   public/images/hero/{page}-{400|768|1280|1920}.{webp|avif|jpg}     (per backgroundImage hero)
//   public/images/page-cards/{page}-card-{400|768|1280}.{webp|avif|jpg}  (per le card)

import sharp from 'sharp';
import { mkdir, readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join } from 'node:path';

const RAW = 'public/images/unsplash-raw';
const HERO_OUT = 'public/images/hero';
const CARD_OUT = 'public/images/page-cards';

const pages = ['ristoranti', 'hotel', 'hardware', 'my-self-order', 'chi-siamo', 'prenota-demo', 'contatti', 'blog'];

const heroWidths = [400, 768, 1280, 1920];
const cardWidths = [400, 768, 1280];

async function optimize(srcPath: string, outDir: string, baseName: string, widths: number[]) {
  await mkdir(outDir, { recursive: true });
  if (!existsSync(srcPath)) {
    console.log(`  ⚠ ${baseName} — source missing, skipping`);
    return;
  }
  const srcBuf = await readFile(srcPath);
  const meta = await sharp(srcBuf).metadata();
  console.log(`  ▸ ${baseName}: ${meta.width}x${meta.height} (${(srcBuf.length / 1024).toFixed(0)}KB raw)`);

  for (const w of widths) {
    const webpPath = join(outDir, `${baseName}-${w}.webp`);
    const webpBuf = await sharp(srcBuf)
      .resize({ width: w, withoutEnlargement: true })
      .webp({ quality: 78, effort: 6 })
      .toBuffer();
    await sharp(webpBuf).toFile(webpPath);

    const avifPath = join(outDir, `${baseName}-${w}.avif`);
    const avifBuf = await sharp(srcBuf)
      .resize({ width: w, withoutEnlargement: true })
      .avif({ quality: 55, effort: 6 })
      .toBuffer();
    await sharp(avifBuf).toFile(avifPath);

    const jpgPath = join(outDir, `${baseName}-${w}.jpg`);
    const jpgBuf = await sharp(srcBuf)
      .resize({ width: w, withoutEnlargement: true })
      .jpeg({ quality: 80, mozjpeg: true, progressive: true })
      .toBuffer();
    await sharp(jpgBuf).toFile(jpgPath);

    console.log(`     ${w}px  avif ${(avifBuf.length / 1024).toFixed(0)}KB · webp ${(webpBuf.length / 1024).toFixed(0)}KB · jpg ${(jpgBuf.length / 1024).toFixed(0)}KB`);
  }
}

async function main() {
  console.log('▸ HERO backgrounds...\n');
  for (const page of pages) {
    await optimize(join(RAW, `${page}-hero.jpg`), HERO_OUT, page, heroWidths);
  }
  console.log('\n▸ CARD photos...\n');
  for (const page of pages) {
    await optimize(join(RAW, `${page}-card.jpg`), CARD_OUT, `${page}-card`, cardWidths);
  }
  console.log('\n═══ Ottimizzazione completata ═══');
}

main().catch((e) => { console.error(e); process.exit(1); });
