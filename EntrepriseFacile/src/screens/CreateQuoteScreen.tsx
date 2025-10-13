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
  Divider,
  IconButton,
} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Quote, QuoteItem} from '../types';

const CreateQuoteScreen: React.FC = () => {
  const navigation = useNavigation();
  const theme = useTheme();
  
  // Informations client
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientAddress, setClientAddress] = useState('');
  
  // Informations devis
  const [quoteNumber, setQuoteNumber] = useState(`DEV-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`);
  const [validUntil, setValidUntil] = useState(new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)); // 30 jours
  const [notes, setNotes] = useState('');
  
  // Articles
  const [items, setItems] = useState<QuoteItem[]>([
    {id: '1', description: '', quantity: 1, unitPrice: 0, totalPrice: 0},
  ]);
  
  // Paramètres
  const [taxRate, setTaxRate] = useState('20');

  const addItem = () => {
    const newItem: QuoteItem = {
      id: Date.now().toString(),
      description: '',
      quantity: 1,
      unitPrice: 0,
      totalPrice: 0,
    };
    setItems([...items, newItem]);
  };

  const removeItem = (itemId: string) => {
    if (items.length > 1) {
      setItems(items.filter(item => item.id !== itemId));
    }
  };

  const updateItem = (itemId: string, field: keyof QuoteItem, value: string | number) => {
    setItems(items.map(item => {
      if (item.id === itemId) {
        const updatedItem = {...item, [field]: value};
        if (field === 'quantity' || field === 'unitPrice') {
          updatedItem.totalPrice = updatedItem.quantity * updatedItem.unitPrice;
        }
        return updatedItem;
      }
      return item;
    }));
  };

  const calculateTotals = () => {
    const subtotal = items.reduce((sum, item) => sum + item.totalPrice, 0);
    const taxAmount = subtotal * (parseFloat(taxRate) / 100);
    const total = subtotal + taxAmount;
    return {subtotal, taxAmount, total};
  };

  const handleSaveQuote = () => {
    if (!clientName.trim()) {
      Alert.alert('Erreur', 'Veuillez saisir le nom du client');
      return;
    }

    if (!clientEmail.trim()) {
      Alert.alert('Erreur', 'Veuillez saisir l\'email du client');
      return;
    }

    const validItems = items.filter(item => item.description.trim() && item.unitPrice > 0);
    if (validItems.length === 0) {
      Alert.alert('Erreur', 'Veuillez ajouter au moins un article valide');
      return;
    }

    const {subtotal, taxAmount, total} = calculateTotals();

    const newQuote: Quote = {
      id: Date.now().toString(),
      quoteNumber,
      clientName,
      clientEmail,
      clientAddress,
      items: validItems,
      subtotal,
      taxRate: parseFloat(taxRate),
      taxAmount,
      total,
      status: 'draft',
      createdAt: new Date(),
      validUntil,
      notes,
    };

    Alert.alert(
      'Devis Créé',
      'Votre devis a été créé avec succès. Vous pouvez maintenant l\'envoyer au client.',
      [
        {
          text: 'OK',
          onPress: () => {
            // Ici, vous pourriez sauvegarder le devis
            navigation.goBack();
          },
        },
      ]
    );
  };

  const {subtotal, taxAmount, total} = calculateTotals();

  return (
    <ScrollView style={styles.container}>
      {/* Informations client */}
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.sectionTitle}>Informations Client</Title>
          
          <TextInput
            label="Nom du client *"
            value={clientName}
            onChangeText={setClientName}
            style={styles.input}
            mode="outlined"
          />
          
          <TextInput
            label="Email *"
            value={clientEmail}
            onChangeText={setClientEmail}
            style={styles.input}
            mode="outlined"
            keyboardType="email-address"
          />
          
          <TextInput
            label="Adresse"
            value={clientAddress}
            onChangeText={setClientAddress}
            style={styles.input}
            mode="outlined"
            multiline
            numberOfLines={2}
          />
        </Card.Content>
      </Card>

      {/* Informations devis */}
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.sectionTitle}>Informations Devis</Title>
          
          <TextInput
            label="Numéro de devis"
            value={quoteNumber}
            onChangeText={setQuoteNumber}
            style={styles.input}
            mode="outlined"
          />
          
          <TextInput
            label="Validité (jours)"
            value="30"
            style={styles.input}
            mode="outlined"
            keyboardType="numeric"
            editable={false}
          />
          
          <TextInput
            label="Notes"
            value={notes}
            onChangeText={setNotes}
            style={styles.input}
            mode="outlined"
            multiline
            numberOfLines={3}
          />
        </Card.Content>
      </Card>

      {/* Articles */}
      <Card style={styles.card}>
        <Card.Content>
          <View style={styles.sectionHeader}>
            <Title style={styles.sectionTitle}>Articles</Title>
            <Button mode="outlined" onPress={addItem} compact>
              <Icon name="add" size={16} />
              Ajouter
            </Button>
          </View>

          {items.map((item, index) => (
            <View key={item.id} style={styles.itemContainer}>
              <View style={styles.itemHeader}>
                <Text style={styles.itemNumber}>Article {index + 1}</Text>
                {items.length > 1 && (
                  <IconButton
                    icon="delete"
                    size={20}
                    onPress={() => removeItem(item.id)}
                    iconColor={theme.colors.error}
                  />
                )}
              </View>
              
              <TextInput
                label="Description *"
                value={item.description}
                onChangeText={(value) => updateItem(item.id, 'description', value)}
                style={styles.input}
                mode="outlined"
                multiline
              />
              
              <View style={styles.itemRow}>
                <TextInput
                  label="Quantité"
                  value={item.quantity.toString()}
                  onChangeText={(value) => updateItem(item.id, 'quantity', parseInt(value) || 0)}
                  style={[styles.input, styles.halfInput]}
                  mode="outlined"
                  keyboardType="numeric"
                />
                <TextInput
                  label="Prix unitaire (€)"
                  value={item.unitPrice.toString()}
                  onChangeText={(value) => updateItem(item.id, 'unitPrice', parseFloat(value) || 0)}
                  style={[styles.input, styles.halfInput]}
                  mode="outlined"
                  keyboardType="numeric"
                />
              </View>
              
              <View style={styles.itemTotal}>
                <Text style={styles.itemTotalLabel}>Total: </Text>
                <Text style={styles.itemTotalValue}>
                  {item.totalPrice.toLocaleString('fr-FR')} €
                </Text>
              </View>
            </View>
          ))}
        </Card.Content>
      </Card>

      {/* Paramètres */}
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.sectionTitle}>Paramètres</Title>
          
          <TextInput
            label="Taux de TVA (%)"
            value={taxRate}
            onChangeText={setTaxRate}
            style={styles.input}
            mode="outlined"
            keyboardType="numeric"
          />
        </Card.Content>
      </Card>

      {/* Résumé */}
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.sectionTitle}>Résumé</Title>
          
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Sous-total:</Text>
            <Text style={styles.summaryValue}>
              {subtotal.toLocaleString('fr-FR')} €
            </Text>
          </View>
          
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>TVA ({taxRate}%):</Text>
            <Text style={styles.summaryValue}>
              {taxAmount.toLocaleString('fr-FR')} €
            </Text>
          </View>
          
          <Divider style={styles.divider} />
          
          <View style={styles.summaryRow}>
            <Text style={styles.summaryTotalLabel}>Total:</Text>
            <Text style={styles.summaryTotalValue}>
              {total.toLocaleString('fr-FR')} €
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
          onPress={handleSaveQuote}
          style={styles.actionButton}>
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
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  input: {
    marginBottom: 16,
  },
  itemContainer: {
    backgroundColor: '#F8F9FA',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  itemNumber: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfInput: {
    flex: 1,
    marginHorizontal: 4,
  },
  itemTotal: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  itemTotalLabel: {
    fontSize: 14,
    fontWeight: '500',
  },
  itemTotalValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2E7D32',
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
    color: '#2E7D32',
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

export default CreateQuoteScreen;