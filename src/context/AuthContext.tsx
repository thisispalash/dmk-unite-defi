'use client';

import crypto from 'crypto';
import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { MonkeyUser } from '@/util/supabase';

import useLoadingOp from '@/context/hooks/useLoadingOp';

interface AuthContextType {
  user: MonkeyUser | null;
  isLoading: boolean;
  isLoggedIn: boolean;
  login: (username: string, password: string) => Promise<void>;
  register: (username: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export default function AuthProvider({ children }: { children: React.ReactNode }) {

  const withLoading = useLoadingOp('auth');

  const [user, setUser] = useState<MonkeyUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const u = localStorage.getItem('dmk-user');
    if (u) {
      setUser(JSON.parse(u));
      setIsLoggedIn(true);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      router.push('/home');
    } else {
      router.push('/');
    }
  }, [isLoggedIn]);

  const login = async (username: string, password: string) => {
    await withLoading(async () => {
      setIsLoading(true);

      const hashed = crypto.createHash('sha256').update(password).digest('hex');

      const response = await fetch('/api/login', {
        method: 'POST',
        body: JSON.stringify({ username, password: hashed }),
      });

      const data = await response.json();
      const u = data.data as MonkeyUser;

      if (data.success) {
        setUser(u);
        setIsLoggedIn(true);
        localStorage.setItem('dmk-user', JSON.stringify(u));
      } else {
        setIsLoading(false);
        throw new Error(data.message);
      }

      setIsLoading(false);
    });
  }

  const register = async (username: string, password: string) => {
    setIsLoading(true);

    const hashed = crypto.createHash('sha256').update(password).digest('hex');

    const response = await fetch('/api/register', {
      method: 'POST',
      body: JSON.stringify({ username, password: hashed }),
    });

    const data = await response.json();
    const u = data.data as MonkeyUser;

    if (data.success) {
      setUser(u);
      setIsLoggedIn(true);
      localStorage.setItem('dmk-user', JSON.stringify(u));
    } else {
      setIsLoading(false);
      throw new Error(data.message);
    }

    setIsLoading(false);
  }

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        isLoading, 
        isLoggedIn, 
        login, 
        register 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}