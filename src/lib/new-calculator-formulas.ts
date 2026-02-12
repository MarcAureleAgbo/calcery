export type Sex = 'male' | 'female';

export function ensurePositive(value: number, fieldName: string): number {
  if (!Number.isFinite(value) || value < 0) {
    throw new Error(`${fieldName} must be a positive number.`);
  }
  return value;
}

export function calculateDebtRatio(monthlyIncome: number, monthlyCharges: number): number {
  const income = ensurePositive(monthlyIncome, 'monthlyIncome');
  const charges = ensurePositive(monthlyCharges, 'monthlyCharges');
  if (income <= 0) {
    throw new Error('monthlyIncome must be greater than 0.');
  }
  return (charges / income) * 100;
}

export function calculateLoanMonthlyPayment(
  principal: number,
  annualRatePercent: number,
  years: number,
): number {
  const capital = ensurePositive(principal, 'principal');
  const rate = ensurePositive(annualRatePercent, 'annualRatePercent');
  const durationYears = ensurePositive(years, 'years');
  if (durationYears <= 0) {
    throw new Error('years must be greater than 0.');
  }

  const months = Math.round(durationYears * 12);
  if (months <= 0) {
    throw new Error('Loan duration is too short.');
  }

  if (rate === 0) {
    return capital / months;
  }

  const monthlyRate = rate / 100 / 12;
  return (capital * monthlyRate) / (1 - (1 + monthlyRate) ** -months);
}

export function calculatePersonalLoan(
  principal: number,
  annualRatePercent: number,
  years: number,
): { monthlyPayment: number; totalAmount: number; totalCost: number } {
  const monthlyPayment = calculateLoanMonthlyPayment(principal, annualRatePercent, years);
  const months = Math.round(years * 12);
  const totalAmount = monthlyPayment * months;
  const totalCost = totalAmount - principal;
  return { monthlyPayment, totalAmount, totalCost };
}

export function estimateNetSalaryFromGross(grossSalary: number, netRatio = 0.78): number {
  const gross = ensurePositive(grossSalary, 'grossSalary');
  if (netRatio <= 0 || netRatio >= 1) {
    throw new Error('netRatio must be between 0 and 1.');
  }
  return gross * netRatio;
}

export function estimateGrossSalaryFromNet(netSalary: number, netRatio = 0.78): number {
  const net = ensurePositive(netSalary, 'netSalary');
  if (netRatio <= 0 || netRatio >= 1) {
    throw new Error('netRatio must be between 0 and 1.');
  }
  return net / netRatio;
}

export function calculateTtcFromHt(amountHt: number, vatRatePercent: number): number {
  const ht = ensurePositive(amountHt, 'amountHt');
  const vatRate = ensurePositive(vatRatePercent, 'vatRatePercent');
  return ht * (1 + vatRate / 100);
}

export function calculateHtFromTtc(amountTtc: number, vatRatePercent: number): number {
  const ttc = ensurePositive(amountTtc, 'amountTtc');
  const vatRate = ensurePositive(vatRatePercent, 'vatRatePercent');
  return ttc / (1 + vatRate / 100);
}

export function calculateMonthlySavingsCapacity(monthlyIncome: number, monthlyExpenses: number): number {
  const income = ensurePositive(monthlyIncome, 'monthlyIncome');
  const expenses = ensurePositive(monthlyExpenses, 'monthlyExpenses');
  return income - expenses;
}

export function calculateSavingsGoalDurationMonths(
  targetAmount: number,
  monthlyContribution: number,
  initialAmount = 0,
  annualRatePercent = 0,
): number {
  const target = ensurePositive(targetAmount, 'targetAmount');
  const monthly = ensurePositive(monthlyContribution, 'monthlyContribution');
  const initial = ensurePositive(initialAmount, 'initialAmount');
  const annualRate = ensurePositive(annualRatePercent, 'annualRatePercent');

  if (target <= initial) return 0;
  if (monthly <= 0) {
    throw new Error('monthlyContribution must be greater than 0.');
  }

  const monthlyRate = annualRate / 100 / 12;
  if (monthlyRate === 0) {
    return Math.ceil((target - initial) / monthly);
  }

  let capital = initial;
  let months = 0;
  while (capital < target && months < 1200) {
    capital = capital * (1 + monthlyRate) + monthly;
    months += 1;
  }

  if (capital < target) {
    throw new Error('Goal cannot be reached within a reasonable timeline.');
  }
  return months;
}

export function calculateBodyMassIndex(weightKg: number, heightCm: number): number {
  const weight = ensurePositive(weightKg, 'weightKg');
  const height = ensurePositive(heightCm, 'heightCm');
  if (height <= 0) {
    throw new Error('heightCm must be greater than 0.');
  }
  const heightMeters = height / 100;
  return weight / (heightMeters * heightMeters);
}

