'use client';

import { Pencil, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { categoriaLabelKey, formatMonth } from '@/lib/finance/categories';
import { useLanguage } from '@/lib/i18n/LanguageProvider';
import type { Lancamento } from '@/lib/types';
import { cn } from '@/lib/utils';

interface AmountProps {
  tipo: Lancamento['tipo'];
  valor: number;
  format: (value: number) => string;
  className?: string;
}

/** Money in is green with a plus; money out stays in the text colour with a minus. */
export function Amount({ tipo, valor, format, className }: AmountProps) {
  return (
    <span className={cn('num font-medium whitespace-nowrap', tipo === 'entrada' && 'text-positive', className)}>
      {tipo === 'entrada' ? '+' : '−'}
      {format(valor)}
    </span>
  );
}

interface TransactionsTableProps {
  /** Amounts already converted to the display currency. */
  lancamentos: Lancamento[];
  format: (value: number) => string;
  onEdit?: (lancamento: Lancamento) => void;
  onDelete?: (lancamento: Lancamento) => void;
}

/** Transactions as rows. On phones the month and category move under the description. */
export function TransactionsTable({ lancamentos, format, onEdit, onDelete }: TransactionsTableProps) {
  const { t, locale } = useLanguage();
  const hasActions = !!onEdit || !!onDelete;

  return (
    <Table>
      <TableHeader>
        <TableRow className="hover:bg-transparent">
          <TableHead className="hidden w-40 sm:table-cell">{t('data')}</TableHead>
          <TableHead>{t('descricao')}</TableHead>
          <TableHead className="hidden md:table-cell">{t('categoria')}</TableHead>
          <TableHead className="text-right">{t('valor')}</TableHead>
          {hasActions && <TableHead className="w-24 text-right">{t('acoes')}</TableHead>}
        </TableRow>
      </TableHeader>
      <TableBody>
        {lancamentos.map((lancamento) => {
          const categoria = t(categoriaLabelKey(lancamento.categoria, lancamento.tipo));
          const mes = formatMonth(lancamento.data, locale);
          return (
            <TableRow key={lancamento.id}>
              <TableCell className="hidden text-muted-foreground first-letter:uppercase sm:table-cell">{mes}</TableCell>
              <TableCell>
                <span className="font-medium">{lancamento.descricao}</span>
                <span className="mt-0.5 block text-[13px] text-muted-foreground md:hidden">
                  <span className="sm:hidden">{mes} · </span>
                  {categoria}
                </span>
              </TableCell>
              <TableCell className="hidden text-muted-foreground md:table-cell">{categoria}</TableCell>
              <TableCell className="text-right">
                <Amount tipo={lancamento.tipo} valor={lancamento.valor} format={format} />
              </TableCell>
              {hasActions && (
                <TableCell className="text-right">
                  <div className="flex justify-end gap-1">
                    {onEdit && (
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        onClick={() => onEdit(lancamento)}
                        aria-label={`${t('editar')}: ${lancamento.descricao}`}
                      >
                        <Pencil />
                      </Button>
                    )}
                    {onDelete && (
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        onClick={() => onDelete(lancamento)}
                        aria-label={`${t('excluir')}: ${lancamento.descricao}`}
                      >
                        <Trash2 />
                      </Button>
                    )}
                  </div>
                </TableCell>
              )}
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
