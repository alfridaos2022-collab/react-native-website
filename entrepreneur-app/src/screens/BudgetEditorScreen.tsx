import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '@/constants/colors';
import Card from '@/components/Card';
import Button from '@/components/Button';
import Input from '@/components/Input';

export default function BudgetEditorScreen() {
  const navigation = useNavigation();
  
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleSave = () => {
    if (!name.trim()) {
      Alert.alert('Erreur', 'Veuillez saisir un nom pour le budget');
      return;
    }

    Alert.alert(
      'Budget créé',
      'Votre budget a été créé avec succès.',
      [{ text: 'OK', onPress: () => navigation.goBack() }]
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content}>
        <Card>
          <Input
            label="Nom du budget *"
            value={name}
            onChangeText={setName}
            placeholder="Budget 2024"
          />
          
          <Input
            label="Description"
            value={description}
            onChangeText={setDescription}
            placeholder="Description du budget"
            multiline
            numberOfLines={3}
          />
          
          <Input
            label="Date de début"
            value={startDate}
            onChangeText={setStartDate}
            placeholder="01/01/2024"
          />
          
          <Input
            label="Date de fin"
            value={endDate}
            onChangeText={setEndDate}
            placeholder="31/12/2024"
          />
        </Card>
      </ScrollView>

      <View style={styles.bottomActions}>
        <Button
          title="Annuler"
          variant="outline"
          onPress={() => navigation.goBack()}
          style={styles.cancelButton}
        />
        <Button
          title="Créer"
          onPress={handleSave}
          style={styles.saveButton}
        />
      </View>
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
  bottomActions: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: Colors.white,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  cancelButton: {
    flex: 1,
    marginRight: 12,
  },
  saveButton: {
    flex: 1,
  },
});