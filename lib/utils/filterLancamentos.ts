import { currentMonth } from '@/lib/finance/categories';
import { Lancamento } from '@/lib/types';

export type Period = 'all' | 'current' | 'last' | 'last3' | 'last6' | 'year' | 'custom';

/** "YYYY-MM" for the month `offset` months before today's. */
function monthsAgo(offset: number) {
  const now = new Date();
  return currentMonth(new Date(now.getFullYear(), now.getMonth() - offset, 1));
}

/** Keeps the transactions that fall in the chosen period. */
export function filterByPeriod(lancamentos: Lancamento[], period: Period, customMonth?: string): Lancamento[] {
  switch (period) {
    case 'current':
      return lancamentos.filter((l) => l.data === monthsAgo(0));
    case 'last':
      return lancamentos.filter((l) => l.data === monthsAgo(1));
    case 'last3':
      return lancamentos.filter((l) => l.data >= monthsAgo(2));
    case 'last6':
      return lancamentos.filter((l) => l.data >= monthsAgo(5));
    case 'year':
      return lancamentos.filter((l) => l.data.startsWith(String(new Date().getFullYear())));
    case 'custom':
      return customMonth ? lancamentos.filter((l) => l.data === customMonth) : lancamentos;
    default:
      return lancamentos;
  }
}
