// components/metrics/MetricCard.tsx

'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';


interface MetricCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  trendLabel?: string;
}

export function MetricCard({
  title,
  value,
  description,
  icon: Icon,
  trend,

  formatter,
  trendLabel,
}: MetricCardProps & { formatter?: (value: number) => string }) {
  
  const formattedValue = formatter 
    ? formatter(Number(value))
    : value;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {Icon && <Icon className="h-4 w-4 text-muted-foreground" />}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{formattedValue}</div>
        {description && (
          <p className="text-xs text-muted-foreground mt-1">{description}</p>
        )}
        {trend && (
          <div className="flex items-center text-xs mt-2">
            <span
              className={
                trend.isPositive ? 'text-green-600' : 'text-red-600'
              }
            >
              {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%
            </span>
            <span className="text-muted-foreground ml-1">{trendLabel || 'vs mês anterior'}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
