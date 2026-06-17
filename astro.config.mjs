import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import netlify from '@astrojs/netlify';

export default defineConfig({
  site: 'https://quickufficio.com',
  output: 'static',
  adapter: netlify(),
  prefetch: { prefetchAll: false, defaultStrategy: 'hover' },
  server: { port: 3014, host: true },
  integrations: [
    mdx(),
    react(),
    sitemap({
      filter: (page) => !page.includes('/api/'),
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  image: {
    domains: ['d1n7pvm7k6elmp.cloudfront.net'],
  },
  redirects: {
    '/pages/chi_siamo': '/chi-siamo',
    '/pages/automatizza-ristorante': '/ristoranti',
    '/pages/automatizza-hotel': '/hotel',
    '/pages/hardware-automatizza-ristorante': '/hardware',
    '/pages/applicazione-per-leggere-menu-ristorante_qrcode': '/my-self-order',
    '/pages/cosa-facciamo-applicazioni-per-leggere-menu-ristorante-hotel': '/',
  },
});
