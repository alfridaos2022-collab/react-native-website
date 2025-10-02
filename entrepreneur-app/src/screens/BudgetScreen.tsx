import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Colors } from '@/constants/colors';
import { Budget, BudgetCategory, BudgetTransaction } from '@/types';
import Card from '@/components/Card';
import Button from '@/components/Button';
import Input from '@/components/Input';

const { width } = Dimensions.get('window');

interface BudgetOverviewProps {
  budget: Budget;
}

function BudgetOverview({ budget }: BudgetOverviewProps) {
  const incomeCategories = budget.categories.filter(c => c.type === 'income');
  const expenseCategories = budget.categories.filter(c => c.type === 'expense');
  
  const totalBudgetedIncome = incomeCategories.reduce((sum, cat) => sum + cat.budgetedAmount, 0);
  const totalActualIncome = incomeCategories.reduce((sum, cat) => sum + cat.actualAmount, 0);
  const totalBudgetedExpenses = expenseCategories.reduce((sum, cat) => sum + cat.budgetedAmount, 0);
  const totalActualExpenses = expenseCategories.reduce((sum, cat) => sum + cat.actualAmount, 0);
  
  const budgetedBalance = totalBudgetedIncome - totalBudgetedExpenses;
  const actualBalance = totalActualIncome - totalActualExpenses;

  return (
    <Card style={styles.overviewCard}>
      <Text style={styles.overviewTitle}>Vue d'ensemble</Text>
      
      <View style={styles.balanceContainer}>
        <View style={styles.balanceItem}>
          <Text style={styles.balanceLabel}>Solde prévu</Text>
          <Text style={[
            styles.balanceValue,
            { color: budgetedBalance >= 0 ? Colors.success : Colors.error }
          ]}>
            {budgetedBalance.toFixed(2)} €
          </Text>
        </View>
        <View style={styles.balanceItem}>
          <Text style={styles.balanceLabel}>Solde réel</Text>
          <Text style={[
            styles.balanceValue,
            { color: actualBalance >= 0 ? Colors.success : Colors.error }
          ]}>
            {actualBalance.toFixed(2)} €
          </Text>
        </View>
      </View>

      <View style={styles.summaryGrid}>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>Revenus prévus</Text>
          <Text style={[styles.summaryValue, { color: Colors.success }]}>
            {totalBudgetedIncome.toFixed(2)} €
          </Text>
        </View>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>Revenus réels</Text>
          <Text style={[styles.summaryValue, { color: Colors.success }]}>
            {totalActualIncome.toFixed(2)} €
          </Text>
        </View>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>Dépenses prévues</Text>
          <Text style={[styles.summaryValue, { color: Colors.error }]}>
            {totalBudgetedExpenses.toFixed(2)} €
          </Text>
        </View>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>Dépenses réelles</Text>
          <Text style={[styles.summaryValue, { color: Colors.error }]}>
            {totalActualExpenses.toFixed(2)} €
          </Text>
        </View>
      </View>
    </Card>
  );
}

interface CategoryCardProps {
  category: BudgetCategory;
  onPress: () => void;
  onAddTransaction: () => void;
}

function CategoryCard({ category, onPress, onAddTransaction }: CategoryCardProps) {
  const progress = category.budgetedAmount > 0 
    ? (category.actualAmount / category.budgetedAmount) * 100 
    : 0;
  
  const isOverBudget = category.actualAmount > category.budgetedAmount;
  const remaining = category.budgetedAmount - category.actualAmount;

  const getProgressColor = () => {
    if (isOverBudget) return Colors.error;
    if (progress > 80) return Colors.warning;
    return category.type === 'income' ? Colors.success : Colors.primary;
  };

  return (
    <Card onPress={onPress} style={styles.categoryCard}>
      <View style={styles.categoryHeader}>
        <View style={styles.categoryInfo}>
          <Text style={styles.categoryName}>{category.name}</Text>
          <Text style={styles.categoryType}>
            {category.type === 'income' ? 'Revenus' : 'Dépenses'}
          </Text>
        </View>
        <TouchableOpacity onPress={onAddTransaction} style={styles.addTransactionButton}>
          <Icon name="add" size={20} color={Colors.primary} />
        </TouchableOpacity>
      </View>

      <View style={styles.categoryAmounts}>
        <View style={styles.amountItem}>
          <Text style={styles.amountLabel}>Prévu</Text>
          <Text style={styles.amountValue}>
            {category.budgetedAmount.toFixed(2)} €
          </Text>
        </View>
        <View style={styles.amountItem}>
          <Text style={styles.amountLabel}>Réel</Text>
          <Text style={[
            styles.amountValue,
            { color: category.type === 'income' ? Colors.success : Colors.error }
          ]}>
            {category.actualAmount.toFixed(2)} €
          </Text>
        </View>
      </View>

      <View style={styles.progressContainer}>
        <View style={styles.progressHeader}>
          <Text style={styles.progressLabel}>
            {category.type === 'income' ? 'Réalisé' : 'Consommé'}
          </Text>
          <Text style={[
            styles.progressValue,
            { color: isOverBudget ? Colors.error : Colors.textSecondary }
          ]}>
            {Math.abs(progress).toFixed(0)}%
            {isOverBudget && ' (dépassé)'}
          </Text>
        </View>
        <View style={styles.progressBar}>
          <View
            style={[
              styles.progressFill,
              {
                width: `${Math.min(progress, 100)}%`,
                backgroundColor: getProgressColor(),
              }
            ]}
          />
        </View>
        {category.type === 'expense' && (
          <Text style={[
            styles.remainingText,
            { color: remaining >= 0 ? Colors.success : Colors.error }
          ]}>
            {remaining >= 0 ? 'Restant' : 'Dépassement'}: {Math.abs(remaining).toFixed(2)} €
          </Text>
        )}
      </View>

      <Text style={styles.transactionsCount}>
        {category.transactions.length} transaction{category.transactions.length > 1 ? 's' : ''}
      </Text>
    </Card>
  );
}

