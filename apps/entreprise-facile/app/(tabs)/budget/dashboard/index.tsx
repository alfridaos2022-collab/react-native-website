import { View, Text, StyleSheet, ScrollView } from 'react-native';

const DATA = {
  recettes: 4200,
  depenses: 3100,
  categories: [
    { name: 'Ventes', value: 2500 },
    { name: 'Marketing', value: 600 },
    { name: 'Opérations', value: 700 },
    { name: 'Salaires', value: 800 },
    { name: 'Autres', value: 500 },
  ],
};

export default function BudgetDashboardScreen() {
  const solde = DATA.recettes - DATA.depenses;
  const totalCat = DATA.categories.reduce((s, c) => s + c.value, 0);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Tableau de bord</Text>
      <View style={styles.card}>
        <Text>Recettes: {DATA.recettes.toFixed(2)} €</Text>
        <Text>Dépenses: {DATA.depenses.toFixed(2)} €</Text>
        <Text style={styles.bold}>Solde: {solde.toFixed(2)} €</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.bold}>Répartition par catégorie</Text>
        {DATA.categories.map((c) => (
          <View key={c.name} style={styles.row}>
            <Text style={styles.label}>{c.name}</Text>
            <View style={styles.barBg}>
              <View style={[styles.barFill, { width: `${(c.value / totalCat) * 100}%` }]} />
            </View>
            <Text style={styles.value}>{c.value.toFixed(0)} €</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, gap: 12 },
  title: { fontSize: 22, fontWeight: '700' },
  card: { backgroundColor: 'white', padding: 12, borderRadius: 8, borderWidth: 1, borderColor: '#e2e8f0', gap: 8 },
  bold: { fontWeight: '700' },
  row: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  label: { width: 100 },
  barBg: { flex: 1, height: 8, backgroundColor: '#e2e8f0', borderRadius: 4, overflow: 'hidden' },
  barFill: { height: '100%', backgroundColor: '#2563eb' },
  value: { width: 60, textAlign: 'right' },
});
