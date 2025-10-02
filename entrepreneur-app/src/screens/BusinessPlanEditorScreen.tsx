import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Modal,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Colors } from '@/constants/colors';
import { BUSINESS_PLAN_TEMPLATES } from '@/constants/templates';
import { BusinessPlan, BusinessPlanTemplate, BusinessPlanSection } from '@/types';
import Card from '@/components/Card';
import Button from '@/components/Button';
import Input from '@/components/Input';

interface TemplateSelectionProps {
  visible: boolean;
  onClose: () => void;
  onSelect: (template: BusinessPlanTemplate) => void;
}

function TemplateSelection({ visible, onClose, onSelect }: TemplateSelectionProps) {
  return (
    <Modal visible={visible} animationType="slide" presentationStyle="pageSheet">
      <View style={styles.modalContainer}>
        <View style={styles.modalHeader}>
          <Text style={styles.modalTitle}>Choisir un modèle</Text>
          <TouchableOpacity onPress={onClose}>
            <Icon name="close" size={24} color={Colors.textPrimary} />
          </TouchableOpacity>
        </View>
        <ScrollView style={styles.modalContent}>
          {BUSINESS_PLAN_TEMPLATES.map((template) => (
            <Card
              key={template.id}
              onPress={() => onSelect(template)}
              style={styles.templateCard}
            >
              <Text style={styles.templateName}>{template.name}</Text>
              <Text style={styles.templateDescription}>{template.description}</Text>
              <Text style={styles.templateCategory}>Catégorie: {template.category}</Text>
              <Text style={styles.templateSections}>
                {template.sections.length} sections
              </Text>
            </Card>
          ))}
        </ScrollView>
      </View>
    </Modal>
  );
}

interface SectionEditorProps {
  section: BusinessPlanSection;
  template: any;
  onUpdate: (section: BusinessPlanSection) => void;
  onToggleComplete: (sectionId: string) => void;
}

function SectionEditor({ section, template, onUpdate, onToggleComplete }: SectionEditorProps) {
  const [expanded, setExpanded] = useState(false);
  const [content, setContent] = useState(section.content);

  const handleSave = () => {
    onUpdate({ ...section, content });
    setExpanded(false);
  };

  const templateSection = template?.sections?.find((s: any) => s.id === section.templateSectionId);

  return (
    <Card style={styles.sectionCard}>
      <TouchableOpacity
        style={styles.sectionHeader}
        onPress={() => setExpanded(!expanded)}
      >
        <View style={styles.sectionInfo}>
          <Text style={styles.sectionTitle}>{section.title}</Text>
          <Text style={styles.sectionDescription}>
            {templateSection?.description || 'Section personnalisée'}
          </Text>
        </View>
        <View style={styles.sectionActions}>
          <TouchableOpacity
            onPress={() => onToggleComplete(section.id)}
            style={styles.checkButton}
          >
            <Icon
              name={section.completed ? 'check-circle' : 'radio-button-unchecked'}
              size={24}
              color={section.completed ? Colors.success : Colors.gray400}
            />
          </TouchableOpacity>
          <Icon
            name={expanded ? 'expand-less' : 'expand-more'}
            size={24}
            color={Colors.gray400}
          />
        </View>
      </TouchableOpacity>

      {expanded && (
        <View style={styles.sectionContent}>
          {templateSection?.tips && (
            <View style={styles.tipsContainer}>
              <Text style={styles.tipsTitle}>💡 Conseils :</Text>
              {templateSection.tips.map((tip: string, index: number) => (
                <Text key={index} style={styles.tipText}>• {tip}</Text>
              ))}
            </View>
          )}
          
          <Input
            label="Contenu de la section"
            placeholder={templateSection?.placeholder || 'Saisissez le contenu...'}
            value={content}
            onChangeText={setContent}
            multiline
            numberOfLines={8}
            containerStyle={styles.contentInput}
          />
          
          <View style={styles.sectionButtons}>
            <Button
              title="Annuler"
              variant="outline"
              onPress={() => {
                setContent(section.content);
                setExpanded(false);
              }}
              style={styles.cancelButton}
            />
            <Button
              title="Sauvegarder"
              onPress={handleSave}
              style={styles.saveButton}
            />
          </View>
        </View>
      )}
    </Card>
  );
}

