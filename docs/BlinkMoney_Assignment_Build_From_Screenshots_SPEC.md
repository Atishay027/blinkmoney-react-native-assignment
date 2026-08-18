# BlinkMoney React Native Assignment --- Build-from-Screenshots Specification

## 0. Document Purpose

This document is the **single source of truth for the coding agent**
implementing the BlinkMoney company assignment.

### Critical project context

There is **NO existing BlinkMoney source-code repository**.

The application must be built **from scratch** based on the screenshots
and product flow supplied by the candidate.

The screenshots are **reference material**, not an existing codebase.

The coding agent must therefore:

1.  Initialize/create the React Native application.
2.  Recreate the relevant BlinkMoney-style product experience from the
    screenshots.
3.  Implement the new product feature defined in this document.
4.  Use local/mock data rather than real financial APIs.
5.  Produce a polished, runnable GitHub repository.

------------------------------------------------------------------------

# 1. Assignment Objective

Build a polished React Native prototype inspired by the supplied
BlinkMoney screenshots.

The primary product contribution is:

# Wealth Journey

A visual progress and milestone experience that helps users understand:

-   What they have completed.
-   How much they have invested.
-   What milestone comes next.
-   What action they should take.
-   What benefit becomes available at important milestones.

The experience should feel like a natural extension of the BlinkMoney
product shown in the reference screenshots.

------------------------------------------------------------------------

# 2. WHAT THE SCREENSHOTS REPRESENT

The supplied screenshots show an existing financial application and
provide visual/product references for:

-   Home
-   Save / SIP
-   Borrow
-   Rewards / Referral
-   Profile
-   Account details
-   Bank linking
-   SIP details
-   Transactions
-   FAQ / support
-   SIP calculator
-   Fund allocation
-   Theme
-   Existing ₹25,000 credit-unlock concept

The coding agent must **study these screenshots before implementation**.

Do not assume there is any source code behind them.

------------------------------------------------------------------------

# 3. HIGH-LEVEL PRODUCT STRUCTURE

The prototype should contain a simplified version of the following:

``` text
                    BlinkMoney Prototype
                            │
              ┌─────────────┼─────────────┐
              │             │             │
             Home          Save          Borrow
              │             │             │
              │             │             │
              │          SIP setup        │
              │             │             │
              │             │             │
              │             └──────┐      │
              │                    │      │
              │               Investment │
              │                 progress │
              │                    │      │
              └────────────┬───────┘      │
                           │              │
                     Wealth Journey       │
                           │              │
                      Milestones          │
                           │              │
                        ₹25,000 ──────────┘
                           │
                     Credit benefit
                           │
                         Rewards
```

The implementation should be **simplified**, not a full production
clone.

------------------------------------------------------------------------

# 4. PRIMARY NEW FEATURE

## Wealth Journey

This is the main original product feature to be evaluated.

It should make the user's financial progress feel like a journey rather
than a collection of disconnected screens.

### Core idea

``` text
Start
 ↓
Complete setup
 ↓
Start SIP
 ↓
Link bank
 ↓
₹5,000
 ↓
₹10,000
 ↓
₹25,000
 ↓
Unlock relevant benefit
```

------------------------------------------------------------------------

# 5. WHY THIS FEATURE

## Product problem

The reference application contains multiple actions:

-   Start SIP
-   Invest
-   Link bank
-   Borrow
-   Referral/rewards

But these can feel like separate product actions.

The Wealth Journey creates one clear progression model.

## Product insight

Users are more likely to understand and continue a financial journey
when they can clearly see:

``` text
Where am I?
What did I complete?
What should I do next?
What am I working toward?
```

## Expected product value

The feature is intended to potentially improve:

-   User engagement
-   SIP continuation
-   Goal visibility
-   Financial habit formation
-   Product discovery
-   Return visits

Do not claim fabricated performance metrics.

Use terms such as:

``` text
Expected impact
Hypothesis
Potential improvement
```

------------------------------------------------------------------------

# 6. IMPLEMENTATION SCOPE

## MUST BUILD

The minimum application should contain:

