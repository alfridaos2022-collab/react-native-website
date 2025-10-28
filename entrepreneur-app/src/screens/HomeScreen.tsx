import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Colors } from '@/constants/colors';
import Card from '@/components/Card';
import Button from '@/components/Button';

interface QuickActionProps {
  title: string;
  description: string;
  icon: string;
  color: string;
  onPress: () => void;
}

function QuickAction({ title, description, icon, color, onPress }: QuickActionProps) {
  return (
    <Card onPress={onPress} style={styles.quickActionCard}>
      <View style={styles.quickActionContent}>
        <View style={[styles.iconContainer, { backgroundColor: color }]}>
          <Icon name={icon} size={24} color={Colors.white} />
        </View>
        <View style={styles.quickActionText}>
          <Text style={styles.quickActionTitle}>{title}</Text>
          <Text style={styles.quickActionDescription}>{description}</Text>
        </View>
        <Icon name="chevron-right" size={24} color={Colors.gray400} />
      </View>
    </Card>
  );
}

export default function HomeScreen() {
  const navigation = useNavigation<any>();

  const quickActions = [
    {
      title: 'Nouveau plan d\'affaires',
      description: 'Créer un plan d\'affaires avec nos modèles',
      icon: 'description',
      color: Colors.primary,
      onPress: () => navigation.navigate('BusinessPlanEditor'),
    },
    {
      title: 'Créer un devis',
      description: 'Générer un devis professionnel',
      icon: 'receipt',
      color: Colors.secondary,
      onPress: () => navigation.navigate('QuoteEditor'),
    },
    {
      title: 'Gérer mon budget',
      description: 'Suivre mes revenus et dépenses',
      icon: 'account-balance-wallet',
      color: Colors.accent,
      onPress: () => navigation.navigate('Budget'),
    },
    {
      title: 'Démarches administratives',
      description: 'Guide pour créer votre entreprise',
      icon: 'folder',
      color: Colors.info,
      onPress: () => navigation.navigate('Administrative'),
    },
  ];

  const recentStats = [
    { label: 'Plans d\'affaires', value: '3', icon: 'description' },
    { label: 'Devis envoyés', value: '12', icon: 'receipt' },
    { label: 'Budget actuel', value: '15 420€', icon: 'euro' },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.greeting}>Bonjour ! 👋</Text>
          <Text style={styles.subtitle}>
            Bienvenue dans Entreprise Facile
          </Text>
        </View>
        <TouchableOpacity
          style={styles.profileButton}
          onPress={() => navigation.navigate('Profile')}
        >
          <Icon name="account-circle" size={32} color={Colors.white} />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <Card style={styles.welcomeCard}>
          <Text style={styles.welcomeTitle}>
            Votre assistant entrepreneurial
          </Text>
          <Text style={styles.welcomeText}>
            Créez vos plans d'affaires, gérez vos devis et budgets, et suivez
            vos démarches administratives en toute simplicité.
          </Text>
          <Button
            title="Commencer"
            onPress={() => navigation.navigate('BusinessPlanEditor')}
            style={styles.welcomeButton}
          />
        </Card>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Aperçu rapide</Text>
          <View style={styles.statsContainer}>
            {recentStats.map((stat, index) => (
              <Card key={index} style={styles.statCard}>
                <View style={styles.statContent}>
                  <Icon
                    name={stat.icon}
                    size={24}
                    color={Colors.primary}
                    style={styles.statIcon}
                  />
                  <Text style={styles.statValue}>{stat.value}</Text>
                  <Text style={styles.statLabel}>{stat.label}</Text>
                </View>
              </Card>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Actions rapides</Text>
          {quickActions.map((action, index) => (
            <QuickAction key={index} {...action} />
          ))}
        </View>

        <Card style={styles.tipsCard}>
          <View style={styles.tipsHeader}>
            <Icon name="lightbulb" size={24} color={Colors.accent} />
            <Text style={styles.tipsTitle}>Conseil du jour</Text>
          </View>
          <Text style={styles.tipsText}>
            Un bon plan d'affaires doit être clair, concis et réaliste. 
            Concentrez-vous sur les éléments essentiels et utilisez des 
            données concrètes pour étayer vos projections.
          </Text>
        </Card>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerContent: {
    flex: 1,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.white,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.white,
    opacity: 0.9,
  },
  profileButton: {
    padding: 4,
  },
  content: {
    padding: 16,
  },
  welcomeCard: {
    marginBottom: 24,
  },
  welcomeTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginBottom: 8,
  },
  welcomeText: {
    fontSize: 16,
    color: Colors.textSecondary,
    lineHeight: 24,
    marginBottom: 16,
  },
  welcomeButton: {
    alignSelf: 'flex-start',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginBottom: 12,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statCard: {
    flex: 1,
    marginHorizontal: 4,
  },
  statContent: {
    alignItems: 'center',
  },
  statIcon: {
    marginBottom: 8,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  quickActionCard: {
    marginBottom: 12,
  },
  quickActionContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  quickActionText: {
    flex: 1,
  },
  quickActionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  quickActionDescription: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  tipsCard: {
    backgroundColor: Colors.accent + '10',
    borderColor: Colors.accent + '30',
    borderWidth: 1,
  },
  tipsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  tipsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginLeft: 8,
  },
  tipsText: {
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
});