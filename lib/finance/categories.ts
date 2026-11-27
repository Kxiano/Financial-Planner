import type { TranslationKey } from '@/lib/i18n/translations';
import type { Lancamento } from '@/lib/types';

export type Categoria = Lancamento['categoria'];
export type Tipo = Lancamento['tipo'];

/** The label for a category. "investimento" reads differently as money in. */
export function categoriaLabelKey(categoria: Categoria, tipo: Tipo = 'saida'): TranslationKey {
  if (categoria === 'investimento' && tipo === 'entrada') return 'retornoInvestimento';
  return CATEGORIA_LABELS[categoria] ?? 'categoria';
}

const CATEGORIA_LABELS: Record<Categoria, TranslationKey> = {
  income: 'receitaSalario',
  gasto_fixo: 'gastoFixo',
  gasto_variavel: 'gastoVariavel',
  investimento: 'investimento',
  fundo_emergencia: 'fundoEmergenciaCategoria',
  divida: 'pagamentoDivida',
};

/** Which categories each type of transaction can take, in display order. */
export const CATEGORIAS_POR_TIPO: Record<Tipo, Categoria[]> = {
  entrada: ['income', 'investimento'],
  saida: ['gasto_fixo', 'gasto_variavel', 'investimento', 'fundo_emergencia', 'divida'],
};

export const TODAS_CATEGORIAS: Categoria[] = [
  'income',
  'gasto_fixo',
  'gasto_variavel',
  'investimento',
  'fundo_emergencia',
  'divida',
];

/** "2026-03" -> "March 2026" in the given locale. */
export function formatMonth(yearMonth: string, locale: string, style: 'long' | 'short' = 'long') {
  const [year, month] = yearMonth.split('-').map(Number);
  if (!year || !month) return yearMonth;
  return new Date(year, month - 1, 1).toLocaleDateString(
    locale,
    style === 'long' ? { month: 'long', year: 'numeric' } : { month: 'short', year: '2-digit' },
  );
}

/** The current month as "YYYY-MM", in local time. */
export function currentMonth(date = new Date()) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
}
