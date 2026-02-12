import React, { useMemo, useState } from 'react';
import type { Locale } from '../../lib/calculator-taxonomy';
import type { NewCalculatorSlug } from '../../lib/new-calculator-slugs';
import {
  calculateActivityCaloriesBurned,
  calculateBodyMassIndex,
  calculateDailyCalories,
  calculateDailyWaterNeedLiters,
  calculateDateDifference,
  calculateDebtRatio,
  calculateExactAge,
  calculateFuelConsumption,
  calculateGrossRentalYield,
  calculateHtFromTtc,
  calculateIdealWeight,
  calculateLoanMonthlyPayment,
  calculateMonthlySavingsCapacity,
  calculateMortgageBorrowingCapacity,
  calculateNetRentalYield,
  calculateNotaryFees,
  calculatePaintQuantity,
  calculatePersonalLoan,
  calculateRoomSurface,
  calculateSavingsGoalDurationMonths,
  calculateTargetHeartRate,
  calculateTtcFromHt,
  calculateWeightedAverage,
  estimateGrossSalaryFromNet,
  estimateNetSalaryFromGross,
  type Sex,
} from '../../lib/new-calculator-formulas';

type FieldType = 'number' | 'select' | 'date' | 'text';

interface LocalizedText {
  fr: string;
  en: string;
}

interface SelectOption {
  value: string;
  label: LocalizedText;
}

interface FieldConfig {
  key: string;
  type: FieldType;
  label: LocalizedText;
  placeholder?: LocalizedText;
  help?: LocalizedText;
  required?: boolean;
  min?: number;
  max?: number;
  step?: number;
  defaultValue?: string;
  options?: SelectOption[];
}

interface ResultRow {
  key: string;
  label: LocalizedText;
  value: number | string;
  format: 'currency' | 'percent' | 'number' | 'integer' | 'text';
  digits?: number;
  suffix?: LocalizedText;
}

interface CalculationResult {
  rows: ResultRow[];
  note?: LocalizedText;
}

interface CalculatorConfig {
  fields: FieldConfig[];
  calculate: (values: Record<string, string>, lang: Locale) => CalculationResult;
}

interface UnifiedCalculatorProps {
  slug: NewCalculatorSlug;
  lang?: Locale;
}

const texts = {
  fr: {
    calculate: 'Calculer',
    reset: 'Reset',
    requiredPrefix: 'Champ requis :',
    invalidNumber: 'Valeur numerique invalide :',
    invalidDate: 'Date invalide :',
    calcError: 'Impossible d effectuer le calcul avec les valeurs saisies.',
    results: 'Resultats',
  },
  en: {
    calculate: 'Calculate',
    reset: 'Reset',
    requiredPrefix: 'Required field:',
    invalidNumber: 'Invalid numeric value:',
    invalidDate: 'Invalid date:',
    calcError: 'Unable to complete the calculation with the provided values.',
    results: 'Results',
  },
} as const;

const activityFactorOptions: SelectOption[] = [
  { value: '1.2', label: { fr: 'Sedentaire', en: 'Sedentary' } },
  { value: '1.375', label: { fr: 'Leger', en: 'Lightly active' } },
  { value: '1.55', label: { fr: 'Modere', en: 'Moderately active' } },
  { value: '1.725', label: { fr: 'Eleve', en: 'Very active' } },
  { value: '1.9', label: { fr: 'Tres eleve', en: 'Athlete level' } },
];

const activityMetOptions: SelectOption[] = [
  { value: '3.5', label: { fr: 'Marche rapide', en: 'Fast walking' } },
  { value: '6.0', label: { fr: 'Jogging', en: 'Jogging' } },
  { value: '8.0', label: { fr: 'Course a pied', en: 'Running' } },
  { value: '7.0', label: { fr: 'Cyclisme modere', en: 'Moderate cycling' } },
  { value: '5.0', label: { fr: 'Musculation', en: 'Strength training' } },
  { value: '9.0', label: { fr: 'Natation intensive', en: 'Intense swimming' } },
];

const todayIso = () => new Date().toISOString().slice(0, 10);

function listToNumbers(value: string): number[] {
  return value
    .split(/[,\s;]+/)
    .map((item) => item.trim())
    .filter(Boolean)
    .map((item) => Number(item));
}

function parseNumber(values: Record<string, string>, key: string): number {
  const value = Number(values[key]);
  if (!Number.isFinite(value)) {
    throw new Error(`Invalid number: ${key}`);
  }
  return value;
}

