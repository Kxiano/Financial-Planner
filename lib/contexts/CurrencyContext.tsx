// lib/contexts/CurrencyContext.tsx

'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Currency, ExchangeRates } from '../types';
import { exchangeRateService } from '../services/exchangeRate';

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  exchangeRates: ExchangeRates | null;
  loading: boolean;
  error: string | null;
  convert: (amount: number, from: Currency, to?: Currency) => number;
  formatCurrency: (amount: number, currencyCode?: Currency) => string;
  refreshRates: () => Promise<void>;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrencyState] = useState<Currency>('BRL');
  const [exchangeRates, setExchangeRates] = useState<ExchangeRates | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load currency preference from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('preferred_currency');
      if (saved && ['BRL', 'USD', 'EUR', 'GBP', 'HUF'].includes(saved)) {
        setCurrencyState(saved as Currency);
      }
    }
  }, []);

  // Fetch exchange rates on mount and when currency changes
  useEffect(() => {
    loadExchangeRates();
  }, []);

  const loadExchangeRates = async () => {
    try {
      setLoading(true);
      setError(null);
      const rates = await exchangeRateService.getRates();
      setExchangeRates(rates);
    } catch (err) {
      setError('Failed to load exchange rates');
      console.error('Error loading exchange rates:', err);
    } finally {
      setLoading(false);
    }
  };

  const setCurrency = (newCurrency: Currency) => {
    setCurrencyState(newCurrency);
    if (typeof window !== 'undefined') {
      localStorage.setItem('preferred_currency', newCurrency);
    }
  };

  const convert = (amount: number, from: Currency, to?: Currency): number => {
    const targetCurrency = to || currency;
    
    if (from === targetCurrency) return amount;
    if (!exchangeRates) return amount;

    try {
      // Convert to USD first, then to target currency
      const amountInUSD = amount / exchangeRates.rates[from];
      const convertedAmount = amountInUSD * exchangeRates.rates[targetCurrency];
      return convertedAmount;
    } catch (err) {
      console.error('Error converting currency:', err);
      return amount;
    }
  };

  const formatCurrency = (amount: number, currencyCode?: Currency): string => {
    const targetCurrency = currencyCode || currency;
    
    // Get locale from language preference
    const locale = typeof window !== 'undefined' 
      ? localStorage.getItem('language') || 'pt-BR'
      : 'pt-BR';

    return exchangeRateService.formatCurrency(amount, targetCurrency, locale);
  };

  const refreshRates = async () => {
    await loadExchangeRates();
  };

  return (
    <CurrencyContext.Provider
      value={{
        currency,
        setCurrency,
        exchangeRates,
        loading,
        error,
        convert,
        formatCurrency,
        refreshRates,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
}
