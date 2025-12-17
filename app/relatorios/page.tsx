// app/relatorios/page.tsx

'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { PeriodFilter } from '@/components/relatorios/PeriodFilter';
import { ExportCSV } from '@/components/relatorios/ExportCSV';
import { filterByPeriod } from '@/lib/utils/filterLancamentos';
import { ArrowUpCircle, ArrowDownCircle, TrendingUp, TrendingDown } from 'lucide-react';
import { useLanguage } from '@/lib/hooks/useLanguage';
import { useCurrencyStore } from '@/lib/store/currencyStore';
import { useTransactions } from '@/lib/contexts/TransactionContext';

export default function RelatoriosPage() {
  const { transactions: lancamentos, isLoading } = useTransactions();
  const isLoaded = !isLoading;
  const [selectedPeriod, setSelectedPeriod] = useState('all');
  const [customMonth, setCustomMonth] = useState(new Date().toISOString().slice(0, 7));
  const { t, language } = useLanguage();

  const { currency, convertValue, formatValue } = useCurrencyStore();

  const lancamentosConvertidos = useMemo(() => {
    return lancamentos.map((l) => ({
      ...l,
      valor: convertValue(l.valor, l.currency || 'BRL'),
    }));
  }, [lancamentos, convertValue]);

  const lancamentosFiltrados = useMemo(() => {
    return filterByPeriod(lancamentosConvertidos, selectedPeriod, customMonth);
  }, [lancamentosConvertidos, selectedPeriod, customMonth]);

  const totais = useMemo(() => {
    const totalEntradas = lancamentosFiltrados
      .filter(l => l.tipo === 'entrada')
      .reduce((sum, l) => sum + l.valor, 0);

    const totalSaidas = lancamentosFiltrados
      .filter(l => l.tipo === 'saida')
      .reduce((sum, l) => sum + l.valor, 0);

    const saldo = totalEntradas - totalSaidas;

    return {
      totalEntradas,
      totalSaidas,
      saldo,
    };
  }, [lancamentosFiltrados]);

  // Use the store's formatValue instead of local formatCurrency function
  const formatCurrency = (value: number) => {
    return formatValue(value, currency);
  };

  const formatDate = (dateString: string) => {
    const [year, month] = dateString.split('-');
    return new Date(parseInt(year), parseInt(month) - 1).toLocaleDateString(language, {
      month: 'long',
      year: 'numeric',
    });
  };

  const getCategoriaLabel = (categoria: string) => {
    const labels: Record<string, string> = {
      income: t('receitaSalario'),
      gasto_fixo: t('gastoFixo'),
      gasto_variavel: t('gastoVariavel'),
      investimento: t('investimento'),
      fundo_emergencia: t('fundoEmergenciaCategoria'),
      divida: t('pagamentoDivida'),
    };
    return labels[categoria] || categoria;
  };

  if (!isLoaded) {
    return (
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-4 md:pt-6">
        <p>{t('carregando')}</p>
      </div>
    );
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-4 md:pt-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight">{t('relatorios')}</h2>
        <ExportCSV data={lancamentosFiltrados} fileName={`relatorio-${selectedPeriod}.csv`} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t('periodo')}</CardTitle>
          <CardDescription>{t('selecionePeriodo')}</CardDescription>
        </CardHeader>
        <CardContent>
          <PeriodFilter 
            selectedPeriod={selectedPeriod} 
            onPeriodChange={setSelectedPeriod}
            customMonth={customMonth}
            onCustomMonthChange={setCustomMonth}
          />
        </CardContent>
      </Card>

      {lancamentosFiltrados.length === 0 ? (
        <Card>
          <CardContent className="pt-6">
            <div className="text-center py-10 text-muted-foreground">
              <p>{t('nenhumLancamentoPeriodo')}</p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <>
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{t('totalEntradas')}</CardTitle>
                <ArrowUpCircle className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">
                  {formatCurrency(totais.totalEntradas)}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {lancamentosFiltrados.filter(l => l.tipo === 'entrada').length} {t('lancamentosText')}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{t('totalSaidas')}</CardTitle>
                <ArrowDownCircle className="h-4 w-4 text-red-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">
                  {formatCurrency(totais.totalSaidas)}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {lancamentosFiltrados.filter(l => l.tipo === 'saida').length} {t('lancamentosText')}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{t('saldo')}</CardTitle>
                {totais.saldo >= 0 ? (
                  <TrendingUp className="h-4 w-4 text-green-600" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-red-600" />
                )}
              </CardHeader>
              <CardContent>
                <div className={`text-2xl font-bold ${totais.saldo >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {formatCurrency(totais.saldo)}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {t('diferencaEntradasSaidas')}
                </p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>{t('todosLancamentos')}</CardTitle>
              <CardDescription>
                {lancamentosFiltrados.length} {t('lancamentosText')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-auto max-h-[500px]">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{t('data')}</TableHead>
                      <TableHead>{t('tipo')}</TableHead>
                      <TableHead>{t('categoria')}</TableHead>
                      <TableHead>{t('descricao')}</TableHead>
                      <TableHead className="text-right">{t('valor')}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {lancamentosFiltrados
                      .sort((a, b) => b.data.localeCompare(a.data))
                      .map((lancamento) => (
                        <TableRow key={lancamento.id}>
                          <TableCell className="font-medium">
                            {formatDate(lancamento.data)}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              {lancamento.tipo === 'entrada' ? (
                                <ArrowUpCircle className="h-4 w-4 text-green-600" />
                              ) : (
                                <ArrowDownCircle className="h-4 w-4 text-red-600" />
                              )}
                              <span className="capitalize">
                                {lancamento.tipo === 'entrada' ? t('entrada') : t('saida')}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>{getCategoriaLabel(lancamento.categoria)}</TableCell>
                          <TableCell>{lancamento.descricao}</TableCell>
                          <TableCell
                            className={`text-right font-semibold ${
                              lancamento.tipo === 'entrada' ? 'text-green-600' : 'text-red-600'
                            }`}
                          >
                            {lancamento.tipo === 'entrada' ? '+' : '-'}
                            {formatCurrency(lancamento.valor)}
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
