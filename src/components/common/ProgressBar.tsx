import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';
import { radius } from '../../theme/spacing';

type ProgressBarProps = {
  progress: number;
  height?: number;
  accessibilityLabel?: string;
};

export function ProgressBar({ progress, height = 10, accessibilityLabel }: ProgressBarProps) {
  const { colors } = useTheme();
  const clamped = Math.max(0, Math.min(progress, 1));

  const animatedProgress = useRef(new Animated.Value(clamped * 100)).current;

  useEffect(() => {
    Animated.timing(animatedProgress, {
      toValue: clamped * 100,
      duration: 600,
      useNativeDriver: false, // width is a layout property; native driver can't animate it
    }).start();
  }, [animatedProgress, clamped]);

  const width = animatedProgress.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
  });

  return (
    <View
      style={[styles.track, { backgroundColor: colors.surfaceSecondary, height, borderRadius: height / 2 }]}
      accessibilityRole="progressbar"
      accessibilityLabel={accessibilityLabel ?? 'Progress'}
      accessibilityValue={{ min: 0, max: 100, now: Math.round(clamped * 100) }}
    >
      <Animated.View
        style={[
          styles.fill,
          {
            width,
            backgroundColor: colors.primary,
            borderRadius: height / 2,
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    width: '100%',
    overflow: 'hidden',
    borderRadius: radius.pill,
  },
  fill: {
    height: '100%',
  },
});
