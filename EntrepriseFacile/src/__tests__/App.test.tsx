import React from 'react';
import {render, screen} from '@testing-library/react-native';
import App from '../App';

// Mock des modules de navigation
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: jest.fn(),
    goBack: jest.fn(),
  }),
  useRoute: () => ({
    params: {},
  }),
  NavigationContainer: ({children}: {children: React.ReactNode}) => children,
}));

// Mock des modules de navigation stack et tabs
jest.mock('@react-navigation/stack', () => ({
  createStackNavigator: () => ({
    Navigator: ({children}: {children: React.ReactNode}) => children,
    Screen: ({children}: {children: React.ReactNode}) => children,
  }),
}));

jest.mock('@react-navigation/bottom-tabs', () => ({
  createBottomTabNavigator: () => ({
    Navigator: ({children}: {children: React.ReactNode}) => children,
    Screen: ({children}: {children: React.ReactNode}) => children,
  }),
}));

// Mock des écrans
jest.mock('../screens/HomeScreen', () => {
  const React = require('react');
  return function MockHomeScreen() {
    return React.createElement('Text', {}, 'Home Screen');
  };
});

jest.mock('../screens/BusinessPlanScreen', () => {
  const React = require('react');
  return function MockBusinessPlanScreen() {
    return React.createElement('Text', {}, 'Business Plan Screen');
  };
});

jest.mock('../screens/QuoteScreen', () => {
  const React = require('react');
  return function MockQuoteScreen() {
    return React.createElement('Text', {}, 'Quote Screen');
  };
});

jest.mock('../screens/BudgetScreen', () => {
  const React = require('react');
  return function MockBudgetScreen() {
    return React.createElement('Text', {}, 'Budget Screen');
  };
});

jest.mock('../screens/AdminScreen', () => {
  const React = require('react');
  return function MockAdminScreen() {
    return React.createElement('Text', {}, 'Admin Screen');
  };
});

describe('App', () => {
  it('renders without crashing', () => {
    render(<App />);
    // L'app devrait se rendre sans erreur
  });

  it('renders the main navigation structure', () => {
    render(<App />);
    // Vérifier que la structure de navigation est présente
    // Note: Dans un vrai test, vous vérifieriez la présence d'éléments spécifiques
  });
});