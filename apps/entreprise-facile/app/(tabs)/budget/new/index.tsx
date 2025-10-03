import { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, Pressable } from 'react-native';

interface Movement {
  id: string;
  type: 'recette' | 'dépense';
  category: string;
  amount: number;
}

const CATEGORIES = ['Ventes', 'Marketing', 'Opérations', 'Salaires', 'Autres'];

export default function BudgetNewScreen() {
  const [movement, setMovement] = useState<Movement>({ id: 'tmp', type: 'dépense', category: 'Autres', amount: 0 });

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Nouveau mouvement</Text>
      <View style={styles.card}>
        <Text style={styles.label}>Type</Text>
        <View style={styles.row}>
          {(['recette', 'dépense'] as const).map((t) => (
            <Pressable key={t} onPress={() => setMovement({ ...movement, type: t })} style={[styles.chip, movement.type === t && styles.chipActive]}>
              <Text style={[styles.chipText, movement.type === t && styles.chipTextActive]}>{t}</Text>
            </Pressable>
          ))}
        </View>

        <Text style={styles.label}>Catégorie</Text>
        <View style={styles.row}>
          {CATEGORIES.map((c) => (
            <Pressable key={c} onPress={() => setMovement({ ...movement, category: c })} style={[styles.chip, movement.category === c && styles.chipActive]}>
              <Text style={[styles.chipText, movement.category === c && styles.chipTextActive]}>{c}</Text>
            </Pressable>
          ))}
        </View>

        <Text style={styles.label}>Montant (€)</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={String(movement.amount)}
          onChangeText={(t) => setMovement({ ...movement, amount: Number(t || 0) })}
        />
      </View>

      <Pressable style={styles.button}>
        <Text style={styles.buttonText}>Enregistrer</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, gap: 12 },
  title: { fontSize: 22, fontWeight: '700' },
  card: { backgroundColor: 'white', padding: 12, borderRadius: 8, borderWidth: 1, borderColor: '#e2e8f0', gap: 8 },
  label: { fontWeight: '600' },
  row: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: { paddingVertical: 6, paddingHorizontal: 10, borderRadius: 20, borderWidth: 1, borderColor: '#cbd5e1' },
  chipActive: { backgroundColor: '#2563eb', borderColor: '#2563eb' },
  chipText: { color: '#0f172a' },
  chipTextActive: { color: 'white' },
  input: { borderWidth: 1, borderColor: '#cbd5e1', borderRadius: 8, padding: 10 },
  button: { backgroundColor: '#2563eb', padding: 12, borderRadius: 8, alignItems: 'center' },
  buttonText: { color: 'white', fontWeight: '600' },
});
