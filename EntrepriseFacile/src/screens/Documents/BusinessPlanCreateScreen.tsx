import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { SafeAreaView } from 'react-native-safe-area-context';

import { COLORS, BUSINESS_TYPES, DEFAULT_TEMPLATES } from '../../constants';
import { BusinessType } from '../../types';

interface BusinessPlanCreateScreenProps {
  navigation: any;
  route: any;
}

const BusinessPlanCreateScreen: React.FC<BusinessPlanCreateScreenProps> = ({ 
  navigation, 
  route 
}) => {
  const [selectedBusinessType, setSelectedBusinessType] = useState<BusinessType>(
    route.params?.businessType || 'startup'
  );
  const [planTitle, setPlanTitle] = useState('');
  const [industry, setIndustry] = useState('');

  const availableTemplates = DEFAULT_TEMPLATES.filter(
    template => !template.isPremium || template.industry === selectedBusinessType
  );

  const handleCreatePlan = () => {
    if (!planTitle.trim()) {
      Alert.alert('Erreur', 'Veuillez saisir un titre pour votre plan d\'affaires');
      return;
    }

    // Create new business plan
    const newPlan = {
      id: Date.now().toString(),
      userId: '1', // Mock user ID
      title: planTitle.trim(),
      industry: industry.trim() || selectedBusinessType,
      businessType: selectedBusinessType,
      status: 'draft' as const,
      createdAt: new Date(),
      updatedAt: new Date(),
      sections: [],
    };

    // Navigate to edit screen with the new plan
    navigation.navigate('BusinessPlanEdit', { 
      planId: newPlan.id,
      plan: newPlan 
    });
  };

  const BusinessTypeCard = ({ type }: { type: { value: string; label: string } }) => (
    <TouchableOpacity
      style={[
        styles.businessTypeCard,
        selectedBusinessType === type.value && styles.businessTypeCardSelected
      ]}
      onPress={() => setSelectedBusinessType(type.value as BusinessType)}
    >
      <Text style={[
        styles.businessTypeText,
        selectedBusinessType === type.value && styles.businessTypeTextSelected
      ]}>
        {type.label}
      </Text>
    </TouchableOpacity>
  );

  const TemplateCard = ({ template }: { template: any }) => (
    <TouchableOpacity 
      style={styles.templateCard}
      onPress={() => {
        setPlanTitle(template.name);
        handleCreatePlan();
      }}
    >
      <View style={styles.templateHeader}>
        <Text style={styles.templateTitle}>{template.name}</Text>
        {template.isPremium && (
          <View style={styles.premiumBadge}>
            <Text style={styles.premiumText}>Premium</Text>
          </View>
        )}
      </View>
      <Text style={styles.templateDescription}>{template.description}</Text>
      <View style={styles.templateSections}>
        <Text style={styles.templateSectionsText}>
          {template.sections.length} sections
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Business Type Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Type d'entreprise</Text>
          <View style={styles.businessTypesGrid}>
            {BUSINESS_TYPES.map((type) => (
              <BusinessTypeCard key={type.value} type={type} />
            ))}
          </View>
        </View>

        {/* Plan Details */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Détails du plan</Text>
          
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Titre du plan d'affaires</Text>
            <TextInput
              style={styles.textInput}
              value={planTitle}
              onChangeText={setPlanTitle}
              placeholder="Ex: Mon Restaurant, Ma Startup Tech..."
              placeholderTextColor={COLORS.textSecondary}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Secteur d'activité (optionnel)</Text>
            <TextInput
              style={styles.textInput}
              value={industry}
              onChangeText={setIndustry}
              placeholder="Ex: Restauration, Technologie, Commerce..."
              placeholderTextColor={COLORS.textSecondary}
            />
          </View>
        </View>

        {/* Templates */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Modèles disponibles</Text>
          <Text style={styles.sectionDescription}>
            Choisissez un modèle pour commencer rapidement ou créez un plan personnalisé
          </Text>
          
          {availableTemplates.length > 0 ? (
            <View style={styles.templatesGrid}>
              {availableTemplates.map((template) => (
                <TemplateCard key={template.id} template={template} />
              ))}
            </View>
          ) : (
            <View style={styles.noTemplates}>
              <Icon name="description" size={48} color={COLORS.textSecondary} />
              <Text style={styles.noTemplatesText}>
                Aucun modèle disponible pour ce type d'entreprise
              </Text>
            </View>
          )}
        </View>

        {/* Create Button */}
        <View style={styles.section}>
          <TouchableOpacity 
            style={[
              styles.createButton,
              !planTitle.trim() && styles.createButtonDisabled
            ]}
            onPress={handleCreatePlan}
            disabled={!planTitle.trim()}
          >
            <Text style={styles.createButtonText}>Créer le plan d'affaires</Text>
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
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 15,
  },
  sectionDescription: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: 15,
    lineHeight: 20,
  },
  businessTypesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  businessTypeCard: {
    width: '48%',
    backgroundColor: COLORS.surface,
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  businessTypeCardSelected: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primaryLight,
  },
  businessTypeText: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.text,
    textAlign: 'center',
  },
  businessTypeTextSelected: {
    color: COLORS.surface,
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.text,
    marginBottom: 8,
  },
  textInput: {
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.primaryLight,
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
    color: COLORS.text,
  },
  templatesGrid: {
    gap: 15,
  },
  templateCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 8,
    padding: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  templateHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  templateTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
    flex: 1,
  },
  premiumBadge: {
    backgroundColor: COLORS.secondary,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  premiumText: {
    fontSize: 12,
    color: COLORS.surface,
    fontWeight: '500',
  },
  templateDescription: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: 10,
    lineHeight: 20,
  },
  templateSections: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  templateSectionsText: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  noTemplates: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  noTemplatesText: {
    fontSize: 16,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginTop: 15,
  },
  createButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  createButtonDisabled: {
    backgroundColor: COLORS.textSecondary,
  },
  createButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.surface,
  },
});

export default BusinessPlanCreateScreen;