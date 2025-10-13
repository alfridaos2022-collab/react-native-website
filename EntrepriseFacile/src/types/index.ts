// Types pour les Plans d'Affaires
export interface BusinessPlan {
  id: string;
  title: string;
  description: string;
  sector: string;
  status: 'draft' | 'in_progress' | 'completed';
  createdAt: Date;
  updatedAt: Date;
  sections: BusinessPlanSection[];
  aiAnalysis?: AIAnalysis;
}

export interface BusinessPlanSection {
  id: string;
  title: string;
  content: string;
  order: number;
  isCompleted: boolean;
  suggestions?: string[];
}

export interface AIAnalysis {
  score: number; // Score de qualité de 0 à 100
  suggestions: string[];
  strengths: string[];
  weaknesses: string[];
  lastAnalyzed: Date;
}

// Types pour les Devis
export interface Quote {
  id: string;
  quoteNumber: string;
  clientName: string;
  clientEmail: string;
  clientAddress: string;
  items: QuoteItem[];
  subtotal: number;
  taxRate: number;
  taxAmount: number;
  total: number;
  status: 'draft' | 'sent' | 'accepted' | 'rejected';
  createdAt: Date;
  validUntil: Date;
  notes?: string;
}

export interface QuoteItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

// Types pour le Budget
export interface Budget {
  id: string;
  title: string;
  period: 'monthly' | 'quarterly' | 'yearly';
  startDate: Date;
  endDate: Date;
  categories: BudgetCategory[];
  totalIncome: number;
  totalExpenses: number;
  balance: number;
  createdAt: Date;
}

export interface BudgetCategory {
  id: string;
  name: string;
  type: 'income' | 'expense';
  budgetedAmount: number;
  actualAmount: number;
  variance: number;
  items: BudgetItem[];
}

export interface BudgetItem {
  id: string;
  description: string;
  amount: number;
  date: Date;
  category: string;
}

// Types pour les Modèles
export interface BusinessPlanTemplate {
  id: string;
  name: string;
  sector: string;
  description: string;
  sections: TemplateSection[];
}

export interface TemplateSection {
  id: string;
  title: string;
  content: string;
  order: number;
  isRequired: boolean;
}

export interface QuoteTemplate {
  id: string;
  name: string;
  sector: string;
  description: string;
  defaultItems: QuoteItem[];
}

export interface BudgetTemplate {
  id: string;
  name: string;
  sector: string;
  description: string;
  categories: BudgetCategory[];
}

// Types pour les démarches administratives
export interface AdministrativeStep {
  id: string;
  title: string;
  description: string;
  category: 'creation' | 'legal' | 'fiscal' | 'social';
  priority: 'high' | 'medium' | 'low';
  estimatedTime: string;
  requiredDocuments: string[];
  links: AdministrativeLink[];
  isCompleted: boolean;
}

export interface AdministrativeLink {
  id: string;
  title: string;
  url: string;
  description: string;
}

// Types pour l'exportation
export interface ExportOptions {
  format: 'pdf' | 'docx' | 'xlsx';
  includeCharts: boolean;
  includeAnalysis: boolean;
  language: 'fr' | 'en';
}

// Types pour les notifications
export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'error' | 'success';
  createdAt: Date;
  isRead: boolean;
  actionUrl?: string;
}