import {Platform, Alert, Linking} from 'react-native';
import RNFS from 'react-native-fs';
import Share from 'react-native-share';
import {BusinessPlan, Quote, Budget, ExportOptions} from '../types';

export class ExportService {
  /**
   * Exporte un plan d'affaires en PDF
   */
  static async exportBusinessPlanToPDF(
    businessPlan: BusinessPlan,
    options: ExportOptions
  ): Promise<void> {
    try {
      const htmlContent = this.generateBusinessPlanHTML(businessPlan, options);
      const pdfPath = await this.generatePDF(htmlContent, `plan-affaires-${businessPlan.id}.pdf`);
      
      if (options.includeCharts) {
        // Ajouter les graphiques si nécessaire
        await this.addChartsToPDF(pdfPath, businessPlan);
      }

      await this.shareFile(pdfPath, 'Plan d\'Affaires');
    } catch (error) {
      console.error('Erreur lors de l\'export PDF:', error);
      Alert.alert('Erreur', 'Impossible d\'exporter le plan d\'affaires en PDF');
    }
  }

  /**
   * Exporte un devis en PDF
   */
  static async exportQuoteToPDF(quote: Quote, options: ExportOptions): Promise<void> {
    try {
      const htmlContent = this.generateQuoteHTML(quote, options);
      const pdfPath = await this.generatePDF(htmlContent, `devis-${quote.quoteNumber}.pdf`);
      
      await this.shareFile(pdfPath, 'Devis');
    } catch (error) {
      console.error('Erreur lors de l\'export PDF:', error);
      Alert.alert('Erreur', 'Impossible d\'exporter le devis en PDF');
    }
  }

  /**
   * Exporte un budget en Excel
   */
  static async exportBudgetToExcel(budget: Budget, options: ExportOptions): Promise<void> {
    try {
      const csvContent = this.generateBudgetCSV(budget);
      const filePath = await this.saveFile(csvContent, `budget-${budget.id}.csv`);
      
      await this.shareFile(filePath, 'Budget');
    } catch (error) {
      console.error('Erreur lors de l\'export Excel:', error);
      Alert.alert('Erreur', 'Impossible d\'exporter le budget en Excel');
    }
  }

