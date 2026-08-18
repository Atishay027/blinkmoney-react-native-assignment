import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../theme/ThemeContext';
import { typography } from '../../theme/typography';
import { radius, spacing } from '../../theme/spacing';
import { Card } from '../common/Card';
import { ProgressBar } from '../common/ProgressBar';
import { useWealthJourney } from '../../context/WealthJourneyContext';
import { FINAL_MILESTONE_TARGET } from '../../utils/wealthJourney';
import { formatCurrency } from '../../utils/format';

type WealthJourneyCardProps = {
  onPress: () => void;
};

export function WealthJourneyCard({ onPress }: WealthJourneyCardProps) {
  const { colors } = useTheme();
  const { state, progress, remaining, nextAmountMilestone, creditUnlocked } = useWealthJourney();

  const percent = Math.round(progress * 100);

  return (
    <Pressable onPress={onPress} accessibilityRole="button" accessibilityLabel="View your Wealth Journey">
      <Card emphasis style={styles.card}>
        <View style={styles.headerRow}>
          <Text style={[typography.sectionTitle, { color: colors.text }]}>Your Wealth Journey</Text>
          <View style={[styles.badge, { backgroundColor: colors.background, borderColor: colors.border }]}>
            <Text style={[typography.caption, { color: colors.primary }]}>{percent}% complete</Text>
          </View>
        </View>

        <View style={styles.amountRow}>
          <Text style={[typography.largeAmount, { color: colors.text }]}>
            {formatCurrency(state.investedAmount)}
          </Text>
          <Text style={[typography.body, { color: colors.textSecondary }]}>
            {' '}/ {formatCurrency(FINAL_MILESTONE_TARGET)}
          </Text>
        </View>

        <ProgressBar
          progress={progress}
          accessibilityLabel={`Wealth journey progress: ${percent} percent`}
        />

        <View style={styles.footerRow}>
          {creditUnlocked ? (
            <Text style={[typography.bodyStrong, { color: colors.success }]}>
              All milestones complete — credit benefit unlocked
            </Text>
          ) : (
            <View>
              <Text style={[typography.caption, { color: colors.textSecondary }]}>
                Next milestone {nextAmountMilestone ? formatCurrency(nextAmountMilestone.target) : ''}
              </Text>
              <Text style={[typography.bodyStrong, { color: colors.text }]}>
                {formatCurrency(remaining)} to go
              </Text>
            </View>
          )}
          <View style={styles.cta}>
            <Text style={[typography.bodyStrong, { color: colors.primary }]}>View Journey</Text>
            <Ionicons name="arrow-forward" size={16} color={colors.primary} style={{ marginLeft: 4 }} />
          </View>
        </View>
      </Card>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    gap: spacing.md,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  badge: {
    borderRadius: radius.pill,
    borderWidth: 1,
    paddingHorizontal: spacing.sm + 2,
    paddingVertical: 4,
  },
  amountRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    marginTop: spacing.xs,
  },
  cta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
