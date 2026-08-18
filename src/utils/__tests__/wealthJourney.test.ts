import {
  getMilestoneStates,
  getNewlyCrossedMilestones,
  getNextAction,
  getNextAmountMilestone,
  getProgress,
  getRemainingToNextMilestone,
  initialWealthJourneyState,
  isCreditBenefitUnlocked,
  WealthJourneyState,
} from '../wealthJourney';

function stateWith(overrides: Partial<WealthJourneyState>): WealthJourneyState {
  return { ...initialWealthJourneyState, ...overrides };
}

describe('₹0 invested (fresh user)', () => {
  const state = stateWith({});

  it('reports 0% progress', () => {
    expect(getProgress(state)).toBe(0);
  });

  it('prompts the user to start their first SIP', () => {
    const action = getNextAction(state);
    expect(action.target).toBe('save');
    expect(action.ctaLabel).toBe('Start SIP');
  });

  it('every milestone is locked except the first, which is current', () => {
    const states = getMilestoneStates(state);
    expect(states[0].status).toBe('completed'); // account ready
    expect(states[1].status).toBe('completed'); // kyc complete
    expect(states[2].status).toBe('current'); // sip started
    expect(states[3].status).toBe('locked'); // bank linked
  });
});

describe('₹5,000 invested', () => {
  const state = stateWith({ sipStarted: true, bankLinked: true, investedAmount: 5000 });

  it('marks the ₹5,000 milestone completed and ₹10,000 as next', () => {
    const states = getMilestoneStates(state);
    const fiveK = states.find((s) => s.milestone.id === 'invest-5000');
    const tenK = states.find((s) => s.milestone.id === 'invest-10000');
    expect(fiveK?.status).toBe('completed');
    expect(tenK?.status).toBe('current');
  });

  it('computes the next milestone as ₹10,000', () => {
    expect(getNextAmountMilestone(state)?.target).toBe(10000);
    expect(getRemainingToNextMilestone(state)).toBe(5000);
  });
});

describe('₹10,000 invested', () => {
  const state = stateWith({ sipStarted: true, bankLinked: true, investedAmount: 10000 });

  it('marks ₹10,000 completed and ₹25,000 as next', () => {
    const states = getMilestoneStates(state);
    const tenK = states.find((s) => s.milestone.id === 'invest-10000');
    const twentyFiveK = states.find((s) => s.milestone.id === 'invest-25000');
    expect(tenK?.status).toBe('completed');
    expect(twentyFiveK?.status).toBe('current');
  });

  it('triggers a celebration when crossing from below ₹10,000', () => {
    const crossed = getNewlyCrossedMilestones(8500, 10000);
    expect(crossed.map((m) => m.id)).toEqual(['invest-10000']);
  });

  it('prompts the user to keep investing toward ₹25,000', () => {
    expect(getNextAction(state).target).toBe('invest');
  });
});

describe('₹25,000 invested', () => {
  const state = stateWith({ sipStarted: true, bankLinked: true, investedAmount: 25000 });

  it('reaches 100% progress', () => {
    expect(getProgress(state)).toBe(1);
  });

  it('completes the final milestone', () => {
    const states = getMilestoneStates(state);
    expect(states.every((s) => s.status === 'completed')).toBe(true);
  });

  it('unlocks the credit benefit and points to Borrow', () => {
    expect(isCreditBenefitUnlocked(state)).toBe(true);
    const action = getNextAction(state);
    expect(action.target).toBe('borrow');
    expect(action.ctaLabel).toBe('Explore Borrow');
  });
});

describe('getNewlyCrossedMilestones', () => {
  it('returns every milestone crossed in a single jump', () => {
    const crossed = getNewlyCrossedMilestones(0, 30000);
    expect(crossed.map((m) => m.id)).toEqual(['invest-5000', 'invest-10000', 'invest-25000']);
  });

  it('returns nothing when no threshold is crossed', () => {
    expect(getNewlyCrossedMilestones(6000, 7000)).toEqual([]);
  });
});
