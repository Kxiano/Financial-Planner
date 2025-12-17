'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { useAuth } from '@/lib/contexts/AuthContext';
import { useLocalStorage } from '@/lib/hooks/useLocalStorage';
import { Lancamento } from '@/lib/types';
import { useToast } from '@/components/ui/use-toast';

interface TransactionContextType {
  transactions: Lancamento[];
  isLoading: boolean;
  addTransaction: (transaction: Omit<Lancamento, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updateTransaction: (id: string, transaction: Partial<Lancamento>) => Promise<void>;
  deleteTransaction: (id: string) => Promise<void>;
  refreshTransactions: () => Promise<void>;
}

const TransactionContext = createContext<TransactionContextType | undefined>(undefined);

export function TransactionProvider({ children }: { children: React.ReactNode }) {
  const { user, loading: isAuthLoading, isAuthenticated, isGuest } = useAuth();
  const [localTransactions, setLocalTransactions] = useLocalStorage<Lancamento[]>('lancamentos', []);
  const [dbTransactions, setDbTransactions] = useState<Lancamento[]>([]);
  const [isDbLoading, setIsDbLoading] = useState(false);
  const { toast } = useToast();

  // Clear DB data on logout
  useEffect(() => {
    if (!isAuthenticated) {
      setDbTransactions([]);
    }
  }, [isAuthenticated]);

  // Fetch from DB
  const fetchTransactions = useCallback(async () => {
    if (!isAuthenticated) return;
    setIsDbLoading(true);
    try {
      const res = await fetch('/api/lancamentos', { cache: 'no-store' });
      if (res.ok) {
        const data = await res.json();
        setDbTransactions(data);
      }
    } catch (error) {
      console.error('Failed to fetch transactions', error);
      toast({
        title: "Erro",
        description: "Falha ao carregar transações.",
        variant: "destructive",
      });
    } finally {
      setIsDbLoading(false);
    }
  }, [isAuthenticated, toast]);

  // Sync Logic
  useEffect(() => {
    const syncData = async () => {
      // Only sync if user is logged in (authenticated) and there is local data
      if (isAuthenticated && localTransactions.length > 0) {
        try {
          toast({ title: "Sincronizando dados...", description: "Passando seus dados locais para a nuvem." });
          
          const res = await fetch('/api/user/sync', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ lancamentos: localTransactions }),
          });

          if (res.ok) {
            // Clear local storage after successful sync
            setLocalTransactions([]);
            await fetchTransactions(); // Refresh DB data
            toast({ title: "Sucesso!", description: "Dados sincronizados com sucesso." });
          } else {
             console.error('Sync failed');
             toast({ title: "Erro na sincronização", description: "Não foi possível salvar seus dados locais.", variant: "destructive" });
          }
        } catch (error) {
          console.error('Sync error:', error);
        }
      } else if (isAuthenticated && localTransactions.length === 0) {
         // Just fetch if no local data to sync
         fetchTransactions();
      }
    };

    if (!isAuthLoading) {
      syncData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, isAuthLoading]); // user -> isAuthenticated

  // CRUD Operations
  const addTransaction = async (data: Omit<Lancamento, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (!isAuthenticated) {
      const newTransaction: Lancamento = {
        ...data,
        id: crypto.randomUUID(),
        userId: 'guest',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      setLocalTransactions((prev) => [newTransaction, ...prev]);
    } else {
      try {
        const res = await fetch('/api/lancamentos', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
        if (res.ok) {
          await fetchTransactions();
          toast({ title: "Sucesso", description: "Lançamento adicionado." });
        } else {
             const errorData = await res.json().catch(() => ({}));
             toast({ 
                 title: "Erro", 
                 description: errorData.error || "Erro ao salvar lançamento.", 
                 variant: "destructive" 
             });
        }
      } catch (error) {
        console.error(error);
        toast({ title: "Erro", description: "Falha de rede ou servidor.", variant: "destructive" });
      }
    }
  };

  const updateTransaction = async (id: string, data: Partial<Lancamento>) => {
    if (!isAuthenticated) {
      setLocalTransactions((prev) => prev.map(t => t.id === id ? { ...t, ...data } : t));
    } else {
      try {
        const res = await fetch(`/api/lancamentos/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
        if (res.ok) {
          await fetchTransactions();
          toast({ title: "Sucesso", description: "Lançamento atualizado." });
        }
      } catch (error) {
          console.error(error);
          toast({ title: "Erro", description: "Falha ao atualizar.", variant: "destructive" });
      }
    }
  };

  const deleteTransaction = async (id: string) => {
    if (!isAuthenticated) {
      setLocalTransactions((prev) => prev.filter(t => t.id !== id));
    } else {
      try {
        const res = await fetch(`/api/lancamentos/${id}`, {
          method: 'DELETE',
        });
        if (res.ok) {
           await fetchTransactions();
           toast({ title: "Sucesso", description: "Lançamento removido." });
        }
      } catch (error) {
         console.error(error);
         toast({ title: "Erro", description: "Falha ao remover.", variant: "destructive" });
      }
    }
  };

  const refreshTransactions = async () => {
    if (isAuthenticated) await fetchTransactions();
  };

  const transactions = !isAuthenticated ? localTransactions : dbTransactions;
  const isLoading = isAuthLoading || (isAuthenticated && isDbLoading);

  return (
    <TransactionContext.Provider value={{
      transactions,
      isLoading,
      addTransaction,
      updateTransaction,
      deleteTransaction,
      refreshTransactions
    }}>
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
