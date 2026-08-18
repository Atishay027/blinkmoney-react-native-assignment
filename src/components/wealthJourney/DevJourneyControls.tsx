import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';
import { typography } from '../../theme/typography';
import { spacing, radius } from '../../theme/spacing';
import { Button } from '../common/Button';
import { useWealthJourney } from '../../context/WealthJourneyContext';

/** Development-only demo progress controls. Never rendered when __DEV__ is false. */
export function DevJourneyControls() {
  const { colors } = useTheme();
  const { contribute, remaining, resetJourney, startSip, linkBank, state, simulateLoadError } =
    useWealthJourney();

  const completeMilestone = () => {
    if (!state.sipStarted) startSip(state.sipAmount, state.sipFrequency);
    if (!state.bankLinked) linkBank();
    if (remaining > 0) contribute(remaining);
  };

  return (
    <View style={[styles.container, { borderColor: colors.warning, backgroundColor: colors.surfaceSecondary }]}>
      <Text style={[typography.caption, { color: colors.warning }]}>DEMO CONTROLS (dev only)</Text>
      <View style={styles.row}>
        <Button label="+ ₹500" variant="secondary" onPress={() => contribute(500)} style={styles.button} />
        <Button label="+ ₹1,000" variant="secondary" onPress={() => contribute(1000)} style={styles.button} />
      </View>
      <View style={styles.row}>
        <Button label="Complete milestone" variant="secondary" onPress={completeMilestone} style={styles.button} />
        <Button label="Reset" variant="ghost" onPress={resetJourney} style={styles.button} />
      </View>
      <Button
        label="Simulate load error"
        variant="ghost"
        onPress={simulateLoadError}
        style={styles.button}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: radius.md,
    borderStyle: 'dashed',
    padding: spacing.md,
    gap: spacing.sm,
    marginTop: spacing.xl,
  },
  row: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  button: {
    flex: 1,
    minHeight: 40,
  },
});
