'use client';

import { categoriaLabelKey, type Categoria } from '@/lib/finance/categories';
import { useLanguage } from '@/lib/i18n/LanguageProvider';

interface CategoryBarsProps {
  data: { categoria: Categoria; valor: number }[];
  format: (value: number) => string;
}

/**
 * Money out per category as labelled horizontal bars, largest first. One hue:
 * the bar length carries the amount, the label carries the identity.
 */
export function CategoryBars({ data, format }: CategoryBarsProps) {
  const { t, locale } = useLanguage();
  const total = data.reduce((sum, item) => sum + item.valor, 0);
  const max = Math.max(...data.map((item) => item.valor), 1);
  const percent = new Intl.NumberFormat(locale, { style: 'percent', maximumFractionDigits: 0 });

  return (
    <ul className="grid gap-4">
      {data.map((item) => (
        <li key={item.categoria} className="grid gap-1.5">
          <div className="flex items-baseline justify-between gap-3 text-sm">
            <span>{t(categoriaLabelKey(item.categoria))}</span>
            <span className="num shrink-0">
              <span className="font-medium">{format(item.valor)}</span>
              <span className="ml-2 inline-block w-9 text-right text-[13px] text-muted-foreground">
                {percent.format(total ? item.valor / total : 0)}
              </span>
            </span>
          </div>
          <div className="h-2 rounded-full bg-muted" aria-hidden="true">
            <div className="h-full rounded-full bg-series-1" style={{ width: `${(item.valor / max) * 100}%` }} />
          </div>
        </li>
      ))}
    </ul>
  );
}
