import { View, Text, StyleSheet, ScrollView } from 'react-native';

const QUOTES = [
  { id: 'Q-001', client: 'Client A', total: 1200.5, status: 'Envoyé' },
  { id: 'Q-002', client: 'Client B', total: 560, status: 'Brouillon' },
];

export default function QuoteListScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Vos devis</Text>
      {QUOTES.map((q) => (
        <View key={q.id} style={styles.card}>
          <Text style={styles.cardTitle}>{q.id} - {q.client}</Text>
          <Text style={styles.cardText}>Total: {q.total.toFixed(2)} € · {q.status}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, gap: 12 },
  title: { fontSize: 22, fontWeight: '700' },
  card: { backgroundColor: 'white', padding: 12, borderRadius: 8, borderWidth: 1, borderColor: '#e2e8f0' },
  cardTitle: { fontSize: 16, fontWeight: '600' },
  cardText: { color: '#475569' },
});
