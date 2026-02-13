import fs from 'node:fs';
import path from 'node:path';

const ROOT_DIR = process.cwd();
const DIST_DIR = path.join(ROOT_DIR, 'dist');
const TAXONOMY_PATH = path.join(ROOT_DIR, 'src', 'lib', 'calculator-taxonomy.ts');
const SITE_ORIGIN = 'https://calcery.com';

function normalizePathname(pathname) {
  const cleaned = pathname.replace(/\/+$/, '');
  return cleaned === '' ? '/' : cleaned;
}

function getBlock(source, startMarker, endMarker) {
  const start = source.indexOf(startMarker);
  const searchFrom = start === -1 ? 0 : start + startMarker.length;
  const end = source.indexOf(endMarker, searchFrom);
  if (start === -1 || end === -1 || end <= start) {
    throw new Error(`Unable to extract block between markers: "${startMarker}" and "${endMarker}".`);
  }
  return source.slice(start, end);
}

function parseCategorySlugs(taxonomySource) {
  const categoriesBlock = getBlock(
    taxonomySource,
    'export const CATEGORIES: CategoryDefinition[] = [',
    'export const CALCULATORS: CalculatorDefinition[] = [',
  );

  const categories = new Map();
  const categoryPattern = /key:\s*'([^']+)'[\s\S]*?slug:\s*\{\s*fr:\s*'([^']+)',\s*en:\s*'([^']+)'\s*\}/g;

  for (const match of categoriesBlock.matchAll(categoryPattern)) {
    const [, key, frSlug, enSlug] = match;
    categories.set(key, { frSlug, enSlug });
  }

  if (categories.size === 0) {
    throw new Error('No categories found in calculator taxonomy.');
  }

  return categories;
}

function parseCalculators(taxonomySource) {
  const calculatorsBlock = getBlock(
    taxonomySource,
    'export const CALCULATORS: CalculatorDefinition[] = [',
    'const CATEGORY_BY_KEY = new Map',
  );

  const calculators = [];
  const calculatorPattern = /slug:\s*'([^']+)'\s*,\s*\n\s*category:\s*'([^']+)'/g;

  for (const match of calculatorsBlock.matchAll(calculatorPattern)) {
    const [, slug, categoryKey] = match;
    calculators.push({ slug, categoryKey });
  }

  if (calculators.length === 0) {
    throw new Error('No calculators found in calculator taxonomy.');
  }

  return calculators;
}

function listDistHtmlPages(dirPath, relativeDir = '') {
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });
  const pages = [];

  for (const entry of entries) {
    const nextRelative = path.join(relativeDir, entry.name);
    const absolutePath = path.join(dirPath, entry.name);

    if (entry.isDirectory()) {
      pages.push(...listDistHtmlPages(absolutePath, nextRelative));
      continue;
    }

    if (!entry.isFile() || !entry.name.endsWith('.html')) continue;

    const relativePosix = nextRelative.split(path.sep).join('/');
    let routePath;

    if (relativePosix === 'index.html') {
      routePath = '/';
    } else if (relativePosix.endsWith('/index.html')) {
      routePath = `/${relativePosix.slice(0, -'/index.html'.length)}`;
    } else {
      routePath = `/${relativePosix.replace(/\.html$/, '')}`;
    }

    pages.push({
      route: normalizePathname(routePath),
      filePath: absolutePath,
    });
  }

  return pages;
}

function parseTagAttributes(tag) {
  const attributes = {};
  const pattern = /([:@\w-]+)\s*=\s*("([^"]*)"|'([^']*)')/g;
  for (const match of tag.matchAll(pattern)) {
    const key = match[1].toLowerCase();
    const value = match[3] ?? match[4] ?? '';
    attributes[key] = value;
  }
  return attributes;
}

