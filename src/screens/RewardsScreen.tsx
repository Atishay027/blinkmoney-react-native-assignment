import React from 'react';
import { Share, StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { typography } from '../theme/typography';
import { spacing, radius } from '../theme/spacing';
import { Screen } from '../components/common/Screen';
import { Header } from '../components/common/Header';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { REFERRAL_CODE } from '../data/mockData';

export function RewardsScreen() {
  const { colors } = useTheme();

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Join me on BlinkMoney! Use my referral code ${REFERRAL_CODE} to start investing or unlock credit against mutual funds.`,
      });
    } catch {
      // Native share sheet dismissed or unavailable — no action needed.
    }
  };

  return (
    <Screen>
      <Header />

      <Text style={[typography.screenTitle, { color: colors.text, marginBottom: spacing.sm }]}>
        Invite friends to BlinkMoney
      </Text>
      <Text style={[typography.body, { color: colors.textSecondary, marginBottom: spacing.xl }]}>
        Share your referral code and help them start investing or unlock credit against mutual
        funds.
      </Text>

      <Card emphasis style={styles.codeCard}>
        <Text style={[typography.caption, { color: colors.textSecondary }]}>Referral code</Text>
        <Text style={[typography.largeAmount, { color: colors.primary, letterSpacing: 2 }]}>
          {REFERRAL_CODE}
        </Text>
      </Card>

      <View style={styles.rewardsRow}>
        <RewardBadge title="₹5,000" subtitle="+50 pts" />
        <RewardBadge title="₹10,000" subtitle="+100 pts" />
        <RewardBadge title="₹25,000" subtitle="+250 pts" />
      </View>

      <Button label="Share invite" onPress={handleShare} />

      <Text style={[typography.metadata, { color: colors.textSecondary, textAlign: 'center', marginTop: spacing.lg }]}>
        Referral rewards shown are illustrative Journey Points, not real cash value.
      </Text>
    </Screen>
  );
}

function RewardBadge({ title, subtitle }: { title: string; subtitle: string }) {
  const { colors } = useTheme();
  return (
    <View style={[styles.rewardBadge, { backgroundColor: colors.surface, borderColor: colors.border }]}>
      <Text style={[typography.bodyStrong, { color: colors.text }]}>{title}</Text>
      <Text style={[typography.metadata, { color: colors.textSecondary }]}>{subtitle}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  codeCard: {
    alignItems: 'center',
    marginBottom: spacing.xl,
    gap: spacing.xs,
  },
  rewardsRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.xl,
  },
  rewardBadge: {
    flex: 1,
    borderRadius: radius.md,
    borderWidth: 1,
    padding: spacing.md,
    alignItems: 'center',
  },
});
