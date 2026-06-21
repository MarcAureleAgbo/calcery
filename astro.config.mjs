// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import { unified } from '@astrojs/markdown-remark';
import { SITE_URL } from './site.config.mjs';

const site = SITE_URL.replace(/\/+$/, '');
const FILE_PATH_RE = /\/[^/?#]+\.[a-z0-9]+$/i;

/** @param {string} value */
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
  /** @param {any} node */
  const visit = (node) => {
    if (!node || typeof node !== 'object') return;

    if (node.type === 'element' && node.tagName === 'a' && node.properties && typeof node.properties.href === 'string') {
      node.properties.href = ensureTrailingSlashHref(node.properties.href);
    }

    if (node.type === 'raw' && typeof node.value === 'string') {
      node.value = node.value.replace(
        /href="(\/[^"]*)"/g,
        /** @param {string} _ @param {string} href */
        (_, href) => `href="${ensureTrailingSlashHref(href)}"`,
      );
    }

    if (Array.isArray(node.children)) {
      node.children.forEach(visit);
    }
  };

  /** @param {any} tree */
  return (tree) => visit(tree);
};

// https://astro.build/config
export default defineConfig({
  site,
  trailingSlash: 'always',
  markdown: {
    processor: unified({
      rehypePlugins: [rehypeTrailingSlashInternalLinks],
    }),
  },
  integrations: [
    react(),
  ],
});
