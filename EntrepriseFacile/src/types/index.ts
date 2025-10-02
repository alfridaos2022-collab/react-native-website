// Core types for Entreprise Facile application

export interface User {
  id: string;
  email: string;
  name: string;
  subscriptionType: 'free' | 'premium';
  createdAt: Date;
  lastLogin: Date;
}

export interface BusinessPlan {
  id: string;
  userId: string;
  title: string;
  industry: string;
  businessType: BusinessType;
  status: 'draft' | 'completed' | 'published';
  createdAt: Date;
  updatedAt: Date;
  sections: BusinessPlanSection[];
}

export interface BusinessPlanSection {
  id: string;
  title: string;
  content: string;
  order: number;
  isCompleted: boolean;
  templateId: string;
}

export interface DocumentTemplate {
  id: string;
  name: string;
  description: string;
  category: DocumentCategory;
  isPremium: boolean;
  sections: TemplateSection[];
  industry?: string;
}

export interface TemplateSection {
  id: string;
  title: string;
  content: string;
  order: number;
  isRequired: boolean;
  placeholder?: string;
}

export interface FinancialProjection {
  id: string;
  businessPlanId: string;
  year: number;
  revenue: number;
  expenses: number;
  profit: number;
  cashFlow: number;
}

export interface SupportTicket {
  id: string;
  userId: string;
  subject: string;
  message: string;
  status: 'open' | 'in_progress' | 'resolved';
  priority: 'low' | 'medium' | 'high';
  createdAt: Date;
  updatedAt: Date;
}

export type BusinessType = 
  | 'startup'
  | 'sme'
  | 'freelance'
  | 'ecommerce'
  | 'restaurant'
  | 'consulting'
  | 'technology'
  | 'retail'
  | 'manufacturing'
  | 'services';

export type DocumentCategory = 
  | 'business_plan'
  | 'financial_projection'
  | 'marketing_plan'
  | 'operational_plan'
  | 'legal_documents'
  | 'presentation';

export interface AIAnalysis {
  id: string;
  businessPlanId: string;
  score: number;
  suggestions: string[];
  strengths: string[];
  weaknesses: string[];
  recommendations: string[];
  createdAt: Date;
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  currency: string;
  features: string[];
  isPopular: boolean;
  maxDocuments: number;
  hasAIAnalysis: boolean;
  hasPrioritySupport: boolean;
}