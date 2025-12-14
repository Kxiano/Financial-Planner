
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Currency, ExchangeRates } from '../types';
import { exchangeRateService } from '../services/exchangeRate';

interface CurrencyState {
  currency: Currency;
  exchangeRates: ExchangeRates | null;
  lastFetchTimestamp: number;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  setCurrency: (currency: Currency) => void;
  fetchRates: () => Promise<void>;
  
  // Helpers
  convertValue: (amount: number, fromCurrency?: Currency) => number;
  formatValue: (amount: number, currencyCode?: Currency) => string;
}

const CACHE_DURATION = 60 * 60 * 1000; // 60 minutes

export const useCurrencyStore = create<CurrencyState>()(
  persist(
    (set, get) => ({
      currency: 'BRL',
      exchangeRates: null,
      lastFetchTimestamp: 0,
      isLoading: false,
      error: null,

      setCurrency: (currency) => set({ currency }),

      fetchRates: async () => {
        const { lastFetchTimestamp, exchangeRates, isLoading } = get();
        const now = Date.now();

        // Check if we need to fetch (cache expired or no rates)
        // If we have rates and they are less than 60 mins old, don't fetch
        if (exchangeRates && (now - lastFetchTimestamp < CACHE_DURATION)) {
            return;
        }

        if (isLoading) return;

        set({ isLoading: true, error: null });

        try {
          // Use the service to fetch rates (it has its own cache but we enforce our check here)
          // We force a fetch from the service, effectively dealing with the service's internal logic
          const rates = await exchangeRateService.fetchRates('USD'); // API base is USD
          
          set({ 
            exchangeRates: rates, 
            lastFetchTimestamp: now,
            isLoading: false 
          });
        } catch (error) {
          console.error('Failed to fetch rates:', error);
          set({ 
            error: 'Failed to update exchange rates', 
            isLoading: false 
            // We keep old rates if fetch fails
          });
        }
      },

      convertValue: (amount: number, fromCurrency = 'BRL') => {
        const { currency: targetCurrency, exchangeRates } = get();

        if (fromCurrency === targetCurrency) return amount;
        if (!exchangeRates || !exchangeRates.rates) return amount;

        // Convert to USD first (Base), then to Target
        // Rate: 1 USD = X Currency
        // To get USD: Amount / Rate(From)
        // To get Target: USD * Rate(Target)
        
        try {
          const rateFrom = exchangeRates.rates[fromCurrency];
          const rateTo = exchangeRates.rates[targetCurrency];

          if (!rateFrom || !rateTo) return amount;

          const amountInUSD = amount / rateFrom;
          return amountInUSD * rateTo;
        } catch (err) {
            console.error(err);
            return amount;
        }
      },

      formatValue: (amount: number, currencyCode?: Currency) => {
        const { currency } = get();
        const targetCurrency = currencyCode || currency;
        
        return exchangeRateService.formatCurrency(amount, targetCurrency);
      },
    }),
    {
      name: 'currency-storage',
      partialize: (state) => ({ 
        currency: state.currency, 
        exchangeRates: state.exchangeRates,
        lastFetchTimestamp: state.lastFetchTimestamp
      }),
    }
  )
);