### App shell

-   React Native application
-   Navigation
-   Theme
-   Reusable components
-   Bottom navigation

### Home

-   Header
-   BlinkMoney-style hero/banner
-   Wealth Journey card
-   SIP calculator-style section
-   Bottom navigation

### Save

-   Daily / Monthly SIP selector
-   SIP amount
-   Popular plan options
-   Projected return section
-   Scheme section
-   Fund allocation section
-   Continue SIP CTA

### Borrow

-   ₹25,000 unlock concept
-   Progress toward ₹25,000
-   Borrow information
-   CTA

### Rewards

-   Referral card
-   Referral code
-   Share invite CTA

### Wealth Journey --- NEW

-   Journey card on Home
-   Dedicated journey screen
-   Progress
-   Milestones
-   Next action
-   Celebration
-   Points/reward feedback

### Supporting screens

Only implement the supporting screens required to make the core flow
coherent.

------------------------------------------------------------------------

# 7. SHOULD NOT BUILD

Do NOT attempt to build a complete production fintech application.

Do NOT implement:

-   Real PAN verification
-   Real KYC
-   Real Aadhaar verification
-   Real bank verification
-   Real UPI payment
-   Real SIP mandate
-   Real mutual fund purchase
-   Real mutual fund APIs
-   Real payment gateway
-   Real lending API
-   Real credit scoring
-   Real loan disbursement
-   Real credit underwriting
-   Real investment returns
-   Real market data
-   Real transaction processing
-   Real financial account aggregation
-   Real production authentication backend

All such functionality should be represented using local/mock data where
necessary.

------------------------------------------------------------------------

# 8. PAN / KYC CONTEXT

The screenshots/reference flow indicate that onboarding includes
PAN/name/DOB-related information.

This is important product context, but it is **not the main assignment
feature**.

Do not spend significant time building a full PAN/KYC system.

For the prototype, represent the state locally:

``` js
profileComplete: true
kycComplete: true
```

The Wealth Journey can then show:

``` text
✓ Account ready
✓ KYC complete
```

If the onboarding flow is needed for the demo, use a simple mocked
onboarding state.

Do not call real government/financial APIs.

------------------------------------------------------------------------

# 9. BANK LINKING CONTEXT

The screenshots show:

``` text
Account Details
      ↓
Saving bank account
      ↓
Link your bank account
      ↓
Fetch bank accounts
      ↓
UPI verification
```

Do not build real bank verification.

Use:

``` js
bankLinked: true
```

or:

``` js
bankLinked: false
```

The UI may show a mocked flow if needed.

Example:

``` text
Link your bank account

This is a demo verification flow.

[ Continue ]
```

------------------------------------------------------------------------

# 10. SAVE / SIP SCREEN

Build a simplified version based on the supplied screenshots.

## Required UI

### Header

``` text
← Back                         Help
```

### Promotional banner

Use a BlinkMoney-style banner such as:

``` text
Invest in Stocks + FD + Gold
with one-click SIP

~15% p.a. Returns*
```

This is illustrative UI.

### Frequency

``` text
┌──────────────┬──────────────┐
│    Daily     │   Monthly    │
└──────────────┴──────────────┘
```

### SIP amount

Daily example:

``` text
Set your daily SIP amount

−        ₹100        +
```

Monthly example:

``` text
Set your monthly SIP amount

₹10,000
```

### Popular plans

Daily:

``` text
₹51   ₹101   ₹501
```

Monthly:

``` text
₹1,000   ₹5,000   ₹10,000
```

### Projection

Example:

``` text
Just ₹100 a day could grow to
₹2,71,836 in 5 yrs at 15% p.a.
```

The numbers can be mocked/illustrative.

### Scheme

``` text
ICICI Prudential Multi-Asset Fund - Growth
Learn More →
```

### Fund allocation

Example:

``` text
Stocks       ₹6,500
FD           ₹2,500
Gold         ₹1,000
```

### Bottom CTA

``` text
Continue with ₹100/day SIP
```

------------------------------------------------------------------------

# 11. MONTHLY SIP

