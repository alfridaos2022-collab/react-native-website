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
import { Colors } from '@/constants/colors';
import Card from '@/components/Card';

interface SettingItemProps {
  title: string;
  subtitle?: string;
  icon: string;
  value?: boolean;
  onPress?: () => void;
  onValueChange?: (value: boolean) => void;
  showArrow?: boolean;
}

function SettingItem({ 
  title, 
  subtitle, 
  icon, 
  value, 
  onPress, 
  onValueChange,
  showArrow = false 
}: SettingItemProps) {
  return (
    <TouchableOpacity
      style={styles.settingItem}
      onPress={onPress}
      disabled={!onPress}
    >
      <View style={styles.settingIcon}>
        <Icon name={icon} size={24} color={Colors.primary} />
      </View>
      <View style={styles.settingContent}>
        <Text style={styles.settingTitle}>{title}</Text>
        {subtitle && (
          <Text style={styles.settingSubtitle}>{subtitle}</Text>
        )}
      </View>
      <View style={styles.settingAction}>
        {onValueChange && (
          <Switch
            value={value}
            onValueChange={onValueChange}
            trackColor={{ false: Colors.gray300, true: Colors.primary + '40' }}
            thumbColor={value ? Colors.primary : Colors.gray400}
          />
        )}
        {showArrow && (
          <Icon name="chevron-right" size={24} color={Colors.gray400} />
        )}
      </View>
    </TouchableOpacity>
  );
}

