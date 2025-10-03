import { useMemo, useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { QuoteLine, useQuotesStore, QuotesSelectors } from '../../../state/quotes';

export default function NewDevisScreen() {
  const router = useRouter();
  const addQuote = useQuotesStore((s) => s.addQuote);

  const [customerName, setCustomerName] = useState('');
  const [dueAt, setDueAt] = useState('');
  const [lines, setLines] = useState<QuoteLine[]>([
    { description: 'Prestation', quantity: 1, unitPrice: 0, tvaRate: 20, discountRate: 0 },
  ]);

  const totals = useMemo(() => QuotesSelectors.computeTotals(lines), [lines]);

  const updateLine = (index: number, patch: Partial<QuoteLine>) => {
    setLines((prev) => prev.map((l, i) => (i === index ? { ...l, ...patch } : l)));
  };

  const addLine = () => setLines((prev) => [...prev, { description: '', quantity: 1, unitPrice: 0, tvaRate: 20, discountRate: 0 }]);
  const removeLast = () => setLines((prev) => (prev.length > 1 ? prev.slice(0, -1) : prev));

  const save = () => {
    const created = addQuote({
      customerName: customerName || 'Client',
      createdAt: new Date().toISOString(),
      dueAt: dueAt || undefined,
      status: 'draft',
      lines,
    });
    router.push('/(tabs)/devis/list');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Nouveau devis</Text>

      <Text style={styles.label}>Client</Text>
      <TextInput style={styles.input} placeholder="Nom du client" value={customerName} onChangeText={setCustomerName} />

      <Text style={styles.label}>Échéance (AAAA-MM-JJ)</Text>
      <TextInput style={styles.input} placeholder="2025-12-31" value={dueAt} onChangeText={setDueAt} />

      <Text style={styles.sectionTitle}>Lignes</Text>
      {lines.map((l, i) => (
        <View key={i} style={styles.card}>
          <TextInput style={styles.input} placeholder="Description" value={l.description} onChangeText={(t) => updateLine(i, { description: t })} />
          <View style={styles.row}>
            <TextInput style={styles.inputSmall} keyboardType="numeric" placeholder="Qté" value={String(l.quantity)} onChangeText={(t) => updateLine(i, { quantity: Number(t) || 0 })} />
            <TextInput style={styles.inputSmall} keyboardType="numeric" placeholder="PU" value={String(l.unitPrice)} onChangeText={(t) => updateLine(i, { unitPrice: Number(t) || 0 })} />
            <TextInput style={styles.inputSmall} keyboardType="numeric" placeholder="TVA %" value={String(l.tvaRate)} onChangeText={(t) => updateLine(i, { tvaRate: Number(t) || 0 })} />
            <TextInput style={styles.inputSmall} keyboardType="numeric" placeholder="Remise %" value={String(l.discountRate)} onChangeText={(t) => updateLine(i, { discountRate: Number(t) || 0 })} />
          </View>
        </View>
      ))}

      <View style={styles.row}>
        <Pressable style={[styles.button, styles.secondary]} onPress={addLine}><Text style={styles.buttonText}>+ Ligne</Text></Pressable>
        <Pressable style={[styles.button, styles.secondary]} onPress={removeLast}><Text style={styles.buttonText}>- Dernière</Text></Pressable>
      </View>

      <View style={styles.summary}>
        <Text>Sous-total: {totals.subtotal.toFixed(2)} €</Text>
        <Text>Remises: -{totals.discount.toFixed(2)} €</Text>
        <Text>TVA: {totals.tva.toFixed(2)} €</Text>
        <Text style={styles.total}>Total TTC: {totals.total.toFixed(2)} €</Text>
      </View>

      <Pressable style={styles.button} onPress={save}>
        <Text style={styles.buttonText}>Enregistrer</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, gap: 12 },
  title: { fontSize: 22, fontWeight: '700' },
  label: { marginTop: 8, color: '#334155' },
  sectionTitle: { marginTop: 8, fontWeight: '700' },
  card: { backgroundColor: 'white', padding: 12, borderRadius: 8, borderWidth: 1, borderColor: '#e2e8f0', gap: 8 },
  input: { borderWidth: 1, borderColor: '#cbd5e1', borderRadius: 8, padding: 10 },
  row: { flexDirection: 'row', gap: 8 },
  inputSmall: { flex: 1, borderWidth: 1, borderColor: '#cbd5e1', borderRadius: 8, padding: 10 },
  summary: { gap: 6, marginTop: 8 },
  total: { fontWeight: '700' },
  button: { backgroundColor: '#2563eb', paddingVertical: 12, alignItems: 'center', borderRadius: 8 },
  secondary: { backgroundColor: '#334155' },
  buttonText: { color: 'white', fontWeight: '700' },
});
