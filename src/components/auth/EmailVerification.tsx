'use client'

/**
 * Email Verification Component (Spec 04)
 *
 * Shown after signup - prompts user to check email.
 */

import { useState, useEffect } from 'react'
import { Mail, Loader2, ArrowLeft } from 'lucide-react'
import { useAuthModal } from '@/hooks/useAuthModal'
import { createClient } from '@/lib/supabase/client'

interface EmailVerificationProps {
  email: string
}

export function EmailVerification({ email }: EmailVerificationProps) {
  const { setView } = useAuthModal()
  const [isResending, setIsResending] = useState(false)
  const [resendCooldown, setResendCooldown] = useState(0)
  const [resendCount, setResendCount] = useState(0)

  const supabase = createClient()

  // Countdown timer for resend button
  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [resendCooldown])

  const handleResend = async () => {
    if (resendCount >= 3) return

    setIsResending(true)
    try {
      await supabase.auth.resend({
        type: 'signup',
        email,
      })
      setResendCount((c) => c + 1)
      setResendCooldown(60) // 60 second cooldown
    } catch {
      // Silently fail - don't reveal issues
    }
    setIsResending(false)
  }

  return (
    <div className="w-full text-center">
      {/* Icon */}
      <div className="flex justify-center mb-6">
        <div className="w-16 h-16 bg-[#e85d4c]/10 rounded-full flex items-center justify-center">
          <Mail className="w-8 h-8 text-[#e85d4c]" />
        </div>
      </div>

      {/* Header */}
      <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
        Check your email
      </h2>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
        We&apos;ve sent a verification link to:
      </p>
      <p className="text-base font-medium text-gray-900 dark:text-gray-100 mb-6">{email}</p>

      <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
        Click the link in the email to verify your account and start using UK Graded Appliances.
      </p>

      {/* Help Text */}
      <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 mb-6 text-left">
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
          Didn&apos;t receive the email?
        </p>
        <ul className="text-sm text-gray-500 dark:text-gray-400 space-y-1">
          <li>• Check your spam folder</li>
          <li>• Make sure the email address is correct</li>
        </ul>
      </div>

      {/* Resend Button */}
      <button
        onClick={handleResend}
        disabled={isResending || resendCooldown > 0 || resendCount >= 3}
        className="
          w-full h-12 px-4
          flex items-center justify-center gap-2
          bg-white dark:bg-gray-800
          border border-gray-300 dark:border-gray-600
          text-gray-700 dark:text-gray-200
          font-medium
          rounded-lg
          hover:bg-gray-50 dark:hover:bg-gray-700
          disabled:opacity-50 disabled:cursor-not-allowed
          transition-colors
        "
      >
        {isResending ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Sending...
          </>
        ) : resendCooldown > 0 ? (
          `Resend in ${resendCooldown}s`
        ) : resendCount >= 3 ? (
          'Max resends reached'
        ) : (
          'Resend verification email'
        )}
      </button>

      {/* Start Over Link */}
      <button
        type="button"
        onClick={() => setView('signup')}
        className="flex items-center justify-center gap-1 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 mt-4 mx-auto"
      >
        <ArrowLeft className="w-4 h-4" />
        Wrong email? Start over
      </button>
    </div>
  )
}

/**
 * Check Email Component (Spec 04)
 *
 * Shown after password reset request.
 */
export function CheckEmail({ email }: { email: string }) {
  const { setView } = useAuthModal()

  return (
    <div className="w-full text-center">
      {/* Icon */}
      <div className="flex justify-center mb-6">
        <div className="w-16 h-16 bg-[#e85d4c]/10 rounded-full flex items-center justify-center">
          <Mail className="w-8 h-8 text-[#e85d4c]" />
        </div>
      </div>

      {/* Header */}
      <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
        Check your email
      </h2>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
        If an account exists for <span className="font-medium text-gray-700 dark:text-gray-300">{email}</span>,
        we&apos;ve sent a password reset link.
      </p>

      <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
        The link will expire in 1 hour.
      </p>

      {/* Back to Login Button */}
      <button
        onClick={() => setView('login')}
        className="
          w-full h-12 px-4
          flex items-center justify-center gap-2
          bg-white dark:bg-gray-800
          border border-gray-300 dark:border-gray-600
          text-gray-700 dark:text-gray-200
          font-medium
          rounded-lg
          hover:bg-gray-50 dark:hover:bg-gray-700
          transition-colors
        "
      >
        Back to login
      </button>
    </div>
  )
}

export default EmailVerification
