import { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, Pressable } from 'react-native';
import { useBudgetStore } from '../../../state/budget';

export default function NewTransactionScreen() {
  const add = useBudgetStore((s) => s.addTransaction);

  const [type, setType] = useState<'income' | 'expense'>('expense');
  const [category, setCategory] = useState('Général');
  const [label, setLabel] = useState('');
  const [amount, setAmount] = useState('0');

  const save = () => {
    add({ type, category, label: label || 'Mouvement', amount: Number(amount) || 0, date: new Date().toISOString() });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Nouveau mouvement</Text>

      <View style={styles.row}>
        <Pressable style={[styles.choice, type === 'expense' && styles.choiceActive]} onPress={() => setType('expense')}>
          <Text style={styles.choiceText}>Dépense</Text>
        </Pressable>
        <Pressable style={[styles.choice, type === 'income' && styles.choiceActive]} onPress={() => setType('income')}>
          <Text style={styles.choiceText}>Recette</Text>
        </Pressable>
      </View>

      <TextInput style={styles.input} placeholder="Catégorie" value={category} onChangeText={setCategory} />
      <TextInput style={styles.input} placeholder="Libellé" value={label} onChangeText={setLabel} />
      <TextInput style={styles.input} placeholder="Montant" keyboardType="numeric" value={amount} onChangeText={setAmount} />

      <Pressable style={styles.button} onPress={save}>
        <Text style={styles.buttonText}>Enregistrer</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, gap: 12 },
  title: { fontSize: 22, fontWeight: '700' },
  row: { flexDirection: 'row', gap: 8 },
  choice: { flex: 1, borderWidth: 1, borderColor: '#cbd5e1', borderRadius: 8, padding: 10, alignItems: 'center' },
  choiceActive: { backgroundColor: '#e2e8f0' },
  input: { borderWidth: 1, borderColor: '#cbd5e1', borderRadius: 8, padding: 10 },
  button: { backgroundColor: '#2563eb', paddingVertical: 12, alignItems: 'center', borderRadius: 8 },
  buttonText: { color: 'white', fontWeight: '700' },
});
