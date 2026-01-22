'use client'

/**
 * Auth Modal Component (Spec 04)
 *
 * Modal container for login, signup, and password reset flows.
 */

import { useEffect, useRef } from 'react'
import { X } from 'lucide-react'
import { useAuthModal } from '@/hooks/useAuthModal'
import { useAuth } from '@/lib/auth/auth-context'
import { LoginForm } from './LoginForm'
import { SignupForm } from './SignupForm'
import { ForgotPasswordForm } from './ForgotPasswordForm'
import { EmailVerification, CheckEmail } from './EmailVerification'

export function AuthModal() {
  const { isOpen, view, pendingEmail, close } = useAuthModal()
  const { isAuthenticated } = useAuth()
  const modalRef = useRef<HTMLDivElement>(null)
  const previousFocusRef = useRef<HTMLElement | null>(null)

  // Close modal when user becomes authenticated
  useEffect(() => {
    if (isAuthenticated && isOpen) {
      close()
    }
  }, [isAuthenticated, isOpen, close])

  // Handle focus trap and escape key
  useEffect(() => {
    if (!isOpen) return

    // Store the previously focused element
    previousFocusRef.current = document.activeElement as HTMLElement

    // Focus the modal
    modalRef.current?.focus()

    // Handle escape key
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        close()
      }

      // Focus trap
      if (event.key === 'Tab' && modalRef.current) {
        const focusableElements = modalRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )
        const firstElement = focusableElements[0]
        const lastElement = focusableElements[focusableElements.length - 1]

        if (event.shiftKey && document.activeElement === firstElement) {
          event.preventDefault()
          lastElement?.focus()
        } else if (!event.shiftKey && document.activeElement === lastElement) {
          event.preventDefault()
          firstElement?.focus()
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''

      // Return focus to the previously focused element
      previousFocusRef.current?.focus()
    }
  }, [isOpen, close])

  if (!isOpen) return null

  const handleOverlayClick = (event: React.MouseEvent) => {
    if (event.target === event.currentTarget) {
      close()
    }
  }

  const handleSuccess = () => {
    close()
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="auth-modal-title"
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" aria-hidden="true" />

      {/* Modal */}
      <div
        ref={modalRef}
        className="relative w-full max-w-md bg-white dark:bg-gray-900 rounded-xl shadow-2xl p-8 animate-in fade-in slide-in-from-bottom-4 duration-200"
        tabIndex={-1}
      >
        {/* Close Button */}
        <button
          onClick={close}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Content based on view */}
        {view === 'login' && <LoginForm onSuccess={handleSuccess} />}
        {view === 'signup' && <SignupForm />}
        {view === 'forgot-password' && <ForgotPasswordForm />}
        {view === 'email-verification' && <EmailVerification email={pendingEmail || ''} />}
        {view === 'check-email' && <CheckEmail email={pendingEmail || ''} />}
      </div>
    </div>
  )
}

export default AuthModal
