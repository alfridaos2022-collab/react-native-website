import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Colors } from '@/constants/colors';
import { BusinessPlan } from '@/types';
import Card from '@/components/Card';
import Button from '@/components/Button';
import Input from '@/components/Input';

interface BusinessPlanCardProps {
  plan: BusinessPlan;
  onPress: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

function BusinessPlanCard({ plan, onPress, onEdit, onDelete }: BusinessPlanCardProps) {
  const completedSections = plan.sections.filter(s => s.completed).length;
  const totalSections = plan.sections.length;
  const progress = totalSections > 0 ? (completedSections / totalSections) * 100 : 0;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return Colors.success;
      case 'reviewed':
        return Colors.info;
      default:
        return Colors.warning;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Terminé';
      case 'reviewed':
        return 'Révisé';
      default:
        return 'Brouillon';
    }
  };

  return (
    <Card onPress={onPress} style={styles.planCard}>
      <View style={styles.planHeader}>
        <View style={styles.planInfo}>
          <Text style={styles.planTitle}>{plan.title}</Text>
          <Text style={styles.planDescription} numberOfLines={2}>
            {plan.description}
          </Text>
        </View>
        <View style={styles.planActions}>
          <TouchableOpacity onPress={onEdit} style={styles.actionButton}>
            <Icon name="edit" size={20} color={Colors.primary} />
          </TouchableOpacity>
          <TouchableOpacity onPress={onDelete} style={styles.actionButton}>
            <Icon name="delete" size={20} color={Colors.error} />
          </TouchableOpacity>
        </View>
      </View>
      
      <View style={styles.planMeta}>
        <View style={styles.statusContainer}>
          <View style={[styles.statusDot, { backgroundColor: getStatusColor(plan.status) }]} />
          <Text style={styles.statusText}>{getStatusText(plan.status)}</Text>
        </View>
        <Text style={styles.dateText}>
          Modifié le {plan.updatedAt.toLocaleDateString('fr-FR')}
        </Text>
      </View>

      <View style={styles.progressContainer}>
        <View style={styles.progressHeader}>
          <Text style={styles.progressLabel}>Progression</Text>
          <Text style={styles.progressValue}>
            {completedSections}/{totalSections} sections
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
  );
}

