'use client';

import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { axisProps, ChartTooltip, gridProps, SERIES } from '@/components/charts/chart-kit';

const activeDot = { r: 4, stroke: 'var(--card)', strokeWidth: 2 };

interface NetWorthChartProps {
  data: { name: string; patrimonio: number }[];
  label: string;
  format: (value: number) => string;
  formatAxis: (value: number) => string;
  height?: number;
}

/** Net worth at the end of each month: one line, lightly filled. */
export function NetWorthChart({ data, label, format, formatAxis, height = 220 }: NetWorthChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <AreaChart data={data} margin={{ top: 8, right: 12, bottom: 0, left: 0 }}>
        <defs>
          <linearGradient id="net-worth-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={SERIES[0]} stopOpacity={0.28} />
            <stop offset="100%" stopColor={SERIES[0]} stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid {...gridProps} />
        <XAxis dataKey="name" {...axisProps} tickMargin={8} minTickGap={24} />
        <YAxis {...axisProps} width={64} tickFormatter={formatAxis} domain={['auto', 'auto']} />
        <Tooltip cursor={{ stroke: 'var(--input)' }} content={<ChartTooltip format={format} />} />
        <Area
          type="monotone"
          dataKey="patrimonio"
          name={label}
          stroke={SERIES[0]}
          strokeWidth={2}
          fill="url(#net-worth-fill)"
          activeDot={activeDot}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

interface GrowthChartProps {
  data: { name: string; investido: number; juros: number }[];
  labels: { investido: string; juros: string; total: string };
  /** X values to label; the rest stay unlabelled so the axis reads evenly. */
  ticks?: string[];
  format: (value: number) => string;
  formatAxis: (value: number) => string;
  height?: number;
}

/** What you put in, with the interest it earned stacked on top. */
export function GrowthChart({ data, labels, ticks, format, formatAxis, height = 300 }: GrowthChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <AreaChart data={data} margin={{ top: 8, right: 12, bottom: 0, left: 0 }}>
        <CartesianGrid {...gridProps} />
        <XAxis dataKey="name" {...axisProps} tickMargin={8} ticks={ticks} interval={ticks ? 0 : undefined} />
        <YAxis {...axisProps} width={64} tickFormatter={formatAxis} />
        <Tooltip
          cursor={{ stroke: 'var(--input)' }}
          content={<ChartTooltip format={format} totalLabel={labels.total} />}
        />
        <Area
          type="monotone"
          stackId="total"
          dataKey="investido"
          name={labels.investido}
          stroke={SERIES[0]}
          strokeWidth={2}
          fill={SERIES[0]}
          fillOpacity={0.35}
          activeDot={activeDot}
        />
        <Area
          type="monotone"
          stackId="total"
          dataKey="juros"
          name={labels.juros}
          stroke={SERIES[1]}
          strokeWidth={2}
          fill={SERIES[1]}
          fillOpacity={0.35}
          activeDot={activeDot}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
