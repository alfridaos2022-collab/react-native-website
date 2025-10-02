import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { SafeAreaView } from 'react-native-safe-area-context';

import { COLORS, SUBSCRIPTION_PLANS } from '../../constants';
import { SubscriptionPlan } from '../../types';

interface SubscriptionScreenProps {
  navigation: any;
}

const SubscriptionScreen: React.FC<SubscriptionScreenProps> = ({ navigation }) => {
  const [selectedPlan, setSelectedPlan] = useState<string>('premium');

  const handleSubscribe = (planId: string) => {
    const plan = SUBSCRIPTION_PLANS.find(p => p.id === planId);
    if (!plan) return;

    if (planId === 'free') {
      Alert.alert('Version gratuite', 'Vous utilisez déjà la version gratuite');
      return;
    }

    Alert.alert(
      'Abonnement Premium',
      `Voulez-vous vous abonner au plan ${plan.name} pour ${plan.price}€/mois ?`,
      [
        { text: 'Annuler', style: 'cancel' },
        { 
          text: 'Confirmer', 
          onPress: () => {
            Alert.alert(
              'Abonnement confirmé',
              'Votre abonnement Premium a été activé avec succès !',
              [{ text: 'OK', onPress: () => navigation.goBack() }]
            );
          }
        },
      ]
    );
  };

  const PlanCard = ({ plan }: { plan: SubscriptionPlan }) => (
    <TouchableOpacity
      style={[
        styles.planCard,
        selectedPlan === plan.id && styles.planCardSelected,
        plan.isPopular && styles.planCardPopular
      ]}
      onPress={() => setSelectedPlan(plan.id)}
    >
      {plan.isPopular && (
        <View style={styles.popularBadge}>
          <Text style={styles.popularText}>Le plus populaire</Text>
        </View>
      )}
      
      <View style={styles.planHeader}>
        <Text style={styles.planName}>{plan.name}</Text>
        <View style={styles.planPrice}>
          <Text style={styles.planPriceValue}>{plan.price}</Text>
          <Text style={styles.planPriceCurrency}>{plan.currency}</Text>
          <Text style={styles.planPricePeriod}>/mois</Text>
        </View>
      </View>

      <View style={styles.planFeatures}>
        {plan.features.map((feature, index) => (
          <View key={index} style={styles.featureItem}>
            <Icon name="check" size={16} color={COLORS.success} />
            <Text style={styles.featureText}>{feature}</Text>
          </View>
        ))}
      </View>

      <TouchableOpacity 
        style={[
          styles.subscribeButton,
          selectedPlan === plan.id && styles.subscribeButtonSelected
        ]}
        onPress={() => handleSubscribe(plan.id)}
      >
        <Text style={[
          styles.subscribeButtonText,
          selectedPlan === plan.id && styles.subscribeButtonTextSelected
        ]}>
          {plan.id === 'free' ? 'Version actuelle' : 'Choisir ce plan'}
        </Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  const BenefitItem = ({ icon, title, description }: {
    icon: string;
    title: string;
    description: string;
  }) => (
    <View style={styles.benefitItem}>
      <View style={styles.benefitIcon}>
        <Icon name={icon} size={24} color={COLORS.primary} />
      </View>
      <View style={styles.benefitContent}>
        <Text style={styles.benefitTitle}>{title}</Text>
        <Text style={styles.benefitDescription}>{description}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Icon name="arrow-back" size={24} color={COLORS.surface} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Abonnement</Text>
          <View style={styles.placeholder} />
        </View>

        {/* Benefits Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Pourquoi passer à Premium ?</Text>
          <BenefitItem
            icon="psychology"
            title="Analyse IA avancée"
            description="Obtenez des recommandations personnalisées pour améliorer votre plan d'affaires"
          />
          <BenefitItem
            icon="description"
            title="Modèles illimités"
            description="Accédez à tous nos modèles professionnels et spécialisés par secteur"
          />
          <BenefitItem
            icon="support"
            title="Support prioritaire"
            description="Bénéficiez d'un support client dédié avec réponse rapide"
          />
          <BenefitItem
            icon="trending-up"
            title="Fonctionnalités avancées"
            description="Export PDF professionnel, intégrations comptables et plus encore"
          />
        </View>

        {/* Plans Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Choisissez votre plan</Text>
          <View style={styles.plansContainer}>
            {SUBSCRIPTION_PLANS.map((plan) => (
              <PlanCard key={plan.id} plan={plan} />
            ))}
          </View>
        </View>

        {/* FAQ Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Questions fréquentes</Text>
          
          <View style={styles.faqItem}>
            <Text style={styles.faqQuestion}>
              Puis-je annuler mon abonnement à tout moment ?
            </Text>
            <Text style={styles.faqAnswer}>
              Oui, vous pouvez annuler votre abonnement à tout moment depuis les paramètres de votre compte.
            </Text>
          </View>

          <View style={styles.faqItem}>
            <Text style={styles.faqQuestion}>
              Que se passe-t-il si je reviens à la version gratuite ?
            </Text>
            <Text style={styles.faqAnswer}>
              Vous gardez accès à vos documents existants, mais les fonctionnalités premium seront désactivées.
            </Text>
          </View>

          <View style={styles.faqItem}>
            <Text style={styles.faqQuestion}>
              Y a-t-il un essai gratuit ?
            </Text>
            <Text style={styles.faqAnswer}>
              Oui, vous bénéficiez de 7 jours d'essai gratuit pour tester toutes les fonctionnalités premium.
            </Text>
          </View>
        </View>

        {/* Contact Support */}
        <View style={styles.section}>
          <View style={styles.supportCard}>
            <Icon name="help" size={24} color={COLORS.primary} />
            <View style={styles.supportContent}>
              <Text style={styles.supportTitle}>Besoin d'aide ?</Text>
              <Text style={styles.supportDescription}>
                Notre équipe est là pour vous accompagner dans votre choix
              </Text>
            </View>
            <TouchableOpacity 
              style={styles.supportButton}
              onPress={() => navigation.navigate('Support')}
            >
              <Text style={styles.supportButtonText}>Contacter</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.primary,
    padding: 15,
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.surface,
  },
  placeholder: {
    width: 34,
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 20,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: COLORS.surface,
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  benefitIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  benefitContent: {
    flex: 1,
  },
  benefitTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 5,
  },
  benefitDescription: {
    fontSize: 14,
    color: COLORS.textSecondary,
    lineHeight: 20,
  },
  plansContainer: {
    gap: 20,
  },
  planCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: 20,
    borderWidth: 2,
    borderColor: 'transparent',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  planCardSelected: {
    borderColor: COLORS.primary,
  },
  planCardPopular: {
    borderColor: COLORS.secondary,
  },
  popularBadge: {
    position: 'absolute',
    top: -10,
    left: 20,
    right: 20,
    backgroundColor: COLORS.secondary,
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 15,
    alignItems: 'center',
  },
  popularText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.surface,
  },
  planHeader: {
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 10,
  },
  planName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 10,
  },
  planPrice: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  planPriceValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  planPriceCurrency: {
    fontSize: 16,
    color: COLORS.primary,
    marginLeft: 2,
  },
  planPricePeriod: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginLeft: 2,
  },
  planFeatures: {
    marginBottom: 20,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  featureText: {
    fontSize: 14,
    color: COLORS.text,
    marginLeft: 10,
    flex: 1,
  },
  subscribeButton: {
    backgroundColor: COLORS.background,
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  subscribeButtonSelected: {
    backgroundColor: COLORS.primary,
  },
  subscribeButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.primary,
  },
  subscribeButtonTextSelected: {
    color: COLORS.surface,
  },
  faqItem: {
    backgroundColor: COLORS.surface,
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  faqQuestion: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 8,
  },
  faqAnswer: {
    fontSize: 14,
    color: COLORS.textSecondary,
    lineHeight: 20,
  },
  supportCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primaryLight,
    padding: 20,
    borderRadius: 8,
  },
  supportContent: {
    flex: 1,
    marginLeft: 15,
  },
  supportTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.surface,
    marginBottom: 5,
  },
  supportDescription: {
    fontSize: 14,
    color: COLORS.surface,
    opacity: 0.9,
  },
  supportButton: {
    backgroundColor: COLORS.surface,
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  supportButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.primary,
  },
});

export default SubscriptionScreen;