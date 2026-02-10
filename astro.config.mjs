// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import { SITE_URL } from './site.config.mjs';

const site = SITE_URL.replace(/\/+$/, '');
const LEGACY_CALCULATOR_PATHS = [
  /^\/calculateurs(\/|$)/,
  /^\/en\/calculateurs(\/|$)/,
  /^\/(budget-mensuel|epargne-automatique|interets-composes|impot-revenu|economies-petites-depenses|pourboire|partage-addition)\/?$/,
  /^\/en\/(budget-mensuel|epargne-automatique|interets-composes|impot-revenu|economies-petites-depenses|pourboire|partage-addition)\/?$/,
];

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
          if (pathname.includes('404')) return false;
          if (LEGACY_CALCULATOR_PATHS.some((pattern) => pattern.test(pathname))) return false;
          return true;
        } catch {
          if (page.includes('404')) return false;
          return !LEGACY_CALCULATOR_PATHS.some((pattern) => pattern.test(page));
        }
      },
    }),
  ],
});
