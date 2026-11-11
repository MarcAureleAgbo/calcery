import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { build } from 'esbuild';
import { loadCalculatorEditorial, resolveCalculatorPages, digest, isP31Page } from './lib/calculator-editorial-test-utils.mjs';

const module = await loadCalculatorEditorial();
const pages = resolveCalculatorPages(module);
const baseline = JSON.parse(await readFile('scripts/fixtures/calculator-editorial-p31-baseline.json', 'utf8'));
const protectedPages = pages.filter((page) => !isP31Page(page));
assert.equal(pages.length, 62);
assert.equal(protectedPages.length, 58);
assert.deepEqual(Object.fromEntries(protectedPages.map((page) => [page.route, digest(page)])), baseline.pages,
  `Resolved editorial/SEO/catalog data must stay identical to ${baseline.commit} on all 58 other pages.`);

const expected = {
  '/fr/maison-travaux/surface-piece/': {
    heading: 'Calculer la surface d’une pièce en m²',
    title: 'Surface de pièce en m² : calculateur gratuit | Calcery',
    meta: 'Mesurez la longueur et la largeur de votre pièce pour calculer sa surface en m² et son périmètre en mètres. Outil gratuit, rapide et sans inscription.',
    calculator: '/fr/maison-travaux/quantite-peinture/', blogs: [], example: '17,28 m²',
  },
  '/en/home/room-area/': {
    heading: 'Room Area Calculator in Square Metres (m²)',
    title: 'Room Area Calculator: Square Metres and Perimeter | Calcery',
    meta: 'Enter room length and width in metres to calculate rectangular floor area in m² and perimeter in metres. Free, instant tool with no sign-up required.',
    calculator: '/en/home/paint-quantity/', blogs: [], example: '17.28 m²',
  },
  '/fr/vie-pratique/pourboire/': {
    heading: 'Calculateur de pourboire et partage d’addition',
    title: 'Calculateur de pourboire et partage de note | Calcery',
    meta: 'Calculez un pourboire en euros, le total de l’addition et la part de chacun selon le taux choisi. Calcul gratuit et immédiat, même à plusieurs.',
    calculator: '/fr/vie-pratique/partage-addition/',
    blogs: ['/fr/blog/pourboire-regles-pratiques-voyage/', '/fr/blog/partage-addition-entre-amis-guide/'], example: '30,80 €',
  },
  '/en/daily-life/tip-calculator/': {
    heading: 'Tip Calculator and Equal Bill Split', title: 'Tip Calculator: Amount and Split the Bill | Calcery',
    meta: 'Calculate a tip, total bill and equal amount per person using your chosen percentage. Free instant calculator for euro amounts, with no account needed.',
    calculator: '/en/daily-life/split-bill/',
    blogs: ['/en/blog/tipping-guide-home-and-travel/', '/en/blog/split-bill-with-friends/'], example: '€30.80',
  },
};
const approved = JSON.parse(await readFile('scripts/fixtures/calculator-editorial-p31-approved.json', 'utf8'));
const forbidden = /intuition|monthly and annual|mensuelles et annuelles|three passes|trois passes|scénario central|baseline scenario|zone critique|critical zone|recalcul mensuel|monthly updates|plan d’action concret|actionable execution plan/i;
const decode = (text) => text.replace(/&#(?:x([\da-f]+)|(\d+));/gi, (_, hex, decimal) => String.fromCodePoint(parseInt(hex ?? decimal, hex ? 16 : 10)))
  .replace(/&quot;/g, '"').replace(/&apos;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
const textContent = (html) => decode(html.replace(/<[^>]*>/g, '')).replace(/\s+/g, ' ').trim();
const built = process.argv.includes('--built');
if (built) {
  for (const page of protectedPages) {
    const html = await readFile(`dist${page.route}index.html`, 'utf8');
    const schemas = [...html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>(.*?)<\/script>/gs)]
      .map((match) => JSON.parse(match[1]));
    assert.equal(digest(schemas), baseline.structuredData[page.route], `Unchanged JSON-LD: ${page.route}`);
    assert.equal(decode(html.match(/<title>(.*?)<\/title>/s)[1]), page.metaTitle);
    assert.equal(decode(html.match(/<meta\b[^>]*name="description"[^>]*content="([^"]*)"/)[1]), page.metaDescription);
    assert.equal(textContent(html.match(/<h1\b[^>]*>(.*?)<\/h1>/s)[1]), page.heading);
  }
}
for (const page of pages.filter(isP31Page)) {
  const spec = expected[page.route];
  assert.ok(spec);
  assert.equal(page.heading, spec.heading);
  assert.equal(page.metaTitle, spec.title);
  assert.equal(page.metaDescription, spec.meta);
  assert.equal(digest({ description: page.description, content: page.content }), approved.pages[page.route], 'Approved source copy must be preserved.');
  assert.equal(page.content.faqs.length, 5);
  assert.equal(page.content.scenarios.length, 3);
  assert.equal(page.content.replaceSupplementaryContent, true);
  assert.deepEqual(page.content.thresholds, []);
  assert.equal(page.content.riskNotice, '');
  assert.deepEqual(page.content.relatedCalculators.map((link) => link.href), [spec.calculator]);
  assert.deepEqual(page.content.relatedBlogPosts.map((link) => link.href), spec.blogs);
  assert.match(JSON.stringify(page.content), new RegExp(spec.example.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
  assert.ok(!forbidden.test(JSON.stringify(page.content)), page.route);
  assert.ok(page.metaTitle.length >= 50 && page.metaTitle.length <= 60);
  assert.ok(page.metaDescription.length >= 140 && page.metaDescription.length <= 160);
  if (page.lang === 'fr' && page.slug === 'pourboire') {
    assert.equal(page.content.sources[0].href, 'https://www.economie.gouv.fr/dgccrf/les-fiches-pratiques/pourboire');
  }
  if (!built) continue;
  const html = await readFile(`dist${page.route}index.html`, 'utf8');
  assert.equal(decode(html.match(/<title>(.*?)<\/title>/s)[1]), spec.title);
  assert.equal(decode(html.match(/<meta\b[^>]*name="description"[^>]*content="([^"]*)"/)[1]), spec.meta);
  assert.equal(textContent(html.match(/<h1\b[^>]*>(.*?)<\/h1>/s)[1]), spec.heading);
  assert.equal([...html.matchAll(/<h1\b/g)].length, 1);
  assert.ok(textContent(html).includes(page.description));
  const faqs = [...html.matchAll(/<details\b[^>]*>(.*?)<\/details>/gs)].map((match) => {
    const question = textContent(match[1].match(/<summary\b[^>]*>(.*?)<\/summary>/s)[1]);
    const answer = textContent(match[1].match(/<p\b[^>]*>(.*?)<\/p>/s)[1]);
    return { question, answer };
  });
  const scripts = [...html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>(.*?)<\/script>/gs)].map((match) => JSON.parse(match[1]));
  const faqSchema = scripts.find((schema) => schema['@type'] === 'FAQPage');
  assert.deepEqual(faqs, page.content.faqs);
  assert.deepEqual(faqSchema.mainEntity.map((item) => ({ question: item.name, answer: item.acceptedAnswer.text })), faqs);
  assert.ok(!forbidden.test(textContent(html)), page.route);
  assert.ok(!html.includes('Seuils de décision') && !html.includes('Decision thresholds'));
  for (const paragraph of [...page.content.introduction, ...page.content.howItWorks, ...page.content.interpretation]) {
    assert.ok(textContent(html).includes(paragraph), `Missing approved paragraph on ${page.route}`);
  }
  for (const link of [...page.content.relatedCalculators, ...page.content.relatedBlogPosts]) {
    assert.ok(html.includes(`href="${link.href}"`));
    await readFile(`dist${link.href}index.html`);
  }
  if (page.slug === 'surface-piece') {
    assert.ok(!html.includes('Articles de blog recommandés') && !html.includes('Recommended blog articles'));
  }
}
console.log(`OK: 4 approved FR/EN pages; all 58 other resolved outputs unchanged${built ? '; rendered metadata/FAQ JSON-LD/links verified' : ''}.`);

assert.deepEqual(module.calculateRoomSurface(4.8, 3.6), { surfaceM2: 17.28, perimeterM: 16.8 });
// Feed the approved example to the actual React component in memory. Only the
// initial state values are replaced; the arithmetic and formatting stay intact.
const tipSource = await readFile('src/components/calculators/TipCalculator.tsx', 'utf8');
assert.ok(tipSource.includes('useState<number>(0)') && tipSource.includes('useState<number>(1)'));
const tipBundle = await build({
  stdin: {
    contents: tipSource.replace('useState<number>(0)', 'useState<number>(84)')
      .replace('useState<number>(1)', 'useState<number>(3)')
      + "\nexport { React }; export {renderToStaticMarkup} from 'react-dom/server';",
    loader: 'tsx', resolveDir: `${process.cwd()}/src/components/calculators`,
  },
  bundle: true, write: false, platform: 'node', format: 'esm',
  banner: { js: `import {createRequire} from 'node:module'; const require=createRequire(${JSON.stringify(`${process.cwd()}/package.json`)});` },
});
const tip = await import(`data:text/javascript;base64,${Buffer.from(tipBundle.outputFiles[0].text).toString('base64')}`);
for (const lang of ['fr', 'en']) {
  const rendered = textContent(tip.renderToStaticMarkup(tip.React.createElement(tip.default, { lang })));
  for (const amount of ['8.40 €', '92.40 €', '30.80 €']) assert.ok(rendered.includes(amount));
}
console.log('OK: actual surface formula and tip React example (84 EUR / 10% / 3 people), unchanged rounding.');
