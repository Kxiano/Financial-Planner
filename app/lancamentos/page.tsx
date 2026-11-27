'use client';

import { useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import {
  AddTransactionButton,
  DeleteTransactionDialog,
  TransactionDialog,
} from '@/components/transactions/transaction-dialog';
import { TransactionsTable } from '@/components/transactions/transactions-table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { EmptyState, Page, PageHeader, PageLoading, Panel } from '@/components/ui/panel';
import { Segmented } from '@/components/ui/segmented';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useTransactions } from '@/lib/contexts/TransactionContext';
import { categoriaLabelKey, TODAS_CATEGORIAS, type Categoria, type Tipo } from '@/lib/finance/categories';
import { useMoney } from '@/lib/hooks/useMoney';
import { useLanguage } from '@/lib/i18n/LanguageProvider';
import type { Lancamento } from '@/lib/types';

type TipoFilter = 'all' | Tipo;
type CategoriaFilter = 'all' | Categoria;

export default function LancamentosPage() {
  const { transactions, updateTransaction, deleteTransaction, isLoading } = useTransactions();
  const { t } = useLanguage();
  const { convertAll, format } = useMoney();

  const [query, setQuery] = useState('');
  const [tipo, setTipo] = useState<TipoFilter>('all');
  const [categoria, setCategoria] = useState<CategoriaFilter>('all');
  const [editing, setEditing] = useState<Lancamento | null>(null);
  const [deleting, setDeleting] = useState<Lancamento | null>(null);

  const rows = useMemo(() => {
    const search = query.trim().toLowerCase();
    return convertAll(transactions)
      .filter(
        (l) =>
          (tipo === 'all' || l.tipo === tipo) &&
          (categoria === 'all' || l.categoria === categoria) &&
          (!search || l.descricao.toLowerCase().includes(search)),
      )
      .sort((a, b) => b.data.localeCompare(a.data) || (b.createdAt ?? '').localeCompare(a.createdAt ?? ''));
  }, [transactions, convertAll, query, tipo, categoria]);

  if (isLoading) return <PageLoading label={t('carregando')} />;

  const isFiltered = query !== '' || tipo !== 'all' || categoria !== 'all';
  const clearFilters = () => {
    setQuery('');
    setTipo('all');
    setCategoria('all');
  };

  // Edit and delete work on the stored transaction, not the converted copy shown in the table.
  const original = (row: Lancamento) => transactions.find((l) => l.id === row.id) ?? row;

  return (
    <Page>
      <PageHeader
        title={t('lancamentos')}
        description={`${transactions.length} ${t('lancamentosText')}`}
        action={<AddTransactionButton />}
      />

      {transactions.length === 0 ? (
        <EmptyState title={t('nenhumLancamentoRegistrado')} description={t('cliqueNovoLancamento')} />
      ) : (
        <Panel className="p-0 md:p-0">
          <div className="flex flex-wrap items-center gap-3 border-b p-4">
            <div className="relative min-w-52 flex-1">
              <Search
                className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
                aria-hidden="true"
              />
              <Input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t('buscar')}
                aria-label={t('buscar')}
                className="h-10 pl-9"
              />
            </div>
            <Segmented
              label={t('tipo')}
              value={tipo}
              onChange={setTipo}
              options={[
                { value: 'all', label: t('todos') },
                { value: 'entrada', label: t('entrada') },
                { value: 'saida', label: t('saida') },
              ]}
            />
            <Select value={categoria} onValueChange={(value) => setCategoria(value as CategoriaFilter)}>
              <SelectTrigger className="h-10 w-full sm:w-56" aria-label={t('categoria')}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t('todasCategorias')}</SelectItem>
                {TODAS_CATEGORIAS.map((value) => (
                  <SelectItem key={value} value={value}>
                    {t(categoriaLabelKey(value, value === 'income' ? 'entrada' : 'saida'))}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {rows.length === 0 ? (
            <div className="flex flex-col items-start gap-3 p-6">
              <p className="text-muted-foreground">{t('nenhumResultado')}</p>
              <Button variant="outline" size="sm" onClick={clearFilters}>
                {t('limparFiltros')}
              </Button>
            </div>
          ) : (
            <div className="px-2 pb-2 md:px-4">
              <TransactionsTable
                lancamentos={rows}
                format={format}
                onEdit={(row) => setEditing(original(row))}
                onDelete={(row) => setDeleting(original(row))}
              />
            </div>
          )}

          {isFiltered && rows.length > 0 && (
            <p className="border-t px-4 py-3 text-[13px] text-muted-foreground">
              {rows.length} / {transactions.length} {t('lancamentosText')}
            </p>
          )}
        </Panel>
      )}

      <TransactionDialog
        open={!!editing}
        onOpenChange={(open) => !open && setEditing(null)}
        lancamento={editing}
        onSubmit={async (data) => {
          if (editing) await updateTransaction(editing.id, data);
        }}
      />
      <DeleteTransactionDialog
        lancamento={deleting}
        onOpenChange={(open) => !open && setDeleting(null)}
        onConfirm={(lancamento) => deleteTransaction(lancamento.id)}
      />
    </Page>
  );
}
