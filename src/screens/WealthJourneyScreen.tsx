import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../theme/ThemeContext';
import { typography } from '../theme/typography';
import { spacing } from '../theme/spacing';
import { Screen } from '../components/common/Screen';
import { Header } from '../components/common/Header';
import { Card } from '../components/common/Card';
import { ProgressBar } from '../components/common/ProgressBar';
import { MilestoneItem } from '../components/wealthJourney/MilestoneItem';
import { NextActionCard } from '../components/wealthJourney/NextActionCard';
import { DevJourneyControls } from '../components/wealthJourney/DevJourneyControls';
import { useWealthJourney } from '../context/WealthJourneyContext';
import { FINAL_MILESTONE_TARGET, NextAction } from '../utils/wealthJourney';
import { formatCurrency } from '../utils/format';
import { MOCK_ACTIVITY } from '../data/mockData';
import { HomeStackParamList } from '../navigation/types';
import { navigateTo } from '../navigation/navigationRef';

type JourneyNavProp = NativeStackNavigationProp<HomeStackParamList, 'WealthJourney'>;

export function WealthJourneyScreen() {
  const { colors } = useTheme();
  const navigation = useNavigation<JourneyNavProp>();
  const { state, progress, milestoneStates, nextAction, remaining, nextAmountMilestone, creditUnlocked, contribute } =
    useWealthJourney();

  const handleNextActionCta = (target: NextAction['target']) => {
    switch (target) {
      case 'save':
        navigateTo('SaveTab');
        break;
      case 'bank':
        navigateTo('SaveTab', { screen: 'BankLink' });
        break;
      case 'invest':
        contribute(state.sipAmount);
        break;
      case 'borrow':
        navigateTo('BorrowTab');
        break;
    }
  };

  return (
    <Screen>
      <Header title="Your Wealth Journey" onBack={() => navigation.goBack()} />

      <Text style={[typography.body, { color: colors.textSecondary, marginBottom: spacing.xl }]}>
        Build your wealth, one milestone at a time.
      </Text>

      <View style={styles.heroAmount}>
        <Text style={[typography.largeAmount, { color: colors.text, fontSize: 40 }]}>
          {formatCurrency(state.investedAmount)}
        </Text>
        <Text style={[typography.body, { color: colors.textSecondary }]}>
          of {formatCurrency(FINAL_MILESTONE_TARGET)}
        </Text>
      </View>

      <View style={styles.section}>
        <ProgressBar
          progress={progress}
          height={12}
          accessibilityLabel={`${Math.round(progress * 100)} percent of wealth journey complete`}
        />
      </View>

      <Card style={styles.section}>
        {creditUnlocked ? (
          <>
            <Text style={[typography.sectionTitle, { color: colors.success }]}>
              All milestones complete!
            </Text>
            <Text style={[typography.body, { color: colors.textSecondary, marginTop: spacing.xs }]}>
              You&apos;ve reached ₹25,000 and unlocked the credit benefit.
            </Text>
          </>
        ) : (
          <>
            <Text style={[typography.caption, { color: colors.textSecondary }]}>Next milestone</Text>
            <Text style={[typography.sectionTitle, { color: colors.text, marginTop: spacing.xs }]}>
              {nextAmountMilestone ? formatCurrency(nextAmountMilestone.target) : '—'} invested
            </Text>
            <Text style={[typography.body, { color: colors.textSecondary, marginTop: spacing.xs }]}>
              {formatCurrency(remaining)} remaining
            </Text>
          </>
        )}
      </Card>

      <View style={styles.section}>
        <NextActionCard nextAction={nextAction} onPressCta={handleNextActionCta} />
      </View>

      <View style={styles.section}>
        <Text style={[typography.sectionTitle, { color: colors.text, marginBottom: spacing.sm }]}>
          Milestones
        </Text>
        <Card>
          {milestoneStates.map(({ milestone, status }, index) => (
            <View key={milestone.id}>
              <MilestoneItem milestone={milestone} status={status} />
              {index < milestoneStates.length - 1 && (
                <View style={[styles.divider, { backgroundColor: colors.border }]} />
              )}
            </View>
          ))}
        </Card>
      </View>

      <View style={[styles.creditRow, styles.section]}>
        <Ionicons
          name={creditUnlocked ? 'lock-open-outline' : 'lock-closed-outline'}
          size={18}
          color={creditUnlocked ? colors.success : colors.textSecondary}
        />
        <Text
          style={[
            typography.bodyStrong,
            { color: creditUnlocked ? colors.success : colors.textSecondary, marginLeft: spacing.xs },
          ]}
        >
          Credit benefit {creditUnlocked ? 'unlocked' : 'locked'}
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={[typography.sectionTitle, { color: colors.text, marginBottom: spacing.sm }]}>
          Recent activity
        </Text>
        <Card>
          {MOCK_ACTIVITY.map((activity, index) => (
            <View key={activity.id}>
              <View style={styles.activityRow}>
                <Ionicons name="checkmark-circle" size={18} color={colors.success} />
                <Text style={[typography.body, { color: colors.text, marginLeft: spacing.sm, flex: 1 }]}>
                  {activity.label}
                </Text>
                <Text style={[typography.metadata, { color: colors.textSecondary }]}>
                  {activity.daysAgo}d ago
                </Text>
              </View>
              {index < MOCK_ACTIVITY.length - 1 && (
                <View style={[styles.divider, { backgroundColor: colors.border }]} />
              )}
            </View>
          ))}
        </Card>
      </View>

      {__DEV__ && <DevJourneyControls />}
    </Screen>
  );
}

const styles = StyleSheet.create({
  heroAmount: {
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  section: {
    marginBottom: spacing.xl,
  },
  divider: {
    height: 1,
    marginLeft: spacing.xl + spacing.md,
  },
  creditRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  activityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.sm,
  },
});
