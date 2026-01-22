'use client'

/**
 * Signup Form Component (Spec 04)
 *
 * Registration form with email, password, and name.
 */

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import Link from 'next/link'
import { Loader2, AlertCircle } from 'lucide-react'
import { useAuth } from '@/lib/auth/auth-context'
import { useAuthModal } from '@/hooks/useAuthModal'
import { PasswordInput } from './PasswordInput'
import { GoogleButton } from './GoogleButton'
import type { SignupFormData } from '@/types/auth'

export function SignupForm() {
  const { signUp, signInWithGoogle } = useAuth()
  const { setView, setPendingEmail } = useAuthModal()
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>()

  const onSubmit = async (data: SignupFormData) => {
    setError(null)
    setIsLoading(true)

    const result = await signUp(data.email, data.password, data.name)

    if (result.success) {
      setPendingEmail(data.email)
      setView('email-verification')
    } else {
      setError(result.error || 'Unable to create account. Please try again.')
    }

    setIsLoading(false)
  }

  return (
    <div className="w-full">
      {/* Header */}
      <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 text-center mb-2">
        Create your account
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

      {/* Google Button First (per spec) */}
      <GoogleButton onClick={signInWithGoogle} disabled={isLoading} className="mb-6" />

      {/* Divider */}
      <div className="flex items-center gap-4 mb-6">
        <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
        <span className="text-sm text-gray-500 dark:text-gray-400">or</span>
        <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
      </div>

      {/* Error Banner */}
      {error && (
        <div className="flex items-center gap-2 p-3 mb-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-800 dark:text-red-200 text-sm">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Name */}
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5"
          >
            Full name
          </label>
          <input
            {...register('name', {
              required: 'Please enter your name',
              minLength: {
                value: 2,
                message: 'Name must be at least 2 characters',
              },
            })}
            type="text"
            id="name"
            autoComplete="name"
            className={`
              w-full h-12 px-4 text-base
              border rounded-lg
              bg-white dark:bg-gray-800
              text-gray-900 dark:text-gray-100
              placeholder:text-gray-400 dark:placeholder:text-gray-500
              focus:outline-none focus:ring-2 focus:ring-[#e85d4c]/50 focus:border-[#e85d4c]
              ${errors.name
                ? 'border-red-500 focus:border-red-500 focus:ring-red-500/50'
                : 'border-gray-300 dark:border-gray-600'
              }
            `}
            placeholder="John Smith"
          />
          {errors.name && (
            <p className="mt-1.5 text-sm text-red-600 dark:text-red-400">{errors.name.message}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label
            htmlFor="signup-email"
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
            id="signup-email"
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
            minLength: {
              value: 8,
              message: 'Password must be at least 8 characters',
            },
          })}
          id="signup-password"
          label="Password"
          autoComplete="new-password"
          placeholder="Create a password"
          hint="At least 8 characters"
          error={errors.password?.message}
        />

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
              Creating account...
            </>
          ) : (
            'Sign up'
          )}
        </button>
      </form>

      {/* Login Link */}
      <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-6">
        Already have an account?{' '}
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

export default SignupForm
