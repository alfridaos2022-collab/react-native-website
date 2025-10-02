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
  useTheme,
  Text,
  Chip,
  Divider,
  IconButton,
} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Budget, BudgetCategory, BudgetItem} from '../types';

const CreateBudgetScreen: React.FC = () => {
  const navigation = useNavigation();
  const theme = useTheme();
  
  // Informations de base
  const [budgetTitle, setBudgetTitle] = useState('');
  const [selectedPeriod, setSelectedPeriod] = useState<'monthly' | 'quarterly' | 'yearly'>('monthly');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date(Date.now() + 30 * 24 * 60 * 60 * 1000));
  
  // Catégories
  const [categories, setCategories] = useState<BudgetCategory[]>([
    {
      id: '1',
      name: 'Revenus',
      type: 'income',
      budgetedAmount: 0,
      actualAmount: 0,
      variance: 0,
      items: [],
    },
  ]);

  const periods = [
    {key: 'monthly', label: 'Mensuel'},
    {key: 'quarterly', label: 'Trimestriel'},
    {key: 'yearly', label: 'Annuel'},
  ];

  const commonCategories = [
    {name: 'Salaires', type: 'expense' as const},
    {name: 'Marketing', type: 'expense' as const},
    {name: 'Frais Généraux', type: 'expense' as const},
    {name: 'Matériel', type: 'expense' as const},
    {name: 'Formation', type: 'expense' as const},
    {name: 'Ventes', type: 'income' as const},
    {name: 'Services', type: 'income' as const},
    {name: 'Produits', type: 'income' as const},
  ];

  const addCategory = () => {
    const newCategory: BudgetCategory = {
      id: Date.now().toString(),
      name: '',
      type: 'expense',
      budgetedAmount: 0,
      actualAmount: 0,
      variance: 0,
      items: [],
    };
    setCategories([...categories, newCategory]);
  };

  const removeCategory = (categoryId: string) => {
    if (categories.length > 1) {
      setCategories(categories.filter(cat => cat.id !== categoryId));
    }
  };

  const updateCategory = (categoryId: string, field: keyof BudgetCategory, value: string | number) => {
    setCategories(categories.map(cat => {
      if (cat.id === categoryId) {
        const updatedCategory = {...cat, [field]: value};
        if (field === 'budgetedAmount' || field === 'actualAmount') {
          updatedCategory.variance = updatedCategory.budgetedAmount - updatedCategory.actualAmount;
        }
        return updatedCategory;
      }
      return cat;
    }));
  };

  const addCommonCategory = (categoryName: string, type: 'income' | 'expense') => {
    const newCategory: BudgetCategory = {
      id: Date.now().toString(),
      name: categoryName,
      type,
      budgetedAmount: 0,
      actualAmount: 0,
      variance: 0,
      items: [],
    };
    setCategories([...categories, newCategory]);
  };

  const calculateTotals = () => {
    const totalIncome = categories
      .filter(cat => cat.type === 'income')
      .reduce((sum, cat) => sum + cat.budgetedAmount, 0);
    
    const totalExpenses = categories
      .filter(cat => cat.type === 'expense')
      .reduce((sum, cat) => sum + cat.budgetedAmount, 0);
    
    const balance = totalIncome - totalExpenses;
    
    return {totalIncome, totalExpenses, balance};
  };

  const handleSaveBudget = () => {
    if (!budgetTitle.trim()) {
      Alert.alert('Erreur', 'Veuillez saisir un titre pour votre budget');
      return;
    }

    const validCategories = categories.filter(cat => cat.name.trim() && cat.budgetedAmount > 0);
    if (validCategories.length === 0) {
      Alert.alert('Erreur', 'Veuillez ajouter au moins une catégorie avec un montant');
      return;
    }

    const {totalIncome, totalExpenses, balance} = calculateTotals();

    const newBudget: Budget = {
      id: Date.now().toString(),
      title: budgetTitle,
      period: selectedPeriod,
      startDate,
      endDate,
      categories: validCategories,
      totalIncome,
      totalExpenses,
      balance,
      createdAt: new Date(),
    };

    Alert.alert(
      'Budget Créé',
      'Votre budget a été créé avec succès. Vous pouvez maintenant suivre vos dépenses et recettes.',
      [
        {
          text: 'OK',
          onPress: () => {
            // Ici, vous pourriez sauvegarder le budget
            navigation.goBack();
          },
        },
      ]
    );
  };

  const {totalIncome, totalExpenses, balance} = calculateTotals();

  return (
    <ScrollView style={styles.container}>
      {/* Informations de base */}
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.sectionTitle}>Informations de Base</Title>
          
          <TextInput
            label="Titre du budget *"
            value={budgetTitle}
            onChangeText={setBudgetTitle}
            style={styles.input}
            mode="outlined"
          />
          
          <Text style={styles.label}>Période *</Text>
          <View style={styles.periodsContainer}>
            {periods.map((period) => (
              <Chip
                key={period.key}
                selected={selectedPeriod === period.key}
                onPress={() => setSelectedPeriod(period.key as any)}
                style={styles.periodChip}>
                {period.label}
              </Chip>
            ))}
          </View>

          <View style={styles.dateRow}>
            <TextInput
              label="Date de début"
              value={startDate.toLocaleDateString('fr-FR')}
              style={[styles.input, styles.halfInput]}
              mode="outlined"
              editable={false}
            />
            <TextInput
              label="Date de fin"
              value={endDate.toLocaleDateString('fr-FR')}
              style={[styles.input, styles.halfInput]}
              mode="outlined"
              editable={false}
            />
          </View>
        </Card.Content>
      </Card>

      {/* Catégories communes */}
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.sectionTitle}>Catégories Communes</Title>
          <Paragraph style={styles.sectionDescription}>
            Ajoutez rapidement des catégories couramment utilisées
          </Paragraph>
          
          <View style={styles.commonCategoriesContainer}>
            {commonCategories.map((category, index) => (
              <Chip
                key={index}
                onPress={() => addCommonCategory(category.name, category.type)}
                style={[
                  styles.commonCategoryChip,
                  {backgroundColor: category.type === 'income' ? '#E8F5E8' : '#FFEBEE'}
                ]}>
                <Icon 
                  name={category.type === 'income' ? 'trending-up' : 'trending-down'} 
                  size={16} 
                  style={styles.chipIcon}
                />
                {category.name}
              </Chip>
            ))}
          </View>
        </Card.Content>
      </Card>

      {/* Catégories personnalisées */}
      <Card style={styles.card}>
        <Card.Content>
          <View style={styles.sectionHeader}>
            <Title style={styles.sectionTitle}>Catégories Personnalisées</Title>
            <Button mode="outlined" onPress={addCategory} compact>
              <Icon name="add" size={16} />
              Ajouter
            </Button>
          </View>

          {categories.map((category, index) => (
            <View key={category.id} style={styles.categoryContainer}>
              <View style={styles.categoryHeader}>
                <Text style={styles.categoryNumber}>Catégorie {index + 1}</Text>
                {categories.length > 1 && (
                  <IconButton
                    icon="delete"
                    size={20}
                    onPress={() => removeCategory(category.id)}
                    iconColor={theme.colors.error}
                  />
                )}
              </View>
              
              <TextInput
                label="Nom de la catégorie *"
                value={category.name}
                onChangeText={(value) => updateCategory(category.id, 'name', value)}
                style={styles.input}
                mode="outlined"
              />
              
              <View style={styles.categoryTypeRow}>
                <Chip
                  selected={category.type === 'income'}
                  onPress={() => updateCategory(category.id, 'type', 'income')}
                  style={[styles.typeChip, {backgroundColor: category.type === 'income' ? '#E8F5E8' : '#F5F5F5'}]}>
                  <Icon name="trending-up" size={16} style={styles.chipIcon} />
                  Revenus
                </Chip>
                <Chip
                  selected={category.type === 'expense'}
                  onPress={() => updateCategory(category.id, 'type', 'expense')}
                  style={[styles.typeChip, {backgroundColor: category.type === 'expense' ? '#FFEBEE' : '#F5F5F5'}]}>
                  <Icon name="trending-down" size={16} style={styles.chipIcon} />
                  Dépenses
                </Chip>
              </View>
              
              <View style={styles.categoryAmountRow}>
                <TextInput
                  label="Montant budgété (€)"
                  value={category.budgetedAmount.toString()}
                  onChangeText={(value) => updateCategory(category.id, 'budgetedAmount', parseFloat(value) || 0)}
                  style={[styles.input, styles.halfInput]}
                  mode="outlined"
                  keyboardType="numeric"
                />
                <TextInput
                  label="Montant réel (€)"
                  value={category.actualAmount.toString()}
                  onChangeText={(value) => updateCategory(category.id, 'actualAmount', parseFloat(value) || 0)}
                  style={[styles.input, styles.halfInput]}
                  mode="outlined"
                  keyboardType="numeric"
                />
              </View>
              
              {category.variance !== 0 && (
                <View style={styles.varianceContainer}>
                  <Text style={styles.varianceLabel}>Écart: </Text>
                  <Text style={[
                    styles.varianceValue,
                    {color: category.variance >= 0 ? theme.colors.success : theme.colors.error}
                  ]}>
                    {category.variance >= 0 ? '+' : ''}{category.variance.toLocaleString('fr-FR')} €
                  </Text>
                </View>
              )}
            </View>
          ))}
        </Card.Content>
      </Card>

      {/* Résumé */}
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.sectionTitle}>Résumé du Budget</Title>
          
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Total Revenus:</Text>
            <Text style={[styles.summaryValue, {color: theme.colors.success}]}>
              {totalIncome.toLocaleString('fr-FR')} €
            </Text>
          </View>
          
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Total Dépenses:</Text>
            <Text style={[styles.summaryValue, {color: theme.colors.error}]}>
              {totalExpenses.toLocaleString('fr-FR')} €
            </Text>
          </View>
          
          <Divider style={styles.divider} />
          
          <View style={styles.summaryRow}>
            <Text style={styles.summaryTotalLabel}>Solde:</Text>
            <Text style={[
              styles.summaryTotalValue,
              {color: balance >= 0 ? theme.colors.success : theme.colors.error}
            ]}>
              {balance.toLocaleString('fr-FR')} €
            </Text>
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
          onPress={handleSaveBudget}
          style={styles.actionButton}
          disabled={!budgetTitle.trim()}>
          Sauvegarder
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
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  sectionDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  periodsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  periodChip: {
    marginRight: 8,
    marginBottom: 8,
  },
  dateRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfInput: {
    flex: 1,
    marginHorizontal: 4,
  },
  commonCategoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  commonCategoryChip: {
    marginRight: 8,
    marginBottom: 8,
  },
  chipIcon: {
    marginRight: 4,
  },
  categoryContainer: {
    backgroundColor: '#F8F9FA',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  categoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  categoryNumber: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
  },
  categoryTypeRow: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  typeChip: {
    marginRight: 8,
  },
  categoryAmountRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  varianceContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  varianceLabel: {
    fontSize: 14,
    fontWeight: '500',
  },
  varianceValue: {
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#666',
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: '500',
  },
  summaryTotalLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  summaryTotalValue: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  divider: {
    marginVertical: 12,
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

export default CreateBudgetScreen;