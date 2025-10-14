// lib/data/mockData.ts

import { DashboardData, DadosMensais } from '@/lib/types';

export const dashboardDataMock: DashboardData = {
  patrimonioTotal: 150000,
  fundoEmergencia: 30000,
  dividas: 5000,
  gastosFixos: 4000,
  gastosVariaveis: 2000,
  incomeTotal: 10000,
  rendimentos: 1200,
  sobraMensal: 2800,
};

export const historicoMensalMock: DadosMensais[] = [
  { mes: '2025-04', income: 9500, gastos: 5800, investimentos: 2500, rendimentos: 1000, patrimonio: 135000 },
  { mes: '2025-05', income: 10000, gastos: 6000, investimentos: 2700, rendimentos: 1050, patrimonio: 140000 },
  { mes: '2025-06', income: 10200, gastos: 5900, investimentos: 2800, rendimentos: 1100, patrimonio: 145000 },
  { mes: '2025-07', income: 10000, gastos: 6200, investimentos: 2500, rendimentos: 1150, patrimonio: 148000 },
  { mes: '2025-08', income: 10500, gastos: 6100, investimentos: 2900, rendimentos: 1180, patrimonio: 150000 },
];
