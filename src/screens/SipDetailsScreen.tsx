import React from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTheme } from '../theme/ThemeContext';
import { typography } from '../theme/typography';
import { spacing } from '../theme/spacing';
import { Screen } from '../components/common/Screen';
import { Header } from '../components/common/Header';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { SCHEME, MONTHLY_SIP_DATE } from '../data/mockData';
import { formatCurrency } from '../utils/format';
import { useWealthJourney } from '../context/WealthJourneyContext';
import { useGuardedAction } from '../hooks/useGuardedAction';
import { SaveStackParamList } from '../navigation/types';

type SipDetailsNavProp = NativeStackNavigationProp<SaveStackParamList, 'SipDetails'>;

export function SipDetailsScreen() {
  const { colors } = useTheme();
  const navigation = useNavigation<SipDetailsNavProp>();
  const { state } = useWealthJourney();

  const upcomingSip = !state.bankLinked
    ? '—'
    : state.sipFrequency === 'daily'
    ? 'Every day'
    : `${MONTHLY_SIP_DATE}nd of every month`;

  const handleContinue = useGuardedAction(() => {
    if (!state.bankLinked) {
      navigation.navigate('BankLink');
    } else {
      Alert.alert('SIP active', 'Your SIP is set up and running. This is a demo — no real money moves.');
    }
  });

  return (
    <Screen>
      <Header title="SIP details" onBack={() => navigation.goBack()} />

      <Card style={styles.section}>
        <Text style={[typography.bodyStrong, { color: colors.text }]}>{SCHEME.name}</Text>
        <View style={styles.selectedRow}>
          <View style={[styles.dot, { backgroundColor: colors.success }]} />
          <Text style={[typography.caption, { color: colors.textSecondary }]}>Amount selected</Text>
        </View>
      </Card>

      <Card style={styles.section}>
        <DetailRow label="Frequency" value={state.sipFrequency === 'daily' ? 'Daily' : 'Monthly'} />
        <DetailRow label="SIP Amount" value={formatCurrency(state.sipAmount)} />
        <DetailRow label="Upcoming SIP" value={upcomingSip} />
      </Card>

      {!state.bankLinked && (
        <Text style={[typography.body, { color: colors.textSecondary, marginBottom: spacing.lg }]}>
          Complete bank linking to move this SIP forward.
        </Text>
      )}

      <Button
        label={state.bankLinked ? 'Continue SIP' : 'Link Bank'}
        onPress={handleContinue}
        style={styles.section}
      />

      <Text style={[typography.sectionTitle, { color: colors.text, marginBottom: spacing.sm }]}>
        Recent transactions
      </Text>
      <Text style={[typography.body, { color: colors.textSecondary }]}>
        No SIP transactions found yet.
      </Text>
    </Screen>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  const { colors } = useTheme();
  return (
    <View style={styles.detailRow}>
      <Text style={[typography.body, { color: colors.textSecondary }]}>{label}</Text>
      <Text style={[typography.bodyStrong, { color: colors.text }]}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    marginBottom: spacing.lg,
  },
  selectedRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    marginTop: spacing.xs,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.xs,
  },
});
