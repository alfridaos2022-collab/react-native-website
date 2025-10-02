import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { SafeAreaView } from 'react-native-safe-area-context';

import { COLORS, BUSINESS_TYPES } from '../../constants';
import { BusinessPlan, User } from '../../types';

interface HomeScreenProps {
  navigation: any;
}

const { width } = Dimensions.get('window');

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  // Mock data - in real app, this would come from state management
  const user: User = {
    id: '1',
    email: 'user@example.com',
    name: 'Jean Dupont',
    subscriptionType: 'free',
    createdAt: new Date(),
    lastLogin: new Date(),
  };

  const recentPlans: BusinessPlan[] = [
    {
      id: '1',
      userId: '1',
      title: 'Mon Restaurant',
      industry: 'restaurant',
      businessType: 'restaurant',
      status: 'draft',
      createdAt: new Date(),
      updatedAt: new Date(),
      sections: [],
    },
  ];

  const QuickActionCard = ({ 
    title, 
    description, 
    icon, 
    onPress, 
    color = COLORS.primary 
  }: {
    title: string;
    description: string;
    icon: string;
    onPress: () => void;
    color?: string;
  }) => (
    <TouchableOpacity style={[styles.quickActionCard, { borderLeftColor: color }]} onPress={onPress}>
      <Icon name={icon} size={24} color={color} style={styles.quickActionIcon} />
      <View style={styles.quickActionContent}>
        <Text style={styles.quickActionTitle}>{title}</Text>
        <Text style={styles.quickActionDescription}>{description}</Text>
      </View>
      <Icon name="chevron-right" size={20} color={COLORS.textSecondary} />
    </TouchableOpacity>
  );

  const BusinessTypeCard = ({ type }: { type: { value: string; label: string } }) => (
    <TouchableOpacity 
      style={styles.businessTypeCard}
      onPress={() => navigation.navigate('Documents', { 
        screen: 'BusinessPlanCreate',
        params: { businessType: type.value }
      })}
    >
      <Text style={styles.businessTypeLabel}>{type.label}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Welcome Section */}
        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeText}>Bonjour, {user.name}!</Text>
          <Text style={styles.subtitle}>Créez votre plan d'affaires en quelques étapes</Text>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Actions rapides</Text>
          <QuickActionCard
            title="Nouveau plan d'affaires"
            description="Créez un plan d'affaires personnalisé"
            icon="add-business"
            onPress={() => navigation.navigate('Documents', { screen: 'BusinessPlanCreate' })}
          />
          <QuickActionCard
            title="Mes modèles"
            description="Explorez nos modèles de documents"
            icon="description"
            onPress={() => navigation.navigate('Documents', { screen: 'Templates' })}
            color={COLORS.secondary}
          />
          <QuickActionCard
            title="Analyse IA"
            description="Analysez votre plan avec l'IA"
            icon="psychology"
            onPress={() => {/* Navigate to AI analysis */}}
            color={COLORS.info}
          />
        </View>

        {/* Business Types */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Types d'entreprise</Text>
          <View style={styles.businessTypesGrid}>
            {BUSINESS_TYPES.slice(0, 6).map((type) => (
              <BusinessTypeCard key={type.value} type={type} />
            ))}
          </View>
        </View>

        {/* Recent Plans */}
        {recentPlans.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Plans récents</Text>
            {recentPlans.map((plan) => (
              <TouchableOpacity 
                key={plan.id} 
                style={styles.recentPlanCard}
                onPress={() => navigation.navigate('Documents', { 
                  screen: 'BusinessPlanEdit',
                  params: { planId: plan.id }
                })}
              >
                <View style={styles.recentPlanContent}>
                  <Text style={styles.recentPlanTitle}>{plan.title}</Text>
                  <Text style={styles.recentPlanSubtitle}>
                    {BUSINESS_TYPES.find(t => t.value === plan.businessType)?.label}
                  </Text>
                  <Text style={styles.recentPlanDate}>
                    Modifié le {plan.updatedAt.toLocaleDateString('fr-FR')}
                  </Text>
                </View>
                <Icon name="chevron-right" size={20} color={COLORS.textSecondary} />
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* Subscription Status */}
        <View style={styles.section}>
          <View style={styles.subscriptionCard}>
            <View style={styles.subscriptionContent}>
              <Text style={styles.subscriptionTitle}>
                {user.subscriptionType === 'free' ? 'Version Gratuite' : 'Version Premium'}
              </Text>
              <Text style={styles.subscriptionDescription}>
                {user.subscriptionType === 'free' 
                  ? 'Passez à Premium pour débloquer toutes les fonctionnalités'
                  : 'Profitez de toutes les fonctionnalités premium'
                }
              </Text>
            </View>
            {user.subscriptionType === 'free' && (
              <TouchableOpacity 
                style={styles.upgradeButton}
                onPress={() => navigation.navigate('Profile', { screen: 'Subscription' })}
              >
                <Text style={styles.upgradeButtonText}>Upgrade</Text>
              </TouchableOpacity>
            )}
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
  welcomeSection: {
    padding: 20,
    backgroundColor: COLORS.surface,
    marginBottom: 10,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.textSecondary,
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 15,
  },
  quickActionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    borderLeftWidth: 4,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  quickActionIcon: {
    marginRight: 15,
  },
  quickActionContent: {
    flex: 1,
  },
  quickActionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 2,
  },
  quickActionDescription: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  businessTypesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  businessTypeCard: {
    width: (width - 60) / 2,
    backgroundColor: COLORS.surface,
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  businessTypeLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.text,
    textAlign: 'center',
  },
  recentPlanCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  recentPlanContent: {
    flex: 1,
  },
  recentPlanTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 2,
  },
  recentPlanSubtitle: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: 2,
  },
  recentPlanDate: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  subscriptionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primaryLight,
    padding: 15,
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  subscriptionContent: {
    flex: 1,
  },
  subscriptionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.surface,
    marginBottom: 2,
  },
  subscriptionDescription: {
    fontSize: 14,
    color: COLORS.surface,
    opacity: 0.9,
  },
  upgradeButton: {
    backgroundColor: COLORS.surface,
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  upgradeButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.primary,
  },
});

export default HomeScreen;