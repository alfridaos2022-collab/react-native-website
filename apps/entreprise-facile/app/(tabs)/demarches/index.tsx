import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { Link } from 'expo-router';

export default function DemarchesScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Démarches</Text>
      <Text style={styles.subtitle}>Guides étape par étape et liens administratifs.</Text>
      <View style={styles.actions}>
        <Link href="/(tabs)/demarches/guide" asChild>
          <Pressable style={styles.button}><Text style={styles.buttonText}>Guide</Text></Pressable>
        </Link>
        <Link href="/(tabs)/demarches/liens" asChild>
          <Pressable style={styles.buttonSecondary}><Text style={styles.buttonText}>Liens utiles</Text></Pressable>
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
