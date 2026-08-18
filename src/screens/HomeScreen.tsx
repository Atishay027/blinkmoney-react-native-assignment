import React, { useMemo, useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../theme/ThemeContext';
import { typography } from '../theme/typography';
import { spacing, radius } from '../theme/spacing';
import { Screen } from '../components/common/Screen';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { SegmentedControl } from '../components/common/SegmentedControl';
import { WealthJourneyCard } from '../components/wealthJourney/WealthJourneyCard';
import { DEMO_USER_NAME, DEFAULT_DAILY_AMOUNT, DEFAULT_MONTHLY_AMOUNT } from '../data/mockData';
import { calculateSipProjection, SipFrequency } from '../utils/sipCalculator';
import { formatCurrency } from '../utils/format';
import { HomeStackParamList } from '../navigation/types';
import { navigateTo } from '../navigation/navigationRef';

type HomeNavProp = NativeStackNavigationProp<HomeStackParamList, 'Home'>;

const YEAR_OPTIONS = [
  { value: '1', label: '1 Yr' },
  { value: '5', label: '5 Yrs' },
  { value: '10', label: '10 Yrs' },
] as const;

export function HomeScreen() {
  const { colors, isDark, setMode } = useTheme();
  const navigation = useNavigation<HomeNavProp>();
  const [frequency, setFrequency] = useState<SipFrequency>('daily');
  const [years, setYears] = useState<'1' | '5' | '10'>('1');

  const amount = frequency === 'daily' ? DEFAULT_DAILY_AMOUNT : DEFAULT_MONTHLY_AMOUNT;
  const projection = useMemo(
    () => calculateSipProjection(amount, frequency, Number(years)),
    [amount, frequency, years]
  );

  return (
    <Screen>
      <View style={styles.headerRow}>
        <View style={styles.headerLeft}>
          <View style={[styles.avatar, { backgroundColor: colors.surfaceSecondary }]}>
            <Text style={[typography.sectionTitle, { color: colors.text }]}>
              {DEMO_USER_NAME.charAt(0)}
            </Text>
          </View>
          <View>
            <Text style={[typography.sectionTitle, { color: colors.text }]}>Hello {DEMO_USER_NAME}</Text>
            <Text style={[typography.caption, { color: colors.textSecondary }]}>Welcome!</Text>
          </View>
        </View>
        <View style={styles.headerActions}>
          <Pressable
            onPress={() =>
              Alert.alert('Theme', 'Choose an appearance', [
                { text: 'Dark', onPress: () => setMode('dark') },
                { text: 'Light', onPress: () => setMode('light') },
                { text: 'System Default', onPress: () => setMode('system') },
                { text: 'Cancel', style: 'cancel' },
              ])
            }
            accessibilityRole="button"
            accessibilityLabel="Change theme"
            hitSlop={8}
            style={styles.themeButton}
          >
            <Ionicons name={isDark ? 'moon' : 'sunny'} size={20} color={colors.textSecondary} />
          </Pressable>
          <Text
            style={[typography.bodyStrong, { color: colors.textSecondary }]}
            onPress={() =>
              Alert.alert(
                'Help & Support',
                'This is a prototype. For informational purposes only — no real financial operations are performed.'
              )
            }
          >
            Help
          </Text>
        </View>
      </View>

      <Card emphasis style={styles.heroCard}>
        <Text style={[typography.screenTitle, { color: colors.text }]}>
          Start your SIP. Reach ₹25,000. Unlock instant credit.
        </Text>
        <Text style={[typography.body, { color: colors.textSecondary, marginTop: spacing.xs }]}>
          Invest and stay liquid.
        </Text>
        <Button
          label="Start SIP"
          onPress={() => navigateTo('SaveTab')}
          style={{ marginTop: spacing.lg }}
        />
      </Card>

      <View style={styles.section}>
        <WealthJourneyCard onPress={() => navigation.navigate('WealthJourney')} />
      </View>

      <View style={styles.section}>
        <Card style={styles.calculatorCard}>
          <Text style={[typography.sectionTitle, { color: colors.text }]}>SIP Calculator</Text>

          <SegmentedControl
            segments={[
              { value: 'daily', label: 'Daily' },
              { value: 'monthly', label: 'Monthly' },
            ]}
            selected={frequency}
            onSelect={setFrequency}
          />

          <SegmentedControl segments={YEAR_OPTIONS} selected={years} onSelect={setYears} />

          <View style={[styles.projectionBox, { backgroundColor: colors.surfaceSecondary }]}>
            <Text style={[typography.body, { color: colors.textSecondary }]}>
              {formatCurrency(amount)} {frequency} for {years} {years === '1' ? 'year' : 'years'} could grow
              to
            </Text>
            <Text style={[typography.largeAmount, { color: colors.primary, marginTop: spacing.xs }]}>
              {formatCurrency(projection)}
            </Text>
          </View>

          <Text style={[typography.metadata, { color: colors.textSecondary }]}>
            Returns shown are illustrative and not guaranteed. For informational purposes only.
          </Text>
        </Card>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: spacing.md,
    paddingBottom: spacing.lg,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.lg,
  },
  themeButton: {
    padding: spacing.xs,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroCard: {
    marginBottom: spacing.lg,
  },
  section: {
    marginBottom: spacing.lg,
  },
  calculatorCard: {
    gap: spacing.md,
  },
  projectionBox: {
    borderRadius: radius.md,
    padding: spacing.lg,
  },
});
