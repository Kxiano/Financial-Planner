'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import { ArrowDownRight, ArrowRight, ArrowUpRight } from 'lucide-react';
import { NetWorthChart } from '@/components/charts/area-charts';
import { CashFlowChart } from '@/components/charts/cash-flow-chart';
import { CategoryBars } from '@/components/charts/category-bars';
import { ChartLegend, SERIES } from '@/components/charts/chart-kit';
import { AddTransactionButton } from '@/components/transactions/transaction-dialog';
import { TransactionsTable } from '@/components/transactions/transactions-table';
import { EmptyState, Page, PageHeader, PageLoading, Panel, PanelHeader } from '@/components/ui/panel';
import { useTransactions } from '@/lib/contexts/TransactionContext';
import { formatMonth } from '@/lib/finance/categories';
import { useMoney } from '@/lib/hooks/useMoney';
import { useLanguage } from '@/lib/i18n/LanguageProvider';
import {
  calcularHistoricoMensal,
  calcularMetricasDashboard,
  calcularSaidasPorCategoria,
  calcularTendencia,
  ultimoMesComDados,
} from '@/lib/utils/processLancamentos';
import { cn } from '@/lib/utils';

const HISTORY_MONTHS = 12;
const CASH_FLOW_MONTHS = 6;
const RECENT_ROWS = 6;

function Trend({ trend, label }: { trend: { value: number; isPositive: boolean }; label: string }) {
  const Icon = trend.isPositive ? ArrowUpRight : ArrowDownRight;
  return (
    <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
      <span className={cn('num flex items-center gap-0.5 font-medium', trend.isPositive ? 'text-positive' : 'text-negative')}>
        <Icon className="size-4" aria-hidden="true" />
        {trend.isPositive ? '+' : '−'}
        {trend.value}%
      </span>
      {label}
    </p>
  );
}

function Stat({ label, value, note }: { label: string; value: string; note?: string }) {
  return (
    <Panel className="grid content-start gap-2">
      <h2 className="text-[13px] font-medium text-muted-foreground">{label}</h2>
      <p className="num text-2xl font-medium">{value}</p>
      {note && <p className="text-[13px] text-muted-foreground">{note}</p>}
    </Panel>
  );
}

