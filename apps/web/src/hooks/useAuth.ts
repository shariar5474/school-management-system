/**
 * Firebase Authentication Hook
 * Provides login, logout, token management, and user state
 */
'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
  updatePassword,
  type User as FirebaseUser,
} from 'firebase/auth';
import { auth } from '@/lib/firebase';

interface AuthState {
  user: FirebaseUser | null;
  loading: boolean;
  error: string | null;
}

/**
 * Custom hook for Firebase authentication
 * Handles login, logout, token retrieval, and auth state observation
 */
export function useAuth() {
  const [state, setState] = useState<AuthState>({
    user: null,
    loading: true,
    error: null,
  });

  // Listen to auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setState({ user, loading: false, error: null });
    });

    return () => unsubscribe();
  }, []);

  /** Sign in with email and password */
  const login = useCallback(async (email: string, password: string) => {
    setState((prev) => ({ ...prev, loading: true, error: null }));
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      setState({ user: result.user, loading: false, error: null });
      return result.user;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Login failed';
      setState((prev) => ({ ...prev, loading: false, error: message }));
      throw err;
    }
  }, []);

  /** Sign out the current user */
  const logout = useCallback(async () => {
    setState((prev) => ({ ...prev, loading: true }));
    try {
      await signOut(auth);
      setState({ user: null, loading: false, error: null });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Logout failed';
      setState((prev) => ({ ...prev, loading: false, error: message }));
      throw err;
    }
  }, []);

  /** Get the current user's ID token */
  const getToken = useCallback(async (): Promise<string | null> => {
    if (!state.user) return null;
    try {
      return await state.user.getIdToken();
    } catch {
      return null;
    }
  }, [state.user]);

  /** Get the current user's ID token, forcing a refresh */
  const getTokenForced = useCallback(async (): Promise<string | null> => {
    if (!state.user) return null;
    try {
      return await state.user.getIdToken(true);
    } catch {
      return null;
    }
  }, [state.user]);

  /** Send password reset email */
  const resetPassword = useCallback(async (email: string) => {
    return await sendPasswordResetEmail(auth, email);
  }, []);

  /** Update current user password */
  const changePassword = useCallback(async (newPassword: string) => {
    if (!auth.currentUser) throw new Error('No user currently logged in');
    return await updatePassword(auth.currentUser, newPassword);
  }, []);

  return {
    user: state.user,
    loading: state.loading,
    error: state.error,
    isAuthenticated: !!state.user,
    login,
    logout,
    resetPassword,
    changePassword,
    getToken,
    getTokenForced,
  };
}
