import { calculateSipProjection } from '../sipCalculator';

describe('calculateSipProjection', () => {
  it('grows a daily SIP over time (illustrative, not exact)', () => {
    const oneYear = calculateSipProjection(100, 'daily', 1);
    const fiveYears = calculateSipProjection(100, 'daily', 5);
    expect(oneYear).toBeGreaterThan(100 * 365); // more than principal alone
    expect(fiveYears).toBeGreaterThan(oneYear * 5); // compounding, not just linear
  });

  it('grows a monthly SIP over time (illustrative, not exact)', () => {
    const projection = calculateSipProjection(10000, 'monthly', 5);
    expect(projection).toBeGreaterThan(10000 * 60);
  });
});
