# Entreprise Facile

Application mobile React Native conçue pour aider les entrepreneurs à rédiger leurs plans d'affaires, créer des devis, gérer leur budget et simplifier les démarches administratives.

## 🚀 Fonctionnalités

### 📋 Plans d'Affaires
- **Création guidée** : Assistant pas à pas avec conseils et exemples
- **Modèles prédéfinis** : Templates adaptés par secteur d'activité
- **Analyse IA** : Évaluation automatique et suggestions d'amélioration
- **Sections complètes** : Résumé opérationnel, analyse marché, stratégie marketing, plan financier
- **Export PDF** : Génération de documents professionnels

### 💰 Gestion des Devis
- **Création rapide** : Interface intuitive pour saisir les informations client
- **Calculs automatiques** : TVA, remises, totaux calculés automatiquement
- **Suivi des statuts** : Brouillon, envoyé, accepté, rejeté
- **Export PDF** : Devis professionnels prêts à envoyer
- **Historique** : Suivi de tous les devis créés

### 📊 Gestion de Budget
- **Budgets prévisionnels** : Création de budgets mensuels, trimestriels ou annuels
- **Catégorisation** : Revenus et dépenses organisés par catégories
- **Graphiques** : Visualisation des données avec graphiques interactifs
- **Suivi des écarts** : Comparaison budgeté vs réel
- **Export Excel** : Export des données pour analyse externe

### 🏛️ Démarches Administratives
- **Guide étape par étape** : Processus de création d'entreprise
- **Catégorisation** : Création, légal, fiscal, social
- **Liens directs** : Accès aux organismes compétents
- **Suivi des tâches** : Marquage des étapes terminées
- **Documents requis** : Liste des pièces nécessaires

## 🛠️ Technologies Utilisées

- **React Native** : Framework mobile cross-platform
- **TypeScript** : Typage statique pour une meilleure robustesse
- **React Navigation** : Navigation entre écrans
- **React Native Paper** : Composants UI Material Design
- **React Native Chart Kit** : Graphiques et visualisations
- **React Native Vector Icons** : Icônes personnalisées
- **React Native FS** : Gestion des fichiers
- **React Native Share** : Partage de documents

## 📱 Installation

### Prérequis
- Node.js >= 16
- React Native CLI
- Android Studio (pour Android)
- Xcode (pour iOS)

### Installation des dépendances
```bash
cd EntrepriseFacile
npm install
# ou
yarn install
```

### Configuration iOS
```bash
cd ios
pod install
cd ..
```

### Lancement de l'application
```bash
# Android
npm run android
# ou
yarn android

# iOS
npm run ios
# ou
yarn ios
```

## 🏗️ Architecture

```
src/
├── components/          # Composants réutilisables
├── screens/            # Écrans de l'application
├── services/           # Services métier (IA, Export, etc.)
├── types/             # Définitions TypeScript
├── styles/            # Thèmes et styles
├── data/              # Données de démonstration
└── utils/             # Utilitaires
```

## 🎨 Design

L'application utilise un thème cohérent basé sur les couleurs vertes (entrepreneuriat) avec :
- **Couleur primaire** : #2E7D32 (Vert foncé)
- **Couleur d'accent** : #4CAF50 (Vert clair)
- **Design Material** : Composants Paper pour une interface moderne

## 🤖 Intelligence Artificielle

L'application intègre des fonctionnalités IA pour :
- **Analyse sémantique** : Évaluation de la qualité des plans d'affaires
- **Suggestions contextuelles** : Recommandations adaptées au secteur
- **Génération de contenu** : Aide à la rédaction des sections
- **Score de qualité** : Note de 0 à 100 pour chaque plan

## 📄 Exportation

### Formats supportés
- **PDF** : Plans d'affaires et devis
- **Excel/CSV** : Données budgétaires
- **Partage** : Envoi par email ou autres applications

### Fonctionnalités d'export
- Mise en forme professionnelle
- Inclusion des graphiques
- Analyse IA intégrée
- Personnalisation des contenus

## 🚀 Déploiement

### Build de production
```bash
# Android
npm run build:android

# iOS
npm run build:ios
```

### Configuration des stores
- **Google Play Store** : Configuration Android
- **Apple App Store** : Configuration iOS

## 📝 Licence

Ce projet est sous licence MIT. Voir le fichier LICENSE pour plus de détails.

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à :
1. Fork le projet
2. Créer une branche feature
3. Commit vos changements
4. Push vers la branche
5. Ouvrir une Pull Request

## 📞 Support

Pour toute question ou problème :
- Créer une issue sur GitHub
- Consulter la documentation
- Contacter l'équipe de développement

---

**Entreprise Facile** - Votre assistant pour créer et gérer votre entreprise 🚀