import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Alert,
} from 'react-native';
import {
  Card,
  Title,
  Paragraph,
  Button,
  FAB,
  Chip,
  Searchbar,
  useTheme,
  Text,
} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {BusinessPlan} from '../types';

const BusinessPlanScreen: React.FC = () => {
  const navigation = useNavigation();
  const theme = useTheme();
  const [businessPlans, setBusinessPlans] = useState<BusinessPlan[]>([]);
  const [filteredPlans, setFilteredPlans] = useState<BusinessPlan[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSector, setSelectedSector] = useState<string | null>(null);

  const sectors = ['Tous', 'Restauration', 'E-commerce', 'Services', 'Technologie', 'Commerce'];

  // Données de démonstration
  useEffect(() => {
    const mockPlans: BusinessPlan[] = [
      {
        id: '1',
        title: 'Restaurant Le Gourmet',
        description: 'Restaurant gastronomique en centre-ville',
        sector: 'Restauration',
        status: 'completed',
        createdAt: new Date('2024-01-15'),
        updatedAt: new Date('2024-01-20'),
        sections: [],
        aiAnalysis: {
          score: 85,
          suggestions: ['Améliorer la section marketing', 'Ajouter des prévisions financières détaillées'],
          strengths: ['Proposition de valeur claire', 'Analyse de marché solide'],
          weaknesses: ['Plan marketing incomplet'],
          lastAnalyzed: new Date('2024-01-20'),
        },
      },
      {
        id: '2',
        title: 'Boutique en Ligne Mode',
        description: 'E-commerce spécialisé dans la mode éthique',
        sector: 'E-commerce',
        status: 'in_progress',
        createdAt: new Date('2024-01-10'),
        updatedAt: new Date('2024-01-18'),
        sections: [],
      },
      {
        id: '3',
        title: 'Cabinet de Conseil IT',
        description: 'Services de conseil en transformation digitale',
        sector: 'Services',
        status: 'draft',
        createdAt: new Date('2024-01-05'),
        updatedAt: new Date('2024-01-05'),
        sections: [],
      },
    ];
    setBusinessPlans(mockPlans);
    setFilteredPlans(mockPlans);
  }, []);

  // Filtrage des plans
  useEffect(() => {
    let filtered = businessPlans;

    if (searchQuery) {
      filtered = filtered.filter(plan =>
        plan.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        plan.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedSector && selectedSector !== 'Tous') {
      filtered = filtered.filter(plan => plan.sector === selectedSector);
    }

    setFilteredPlans(filtered);
  }, [searchQuery, selectedSector, businessPlans]);

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

  const handleDeletePlan = (planId: string) => {
    Alert.alert(
      'Supprimer le plan',
      'Êtes-vous sûr de vouloir supprimer ce plan d\'affaires ?',
      [
        {text: 'Annuler', style: 'cancel'},
        {
          text: 'Supprimer',
          style: 'destructive',
          onPress: () => {
            setBusinessPlans(prev => prev.filter(plan => plan.id !== planId));
          },
        },
      ]
    );
  };

  const renderBusinessPlan = ({item}: {item: BusinessPlan}) => (
    <Card style={styles.planCard}>
      <Card.Content>
        <View style={styles.planHeader}>
          <Title style={styles.planTitle}>{item.title}</Title>
          <Chip
            style={[styles.statusChip, {backgroundColor: getStatusColor(item.status)}]}
            textStyle={styles.statusChipText}>
            {getStatusText(item.status)}
          </Chip>
        </View>
        
        <Paragraph style={styles.planDescription}>{item.description}</Paragraph>
        
        <View style={styles.planInfo}>
          <View style={styles.infoItem}>
            <Icon name="business" size={16} color={theme.colors.primary} />
            <Text style={styles.infoText}>{item.sector}</Text>
          </View>
          <View style={styles.infoItem}>
            <Icon name="calendar-today" size={16} color={theme.colors.primary} />
            <Text style={styles.infoText}>
              {item.updatedAt.toLocaleDateString('fr-FR')}
            </Text>
          </View>
        </View>

        {item.aiAnalysis && (
          <View style={styles.aiAnalysis}>
            <View style={styles.aiScore}>
              <Icon name="psychology" size={16} color={theme.colors.info} />
              <Text style={styles.aiScoreText}>
                Score IA: {item.aiAnalysis.score}/100
              </Text>
            </View>
          </View>
        )}

        <View style={styles.planActions}>
          <Button
            mode="outlined"
            onPress={() => navigation.navigate('BusinessPlanDetail', {planId: item.id})}
            style={styles.actionButton}>
            Voir
          </Button>
          <Button
            mode="contained"
            onPress={() => navigation.navigate('BusinessPlanDetail', {planId: item.id})}
            style={styles.actionButton}>
            Modifier
          </Button>
          <Button
            mode="text"
            onPress={() => handleDeletePlan(item.id)}
            textColor={theme.colors.error}
            style={styles.actionButton}>
            Supprimer
          </Button>
        </View>
      </Card.Content>
    </Card>
  );

  return (
    <View style={styles.container}>
      {/* Barre de recherche */}
      <Searchbar
        placeholder="Rechercher un plan d'affaires..."
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={styles.searchbar}
      />

      {/* Filtres par secteur */}
      <View style={styles.filtersContainer}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={sectors}
          keyExtractor={(item) => item}
          renderItem={({item}) => (
            <Chip
              selected={selectedSector === item}
              onPress={() => setSelectedSector(item === 'Tous' ? null : item)}
              style={styles.filterChip}>
              {item}
            </Chip>
          )}
        />
      </View>

      {/* Liste des plans d'affaires */}
      <FlatList
        data={filteredPlans}
        keyExtractor={(item) => item.id}
        renderItem={renderBusinessPlan}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Icon name="business" size={64} color={theme.colors.placeholder} />
            <Title style={styles.emptyTitle}>Aucun plan d'affaires</Title>
            <Paragraph style={styles.emptyText}>
              Créez votre premier plan d'affaires pour commencer votre aventure entrepreneuriale.
            </Paragraph>
            <Button
              mode="contained"
              onPress={() => navigation.navigate('CreateBusinessPlan')}
              style={styles.createButton}>
              Créer un Plan d'Affaires
            </Button>
          </View>
        }
      />

      {/* Bouton flottant pour créer un nouveau plan */}
      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => navigation.navigate('CreateBusinessPlan')}
        label="Nouveau Plan"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  searchbar: {
    margin: 16,
    elevation: 2,
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
    paddingBottom: 80,
  },
  planCard: {
    marginBottom: 16,
    elevation: 2,
  },
  planHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  planTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
  },
  statusChip: {
    marginLeft: 8,
  },
  statusChipText: {
    color: 'white',
    fontSize: 12,
  },
  planDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  planInfo: {
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
  aiAnalysis: {
    backgroundColor: '#E3F2FD',
    padding: 8,
    borderRadius: 8,
    marginBottom: 12,
  },
  aiScore: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  aiScoreText: {
    marginLeft: 4,
    fontSize: 12,
    color: '#1976D2',
    fontWeight: '500',
  },
  planActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    flex: 1,
    marginHorizontal: 2,
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
    marginBottom: 24,
    color: '#666',
  },
  createButton: {
    paddingHorizontal: 24,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

export default BusinessPlanScreen;