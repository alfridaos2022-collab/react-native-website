import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Linking,
  Alert,
} from 'react-native';
import {
  Card,
  Title,
  Paragraph,
  Button,
  Chip,
  useTheme,
  Text,
  ProgressBar,
} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {AdministrativeStep} from '../types';

const AdminScreen: React.FC = () => {
  const navigation = useNavigation();
  const theme = useTheme();
  const [steps, setSteps] = useState<AdministrativeStep[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = ['Toutes', 'Création', 'Légal', 'Fiscal', 'Social'];

  // Données de démonstration pour les démarches administratives
  useEffect(() => {
    const mockSteps: AdministrativeStep[] = [
      {
        id: '1',
        title: 'Choisir le statut juridique',
        description: 'Définir la forme juridique de votre entreprise (SARL, SAS, auto-entrepreneur, etc.)',
        category: 'creation',
        priority: 'high',
        estimatedTime: '1-2 jours',
        requiredDocuments: ['Pièce d\'identité', 'Justificatif de domicile'],
        links: [
          {
            id: '1',
            title: 'Guide des statuts juridiques',
            url: 'https://www.service-public.fr/professionnels-entreprises/vosdroits/F31228',
            description: 'Comparatif des différents statuts juridiques',
          },
        ],
        isCompleted: false,
      },
      {
        id: '2',
        title: 'Immatriculation au RCS',
        description: 'Enregistrer votre entreprise au Registre du Commerce et des Sociétés',
        category: 'creation',
        priority: 'high',
        estimatedTime: '1 semaine',
        requiredDocuments: ['Statuts', 'K-bis', 'Pièce d\'identité'],
        links: [
          {
            id: '1',
            title: 'CFE (Centre de Formalités des Entreprises)',
            url: 'https://www.cfe.urssaf.fr/',
            description: 'Démarches en ligne pour l\'immatriculation',
          },
        ],
        isCompleted: false,
      },
      {
        id: '3',
        title: 'Ouverture compte bancaire professionnel',
        description: 'Créer un compte bancaire dédié à votre activité professionnelle',
        category: 'creation',
        priority: 'medium',
        estimatedTime: '1-2 semaines',
        requiredDocuments: ['K-bis', 'Statuts', 'Pièce d\'identité'],
        links: [],
        isCompleted: false,
      },
      {
        id: '4',
        title: 'Déclaration TVA',
        description: 'S\'inscrire à la TVA si votre chiffre d\'affaires dépasse les seuils',
        category: 'fiscal',
        priority: 'medium',
        estimatedTime: '1 jour',
        requiredDocuments: ['K-bis', 'Déclaration de chiffre d\'affaires'],
        links: [
          {
            id: '1',
            title: 'Service Public - TVA',
            url: 'https://www.service-public.fr/professionnels-entreprises/vosdroits/F31228',
            description: 'Informations sur la TVA',
          },
        ],
        isCompleted: false,
      },
      {
        id: '5',
        title: 'Inscription URSSAF',
        description: 'S\'inscrire aux organismes de sécurité sociale',
        category: 'social',
        priority: 'high',
        estimatedTime: '1 semaine',
        requiredDocuments: ['K-bis', 'Statuts', 'Contrat de travail'],
        links: [
          {
            id: '1',
            title: 'URSSAF',
            url: 'https://www.urssaf.fr/',
            description: 'Déclarations sociales en ligne',
          },
        ],
        isCompleted: false,
      },
      {
        id: '6',
        title: 'Assurance responsabilité civile professionnelle',
        description: 'Souscrire une assurance RC Pro pour protéger votre activité',
        category: 'legal',
        priority: 'medium',
        estimatedTime: '1 jour',
        requiredDocuments: ['K-bis', 'Statuts', 'Descriptif de l\'activité'],
        links: [],
        isCompleted: false,
      },
    ];
    setSteps(mockSteps);
  }, []);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return theme.colors.error;
      case 'medium':
        return theme.colors.warning;
      case 'low':
        return theme.colors.success;
      default:
        return theme.colors.placeholder;
    }
  };

  const getPriorityText = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'Priorité Haute';
      case 'medium':
        return 'Priorité Moyenne';
      case 'low':
        return 'Priorité Basse';
      default:
        return 'Inconnue';
    }
  };

  const getCategoryText = (category: string) => {
    switch (category) {
      case 'creation':
        return 'Création';
      case 'legal':
        return 'Légal';
      case 'fiscal':
        return 'Fiscal';
      case 'social':
        return 'Social';
      default:
        return 'Inconnu';
    }
  };

  const handleOpenLink = async (url: string) => {
    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert('Erreur', 'Impossible d\'ouvrir ce lien');
      }
    } catch (error) {
      Alert.alert('Erreur', 'Une erreur est survenue lors de l\'ouverture du lien');
    }
  };

  const handleToggleStep = (stepId: string) => {
    setSteps(steps.map(step => 
      step.id === stepId 
        ? {...step, isCompleted: !step.isCompleted}
        : step
    ));
  };

  const filteredSteps = selectedCategory && selectedCategory !== 'Toutes'
    ? steps.filter(step => step.category === selectedCategory.toLowerCase())
    : steps;

  const completedSteps = steps.filter(step => step.isCompleted).length;
  const totalSteps = steps.length;
  const progressPercentage = totalSteps > 0 ? completedSteps / totalSteps : 0;

  const renderStep = ({item}: {item: AdministrativeStep}) => (
    <Card style={[styles.stepCard, item.isCompleted && styles.completedStep]}>
      <Card.Content>
        <View style={styles.stepHeader}>
          <View style={styles.stepTitleContainer}>
            <Title style={[styles.stepTitle, item.isCompleted && styles.completedText]}>
              {item.title}
            </Title>
            <Chip style={[styles.categoryChip, {backgroundColor: getPriorityColor(item.priority)}]}>
              {getPriorityText(item.priority)}
            </Chip>
          </View>
          <Button
            mode={item.isCompleted ? 'contained' : 'outlined'}
            onPress={() => handleToggleStep(item.id)}
            compact>
            {item.isCompleted ? 'Terminé' : 'Marquer'}
          </Button>
        </View>

        <Paragraph style={styles.stepDescription}>{item.description}</Paragraph>

        <View style={styles.stepInfo}>
          <View style={styles.infoItem}>
            <Icon name="schedule" size={16} color={theme.colors.primary} />
            <Text style={styles.infoText}>{item.estimatedTime}</Text>
          </View>
          <View style={styles.infoItem}>
            <Icon name="folder" size={16} color={theme.colors.primary} />
            <Text style={styles.infoText}>{item.requiredDocuments.length} documents</Text>
          </View>
        </View>

        {item.links.length > 0 && (
          <View style={styles.linksContainer}>
            <Text style={styles.linksTitle}>Liens utiles:</Text>
            {item.links.map((link) => (
              <Button
                key={link.id}
                mode="text"
                onPress={() => handleOpenLink(link.url)}
                style={styles.linkButton}>
                <Icon name="open-in-new" size={16} style={styles.linkIcon} />
                {link.title}
              </Button>
            ))}
          </View>
        )}
      </Card.Content>
    </Card>
  );

  return (
    <View style={styles.container}>
      {/* Progression générale */}
      <Card style={styles.progressCard}>
        <Card.Content>
          <Title style={styles.progressTitle}>Progression des Démarches</Title>
          <View style={styles.progressContainer}>
            <ProgressBar
              progress={progressPercentage}
              color={theme.colors.primary}
              style={styles.progressBar}
            />
            <Text style={styles.progressText}>
              {completedSteps} / {totalSteps} étapes terminées
            </Text>
          </View>
        </Card.Content>
      </Card>

      {/* Statistiques par catégorie */}
      <View style={styles.statsContainer}>
        {categories.slice(1).map((category) => {
          const categorySteps = steps.filter(step => step.category === category.toLowerCase());
          const completedCategorySteps = categorySteps.filter(step => step.isCompleted).length;
          const categoryProgress = categorySteps.length > 0 ? completedCategorySteps / categorySteps.length : 0;
          
          return (
            <Card key={category} style={styles.statCard}>
              <Card.Content style={styles.statContent}>
                <Text style={styles.statLabel}>{category}</Text>
                <Text style={styles.statValue}>
                  {completedCategorySteps}/{categorySteps.length}
                </Text>
                <ProgressBar
                  progress={categoryProgress}
                  color={theme.colors.primary}
                  style={styles.statProgressBar}
                />
              </Card.Content>
            </Card>
          );
        })}
      </View>

      {/* Filtres par catégorie */}
      <View style={styles.filtersContainer}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={categories}
          keyExtractor={(item) => item}
          renderItem={({item}) => (
            <Chip
              selected={selectedCategory === item}
              onPress={() => setSelectedCategory(item === 'Toutes' ? null : item)}
              style={styles.filterChip}>
              {item}
            </Chip>
          )}
        />
      </View>

      {/* Liste des démarches */}
      <FlatList
        data={filteredSteps}
        keyExtractor={(item) => item.id}
        renderItem={renderStep}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Icon name="admin-panel-settings" size={64} color={theme.colors.placeholder} />
            <Title style={styles.emptyTitle}>Aucune démarche</Title>
            <Paragraph style={styles.emptyText}>
              Les démarches administratives pour votre secteur d'activité seront bientôt disponibles.
            </Paragraph>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  progressCard: {
    margin: 16,
    elevation: 2,
  },
  progressTitle: {
    fontSize: 18,
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
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  statCard: {
    flex: 1,
    marginHorizontal: 4,
    elevation: 1,
  },
  statContent: {
    alignItems: 'center',
    paddingVertical: 8,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 8,
  },
  statProgressBar: {
    width: '100%',
    height: 4,
    borderRadius: 2,
  },
  filtersContainer: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  filterChip: {
    marginRight: 8,
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  stepCard: {
    marginBottom: 16,
    elevation: 2,
  },
  completedStep: {
    backgroundColor: '#E8F5E8',
  },
  stepHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  stepTitleContainer: {
    flex: 1,
    marginRight: 12,
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  completedText: {
    textDecorationLine: 'line-through',
    opacity: 0.7,
  },
  categoryChip: {
    alignSelf: 'flex-start',
  },
  stepDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  stepInfo: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  infoText: {
    marginLeft: 4,
    fontSize: 12,
    color: '#666',
  },
  linksContainer: {
    marginTop: 8,
  },
  linksTitle: {
    fontSize: 12,
    fontWeight: '500',
    color: '#666',
    marginBottom: 8,
  },
  linkButton: {
    justifyContent: 'flex-start',
    marginBottom: 4,
  },
  linkIcon: {
    marginRight: 8,
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: 20,
    marginTop: 16,
    textAlign: 'center',
  },
  emptyText: {
    fontSize: 14,
    textAlign: 'center',
    marginTop: 8,
    color: '#666',
  },
});

export default AdminScreen;