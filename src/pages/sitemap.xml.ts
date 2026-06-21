import { getCollection } from 'astro:content';
import {
  CALCULATORS,
  CATEGORIES,
  getCalculatorRoute,
  getCalculatorsByCategory,
  getCategoryRoute,
} from '../lib/calculator-taxonomy';
import { toAbsoluteUrl } from '../lib/site';

interface SitemapEntry {
  path: string;
  lastmod: string;
}

const SITE_RELEASE_DATE = '2026-06-21';
const LEGAL_CONTENT_DATE = '2026-02-08';

const STATIC_ENTRIES: SitemapEntry[] = [
  { path: '/', lastmod: SITE_RELEASE_DATE },
  { path: '/a-propos/', lastmod: LEGAL_CONTENT_DATE },
  { path: '/contact/', lastmod: SITE_RELEASE_DATE },
  { path: '/confidentialite/', lastmod: LEGAL_CONTENT_DATE },
  { path: '/mentions-legales/', lastmod: LEGAL_CONTENT_DATE },
  { path: '/fr/calculateurs/', lastmod: SITE_RELEASE_DATE },
  { path: '/fr/blog/', lastmod: SITE_RELEASE_DATE },
  { path: '/en/', lastmod: SITE_RELEASE_DATE },
  { path: '/en/a-propos/', lastmod: LEGAL_CONTENT_DATE },
  { path: '/en/contact/', lastmod: SITE_RELEASE_DATE },
  { path: '/en/confidentialite/', lastmod: LEGAL_CONTENT_DATE },
  { path: '/en/mentions-legales/', lastmod: LEGAL_CONTENT_DATE },
  { path: '/en/calculators/', lastmod: SITE_RELEASE_DATE },
  { path: '/en/blog/', lastmod: SITE_RELEASE_DATE },
];

const toDateString = (value: Date | string) => new Date(value).toISOString().slice(0, 10);

const escapeXml = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');

export async function GET() {
  const [frPosts, enPosts] = await Promise.all([
    getCollection('blog', (post) => !post.data.draft),
    getCollection('blogEn', (post) => !post.data.draft),
  ]);

  const categoryEntries = CATEGORIES.flatMap((category) => {
    const calculators = getCalculatorsByCategory(category.key);
    const categoryContentDate = calculators.reduce(
      (latest, calculator) => (calculator.updatedAt > latest ? calculator.updatedAt : latest),
      SITE_RELEASE_DATE,
    );

    return [
      { path: getCategoryRoute('fr', category.key), lastmod: categoryContentDate },
      { path: getCategoryRoute('en', category.key), lastmod: categoryContentDate },
    ];
  });

  const calculatorEntries = CALCULATORS.flatMap((calculator) => [
    { path: getCalculatorRoute('fr', calculator.slug), lastmod: calculator.updatedAt },
    { path: getCalculatorRoute('en', calculator.slug), lastmod: calculator.updatedAt },
  ]);

  const blogEntries: SitemapEntry[] = [
    ...frPosts.map((post) => ({
      path: `/fr/blog/${post.id}/`,
      lastmod: toDateString(post.data.updatedDate ?? post.data.pubDate ?? post.data.date!),
    })),
    ...enPosts.map((post) => ({
      path: `/en/blog/${post.id}/`,
      lastmod: toDateString(post.data.updatedDate ?? post.data.pubDate ?? post.data.date!),
    })),
  ];

  const entries = [...STATIC_ENTRIES, ...categoryEntries, ...calculatorEntries, ...blogEntries].sort(
    (a, b) => a.path.localeCompare(b.path),
  );

  const xmlEntries = entries
    .map(
      ({ path, lastmod }) =>
        `  <url>\n    <loc>${escapeXml(toAbsoluteUrl(path))}</loc>\n    <lastmod>${lastmod}</lastmod>\n  </url>`,
    )
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${xmlEntries}\n</urlset>\n`;

  return new Response(xml, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'X-Robots-Tag': 'all',
    },
  });
}
