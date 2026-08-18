import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTheme } from '../theme/ThemeContext';
import { typography } from '../theme/typography';
import { spacing } from '../theme/spacing';
import { Screen } from '../components/common/Screen';
import { Header } from '../components/common/Header';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { useWealthJourney } from '../context/WealthJourneyContext';
import { useGuardedAction } from '../hooks/useGuardedAction';
import { SaveStackParamList } from '../navigation/types';

type BankLinkNavProp = NativeStackNavigationProp<SaveStackParamList, 'BankLink'>;

export function BankLinkScreen() {
  const { colors } = useTheme();
  const navigation = useNavigation<BankLinkNavProp>();
  const { linkBank } = useWealthJourney();

  const handleContinue = useGuardedAction(() => {
    linkBank();
    navigation.goBack();
  });

  return (
    <Screen>
      <Header onBack={() => navigation.goBack()} />

      <Card style={styles.card}>
        <Text style={[typography.screenTitle, { color: colors.text }]}>Link your bank account</Text>
        <Text style={[typography.body, { color: colors.textSecondary, marginTop: spacing.sm }]}>
          This is a demo verification flow. No real bank account is accessed.
        </Text>
      </Card>

      <Button label="Continue" onPress={handleContinue} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: spacing.xl,
  },
});
