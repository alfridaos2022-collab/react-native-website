import { DocumentTemplate, SubscriptionPlan } from '../types';

// Business types with French labels
export const BUSINESS_TYPES = [
  { value: 'startup', label: 'Startup' },
  { value: 'sme', label: 'PME' },
  { value: 'freelance', label: 'Freelance' },
  { value: 'ecommerce', label: 'E-commerce' },
  { value: 'restaurant', label: 'Restaurant' },
  { value: 'consulting', label: 'Conseil' },
  { value: 'technology', label: 'Technologie' },
  { value: 'retail', label: 'Commerce de détail' },
  { value: 'manufacturing', label: 'Manufacture' },
  { value: 'services', label: 'Services' },
];

// Document categories
export const DOCUMENT_CATEGORIES = [
  { value: 'business_plan', label: 'Plan d\'affaires' },
  { value: 'financial_projection', label: 'Projections financières' },
  { value: 'marketing_plan', label: 'Plan marketing' },
  { value: 'operational_plan', label: 'Plan opérationnel' },
  { value: 'legal_documents', label: 'Documents légaux' },
  { value: 'presentation', label: 'Présentation' },
];

// Subscription plans
export const SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
  {
    id: 'free',
    name: 'Gratuit',
    price: 0,
    currency: 'EUR',
    features: [
      '1 plan d\'affaires',
      'Modèles de base',
      'Support par email',
      'Export PDF basique'
    ],
    isPopular: false,
    maxDocuments: 1,
    hasAIAnalysis: false,
    hasPrioritySupport: false,
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 29.99,
    currency: 'EUR',
    features: [
      'Plans d\'affaires illimités',
      'Tous les modèles',
      'Analyse IA avancée',
      'Support prioritaire',
      'Export PDF professionnel',
      'Intégrations comptables'
    ],
    isPopular: true,
    maxDocuments: -1, // unlimited
    hasAIAnalysis: true,
    hasPrioritySupport: true,
  },
];

// Default document templates
export const DEFAULT_TEMPLATES: DocumentTemplate[] = [
  {
    id: 'startup_business_plan',
    name: 'Plan d\'affaires Startup',
    description: 'Modèle complet pour les startups innovantes',
    category: 'business_plan',
    isPremium: false,
    industry: 'startup',
    sections: [
      {
        id: 'executive_summary',
        title: 'Résumé exécutif',
        content: '',
        order: 1,
        isRequired: true,
        placeholder: 'Décrivez votre vision d\'entreprise en 2-3 paragraphes...'
      },
      {
        id: 'market_analysis',
        title: 'Analyse de marché',
        content: '',
        order: 2,
        isRequired: true,
        placeholder: 'Analysez votre marché cible, la concurrence et les opportunités...'
      },
      {
        id: 'business_model',
        title: 'Modèle économique',
        content: '',
        order: 3,
        isRequired: true,
        placeholder: 'Expliquez comment votre entreprise génère des revenus...'
      },
      {
        id: 'financial_projections',
        title: 'Projections financières',
        content: '',
        order: 4,
        isRequired: true,
        placeholder: 'Présentez vos projections financières sur 3-5 ans...'
      },
      {
        id: 'team_organization',
        title: 'Équipe et organisation',
        content: '',
        order: 5,
        isRequired: true,
        placeholder: 'Décrivez votre équipe et l\'organisation de l\'entreprise...'
      }
    ]
  },
  {
    id: 'restaurant_business_plan',
    name: 'Plan d\'affaires Restaurant',
    description: 'Modèle spécialisé pour les restaurants',
    category: 'business_plan',
    isPremium: true,
    industry: 'restaurant',
    sections: [
      {
        id: 'concept_menu',
        title: 'Concept et menu',
        content: '',
        order: 1,
        isRequired: true,
        placeholder: 'Décrivez votre concept culinaire et votre menu...'
      },
      {
        id: 'location_analysis',
        title: 'Analyse de localisation',
        content: '',
        order: 2,
        isRequired: true,
        placeholder: 'Analysez l\'emplacement et la zone de chalandise...'
      },
      {
        id: 'operations_plan',
        title: 'Plan opérationnel',
        content: '',
        order: 3,
        isRequired: true,
        placeholder: 'Détaillez les opérations quotidiennes du restaurant...'
      },
      {
        id: 'financial_projections',
        title: 'Projections financières',
        content: '',
        order: 4,
        isRequired: true,
        placeholder: 'Présentez vos projections financières spécifiques au secteur...'
      }
    ]
  }
];

// App configuration
export const APP_CONFIG = {
  name: 'Entreprise Facile',
  version: '1.0.0',
  supportEmail: 'support@entreprisefacile.fr',
  website: 'https://entreprisefacile.fr',
  maxFileSize: 10 * 1024 * 1024, // 10MB
  supportedFormats: ['pdf', 'docx', 'txt'],
};

// Colors theme
export const COLORS = {
  primary: '#2E7D32',
  primaryLight: '#4CAF50',
  primaryDark: '#1B5E20',
  secondary: '#FF6F00',
  secondaryLight: '#FF9800',
  secondaryDark: '#E65100',
  background: '#FAFAFA',
  surface: '#FFFFFF',
  text: '#212121',
  textSecondary: '#757575',
  error: '#D32F2F',
  success: '#388E3C',
  warning: '#F57C00',
  info: '#1976D2',
};

// Navigation routes
export const ROUTES = {
  AUTH: 'Auth',
  HOME: 'Home',
  DOCUMENTS: 'Documents',
  PROFILE: 'Profile',
  SUPPORT: 'Support',
  BUSINESS_PLAN_CREATE: 'BusinessPlanCreate',
  BUSINESS_PLAN_EDIT: 'BusinessPlanEdit',
  TEMPLATES: 'Templates',
  SUBSCRIPTION: 'Subscription',
  SETTINGS: 'Settings',
};