function extractJsonLdNodes(html, route, failures) {
  const scripts = [];
  const pattern = /<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;

  for (const match of html.matchAll(pattern)) {
    const raw = match[1].trim();
    if (!raw) {
      failures.push(`[${route}] Empty JSON-LD script detected.`);
      continue;
    }
    if (raw.includes('[object Object]')) {
      failures.push(`[${route}] JSON-LD contains [object Object].`);
    }
    if (/"undefined"/.test(raw)) {
      failures.push(`[${route}] JSON-LD contains string "undefined".`);
    }
    if (/\bnull\b/.test(raw)) {
      failures.push(`[${route}] JSON-LD contains null token.`);
    }

    try {
      scripts.push(JSON.parse(raw));
    } catch (error) {
      failures.push(`[${route}] Invalid JSON-LD: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  return scripts;
}

function collectTypedNodes(node, typeName, matches = []) {
  if (!node || typeof node !== 'object') return matches;
  if (Array.isArray(node)) {
    for (const item of node) collectTypedNodes(item, typeName, matches);
    return matches;
  }

  const value = node['@type'];
  if (value === typeName || (Array.isArray(value) && value.includes(typeName))) {
    matches.push(node);
  }

  for (const child of Object.values(node)) {
    collectTypedNodes(child, typeName, matches);
  }

  return matches;
}

function collectNullPaths(node, currentPath = '$', matches = []) {
  if (node === null) {
    matches.push(currentPath);
    return matches;
  }
  if (!node || typeof node !== 'object') return matches;

  if (Array.isArray(node)) {
    node.forEach((item, index) => collectNullPaths(item, `${currentPath}[${index}]`, matches));
    return matches;
  }

  for (const [key, value] of Object.entries(node)) {
    collectNullPaths(value, `${currentPath}.${key}`, matches);
  }
  return matches;
}

function toPathname(value, route, failures, context) {
  try {
    return normalizePathname(new URL(value, SITE_ORIGIN).pathname);
  } catch {
    failures.push(`[${route}] Invalid URL for ${context}: ${value}`);
    return null;
  }
}

function isLikelyAssetPath(pathname) {
  return /\.(?:css|js|mjs|cjs|map|png|jpe?g|gif|svg|webp|avif|ico|pdf|txt|xml|json|woff2?|ttf|eot)$/i.test(pathname);
}

function resolveInternalHref(href, currentRoute) {
  const trimmed = href.trim();
  if (!trimmed) return null;
  if (trimmed.startsWith('#')) return null;
  if (/^(mailto:|tel:|javascript:|data:)/i.test(trimmed)) return null;

  let url;
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
    url = new URL(trimmed);
    if (url.hostname !== 'calcery.com') return null;
  } else if (trimmed.startsWith('//')) {
    return null;
  } else {
    const basePath = currentRoute === '/' ? '/' : `${currentRoute}/`;
    url = new URL(trimmed, `${SITE_ORIGIN}${basePath}`);
  }

  const pathname = normalizePathname(url.pathname);
  if (isLikelyAssetPath(pathname)) return null;
  return pathname;
}

function routeExists(route, distRoutes) {
  if (distRoutes.has(route)) return true;

  const withoutLeadingSlash = route.startsWith('/') ? route.slice(1) : route;
  if (withoutLeadingSlash.length === 0) {
    return fs.existsSync(path.join(DIST_DIR, 'index.html'));
  }

  const directFile = path.join(DIST_DIR, withoutLeadingSlash);
  const nestedIndex = path.join(DIST_DIR, withoutLeadingSlash, 'index.html');
  const htmlFile = path.join(DIST_DIR, `${withoutLeadingSlash}.html`);

  return fs.existsSync(directFile) || fs.existsSync(nestedIndex) || fs.existsSync(htmlFile);
}

function assertStringField(value, route, context, failures) {
  if (typeof value !== 'string') {
    failures.push(`[${route}] ${context} must be a string.`);
    return;
  }
  if (!value.trim()) {
    failures.push(`[${route}] ${context} must not be empty.`);
    return;
  }
  if (value.includes('[object Object]')) {
    failures.push(`[${route}] ${context} contains [object Object].`);
  }
  if (value.includes('undefined')) {
    failures.push(`[${route}] ${context} contains undefined token.`);
  }
}

if (!fs.existsSync(DIST_DIR)) {
  console.error(`FAILED: Missing dist directory at ${DIST_DIR}`);
  process.exit(1);
}

if (!fs.existsSync(TAXONOMY_PATH)) {
  console.error(`FAILED: Missing taxonomy file at ${TAXONOMY_PATH}`);
  process.exit(1);
}

const taxonomySource = fs.readFileSync(TAXONOMY_PATH, 'utf8');
const categories = parseCategorySlugs(taxonomySource);
const calculators = parseCalculators(taxonomySource);
const distPages = listDistHtmlPages(DIST_DIR);
const distRoutes = new Set(distPages.map((page) => page.route));
const distPageByRoute = new Map(distPages.map((page) => [page.route, page]));

const calculatorPages = [];
for (const calculator of calculators) {
  const category = categories.get(calculator.categoryKey);
  if (!category) {
    console.error(`FAILED: Unknown category key "${calculator.categoryKey}" for calculator "${calculator.slug}".`);
    process.exit(1);
  }

  const frPath = normalizePathname(`/fr/${category.frSlug}/${calculator.slug}`);
  const enPath = normalizePathname(`/en/${category.enSlug}/${calculator.slug}`);

  calculatorPages.push({
    route: frPath,
    locale: 'fr',
    slug: calculator.slug,
    categoryRoute: normalizePathname(`/fr/${category.frSlug}`),
    expectedFrAlternate: frPath,
    expectedEnAlternate: enPath,
  });
  calculatorPages.push({
    route: enPath,
    locale: 'en',
    slug: calculator.slug,
    categoryRoute: normalizePathname(`/en/${category.enSlug}`),
    expectedFrAlternate: frPath,
    expectedEnAlternate: enPath,
  });
}

const failures = [];
const warnings = [];
let objectObjectOccurrences = 0;

for (const page of distPages) {
  const html = fs.readFileSync(page.filePath, 'utf8');
  const pageObjectMatches = html.match(/\[object Object\]/g);
  if (pageObjectMatches) {
    objectObjectOccurrences += pageObjectMatches.length;
    failures.push(`[${page.route}] Found ${pageObjectMatches.length} occurrence(s) of [object Object].`);
  }
  if (/"text"\s*:\s*"\[object Object\]"/.test(html)) {
    failures.push(`[${page.route}] Found FAQ text field equal to [object Object].`);
  }
  if (/>[\s\n\r\t]*undefined[\s\n\r\t]*</i.test(html)) {
    failures.push(`[${page.route}] Found visible "undefined" token in HTML content.`);
  }
}

for (const page of calculatorPages) {
  const builtPage = distPageByRoute.get(page.route);
  if (!builtPage) {
    failures.push(`[${page.route}] Missing built calculator page.`);
    continue;
  }

  const html = fs.readFileSync(builtPage.filePath, 'utf8');

  const headingLevels = [...html.matchAll(/<h([1-6])\b/gi)].map((match) => Number(match[1]));
  const h1Count = headingLevels.filter((level) => level === 1).length;
  if (h1Count !== 1) {
    failures.push(`[${page.route}] Expected exactly 1 H1, found ${h1Count}.`);
  }
  if (!headingLevels.includes(2)) {
    failures.push(`[${page.route}] Missing H2 headings.`);
  }
  for (let index = 1; index < headingLevels.length; index += 1) {
    if (headingLevels[index] - headingLevels[index - 1] > 1) {
      failures.push(
        `[${page.route}] Invalid heading jump: h${headingLevels[index - 1]} to h${headingLevels[index]}.`,
      );
      break;
    }
  }

  const metaTags = [...html.matchAll(/<meta\b[^>]*>/gi)].map((match) => match[0]);
  const descriptionMeta = metaTags.find((tag) => (parseTagAttributes(tag).name || '').toLowerCase() === 'description');
  if (!descriptionMeta) {
    failures.push(`[${page.route}] Missing meta description.`);
  } else {
    const content = parseTagAttributes(descriptionMeta).content ?? '';
    if (!content.trim()) {
      failures.push(`[${page.route}] Meta description is empty.`);
    }
  }

  const linkTags = [...html.matchAll(/<link\b[^>]*>/gi)].map((match) => match[0]);
  const canonicalLink = linkTags.find((tag) => (parseTagAttributes(tag).rel || '').toLowerCase() === 'canonical');
  if (!canonicalLink) {
    failures.push(`[${page.route}] Missing canonical link.`);
  } else {
    const canonicalHref = parseTagAttributes(canonicalLink).href;
    if (!canonicalHref) {
      failures.push(`[${page.route}] Canonical link has no href.`);
    } else {
      const canonicalPath = toPathname(canonicalHref, page.route, failures, 'canonical');
      if (canonicalPath && canonicalPath !== page.route) {
        failures.push(`[${page.route}] Canonical path mismatch: expected ${page.route}, found ${canonicalPath}.`);
      }
    }
  }

  const alternateMap = new Map();
  for (const tag of linkTags) {
    const attrs = parseTagAttributes(tag);
    if ((attrs.rel || '').toLowerCase() !== 'alternate') continue;
    if (!attrs.hreflang || !attrs.href) continue;
    alternateMap.set(attrs.hreflang.toLowerCase(), attrs.href);
  }

  const frAlt = alternateMap.get('fr');
  const enAlt = alternateMap.get('en');
  if (!frAlt || !enAlt) {
    failures.push(`[${page.route}] Missing hreflang alternates for fr/en.`);
  } else {
    const frPath = toPathname(frAlt, page.route, failures, 'hreflang=fr');
    const enPath = toPathname(enAlt, page.route, failures, 'hreflang=en');
    if (frPath && frPath !== page.expectedFrAlternate) {
      failures.push(`[${page.route}] hreflang=fr mismatch: expected ${page.expectedFrAlternate}, found ${frPath}.`);
    }
    if (enPath && enPath !== page.expectedEnAlternate) {
      failures.push(`[${page.route}] hreflang=en mismatch: expected ${page.expectedEnAlternate}, found ${enPath}.`);
    }
  }

  const jsonLdNodes = extractJsonLdNodes(html, page.route, failures);
  for (const jsonLd of jsonLdNodes) {
    const nullPaths = collectNullPaths(jsonLd);
    if (nullPaths.length > 0) {
      failures.push(`[${page.route}] JSON-LD contains null values (first: ${nullPaths[0]}).`);
    }
  }

  const faqNodes = [];
  const breadcrumbNodes = [];
  for (const jsonLd of jsonLdNodes) {
    collectTypedNodes(jsonLd, 'FAQPage', faqNodes);
    collectTypedNodes(jsonLd, 'BreadcrumbList', breadcrumbNodes);
  }

  if (faqNodes.length !== 1) {
    failures.push(`[${page.route}] Expected exactly 1 FAQPage JSON-LD, found ${faqNodes.length}.`);
  } else {
    const faqNode = faqNodes[0];
    const mainEntity = faqNode.mainEntity;
    if (!Array.isArray(mainEntity) || mainEntity.length === 0) {
      failures.push(`[${page.route}] FAQPage has empty mainEntity.`);
    } else {
      mainEntity.forEach((questionNode, index) => {
        const answerText = questionNode?.acceptedAnswer?.text;
        assertStringField(questionNode?.name, page.route, `FAQ question #${index + 1}`, failures);
        assertStringField(answerText, page.route, `FAQ answer #${index + 1}`, failures);
      });
    }
  }

  if (breadcrumbNodes.length !== 1) {
    failures.push(`[${page.route}] Expected exactly 1 BreadcrumbList JSON-LD, found ${breadcrumbNodes.length}.`);
  } else {
    const breadcrumbNode = breadcrumbNodes[0];
    const itemList = breadcrumbNode.itemListElement;
    if (!Array.isArray(itemList) || itemList.length < 3) {
      failures.push(`[${page.route}] BreadcrumbList must include at least 3 items.`);
    } else {
      const categoryPath = toPathname(itemList[1]?.item ?? '', page.route, failures, 'breadcrumb category item');
      const currentPath = toPathname(itemList[itemList.length - 1]?.item ?? '', page.route, failures, 'breadcrumb current item');
      if (categoryPath && categoryPath !== page.categoryRoute) {
        failures.push(`[${page.route}] Breadcrumb category mismatch: expected ${page.categoryRoute}, found ${categoryPath}.`);
      }
      if (currentPath && currentPath !== page.route) {
        failures.push(`[${page.route}] Breadcrumb current item mismatch: expected ${page.route}, found ${currentPath}.`);
      }
    }
  }

  const breadcrumbNavMatch = html.match(/<nav\b[^>]*aria-label=["']Breadcrumb["'][\s\S]*?<\/nav>/i);
  if (!breadcrumbNavMatch) {
    failures.push(`[${page.route}] Missing breadcrumb HTML navigation.`);
  } else {
    const breadcrumbHrefs = [...breadcrumbNavMatch[0].matchAll(/<a\b[^>]*href=(["'])(.*?)\1/gi)].map((match) => match[2]);
    if (breadcrumbHrefs.length < 3) {
      failures.push(`[${page.route}] Breadcrumb HTML navigation should include at least 3 links.`);
    } else {
      const categoryPath = normalizePathname(new URL(breadcrumbHrefs[1], SITE_ORIGIN).pathname);
      const currentPath = normalizePathname(new URL(breadcrumbHrefs[breadcrumbHrefs.length - 1], SITE_ORIGIN).pathname);
      if (categoryPath !== page.categoryRoute) {
        failures.push(`[${page.route}] Breadcrumb HTML category mismatch: expected ${page.categoryRoute}, found ${categoryPath}.`);
      }
      if (currentPath !== page.route) {
        failures.push(`[${page.route}] Breadcrumb HTML current mismatch: expected ${page.route}, found ${currentPath}.`);
      }
    }
  }

  const anchorHrefs = [...html.matchAll(/<a\b[^>]*href=(["'])(.*?)\1/gi)].map((match) => match[2]);
  const internalRoutes = new Set();
  const brokenRoutes = new Set();

  for (const href of anchorHrefs) {
    const internalRoute = resolveInternalHref(href, page.route);
    if (!internalRoute) continue;
    internalRoutes.add(internalRoute);
    if (!routeExists(internalRoute, distRoutes)) {
      brokenRoutes.add(internalRoute);
    }
  }

  if (internalRoutes.size < 3) {
    failures.push(`[${page.route}] Expected at least 3 internal links, found ${internalRoutes.size}.`);
  }
  if (brokenRoutes.size > 0) {
    failures.push(`[${page.route}] Broken internal links: ${[...brokenRoutes].join(', ')}`);
  }
}

if (calculatorPages.some((page) => page.locale === 'en' && page.slug === 'budget-mensuel')) {
  warnings.push(
    'EN route uses shared slug "/en/finance/budget-mensuel". Route kept as-is because slugs are shared in current taxonomy.',
  );
}

if (failures.length > 0) {
  console.error('FAILED: Calculator page SEO verification failed.');
  failures.forEach((failure) => console.error(`- ${failure}`));
  if (warnings.length > 0) {
    warnings.forEach((warning) => console.warn(`WARN: ${warning}`));
  }
  process.exit(1);
}

console.log('OK: Calculator page SEO verification passed.');
console.log(`- Pages verified: ${calculatorPages.length}`);
console.log('- Pages corrected: 0 (verification-only step)');
console.log(`- [object Object] occurrences: ${objectObjectOccurrences}`);
console.log('- JSON-LD validity: OK');
console.log('- Heading structure: OK');
console.log('- hreflang links: OK');
if (warnings.length > 0) {
  warnings.forEach((warning) => console.warn(`WARN: ${warning}`));
}
