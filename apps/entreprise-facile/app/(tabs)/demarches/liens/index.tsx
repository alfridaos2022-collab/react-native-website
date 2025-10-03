import { ScrollView, Text, StyleSheet, View, Linking, Pressable } from 'react-native';

const LINKS = [
  { label: 'INPI - Guichet unique', url: 'https://procedures.inpi.fr/' },
  { label: 'URSSAF - Auto-entrepreneur', url: 'https://www.autoentrepreneur.urssaf.fr/' },
  { label: 'Service-Public.fr', url: 'https://www.service-public.fr/professionnels-entreprises' },
];

export default function LinksScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Liens utiles</Text>
      {LINKS.map((l) => (
        <Pressable key={l.url} onPress={() => Linking.openURL(l.url)} style={styles.card}>
          <View style={{ flex: 1 }}>
            <Text style={styles.cardTitle}>{l.label}</Text>
            <Text style={styles.cardText}>{l.url}</Text>
          </View>
        </Pressable>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, gap: 12 },
  title: { fontSize: 22, fontWeight: '700' },
  card: { flexDirection: 'row', gap: 12, backgroundColor: 'white', padding: 12, borderRadius: 8, borderWidth: 1, borderColor: '#e2e8f0' },
  cardTitle: { fontSize: 16, fontWeight: '600' },
  cardText: { color: '#475569' },
});
