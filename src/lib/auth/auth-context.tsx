'use client'

/**
 * Auth Context Provider (Spec 04)
 *
 * Provides authentication state and methods to the entire app.
 * Uses Supabase Auth for all authentication operations.
 */

import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { AuthState, AuthContextType, AuthResult } from '@/types/auth'

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    session: null,
    isLoading: true,
    isAuthenticated: false,
  })

  const supabase = createClient()

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setState({
        user: session?.user ?? null,
        session,
        isLoading: false,
        isAuthenticated: !!session,
      })
    })

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setState({
        user: session?.user ?? null,
        session,
        isLoading: false,
        isAuthenticated: !!session,
      })
    })

    return () => subscription.unsubscribe()
  }, [supabase.auth])

  const signIn = useCallback(
    async (email: string, password: string): Promise<AuthResult> => {
      try {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        })

        if (error) {
          // Handle specific error cases
          if (error.message.includes('Email not confirmed')) {
            return {
              success: false,
              error: 'Please verify your email before logging in.',
              needsEmailVerification: true,
            }
          }
          if (error.message.includes('Invalid login credentials')) {
            return {
              success: false,
              error: 'Invalid email or password. Please try again.',
            }
          }
          return { success: false, error: error.message }
        }

        return { success: true }
      } catch {
        return { success: false, error: 'Something went wrong. Please try again.' }
      }
    },
    [supabase.auth]
  )

  const signUp = useCallback(
    async (email: string, password: string, name: string): Promise<AuthResult> => {
      try {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { name },
            emailRedirectTo: `${window.location.origin}/auth/callback`,
          },
        })

        if (error) {
          if (error.message.includes('already registered')) {
            return {
              success: false,
              error: 'An account with this email already exists.',
            }
          }
          return { success: false, error: error.message }
        }

        return { success: true, needsEmailVerification: true }
      } catch {
        return { success: false, error: 'Unable to create account. Please try again.' }
      }
    },
    [supabase.auth]
  )

  const signInWithGoogle = useCallback(async () => {
    // Store current URL for redirect after auth
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('authReturnUrl', window.location.pathname)
    }

    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    })
  }, [supabase.auth])

  const signOut = useCallback(async () => {
    await supabase.auth.signOut()
  }, [supabase.auth])

  const resetPassword = useCallback(
    async (email: string): Promise<AuthResult> => {
      try {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/auth/reset-password`,
        })

        if (error) {
          return { success: false, error: error.message }
        }

        // Always return success for security (don't reveal if email exists)
        return { success: true }
      } catch {
        return { success: false, error: 'Unable to send reset link. Please try again.' }
      }
    },
    [supabase.auth]
  )

  const updatePassword = useCallback(
    async (password: string): Promise<AuthResult> => {
      try {
        const { error } = await supabase.auth.updateUser({ password })

        if (error) {
          return { success: false, error: error.message }
        }

        return { success: true }
      } catch {
        return { success: false, error: 'Unable to update password. Please try again.' }
      }
    },
    [supabase.auth]
  )

  return (
    <AuthContext.Provider
      value={{
        ...state,
        signIn,
        signUp,
        signInWithGoogle,
        signOut,
        resetPassword,
        updatePassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

/**
 * Hook to access auth context
 */
export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
