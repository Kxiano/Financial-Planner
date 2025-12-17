// app/dashboard/page.tsx

'use client';

import { MetricCard } from '@/components/metrics/MetricCard';
import { LineChartComponent } from '@/components/charts/LineChartComponent';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  TrendingUp,
  Wallet,
  PiggyBank,
  CreditCard,
  DollarSign,
  ShoppingCart,
  BarChart3,
  Calendar,
} from 'lucide-react';
// import { useLocalStorage } from '@/lib/hooks/useLocalStorage'; // Removed
import { useTransactions } from '@/lib/contexts/TransactionContext'; // Added
// import { Lancamento } from '@/lib/types';
import { calcularMetricasDashboard, calcularHistoricoMensal, calcularTendencia } from '@/lib/utils/processLancamentos';
import { useLanguage } from '@/lib/hooks/useLanguage';
import { useCurrencyStore } from '@/lib/store/currencyStore';
import { useMemo } from 'react';

export default function DashboardPage() {
  const { transactions: lancamentos, isLoading } = useTransactions();
  const isLoaded = !isLoading;
  const { t, language } = useLanguage();
  const { currency, formatValue, convertValue } = useCurrencyStore();

  const lancamentosConvertidos = useMemo(() => {
    return lancamentos.map(l => ({
      ...l,
      valor: convertValue(l.valor, l.currency || 'BRL') // Default to BRL for legacy data
    }));
  }, [lancamentos, convertValue]);

  if (!isLoaded) {
    return (
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-4 md:pt-6">
        <p>{t('carregando')}</p>
      </div>
    );
  }

  const data = calcularMetricasDashboard(lancamentosConvertidos);
  const historicoMensal = calcularHistoricoMensal(lancamentosConvertidos);

  // Helper function to format currency using store
  const formatValueFn = (value: number) => {
    return formatValue(value, currency);
  };

  const ultimosMeses = historicoMensal.slice(-2);
  const mesAtual = ultimosMeses[1] || ultimosMeses[0];
  const mesAnterior = ultimosMeses[0];

  const tendenciaPatrimonio = mesAtual && mesAnterior 
    ? calcularTendencia(mesAtual.patrimonio, mesAnterior.patrimonio)
    : { value: 0, isPositive: true };

  const tendenciaIncome = mesAtual && mesAnterior
    ? calcularTendencia(mesAtual.income, mesAnterior.income)
    : { value: 0, isPositive: true };

  const tendenciaRendimentos = mesAtual && mesAnterior
    ? calcularTendencia(mesAtual.rendimentos, mesAnterior.rendimentos)
    : { value: 0, isPositive: true };

  const ultimosSeisMeses = historicoMensal.slice(-6);

const incomeChartData = ultimosSeisMeses.map((item) => ({
  name: new Date(item.mes + '-01').toLocaleDateString(language, {
    month: 'short',
    year: '2-digit',
  }),
  income: item.income,
  gastos: item.gastos,
}));

const rendimentosChartData = ultimosSeisMeses.map((item) => ({
  name: new Date(item.mes + '-01').toLocaleDateString(language, {
    month: 'short',
    year: '2-digit',
  }),
  rendimentos: item.rendimentos,
  investimentos: item.investimentos,
  // We should also convert these? They are already converted via historicoMensal calculated from lancamentosConvertidos
}));

  const mesesCobertura = data.gastosFixos > 0 
    ? (data.fundoEmergencia / data.gastosFixos).toFixed(1)
    : '0';

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-4 md:pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight">{t('dashboard')}</h2>
        <div className="hidden md:flex items-center space-x-2">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">
            {new Date().toLocaleDateString(language, { month: 'long', year: 'numeric' })}
          </span>

        </div>
      </div>

      {lancamentos.length === 0 ? (
        <Card>
          <CardContent className="pt-6">
            <div className="text-center py-10 text-muted-foreground">
              <p className="text-lg font-semibold mb-2">{t('nenhumDadoDisponivel')}</p>
              <p>{t('comecaAdicionandoLancamentos')}</p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <MetricCard
              title={t('patrimonioTotal')}
              value={data.patrimonioTotal}
              icon={Wallet}
              formatter={formatValueFn}
              trend={tendenciaPatrimonio}
              trendLabel={t('vsMesAnterior')}
            />
            <MetricCard
              title={t('sobraMensal')}
              value={data.sobraMensal}
              icon={TrendingUp}
              formatter={formatValueFn}
              trend={data.sobraMensal >= 0 ? { value: 0, isPositive: true } : { value: 0, isPositive: false }}
              trendLabel={t('vsMesAnterior')}
            />
            <MetricCard
              title={t('fundoEmergencia')}
              value={data.fundoEmergencia}
              icon={PiggyBank}
              formatter={formatValueFn}
              description={`${mesesCobertura} ${t('mesesCobertura')}`}
            />
            <MetricCard
              title={t('dividas')}
              value={data.dividas}
              icon={CreditCard}
              formatter={formatValueFn}
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <MetricCard
              title={t('incomeMensal')}
              value={data.incomeTotal}
              icon={DollarSign}
              formatter={formatValueFn}
              trend={tendenciaIncome}
              trendLabel={t('vsMesAnterior')}
            />
            <MetricCard
              title={t('rendimentos')}
              value={data.rendimentos}
              icon={BarChart3}
              formatter={formatValueFn}
              trend={tendenciaRendimentos}
              trendLabel={t('vsMesAnterior')}
            />
            <MetricCard
              title={t('gastosFixos')}
              value={data.gastosFixos}
              icon={Calendar}
              formatter={formatValueFn}
            />
            <MetricCard
              title={t('gastosVariaveis')}
              value={data.gastosVariaveis}
              icon={ShoppingCart}
              formatter={formatValueFn}
            />
          </div>

          {ultimosSeisMeses.length > 0 && (
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>{t('incomeVsGastos')}</CardTitle>
                  <CardDescription>
                    {t('evolucaoDosUltimos')} {ultimosSeisMeses.length} {t('meses')}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <LineChartComponent
                    data={incomeChartData}
                    lines={[
                      { dataKey: 'income', name: t('income'), color: '#10b981' },
                      { dataKey: 'gastos', name: t('gastos'), color: '#ef4444' },
                    ]}
                    formatter={formatValueFn}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>{t('investimentosVsRendimentos')}</CardTitle>
                  <CardDescription>
                    {t('performanceDosUltimos')} {ultimosSeisMeses.length} {t('meses')}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <LineChartComponent
                    data={rendimentosChartData}
                    lines={[
                      { dataKey: 'investimentos', name: t('investimentos'), color: '#3b82f6' },
                      { dataKey: 'rendimentos', name: t('rendimentos'), color: '#8b5cf6' },
                    ]}
                    formatter={formatValueFn}
                  />
                </CardContent>
              </Card>
            </div>
          )}
        </>
      )}
    </div>
  );
}
