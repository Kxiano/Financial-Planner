// lib/types/index.ts

// Supported currencies
export type Currency = 'BRL' | 'USD' | 'EUR' | 'GBP' | 'HUF';

export const currencies: { code: Currency; name: string; symbol: string; flag: string }[] = [
  { code: 'BRL', name: 'Real Brasileiro', symbol: 'R$', flag: '🇧🇷' },
  { code: 'USD', name: 'US Dollar', symbol: '$', flag: '🇺🇸' },
  { code: 'EUR', name: 'Euro', symbol: '€', flag: '🇪🇺' },
  { code: 'GBP', name: 'British Pound', symbol: '£', flag: '🇬🇧' },
  { code: 'HUF', name: 'Hungarian Forint', symbol: 'Ft', flag: '🇭🇺' },
];

// Exchange rate data
export interface ExchangeRates {
  base: Currency;
  rates: Record<Currency, number>;
  timestamp: number;
}

// Tipo para lançamentos mensais
export interface Lancamento {
  id: string;
  userId?: string;
  createdAt?: string;
  updatedAt?: string;
  data: string; // formato YYYY-MM
  tipo: 'entrada' | 'saida';
  categoria: 'income' | 'gasto_fixo' | 'gasto_variavel' | 'investimento' | 'divida' | 'fundo_emergencia';
  descricao: string;
  valor: number;
  currency?: Currency; // moeda do lançamento
  exchangeRate?: number; // taxa de câmbio no momento do lançamento
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

// User types
export interface User {
  id: string;
  auth0Id?: string;
  email?: string;
  name?: string;
  picture?: string;
  isGuest: boolean;
  currency: Currency;
}
