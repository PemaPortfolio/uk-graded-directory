'use client'

/**
 * Forgot Password Form Component (Spec 04)
 *
 * Request password reset link form.
 */

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Loader2, AlertCircle } from 'lucide-react'
import { useAuth } from '@/lib/auth/auth-context'
import { useAuthModal } from '@/hooks/useAuthModal'

interface ForgotPasswordFormData {
  email: string
}

export function ForgotPasswordForm() {
  const { resetPassword } = useAuth()
  const { setView, setPendingEmail } = useAuthModal()
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>()

  const onSubmit = async (data: ForgotPasswordFormData) => {
    setError(null)
    setIsLoading(true)

    const result = await resetPassword(data.email)

    if (result.success) {
      setPendingEmail(data.email)
      setView('check-email')
    } else {
      // For security, we don't reveal if email exists
      // So we still show the check-email screen
      setPendingEmail(data.email)
      setView('check-email')
    }

    setIsLoading(false)
  }

  return (
    <div className="w-full">
      {/* Header */}
      <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 text-center mb-2">
        Reset your password
      </h2>
      <p className="text-sm text-gray-500 dark:text-gray-400 text-center mb-6">
        Enter your email address and we&apos;ll send you a link to reset your password.
      </p>

      {/* Error Banner */}
      {error && (
        <div className="flex items-center gap-2 p-3 mb-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-800 dark:text-red-200 text-sm">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Email */}
        <div>
          <label
            htmlFor="reset-email"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5"
          >
            Email address
          </label>
          <input
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Please enter a valid email address',
              },
            })}
            type="email"
            id="reset-email"
            autoComplete="email"
            className={`
              w-full h-12 px-4 text-base
              border rounded-lg
              bg-white dark:bg-gray-800
              text-gray-900 dark:text-gray-100
              placeholder:text-gray-400 dark:placeholder:text-gray-500
              focus:outline-none focus:ring-2 focus:ring-[#e85d4c]/50 focus:border-[#e85d4c]
              ${errors.email
                ? 'border-red-500 focus:border-red-500 focus:ring-red-500/50'
                : 'border-gray-300 dark:border-gray-600'
              }
            `}
            placeholder="you@example.com"
          />
          {errors.email && (
            <p className="mt-1.5 text-sm text-red-600 dark:text-red-400">{errors.email.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="
            w-full h-12 px-4
            flex items-center justify-center gap-2
            bg-[#e85d4c] hover:bg-[#d94f3f]
            text-white font-semibold
            rounded-lg
            disabled:opacity-50 disabled:cursor-not-allowed
            transition-colors
          "
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Sending link...
            </>
          ) : (
            'Send reset link'
          )}
        </button>
      </form>

      {/* Back to Login Link */}
      <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-6">
        Remember your password?{' '}
        <button
          type="button"
          onClick={() => setView('login')}
          className="text-[#e85d4c] font-medium hover:underline"
        >
          Log in
        </button>
      </p>
    </div>
  )
}

export default ForgotPasswordForm
