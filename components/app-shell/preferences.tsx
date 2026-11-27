'use client';

import { useEffect } from 'react';
import { Moon, RefreshCw, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useLanguage } from '@/lib/i18n/LanguageProvider';
import { languages, type Language } from '@/lib/i18n/translations';
import { useCurrencyStore } from '@/lib/store/currencyStore';
import { currencies, type Currency } from '@/lib/types';
import { cn } from '@/lib/utils';

/** Currency, language and theme: the three settings the app has. */
export function Preferences() {
  const { t, language, setLanguage } = useLanguage();
  const { resolvedTheme, setTheme } = useTheme();
  const currency = useCurrencyStore((state) => state.currency);
  const setCurrency = useCurrencyStore((state) => state.setCurrency);
  const fetchRates = useCurrencyStore((state) => state.fetchRates);
  const refreshRates = useCurrencyStore((state) => state.refreshRates);
  const isLoadingRates = useCurrencyStore((state) => state.isLoading);

  useEffect(() => {
    fetchRates();
  }, [fetchRates]);

  const isDark = resolvedTheme === 'dark';

  return (
    <div className="grid gap-3">
      <div className="grid gap-1.5">
        <Label htmlFor="pref-currency" className="text-[13px] text-muted-foreground">
          {t('moeda')}
        </Label>
        <div className="flex gap-2">
          <Select value={currency} onValueChange={(value) => setCurrency(value as Currency)}>
            <SelectTrigger id="pref-currency" className="h-10 w-full min-w-0">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {currencies.map((c) => (
                <SelectItem key={c.code} value={c.code}>
                  <span className="num w-9 text-muted-foreground">{c.code}</span>
                  {c.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button
            variant="outline"
            size="icon"
            onClick={() => refreshRates()}
            disabled={isLoadingRates}
            aria-label={t('atualizarTaxas')}
            title={t('atualizarTaxas')}
          >
            <RefreshCw className={cn(isLoadingRates && 'animate-spin')} />
          </Button>
        </div>
      </div>

      <div className="grid gap-1.5">
        <Label htmlFor="pref-language" className="text-[13px] text-muted-foreground">
          {t('idioma')}
        </Label>
        <div className="flex gap-2">
          <Select value={language} onValueChange={(value) => setLanguage(value as Language)}>
            <SelectTrigger id="pref-language" className="h-10 w-full min-w-0">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {languages.map((lang) => (
                <SelectItem key={lang.code} value={lang.code}>
                  {lang.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setTheme(isDark ? 'light' : 'dark')}
            aria-label={`${t('tema')}: ${isDark ? t('escuro') : t('claro')}`}
            title={t('tema')}
          >
            {isDark ? <Moon /> : <Sun />}
          </Button>
        </div>
      </div>
    </div>
  );
}
