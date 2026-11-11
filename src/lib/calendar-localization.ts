import type { Locale } from './i18n';

export const calendarCalculatorTexts = {
  fr: {
    calculate: 'Calculer',
    reset: 'Réinitialiser',
    requiredPrefix: 'Champ requis :',
    invalidNumber: 'Valeur numérique invalide :',
    invalidDate: 'Date invalide :',
    calcError: 'Impossible d’effectuer le calcul avec les valeurs saisies.',
    results: 'Résultats',
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

export function formatCalendarDuration(
  duration: { years: number; months: number; days: number },
  lang: Locale,
): string {
  const units = lang === 'fr'
    ? [['an', 'ans'], ['mois', 'mois'], ['jour', 'jours']]
    : [['year', 'years'], ['month', 'months'], ['day', 'days']];
  const pluralRules = new Intl.PluralRules(lang);
  return [duration.years, duration.months, duration.days]
    .map((value, index) => `${value} ${units[index][pluralRules.select(value) === 'one' ? 0 : 1]}`)
    .join(', ');
}

export function localizeCalendarError(error: unknown, lang: Locale): string {
  if (error instanceof Error && error.message === 'End date must be after start date.') {
    return lang === 'fr'
      ? 'La date de fin ou de référence doit être égale ou postérieure à la date de début ou de naissance.'
      : 'The end or reference date must be on or after the start or birth date.';
  }
  if (error instanceof Error && error.message === 'Invalid date value.') {
    return lang === 'fr' ? 'Date invalide.' : 'Invalid date.';
  }
  return calendarCalculatorTexts[lang].calcError;
}
