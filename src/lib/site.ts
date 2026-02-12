import { SITE_URL as BASE_SITE_URL } from '../../site.config.mjs';

export const siteConfig = {
  siteName: "Calcery",
  siteUrl: BASE_SITE_URL,
  siteEmail: "contact@calcery.com",
  editorName: "Maison Ellis",
  legalRepresentative: "Sacla Medesse Emmanuella Ingrid",
  rcsNumber: "RCS Paris 938 302 239",
  companyActivity: "Vente en ligne de différents produits",
  domiciliationProvider: "LEGALPLACE",
  domiciliationRcs: "RCS 814 428 785",
  editorAddress: "60 rue François Ier, 75008 Paris",
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
