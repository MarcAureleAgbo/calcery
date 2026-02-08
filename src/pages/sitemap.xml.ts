import { toAbsoluteUrl } from '../lib/site';

export async function GET() {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <sitemap>\n    <loc>${toAbsoluteUrl('/sitemap-0.xml')}</loc>\n  </sitemap>\n</sitemapindex>`;
  return new Response(xml, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
}
