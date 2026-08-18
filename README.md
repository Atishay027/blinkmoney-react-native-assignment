# BlinkMoney React Native Assignment

## Feature: Wealth Journey

A polished React Native (Expo + TypeScript) prototype inspired by the BlinkMoney product, built
from scratch with **Wealth Journey** — a milestone-driven progress experience — as the primary
original contribution.

## Overview

The app recreates a simplified slice of the BlinkMoney product: **Home**, **Save/SIP**,
**Borrow**, and **Rewards**, plus a brand-new **Wealth Journey** feature that ties them together
into a single, understandable progression from "just signed up" to "₹25,000 invested and credit
unlocked." All financial behavior — SIP contributions, bank linking, KYC, credit — is mocked and
local. Nothing in this app talks to a real bank, payment gateway, mutual fund, or lending API.

## Problem

The reference product exposes several independent actions — start a SIP, invest, link a bank
account, borrow, refer a friend — that can feel disconnected from each other. A user has no single
place to see *where they are*, *what they've completed*, and *what to do next*.

## Solution

**Wealth Journey** turns those separate actions into one visible progression:

```
Account ready → KYC complete → SIP started → Bank linked → ₹5,000 → ₹10,000 → ₹25,000 → Credit unlocked
```

It surfaces on Home as a progress card, and has its own screen showing the full milestone list, a
dynamic "next action" that always tells the user exactly what to do next, and a lightweight
celebration when a money milestone is crossed. Reaching ₹25,000 is the same threshold the Borrow
screen already promotes as its credit-unlock concept — Wealth Journey makes that connection
explicit instead of leaving it as a separate banner.

**Expected impact (hypothesis, not measured):** a single visible progression may improve SIP
continuation, goal visibility, and return visits, by replacing a set of disconnected actions with
one story the user can track.

## Existing reference

This build was based on `docs/BlinkMoney_Assignment_Build_From_Screenshots_SPEC.md`, a detailed
specification describing the BlinkMoney reference product and its screens. The actual reference
screenshots referenced by the assignment were not available in this build environment; the spec's
literal screen mockups, copy, and visual-language notes (deep green/black backgrounds, lime green
CTAs, rounded cards, high-contrast large numbers) were used as the product/UI reference instead.
No existing BlinkMoney source code was assumed, referenced, or copied — everything here was built
from scratch.

## User flow

```
Home
 ↓
Wealth Journey card → Wealth Journey screen
 ↓
Progress (₹ invested / ₹25,000) + Milestones list
 ↓
Next action (Start SIP → Link Bank → Invest More → Explore Borrow)
 ↓
Milestone crossed → Celebration + Journey Points
 ↓
₹25,000 → Credit benefit unlocked → Borrow
```

## Features

- **Home** — header, hero banner, "Start SIP" CTA, Wealth Journey card, SIP calculator
  (daily/monthly × 1/5/10 yr)
- **Save/SIP** — daily/monthly frequency, amount stepper + popular presets, illustrative
  projection, scheme + fund allocation, "Continue SIP" CTA
- **SIP details** — scheme summary, frequency/amount, bank-link gate, transaction empty state
- **Bank linking** — explicitly mocked demo verification step
- **Borrow** — ₹25,000 unlock concept, progress bar, gated CTA
- **Rewards** — referral code + native share sheet
- **Wealth Journey** — progress hero, 7-step milestone list (completed / current / locked, never
  color-only), dynamic next action, recent activity, milestone celebration (fade/scale + light
  confetti + Journey Points), dev-only demo progress controls
- **Theme** — dark (default) and light palettes via central theme tokens, switchable from Home
- **Local persistence** — Wealth Journey state survives app reloads via AsyncStorage

## What was intentionally NOT built

Per the assignment's scope, this prototype does **not** implement: real PAN/KYC/Aadhaar
verification, real bank/UPI verification, real SIP mandates, real mutual fund purchases or market
data, any payment gateway, real lending/credit scoring/loan disbursement, a production auth
backend, a full transactions or profile system, or a fifth "Wealth Journey" bottom tab. All such
concepts are represented with local/mock state (`profileComplete`, `kycComplete`, `bankLinked`,
etc.) exactly as the spec describes.

## Tech stack

- React Native (Expo, managed workflow) + TypeScript
- React Navigation (bottom tabs + native stack)
- React Context + `useReducer` for Wealth Journey state (no Redux/Zustand needed at this scale)
- AsyncStorage for local persistence
- `@expo/vector-icons` for iconography (ships with Expo, no extra install)
- Jest for unit tests
- No Reanimated, no confetti library — the milestone celebration uses React Native's built-in
  `Animated` API only

## Architecture

