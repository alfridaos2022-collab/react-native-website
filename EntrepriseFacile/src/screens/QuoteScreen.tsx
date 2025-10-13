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
import {Quote} from '../types';

const QuoteScreen: React.FC = () => {
  const navigation = useNavigation();
  const theme = useTheme();
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [filteredQuotes, setFilteredQuotes] = useState<Quote[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);

  const statuses = ['Tous', 'Brouillon', 'Envoyé', 'Accepté', 'Rejeté'];

  // Données de démonstration
  useEffect(() => {
    const mockQuotes: Quote[] = [
      {
        id: '1',
        quoteNumber: 'DEV-2024-001',
        clientName: 'Entreprise ABC',
        clientEmail: 'contact@entreprise-abc.fr',
        clientAddress: '123 Rue de la Paix, 75001 Paris',
        items: [
          {id: '1', description: 'Développement site web', quantity: 1, unitPrice: 5000, totalPrice: 5000},
          {id: '2', description: 'Maintenance mensuelle', quantity: 12, unitPrice: 500, totalPrice: 6000},
        ],
        subtotal: 11000,
        taxRate: 20,
        taxAmount: 2200,
        total: 13200,
        status: 'sent',
        createdAt: new Date('2024-01-15'),
        validUntil: new Date('2024-02-15'),
        notes: 'Devis pour refonte complète du site web',
      },
      {
        id: '2',
        quoteNumber: 'DEV-2024-002',
        clientName: 'Startup XYZ',
        clientEmail: 'hello@startup-xyz.com',
        clientAddress: '456 Avenue des Champs, 69000 Lyon',
        items: [
          {id: '1', description: 'Application mobile iOS', quantity: 1, unitPrice: 15000, totalPrice: 15000},
          {id: '2', description: 'Application mobile Android', quantity: 1, unitPrice: 15000, totalPrice: 15000},
        ],
        subtotal: 30000,
        taxRate: 20,
        taxAmount: 6000,
        total: 36000,
        status: 'accepted',
        createdAt: new Date('2024-01-10'),
        validUntil: new Date('2024-02-10'),
      },
      {
        id: '3',
        quoteNumber: 'DEV-2024-003',
        clientName: 'PME DEF',
        clientEmail: 'direction@pme-def.fr',
        clientAddress: '789 Boulevard du Commerce, 13000 Marseille',
        items: [
          {id: '1', description: 'Audit informatique', quantity: 1, unitPrice: 3000, totalPrice: 3000},
        ],
        subtotal: 3000,
        taxRate: 20,
        taxAmount: 600,
        total: 3600,
        status: 'draft',
        createdAt: new Date('2024-01-20'),
        validUntil: new Date('2024-02-20'),
      },
    ];
    setQuotes(mockQuotes);
    setFilteredQuotes(mockQuotes);
  }, []);

  // Filtrage des devis
  useEffect(() => {
    let filtered = quotes;

    if (searchQuery) {
      filtered = filtered.filter(quote =>
        quote.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        quote.quoteNumber.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedStatus && selectedStatus !== 'Tous') {
      const statusMap: {[key: string]: string} = {
        'Brouillon': 'draft',
        'Envoyé': 'sent',
        'Accepté': 'accepted',
        'Rejeté': 'rejected',
      };
      filtered = filtered.filter(quote => quote.status === statusMap[selectedStatus]);
    }

    setFilteredQuotes(filtered);
  }, [searchQuery, selectedStatus, quotes]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'accepted':
        return theme.colors.success;
      case 'sent':
        return theme.colors.info;
      case 'draft':
        return theme.colors.placeholder;
      case 'rejected':
        return theme.colors.error;
      default:
        return theme.colors.placeholder;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'accepted':
        return 'Accepté';
      case 'sent':
        return 'Envoyé';
      case 'draft':
        return 'Brouillon';
      case 'rejected':
        return 'Rejeté';
      default:
        return 'Inconnu';
    }
  };

  const handleDeleteQuote = (quoteId: string) => {
    Alert.alert(
      'Supprimer le devis',
      'Êtes-vous sûr de vouloir supprimer ce devis ?',
      [
        {text: 'Annuler', style: 'cancel'},
        {
          text: 'Supprimer',
          style: 'destructive',
          onPress: () => {
            setQuotes(prev => prev.filter(quote => quote.id !== quoteId));
          },
        },
      ]
    );
  };

  const handleSendQuote = (quoteId: string) => {
    Alert.alert(
      'Envoyer le devis',
      'Voulez-vous envoyer ce devis par email au client ?',
      [
        {text: 'Annuler', style: 'cancel'},
        {
          text: 'Envoyer',
          onPress: () => {
            setQuotes(prev => 
              prev.map(quote => 
                quote.id === quoteId 
                  ? {...quote, status: 'sent' as const}
                  : quote
              )
            );
            Alert.alert('Succès', 'Devis envoyé avec succès');
          },
        },
      ]
    );
  };

  const renderQuote = ({item}: {item: Quote}) => (
    <Card style={styles.quoteCard}>
      <Card.Content>
        <View style={styles.quoteHeader}>
          <View>
            <Title style={styles.quoteNumber}>{item.quoteNumber}</Title>
            <Text style={styles.clientName}>{item.clientName}</Text>
          </View>
          <Chip
            style={[styles.statusChip, {backgroundColor: getStatusColor(item.status)}]}
            textStyle={styles.statusChipText}>
            {getStatusText(item.status)}
          </Chip>
        </View>
        
        <View style={styles.quoteInfo}>
          <View style={styles.infoItem}>
            <Icon name="euro" size={16} color={theme.colors.primary} />
            <Text style={styles.infoText}>{item.total.toLocaleString('fr-FR')} €</Text>
          </View>
          <View style={styles.infoItem}>
            <Icon name="calendar-today" size={16} color={theme.colors.primary} />
            <Text style={styles.infoText}>
              Valide jusqu'au {item.validUntil.toLocaleDateString('fr-FR')}
            </Text>
          </View>
        </View>

        <View style={styles.itemsPreview}>
          <Text style={styles.itemsTitle}>Articles ({item.items.length}):</Text>
          {item.items.slice(0, 2).map((item, index) => (
            <Text key={index} style={styles.itemText}>
              • {item.description} - {item.totalPrice.toLocaleString('fr-FR')} €
            </Text>
          ))}
          {item.items.length > 2 && (
            <Text style={styles.moreItems}>
              +{item.items.length - 2} autres articles
            </Text>
          )}
        </View>

        <View style={styles.quoteActions}>
          <Button
            mode="outlined"
            onPress={() => navigation.navigate('CreateQuote', {quoteId: item.id})}
            style={styles.actionButton}>
            Voir
          </Button>
          {item.status === 'draft' && (
            <Button
              mode="contained"
              onPress={() => handleSendQuote(item.id)}
              style={styles.actionButton}>
              Envoyer
            </Button>
          )}
          <Button
            mode="text"
            onPress={() => handleDeleteQuote(item.id)}
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
        placeholder="Rechercher un devis..."
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={styles.searchbar}
      />

      {/* Filtres par statut */}
      <View style={styles.filtersContainer}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={statuses}
          keyExtractor={(item) => item}
          renderItem={({item}) => (
            <Chip
              selected={selectedStatus === item}
              onPress={() => setSelectedStatus(item === 'Tous' ? null : item)}
              style={styles.filterChip}>
              {item}
            </Chip>
          )}
        />
      </View>

      {/* Statistiques rapides */}
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{quotes.length}</Text>
          <Text style={styles.statLabel}>Total</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>
            {quotes.filter(q => q.status === 'sent').length}
          </Text>
          <Text style={styles.statLabel}>Envoyés</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>
            {quotes.filter(q => q.status === 'accepted').length}
          </Text>
          <Text style={styles.statLabel}>Acceptés</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>
            {quotes.reduce((sum, q) => sum + q.total, 0).toLocaleString('fr-FR')} €
          </Text>
          <Text style={styles.statLabel}>CA Total</Text>
        </View>
      </View>

      {/* Liste des devis */}
      <FlatList
        data={filteredQuotes}
        keyExtractor={(item) => item.id}
        renderItem={renderQuote}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Icon name="description" size={64} color={theme.colors.placeholder} />
            <Title style={styles.emptyTitle}>Aucun devis</Title>
            <Paragraph style={styles.emptyText}>
              Créez votre premier devis pour commencer à prospecter vos clients.
            </Paragraph>
            <Button
              mode="contained"
              onPress={() => navigation.navigate('CreateQuote')}
              style={styles.createButton}>
              Créer un Devis
            </Button>
          </View>
        }
      />

      {/* Bouton flottant pour créer un nouveau devis */}
      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => navigation.navigate('CreateQuote')}
        label="Nouveau Devis"
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
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 12,
    marginHorizontal: 4,
    borderRadius: 8,
    elevation: 1,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E7D32',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingBottom: 80,
  },
  quoteCard: {
    marginBottom: 16,
    elevation: 2,
  },
  quoteHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  quoteNumber: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  clientName: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  statusChip: {
    marginLeft: 8,
  },
  statusChipText: {
    color: 'white',
    fontSize: 12,
  },
  quoteInfo: {
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
  itemsPreview: {
    backgroundColor: '#F8F9FA',
    padding: 8,
    borderRadius: 8,
    marginBottom: 12,
  },
  itemsTitle: {
    fontSize: 12,
    fontWeight: '500',
    color: '#666',
    marginBottom: 4,
  },
  itemText: {
    fontSize: 12,
    color: '#666',
  },
  moreItems: {
    fontSize: 12,
    color: '#999',
    fontStyle: 'italic',
    marginTop: 2,
  },
  quoteActions: {
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

export default QuoteScreen;