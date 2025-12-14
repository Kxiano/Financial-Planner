
'use client';

import * as React from 'react';
import { Check, ChevronsUpDown, RefreshCw } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useCurrencyStore } from '@/lib/store/currencyStore';
import { currencies, Currency } from '@/lib/types';
import { useEffect } from 'react';
import { useLanguage } from '@/lib/hooks/useLanguage';

export function CurrencySelector() {
  const [open, setOpen] = React.useState(false);
  const { currency, setCurrency, fetchRates, exchangeRates, isLoading, lastFetchTimestamp } = useCurrencyStore();
  const { t } = useLanguage();

  // Initial fetch on mount
  useEffect(() => {
    fetchRates();
  }, [fetchRates]);

  const handleRefresh = (e: React.MouseEvent) => {
    e.stopPropagation();
    fetchRates();
  };

  const formatLastUpdate = () => {
    if (!lastFetchTimestamp) return '';
    const date = new Date(lastFetchTimestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          <span className="flex items-center gap-2 text-ellipsis overflow-hidden">
             <span className="text-base">
                {currencies.find((c) => c.code === currency)?.flag}
            </span>
            <span className="truncate">
                 {currencies.find((c) => c.code === currency)?.name}
            </span>
          </span>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[220px] p-0">
        <div className="flex flex-col">
          <div className="flex items-center justify-between p-2 border-b">
             <span className="text-xs text-muted-foreground px-2">
                {t('moeda') || 'Currency'}
             </span>
             <Button
                variant="ghost"
                size="sm"
                onClick={handleRefresh}
                disabled={isLoading}
                className="h-6 w-6 p-0"
             >
                <RefreshCw className={cn('h-3 w-3', isLoading && 'animate-spin')} />
             </Button>
          </div>
          <div className="p-1">
             {currencies.map((c) => (
                <Button
                  key={c.code}
                  variant="ghost"
                  className={cn(
                    "w-full justify-start font-normal",
                    currency === c.code && "bg-accent"
                  )}
                  onClick={() => {
                    setCurrency(c.code as Currency);
                    setOpen(false);
                    fetchRates();
                  }}
                >
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4',
                      currency === c.code ? 'opacity-100' : 'opacity-0'
                    )}
                  />
                  <span className="mr-2 text-lg">{c.flag}</span>
                  {c.name} ({c.code})
                </Button>
             ))}
          </div>
          {exchangeRates && (
            <div className="p-2 border-t bg-muted/50">
              <p className="text-[10px] text-muted-foreground text-center">
                 Updated: {formatLastUpdate()}
              </p>
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
