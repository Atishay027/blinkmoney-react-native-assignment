import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';
import { typography } from '../../theme/typography';
import { spacing } from '../../theme/spacing';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { NextAction } from '../../utils/wealthJourney';

type NextActionCardProps = {
  nextAction: NextAction;
  onPressCta: (target: NextAction['target']) => void;
};

export function NextActionCard({ nextAction, onPressCta }: NextActionCardProps) {
  const { colors } = useTheme();

  return (
    <Card style={styles.card}>
      <Text style={[typography.sectionTitle, { color: colors.text }]}>{nextAction.heading}</Text>
      <Text style={[typography.body, { color: colors.textSecondary }]}>{nextAction.description}</Text>
      <View style={styles.ctaWrap}>
        <Button label={nextAction.ctaLabel} onPress={() => onPressCta(nextAction.target)} />
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    gap: spacing.sm,
  },
  ctaWrap: {
    marginTop: spacing.sm,
  },
});
