'use client';

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { axisProps, ChartTooltip, gridProps, SERIES } from '@/components/charts/chart-kit';

export interface CashFlowPoint {
  name: string;
  income: number;
  gastos: number;
}

interface CashFlowChartProps {
  data: CashFlowPoint[];
  labels: { income: string; gastos: string };
  format: (value: number) => string;
  formatAxis: (value: number) => string;
  height?: number;
}

/** Income beside expenses, one pair of bars per month. */
export function CashFlowChart({ data, labels, format, formatAxis, height = 280 }: CashFlowChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data} barGap={2} barCategoryGap="28%" margin={{ top: 8, right: 0, bottom: 0, left: 0 }}>
        <CartesianGrid {...gridProps} />
        <XAxis dataKey="name" {...axisProps} tickMargin={8} />
        <YAxis {...axisProps} width={64} tickFormatter={formatAxis} />
        <Tooltip cursor={{ fill: 'var(--accent)' }} content={<ChartTooltip format={format} />} />
        <Bar dataKey="income" name={labels.income} fill={SERIES[0]} radius={[4, 4, 0, 0]} maxBarSize={20} />
        <Bar dataKey="gastos" name={labels.gastos} fill={SERIES[1]} radius={[4, 4, 0, 0]} maxBarSize={20} />
      </BarChart>
    </ResponsiveContainer>
  );
}