export function calculateDailyCalories(
  age: number,
  sex: Sex,
  weightKg: number,
  heightCm: number,
  activityFactor: number,
): { bmr: number; maintenanceCalories: number } {
  const years = ensurePositive(age, 'age');
  const weight = ensurePositive(weightKg, 'weightKg');
  const height = ensurePositive(heightCm, 'heightCm');
  const factor = ensurePositive(activityFactor, 'activityFactor');
  if (years <= 0) {
    throw new Error('age must be greater than 0.');
  }
  if (factor < 1.1 || factor > 2.8) {
    throw new Error('activityFactor is out of range.');
  }

  const bmr =
    sex === 'male'
      ? 10 * weight + 6.25 * height - 5 * years + 5
      : 10 * weight + 6.25 * height - 5 * years - 161;
  return { bmr, maintenanceCalories: bmr * factor };
}

export function calculateIdealWeight(heightCm: number, sex: Sex): number {
  const height = ensurePositive(heightCm, 'heightCm');
  const inchesOverFiveFeet = Math.max(0, (height - 152.4) / 2.54);
  return sex === 'male' ? 50 + 2.3 * inchesOverFiveFeet : 45.5 + 2.3 * inchesOverFiveFeet;
}

export function calculateDailyWaterNeedLiters(weightKg: number, activityMinutes: number): number {
  const weight = ensurePositive(weightKg, 'weightKg');
  const activity = ensurePositive(activityMinutes, 'activityMinutes');
  const base = weight * 0.033;
  const activityBonus = (activity / 30) * 0.35;
  return base + activityBonus;
}

export function calculateTargetHeartRate(
  age: number,
  intensityPercent: number,
): { maxHeartRate: number; targetHeartRate: number; zoneMin: number; zoneMax: number } {
  const years = ensurePositive(age, 'age');
  const intensity = ensurePositive(intensityPercent, 'intensityPercent');
  if (years <= 0) {
    throw new Error('age must be greater than 0.');
  }
  if (intensity < 30 || intensity > 95) {
    throw new Error('intensityPercent must be between 30 and 95.');
  }
  const maxHeartRate = 220 - years;
  const targetHeartRate = maxHeartRate * (intensity / 100);
  const zoneMin = maxHeartRate * 0.5;
  const zoneMax = maxHeartRate * 0.85;
  return { maxHeartRate, targetHeartRate, zoneMin, zoneMax };
}

export function calculateActivityCaloriesBurned(
  weightKg: number,
  durationMinutes: number,
  metValue: number,
): number {
  const weight = ensurePositive(weightKg, 'weightKg');
  const duration = ensurePositive(durationMinutes, 'durationMinutes');
  const met = ensurePositive(metValue, 'metValue');
  const durationHours = duration / 60;
  return met * weight * durationHours;
}

export function calculateMortgageBorrowingCapacity(
  monthlyIncome: number,
  monthlyCharges: number,
  annualRatePercent: number,
  years: number,
  maxDebtRatioPercent: number,
): { maxMonthlyPayment: number; borrowingCapacity: number } {
  const income = ensurePositive(monthlyIncome, 'monthlyIncome');
  const charges = ensurePositive(monthlyCharges, 'monthlyCharges');
  const annualRate = ensurePositive(annualRatePercent, 'annualRatePercent');
  const durationYears = ensurePositive(years, 'years');
  const debtRatio = ensurePositive(maxDebtRatioPercent, 'maxDebtRatioPercent');
  if (durationYears <= 0) {
    throw new Error('years must be greater than 0.');
  }
  if (debtRatio <= 0 || debtRatio >= 100) {
    throw new Error('maxDebtRatioPercent must be between 0 and 100.');
  }

  const maxMonthlyPayment = income * (debtRatio / 100) - charges;
  if (maxMonthlyPayment <= 0) {
    return { maxMonthlyPayment, borrowingCapacity: 0 };
  }

  const months = Math.round(durationYears * 12);
  const monthlyRate = annualRate / 100 / 12;
  if (monthlyRate === 0) {
    return {
      maxMonthlyPayment,
      borrowingCapacity: maxMonthlyPayment * months,
    };
  }

  const borrowingCapacity = (maxMonthlyPayment * (1 - (1 + monthlyRate) ** -months)) / monthlyRate;
  return { maxMonthlyPayment, borrowingCapacity };
}

export function calculateNotaryFees(propertyPrice: number, feeRatePercent: number): { fees: number; totalCost: number } {
  const price = ensurePositive(propertyPrice, 'propertyPrice');
  const rate = ensurePositive(feeRatePercent, 'feeRatePercent');
  const fees = price * (rate / 100);
  return { fees, totalCost: price + fees };
}

export function calculateGrossRentalYield(annualRent: number, purchasePrice: number): number {
  const rent = ensurePositive(annualRent, 'annualRent');
  const price = ensurePositive(purchasePrice, 'purchasePrice');
  if (price <= 0) {
    throw new Error('purchasePrice must be greater than 0.');
  }
  return (rent / price) * 100;
}

