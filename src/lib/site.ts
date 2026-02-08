import { SITE_URL as BASE_SITE_URL } from '../../site.config.mjs';

export const siteConfig = {
  siteName: "Calcery",
  siteUrl: BASE_SITE_URL,
  siteEmail: "ingridsacla@gmail.com",
  editorName: "Maison Ellis",
  editorAddress: "60 Rue François 1er, 75008 Paris, France",
  hostingProvider: "Cloudflare Pages",
  lastUpdated: "2026-02-01",
};

export const SITE_URL = siteConfig.siteUrl.replace(/\/+$/, '');

export function toAbsoluteUrl(path: string): string {
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
}
