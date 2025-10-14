// lib/utils/processLancamentos.ts

import { Lancamento, DashboardData, DadosMensais } from '@/lib/types';

/**
 * Processa lançamentos e calcula métricas do dashboard
 */
export function calcularMetricasDashboard(lancamentos: Lancamento[]): DashboardData {
  // Pegar último mês com dados
  const ultimoMes = lancamentos.length > 0 
    ? lancamentos.reduce((max, l) => l.data > max ? l.data : max, lancamentos[0].data)
    : new Date().toISOString().slice(0, 7);

  // Filtrar lançamentos do último mês
  const lancamentosUltimoMes = lancamentos.filter(l => l.data === ultimoMes);

  // Calcular income do último mês
  const incomeTotal = lancamentosUltimoMes
    .filter(l => l.tipo === 'entrada' && l.categoria === 'income')
    .reduce((sum, l) => sum + l.valor, 0);

  // Calcular gastos fixos do último mês
  const gastosFixos = lancamentosUltimoMes
    .filter(l => l.tipo === 'saida' && l.categoria === 'gasto_fixo')
    .reduce((sum, l) => sum + l.valor, 0);

  // Calcular gastos variáveis do último mês
  const gastosVariaveis = lancamentosUltimoMes
    .filter(l => l.tipo === 'saida' && l.categoria === 'gasto_variavel')
    .reduce((sum, l) => sum + l.valor, 0);

  // Calcular rendimentos (entradas de investimento) do último mês
  const rendimentos = lancamentosUltimoMes
    .filter(l => l.tipo === 'entrada' && l.categoria === 'investimento')
    .reduce((sum, l) => sum + l.valor, 0);

  // Calcular fundo de emergência (TOTAL ACUMULADO de TODOS os meses)
  const fundoEmergencia = lancamentos
    .filter(l => l.tipo === 'saida' && l.categoria === 'fundo_emergencia')
    .reduce((sum, l) => sum + l.valor, 0);

  // Calcular dívidas (saldo total acumulado)
  const dividas = lancamentos
    .filter(l => l.categoria === 'divida')
    .reduce((sum, l) => {
      return l.tipo === 'saida' ? sum - l.valor : sum + l.valor;
    }, 0);

  // Calcular total investido (APENAS investimentos, SEM fundo de emergência)
  const totalInvestimentos = lancamentos
    .filter(l => l.tipo === 'saida' && l.categoria === 'investimento')
    .reduce((sum, l) => sum + l.valor, 0);

  // Calcular total de rendimentos acumulados
  const totalRendimentos = lancamentos
    .filter(l => l.tipo === 'entrada' && l.categoria === 'investimento')
    .reduce((sum, l) => sum + l.valor, 0);

  // Patrimônio total = investimentos + rendimentos + fundo emergência - dívidas
  const patrimonioTotal = totalInvestimentos + totalRendimentos + fundoEmergencia - Math.abs(dividas);

  // Sobra mensal
  const totalEntradas = lancamentosUltimoMes
    .filter(l => l.tipo === 'entrada')
    .reduce((sum, l) => sum + l.valor, 0);

  const totalSaidas = lancamentosUltimoMes
    .filter(l => l.tipo === 'saida')
    .reduce((sum, l) => sum + l.valor, 0);

  const sobraMensal = totalEntradas - totalSaidas;

  return {
    patrimonioTotal,
    fundoEmergencia,
    dividas: Math.abs(dividas),
    gastosFixos,
    gastosVariaveis,
    incomeTotal,
    rendimentos,
    sobraMensal,
  };
}

/**
 * Agrupa lançamentos por mês e calcula totais
 */
export function calcularHistoricoMensal(lancamentos: Lancamento[]): DadosMensais[] {
  // Agrupar por mês
  const porMes = lancamentos.reduce((acc, lancamento) => {
    if (!acc[lancamento.data]) {
      acc[lancamento.data] = [];
    }
    acc[lancamento.data].push(lancamento);
    return acc;
  }, {} as Record<string, Lancamento[]>);

  // Calcular totais por mês
  const historico = Object.entries(porMes).map(([mes, lancs]) => {
    const income = lancs
      .filter(l => l.tipo === 'entrada' && l.categoria === 'income')
      .reduce((sum, l) => sum + l.valor, 0);

    const gastos = lancs
      .filter(l => l.tipo === 'saida' && (l.categoria === 'gasto_fixo' || l.categoria === 'gasto_variavel'))
      .reduce((sum, l) => sum + l.valor, 0);

    const investimentos = lancs
      .filter(l => l.tipo === 'saida' && l.categoria === 'investimento')
      .reduce((sum, l) => sum + l.valor, 0);

    const rendimentos = lancs
      .filter(l => l.tipo === 'entrada' && l.categoria === 'investimento')
      .reduce((sum, l) => sum + l.valor, 0);

    return {
      mes,
      income,
      gastos,
      investimentos,
      rendimentos,
      patrimonio: 0, // Será calculado acumuladamente
    };
  });

  // Ordenar por mês
  historico.sort((a, b) => a.mes.localeCompare(b.mes));

  // Calcular patrimônio acumulado
  let patrimonioAcumulado = 0;
  historico.forEach(item => {
    patrimonioAcumulado += item.investimentos + item.rendimentos;
    item.patrimonio = patrimonioAcumulado;
  });

  return historico;
}

/**
 * Calcula tendência percentual entre dois valores
 */
export function calcularTendencia(valorAtual: number, valorAnterior: number): { value: number; isPositive: boolean } {
  if (valorAnterior === 0) {
    return { value: 0, isPositive: true };
  }

  const percentual = ((valorAtual - valorAnterior) / valorAnterior) * 100;
  
  return {
    value: Math.abs(Math.round(percentual * 10) / 10),
    isPositive: percentual >= 0,
  };
}
