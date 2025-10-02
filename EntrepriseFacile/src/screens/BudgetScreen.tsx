import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Dimensions,
} from 'react-native';
import {
  Card,
  Title,
  Paragraph,
  Button,
  FAB,
  useTheme,
  Text,
  ProgressBar,
} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {LineChart, PieChart} from 'react-native-chart-kit';
import {Budget} from '../types';

const {width} = Dimensions.get('window');

const BudgetScreen: React.FC = () => {
  const navigation = useNavigation();
  const theme = useTheme();
  const [budgets, setBudgets] = useState<Budget[]>([]);

  // Données de démonstration
  useEffect(() => {
    const mockBudgets: Budget[] = [
      {
        id: '1',
        title: 'Budget 2024',
        period: 'yearly',
        startDate: new Date('2024-01-01'),
        endDate: new Date('2024-12-31'),
        categories: [
          {
            id: '1',
            name: 'Revenus',
            type: 'income',
            budgetedAmount: 120000,
            actualAmount: 95000,
            variance: -25000,
            items: [],
          },
          {
            id: '2',
            name: 'Salaires',
            type: 'expense',
            budgetedAmount: 60000,
            actualAmount: 58000,
            variance: 2000,
            items: [],
          },
          {
            id: '3',
            name: 'Marketing',
            type: 'expense',
            budgetedAmount: 15000,
            actualAmount: 18000,
            variance: -3000,
            items: [],
          },
          {
            id: '4',
            name: 'Frais Généraux',
            type: 'expense',
            budgetedAmount: 25000,
            actualAmount: 22000,
            variance: 3000,
            items: [],
          },
        ],
        totalIncome: 95000,
        totalExpenses: 98000,
        balance: -3000,
        createdAt: new Date('2024-01-01'),
      },
      {
        id: '2',
        title: 'Budget Q1 2024',
        period: 'quarterly',
        startDate: new Date('2024-01-01'),
        endDate: new Date('2024-03-31'),
        categories: [
          {
            id: '1',
            name: 'Revenus',
            type: 'income',
            budgetedAmount: 30000,
            actualAmount: 28000,
            variance: -2000,
            items: [],
          },
          {
            id: '2',
            name: 'Salaires',
            type: 'expense',
            budgetedAmount: 15000,
            actualAmount: 15000,
            variance: 0,
            items: [],
          },
          {
            id: '3',
            name: 'Marketing',
            type: 'expense',
            budgetedAmount: 5000,
            actualAmount: 4500,
            variance: 500,
            items: [],
          },
        ],
        totalIncome: 28000,
        totalExpenses: 19500,
        balance: 8500,
        createdAt: new Date('2024-01-01'),
      },
    ];
    setBudgets(mockBudgets);
  }, []);

  const getPeriodText = (period: string) => {
    switch (period) {
      case 'monthly':
        return 'Mensuel';
      case 'quarterly':
        return 'Trimestriel';
      case 'yearly':
        return 'Annuel';
      default:
        return 'Inconnu';
    }
  };

  const getBalanceColor = (balance: number) => {
    return balance >= 0 ? theme.colors.success : theme.colors.error;
  };

  const getVarianceColor = (variance: number, type: 'income' | 'expense') => {
    if (type === 'income') {
      return variance >= 0 ? theme.colors.success : theme.colors.error;
    } else {
      return variance <= 0 ? theme.colors.success : theme.colors.error;
    }
  };

  // Données pour les graphiques
  const chartData = {
    labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun'],
    datasets: [
      {
        data: [20000, 25000, 28000, 22000, 30000, 35000],
        color: (opacity = 1) => `rgba(46, 125, 50, ${opacity})`,
        strokeWidth: 2,
      },
    ],
  };

  const pieData = [
    {
      name: 'Salaires',
      population: 58000,
      color: '#FF6B6B',
      legendFontColor: '#7F7F7F',
      legendFontSize: 12,
    },
    {
      name: 'Marketing',
      population: 18000,
      color: '#4ECDC4',
      legendFontColor: '#7F7F7F',
      legendFontSize: 12,
    },
    {
      name: 'Frais Généraux',
      population: 22000,
      color: '#45B7D1',
      legendFontColor: '#7F7F7F',
      legendFontSize: 12,
    },
    {
      name: 'Autres',
      population: 0,
      color: '#96CEB4',
      legendFontColor: '#7F7F7F',
      legendFontSize: 12,
    },
  ];

  const chartConfig = {
    backgroundColor: '#ffffff',
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(46, 125, 50, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: '6',
      strokeWidth: '2',
      stroke: '#2E7D32',
    },
  };

  const renderBudget = ({item}: {item: Budget}) => (
    <Card style={styles.budgetCard}>
      <Card.Content>
        <View style={styles.budgetHeader}>
          <Title style={styles.budgetTitle}>{item.title}</Title>
          <View style={styles.budgetPeriod}>
            <Icon name="calendar-today" size={16} color={theme.colors.primary} />
            <Text style={styles.periodText}>{getPeriodText(item.period)}</Text>
          </View>
        </View>

        {/* Résumé financier */}
        <View style={styles.summaryContainer}>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Revenus</Text>
            <Text style={[styles.summaryValue, {color: theme.colors.success}]}>
              {item.totalIncome.toLocaleString('fr-FR')} €
            </Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Dépenses</Text>
            <Text style={[styles.summaryValue, {color: theme.colors.error}]}>
              {item.totalExpenses.toLocaleString('fr-FR')} €
            </Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Solde</Text>
            <Text style={[styles.summaryValue, {color: getBalanceColor(item.balance)}]}>
              {item.balance.toLocaleString('fr-FR')} €
            </Text>
          </View>
        </View>

        {/* Catégories */}
        <View style={styles.categoriesContainer}>
          <Text style={styles.categoriesTitle}>Catégories</Text>
          {item.categories.slice(0, 3).map((category) => (
            <View key={category.id} style={styles.categoryItem}>
              <View style={styles.categoryInfo}>
                <Text style={styles.categoryName}>{category.name}</Text>
                <Text style={styles.categoryAmount}>
                  {category.actualAmount.toLocaleString('fr-FR')} €
                </Text>
              </View>
              <View style={styles.categoryProgress}>
                <ProgressBar
                  progress={category.actualAmount / category.budgetedAmount}
                  color={
                    category.actualAmount > category.budgetedAmount
                      ? theme.colors.error
                      : theme.colors.success
                  }
                  style={styles.progressBar}
                />
                <Text style={styles.categoryVariance}>
                  {category.variance >= 0 ? '+' : ''}{category.variance.toLocaleString('fr-FR')} €
                </Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.budgetActions}>
          <Button
            mode="outlined"
            onPress={() => navigation.navigate('CreateBudget', {budgetId: item.id})}
            style={styles.actionButton}>
            Voir Détails
          </Button>
          <Button
            mode="contained"
            onPress={() => navigation.navigate('CreateBudget', {budgetId: item.id})}
            style={styles.actionButton}>
            Modifier
          </Button>
        </View>
      </Card.Content>
    </Card>
  );

  return (
    <View style={styles.container}>
      {/* Graphiques */}
      <Card style={styles.chartCard}>
        <Card.Content>
          <Title style={styles.chartTitle}>Évolution des Revenus</Title>
          <LineChart
            data={chartData}
            width={width - 64}
            height={220}
            chartConfig={chartConfig}
            bezier
            style={styles.chart}
          />
        </Card.Content>
      </Card>

      <Card style={styles.chartCard}>
        <Card.Content>
          <Title style={styles.chartTitle}>Répartition des Dépenses</Title>
          <PieChart
            data={pieData}
            width={width - 64}
            height={220}
            chartConfig={chartConfig}
            accessor="population"
            backgroundColor="transparent"
            paddingLeft="15"
            style={styles.chart}
          />
        </Card.Content>
      </Card>

      {/* Statistiques rapides */}
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Icon name="trending-up" size={24} color={theme.colors.success} />
          <Text style={styles.statValue}>
            {budgets.reduce((sum, b) => sum + b.totalIncome, 0).toLocaleString('fr-FR')} €
          </Text>
          <Text style={styles.statLabel}>Revenus Totaux</Text>
        </View>
        <View style={styles.statItem}>
          <Icon name="trending-down" size={24} color={theme.colors.error} />
          <Text style={styles.statValue}>
            {budgets.reduce((sum, b) => sum + b.totalExpenses, 0).toLocaleString('fr-FR')} €
          </Text>
          <Text style={styles.statLabel}>Dépenses Totales</Text>
        </View>
        <View style={styles.statItem}>
          <Icon name="account-balance" size={24} color={theme.colors.info} />
          <Text style={styles.statValue}>
            {budgets.reduce((sum, b) => sum + b.balance, 0).toLocaleString('fr-FR')} €
          </Text>
          <Text style={styles.statLabel}>Solde Net</Text>
        </View>
      </View>

      {/* Liste des budgets */}
      <FlatList
        data={budgets}
        keyExtractor={(item) => item.id}
        renderItem={renderBudget}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Icon name="account-balance-wallet" size={64} color={theme.colors.placeholder} />
            <Title style={styles.emptyTitle}>Aucun budget</Title>
            <Paragraph style={styles.emptyText}>
              Créez votre premier budget pour suivre vos finances et optimiser vos dépenses.
            </Paragraph>
            <Button
              mode="contained"
              onPress={() => navigation.navigate('CreateBudget')}
              style={styles.createButton}>
              Créer un Budget
            </Button>
          </View>
        }
      />

      {/* Bouton flottant pour créer un nouveau budget */}
      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => navigation.navigate('CreateBudget')}
        label="Nouveau Budget"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  chartCard: {
    margin: 16,
    elevation: 2,
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 16,
    marginHorizontal: 4,
    borderRadius: 12,
    elevation: 2,
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginTop: 8,
    textAlign: 'center',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
    textAlign: 'center',
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingBottom: 80,
  },
  budgetCard: {
    marginBottom: 16,
    elevation: 2,
  },
  budgetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  budgetTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  budgetPeriod: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  periodText: {
    marginLeft: 4,
    fontSize: 12,
    color: '#666',
  },
  summaryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    padding: 12,
    backgroundColor: '#F8F9FA',
    borderRadius: 8,
  },
  summaryItem: {
    alignItems: 'center',
  },
  summaryLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  categoriesContainer: {
    marginBottom: 16,
  },
  categoriesTitle: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 12,
    color: '#666',
  },
  categoryItem: {
    marginBottom: 12,
  },
  categoryInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  categoryName: {
    fontSize: 14,
    fontWeight: '500',
  },
  categoryAmount: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2E7D32',
  },
  categoryProgress: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressBar: {
    flex: 1,
    height: 6,
    borderRadius: 3,
    marginRight: 8,
  },
  categoryVariance: {
    fontSize: 12,
    fontWeight: '500',
    minWidth: 60,
    textAlign: 'right',
  },
  budgetActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    flex: 1,
    marginHorizontal: 4,
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

export default BudgetScreen;