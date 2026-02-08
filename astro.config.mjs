// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

const site = (process.env.SITE_URL || 'https://calcery.com').replace(/\/+$/, '');

// https://astro.build/config
export default defineConfig({
  site,
  integrations: [react(), tailwind(), sitemap()],
});
