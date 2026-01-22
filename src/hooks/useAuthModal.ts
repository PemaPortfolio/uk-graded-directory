'use client'

/**
 * Auth Modal State Hook (Spec 04)
 *
 * Manages the state of the authentication modal.
 */

import { create } from 'zustand'
import type { AuthModalView, UseAuthModalReturn } from '@/types/auth'

interface AuthModalState {
  isOpen: boolean
  view: AuthModalView
  returnUrl: string | null
  pendingEmail: string | null
}

interface AuthModalActions {
  openLogin: (returnUrl?: string) => void
  openSignup: (returnUrl?: string) => void
  openForgotPassword: () => void
  setView: (view: AuthModalView) => void
  setPendingEmail: (email: string) => void
  close: () => void
}

export const useAuthModal = create<AuthModalState & AuthModalActions>((set) => ({
  isOpen: false,
  view: 'login',
  returnUrl: null,
  pendingEmail: null,

  openLogin: (returnUrl?: string) =>
    set({
      isOpen: true,
      view: 'login',
      returnUrl: returnUrl || null,
    }),

  openSignup: (returnUrl?: string) =>
    set({
      isOpen: true,
      view: 'signup',
      returnUrl: returnUrl || null,
    }),

  openForgotPassword: () =>
    set({
      view: 'forgot-password',
    }),

  setView: (view: AuthModalView) =>
    set({
      view,
    }),

  setPendingEmail: (email: string) =>
    set({
      pendingEmail: email,
    }),

  close: () =>
    set({
      isOpen: false,
      view: 'login',
      returnUrl: null,
      pendingEmail: null,
    }),
}))

export type { UseAuthModalReturn }
