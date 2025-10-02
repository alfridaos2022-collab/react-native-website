// Navigation Types
export type RootStackParamList = {
  Main: undefined;
  BusinessPlan: undefined;
  BusinessPlanEditor: { planId?: string };
  Quote: undefined;
  QuoteEditor: { quoteId?: string };
  Budget: undefined;
  BudgetEditor: { budgetId?: string };
  Administrative: undefined;
  Profile: undefined;
  Settings: undefined;
};

export type BottomTabParamList = {
  Home: undefined;
  BusinessPlan: undefined;
  Quote: undefined;
  Budget: undefined;
  Administrative: undefined;
};

// Business Plan Types
export interface BusinessPlan {
  id: string;
  title: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  template: BusinessPlanTemplate;
  sections: BusinessPlanSection[];
  status: 'draft' | 'completed' | 'reviewed';
}

export interface BusinessPlanTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  sections: BusinessPlanSectionTemplate[];
}

export interface BusinessPlanSection {
  id: string;
  templateSectionId: string;
  title: string;
  content: string;
  order: number;
  completed: boolean;
}

export interface BusinessPlanSectionTemplate {
  id: string;
  title: string;
  description: string;
  placeholder: string;
  order: number;
  required: boolean;
  tips: string[];
}

// Quote Types
export interface Quote {
  id: string;
  number: string;
  clientName: string;
  clientEmail: string;
  clientAddress: string;
  createdAt: Date;
  validUntil: Date;
  items: QuoteItem[];
  subtotal: number;
  taxRate: number;
  taxAmount: number;
  total: number;
  status: 'draft' | 'sent' | 'accepted' | 'rejected' | 'expired';
  notes?: string;
}

export interface QuoteItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

// Budget Types
export interface Budget {
  id: string;
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  categories: BudgetCategory[];
  totalIncome: number;
  totalExpenses: number;
  balance: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface BudgetCategory {
  id: string;
  name: string;
  type: 'income' | 'expense';
  budgetedAmount: number;
  actualAmount: number;
  transactions: BudgetTransaction[];
}

export interface BudgetTransaction {
  id: string;
  description: string;
  amount: number;
  date: Date;
  categoryId: string;
  type: 'income' | 'expense';
}

// Administrative Types
export interface AdministrativeStep {
  id: string;
  title: string;
  description: string;
  category: string;
  order: number;
  required: boolean;
  completed: boolean;
  documents: Document[];
  links: ExternalLink[];
}

export interface Document {
  id: string;
  name: string;
  description: string;
  template?: string;
  required: boolean;
}

export interface ExternalLink {
  id: string;
  title: string;
  url: string;
  description: string;
}

// User Types
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  company?: string;
  phone?: string;
  address?: string;
  createdAt: Date;
}

// Common Types
export interface SelectOption {
  label: string;
  value: string;
}

export interface ChartData {
  label: string;
  value: number;
  color?: string;
}