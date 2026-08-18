import { SipFrequency } from './sipCalculator';

export type MilestoneStatus = 'completed' | 'current' | 'locked';

export type StatusMilestoneId = 'account' | 'kyc' | 'sip' | 'bank';
export type AmountMilestoneId = 'invest-5000' | 'invest-10000' | 'invest-25000';
export type MilestoneId = StatusMilestoneId | AmountMilestoneId;

export type StatusMilestone = {
  id: StatusMilestoneId;
  kind: 'status';
  title: string;
};

export type AmountMilestone = {
  id: AmountMilestoneId;
  kind: 'amount';
  title: string;
  target: number;
  points: number;
};

export type Milestone = StatusMilestone | AmountMilestone;

export const FINAL_MILESTONE_TARGET = 25000;

export const MILESTONES: Milestone[] = [
  { id: 'account', kind: 'status', title: 'Account ready' },
  { id: 'kyc', kind: 'status', title: 'KYC complete' },
  { id: 'sip', kind: 'status', title: 'SIP started' },
  { id: 'bank', kind: 'status', title: 'Bank linked' },
  { id: 'invest-5000', kind: 'amount', title: '₹5,000 invested', target: 5000, points: 50 },
  { id: 'invest-10000', kind: 'amount', title: '₹10,000 invested', target: 10000, points: 100 },
  { id: 'invest-25000', kind: 'amount', title: '₹25,000 invested', target: 25000, points: 250 },
];

export const AMOUNT_MILESTONES = MILESTONES.filter(
  (m): m is AmountMilestone => m.kind === 'amount'
);

export type WealthJourneyState = {
  profileComplete: boolean;
  kycComplete: boolean;
  sipStarted: boolean;
  bankLinked: boolean;
  investedAmount: number;
  sipAmount: number;
  sipFrequency: SipFrequency;
  points: number;
  awardedMilestoneIds: MilestoneId[];
};

export const initialWealthJourneyState: WealthJourneyState = {
  profileComplete: true,
  kycComplete: true,
  sipStarted: false,
  bankLinked: false,
  investedAmount: 0,
  sipAmount: 100,
  sipFrequency: 'daily',
  points: 0,
  awardedMilestoneIds: [],
};

function isMilestoneComplete(milestone: Milestone, state: WealthJourneyState): boolean {
  switch (milestone.id) {
    case 'account':
      return state.profileComplete;
    case 'kyc':
      return state.kycComplete;
    case 'sip':
      return state.sipStarted;
    case 'bank':
      return state.bankLinked;
    default:
      return state.investedAmount >= milestone.target;
  }
}

export function getMilestoneStates(
  state: WealthJourneyState
): Array<{ milestone: Milestone; status: MilestoneStatus }> {
  let currentAssigned = false;
  return MILESTONES.map((milestone) => {
    if (isMilestoneComplete(milestone, state)) {
      return { milestone, status: 'completed' as const };
    }
    if (!currentAssigned) {
      currentAssigned = true;
      return { milestone, status: 'current' as const };
    }
    return { milestone, status: 'locked' as const };
  });
}

export function getProgress(state: WealthJourneyState): number {
  return Math.min(state.investedAmount / FINAL_MILESTONE_TARGET, 1);
}

export function getNextAmountMilestone(state: WealthJourneyState): AmountMilestone | null {
  return AMOUNT_MILESTONES.find((m) => m.target > state.investedAmount) ?? null;
}

export function getRemainingToNextMilestone(state: WealthJourneyState): number {
  const next = getNextAmountMilestone(state);
  if (!next) return 0;
  return Math.max(next.target - state.investedAmount, 0);
}

export function isCreditBenefitUnlocked(state: WealthJourneyState): boolean {
  return state.investedAmount >= FINAL_MILESTONE_TARGET;
}

/** Amount milestones whose target falls strictly between the previous and next invested amount. */
export function getNewlyCrossedMilestones(
  previousInvestedAmount: number,
  nextInvestedAmount: number
): AmountMilestone[] {
  return AMOUNT_MILESTONES.filter(
    (m) => previousInvestedAmount < m.target && nextInvestedAmount >= m.target
  );
}

export type NextAction = {
  heading: string;
  description: string;
  ctaLabel: string;
  target: 'save' | 'bank' | 'invest' | 'borrow';
};

export function getNextAction(state: WealthJourneyState): NextAction {
  if (!state.sipStarted) {
    return {
      heading: 'Start your first SIP',
      description: 'Begin investing to start your Wealth Journey.',
      ctaLabel: 'Start SIP',
      target: 'save',
    };
  }

  if (!state.bankLinked) {
    return {
      heading: 'Link your bank account',
      description: 'Complete bank linking to move your SIP forward.',
      ctaLabel: 'Link Bank',
      target: 'bank',
    };
  }

  if (isCreditBenefitUnlocked(state)) {
    return {
      heading: 'Your milestone is complete!',
      description: 'Credit benefit unlocked.',
      ctaLabel: 'Explore Borrow',
      target: 'borrow',
    };
  }

  const remaining = getRemainingToNextMilestone(state);
  return {
    heading: 'Continue investing',
    description: `₹${new Intl.NumberFormat('en-IN').format(remaining)} to your next milestone`,
    ctaLabel: 'Invest More',
    target: 'invest',
  };
}
