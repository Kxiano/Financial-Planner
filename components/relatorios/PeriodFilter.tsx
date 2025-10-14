// components/relatorios/PeriodFilter.tsx

'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calendar } from 'lucide-react';
import { useLanguage } from '@/lib/hooks/useLanguage';

interface PeriodFilterProps {
  selectedPeriod: string;
  onPeriodChange: (period: string) => void;
  customMonth?: string;
  onCustomMonthChange?: (month: string) => void;
}

export function PeriodFilter({ 
  selectedPeriod, 
  onPeriodChange,
  customMonth,
  onCustomMonthChange,
}: PeriodFilterProps) {
  const { t } = useLanguage();

  const periods = [
    { value: 'all', label: t('todos') },
    { value: 'current', label: t('mesAtual') },
    { value: 'last', label: t('mesPassado') },
    { value: 'last3', label: t('ultimos3Meses') },
    { value: 'last6', label: t('ultimos6Meses') },
    { value: 'year', label: t('esteAno') },
    { value: 'custom', label: t('mesEspecifico') },
  ];

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <Calendar className="h-5 w-5 text-muted-foreground self-center" />
        {periods.map((period) => (
          <Button
            key={period.value}
            variant={selectedPeriod === period.value ? 'default' : 'outline'}
            size="sm"
            onClick={() => onPeriodChange(period.value)}
          >
            {period.label}
          </Button>
        ))}
      </div>

      {selectedPeriod === 'custom' && (
        <div className="border-t pt-4">
          <Label htmlFor="custom-month" className="text-sm text-muted-foreground mb-2 block">
            {t('selecioneMes')}
          </Label>
          <Input
            id="custom-month"
            type="month"
            value={customMonth}
            onChange={(e) => onCustomMonthChange?.(e.target.value)}
            className="max-w-xs"
          />
        </div>
      )}
    </div>
  );
}
