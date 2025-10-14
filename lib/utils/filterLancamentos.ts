// lib/utils/filterLancamentos.ts

import { Lancamento } from '@/lib/types';

export function filterByPeriod(
  lancamentos: Lancamento[], 
  period: string,
  customMonth?: string
): Lancamento[] {
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth();

  switch (period) {
    case 'current':
      // Mês atual
      const currentMonthStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}`;
      return lancamentos.filter(l => l.data === currentMonthStr);

    case 'last':
      // Mês passado
      const lastMonth = new Date(now);
      lastMonth.setMonth(currentMonth - 1);
      const lastMonthStr = `${lastMonth.getFullYear()}-${String(lastMonth.getMonth() + 1).padStart(2, '0')}`;
      return lancamentos.filter(l => l.data === lastMonthStr);

    case 'last3':
      // Últimos 3 meses
      const threeMonthsAgo = new Date(now);
      threeMonthsAgo.setMonth(currentMonth - 2);
      const threeMonthsStr = `${threeMonthsAgo.getFullYear()}-${String(threeMonthsAgo.getMonth() + 1).padStart(2, '0')}`;
      return lancamentos.filter(l => l.data >= threeMonthsStr);

    case 'last6':
      // Últimos 6 meses
      const sixMonthsAgo = new Date(now);
      sixMonthsAgo.setMonth(currentMonth - 5);
      const sixMonthsStr = `${sixMonthsAgo.getFullYear()}-${String(sixMonthsAgo.getMonth() + 1).padStart(2, '0')}`;
      return lancamentos.filter(l => l.data >= sixMonthsStr);

    case 'year':
      // Este ano
      const yearStr = `${currentYear}`;
      return lancamentos.filter(l => l.data.startsWith(yearStr));

    case 'custom':
      // Mês específico selecionado pelo usuário
      if (!customMonth) return lancamentos;
      return lancamentos.filter(l => l.data === customMonth);

    case 'all':
    default:
      return lancamentos;
  }
}