Support the same screen with monthly mode.

Example:

``` text
Popular Plans

₹1,000
₹5,000
₹10,000

Just ₹10,000 a month could grow to
₹8,96,817 in 5 yrs at 15% p.a.

Invest every 22nd of the month
```

The exact financial calculation does not need to be production accurate.

Clearly treat projections as illustrative.

------------------------------------------------------------------------

# 12. SIP DETAILS SCREEN

Create a simplified SIP details screen if required by the flow.

Example:

``` text
SIP details

ICICI Prudential Multi-Asset Fund - Growth
● Amount selected

Frequency    Daily
SIP Amount  ₹100
Upcoming SIP —

Complete bank linking to move this SIP forward.

[ Continue SIP ]

Recent transactions

No SIP transactions found yet.
```

------------------------------------------------------------------------

# 13. BORROW SCREEN

The reference product strongly communicates a ₹25,000 milestone.

Use this as the final Wealth Journey milestone.

Example:

``` text
No credit score required

Borrow without
selling a rupee

Start SIP & unlock credit at ₹25K

No EMIs. Interest @
9.99% p.a.*

Borrow upto
50% of SIP

Instant cash in 10 minutes
```

Then:

``` text
Unlocks at ₹25k

₹0 invested                  ₹25,000
      0%
```

Use local demo state.

Do not imply that a real loan is available.

------------------------------------------------------------------------

# 14. REWARDS SCREEN

Build a simplified version of the supplied referral screen.

Example:

``` text
Invite friends to BlinkMoney

Share your referral code and help them
start investing or unlock credit against
mutual funds.

Referral code

AXXI

[ Share invite ]
```

The share action may use the native share sheet or a mocked interaction.

No referral backend is required.

------------------------------------------------------------------------

# 15. HOME SCREEN

The Home screen is the most important supporting screen.

## Header

Match the screenshot style:

``` text
[Profile]  Hello Atishay
           Welcome!

                         Help
```

Do not hard-code a real user's personal information for production use.

Use demo data/configuration.

## Hero

Create a swipeable or static promotional card.

Example:

``` text
Start your SIP.
Reach ₹25,000
Unlock instant credit.

Invest and stay liquid.
```

## Start SIP CTA

``` text
[ Start SIP ]
```

## Wealth Journey Card --- PRIMARY NEW FEATURE

This should appear prominently.

Example:

``` text
Your Wealth Journey

₹8,500 / ₹25,000

██████████░░░░░░

Next milestone
₹10,000

₹1,500 to go

[ View Journey ]
```

## SIP Calculator

Provide:

``` text
₹100 daily for 1 year
could grow to

₹39,186
```

Allow:

-   Daily/monthly
-   1 year
-   5 year
-   10 year

Use illustrative local calculations/data.

------------------------------------------------------------------------

# 16. BOTTOM NAVIGATION

Use exactly four primary tabs:

``` text
Home
Save
Borrow
Rewards
```

Do NOT create a Wealth Journey bottom tab.

Wealth Journey is a feature, not a fifth section.

------------------------------------------------------------------------

# 17. IMPORTANT NAVIGATION BEHAVIOR

The reference screenshots show that some flows use screens/bottom
sheets.

Implement a clean navigation architecture.

Recommended:

``` text
Root
 ├── Home
 ├── Save
 ├── Borrow
 └── Rewards

Home
 └── WealthJourneyScreen
```

The Wealth Journey should not become a fifth bottom tab.

------------------------------------------------------------------------

# 18. WEALTH JOURNEY HOME CARD

This is required.

Example:

``` text
┌────────────────────────────────────────┐
│ Your Wealth Journey                    │
│                                        │
│ 34% complete                           │
│ ███████████░░░░░░░░                   │
│                                        │
│ ₹8,500 / ₹25,000                       │
│ ₹1,500 to next milestone               │
│                                        │
│ View Journey →                         │
└────────────────────────────────────────┘
```

Requirements:

-   Premium fintech appearance.
-   Green accent.
-   Rounded corners.
-   Large financial number.
-   Progress bar.
-   Next milestone.
-   CTA.
-   Responsive layout.

