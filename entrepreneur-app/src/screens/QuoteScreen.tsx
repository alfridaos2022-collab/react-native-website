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
import { Quote } from '@/types';
import Card from '@/components/Card';
import Button from '@/components/Button';
import Input from '@/components/Input';

interface QuoteCardProps {
  quote: Quote;
  onPress: () => void;
  onEdit: () => void;
  onDelete: () => void;
  onSend: () => void;
}

function QuoteCard({ quote, onPress, onEdit, onDelete, onSend }: QuoteCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'accepted':
        return Colors.success;
      case 'sent':
        return Colors.info;
      case 'rejected':
        return Colors.error;
      case 'expired':
        return Colors.warning;
      default:
        return Colors.gray400;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'accepted':
        return 'Accepté';
      case 'sent':
        return 'Envoyé';
      case 'rejected':
        return 'Refusé';
      case 'expired':
        return 'Expiré';
      default:
        return 'Brouillon';
    }
  };

  const isExpired = new Date() > quote.validUntil;
  const daysUntilExpiry = Math.ceil((quote.validUntil.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));

  return (
    <Card onPress={onPress} style={styles.quoteCard}>
      <View style={styles.quoteHeader}>
        <View style={styles.quoteInfo}>
          <Text style={styles.quoteNumber}>Devis #{quote.number}</Text>
          <Text style={styles.clientName}>{quote.clientName}</Text>
          <Text style={styles.clientEmail}>{quote.clientEmail}</Text>
        </View>
        <View style={styles.quoteActions}>
          {quote.status === 'draft' && (
            <TouchableOpacity onPress={onSend} style={styles.actionButton}>
              <Icon name="send" size={20} color={Colors.primary} />
            </TouchableOpacity>
          )}
          <TouchableOpacity onPress={onEdit} style={styles.actionButton}>
            <Icon name="edit" size={20} color={Colors.primary} />
          </TouchableOpacity>
          <TouchableOpacity onPress={onDelete} style={styles.actionButton}>
            <Icon name="delete" size={20} color={Colors.error} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.quoteMeta}>
        <View style={styles.statusContainer}>
          <View style={[styles.statusDot, { backgroundColor: getStatusColor(quote.status) }]} />
          <Text style={styles.statusText}>{getStatusText(quote.status)}</Text>
        </View>
        <Text style={styles.totalAmount}>{quote.total.toFixed(2)} €</Text>
      </View>

      <View style={styles.quoteDetails}>
        <Text style={styles.itemsCount}>
          {quote.items.length} article{quote.items.length > 1 ? 's' : ''}
        </Text>
        <Text style={styles.dateText}>
          Créé le {quote.createdAt.toLocaleDateString('fr-FR')}
        </Text>
      </View>

      {quote.status === 'sent' && (
        <View style={styles.validityContainer}>
          <Icon 
            name={isExpired ? 'warning' : 'schedule'} 
            size={16} 
            color={isExpired ? Colors.error : Colors.warning} 
          />
          <Text style={[
            styles.validityText,
            { color: isExpired ? Colors.error : Colors.warning }
          ]}>
            {isExpired 
              ? 'Expiré' 
              : `Expire dans ${daysUntilExpiry} jour${daysUntilExpiry > 1 ? 's' : ''}`
            }
          </Text>
        </View>
      )}
    </Card>
  );
}

