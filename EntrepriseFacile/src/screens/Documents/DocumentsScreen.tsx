import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { SafeAreaView } from 'react-native-safe-area-context';

import { COLORS, DOCUMENT_CATEGORIES } from '../../constants';
import { BusinessPlan } from '../../types';

interface DocumentsScreenProps {
  navigation: any;
}

const DocumentsScreen: React.FC<DocumentsScreenProps> = ({ navigation }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Mock data - in real app, this would come from state management
  const businessPlans: BusinessPlan[] = [
    {
      id: '1',
      userId: '1',
      title: 'Mon Restaurant',
      industry: 'restaurant',
      businessType: 'restaurant',
      status: 'draft',
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date('2024-01-20'),
      sections: [],
    },
    {
      id: '2',
      userId: '1',
      title: 'Startup Tech',
      industry: 'technology',
      businessType: 'startup',
      status: 'completed',
      createdAt: new Date('2024-01-10'),
      updatedAt: new Date('2024-01-18'),
      sections: [],
    },
    {
      id: '3',
      userId: '1',
      title: 'Boutique en ligne',
      industry: 'ecommerce',
      businessType: 'ecommerce',
      status: 'published',
      createdAt: new Date('2024-01-05'),
      updatedAt: new Date('2024-01-12'),
      sections: [],
    },
  ];

  const filteredPlans = selectedCategory === 'all' 
    ? businessPlans 
    : businessPlans.filter(plan => plan.businessType === selectedCategory);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft': return COLORS.warning;
      case 'completed': return COLORS.success;
      case 'published': return COLORS.info;
      default: return COLORS.textSecondary;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'draft': return 'Brouillon';
      case 'completed': return 'Terminé';
      case 'published': return 'Publié';
      default: return status;
    }
  };

  const handleDeletePlan = (planId: string) => {
    Alert.alert(
      'Supprimer le plan',
      'Êtes-vous sûr de vouloir supprimer ce plan d\'affaires ?',
      [
        { text: 'Annuler', style: 'cancel' },
        { 
          text: 'Supprimer', 
          style: 'destructive',
          onPress: () => {
            // Handle delete logic
            console.log('Delete plan:', planId);
          }
        },
      ]
    );
  };

  const CategoryFilter = ({ category }: { category: { value: string; label: string } }) => (
    <TouchableOpacity
      style={[
        styles.categoryFilter,
        selectedCategory === category.value && styles.categoryFilterActive
      ]}
      onPress={() => setSelectedCategory(category.value)}
    >
      <Text style={[
        styles.categoryFilterText,
        selectedCategory === category.value && styles.categoryFilterTextActive
      ]}>
        {category.label}
      </Text>
    </TouchableOpacity>
  );

  const PlanCard = ({ plan }: { plan: BusinessPlan }) => (
    <TouchableOpacity 
      style={styles.planCard}
      onPress={() => navigation.navigate('BusinessPlanEdit', { planId: plan.id })}
    >
      <View style={styles.planHeader}>
        <View style={styles.planInfo}>
          <Text style={styles.planTitle}>{plan.title}</Text>
          <Text style={styles.planSubtitle}>
            {DOCUMENT_CATEGORIES.find(c => c.value === plan.businessType)?.label || plan.businessType}
          </Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(plan.status) }]}>
          <Text style={styles.statusText}>{getStatusLabel(plan.status)}</Text>
        </View>
      </View>
      
      <View style={styles.planFooter}>
        <Text style={styles.planDate}>
          Modifié le {plan.updatedAt.toLocaleDateString('fr-FR')}
        </Text>
        <View style={styles.planActions}>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => navigation.navigate('BusinessPlanEdit', { planId: plan.id })}
          >
            <Icon name="edit" size={20} color={COLORS.primary} />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => handleDeletePlan(plan.id)}
          >
            <Icon name="delete" size={20} color={COLORS.error} />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  const EmptyState = () => (
    <View style={styles.emptyState}>
      <Icon name="description" size={64} color={COLORS.textSecondary} />
      <Text style={styles.emptyStateTitle}>Aucun document</Text>
      <Text style={styles.emptyStateDescription}>
        Créez votre premier plan d'affaires pour commencer
      </Text>
      <TouchableOpacity 
        style={styles.createButton}
        onPress={() => navigation.navigate('BusinessPlanCreate')}
      >
        <Text style={styles.createButtonText}>Créer un plan d'affaires</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Mes Documents</Text>
        <TouchableOpacity 
          style={styles.addButton}
          onPress={() => navigation.navigate('BusinessPlanCreate')}
        >
          <Icon name="add" size={24} color={COLORS.surface} />
        </TouchableOpacity>
      </View>

      {/* Category Filters */}
      <View style={styles.filtersContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <CategoryFilter category={{ value: 'all', label: 'Tous' }} />
          {DOCUMENT_CATEGORIES.map((category) => (
            <CategoryFilter key={category.value} category={category} />
          ))}
        </ScrollView>
      </View>

      {/* Documents List */}
      <View style={styles.content}>
        {filteredPlans.length > 0 ? (
          <FlatList
            data={filteredPlans}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <PlanCard plan={item} />}
            contentContainerStyle={styles.listContainer}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <EmptyState />
        )}
      </View>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: COLORS.surface,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.primaryLight,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  addButton: {
    backgroundColor: COLORS.primary,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filtersContainer: {
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  categoryFilter: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.primaryLight,
  },
  categoryFilterActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  categoryFilterText: {
    fontSize: 14,
    color: COLORS.primary,
    fontWeight: '500',
  },
  categoryFilterTextActive: {
    color: COLORS.surface,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  listContainer: {
    paddingBottom: 20,
  },
  planCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  planHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  planInfo: {
    flex: 1,
    marginRight: 10,
  },
  planTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 2,
  },
  planSubtitle: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    color: COLORS.surface,
    fontWeight: '500',
  },
  planFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  planDate: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  planActions: {
    flexDirection: 'row',
  },
  actionButton: {
    padding: 8,
    marginLeft: 5,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
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
    marginBottom: 30,
  },
  createButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
  },
  createButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.surface,
  },
});

export default DocumentsScreen;