```
src/
├── components/
│   ├── common/           Screen, Header, Button, Card, ProgressBar, SegmentedControl
│   └── wealthJourney/     WealthJourneyCard, MilestoneItem, NextActionCard,
│                          MilestoneCelebration, DevJourneyControls
├── screens/               Home, Save, SipDetails, BankLink, Borrow, Rewards, WealthJourney
├── navigation/            AppNavigator (tabs + nested stacks), navigationRef, types
├── context/               WealthJourneyContext (state, persistence, derived selectors)
├── data/                  mockData.ts — scheme, allocation split, presets, referral code
├── theme/                 colors, typography, spacing, ThemeContext
└── utils/                 wealthJourney.ts (progress/milestone logic), sipCalculator.ts, format.ts
```

**Why this shape:** Wealth Journey's milestone/progress/next-action logic lives entirely in pure
functions (`utils/wealthJourney.ts`) with no React or navigation dependency, so it's directly unit
testable and the screens stay thin (they just read derived values from `useWealthJourney()` and
render them). `investedAmount` is the single source of truth that Home's card, the Journey screen,
and the Borrow screen all read — nothing is duplicated or re-derived per screen.

## Mocked functionality

**This is a product prototype.** Financial operations, KYC, bank verification, payments, lending,
and investment transactions are mocked/local and do not perform real financial operations.
Projected returns are illustrative estimates, not guarantees, and are labeled as such everywhere
they appear.

## Wealth Journey data model

```ts
type WealthJourneyState = {
  profileComplete: boolean;
  kycComplete: boolean;
  sipStarted: boolean;
  bankLinked: boolean;
  investedAmount: number;
  sipAmount: number;
  sipFrequency: 'daily' | 'monthly';
  points: number;
  awardedMilestoneIds: string[]; // guards against double-awarding points
};
```

Milestone status (`completed` / `current` / `locked`) and progress are always **derived**, never
stored — see `getMilestoneStates`, `getProgress`, `getNextAmountMilestone`, and `getNextAction` in
`src/utils/wealthJourney.ts`.

```
progress = min(investedAmount / 25000, 1)
nextMilestone = first amount milestone where target > investedAmount
remaining = max(nextMilestone.target − investedAmount, 0)
```

The app seeds first-launch state at ₹8,500 (SIP started, bank linked, ₹5,000 milestone already
crossed) so the journey opens mid-progress for demo purposes — matching the spec's own worked
example. Use the dev-only **Reset** control to return to a true ₹0 fresh-user state.

## Installation

```bash
git clone <your-repo-url>
cd BlinkMoneyAss   # or your chosen folder name
npm install
```

## Running

```bash
npx expo start
```

Then press `i` for the iOS Simulator, `a` for a connected Android emulator/device, or scan the QR
code with Expo Go on a physical device. No native build step is required — everything used here
(AsyncStorage, navigation, animations) works inside plain Expo Go.

Run the unit tests:

```bash
npm test
```

## Demo flow (~1–2 minutes)

1. Launch the app on Home — note the Wealth Journey card mid-progress.
2. Tap **View Journey** to open the full Wealth Journey screen.
3. Point out the completed milestones (account, KYC, SIP, bank, ₹5,000) and the current one.
4. Use the dev-only demo controls to add ₹1,500 and cross ₹10,000 — celebration fires.
5. Add the rest to reach ₹25,000 — final milestone completes, credit benefit unlocks.
6. Tap **Explore Borrow** to show the Borrow screen now reflecting the unlocked state.
7. Briefly show Save (SIP setup) and Rewards (referral code + share).

## Product decisions

- **Wealth Journey over a fifth tab:** kept as a feature reachable from Home, per the assignment's
  explicit constraint — it's meant to feel like a lens over existing actions, not a new section.
- **Derived state, not stored state:** milestone status and progress are computed from a handful of
  booleans/numbers rather than persisted as a redundant list, so there's one source of truth and no
  risk of the UI and the data model disagreeing.
- **Demo-seeded first launch:** starting the demo at ₹0 with no SIP would make the milestone list
  and celebration hard to show quickly; seeding at ₹8,500 (matching the spec's own example) lets a
  grader see the full experience immediately, while the dev Reset control still exercises the true
  empty state.
- **No extra animation/confetti library:** the celebration's fade/scale/confetti is built on React
  Native's core `Animated` API to avoid an unnecessary dependency for a lightweight, one-time effect.

## Future improvements

- Real backend and portfolio data instead of local mock state
- Analytics on journey progression and milestone drop-off
- Push notifications for milestone proximity ("₹500 away from your next milestone")
- Personalized milestones based on actual user behavior
- Real rewards ledger instead of illustrative Journey Points
- Production-grade KYC/bank/payment integrations, once this prototype's UX is validated
