'use client';

import { useMemo, useState } from 'react';
import { GrowthChart } from '@/components/charts/area-charts';
import { ChartLegend, SERIES } from '@/components/charts/chart-kit';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Page, PageHeader, Panel, PanelHeader } from '@/components/ui/panel';
import { Segmented } from '@/components/ui/segmented';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { calcularInvestimento } from '@/lib/calculators/investimentos';
import { useMoney } from '@/lib/hooks/useMoney';
import { useLanguage } from '@/lib/i18n/LanguageProvider';
import type { TranslationKey } from '@/lib/i18n/translations';

type Field = 'valorInicial' | 'valorFuturo' | 'taxaAnual' | 'anos';
type Granularity = 'anual' | 'mensal';

const FIELDS: { name: Field; label: TranslationKey; step: string; money: boolean }[] = [
  { name: 'valorInicial', label: 'valorInicial', step: '100', money: true },
  { name: 'valorFuturo', label: 'valorFuturoDesejado', step: '1000', money: true },
  { name: 'taxaAnual', label: 'taxaJurosAnual', step: '0.1', money: false },
  { name: 'anos', label: 'periodoAnos', step: '1', money: false },
];

const MAX_YEARS = 60;

export default function InvestimentosPage() {
  const { t } = useLanguage();
  const { format, currency } = useMoney();
  const [values, setValues] = useState<Record<Field, string>>({
    valorInicial: '10000',
    valorFuturo: '1000000',
    taxaAnual: '6',
    anos: '20',
  });
  const [granularity, setGranularity] = useState<Granularity>('anual');

  // The plan recalculates as the numbers change; there is nothing to submit.
  const plan = useMemo(() => {
    const valorInicial = parseFloat(values.valorInicial) || 0;
    const valorFuturo = parseFloat(values.valorFuturo) || 0;
    const taxaAnual = (parseFloat(values.taxaAnual) || 0) / 100;
    const anos = Math.min(Math.floor(parseFloat(values.anos) || 0), MAX_YEARS);
    if (anos < 1 || taxaAnual <= 0 || valorFuturo <= valorInicial) return null;

    const { pmt, evolucao } = calcularInvestimento({ valorInicial, valorFuturo, taxaAnual, anos });
    return { pmt, evolucao, anos, final: evolucao[evolucao.length - 1] };
  }, [values]);

  const formatWhole = (value: number) => format(value, { whole: true });
  const formatAxis = (value: number) => format(value, { compact: true });
  const yearly = plan?.evolucao.filter((item) => item.mes % 12 === 0) ?? [];
  const tickStep = !plan || plan.anos <= 10 ? 1 : plan.anos <= 30 ? 5 : 10;
  const rows = granularity === 'anual' ? yearly : (plan?.evolucao ?? []);

  return (
    <Page>
      <PageHeader title={t('calculadoraPrimeiroMilhao')} description={t('preenchaParaCalcular')} />

      <div className="grid gap-6 lg:grid-cols-3">
        <Panel>
          <PanelHeader title={t('parametros')} />
          <div className="grid gap-4">
            {FIELDS.map((field) => (
              <div key={field.name} className="grid gap-2">
                <Label htmlFor={field.name}>
                  {t(field.label)}
                  {field.money && <span className="num font-normal text-muted-foreground">{currency}</span>}
                </Label>
                <Input
                  id={field.name}
                  type="number"
                  inputMode="decimal"
                  min="0"
                  step={field.step}
                  value={values[field.name]}
                  onChange={(e) => setValues((current) => ({ ...current, [field.name]: e.target.value }))}
                  className="num h-10"
                />
              </div>
            ))}
          </div>
        </Panel>

        <Panel className="lg:col-span-2">
          {plan ? (
            <>
              <div className="mb-6 grid gap-6 sm:grid-cols-[1.4fr_1fr_1fr]">
                <div className="grid gap-2">
                  <h2 className="text-[13px] font-medium text-muted-foreground">{t('investimentoMensal')}</h2>
                  <p className="num text-4xl font-medium tracking-tight">{format(plan.pmt)}</p>
                  <p className="text-[13px] text-muted-foreground">
                    {t('porMesDurante')} {plan.anos} {t('anos')}
                  </p>
                </div>
                <div className="grid content-start gap-2">
                  <h2 className="text-[13px] font-medium text-muted-foreground">{t('totalInvestido')}</h2>
                  <p className="num text-xl font-medium">{formatWhole(plan.final.totalInvestido)}</p>
                </div>
                <div className="grid content-start gap-2">
                  <h2 className="text-[13px] font-medium text-muted-foreground">{t('totalJuros')}</h2>
                  <p className="num text-xl font-medium text-positive">+{formatWhole(plan.final.totalJuros)}</p>
                </div>
              </div>
              <div className="mb-3 flex justify-end">
                <ChartLegend
                  items={[
                    { label: t('totalInvestido'), color: SERIES[0] },
                    { label: t('juros'), color: SERIES[1] },
                  ]}
                />
              </div>
              <GrowthChart
                data={yearly.map((item) => ({
                  name: String(item.mes / 12),
                  investido: item.totalInvestido,
                  juros: item.totalJuros,
                }))}
                ticks={yearly.filter((item) => (item.mes / 12) % tickStep === 0).map((item) => String(item.mes / 12))}
                labels={{ investido: t('totalInvestido'), juros: t('juros'), total: t('totalAcumulado') }}
                format={formatWhole}
                formatAxis={formatAxis}
              />
            </>
          ) : (
            <p className="text-muted-foreground">{t('metaInvalida')}</p>
          )}
        </Panel>
      </div>

      {plan && (
        <Panel>
          <PanelHeader
            title={t('evolucaoInvestimento')}
            description={t('projecaoMesAMes')}
            action={
              <Segmented
                label={t('evolucaoInvestimento')}
                value={granularity}
                onChange={setGranularity}
                options={[
                  { value: 'anual', label: t('ano') },
                  { value: 'mensal', label: t('mes') },
                ]}
              />
            }
          />
          <div className="max-h-[520px] overflow-auto">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead>{granularity === 'anual' ? t('ano') : t('mes')}</TableHead>
                  <TableHead className="hidden text-right sm:table-cell">{t('jurosMes')}</TableHead>
                  <TableHead className="text-right">{t('totalInvestido')}</TableHead>
                  <TableHead className="hidden text-right sm:table-cell">{t('totalJuros')}</TableHead>
                  <TableHead className="text-right">{t('totalAcumulado')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rows.map((item) => (
                  <TableRow key={item.mes}>
                    <TableCell className="num text-muted-foreground">
                      {granularity === 'anual' ? item.mes / 12 : item.mes}
                    </TableCell>
                    <TableCell className="num hidden text-right sm:table-cell">{format(item.jurosMes)}</TableCell>
                    <TableCell className="num text-right">{format(item.totalInvestido)}</TableCell>
                    <TableCell className="num hidden text-right text-positive sm:table-cell">
                      +{format(item.totalJuros)}
                    </TableCell>
                    <TableCell className="num text-right font-medium">{format(item.totalAcumulado)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Panel>
      )}
    </Page>
  );
}
