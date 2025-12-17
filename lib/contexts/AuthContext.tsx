// lib/contexts/AuthContext.tsx

'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  isGuest: boolean;
  login: () => void;
  logout: () => void;
  continueAsGuest: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const GUEST_USER_KEY = 'guest_user';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      // Auth0 provides /api/auth/me endpoint automatically via handleAuth()
      const response = await fetch('/api/auth/me');
      
      if (response.ok) {
        if (response.status === 204) {
             // No content, not authenticated
        } else {
            const data = await response.json();
            // User is authenticated with Auth0
            setUser({
              id: data.sub,
              auth0Id: data.sub,
              email: data.email,
              name: data.name,
              picture: data.picture,
              isGuest: false,
              currency: data.currency || 'BRL',
            });
            setLoading(false);
            return;
        }
      }

      // Check for guest user in localStorage
      const guestData = localStorage.getItem(GUEST_USER_KEY);
      if (guestData) {
        const guestUser = JSON.parse(guestData);
        setUser(guestUser);
      }
    } catch (error) {
      console.error('Error checking auth:', error);
      
      // Check for guest user in localStorage on error
      const guestData = localStorage.getItem(GUEST_USER_KEY);
      if (guestData) {
        const guestUser = JSON.parse(guestData);
        setUser(guestUser);
      }
    } finally {
      setLoading(false);
    }
  };

  const login = () => {
    window.location.href = '/api/auth/login';
  };

  const logout = async () => {
    if (user?.isGuest) {
      // Clear guest user
      localStorage.removeItem(GUEST_USER_KEY);
      setUser(null);
    } else {
      // Redirect to Auth0 logout
      window.location.href = '/api/auth/logout';
    }
  };

  const continueAsGuest = () => {
    const guestUser: User = {
      id: `guest_${Date.now()}`,
      isGuest: true,
      currency: 'BRL',
      name: 'Guest User',
    };

    localStorage.setItem(GUEST_USER_KEY, JSON.stringify(guestUser));
    setUser(guestUser);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated: !!user && !user.isGuest,
        isGuest: !!user && user.isGuest,
        login,
        logout,
        continueAsGuest,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
