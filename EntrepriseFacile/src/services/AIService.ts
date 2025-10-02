import { BusinessPlan, AIAnalysis } from '../types';

/**
 * Service pour l'intégration de l'IA
 * Cette classe sera étendue pour intégrer des services d'IA réels
 */
export class AIService {
  /**
   * Analyse un plan d'affaires avec l'IA
   * @param businessPlan Le plan d'affaires à analyser
   * @returns Promise<AIAnalysis> L'analyse générée par l'IA
   */
  static async analyzeBusinessPlan(businessPlan: BusinessPlan): Promise<AIAnalysis> {
    // Simulation d'une analyse IA
    // Dans une implémentation réelle, ceci ferait appel à un service d'IA externe
    
    const analysis: AIAnalysis = {
      id: `analysis_${Date.now()}`,
      businessPlanId: businessPlan.id,
      score: Math.floor(Math.random() * 40) + 60, // Score entre 60 et 100
      suggestions: [
        'Renforcez votre analyse de marché avec des données plus récentes',
        'Ajoutez des projections financières sur 5 ans au lieu de 3',
        'Détaillez davantage votre stratégie de marketing',
        'Incluez une analyse SWOT (Forces, Faiblesses, Opportunités, Menaces)',
      ],
      strengths: [
        'Vision claire et bien définie',
        'Modèle économique solide',
        'Équipe compétente',
        'Marché cible bien identifié',
      ],
      weaknesses: [
        'Projections financières limitées',
        'Analyse concurrentielle incomplète',
        'Stratégie de sortie non définie',
        'Plan de gestion des risques manquant',
      ],
      recommendations: [
        'Consultez un expert-comptable pour valider vos projections',
        'Réalisez une étude de marché approfondie',
        'Développez un plan de communication marketing',
        'Préparez un plan de contingence',
      ],
      createdAt: new Date(),
    };

    return new Promise((resolve) => {
      // Simulation d'un délai de traitement
      setTimeout(() => {
        resolve(analysis);
      }, 2000);
    });
  }

  /**
   * Génère du contenu pour une section de plan d'affaires
   * @param sectionTitle Le titre de la section
   * @param businessType Le type d'entreprise
   * @param context Contexte supplémentaire
   * @returns Promise<string> Le contenu généré
   */
  static async generateSectionContent(
    sectionTitle: string,
    businessType: string,
    _context?: string
  ): Promise<string> {
    // Simulation de génération de contenu
    const templates = {
      'Résumé exécutif': `Notre entreprise ${businessType} vise à révolutionner le marché en proposant une solution innovante qui répond aux besoins actuels des consommateurs. Avec une équipe expérimentée et une vision claire, nous sommes prêts à conquérir notre marché cible.`,
      'Analyse de marché': `Le marché ${businessType} représente une opportunité significative avec une croissance annuelle de X%. Notre analyse révèle des segments sous-exploités et des besoins non satisfaits que nous pouvons adresser efficacement.`,
      'Modèle économique': `Notre modèle économique repose sur ${businessType === 'startup' ? 'un modèle freemium avec des fonctionnalités premium' : 'la vente directe de produits/services'}. Nous générons des revenus récurrents tout en maintenant des coûts opérationnels maîtrisés.`,
    };

    const content = templates[sectionTitle as keyof typeof templates] || 
      `Cette section du plan d'affaires pour ${businessType} nécessite un développement approfondi. Considérez les aspects suivants : analyse détaillée, stratégies spécifiques, et métriques de performance.`;

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(content);
      }, 1500);
    });
  }

  /**
   * Optimise un plan d'affaires existant
   * @param businessPlan Le plan d'affaires à optimiser
   * @returns Promise<BusinessPlan> Le plan optimisé
   */
  static async optimizeBusinessPlan(businessPlan: BusinessPlan): Promise<BusinessPlan> {
    // Simulation d'optimisation
    const optimizedPlan = { ...businessPlan };
    
    // Ajouter des suggestions d'amélioration
    optimizedPlan.sections = businessPlan.sections.map(section => ({
      ...section,
      content: section.content + '\n\n[Suggestion IA: Cette section pourrait être enrichie avec des données quantitatives et des exemples concrets.]',
    }));

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(optimizedPlan);
      }, 3000);
    });
  }

  /**
   * Vérifie la cohérence d'un plan d'affaires
   * @param businessPlan Le plan d'affaires à vérifier
   * @returns Promise<string[]> Liste des incohérences détectées
   */
  static async checkConsistency(businessPlan: BusinessPlan): Promise<string[]> {
    const inconsistencies: string[] = [];

    // Vérifications basiques
    if (businessPlan.sections.length < 3) {
      inconsistencies.push('Le plan d\'affaires semble incomplet (moins de 3 sections)');
    }

    const completedSections = businessPlan.sections.filter(s => s.isCompleted).length;
    if (completedSections < businessPlan.sections.length * 0.5) {
      inconsistencies.push('Moins de 50% des sections sont complétées');
    }

    // Vérifier la présence de sections critiques
    const criticalSections = ['Résumé exécutif', 'Analyse de marché', 'Modèle économique'];
    criticalSections.forEach(section => {
      if (!businessPlan.sections.some(s => s.title.includes(section))) {
        inconsistencies.push(`Section critique manquante : ${section}`);
      }
    });

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(inconsistencies);
      }, 1000);
    });
  }
}