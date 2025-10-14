// lib/types/index.ts

// Tipo para lançamentos mensais
export interface Lancamento {
  id: string;
  data: string; // formato YYYY-MM
  tipo: 'entrada' | 'saida';
  categoria: 'income' | 'gasto_fixo' | 'gasto_variavel' | 'investimento' | 'divida' | 'fundo_emergencia';
  descricao: string;
  valor: number;
}

// Tipo para dados do dashboard
export interface DashboardData {
  patrimonioTotal: number;
  fundoEmergencia: number;
  dividas: number;
  gastosFixos: number;
  gastosVariaveis: number;
  incomeTotal: number;
  rendimentos: number;
  sobraMensal: number;
}

// Tipo para dados mensais (histórico)
export interface DadosMensais {
  mes: string; // formato YYYY-MM
  income: number;
  gastos: number;
  investimentos: number;
  rendimentos: number;
  patrimonio: number;
}

// Tipo para a calculadora de investimentos
export interface CalculadoraParams {
  valorInicial: number; // PV
  valorFuturo: number; // FV
  taxaAnual: number; // taxa de juros anual (ex: 0.06 para 6%)
  anos: number;
}

// Tipo para resultado da evolução mensal
export interface EvolucaoMensal {
  mes: number;
  investimentoMensal: number;
  jurosMes: number;
  totalInvestido: number;
  totalJuros: number;
  totalAcumulado: number;
}
