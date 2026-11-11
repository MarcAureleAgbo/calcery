import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { build } from 'esbuild';

// Expose internal configs only in this in-memory test bundle, not in production.
const source = await readFile('src/components/calculators/UnifiedCalculator.tsx', 'utf8');
const result = await build({
  stdin: {
    contents: `${source}\nexport { React, calculatorConfigs, calendarCalculatorTexts, localizeCalendarError };\nexport { renderToStaticMarkup } from 'react-dom/server';`,
    loader: 'tsx',
    resolveDir: `${process.cwd()}/src/components/calculators`,
  },
  bundle: true, write: false, platform: 'node', format: 'esm',
  banner: { js: `import { createRequire } from 'node:module'; const require = createRequire(${JSON.stringify(`${process.cwd()}/package.json`)});` },
});
const { default: Component, React, calculatorConfigs, calendarCalculatorTexts, localizeCalendarError, renderToStaticMarkup } =
  await import(`data:text/javascript;base64,${Buffer.from(result.outputFiles[0].text).toString('base64')}`);

const cases = [
  ['2025-01-31', '2025-03-01', '0 an, 0 mois, 29 jours', '0 years, 0 months, 29 days', 29],
  ['2025-01-01', '2025-01-01', '0 an, 0 mois, 0 jour', '0 years, 0 months, 0 days', 0],
  ['2025-01-01', '2025-01-02', '0 an, 0 mois, 1 jour', '0 years, 0 months, 1 day', 1],
  ['2025-01-01', '2025-01-03', '0 an, 0 mois, 2 jours', '0 years, 0 months, 2 days', 2],
  ['2020-01-01', '2021-02-02', '1 an, 1 mois, 1 jour', '1 year, 1 month, 1 day', 398],
  ['2020-01-01', '2022-03-03', '2 ans, 2 mois, 2 jours', '2 years, 2 months, 2 days', 792],
  ['2024-02-29', '2025-02-28', '0 an, 11 mois, 30 jours', '0 years, 11 months, 30 days', 365],
];
for (const lang of ['fr', 'en']) {
  for (const slug of ['difference-entre-deux-dates', 'age-exact']) {
    const config = calculatorConfigs[slug];
    const isAge = slug === 'age-exact';
    for (const [start, end, fr, en, totalDays] of cases) {
      const values = isAge ? { birthDate: start, referenceDate: end } : { startDate: start, endDate: end };
      const output = config.calculate(values, lang);
      assert.equal(output.rows[0].value, lang === 'fr' ? fr : en);
      assert.equal(output.rows[0].label[lang], isAge
        ? (lang === 'fr' ? 'Âge exact' : 'Exact age')
        : (lang === 'fr' ? 'Durée calendaire' : 'Calendar duration'));
      if (!isAge) assert.equal(output.rows[1].value, totalDays);
    }
    const html = renderToStaticMarkup(React.createElement(Component, { slug, lang }));
    for (const field of config.fields) assert.ok(html.includes(field.label[lang]));
    assert.ok(html.includes(lang === 'fr' ? 'Réinitialiser' : 'Reset'));
    assert.ok(html.includes(lang === 'fr' ? 'Calculer' : 'Calculate'));
    if (lang === 'fr') assert.ok(!html.includes('>Reset<'));
  }
}

assert.equal(calendarCalculatorTexts.fr.results, 'Résultats');
assert.equal(calendarCalculatorTexts.en.results, 'Results');
assert.equal(calendarCalculatorTexts.fr.requiredPrefix, 'Champ requis :');
assert.equal(calendarCalculatorTexts.en.requiredPrefix, 'Required field:');
for (const lang of ['fr', 'en']) {
  assert.equal(localizeCalendarError(new Error('Invalid date value.'), lang), lang === 'fr' ? 'Date invalide.' : 'Invalid date.');
  assert.equal(localizeCalendarError(new Error('End date must be after start date.'), lang), lang === 'fr'
    ? 'La date de fin ou de référence doit être égale ou postérieure à la date de début ou de naissance.'
    : 'The end or reference date must be on or after the start or birth date.');
  assert.equal(localizeCalendarError(new Error('Unexpected English internals'), lang), calendarCalculatorTexts[lang].calcError);
}
// Scope guard: shared UI text for a non-calendar calculator stays unchanged.
const otherHtml = renderToStaticMarkup(React.createElement(Component, { slug: 'surface-piece', lang: 'fr' }));
assert.ok(otherHtml.includes('>Reset<'));
assert.ok(!otherHtml.includes('Réinitialiser'));
console.log(`OK: ${cases.length * 4} calendar localization results, FR/EN labels, errors, SSR controls and scope guard.`);
