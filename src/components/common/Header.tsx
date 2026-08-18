import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../theme/ThemeContext';
import { typography } from '../../theme/typography';
import { spacing } from '../../theme/spacing';

type HeaderProps = {
  title?: string;
  onBack?: () => void;
  onHelp?: () => void;
};

export function Header({ title, onBack, onHelp }: HeaderProps) {
  const { colors } = useTheme();

  return (
    <View style={styles.row}>
      <View style={styles.side}>
        {onBack && (
          <Pressable
            onPress={onBack}
            accessibilityRole="button"
            accessibilityLabel="Go back"
            hitSlop={8}
          >
            <Ionicons name="chevron-back" size={26} color={colors.text} />
          </Pressable>
        )}
      </View>

      {title ? (
        <Text style={[typography.sectionTitle, { color: colors.text }]} numberOfLines={1}>
          {title}
        </Text>
      ) : (
        <View />
      )}

      <View style={[styles.side, styles.rightSide]}>
        {onHelp && (
          <Pressable onPress={onHelp} accessibilityRole="button" accessibilityLabel="Help">
            <Text style={[typography.bodyStrong, { color: colors.textSecondary }]}>Help</Text>
          </Pressable>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.md,
    minHeight: 44,
  },
  side: {
    width: 60,
    justifyContent: 'center',
  },
  rightSide: {
    alignItems: 'flex-end',
  },
});
