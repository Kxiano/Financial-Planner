// components/lancamentos/EditLancamentoDialog.tsx

'use client';

import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Lancamento, Currency, currencies } from '@/lib/types';
import { useLanguage } from '@/lib/hooks/useLanguage';
import { useCurrencyStore } from '@/lib/store/currencyStore';

// Helper function to capitalize first letter
const capitalizeFirstLetter = (text: string): string => {
  if (!text) return text;
  return text.charAt(0).toUpperCase() + text.slice(1);
};

interface EditLancamentoDialogProps {
  lancamento: Lancamento;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onEdit: (lancamento: Lancamento) => void;
}

export function EditLancamentoDialog({ lancamento, open, onOpenChange, onEdit }: EditLancamentoDialogProps) {
  const { t } = useLanguage();
  const { exchangeRates } = useCurrencyStore();
  const [formData, setFormData] = useState<{
    data: string;
    tipo: 'entrada' | 'saida';
    categoria: Lancamento['categoria'];
    descricao: string;
    valor: string;
    currency: Currency;
  }>({
    data: lancamento.data,
    tipo: lancamento.tipo,
    categoria: lancamento.categoria,
    descricao: lancamento.descricao,
    valor: lancamento.valor.toString(),
    currency: lancamento.currency || 'BRL',
  });

  // Update form data when lancamento changes
  useEffect(() => {
    setFormData({
      data: lancamento.data,
      tipo: lancamento.tipo,
      categoria: lancamento.categoria,
      descricao: lancamento.descricao,
      valor: lancamento.valor.toString(),
      currency: lancamento.currency || 'BRL',
    });
  }, [lancamento]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.descricao || !formData.valor) {
      alert('Preencha todos os campos obrigatórios');
      return;
    }

    // Get current exchange rate for the selected currency
    const currentRate = exchangeRates?.rates[formData.currency] || 1;

    onEdit({
      ...lancamento,
      data: formData.data,
      tipo: formData.tipo,
      categoria: formData.categoria,
      descricao: capitalizeFirstLetter(formData.descricao),
      valor: parseFloat(formData.valor),
      currency: formData.currency,
      exchangeRate: currentRate,
    });

    onOpenChange(false);
  };

  const categoriasPorTipo = {
    entrada: [
      { value: 'income', label: t('receitaSalario') },
      { value: 'investimento', label: t('retornoInvestimento') },
    ],
    saida: [
      { value: 'gasto_fixo', label: t('gastoFixo') },
      { value: 'gasto_variavel', label: t('gastoVariavel') },
      { value: 'investimento', label: t('investimento') },
      { value: 'fundo_emergencia', label: t('fundoEmergenciaCategoria') },
      { value: 'divida', label: t('pagamentoDivida') },
    ],
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>{t('editarLancamento') || 'Editar Lançamento'}</DialogTitle>
            <DialogDescription>
              {t('atualizeDados') || 'Atualize os dados do lançamento'}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="data">{t('mesAno')}</Label>
              <Input
                id="data"
                type="month"
                value={formData.data}
                onChange={(e) => setFormData({ ...formData, data: e.target.value })}
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="tipo">{t('tipo')}</Label>
              <Select
                value={formData.tipo}
                onValueChange={(value: 'entrada' | 'saida') => {
                  setFormData({
                    ...formData,
                    tipo: value,
                    categoria: value === 'entrada' ? 'income' : 'gasto_fixo',
                  });
                }}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="entrada">{t('entrada')}</SelectItem>
                  <SelectItem value="saida">{t('saida')}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="categoria">{t('categoria')}</Label>
              <Select
                value={formData.categoria}
                onValueChange={(value) =>
                  setFormData({ ...formData, categoria: value as Lancamento['categoria'] })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categoriasPorTipo[formData.tipo].map((cat) => (
                    <SelectItem key={cat.value} value={cat.value}>
                      {cat.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="descricao">{t('descricao')}</Label>
              <Input
                id="descricao"
                placeholder="Ex: Salário, Aluguel, Supermercado..."
                value={formData.descricao}
                onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="currency">{t('moeda')}</Label>
              <Select
                value={formData.currency}
                onValueChange={(value: Currency) =>
                  setFormData({ ...formData, currency: value })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {currencies.map((curr) => (
                    <SelectItem key={curr.code} value={curr.code}>
                      {curr.symbol} {curr.code}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="valor">{t('valor')}</Label>
              <Input
                id="valor"
                type="number"
                step="0.01"
                placeholder="0.00"
                value={formData.valor}
                onChange={(e) => setFormData({ ...formData, valor: e.target.value })}
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              {t('cancelar')}
            </Button>
            <Button type="submit">{t('salvar') || 'Salvar'}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
