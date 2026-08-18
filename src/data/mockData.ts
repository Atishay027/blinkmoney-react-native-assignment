export const DEMO_USER_NAME = 'Alex';

export const SCHEME = {
  name: 'ICICI Prudential Multi-Asset Fund - Growth',
  learnMoreUrl: 'https://example.com/scheme-details',
};

export const ALLOCATION_SPLIT = {
  stocks: 0.65,
  fd: 0.25,
  gold: 0.1,
};

export const DAILY_PLAN_PRESETS = [51, 101, 501];
export const MONTHLY_PLAN_PRESETS = [1000, 5000, 10000];

export const DEFAULT_DAILY_AMOUNT = 100;
export const DEFAULT_MONTHLY_AMOUNT = 10000;

export const ILLUSTRATIVE_ANNUAL_RATE = 0.15;
export const MONTHLY_SIP_DATE = 22;

export const REFERRAL_CODE = 'BLNK4U9K';

export type ActivityItem = {
  id: string;
  label: string;
  daysAgo: number;
};

export const MOCK_ACTIVITY: ActivityItem[] = [
  { id: 'act-sip', label: 'SIP started', daysAgo: 12 },
  { id: 'act-bank', label: 'Bank account linked', daysAgo: 10 },
  { id: 'act-5000', label: '₹5,000 milestone reached', daysAgo: 3 },
];

export const BORROW_FACTS = {
  interestRate: '9.99% p.a.*',
  maxBorrowPercent: 50,
  disbursalTime: '10 minutes',
};
