import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SipFrequency } from '../utils/sipCalculator';
import {
  AMOUNT_MILESTONES,
  AmountMilestone,
  MilestoneId,
  WealthJourneyState,
  initialWealthJourneyState,
  getMilestoneStates,
  getNextAction,
  getNextAmountMilestone,
  getNewlyCrossedMilestones,
  getProgress,
  getRemainingToNextMilestone,
  isCreditBenefitUnlocked,
} from '../utils/wealthJourney';

const STORAGE_KEY = '@blinkmoney/wealth-journey';

/** Seed shown on first launch so the demo opens mid-journey, matching the spec's example state. */
const demoSeedState: WealthJourneyState = {
  profileComplete: true,
  kycComplete: true,
  sipStarted: true,
  bankLinked: true,
  investedAmount: 8500,
  sipAmount: 100,
  sipFrequency: 'daily',
  points: 50,
  awardedMilestoneIds: ['invest-5000'],
};

export type WealthJourneyAction =
  | { type: 'HYDRATE'; state: WealthJourneyState }
  | { type: 'START_SIP'; amount: number; frequency: SipFrequency }
  | { type: 'LINK_BANK' }
  | { type: 'CONTRIBUTE'; amount: number }
  | { type: 'RESET' };

/**
 * Pure reducer — exported for direct unit testing. CONTRIBUTE takes a relative
 * amount and always adds it to *this call's* `state`, so two dispatches queued
 * from a rapid double-tap each still land correctly (React guarantees the second
 * reducer call receives the first dispatch's result as `state`), instead of a
 * caller computing an absolute next value from a value it read earlier.
 */
export function wealthJourneyReducer(
  state: WealthJourneyState,
  action: WealthJourneyAction
): WealthJourneyState {
  switch (action.type) {
    case 'HYDRATE':
      return action.state;
    case 'START_SIP':
      return { ...state, sipStarted: true, sipAmount: action.amount, sipFrequency: action.frequency };
    case 'LINK_BANK':
      return { ...state, bankLinked: true };
    case 'CONTRIBUTE': {
      if (action.amount <= 0) return state;
      const nextInvestedAmount = state.investedAmount + action.amount;
      const crossed = getNewlyCrossedMilestones(state.investedAmount, nextInvestedAmount).filter(
        (m) => !state.awardedMilestoneIds.includes(m.id)
      );
      const pointsToAdd = crossed.reduce((sum, m) => sum + m.points, 0);
      return {
        ...state,
        investedAmount: nextInvestedAmount,
        points: state.points + pointsToAdd,
        awardedMilestoneIds: [...state.awardedMilestoneIds, ...crossed.map((m) => m.id)],
      };
    }
    case 'RESET':
      return initialWealthJourneyState;
    default:
      return state;
  }
}

type WealthJourneyContextValue = {
  state: WealthJourneyState;
  isHydrated: boolean;
  hydrationError: boolean;
  retryLoad: () => void;
  progress: number;
  milestoneStates: ReturnType<typeof getMilestoneStates>;
  nextAction: ReturnType<typeof getNextAction>;
  remaining: number;
  nextAmountMilestone: AmountMilestone | null;
  creditUnlocked: boolean;
  celebration: AmountMilestone | null;
  dismissCelebration: () => void;
  startSip: (amount: number, frequency: SipFrequency) => void;
  linkBank: () => void;
  contribute: (amount: number) => void;
  resetJourney: () => void;
  simulateLoadError: () => void;
};

const WealthJourneyContext = createContext<WealthJourneyContextValue | undefined>(undefined);

export function WealthJourneyProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(wealthJourneyReducer, initialWealthJourneyState);
  const [isHydrated, setIsHydrated] = useState(false);
  const [hydrationError, setHydrationError] = useState(false);
  const [celebrationQueue, setCelebrationQueue] = useState<AmountMilestone[]>([]);
  const hasLoaded = useRef(false);
  const previousAwardedIdsRef = useRef<MilestoneId[]>([]);

  const loadJourney = useCallback(() => {
    setHydrationError(false);
    AsyncStorage.getItem(STORAGE_KEY)
      .then((stored) => {
        const loaded: WealthJourneyState = stored ? JSON.parse(stored) : demoSeedState;
        previousAwardedIdsRef.current = loaded.awardedMilestoneIds;
        dispatch({ type: 'HYDRATE', state: loaded });
        hasLoaded.current = true;
        setIsHydrated(true);
      })
      .catch(() => {
        setHydrationError(true);
      });
  }, []);

  useEffect(() => {
    loadJourney();
  }, [loadJourney]);

  useEffect(() => {
    if (!hasLoaded.current) return;
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(state)).catch(() => {});
  }, [state]);

  // Derive celebrations from committed state (not from values captured at call time),
  // so a rapid double-tap can never desync "what changed" from "what actually happened."
  useEffect(() => {
    if (!hasLoaded.current) return;
    const previous = previousAwardedIdsRef.current;
    const newlyAwardedIds = state.awardedMilestoneIds.filter((id) => !previous.includes(id));
    if (newlyAwardedIds.length > 0) {
      const newlyAwardedMilestones = AMOUNT_MILESTONES.filter((m) => newlyAwardedIds.includes(m.id));
      setCelebrationQueue((queue) => [...queue, ...newlyAwardedMilestones]);
    }
    previousAwardedIdsRef.current = state.awardedMilestoneIds;
  }, [state.awardedMilestoneIds]);

  const startSip = useCallback((amount: number, frequency: SipFrequency) => {
    dispatch({ type: 'START_SIP', amount, frequency });
  }, []);

  const linkBank = useCallback(() => {
    dispatch({ type: 'LINK_BANK' });
  }, []);

  const contribute = useCallback((amount: number) => {
    dispatch({ type: 'CONTRIBUTE', amount });
  }, []);

  const resetJourney = useCallback(() => {
    previousAwardedIdsRef.current = initialWealthJourneyState.awardedMilestoneIds;
    dispatch({ type: 'RESET' });
    setCelebrationQueue([]);
  }, []);

  const dismissCelebration = useCallback(() => {
    setCelebrationQueue((queue) => queue.slice(1));
  }, []);

  /** Dev-only: lets the required error state be demonstrated without a real AsyncStorage failure. */
  const simulateLoadError = useCallback(() => {
    setHydrationError(true);
  }, []);

  const value = useMemo<WealthJourneyContextValue>(
    () => ({
      state,
      isHydrated,
      hydrationError,
      retryLoad: loadJourney,
      progress: getProgress(state),
      milestoneStates: getMilestoneStates(state),
      nextAction: getNextAction(state),
      remaining: getRemainingToNextMilestone(state),
      nextAmountMilestone: getNextAmountMilestone(state),
      creditUnlocked: isCreditBenefitUnlocked(state),
      celebration: celebrationQueue[0] ?? null,
      dismissCelebration,
      startSip,
      linkBank,
      contribute,
      resetJourney,
      simulateLoadError,
    }),
    [
      state,
      isHydrated,
      hydrationError,
      loadJourney,
      celebrationQueue,
      dismissCelebration,
      startSip,
      linkBank,
      contribute,
      resetJourney,
      simulateLoadError,
    ]
  );

  return <WealthJourneyContext.Provider value={value}>{children}</WealthJourneyContext.Provider>;
}

export function useWealthJourney() {
  const ctx = useContext(WealthJourneyContext);
  if (!ctx) throw new Error('useWealthJourney must be used within a WealthJourneyProvider');
  return ctx;
}
