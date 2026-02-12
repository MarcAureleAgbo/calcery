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
