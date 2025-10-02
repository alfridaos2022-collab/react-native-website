import {BusinessPlan, BusinessPlanSection, AIAnalysis} from '../types';

export class AIService {
  /**
   * Analyse un plan d'affaires avec l'IA
   */
  static async analyzeBusinessPlan(businessPlan: BusinessPlan): Promise<AIAnalysis> {
    try {
      // Simulation d'une analyse IA
      // Dans une vraie application, vous feriez appel à une API d'IA comme OpenAI, Claude, etc.
      
      const analysis = await this.performAIAnalysis(businessPlan);
      return analysis;
    } catch (error) {
      console.error('Erreur lors de l\'analyse IA:', error);
      throw new Error('Impossible d\'analyser le plan d\'affaires');
    }
  }

  /**
   * Analyse une section spécifique du plan d'affaires
   */
  static async analyzeSection(section: BusinessPlanSection, context: BusinessPlan): Promise<string[]> {
    try {
      const suggestions = await this.generateSectionSuggestions(section, context);
      return suggestions;
    } catch (error) {
      console.error('Erreur lors de l\'analyse de section:', error);
      return [];
    }
  }

  /**
   * Génère des suggestions d'amélioration pour une section
   */
  static async generateSuggestions(section: BusinessPlanSection): Promise<string[]> {
    const suggestions: string[] = [];

    // Analyse basée sur le contenu et le titre de la section
    switch (section.title.toLowerCase()) {
      case 'résumé opérationnel':
      case 'executive summary':
        if (!section.content.includes('chiffre') && !section.content.includes('€')) {
          suggestions.push('Ajoutez des chiffres clés (chiffre d\'affaires prévu, investissement, etc.)');
        }
        if (section.content.length < 200) {
          suggestions.push('Développez davantage votre proposition de valeur');
        }
        break;

      case 'analyse du marché':
        if (!section.content.includes('concurrence')) {
          suggestions.push('Incluez une analyse de la concurrence');
        }
        if (!section.content.includes('client') && !section.content.includes('cible')) {
          suggestions.push('Définissez clairement votre marché cible');
        }
        if (!section.content.includes('€') && !section.content.includes('million')) {
          suggestions.push('Ajoutez des données chiffrées sur la taille du marché');
        }
        break;

      case 'stratégie marketing':
      case 'plan marketing':
        if (!section.content.includes('digital') && !section.content.includes('en ligne')) {
          suggestions.push('Intégrez une stratégie marketing digital');
        }
        if (!section.content.includes('budget') && !section.content.includes('€')) {
          suggestions.push('Précisez le budget marketing alloué');
        }
        if (!section.content.includes('réseaux sociaux')) {
          suggestions.push('Développez votre présence sur les réseaux sociaux');
        }
        break;

      case 'plan financier':
        if (!section.content.includes('prévision') && !section.content.includes('budget')) {
          suggestions.push('Ajoutez des prévisions financières détaillées');
        }
        if (!section.content.includes('investissement')) {
          suggestions.push('Précisez les besoins en investissement');
        }
        if (!section.content.includes('rentabilité')) {
          suggestions.push('Calculez le seuil de rentabilité');
        }
        break;

      case 'produits et services':
        if (!section.content.includes('prix')) {
          suggestions.push('Définissez votre politique tarifaire');
        }
        if (!section.content.includes('différenciation')) {
          suggestions.push('Expliquez ce qui vous différencie de la concurrence');
        }
        break;

      default:
        if (section.content.length < 100) {
          suggestions.push('Développez davantage cette section');
        }
        if (!section.content.includes('objectif') && !section.content.includes('but')) {
          suggestions.push('Ajoutez des objectifs clairs et mesurables');
        }
    }

    // Suggestions générales basées sur la qualité du contenu
    if (section.content.length < 50) {
      suggestions.push('Cette section semble incomplète, développez-la davantage');
    }

    if (!section.content.includes('.')) {
      suggestions.push('Améliorez la structure et la ponctuation du texte');
    }

    return suggestions;
  }

