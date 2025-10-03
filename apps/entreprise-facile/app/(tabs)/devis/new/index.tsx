import { useMemo, useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, Pressable } from 'react-native';

interface LineItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  vatRate: number; // e.g., 0.2 for 20%
  discountRate: number; // e.g., 0.1 for 10%
}

function calculateTotals(items: LineItem[]) {
  const subtotal = items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  const totalDiscount = items.reduce((sum, item) => sum + item.unitPrice * item.quantity * item.discountRate, 0);
  const baseAfterDiscount = subtotal - totalDiscount;
  const totalVat = items.reduce((sum, item) => {
    const lineBase = item.unitPrice * item.quantity * (1 - item.discountRate);
    return sum + lineBase * item.vatRate;
  }, 0);
  const total = baseAfterDiscount + totalVat;
  return { subtotal, totalDiscount, totalVat, total };
}

export default function NewQuoteScreen() {
  const [items, setItems] = useState<LineItem[]>([
    { id: '1', description: 'Produit/Service', quantity: 1, unitPrice: 100, vatRate: 0.2, discountRate: 0 },
  ]);

  const totals = useMemo(() => calculateTotals(items), [items]);

  const updateItem = (id: string, patch: Partial<LineItem>) => {
    setItems((prev) => prev.map((it) => (it.id === id ? { ...it, ...patch } : it)));
  };

  const addItem = () => {
    setItems((prev) => [
      ...prev,
      { id: String(Date.now()), description: '', quantity: 1, unitPrice: 0, vatRate: 0.2, discountRate: 0 },
    ]);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Nouveau devis</Text>
      {items.map((item) => (
        <View key={item.id} style={styles.card}>
          <TextInput
            style={styles.input}
            placeholder="Description"
            value={item.description}
            onChangeText={(text) => updateItem(item.id, { description: text })}
          />
          <View style={styles.row}>
            <TextInput
              style={[styles.input, styles.inputSmall]}
              placeholder="Quantité"
              keyboardType="numeric"
              value={String(item.quantity)}
              onChangeText={(text) => updateItem(item.id, { quantity: Number(text || 0) })}
            />
            <TextInput
              style={[styles.input, styles.inputSmall]}
              placeholder="Prix unit."
              keyboardType="numeric"
              value={String(item.unitPrice)}
              onChangeText={(text) => updateItem(item.id, { unitPrice: Number(text || 0) })}
            />
          </View>
          <View style={styles.row}>
            <TextInput
              style={[styles.input, styles.inputSmall]}
              placeholder="TVA %"
              keyboardType="numeric"
              value={String(item.vatRate * 100)}
              onChangeText={(text) => updateItem(item.id, { vatRate: Number(text || 0) / 100 })}
            />
            <TextInput
              style={[styles.input, styles.inputSmall]}
              placeholder="Remise %"
              keyboardType="numeric"
              value={String(item.discountRate * 100)}
              onChangeText={(text) => updateItem(item.id, { discountRate: Number(text || 0) / 100 })}
            />
          </View>
        </View>
      ))}

      <Pressable onPress={addItem} style={styles.button}>
        <Text style={styles.buttonText}>Ajouter une ligne</Text>
      </Pressable>

      <View style={styles.totals}>
        <Text>Sous-total: {totals.subtotal.toFixed(2)} €</Text>
        <Text>Remises: -{totals.totalDiscount.toFixed(2)} €</Text>
        <Text>TVA: {totals.totalVat.toFixed(2)} €</Text>
        <Text style={styles.total}>Total: {totals.total.toFixed(2)} €</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, gap: 12 },
  title: { fontSize: 22, fontWeight: '700' },
  card: { backgroundColor: 'white', padding: 12, borderRadius: 8, borderWidth: 1, borderColor: '#e2e8f0', gap: 8 },
  input: { borderWidth: 1, borderColor: '#cbd5e1', borderRadius: 8, padding: 10 },
  row: { flexDirection: 'row', gap: 8 },
  inputSmall: { flex: 1 },
  button: { backgroundColor: '#2563eb', padding: 12, borderRadius: 8, alignItems: 'center' },
  buttonText: { color: 'white', fontWeight: '600' },
  totals: { marginTop: 12, gap: 4 },
  total: { fontWeight: '800' },
});
