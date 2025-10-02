import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { Link } from 'expo-router';
import { useQuotesStore } from '../../../state/quotes';
import { exportJSONandShare } from '../../../utils/export';

export default function DevisListScreen() {
  const quotes = useQuotesStore((s) => s.quotes);
  const remove = useQuotesStore((s) => s.removeQuote);
  const updateStatus = useQuotesStore((s) => s.updateStatus);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Mes devis</Text>
      <Link href="/(tabs)/devis/new" asChild>
        <Pressable style={styles.button}><Text style={styles.buttonText}>Nouveau devis</Text></Pressable>
      </Link>
      {quotes.length === 0 ? (
        <Text style={styles.empty}>Aucun devis pour le moment.</Text>
      ) : (
        quotes.map((q) => (
          <View key={q.id} style={styles.card}>
            <Text style={styles.cardTitle}>{q.customerName}</Text>
            <Text style={styles.meta}>Créé: {new Date(q.createdAt).toLocaleDateString()} {q.dueAt ? `• Échéance: ${new Date(q.dueAt).toLocaleDateString()}` : ''}</Text>
            <Text style={styles.meta}>Statut: {q.status}</Text>
            <Text style={styles.total}>Total TTC: {q.total.toFixed(2)} €</Text>
            <View style={styles.row}>
              <Pressable style={[styles.button, styles.secondary]} onPress={() => updateStatus(q.id, 'sent')}><Text style={styles.buttonText}>Envoyé</Text></Pressable>
              <Pressable style={[styles.button, styles.secondary]} onPress={() => updateStatus(q.id, 'accepted')}><Text style={styles.buttonText}>Accepté</Text></Pressable>
              <Pressable style={[styles.button, styles.secondary]} onPress={() => updateStatus(q.id, 'rejected')}><Text style={styles.buttonText}>Refusé</Text></Pressable>
              <Pressable style={[styles.button, styles.secondary]} onPress={() => exportJSONandShare(`${q.id}.json`, q)}><Text style={styles.buttonText}>Exporter</Text></Pressable>
              <Pressable style={[styles.button, styles.danger]} onPress={() => remove(q.id)}><Text style={styles.buttonText}>Supprimer</Text></Pressable>
            </View>
          </View>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, gap: 12 },
  title: { fontSize: 22, fontWeight: '700' },
  empty: { color: '#64748b' },
  card: { backgroundColor: 'white', padding: 12, borderRadius: 8, borderWidth: 1, borderColor: '#e2e8f0', gap: 6 },
  cardTitle: { fontSize: 16, fontWeight: '700' },
  meta: { color: '#475569' },
  total: { fontWeight: '700' },
  row: { flexDirection: 'row', gap: 8, flexWrap: 'wrap' },
  button: { backgroundColor: '#2563eb', paddingVertical: 10, paddingHorizontal: 12, borderRadius: 8 },
  secondary: { backgroundColor: '#334155' },
  danger: { backgroundColor: '#dc2626' },
  buttonText: { color: 'white', fontWeight: '700' },
});