export default function BusinessPlanScreen() {
  const navigation = useNavigation<any>();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  // Mock data - in real app, this would come from a service/state management
  const [businessPlans] = useState<BusinessPlan[]>([
    {
      id: '1',
      title: 'Restaurant "Le Petit Bistro"',
      description: 'Concept de restaurant traditionnel français avec une touche moderne',
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date('2024-01-20'),
      status: 'draft',
      template: {
        id: 'restaurant',
        name: 'Plan d\'affaires - Restauration',
        description: 'Modèle spécialisé pour les restaurants',
        category: 'Restauration',
        sections: []
      },
      sections: [
        {
          id: '1',
          templateSectionId: 'concept-restaurant',
          title: 'Concept du restaurant',
          content: 'Restaurant traditionnel français...',
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
    },
    {
      id: '2',
      title: 'Boutique en ligne - Mode',
      description: 'E-commerce spécialisé dans la mode éthique et durable',
      createdAt: new Date('2024-01-10'),
      updatedAt: new Date('2024-01-18'),
      status: 'completed',
      template: {
        id: 'ecommerce',
        name: 'Plan d\'affaires - E-commerce',
        description: 'Modèle pour boutiques en ligne',
        category: 'E-commerce',
        sections: []
      },
      sections: [
        {
          id: '3',
          templateSectionId: 'digital-strategy',
          title: 'Stratégie digitale',
          content: 'Stratégie omnicanale...',
          order: 1,
          completed: true
        },
        {
          id: '4',
          templateSectionId: 'website-platform',
          title: 'Site web et plateforme',
          content: 'Site e-commerce responsive...',
          order: 2,
          completed: true
        }
      ]
    }
  ]);

  const filters = [
    { label: 'Tous', value: 'all' },
    { label: 'Brouillons', value: 'draft' },
    { label: 'Terminés', value: 'completed' },
    { label: 'Révisés', value: 'reviewed' },
  ];

  const filteredPlans = businessPlans.filter(plan => {
    const matchesSearch = plan.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         plan.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || plan.status === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const handleCreateNew = () => {
    navigation.navigate('BusinessPlanEditor');
  };

  const handleEditPlan = (planId: string) => {
    navigation.navigate('BusinessPlanEditor', { planId });
  };

  const handleDeletePlan = (planId: string) => {
    // In real app, show confirmation dialog and delete from storage
    console.log('Delete plan:', planId);
  };

  const handleViewPlan = (planId: string) => {
    navigation.navigate('BusinessPlanEditor', { planId });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Input
          placeholder="Rechercher un plan d'affaires..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          leftIcon="search"
          containerStyle={styles.searchContainer}
        />
        
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filtersContainer}
        >
          {filters.map((filter) => (
            <TouchableOpacity
              key={filter.value}
              style={[
                styles.filterButton,
                selectedFilter === filter.value && styles.activeFilter
              ]}
              onPress={() => setSelectedFilter(filter.value)}
            >
              <Text
                style={[
                  styles.filterText,
                  selectedFilter === filter.value && styles.activeFilterText
                ]}
              >
                {filter.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView style={styles.content}>
        {filteredPlans.length === 0 ? (
          <Card style={styles.emptyState}>
            <Icon name="description" size={64} color={Colors.gray300} />
            <Text style={styles.emptyTitle}>
              {searchQuery || selectedFilter !== 'all' 
                ? 'Aucun plan trouvé' 
                : 'Aucun plan d\'affaires'}
            </Text>
            <Text style={styles.emptyText}>
              {searchQuery || selectedFilter !== 'all'
                ? 'Essayez de modifier vos critères de recherche'
                : 'Créez votre premier plan d\'affaires pour commencer'}
            </Text>
            {!searchQuery && selectedFilter === 'all' && (
              <Button
                title="Créer mon premier plan"
                onPress={handleCreateNew}
                style={styles.emptyButton}
              />
            )}
          </Card>
        ) : (
          <>
            {filteredPlans.map((plan) => (
              <BusinessPlanCard
                key={plan.id}
                plan={plan}
                onPress={() => handleViewPlan(plan.id)}
                onEdit={() => handleEditPlan(plan.id)}
                onDelete={() => handleDeletePlan(plan.id)}
              />
            ))}
          </>
        )}
      </ScrollView>

      <View style={styles.fab}>
        <TouchableOpacity
          style={styles.fabButton}
          onPress={handleCreateNew}
        >
          <Icon name="add" size={24} color={Colors.white} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    backgroundColor: Colors.white,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  searchContainer: {
    marginBottom: 12,
  },
  filtersContainer: {
    flexDirection: 'row',
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    borderRadius: 20,
    backgroundColor: Colors.gray100,
  },
  activeFilter: {
    backgroundColor: Colors.primary,
  },
  filterText: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  activeFilterText: {
    color: Colors.white,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  planCard: {
    marginBottom: 16,
  },
  planHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  planInfo: {
    flex: 1,
    marginRight: 12,
  },
  planTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  planDescription: {
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
  planActions: {
    flexDirection: 'row',
  },
  actionButton: {
    padding: 8,
    marginLeft: 4,
  },
  planMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  statusText: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  dateText: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  progressContainer: {
    marginTop: 8,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  progressLabel: {
    fontSize: 14,
    color: Colors.textPrimary,
  },
  progressValue: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  progressBar: {
    height: 4,
    backgroundColor: Colors.gray200,
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.primary,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 48,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginTop: 16,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 24,
  },
  emptyButton: {
    alignSelf: 'center',
  },
  fab: {
    position: 'absolute',
    bottom: 24,
    right: 24,
  },
  fabButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.shadow,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
});