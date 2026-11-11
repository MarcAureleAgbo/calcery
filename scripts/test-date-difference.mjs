import assert from 'node:assert/strict';
import { pathToFileURL } from 'node:url';
import { build } from 'esbuild';

// Expected values freeze the subtraction/borrowing convention, not month-end clamping.
// Explicit negative age expectations are TEMPORARY CHARACTERIZATION of a known
// defect, not desired business behavior. Replace them with corrected expectations
// when the separate exact-age fix is implemented (see docs/STATUS.md).
const cases = [
  ['2025-01-31', '2025-03-01', [0, 0, 29, 29], [0, 1, -2]],
  ['2025-01-31', '2025-03-02', [0, 0, 30, 30], [0, 1, -1]],
  ['2024-01-31', '2024-03-01', [0, 0, 30, 30], [0, 1, -1]],
  ['2025-01-30', '2025-03-01', [0, 0, 30, 30], [0, 1, -1]],
  ['2024-02-28', '2024-03-01', [0, 0, 2, 2]],
  ['2025-02-28', '2025-03-01', [0, 0, 1, 1]],
  ['2024-12-31', '2025-01-01', [0, 0, 1, 1]],
  ['2025-03-01', '2025-03-01', [0, 0, 0, 0]],
  ['2025-01-31', '2025-02-28', [0, 0, 28, 28]],
  ['2024-01-31', '2024-02-29', [0, 0, 29, 29]],
  ['2024-02-29', '2025-02-28', [0, 11, 30, 365]],
  ['2024-02-29', '2025-03-01', [1, 0, 0, 366]],
  ['2025-03-31', '2025-05-01', [0, 1, 0, 31]],
  ['2025-08-31', '2025-10-01', [0, 1, 0, 31]],
  ['2024-01-31', '2025-03-01', [1, 0, 29, 395], [1, 1, -2]],
  ['2023-01-15', '2025-10-02', [2, 8, 17, 991]],
  ['2000-01-01', '2020-01-01', [20, 0, 0, 7305]],
  ['2025-03-29', '2025-03-31', [0, 0, 2, 2]],
  ['2025-10-25', '2025-10-27', [0, 0, 2, 2]],
];

export function testDateDifferences(formulas) {
  const originalTimezone = process.env.TZ;
  try {
    for (const timezone of ['UTC', 'Europe/Paris', 'America/New_York', 'Pacific/Kiritimati']) {
      process.env.TZ = timezone;
      for (const [start, end, expected, legacyAge = expected.slice(0, 3)] of cases) {
        const [years, months, days, totalDays] = expected;
        const context = `${start} -> ${end} (${timezone})`;
        const actual = formulas.calculateDateDifference(start, end);
        assert.deepEqual(actual, { years, months, days, totalDays }, context);
        assert.ok(actual.years >= 0 && actual.months >= 0 && actual.months < 12 && actual.days >= 0, context);
        const [ageYears, ageMonths, ageDays] = legacyAge;
        // TEMPORARY known-defect characterization for negative ageDays; replace on age fix.
        assert.deepEqual(formulas.calculateExactAge(start, end), {
          years: ageYears, months: ageMonths, days: ageDays,
        }, `${ageDays < 0 ? 'TEMPORARY known age defect' : 'Age compatibility'}: ${context}`);
      }
      for (const calculate of [formulas.calculateDateDifference, formulas.calculateExactAge]) {
        assert.throws(() => calculate('2025-03-01', '2025-01-31'), /End date must be after start date/);
        assert.throws(() => calculate('invalid', '2025-01-31'), /Invalid date value/);
        assert.throws(() => calculate('2025-01-31', 'invalid'), /Invalid date value/);
      }
    }
  } finally {
    if (originalTimezone === undefined) delete process.env.TZ;
    else process.env.TZ = originalTimezone;
  }
  console.log(`OK: ${cases.length} date/age regression cases in 4 timezones, including rejection tests.`);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const result = await build({
    entryPoints: ['src/lib/new-calculator-formulas.ts'],
    bundle: true, write: false, platform: 'node', format: 'esm',
  });
  const formulas = await import(`data:text/javascript;base64,${Buffer.from(result.outputFiles[0].text).toString('base64')}`);
  testDateDifferences(formulas);
}
