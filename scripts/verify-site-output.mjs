import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const distDir = path.join(root, 'dist');
const sitemapPath = path.join(distDir, 'sitemap.xml');
const siteOrigin = 'https://calcery.com';
const failures = [];

function walkHtml(directory) {
  const files = [];
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const filePath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      files.push(...walkHtml(filePath));
    } else if (entry.isFile() && entry.name.endsWith('.html')) {
      files.push(filePath);
    }
  }
  return files;
}

function extract(html, pattern) {
  return html.match(pattern)?.[1]?.trim() ?? '';
}

function addUsage(map, value, route) {
  if (!value) return;
  const routes = map.get(value) ?? [];
  routes.push(route);
  map.set(value, routes);
}

function routeFromFile(filePath) {
  const relative = path.relative(distDir, filePath).split(path.sep).join('/');
  if (relative === 'index.html') return '/';
  if (relative.endsWith('/index.html')) return `/${relative.slice(0, -'index.html'.length)}`;
  return `/${relative.replace(/\.html$/, '')}`;
}

function fileFromUrl(url) {
  const pathname = new URL(url).pathname;
  if (pathname === '/') return path.join(distDir, 'index.html');
  return path.join(distDir, pathname.replace(/^\/+/, ''), 'index.html');
}

if (!fs.existsSync(distDir) || !fs.existsSync(sitemapPath)) {
  console.error('FAILED: Build output is missing. Run the Astro build first.');
  process.exit(1);
}

const htmlFiles = walkHtml(distDir);
const titleUsage = new Map();
const descriptionUsage = new Map();

for (const filePath of htmlFiles) {
  const html = fs.readFileSync(filePath, 'utf8');
  const route = routeFromFile(filePath);
  const title = extract(html, /<title>([\s\S]*?)<\/title>/i);
  const description = extract(
    html,
    /<meta\b[^>]*name=["']description["'][^>]*content=["']([^"']*)["'][^>]*>/i,
  );
  const canonical = extract(
    html,
    /<link\b[^>]*rel=["']canonical["'][^>]*href=["']([^"']+)["'][^>]*>/i,
  );

  if (!title) failures.push(`[${route}] Missing title.`);
  if (!description) failures.push(`[${route}] Missing meta description.`);
  if (!canonical) failures.push(`[${route}] Missing canonical URL.`);
  if (/name=["']robots["'][^>]*content=["'][^"']*noindex/i.test(html)) {
    failures.push(`[${route}] Unexpected noindex directive.`);
  }
  if (/http-equiv=["']refresh["']/i.test(html)) {
    failures.push(`[${route}] Unexpected HTML meta refresh.`);
  }
  if (/<script\b[^>]*src=["']https:\/\/pagead2\.googlesyndication\.com\/pagead\/js\/adsbygoogle/i.test(html)) {
    failures.push(`[${route}] AdSense is loaded before consent.`);
  }

  addUsage(titleUsage, title, route);
  addUsage(descriptionUsage, description, route);
}

for (const [title, routes] of titleUsage.entries()) {
  if (routes.length > 1) failures.push(`Duplicate title "${title}" on: ${routes.join(', ')}`);
}

for (const [description, routes] of descriptionUsage.entries()) {
  if (routes.length > 1) {
    failures.push(`Duplicate meta description "${description}" on: ${routes.join(', ')}`);
  }
}

const sitemap = fs.readFileSync(sitemapPath, 'utf8');
const sitemapUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);

for (const url of sitemapUrls) {
  if (!url.startsWith(`${siteOrigin}/`) && url !== `${siteOrigin}/`) {
    failures.push(`Unexpected sitemap origin: ${url}`);
    continue;
  }

  const filePath = fileFromUrl(url);
  if (!fs.existsSync(filePath)) {
    failures.push(`Sitemap URL has no generated page: ${url}`);
    continue;
  }

  const html = fs.readFileSync(filePath, 'utf8');
  const canonical = extract(
    html,
    /<link\b[^>]*rel=["']canonical["'][^>]*href=["']([^"']+)["'][^>]*>/i,
  );
  if (canonical !== url) {
    failures.push(`Canonical mismatch for ${url}: found "${canonical || 'missing'}".`);
  }
}

for (const locale of ['fr/sante', 'en/health']) {
  const healthDir = path.join(distDir, locale);
  for (const entry of fs.readdirSync(healthDir, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const filePath = path.join(healthDir, entry.name, 'index.html');
    if (!fs.existsSync(filePath)) continue;
    const html = fs.readFileSync(filePath, 'utf8');
    if (!html.includes('"applicationCategory":"HealthApplication"')) {
      failures.push(`[/${locale}/${entry.name}/] Missing HealthApplication structured data.`);
    }
    if (!/(professionnel de santé|healthcare professional)/i.test(html)) {
      failures.push(`[/${locale}/${entry.name}/] Missing health disclaimer.`);
    }
  }
}

if (failures.length > 0) {
  console.error('FAILED: Site output verification failed.');
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log('OK: Site output verification passed.');
console.log(`- HTML pages scanned: ${htmlFiles.length}`);
console.log(`- Sitemap pages matched to canonicals: ${sitemapUrls.length}`);
console.log('- Duplicate titles and descriptions: 0');
console.log('- noindex and HTML meta refresh pages: 0');
console.log('- AdSense static pre-consent loads: 0');
