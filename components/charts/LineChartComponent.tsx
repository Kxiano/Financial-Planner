// components/charts/LineChartComponent.tsx

'use client';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

interface LineChartData {
  name: string;
  [key: string]: string | number;
}

interface LineChartComponentProps {
  data: LineChartData[];
  lines: {
    dataKey: string;
    name: string;
    color: string;
  }[];
  height?: number;
  formatter?: (value: number) => string;
}

export function LineChartComponent({
  data,
  lines,
  height = 300,
  formatter,
}: LineChartComponentProps) {
  const { theme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Aguardar montagem para evitar hidration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Determinar se está em modo escuro
  const currentTheme = theme === 'system' ? systemTheme : theme;
  const isDark = currentTheme === 'dark';

  // Cores para textos baseadas no tema
  const textColor = isDark ? '#a1a1aa' : '#71717a'; // zinc-400 dark / zinc-500 light
  const gridColor = isDark ? '#27272a' : '#e4e4e7'; // zinc-800 dark / zinc-200 light

  if (!mounted) {
    return <div style={{ width: '100%', height }}></div>;
  }

  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
        <XAxis
          dataKey="name"
          tick={{ fill: textColor, fontSize: 12 }}
          stroke={textColor}
        />
        <YAxis
          tick={{ fill: textColor, fontSize: 12 }}
          stroke={textColor}
          tickFormatter={(value) =>
            formatter
              ? formatter(value)
              : new Intl.NumberFormat('pt-BR', {
                  notation: 'compact',
                  compactDisplay: 'short',
                }).format(value)
          }
        />
        <Tooltip
          contentStyle={{
            backgroundColor: isDark ? '#18181b' : '#ffffff',
            border: `1px solid ${isDark ? '#27272a' : '#e4e4e7'}`,
            borderRadius: '6px',
            color: isDark ? '#fafafa' : '#09090b',
          }}
          itemStyle={{
            color: isDark ? '#fafafa' : '#09090b',
          }}
          labelStyle={{
            color: isDark ? '#fafafa' : '#09090b',
          }}
          formatter={(value: number) =>
            formatter
              ? formatter(value)
              : new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                }).format(value)
          }
        />
        {/* ... rest of chart */}
        <Legend
          wrapperStyle={{
            color: textColor,
          }}
          formatter={(value) => (
            <span style={{ color: textColor }}>{value}</span>
          )}
        />
        {lines.map((line) => (
          <Line
            key={line.dataKey}
            type="monotone"
            dataKey={line.dataKey}
            name={line.name}
            stroke={line.color}
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
}
