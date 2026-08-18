import React, { useEffect, useMemo, useRef } from 'react';
import { Animated, Modal, StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';
import { typography } from '../../theme/typography';
import { radius, spacing } from '../../theme/spacing';
import { Button } from '../common/Button';
import { useWealthJourney } from '../../context/WealthJourneyContext';
import { formatCurrency } from '../../utils/format';

const CONFETTI_COLORS = ['#B6FF3C', '#60A5FA', '#FBBF24', '#F87171'];
const CONFETTI_COUNT = 10;

function ConfettiBurst() {
  const dots = useMemo(
    () =>
      Array.from({ length: CONFETTI_COUNT }, (_, i) => ({
        id: i,
        left: 10 + Math.random() * 80,
        color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
        delay: Math.random() * 150,
        drift: Math.random() * 40 - 20,
      })),
    []
  );

  return (
    <View style={styles.confettiLayer} pointerEvents="none">
      {dots.map((dot) => (
        <ConfettiDot key={dot.id} {...dot} />
      ))}
    </View>
  );
}

function ConfettiDot({ left, color, delay, drift }: { left: number; color: string; delay: number; drift: number }) {
  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(progress, {
      toValue: 1,
      duration: 900,
      delay,
      useNativeDriver: true,
    }).start();
  }, [progress, delay]);

  const translateY = progress.interpolate({ inputRange: [0, 1], outputRange: [0, 140] });
  const translateX = progress.interpolate({ inputRange: [0, 1], outputRange: [0, drift] });
  const opacity = progress.interpolate({ inputRange: [0, 0.7, 1], outputRange: [1, 1, 0] });

  return (
    <Animated.View
      style={[
        styles.confettiDot,
        { left: `${left}%`, backgroundColor: color, opacity, transform: [{ translateY }, { translateX }] },
      ]}
    />
  );
}

export function MilestoneCelebration() {
  const { colors } = useTheme();
  const { celebration, dismissCelebration } = useWealthJourney();
  const scale = useRef(new Animated.Value(0.9)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (celebration) {
      scale.setValue(0.9);
      opacity.setValue(0);
      Animated.parallel([
        Animated.spring(scale, { toValue: 1, useNativeDriver: true, damping: 14, mass: 0.9 }),
        Animated.timing(opacity, { toValue: 1, duration: 220, useNativeDriver: true }),
      ]).start();
    }
  }, [celebration, scale, opacity]);

  if (!celebration) return null;

  return (
    <Modal visible transparent animationType="fade" onRequestClose={dismissCelebration}>
      <View style={[styles.overlay, { backgroundColor: colors.overlay }]}>
        <Animated.View style={{ opacity, transform: [{ scale }], width: '100%' }}>
          <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            <ConfettiBurst key={celebration.id} />
            <Text style={styles.emoji}>🎉</Text>
            <Text style={[typography.screenTitle, { color: colors.text, textAlign: 'center' }]}>
              Milestone unlocked!
            </Text>
            <Text style={[typography.largeAmount, { color: colors.primary, textAlign: 'center' }]}>
              {formatCurrency(celebration.target)} invested
            </Text>
            <Text style={[typography.body, { color: colors.textSecondary, textAlign: 'center' }]}>
              You&apos;ve reached another step in your Wealth Journey.
            </Text>
            <View style={[styles.pointsBadge, { backgroundColor: colors.surfaceSecondary }]}>
              <Text style={[typography.bodyStrong, { color: colors.text }]}>
                +{celebration.points} Journey Points
              </Text>
            </View>
            <Button label="Continue" onPress={dismissCelebration} style={styles.continueButton} />
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xl,
  },
  card: {
    borderRadius: radius.xl,
    borderWidth: 1,
    padding: spacing.xl,
    alignItems: 'center',
    gap: spacing.sm,
    overflow: 'hidden',
  },
  confettiLayer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 140,
  },
  confettiDot: {
    position: 'absolute',
    top: 0,
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  emoji: {
    fontSize: 40,
  },
  pointsBadge: {
    borderRadius: radius.pill,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    marginTop: spacing.xs,
  },
  continueButton: {
    marginTop: spacing.md,
    width: '100%',
  },
});
