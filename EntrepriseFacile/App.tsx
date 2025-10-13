import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {Provider as PaperProvider} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';

// Import des écrans
import HomeScreen from './src/screens/HomeScreen';
import BusinessPlanScreen from './src/screens/BusinessPlanScreen';
import QuoteScreen from './src/screens/QuoteScreen';
import BudgetScreen from './src/screens/BudgetScreen';
import AdminScreen from './src/screens/AdminScreen';
import BusinessPlanDetailScreen from './src/screens/BusinessPlanDetailScreen';
import CreateBusinessPlanScreen from './src/screens/CreateBusinessPlanScreen';
import CreateQuoteScreen from './src/screens/CreateQuoteScreen';
import CreateBudgetScreen from './src/screens/CreateBudgetScreen';

// Thème de l'application
import {theme} from './src/styles/theme';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Stack Navigator pour le Plan d'Affaires
function BusinessPlanStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="BusinessPlanList" 
        component={BusinessPlanScreen}
        options={{title: 'Plans d\'Affaires'}}
      />
      <Stack.Screen 
        name="BusinessPlanDetail" 
        component={BusinessPlanDetailScreen}
        options={{title: 'Détail du Plan'}}
      />
      <Stack.Screen 
        name="CreateBusinessPlan" 
        component={CreateBusinessPlanScreen}
        options={{title: 'Nouveau Plan d\'Affaires'}}
      />
    </Stack.Navigator>
  );
}

// Stack Navigator pour les Devis
function QuoteStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="QuoteList" 
        component={QuoteScreen}
        options={{title: 'Devis'}}
      />
      <Stack.Screen 
        name="CreateQuote" 
        component={CreateQuoteScreen}
        options={{title: 'Nouveau Devis'}}
      />
    </Stack.Navigator>
  );
}

// Stack Navigator pour le Budget
function BudgetStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="BudgetList" 
        component={BudgetScreen}
        options={{title: 'Budget'}}
      />
      <Stack.Screen 
        name="CreateBudget" 
        component={CreateBudgetScreen}
        options={{title: 'Nouveau Budget'}}
      />
    </Stack.Navigator>
  );
}

// Navigation principale avec onglets
function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName: string;

          switch (route.name) {
            case 'Home':
              iconName = 'home';
              break;
            case 'BusinessPlan':
              iconName = 'business';
              break;
            case 'Quote':
              iconName = 'description';
              break;
            case 'Budget':
              iconName = 'account-balance-wallet';
              break;
            case 'Admin':
              iconName = 'admin-panel-settings';
              break;
            default:
              iconName = 'help';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}>
      <Tab.Screen 
        name="Home" 
        component={HomeScreen}
        options={{title: 'Accueil'}}
      />
      <Tab.Screen 
        name="BusinessPlan" 
        component={BusinessPlanStack}
        options={{title: 'Plans d\'Affaires'}}
      />
      <Tab.Screen 
        name="Quote" 
        component={QuoteStack}
        options={{title: 'Devis'}}
      />
      <Tab.Screen 
        name="Budget" 
        component={BudgetStack}
        options={{title: 'Budget'}}
      />
      <Tab.Screen 
        name="Admin" 
        component={AdminScreen}
        options={{title: 'Administratif'}}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <MainTabs />
      </NavigationContainer>
    </PaperProvider>
  );
}