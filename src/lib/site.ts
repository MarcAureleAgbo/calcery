export const siteConfig = {
  siteName: "Calcery",
  siteUrl: "https://calcery.com",
  siteEmail: "ingridsacla@gmail.com",
  editorName: "Maison Ellis",
  editorAddress: "60 Rue François 1er, 75008 Paris, France",
  hostingProvider: "Cloudflare Pages",
  lastUpdated: "2026-02-01",
};

const envSiteUrl = typeof import.meta !== 'undefined' ? import.meta.env?.SITE_URL : undefined;

export const SITE_URL = (envSiteUrl || siteConfig.siteUrl).replace(/\/+$/, '');

export function toAbsoluteUrl(path: string): string {
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
}
