import fs from 'node:fs';
import path from 'node:path';

const ROOT_DIR = process.cwd();
const DIST_SITEMAP_PATH = path.join(ROOT_DIR, 'dist', 'sitemap-0.xml');
const DIST_FR_INDEX_PATH = path.join(ROOT_DIR, 'dist', 'fr', 'index.html');
const TAXONOMY_PATH = path.join(ROOT_DIR, 'src', 'lib', 'calculator-taxonomy.ts');
const BLOG_FR_DIR = path.join(ROOT_DIR, 'src', 'content', 'blog');
const BLOG_EN_DIR = path.join(ROOT_DIR, 'src', 'content', 'blogEn');

const REQUIRED_STATIC_PATHS = new Set([
  '/',
  '/en',
  '/a-propos',
  '/contact',
  '/confidentialite',
]);

if (fs.existsSync(DIST_FR_INDEX_PATH)) {
  REQUIRED_STATIC_PATHS.add('/fr');
}

function normalizePathname(pathname) {
  const cleaned = pathname.replace(/\/+$/, '');
  return cleaned === '' ? '/' : cleaned;
}

function parseSitemapEntries(xmlContent) {
  const locPattern = /<loc>([^<]+)<\/loc>/g;
  const entries = [];
  for (const match of xmlContent.matchAll(locPattern)) {
    const loc = match[1].trim();
    const url = new URL(loc);
    entries.push({
      loc,
      pathname: normalizePathname(url.pathname),
      hasQuery: url.search.length > 0,
    });
  }
  return entries;
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

function parseLegacyRedirectPaths(taxonomySource) {
  const legacyBlock = getBlock(
    taxonomySource,
    'export const LEGACY_REDIRECTS: Array<{ from: string; to: string }> = [',
    '];',
  );

  const legacyPaths = new Set();
  const legacyPattern = /from:\s*'([^']+)'/g;

  for (const match of legacyBlock.matchAll(legacyPattern)) {
    legacyPaths.add(normalizePathname(match[1]));
  }

  return legacyPaths;
}

function hasDraftFlag(content) {
  const frontmatter = content.match(/^---\n([\s\S]*?)\n---/);
  if (!frontmatter) return false;
  return /(^|\n)\s*draft:\s*true\s*($|\n)/i.test(frontmatter[1]);
}

function listBlogRoutes(directoryPath, routePrefix) {
  if (!fs.existsSync(directoryPath)) return [];

  const entries = fs
    .readdirSync(directoryPath, { withFileTypes: true })
    .filter((entry) => entry.isFile() && /\.(md|mdx)$/i.test(entry.name));

  const routes = [];
  for (const entry of entries) {
    const filePath = path.join(directoryPath, entry.name);
    const content = fs.readFileSync(filePath, 'utf8');
    if (hasDraftFlag(content)) continue;
    const slug = entry.name.replace(/\.(md|mdx)$/i, '');
    routes.push(`${routePrefix}/${slug}`);
  }

  return routes;
}

if (!fs.existsSync(DIST_SITEMAP_PATH)) {
  console.error(`FAILED: Missing sitemap file at ${DIST_SITEMAP_PATH}`);
  process.exit(1);
}

if (!fs.existsSync(TAXONOMY_PATH)) {
  console.error(`FAILED: Missing taxonomy file at ${TAXONOMY_PATH}`);
  process.exit(1);
}

const sitemapXml = fs.readFileSync(DIST_SITEMAP_PATH, 'utf8');
const sitemapEntries = parseSitemapEntries(sitemapXml);
const sitemapPaths = new Set(sitemapEntries.map((entry) => entry.pathname));
const taxonomySource = fs.readFileSync(TAXONOMY_PATH, 'utf8');

const categories = parseCategorySlugs(taxonomySource);
const calculators = parseCalculators(taxonomySource);
const legacyPaths = parseLegacyRedirectPaths(taxonomySource);

const requiredCategoryPaths = new Set();
for (const { frSlug, enSlug } of categories.values()) {
  requiredCategoryPaths.add(`/fr/${frSlug}`);
  requiredCategoryPaths.add(`/en/${enSlug}`);
}

const requiredCalculatorPaths = new Set();
for (const calculator of calculators) {
  const category = categories.get(calculator.categoryKey);
  if (!category) {
    console.error(`FAILED: Calculator "${calculator.slug}" references unknown category "${calculator.categoryKey}".`);
    process.exit(1);
  }
  requiredCalculatorPaths.add(`/fr/${category.frSlug}/${calculator.slug}`);
  requiredCalculatorPaths.add(`/en/${category.enSlug}/${calculator.slug}`);
}

const requiredBlogPaths = new Set([
  '/blog',
  '/en/blog',
  ...listBlogRoutes(BLOG_FR_DIR, '/blog'),
  ...listBlogRoutes(BLOG_EN_DIR, '/en/blog'),
]);

const allowedPaths = new Set([
  ...REQUIRED_STATIC_PATHS,
  ...requiredCategoryPaths,
  ...requiredCalculatorPaths,
  ...requiredBlogPaths,
]);

const missingCategories = [...requiredCategoryPaths].filter((pathName) => !sitemapPaths.has(pathName));
const missingCalculators = [...requiredCalculatorPaths].filter((pathName) => !sitemapPaths.has(pathName));
const missingBlogs = [...requiredBlogPaths].filter((pathName) => !sitemapPaths.has(pathName));
const missingStatic = [...REQUIRED_STATIC_PATHS].filter((pathName) => !sitemapPaths.has(pathName));

const extraPaths = [...sitemapPaths].filter((pathName) => !allowedPaths.has(pathName));
const legacyPathsInSitemap = [...sitemapPaths].filter(
  (pathName) =>
    legacyPaths.has(pathName) ||
    /^\/calculateurs(?:\/|$)/.test(pathName) ||
    /^\/en\/calculateurs(?:\/|$)/.test(pathName),
);
const has404Paths = [...sitemapPaths].filter((pathName) => pathName.includes('404'));
const queryEntries = sitemapEntries.filter((entry) => entry.hasQuery);

const failures = [];

if (missingStatic.length > 0) {
  failures.push(`Missing required static pages: ${missingStatic.join(', ')}`);
}
if (missingCategories.length > 0) {
  failures.push(`Missing category pages: ${missingCategories.join(', ')}`);
}
if (missingCalculators.length > 0) {
  failures.push(`Missing calculator pages: ${missingCalculators.join(', ')}`);
}
if (missingBlogs.length > 0) {
  failures.push(`Missing blog pages: ${missingBlogs.join(', ')}`);
}
if (legacyPathsInSitemap.length > 0) {
  failures.push(`Legacy URLs found in sitemap: ${legacyPathsInSitemap.join(', ')}`);
}
if (has404Paths.length > 0) {
  failures.push(`404 pages found in sitemap: ${has404Paths.join(', ')}`);
}
if (queryEntries.length > 0) {
  failures.push(`URLs with query params found in sitemap: ${queryEntries.map((entry) => entry.loc).join(', ')}`);
}
if (extraPaths.length > 0) {
  failures.push(`Unexpected URLs not in whitelist: ${extraPaths.join(', ')}`);
}

if (failures.length > 0) {
  console.error('FAILED: Sitemap verification failed.');
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log('OK: Sitemap verification passed.');
console.log(`- Total URLs checked: ${sitemapPaths.size}`);
console.log(`- Categories verified: ${requiredCategoryPaths.size}`);
console.log(`- Calculators verified: ${requiredCalculatorPaths.size}`);
console.log(`- Blog URLs verified: ${requiredBlogPaths.size}`);
