export type Locale = 'fr' | 'en';

export const DEFAULT_LOCALE: Locale = 'fr';

const FR_CATEGORY_SEGMENTS = new Set([
  'finance',
  'sante',
  'immobilier',
  'vie-pratique',
  'maison-travaux',
  'education',
]);

const EN_CATEGORY_SEGMENTS = new Set([
  'finance',
  'health',
  'real-estate',
  'daily-life',
  'home',
  'education',
]);

const FR_TO_EN_CATEGORY_SEGMENT: Record<string, string> = {
  finance: 'finance',
  sante: 'health',
  immobilier: 'real-estate',
  'vie-pratique': 'daily-life',
  'maison-travaux': 'home',
  education: 'education',
};

const EN_TO_FR_CATEGORY_SEGMENT: Record<string, string> = {
  finance: 'finance',
  health: 'sante',
  'real-estate': 'immobilier',
  'daily-life': 'vie-pratique',
  home: 'maison-travaux',
  education: 'education',
};

export function getLocaleFromPath(pathname: string): Locale {
  return pathname === '/en' || pathname.startsWith('/en/') ? 'en' : 'fr';
}

export function stripLocalePrefix(pathname: string): string {
  if (pathname === '/fr') return '/';
  if (pathname.startsWith('/fr/')) return pathname.slice(3) || '/';
  if (pathname === '/en') return '/';
  if (pathname.startsWith('/en/')) return pathname.slice(3) || '/';
  return pathname || '/';
}

export function localizePath(path: string, locale: Locale): string {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  if (
    normalized === '/fr' ||
    normalized.startsWith('/fr/') ||
    normalized === '/en' ||
    normalized.startsWith('/en/')
  ) {
    return normalized;
  }

  const firstSegment = normalized.split('/')[1] ?? '';

  if (locale === 'fr' && (normalized === '/blog' || normalized.startsWith('/blog/'))) {
    return `/fr${normalized}`;
  }

  if (locale === 'fr' && FR_CATEGORY_SEGMENTS.has(firstSegment)) {
    return `/fr${normalized}`;
  }

  if (locale === 'fr') return normalized;
  return normalized === '/' ? '/en' : `/en${normalized}`;
}

export function switchLocalePath(pathname: string, locale: Locale): string {
  if (pathname === '/fr/calculateurs' || pathname === '/fr/calculateurs/') {
    return locale === 'fr' ? '/fr/calculateurs' : '/en/calculators';
  }

  if (pathname === '/en/calculators' || pathname === '/en/calculators/') {
    return locale === 'en' ? '/en/calculators' : '/fr/calculateurs';
  }

  if (pathname === '/en/calculateurs' || pathname === '/en/calculateurs/') {
    return locale === 'en' ? '/en/calculators' : '/fr/calculateurs';
  }

  const frCategoryMatch = pathname.match(/^\/fr\/([^/]+)(\/.*)?$/);
  if (frCategoryMatch && FR_CATEGORY_SEGMENTS.has(frCategoryMatch[1])) {
    const currentCategory = frCategoryMatch[1];
    const suffix = frCategoryMatch[2] ?? '';
    if (locale === 'fr') return `/fr/${currentCategory}${suffix}`;
    const targetCategory = FR_TO_EN_CATEGORY_SEGMENT[currentCategory];
    return `/en/${targetCategory}${suffix}`;
  }

  const enCategoryMatch = pathname.match(/^\/en\/([^/]+)(\/.*)?$/);
  if (enCategoryMatch && EN_CATEGORY_SEGMENTS.has(enCategoryMatch[1])) {
    const currentCategory = enCategoryMatch[1];
    const suffix = enCategoryMatch[2] ?? '';
    if (locale === 'en') return `/en/${currentCategory}${suffix}`;
    const targetCategory = EN_TO_FR_CATEGORY_SEGMENT[currentCategory];
    return `/fr/${targetCategory}${suffix}`;
  }

  const raw = stripLocalePrefix(pathname);
  return localizePath(raw, locale);
}
