import { cn } from '@/lib/utils';

/** The mark: three rising bars, and the product name beside it. */
export function Logo({ name, className }: { name: string; className?: string }) {
  return (
    <span className={cn('inline-flex items-center gap-2.5 text-lg font-medium tracking-tight', className)}>
      <svg viewBox="0 0 24 24" className="size-6 text-brand" aria-hidden="true">
        <rect x="3" y="13" width="4" height="8" rx="1" fill="currentColor" opacity="0.45" />
        <rect x="10" y="8" width="4" height="13" rx="1" fill="currentColor" opacity="0.7" />
        <rect x="17" y="3" width="4" height="18" rx="1" fill="currentColor" />
      </svg>
      {name}
    </span>
  );
}