export default function QuoteScreen() {
  const navigation = useNavigation<any>();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  // Mock data - in real app, this would come from a service/state management
  const [quotes] = useState<Quote[]>([
    {
      id: '1',
      number: 'DEV-2024-001',
      clientName: 'Restaurant Le Gourmet',
      clientEmail: 'contact@legourmet.fr',
      clientAddress: '123 Rue de la Paix, 75001 Paris',
      createdAt: new Date('2024-01-15'),
      validUntil: new Date('2024-02-14'),
      status: 'sent',
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
    },
    {
      id: '2',
      number: 'DEV-2024-002',
      clientName: 'Boutique Mode & Style',
      clientEmail: 'info@modestyle.fr',
      clientAddress: '456 Avenue des Champs, 75008 Paris',
      createdAt: new Date('2024-01-20'),
      validUntil: new Date('2024-02-19'),
      status: 'draft',
      subtotal: 4200,
      taxRate: 20,
      taxAmount: 840,
      total: 5040,
      items: [
        {
          id: '3',
          description: 'E-commerce complet avec paiement en ligne',
          quantity: 1,
          unitPrice: 3500,
          total: 3500
        },
        {
          id: '4',
          description: 'Intégration système de gestion des stocks',
          quantity: 1,
          unitPrice: 700,
          total: 700
        }
      ]
    },
    {
      id: '3',
      number: 'DEV-2024-003',
      clientName: 'Startup TechInno',
      clientEmail: 'hello@techinno.com',
      clientAddress: '789 Boulevard Innovation, 69000 Lyon',
      createdAt: new Date('2024-01-10'),
      validUntil: new Date('2024-02-09'),
      status: 'accepted',
      subtotal: 8000,
      taxRate: 20,
      taxAmount: 1600,
      total: 9600,
      items: [
        {
          id: '5',
          description: 'Application mobile iOS et Android',
          quantity: 1,
          unitPrice: 8000,
          total: 8000
        }
      ],
      notes: 'Projet prioritaire - Livraison en 6 semaines'
    }
  ]);

  const filters = [
    { label: 'Tous', value: 'all' },
    { label: 'Brouillons', value: 'draft' },
    { label: 'Envoyés', value: 'sent' },
    { label: 'Acceptés', value: 'accepted' },
    { label: 'Refusés', value: 'rejected' },
    { label: 'Expirés', value: 'expired' },
  ];

  const filteredQuotes = quotes.filter(quote => {
    const matchesSearch = 
      quote.number.toLowerCase().includes(searchQuery.toLowerCase()) ||
      quote.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      quote.clientEmail.toLowerCase().includes(searchQuery.toLowerCase());
    
    let matchesFilter = selectedFilter === 'all' || quote.status === selectedFilter;
    
    // Handle expired quotes
    if (selectedFilter === 'expired') {
      matchesFilter = quote.status === 'sent' && new Date() > quote.validUntil;
    } else if (quote.status === 'sent' && new Date() > quote.validUntil) {
      matchesFilter = selectedFilter === 'all' || selectedFilter === 'expired';
    }
    
    return matchesSearch && matchesFilter;
  });

  const totalQuotesValue = quotes.reduce((sum, quote) => sum + quote.total, 0);
  const acceptedQuotesValue = quotes
    .filter(q => q.status === 'accepted')
    .reduce((sum, quote) => sum + quote.total, 0);

  const handleCreateNew = () => {
    navigation.navigate('QuoteEditor');
  };

  const handleEditQuote = (quoteId: string) => {
    navigation.navigate('QuoteEditor', { quoteId });
  };

  const handleDeleteQuote = (quoteId: string) => {
    console.log('Delete quote:', quoteId);
  };

  const handleSendQuote = (quoteId: string) => {
    console.log('Send quote:', quoteId);
  };

  const handleViewQuote = (quoteId: string) => {
    navigation.navigate('QuoteEditor', { quoteId });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{quotes.length}</Text>
            <Text style={styles.statLabel}>Devis total</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{totalQuotesValue.toFixed(0)}€</Text>
            <Text style={styles.statLabel}>Valeur totale</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{acceptedQuotesValue.toFixed(0)}€</Text>
            <Text style={styles.statLabel}>Acceptés</Text>
          </View>
        </View>

        <Input
          placeholder="Rechercher un devis..."
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
        {filteredQuotes.length === 0 ? (
          <Card style={styles.emptyState}>
            <Icon name="receipt" size={64} color={Colors.gray300} />
            <Text style={styles.emptyTitle}>
              {searchQuery || selectedFilter !== 'all' 
                ? 'Aucun devis trouvé' 
                : 'Aucun devis'}
            </Text>
            <Text style={styles.emptyText}>
              {searchQuery || selectedFilter !== 'all'
                ? 'Essayez de modifier vos critères de recherche'
                : 'Créez votre premier devis pour commencer'}
            </Text>
            {!searchQuery && selectedFilter === 'all' && (
              <Button
                title="Créer mon premier devis"
                onPress={handleCreateNew}
                style={styles.emptyButton}
              />
            )}
          </Card>
        ) : (
          <>
            {filteredQuotes.map((quote) => (
              <QuoteCard
                key={quote.id}
                quote={quote}
                onPress={() => handleViewQuote(quote.id)}
                onEdit={() => handleEditQuote(quote.id)}
                onDelete={() => handleDeleteQuote(quote.id)}
                onSend={() => handleSendQuote(quote.id)}
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
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
    paddingVertical: 12,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  statLabel: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 4,
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
  quoteCard: {
    marginBottom: 16,
  },
  quoteHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  quoteInfo: {
    flex: 1,
    marginRight: 12,
  },
  quoteNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.primary,
    marginBottom: 4,
  },
  clientName: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: 2,
  },
  clientEmail: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  quoteActions: {
    flexDirection: 'row',
  },
  actionButton: {
    padding: 8,
    marginLeft: 4,
  },
  quoteMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
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
  totalAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.success,
  },
  quoteDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  itemsCount: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  dateText: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  validityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  validityText: {
    fontSize: 12,
    marginLeft: 4,
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