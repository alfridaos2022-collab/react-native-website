import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Colors } from '@/constants/colors';
import { Quote, QuoteItem } from '@/types';
import Card from '@/components/Card';
import Button from '@/components/Button';
import Input from '@/components/Input';

interface QuoteItemEditorProps {
  item: QuoteItem;
  onUpdate: (item: QuoteItem) => void;
  onDelete: () => void;
}

function QuoteItemEditor({ item, onUpdate, onDelete }: QuoteItemEditorProps) {
  const [description, setDescription] = useState(item.description);
  const [quantity, setQuantity] = useState(item.quantity.toString());
  const [unitPrice, setUnitPrice] = useState(item.unitPrice.toString());

  const handleUpdate = () => {
    const qty = parseFloat(quantity) || 0;
    const price = parseFloat(unitPrice) || 0;
    const total = qty * price;

    onUpdate({
      ...item,
      description,
      quantity: qty,
      unitPrice: price,
      total,
    });
  };

  useEffect(() => {
    handleUpdate();
  }, [description, quantity, unitPrice]);

  return (
    <Card style={styles.itemCard}>
      <View style={styles.itemHeader}>
        <Text style={styles.itemTitle}>Article</Text>
        <TouchableOpacity onPress={onDelete}>
          <Icon name="delete" size={20} color={Colors.error} />
        </TouchableOpacity>
      </View>

      <Input
        label="Description"
        value={description}
        onChangeText={setDescription}
        placeholder="Description de l'article ou service"
        multiline
        numberOfLines={2}
      />

      <View style={styles.itemRow}>
        <Input
          label="Quantité"
          value={quantity}
          onChangeText={setQuantity}
          placeholder="1"
          keyboardType="numeric"
          containerStyle={styles.quantityInput}
        />
        <Input
          label="Prix unitaire (€)"
          value={unitPrice}
          onChangeText={setUnitPrice}
          placeholder="0.00"
          keyboardType="numeric"
          containerStyle={styles.priceInput}
        />
      </View>

      <View style={styles.totalContainer}>
        <Text style={styles.totalLabel}>Total: </Text>
        <Text style={styles.totalValue}>
          {(parseFloat(quantity) * parseFloat(unitPrice) || 0).toFixed(2)} €
        </Text>
      </View>
    </Card>
  );
}

