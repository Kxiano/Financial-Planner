// lib/hooks/useLancamentos.ts

'use client';

import { useState, useEffect } from 'react';
import { Lancamento } from '../types';
import { useAuth } from '../contexts/AuthContext';
import { useLocalStorage } from './useLocalStorage';

export function useLancamentos() {
  const { isAuthenticated, isGuest } = useAuth();
  const [localLancamentos, setLocalLancamentos, isLocalLoaded] = useLocalStorage<Lancamento[]>('lancamentos', []);
  const [dbLancamentos, setDbLancamentos] = useState<Lancamento[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [syncing, setSyncing] = useState(false);

  // Fetch from database for authenticated users
  useEffect(() => {
    if (isAuthenticated) {
      fetchFromDatabase();
    } else if (isLocalLoaded) {
      setLoading(false);
    }
  }, [isAuthenticated, isLocalLoaded]);

  const fetchFromDatabase = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/lancamentos');
      
      if (response.ok) {
        const data = await response.json();
        setDbLancamentos(data);
        setError(null);
      } else {
        throw new Error('Failed to fetch lancamentos');
      }
    } catch (err) {
      setError('Error loading data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const syncGuestData = async () => {
    if (!isAuthenticated || localLancamentos.length === 0) return;

    try {
      setSyncing(true);
      const response = await fetch('/api/users/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lancamentos: localLancamentos }),
      });

      if (response.ok) {
        // Clear local storage after successful sync
        setLocalLancamentos([]);
        // Refresh from database
        await fetchFromDatabase();
      } else {
        throw new Error('Failed to sync data');
      }
    } catch (err) {
      console.error('Error syncing data:', err);
      setError('Failed to sync guest data');
    } finally {
      setSyncing(false);
    }
  };

  const addLancamento = async (lancamento: Omit<Lancamento, 'id'>) => {
    if (isGuest) {
      // Add to localStorage
      const newLancamento: Lancamento = {
        ...lancamento,
        id: `local_${Date.now()}`,
      };
      setLocalLancamentos([...localLancamentos, newLancamento]);
      return newLancamento;
    } else if (isAuthenticated) {
      // Add to database
      try {
        const response = await fetch('/api/lancamentos', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(lancamento),
        });

        if (response.ok) {
          const newLancamento = await response.json();
          setDbLancamentos([...dbLancamentos, newLancamento]);
          return newLancamento;
        } else {
          throw new Error('Failed to create lancamento');
        }
      } catch (err) {
        console.error('Error creating lancamento:', err);
        setError('Failed to save lancamento');
        throw err;
      }
    }
  };

  const updateLancamento = async (id: string, updates: Partial<Lancamento>) => {
    if (isGuest) {
      // Update in localStorage
      const updated = localLancamentos.map((l) =>
        l.id === id ? { ...l, ...updates } : l
      );
      setLocalLancamentos(updated);
    } else if (isAuthenticated) {
      // Update in database
      try {
        const response = await fetch(`/api/lancamentos/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updates),
        });

        if (response.ok) {
          const updatedLancamento = await response.json();
          setDbLancamentos(
            dbLancamentos.map((l) => (l.id === id ? updatedLancamento : l))
          );
        } else {
          throw new Error('Failed to update lancamento');
        }
      } catch (err) {
        console.error('Error updating lancamento:', err);
        setError('Failed to update lancamento');
        throw err;
      }
    }
  };

  const deleteLancamento = async (id: string) => {
    if (isGuest) {
      // Delete from localStorage
      setLocalLancamentos(localLancamentos.filter((l) => l.id !== id));
    } else if (isAuthenticated) {
      // Delete from database
      try {
        const response = await fetch(`/api/lancamentos/${id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          setDbLancamentos(dbLancamentos.filter((l) => l.id !== id));
        } else {
          throw new Error('Failed to delete lancamento');
        }
      } catch (err) {
        console.error('Error deleting lancamento:', err);
        setError('Failed to delete lancamento');
        throw err;
      }
    }
  };

  return {
    lancamentos: isAuthenticated ? dbLancamentos : localLancamentos,
    loading,
    error,
    syncing,
    addLancamento,
    updateLancamento,
    deleteLancamento,
    syncGuestData,
    refreshData: fetchFromDatabase,
  };
}