export default function SettingsScreen() {
  const [settings, setSettings] = useState({
    notifications: true,
    emailNotifications: true,
    autoSave: true,
    darkMode: false,
    biometric: false,
    analytics: true,
  });

  const updateSetting = (key: string, value: boolean) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleExportData = () => {
    Alert.alert(
      'Exporter les données',
      'Vos données seront exportées au format JSON',
      [
        { text: 'Annuler', style: 'cancel' },
        { text: 'Exporter', onPress: () => console.log('Export data') }
      ]
    );
  };

  const handleDeleteData = () => {
    Alert.alert(
      'Supprimer toutes les données',
      'Cette action est irréversible. Toutes vos données seront supprimées définitivement.',
      [
        { text: 'Annuler', style: 'cancel' },
        { 
          text: 'Supprimer', 
          style: 'destructive',
          onPress: () => console.log('Delete all data')
        }
      ]
    );
  };

  const handleResetSettings = () => {
    Alert.alert(
      'Réinitialiser les paramètres',
      'Tous les paramètres seront remis à leur valeur par défaut.',
      [
        { text: 'Annuler', style: 'cancel' },
        { 
          text: 'Réinitialiser', 
          onPress: () => {
            setSettings({
              notifications: true,
              emailNotifications: true,
              autoSave: true,
              darkMode: false,
              biometric: false,
              analytics: true,
            });
            Alert.alert('Paramètres réinitialisés');
          }
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content}>
        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>Notifications</Text>
          <SettingItem
            title="Notifications push"
            subtitle="Recevoir des notifications sur votre appareil"
            icon="notifications"
            value={settings.notifications}
            onValueChange={(value) => updateSetting('notifications', value)}
          />
          <SettingItem
            title="Notifications par email"
            subtitle="Recevoir des notifications par email"
            icon="email"
            value={settings.emailNotifications}
            onValueChange={(value) => updateSetting('emailNotifications', value)}
          />
        </Card>

        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>Application</Text>
          <SettingItem
            title="Sauvegarde automatique"
            subtitle="Sauvegarder automatiquement vos modifications"
            icon="save"
            value={settings.autoSave}
            onValueChange={(value) => updateSetting('autoSave', value)}
          />
          <SettingItem
            title="Mode sombre"
            subtitle="Utiliser le thème sombre"
            icon="dark-mode"
            value={settings.darkMode}
            onValueChange={(value) => updateSetting('darkMode', value)}
          />
          <SettingItem
            title="Authentification biométrique"
            subtitle="Utiliser l'empreinte ou Face ID"
            icon="fingerprint"
            value={settings.biometric}
            onValueChange={(value) => updateSetting('biometric', value)}
          />
        </Card>

        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>Confidentialité</Text>
          <SettingItem
            title="Analyses d'usage"
            subtitle="Aider à améliorer l'application"
            icon="analytics"
            value={settings.analytics}
            onValueChange={(value) => updateSetting('analytics', value)}
          />
          <SettingItem
            title="Politique de confidentialité"
            subtitle="Consulter notre politique de confidentialité"
            icon="privacy-tip"
            showArrow
            onPress={() => Alert.alert('Politique de confidentialité', 'Fonctionnalité à implémenter')}
          />
          <SettingItem
            title="Conditions d'utilisation"
            subtitle="Consulter les conditions d'utilisation"
            icon="description"
            showArrow
            onPress={() => Alert.alert('Conditions d\'utilisation', 'Fonctionnalité à implémenter')}
          />
        </Card>

        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>Données</Text>
          <SettingItem
            title="Exporter mes données"
            subtitle="Télécharger toutes vos données"
            icon="file-download"
            showArrow
            onPress={handleExportData}
          />
          <SettingItem
            title="Sauvegarder dans le cloud"
            subtitle="Synchroniser avec Google Drive ou iCloud"
            icon="cloud-upload"
            showArrow
            onPress={() => Alert.alert('Sauvegarde cloud', 'Fonctionnalité à implémenter')}
          />
        </Card>

        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>Support</Text>
          <SettingItem
            title="Centre d'aide"
            subtitle="FAQ et guides d'utilisation"
            icon="help-center"
            showArrow
            onPress={() => Alert.alert('Centre d\'aide', 'Fonctionnalité à implémenter')}
          />
          <SettingItem
            title="Contacter le support"
            subtitle="Envoyer un message à l'équipe"
            icon="support-agent"
            showArrow
            onPress={() => Alert.alert('Support', 'Contactez-nous à support@entreprise-facile.fr')}
          />
          <SettingItem
            title="Signaler un bug"
            subtitle="Nous aider à corriger les problèmes"
            icon="bug-report"
            showArrow
            onPress={() => Alert.alert('Signaler un bug', 'Fonctionnalité à implémenter')}
          />
        </Card>

        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>Avancé</Text>
          <SettingItem
            title="Réinitialiser les paramètres"
            subtitle="Remettre tous les paramètres par défaut"
            icon="restore"
            showArrow
            onPress={handleResetSettings}
          />
          <SettingItem
            title="Vider le cache"
            subtitle="Supprimer les fichiers temporaires"
            icon="clear-all"
            showArrow
            onPress={() => Alert.alert('Cache vidé', 'Le cache a été vidé avec succès')}
          />
          <TouchableOpacity
            style={[styles.settingItem, styles.dangerItem]}
            onPress={handleDeleteData}
          >
            <View style={styles.settingIcon}>
              <Icon name="delete-forever" size={24} color={Colors.error} />
            </View>
            <View style={styles.settingContent}>
              <Text style={[styles.settingTitle, { color: Colors.error }]}>
                Supprimer toutes les données
              </Text>
              <Text style={styles.settingSubtitle}>
                Action irréversible
              </Text>
            </View>
            <View style={styles.settingAction}>
              <Icon name="chevron-right" size={24} color={Colors.gray400} />
            </View>
          </TouchableOpacity>
        </Card>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Entreprise Facile v1.0.0
          </Text>
          <Text style={styles.footerSubtext}>
            Développé avec ❤️ pour les entrepreneurs
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  section: {
    marginBottom: 16,
    paddingVertical: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginBottom: 12,
    marginHorizontal: 16,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  dangerItem: {
    borderBottomWidth: 0,
  },
  settingIcon: {
    marginRight: 16,
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    color: Colors.textPrimary,
    marginBottom: 2,
  },
  settingSubtitle: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  settingAction: {
    marginLeft: 12,
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  footerText: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 4,
  },
  footerSubtext: {
    fontSize: 12,
    color: Colors.textTertiary,
  },
});