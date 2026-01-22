'use client'

/**
 * Login Form Component (Spec 04)
 *
 * Email + password login form.
 */

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import Link from 'next/link'
import { Loader2, AlertCircle } from 'lucide-react'
import { useAuth } from '@/lib/auth/auth-context'
import { useAuthModal } from '@/hooks/useAuthModal'
import { PasswordInput } from './PasswordInput'
import { GoogleButton } from './GoogleButton'
import type { LoginFormData } from '@/types/auth'

interface LoginFormProps {
  onSuccess?: () => void
}

export function LoginForm({ onSuccess }: LoginFormProps) {
  const { signIn, signInWithGoogle } = useAuth()
  const { openForgotPassword, setView } = useAuthModal()
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>()

  const onSubmit = async (data: LoginFormData) => {
    setError(null)
    setIsLoading(true)

    const result = await signIn(data.email, data.password)

    if (result.success) {
      onSuccess?.()
    } else {
      setError(result.error || 'Invalid email or password. Please try again.')
      if (result.needsEmailVerification) {
        setView('email-verification')
      }
    }

    setIsLoading(false)
  }

  return (
    <div className="w-full">
      {/* Header */}
      <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 text-center mb-2">
        Welcome back
      </h2>
      <p className="text-sm text-gray-500 dark:text-gray-400 text-center mb-6">
        By continuing, you agree to our{' '}
        <Link href="/terms" className="text-[#e85d4c] hover:underline">
          Terms of Service
        </Link>{' '}
        and acknowledge our{' '}
        <Link href="/privacy" className="text-[#e85d4c] hover:underline">
          Privacy Policy
        </Link>
        .
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
            htmlFor="email"
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
            id="email"
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

        {/* Password */}
        <PasswordInput
          {...register('password', {
            required: 'Password is required',
          })}
          label="Password"
          autoComplete="current-password"
          placeholder="Enter your password"
          error={errors.password?.message}
        />

        {/* Forgot Password Link */}
        <div className="text-right">
          <button
            type="button"
            onClick={openForgotPassword}
            className="text-sm text-[#e85d4c] hover:underline"
          >
            Forgot password?
          </button>
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
              Signing in...
            </>
          ) : (
            'Log in'
          )}
        </button>
      </form>

      {/* Divider */}
      <div className="flex items-center gap-4 my-6">
        <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
        <span className="text-sm text-gray-500 dark:text-gray-400">or</span>
        <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
      </div>

      {/* Google Button */}
      <GoogleButton onClick={signInWithGoogle} disabled={isLoading} />

      {/* Sign Up Link */}
      <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-6">
        Don&apos;t have an account?{' '}
        <button
          type="button"
          onClick={() => setView('signup')}
          className="text-[#e85d4c] font-medium hover:underline"
        >
          Sign up
        </button>
      </p>
    </div>
  )
}

export default LoginForm
