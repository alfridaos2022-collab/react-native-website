import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { SafeAreaView } from 'react-native-safe-area-context';

import { COLORS } from '../../constants';

interface SettingsScreenProps {
  navigation: any;
}

const SettingsScreen: React.FC<SettingsScreenProps> = ({ navigation }) => {
  const [notifications, setNotifications] = useState(true);
  const [emailUpdates, setEmailUpdates] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [autoSave, setAutoSave] = useState(true);

  const SettingItem = ({ 
    icon, 
    title, 
    subtitle, 
    onPress, 
    rightComponent,
    showChevron = true 
  }: {
    icon: string;
    title: string;
    subtitle?: string;
    onPress?: () => void;
    rightComponent?: React.ReactNode;
    showChevron?: boolean;
  }) => (
    <TouchableOpacity 
      style={styles.settingItem} 
      onPress={onPress}
      disabled={!onPress}
    >
      <View style={styles.settingItemLeft}>
        <View style={styles.settingItemIcon}>
          <Icon name={icon} size={24} color={COLORS.primary} />
        </View>
        <View style={styles.settingItemContent}>
          <Text style={styles.settingItemTitle}>{title}</Text>
          {subtitle && (
            <Text style={styles.settingItemSubtitle}>{subtitle}</Text>
          )}
        </View>
      </View>
      <View style={styles.settingItemRight}>
        {rightComponent}
        {showChevron && onPress && (
          <Icon name="chevron-right" size={20} color={COLORS.textSecondary} />
        )}
      </View>
    </TouchableOpacity>
  );

  const handleClearCache = () => {
    Alert.alert(
      'Vider le cache',
      'Cette action supprimera tous les fichiers temporaires. Continuer ?',
      [
        { text: 'Annuler', style: 'cancel' },
        { 
          text: 'Vider', 
          style: 'destructive',
          onPress: () => {
            Alert.alert('Cache vidé', 'Le cache a été vidé avec succès');
          }
        },
      ]
    );
  };

  const handleExportData = () => {
    Alert.alert(
      'Exporter les données',
      'Vos données seront exportées au format JSON',
      [
        { text: 'Annuler', style: 'cancel' },
        { 
          text: 'Exporter', 
          onPress: () => {
            Alert.alert('Export réussi', 'Vos données ont été exportées');
          }
        },
      ]
    );
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      'Supprimer le compte',
      'Cette action est irréversible. Toutes vos données seront définitivement supprimées.',
      [
        { text: 'Annuler', style: 'cancel' },
        { 
          text: 'Supprimer', 
          style: 'destructive',
          onPress: () => {
            Alert.alert(
              'Confirmation finale',
              'Êtes-vous absolument sûr de vouloir supprimer votre compte ?',
              [
                { text: 'Non', style: 'cancel' },
                { 
                  text: 'Oui, supprimer', 
                  style: 'destructive',
                  onPress: () => {
                    Alert.alert('Compte supprimé', 'Votre compte a été supprimé');
                  }
                },
              ]
            );
          }
        },
      ]
    );
  };

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
          <Text style={styles.headerTitle}>Paramètres</Text>
          <View style={styles.placeholder} />
        </View>

        {/* General Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Général</Text>
          
          <SettingItem
            icon="notifications"
            title="Notifications"
            subtitle="Recevoir des notifications push"
            rightComponent={
              <Switch
                value={notifications}
                onValueChange={setNotifications}
                trackColor={{ false: COLORS.textSecondary, true: COLORS.primaryLight }}
                thumbColor={notifications ? COLORS.primary : COLORS.textSecondary}
              />
            }
            showChevron={false}
          />

          <SettingItem
            icon="email"
            title="Mises à jour par email"
            subtitle="Recevoir des emails sur les nouvelles fonctionnalités"
            rightComponent={
              <Switch
                value={emailUpdates}
                onValueChange={setEmailUpdates}
                trackColor={{ false: COLORS.textSecondary, true: COLORS.primaryLight }}
                thumbColor={emailUpdates ? COLORS.primary : COLORS.textSecondary}
              />
            }
            showChevron={false}
          />

          <SettingItem
            icon="dark-mode"
            title="Mode sombre"
            subtitle="Activer le thème sombre"
            rightComponent={
              <Switch
                value={darkMode}
                onValueChange={setDarkMode}
                trackColor={{ false: COLORS.textSecondary, true: COLORS.primaryLight }}
                thumbColor={darkMode ? COLORS.primary : COLORS.textSecondary}
              />
            }
            showChevron={false}
          />
        </View>

        {/* Document Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Documents</Text>
          
          <SettingItem
            icon="save"
            title="Sauvegarde automatique"
            subtitle="Sauvegarder automatiquement vos modifications"
            rightComponent={
              <Switch
                value={autoSave}
                onValueChange={setAutoSave}
                trackColor={{ false: COLORS.textSecondary, true: COLORS.primaryLight }}
                thumbColor={autoSave ? COLORS.primary : COLORS.textSecondary}
              />
            }
            showChevron={false}
          />

          <SettingItem
            icon="folder"
            title="Dossier de sauvegarde"
            subtitle="Choisir l'emplacement de sauvegarde"
            onPress={() => {
              Alert.alert('Dossier de sauvegarde', 'Fonctionnalité à implémenter');
            }}
          />

          <SettingItem
            icon="format-size"
            title="Taille de police"
            subtitle="Ajuster la taille du texte"
            onPress={() => {
              Alert.alert('Taille de police', 'Fonctionnalité à implémenter');
            }}
          />
        </View>

        {/* Privacy & Security */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Confidentialité et sécurité</Text>
          
          <SettingItem
            icon="security"
            title="Changer le mot de passe"
            subtitle="Modifier votre mot de passe"
            onPress={() => {
              Alert.alert('Changer le mot de passe', 'Fonctionnalité à implémenter');
            }}
          />

          <SettingItem
            icon="fingerprint"
            title="Authentification biométrique"
            subtitle="Utiliser l'empreinte digitale ou Face ID"
            onPress={() => {
              Alert.alert('Authentification biométrique', 'Fonctionnalité à implémenter');
            }}
          />

          <SettingItem
            icon="privacy-tip"
            title="Politique de confidentialité"
            subtitle="Lire notre politique de confidentialité"
            onPress={() => {
              Alert.alert('Politique de confidentialité', 'Fonctionnalité à implémenter');
            }}
          />
        </View>

        {/* Data Management */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Gestion des données</Text>
          
          <SettingItem
            icon="download"
            title="Exporter mes données"
            subtitle="Télécharger une copie de vos données"
            onPress={handleExportData}
          />

          <SettingItem
            icon="delete-sweep"
            title="Vider le cache"
            subtitle="Libérer de l'espace de stockage"
            onPress={handleClearCache}
          />

          <SettingItem
            icon="storage"
            title="Espace de stockage"
            subtitle="Voir l'utilisation de l'espace"
            onPress={() => {
              Alert.alert('Espace de stockage', 'Fonctionnalité à implémenter');
            }}
          />
        </View>

        {/* About */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>À propos</Text>
          
          <SettingItem
            icon="info"
            title="Version de l'application"
            subtitle="1.0.0"
            showChevron={false}
          />

          <SettingItem
            icon="description"
            title="Conditions d'utilisation"
            subtitle="Lire les conditions d'utilisation"
            onPress={() => {
              Alert.alert('Conditions d\'utilisation', 'Fonctionnalité à implémenter');
            }}
          />

          <SettingItem
            icon="rate-review"
            title="Évaluer l'application"
            subtitle="Donner votre avis sur l'App Store"
            onPress={() => {
              Alert.alert('Évaluer l\'application', 'Fonctionnalité à implémenter');
            }}
          />
        </View>

        {/* Danger Zone */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Zone de danger</Text>
          
          <SettingItem
            icon="delete-forever"
            title="Supprimer mon compte"
            subtitle="Supprimer définitivement votre compte et toutes vos données"
            onPress={handleDeleteAccount}
            showChevron={false}
          />
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
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 15,
    marginTop: 20,
  },
  settingItem: {
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
  settingItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingItemIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  settingItemContent: {
    flex: 1,
  },
  settingItemTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.text,
    marginBottom: 2,
  },
  settingItemSubtitle: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  settingItemRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default SettingsScreen;