  /**
   * Génère le HTML pour un plan d'affaires
   */
  private static generateBusinessPlanHTML(businessPlan: BusinessPlan, options: ExportOptions): string {
    const sectionsHTML = businessPlan.sections
      .map(section => `
        <div class="section">
          <h2>${section.title}</h2>
          <div class="content">${section.content || 'Section non rédigée'}</div>
          ${section.suggestions && section.suggestions.length > 0 ? `
            <div class="suggestions">
              <h3>Suggestions IA:</h3>
              <ul>
                ${section.suggestions.map(suggestion => `<li>${suggestion}</li>`).join('')}
              </ul>
            </div>
          ` : ''}
        </div>
      `)
      .join('');

    const aiAnalysisHTML = businessPlan.aiAnalysis && options.includeAnalysis ? `
      <div class="ai-analysis">
        <h2>Analyse IA</h2>
        <div class="score">Score: ${businessPlan.aiAnalysis.score}/100</div>
        <div class="strengths">
          <h3>Points Forts:</h3>
          <ul>
            ${businessPlan.aiAnalysis.strengths.map(strength => `<li>${strength}</li>`).join('')}
          </ul>
        </div>
        <div class="weaknesses">
          <h3>Points à Améliorer:</h3>
          <ul>
            ${businessPlan.aiAnalysis.weaknesses.map(weakness => `<li>${weakness}</li>`).join('')}
          </ul>
        </div>
      </div>
    ` : '';

    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <title>${businessPlan.title}</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              margin: 40px;
              color: #333;
            }
            .header {
              text-align: center;
              border-bottom: 2px solid #2E7D32;
              padding-bottom: 20px;
              margin-bottom: 30px;
            }
            .title {
              font-size: 28px;
              color: #2E7D32;
              margin-bottom: 10px;
            }
            .subtitle {
              font-size: 16px;
              color: #666;
            }
            .info {
              display: flex;
              justify-content: space-between;
              margin-bottom: 30px;
              font-size: 14px;
              color: #666;
            }
            .section {
              margin-bottom: 30px;
              page-break-inside: avoid;
            }
            .section h2 {
              color: #2E7D32;
              border-bottom: 1px solid #E0E0E0;
              padding-bottom: 10px;
            }
            .content {
              margin: 15px 0;
              text-align: justify;
            }
            .suggestions {
              background-color: #FFF3E0;
              padding: 15px;
              border-radius: 5px;
              margin-top: 15px;
            }
            .suggestions h3 {
              color: #F57C00;
              margin-bottom: 10px;
            }
            .ai-analysis {
              background-color: #E3F2FD;
              padding: 20px;
              border-radius: 8px;
              margin-top: 30px;
            }
            .score {
              font-size: 18px;
              font-weight: bold;
              color: #1976D2;
              margin-bottom: 15px;
            }
            .strengths, .weaknesses {
              margin-bottom: 15px;
            }
            .strengths h3 {
              color: #4CAF50;
            }
            .weaknesses h3 {
              color: #F44336;
            }
            ul {
              margin: 10px 0;
              padding-left: 20px;
            }
            li {
              margin-bottom: 5px;
            }
            @media print {
              body { margin: 20px; }
              .section { page-break-inside: avoid; }
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1 class="title">${businessPlan.title}</h1>
            <p class="subtitle">${businessPlan.description}</p>
          </div>
          
          <div class="info">
            <span>Secteur: ${businessPlan.sector}</span>
            <span>Statut: ${this.getStatusText(businessPlan.status)}</span>
            <span>Mis à jour: ${businessPlan.updatedAt.toLocaleDateString('fr-FR')}</span>
          </div>

          ${sectionsHTML}
          ${aiAnalysisHTML}
        </body>
      </html>
    `;
  }

  /**
   * Génère le HTML pour un devis
   */
  private static generateQuoteHTML(quote: Quote, options: ExportOptions): string {
    const itemsHTML = quote.items
      .map(item => `
        <tr>
          <td>${item.description}</td>
          <td style="text-align: center;">${item.quantity}</td>
          <td style="text-align: right;">${item.unitPrice.toLocaleString('fr-FR')} €</td>
          <td style="text-align: right;">${item.totalPrice.toLocaleString('fr-FR')} €</td>
        </tr>
      `)
      .join('');

    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <title>Devis ${quote.quoteNumber}</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              margin: 40px;
              color: #333;
            }
            .header {
              text-align: center;
              border-bottom: 2px solid #1976D2;
              padding-bottom: 20px;
              margin-bottom: 30px;
            }
            .quote-number {
              font-size: 24px;
              color: #1976D2;
              margin-bottom: 10px;
            }
            .client-info {
              display: flex;
              justify-content: space-between;
              margin-bottom: 30px;
            }
            .client-details h3 {
              color: #1976D2;
              margin-bottom: 10px;
            }
            .quote-details h3 {
              color: #1976D2;
              margin-bottom: 10px;
            }
            table {
              width: 100%;
              border-collapse: collapse;
              margin: 20px 0;
            }
            th, td {
              border: 1px solid #ddd;
              padding: 12px;
              text-align: left;
            }
            th {
              background-color: #1976D2;
              color: white;
            }
            .totals {
              margin-top: 20px;
              text-align: right;
            }
            .total-row {
              font-weight: bold;
              font-size: 18px;
              color: #1976D2;
              border-top: 2px solid #1976D2;
              padding-top: 10px;
            }
            .notes {
              margin-top: 30px;
              padding: 15px;
              background-color: #F5F5F5;
              border-radius: 5px;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1 class="quote-number">DEVIS ${quote.quoteNumber}</h1>
          </div>

          <div class="client-info">
            <div class="client-details">
              <h3>Client</h3>
              <p><strong>${quote.clientName}</strong></p>
              <p>${quote.clientEmail}</p>
              <p>${quote.clientAddress}</p>
            </div>
            <div class="quote-details">
              <h3>Informations Devis</h3>
              <p><strong>Date:</strong> ${quote.createdAt.toLocaleDateString('fr-FR')}</p>
              <p><strong>Valide jusqu'au:</strong> ${quote.validUntil.toLocaleDateString('fr-FR')}</p>
              <p><strong>Statut:</strong> ${this.getQuoteStatusText(quote.status)}</p>
            </div>
          </div>

          <table>
            <thead>
              <tr>
                <th>Description</th>
                <th>Quantité</th>
                <th>Prix unitaire</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              ${itemsHTML}
            </tbody>
          </table>

          <div class="totals">
            <p>Sous-total: ${quote.subtotal.toLocaleString('fr-FR')} €</p>
            <p>TVA (${quote.taxRate}%): ${quote.taxAmount.toLocaleString('fr-FR')} €</p>
            <p class="total-row">Total: ${quote.total.toLocaleString('fr-FR')} €</p>
          </div>

          ${quote.notes ? `
            <div class="notes">
              <h3>Notes</h3>
              <p>${quote.notes}</p>
            </div>
          ` : ''}
        </body>
      </html>
    `;
  }

