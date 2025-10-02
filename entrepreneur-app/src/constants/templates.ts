import { BusinessPlanTemplate } from '@/types';

export const BUSINESS_PLAN_TEMPLATES: BusinessPlanTemplate[] = [
  {
    id: 'general',
    name: 'Plan d\'affaires général',
    description: 'Modèle complet pour tout type d\'entreprise',
    category: 'Général',
    sections: [
      {
        id: 'executive-summary',
        title: 'Résumé opérationnel',
        description: 'Présentation synthétique de votre projet d\'entreprise',
        placeholder: 'Décrivez en quelques paragraphes votre projet, vos objectifs, votre marché cible et vos avantages concurrentiels...',
        order: 1,
        required: true,
        tips: [
          'Rédigez cette section en dernier, même si elle apparaît en premier',
          'Limitez-vous à 1-2 pages maximum',
          'Mettez en avant les points clés qui différencient votre projet'
        ]
      },
      {
        id: 'company-presentation',
        title: 'Présentation de l\'entreprise',
        description: 'Description détaillée de votre entreprise et de votre équipe',
        placeholder: 'Présentez votre entreprise, son histoire, sa mission, sa vision, ses valeurs et l\'équipe dirigeante...',
        order: 2,
        required: true,
        tips: [
          'Incluez l\'historique de l\'entreprise si elle existe déjà',
          'Présentez les membres clés de l\'équipe et leurs compétences',
          'Définissez clairement la mission et la vision de l\'entreprise'
        ]
      },
      {
        id: 'market-analysis',
        title: 'Analyse du marché',
        description: 'Étude de votre marché cible et de la concurrence',
        placeholder: 'Analysez votre marché cible, sa taille, ses tendances, vos concurrents directs et indirects...',
        order: 3,
        required: true,
        tips: [
          'Utilisez des données chiffrées et des sources fiables',
          'Identifiez clairement votre marché cible et ses segments',
          'Analysez les forces et faiblesses de vos concurrents'
        ]
      },
      {
        id: 'products-services',
        title: 'Produits et services',
        description: 'Description détaillée de votre offre',
        placeholder: 'Décrivez en détail vos produits ou services, leurs caractéristiques, leurs avantages...',
        order: 4,
        required: true,
        tips: [
          'Mettez en avant la valeur ajoutée de votre offre',
          'Expliquez ce qui vous différencie de la concurrence',
          'Incluez le cycle de vie de vos produits/services'
        ]
      },
      {
        id: 'marketing-strategy',
        title: 'Stratégie marketing et commerciale',
        description: 'Plan de marketing et de vente',
        placeholder: 'Décrivez votre stratégie de marketing, vos canaux de distribution, votre politique de prix...',
        order: 5,
        required: true,
        tips: [
          'Définissez votre mix marketing (4P : Produit, Prix, Place, Promotion)',
          'Identifiez vos canaux de distribution les plus efficaces',
          'Établissez un budget marketing réaliste'
        ]
      },
      {
        id: 'operational-plan',
        title: 'Plan opérationnel',
        description: 'Organisation et fonctionnement de l\'entreprise',
        placeholder: 'Décrivez l\'organisation de votre entreprise, les processus de production, la logistique...',
        order: 6,
        required: true,
        tips: [
          'Détaillez les processus clés de votre activité',
          'Identifiez les ressources nécessaires (humaines, matérielles)',
          'Planifiez la montée en charge de votre activité'
        ]
      },
      {
        id: 'financial-plan',
        title: 'Plan financier',
        description: 'Prévisions financières et besoins de financement',
        placeholder: 'Présentez vos prévisions de chiffre d\'affaires, vos charges, votre plan de financement...',
        order: 7,
        required: true,
        tips: [
          'Établissez des prévisions sur 3 ans minimum',
          'Soyez réaliste dans vos hypothèses',
          'Prévoyez plusieurs scénarios (optimiste, réaliste, pessimiste)'
        ]
      }
    ]
  },
  {
    id: 'restaurant',
    name: 'Plan d\'affaires - Restauration',
    description: 'Modèle spécialisé pour les restaurants et services de restauration',
    category: 'Restauration',
    sections: [
      {
        id: 'concept-restaurant',
        title: 'Concept du restaurant',
        description: 'Présentation du concept, du thème et de l\'ambiance',
        placeholder: 'Décrivez le concept de votre restaurant, le type de cuisine, l\'ambiance, le positionnement...',
        order: 1,
        required: true,
        tips: [
          'Définissez clairement votre concept et votre positionnement',
          'Décrivez l\'expérience client que vous voulez offrir',
          'Justifiez vos choix par rapport au marché local'
        ]
      },
      {
        id: 'menu-pricing',
        title: 'Carte et tarification',
        description: 'Description de la carte et stratégie de prix',
        placeholder: 'Présentez votre carte, vos plats signature, votre politique de prix...',
        order: 2,
        required: true,
        tips: [
          'Équilibrez votre carte entre rentabilité et attractivité',
          'Adaptez vos prix à votre clientèle cible',
          'Prévoyez l\'évolution saisonnière de votre carte'
        ]
      },
      {
        id: 'location-layout',
        title: 'Emplacement et aménagement',
        description: 'Choix de l\'emplacement et aménagement des espaces',
        placeholder: 'Justifiez le choix de votre emplacement, décrivez l\'aménagement de la salle et de la cuisine...',
        order: 3,
        required: true,
        tips: [
          'Analysez le passage et la clientèle potentielle',
          'Respectez les normes d\'hygiène et de sécurité',
          'Optimisez l\'aménagement pour l\'efficacité du service'
        ]
      },
      {
        id: 'suppliers-inventory',
        title: 'Fournisseurs et gestion des stocks',
        description: 'Stratégie d\'approvisionnement et gestion des stocks',
        placeholder: 'Décrivez votre stratégie d\'approvisionnement, vos fournisseurs, la gestion des stocks...',
        order: 4,
        required: true,
        tips: [
          'Diversifiez vos sources d\'approvisionnement',
          'Négociez des conditions de paiement favorables',
          'Mettez en place un système de gestion des stocks efficace'
        ]
      },
      {
        id: 'staff-management',
        title: 'Gestion du personnel',
        description: 'Organisation et management de l\'équipe',
        placeholder: 'Décrivez l\'organisation de votre équipe, les profils recherchés, la formation...',
        order: 5,
        required: true,
        tips: [
          'Définissez clairement les rôles et responsabilités',
          'Prévoyez un plan de formation pour votre équipe',
          'Établissez une politique de rémunération attractive'
        ]
      }
    ]
  },
  {
    id: 'ecommerce',
    name: 'Plan d\'affaires - E-commerce',
    description: 'Modèle pour les boutiques en ligne et le commerce électronique',
    category: 'E-commerce',
    sections: [
      {
        id: 'digital-strategy',
        title: 'Stratégie digitale',
        description: 'Approche digitale et canaux en ligne',
        placeholder: 'Décrivez votre stratégie digitale, vos canaux de vente en ligne, votre présence sur les réseaux sociaux...',
        order: 1,
        required: true,
        tips: [
          'Choisissez les plateformes adaptées à votre cible',
          'Définissez une stratégie de contenu cohérente',
          'Prévoyez un budget pour le marketing digital'
        ]
      },
      {
        id: 'website-platform',
        title: 'Site web et plateforme',
        description: 'Développement et fonctionnalités du site e-commerce',
        placeholder: 'Décrivez votre site e-commerce, ses fonctionnalités, l\'expérience utilisateur...',
        order: 2,
        required: true,
        tips: [
          'Privilégiez l\'expérience utilisateur et la simplicité',
          'Assurez-vous que le site soit responsive',
          'Intégrez des solutions de paiement sécurisées'
        ]
      },
      {
        id: 'logistics-delivery',
        title: 'Logistique et livraison',
        description: 'Gestion des stocks, expédition et livraison',
        placeholder: 'Décrivez votre système logistique, la gestion des stocks, les options de livraison...',
        order: 3,
        required: true,
        tips: [
          'Optimisez vos coûts de livraison',
          'Proposez plusieurs options de livraison',
          'Mettez en place un système de suivi des commandes'
        ]
      }
    ]
  }
];

export const QUOTE_TEMPLATES = {
  standard: {
    header: 'DEVIS',
    footer: 'Merci de votre confiance. Ce devis est valable 30 jours.',
    terms: 'Conditions de paiement : 30% à la commande, solde à la livraison.'
  },
  service: {
    header: 'DEVIS DE PRESTATION',
    footer: 'Devis valable 15 jours. Prestations réalisées selon planning convenu.',
    terms: 'Paiement : 50% à la signature, 50% à la fin de prestation.'
  }
};