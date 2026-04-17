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
  redirects: {
    // ── Legacy FR root paths ────────────────────────────────────────────────
    '/calculateurs': '/fr/calculateurs/',
    '/calculateurs/': '/fr/calculateurs/',
    '/en/calculateurs': '/en/calculators/',
    '/en/calculateurs/': '/en/calculators/',
    '/blog': '/fr/blog/',
    '/blog/': '/fr/blog/',
    '/budget-mensuel': '/fr/finance/budget-mensuel/',
    '/budget-mensuel/': '/fr/finance/budget-mensuel/',
    '/epargne-automatique': '/fr/finance/epargne-automatique/',
    '/epargne-automatique/': '/fr/finance/epargne-automatique/',
    '/interets-composes': '/fr/finance/interets-composes/',
    '/interets-composes/': '/fr/finance/interets-composes/',
    '/impot-revenu': '/fr/finance/impot-revenu/',
    '/impot-revenu/': '/fr/finance/impot-revenu/',
    '/economies-petites-depenses': '/fr/vie-pratique/economies-petites-depenses/',
    '/economies-petites-depenses/': '/fr/vie-pratique/economies-petites-depenses/',
    '/pourboire': '/fr/vie-pratique/pourboire/',
    '/pourboire/': '/fr/vie-pratique/pourboire/',
    '/partage-addition': '/fr/vie-pratique/partage-addition/',
    '/partage-addition/': '/fr/vie-pratique/partage-addition/',
    // ── Legacy /calculateurs/* paths ────────────────────────────────────────
    '/calculateurs/budget-mensuel': '/fr/finance/budget-mensuel/',
    '/calculateurs/budget-mensuel/': '/fr/finance/budget-mensuel/',
    '/calculateurs/epargne-automatique': '/fr/finance/epargne-automatique/',
    '/calculateurs/epargne-automatique/': '/fr/finance/epargne-automatique/',
    '/calculateurs/interets-composes': '/fr/finance/interets-composes/',
    '/calculateurs/interets-composes/': '/fr/finance/interets-composes/',
    '/calculateurs/impot-revenu': '/fr/finance/impot-revenu/',
    '/calculateurs/impot-revenu/': '/fr/finance/impot-revenu/',
    '/calculateurs/economies-petites-depenses': '/fr/vie-pratique/economies-petites-depenses/',
    '/calculateurs/economies-petites-depenses/': '/fr/vie-pratique/economies-petites-depenses/',
    '/calculateurs/pourboire': '/fr/vie-pratique/pourboire/',
    '/calculateurs/pourboire/': '/fr/vie-pratique/pourboire/',
    '/calculateurs/partage-addition': '/fr/vie-pratique/partage-addition/',
    '/calculateurs/partage-addition/': '/fr/vie-pratique/partage-addition/',
    '/calculateurs/demo': '/fr/calculateurs/',
    '/calculateurs/demo/': '/fr/calculateurs/',
    // ── EN legacy root paths ────────────────────────────────────────────────
    '/en/budget-mensuel': '/en/finance/monthly-budget/',
    '/en/budget-mensuel/': '/en/finance/monthly-budget/',
    '/en/epargne-automatique': '/en/finance/automatic-savings/',
    '/en/epargne-automatique/': '/en/finance/automatic-savings/',
    '/en/interets-composes': '/en/finance/compound-interest/',
    '/en/interets-composes/': '/en/finance/compound-interest/',
    '/en/impot-revenu': '/en/finance/income-tax/',
    '/en/impot-revenu/': '/en/finance/income-tax/',
    '/en/economies-petites-depenses': '/en/daily-life/small-expense-savings/',
    '/en/economies-petites-depenses/': '/en/daily-life/small-expense-savings/',
    '/en/pourboire': '/en/daily-life/tip-calculator/',
    '/en/pourboire/': '/en/daily-life/tip-calculator/',
    '/en/partage-addition': '/en/daily-life/split-bill/',
    '/en/partage-addition/': '/en/daily-life/split-bill/',
    // ── EN /calculateurs/* paths ────────────────────────────────────────────
    '/en/calculateurs/budget-mensuel': '/en/finance/monthly-budget/',
    '/en/calculateurs/budget-mensuel/': '/en/finance/monthly-budget/',
    '/en/calculateurs/epargne-automatique': '/en/finance/automatic-savings/',
    '/en/calculateurs/epargne-automatique/': '/en/finance/automatic-savings/',
    '/en/calculateurs/interets-composes': '/en/finance/compound-interest/',
    '/en/calculateurs/interets-composes/': '/en/finance/compound-interest/',
    '/en/calculateurs/impot-revenu': '/en/finance/income-tax/',
    '/en/calculateurs/impot-revenu/': '/en/finance/income-tax/',
    '/en/calculateurs/economies-petites-depenses': '/en/daily-life/small-expense-savings/',
    '/en/calculateurs/economies-petites-depenses/': '/en/daily-life/small-expense-savings/',
    '/en/calculateurs/pourboire': '/en/daily-life/tip-calculator/',
    '/en/calculateurs/pourboire/': '/en/daily-life/tip-calculator/',
    '/en/calculateurs/partage-addition': '/en/daily-life/split-bill/',
    '/en/calculateurs/partage-addition/': '/en/daily-life/split-bill/',
    '/en/calculateurs/demo': '/en/calculators/',
    '/en/calculateurs/demo/': '/en/calculators/',
    // ── EN FR-slug calculator paths ─────────────────────────────────────────
    '/en/finance/budget-mensuel': '/en/finance/monthly-budget/',
    '/en/finance/budget-mensuel/': '/en/finance/monthly-budget/',
    '/en/finance/epargne-automatique': '/en/finance/automatic-savings/',
    '/en/finance/epargne-automatique/': '/en/finance/automatic-savings/',
    '/en/finance/interets-composes': '/en/finance/compound-interest/',
    '/en/finance/interets-composes/': '/en/finance/compound-interest/',
    '/en/finance/impot-revenu': '/en/finance/income-tax/',
    '/en/finance/impot-revenu/': '/en/finance/income-tax/',
    '/en/daily-life/economies-petites-depenses': '/en/daily-life/small-expense-savings/',
    '/en/daily-life/economies-petites-depenses/': '/en/daily-life/small-expense-savings/',
    '/en/daily-life/pourboire': '/en/daily-life/tip-calculator/',
    '/en/daily-life/pourboire/': '/en/daily-life/tip-calculator/',
    '/en/daily-life/partage-addition': '/en/daily-life/split-bill/',
    '/en/daily-life/partage-addition/': '/en/daily-life/split-bill/',
    '/en/finance/taux-endettement': '/en/finance/debt-ratio/',
    '/en/finance/taux-endettement/': '/en/finance/debt-ratio/',
    '/en/finance/mensualite-credit': '/en/finance/loan-payment/',
    '/en/finance/mensualite-credit/': '/en/finance/loan-payment/',
    '/en/finance/pret-personnel': '/en/finance/personal-loan/',
    '/en/finance/pret-personnel/': '/en/finance/personal-loan/',
    '/en/finance/salaire-brut-net': '/en/finance/gross-to-net-salary/',
    '/en/finance/salaire-brut-net/': '/en/finance/gross-to-net-salary/',
    '/en/finance/salaire-net-brut': '/en/finance/net-to-gross-salary/',
    '/en/finance/salaire-net-brut/': '/en/finance/net-to-gross-salary/',
    '/en/finance/tva-ht-ttc': '/en/finance/vat-calculator/',
    '/en/finance/tva-ht-ttc/': '/en/finance/vat-calculator/',
    '/en/finance/capacite-epargne-mensuelle': '/en/finance/monthly-savings-capacity/',
    '/en/finance/capacite-epargne-mensuelle/': '/en/finance/monthly-savings-capacity/',
    '/en/finance/objectif-epargne-temps': '/en/finance/savings-goal-timeline/',
    '/en/finance/objectif-epargne-temps/': '/en/finance/savings-goal-timeline/',
    '/en/health/calcul-imc': '/en/health/bmi-calculator/',
    '/en/health/calcul-imc/': '/en/health/bmi-calculator/',
    '/en/health/besoin-calorique-journalier': '/en/health/daily-calorie-needs/',
    '/en/health/besoin-calorique-journalier/': '/en/health/daily-calorie-needs/',
    '/en/health/poids-ideal': '/en/health/ideal-weight/',
    '/en/health/poids-ideal/': '/en/health/ideal-weight/',
    '/en/health/besoin-eau-quotidien': '/en/health/daily-water-needs/',
    '/en/health/besoin-eau-quotidien/': '/en/health/daily-water-needs/',
    '/en/health/rythme-cardiaque-cible': '/en/health/target-heart-rate/',
    '/en/health/rythme-cardiaque-cible/': '/en/health/target-heart-rate/',
    '/en/health/depense-calorique-activite': '/en/health/calories-burned/',
    '/en/health/depense-calorique-activite/': '/en/health/calories-burned/',
    '/en/real-estate/frais-notaire': '/en/real-estate/notary-fees/',
    '/en/real-estate/frais-notaire/': '/en/real-estate/notary-fees/',
    '/en/real-estate/rentabilite-locative-brute': '/en/real-estate/gross-rental-yield/',
    '/en/real-estate/rentabilite-locative-brute/': '/en/real-estate/gross-rental-yield/',
    '/en/real-estate/rendement-locatif-net': '/en/real-estate/net-rental-yield/',
    '/en/real-estate/rendement-locatif-net/': '/en/real-estate/net-rental-yield/',
    '/en/daily-life/difference-entre-deux-dates': '/en/daily-life/date-difference/',
    '/en/daily-life/difference-entre-deux-dates/': '/en/daily-life/date-difference/',
    '/en/daily-life/age-exact': '/en/daily-life/exact-age/',
    '/en/daily-life/age-exact/': '/en/daily-life/exact-age/',
    '/en/daily-life/consommation-carburant': '/en/daily-life/fuel-consumption/',
    '/en/daily-life/consommation-carburant/': '/en/daily-life/fuel-consumption/',
    '/en/home/quantite-peinture': '/en/home/paint-quantity/',
    '/en/home/quantite-peinture/': '/en/home/paint-quantity/',
    '/en/home/surface-piece': '/en/home/room-area/',
    '/en/home/surface-piece/': '/en/home/room-area/',
    '/en/education/moyenne-scolaire': '/en/education/grade-average/',
    '/en/education/moyenne-scolaire/': '/en/education/grade-average/',
    // ── EN blog FR-slug redirects ────────────────────────────────────────────
    '/en/blog/budget-couple-methode-simple': '/en/blog/couple-budget-simple-method/',
    '/en/blog/budget-couple-methode-simple/': '/en/blog/couple-budget-simple-method/',
    '/en/blog/budget-mensuel-mode-emploi': '/en/blog/monthly-budget-step-by-step-guide/',
    '/en/blog/budget-mensuel-mode-emploi/': '/en/blog/monthly-budget-step-by-step-guide/',
    '/en/blog/calcul-impot-revenu-sans-stress': '/en/blog/income-tax-estimate-guide/',
    '/en/blog/calcul-impot-revenu-sans-stress/': '/en/blog/income-tax-estimate-guide/',
    '/en/blog/epargne-automatique-strategies': '/en/blog/automatic-savings-strategy/',
    '/en/blog/epargne-automatique-strategies/': '/en/blog/automatic-savings-strategy/',
    '/en/blog/fonds-urgence-combien-mettre': '/en/blog/emergency-fund-guide/',
    '/en/blog/fonds-urgence-combien-mettre/': '/en/blog/emergency-fund-guide/',
    '/en/blog/interets-composes-erreurs-a-eviter': '/en/blog/compound-interest-mistakes/',
    '/en/blog/interets-composes-erreurs-a-eviter/': '/en/blog/compound-interest-mistakes/',
    '/en/blog/investissement-progressif-dca': '/en/blog/dca-investing-guide/',
    '/en/blog/investissement-progressif-dca/': '/en/blog/dca-investing-guide/',
    '/en/blog/methode-50-30-20': '/en/blog/50-30-20-budget-rule/',
    '/en/blog/methode-50-30-20/': '/en/blog/50-30-20-budget-rule/',
    '/en/blog/optimiser-quotient-familial-legalement': '/en/blog/family-tax-shares-guide/',
    '/en/blog/optimiser-quotient-familial-legalement/': '/en/blog/family-tax-shares-guide/',
    '/en/blog/partage-addition-entre-amis-guide': '/en/blog/split-bill-with-friends/',
    '/en/blog/partage-addition-entre-amis-guide/': '/en/blog/split-bill-with-friends/',
    '/en/blog/petites-depenses-qui-comptent': '/en/blog/small-expenses-that-add-up/',
    '/en/blog/petites-depenses-qui-comptent/': '/en/blog/small-expenses-that-add-up/',
    '/en/blog/pourboire-regles-pratiques-voyage': '/en/blog/tipping-guide-home-and-travel/',
    '/en/blog/pourboire-regles-pratiques-voyage/': '/en/blog/tipping-guide-home-and-travel/',
  },
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
