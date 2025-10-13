import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import {
  Card,
  Title,
  Paragraph,
  Button,
  TextInput,
  Chip,
  useTheme,
  Text,
  Divider,
} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {BusinessPlanTemplate} from '../types';

const CreateBusinessPlanScreen: React.FC = () => {
  const navigation = useNavigation();
  const theme = useTheme();
  const [selectedTemplate, setSelectedTemplate] = useState<BusinessPlanTemplate | null>(null);
  const [businessName, setBusinessName] = useState('');
  const [businessDescription, setBusinessDescription] = useState('');
  const [selectedSector, setSelectedSector] = useState('');

  const sectors = ['Restauration', 'E-commerce', 'Services', 'Technologie', 'Commerce', 'Artisanat', 'Santé', 'Éducation'];

  // Modèles de plans d'affaires prédéfinis
  const templates: BusinessPlanTemplate[] = [
    {
      id: '1',
      name: 'Restaurant',
      sector: 'Restauration',
      description: 'Modèle complet pour un restaurant avec analyse de marché, prévisions financières et plan marketing.',
      sections: [
        {id: '1', title: 'Résumé Opérationnel', content: '', order: 1, isRequired: true},
        {id: '2', title: 'Présentation de l\'Entreprise', content: '', order: 2, isRequired: true},
        {id: '3', title: 'Analyse du Marché', content: '', order: 3, isRequired: true},
        {id: '4', title: 'Produits et Services', content: '', order: 4, isRequired: true},
        {id: '5', title: 'Stratégie Marketing', content: '', order: 5, isRequired: true},
        {id: '6', title: 'Plan Opérationnel', content: '', order: 6, isRequired: true},
        {id: '7', title: 'Plan Financier', content: '', order: 7, isRequired: true},
      ],
    },
    {
      id: '2',
      name: 'E-commerce',
      sector: 'E-commerce',
      description: 'Modèle adapté pour une boutique en ligne avec stratégie digitale et logistique.',
      sections: [
        {id: '1', title: 'Résumé Opérationnel', content: '', order: 1, isRequired: true},
        {id: '2', title: 'Présentation de l\'Entreprise', content: '', order: 2, isRequired: true},
        {id: '3', title: 'Analyse du Marché Digital', content: '', order: 3, isRequired: true},
        {id: '4', title: 'Catalogue Produits', content: '', order: 4, isRequired: true},
        {id: '5', title: 'Stratégie E-marketing', content: '', order: 5, isRequired: true},
        {id: '6', title: 'Logistique et Fulfillment', content: '', order: 6, isRequired: true},
        {id: '7', title: 'Plan Financier', content: '', order: 7, isRequired: true},
      ],
    },
    {
      id: '3',
      name: 'Services B2B',
      sector: 'Services',
      description: 'Modèle pour entreprises de services avec focus sur la relation client et la qualité.',
      sections: [
        {id: '1', title: 'Résumé Opérationnel', content: '', order: 1, isRequired: true},
        {id: '2', title: 'Présentation de l\'Entreprise', content: '', order: 2, isRequired: true},
        {id: '3', title: 'Analyse du Marché B2B', content: '', order: 3, isRequired: true},
        {id: '4', title: 'Offre de Services', content: '', order: 4, isRequired: true},
        {id: '5', title: 'Stratégie Commerciale', content: '', order: 5, isRequired: true},
        {id: '6', title: 'Processus Qualité', content: '', order: 6, isRequired: true},
        {id: '7', title: 'Plan Financier', content: '', order: 7, isRequired: true},
      ],
    },
  ];

  const handleCreatePlan = () => {
    if (!businessName.trim()) {
      Alert.alert('Erreur', 'Veuillez saisir le nom de votre entreprise');
      return;
    }

    if (!selectedSector) {
      Alert.alert('Erreur', 'Veuillez sélectionner un secteur d\'activité');
      return;
    }

    // Créer le nouveau plan d'affaires
    const newPlan = {
      id: Date.now().toString(),
      title: businessName,
      description: businessDescription,
      sector: selectedSector,
      status: 'draft' as const,
      createdAt: new Date(),
      updatedAt: new Date(),
      sections: selectedTemplate?.sections || [],
    };

    Alert.alert(
      'Plan d\'Affaires Créé',
      'Votre plan d\'affaires a été créé avec succès. Vous pouvez maintenant le compléter section par section.',
      [
        {
          text: 'OK',
          onPress: () => {
            // Ici, vous pourriez sauvegarder le plan et naviguer vers l'écran de détail
            navigation.goBack();
          },
        },
      ]
    );
  };

  const renderTemplate = (template: BusinessPlanTemplate) => (
    <Card
      key={template.id}
      style={[
        styles.templateCard,
        selectedTemplate?.id === template.id && styles.selectedTemplate,
      ]}
      onPress={() => setSelectedTemplate(template)}>
      <Card.Content>
        <View style={styles.templateHeader}>
          <Title style={styles.templateTitle}>{template.name}</Title>
          <Chip style={styles.sectorChip}>{template.sector}</Chip>
        </View>
        <Paragraph style={styles.templateDescription}>
          {template.description}
        </Paragraph>
        <View style={styles.sectionsInfo}>
          <Icon name="list" size={16} color={theme.colors.primary} />
          <Text style={styles.sectionsText}>
            {template.sections.length} sections incluses
          </Text>
        </View>
      </Card.Content>
    </Card>
  );

  return (
    <ScrollView style={styles.container}>
      {/* Informations de base */}
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.sectionTitle}>Informations de Base</Title>
          
          <TextInput
            label="Nom de l'entreprise *"
            value={businessName}
            onChangeText={setBusinessName}
            style={styles.input}
            mode="outlined"
          />
          
          <TextInput
            label="Description de l'entreprise"
            value={businessDescription}
            onChangeText={setBusinessDescription}
            style={styles.input}
            mode="outlined"
            multiline
            numberOfLines={3}
          />

          <Text style={styles.label}>Secteur d'activité *</Text>
          <View style={styles.sectorsContainer}>
            {sectors.map((sector) => (
              <Chip
                key={sector}
                selected={selectedSector === sector}
                onPress={() => setSelectedSector(sector)}
                style={styles.sectorChip}>
                {sector}
              </Chip>
            ))}
          </View>
        </Card.Content>
      </Card>

      {/* Sélection du modèle */}
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.sectionTitle}>Choisir un Modèle</Title>
          <Paragraph style={styles.sectionDescription}>
            Sélectionnez un modèle prédéfini adapté à votre secteur d'activité, 
            ou créez un plan personnalisé.
          </Paragraph>

          <View style={styles.templatesContainer}>
            {templates.map(renderTemplate)}
          </View>

          <Button
            mode="outlined"
            onPress={() => setSelectedTemplate(null)}
            style={styles.customButton}>
            <Icon name="add" size={20} style={styles.buttonIcon} />
            Créer un Plan Personnalisé
          </Button>
        </Card.Content>
      </Card>

      {/* Assistant IA */}
      <Card style={styles.card}>
        <Card.Content>
          <View style={styles.aiHeader}>
            <Icon name="psychology" size={24} color={theme.colors.info} />
            <Title style={styles.aiTitle}>Assistant IA</Title>
          </View>
          <Paragraph style={styles.aiDescription}>
            Notre assistant IA vous aidera à rédiger chaque section de votre plan d'affaires 
            avec des conseils personnalisés et des suggestions d'amélioration.
          </Paragraph>
          <View style={styles.aiFeatures}>
            <View style={styles.aiFeature}>
              <Icon name="check-circle" size={16} color={theme.colors.success} />
              <Text style={styles.aiFeatureText}>Analyse sémantique automatique</Text>
            </View>
            <View style={styles.aiFeature}>
              <Icon name="check-circle" size={16} color={theme.colors.success} />
              <Text style={styles.aiFeatureText}>Suggestions d'amélioration</Text>
            </View>
            <View style={styles.aiFeature}>
              <Icon name="check-circle" size={16} color={theme.colors.success} />
              <Text style={styles.aiFeatureText}>Score de qualité en temps réel</Text>
            </View>
          </View>
        </Card.Content>
      </Card>

      {/* Boutons d'action */}
      <View style={styles.actionsContainer}>
        <Button
          mode="outlined"
          onPress={() => navigation.goBack()}
          style={styles.actionButton}>
          Annuler
        </Button>
        <Button
          mode="contained"
          onPress={handleCreatePlan}
          style={styles.actionButton}
          disabled={!businessName.trim() || !selectedSector}>
          Créer le Plan d'Affaires
        </Button>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  card: {
    margin: 16,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  sectionDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
  input: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
    color: '#212121',
  },
  sectorsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  sectorChip: {
    marginRight: 8,
    marginBottom: 8,
  },
  templatesContainer: {
    marginBottom: 16,
  },
  templateCard: {
    marginBottom: 12,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedTemplate: {
    borderColor: '#2E7D32',
    backgroundColor: '#E8F5E8',
  },
  templateHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  templateTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  templateDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  sectionsInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionsText: {
    marginLeft: 4,
    fontSize: 12,
    color: '#666',
  },
  customButton: {
    marginTop: 8,
  },
  buttonIcon: {
    marginRight: 8,
  },
  aiHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  aiTitle: {
    fontSize: 18,
    marginLeft: 8,
  },
  aiDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
  aiFeatures: {
    marginTop: 8,
  },
  aiFeature: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  aiFeatureText: {
    marginLeft: 8,
    fontSize: 14,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    paddingBottom: 32,
  },
  actionButton: {
    flex: 1,
    marginHorizontal: 8,
  },
});

export default CreateBusinessPlanScreen;