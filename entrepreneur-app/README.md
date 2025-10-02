# Entreprise Facile - Application Mobile pour Entrepreneurs

Une application mobile complète conçue pour accompagner les entrepreneurs dans la création et la gestion de leur entreprise. L'application offre des outils pour la rédaction de plans d'affaires, la création de devis, la gestion de budgets, et l'aide aux démarches administratives.

## 🚀 Fonctionnalités

### 📋 Plans d'Affaires
- **Modèles prédéfinis** : Templates spécialisés par secteur (restauration, e-commerce, services généraux)
- **Assistant de rédaction** : Guide pas à pas avec conseils et exemples pour chaque section
- **Sections complètes** : Résumé opérationnel, analyse de marché, stratégie marketing, plan financier, etc.
- **Suivi de progression** : Visualisation du pourcentage de completion
- **Export** : Génération en PDF et Word

### 💰 Gestion des Devis
- **Création intuitive** : Interface simple pour créer des devis professionnels
- **Calculs automatiques** : TVA, totaux, et sous-totaux calculés automatiquement
- **Suivi des statuts** : Brouillon, envoyé, accepté, refusé, expiré
- **Gestion client** : Informations client intégrées
- **Envoi par email** : Partage direct des devis

### 📊 Budget et Finances
- **Suivi budgétaire** : Gestion des revenus et dépenses par catégories
- **Tableaux de bord** : Visualisation graphique des données financières
- **Alertes** : Notifications en cas de dépassement de budget
- **Analyse des écarts** : Comparaison entre prévisionnel et réel
- **Transactions** : Historique détaillé des mouvements

### 📋 Démarches Administratives
- **Guide étape par étape** : Processus complet de création d'entreprise
- **Checklist interactive** : Suivi des démarches accomplies
- **Documents nécessaires** : Liste des pièces requises pour chaque étape
- **Liens utiles** : Accès direct aux organismes administratifs
- **Informations sectorielles** : Conseils adaptés selon le type d'entreprise

## 🛠 Technologies Utilisées

- **React Native** : Framework de développement mobile cross-platform
- **TypeScript** : Typage statique pour une meilleure robustesse du code
- **React Navigation** : Navigation entre les écrans
- **React Native Vector Icons** : Icônes Material Design
- **React Native Gesture Handler** : Gestion des gestes tactiles
- **React Native Safe Area Context** : Gestion des zones sécurisées

## 📱 Plateformes Supportées

- iOS 11.0+
- Android 6.0+ (API niveau 23)

## 🎨 Design et UX

L'application suit les principes de Material Design avec :
- Interface moderne et intuitive
- Navigation par onglets pour un accès rapide aux fonctionnalités principales
- Thème de couleurs professionnel (bleu primaire, vert secondaire)
- Composants réutilisables et cohérents
- Responsive design pour différentes tailles d'écran

## 📦 Installation

### Prérequis
- Node.js 16+
- React Native CLI
- Android Studio (pour Android)
- Xcode (pour iOS, macOS uniquement)

### Étapes d'installation

1. **Cloner le projet**
   ```bash
   git clone [url-du-repo]
   cd entrepreneur-app
   ```

2. **Installer les dépendances**
   ```bash
   npm install
   # ou
   yarn install
   ```

3. **Configuration iOS** (macOS uniquement)
   ```bash
   cd ios && pod install && cd ..
   ```

4. **Lancer l'application**
   
   Pour Android :
   ```bash
   npm run android
   ```
   
   Pour iOS :
   ```bash
   npm run ios
   ```

## 🏗 Architecture du Projet

```
src/
├── components/          # Composants réutilisables
│   ├── Button.tsx
│   ├── Card.tsx
│   └── Input.tsx
├── constants/           # Constantes et configurations
│   ├── colors.ts
│   └── templates.ts
├── navigation/          # Configuration de la navigation
│   └── AppNavigator.tsx
├── screens/            # Écrans de l'application
│   ├── HomeScreen.tsx
│   ├── BusinessPlanScreen.tsx
│   ├── QuoteScreen.tsx
│   ├── BudgetScreen.tsx
│   └── ...
├── types/              # Définitions TypeScript
│   └── index.ts
├── utils/              # Utilitaires et helpers
├── services/           # Services API et logique métier
└── App.tsx            # Composant racine
```

## 🔧 Fonctionnalités Techniques

### Gestion des Données
- Stockage local avec AsyncStorage
- Modèles de données TypeScript
- État local avec React Hooks

### Navigation
- Navigation par onglets (Bottom Tabs)
- Navigation en pile (Stack Navigator)
- Modales pour les éditeurs

### Composants UI
- Système de design cohérent
- Composants personnalisés réutilisables
- Gestion des états (loading, error, success)

## 📋 Roadmap

### Version 1.1
- [ ] Synchronisation cloud
- [ ] Notifications push
- [ ] Mode hors ligne
- [ ] Authentification biométrique

### Version 1.2
- [ ] Collaboration en équipe
- [ ] Templates personnalisés
- [ ] Intégration comptabilité
- [ ] Analytics avancées

### Version 2.0
- [ ] IA pour l'aide à la rédaction
- [ ] Marketplace de templates
- [ ] Intégrations bancaires
- [ ] Version web

## 🤝 Contribution

Les contributions sont les bienvenues ! Pour contribuer :

1. Fork le projet
2. Créer une branche pour votre fonctionnalité (`git checkout -b feature/nouvelle-fonctionnalite`)
3. Commit vos changements (`git commit -m 'Ajout nouvelle fonctionnalité'`)
4. Push vers la branche (`git push origin feature/nouvelle-fonctionnalite`)
5. Ouvrir une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 📞 Support

Pour toute question ou support :
- Email : support@entreprise-facile.fr
- Documentation : [Lien vers la documentation]
- Issues GitHub : [Lien vers les issues]

## 🙏 Remerciements

- Équipe de développement
- Communauté React Native
- Entrepreneurs qui ont testé l'application
- Contributeurs open source

---

**Entreprise Facile** - Votre assistant entrepreneurial 🚀