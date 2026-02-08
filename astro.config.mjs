// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import { SITE_URL } from './site.config.mjs';

const site = SITE_URL.replace(/\/+$/, '');

// https://astro.build/config
export default defineConfig({
  site,
  integrations: [
    react(),
    tailwind(),
    sitemap({
      filter: (page) => {
        try {
          const pathname = new URL(page).pathname;
          return !pathname.includes('404');
        } catch {
          return !page.includes('404');
        }
      },
    }),
  ],
});
