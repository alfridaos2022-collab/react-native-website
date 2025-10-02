import { View, Text, StyleSheet, ScrollView } from 'react-native';

const MODELS = [
  { id: 'restauration', name: 'Restauration' },
  { id: 'ecommerce', name: 'E-commerce' },
  { id: 'services', name: 'Services' },
];

export default function ModelsScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Modèles de plans d'affaires</Text>
      {MODELS.map((m) => (
        <View key={m.id} style={styles.card}>
          <Text style={styles.cardTitle}>{m.name}</Text>
          <Text style={styles.cardText}>Modèle pré-rempli adapté au secteur {m.name.toLowerCase()}.</Text>
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
