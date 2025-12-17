'use client';

import { useAuth } from '@/lib/contexts/AuthContext';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { useTransactions } from '@/lib/contexts/TransactionContext';

export function GuestWarning() {
  const { isAuthenticated, loading } = useAuth();
  const { transactions } = useTransactions();

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
        <AlertTitle>Modo Convidado</AlertTitle>
        <AlertDescription className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <span>
                Seu progresso não está salvo permanentemente. Se você sair desta página, poderá perder seus dados.
                Crie uma conta para salvar e sincronizar seus lançamentos.
            </span>
            <Button variant="outline" size="sm" asChild className="whitespace-nowrap bg-background text-foreground hover:bg-accent">
                <a href="/api/auth/login">Criar Conta / Login</a>
            </Button>
        </AlertDescription>
        </Alert>
    </div>
  );
}
