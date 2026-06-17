import { chromium } from 'playwright';
const URL = 'https://www.quickufficio.com/pages/applicazione-per-leggere-menu-ristorante_qrcode';
const OUT = 'public/images/legacy/screenshots';
const main = async () => {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/130 Safari/537.36',
  });
  const p = await ctx.newPage();
  await p.goto(URL, { waitUntil: 'load', timeout: 90000 });
  await p.waitForTimeout(3000);
  await p.screenshot({ path: `${OUT}/my-self-order-fullpage.png`, fullPage: true });
  await p.screenshot({ path: `${OUT}/my-self-order-fold.png` });
  await ctx.close();
  const mctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 });
  const mp = await mctx.newPage();
  await mp.goto(URL, { waitUntil: 'load', timeout: 90000 });
  await mp.waitForTimeout(3000);
  await mp.screenshot({ path: `${OUT}/my-self-order-mobile.png`, fullPage: true });
  await mctx.close();
  await browser.close();
  console.log('✓ my-self-order recovered');
};
main().catch((e) => { console.error(e); process.exit(1); });
