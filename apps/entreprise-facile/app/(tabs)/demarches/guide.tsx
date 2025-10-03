import { ScrollView, Text, StyleSheet, View, Linking, Pressable } from 'react-native';

const STEPS = [
  { title: "Choisir le statut juridique", content: "Auto-entrepreneur, SARL, SAS, etc. Comparez les régimes fiscaux et sociaux." },
  { title: "Rédiger les statuts", content: "Préparer les statuts adaptés à votre activité et gouvernance." },
  { title: "Dépôt du capital", content: "Ouvrir un compte de dépôt et verser le capital social si nécessaire." },
  { title: "Publication d'annonce légale", content: "Publier l'annonce de constitution si requis par le statut." },
  { title: "Immatriculation", content: "Déposer le dossier au guichet unique INPI pour obtenir le SIREN." },
];

export default function DemarchesGuideScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Guide des démarches</Text>
      {STEPS.map((s) => (
        <View key={s.title} style={styles.card}>
          <Text style={styles.cardTitle}>{s.title}</Text>
          <Text style={styles.cardText}>{s.content}</Text>
        </View>
      ))}

      <Text style={styles.subtitle}>Liens utiles</Text>
      <Pressable onPress={() => Linking.openURL('https://procedures.inpi.fr/')}><Text style={styles.link}>Guichet unique INPI</Text></Pressable>
      <Pressable onPress={() => Linking.openURL('https://www.service-public.fr/professionnels-entreprises')}><Text style={styles.link}>Service-Public Pro</Text></Pressable>
      <Pressable onPress={() => Linking.openURL('https://bpifrance-creation.fr/')}><Text style={styles.link}>BPI France Création</Text></Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, gap: 12 },
  title: { fontSize: 22, fontWeight: '700' },
  subtitle: { marginTop: 8, fontWeight: '700' },
  card: { backgroundColor: 'white', padding: 12, borderRadius: 8, borderWidth: 1, borderColor: '#e2e8f0', gap: 6 },
  cardTitle: { fontSize: 16, fontWeight: '700' },
  cardText: { color: '#475569' },
  link: { color: '#2563eb', textDecorationLine: 'underline' },
});
