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

const FILE_PATH_RE = /\/[^/?#]+\.[a-z0-9]+$/i;

export function ensureTrailingSlashPath(path: string): string {
  if (!path) return '/';
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return ensureTrailingSlashUrl(path);
  }

  const [pathAndQuery, hash = ''] = path.split('#');
  const [pathnameRaw, search = ''] = pathAndQuery.split('?');
  const pathname = pathnameRaw || '/';

  if (pathname === '/' || FILE_PATH_RE.test(pathname) || pathname.endsWith('/')) {
    return `${pathname}${search ? `?${search}` : ''}${hash ? `#${hash}` : ''}`;
  }

  return `${pathname}/${search ? `?${search}` : ''}${hash ? `#${hash}` : ''}`;
}

export function ensureTrailingSlashUrl(url: string): string {
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    return ensureTrailingSlashPath(url);
  }

  const parsed = new URL(url);
  if (parsed.pathname !== '/' && !FILE_PATH_RE.test(parsed.pathname) && !parsed.pathname.endsWith('/')) {
    parsed.pathname = `${parsed.pathname}/`;
  }
  return parsed.toString();
}

export function toAbsoluteUrl(path: string): string {
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
}
