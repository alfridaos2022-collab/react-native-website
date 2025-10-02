import React, {useState, useEffect} from 'react';
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
  useTheme,
  Text,
  Chip,
  Divider,
  ProgressBar,
} from 'react-native-paper';
import {useNavigation, useRoute} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {BusinessPlan, BusinessPlanSection} from '../types';

const BusinessPlanDetailScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const theme = useTheme();
  const [businessPlan, setBusinessPlan] = useState<BusinessPlan | null>(null);
  const [selectedSection, setSelectedSection] = useState<BusinessPlanSection | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  // Données de démonstration
  useEffect(() => {
    const mockPlan: BusinessPlan = {
      id: '1',
      title: 'Restaurant Le Gourmet',
      description: 'Restaurant gastronomique en centre-ville',
      sector: 'Restauration',
      status: 'in_progress',
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date('2024-01-20'),
      sections: [
        {
          id: '1',
          title: 'Résumé Opérationnel',
          content: 'Le Restaurant Le Gourmet est un établissement gastronomique situé en centre-ville, proposant une cuisine française moderne avec des produits locaux et de saison.',
          order: 1,
          isCompleted: true,
          suggestions: ['Ajouter des chiffres clés', 'Préciser le positionnement prix'],
        },
        {
          id: '2',
          title: 'Présentation de l\'Entreprise',
          content: 'Restaurant créé en 2024 par un chef expérimenté, avec une équipe de 8 personnes.',
          order: 2,
          isCompleted: true,
        },
        {
          id: '3',
          title: 'Analyse du Marché',
          content: 'Le marché de la restauration gastronomique représente 15M€ dans notre zone géographique.',
          order: 3,
          isCompleted: false,
          suggestions: ['Ajouter une analyse concurrentielle détaillée', 'Inclure des données démographiques'],
        },
        {
          id: '4',
          title: 'Produits et Services',
          content: 'Menu déjeuner et dîner, événements privés, cours de cuisine.',
          order: 4,
          isCompleted: false,
        },
        {
          id: '5',
          title: 'Stratégie Marketing',
          content: 'Marketing digital, partenariats locaux, événements.',
          order: 5,
          isCompleted: false,
        },
        {
          id: '6',
          title: 'Plan Opérationnel',
          content: 'Gestion des approvisionnements, formation du personnel, procédures qualité.',
          order: 6,
          isCompleted: false,
        },
        {
          id: '7',
          title: 'Plan Financier',
          content: 'Prévisions sur 3 ans, investissements, rentabilité.',
          order: 7,
          isCompleted: false,
        },
      ],
      aiAnalysis: {
        score: 75,
        suggestions: [
          'Compléter l\'analyse de marché avec des données chiffrées',
          'Détailler la stratégie marketing et commerciale',
          'Ajouter des prévisions financières détaillées',
        ],
        strengths: [
          'Proposition de valeur claire',
          'Expérience du fondateur',
          'Localisation stratégique',
        ],
        weaknesses: [
          'Plan marketing incomplet',
          'Prévisions financières manquantes',
          'Analyse concurrentielle superficielle',
        ],
        lastAnalyzed: new Date('2024-01-20'),
      },
    };
    setBusinessPlan(mockPlan);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return theme.colors.success;
      case 'in_progress':
        return theme.colors.warning;
      case 'draft':
        return theme.colors.placeholder;
      default:
        return theme.colors.placeholder;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Terminé';
      case 'in_progress':
        return 'En cours';
      case 'draft':
        return 'Brouillon';
      default:
        return 'Inconnu';
    }
  };

  const handleSaveSection = () => {
    if (!selectedSection) return;

    setBusinessPlan(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        sections: prev.sections.map(section =>
          section.id === selectedSection.id ? selectedSection : section
        ),
        updatedAt: new Date(),
      };
    });

    setIsEditing(false);
    Alert.alert('Succès', 'Section sauvegardée avec succès');
  };

  const handleAnalyzeWithAI = () => {
    Alert.alert(
      'Analyse IA',
      'L\'analyse IA va examiner votre plan d\'affaires et vous fournir des suggestions d\'amélioration.',
      [
        {text: 'Annuler', style: 'cancel'},
        {
          text: 'Analyser',
          onPress: () => {
            // Simulation de l'analyse IA
            Alert.alert('Analyse Terminée', 'Votre plan d\'affaires a été analysé. Consultez les suggestions dans chaque section.');
          },
        },
      ]
    );
  };

  const completedSections = businessPlan?.sections.filter(section => section.isCompleted).length || 0;
  const totalSections = businessPlan?.sections.length || 0;
  const progressPercentage = totalSections > 0 ? completedSections / totalSections : 0;

  if (!businessPlan) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Chargement...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* En-tête du plan d'affaires */}
      <Card style={styles.headerCard}>
        <Card.Content>
          <View style={styles.headerContent}>
            <View style={styles.titleContainer}>
              <Title style={styles.planTitle}>{businessPlan.title}</Title>
              <Chip
                style={[styles.statusChip, {backgroundColor: getStatusColor(businessPlan.status)}]}
                textStyle={styles.statusChipText}>
                {getStatusText(businessPlan.status)}
              </Chip>
            </View>
            <Text style={styles.planDescription}>{businessPlan.description}</Text>
            <View style={styles.planInfo}>
              <View style={styles.infoItem}>
                <Icon name="business" size={16} color={theme.colors.primary} />
                <Text style={styles.infoText}>{businessPlan.sector}</Text>
              </View>
              <View style={styles.infoItem}>
                <Icon name="calendar-today" size={16} color={theme.colors.primary} />
                <Text style={styles.infoText}>
                  Mis à jour le {businessPlan.updatedAt.toLocaleDateString('fr-FR')}
                </Text>
              </View>
            </View>
          </View>
        </Card.Content>
      </Card>

      {/* Progression */}
      <Card style={styles.progressCard}>
        <Card.Content>
          <Title style={styles.progressTitle}>Progression du Plan</Title>
          <View style={styles.progressContainer}>
            <ProgressBar
              progress={progressPercentage}
              color={theme.colors.primary}
              style={styles.progressBar}
            />
            <Text style={styles.progressText}>
              {completedSections} / {totalSections} sections terminées
            </Text>
          </View>
        </Card.Content>
      </Card>

      {/* Analyse IA */}
      {businessPlan.aiAnalysis && (
        <Card style={styles.aiCard}>
          <Card.Content>
            <View style={styles.aiHeader}>
              <Icon name="psychology" size={24} color={theme.colors.info} />
              <Title style={styles.aiTitle}>Analyse IA</Title>
              <Chip style={styles.aiScoreChip}>
                Score: {businessPlan.aiAnalysis.score}/100
              </Chip>
            </View>

            <View style={styles.aiSection}>
              <Text style={styles.aiSectionTitle}>Points Forts:</Text>
              {businessPlan.aiAnalysis.strengths.map((strength, index) => (
                <View key={index} style={styles.aiItem}>
                  <Icon name="check-circle" size={16} color={theme.colors.success} />
                  <Text style={styles.aiItemText}>{strength}</Text>
                </View>
              ))}
            </View>

            <View style={styles.aiSection}>
              <Text style={styles.aiSectionTitle}>Points à Améliorer:</Text>
              {businessPlan.aiAnalysis.weaknesses.map((weakness, index) => (
                <View key={index} style={styles.aiItem}>
                  <Icon name="warning" size={16} color={theme.colors.warning} />
                  <Text style={styles.aiItemText}>{weakness}</Text>
                </View>
              ))}
            </View>

            <Button
              mode="outlined"
              onPress={handleAnalyzeWithAI}
              style={styles.analyzeButton}>
              <Icon name="refresh" size={16} style={styles.buttonIcon} />
              Relancer l'Analyse IA
            </Button>
          </Card.Content>
        </Card>
      )}

      {/* Sections du plan */}
      <Card style={styles.sectionsCard}>
        <Card.Content>
          <Title style={styles.sectionsTitle}>Sections du Plan d'Affaires</Title>
          
          {businessPlan.sections.map((section) => (
            <View key={section.id} style={styles.sectionItem}>
              <View style={styles.sectionHeader}>
                <View style={styles.sectionTitleContainer}>
                  <Text style={styles.sectionNumber}>{section.order}</Text>
                  <Text style={styles.sectionName}>{section.title}</Text>
                </View>
                <Chip
                  style={[
                    styles.completionChip,
                    {backgroundColor: section.isCompleted ? theme.colors.success : theme.colors.placeholder}
                  ]}>
                  {section.isCompleted ? 'Terminé' : 'En cours'}
                </Chip>
              </View>

              {selectedSection?.id === section.id ? (
                <View style={styles.editingSection}>
                  <TextInput
                    label="Contenu de la section"
                    value={selectedSection.content}
                    onChangeText={(value) => setSelectedSection({...selectedSection, content: value})}
                    style={styles.sectionInput}
                    mode="outlined"
                    multiline
                    numberOfLines={6}
                  />
                  
                  {selectedSection.suggestions && selectedSection.suggestions.length > 0 && (
                    <View style={styles.suggestionsContainer}>
                      <Text style={styles.suggestionsTitle}>Suggestions IA:</Text>
                      {selectedSection.suggestions.map((suggestion, index) => (
                        <View key={index} style={styles.suggestionItem}>
                          <Icon name="lightbulb-outline" size={16} color={theme.colors.warning} />
                          <Text style={styles.suggestionText}>{suggestion}</Text>
                        </View>
                      ))}
                    </View>
                  )}

                  <View style={styles.sectionActions}>
                    <Button
                      mode="outlined"
                      onPress={() => {
                        setIsEditing(false);
                        setSelectedSection(null);
                      }}
                      style={styles.sectionActionButton}>
                      Annuler
                    </Button>
                    <Button
                      mode="contained"
                      onPress={handleSaveSection}
                      style={styles.sectionActionButton}>
                      Sauvegarder
                    </Button>
                  </View>
                </View>
              ) : (
                <View style={styles.sectionContent}>
                  <Paragraph style={styles.sectionContentText}>
                    {section.content || 'Cette section n\'a pas encore été rédigée.'}
                  </Paragraph>
                  
                  {section.suggestions && section.suggestions.length > 0 && (
                    <View style={styles.suggestionsPreview}>
                      <Text style={styles.suggestionsPreviewText}>
                        {section.suggestions.length} suggestion(s) disponible(s)
                      </Text>
                    </View>
                  )}

                  <Button
                    mode="outlined"
                    onPress={() => {
                      setSelectedSection(section);
                      setIsEditing(true);
                    }}
                    style={styles.editButton}>
                    <Icon name="edit" size={16} style={styles.buttonIcon} />
                    Modifier
                  </Button>
                </View>
              )}

              <Divider style={styles.sectionDivider} />
            </View>
          ))}
        </Card.Content>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerCard: {
    margin: 16,
    elevation: 2,
  },
  headerContent: {
    alignItems: 'center',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  planTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginRight: 12,
  },
  statusChip: {
    marginLeft: 8,
  },
  statusChipText: {
    color: 'white',
    fontSize: 12,
  },
  planDescription: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 16,
  },
  planInfo: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
  },
  infoText: {
    marginLeft: 4,
    fontSize: 12,
    color: '#666',
  },
  progressCard: {
    margin: 16,
    marginTop: 0,
    elevation: 2,
  },
  progressTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  progressContainer: {
    marginBottom: 8,
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
    marginBottom: 8,
  },
  progressText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  aiCard: {
    margin: 16,
    marginTop: 0,
    elevation: 2,
  },
  aiHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  aiTitle: {
    fontSize: 18,
    marginLeft: 8,
    flex: 1,
  },
  aiScoreChip: {
    backgroundColor: '#E3F2FD',
  },
  aiSection: {
    marginBottom: 16,
  },
  aiSectionTitle: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
    color: '#666',
  },
  aiItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  aiItemText: {
    marginLeft: 8,
    fontSize: 14,
  },
  analyzeButton: {
    marginTop: 8,
  },
  buttonIcon: {
    marginRight: 8,
  },
  sectionsCard: {
    margin: 16,
    marginTop: 0,
    elevation: 2,
  },
  sectionsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  sectionItem: {
    marginBottom: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  sectionNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginRight: 12,
    minWidth: 24,
  },
  sectionName: {
    fontSize: 16,
    fontWeight: '500',
    flex: 1,
  },
  completionChip: {
    marginLeft: 8,
  },
  editingSection: {
    backgroundColor: '#F8F9FA',
    padding: 16,
    borderRadius: 8,
  },
  sectionInput: {
    marginBottom: 16,
  },
  suggestionsContainer: {
    marginBottom: 16,
  },
  suggestionsTitle: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
    color: '#666',
  },
  suggestionItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  suggestionText: {
    marginLeft: 8,
    fontSize: 14,
    flex: 1,
  },
  sectionActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  sectionActionButton: {
    marginLeft: 8,
  },
  sectionContent: {
    marginBottom: 8,
  },
  sectionContentText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  suggestionsPreview: {
    backgroundColor: '#FFF3E0',
    padding: 8,
    borderRadius: 4,
    marginBottom: 8,
  },
  suggestionsPreviewText: {
    fontSize: 12,
    color: '#F57C00',
    fontStyle: 'italic',
  },
  editButton: {
    alignSelf: 'flex-start',
  },
  sectionDivider: {
    marginTop: 16,
  },
});

export default BusinessPlanDetailScreen;