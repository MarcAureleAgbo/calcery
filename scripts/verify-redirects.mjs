import fs from 'node:fs';
import path from 'node:path';
import { PATH_REDIRECTS } from '../redirects.config.mjs';

const root = process.cwd();
const redirectsPath = path.join(root, 'public', '_redirects');
const astroConfigPath = path.join(root, 'astro.config.mjs');
const distPath = path.join(root, 'dist');
const failures = [];

if (!fs.existsSync(redirectsPath)) {
  failures.push('public/_redirects is missing.');
}

const content = fs.existsSync(redirectsPath) ? fs.readFileSync(redirectsPath, 'utf8') : '';
const rules = content
  .split(/\r?\n/)
  .map((line) => line.trim())
  .filter((line) => line && !line.startsWith('#'))
  .map((line) => {
    const [source, destination, status] = line.split(/\s+/);
    return { source, destination, status };
  });

const ruleBySource = new Map();
for (const rule of rules) {
  if (ruleBySource.has(rule.source)) {
    failures.push(`Duplicate redirect source: ${rule.source}`);
  }
  ruleBySource.set(rule.source, rule);
}

const normalizedSources = new Set(PATH_REDIRECTS.map(([source]) => source));
for (const [source, destination] of PATH_REDIRECTS) {
  for (const variant of [source, `${source}/`]) {
    const rule = ruleBySource.get(variant);
    if (!rule || rule.destination !== destination || rule.status !== '301') {
      failures.push(`Missing static HTTP redirect: ${variant} -> ${destination}`);
    }
  }

  if (normalizedSources.has(destination.replace(/\/+$/, ''))) {
    failures.push(`Redirect chain detected: ${source} -> ${destination}`);
  }
}

for (const rule of rules) {
  if (!rule.source.startsWith('/')) {
    failures.push(`Cloudflare Pages does not support domain-level sources in _redirects: ${rule.source}`);
  }
}

const astroConfig = fs.readFileSync(astroConfigPath, 'utf8');
if (/^\s*redirects\s*:/m.test(astroConfig)) {
  failures.push('Astro redirects are still configured and would generate HTML redirect pages.');
}

if (fs.existsSync(distPath)) {
  const stack = [distPath];
  while (stack.length > 0) {
    const current = stack.pop();
    for (const entry of fs.readdirSync(current, { withFileTypes: true })) {
      const filePath = path.join(current, entry.name);
      if (entry.isDirectory()) {
        stack.push(filePath);
      } else if (entry.name.endsWith('.html')) {
        const html = fs.readFileSync(filePath, 'utf8');
        if (/http-equiv=["']refresh["']/i.test(html) && /name=["']robots["'][^>]+noindex/i.test(html)) {
          failures.push(`HTML redirect page found in dist: ${path.relative(root, filePath)}`);
        }
      }
    }
  }
}

if (failures.length > 0) {
  console.error('FAILED: Redirect verification failed.');
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log('OK: Redirect verification passed.');
console.log(`- Canonical mappings: ${PATH_REDIRECTS.length}`);
console.log(`- Static HTTP redirect rules: ${PATH_REDIRECTS.length * 2}`);
console.log('- Astro HTML redirect pages: 0');
