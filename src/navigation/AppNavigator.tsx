import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../theme/ThemeContext';
import { HomeScreen } from '../screens/HomeScreen';
import { WealthJourneyScreen } from '../screens/WealthJourneyScreen';
import { SaveScreen } from '../screens/SaveScreen';
import { SipDetailsScreen } from '../screens/SipDetailsScreen';
import { BankLinkScreen } from '../screens/BankLinkScreen';
import { BorrowScreen } from '../screens/BorrowScreen';
import { RewardsScreen } from '../screens/RewardsScreen';
import { HomeStackParamList, SaveStackParamList, BottomTabParamList } from './types';

const HomeStack = createNativeStackNavigator<HomeStackParamList>();
const SaveStack = createNativeStackNavigator<SaveStackParamList>();
const Tab = createBottomTabNavigator<BottomTabParamList>();

function HomeStackNavigator() {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="Home" component={HomeScreen} />
      <HomeStack.Screen name="WealthJourney" component={WealthJourneyScreen} />
    </HomeStack.Navigator>
  );
}

function SaveStackNavigator() {
  return (
    <SaveStack.Navigator screenOptions={{ headerShown: false }}>
      <SaveStack.Screen name="Save" component={SaveScreen} />
      <SaveStack.Screen name="SipDetails" component={SipDetailsScreen} />
      <SaveStack.Screen name="BankLink" component={BankLinkScreen} options={{ presentation: 'modal' }} />
    </SaveStack.Navigator>
  );
}

const TAB_ICONS: Record<keyof BottomTabParamList, keyof typeof Ionicons.glyphMap> = {
  HomeTab: 'home',
  SaveTab: 'trending-up',
  BorrowTab: 'wallet',
  RewardsTab: 'gift',
};

const TAB_LABELS: Record<keyof BottomTabParamList, string> = {
  HomeTab: 'Home',
  SaveTab: 'Save',
  BorrowTab: 'Borrow',
  RewardsTab: 'Rewards',
};

export function AppNavigator() {
  const { colors } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
        },
        tabBarLabel: TAB_LABELS[route.name as keyof BottomTabParamList],
        tabBarIcon: ({ color, size }) => (
          <Ionicons name={TAB_ICONS[route.name as keyof BottomTabParamList]} color={color} size={size} />
        ),
      })}
    >
      <Tab.Screen name="HomeTab" component={HomeStackNavigator} />
      <Tab.Screen name="SaveTab" component={SaveStackNavigator} />
      <Tab.Screen name="BorrowTab" component={BorrowScreen} />
      <Tab.Screen name="RewardsTab" component={RewardsScreen} />
    </Tab.Navigator>
  );
}