------------------------------------------------------------------------

# 19. WEALTH JOURNEY SCREEN

Required structure:

``` text
← Back

Your Wealth Journey

Build your wealth, one milestone at a time.

₹8,500
of ₹25,000

████████████░░░░░░

Next milestone

₹10,000 invested
₹1,500 remaining

[ Continue Journey ]
```

Then:

``` text
Milestones

✓ Account ready
✓ KYC complete
✓ SIP started
✓ Bank linked
✓ ₹5,000 invested

○ ₹10,000 invested
○ ₹25,000 invested
```

Optional:

``` text
🔒 Credit benefit
```

------------------------------------------------------------------------

# 20. MILESTONES

Use these milestones:

``` text
1. Account ready
2. KYC complete
3. SIP started
4. Bank linked
5. ₹5,000 invested
6. ₹10,000 invested
7. ₹25,000 invested
```

Do not create excessive milestones.

------------------------------------------------------------------------

# 21. MILESTONE STATES

Every milestone should have one of:

``` text
completed
current
locked
```

Visual example:

``` text
✓ Completed
● Current
○ Upcoming
🔒 Locked
```

Do not rely only on color.

------------------------------------------------------------------------

# 22. NEXT ACTION LOGIC

The next action should depend on the user's current state.

Example:

### No SIP

``` text
Start your first SIP

[ Start SIP ]
```

### SIP started, bank not linked

``` text
Link your bank account

[ Link Bank ]
```

### Bank linked, below next milestone

``` text
Continue investing

₹1,500 to your next milestone

[ Invest More ]
```

### ₹25,000 reached

``` text
Your milestone is complete!

Credit benefit unlocked

[ Explore Borrow ]
```

The actions should navigate to the relevant prototype screens.

------------------------------------------------------------------------

# 23. MILESTONE CELEBRATION

When the user crosses a milestone:

``` text
🎉

Milestone unlocked!

₹10,000 invested

You've reached another step
in your Wealth Journey.

+100 Journey Points

[ Continue ]
```

Use:

-   Fade
-   Scale
-   Checkmark
-   Confetti
-   Progress animation

A lightweight celebration is preferred.

Do not over-animate.

------------------------------------------------------------------------

# 24. GAMIFICATION

Use a small point system.

Example:

``` text
₹5,000   +50 points
₹10,000  +100 points
₹25,000  +250 points
```

Use wording:

``` text
Journey Points
```

unless the app already establishes another rewards terminology.

Do not pretend these points have real monetary value.

------------------------------------------------------------------------

# 25. MOCK DATA

Use a central local data model.

Example:

``` js
const initialWealthJourney = {
  profileComplete: true,
  kycComplete: true,
  sipStarted: true,
  bankLinked: true,

  investedAmount: 8500,

  milestones: [
    {
      id: 'account',
      title: 'Account ready',
      type: 'status',
      completed: true,
    },
    {
      id: 'kyc',
      title: 'KYC complete',
      type: 'status',
      completed: true,
    },
    {
      id: 'sip',
      title: 'SIP started',
      type: 'status',
      completed: true,
    },
    {
      id: 'bank',
      title: 'Bank linked',
      type: 'status',
      completed: true,
    },
    {
      id: '5000',
      title: '₹5,000 invested',
      target: 5000,
      points: 50,
    },
    {
      id: '10000',
      title: '₹10,000 invested',
      target: 10000,
      points: 100,
    },
    {
      id: '25000',
      title: '₹25,000 invested',
      target: 25000,
      points: 250,
    },
  ],

  points: 50,
};
```

The coding agent may improve the model.

------------------------------------------------------------------------

# 26. PROGRESS CALCULATION

Final milestone:

``` text
₹25,000
```

Overall progress:

``` js
progress = Math.min(investedAmount / 25000, 1)
```

Example:

``` text
₹0       → 0%
₹5,000   → 20%
₹8,500   → 34%
₹10,000  → 40%
₹25,000  → 100%
```

Next milestone:

``` js
nextMilestone = first milestone where target > investedAmount
```

Remaining:

``` js
remaining = Math.max(nextMilestone - investedAmount, 0)
```

------------------------------------------------------------------------

# 27. DEMO PROGRESS

The application must be easy to demonstrate.

During development, support a development-only progress mechanism.

Example:

``` text
Demo controls

[ + ₹500 ]
[ + ₹1,000 ]
[ Complete milestone ]
[ Reset ]
```

Only show this under:

``` js
__DEV__
```

Do not expose developer controls in the polished production-looking UI.

------------------------------------------------------------------------

# 28. LOCAL PERSISTENCE

If practical, use AsyncStorage.

Example:

``` text
User changes progress
      ↓
Persist locally
      ↓
Reload app
      ↓
Progress remains
```

This is recommended but not mandatory.

Do not create a backend just for this.

------------------------------------------------------------------------

# 29. PROJECT CREATION

The agent must create the project from scratch.

First inspect the local environment.

Determine:

-   Node version
-   npm/yarn/pnpm
-   React Native tooling
-   Android tooling
-   iOS tooling
-   macOS/Xcode if relevant

Then choose the simplest compatible React Native setup.

Prefer the technology required by the assignment if specified.

If the assignment allows freedom:

``` text
React Native + TypeScript
```

is preferred.

------------------------------------------------------------------------

# 30. TECHNOLOGY GUIDELINES

Preferred:

``` text
React Native
TypeScript
React Navigation
AsyncStorage (optional)
React Native Reanimated (only if useful)
```

Do not install libraries for trivial UI.

Use native React Native components where possible.

------------------------------------------------------------------------

# 31. PROJECT STRUCTURE

Suggested:

``` text
src/
├── components/
│   ├── common/
│   └── wealthJourney/
│       ├── WealthJourneyCard.tsx
│       ├── WealthProgressBar.tsx
│       ├── MilestoneItem.tsx
│       ├── NextActionCard.tsx
│       └── MilestoneCelebration.tsx
│
├── screens/
│   ├── HomeScreen.tsx
│   ├── SaveScreen.tsx
│   ├── BorrowScreen.tsx
│   ├── RewardsScreen.tsx
│   ├── WealthJourneyScreen.tsx
│   └── SipDetailsScreen.tsx
│
├── navigation/
│   └── AppNavigator.tsx
│
├── state/
│   └── WealthJourneyContext.tsx
│
├── data/
│   └── mockData.ts
│
├── theme/
│   ├── colors.ts
│   ├── typography.ts
│   └── spacing.ts
│
└── utils/
    └── wealthJourney.ts
```

Adapt if a simpler structure is better.

------------------------------------------------------------------------

# 32. DESIGN LANGUAGE

The screenshots establish a strong visual language.

Use:

-   Deep green/black backgrounds
-   Bright lime green CTAs
-   Rounded cards
-   Large numbers
-   Minimal premium UI
-   High contrast
-   Muted secondary text
-   Thin borders
-   Generous spacing
-   Financial dashboard styling

Do not copy screenshots pixel-for-pixel.

Recreate the visual language and hierarchy.

------------------------------------------------------------------------

# 33. LIGHT THEME

The supplied screenshots show both dark and light themes.

If implementing theme switching:

``` text
Dark
Light
System Default
```

The Wealth Journey must work in both themes.

If time is limited:

1.  Perfect dark theme first.
2.  Then implement light theme.
3.  Ensure both are readable.

------------------------------------------------------------------------

# 34. COLORS

Prefer central theme tokens.

Example:

``` js
background
surface
surfaceSecondary
primary
primaryText
text
textSecondary
border
success
warning
info
```

Do not scatter arbitrary hex codes throughout components.

------------------------------------------------------------------------

# 35. TYPOGRAPHY

Follow the screenshot hierarchy:

``` text
Screen title
Large amount
Milestone title
Supporting copy
Metadata
```

Financial values should have strong visual emphasis.

Example:

``` text
₹8,500
```

should be visually stronger than:

``` text
of ₹25,000
```

