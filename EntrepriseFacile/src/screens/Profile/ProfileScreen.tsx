import React from 'react';
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
import { User } from '../../types';

interface ProfileScreenProps {
  navigation: any;
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({ navigation }) => {
  // Mock user data - in real app, this would come from state management
  const user: User = {
    id: '1',
    email: 'user@example.com',
    name: 'Jean Dupont',
    subscriptionType: 'free',
    createdAt: new Date('2024-01-01'),
    lastLogin: new Date(),
  };

  const currentPlan = SUBSCRIPTION_PLANS.find(plan => plan.id === user.subscriptionType);

  const handleLogout = () => {
    Alert.alert(
      'Déconnexion',
      'Êtes-vous sûr de vouloir vous déconnecter ?',
      [
        { text: 'Annuler', style: 'cancel' },
        { 
          text: 'Déconnexion', 
          style: 'destructive',
          onPress: () => {
            // Handle logout logic
            console.log('User logged out');
          }
        },
      ]
    );
  };

  const ProfileItem = ({ 
    icon, 
    title, 
    subtitle, 
    onPress, 
    showChevron = true 
  }: {
    icon: string;
    title: string;
    subtitle?: string;
    onPress: () => void;
    showChevron?: boolean;
  }) => (
    <TouchableOpacity style={styles.profileItem} onPress={onPress}>
      <View style={styles.profileItemLeft}>
        <View style={styles.profileItemIcon}>
          <Icon name={icon} size={24} color={COLORS.primary} />
        </View>
        <View style={styles.profileItemContent}>
          <Text style={styles.profileItemTitle}>{title}</Text>
          {subtitle && (
            <Text style={styles.profileItemSubtitle}>{subtitle}</Text>
          )}
        </View>
      </View>
      {showChevron && (
        <Icon name="chevron-right" size={20} color={COLORS.textSecondary} />
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* User Info */}
        <View style={styles.userSection}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {user.name.split(' ').map(n => n[0]).join('')}
              </Text>
            </View>
          </View>
          <Text style={styles.userName}>{user.name}</Text>
          <Text style={styles.userEmail}>{user.email}</Text>
          <View style={styles.userStats}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>3</Text>
              <Text style={styles.statLabel}>Plans créés</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>1</Text>
              <Text style={styles.statLabel}>Terminés</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>2</Text>
              <Text style={styles.statLabel}>En cours</Text>
            </View>
          </View>
        </View>

        {/* Subscription Status */}
        <View style={styles.section}>
          <View style={styles.subscriptionCard}>
            <View style={styles.subscriptionHeader}>
              <Icon name="star" size={24} color={COLORS.secondary} />
              <Text style={styles.subscriptionTitle}>
                {currentPlan?.name}
              </Text>
            </View>
            <Text style={styles.subscriptionDescription}>
              {user.subscriptionType === 'free' 
                ? 'Passez à Premium pour débloquer toutes les fonctionnalités'
                : 'Profitez de toutes les fonctionnalités premium'
              }
            </Text>
            {user.subscriptionType === 'free' && (
              <TouchableOpacity 
                style={styles.upgradeButton}
                onPress={() => navigation.navigate('Subscription')}
              >
                <Text style={styles.upgradeButtonText}>Passer à Premium</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Account Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Compte</Text>
          <ProfileItem
            icon="person"
            title="Informations personnelles"
            subtitle="Modifier votre profil"
            onPress={() => {/* Navigate to edit profile */}}
          />
          <ProfileItem
            icon="security"
            title="Sécurité"
            subtitle="Mot de passe et authentification"
            onPress={() => {/* Navigate to security settings */}}
          />
          <ProfileItem
            icon="notifications"
            title="Notifications"
            subtitle="Gérer vos préférences"
            onPress={() => {/* Navigate to notification settings */}}
          />
        </View>

        {/* App Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Application</Text>
          <ProfileItem
            icon="settings"
            title="Paramètres"
            subtitle="Préférences de l'application"
            onPress={() => navigation.navigate('Settings')}
          />
          <ProfileItem
            icon="help"
            title="Aide et support"
            subtitle="FAQ et contact"
            onPress={() => navigation.navigate('Support')}
          />
          <ProfileItem
            icon="info"
            title="À propos"
            subtitle="Version et informations"
            onPress={() => {
              Alert.alert(
                'Entreprise Facile',
                'Version 1.0.0\n\nUne application pour créer facilement vos plans d\'affaires.',
                [{ text: 'OK' }]
              );
            }}
          />
        </View>

        {/* Logout */}
        <View style={styles.section}>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Icon name="logout" size={24} color={COLORS.error} />
            <Text style={styles.logoutText}>Se déconnecter</Text>
          </TouchableOpacity>
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
  userSection: {
    alignItems: 'center',
    padding: 30,
    backgroundColor: COLORS.surface,
    marginBottom: 10,
  },
  avatarContainer: {
    marginBottom: 15,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.surface,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 5,
  },
  userEmail: {
    fontSize: 16,
    color: COLORS.textSecondary,
    marginBottom: 20,
  },
  userStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 15,
    marginTop: 10,
  },
  subscriptionCard: {
    backgroundColor: COLORS.primaryLight,
    borderRadius: 8,
    padding: 20,
    alignItems: 'center',
  },
  subscriptionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  subscriptionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.surface,
    marginLeft: 10,
  },
  subscriptionDescription: {
    fontSize: 14,
    color: COLORS.surface,
    textAlign: 'center',
    marginBottom: 15,
    opacity: 0.9,
  },
  upgradeButton: {
    backgroundColor: COLORS.surface,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  upgradeButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.primary,
  },
  profileItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.surface,
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  profileItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  profileItemIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  profileItemContent: {
    flex: 1,
  },
  profileItemTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.text,
    marginBottom: 2,
  },
  profileItemSubtitle: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.surface,
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.error,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.error,
    marginLeft: 10,
  },
});

export default ProfileScreen;