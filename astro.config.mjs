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

const BLOG_INDEX_PATHS = new Set(['/fr/blog', '/en/blog']);
const SITEMAP_LASTMOD = '2026-04-03';
const FILE_PATH_RE = /\/[^/?#]+\.[a-z0-9]+$/i;

const BLOG_POST_PATH_RE = /^\/(?:fr|en)\/blog\/[^/]+$/;

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

const ensureTrailingSlashHref = (value) => {
  if (typeof value !== 'string' || !value.startsWith('/')) return value;

  const [pathAndQuery, hash = ''] = value.split('#');
  const [pathname, search = ''] = pathAndQuery.split('?');

  if (pathname === '/' || pathname.endsWith('/') || FILE_PATH_RE.test(pathname)) {
    return value;
  }

  return `${pathname}/${search ? `?${search}` : ''}${hash ? `#${hash}` : ''}`;
};

const rehypeTrailingSlashInternalLinks = () => {
  const visit = (node) => {
    if (!node || typeof node !== 'object') return;

    if (node.type === 'element' && node.tagName === 'a' && node.properties && typeof node.properties.href === 'string') {
      node.properties.href = ensureTrailingSlashHref(node.properties.href);
    }

    if (node.type === 'raw' && typeof node.value === 'string') {
      node.value = node.value.replace(/href="(\/[^"]*)"/g, (_, href) => `href="${ensureTrailingSlashHref(href)}"`);
    }

    if (Array.isArray(node.children)) {
      node.children.forEach(visit);
    }
  };

  return (tree) => visit(tree);
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
  trailingSlash: 'always',
  markdown: {
    rehypePlugins: [rehypeTrailingSlashInternalLinks],
  },
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
        return {
          ...item,
          changefreq: 'monthly',
          lastmod: SITEMAP_LASTMOD,
          priority,
        };
      },
    }),
  ],
});
