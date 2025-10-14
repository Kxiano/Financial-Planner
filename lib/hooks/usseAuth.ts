// lib/hooks/useAuth.ts

'use client';

import { useEffect, useState } from 'react';

interface User {
  sub?: string;
  email?: string;
  name?: string;
  picture?: string;
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/auth/me')
      .then(res => {
        if (res.ok) return res.json();
        return null;
      })
      .then(data => {
        setUser(data);
        setLoading(false);
      })
      .catch(() => {
        setUser(null);
        setLoading(false);
      });
  }, []);

  return {
    user,
    loading,
    isAuthenticated: !!user,
  };
}
