import { ILLUSTRATIVE_ANNUAL_RATE } from '../data/mockData';

export type SipFrequency = 'daily' | 'monthly';

/**
 * Illustrative SIP future-value estimate (future value of a periodic
 * annuity, compounded per period). Not a real returns calculation —
 * always surfaced to users as an estimate, not a guarantee.
 */
export function calculateSipProjection(
  amount: number,
  frequency: SipFrequency,
  years: number,
  annualRate: number = ILLUSTRATIVE_ANNUAL_RATE
): number {
  const periodsPerYear = frequency === 'daily' ? 365 : 12;
  const n = years * periodsPerYear;
  const r = annualRate / periodsPerYear;
  if (r === 0) return Math.round(amount * n);
  const futureValue = amount * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
  return Math.round(futureValue);
}

export const PROJECTION_YEAR_OPTIONS = [1, 5, 10] as const;
