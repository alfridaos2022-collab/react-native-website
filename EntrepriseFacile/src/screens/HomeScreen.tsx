import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
} from 'react-native';
import {
  Card,
  Title,
  Paragraph,
  Button,
  Surface,
  Text,
  useTheme,
} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';

const {width} = Dimensions.get('window');

const HomeScreen: React.FC = () => {
  const navigation = useNavigation();
  const theme = useTheme();

  const quickActions = [
    {
      title: 'Nouveau Plan d\'Affaires',
      description: 'Créer un plan d\'affaires complet',
      icon: 'business',
      color: '#2E7D32',
      onPress: () => navigation.navigate('BusinessPlan', {screen: 'CreateBusinessPlan'}),
    },
    {
      title: 'Créer un Devis',
      description: 'Générer un devis professionnel',
      icon: 'description',
      color: '#1976D2',
      onPress: () => navigation.navigate('Quote', {screen: 'CreateQuote'}),
    },
    {
      title: 'Gestion Budget',
      description: 'Suivre vos finances',
      icon: 'account-balance-wallet',
      color: '#7B1FA2',
      onPress: () => navigation.navigate('Budget', {screen: 'CreateBudget'}),
    },
    {
      title: 'Démarches Admin',
      description: 'Guide administratif',
      icon: 'admin-panel-settings',
      color: '#D32F2F',
      onPress: () => navigation.navigate('Admin'),
    },
  ];

  const stats = [
    {label: 'Plans d\'Affaires', value: '3', icon: 'business'},
    {label: 'Devis Envoyés', value: '12', icon: 'description'},
    {label: 'Budget Mensuel', value: '€2,500', icon: 'account-balance-wallet'},
    {label: 'Tâches Admin', value: '5', icon: 'admin-panel-settings'},
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Header avec gradient */}
      <LinearGradient
        colors={[theme.colors.primary, theme.colors.accent]}
        style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.welcomeText}>Bienvenue dans</Text>
          <Text style={styles.appTitle}>Entreprise Facile</Text>
          <Text style={styles.subtitle}>
            Votre assistant pour créer et gérer votre entreprise
          </Text>
        </View>
      </LinearGradient>

      {/* Actions rapides */}
      <View style={styles.section}>
        <Title style={styles.sectionTitle}>Actions Rapides</Title>
        <View style={styles.quickActionsGrid}>
          {quickActions.map((action, index) => (
            <Card
              key={index}
              style={[styles.actionCard, {backgroundColor: action.color}]}
              onPress={action.onPress}>
              <Card.Content style={styles.actionCardContent}>
                <Icon name={action.icon} size={32} color="white" />
                <Text style={styles.actionTitle}>{action.title}</Text>
                <Text style={styles.actionDescription}>{action.description}</Text>
              </Card.Content>
            </Card>
          ))}
        </View>
      </View>

      {/* Statistiques */}
      <View style={styles.section}>
        <Title style={styles.sectionTitle}>Vue d'Ensemble</Title>
        <View style={styles.statsGrid}>
          {stats.map((stat, index) => (
            <Surface key={index} style={styles.statCard} elevation={2}>
              <Icon name={stat.icon} size={24} color={theme.colors.primary} />
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </Surface>
          ))}
        </View>
      </View>

      {/* Conseils du jour */}
      <View style={styles.section}>
        <Title style={styles.sectionTitle}>Conseil du Jour</Title>
        <Card style={styles.tipCard}>
          <Card.Content>
            <View style={styles.tipHeader}>
              <Icon name="lightbulb-outline" size={24} color={theme.colors.warning} />
              <Title style={styles.tipTitle}>💡 Astuce Entrepreneur</Title>
            </View>
            <Paragraph style={styles.tipText}>
              Un plan d'affaires solide est la base de toute entreprise réussie. 
              Prenez le temps de bien définir votre proposition de valeur et votre 
              modèle économique avant de vous lancer.
            </Paragraph>
          </Card.Content>
        </Card>
      </View>

      {/* Prochaines étapes */}
      <View style={styles.section}>
        <Title style={styles.sectionTitle}>Prochaines Étapes</Title>
        <Card style={styles.nextStepsCard}>
          <Card.Content>
            <View style={styles.nextStepItem}>
              <Icon name="check-circle" size={20} color={theme.colors.success} />
              <Text style={styles.nextStepText}>Finaliser votre plan d'affaires</Text>
            </View>
            <View style={styles.nextStepItem}>
              <Icon name="radio-button-unchecked" size={20} color={theme.colors.placeholder} />
              <Text style={styles.nextStepText}>Créer vos premiers devis</Text>
            </View>
            <View style={styles.nextStepItem}>
              <Icon name="radio-button-unchecked" size={20} color={theme.colors.placeholder} />
              <Text style={styles.nextStepText}>Établir votre budget prévisionnel</Text>
            </View>
          </Card.Content>
        </Card>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    paddingTop: 50,
    paddingBottom: 30,
    paddingHorizontal: 20,
  },
  headerContent: {
    alignItems: 'center',
  },
  welcomeText: {
    color: 'white',
    fontSize: 16,
    opacity: 0.9,
  },
  appTitle: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 5,
  },
  subtitle: {
    color: 'white',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 10,
    opacity: 0.9,
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#212121',
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionCard: {
    width: (width - 60) / 2,
    marginBottom: 15,
    borderRadius: 12,
  },
  actionCardContent: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  actionTitle: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
  },
  actionDescription: {
    color: 'white',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 5,
    opacity: 0.9,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statCard: {
    width: (width - 60) / 2,
    padding: 20,
    marginBottom: 15,
    borderRadius: 12,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#212121',
    marginTop: 10,
  },
  statLabel: {
    fontSize: 12,
    color: '#757575',
    textAlign: 'center',
    marginTop: 5,
  },
  tipCard: {
    borderRadius: 12,
  },
  tipHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  tipTitle: {
    fontSize: 16,
    marginLeft: 10,
  },
  tipText: {
    fontSize: 14,
    lineHeight: 20,
  },
  nextStepsCard: {
    borderRadius: 12,
  },
  nextStepItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  nextStepText: {
    marginLeft: 10,
    fontSize: 14,
  },
});

export default HomeScreen;