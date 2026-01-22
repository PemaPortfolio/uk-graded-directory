'use client'

/**
 * Reset Password Page (Spec 04)
 *
 * Page for setting a new password after clicking reset link.
 * URL: /auth/reset-password
 */

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { Loader2, AlertCircle, CheckCircle, AlertTriangle } from 'lucide-react'
import Link from 'next/link'
import { useAuth } from '@/lib/auth/auth-context'
import { PasswordInput } from '@/components/auth/PasswordInput'
import Logo from '@/components/layout/Logo'
import type { ResetPasswordFormData } from '@/types/auth'

export default function ResetPasswordPage() {
  const router = useRouter()
  const { updatePassword, isAuthenticated } = useAuth()
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [isValidToken, setIsValidToken] = useState<boolean | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<ResetPasswordFormData>()

  const password = watch('password')

  // Check if user has a valid session (from reset link)
  useEffect(() => {
    // If user is authenticated, they have a valid reset token
    // The token is exchanged when they click the link
    const checkAuth = async () => {
      // Give time for the auth state to update
      await new Promise((resolve) => setTimeout(resolve, 500))
      setIsValidToken(isAuthenticated)
    }
    checkAuth()
  }, [isAuthenticated])

  const onSubmit = async (data: ResetPasswordFormData) => {
    if (data.password !== data.confirmPassword) {
      setError('Passwords do not match')
      return
    }

    setError(null)
    setIsLoading(true)

    const result = await updatePassword(data.password)

    if (result.success) {
      setIsSuccess(true)
      // Redirect to dashboard after a short delay
      setTimeout(() => {
        router.push('/dashboard')
      }, 2000)
    } else {
      setError(result.error || 'Unable to update password. Please try again.')
    }

    setIsLoading(false)
  }

  // Loading state while checking token
  if (isValidToken === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8f6f6] dark:bg-[#0f0d0d]">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-[#e85d4c] mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">Verifying your reset link...</p>
        </div>
      </div>
    )
  }

  // Invalid or expired token
  if (!isValidToken) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8f6f6] dark:bg-[#0f0d0d] p-4">
        <div className="w-full max-w-md text-center">
          <Link href="/" className="inline-block mb-8">
            <Logo />
          </Link>

          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-8 h-8 text-amber-600 dark:text-amber-400" />
              </div>
            </div>

            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              Link expired
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mb-6">
              This password reset link has expired or is invalid. Please request a new one.
            </p>

            <Link
              href="/login"
              className="
                inline-flex items-center justify-center
                w-full h-12 px-4
                bg-[#e85d4c] hover:bg-[#d94f3f]
                text-white font-semibold
                rounded-lg
                transition-colors
              "
            >
              Request new reset link
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // Success state
  if (isSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8f6f6] dark:bg-[#0f0d0d] p-4">
        <div className="w-full max-w-md text-center">
          <Link href="/" className="inline-block mb-8">
            <Logo />
          </Link>

          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
            </div>

            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              Password updated
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mb-6">
              Your password has been successfully reset. Redirecting you to your dashboard...
            </p>

            <div className="flex items-center justify-center gap-2 text-gray-500 dark:text-gray-400">
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Redirecting...</span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Reset form
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8f6f6] dark:bg-[#0f0d0d] p-4">
      <div className="w-full max-w-md">
        <Link href="/" className="flex justify-center mb-8">
          <Logo />
        </Link>

        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 text-center mb-2">
            Set a new password
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 text-center mb-6">
            Enter your new password below.
          </p>

          {/* Error Banner */}
          {error && (
            <div className="flex items-center gap-2 p-3 mb-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-800 dark:text-red-200 text-sm">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <PasswordInput
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 8,
                  message: 'Password must be at least 8 characters',
                },
              })}
              id="new-password"
              label="New password"
              autoComplete="new-password"
              placeholder="Enter new password"
              hint="At least 8 characters"
              error={errors.password?.message}
            />

            <PasswordInput
              {...register('confirmPassword', {
                required: 'Please confirm your password',
                validate: (value) => value === password || 'Passwords do not match',
              })}
              id="confirm-password"
              label="Confirm password"
              autoComplete="new-password"
              placeholder="Confirm new password"
              error={errors.confirmPassword?.message}
            />

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
                  Updating password...
                </>
              ) : (
                'Reset password'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
