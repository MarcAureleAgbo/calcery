import { SITE_URL as BASE_SITE_URL } from '../../site.config.mjs';

export const siteConfig = {
  siteName: "Calcery",
  siteUrl: BASE_SITE_URL,
  siteEmail: "ingridsacla@gmail.com",
  editorName: "Maison Ellis",
  editorAddress: "60 Rue François 1er, 75008 Paris, France",
  hostingProvider: "Cloudflare Pages (Cloudflare, Inc.)",
  hostingAddress: "101 Townsend St, San Francisco, CA 94107, USA",
  analyticsProvider: "Google Analytics 4 (Google Ireland Ltd / Google LLC)",
  analyticsId: "G-78C5EBM22T",
  lastUpdated: "2026-02-08",
};

export const SITE_URL = siteConfig.siteUrl.replace(/\/+$/, '');

export function toAbsoluteUrl(path: string): string {
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
}