export default function QuoteEditorScreen() {
  const navigation = useNavigation();
  const route = useRoute<any>();
  const quoteId = route.params?.quoteId;

  const [quote, setQuote] = useState<Quote | null>(null);
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientAddress, setClientAddress] = useState('');
  const [validityDays, setValidityDays] = useState('30');
  const [notes, setNotes] = useState('');
  const [taxRate, setTaxRate] = useState('20');

  useEffect(() => {
    if (quoteId) {
      loadQuote(quoteId);
    } else {
      // Create new quote
      const newQuote: Quote = {
        id: Date.now().toString(),
        number: generateQuoteNumber(),
        clientName: '',
        clientEmail: '',
        clientAddress: '',
        createdAt: new Date(),
        validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
        status: 'draft',
        items: [createNewItem()],
        subtotal: 0,
        taxRate: 20,
        taxAmount: 0,
        total: 0,
        notes: ''
      };
      setQuote(newQuote);
    }
  }, [quoteId]);

  const generateQuoteNumber = () => {
    const year = new Date().getFullYear();
    const month = String(new Date().getMonth() + 1).padStart(2, '0');
    const day = String(new Date().getDate()).padStart(2, '0');
    const time = String(Date.now()).slice(-4);
    return `DEV-${year}${month}${day}-${time}`;
  };

  const createNewItem = (): QuoteItem => ({
    id: Date.now().toString(),
    description: '',
    quantity: 1,
    unitPrice: 0,
    total: 0,
  });

  const loadQuote = (id: string) => {
    // Mock loading - in real app, this would load from storage
    const mockQuote: Quote = {
      id,
      number: 'DEV-2024-001',
      clientName: 'Restaurant Le Gourmet',
      clientEmail: 'contact@legourmet.fr',
      clientAddress: '123 Rue de la Paix, 75001 Paris',
      createdAt: new Date('2024-01-15'),
      validUntil: new Date('2024-02-14'),
      status: 'draft',
      subtotal: 2500,
      taxRate: 20,
      taxAmount: 500,
      total: 3000,
      items: [
        {
          id: '1',
          description: 'Site web vitrine avec 5 pages',
          quantity: 1,
          unitPrice: 1500,
          total: 1500
        },
        {
          id: '2',
          description: 'Formation à la gestion du site',
          quantity: 2,
          unitPrice: 500,
          total: 1000
        }
      ],
      notes: 'Délai de livraison: 3 semaines'
    };

    setQuote(mockQuote);
    setClientName(mockQuote.clientName);
    setClientEmail(mockQuote.clientEmail);
    setClientAddress(mockQuote.clientAddress);
    setNotes(mockQuote.notes || '');
    setTaxRate(mockQuote.taxRate.toString());
    
    const daysUntilExpiry = Math.ceil((mockQuote.validUntil.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
    setValidityDays(daysUntilExpiry.toString());
  };

  const updateQuoteCalculations = (updatedQuote: Quote) => {
    const subtotal = updatedQuote.items.reduce((sum, item) => sum + item.total, 0);
    const taxAmount = subtotal * (updatedQuote.taxRate / 100);
    const total = subtotal + taxAmount;

    return {
      ...updatedQuote,
      subtotal,
      taxAmount,
      total,
    };
  };

  const handleItemUpdate = (itemId: string, updatedItem: QuoteItem) => {
    if (!quote) return;

    const updatedItems = quote.items.map(item =>
      item.id === itemId ? updatedItem : item
    );

    const updatedQuote = updateQuoteCalculations({
      ...quote,
      items: updatedItems,
    });

    setQuote(updatedQuote);
  };

  const handleAddItem = () => {
    if (!quote) return;

    const newItem = createNewItem();
    const updatedQuote = updateQuoteCalculations({
      ...quote,
      items: [...quote.items, newItem],
    });

    setQuote(updatedQuote);
  };

  const handleDeleteItem = (itemId: string) => {
    if (!quote || quote.items.length <= 1) return;

    const updatedItems = quote.items.filter(item => item.id !== itemId);
    const updatedQuote = updateQuoteCalculations({
      ...quote,
      items: updatedItems,
    });

    setQuote(updatedQuote);
  };

  const handleSave = () => {
    if (!quote) return;

    const validUntil = new Date();
    validUntil.setDate(validUntil.getDate() + parseInt(validityDays));

    const updatedQuote = updateQuoteCalculations({
      ...quote,
      clientName,
      clientEmail,
      clientAddress,
      validUntil,
      notes,
      taxRate: parseFloat(taxRate),
      updatedAt: new Date(),
    });

    // In real app, save to storage/API
    console.log('Saving quote:', updatedQuote);
    
    Alert.alert(
      'Devis sauvegardé',
      'Votre devis a été sauvegardé avec succès.',
      [{ text: 'OK', onPress: () => navigation.goBack() }]
    );
  };

  const handleSend = () => {
    if (!quote) return;

    Alert.alert(
      'Envoyer le devis',
      `Envoyer le devis à ${clientEmail} ?`,
      [
        { text: 'Annuler', style: 'cancel' },
        { 
          text: 'Envoyer', 
          onPress: () => {
            // In real app, send email and update status
            console.log('Sending quote to:', clientEmail);
            Alert.alert('Devis envoyé', 'Le devis a été envoyé par email.');
          }
        }
      ]
    );
  };

  const handlePreview = () => {
    Alert.alert(
      'Aperçu du devis',
      'Fonctionnalité d\'aperçu à implémenter',
      [{ text: 'OK' }]
    );
  };

  if (!quote) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Chargement...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content}>
        <Card style={styles.headerCard}>
          <Text style={styles.quoteNumber}>Devis #{quote.number}</Text>
          
          <Input
            label="Nom du client *"
            value={clientName}
            onChangeText={setClientName}
            placeholder="Nom de l'entreprise ou du client"
          />
          
          <Input
            label="Email du client *"
            value={clientEmail}
            onChangeText={setClientEmail}
            placeholder="email@client.com"
            keyboardType="email-address"
          />
          
          <Input
            label="Adresse du client"
            value={clientAddress}
            onChangeText={setClientAddress}
            placeholder="Adresse complète du client"
            multiline
            numberOfLines={3}
          />

          <View style={styles.settingsRow}>
            <Input
              label="Validité (jours)"
              value={validityDays}
              onChangeText={setValidityDays}
              placeholder="30"
              keyboardType="numeric"
              containerStyle={styles.validityInput}
            />
            <Input
              label="TVA (%)"
              value={taxRate}
              onChangeText={setTaxRate}
              placeholder="20"
              keyboardType="numeric"
              containerStyle={styles.taxInput}
            />
          </View>
        </Card>

        <View style={styles.itemsSection}>
          <View style={styles.itemsHeader}>
            <Text style={styles.sectionTitle}>Articles / Services</Text>
            <TouchableOpacity onPress={handleAddItem} style={styles.addButton}>
              <Icon name="add" size={20} color={Colors.primary} />
              <Text style={styles.addButtonText}>Ajouter</Text>
            </TouchableOpacity>
          </View>

          {quote.items.map((item) => (
            <QuoteItemEditor
              key={item.id}
              item={item}
              onUpdate={(updatedItem) => handleItemUpdate(item.id, updatedItem)}
              onDelete={() => handleDeleteItem(item.id)}
            />
          ))}
        </View>

        <Card style={styles.summaryCard}>
          <Text style={styles.sectionTitle}>Résumé</Text>
          
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Sous-total:</Text>
            <Text style={styles.summaryValue}>{quote.subtotal.toFixed(2)} €</Text>
          </View>
          
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>TVA ({quote.taxRate}%):</Text>
            <Text style={styles.summaryValue}>{quote.taxAmount.toFixed(2)} €</Text>
          </View>
          
          <View style={[styles.summaryRow, styles.totalRow]}>
            <Text style={styles.totalLabel}>Total TTC:</Text>
            <Text style={styles.totalValue}>{quote.total.toFixed(2)} €</Text>
          </View>
        </Card>

        <Card style={styles.notesCard}>
          <Input
            label="Notes et conditions"
            value={notes}
            onChangeText={setNotes}
            placeholder="Conditions de paiement, délais de livraison, etc."
            multiline
            numberOfLines={4}
          />
        </Card>
      </ScrollView>

      <View style={styles.bottomActions}>
        <Button
          title="Aperçu"
          variant="outline"
          onPress={handlePreview}
          style={styles.previewButton}
        />
        <Button
          title="Sauvegarder"
          onPress={handleSave}
          style={styles.saveButton}
        />
        {quote.status === 'draft' && clientEmail && (
          <Button
            title="Envoyer"
            onPress={handleSend}
            style={styles.sendButton}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: Colors.textSecondary,
  },
  headerCard: {
    marginBottom: 16,
  },
  quoteNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.primary,
    marginBottom: 16,
    textAlign: 'center',
  },
  settingsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  validityInput: {
    flex: 1,
    marginRight: 8,
  },
  taxInput: {
    flex: 1,
    marginLeft: 8,
  },
  itemsSection: {
    marginBottom: 16,
  },
  itemsHeader: {
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
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: Colors.primary + '10',
    borderRadius: 8,
  },
  addButtonText: {
    fontSize: 14,
    color: Colors.primary,
    marginLeft: 4,
  },
  itemCard: {
    marginBottom: 12,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  quantityInput: {
    flex: 1,
    marginRight: 8,
  },
  priceInput: {
    flex: 2,
    marginLeft: 8,
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  totalLabel: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  totalValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  summaryCard: {
    marginBottom: 16,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  summaryLabel: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  summaryValue: {
    fontSize: 14,
    color: Colors.textPrimary,
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    marginTop: 8,
    paddingTop: 12,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.textPrimary,
  },
  notesCard: {
    marginBottom: 100,
  },
  bottomActions: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: Colors.white,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  previewButton: {
    flex: 1,
    marginRight: 8,
  },
  saveButton: {
    flex: 1,
    marginHorizontal: 4,
  },
  sendButton: {
    flex: 1,
    marginLeft: 8,
  },
});