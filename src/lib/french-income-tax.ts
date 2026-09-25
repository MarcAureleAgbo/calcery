export const FRENCH_INCOME_TAX_2026_BRACKETS = [
  { upperLimit: 11_600, rate: 0 },
  { upperLimit: 29_579, rate: 0.11 },
  { upperLimit: 84_577, rate: 0.3 },
  { upperLimit: 181_917, rate: 0.41 },
  { upperLimit: Infinity, rate: 0.45 },
] as const;

export interface FrenchIncomeTaxBracketResult {
  lowerLimit: number;
  upperLimit: number | null;
  rate: number;
  taxableAmount: number;
  tax: number;
}

export interface FrenchIncomeTaxEstimate {
  taxableIncomePerShare: number;
  estimatedGrossTax: number;
  averageRate: number;
  marginalRate: number;
  brackets: FrenchIncomeTaxBracketResult[];
}

export function estimateFrenchIncomeTax2026(taxableIncome: number, taxShares: number): FrenchIncomeTaxEstimate {
  if (!Number.isFinite(taxableIncome) || taxableIncome < 0) {
    throw new Error('taxableIncome must be a non-negative number.');
  }
  if (!Number.isFinite(taxShares) || taxShares <= 0 || !Number.isInteger(taxShares * 4)) {
    throw new Error('taxShares must be a positive number in 0.25-share increments.');
  }

  const taxableIncomePerShare = taxableIncome / taxShares;
  let lowerLimit = 0;
  let taxPerShare = 0;
  const brackets = FRENCH_INCOME_TAX_2026_BRACKETS.map(({ upperLimit, rate }) => {
    const taxableAmount = Math.max(0, Math.min(taxableIncomePerShare, upperLimit) - lowerLimit);
    const tax = taxableAmount * rate;
    const result = {
      lowerLimit,
      upperLimit: Number.isFinite(upperLimit) ? upperLimit : null,
      rate,
      taxableAmount,
      tax,
    };
    taxPerShare += tax;
    lowerLimit = upperLimit;
    return result;
  }).filter((bracket) => bracket.taxableAmount > 0 || bracket.rate === 0);

  const marginalRate = FRENCH_INCOME_TAX_2026_BRACKETS.find(({ upperLimit }) => taxableIncomePerShare <= upperLimit)?.rate ?? 0.45;
  const estimatedGrossTax = taxPerShare * taxShares;

  return {
    taxableIncomePerShare,
    estimatedGrossTax,
    averageRate: taxableIncome === 0 ? 0 : (estimatedGrossTax / taxableIncome) * 100,
    marginalRate,
    brackets,
  };
}
