'use client';

import { useMemo, useState } from 'react';
import { Download } from 'lucide-react';
import { CashFlowChart } from '@/components/charts/cash-flow-chart';
import { CategoryBars } from '@/components/charts/category-bars';
import { ChartLegend, SERIES } from '@/components/charts/chart-kit';
import { TransactionsTable } from '@/components/transactions/transactions-table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { EmptyState, Page, PageHeader, PageLoading, Panel, PanelHeader } from '@/components/ui/panel';
import { Segmented } from '@/components/ui/segmented';
import { useTransactions } from '@/lib/contexts/TransactionContext';
import { currentMonth, formatMonth } from '@/lib/finance/categories';
import { useMoney } from '@/lib/hooks/useMoney';
import { useLanguage } from '@/lib/i18n/LanguageProvider';
import type { TranslationKey } from '@/lib/i18n/translations';
import { downloadCSV } from '@/lib/utils/exportCSV';
import { filterByPeriod, type Period } from '@/lib/utils/filterLancamentos';
import { calcularHistoricoMensal, calcularSaidasPorCategoria, calcularTotais } from '@/lib/utils/processLancamentos';
import { cn } from '@/lib/utils';

const PERIODS: { value: Period; label: TranslationKey }[] = [
  { value: 'all', label: 'todos' },
  { value: 'current', label: 'mesAtual' },
  { value: 'last', label: 'mesPassado' },
  { value: 'last3', label: 'ultimos3Meses' },
  { value: 'last6', label: 'ultimos6Meses' },
  { value: 'year', label: 'esteAno' },
  { value: 'custom', label: 'mesEspecifico' },
];

export default function RelatoriosPage() {
  const { transactions, isLoading } = useTransactions();
  const { t, locale } = useLanguage();
  const { convertAll, format, currency } = useMoney();
  const [period, setPeriod] = useState<Period>('last6');
  const [customMonth, setCustomMonth] = useState(currentMonth());

  const report = useMemo(() => {
    const lancamentos = filterByPeriod(convertAll(transactions), period, customMonth).sort((a, b) =>
      b.data.localeCompare(a.data),
    );
    return {
      lancamentos,
      totais: calcularTotais(lancamentos),
      historico: calcularHistoricoMensal(lancamentos),
      saidasPorCategoria: calcularSaidasPorCategoria(lancamentos),
      entradas: lancamentos.filter((l) => l.tipo === 'entrada').length,
    };
  }, [transactions, convertAll, period, customMonth]);

  if (isLoading) return <PageLoading label={t('carregando')} />;

  const { lancamentos, totais } = report;
  const formatAxis = (value: number) => format(value, { compact: true });

  const exportReport = () =>
    downloadCSV(
      `planner-${period === 'custom' ? customMonth : period}.csv`,
      [t('data'), t('tipo'), t('categoria'), t('descricao'), t('valor'), t('moeda')],
      lancamentos.map((l) => [l.data, l.tipo, l.categoria, l.descricao, l.valor.toFixed(2), currency]),
    );

  const summary = [
    { label: t('totalEntradas'), value: `+${format(totais.totalEntradas)}`, note: `${report.entradas} ${t('lancamentosText')}`, tone: 'text-positive' },
    {
      label: t('totalSaidas'),
      value: `−${format(totais.totalSaidas)}`,
      note: `${lancamentos.length - report.entradas} ${t('lancamentosText')}`,
    },
    {
      label: t('saldo'),
      value: format(totais.saldo, { signed: true }),
      note: t('diferencaEntradasSaidas'),
      tone: totais.saldo < 0 ? 'text-negative' : undefined,
    },
  ];

  return (
    <Page>
      <PageHeader
        title={t('relatorios')}
        description={t('selecionePeriodo')}
        action={
          <Button onClick={exportReport} disabled={lancamentos.length === 0}>
            <Download />
            {t('exportarCSV')}
          </Button>
        }
      />

      <div className="flex flex-wrap items-end gap-4">
        <Segmented
          label={t('periodo')}
          value={period}
          onChange={setPeriod}
          options={PERIODS.map((p) => ({ value: p.value, label: t(p.label) }))}
        />
        {period === 'custom' && (
          <div className="grid gap-1.5">
            <Label htmlFor="custom-month" className="text-[13px] text-muted-foreground">
              {t('selecioneMes')}
            </Label>
            <Input
              id="custom-month"
              type="month"
              value={customMonth}
              onChange={(e) => setCustomMonth(e.target.value)}
              className="h-10 w-48"
            />
          </div>
        )}
      </div>

      {lancamentos.length === 0 ? (
        <EmptyState title={t('nenhumLancamentoPeriodo')} />
      ) : (
        <>
          <Panel className="grid gap-6 sm:grid-cols-3 sm:gap-0 sm:divide-x">
            {summary.map((item) => (
              <div key={item.label} className="grid gap-2 sm:px-6 sm:first:pl-0 sm:last:pr-0">
                <h2 className="text-[13px] font-medium text-muted-foreground">{item.label}</h2>
                <p className={cn('num text-2xl font-medium md:text-3xl', item.tone)}>{item.value}</p>
                <p className="text-[13px] text-muted-foreground">{item.note}</p>
              </div>
            ))}
          </Panel>

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
                data={report.historico.map((item) => ({
                  name: formatMonth(item.mes, locale, 'short'),
                  income: item.income,
                  gastos: item.gastos,
                }))}
                labels={{ income: t('income'), gastos: t('gastos') }}
                format={format}
                formatAxis={formatAxis}
              />
            </Panel>

            <Panel>
              <PanelHeader title={t('porCategoria')} />
              <CategoryBars data={report.saidasPorCategoria} format={(value) => format(value, { whole: true })} />
            </Panel>
          </div>

          <Panel>
            <PanelHeader title={t('todosLancamentos')} description={`${lancamentos.length} ${t('lancamentosText')}`} />
            <div className="max-h-[520px] overflow-auto">
              <TransactionsTable lancamentos={lancamentos} format={format} />
            </div>
          </Panel>
        </>
      )}
    </Page>
  );
}
