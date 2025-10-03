import { ScrollView, Text, StyleSheet, View, Linking, Pressable } from 'react-native';

const STEPS = [
  { title: 'Choisir le statut juridique', detail: 'Auto-entrepreneur, SARL, SAS, etc.' },
  { title: 'Rédiger les statuts', detail: 'Adapter aux besoins de l’activité.' },
  { title: 'Immatriculation', detail: 'Déposer le dossier sur le guichet unique.' },
  { title: 'Comptabilité', detail: 'Mettre en place suivi comptable et bancaire.' },
];

export default function GuideScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Guide de création d’entreprise</Text>
      {STEPS.map((s, idx) => (
        <View key={s.title} style={styles.card}>
          <Text style={styles.step}>{idx + 1}.</Text>
          <View style={{ flex: 1 }}>
            <Text style={styles.cardTitle}>{s.title}</Text>
            <Text style={styles.cardText}>{s.detail}</Text>
          </View>
        </View>
      ))}

      <Pressable onPress={() => Linking.openURL('https://procedures.inpi.fr/')} style={styles.button}>
        <Text style={styles.buttonText}>Guichet unique INPI</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, gap: 12 },
  title: { fontSize: 22, fontWeight: '700' },
  card: { flexDirection: 'row', gap: 12, backgroundColor: 'white', padding: 12, borderRadius: 8, borderWidth: 1, borderColor: '#e2e8f0' },
  step: { width: 24, textAlign: 'center', fontWeight: '700' },
  cardTitle: { fontSize: 16, fontWeight: '600' },
  cardText: { color: '#475569' },
  button: { backgroundColor: '#2563eb', padding: 12, borderRadius: 8, alignItems: 'center' },
  buttonText: { color: 'white', fontWeight: '600' },
});
