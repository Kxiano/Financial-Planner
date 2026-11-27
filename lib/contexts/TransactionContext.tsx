'use client';

import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/lib/contexts/AuthContext';
import { useLocalStorage } from '@/lib/hooks/useLocalStorage';
import { useLanguage } from '@/lib/i18n/LanguageProvider';
import { Lancamento } from '@/lib/types';

export type NovoLancamento = Omit<Lancamento, 'id' | 'userId' | 'createdAt' | 'updatedAt'>;

interface TransactionContextType {
  transactions: Lancamento[];
  isLoading: boolean;
  addTransaction: (transaction: NovoLancamento) => Promise<void>;
  updateTransaction: (id: string, transaction: Partial<Lancamento>) => Promise<void>;
  deleteTransaction: (id: string) => Promise<void>;
  refreshTransactions: () => Promise<void>;
}

const TransactionContext = createContext<TransactionContextType | undefined>(undefined);

/**
 * Guests keep their transactions in localStorage; signed-in users keep them
 * in the database. On the first sign-in, anything logged as a guest is
 * uploaded once and then cleared locally.
 */
export function TransactionProvider({ children }: { children: React.ReactNode }) {
  const { loading: isAuthLoading, isAuthenticated } = useAuth();
  const { t } = useLanguage();
  const { toast } = useToast();
  const [localTransactions, setLocalTransactions, isLocalLoaded] = useLocalStorage<Lancamento[]>('lancamentos', []);
  const [dbTransactions, setDbTransactions] = useState<Lancamento[]>([]);
  const [isDbLoading, setIsDbLoading] = useState(false);

  const notifyError = useCallback(
    (description: string) => toast({ title: t('error'), description, variant: 'destructive' }),
    [toast, t],
  );

  const fetchTransactions = useCallback(async () => {
    if (!isAuthenticated) return;
    setIsDbLoading(true);
    try {
      const res = await fetch('/api/lancamentos', { cache: 'no-store' });
      if (!res.ok) throw new Error(`GET /api/lancamentos ${res.status}`);
      setDbTransactions(await res.json());
    } catch (error) {
      console.error('Failed to fetch transactions', error);
      notifyError(t('erroAoCarregar'));
    } finally {
      setIsDbLoading(false);
    }
  }, [isAuthenticated, notifyError, t]);

  useEffect(() => {
    if (!isAuthenticated) setDbTransactions([]);
  }, [isAuthenticated]);

  // After sign-in: upload guest data if there is any, then load from the database.
  useEffect(() => {
    if (isAuthLoading || !isLocalLoaded || !isAuthenticated) return;

    const sync = async () => {
      if (localTransactions.length === 0) {
        await fetchTransactions();
        return;
      }
      toast({ title: t('syncingData'), description: t('syncingDescription') });
      try {
        const res = await fetch('/api/user/sync', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ lancamentos: localTransactions }),
        });
        if (!res.ok) throw new Error(`POST /api/user/sync ${res.status}`);
        setLocalTransactions([]);
        await fetchTransactions();
        toast({ title: t('syncSuccess'), description: t('syncSuccessDescription') });
      } catch (error) {
        console.error('Sync error:', error);
        toast({ title: t('syncError'), description: t('syncErrorDescription'), variant: 'destructive' });
      }
    };

    sync();
    // Runs once per sign-in; the local list is read at that moment on purpose.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, isAuthLoading, isLocalLoaded]);

  /** Sends a change to the API, reloads on success and reports the outcome. */
  const mutate = async (request: () => Promise<Response>, successMessage: string, failureMessage: string) => {
    try {
      const res = await request();
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        notifyError(body.error || failureMessage);
        return;
      }
      await fetchTransactions();
      toast({ title: t('success'), description: successMessage });
    } catch (error) {
      console.error(error);
      notifyError(t('networkError'));
    }
  };

  const addTransaction = async (data: NovoLancamento) => {
    if (!isAuthenticated) {
      const now = new Date().toISOString();
      setLocalTransactions((prev) => [
        { ...data, id: crypto.randomUUID(), userId: 'guest', createdAt: now, updatedAt: now },
        ...prev,
      ]);
      return;
    }
    await mutate(
      () =>
        fetch('/api/lancamentos', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        }),
      t('transactionAdded'),
      t('errorSaving'),
    );
  };

  const updateTransaction = async (id: string, data: Partial<Lancamento>) => {
    if (!isAuthenticated) {
      setLocalTransactions((prev) =>
        prev.map((l) => (l.id === id ? { ...l, ...data, updatedAt: new Date().toISOString() } : l)),
      );
      return;
    }
    await mutate(
      () =>
        fetch(`/api/lancamentos/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        }),
      t('transactionUpdated'),
      t('errorUpdating'),
    );
  };

  const deleteTransaction = async (id: string) => {
    if (!isAuthenticated) {
      setLocalTransactions((prev) => prev.filter((l) => l.id !== id));
      return;
    }
    await mutate(() => fetch(`/api/lancamentos/${id}`, { method: 'DELETE' }), t('transactionDeleted'), t('errorDeleting'));
  };

  const refreshTransactions = async () => {
    await fetchTransactions();
  };

  const transactions = isAuthenticated ? dbTransactions : localTransactions;
  const isLoading = isAuthLoading || !isLocalLoaded || (isAuthenticated && isDbLoading);

  return (
    <TransactionContext.Provider
      value={{ transactions, isLoading, addTransaction, updateTransaction, deleteTransaction, refreshTransactions }}
    >
      {children}
    </TransactionContext.Provider>
  );
}

export function useTransactions() {
  const context = useContext(TransactionContext);
  if (context === undefined) {
    throw new Error('useTransactions must be used within a TransactionProvider');
  }
  return context;
}