------------------------------------------------------------------------

# 36. RESPONSIVE UI

The prototype must work on common mobile sizes.

Avoid:

-   Full-screen absolute positioning
-   Fixed heights for dynamic content
-   Content hidden behind navigation
-   Text clipping
-   Horizontal overflow

Use:

-   SafeAreaView
-   ScrollView
-   Flexbox
-   Platform-safe spacing
-   Responsive sizing

------------------------------------------------------------------------

# 37. ACCESSIBILITY

Implement basic accessibility.

Examples:

``` text
accessibilityLabel
accessibilityRole
```

Important information must not depend only on color.

------------------------------------------------------------------------

# 38. ERROR / EMPTY / LOADING STATES

Implement lightweight states.

## No investment

``` text
Your Wealth Journey starts here.

Start your first SIP to begin.

[ Start SIP ]
```

## Loading

Simple skeleton/activity indicator.

## Error

``` text
Unable to load your Wealth Journey.

[ Try again ]
```

------------------------------------------------------------------------

# 39. SIP CALCULATOR

Implement a lightweight illustrative calculator.

Inputs:

``` text
Daily / Monthly
1 Year / 5 Year / 10 Year
```

Use a simple formula or mock values.

The UI should resemble the screenshot.

Include:

``` text
How this estimate works?
```

When tapped, show:

``` text
How this estimate works

Projections use an illustrative rate.
Actual returns depend on market conditions
and are not guaranteed.

This is not financial advice.
```

Do not present projections as guaranteed returns.

------------------------------------------------------------------------

# 40. FINANCIAL DISCLAIMER

Because this is a prototype, financial values should be clearly
illustrative.

Use:

``` text
For informational purposes only.
Returns shown are illustrative and not guaranteed.
```

Do not make promises about investment returns or loan eligibility.

------------------------------------------------------------------------

# 41. PROFILE / ACCOUNT

A complete profile system is NOT required.

If needed for product realism, create a simple profile screen with:

``` text
Profile
Account details
Settings
Support
About
```

But prioritize:

``` text
Home
Save
Borrow
Rewards
Wealth Journey
```

over secondary profile screens.

------------------------------------------------------------------------

# 42. TRANSACTIONS

A complete transactions system is NOT required.

If useful, show:

``` text
Recent activity

✓ SIP started
✓ ₹5,000 milestone reached
```

Use local mock activity.

------------------------------------------------------------------------

# 43. REFERRAL

Referral is secondary.

Implement only:

``` text
Referral code
Share invite
```

No backend.

------------------------------------------------------------------------

# 44. GITHUB

Create a clean repository.

Suggested:

``` text
blinkmoney-react-native-assignment
```

or:

``` text
blinkmoney-wealth-journey
```

The repository must contain the complete runnable project.

Do not commit:

``` text
.env
API keys
private certificates
production credentials
```

------------------------------------------------------------------------

# 45. GIT COMMITS

Use meaningful commits.

Examples:

``` text
chore: initialize react native project
feat: build blinkmoney app shell
feat: add home and bottom navigation
feat: add save sip prototype
feat: add borrow prototype
feat: add rewards referral prototype
feat: add wealth journey data model
feat: add wealth journey card
feat: add wealth journey screen
feat: add milestone celebration
feat: connect journey actions
test: verify milestone states
docs: add assignment readme
```

Avoid:

``` text
final
final2
changes
test
abc
new
```

------------------------------------------------------------------------

# 46. README

The final repository README must contain:

## Project title

``` text
BlinkMoney React Native Assignment
```

## Feature

``` text
Wealth Journey
```

## Overview

Explain what was built.

## Problem

Explain the product problem.

## Solution

Explain the Wealth Journey.

## Existing reference

Mention that the supplied screenshots were used as product/UI
references.

## User flow

``` text
Home
 ↓
Wealth Journey
 ↓
Progress
 ↓
Next Action
 ↓
Milestone
 ↓
Reward
 ↓
₹25K
 ↓
Borrow
```

## Features

