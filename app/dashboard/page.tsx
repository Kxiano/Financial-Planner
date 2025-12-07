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
import { useLocalStorage } from '@/lib/hooks/useLocalStorage';
import { Lancamento } from '@/lib/types';
import { calcularMetricasDashboard, calcularHistoricoMensal, calcularTendencia } from '@/lib/utils/processLancamentos';
import { useLanguage } from '@/lib/hooks/useLanguage';
import { useCurrency } from '@/lib/contexts/CurrencyContext';

export default function DashboardPage() {
  const [lancamentos, , isLoaded] = useLocalStorage<Lancamento[]>('lancamentos', []);
  const { t, language } = useLanguage();
  const { currency, formatCurrency } = useCurrency();

  if (!isLoaded) {
    return (
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-4 md:pt-6">
        <p>{t('carregando')}</p>
      </div>
    );
  }

  const data = calcularMetricasDashboard(lancamentos);
  const historicoMensal = calcularHistoricoMensal(lancamentos);

  // Helper function to format currency using context
  const formatValue = (value: number) => {
    return formatCurrency(value, currency);
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
              formatAsCurrency
              trend={tendenciaPatrimonio}
            />
            <MetricCard
              title={t('sobraMensal')}
              value={data.sobraMensal}
              icon={TrendingUp}
              formatAsCurrency
              trend={data.sobraMensal >= 0 ? { value: 0, isPositive: true } : { value: 0, isPositive: false }}
            />
            <MetricCard
              title={t('fundoEmergencia')}
              value={data.fundoEmergencia}
              icon={PiggyBank}
              formatAsCurrency
              description={`${mesesCobertura} ${t('mesesCobertura')}`}
            />
            <MetricCard
              title={t('dividas')}
              value={data.dividas}
              icon={CreditCard}
              formatAsCurrency
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <MetricCard
              title={t('incomeMensal')}
              value={data.incomeTotal}
              icon={DollarSign}
              formatAsCurrency
              trend={tendenciaIncome}
            />
            <MetricCard
              title={t('rendimentos')}
              value={data.rendimentos}
              icon={BarChart3}
              formatAsCurrency
              trend={tendenciaRendimentos}
            />
            <MetricCard
              title={t('gastosFixos')}
              value={data.gastosFixos}
              icon={Calendar}
              formatAsCurrency
            />
            <MetricCard
              title={t('gastosVariaveis')}
              value={data.gastosVariaveis}
              icon={ShoppingCart}
              formatAsCurrency
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
