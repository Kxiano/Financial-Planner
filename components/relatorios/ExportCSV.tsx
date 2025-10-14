// components/relatorios/ExportCSV.tsx

'use client';

import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { Lancamento } from '@/lib/types';
import { useLanguage } from '@/lib/hooks/useLanguage';

interface ExportCSVProps {
  data: Lancamento[];
  fileName?: string;
}

export function ExportCSV({ data, fileName = 'lancamentos.csv' }: ExportCSVProps) {
  const { t } = useLanguage();

  const handleExport = () => {
    if (data.length === 0) {
      alert(t('nenhumLancamentoPeriodo'));
      return;
    }

    const headers = [t('data'), t('tipo'), t('categoria'), t('descricao'), t('valor')];

    const rows = data.map(item => [
      item.data,
      item.tipo,
      item.categoria,
      item.descricao,
      item.valor.toFixed(2),
    ]);

    const csvContent = [headers, ...rows]
      .map(row => row.join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <Button onClick={handleExport} variant="outline">
      <Download className="mr-2 h-4 w-4" />
      {t('exportarCSV')}
    </Button>
  );
}
