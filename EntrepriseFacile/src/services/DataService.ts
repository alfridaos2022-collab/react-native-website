import AsyncStorage from '@react-native-async-storage/async-storage';
import { BusinessPlan, User, DocumentTemplate } from '../types';

/**
 * Service de gestion des données locales
 * Utilise AsyncStorage pour persister les données
 */
export class DataService {
  private static readonly KEYS = {
    USER: 'user',
    BUSINESS_PLANS: 'business_plans',
    TEMPLATES: 'templates',
    SETTINGS: 'settings',
  };

  // User Management
  static async saveUser(user: User): Promise<void> {
    try {
      await AsyncStorage.setItem(this.KEYS.USER, JSON.stringify(user));
    } catch (error) {
      console.error('Error saving user:', error);
      throw error;
    }
  }

  static async getUser(): Promise<User | null> {
    try {
      const userData = await AsyncStorage.getItem(this.KEYS.USER);
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error('Error getting user:', error);
      return null;
    }
  }

  // Business Plans Management
  static async saveBusinessPlan(businessPlan: BusinessPlan): Promise<void> {
    try {
      const existingPlans = await this.getBusinessPlans();
      const updatedPlans = existingPlans.filter(plan => plan.id !== businessPlan.id);
      updatedPlans.push(businessPlan);
      
      await AsyncStorage.setItem(
        this.KEYS.BUSINESS_PLANS, 
        JSON.stringify(updatedPlans)
      );
    } catch (error) {
      console.error('Error saving business plan:', error);
      throw error;
    }
  }

  static async getBusinessPlans(): Promise<BusinessPlan[]> {
    try {
      const plansData = await AsyncStorage.getItem(this.KEYS.BUSINESS_PLANS);
      return plansData ? JSON.parse(plansData) : [];
    } catch (error) {
      console.error('Error getting business plans:', error);
      return [];
    }
  }

  static async getBusinessPlanById(id: string): Promise<BusinessPlan | null> {
    try {
      const plans = await this.getBusinessPlans();
      return plans.find(plan => plan.id === id) || null;
    } catch (error) {
      console.error('Error getting business plan by id:', error);
      return null;
    }
  }

  static async deleteBusinessPlan(id: string): Promise<void> {
    try {
      const existingPlans = await this.getBusinessPlans();
      const updatedPlans = existingPlans.filter(plan => plan.id !== id);
      
      await AsyncStorage.setItem(
        this.KEYS.BUSINESS_PLANS, 
        JSON.stringify(updatedPlans)
      );
    } catch (error) {
      console.error('Error deleting business plan:', error);
      throw error;
    }
  }

  // Templates Management
  static async saveTemplates(templates: DocumentTemplate[]): Promise<void> {
    try {
      await AsyncStorage.setItem(this.KEYS.TEMPLATES, JSON.stringify(templates));
    } catch (error) {
      console.error('Error saving templates:', error);
      throw error;
    }
  }

  static async getTemplates(): Promise<DocumentTemplate[]> {
    try {
      const templatesData = await AsyncStorage.getItem(this.KEYS.TEMPLATES);
      return templatesData ? JSON.parse(templatesData) : [];
    } catch (error) {
      console.error('Error getting templates:', error);
      return [];
    }
  }

  // Settings Management
  static async saveSettings(settings: any): Promise<void> {
    try {
      await AsyncStorage.setItem(this.KEYS.SETTINGS, JSON.stringify(settings));
    } catch (error) {
      console.error('Error saving settings:', error);
      throw error;
    }
  }

  static async getSettings(): Promise<any> {
    try {
      const settingsData = await AsyncStorage.getItem(this.KEYS.SETTINGS);
      return settingsData ? JSON.parse(settingsData) : {};
    } catch (error) {
      console.error('Error getting settings:', error);
      return {};
    }
  }

  // Utility Methods
  static async clearAllData(): Promise<void> {
    try {
      await AsyncStorage.multiRemove([
        this.KEYS.USER,
        this.KEYS.BUSINESS_PLANS,
        this.KEYS.TEMPLATES,
        this.KEYS.SETTINGS,
      ]);
    } catch (error) {
      console.error('Error clearing all data:', error);
      throw error;
    }
  }

  static async exportData(): Promise<string> {
    try {
      const user = await this.getUser();
      const businessPlans = await this.getBusinessPlans();
      const templates = await this.getTemplates();
      const settings = await this.getSettings();

      const exportData = {
        user,
        businessPlans,
        templates,
        settings,
        exportDate: new Date().toISOString(),
        version: '1.0.0',
      };

      return JSON.stringify(exportData, null, 2);
    } catch (error) {
      console.error('Error exporting data:', error);
      throw error;
    }
  }

  static async importData(dataString: string): Promise<void> {
    try {
      const importData = JSON.parse(dataString);
      
      if (importData.user) {
        await this.saveUser(importData.user);
      }
      
      if (importData.businessPlans) {
        await AsyncStorage.setItem(
          this.KEYS.BUSINESS_PLANS, 
          JSON.stringify(importData.businessPlans)
        );
      }
      
      if (importData.templates) {
        await this.saveTemplates(importData.templates);
      }
      
      if (importData.settings) {
        await this.saveSettings(importData.settings);
      }
    } catch (error) {
      console.error('Error importing data:', error);
      throw error;
    }
  }

  // Statistics
  static async getStatistics(): Promise<{
    totalPlans: number;
    completedPlans: number;
    draftPlans: number;
    publishedPlans: number;
  }> {
    try {
      const plans = await this.getBusinessPlans();
      
      return {
        totalPlans: plans.length,
        completedPlans: plans.filter(plan => plan.status === 'completed').length,
        draftPlans: plans.filter(plan => plan.status === 'draft').length,
        publishedPlans: plans.filter(plan => plan.status === 'published').length,
      };
    } catch (error) {
      console.error('Error getting statistics:', error);
      return {
        totalPlans: 0,
        completedPlans: 0,
        draftPlans: 0,
        publishedPlans: 0,
      };
    }
  }
}