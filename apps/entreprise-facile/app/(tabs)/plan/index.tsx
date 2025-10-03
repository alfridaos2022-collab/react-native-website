import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { Link } from 'expo-router';

export default function PlanScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Plan d'Affaires</Text>
      <Text style={styles.subtitle}>Créez et gérez votre business plan.</Text>
      <View style={styles.actions}>
        <Link href="/(tabs)/plan/wizard" asChild>
          <Pressable style={styles.button}><Text style={styles.buttonText}>Assistant de rédaction</Text></Pressable>
        </Link>
        <Link href="/(tabs)/plan/models" asChild>
          <Pressable style={styles.buttonSecondary}><Text style={styles.buttonText}>Modèles</Text></Pressable>
        </Link>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  title: { fontSize: 24, fontWeight: '600' },
  subtitle: { marginTop: 8, color: '#666' },
  actions: { flexDirection: 'row', gap: 12, marginTop: 16 },
  button: { backgroundColor: '#2563eb', padding: 12, borderRadius: 8 },
  buttonSecondary: { backgroundColor: '#334155', padding: 12, borderRadius: 8 },
  buttonText: { color: 'white', fontWeight: '600' },
});
