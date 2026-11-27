import * as React from 'react';

import { cn } from '@/lib/utils';

/** The one card of the app: a flat surface with a hairline, never nested. */
export function Panel({ className, ...props }: React.ComponentProps<'section'>) {
  return <section className={cn('rounded-lg border bg-card p-5 md:p-6', className)} {...props} />;
}

interface PanelHeaderProps {
  title: string;
  description?: string;
  /** Controls or a link, aligned to the right of the title. */
  action?: React.ReactNode;
  className?: string;
}

export function PanelHeader({ title, description, action, className }: PanelHeaderProps) {
  return (
    <div className={cn('mb-5 flex flex-wrap items-start justify-between gap-x-4 gap-y-2', className)}>
      <div>
        <h2 className="text-base font-medium">{title}</h2>
        {description && <p className="mt-1 text-sm text-muted-foreground">{description}</p>}
      </div>
      {action}
    </div>
  );
}

interface PageHeaderProps {
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export function PageHeader({ title, description, action }: PageHeaderProps) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 className="text-2xl md:text-[28px]">{title}</h1>
        {description && <p className="mt-1 text-sm text-muted-foreground first-letter:uppercase">{description}</p>}
      </div>
      {action}
    </div>
  );
}

/** The page column: every screen shares the same edges and rhythm. */
export function Page({ className, ...props }: React.ComponentProps<'div'>) {
  return <div className={cn('mx-auto flex w-full max-w-[1200px] flex-col gap-6 px-4 py-6 md:px-8 md:py-8', className)} {...props} />;
}

export function PageLoading({ label }: { label: string }) {
  return (
    <Page aria-busy="true">
      <span className="sr-only">{label}</span>
      <div className="h-9 w-48 animate-pulse rounded-md bg-muted" />
      <div className="h-64 animate-pulse rounded-lg bg-muted" />
      <div className="h-40 animate-pulse rounded-lg bg-muted" />
    </Page>
  );
}

export function EmptyState({ title, description, action }: { title: string; description?: string; action?: React.ReactNode }) {
  return (
    <Panel className="flex flex-col items-start gap-4 py-12 md:px-10">
      <div>
        <h2 className="text-lg font-medium">{title}</h2>
        {description && <p className="mt-1 max-w-prose text-muted-foreground">{description}</p>}
      </div>
      {action}
    </Panel>
  );
}
