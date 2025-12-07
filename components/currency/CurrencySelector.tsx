// components/currency/CurrencySelector.tsx

'use client';

import { Check, ChevronsUpDown, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { currencies, Currency } from '@/lib/types';
import { useCurrency } from '@/lib/contexts/CurrencyContext';
import { useLanguage } from '@/lib/hooks/useLanguage';
import { useState } from 'react';

export function CurrencySelector() {
  const [open, setOpen] = useState(false);
  const { currency, setCurrency, exchangeRates, refreshRates, loading } = useCurrency();
  const { t } = useLanguage();

  const handleSelect = (selectedCurrency: Currency) => {
    setCurrency(selectedCurrency);
    setOpen(false);
  };

  const handleRefresh = async (e: React.MouseEvent) => {
    e.stopPropagation();
    await refreshRates();
  };

  const selectedCurrencyData = currencies.find((c) => c.code === currency);

  const formatLastUpdate = () => {
    if (!exchangeRates) return '';
    const date = new Date(exchangeRates.timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          <span className="flex items-center gap-2">
            <span>{selectedCurrencyData?.symbol} {currency}</span>
          </span>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <div className="p-2">
          <div className="flex items-center justify-between mb-2 px-2">
            <span className="text-xs text-muted-foreground">
              {t('selecioneMoeda')}
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleRefresh}
              disabled={loading}
              className="h-6 w-6 p-0"
            >
              <RefreshCw className={cn('h-3 w-3', loading && 'animate-spin')} />
            </Button>
          </div>
          <div className="space-y-1">
            {currencies.map((curr) => (
              <Button
                key={curr.code}
                variant="ghost"
                className={cn(
                  'w-full justify-start font-normal',
                  currency === curr.code && 'bg-accent'
                )}
                onClick={() => handleSelect(curr.code)}
              >
                <Check
                  className={cn(
                    'mr-2 h-4 w-4',
                    currency === curr.code ? 'opacity-100' : 'opacity-0'
                  )}
                />
                <span className="flex-1 text-left">
                  {curr.symbol} {curr.code}
                </span>
              </Button>
            ))}
          </div>
          {exchangeRates && (
            <div className="mt-2 pt-2 border-t">
              <p className="text-xs text-muted-foreground px-2">
                {t('ultimaAtualizacao')}: {formatLastUpdate()}
              </p>
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