export function calculateNetRentalYield(
  annualRent: number,
  annualCharges: number,
  purchasePrice: number,
  acquisitionCosts: number,
): number {
  const rent = ensurePositive(annualRent, 'annualRent');
  const charges = ensurePositive(annualCharges, 'annualCharges');
  const price = ensurePositive(purchasePrice, 'purchasePrice');
  const acquisition = ensurePositive(acquisitionCosts, 'acquisitionCosts');
  const baseCost = price + acquisition;
  if (baseCost <= 0) {
    throw new Error('Total investment cost must be greater than 0.');
  }
  return ((rent - charges) / baseCost) * 100;
}

function parseIsoDate(dateString: string): Date {
  const date = new Date(`${dateString}T00:00:00Z`);
  if (Number.isNaN(date.getTime())) {
    throw new Error('Invalid date value.');
  }
  return date;
}

function daysInMonth(year: number, monthIndex: number): number {
  return new Date(Date.UTC(year, monthIndex + 1, 0)).getUTCDate();
}

export function calculateDateDifference(
  startDateIso: string,
  endDateIso: string,
): { years: number; months: number; days: number; totalDays: number } {
  const start = parseIsoDate(startDateIso);
  const end = parseIsoDate(endDateIso);
  if (end < start) {
    throw new Error('End date must be after start date.');
  }

  const totalDays = Math.floor((end.getTime() - start.getTime()) / (24 * 60 * 60 * 1000));

  let years = end.getUTCFullYear() - start.getUTCFullYear();
  let months = end.getUTCMonth() - start.getUTCMonth();
  let days = end.getUTCDate() - start.getUTCDate();

  if (days < 0) {
    months -= 1;
    const prevMonth = (end.getUTCMonth() + 11) % 12;
    const prevMonthYear = prevMonth === 11 ? end.getUTCFullYear() - 1 : end.getUTCFullYear();
    days += daysInMonth(prevMonthYear, prevMonth);
  }

  if (months < 0) {
    years -= 1;
    months += 12;
  }

  return { years, months, days, totalDays };
}

export function calculateExactAge(
  birthDateIso: string,
  referenceDateIso: string,
): { years: number; months: number; days: number } {
  const { years, months, days } = calculateDateDifference(birthDateIso, referenceDateIso);
  return { years, months, days };
}

export function calculateFuelConsumption(
  fuelLiters: number,
  distanceKm: number,
  fuelPricePerLiter = 0,
): { litersPer100km: number; totalCost: number } {
  const liters = ensurePositive(fuelLiters, 'fuelLiters');
  const distance = ensurePositive(distanceKm, 'distanceKm');
  const price = ensurePositive(fuelPricePerLiter, 'fuelPricePerLiter');
  if (distance <= 0) {
    throw new Error('distanceKm must be greater than 0.');
  }
  return {
    litersPer100km: (liters / distance) * 100,
    totalCost: liters * price,
  };
}

export function calculatePaintQuantity(
  surfaceM2: number,
  coats: number,
  coverageM2PerLiter: number,
): number {
  const surface = ensurePositive(surfaceM2, 'surfaceM2');
  const layerCount = ensurePositive(coats, 'coats');
  const coverage = ensurePositive(coverageM2PerLiter, 'coverageM2PerLiter');
  if (coverage <= 0) {
    throw new Error('coverageM2PerLiter must be greater than 0.');
  }
  return (surface * layerCount) / coverage;
}

export function calculateRoomSurface(lengthM: number, widthM: number): { surfaceM2: number; perimeterM: number } {
  const length = ensurePositive(lengthM, 'lengthM');
  const width = ensurePositive(widthM, 'widthM');
  return {
    surfaceM2: length * width,
    perimeterM: 2 * (length + width),
  };
}

export function calculateWeightedAverage(grades: number[], coefficients?: number[]): number {
  if (grades.length === 0) {
    throw new Error('At least one grade is required.');
  }

  const validatedGrades = grades.map((grade, index) => ensurePositive(grade, `grade[${index}]`));
  if (validatedGrades.some((grade) => grade > 20)) {
    throw new Error('Grades must be between 0 and 20.');
  }

  if (!coefficients || coefficients.length === 0) {
    const sum = validatedGrades.reduce((acc, grade) => acc + grade, 0);
    return sum / validatedGrades.length;
  }

  if (coefficients.length !== validatedGrades.length) {
    throw new Error('Coefficient count must match grade count.');
  }

  const validatedCoefficients = coefficients.map((coef, index) => ensurePositive(coef, `coefficient[${index}]`));
  const totalCoefficient = validatedCoefficients.reduce((acc, coef) => acc + coef, 0);
  if (totalCoefficient <= 0) {
    throw new Error('Coefficient sum must be greater than 0.');
  }

  const weightedSum = validatedGrades.reduce(
    (acc, grade, index) => acc + grade * validatedCoefficients[index],
    0,
  );
  return weightedSum / totalCoefficient;
}
