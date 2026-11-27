'use client';

/*
 * Shared pieces for every chart: recessive axes and grid, one tooltip, one
 * legend. Series colours come from the --series-* tokens (validated for
 * colour-blind separation in both themes); text always uses the text tokens.
 */

export const SERIES = ['var(--series-1)', 'var(--series-2)'] as const;

export const axisProps = {
  tick: { fill: 'var(--muted-foreground)', fontSize: 13 },
  axisLine: false,
  tickLine: false,
} as const;

export const gridProps = {
  vertical: false,
  stroke: 'var(--border)',
} as const;

interface TooltipEntry {
  dataKey?: string | number;
  name?: string | number;
  value?: number | string;
  color?: string;
}

interface ChartTooltipProps {
  active?: boolean;
  payload?: TooltipEntry[];
  label?: string | number;
  format: (value: number) => string;
  /** Adds a total row under the series: used by stacked charts. */
  totalLabel?: string;
}

export function ChartTooltip({ active, payload, label, format, totalLabel }: ChartTooltipProps) {
  if (!active || !payload?.length) return null;
  const total = payload.reduce((sum, entry) => sum + Number(entry.value ?? 0), 0);

  return (
    <div className="min-w-44 rounded-md border bg-popover px-3 py-2 text-[13px] shadow-lg">
      <p className="mb-1.5 font-medium">{label}</p>
      <ul className="grid gap-1">
        {payload.map((entry) => (
          <li key={String(entry.dataKey)} className="flex items-center justify-between gap-4">
            <span className="flex items-center gap-2 text-muted-foreground">
              <span className="size-2 rounded-[2px]" style={{ background: entry.color }} aria-hidden="true" />
              {entry.name}
            </span>
            <span className="num font-medium">{format(Number(entry.value ?? 0))}</span>
          </li>
        ))}
        {totalLabel && (
          <li className="mt-1 flex items-center justify-between gap-4 border-t pt-1.5">
            <span className="text-muted-foreground">{totalLabel}</span>
            <span className="num font-medium">{format(total)}</span>
          </li>
        )}
      </ul>
    </div>
  );
}

export function ChartLegend({ items }: { items: { label: string; color: string }[] }) {
  return (
    <ul className="flex flex-wrap gap-x-4 gap-y-1 text-[13px] text-muted-foreground">
      {items.map((item) => (
        <li key={item.label} className="flex items-center gap-2">
          <span className="size-2 rounded-[2px]" style={{ background: item.color }} aria-hidden="true" />
          {item.label}
        </li>
      ))}
    </ul>
  );
}
