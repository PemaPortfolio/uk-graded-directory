/**
 * Authentication Types (Spec 04)
 *
 * TypeScript interfaces for the authentication system.
 */

import type { User, Session } from '@supabase/supabase-js'

/**
 * Authentication state
 */
export interface AuthState {
  user: User | null
  session: Session | null
  isLoading: boolean
  isAuthenticated: boolean
}

/**
 * Auth context type with all methods
 */
export interface AuthContextType extends AuthState {
  signIn: (email: string, password: string) => Promise<AuthResult>
  signUp: (email: string, password: string, name: string) => Promise<AuthResult>
  signInWithGoogle: () => Promise<void>
  signOut: () => Promise<void>
  resetPassword: (email: string) => Promise<AuthResult>
  updatePassword: (password: string) => Promise<AuthResult>
}

/**
 * Result of an auth operation
 */
export interface AuthResult {
  success: boolean
  error?: string
  needsEmailVerification?: boolean
}

/**
 * Login form data
 */
export interface LoginFormData {
  email: string
  password: string
}

/**
 * Signup form data
 */
export interface SignupFormData {
  name: string
  email: string
  password: string
}

/**
 * Password reset form data
 */
export interface ResetPasswordFormData {
  password: string
  confirmPassword: string
}

/**
 * User profile data
 */
export interface UserProfile {
  id: string
  email: string
  name: string
  avatar_url?: string
  created_at: string
}

/**
 * Auth modal state
 */
export type AuthModalView =
  | 'login'
  | 'signup'
  | 'forgot-password'
  | 'check-email'
  | 'email-verification'

/**
 * Auth modal state hook return type
 */
export interface UseAuthModalReturn {
  isOpen: boolean
  view: AuthModalView
  returnUrl: string | null
  openLogin: (returnUrl?: string) => void
  openSignup: (returnUrl?: string) => void
  openForgotPassword: () => void
  setView: (view: AuthModalView) => void
  close: () => void
}
