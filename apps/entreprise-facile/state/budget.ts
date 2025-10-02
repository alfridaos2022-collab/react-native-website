import { create } from 'zustand';

export type Transaction = {
  id: string;
  type: 'income' | 'expense';
  category: string;
  label: string;
  amount: number; // positive
  date: string; // ISO
};

export type BudgetState = {
  transactions: Transaction[];
  addTransaction: (t: Omit<Transaction, 'id'>) => Transaction;
  removeTransaction: (id: string) => void;
};

export const useBudgetStore = create<BudgetState>((set, get) => ({
  transactions: [],
  addTransaction: (t) => {
    const id = `t_${Date.now()}`;
    const tx: Transaction = { id, ...t };
    set({ transactions: [tx, ...get().transactions] });
    return tx;
  },
  removeTransaction: (id) => {
    set({ transactions: get().transactions.filter((t) => t.id !== id) });
  },
}));

export const BudgetSelectors = {
  summary(transactions: Transaction[]) {
    const income = transactions.filter((t) => t.type === 'income').reduce((s, t) => s + t.amount, 0);
    const expense = transactions.filter((t) => t.type === 'expense').reduce((s, t) => s + t.amount, 0);
    const balance = income - expense;
    return { income, expense, balance };
  },
};
