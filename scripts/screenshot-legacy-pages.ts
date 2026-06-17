// scripts/screenshot-legacy-pages.ts
// Brief §8.2 — cattura screenshot del sito attuale come visual reference
// per la ricostruzione delle sezioni nella Fase 2.

import { chromium } from 'playwright';
import { mkdir } from 'node:fs/promises';
import { join } from 'node:path';

const PAGES = [
  { url: 'https://www.quickufficio.com/',                                                              name: 'homepage' },
  { url: 'https://www.quickufficio.com/pages/chi_siamo',                                               name: 'chi-siamo' },
  { url: 'https://www.quickufficio.com/pages/automatizza-ristorante',                                  name: 'ristoranti' },
  { url: 'https://www.quickufficio.com/pages/automatizza-hotel',                                       name: 'hotel' },
  { url: 'https://www.quickufficio.com/pages/hardware-automatizza-ristorante',                         name: 'hardware' },
  { url: 'https://www.quickufficio.com/pages/applicazione-per-leggere-menu-ristorante_qrcode',         name: 'my-self-order' },
  { url: 'https://www.quickufficio.com/pages/cosa-facciamo-applicazioni-per-leggere-menu-ristorante-hotel', name: 'cosa-facciamo' },
];

const OUT = 'public/images/legacy/screenshots';

async function main() {
  await mkdir(OUT, { recursive: true });
  const browser = await chromium.launch();

  let ok = 0;
  let err = 0;

  for (const page of PAGES) {
    console.log(`→ Capturing ${page.name}...`);
    try {
      const ctx = await browser.newContext({
        viewport: { width: 1440, height: 900 },
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36',
      });
      const tab = await ctx.newPage();

      await tab.goto(page.url, { waitUntil: 'networkidle', timeout: 60_000 });
      await tab.waitForTimeout(2000);

      await tab.screenshot({
        path: join(OUT, `${page.name}-fullpage.png`),
        fullPage: true,
      });
      await tab.screenshot({
        path: join(OUT, `${page.name}-fold.png`),
        fullPage: false,
      });

      await ctx.close();

      const mobileCtx = await browser.newContext({
        viewport: { width: 390, height: 844 },
        deviceScaleFactor: 2,
        userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1',
      });
      const mobileTab = await mobileCtx.newPage();
      await mobileTab.goto(page.url, { waitUntil: 'networkidle', timeout: 60_000 });
      await mobileTab.waitForTimeout(2000);
      await mobileTab.screenshot({
        path: join(OUT, `${page.name}-mobile.png`),
        fullPage: true,
      });
      await mobileCtx.close();

      console.log(`  ✓ ${page.name}: desktop fold+fullpage + mobile fullpage`);
      ok++;
    } catch (e) {
      console.error(`  ✗ ${page.name}:`, (e as Error).message);
      err++;
    }
  }

  await browser.close();
  console.log(`\n═══ Screenshot complete: ${ok} ok, ${err} err. Output: ${OUT} ═══`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
