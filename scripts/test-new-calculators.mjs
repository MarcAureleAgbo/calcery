import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { build } from 'esbuild';

const tempDir = await fs.mkdtemp(path.join(os.tmpdir(), 'calcery-formulas-'));
const outfile = path.join(tempDir, 'new-calculator-formulas.mjs');

try {
  await build({
    entryPoints: ['src/lib/new-calculator-formulas.ts'],
    outfile,
    bundle: true,
    platform: 'node',
    format: 'esm',
    sourcemap: false,
    logLevel: 'silent',
  });

  const formulas = await import(`${pathToFileURL(outfile).href}?ts=${Date.now()}`);

  assert.equal(Math.round(formulas.calculateDebtRatio(3000, 900)), 30);
  assert.ok(formulas.calculateLoanMonthlyPayment(100000, 3, 20) > 500);
  assert.ok(formulas.calculatePersonalLoan(10000, 5, 4).totalCost > 0);
  assert.equal(Math.round(formulas.estimateNetSalaryFromGross(3000)), 2340);
  assert.equal(Math.round(formulas.estimateGrossSalaryFromNet(2340)), 3000);
  assert.equal(Math.round(formulas.calculateTtcFromHt(100, 20)), 120);
  assert.equal(Math.round(formulas.calculateHtFromTtc(120, 20)), 100);
  const zeroBracket = formulas.estimateFrenchIncomeTax2026(11600, 1);
  assert.equal(zeroBracket.estimatedGrossTax, 0);
  assert.equal(zeroBracket.marginalRate, 0);
  const elevenPercentBracket = formulas.estimateFrenchIncomeTax2026(20000, 1);
  assert.equal(elevenPercentBracket.estimatedGrossTax, (20000 - 11600) * 0.11);
  assert.equal(elevenPercentBracket.marginalRate, 0.11);
  const thirtyPercentBracket = formulas.estimateFrenchIncomeTax2026(30000, 1);
  assert.equal(thirtyPercentBracket.estimatedGrossTax, (29579 - 11600) * 0.11 + (30000 - 29579) * 0.3);
  assert.equal(formulas.estimateFrenchIncomeTax2026(90000, 1).marginalRate, 0.41);
  assert.equal(formulas.estimateFrenchIncomeTax2026(200000, 1).marginalRate, 0.45);
  const twoShares = formulas.estimateFrenchIncomeTax2026(60000, 2);
  assert.equal(twoShares.estimatedGrossTax, 2 * ((29579 - 11600) * 0.11 + (30000 - 29579) * 0.3));
  for (const taxShares of [1.25, 1.5, 2.25]) {
    const estimate = formulas.estimateFrenchIncomeTax2026(50_000, taxShares);
    assert.equal(estimate.taxableIncomePerShare, 50_000 / taxShares);
    assert.ok(estimate.estimatedGrossTax > 0);
  }
  for (const threshold of [11600, 29579, 84577, 181917]) {
    const atThreshold = formulas.estimateFrenchIncomeTax2026(threshold, 1);
    const aboveThreshold = formulas.estimateFrenchIncomeTax2026(threshold + 1, 1);
    assert.ok(aboveThreshold.estimatedGrossTax >= atThreshold.estimatedGrossTax);
  }
  assert.throws(() => formulas.estimateFrenchIncomeTax2026(-1, 1));
  assert.throws(() => formulas.estimateFrenchIncomeTax2026(1000, 0));
  assert.throws(() => formulas.estimateFrenchIncomeTax2026(1000, -1));
  assert.throws(() => formulas.estimateFrenchIncomeTax2026(1000, 1.1), /0\.25-share increments/);
  assert.throws(() => formulas.estimateFrenchIncomeTax2026(Number.NaN, 1));
  assert.equal(formulas.calculateMonthlySavingsCapacity(2500, 1900), 600);
  assert.ok(formulas.calculateSavingsGoalDurationMonths(10000, 500, 0, 0) === 20);
  assert.ok(formulas.calculateBodyMassIndex(70, 175) > 20);
  assert.ok(formulas.calculateDailyCalories(30, 'male', 75, 180, 1.55).maintenanceCalories > 2000);
  assert.ok(formulas.calculateIdealWeight(175, 'female') > 55);
  assert.ok(formulas.calculateDailyWaterNeedLiters(70, 45) > 2);
  assert.ok(formulas.calculateTargetHeartRate(35, 70).targetHeartRate > 120);
  assert.ok(formulas.calculateActivityCaloriesBurned(70, 60, 6) > 300);
  assert.ok(formulas.calculateMortgageBorrowingCapacity(4000, 900, 3, 20, 35).borrowingCapacity > 80000);
  assert.ok(formulas.calculateNotaryFees(200000, 7.5).fees > 10000);
  assert.equal(Math.round(formulas.calculateGrossRentalYield(12000, 200000) * 10) / 10, 6);
  assert.ok(formulas.calculateNetRentalYield(12000, 2500, 200000, 10000) > 4);
  assert.equal(formulas.calculateDateDifference('2024-01-01', '2024-01-31').totalDays, 30);
  assert.equal(formulas.calculateExactAge('2000-01-01', '2020-01-01').years, 20);
  assert.equal(Math.round(formulas.calculateFuelConsumption(35, 500, 1.8).litersPer100km * 10) / 10, 7);
  assert.ok(formulas.calculatePaintQuantity(40, 2, 10) === 8);
  assert.ok(formulas.calculateRoomSurface(5, 4).surfaceM2 === 20);
  assert.equal(formulas.calculateWeightedAverage([10, 15, 20], [1, 2, 3]), 100 / 6);

  console.log('OK: new calculator formula tests passed.');
} finally {
  await fs.rm(tempDir, { recursive: true, force: true });
}
