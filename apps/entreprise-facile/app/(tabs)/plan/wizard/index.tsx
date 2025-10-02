import { useMemo, useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, Pressable } from 'react-native';
import { analyzeBusinessPlan } from '../../../../utils/ai';

const DEFAULT_SECTIONS = [
  { key: 'executiveSummary', title: "Résumé opérationnel" },
  { key: 'company', title: "Présentation de l'entreprise et de l'équipe" },
  { key: 'market', title: 'Analyse du marché' },
  { key: 'products', title: 'Produits et services' },
  { key: 'marketing', title: 'Stratégie marketing et commerciale' },
  { key: 'operations', title: 'Plan opérationnel' },
  { key: 'finance', title: 'Plan financier' },
] as const;

type SectionKey = typeof DEFAULT_SECTIONS[number]['key'];

type PlanData = Partial<Record<SectionKey, string>>;

export default function PlanWizardScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [data, setData] = useState<PlanData>({});

  const section = DEFAULT_SECTIONS[currentIndex];

  const onNext = () => {
    if (currentIndex < DEFAULT_SECTIONS.length - 1) setCurrentIndex(currentIndex + 1);
  };

  const onPrev = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  const onChange = (text: string) => {
    setData((prev) => ({ ...prev, [section.key]: text }));
  };

  const progress = ((currentIndex + 1) / DEFAULT_SECTIONS.length) * 100;
  const issues = useMemo(() => analyzeBusinessPlan(data as Record<string, string>), [data]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Assistant de rédaction</Text>
      <Text style={styles.subtitle}>{section.title}</Text>

      <View style={styles.progressWrap}>
        <View style={[styles.progressBar, { width: `${progress}%` }]} />
      </View>

      <TextInput
        style={styles.input}
        placeholder="Rédigez ici..."
        multiline
        numberOfLines={8}
        value={data[section.key] ?? ''}
        onChangeText={onChange}
      />

      <View style={styles.nav}>
        <Pressable onPress={onPrev} disabled={currentIndex === 0} style={[styles.button, currentIndex === 0 && styles.buttonDisabled]}>
          <Text style={styles.buttonText}>Précédent</Text>
        </Pressable>
        <Pressable onPress={onNext} disabled={currentIndex === DEFAULT_SECTIONS.length - 1} style={[styles.button, currentIndex === DEFAULT_SECTIONS.length - 1 && styles.buttonDisabled]}>
          <Text style={styles.buttonText}>Suivant</Text>
        </Pressable>
      </View>

      {issues.length > 0 && (
        <View style={styles.hintBox}>
          <Text style={styles.hintTitle}>Analyse IA</Text>
          {issues.filter((i) => i.sectionKey === section.key).map((i, idx) => (
            <Text key={idx} style={styles.hintText}>• {i.message}: {i.suggestion}</Text>
          ))}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, gap: 12 },
  title: { fontSize: 22, fontWeight: '700' },
  subtitle: { color: '#334155', fontSize: 16 },
  progressWrap: { height: 8, backgroundColor: '#e2e8f0', borderRadius: 4, overflow: 'hidden' },
  progressBar: { height: '100%', backgroundColor: '#2563eb' },
  input: { borderWidth: 1, borderColor: '#cbd5e1', borderRadius: 8, padding: 12, minHeight: 160, textAlignVertical: 'top' },
  nav: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 },
  button: { backgroundColor: '#2563eb', paddingVertical: 10, paddingHorizontal: 16, borderRadius: 8 },
  buttonDisabled: { opacity: 0.5 },
  buttonText: { color: 'white', fontWeight: '600' },
  hintBox: { backgroundColor: '#f1f5f9', padding: 12, borderRadius: 8 },
  hintTitle: { fontWeight: '700', marginBottom: 4 },
  hintText: { color: '#475569' },
});
