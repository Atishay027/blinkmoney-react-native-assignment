import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer, Theme as NavigationTheme } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider, useTheme } from './src/theme/ThemeContext';
import { WealthJourneyProvider, useWealthJourney } from './src/context/WealthJourneyContext';
import { AppNavigator } from './src/navigation/AppNavigator';
import { MilestoneCelebration } from './src/components/wealthJourney/MilestoneCelebration';
import { navigationRef } from './src/navigation/navigationRef';
import { Button } from './src/components/common/Button';
import { typography } from './src/theme/typography';
import { spacing } from './src/theme/spacing';

function AppContent() {
  const { colors, isDark } = useTheme();
  const { isHydrated, hydrationError, retryLoad } = useWealthJourney();

  if (hydrationError) {
    return (
      <View style={[styles.loading, styles.errorPadding, { backgroundColor: colors.background }]}>
        <Text style={[typography.sectionTitle, { color: colors.text, textAlign: 'center' }]}>
          Unable to load your Wealth Journey
        </Text>
        <Button label="Try Again" onPress={retryLoad} style={styles.retryButton} />
      </View>
    );
  }

  const navigationTheme: NavigationTheme = {
    dark: isDark,
    colors: {
      primary: colors.primary,
      background: colors.background,
      card: colors.surface,
      text: colors.text,
      border: colors.border,
      notification: colors.primary,
    },
    fonts: {
      regular: { fontFamily: 'System', fontWeight: '400' },
      medium: { fontFamily: 'System', fontWeight: '500' },
      bold: { fontFamily: 'System', fontWeight: '700' },
      heavy: { fontFamily: 'System', fontWeight: '800' },
    },
  };

  if (!isHydrated) {
    return (
      <View style={[styles.loading, { backgroundColor: colors.background }]}>
        <ActivityIndicator color={colors.primary} size="large" />
      </View>
    );
  }

  return (
    <>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      <NavigationContainer ref={navigationRef} theme={navigationTheme}>
        <AppNavigator />
      </NavigationContainer>
      <MilestoneCelebration />
    </>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <WealthJourneyProvider>
          <AppContent />
        </WealthJourneyProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorPadding: {
    paddingHorizontal: spacing.xl,
  },
  retryButton: {
    marginTop: spacing.lg,
    minWidth: 160,
  },
});
