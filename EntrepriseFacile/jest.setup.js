import 'react-native-gesture-handler/jestSetup';

// Mock des modules React Native
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

// Mock des modules de navigation
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: jest.fn(),
    goBack: jest.fn(),
  }),
  useRoute: () => ({
    params: {},
  }),
  NavigationContainer: ({children}) => children,
}));

// Mock des modules de fichiers
jest.mock('react-native-fs', () => ({
  DocumentDirectoryPath: '/mock/path',
  writeFile: jest.fn(),
  readFile: jest.fn(),
}));

// Mock du module de partage
jest.mock('react-native-share', () => ({
  open: jest.fn(),
}));

// Mock des icônes vectorielles
jest.mock('react-native-vector-icons/MaterialIcons', () => 'Icon');

// Mock des graphiques
jest.mock('react-native-chart-kit', () => ({
  LineChart: 'LineChart',
  PieChart: 'PieChart',
}));

// Mock du gradient linéaire
jest.mock('react-native-linear-gradient', () => 'LinearGradient');

// Mock des permissions
jest.mock('react-native-permissions', () => ({
  request: jest.fn(),
  check: jest.fn(),
  PERMISSIONS: {
    CAMERA: 'camera',
    WRITE_EXTERNAL_STORAGE: 'write_external_storage',
    READ_EXTERNAL_STORAGE: 'read_external_storage',
  },
  RESULTS: {
    GRANTED: 'granted',
    DENIED: 'denied',
  },
}));

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

// Mock des animations
jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');
  Reanimated.default.call = () => {};
  return Reanimated;
});

// Mock des modules Expo
jest.mock('expo', () => ({
  FileSystem: {
    documentDirectory: '/mock/path',
    writeAsStringAsync: jest.fn(),
  },
  Sharing: {
    shareAsync: jest.fn(),
  },
  Print: {
    printAsync: jest.fn(),
  },
}));

// Configuration globale pour les tests
global.console = {
  ...console,
  // Supprime les warnings des tests
  warn: jest.fn(),
  error: jest.fn(),
};