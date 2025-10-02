import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { SafeAreaView } from 'react-native-safe-area-context';

import { COLORS, DEFAULT_TEMPLATES, DOCUMENT_CATEGORIES } from '../../constants';
import { DocumentTemplate } from '../../types';

interface TemplatesScreenProps {
  navigation: any;
}

const TemplatesScreen: React.FC<TemplatesScreenProps> = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredTemplates = DEFAULT_TEMPLATES.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

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

  const TemplateCard = ({ template }: { template: DocumentTemplate }) => (
    <TouchableOpacity 
      style={styles.templateCard}
      onPress={() => {
        // Navigate to create screen with selected template
        navigation.navigate('BusinessPlanCreate', { 
          templateId: template.id,
          businessType: template.industry 
        });
      }}
    >
      <View style={styles.templateHeader}>
        <View style={styles.templateInfo}>
          <Text style={styles.templateTitle}>{template.name}</Text>
          <Text style={styles.templateCategory}>
            {DOCUMENT_CATEGORIES.find(c => c.value === template.category)?.label}
          </Text>
        </View>
        {template.isPremium && (
          <View style={styles.premiumBadge}>
            <Icon name="star" size={16} color={COLORS.surface} />
            <Text style={styles.premiumText}>Premium</Text>
          </View>
        )}
      </View>
      
      <Text style={styles.templateDescription}>{template.description}</Text>
      
      <View style={styles.templateFooter}>
        <View style={styles.templateStats}>
          <Icon name="description" size={16} color={COLORS.textSecondary} />
          <Text style={styles.templateStatsText}>
            {template.sections.length} sections
          </Text>
        </View>
        <View style={styles.templateActions}>
          <Icon name="chevron-right" size={20} color={COLORS.textSecondary} />
        </View>
      </View>
    </TouchableOpacity>
  );

  const EmptyState = () => (
    <View style={styles.emptyState}>
      <Icon name="search-off" size={64} color={COLORS.textSecondary} />
      <Text style={styles.emptyStateTitle}>Aucun modèle trouvé</Text>
      <Text style={styles.emptyStateDescription}>
        Essayez de modifier vos critères de recherche
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Icon name="search" size={20} color={COLORS.textSecondary} />
          <TextInput
            style={styles.searchInput}
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Rechercher un modèle..."
            placeholderTextColor={COLORS.textSecondary}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Icon name="clear" size={20} color={COLORS.textSecondary} />
            </TouchableOpacity>
          )}
        </View>
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

      {/* Templates List */}
      <View style={styles.content}>
        {filteredTemplates.length > 0 ? (
          <FlatList
            data={filteredTemplates}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <TemplateCard template={item} />}
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
  searchContainer: {
    padding: 20,
    backgroundColor: COLORS.surface,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.primaryLight,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: COLORS.text,
    marginLeft: 10,
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
  templateCard: {
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
  templateHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  templateInfo: {
    flex: 1,
    marginRight: 10,
  },
  templateTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 2,
  },
  templateCategory: {
    fontSize: 12,
    color: COLORS.textSecondary,
    textTransform: 'uppercase',
  },
  premiumBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.secondary,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  premiumText: {
    fontSize: 12,
    color: COLORS.surface,
    fontWeight: '500',
    marginLeft: 4,
  },
  templateDescription: {
    fontSize: 14,
    color: COLORS.textSecondary,
    lineHeight: 20,
    marginBottom: 15,
  },
  templateFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  templateStats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  templateStatsText: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginLeft: 4,
  },
  templateActions: {
    padding: 5,
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
  },
});

export default TemplatesScreen;