  /**
   * Génère le CSV pour un budget
   */
  private static generateBudgetCSV(budget: Budget): string {
    const headers = ['Catégorie', 'Type', 'Montant Budgété', 'Montant Réel', 'Écart'];
    const rows = budget.categories.map(category => [
      category.name,
      category.type === 'income' ? 'Revenus' : 'Dépenses',
      category.budgetedAmount.toString(),
      category.actualAmount.toString(),
      category.variance.toString(),
    ]);

    const csvContent = [headers, ...rows]
      .map(row => row.map(cell => `"${cell}"`).join(','))
      .join('\n');

    return csvContent;
  }

  /**
   * Génère un fichier PDF à partir du HTML
   */
  private static async generatePDF(htmlContent: string, filename: string): Promise<string> {
    // Pour une vraie implémentation, vous utiliseriez une bibliothèque comme react-native-html-to-pdf
    // ou react-native-print
    const filePath = `${RNFS.DocumentDirectoryPath}/${filename}`;
    
    // Simulation - dans une vraie app, vous généreriez le PDF ici
    await RNFS.writeFile(filePath, htmlContent, 'utf8');
    
    return filePath;
  }

  /**
   * Sauvegarde un fichier
   */
  private static async saveFile(content: string, filename: string): Promise<string> {
    const filePath = `${RNFS.DocumentDirectoryPath}/${filename}`;
    await RNFS.writeFile(filePath, content, 'utf8');
    return filePath;
  }

  /**
   * Partage un fichier
   */
  private static async shareFile(filePath: string, title: string): Promise<void> {
    const shareOptions = {
      title: `Partager ${title}`,
      url: Platform.OS === 'ios' ? `file://${filePath}` : `file://${filePath}`,
      type: 'application/pdf',
    };

    await Share.open(shareOptions);
  }

  /**
   * Ajoute des graphiques au PDF (simulation)
   */
  private static async addChartsToPDF(pdfPath: string, businessPlan: BusinessPlan): Promise<void> {
    // Simulation - dans une vraie app, vous généreriez des graphiques ici
    console.log('Ajout de graphiques au PDF:', pdfPath);
  }

  /**
   * Utilitaires pour les statuts
   */
  private static getStatusText(status: string): string {
    switch (status) {
      case 'completed':
        return 'Terminé';
      case 'in_progress':
        return 'En cours';
      case 'draft':
        return 'Brouillon';
      default:
        return 'Inconnu';
    }
  }

  private static getQuoteStatusText(status: string): string {
    switch (status) {
      case 'accepted':
        return 'Accepté';
      case 'sent':
        return 'Envoyé';
      case 'draft':
        return 'Brouillon';
      case 'rejected':
        return 'Rejeté';
      default:
        return 'Inconnu';
    }
  }
}