-   Home
-   Save/SIP
-   Borrow
-   Rewards
-   Wealth Journey
-   Milestones
-   Progress
-   Next action
-   Celebration
-   Local persistence if implemented

## Tech stack

Example:

``` text
React Native
TypeScript
React Navigation
AsyncStorage
```

Only list technologies actually used.

## Architecture

Explain important folders.

## Mocked functionality

Clearly state:

``` text
This is a product prototype. Financial operations,
KYC, bank verification, payments, lending and
investment transactions are mocked/local and do
not perform real financial operations.
```

## Screenshots

Add screenshots.

## Demo video

Add video link if available.

## Installation

Use exact commands.

## Running

Use exact commands.

## Product decisions

Explain why Wealth Journey was selected.

## Future improvements

Mention:

-   Real backend
-   Real portfolio data
-   Analytics
-   Notifications
-   Personalized milestones
-   Real rewards
-   Production APIs

------------------------------------------------------------------------

# 47. TESTING

At minimum test:

## State 1

``` text
₹0
```

Expected:

``` text
0%
Start SIP
```

## State 2

``` text
₹5,000
```

Expected:

``` text
₹5,000 completed
₹10,000 next
```

## State 3

``` text
₹10,000
```

Expected:

``` text
₹10,000 completed
Celebration
₹25,000 next
```

## State 4

``` text
₹25,000
```

Expected:

``` text
100%
Final milestone completed
Borrow benefit state
```

## Navigation

Verify:

``` text
Home → Wealth Journey
Wealth Journey → Save
Wealth Journey → Borrow
Save → SIP Details
```

------------------------------------------------------------------------

# 48. DEMO FLOW

The final demo should take approximately 1--2 minutes.

Recommended:

``` text
1. Launch app
2. Show Home
3. Show Wealth Journey card
4. Open Wealth Journey
5. Explain current progress
6. Show completed milestones
7. Show next milestone
8. Trigger/increase demo progress
9. Cross ₹10K
10. Show celebration
11. Show updated journey
12. Reach ₹25K
13. Show Borrow connection
14. Briefly show Save/Borrow/Rewards screens
```

------------------------------------------------------------------------

# 49. PRIORITY ORDER

If time is limited, implement in this exact priority:

## P0 --- Mandatory

1.  Project setup
2.  Home
3.  Bottom navigation
4.  Wealth Journey card
5.  Wealth Journey screen
6.  Milestones
7.  Progress calculation
8.  Next action
9.  Save screen
10. Borrow screen

## P1 --- Strongly recommended

11. Rewards screen
12. SIP details
13. Celebration animation
14. Local persistence
15. Light theme

## P2 --- Optional

16. Transaction mock
17. Profile
18. Advanced animation
19. Native sharing
20. Additional polish

Do not sacrifice P0 quality to build P2 features.

------------------------------------------------------------------------

# 50. WHAT NOT TO SPEND TIME ON

Do not spend assignment time on:

-   Production backend
-   Database architecture
-   Real authentication
-   Real KYC
-   Real payments
-   Real UPI
-   Real bank APIs
-   Real mutual fund APIs
-   Real credit scoring
-   Admin dashboard
-   Web application
-   Backend deployment
-   Complex analytics platform
-   Complex notification infrastructure

The assignment is primarily a **React Native product/UI/engineering
prototype**.

------------------------------------------------------------------------

# 51. DEFINITION OF DONE

## Product

-   [ ] App communicates the BlinkMoney concept.
-   [ ] Wealth Journey is clearly the original feature.
-   [ ] User can see progress.
-   [ ] User can see next milestone.
-   [ ] User can see completed milestones.
-   [ ] User has a clear next action.
-   [ ] Milestone celebration works.
-   [ ] ₹25K connects logically to Borrow.

## UI

-   [ ] BlinkMoney-inspired visual language.
-   [ ] Dark theme polished.
-   [ ] Light theme polished if implemented.
-   [ ] No clipping.
-   [ ] No overflow.
-   [ ] Safe areas respected.
-   [ ] Navigation usable.
-   [ ] CTA accessible.

## Engineering

