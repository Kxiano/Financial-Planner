'use client';

import { useEffect, useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Segmented } from '@/components/ui/segmented';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useTransactions, type NovoLancamento } from '@/lib/contexts/TransactionContext';
import { categoriaLabelKey, CATEGORIAS_POR_TIPO, currentMonth, type Categoria, type Tipo } from '@/lib/finance/categories';
import { useLanguage } from '@/lib/i18n/LanguageProvider';
import { useCurrencyStore } from '@/lib/store/currencyStore';
import { currencies, type Currency, type Lancamento } from '@/lib/types';

interface FormState {
  data: string;
  tipo: Tipo;
  categoria: Categoria;
  descricao: string;
  valor: string;
  currency: Currency;
}

const capitalize = (text: string) => text.charAt(0).toUpperCase() + text.slice(1);

interface TransactionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Pass a transaction to edit it; leave out to add a new one. */
  lancamento?: Lancamento | null;
  onSubmit: (data: NovoLancamento) => Promise<void> | void;
}

/** The one form for adding and editing a transaction. */
export function TransactionDialog({ open, onOpenChange, lancamento, onSubmit }: TransactionDialogProps) {
  const { t } = useLanguage();
  const userCurrency = useCurrencyStore((state) => state.currency);
  const exchangeRates = useCurrencyStore((state) => state.exchangeRates);
  const isEditing = !!lancamento;

  const initialState = (): FormState =>
    lancamento
      ? {
          data: lancamento.data,
          tipo: lancamento.tipo,
          categoria: lancamento.categoria,
          descricao: lancamento.descricao,
          valor: String(lancamento.valor),
          currency: lancamento.currency || 'BRL',
        }
      : { data: currentMonth(), tipo: 'saida', categoria: 'gasto_variavel', descricao: '', valor: '', currency: userCurrency };

  const [form, setForm] = useState<FormState>(initialState);
  const [error, setError] = useState(false);
  const [saving, setSaving] = useState(false);

  // Start from a clean form (or the transaction being edited) each time it opens.
  useEffect(() => {
    if (open) {
      setForm(initialState());
      setError(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, lancamento]);

  const update = (patch: Partial<FormState>) => setForm((current) => ({ ...current, ...patch }));

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const valor = parseFloat(form.valor);
    if (!form.descricao.trim() || !Number.isFinite(valor) || valor <= 0) {
      setError(true);
      return;
    }
    setSaving(true);
    await onSubmit({
      data: form.data,
      tipo: form.tipo,
      categoria: form.categoria,
      descricao: capitalize(form.descricao.trim()),
      valor,
      currency: form.currency,
      exchangeRate: exchangeRates?.rates[form.currency] || 1,
    });
    setSaving(false);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[480px]">
        <form onSubmit={handleSubmit} noValidate className="grid gap-5">
          <DialogHeader>
            <DialogTitle>{isEditing ? t('editarLancamento') : t('adicionarLancamento')}</DialogTitle>
            <DialogDescription>{isEditing ? t('atualizeDados') : t('registreEntradaSaida')}</DialogDescription>
          </DialogHeader>

          <Segmented
            label={t('tipo')}
            value={form.tipo}
            onChange={(tipo) => update({ tipo, categoria: CATEGORIAS_POR_TIPO[tipo][0] })}
            options={[
              { value: 'saida', label: t('saida') },
              { value: 'entrada', label: t('entrada') },
            ]}
            className="grid grid-cols-2"
          />

          <div className="grid gap-2">
            <Label htmlFor="tx-descricao">{t('descricao')}</Label>
            <Input
              id="tx-descricao"
              value={form.descricao}
              onChange={(e) => update({ descricao: e.target.value })}
              placeholder={t('descricaoPlaceholder')}
              autoComplete="off"
              aria-invalid={error && !form.descricao.trim()}
            />
          </div>

          <div className="grid grid-cols-[1fr_7.5rem] gap-3">
            <div className="grid gap-2">
              <Label htmlFor="tx-valor">{t('valor')}</Label>
              <Input
                id="tx-valor"
                type="number"
                inputMode="decimal"
                min="0"
                step="0.01"
                placeholder="0.00"
                value={form.valor}
                onChange={(e) => update({ valor: e.target.value })}
                aria-invalid={error && !(parseFloat(form.valor) > 0)}
                className="num"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="tx-currency">{t('moeda')}</Label>
              <Select value={form.currency} onValueChange={(value) => update({ currency: value as Currency })}>
                <SelectTrigger id="tx-currency" className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {currencies.map((c) => (
                    <SelectItem key={c.code} value={c.code}>
                      {c.code}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="tx-categoria">{t('categoria')}</Label>
              <Select value={form.categoria} onValueChange={(value) => update({ categoria: value as Categoria })}>
                <SelectTrigger id="tx-categoria" className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIAS_POR_TIPO[form.tipo].map((categoria) => (
                    <SelectItem key={categoria} value={categoria}>
                      {t(categoriaLabelKey(categoria, form.tipo))}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="tx-data">{t('mesAno')}</Label>
              <Input
                id="tx-data"
                type="month"
                value={form.data}
                onChange={(e) => update({ data: e.target.value })}
                required
              />
            </div>
          </div>

          {error && (
            <p role="alert" className="text-sm text-negative">
              {t('camposObrigatorios')}
            </p>
          )}

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              {t('cancelar')}
            </Button>
            <Button type="submit" disabled={saving}>
              {isEditing ? t('salvar') : t('adicionarLancamento')}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

/** The main action of the app: opens the form and saves a new transaction. */
export function AddTransactionButton() {
  const { t } = useLanguage();
  const { addTransaction } = useTransactions();
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>
        <Plus />
        {t('novoLancamento')}
      </Button>
      <TransactionDialog open={open} onOpenChange={setOpen} onSubmit={addTransaction} />
    </>
  );
}

interface DeleteTransactionDialogProps {
  lancamento: Lancamento | null;
  onOpenChange: (open: boolean) => void;
  onConfirm: (lancamento: Lancamento) => Promise<void> | void;
}

export function DeleteTransactionDialog({ lancamento, onOpenChange, onConfirm }: DeleteTransactionDialogProps) {
  const { t } = useLanguage();

  return (
    <Dialog open={!!lancamento} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[420px]">
        <DialogHeader>
          <DialogTitle>{t('excluirLancamento')}</DialogTitle>
          <DialogDescription>
            {lancamento && <span className="font-medium text-foreground">{lancamento.descricao}. </span>}
            {t('excluirDescricao')}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            {t('cancelar')}
          </Button>
          <Button
            variant="destructive"
            onClick={async () => {
              if (lancamento) await onConfirm(lancamento);
              onOpenChange(false);
            }}
          >
            {t('excluir')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