export default function BudgetScreen() {
  const navigation = useNavigation<any>();
  const [selectedPeriod, setSelectedPeriod] = useState('current');

  // Mock data - in real app, this would come from a service/state management
  const [budgets] = useState<Budget[]>([
    {
      id: '1',
      name: 'Budget 2024',
      description: 'Budget annuel pour l\'entreprise',
      startDate: new Date('2024-01-01'),
      endDate: new Date('2024-12-31'),
      totalIncome: 85000,
      totalExpenses: 72000,
      balance: 13000,
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-20'),
      categories: [
        {
          id: '1',
          name: 'Ventes de services',
          type: 'income',
          budgetedAmount: 80000,
          actualAmount: 65000,
          transactions: [
            {
              id: '1',
              description: 'Projet site web Restaurant Le Gourmet',
              amount: 3000,
              date: new Date('2024-01-15'),
              categoryId: '1',
              type: 'income'
            },
            {
              id: '2',
              description: 'Formation équipe Boutique Mode',
              amount: 1500,
              date: new Date('2024-01-18'),
              categoryId: '1',
              type: 'income'
            }
          ]
        },
        {
          id: '2',
          name: 'Subventions',
          type: 'income',
          budgetedAmount: 5000,
          actualAmount: 5000,
          transactions: [
            {
              id: '3',
              description: 'Aide à la création d\'entreprise',
              amount: 5000,
              date: new Date('2024-01-10'),
              categoryId: '2',
              type: 'income'
            }
          ]
        },
        {
          id: '3',
          name: 'Salaires et charges',
          type: 'expense',
          budgetedAmount: 45000,
          actualAmount: 38000,
          transactions: [
            {
              id: '4',
              description: 'Salaire janvier',
              amount: 3500,
              date: new Date('2024-01-31'),
              categoryId: '3',
              type: 'expense'
            }
          ]
        },
        {
          id: '4',
          name: 'Bureaux et équipements',
          type: 'expense',
          budgetedAmount: 12000,
          actualAmount: 8500,
          transactions: [
            {
              id: '5',
              description: 'Loyer bureau janvier',
              amount: 800,
              date: new Date('2024-01-01'),
              categoryId: '4',
              type: 'expense'
            },
            {
              id: '6',
              description: 'Ordinateur portable',
              amount: 1200,
              date: new Date('2024-01-05'),
              categoryId: '4',
              type: 'expense'
            }
          ]
        },
        {
          id: '5',
          name: 'Marketing et communication',
          type: 'expense',
          budgetedAmount: 8000,
          actualAmount: 12000,
          transactions: [
            {
              id: '7',
              description: 'Campagne publicitaire Facebook',
              amount: 500,
              date: new Date('2024-01-12'),
              categoryId: '5',
              type: 'expense'
            },
            {
              id: '8',
              description: 'Création logo et identité visuelle',
              amount: 2500,
              date: new Date('2024-01-08'),
              categoryId: '5',
              type: 'expense'
            }
          ]
        }
      ]
    }
  ]);

  const currentBudget = budgets[0]; // For demo, use first budget

  const periods = [
    { label: 'Budget actuel', value: 'current' },
    { label: 'Ce mois', value: 'month' },
    { label: 'Ce trimestre', value: 'quarter' },
  ];

  const handleCreateNew = () => {
    navigation.navigate('BudgetEditor');
  };

  const handleEditBudget = () => {
    navigation.navigate('BudgetEditor', { budgetId: currentBudget.id });
  };

  const handleCategoryPress = (categoryId: string) => {
    // Navigate to category details/transactions
    console.log('View category:', categoryId);
  };

  const handleAddTransaction = (categoryId: string) => {
    // Navigate to add transaction
    console.log('Add transaction to category:', categoryId);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Text style={styles.budgetTitle}>{currentBudget.name}</Text>
          <TouchableOpacity onPress={handleEditBudget}>
            <Icon name="edit" size={24} color={Colors.primary} />
          </TouchableOpacity>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.periodsContainer}
        >
          {periods.map((period) => (
            <TouchableOpacity
              key={period.value}
              style={[
                styles.periodButton,
                selectedPeriod === period.value && styles.activePeriod
              ]}
              onPress={() => setSelectedPeriod(period.value)}
            >
              <Text
                style={[
                  styles.periodText,
                  selectedPeriod === period.value && styles.activePeriodText
                ]}
              >
                {period.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView style={styles.content}>
        <BudgetOverview budget={currentBudget} />

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Revenus</Text>
            <Text style={styles.sectionCount}>
              {currentBudget.categories.filter(c => c.type === 'income').length} catégories
            </Text>
          </View>
          {currentBudget.categories
            .filter(category => category.type === 'income')
            .map((category) => (
              <CategoryCard
                key={category.id}
                category={category}
                onPress={() => handleCategoryPress(category.id)}
                onAddTransaction={() => handleAddTransaction(category.id)}
              />
            ))}
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Dépenses</Text>
            <Text style={styles.sectionCount}>
              {currentBudget.categories.filter(c => c.type === 'expense').length} catégories
            </Text>
          </View>
          {currentBudget.categories
            .filter(category => category.type === 'expense')
            .map((category) => (
              <CategoryCard
                key={category.id}
                category={category}
                onPress={() => handleCategoryPress(category.id)}
                onAddTransaction={() => handleAddTransaction(category.id)}
              />
            ))}
        </View>

        <Card style={styles.actionsCard}>
          <Text style={styles.actionsTitle}>Actions rapides</Text>
          <View style={styles.actionsGrid}>
            <TouchableOpacity style={styles.actionItem}>
              <Icon name="add-circle" size={32} color={Colors.success} />
              <Text style={styles.actionText}>Ajouter revenus</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionItem}>
              <Icon name="remove-circle" size={32} color={Colors.error} />
              <Text style={styles.actionText}>Ajouter dépense</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionItem}>
              <Icon name="category" size={32} color={Colors.primary} />
              <Text style={styles.actionText}>Nouvelle catégorie</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionItem}>
              <Icon name="assessment" size={32} color={Colors.info} />
              <Text style={styles.actionText}>Rapport</Text>
            </TouchableOpacity>
          </View>
        </Card>
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
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  budgetTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.textPrimary,
  },
  periodsContainer: {
    flexDirection: 'row',
  },
  periodButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    borderRadius: 20,
    backgroundColor: Colors.gray100,
  },
  activePeriod: {
    backgroundColor: Colors.primary,
  },
  periodText: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  activePeriodText: {
    color: Colors.white,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  overviewCard: {
    marginBottom: 24,
  },
  overviewTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginBottom: 16,
  },
  balanceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
    paddingVertical: 16,
    backgroundColor: Colors.gray50,
    borderRadius: 8,
  },
  balanceItem: {
    alignItems: 'center',
  },
  balanceLabel: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 4,
  },
  balanceValue: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  summaryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  summaryItem: {
    width: '48%',
    marginBottom: 12,
  },
  summaryLabel: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginBottom: 4,
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: '600',
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.textPrimary,
  },
  sectionCount: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  categoryCard: {
    marginBottom: 12,
  },
  categoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  categoryInfo: {
    flex: 1,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: 2,
  },
  categoryType: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  addTransactionButton: {
    padding: 8,
    backgroundColor: Colors.primary + '10',
    borderRadius: 20,
  },
  categoryAmounts: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  amountItem: {
    flex: 1,
  },
  amountLabel: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginBottom: 4,
  },
  amountValue: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  progressContainer: {
    marginBottom: 8,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  progressLabel: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  progressValue: {
    fontSize: 12,
    fontWeight: '500',
  },
  progressBar: {
    height: 6,
    backgroundColor: Colors.gray200,
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 4,
  },
  progressFill: {
    height: '100%',
  },
  remainingText: {
    fontSize: 11,
    textAlign: 'right',
  },
  transactionsCount: {
    fontSize: 11,
    color: Colors.textSecondary,
  },
  actionsCard: {
    marginBottom: 100,
  },
  actionsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginBottom: 16,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionItem: {
    width: '48%',
    alignItems: 'center',
    paddingVertical: 16,
    marginBottom: 12,
    backgroundColor: Colors.gray50,
    borderRadius: 8,
  },
  actionText: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 8,
    textAlign: 'center',
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