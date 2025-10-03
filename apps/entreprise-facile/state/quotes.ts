import { create } from 'zustand';

export type QuoteLine = {
  description: string;
  quantity: number;
  unitPrice: number;
  tvaRate: number; // percentage (e.g., 20)
  discountRate: number; // percentage
};

export type Quote = {
  id: string;
  customerName: string;
  createdAt: string; // ISO
  dueAt?: string; // ISO
  status: 'draft' | 'sent' | 'accepted' | 'rejected' | 'expired';
  lines: QuoteLine[];
  subtotal: number;
  discount: number;
  tva: number;
  total: number;
};

function computeTotals(lines: QuoteLine[]) {
  const subtotal = lines.reduce((sum, l) => sum + l.quantity * l.unitPrice, 0);
  const discount = lines.reduce(
    (sum, l) => sum + (l.quantity * l.unitPrice) * (l.discountRate / 100),
    0
  );
  const afterDiscount = subtotal - discount;
  const tva = lines.reduce((sum, l) => {
    const lineBase = l.quantity * l.unitPrice;
    const lineAfterDiscount = lineBase - lineBase * (l.discountRate / 100);
    return sum + lineAfterDiscount * (l.tvaRate / 100);
  }, 0);
  const total = afterDiscount + tva;
  return { subtotal, discount, tva, total };
}

export type QuotesState = {
  quotes: Quote[];
  addQuote: (q: Omit<Quote, 'id' | 'subtotal' | 'discount' | 'tva' | 'total'>) => Quote;
  updateStatus: (id: string, status: Quote['status']) => void;
  removeQuote: (id: string) => void;
};

export const useQuotesStore = create<QuotesState>((set, get) => ({
  quotes: [],
  addQuote: (q) => {
    const id = `q_${Date.now()}`;
    const totals = computeTotals(q.lines);
    const quote: Quote = { id, ...q, ...totals };
    set({ quotes: [quote, ...get().quotes] });
    return quote;
  },
  updateStatus: (id, status) => {
    set({
      quotes: get().quotes.map((q) => (q.id === id ? { ...q, status } : q)),
    });
  },
  removeQuote: (id) => {
    set({ quotes: get().quotes.filter((q) => q.id !== id) });
  },
}));

export const QuotesSelectors = {
  computeTotals,
};
