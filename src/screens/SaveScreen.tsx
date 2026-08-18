import React, { useMemo, useState } from 'react';
import { Alert, Linking, Pressable, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTheme } from '../theme/ThemeContext';
import { typography } from '../theme/typography';
import { spacing, radius } from '../theme/spacing';
import { Screen } from '../components/common/Screen';
import { Header } from '../components/common/Header';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { SegmentedControl } from '../components/common/SegmentedControl';
import {
  ALLOCATION_SPLIT,
  DAILY_PLAN_PRESETS,
  MONTHLY_PLAN_PRESETS,
  DEFAULT_DAILY_AMOUNT,
  DEFAULT_MONTHLY_AMOUNT,
  MONTHLY_SIP_DATE,
  SCHEME,
} from '../data/mockData';
import { calculateSipProjection, SipFrequency } from '../utils/sipCalculator';
import { formatCurrency } from '../utils/format';
import { useWealthJourney } from '../context/WealthJourneyContext';
import { useGuardedAction } from '../hooks/useGuardedAction';
import { SaveStackParamList } from '../navigation/types';

type SaveNavProp = NativeStackNavigationProp<SaveStackParamList, 'Save'>;

const DAILY_STEP = 10;

export function SaveScreen() {
  const { colors } = useTheme();
  const navigation = useNavigation<SaveNavProp>();
  const { startSip } = useWealthJourney();

  const [frequency, setFrequency] = useState<SipFrequency>('daily');
  const [dailyAmount, setDailyAmount] = useState(DEFAULT_DAILY_AMOUNT);
  const [monthlyAmount, setMonthlyAmount] = useState(DEFAULT_MONTHLY_AMOUNT);

  const amount = frequency === 'daily' ? dailyAmount : monthlyAmount;
  const presets = frequency === 'daily' ? DAILY_PLAN_PRESETS : MONTHLY_PLAN_PRESETS;

  const projection = useMemo(() => calculateSipProjection(amount, frequency, 5), [amount, frequency]);

  const monthlyEquivalent = frequency === 'daily' ? amount * 30 : amount;
  const allocation = {
    stocks: Math.round(monthlyEquivalent * ALLOCATION_SPLIT.stocks),
    fd: Math.round(monthlyEquivalent * ALLOCATION_SPLIT.fd),
    gold: Math.round(monthlyEquivalent * ALLOCATION_SPLIT.gold),
  };

  const handleContinue = useGuardedAction(() => {
    startSip(amount, frequency);
    navigation.navigate('SipDetails');
  });

  const showEstimateInfo = () =>
    Alert.alert(
      'How this estimate works',
      'Projections use an illustrative rate. Actual returns depend on market conditions and are not guaranteed.\n\nThis is not financial advice.'
    );

  return (
    <Screen>
      <Header onHelp={() => Alert.alert('Help', 'This is a demo SIP flow. No real investment is made.')} />

      <Card emphasis style={styles.banner}>
        <Text style={[typography.sectionTitle, { color: colors.text }]}>
          Invest in Stocks + FD + Gold with one-click SIP
        </Text>
        <Text style={[typography.bodyStrong, { color: colors.primary, marginTop: spacing.xs }]}>
          ~15% p.a. Returns*
        </Text>
      </Card>

      <View style={styles.section}>
        <SegmentedControl
          segments={[
            { value: 'daily', label: 'Daily' },
            { value: 'monthly', label: 'Monthly' },
          ]}
          selected={frequency}
          onSelect={setFrequency}
        />
      </View>

      <View style={styles.section}>
        <Text style={[typography.body, { color: colors.textSecondary, marginBottom: spacing.sm }]}>
          Set your {frequency} SIP amount
        </Text>

        {frequency === 'daily' ? (
          <View style={styles.stepperRow}>
            <Pressable
              onPress={() => setDailyAmount((v) => Math.max(DAILY_STEP, v - DAILY_STEP))}
              accessibilityRole="button"
              accessibilityLabel="Decrease daily amount"
              style={[styles.stepperButton, { backgroundColor: colors.surfaceSecondary }]}
            >
              <Text style={[typography.sectionTitle, { color: colors.text }]}>−</Text>
            </Pressable>
            <Text style={[typography.largeAmount, { color: colors.text }]}>{formatCurrency(dailyAmount)}</Text>
            <Pressable
              onPress={() => setDailyAmount((v) => v + DAILY_STEP)}
              accessibilityRole="button"
              accessibilityLabel="Increase daily amount"
              style={[styles.stepperButton, { backgroundColor: colors.surfaceSecondary }]}
            >
              <Text style={[typography.sectionTitle, { color: colors.text }]}>+</Text>
            </Pressable>
          </View>
        ) : (
          <Text style={[typography.largeAmount, { color: colors.text, textAlign: 'center' }]}>
            {formatCurrency(monthlyAmount)}
          </Text>
        )}
      </View>

      <View style={styles.section}>
        <Text style={[typography.body, { color: colors.textSecondary, marginBottom: spacing.sm }]}>
          Popular Plans
        </Text>
        <View style={styles.presetRow}>
          {presets.map((preset) => {
            const isSelected = preset === amount;
            return (
              <Pressable
                key={preset}
                onPress={() => (frequency === 'daily' ? setDailyAmount(preset) : setMonthlyAmount(preset))}
                accessibilityRole="button"
                accessibilityState={{ selected: isSelected }}
                style={[
                  styles.presetChip,
                  {
                    backgroundColor: isSelected ? colors.primary : colors.surfaceSecondary,
                    borderColor: colors.border,
                  },
                ]}
              >
                <Text
                  style={[typography.bodyStrong, { color: isSelected ? colors.primaryText : colors.text }]}
                >
                  {formatCurrency(preset)}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </View>

      <Card style={styles.section}>
        <Text style={[typography.body, { color: colors.textSecondary }]}>
          Just {formatCurrency(amount)} {frequency === 'daily' ? 'a day' : 'a month'} could grow to
        </Text>
        <Text style={[typography.largeAmount, { color: colors.primary, marginVertical: spacing.xs }]}>
          {formatCurrency(projection)}
        </Text>
        <Text style={[typography.metadata, { color: colors.textSecondary }]}>in 5 yrs at 15% p.a.</Text>
        {frequency === 'monthly' && (
          <Text style={[typography.caption, { color: colors.textSecondary, marginTop: spacing.sm }]}>
            Invest every {MONTHLY_SIP_DATE}nd of the month
          </Text>
        )}
        <Pressable onPress={showEstimateInfo} hitSlop={8}>
          <Text style={[typography.caption, { color: colors.info, marginTop: spacing.sm }]}>
            How this estimate works?
          </Text>
        </Pressable>
      </Card>

      <Card style={styles.section}>
        <Text style={[typography.bodyStrong, { color: colors.text }]}>{SCHEME.name}</Text>
        <Pressable onPress={() => Linking.openURL(SCHEME.learnMoreUrl).catch(() => {})} hitSlop={8}>
          <Text style={[typography.caption, { color: colors.info, marginTop: spacing.xs }]}>
            Learn More →
          </Text>
        </Pressable>
      </Card>

      <Card style={styles.section}>
        <Text style={[typography.bodyStrong, { color: colors.text, marginBottom: spacing.sm }]}>
          Fund allocation (estimated monthly)
        </Text>
        <AllocationRow label="Stocks" amount={allocation.stocks} color={colors.success} />
        <AllocationRow label="FD" amount={allocation.fd} color={colors.info} />
        <AllocationRow label="Gold" amount={allocation.gold} color={colors.warning} />
      </Card>

      <Button
        label={`Continue with ${formatCurrency(amount)}/${frequency === 'daily' ? 'day' : 'month'} SIP`}
        onPress={handleContinue}
        style={styles.continueButton}
      />
    </Screen>
  );
}

function AllocationRow({ label, amount, color }: { label: string; amount: number; color: string }) {
  const { colors } = useTheme();
  return (
    <View style={styles.allocationRow}>
      <View style={styles.allocationLabel}>
        <View style={[styles.dot, { backgroundColor: color }]} />
        <Text style={[typography.body, { color: colors.text }]}>{label}</Text>
      </View>
      <Text style={[typography.bodyStrong, { color: colors.text }]}>{formatCurrency(amount)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  banner: {
    marginBottom: spacing.lg,
  },
  section: {
    marginBottom: spacing.lg,
  },
  stepperRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xl,
  },
  stepperButton: {
    width: 44,
    height: 44,
    borderRadius: radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  presetRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  presetChip: {
    flex: 1,
    borderRadius: radius.pill,
    borderWidth: 1,
    paddingVertical: spacing.sm + 2,
    alignItems: 'center',
  },
  allocationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.xs,
  },
  allocationLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  continueButton: {
    marginTop: spacing.sm,
  },
});
