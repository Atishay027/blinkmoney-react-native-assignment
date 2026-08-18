import { wealthJourneyReducer } from '../WealthJourneyContext';
import { initialWealthJourneyState, WealthJourneyState } from '../../utils/wealthJourney';

function stateWith(overrides: Partial<WealthJourneyState>): WealthJourneyState {
  return { ...initialWealthJourneyState, ...overrides };
}

/**
 * Regression tests for the rapid-tap contribution race identified in the audit:
 * dispatching two CONTRIBUTE actions back-to-back must apply both amounts, because
 * each dispatch operates on the *previous dispatch's result*, not on a value some
 * caller read earlier and computed an absolute target from.
 */
describe('wealthJourneyReducer — rapid contribution race', () => {
  it('applies two contributions dispatched back-to-back without losing either', () => {
    const start = stateWith({ sipStarted: true, bankLinked: true, investedAmount: 8500 });

    const afterFirst = wealthJourneyReducer(start, { type: 'CONTRIBUTE', amount: 500 });
    const afterSecond = wealthJourneyReducer(afterFirst, { type: 'CONTRIBUTE', amount: 500 });

    expect(afterSecond.investedAmount).toBe(9500);
  });

  it('awards a milestone crossed by the second of two rapid contributions, not lost by the first', () => {
    const start = stateWith({ sipStarted: true, bankLinked: true, investedAmount: 9800, points: 50 });

    const afterFirst = wealthJourneyReducer(start, { type: 'CONTRIBUTE', amount: 100 }); // -> 9900, no cross
    const afterSecond = wealthJourneyReducer(afterFirst, { type: 'CONTRIBUTE', amount: 100 }); // -> 10000, crosses invest-10000

    expect(afterSecond.investedAmount).toBe(10000);
    expect(afterSecond.awardedMilestoneIds).toContain('invest-10000');
    expect(afterSecond.points).toBe(150); // 50 + 100 for the ₹10,000 milestone
  });

  it('does not double-award a milestone crossed once and then invested past again', () => {
    const start = stateWith({ sipStarted: true, bankLinked: true, investedAmount: 4900, points: 0 });

    const afterFirst = wealthJourneyReducer(start, { type: 'CONTRIBUTE', amount: 200 }); // -> 5100, crosses invest-5000
    const afterSecond = wealthJourneyReducer(afterFirst, { type: 'CONTRIBUTE', amount: 200 }); // -> 5300, no new cross

    const fiveKAwards = afterSecond.awardedMilestoneIds.filter((id) => id === 'invest-5000');
    expect(fiveKAwards).toHaveLength(1);
    expect(afterSecond.points).toBe(50);
  });

  it('ignores a non-positive contribution instead of mutating state', () => {
    const start = stateWith({ investedAmount: 1000 });
    const result = wealthJourneyReducer(start, { type: 'CONTRIBUTE', amount: 0 });
    expect(result).toBe(start);
  });
});
