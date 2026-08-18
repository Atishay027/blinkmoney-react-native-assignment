import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';
import { typography } from '../../theme/typography';
import { radius, spacing } from '../../theme/spacing';

type Segment<T extends string> = {
  value: T;
  label: string;
};

type SegmentedControlProps<T extends string> = {
  segments: readonly Segment<T>[];
  selected: T;
  onSelect: (value: T) => void;
};

export function SegmentedControl<T extends string>({
  segments,
  selected,
  onSelect,
}: SegmentedControlProps<T>) {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.surfaceSecondary, borderColor: colors.border }]}>
      {segments.map((segment) => {
        const isActive = segment.value === selected;
        return (
          <Pressable
            key={segment.value}
            onPress={() => onSelect(segment.value)}
            accessibilityRole="button"
            accessibilityState={{ selected: isActive }}
            style={[
              styles.segment,
              isActive && { backgroundColor: colors.primary },
            ]}
          >
            <Text
              style={[
                typography.bodyStrong,
                { color: isActive ? colors.primaryText : colors.textSecondary },
              ]}
            >
              {segment.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderRadius: radius.pill,
    borderWidth: 1,
    padding: spacing.xs / 2,
  },
  segment: {
    flex: 1,
    paddingVertical: spacing.sm + 2,
    borderRadius: radius.pill,
    alignItems: 'center',
  },
});
