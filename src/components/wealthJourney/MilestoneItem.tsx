import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../theme/ThemeContext';
import { typography } from '../../theme/typography';
import { spacing } from '../../theme/spacing';
import { Milestone, MilestoneStatus } from '../../utils/wealthJourney';

type MilestoneItemProps = {
  milestone: Milestone;
  status: MilestoneStatus;
};

const STATUS_ICON: Record<MilestoneStatus, keyof typeof Ionicons.glyphMap> = {
  completed: 'checkmark-circle',
  current: 'ellipse',
  locked: 'ellipse-outline',
};

const STATUS_LABEL: Record<MilestoneStatus, string> = {
  completed: 'Completed',
  current: 'Current',
  locked: 'Upcoming',
};

export function MilestoneItem({ milestone, status }: MilestoneItemProps) {
  const { colors } = useTheme();

  const iconColor =
    status === 'completed' ? colors.success : status === 'current' ? colors.primary : colors.textSecondary;

  return (
    <View
      style={styles.row}
      accessibilityRole="text"
      accessibilityLabel={`${milestone.title}, ${STATUS_LABEL[status]}`}
    >
      <Ionicons name={STATUS_ICON[status]} size={22} color={iconColor} style={styles.icon} />
      <View style={styles.textColumn}>
        <Text
          style={[
            typography.milestoneTitle,
            { color: status === 'locked' ? colors.textSecondary : colors.text },
          ]}
        >
          {milestone.title}
        </Text>
        <Text style={[typography.metadata, { color: colors.textSecondary }]}>
          {STATUS_LABEL[status]}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.sm + 2,
  },
  icon: {
    marginRight: spacing.md,
  },
  textColumn: {
    flex: 1,
  },
});