export default function DashboardPage() {
  const { transactions, isLoading } = useTransactions();
  const { t, locale } = useLanguage();
  const { convertAll, format } = useMoney();

  const view = useMemo(() => {
    const lancamentos = convertAll(transactions);
    const mes = ultimoMesComDados(lancamentos);
    const doMes = lancamentos.filter((l) => l.data === mes);
    const historico = calcularHistoricoMensal(lancamentos);
    const [anterior, atual] = historico.slice(-2);

    return {
      mes,
      metricas: calcularMetricasDashboard(lancamentos),
      historico: historico.slice(-HISTORY_MONTHS),
      tendenciaPatrimonio: atual && anterior ? calcularTendencia(atual.patrimonio, anterior.patrimonio) : null,
      saidasPorCategoria: calcularSaidasPorCategoria(doMes),
      reservadoNoMes: doMes
        .filter((l) => l.tipo === 'saida' && (l.categoria === 'investimento' || l.categoria === 'fundo_emergencia'))
        .reduce((total, l) => total + l.valor, 0),
      recentes: [...lancamentos]
        .sort((a, b) => b.data.localeCompare(a.data) || (b.createdAt ?? '').localeCompare(a.createdAt ?? ''))
        .slice(0, RECENT_ROWS),
    };
  }, [transactions, convertAll]);

  if (isLoading) return <PageLoading label={t('carregando')} />;

  const { metricas } = view;
  const header = (
    <PageHeader
      title={t('visaoGeral')}
      description={view.mes ? formatMonth(view.mes, locale) : undefined}
      action={<AddTransactionButton />}
    />
  );

  if (transactions.length === 0) {
    return (
      <Page>
        {header}
        <EmptyState title={t('nenhumDadoDisponivel')} description={t('comecaAdicionandoLancamentos')} />
      </Page>
    );
  }

  const formatAxis = (value: number) => format(value, { compact: true });
  const percent = new Intl.NumberFormat(locale, { style: 'percent', maximumFractionDigits: 0 });
  const shareOfIncome = (value: number) =>
    metricas.incomeTotal > 0 ? `${percent.format(value / metricas.incomeTotal)} ${t('daRenda')}` : undefined;
  const mesesCobertura =
    metricas.gastosFixos > 0
      ? new Intl.NumberFormat(locale, { maximumFractionDigits: 1 }).format(metricas.fundoEmergencia / metricas.gastosFixos)
      : '0';

  const monthRows = [
    { label: t('incomeMensal'), value: metricas.incomeTotal, tipo: 'entrada' as const },
    { label: t('gastosFixos'), value: metricas.gastosFixos, note: shareOfIncome(metricas.gastosFixos) },
    { label: t('gastosVariaveis'), value: metricas.gastosVariaveis, note: shareOfIncome(metricas.gastosVariaveis) },
    { label: t('investidoNoMes'), value: view.reservadoNoMes, note: shareOfIncome(view.reservadoNoMes) },
  ];

  const chartName = (mes: string) => formatMonth(mes, locale, 'short');

  return (
    <Page>
      {header}

      <div className="grid gap-6 lg:grid-cols-3">
        <Panel className="lg:col-span-2">
          <div className="mb-5 grid gap-2">
            <h2 className="text-[13px] font-medium text-muted-foreground">{t('patrimonioTotal')}</h2>
            <p className="num text-4xl font-medium tracking-tight md:text-5xl">{format(metricas.patrimonioTotal)}</p>
            {view.tendenciaPatrimonio && <Trend trend={view.tendenciaPatrimonio} label={t('vsMesAnterior')} />}
          </div>
          <NetWorthChart
            data={view.historico.map((item) => ({ name: chartName(item.mes), patrimonio: item.patrimonio }))}
            label={t('patrimonioTotal')}
            format={format}
            formatAxis={formatAxis}
          />
        </Panel>

        <Panel className="flex flex-col">
          <PanelHeader title={t('esteMes')} />
          <dl className="grid flex-1 content-start">
            {monthRows.map((row) => (
              <div key={row.label} className="flex items-baseline justify-between gap-4 border-b py-3 first:pt-0">
                <dt className="text-sm">
                  {row.label}
                  {row.note && <span className="block text-[13px] text-muted-foreground">{row.note}</span>}
                </dt>
                <dd className={cn('num font-medium', row.tipo === 'entrada' && 'text-positive')}>
                  {row.tipo === 'entrada' ? '+' : '−'}
                  {format(row.value)}
                </dd>
              </div>
            ))}
            <div className="flex items-baseline justify-between gap-4 pt-4">
              <dt className="text-sm font-medium">{t('sobraMensal')}</dt>
              <dd className={cn('num text-2xl font-medium', metricas.sobraMensal < 0 && 'text-negative')}>
                {format(metricas.sobraMensal)}
              </dd>
            </div>
          </dl>
        </Panel>
      </div>

      <div className="grid gap-6 sm:grid-cols-3">
        <Stat
          label={t('fundoEmergencia')}
          value={format(metricas.fundoEmergencia)}
          note={`${mesesCobertura} ${t('mesesCobertura')}`}
        />
        <Stat label={t('rendimentos')} value={format(metricas.rendimentos)} note={t('esteMes')} />
        <Stat label={t('dividas')} value={format(metricas.dividas)} />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Panel className="lg:col-span-2">
          <PanelHeader
            title={t('fluxoCaixa')}
            description={t('fluxoCaixaDesc')}
            action={
              <ChartLegend
                items={[
                  { label: t('income'), color: SERIES[0] },
                  { label: t('gastos'), color: SERIES[1] },
                ]}
              />
            }
          />
          <CashFlowChart
            data={view.historico.slice(-CASH_FLOW_MONTHS).map((item) => ({
              name: chartName(item.mes),
              income: item.income,
              gastos: item.gastos,
            }))}
            labels={{ income: t('income'), gastos: t('gastos') }}
            format={format}
            formatAxis={formatAxis}
          />
        </Panel>

        <Panel>
          <PanelHeader title={t('paraOndeFoi')} description={formatMonth(view.mes, locale)} />
          <CategoryBars data={view.saidasPorCategoria} format={(value) => format(value, { whole: true })} />
        </Panel>
      </div>

      <Panel>
        <PanelHeader
          title={t('ultimosLancamentos')}
          action={
            <Link
              href="/lancamentos"
              className="group flex items-center gap-1 text-sm font-medium text-brand underline-offset-4 hover:underline"
            >
              {t('verTodos')}
              <ArrowRight className="size-4 transition-transform duration-150 group-hover:translate-x-0.5" aria-hidden="true" />
            </Link>
          }
        />
        <TransactionsTable lancamentos={view.recentes} format={format} />
      </Panel>
    </Page>
  );
}