export default function BusinessPlanEditorScreen() {
  const navigation = useNavigation();
  const route = useRoute<any>();
  const planId = route.params?.planId;

  const [showTemplateSelection, setShowTemplateSelection] = useState(!planId);
  const [businessPlan, setBusinessPlan] = useState<BusinessPlan | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (planId) {
      // In real app, load from storage/API
      loadBusinessPlan(planId);
    }
  }, [planId]);

  const loadBusinessPlan = (id: string) => {
    // Mock loading - in real app, this would load from storage
    const mockPlan: BusinessPlan = {
      id,
      title: 'Restaurant "Le Petit Bistro"',
      description: 'Concept de restaurant traditionnel français',
      createdAt: new Date(),
      updatedAt: new Date(),
      status: 'draft',
      template: BUSINESS_PLAN_TEMPLATES[1], // Restaurant template
      sections: [
        {
          id: '1',
          templateSectionId: 'concept-restaurant',
          title: 'Concept du restaurant',
          content: 'Restaurant traditionnel français avec une approche moderne...',
          order: 1,
          completed: true
        },
        {
          id: '2',
          templateSectionId: 'menu-pricing',
          title: 'Carte et tarification',
          content: '',
          order: 2,
          completed: false
        }
      ]
    };
    
    setBusinessPlan(mockPlan);
    setTitle(mockPlan.title);
    setDescription(mockPlan.description);
  };

  const handleTemplateSelect = (template: BusinessPlanTemplate) => {
    const newPlan: BusinessPlan = {
      id: Date.now().toString(),
      title: title || `Plan d'affaires - ${template.category}`,
      description: description || template.description,
      createdAt: new Date(),
      updatedAt: new Date(),
      status: 'draft',
      template,
      sections: template.sections.map((sectionTemplate, index) => ({
        id: `section_${index}`,
        templateSectionId: sectionTemplate.id,
        title: sectionTemplate.title,
        content: '',
        order: sectionTemplate.order,
        completed: false
      }))
    };

    setBusinessPlan(newPlan);
    setTitle(newPlan.title);
    setDescription(newPlan.description);
    setShowTemplateSelection(false);
  };

  const handleSectionUpdate = (updatedSection: BusinessPlanSection) => {
    if (!businessPlan) return;

    const updatedSections = businessPlan.sections.map(section =>
      section.id === updatedSection.id ? updatedSection : section
    );

    setBusinessPlan({
      ...businessPlan,
      sections: updatedSections,
      updatedAt: new Date()
    });
  };

  const handleToggleComplete = (sectionId: string) => {
    if (!businessPlan) return;

    const updatedSections = businessPlan.sections.map(section =>
      section.id === sectionId
        ? { ...section, completed: !section.completed }
        : section
    );

    setBusinessPlan({
      ...businessPlan,
      sections: updatedSections,
      updatedAt: new Date()
    });
  };

  const handleSave = () => {
    if (!businessPlan) return;

    const updatedPlan = {
      ...businessPlan,
      title,
      description,
      updatedAt: new Date()
    };

    // In real app, save to storage/API
    console.log('Saving business plan:', updatedPlan);
    
    Alert.alert(
      'Plan sauvegardé',
      'Votre plan d\'affaires a été sauvegardé avec succès.',
      [{ text: 'OK', onPress: () => navigation.goBack() }]
    );
  };

  const handleExport = () => {
    Alert.alert(
      'Exporter le plan',
      'Choisissez le format d\'export',
      [
        { text: 'PDF', onPress: () => console.log('Export PDF') },
        { text: 'Word', onPress: () => console.log('Export Word') },
        { text: 'Annuler', style: 'cancel' }
      ]
    );
  };

  if (!businessPlan) {
    return (
      <View style={styles.container}>
        <TemplateSelection
          visible={showTemplateSelection}
          onClose={() => navigation.goBack()}
          onSelect={handleTemplateSelect}
        />
        
        {!showTemplateSelection && (
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>Chargement...</Text>
          </View>
        )}
      </View>
    );
  }

  const completedSections = businessPlan.sections.filter(s => s.completed).length;
  const totalSections = businessPlan.sections.length;
  const progress = totalSections > 0 ? (completedSections / totalSections) * 100 : 0;

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content}>
        <Card style={styles.headerCard}>
          <Input
            label="Titre du plan d'affaires"
            value={title}
            onChangeText={setTitle}
            placeholder="Entrez le titre de votre plan"
          />
          
          <Input
            label="Description"
            value={description}
            onChangeText={setDescription}
            placeholder="Décrivez brièvement votre projet"
            multiline
            numberOfLines={3}
          />

          <View style={styles.progressContainer}>
            <View style={styles.progressHeader}>
              <Text style={styles.progressLabel}>Progression</Text>
              <Text style={styles.progressValue}>
                {completedSections}/{totalSections} sections ({Math.round(progress)}%)
              </Text>
            </View>
            <View style={styles.progressBar}>
              <View
                style={[
                  styles.progressFill,
                  { width: `${progress}%` }
                ]}
              />
            </View>
          </View>
        </Card>

        <View style={styles.sectionsContainer}>
          <Text style={styles.sectionsTitle}>Sections du plan d'affaires</Text>
          {businessPlan.sections
            .sort((a, b) => a.order - b.order)
            .map((section) => (
              <SectionEditor
                key={section.id}
                section={section}
                template={businessPlan.template}
                onUpdate={handleSectionUpdate}
                onToggleComplete={handleToggleComplete}
              />
            ))}
        </View>
      </ScrollView>

      <View style={styles.bottomActions}>
        <Button
          title="Exporter"
          variant="outline"
          onPress={handleExport}
          style={styles.exportButton}
        />
        <Button
          title="Sauvegarder"
          onPress={handleSave}
          style={styles.saveMainButton}
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: Colors.textSecondary,
  },
  headerCard: {
    marginBottom: 24,
  },
  progressContainer: {
    marginTop: 16,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  progressLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.textPrimary,
  },
  progressValue: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  progressBar: {
    height: 8,
    backgroundColor: Colors.gray200,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.primary,
  },
  sectionsContainer: {
    marginBottom: 100,
  },
  sectionsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginBottom: 16,
  },
  sectionCard: {
    marginBottom: 12,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionInfo: {
    flex: 1,
    marginRight: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  sectionDescription: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  sectionActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkButton: {
    marginRight: 8,
  },
  sectionContent: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  tipsContainer: {
    backgroundColor: Colors.info + '10',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  tipsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: 8,
  },
  tipText: {
    fontSize: 12,
    color: Colors.textSecondary,
    lineHeight: 16,
    marginBottom: 4,
  },
  contentInput: {
    marginBottom: 16,
  },
  sectionButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  cancelButton: {
    marginRight: 12,
  },
  saveButton: {
    flex: 1,
  },
  bottomActions: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: Colors.white,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  exportButton: {
    flex: 1,
    marginRight: 12,
  },
  saveMainButton: {
    flex: 2,
  },
  // Modal styles
  modalContainer: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.textPrimary,
  },
  modalContent: {
    flex: 1,
    padding: 16,
  },
  templateCard: {
    marginBottom: 12,
  },
  templateName: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  templateDescription: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 8,
  },
  templateCategory: {
    fontSize: 12,
    color: Colors.primary,
    marginBottom: 4,
  },
  templateSections: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
});