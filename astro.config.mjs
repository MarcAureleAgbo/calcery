// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import { SITE_URL } from './site.config.mjs';

const site = SITE_URL.replace(/\/+$/, '');

const STATIC_PATHS = new Set([
  '/',
  '/fr/calculateurs',
  '/en',
  '/en/calculators',
  '/a-propos',
  '/contact',
  '/confidentialite',
]);

const CATEGORY_PATHS = new Set([
  '/fr/finance',
  '/fr/sante',
  '/fr/immobilier',
  '/fr/vie-pratique',
  '/fr/maison-travaux',
  '/fr/education',
  '/en/finance',
  '/en/health',
  '/en/real-estate',
  '/en/daily-life',
  '/en/home',
  '/en/education',
]);

const BLOG_INDEX_PATHS = new Set(['/blog', '/en/blog']);

const BLOG_POST_PATH_RE = /^\/(?:blog|en\/blog)\/[^/]+$/;

const CALCULATOR_FR_PATH_RE =
  /^\/fr\/(?:finance|sante|immobilier|vie-pratique|maison-travaux|education)\/[^/]+$/;
const CALCULATOR_EN_PATH_RE =
  /^\/en\/(?:finance|health|real-estate|daily-life|home|education)\/[^/]+$/;

const normalizePathname = (value) => {
  let pathname;
  try {
    pathname = new URL(value).pathname;
  } catch {
    pathname = value;
  }
  const cleaned = pathname.replace(/\/+$/, '');
  return cleaned === '' ? '/' : cleaned;
};

const isAllowedSitemapPath = (pathname) => {
  if (STATIC_PATHS.has(pathname)) return true;
  if (CATEGORY_PATHS.has(pathname)) return true;
  if (BLOG_INDEX_PATHS.has(pathname)) return true;
  if (BLOG_POST_PATH_RE.test(pathname)) return true;
  if (CALCULATOR_FR_PATH_RE.test(pathname)) return true;
  if (CALCULATOR_EN_PATH_RE.test(pathname)) return true;
  return false;
};

const getPriorityForPath = (pathname) => {
  if (CATEGORY_PATHS.has(pathname)) return 0.9;
  if (CALCULATOR_FR_PATH_RE.test(pathname) || CALCULATOR_EN_PATH_RE.test(pathname)) return 0.8;
  if (BLOG_INDEX_PATHS.has(pathname) || BLOG_POST_PATH_RE.test(pathname)) return 0.7;
  if (STATIC_PATHS.has(pathname)) return 0.6;
  return undefined;
};

// https://astro.build/config
export default defineConfig({
  site,
  integrations: [
    react(),
    tailwind(),
    sitemap({
      filter: (page) => {
        const pathname = normalizePathname(page);
        return isAllowedSitemapPath(pathname);
      },
      serialize: (item) => {
        const pathname = normalizePathname(item.url);
        const priority = getPriorityForPath(pathname);
        if (priority === undefined) {
          return undefined;
        }
        return { ...item, priority };
      },
    }),
  ],
});
