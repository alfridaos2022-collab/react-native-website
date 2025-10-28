import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { RootStackParamList, BottomTabParamList } from '@/types';
import { Colors } from '@/constants/colors';

// Import screens
import HomeScreen from '@/screens/HomeScreen';
import BusinessPlanScreen from '@/screens/BusinessPlanScreen';
import BusinessPlanEditorScreen from '@/screens/BusinessPlanEditorScreen';
import QuoteScreen from '@/screens/QuoteScreen';
import QuoteEditorScreen from '@/screens/QuoteEditorScreen';
import BudgetScreen from '@/screens/BudgetScreen';
import BudgetEditorScreen from '@/screens/BudgetEditorScreen';
import AdministrativeScreen from '@/screens/AdministrativeScreen';
import ProfileScreen from '@/screens/ProfileScreen';
import SettingsScreen from '@/screens/SettingsScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<BottomTabParamList>();

function BottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: string;

          switch (route.name) {
            case 'Home':
              iconName = 'home';
              break;
            case 'BusinessPlan':
              iconName = 'description';
              break;
            case 'Quote':
              iconName = 'receipt';
              break;
            case 'Budget':
              iconName = 'account-balance-wallet';
              break;
            case 'Administrative':
              iconName = 'folder';
              break;
            default:
              iconName = 'help';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.gray400,
        tabBarStyle: {
          backgroundColor: Colors.white,
          borderTopColor: Colors.border,
          paddingBottom: 5,
          paddingTop: 5,
          height: 60,
        },
        headerStyle: {
          backgroundColor: Colors.primary,
        },
        headerTintColor: Colors.white,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Accueil',
          tabBarLabel: 'Accueil',
        }}
      />
      <Tab.Screen
        name="BusinessPlan"
        component={BusinessPlanScreen}
        options={{
          title: 'Plans d\'affaires',
          tabBarLabel: 'Plans',
        }}
      />
      <Tab.Screen
        name="Quote"
        component={QuoteScreen}
        options={{
          title: 'Devis',
          tabBarLabel: 'Devis',
        }}
      />
      <Tab.Screen
        name="Budget"
        component={BudgetScreen}
        options={{
          title: 'Budget',
          tabBarLabel: 'Budget',
        }}
      />
      <Tab.Screen
        name="Administrative"
        component={AdministrativeScreen}
        options={{
          title: 'Démarches',
          tabBarLabel: 'Démarches',
        }}
      />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: Colors.primary,
          },
          headerTintColor: Colors.white,
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen
          name="Main"
          component={BottomTabNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="BusinessPlanEditor"
          component={BusinessPlanEditorScreen}
          options={{
            title: 'Éditeur de plan d\'affaires',
            presentation: 'modal',
          }}
        />
        <Stack.Screen
          name="QuoteEditor"
          component={QuoteEditorScreen}
          options={{
            title: 'Éditeur de devis',
            presentation: 'modal',
          }}
        />
        <Stack.Screen
          name="BudgetEditor"
          component={BudgetEditorScreen}
          options={{
            title: 'Éditeur de budget',
            presentation: 'modal',
          }}
        />
        <Stack.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            title: 'Profil',
          }}
        />
        <Stack.Screen
          name="Settings"
          component={SettingsScreen}
          options={{
            title: 'Paramètres',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}