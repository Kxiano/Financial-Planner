// app/lancamentos/page.tsx

'use client';

import { AddLancamentoDialog } from '@/components/lancamentos/AddLancamentoDialog';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { useLocalStorage } from '@/lib/hooks/useLocalStorage';
import { Lancamento } from '@/lib/types';
import { Trash2, ArrowUpCircle, ArrowDownCircle } from 'lucide-react';
import { useLanguage } from '@/lib/hooks/useLanguage';

export default function LancamentosPage() {
  const [lancamentos, setLancamentos, isLoaded] = useLocalStorage<Lancamento[]>(
    'lancamentos',
    []
  );
  const { t, locale } = useLanguage();

  const handleAddLancamento = (novoLancamento: Omit<Lancamento, 'id'>) => {
    const lancamentoComId: Lancamento = {
      ...novoLancamento,
      id: Date.now().toString(),
    };
    setLancamentos([...lancamentos, lancamentoComId]);
  };

  const handleDeleteLancamento = (id: string) => {
    if (confirm(t('temCertezaExcluir'))) {
      setLancamentos(lancamentos.filter((l) => l.id !== id));
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  const formatDate = (dateString: string) => {
  const [year, month] = dateString.split('-');
  return new Date(parseInt(year), parseInt(month) - 1).toLocaleDateString(locale, {
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

  const lancamentosOrdenados = [...lancamentos].sort((a, b) => b.data.localeCompare(a.data));

  if (!isLoaded) {
    return (
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-4 md:pt-6">
        <p>{t('carregando')}</p>
      </div>
    );
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-4 md:pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight">{t('lancamentos')}</h2>
        <AddLancamentoDialog onAdd={handleAddLancamento} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t('historicoLancamentos')}</CardTitle>
          <CardDescription>
            {t('todosRegistrosFinanceiros')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {lancamentos.length === 0 ? (
            <div className="text-center py-10 text-muted-foreground">
              <p>{t('nenhumLancamentoRegistrado')}</p>
              <p className="text-sm mt-2">{t('cliqueNovoLancamento')}</p>
            </div>
          ) : (
            <div className="overflow-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t('data')}</TableHead>
                    <TableHead>{t('tipo')}</TableHead>
                    <TableHead>{t('categoria')}</TableHead>
                    <TableHead>{t('descricao')}</TableHead>
                    <TableHead className="text-right">{t('valor')}</TableHead>
                    <TableHead className="text-right">{t('acoes')}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {lancamentosOrdenados.map((lancamento) => (
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
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteLancamento(lancamento.id)}
                        >
                          <Trash2 className="h-4 w-4 text-red-600" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
