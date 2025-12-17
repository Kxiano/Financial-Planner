'use client';

import { useAuth } from '@/lib/contexts/AuthContext';
import { useLanguage } from '@/lib/hooks/useLanguage';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { useTransactions } from '@/lib/contexts/TransactionContext';

export function GuestWarning() {
  const { isAuthenticated, loading } = useAuth();
  const { transactions } = useTransactions();
  const { t } = useLanguage();

  if (loading || isAuthenticated) {
    return null;
  }

  if (transactions.length === 0) {
      return null;
  }

  return (
    <div className="p-4">
        <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>{t('guestWarningTitle')}</AlertTitle>
        <AlertDescription className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <span>
                {t('guestWarningDescription')}
            </span>
            <Button variant="outline" size="sm" asChild className="whitespace-nowrap bg-background text-foreground hover:bg-accent">
                <a href="/api/auth/login">{t('createAccountButton')} / {t('fazerLogin')}</a>
            </Button>
        </AlertDescription>
        </Alert>
    </div>
  );
}