function formatValue(
  value: number | string,
  format: ResultRow['format'],
  lang: Locale,
  digits = 2,
): string {
  if (format === 'text') return String(value);
  if (typeof value !== 'number') return String(value);

  if (format === 'currency') {
    return new Intl.NumberFormat(lang === 'fr' ? 'fr-FR' : 'en-US', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  }

  if (format === 'percent') {
    return `${new Intl.NumberFormat(lang === 'fr' ? 'fr-FR' : 'en-US', {
      minimumFractionDigits: digits,
      maximumFractionDigits: digits,
    }).format(value)} %`;
  }

  if (format === 'integer') {
    return new Intl.NumberFormat(lang === 'fr' ? 'fr-FR' : 'en-US', {
      maximumFractionDigits: 0,
    }).format(value);
  }

  return new Intl.NumberFormat(lang === 'fr' ? 'fr-FR' : 'en-US', {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  }).format(value);
}

const calculatorConfigs: Record<NewCalculatorSlug, CalculatorConfig> = {
  'taux-endettement': {
    fields: [
      {
        key: 'income',
        type: 'number',
        label: { fr: 'Revenus mensuels', en: 'Monthly income' },
        placeholder: { fr: 'Ex: 3200', en: 'Ex: 3200' },
        required: true,
        min: 0.01,
      },
      {
        key: 'charges',
        type: 'number',
        label: { fr: 'Charges mensuelles', en: 'Monthly charges' },
        placeholder: { fr: 'Ex: 1200', en: 'Ex: 1200' },
        required: true,
        min: 0,
      },
    ],
    calculate: (values) => {
      const ratio = calculateDebtRatio(parseNumber(values, 'income'), parseNumber(values, 'charges'));
      return {
        rows: [
          {
            key: 'debt-ratio',
            label: { fr: 'Taux d endettement', en: 'Debt ratio' },
            value: ratio,
            format: 'percent',
          },
        ],
      };
    },
  },
  'mensualite-credit': {
    fields: [
      {
        key: 'principal',
        type: 'number',
        label: { fr: 'Montant emprunte', en: 'Loan amount' },
        required: true,
        min: 1,
      },
      {
        key: 'rate',
        type: 'number',
        label: { fr: 'Taux annuel (%)', en: 'Annual rate (%)' },
        required: true,
        min: 0,
        step: 0.01,
      },
      {
        key: 'years',
        type: 'number',
        label: { fr: 'Duree (annees)', en: 'Duration (years)' },
        required: true,
        min: 1,
        step: 1,
      },
    ],
    calculate: (values) => {
      const monthly = calculateLoanMonthlyPayment(
        parseNumber(values, 'principal'),
        parseNumber(values, 'rate'),
        parseNumber(values, 'years'),
      );
      return {
        rows: [
          {
            key: 'monthly-payment',
            label: { fr: 'Mensualite estimee', en: 'Estimated monthly payment' },
            value: monthly,
            format: 'currency',
          },
        ],
      };
    },
  },
  'pret-personnel': {
    fields: [
      {
        key: 'principal',
        type: 'number',
        label: { fr: 'Capital emprunte', en: 'Principal amount' },
        required: true,
        min: 1,
      },
      {
        key: 'years',
        type: 'number',
        label: { fr: 'Duree (annees)', en: 'Duration (years)' },
        required: true,
        min: 1,
        step: 1,
      },
      {
        key: 'rate',
        type: 'number',
        label: { fr: 'Taux annuel (%)', en: 'Annual rate (%)' },
        required: true,
        min: 0,
        step: 0.01,
      },
    ],
    calculate: (values) => {
      const result = calculatePersonalLoan(
        parseNumber(values, 'principal'),
        parseNumber(values, 'rate'),
        parseNumber(values, 'years'),
      );
      return {
        rows: [
          {
            key: 'monthly-payment',
            label: { fr: 'Mensualite', en: 'Monthly payment' },
            value: result.monthlyPayment,
            format: 'currency',
          },
          {
            key: 'total-amount',
            label: { fr: 'Montant total rembourse', en: 'Total amount repaid' },
            value: result.totalAmount,
            format: 'currency',
          },
          {
            key: 'total-cost',
            label: { fr: 'Cout total du credit', en: 'Total credit cost' },
            value: result.totalCost,
            format: 'currency',
          },
        ],
      };
    },
  },
  'salaire-brut-net': {
    fields: [
      {
        key: 'gross',
        type: 'number',
        label: { fr: 'Salaire brut mensuel', en: 'Monthly gross salary' },
        required: true,
        min: 0,
      },
    ],
    calculate: (values) => {
      const net = estimateNetSalaryFromGross(parseNumber(values, 'gross'));
      return {
        rows: [
          {
            key: 'net-estimate',
            label: { fr: 'Salaire net estime', en: 'Estimated net salary' },
            value: net,
            format: 'currency',
          },
        ],
        note: {
          fr: 'Estimation moyenne, le resultat depend du statut et des cotisations.',
          en: 'Average estimate. Actual net salary depends on status and payroll deductions.',
        },
      };
    },
  },
  'salaire-net-brut': {
    fields: [
      {
        key: 'net',
        type: 'number',
        label: { fr: 'Salaire net mensuel', en: 'Monthly net salary' },
        required: true,
        min: 0,
      },
    ],
    calculate: (values) => {
      const gross = estimateGrossSalaryFromNet(parseNumber(values, 'net'));
      return {
        rows: [
          {
            key: 'gross-estimate',
            label: { fr: 'Salaire brut estime', en: 'Estimated gross salary' },
            value: gross,
            format: 'currency',
          },
        ],
        note: {
          fr: 'Estimation indicative basee sur un ratio moyen.',
          en: 'Indicative estimate based on an average payroll ratio.',
        },
      };
    },
  },
  'tva-ht-ttc': {
    fields: [
      {
        key: 'mode',
        type: 'select',
        label: { fr: 'Mode de calcul', en: 'Calculation mode' },
        required: true,
        defaultValue: 'ht-to-ttc',
        options: [
          { value: 'ht-to-ttc', label: { fr: 'HT vers TTC', en: 'Net to gross (VAT included)' } },
          { value: 'ttc-to-ht', label: { fr: 'TTC vers HT', en: 'VAT included to net' } },
        ],
      },
      {
        key: 'amount',
        type: 'number',
        label: { fr: 'Montant', en: 'Amount' },
        required: true,
        min: 0,
      },
      {
        key: 'vatRate',
        type: 'number',
        label: { fr: 'Taux de TVA (%)', en: 'VAT rate (%)' },
        required: true,
        min: 0,
        step: 0.01,
        defaultValue: '20',
      },
    ],
    calculate: (values) => {
      const mode = values.mode;
      const amount = parseNumber(values, 'amount');
      const vatRate = parseNumber(values, 'vatRate');

      if (mode === 'ht-to-ttc') {
        const ttc = calculateTtcFromHt(amount, vatRate);
        return {
          rows: [
            { key: 'amount-ht', label: { fr: 'Montant HT', en: 'Amount before VAT' }, value: amount, format: 'currency' },
            {
              key: 'amount-vat',
              label: { fr: 'Montant TVA', en: 'VAT amount' },
              value: ttc - amount,
              format: 'currency',
            },
            { key: 'amount-ttc', label: { fr: 'Montant TTC', en: 'Amount incl. VAT' }, value: ttc, format: 'currency' },
          ],
        };
      }

      const ht = calculateHtFromTtc(amount, vatRate);
      return {
        rows: [
          { key: 'amount-ttc', label: { fr: 'Montant TTC', en: 'Amount incl. VAT' }, value: amount, format: 'currency' },
          { key: 'amount-vat', label: { fr: 'Montant TVA', en: 'VAT amount' }, value: amount - ht, format: 'currency' },
          { key: 'amount-ht', label: { fr: 'Montant HT', en: 'Amount before VAT' }, value: ht, format: 'currency' },
        ],
      };
    },
  },
  'capacite-epargne-mensuelle': {
    fields: [
      {
        key: 'income',
        type: 'number',
        label: { fr: 'Revenus mensuels', en: 'Monthly income' },
        required: true,
        min: 0,
      },
      {
        key: 'expenses',
        type: 'number',
        label: { fr: 'Depenses mensuelles', en: 'Monthly expenses' },
        required: true,
        min: 0,
      },
    ],
    calculate: (values) => {
      const capacity = calculateMonthlySavingsCapacity(
        parseNumber(values, 'income'),
        parseNumber(values, 'expenses'),
      );
      return {
        rows: [
          {
            key: 'monthly-capacity',
            label: { fr: 'Capacite d epargne mensuelle', en: 'Monthly savings capacity' },
            value: capacity,
            format: 'currency',
          },
          {
            key: 'yearly-capacity',
            label: { fr: 'Projection sur 12 mois', en: '12-month projection' },
            value: capacity * 12,
            format: 'currency',
          },
        ],
      };
    },
  },
  'objectif-epargne-temps': {
    fields: [
      {
        key: 'target',
        type: 'number',
        label: { fr: 'Objectif total', en: 'Target amount' },
        required: true,
        min: 0,
      },
      {
        key: 'monthly',
        type: 'number',
        label: { fr: 'Epargne mensuelle', en: 'Monthly contribution' },
        required: true,
        min: 0.01,
      },
      {
        key: 'initial',
        type: 'number',
        label: { fr: 'Capital initial', en: 'Initial amount' },
        required: false,
        min: 0,
        defaultValue: '0',
      },
      {
        key: 'annualRate',
        type: 'number',
        label: { fr: 'Rendement annuel (%)', en: 'Annual return (%)' },
        required: false,
        min: 0,
        step: 0.01,
        defaultValue: '0',
      },
    ],
    calculate: (values) => {
      const months = calculateSavingsGoalDurationMonths(
        parseNumber(values, 'target'),
        parseNumber(values, 'monthly'),
        parseNumber(values, 'initial'),
        parseNumber(values, 'annualRate'),
      );
      return {
        rows: [
          { key: 'months', label: { fr: 'Duree estimee', en: 'Estimated duration' }, value: months, format: 'integer', suffix: { fr: 'mois', en: 'months' } },
          {
            key: 'years',
            label: { fr: 'Equivalent en annees', en: 'Equivalent in years' },
            value: months / 12,
            format: 'number',
            digits: 1,
            suffix: { fr: 'ans', en: 'years' },
          },
        ],
      };
    },
  },
  'calcul-imc': {
    fields: [
      { key: 'weight', type: 'number', label: { fr: 'Poids (kg)', en: 'Weight (kg)' }, required: true, min: 1 },
      { key: 'height', type: 'number', label: { fr: 'Taille (cm)', en: 'Height (cm)' }, required: true, min: 50 },
    ],
    calculate: (values, currentLang) => {
      const bmi = calculateBodyMassIndex(parseNumber(values, 'weight'), parseNumber(values, 'height'));
      let category: LocalizedText = { fr: 'Poids normal', en: 'Healthy range' };
      if (bmi < 18.5) category = { fr: 'Insuffisance ponderale', en: 'Underweight' };
      if (bmi >= 25 && bmi < 30) category = { fr: 'Surpoids', en: 'Overweight' };
      if (bmi >= 30) category = { fr: 'Obesite', en: 'Obesity' };

      return {
        rows: [
          { key: 'bmi', label: { fr: 'IMC', en: 'BMI' }, value: bmi, format: 'number', digits: 2 },
          { key: 'bmi-category', label: { fr: 'Categorie', en: 'Category' }, value: category[currentLang], format: 'text' },
        ],
        note: {
          fr: 'L IMC est un indicateur general et ne remplace pas un avis medical.',
          en: 'BMI is a general indicator and does not replace medical advice.',
        },
      };
    },
  },
  'besoin-calorique-journalier': {
    fields: [
      { key: 'age', type: 'number', label: { fr: 'Age', en: 'Age' }, required: true, min: 1, step: 1 },
      {
        key: 'sex',
        type: 'select',
        label: { fr: 'Sexe', en: 'Sex' },
        required: true,
        defaultValue: 'male',
        options: [
          { value: 'male', label: { fr: 'Homme', en: 'Male' } },
          { value: 'female', label: { fr: 'Femme', en: 'Female' } },
        ],
      },
      { key: 'weight', type: 'number', label: { fr: 'Poids (kg)', en: 'Weight (kg)' }, required: true, min: 1 },
      { key: 'height', type: 'number', label: { fr: 'Taille (cm)', en: 'Height (cm)' }, required: true, min: 50 },
      {
        key: 'activity',
        type: 'select',
        label: { fr: 'Niveau d activite', en: 'Activity level' },
        required: true,
        defaultValue: '1.55',
        options: activityFactorOptions,
      },
    ],
    calculate: (values) => {
      const { bmr, maintenanceCalories } = calculateDailyCalories(
        parseNumber(values, 'age'),
        values.sex as Sex,
        parseNumber(values, 'weight'),
        parseNumber(values, 'height'),
        parseNumber(values, 'activity'),
      );
      return {
        rows: [
          { key: 'bmr', label: { fr: 'Metabolisme de base', en: 'Basal metabolic rate' }, value: bmr, format: 'integer', suffix: { fr: 'kcal', en: 'kcal' } },
          {
            key: 'maintenance',
            label: { fr: 'Besoin calorique journalier', en: 'Daily maintenance calories' },
            value: maintenanceCalories,
            format: 'integer',
            suffix: { fr: 'kcal', en: 'kcal' },
          },
        ],
      };
    },
  },
  'poids-ideal': {
    fields: [
      { key: 'height', type: 'number', label: { fr: 'Taille (cm)', en: 'Height (cm)' }, required: true, min: 50 },
      {
        key: 'sex',
        type: 'select',
        label: { fr: 'Sexe', en: 'Sex' },
        required: true,
        defaultValue: 'male',
        options: [
          { value: 'male', label: { fr: 'Homme', en: 'Male' } },
          { value: 'female', label: { fr: 'Femme', en: 'Female' } },
        ],
      },
    ],
    calculate: (values) => {
      const ideal = calculateIdealWeight(parseNumber(values, 'height'), values.sex as Sex);
      return {
        rows: [
          {
            key: 'ideal-weight',
            label: { fr: 'Poids ideal estime', en: 'Estimated ideal weight' },
            value: ideal,
            format: 'number',
            digits: 1,
            suffix: { fr: 'kg', en: 'kg' },
          },
        ],
      };
    },
  },
  'besoin-eau-quotidien': {
    fields: [
      { key: 'weight', type: 'number', label: { fr: 'Poids (kg)', en: 'Weight (kg)' }, required: true, min: 1 },
      {
        key: 'activityMinutes',
        type: 'number',
        label: { fr: 'Activite quotidienne (minutes)', en: 'Daily activity (minutes)' },
        required: true,
        min: 0,
        step: 1,
        defaultValue: '30',
      },
    ],
    calculate: (values) => {
      const liters = calculateDailyWaterNeedLiters(
        parseNumber(values, 'weight'),
        parseNumber(values, 'activityMinutes'),
      );
      return {
        rows: [
          {
            key: 'water-need',
            label: { fr: 'Besoin en eau quotidien', en: 'Daily water need' },
            value: liters,
            format: 'number',
            digits: 2,
            suffix: { fr: 'L', en: 'L' },
          },
        ],
      };
    },
  },
  'rythme-cardiaque-cible': {
    fields: [
      { key: 'age', type: 'number', label: { fr: 'Age', en: 'Age' }, required: true, min: 1, step: 1 },
      {
        key: 'intensity',
        type: 'number',
        label: { fr: 'Intensite cible (%)', en: 'Target intensity (%)' },
        required: true,
        min: 30,
        max: 95,
        step: 1,
        defaultValue: '70',
      },
    ],
    calculate: (values) => {
      const result = calculateTargetHeartRate(parseNumber(values, 'age'), parseNumber(values, 'intensity'));
      return {
        rows: [
          { key: 'max-hr', label: { fr: 'Frequence cardiaque max', en: 'Maximum heart rate' }, value: result.maxHeartRate, format: 'integer', suffix: { fr: 'bpm', en: 'bpm' } },
          { key: 'target-hr', label: { fr: 'Frequence cardiaque cible', en: 'Target heart rate' }, value: result.targetHeartRate, format: 'integer', suffix: { fr: 'bpm', en: 'bpm' } },
          {
            key: 'zone',
            label: { fr: 'Zone 50%-85%', en: '50%-85% zone' },
            value: `${Math.round(result.zoneMin)} - ${Math.round(result.zoneMax)} bpm`,
            format: 'text',
          },
        ],
      };
    },
  },
  'depense-calorique-activite': {
    fields: [
      { key: 'weight', type: 'number', label: { fr: 'Poids (kg)', en: 'Weight (kg)' }, required: true, min: 1 },
      { key: 'duration', type: 'number', label: { fr: 'Duree (minutes)', en: 'Duration (minutes)' }, required: true, min: 1, step: 1 },
      {
        key: 'activityMet',
        type: 'select',
        label: { fr: 'Activite', en: 'Activity' },
        required: true,
        defaultValue: '6.0',
        options: activityMetOptions,
      },
    ],
    calculate: (values) => {
      const calories = calculateActivityCaloriesBurned(
        parseNumber(values, 'weight'),
        parseNumber(values, 'duration'),
        parseNumber(values, 'activityMet'),
      );
      return {
        rows: [
          {
            key: 'calories-burned',
            label: { fr: 'Depense calorique estimee', en: 'Estimated calories burned' },
            value: calories,
            format: 'integer',
            suffix: { fr: 'kcal', en: 'kcal' },
          },
        ],
      };
    },
  },
  'capacite-emprunt-immobilier': {
    fields: [
      { key: 'income', type: 'number', label: { fr: 'Revenus mensuels', en: 'Monthly income' }, required: true, min: 0.01 },
      { key: 'charges', type: 'number', label: { fr: 'Charges mensuelles', en: 'Monthly charges' }, required: true, min: 0 },
      { key: 'rate', type: 'number', label: { fr: 'Taux annuel (%)', en: 'Annual rate (%)' }, required: true, min: 0, step: 0.01 },
      { key: 'years', type: 'number', label: { fr: 'Duree (annees)', en: 'Duration (years)' }, required: true, min: 1, step: 1 },
      {
        key: 'debtRatio',
        type: 'number',
        label: { fr: 'Taux d endettement max (%)', en: 'Maximum debt ratio (%)' },
        required: true,
        min: 10,
        max: 60,
        step: 0.1,
        defaultValue: '35',
      },
    ],
    calculate: (values) => {
      const result = calculateMortgageBorrowingCapacity(
        parseNumber(values, 'income'),
        parseNumber(values, 'charges'),
        parseNumber(values, 'rate'),
        parseNumber(values, 'years'),
        parseNumber(values, 'debtRatio'),
      );
      return {
        rows: [
          {
            key: 'max-payment',
            label: { fr: 'Mensualite maximale', en: 'Maximum monthly payment' },
            value: result.maxMonthlyPayment,
            format: 'currency',
          },
          {
            key: 'capacity',
            label: { fr: 'Capacite d emprunt estimee', en: 'Estimated borrowing capacity' },
            value: result.borrowingCapacity,
            format: 'currency',
          },
        ],
      };
    },
  },
  'frais-notaire': {
    fields: [
      { key: 'price', type: 'number', label: { fr: 'Prix du bien', en: 'Property price' }, required: true, min: 1 },
      {
        key: 'feeRate',
        type: 'number',
        label: { fr: 'Taux de frais (%)', en: 'Fee rate (%)' },
        help: { fr: '3% environ dans le neuf, 7-8% dans l ancien.', en: 'Around 3% for new property, 7-8% for old property.' },
        required: true,
        min: 0,
        step: 0.1,
        defaultValue: '7.8',
      },
    ],
    calculate: (values) => {
      const result = calculateNotaryFees(parseNumber(values, 'price'), parseNumber(values, 'feeRate'));
      return {
        rows: [
          { key: 'notary-fees', label: { fr: 'Frais de notaire estimes', en: 'Estimated notary fees' }, value: result.fees, format: 'currency' },
          { key: 'total-cost', label: { fr: 'Budget total achat inclus frais', en: 'Total acquisition budget' }, value: result.totalCost, format: 'currency' },
        ],
      };
    },
  },
  'rentabilite-locative-brute': {
    fields: [
      { key: 'annualRent', type: 'number', label: { fr: 'Loyer annuel', en: 'Annual rent' }, required: true, min: 0.01 },
      { key: 'price', type: 'number', label: { fr: 'Prix d achat', en: 'Purchase price' }, required: true, min: 0.01 },
    ],
    calculate: (values) => {
      const yieldValue = calculateGrossRentalYield(parseNumber(values, 'annualRent'), parseNumber(values, 'price'));
      return {
        rows: [
          { key: 'gross-yield', label: { fr: 'Rentabilite brute', en: 'Gross rental yield' }, value: yieldValue, format: 'percent', digits: 2 },
        ],
      };
    },
  },
  'rendement-locatif-net': {
    fields: [
      { key: 'annualRent', type: 'number', label: { fr: 'Loyer annuel', en: 'Annual rent' }, required: true, min: 0.01 },
      { key: 'annualCharges', type: 'number', label: { fr: 'Charges annuelles', en: 'Annual charges' }, required: true, min: 0 },
      { key: 'price', type: 'number', label: { fr: 'Prix d achat', en: 'Purchase price' }, required: true, min: 0.01 },
      { key: 'acquisitionCosts', type: 'number', label: { fr: 'Frais annexes achat', en: 'Acquisition extra costs' }, required: true, min: 0, defaultValue: '0' },
    ],
    calculate: (values) => {
      const yieldValue = calculateNetRentalYield(
        parseNumber(values, 'annualRent'),
        parseNumber(values, 'annualCharges'),
        parseNumber(values, 'price'),
        parseNumber(values, 'acquisitionCosts'),
      );
      return {
        rows: [
          { key: 'net-yield', label: { fr: 'Rendement locatif net', en: 'Net rental yield' }, value: yieldValue, format: 'percent', digits: 2 },
        ],
      };
    },
  },
  'difference-entre-deux-dates': {
    fields: [
      { key: 'startDate', type: 'date', label: { fr: 'Date de debut', en: 'Start date' }, required: true },
      { key: 'endDate', type: 'date', label: { fr: 'Date de fin', en: 'End date' }, required: true, defaultValue: todayIso() },
    ],
    calculate: (values) => {
      const diff = calculateDateDifference(values.startDate, values.endDate);
      return {
        rows: [
          { key: 'duration-ymd', label: { fr: 'Duree calendrier', en: 'Calendar duration' }, value: `${diff.years}y ${diff.months}m ${diff.days}d`, format: 'text' },
          { key: 'duration-days', label: { fr: 'Nombre total de jours', en: 'Total number of days' }, value: diff.totalDays, format: 'integer' },
        ],
      };
    },
  },
  'age-exact': {
    fields: [
      { key: 'birthDate', type: 'date', label: { fr: 'Date de naissance', en: 'Birth date' }, required: true },
      { key: 'referenceDate', type: 'date', label: { fr: 'Date de reference', en: 'Reference date' }, required: true, defaultValue: todayIso() },
    ],
    calculate: (values) => {
      const age = calculateExactAge(values.birthDate, values.referenceDate);
      return {
        rows: [
          { key: 'age', label: { fr: 'Age exact', en: 'Exact age' }, value: `${age.years}y ${age.months}m ${age.days}d`, format: 'text' },
        ],
      };
    },
  },
  'consommation-carburant': {
    fields: [
      { key: 'liters', type: 'number', label: { fr: 'Carburant consomme (L)', en: 'Fuel consumed (L)' }, required: true, min: 0.01 },
      { key: 'distance', type: 'number', label: { fr: 'Distance parcourue (km)', en: 'Distance traveled (km)' }, required: true, min: 0.01 },
      { key: 'fuelPrice', type: 'number', label: { fr: 'Prix du carburant (EUR/L)', en: 'Fuel price (EUR/L)' }, required: false, min: 0, defaultValue: '0' },
    ],
    calculate: (values) => {
      const result = calculateFuelConsumption(
        parseNumber(values, 'liters'),
        parseNumber(values, 'distance'),
        parseNumber(values, 'fuelPrice'),
      );
      return {
        rows: [
          { key: 'l100', label: { fr: 'Consommation', en: 'Consumption' }, value: result.litersPer100km, format: 'number', digits: 2, suffix: { fr: 'L/100km', en: 'L/100km' } },
          { key: 'fuel-cost', label: { fr: 'Cout total du carburant', en: 'Total fuel cost' }, value: result.totalCost, format: 'currency' },
        ],
      };
    },
  },
  'quantite-peinture': {
    fields: [
      { key: 'surface', type: 'number', label: { fr: 'Surface totale (m2)', en: 'Total surface (m2)' }, required: true, min: 0.01 },
      { key: 'coats', type: 'number', label: { fr: 'Nombre de couches', en: 'Number of coats' }, required: true, min: 1, step: 1, defaultValue: '2' },
      {
        key: 'coverage',
        type: 'number',
        label: { fr: 'Rendement peinture (m2/L)', en: 'Paint coverage (m2/L)' },
        required: true,
        min: 0.1,
        step: 0.1,
        defaultValue: '10',
      },
    ],
    calculate: (values) => {
      const liters = calculatePaintQuantity(
        parseNumber(values, 'surface'),
        parseNumber(values, 'coats'),
        parseNumber(values, 'coverage'),
      );
      return {
        rows: [
          {
            key: 'paint-liters',
            label: { fr: 'Quantite de peinture estimee', en: 'Estimated paint quantity' },
            value: liters,
            format: 'number',
            digits: 2,
            suffix: { fr: 'L', en: 'L' },
          },
        ],
      };
    },
  },
  'surface-piece': {
    fields: [
      { key: 'length', type: 'number', label: { fr: 'Longueur (m)', en: 'Length (m)' }, required: true, min: 0.01 },
      { key: 'width', type: 'number', label: { fr: 'Largeur (m)', en: 'Width (m)' }, required: true, min: 0.01 },
    ],
    calculate: (values) => {
      const result = calculateRoomSurface(parseNumber(values, 'length'), parseNumber(values, 'width'));
      return {
        rows: [
          { key: 'surface', label: { fr: 'Surface', en: 'Surface area' }, value: result.surfaceM2, format: 'number', digits: 2, suffix: { fr: 'm2', en: 'm2' } },
          { key: 'perimeter', label: { fr: 'Perimetre', en: 'Perimeter' }, value: result.perimeterM, format: 'number', digits: 2, suffix: { fr: 'm', en: 'm' } },
        ],
      };
    },
  },
  'moyenne-scolaire': {
    fields: [
      {
        key: 'grades',
        type: 'text',
        label: { fr: 'Notes (separees par virgule)', en: 'Grades (comma-separated)' },
        placeholder: { fr: 'Ex: 12, 14.5, 9', en: 'Ex: 12, 14.5, 9' },
        required: true,
      },
      {
        key: 'coefficients',
        type: 'text',
        label: { fr: 'Coefficients (optionnel)', en: 'Coefficients (optional)' },
        placeholder: { fr: 'Ex: 2, 1, 3', en: 'Ex: 2, 1, 3' },
        required: false,
      },
    ],
    calculate: (values) => {
      const grades = listToNumbers(values.grades);
      const coeffs = values.coefficients.trim().length > 0 ? listToNumbers(values.coefficients) : undefined;
      if (grades.length === 0 || grades.some((grade) => !Number.isFinite(grade))) {
        throw new Error('Invalid grade list.');
      }
      if (coeffs && coeffs.some((coef) => !Number.isFinite(coef))) {
        throw new Error('Invalid coefficient list.');
      }
      const average = calculateWeightedAverage(grades, coeffs);
      return {
        rows: [
          { key: 'average', label: { fr: 'Moyenne generale', en: 'Overall average' }, value: average, format: 'number', digits: 2, suffix: { fr: '/20', en: '/20' } },
        ],
      };
    },
  },
};

function getDefaultValues(fields: FieldConfig[]): Record<string, string> {
  const defaults: Record<string, string> = {};
  for (const field of fields) {
    defaults[field.key] = field.defaultValue ?? '';
  }
  return defaults;
}

const UnifiedCalculator: React.FC<UnifiedCalculatorProps> = ({ slug, lang = 'fr' }) => {
  const config = calculatorConfigs[slug];
  const t = texts[lang];

  const initialValues = useMemo(() => getDefaultValues(config.fields), [config.fields]);
  const [values, setValues] = useState<Record<string, string>>(initialValues);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<CalculationResult | null>(null);

  const handleChange =
    (key: string) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const nextValue = event.target.value;
      setValues((prev) => ({ ...prev, [key]: nextValue }));
    };

  const validate = (): string | null => {
    for (const field of config.fields) {
      const rawValue = values[field.key] ?? '';
      if (field.required && rawValue.trim() === '') {
        return `${t.requiredPrefix} ${field.label[lang]}`;
      }

      if (field.type === 'number' && rawValue.trim() !== '') {
        const numericValue = Number(rawValue);
        if (!Number.isFinite(numericValue)) {
          return `${t.invalidNumber} ${field.label[lang]}`;
        }
        if (typeof field.min === 'number' && numericValue < field.min) {
          return `${field.label[lang]} >= ${field.min}`;
        }
        if (typeof field.max === 'number' && numericValue > field.max) {
          return `${field.label[lang]} <= ${field.max}`;
        }
      }

      if (field.type === 'date' && rawValue.trim() !== '') {
        const dateValue = new Date(rawValue);
        if (Number.isNaN(dateValue.getTime())) {
          return `${t.invalidDate} ${field.label[lang]}`;
        }
      }
    }
    return null;
  };

  const onCalculate = (event: React.FormEvent) => {
    event.preventDefault();
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      setResult(null);
      return;
    }

    try {
      const computed = config.calculate(values, lang);
      setError(null);
      setResult(computed);
    } catch (calcError) {
      const message = calcError instanceof Error ? calcError.message : t.calcError;
      setError(message || t.calcError);
      setResult(null);
    }
  };

  const onReset = () => {
    setValues(initialValues);
    setResult(null);
    setError(null);
  };

  return (
    <div className="space-y-8">
      <form onSubmit={onCalculate} className="space-y-6">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {config.fields.map((field) => (
            <div key={field.key} className={field.type === 'text' ? 'md:col-span-2' : ''}>
              <label htmlFor={field.key} className="mb-2 block font-semibold text-gray-900">
                {field.label[lang]}
              </label>

              {field.type === 'select' && field.options ? (
                <select
                  id={field.key}
                  value={values[field.key] ?? ''}
                  onChange={handleChange(field.key)}
                  className="w-full rounded border border-gray-300 bg-white p-2"
                >
                  {field.options.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label[lang]}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  id={field.key}
                  type={field.type}
                  onFocus={(event) => {
                    if (field.type === 'number' || field.type === 'text') {
                      event.currentTarget.select();
                    }
                  }}
                  value={values[field.key] ?? ''}
                  onChange={handleChange(field.key)}
                  min={field.type === 'number' && typeof field.min === 'number' ? field.min : undefined}
                  max={field.type === 'number' && typeof field.max === 'number' ? field.max : undefined}
                  step={field.type === 'number' ? (field.step ?? 'any') : undefined}
                  className="w-full rounded border border-gray-300 p-2"
                  placeholder={field.placeholder ? field.placeholder[lang] : undefined}
                />
              )}

              {field.help && <p className="mt-1 text-sm text-gray-600">{field.help[lang]}</p>}
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            type="submit"
            className="inline-flex items-center justify-center rounded-lg bg-black px-5 py-2.5 font-semibold text-white transition hover:bg-gray-800"
          >
            {t.calculate}
          </button>
          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center justify-center rounded-lg border border-gray-300 px-5 py-2.5 font-semibold text-gray-700 transition hover:bg-gray-50"
          >
            {t.reset}
          </button>
        </div>
      </form>

      {error && (
        <div className="rounded-lg border border-red-300 bg-red-50 px-4 py-3 text-red-700" role="alert">
          {error}
        </div>
      )}

      {result && (
        <section aria-live="polite" className="space-y-4">
          <h3 className="text-xl font-bold text-gray-900">{t.results}</h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {result.rows.map((row) => {
              const formattedValue = formatValue(row.value, row.format, lang, row.digits);
              const suffix = row.suffix ? ` ${row.suffix[lang]}` : '';
              return (
                <article key={row.key} className="rounded-xl border border-gray-200 bg-gray-50 p-4 shadow-sm">
                  <p className="mb-2 text-sm font-medium uppercase tracking-wide text-gray-600">{row.label[lang]}</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {formattedValue}
                    {suffix}
                  </p>
                </article>
              );
            })}
          </div>

          {result.note && (
            <p className="rounded-lg border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-800">
              {result.note[lang]}
            </p>
          )}
        </section>
      )}
    </div>
  );
};

export default UnifiedCalculator;
