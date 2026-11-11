import { build } from 'esbuild';
import { createHash } from 'node:crypto';

export async function loadCalculatorEditorial() {
  const result = await build({
    stdin: {
      contents: "export * from './src/lib/calculator-taxonomy'; export * from './src/lib/calculator-seo-content'; export * from './src/lib/new-calculator-formulas';",
      resolveDir: process.cwd(),
    },
    bundle: true, write: false, platform: 'node', format: 'esm',
  });
  return import(`data:text/javascript;base64,${Buffer.from(result.outputFiles[0].text).toString('base64')}`);
}

export function resolveCalculatorPages(module) {
  return module.CALCULATORS.flatMap((calculator) => ['fr', 'en'].map((lang) => ({
    slug: calculator.slug,
    lang,
    route: module.getCalculatorRoute(lang, calculator.slug),
    calculator,
    heading: module.getCalculatorPageHeading(calculator, lang),
    metaTitle: module.getCalculatorMetaTitle(calculator, lang),
    metaDescription: module.getCalculatorMetaDescription(calculator, lang),
    description: module.getCalculatorPageDescription?.(calculator, lang) ?? calculator.description[lang],
    content: module.getCalculatorSeoContent(calculator, lang),
  })));
}

export const digest = (value) => createHash('sha256').update(JSON.stringify(value)).digest('hex');
export const isP31Page = (page) => ['surface-piece', 'pourboire'].includes(page.slug);