  /**
   * Effectue l'analyse IA complète du plan d'affaires
   */
  private static async performAIAnalysis(businessPlan: BusinessPlan): Promise<AIAnalysis> {
    // Simulation d'un délai d'analyse
    await new Promise(resolve => setTimeout(resolve, 2000));

    const completedSections = businessPlan.sections.filter(s => s.isCompleted).length;
    const totalSections = businessPlan.sections.length;
    const completionRate = totalSections > 0 ? completedSections / totalSections : 0;

    // Calcul du score basé sur différents critères
    let score = 0;
    const strengths: string[] = [];
    const weaknesses: string[] = [];
    const suggestions: string[] = [];

    // Score basé sur le taux de completion
    score += completionRate * 30;

    // Analyse du contenu des sections
    for (const section of businessPlan.sections) {
      if (section.isCompleted && section.content) {
        score += 10; // Points pour chaque section complétée

        // Analyse spécifique par section
        switch (section.title.toLowerCase()) {
          case 'résumé opérationnel':
            if (section.content.includes('chiffre') || section.content.includes('€')) {
              strengths.push('Résumé opérationnel avec des données chiffrées');
              score += 5;
            } else {
              weaknesses.push('Résumé opérationnel manquant de données chiffrées');
            }
            break;

          case 'analyse du marché':
            if (section.content.includes('concurrence')) {
              strengths.push('Analyse de la concurrence présente');
              score += 5;
            } else {
              weaknesses.push('Analyse de la concurrence incomplète');
            }
            break;

          case 'plan financier':
            if (section.content.includes('prévision') || section.content.includes('budget')) {
              strengths.push('Plan financier avec prévisions');
              score += 10;
            } else {
              weaknesses.push('Plan financier incomplet');
            }
            break;

          case 'stratégie marketing':
            if (section.content.includes('digital') || section.content.includes('en ligne')) {
              strengths.push('Stratégie marketing digital incluse');
              score += 5;
            } else {
              weaknesses.push('Stratégie marketing digital manquante');
            }
            break;
        }
      } else {
        weaknesses.push(`Section "${section.title}" incomplète`);
      }
    }

    // Suggestions générales
    if (completionRate < 0.5) {
      suggestions.push('Complétez davantage de sections pour améliorer votre plan');
    }

    if (businessPlan.sections.filter(s => s.title.toLowerCase().includes('financier')).length === 0) {
      suggestions.push('Ajoutez un plan financier détaillé');
    }

    if (businessPlan.sections.filter(s => s.title.toLowerCase().includes('marketing')).length === 0) {
      suggestions.push('Développez votre stratégie marketing');
    }

    // Score final (max 100)
    score = Math.min(Math.round(score), 100);

    return {
      score,
      suggestions,
      strengths,
      weaknesses,
      lastAnalyzed: new Date(),
    };
  }

  /**
   * Génère des suggestions pour une section spécifique
   */
  private static async generateSectionSuggestions(
    section: BusinessPlanSection,
    context: BusinessPlan
  ): Promise<string[]> {
    const suggestions = await this.generateSuggestions(section);

    // Suggestions contextuelles basées sur le secteur
    if (context.sector === 'Restauration') {
      if (section.title.toLowerCase().includes('marketing')) {
        suggestions.push('Considérez les plateformes de livraison (Uber Eats, Deliveroo)');
        suggestions.push('Développez votre présence sur Google My Business');
      }
      if (section.title.toLowerCase().includes('opérationnel')) {
        suggestions.push('Détaillez vos procédures d\'hygiène et de sécurité alimentaire');
      }
    } else if (context.sector === 'E-commerce') {
      if (section.title.toLowerCase().includes('marketing')) {
        suggestions.push('Intégrez une stratégie SEO et SEM');
        suggestions.push('Développez votre présence sur les réseaux sociaux');
      }
      if (section.title.toLowerCase().includes('opérationnel')) {
        suggestions.push('Détaillez votre logistique et gestion des stocks');
      }
    }

    return suggestions;
  }

  /**
   * Génère du contenu pour une section vide
   */
  static async generateContentForSection(
    sectionTitle: string,
    context: BusinessPlan
  ): Promise<string> {
    // Simulation d'une génération de contenu
    await new Promise(resolve => setTimeout(resolve, 1500));

    const templates: {[key: string]: string} = {
      'résumé opérationnel': `[Généré par IA] ${context.title} est une entreprise innovante dans le secteur ${context.sector}. Notre mission est de [décrire votre mission]. Nous visons un chiffre d'affaires de [montant] € sur [période] avec un investissement initial de [montant] €.`,
      
      'analyse du marché': `[Généré par IA] Le marché ${context.sector} représente [taille du marché] € en France. Notre marché cible comprend [description des clients]. La concurrence comprend [nombre] entreprises similaires, mais notre différenciation repose sur [votre avantage concurrentiel].`,
      
      'stratégie marketing': `[Généré par IA] Notre stratégie marketing s'appuie sur [canaux principaux]. Le budget marketing s'élève à [montant] €, réparti entre [détail des canaux]. Nous visons [objectifs marketing] avec un ROI attendu de [pourcentage]%.`,
      
      'plan financier': `[Généré par IA] Prévisions financières sur 3 ans : Année 1 - CA : [montant] €, Charges : [montant] €, Résultat : [montant] €. Investissement initial : [montant] €. Seuil de rentabilité atteint en [mois].`,
    };

    const key = sectionTitle.toLowerCase();
    return templates[key] || `[Généré par IA] Cette section nécessite un développement spécifique à votre activité dans le secteur ${context.sector}. Consultez les suggestions pour obtenir des conseils personnalisés.`;
  }

  /**
   * Améliore un texte existant
   */
  static async improveText(originalText: string, sectionTitle: string): Promise<string> {
    // Simulation d'une amélioration de texte
    await new Promise(resolve => setTimeout(resolve, 1000));

    let improvedText = originalText;

    // Améliorations basiques
    if (!improvedText.includes('€') && sectionTitle.toLowerCase().includes('financier')) {
      improvedText += ' [Ajoutez des montants chiffrés]';
    }

    if (!improvedText.includes('objectif') && !improvedText.includes('but')) {
      improvedText += ' [Définissez des objectifs clairs]';
    }

    if (improvedText.length < 100) {
      improvedText += ' [Développez davantage cette section avec des détails spécifiques]';
    }

    return improvedText;
  }
}