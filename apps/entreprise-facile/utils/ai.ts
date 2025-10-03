export type AnalysisIssue = {
  sectionKey: string;
  severity: 'info' | 'warning' | 'error';
  message: string;
  suggestion: string;
};

export function analyzeBusinessPlan(sections: Record<string, string>): AnalysisIssue[] {
  const issues: AnalysisIssue[] = [];
  for (const [key, content] of Object.entries(sections)) {
    const length = content?.trim().length ?? 0;
    if (length < 100) {
      issues.push({
        sectionKey: key,
        severity: 'warning',
        message: 'Section trop courte',
        suggestion: "Développez davantage les points clés avec des données chiffrées.",
      });
    }
    if (!/[0-9]{4}|%|€/.test(content || '')) {
      issues.push({
        sectionKey: key,
        severity: 'info',
        message: 'Peu de données quantitatives',
        suggestion: 'Ajoutez des chiffres clés: taille de marché, marges, prévisions.',
      });
    }
  }
  return issues;
}
