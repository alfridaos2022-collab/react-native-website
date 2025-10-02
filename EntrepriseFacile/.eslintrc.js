module.exports = {
  root: true,
  extends: [
    '@react-native',
    'eslint:recommended',
    '@typescript-eslint/recommended',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'react', 'react-native'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  env: {
    'react-native/react-native': true,
    es6: true,
    node: true,
    jest: true,
  },
  rules: {
    // Règles générales
    'no-console': 'warn',
    'no-unused-vars': 'off', // Utilisé avec @typescript-eslint/no-unused-vars
    '@typescript-eslint/no-unused-vars': ['error', {argsIgnorePattern: '^_'}],
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'warn',
    
    // Règles React
    'react/prop-types': 'off', // TypeScript gère les types
    'react/react-in-jsx-scope': 'off', // React 17+
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    
    // Règles React Native
    'react-native/no-unused-styles': 'error',
    'react-native/split-platform-components': 'error',
    'react-native/no-inline-styles': 'warn',
    'react-native/no-color-literals': 'warn',
    'react-native/no-raw-text': 'off', // Peut être trop strict
    
    // Règles de formatage (gérées par Prettier)
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
        singleQuote: true,
        trailingComma: 'es5',
        tabWidth: 2,
        semi: true,
      },
    ],
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  ignorePatterns: [
    'node_modules/',
    'android/',
    'ios/',
    '*.config.js',
    '*.config.ts',
  ],
};