import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Colors } from '@/constants/colors';
import Card from '@/components/Card';
import Button from '@/components/Button';
import Input from '@/components/Input';

export default function ProfileScreen() {
  const navigation = useNavigation<any>();
  
  const [user, setUser] = useState({
    firstName: 'Jean',
    lastName: 'Dupont',
    email: 'jean.dupont@email.com',
    company: 'Ma Startup',
    phone: '06 12 34 56 78',
    address: '123 Rue de l\'Innovation, 75001 Paris',
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    // In real app, save to storage/API
    setIsEditing(false);
    Alert.alert('Profil mis à jour', 'Vos informations ont été sauvegardées.');
  };

  const handleExportData = () => {
    Alert.alert(
      'Exporter mes données',
      'Choisissez le format d\'export',
      [
        { text: 'PDF', onPress: () => console.log('Export PDF') },
        { text: 'Excel', onPress: () => console.log('Export Excel') },
        { text: 'Annuler', style: 'cancel' }
      ]
    );
  };

  const menuItems = [
    {
      title: 'Paramètres',
      icon: 'settings',
      onPress: () => navigation.navigate('Settings'),
    },
    {
      title: 'Exporter mes données',
      icon: 'file-download',
      onPress: handleExportData,
    },
    {
      title: 'Aide et support',
      icon: 'help',
      onPress: () => Alert.alert('Support', 'Contactez-nous à support@entreprise-facile.fr'),
    },
    {
      title: 'À propos',
      icon: 'info',
      onPress: () => Alert.alert('À propos', 'Entreprise Facile v1.0.0\nVotre assistant entrepreneurial'),
    },
  ];

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content}>
        <Card style={styles.profileCard}>
          <View style={styles.profileHeader}>
            <View style={styles.avatarContainer}>
              <Icon name="account-circle" size={80} color={Colors.primary} />
            </View>
            <Text style={styles.userName}>
              {user.firstName} {user.lastName}
            </Text>
            <Text style={styles.userCompany}>{user.company}</Text>
          </View>

          {isEditing ? (
            <View style={styles.editForm}>
              <Input
                label="Prénom"
                value={user.firstName}
                onChangeText={(value) => setUser({ ...user, firstName: value })}
              />
              <Input
                label="Nom"
                value={user.lastName}
                onChangeText={(value) => setUser({ ...user, lastName: value })}
              />
              <Input
                label="Email"
                value={user.email}
                onChangeText={(value) => setUser({ ...user, email: value })}
                keyboardType="email-address"
              />
              <Input
                label="Entreprise"
                value={user.company}
                onChangeText={(value) => setUser({ ...user, company: value })}
              />
              <Input
                label="Téléphone"
                value={user.phone}
                onChangeText={(value) => setUser({ ...user, phone: value })}
                keyboardType="phone-pad"
              />
              <Input
                label="Adresse"
                value={user.address}
                onChangeText={(value) => setUser({ ...user, address: value })}
                multiline
                numberOfLines={3}
              />
              
              <View style={styles.editButtons}>
                <Button
                  title="Annuler"
                  variant="outline"
                  onPress={() => setIsEditing(false)}
                  style={styles.cancelButton}
                />
                <Button
                  title="Sauvegarder"
                  onPress={handleSave}
                  style={styles.saveButton}
                />
              </View>
            </View>
          ) : (
            <View style={styles.profileInfo}>
              <View style={styles.infoItem}>
                <Icon name="email" size={20} color={Colors.gray400} />
                <Text style={styles.infoText}>{user.email}</Text>
              </View>
              <View style={styles.infoItem}>
                <Icon name="phone" size={20} color={Colors.gray400} />
                <Text style={styles.infoText}>{user.phone}</Text>
              </View>
              <View style={styles.infoItem}>
                <Icon name="location-on" size={20} color={Colors.gray400} />
                <Text style={styles.infoText}>{user.address}</Text>
              </View>
              
              <Button
                title="Modifier le profil"
                variant="outline"
                onPress={() => setIsEditing(true)}
                style={styles.editButton}
              />
            </View>
          )}
        </Card>

        <Card style={styles.statsCard}>
          <Text style={styles.statsTitle}>Mes statistiques</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>3</Text>
              <Text style={styles.statLabel}>Plans d'affaires</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>12</Text>
              <Text style={styles.statLabel}>Devis créés</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>8</Text>
              <Text style={styles.statLabel}>Devis acceptés</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>15 420€</Text>
              <Text style={styles.statLabel}>CA généré</Text>
            </View>
          </View>
        </Card>

        <View style={styles.menuSection}>
          {menuItems.map((item, index) => (
            <Card key={index} onPress={item.onPress} style={styles.menuItem}>
              <View style={styles.menuContent}>
                <Icon name={item.icon} size={24} color={Colors.primary} />
                <Text style={styles.menuTitle}>{item.title}</Text>
                <Icon name="chevron-right" size={24} color={Colors.gray400} />
              </View>
            </Card>
          ))}
        </View>

        <Card style={styles.versionCard}>
          <Text style={styles.versionText}>
            Entreprise Facile v1.0.0
          </Text>
          <Text style={styles.versionSubtext}>
            Votre assistant entrepreneurial
          </Text>
        </Card>
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
  profileCard: {
    marginBottom: 16,
    alignItems: 'center',
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  avatarContainer: {
    marginBottom: 12,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  userCompany: {
    fontSize: 16,
    color: Colors.textSecondary,
  },
  profileInfo: {
    width: '100%',
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  infoText: {
    fontSize: 16,
    color: Colors.textPrimary,
    marginLeft: 12,
    flex: 1,
  },
  editButton: {
    marginTop: 20,
  },
  editForm: {
    width: '100%',
  },
  editButtons: {
    flexDirection: 'row',
    marginTop: 20,
  },
  cancelButton: {
    flex: 1,
    marginRight: 8,
  },
  saveButton: {
    flex: 1,
    marginLeft: 8,
  },
  statsCard: {
    marginBottom: 16,
  },
  statsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginBottom: 16,
    textAlign: 'center',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statItem: {
    width: '48%',
    alignItems: 'center',
    marginBottom: 16,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.primary,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  menuSection: {
    marginBottom: 16,
  },
  menuItem: {
    marginBottom: 8,
  },
  menuContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuTitle: {
    fontSize: 16,
    color: Colors.textPrimary,
    marginLeft: 16,
    flex: 1,
  },
  versionCard: {
    alignItems: 'center',
    marginBottom: 24,
  },
  versionText: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 4,
  },
  versionSubtext: {
    fontSize: 12,
    color: Colors.textTertiary,
  },
});