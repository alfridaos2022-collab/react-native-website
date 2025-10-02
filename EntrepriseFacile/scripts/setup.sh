#!/bin/bash

# Script de configuration pour Entreprise Facile
echo "🚀 Configuration de l'application Entreprise Facile..."

# Vérification des prérequis
echo "📋 Vérification des prérequis..."

# Vérifier Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js n'est pas installé. Veuillez installer Node.js >= 16"
    exit 1
fi

NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 16 ]; then
    echo "❌ Node.js version $NODE_VERSION détectée. Version 16+ requise."
    exit 1
fi

echo "✅ Node.js $(node -v) détecté"

# Vérifier npm/yarn
if command -v yarn &> /dev/null; then
    echo "✅ Yarn $(yarn -v) détecté"
    PACKAGE_MANAGER="yarn"
elif command -v npm &> /dev/null; then
    echo "✅ npm $(npm -v) détecté"
    PACKAGE_MANAGER="npm"
else
    echo "❌ Aucun gestionnaire de paquets détecté"
    exit 1
fi

# Installation des dépendances
echo "📦 Installation des dépendances..."
if [ "$PACKAGE_MANAGER" = "yarn" ]; then
    yarn install
else
    npm install
fi

# Configuration iOS (si sur macOS)
if [[ "$OSTYPE" == "darwin"* ]]; then
    echo "🍎 Configuration iOS..."
    if command -v pod &> /dev/null; then
        cd ios && pod install && cd ..
        echo "✅ CocoaPods configuré"
    else
        echo "⚠️  CocoaPods non installé. Installez-le avec: sudo gem install cocoapods"
    fi
fi

# Vérification React Native CLI
if ! command -v react-native &> /dev/null; then
    echo "📱 Installation de React Native CLI..."
    if [ "$PACKAGE_MANAGER" = "yarn" ]; then
        yarn global add @react-native-community/cli
    else
        npm install -g @react-native-community/cli
    fi
fi

echo "✅ Configuration terminée!"
echo ""
echo "🎯 Commandes disponibles:"
echo "  - Démarrage Metro: $PACKAGE_MANAGER start"
echo "  - Android: $PACKAGE_MANAGER android"
echo "  - iOS: $PACKAGE_MANAGER ios"
echo ""
echo "📚 Documentation: README.md"
echo "🚀 Bon développement!"