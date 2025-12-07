// lib/services/exchangeRate.ts

import { Currency, ExchangeRates } from '../types';

const CACHE_KEY = 'exchange_rates';
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

export class ExchangeRateService {
  private static instance: ExchangeRateService;
  private appId: string;

  private constructor() {
    this.appId = process.env.NEXT_PUBLIC_OPEN_EXCHANGE_RATES_APP_ID || '';
  }

  static getInstance(): ExchangeRateService {
    if (!ExchangeRateService.instance) {
      ExchangeRateService.instance = new ExchangeRateService();
    }
    return ExchangeRateService.instance;
  }

  /**
   * Get cached exchange rates from localStorage
   */
  private getCachedRates(): ExchangeRates | null {
    if (typeof window === 'undefined') return null;

    try {
      const cached = localStorage.getItem(CACHE_KEY);
      if (!cached) return null;

      const data: ExchangeRates = JSON.parse(cached);
      const now = Date.now();

      // Check if cache is still valid
      if (now - data.timestamp < CACHE_DURATION) {
        return data;
      }

      // Cache expired
      localStorage.removeItem(CACHE_KEY);
      return null;
    } catch (error) {
      console.error('Error reading cached exchange rates:', error);
      return null;
    }
  }

  /**
   * Save exchange rates to localStorage
   */
  private cacheRates(rates: ExchangeRates): void {
    if (typeof window === 'undefined') return;

    try {
      localStorage.setItem(CACHE_KEY, JSON.stringify(rates));
    } catch (error) {
      console.error('Error caching exchange rates:', error);
    }
  }

  /**
   * Fetch latest exchange rates from Open Exchange Rates API
   */
  async fetchRates(base: Currency = 'USD'): Promise<ExchangeRates> {
    // Check if API key is configured
    if (!this.appId) {
      console.warn('Exchange rates API key not configured, using default rates');
      return this.getDefaultRates(base);
    }

    try {
      // Note: Free plan only supports USD as base currency
      const response = await fetch(
        `https://openexchangerates.org/api/latest.json?app_id=${this.appId}`
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.warn(`API error: ${response.status} ${response.statusText}`, errorText);
        throw new Error(`API error: ${response.statusText}`);
      }

      const data = await response.json();

      const exchangeRates: ExchangeRates = {
        base: 'USD', // Free API only supports USD as base
        rates: {
          BRL: data.rates.BRL || 1,
          USD: data.rates.USD || 1,
          EUR: data.rates.EUR || 1,
          GBP: data.rates.GBP || 1,
          HUF: data.rates.HUF || 1,
        },
        timestamp: Date.now(),
      };

      this.cacheRates(exchangeRates);
      return exchangeRates;
    } catch (error) {
      console.warn('Error fetching exchange rates, using fallback:', error);

      // Try to return cached rates even if expired
      const cached = this.getCachedRates();
      if (cached) {
        console.info('Using cached rates due to API error');
        return cached;
      }

      // Return default rates if all else fails
      console.info('Using default exchange rates');
      return this.getDefaultRates(base);
    }
  }

  /**
   * Get exchange rates (from cache or API)
   */
  async getRates(): Promise<ExchangeRates> {
    // Try cache first
    const cached = this.getCachedRates();
    if (cached && cached.base === 'USD') {
      return cached;
    }

    // Fetch fresh rates (always USD base for free API)
    return this.fetchRates('USD');
  }

  /**
   * Convert amount from one currency to another
   */
  async convert(
    amount: number,
    from: Currency,
    to: Currency
  ): Promise<number> {
    if (from === to) return amount;

    const rates = await this.getRates();

    // Convert to USD first, then to target currency
    const amountInUSD = amount / rates.rates[from];
    const convertedAmount = amountInUSD * rates.rates[to];

    return convertedAmount;
  }

  /**
   * Get default/fallback exchange rates
   */
  private getDefaultRates(base: Currency): ExchangeRates {
    // These are approximate rates as fallback
    const defaultRates: Record<Currency, Record<Currency, number>> = {
      USD: { BRL: 5.0, USD: 1, EUR: 0.92, GBP: 0.79, HUF: 350 },
      BRL: { BRL: 1, USD: 0.20, EUR: 0.18, GBP: 0.16, HUF: 70 },
      EUR: { BRL: 5.5, USD: 1.09, EUR: 1, GBP: 0.86, HUF: 380 },
      GBP: { BRL: 6.3, USD: 1.27, EUR: 1.16, GBP: 1, HUF: 445 },
      HUF: { BRL: 0.014, USD: 0.0029, EUR: 0.0026, GBP: 0.0022, HUF: 1 },
    };

    return {
      base,
      rates: defaultRates[base],
      timestamp: Date.now(),
    };
  }

  /**
   * Format currency value with proper symbol and locale
   */
  formatCurrency(
    amount: number,
    currency: Currency,
    locale: string = 'pt-BR'
  ): string {
    const currencyMap: Record<Currency, string> = {
      BRL: 'pt-BR',
      USD: 'en-US',
      EUR: 'de-DE',
      GBP: 'en-GB',
      HUF: 'hu-HU',
    };

    const formatLocale = currencyMap[currency] || locale;

    return new Intl.NumberFormat(formatLocale, {
      style: 'currency',
      currency,
    }).format(amount);
  }
}

export const exchangeRateService = ExchangeRateService.getInstance();
