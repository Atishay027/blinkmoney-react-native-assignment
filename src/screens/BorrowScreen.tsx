import React from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../theme/ThemeContext';
import { typography } from '../theme/typography';
import { spacing, radius } from '../theme/spacing';
import { Screen } from '../components/common/Screen';
import { Header } from '../components/common/Header';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { ProgressBar } from '../components/common/ProgressBar';
import { BORROW_FACTS } from '../data/mockData';
import { FINAL_MILESTONE_TARGET } from '../utils/wealthJourney';
import { formatCurrency } from '../utils/format';
import { useWealthJourney } from '../context/WealthJourneyContext';
import { navigateTo } from '../navigation/navigationRef';

export function BorrowScreen() {
  const { colors } = useTheme();
  const { state, progress, creditUnlocked } = useWealthJourney();

  const handlePrimaryCta = () => {
    if (creditUnlocked) {
      Alert.alert('Demo only', 'This is a prototype. No real loan is offered or disbursed.');
    } else {
      navigateTo('SaveTab');
    }
  };

  return (
    <Screen>
      <Header onHelp={() => Alert.alert('Help', 'Borrow is a mocked credit-unlock concept for this prototype.')} />

      <Card emphasis style={styles.section}>
        <View style={[styles.badge, { backgroundColor: colors.background, borderColor: colors.border }]}>
          <Text style={[typography.caption, { color: colors.primary }]}>No credit score required</Text>
        </View>
        <Text style={[typography.screenTitle, { color: colors.text, marginTop: spacing.md }]}>
          Borrow without selling a rupee
        </Text>
        <Text style={[typography.body, { color: colors.textSecondary, marginTop: spacing.xs }]}>
          Start SIP & unlock credit at ₹25K
        </Text>
      </Card>

      <View style={[styles.factsRow, styles.section]}>
        <FactCard icon="card-outline" label={`No EMIs\nInterest @ ${BORROW_FACTS.interestRate}`} />
        <FactCard icon="wallet-outline" label={`Borrow upto\n${BORROW_FACTS.maxBorrowPercent}% of SIP`} />
        <FactCard icon="flash-outline" label={`Instant cash in\n${BORROW_FACTS.disbursalTime}`} />
      </View>

      <Card style={styles.section}>
        <Text style={[typography.sectionTitle, { color: colors.text }]}>Unlocks at ₹25k</Text>
        <View style={styles.amountRow}>
          <Text style={[typography.bodyStrong, { color: colors.text }]}>
            {formatCurrency(state.investedAmount)} invested
          </Text>
          <Text style={[typography.body, { color: colors.textSecondary }]}>
            {formatCurrency(FINAL_MILESTONE_TARGET)}
          </Text>
        </View>
        <ProgressBar progress={progress} accessibilityLabel="Progress toward ₹25,000 borrow unlock" />
        <Text style={[typography.caption, { color: colors.textSecondary, marginTop: spacing.xs }]}>
          {Math.round(progress * 100)}%
        </Text>
      </Card>

      {creditUnlocked ? (
        <View style={styles.unlockedRow}>
          <Ionicons name="lock-open-outline" size={18} color={colors.success} />
          <Text style={[typography.bodyStrong, { color: colors.success, marginLeft: spacing.xs }]}>
            Credit benefit unlocked
          </Text>
        </View>
      ) : (
        <View style={styles.unlockedRow}>
          <Ionicons name="lock-closed-outline" size={18} color={colors.textSecondary} />
          <Text style={[typography.body, { color: colors.textSecondary, marginLeft: spacing.xs }]}>
            Keep investing to unlock this benefit
          </Text>
        </View>
      )}

      <Button
        label={creditUnlocked ? 'Borrow Now' : state.sipStarted ? 'Continue investing' : 'Start SIP'}
        onPress={handlePrimaryCta}
        style={styles.cta}
      />

      <Text style={[typography.metadata, { color: colors.textSecondary, textAlign: 'center' }]}>
        For informational purposes only. This is a prototype — no real credit is offered.
      </Text>
    </Screen>
  );
}

function FactCard({ icon, label }: { icon: keyof typeof Ionicons.glyphMap; label: string }) {
  const { colors } = useTheme();
  return (
    <View style={[styles.factCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
      <Ionicons name={icon} size={20} color={colors.primary} />
      <Text style={[typography.metadata, { color: colors.textSecondary, marginTop: spacing.xs }]}>
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    marginBottom: spacing.lg,
  },
  badge: {
    alignSelf: 'flex-start',
    borderRadius: radius.pill,
    borderWidth: 1,
    paddingHorizontal: spacing.sm + 2,
    paddingVertical: 4,
  },
  factsRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  factCard: {
    flex: 1,
    borderRadius: radius.md,
    borderWidth: 1,
    padding: spacing.md,
  },
  amountRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: spacing.sm,
  },
  unlockedRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.lg,
  },
  cta: {
    marginBottom: spacing.md,
  },
});
