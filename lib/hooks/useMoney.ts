'use client';

import { useCallback, useMemo } from 'react';
import { useLanguage } from '@/lib/i18n/LanguageProvider';
import { useCurrencyStore } from '@/lib/store/currencyStore';
import type { Currency, Lancamento } from '@/lib/types';

interface FormatOptions {
  /** 12.4K instead of 12,400.00: for chart axes and tight spaces. */
  compact?: boolean;
  /** Always show + or -. */
  signed?: boolean;
  /** Drop the cents. */
  whole?: boolean;
}

/**
 * Everything a screen needs to show money in the currency the user picked:
 * conversion from the currency a transaction was logged in, and formatting
 * in the user's language.
 */
export function useMoney() {
  const { locale } = useLanguage();
  const currency = useCurrencyStore((state) => state.currency);
  const exchangeRates = useCurrencyStore((state) => state.exchangeRates);

  const convert = useCallback(
    (amount: number, from: Currency = 'BRL') => {
      if (from === currency) return amount;
      const rateFrom = exchangeRates?.rates?.[from];
      const rateTo = exchangeRates?.rates?.[currency];
      if (!rateFrom || !rateTo) return amount;
      return (amount / rateFrom) * rateTo;
    },
    [currency, exchangeRates],
  );

  const format = useCallback(
    (amount: number, { compact = false, signed = false, whole = false }: FormatOptions = {}) =>
      new Intl.NumberFormat(locale, {
        style: 'currency',
        currency,
        notation: compact ? 'compact' : 'standard',
        maximumFractionDigits: compact ? 1 : whole ? 0 : 2,
        minimumFractionDigits: compact || whole ? 0 : 2,
        signDisplay: signed ? 'exceptZero' : 'auto',
      }).format(amount),
    [locale, currency],
  );

  /** Transactions with `valor` already in the display currency. */
  const convertAll = useCallback(
    (transactions: Lancamento[]) => transactions.map((l) => ({ ...l, valor: convert(l.valor, l.currency || 'BRL') })),
    [convert],
  );

  return useMemo(() => ({ currency, convert, convertAll, format }), [currency, convert, convertAll, format]);
}