-   [ ] React Native project runs.
-   [ ] Navigation works.
-   [ ] Components are reusable.
-   [ ] State logic is understandable.
-   [ ] Mock data is centralized.
-   [ ] No unnecessary dependencies.
-   [ ] No secrets.
-   [ ] No fake claims of real financial functionality.

## Submission

-   [ ] GitHub repository complete.
-   [ ] README complete.
-   [ ] Screenshots included.
-   [ ] Demo video/GIF included if possible.
-   [ ] Meaningful commits.
-   [ ] Clean project.

------------------------------------------------------------------------

# 52. AGENT EXECUTION PROTOCOL

The coding agent MUST follow this sequence.

## Phase 1 --- Understand

Read this entire document.

Then inspect the supplied screenshot/reference assets if available.

Create a concise understanding of:

``` text
Existing product structure
Visual language
Required screens
Primary new feature
Navigation
Mock data
Non-goals
```

Do not code yet.

## Phase 2 --- Environment inspection

Check:

``` text
Node
npm/yarn/pnpm
React Native CLI/Expo
Android SDK
Java/JDK
Xcode if applicable
```

Choose a compatible setup.

## Phase 3 --- Project initialization

Create the React Native project.

Verify that a blank app runs before implementing features.

## Phase 4 --- Architecture

Create:

``` text
navigation
theme
components
screens
mock data
state
utilities
```

Keep architecture simple.

## Phase 5 --- App shell

Build:

``` text
Home
Save
Borrow
Rewards
Bottom navigation
```

## Phase 6 --- Wealth Journey

Build:

``` text
Data model
State
Progress calculation
Home card
Journey screen
Milestone list
Next action
Celebration
```

## Phase 7 --- Integration

Connect:

``` text
Journey → Save
Journey → Borrow
Home → Journey
```

## Phase 8 --- Polish

Fix:

``` text
Spacing
Typography
Colors
Animations
Safe area
Responsiveness
Accessibility
```

## Phase 9 --- Test

Test every required milestone state.

## Phase 10 --- Documentation

Create:

``` text
README.md
```

Add screenshots/demo.

## Phase 11 --- GitHub

Initialize git.

Commit cleanly.

Verify no secrets.

Prepare final repository.

------------------------------------------------------------------------

# 53. FIRST RESPONSE FROM THE AGENT

Before coding, the coding agent MUST report:

``` text
1. Understanding of the assignment
2. What will be built
3. What will not be built
4. Proposed project architecture
5. Navigation plan
6. Wealth Journey data/state plan
7. Environment/setup plan
8. Implementation phases
```

Then begin implementation.

------------------------------------------------------------------------

# 54. CRITICAL AGENT RULES

The agent must NOT:

-   Assume an existing BlinkMoney codebase.
-   Ask for an existing repository that was never provided.
-   Rebuild every screenshot.
-   Create real financial APIs.
-   Create a backend unnecessarily.
-   Replace the assignment with a generic finance app.
-   Ignore the supplied visual references.
-   Add a fifth bottom tab.
-   Make Wealth Journey an unrelated feature.
-   Over-engineer the prototype.
-   Leave developer controls visible in the final UI.
-   Commit secrets.

The agent SHOULD:

-   Build from scratch.
-   Use screenshots as references.
-   Recreate the relevant product experience.
-   Prioritize Wealth Journey.
-   Use mock/local data.
-   Make the UI polished.
-   Reuse components.
-   Keep code maintainable.
-   Make the demo easy to understand.
-   Document product decisions.

------------------------------------------------------------------------

# 55. FINAL TARGET

The final application should communicate:

> "This developer studied the existing BlinkMoney product, understood
> the user journey, recreated the relevant experience from the provided
> references, and added a thoughtful Wealth Journey feature that
> connects saving, SIP progress, milestones, rewards, and the ₹25K
> Borrow unlock."

It should NOT communicate:

> "This developer built a random finance UI."

The application should be a **focused, polished, believable React Native
prototype**, not a production fintech system.

------------------------------------------------------------------------

# END OF SPECIFICATION
