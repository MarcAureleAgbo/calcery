export type Locale = 'fr' | 'en';

export const DEFAULT_LOCALE: Locale = 'fr';

export function getLocaleFromPath(pathname: string): Locale {
  return pathname === '/en' || pathname.startsWith('/en/') ? 'en' : 'fr';
}

export function stripLocalePrefix(pathname: string): string {
  if (pathname === '/en') return '/';
  if (pathname.startsWith('/en/')) return pathname.slice(3) || '/';
  return pathname || '/';
}

export function localizePath(path: string, locale: Locale): string {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  if (locale === 'fr') return normalized;
  return normalized === '/' ? '/en' : `/en${normalized}`;
}

export function switchLocalePath(pathname: string, locale: Locale): string {
  const raw = stripLocalePrefix(pathname);
  return localizePath(raw, locale);
}
