// lib/calculators/investimentos.ts

import { CalculadoraParams, EvolucaoMensal } from '@/lib/types';

/**
 * Calcula o valor do pagamento mensal (PMT) necessário para atingir o objetivo
 * Fórmula: PMT = ((FV - PV) * r) / ((1 + r)^n - 1)
 */
export function calcularPMT(params: CalculadoraParams): number {
  const { valorInicial, valorFuturo, taxaAnual, anos } = params;
  
  const r = taxaAnual / 12; // taxa mensal
  const n = anos * 12; // número de meses
  
  // Se não houver diferença entre valor futuro e inicial
  if (valorFuturo <= valorInicial) {
    return 0;
  }
  
  const numerador = (valorFuturo - valorInicial) * r;
  const denominador = Math.pow(1 + r, n) - 1;
  
  const pmt = numerador / denominador;
  
  return pmt;
}

/**
 * Gera a tabela de evolução mensal dos investimentos
 */
export function gerarTabelaEvolucao(
  valorInicial: number,
  pmt: number,
  taxaMensal: number,
  numeroMeses: number
): EvolucaoMensal[] {
  const tabela: EvolucaoMensal[] = [];
  
  let totalInvestido = valorInicial;
  let totalJuros = 0;
  let totalAcumulado = valorInicial;
  
  // Mês 0 (inicial)
  tabela.push({
    mes: 0,
    investimentoMensal: 0,
    jurosMes: 0,
    totalInvestido: valorInicial,
    totalJuros: 0,
    totalAcumulado: valorInicial,
  });
  
  // Meses subsequentes
  for (let mes = 1; mes <= numeroMeses; mes++) {
    const jurosMes = totalAcumulado * taxaMensal;
    totalInvestido += pmt;
    totalJuros += jurosMes;
    totalAcumulado = totalInvestido + totalJuros;
    
    tabela.push({
      mes,
      investimentoMensal: pmt,
      jurosMes,
      totalInvestido,
      totalJuros,
      totalAcumulado,
    });
  }
  
  return tabela;
}

/**
 * Função wrapper que calcula tudo de uma vez
 */
export function calcularInvestimento(params: CalculadoraParams) {
  const pmt = calcularPMT(params);
  const taxaMensal = params.taxaAnual / 12;
  const numeroMeses = params.anos * 12;
  
  const evolucao = gerarTabelaEvolucao(
    params.valorInicial,
    pmt,
    taxaMensal,
    numeroMeses
  );
  
  return {
    pmt,
    evolucao,
  };
}
