import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signUp: (email: string, password: string, fullName: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updatePassword: (newPassword: string) => Promise<void>;
  error: string | null;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // 1. Verifica a sessão atual ao carregar
    const initSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        setSession(session);
        setUser(session?.user ?? null);
      } catch (err) {
        console.error('Error fetching session:', err);
      } finally {
        setLoading(false);
      }
    };
    initSession();

    // 2. Escuta mudanças em tempo real (Login, Logout, Auto-refresh)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    return () => subscription?.unsubscribe();
  }, []);

  const clearError = () => setError(null);

  // --- FUNÇÃO DE CADASTRO (SIGN UP) ---
  const signUp = async (email: string, password: string, fullName: string) => {
    try {
      clearError();
      
      // Define a URL de redirecionamento dinamicamente (Localhost ou GitHub Pages)
      const redirectTo = window.location.origin + (import.meta.env.BASE_URL === '/' ? '' : import.meta.env.BASE_URL);

      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName, // Salva o nome nos metadados
          },
          emailRedirectTo: redirectTo, // Garante que o link do email volte para o site certo
        },
      });

      if (error) throw error;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to create account';
      setError(message);
      throw err; // Lança o erro para o LoginPage exibir
    }
  };

  // --- FUNÇÃO DE LOGIN (SIGN IN) ---
  const signIn = async (email: string, password: string) => {
    try {
      clearError();

      if (!email || !password) {
        throw new Error('Email and password are required');
      }

      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to sign in';
      setError(message);
      throw err;
    }
  };

  // --- FUNÇÃO DE LOGOUT ---
  const signOut = async () => {
    try {
      clearError();
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to sign out';
      setError(message);
      throw err;
    }
  };

  // --- RECUPERAÇÃO DE SENHA ---
  const resetPassword = async (email: string) => {
    try {
      clearError();

      if (!email) {
        throw new Error('Email is required');
      }

      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`, // Ajuste se tiver uma rota específica
      });

      if (error) throw error;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to send reset email';
      setError(message);
      throw err;
    }
  };

  // --- ATUALIZAÇÃO DE SENHA ---
  const updatePassword = async (newPassword: string) => {
    try {
      clearError();

      if (!newPassword || newPassword.length < 6) {
        throw new Error('Password must be at least 6 characters');
      }

      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (error) throw error;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to update password';
      setError(message);
      throw err;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        loading,
        signUp,
        signIn,
        signOut,
        resetPassword,
        updatePassword,
        error,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
