import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  Modal,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { SafeAreaView } from 'react-native-safe-area-context';

import { COLORS, DEFAULT_TEMPLATES } from '../../constants';
import { BusinessPlan, BusinessPlanSection } from '../../types';

interface BusinessPlanEditScreenProps {
  navigation: any;
  route: any;
}

const BusinessPlanEditScreen: React.FC<BusinessPlanEditScreenProps> = ({ 
  navigation, 
  route 
}) => {
  const { planId, plan: initialPlan } = route.params;
  
  const [plan, setPlan] = useState<BusinessPlan>(initialPlan || {
    id: planId,
    userId: '1',
    title: 'Nouveau Plan d\'affaires',
    industry: 'startup',
    businessType: 'startup',
    status: 'draft',
    createdAt: new Date(),
    updatedAt: new Date(),
    sections: [],
  });

  const [selectedSection, setSelectedSection] = useState<BusinessPlanSection | null>(null);
  const [isEditingSection, setIsEditingSection] = useState(false);
  const [sectionContent, setSectionContent] = useState('');

  useEffect(() => {
    // Load plan sections if empty
    if (plan.sections.length === 0) {
      const template = DEFAULT_TEMPLATES.find(t => t.industry === plan.businessType);
      if (template) {
        const sections: BusinessPlanSection[] = template.sections.map((section, index) => ({
          id: `section_${index}`,
          title: section.title,
          content: section.content,
          order: section.order,
          isCompleted: false,
          templateId: template.id,
        }));
        setPlan(prev => ({ ...prev, sections }));
      }
    }
  }, [plan.businessType, plan.sections.length]);

  const handleSaveSection = () => {
    if (!selectedSection) return;

    const updatedSections = plan.sections.map(section =>
      section.id === selectedSection.id
        ? { ...section, content: sectionContent, isCompleted: sectionContent.trim().length > 0 }
        : section
    );

    setPlan(prev => ({
      ...prev,
      sections: updatedSections,
      updatedAt: new Date(),
    }));

    setIsEditingSection(false);
    setSelectedSection(null);
    setSectionContent('');
  };

  const handleDeleteSection = (sectionId: string) => {
    Alert.alert(
      'Supprimer la section',
      'Êtes-vous sûr de vouloir supprimer cette section ?',
      [
        { text: 'Annuler', style: 'cancel' },
        { 
          text: 'Supprimer', 
          style: 'destructive',
          onPress: () => {
            const updatedSections = plan.sections.filter(section => section.id !== sectionId);
            setPlan(prev => ({ ...prev, sections: updatedSections }));
          }
        },
      ]
    );
  };

  const getCompletionPercentage = () => {
    if (plan.sections.length === 0) return 0;
    const completedSections = plan.sections.filter(section => section.isCompleted).length;
    return Math.round((completedSections / plan.sections.length) * 100);
  };

  const SectionCard = ({ section }: { section: BusinessPlanSection }) => (
    <TouchableOpacity 
      style={[
        styles.sectionCard,
        section.isCompleted && styles.sectionCardCompleted
      ]}
      onPress={() => {
        setSelectedSection(section);
        setSectionContent(section.content);
        setIsEditingSection(true);
      }}
    >
      <View style={styles.sectionHeader}>
        <View style={styles.sectionInfo}>
          <Text style={styles.sectionTitle}>{section.title}</Text>
          <Text style={styles.sectionOrder}>Section {section.order}</Text>
        </View>
        <View style={styles.sectionActions}>
          {section.isCompleted && (
            <Icon name="check-circle" size={20} color={COLORS.success} />
          )}
          <TouchableOpacity 
            style={styles.deleteButton}
            onPress={() => handleDeleteSection(section.id)}
          >
            <Icon name="delete" size={20} color={COLORS.error} />
          </TouchableOpacity>
        </View>
      </View>
      <Text style={styles.sectionPreview} numberOfLines={2}>
        {section.content || 'Cliquez pour commencer à rédiger...'}
      </Text>
    </TouchableOpacity>
  );

  const SectionEditModal = () => (
    <Modal
      visible={isEditingSection}
      animationType="slide"
      presentationStyle="pageSheet"
    >
      <SafeAreaView style={styles.modalContainer}>
        <View style={styles.modalHeader}>
          <TouchableOpacity 
            style={styles.modalButton}
            onPress={() => setIsEditingSection(false)}
          >
            <Text style={styles.modalButtonText}>Annuler</Text>
          </TouchableOpacity>
          <Text style={styles.modalTitle}>
            {selectedSection?.title}
          </Text>
          <TouchableOpacity 
            style={styles.modalButton}
            onPress={handleSaveSection}
          >
            <Text style={[styles.modalButtonText, styles.saveButtonText]}>Sauvegarder</Text>
          </TouchableOpacity>
        </View>
        
        <ScrollView style={styles.modalContent}>
          <TextInput
            style={styles.sectionTextInput}
            value={sectionContent}
            onChangeText={setSectionContent}
            placeholder={selectedSection?.title}
            placeholderTextColor={COLORS.textSecondary}
            multiline
            textAlignVertical="top"
          />
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-back" size={24} color={COLORS.surface} />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>{plan.title}</Text>
          <Text style={styles.headerSubtitle}>
            {getCompletionPercentage()}% terminé
          </Text>
        </View>
        <TouchableOpacity style={styles.moreButton}>
          <Icon name="more-vert" size={24} color={COLORS.surface} />
        </TouchableOpacity>
      </View>

      {/* Progress Bar */}
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View 
            style={[
              styles.progressFill, 
              { width: `${getCompletionPercentage()}%` }
            ]} 
          />
        </View>
        <Text style={styles.progressText}>
          {plan.sections.filter(s => s.isCompleted).length} / {plan.sections.length} sections terminées
        </Text>
      </View>

      {/* Sections List */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {plan.sections.length > 0 ? (
          <View style={styles.sectionsList}>
            {plan.sections
              .sort((a, b) => a.order - b.order)
              .map((section) => (
                <SectionCard key={section.id} section={section} />
              ))}
          </View>
        ) : (
          <View style={styles.emptyState}>
            <Icon name="description" size={64} color={COLORS.textSecondary} />
            <Text style={styles.emptyStateTitle}>Aucune section</Text>
            <Text style={styles.emptyStateDescription}>
              Les sections de votre plan d'affaires apparaîtront ici
            </Text>
          </View>
        )}
      </ScrollView>

      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => {
            // Handle export/share
            Alert.alert('Export', 'Fonctionnalité d\'export à implémenter');
          }}
        >
          <Icon name="share" size={20} color={COLORS.primary} />
          <Text style={styles.actionButtonText}>Exporter</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.actionButton, styles.primaryActionButton]}
          onPress={() => {
            // Handle AI analysis
            Alert.alert('Analyse IA', 'Fonctionnalité d\'analyse IA à implémenter');
          }}
        >
          <Icon name="psychology" size={20} color={COLORS.surface} />
          <Text style={[styles.actionButtonText, styles.primaryActionButtonText]}>
            Analyser avec IA
          </Text>
        </TouchableOpacity>
      </View>

      <SectionEditModal />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    padding: 15,
  },
  backButton: {
    padding: 5,
  },
  headerContent: {
    flex: 1,
    marginHorizontal: 15,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.surface,
  },
  headerSubtitle: {
    fontSize: 14,
    color: COLORS.surface,
    opacity: 0.8,
  },
  moreButton: {
    padding: 5,
  },
  progressContainer: {
    backgroundColor: COLORS.surface,
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.primaryLight,
  },
  progressBar: {
    height: 8,
    backgroundColor: COLORS.primaryLight,
    borderRadius: 4,
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: 4,
  },
  progressText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  sectionsList: {
    gap: 15,
  },
  sectionCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 8,
    padding: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  sectionCardCompleted: {
    borderLeftWidth: 4,
    borderLeftColor: COLORS.success,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  sectionInfo: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 2,
  },
  sectionOrder: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  sectionActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  deleteButton: {
    padding: 5,
    marginLeft: 10,
  },
  sectionPreview: {
    fontSize: 14,
    color: COLORS.textSecondary,
    lineHeight: 20,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyStateTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.text,
    marginTop: 20,
    marginBottom: 10,
  },
  emptyStateDescription: {
    fontSize: 16,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
  actionButtons: {
    flexDirection: 'row',
    padding: 20,
    gap: 15,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.surface,
    paddingVertical: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  primaryActionButton: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.primary,
    marginLeft: 8,
  },
  primaryActionButtonText: {
    color: COLORS.surface,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    padding: 15,
  },
  modalButton: {
    padding: 5,
  },
  modalButtonText: {
    fontSize: 16,
    color: COLORS.surface,
  },
  saveButtonText: {
    fontWeight: '600',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.surface,
  },
  modalContent: {
    flex: 1,
    padding: 20,
  },
  sectionTextInput: {
    flex: 1,
    backgroundColor: COLORS.surface,
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
    color: COLORS.text,
    textAlignVertical: 'top',
    minHeight: 200,
  },
});

export default BusinessPlanEditScreen;