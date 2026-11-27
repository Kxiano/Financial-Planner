import type { Categoria } from '@/lib/finance/categories';
import { DadosMensais, DashboardData, Lancamento } from '@/lib/types';

type Filtro = (l: Lancamento) => boolean;

const soma = (lancamentos: Lancamento[], filtro: Filtro) =>
  lancamentos.reduce((total, l) => (filtro(l) ? total + l.valor : total), 0);

const entrada = (categoria?: Categoria): Filtro => (l) =>
  l.tipo === 'entrada' && (!categoria || l.categoria === categoria);

const saida = (categoria?: Categoria): Filtro => (l) =>
  l.tipo === 'saida' && (!categoria || l.categoria === categoria);

/** Net worth = money invested + returns + emergency fund - debts. */
function patrimonio(lancamentos: Lancamento[]) {
  return (
    soma(lancamentos, saida('investimento')) +
    soma(lancamentos, entrada('investimento')) +
    soma(lancamentos, saida('fundo_emergencia')) -
    saldoDividas(lancamentos)
  );
}

function saldoDividas(lancamentos: Lancamento[]) {
  return Math.abs(soma(lancamentos, entrada('divida')) - soma(lancamentos, saida('divida')));
}

/** The most recent month that has any transaction, as "YYYY-MM". */
export function ultimoMesComDados(lancamentos: Lancamento[]) {
  return lancamentos.reduce((max, l) => (l.data > max ? l.data : max), lancamentos[0]?.data ?? '');
}

/**
 * Headline numbers for the dashboard. Monthly figures come from the most
 * recent month with data; the emergency fund, debts and net worth are
 * running totals over everything.
 */
export function calcularMetricasDashboard(lancamentos: Lancamento[]): DashboardData {
  const ultimoMes = ultimoMesComDados(lancamentos);
  const doMes = lancamentos.filter((l) => l.data === ultimoMes);

  return {
    patrimonioTotal: patrimonio(lancamentos),
    fundoEmergencia: soma(lancamentos, saida('fundo_emergencia')),
    dividas: saldoDividas(lancamentos),
    gastosFixos: soma(doMes, saida('gasto_fixo')),
    gastosVariaveis: soma(doMes, saida('gasto_variavel')),
    incomeTotal: soma(doMes, entrada('income')),
    rendimentos: soma(doMes, entrada('investimento')),
    sobraMensal: soma(doMes, entrada()) - soma(doMes, saida()),
  };
}

/**
 * One row per month with data, oldest first. `patrimonio` is the running
 * net worth at the end of that month, so the last row matches the
 * dashboard's headline figure.
 */
export function calcularHistoricoMensal(lancamentos: Lancamento[]): DadosMensais[] {
  const meses = [...new Set(lancamentos.map((l) => l.data))].sort();

  return meses.map((mes) => {
    const doMes = lancamentos.filter((l) => l.data === mes);
    const ateOMes = lancamentos.filter((l) => l.data <= mes);

    return {
      mes,
      income: soma(doMes, entrada('income')),
      gastos: soma(doMes, saida('gasto_fixo')) + soma(doMes, saida('gasto_variavel')),
      investimentos: soma(doMes, saida('investimento')),
      rendimentos: soma(doMes, entrada('investimento')),
      patrimonio: patrimonio(ateOMes),
    };
  });
}

/** Money out per category, largest first. Empty categories are left out. */
export function calcularSaidasPorCategoria(lancamentos: Lancamento[]) {
  const totais = new Map<Categoria, number>();
  for (const l of lancamentos) {
    if (l.tipo !== 'saida') continue;
    totais.set(l.categoria, (totais.get(l.categoria) ?? 0) + l.valor);
  }
  return [...totais.entries()]
    .map(([categoria, valor]) => ({ categoria, valor }))
    .sort((a, b) => b.valor - a.valor);
}

/** Totals in, out and the difference. */
export function calcularTotais(lancamentos: Lancamento[]) {
  const totalEntradas = soma(lancamentos, entrada());
  const totalSaidas = soma(lancamentos, saida());
  return { totalEntradas, totalSaidas, saldo: totalEntradas - totalSaidas };
}

/** Percentage change between two values, rounded to one decimal. */
export function calcularTendencia(valorAtual: number, valorAnterior: number): { value: number; isPositive: boolean } {
  if (valorAnterior === 0) {
    return { value: 0, isPositive: true };
  }
  const percentual = ((valorAtual - valorAnterior) / Math.abs(valorAnterior)) * 100;
  return {
    value: Math.abs(Math.round(percentual * 10) / 10),
    isPositive: percentual >= 0,
  };
}
