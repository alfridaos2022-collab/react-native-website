import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { ROUTES, COLORS } from '../constants';
import HomeScreen from '../screens/Home/HomeScreen';
import DocumentsScreen from '../screens/Documents/DocumentsScreen';
import ProfileScreen from '../screens/Profile/ProfileScreen';
import SupportScreen from '../screens/Support/SupportScreen';
import BusinessPlanCreateScreen from '../screens/Documents/BusinessPlanCreateScreen';
import BusinessPlanEditScreen from '../screens/Documents/BusinessPlanEditScreen';
import TemplatesScreen from '../screens/Documents/TemplatesScreen';
import SubscriptionScreen from '../screens/Profile/SubscriptionScreen';
import SettingsScreen from '../screens/Profile/SettingsScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const DocumentsStack = () => (
  <Stack.Navigator>
    <Stack.Screen 
      name={ROUTES.DOCUMENTS} 
      component={DocumentsScreen}
      options={{ title: 'Mes Documents' }}
    />
    <Stack.Screen 
      name={ROUTES.TEMPLATES} 
      component={TemplatesScreen}
      options={{ title: 'Modèles' }}
    />
    <Stack.Screen 
      name={ROUTES.BUSINESS_PLAN_CREATE} 
      component={BusinessPlanCreateScreen}
      options={{ title: 'Nouveau Plan d\'affaires' }}
    />
    <Stack.Screen 
      name={ROUTES.BUSINESS_PLAN_EDIT} 
      component={BusinessPlanEditScreen}
      options={{ title: 'Modifier le Plan d\'affaires' }}
    />
  </Stack.Navigator>
);

const ProfileStack = () => (
  <Stack.Navigator>
    <Stack.Screen 
      name={ROUTES.PROFILE} 
      component={ProfileScreen}
      options={{ title: 'Profil' }}
    />
    <Stack.Screen 
      name={ROUTES.SUBSCRIPTION} 
      component={SubscriptionScreen}
      options={{ title: 'Abonnement' }}
    />
    <Stack.Screen 
      name={ROUTES.SETTINGS} 
      component={SettingsScreen}
      options={{ title: 'Paramètres' }}
    />
  </Stack.Navigator>
);

const MainTabs = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        let iconName: string;

        switch (route.name) {
          case ROUTES.HOME:
            iconName = 'home';
            break;
          case ROUTES.DOCUMENTS:
            iconName = 'description';
            break;
          case ROUTES.SUPPORT:
            iconName = 'help';
            break;
          case ROUTES.PROFILE:
            iconName = 'person';
            break;
          default:
            iconName = 'circle';
        }

        return <Icon name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: COLORS.primary,
      tabBarInactiveTintColor: COLORS.textSecondary,
      tabBarStyle: {
        backgroundColor: COLORS.surface,
        borderTopColor: COLORS.primaryLight,
      },
      headerStyle: {
        backgroundColor: COLORS.primary,
      },
      headerTintColor: COLORS.surface,
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    })}
  >
    <Tab.Screen 
      name={ROUTES.HOME} 
      component={HomeScreen}
      options={{ title: 'Accueil' }}
    />
    <Tab.Screen 
      name={ROUTES.DOCUMENTS} 
      component={DocumentsStack}
      options={{ 
        title: 'Documents',
        headerShown: false,
      }}
    />
    <Tab.Screen 
      name={ROUTES.SUPPORT} 
      component={SupportScreen}
      options={{ title: 'Support' }}
    />
    <Tab.Screen 
      name={ROUTES.PROFILE} 
      component={ProfileStack}
      options={{ 
        title: 'Profil',
        headerShown: false,
      }}
    />
  </Tab.Navigator>
);

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <MainTabs />
    </NavigationContainer>
  );
};

export default AppNavigator;