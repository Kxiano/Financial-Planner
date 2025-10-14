// components/lancamentos/AddLancamentoDialog.tsx

'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
import { PlusCircle } from 'lucide-react';
import { Lancamento } from '@/lib/types';
import { useLanguage } from '@/lib/hooks/useLanguage';

interface AddLancamentoDialogProps {
  onAdd: (lancamento: Omit<Lancamento, 'id'>) => void;
}

export function AddLancamentoDialog({ onAdd }: AddLancamentoDialogProps) {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    data: new Date().toISOString().slice(0, 7),
    tipo: 'entrada' as 'entrada' | 'saida',
    categoria: 'income' as Lancamento['categoria'],
    descricao: '',
    valor: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.descricao || !formData.valor) {
      alert('Preencha todos os campos obrigatórios');
      return;
    }

    onAdd({
      data: formData.data,
      tipo: formData.tipo,
      categoria: formData.categoria,
      descricao: formData.descricao,
      valor: parseFloat(formData.valor),
    });

    setFormData({
      data: new Date().toISOString().slice(0, 7),
      tipo: 'entrada',
      categoria: 'income',
      descricao: '',
      valor: '',
    });
    
    setOpen(false);
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
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          {t('novoLancamento')}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>{t('adicionarLancamento')}</DialogTitle>
            <DialogDescription>
              {t('registreEntradaSaida')}
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
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              {t('cancelar')}
            </Button>
            <Button type="submit">{t('adicionar')}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
